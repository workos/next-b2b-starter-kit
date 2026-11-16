# Cloudflare Workers hosting

This deploys the Next.js app with OpenNext. Convex, WorkOS, and Stripe remain in
place. It does not migrate their data, create new environments, or change billing
mode. Keep the existing Vercel demo and its links until the replacement has passed
end-to-end verification. Do not run `pnpm setup` for an existing deployment: it
creates a new Convex project and other setup state.

## Build and runtime

Use the Node version in `.nvmrc` and the pnpm version in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm build:cloudflare
pnpm preview:cloudflare
```

`pnpm build` and `pnpm start` remain ordinary Next.js commands. OpenNext requires
Next.js 16.4.5 or later in its current supported 16.x range; this app uses 16.4.6.
Next.js 16 `proxy.ts` support is experimental in OpenNext: test authentication in
the built Worker, not only in `next dev`.

`wrangler.jsonc` declares the Worker, static assets, its self-reference service,
and an Images binding to preserve `next/image` optimization. Confirm the target
account's Workers/Images limits and billing before deployment; this guide does not
authorize a plan upgrade. There is no new application database or R2 cache. Pages
read the session per request; do not add shared caching for authenticated HTML.
If renaming the Worker, update both `name` and the self-reference `service`.

For local preview, use the existing ignored `.env.local` configuration with local
callback/base URLs. OpenNext loads Next.js environment files for preview; do not
commit them or `.dev.vars` files. Never deploy a build made with smoke-test values.

## Configure the existing deployment

First record the active Vercel production commit, build command, variable names,
and any production-specific overrides. A failed recent deployment does not prove
which revision currently serves. Preserve any Convex deployment step separately;
`build:cloudflare` only builds the Next.js application.

Configure these in Cloudflare before the production build:

| Variable                          | Build    | Worker runtime   | Source                                     |
| --------------------------------- | -------- | ---------------- | ------------------------------------------ |
| `NEXT_PUBLIC_BASE_URL`            | Required | Set consistently | New public HTTPS origin, no trailing slash |
| `NEXT_PUBLIC_WORKOS_REDIRECT_URI` | Required | Set consistently | New origin plus `/callback`                |
| `WORKOS_CLIENT_ID`                | Required | Required         | Existing WorkOS environment                |
| `WORKOS_API_KEY`                  | Secret   | Secret           | Existing WorkOS environment                |
| `WORKOS_COOKIE_PASSWORD`          | Secret   | Secret           | Existing app value                         |
| `STRIPE_API_KEY`                  | Secret   | Secret           | Existing Stripe account and test/live mode |

Build variables and runtime variables are separate settings. `NEXT_PUBLIC_*`
values are compiled into the app and require a rebuild after changes. Transfer
secrets directly between the authenticated dashboards or the existing secret
manager, never through an issue, PR, chat, or tracked file. Do not prefix secrets
with `NEXT_PUBLIC_` or put them in Wrangler `vars`.

`CONVEX_DEPLOY_KEY` belongs only in a pipeline that runs the Convex deployment
CLI, not in the Worker runtime. Preserve that pipeline if the current Vercel build
command invokes it. The current app uses `NEXT_PUBLIC_BASE_URL`, not `BASE_URL`;
keep any old `BASE_URL` setting until the active revision and custom build command
confirm it is unused.

Retain additional variables found in Vercel when applicable (for example cookie
domain overrides). An old-domain cookie override must not carry over unchanged to
a new hostname. Keep Convex's environment and WorkOS webhook signing secret on
Convex; its existing `/workos-webhook` endpoint does not move with this app.

In the existing WorkOS environment, allow the new HTTPS `/callback` redirect and
update applicable sign-in/sign-out URLs. Keep the old URLs during verification.
The app's Stripe Checkout and billing-portal return URLs use
`NEXT_PUBLIC_BASE_URL`. Keep Stripe products, prices, WorkOS roles, and the
WorkOS–Stripe entitlements connection unchanged.

## Deploy without cutting over Vercel

Connect this GitHub repository to **Workers Builds** in the approved Cloudflare
account after the migration PR is merged. Use these commands:

- Build command: `pnpm build:cloudflare`
- Deploy command: `pnpm exec opennextjs-cloudflare deploy -- --keep-vars`

Set the build variables/secrets and the Worker runtime variables/secrets above.
The deploy command preserves ordinary variables entered in the dashboard.
Do not reuse CI smoke-test artifacts: rebuild with the real public origin.
For a configured local operator environment, `pnpm deploy:cloudflare` builds and
deploys in one command. Verify the selected account before deploying.

Start with the Worker's `workers.dev` hostname. Add a custom domain only after
verification and the DNS owner's approval. Version preview URLs are disabled;
use a separately configured Worker and test service environments for branch
previews so they cannot accidentally share production callbacks or billing state.
The GitHub compatibility workflow does not deploy or require cloud credentials.

## Verification and cutover

The `test:cloudflare` smoke test starts the built Worker on `127.0.0.1:8787` with
synthetic runtime credentials. Build with the matching synthetic environment from
`.github/workflows/cloudflare.yml` before running it. It checks public pages/assets,
AuthKit redirects/PKCE cookies, unauthenticated subscription protection, malformed
sessions, and callback state rejection. It never follows redirects to WorkOS or
Stripe and does not prove a real login, subscription, or webhook delivery.

Before retiring Vercel, verify on the new HTTPS hostname:

- Public homepage/pricing, assets, and optimized product images.
- Sign-up, sign-in, callback, session refresh, and sign-out.
- Admin/member separation, users, SSO settings, and audit logs.
- Test Checkout, return URL, refreshed entitlements, and billing portal.
- Continued WorkOS-to-Convex webhook deliveries and existing records.
- Repeat deployment preserves runtime configuration and continues serving.

Then update README/blog/demo links and retain Vercel for the agreed rollback
window. Users will need to sign in again on a different domain. A `vercel.app`
hostname cannot transfer to Cloudflare; any temporary redirect on it still relies
on Vercel. Do not delete the Vercel project, disconnect integrations, or remove old
redirects until the cutover and rollback decision is explicit.
