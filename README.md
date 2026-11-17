<p align="center">
  <h1 align="center">Next.js B2B Starter Kit</h1>
</p>

<p align="center">
  A fully functional B2B SaaS template built with Next.js, Stripe, Convex, and WorkOS.
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"/>
  </a>
</p>

Read about the [Next.js B2B Starter Kit](https://workos.com/blog/nextjs-b2b-starter-kit) on the WorkOS blog.

## Features

- Marketing splash page (`/`)
- Pricing page (`/pricing`) which allows signed-in users to subscribe via Stripe Checkout
- Dashboard page (`/dashboard`) which is only accessible to admin users. Includes user management, audit logs, SSO settings, and billing
- Product page (`/product`) which is only accessible to signed-in users
- Role-based access control
- Webhook syncing to Convex

Entitlement sync is handled by WorkOS via the [Stripe integration](https://workos.com/docs/authkit/add-ons/stripe). The app [refreshes the session](https://workos.com/docs/user-management/entitlements) after Checkout so new entitlements appear in the access token. No app-side Stripe webhook is required for entitlements.

## Run the example locally

### Prerequisites

- The Node.js version specified in `.nvmrc` and pnpm.
- Your own [WorkOS](https://workos.com/) development environment and [Stripe](https://stripe.com/) test-mode account. Authentication and billing use real service APIs; this is not an offline mock.
- A [Convex](https://www.convex.dev/) development project only if you want to use the optional webhook-sync example.

### Install and configure

```bash
git clone https://github.com/workos/next-b2b-starter-kit.git
cd next-b2b-starter-kit
pnpm install --frozen-lockfile
cp .env.example .env.local
```

Fill in `.env.local` with your own development credentials. Never commit this file or use production credentials for local testing.

| Variable                          | Local value                                           |
| --------------------------------- | ----------------------------------------------------- |
| `WORKOS_API_KEY`                  | Your WorkOS development API key                       |
| `WORKOS_CLIENT_ID`                | The matching WorkOS client ID                         |
| `WORKOS_COOKIE_PASSWORD`          | A randomly generated secret of at least 32 characters |
| `STRIPE_API_KEY`                  | Your Stripe test-mode secret key                      |
| `NEXT_PUBLIC_BASE_URL`            | `http://localhost:3000`                               |
| `NEXT_PUBLIC_WORKOS_REDIRECT_URI` | `http://localhost:3000/callback`                      |

You can generate the cookie password locally with `openssl rand -base64 32`. Keep all secrets unprefixed: only the two public URLs use `NEXT_PUBLIC_`.

### Configure the example's service prerequisites

These settings belong in your own development/test accounts; there is no setup script that creates them for you.

- **WorkOS authentication:** configure [AuthKit for Next.js](https://workos.com/docs/authkit/nextjs) with `http://localhost:3000/callback` as an allowed redirect URI, `http://localhost:3000/sign-in` as the Initiate login URI, and `http://localhost:3000` as the Sign-out URI. Create an `admin` role; dashboard routes and actions require that role.
- **Stripe billing:** create test-mode products and recurring prices with lookup keys `basic`, `standard`, and `enterprise`, matching the plans in `src/app/components/pricing.tsx`. Configure the Stripe customer portal for billing management.
- **Entitlements:** connect Stripe to your WorkOS development environment using the [Stripe integration](https://workos.com/docs/authkit/add-ons/stripe). Create the Stripe entitlement feature `audit-logs` and attach it to the Enterprise product to enable the audit-log screen.
- **Audit logs:** configure schemas for `user.logged_in` and `user.logged_out`. Both use actor metadata with a `role` string and a target of type `user`; see `src/app/router/route.ts` and `src/actions/signOut.ts` for the event payloads.

### Start the application

```bash
pnpm dev
```

Open `http://localhost:3000`. This starts Next.js only; it does not start or configure Convex. Signing up, subscribing, and using the app can write data to the development services you configured.

The generic `pnpm build` and `pnpm start` commands are also available to build and run the example locally. They do not publish it to a hosting provider. Set the environment variables before building; Next.js compiles the `NEXT_PUBLIC_*` values into the build.

## Optional Convex webhook example

The `convex/` directory demonstrates syncing WorkOS users and organizations. The Next.js app uses WorkOS and Stripe directly, so Convex sync is not required to run the frontend.

If adapting this example to your own Convex development project, `convex/http.ts` handles `POST /workos-webhook` for `user.created`, `user.updated`, `user.deleted`, `organization.created`, `organization.updated`, and `organization.deleted`. Its verification action reads `WORKOS_API_KEY` and `WORKOS_WEBHOOK_SECRET` from the Convex environment, separately from the Next.js `.env.local` file. Point a webhook from your own WorkOS development environment at that handler and use its matching signing secret.

For background on the integration, watch the [webhook-sync video series](https://youtu.be/GGwBSu0XmP0?feature=shared).

## App flow

After viewing the splash page and pricing, users sign up before choosing a plan. A subscription creates a WorkOS organization and links it to a Stripe customer.

Users with the `admin` role can access the dashboard to manage users, configure SSO and billing, and view audit logs. Audit logs require the `audit-logs` entitlement. Users without the `admin` role are redirected to `/product`.

## Testing

Use Stripe **test mode** when trying Checkout locally:

- Card number: 4242 4242 4242 4242
- CVC: Any 3 digits
- Expiration date: Any future date
- ZIP: Any 5 digits

Run `pnpm lint` and `pnpm exec tsc --noEmit` to check the example's source.
