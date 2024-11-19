<p align="center">
  <img src="./public/splash_page.jpeg" alt="Screenshot of splash page"/>
  <h1 align="center">B2B Starter Kit</h1>
</p>

<p align="center">
  A fully functional B2B SaaS template built with Next.js, Stripe, Convex, and WorkOS.
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"/>
  </a>
  <a href="https://b2b-starter-kit.vercel.app/">
    <img src="https://img.shields.io/badge/Demo-Website-blue" alt="Demo: Website"/>
  </a>
</p>

<p align="center">
  Demo: <a href="https://b2b-starter-kit.vercel.app/">https://b2b-starter-kit.vercel.app/</a>
</p>

<p align="center">
  Read about the <a href="https://workos.com/blog/launch-week-fall-2024-day-5-b2b-starter-kit">B2B Starter Kit</a> on the WorkOS blog.
</p>

## Features

- Marketing splash page (`/`)
- Pricing page (`/pricing`) which allows signed in users to subscribe via Stripe Checkout
- Dashboard page (`/dashboard`) which is only accessible to admin users. Includes CRUD for users, audit logs and configuring SSO and billing
- Product page (`/product`) which is only accessible to signed in users
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

1. Clone the repo
2. Run `pnpm install` to install dependencies
3. Run `pnpm run setup` to set up the app
4. Run `pnpm run dev` to start the development server

## App flow

After viewing your marketing splash page (`/`) and pricing page (`/pricing`), users sign up before choosing a plan. This is so we can create an organization and link it to a Stripe customer.

Once signed up, users with the "admin" role can access the dashboard (`/dashboard`) where they can manage users, configure SSO and billing, and view audit logs. Note that in the default example, audit logs are only accessible when subscribed to the "Enterprise" plan.

Users without the "admin" role are instead redirected to the product page (`/product`) where they can view information about your product.

## Testing

When running locally or using the deployed [demo app](https://b2b-starter-kit.vercel.app/), use the following test card numbers for the Stripe Checkout flow:

- Card number: 4242 4242 4242 4242
- CVC: Any 3 digits
- Expiration Date: Any future date
- ZIP: Any 5 digits

## Deploying

Once you're ready to deploy your app, refer to the [Convex documentation](https://docs.convex.dev/production) for instructions on deploying to hosted solutions like Vercel.

Remember to use your production API keys for both Stripe and WorkOS before deploying to production.
