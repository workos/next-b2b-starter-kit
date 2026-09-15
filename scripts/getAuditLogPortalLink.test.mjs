import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { compileFunction } from 'node:vm';
import { GenerateLinkIntent } from '@workos-inc/node';
import ts from 'typescript';

// Execute the real action, replacing only AuthKit and the WorkOS API boundary.
const filename = new URL('../src/actions/getAuditLogPortalLink.ts', import.meta.url);
const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
const loadAction = compileFunction(outputText, ['require', 'exports'], { filename: filename.pathname });
const session = { organizationId: 'org_caller', entitlements: ['audit-logs'] };

function mockAction(t, auth = session) {
  const generateLink = t.mock.fn(async ({ organization }) => ({ link: `https://portal.example/${organization}` }));
  const modules = {
    '@/app/api/workos': { workos: { adminPortal: { generateLink } } },
    '@workos-inc/authkit-nextjs': {
      withAuth: async (options) => {
        assert.deepEqual(options, { ensureSignedIn: true });
        if (auth instanceof Error) throw auth;
        return auth;
      },
    },
    '@workos-inc/node': { GenerateLinkIntent },
  };
  const exports = {};
  loadAction((specifier) => {
    assert.ok(Object.hasOwn(modules, specifier), `Unexpected import: ${specifier}`);
    return modules[specifier];
  }, exports);
  return { getAuditLogPortalLink: exports.getAuditLogPortalLink, generateLink };
}

test('generates an audit-log link for the session organization without client arguments', async (t) => {
  const { getAuditLogPortalLink, generateLink } = mockAction(t);
  assert.equal(await getAuditLogPortalLink(), 'https://portal.example/org_caller');
  assert.equal(generateLink.mock.callCount(), 1);
  assert.deepEqual(generateLink.mock.calls[0].arguments, [
    { organization: session.organizationId, intent: GenerateLinkIntent.AuditLogs },
  ]);
});

test('ignores an organization ID supplied directly to the server action', async (t) => {
  const { getAuditLogPortalLink, generateLink } = mockAction(t);
  // Direct callers can still supply arguments after the TypeScript parameter is removed.
  assert.equal(await getAuditLogPortalLink('org_other'), 'https://portal.example/org_caller');
  assert.deepEqual(generateLink.mock.calls[0].arguments, [
    { organization: session.organizationId, intent: GenerateLinkIntent.AuditLogs },
  ]);
});

for (const organizationId of [undefined, null, '']) {
  test(`rejects a session with organizationId=${JSON.stringify(organizationId)}`, async (t) => {
    const { getAuditLogPortalLink, generateLink } = mockAction(t, { ...session, organizationId });
    await assert.rejects(getAuditLogPortalLink('org_other'), /No organization found in session/);
    assert.equal(generateLink.mock.callCount(), 0);
  });
}

for (const entitlements of [undefined, [], ['sso']]) {
  test(`rejects a session with entitlements=${JSON.stringify(entitlements)}`, async (t) => {
    const { getAuditLogPortalLink, generateLink } = mockAction(t, { ...session, entitlements });
    await assert.rejects(getAuditLogPortalLink('org_other'), /Audit logs entitlement is required/);
    assert.equal(generateLink.mock.callCount(), 0);
  });
}

test('does not generate a link when authentication fails', async (t) => {
  const error = new Error('Not signed in');
  const { getAuditLogPortalLink, generateLink } = mockAction(t, error);
  await assert.rejects(getAuditLogPortalLink('org_other'), (actual) => actual === error);
  assert.equal(generateLink.mock.callCount(), 0);
});
