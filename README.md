# B2B Starter Kit

A fully functional B2B SaaS template built with Next.js, Stripe, Convex, and WorkOS.

## Features

- Marketing splash page (`/`)
- Pricing page (`/pricing`) which allows signed in users to subscribe via Stripe Checkout
- Dashboard page (`/dashboard`) which is only accessible to admin users. Includes CRUD for users, audit logs and configuring SSO and billing.
- Role-based access control
- Audit logs
- Billing
- Webhook syncing to Convex

## Tech stack

- Framework: Next.js
- Database: Convex
- Authentication: AuthKit by WorkOS
- Payments: Stripe

## Getting Started

### Setup

```
npx github:workos-inc/b2b-starter-kit@latest setup
```

1. Clone the repo
2. Run `pnpm install` to install dependencies
3. Run `pnpm run setup` to set up the app
4. Run `pnpm run dev` to start the development server
