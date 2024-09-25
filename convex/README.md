# Convex Setup

## Sign into Convex

```bash
npx convex login
```

## Create new project (on connect to existing)

```bash
npx convex dev
# follow prompts
```

This command will set up the development cloud deployment and insert variables into `.env.local` (if they don't already exist).

```env title=".env.local"
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=dev:some-project-123 # team: my-team, project: my-project

NEXT_PUBLIC_CONVEX_URL=https://some-project-123.convex.cloud
```

It will also create a new project in Convex if one doesn't already exist.
The `schema.ts` will be used to create empty `users` and `organizations` tables.

## Get get public API url from Convex

- Navigate to Convex _Project > Settings > URL & Deploy keys_
- Open the _Show deployment credentials_ section
- Copy the _HTTP Actions URL_

## Add a new Webhook to WorkOS

- Navigate to the _Webhooks_ page
- Click _Create Webhook_
- Paste the _HTTP Actions URL_ from the previous step into the _URL_ field and append `/workos-webhook`
- Enable the events you'd like to receive
- Click _Create Webhook_

_As of right now, the `workos-webhook` (located in `convex/http.ts`) only supports `user.created` and `organization.created` events._

## Set the new WorkOS webhook's Signing Secret as a deployment variable in Convex

```bash
npx convex env set WORKOS_WEBHOOK_SECRET <secret>
```

## Set the WorkOS API key as a deployment variable in Convex

```bash
npx convex env set WORKOS_API_KEY <api-key>
```
