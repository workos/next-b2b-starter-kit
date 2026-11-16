import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { closeSync, mkdtempSync, openSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, before, test } from 'node:test';
import { setTimeout } from 'node:timers/promises';

// Synthetic credentials only. No request follows redirects to WorkOS or Stripe.
const base = 'http://127.0.0.1:8787';
const vars = {
  WORKOS_API_KEY: 'sk_test_cloudflare_smoke_only',
  WORKOS_CLIENT_ID: 'client_cloudflare_smoke_only',
  WORKOS_COOKIE_PASSWORD: 'cloudflare-smoke-only-not-a-real-secret-123456789',
  STRIPE_API_KEY: 'sk_test_cloudflare_smoke_only',
};
const directory = mkdtempSync(join(tmpdir(), 'starter-cloudflare-'));
const logPath = join(directory, 'worker.log');
let worker;
let exited;

async function request(path, init) {
  return fetch(`${base}${path}`, {
    ...init,
    headers: { Accept: 'text/html', ...init?.headers },
    redirect: 'manual',
    signal: AbortSignal.timeout(15000),
  });
}

before(async () => {
  // Refuse to accidentally test a different server already using this port.
  const { createServer } = await import('node:net');
  const probe = createServer();
  probe.listen(8787, '127.0.0.1');
  await once(probe, 'listening');
  await new Promise((resolve) => probe.close(resolve));
  const log = openSync(logPath, 'w');
  worker = spawn(
    process.execPath,
    [
      'node_modules/wrangler/bin/wrangler.js',
      'dev',
      '--local',
      '--ip',
      '127.0.0.1',
      '--port',
      '8787',
      '--inspector-port',
      '0',
      ...Object.entries(vars).flatMap(([key, value]) => ['--var', `${key}:${value}`]),
    ],
    {
      stdio: ['ignore', log, log],
      detached: true,
      env: { ...process.env, CI: 'true', WRANGLER_SEND_METRICS: 'false' },
    },
  );
  closeSync(log);
  exited = once(worker, 'exit');
  const deadline = Date.now() + 90000;
  while (Date.now() < deadline && worker.exitCode === null) {
    try {
      const response = await request('/logos/superapp_logo.svg');
      await response.body?.cancel();
      if (response.ok) return;
    } catch {
      /* Wait for the local Worker to start. */
    }
    await setTimeout(500);
  }
  throw new Error(`Worker did not become ready:\n${readFileSync(logPath, 'utf8')}`);
});

after(async () => {
  if (worker && worker.exitCode === null && worker.signalCode === null) {
    // Wrangler forwards the signal and shuts down its own child processes.
    worker.kill('SIGTERM');
    await exited;
  }
  // Keep server-side diagnostics in the test output, including assertion failures.
  if (worker) console.log(`\n--- Worker output ---\n${readFileSync(logPath, 'utf8')}`);
  rmSync(directory, { recursive: true, force: true });
});

test('public pages and their static assets render in workerd', async () => {
  for (const [path, text] of [
    ['/', 'Next.js B2B Starter Kit'],
    ['/pricing', 'Basic'],
  ]) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes(text), path);
    const asset = html.match(/src="([^" ]*\/_next\/static\/[^" ]+\.js)"/);
    assert.ok(asset, 'page includes a JavaScript asset');
    const script = await request(asset[1]);
    assert.equal(script.status, 200);
    assert.match(script.headers.get('cache-control') ?? '', /immutable/);
    await script.body?.cancel();
  }
});

test('protected pages and unauthenticated subscription requests require AuthKit', async () => {
  for (const path of ['/dashboard', '/dashboard/settings', '/product', '/api/subscribe']) {
    const response = await request(
      path,
      path === '/api/subscribe' ? { method: 'POST', headers: { Accept: 'application/json' } } : undefined,
    );
    assert.ok([302, 303, 307, 308].includes(response.status), `${path}: ${response.status}`);
    const location = new URL(response.headers.get('location'));
    assert.equal(location.hostname, 'api.workos.com');
    assert.equal(location.searchParams.get('client_id'), vars.WORKOS_CLIENT_ID);
    assert.equal(location.searchParams.get('redirect_uri'), `${base}/callback`);
    assert.equal(location.searchParams.get('code_challenge_method'), 'S256');
    assert.ok(location.searchParams.get('code_challenge'));
    assert.ok(location.searchParams.get('state'));
    if (path !== '/api/subscribe') {
      const cookie = response.headers.getSetCookie().find((value) => value.startsWith('wos-auth-verifier-'));
      assert.ok(cookie, 'document navigation sets a flow-specific PKCE cookie');
      assert.match(cookie, /HttpOnly/i);
      assert.ok(cookie.split(';')[0].endsWith(`=${location.searchParams.get('state')}`));
    }
    await response.body?.cancel();
  }
});

test('a malformed session cannot bypass the protected routes', async () => {
  const response = await request('/dashboard', { headers: { Cookie: 'wos-session=invalid-session' } });
  assert.ok([302, 303, 307, 308].includes(response.status));
  assert.equal(new URL(response.headers.get('location')).hostname, 'api.workos.com');
  await response.body?.cancel();
});

test('callback without OAuth state fails closed', async () => {
  const response = await request('/callback?code=not-a-real-code');
  // AuthKit deliberately uses its generic 500 error response for invalid callbacks.
  assert.equal(response.status, 500);
  assert.equal((await response.json()).error.message, 'Something went wrong');
  assert.match(response.headers.get('cache-control') ?? '', /no-store/);
  assert.doesNotMatch(response.headers.get('set-cookie') ?? '', /wos-session=[^;]/);
});
