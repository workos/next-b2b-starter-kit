import readline from 'node:readline';
import { exec } from 'node:child_process';
import { promises as fs } from 'node:fs';
import { promisify } from 'node:util';
import crypto from 'node:crypto';
import path from 'node:path';
import { WorkOS } from '@workos-inc/node';
import Stripe from 'stripe';
import chalk from 'chalk';

const execAsync = promisify(exec);

function question(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    }),
  );
}

async function getStripeSecretKey(): Promise<string> {
  console.log(`\n${chalk.bold('Step 1:')} Getting Stripe Secret Key`);
  console.log('You can find your Stripe Secret Key at: https://dashboard.stripe.com/test/apikeys');
  return await question('Enter your Stripe Secret Key: ');
}

async function generateStripeProducts(stripeApiKey: string) {
  const answer = await question('\nDo you want to generate Stripe test mode products? (y/n): ');
  if (answer.toLowerCase() !== 'y') {
    return;
  }

  const stripe = new Stripe(stripeApiKey);

  console.log('\nGenerating Stripe test mode products and prices...');

  try {
    await stripe.prices.create({
      currency: 'usd',
      unit_amount: 500,
      recurring: {
        interval: 'month',
      },
      product_data: {
        name: 'Basic',
      },
      lookup_key: 'basic',
    });

    await stripe.prices.create({
      currency: 'usd',
      unit_amount: 1000,
      recurring: {
        interval: 'month',
      },
      product_data: {
        name: 'Standard',
      },
      lookup_key: 'standard',
    });

    const enterprisePrice = await stripe.prices.create({
      currency: 'usd',
      unit_amount: 10000,
      recurring: {
        interval: 'month',
      },
      product_data: {
        name: 'Enterprise',
      },
      lookup_key: 'enterprise',
    });

    const auditLogsFeature = await stripe.entitlements.features.create({
      name: 'Audit logs',
      lookup_key: 'audit-logs',
    });

    await stripe.products.createFeature(enterprisePrice.product as string, {
      entitlement_feature: auditLogsFeature.id,
    });

    console.log(chalk.green('Stripe test mode products and prices generated successfully'));
  } catch (error) {
    console.log(chalk.red(`Failed to generate Stripe test mode prices: ${error}`));
    process.exit(1);
  }
}

async function getWorkOSSecretKey(): Promise<string> {
  console.log(`\n${chalk.bold('Step 2:')} Getting WorkOS API Keys`);
  console.log('You can find your WorkOS API Key in the dashboard: https://dashboard.workos.com');
  return await question('Enter your WorkOS API Key: ');
}

async function getWorkOSClientId(): Promise<string> {
  console.log(`\n${chalk.bold('Step 3:')} Getting WorkOS Client ID`);
  console.log('You can find your WorkOS Client ID in the dashboard: https://dashboard.workos.com');
  return await question('Enter your WorkOS Client ID: ');
}

function generateAuthSecret(): string {
  console.log(`\n${chalk.bold('Step 4:')} Generating WORKOS_COOKIE_PASSWORD`);
  return crypto.randomBytes(32).toString('hex');
}

async function setAuditLogSchema(workosApiKey: string) {
  console.log(`\n${chalk.bold('Step 5:')} Creating audit log schema`);
  console.log('Creating schema for "user.logged_in" event');

  try {
    const workos = new WorkOS(workosApiKey);
    await workos.auditLogs.createSchema({
      action: 'user.logged_in',
      actor: {
        metadata: {
          role: 'string',
        },
      },
      targets: [
        {
          type: 'user',
        },
      ],
    });

    console.log(chalk.green('Created schema for "user.logged_in" event'));
  } catch (error) {
    console.log(chalk.red('Failed to create schema for "user.logged_in" event:'));
    console.log(error);
  }
}

async function promptRedirectURI() {
  console.log(`\n${chalk.bold('Step 6:')} Set redirect URI in WorkOS dashboard`);
  console.log(
    'Set the redirect URI to: http://localhost:3000/callback in the WorkOS dashboard in the "Redirects" section',
  );
  return await question('Hit enter after you have set the redirect URI');
}

async function promptRoleCreation() {
  console.log(`\n${chalk.bold('Step 7:')}  Create roles in WorkOS`);
  console.log('Add the "Admin" role in the WorkOS dashboard in the "Roles" section');
  return await question('Hit enter after you have created the "Admin" role');
}

async function writeEnvFile(envVars: Record<string, string>) {
  console.log(`\n${chalk.bold('Step 8:')} Writing environment variables to .env`);
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  await fs.writeFile(path.join(process.cwd(), '.env.local'), envContent);
  console.log('.env.local file created with the necessary variables.');
}

async function setupConvex() {
  console.log(`\n${chalk.bold('Step 9:')} Setting up Convex`);

  try {
    await execAsync('npx convex login');
    console.log(chalk.green('Logged into Convex'));
  } catch (error) {
    console.log(chalk.red('Failed to log into Convex'));
    console.log(error);
    process.exit(1);
  }

  const projectName = await question('\nEnter a name for your Convex project: ');

  try {
    console.log('Creating new Convex project...');
    await execAsync(`npx convex dev --once --configure=new --project=${projectName}`);
    console.log(chalk.green('Created new Convex project'));
  } catch (error) {
    console.log(chalk.red('Failed to create new Convex project or connect to existing one'));
    console.log(error);
    process.exit(1);
  }
}

async function setupStripeWebhook(stripeApiKey: string, webhookUrl: string) {
  console.log(`\n${chalk.bold('Step 10:')} Setting up Stripe webhooks`);

  const stripe = new Stripe(stripeApiKey);

  try {
    const endpoint = await stripe.webhookEndpoints.create({
      enabled_events: ['checkout.session.completed'],
      url: webhookUrl,
    });

    console.log(chalk.green('Stripe webhook created successfully'));

    console.log('\nAdding Stripe endpoint secret as deployment variable in Convex');
    await execAsync(`npx convex env set STRIPE_WEBHOOK_SECRET ${endpoint.secret}`);
    console.log(chalk.green('Stripe endpoint secret set as deployment variable in Convex'));
  } catch (error) {
    console.log(chalk.red('Failed to create Stripe webhook'));
    console.log(error);
    process.exit(1);
  }
}

async function setupWorkOSWebhook(workosApiKey: string, webhookUrl: string) {
  console.log(`\n${chalk.bold('Step 11:')} Setting up WorkOS webhook`);

  console.log('Add a new webhook to WorkOS:');
  console.log(`1. Navigate to the ${chalk.bold('Webhooks')} page in the WorkOS dashboard`);
  console.log(`2. Click ${chalk.bold('Create Webhook')}`);
  console.log(`3. Paste the following URL into the ${chalk.bold('URL')} field: ${webhookUrl}`);
  console.log(
    `4. Enable the following events: user.created, user.updated, user.deleted, organization.created, organization.deleted`,
  );
  console.log(`5. Click ${chalk.bold('Create Webhook')}`);
  console.log('Copy the webhook secret and enter it here:');

  const workOSWebhookSecret = await question('WorkOS webhook secret: ');

  try {
    console.log('\nSetting WorkOS webhook signing secret as deployment variable in Convex');
    await execAsync(`npx convex env set WORKOS_WEBHOOK_SECRET ${workOSWebhookSecret}`);
    console.log(chalk.green('WorkOS webhook signing secret set as deployment variable in Convex'));
  } catch (error) {
    console.log(chalk.red('Failed to set WorkOS webhook signing secret as deployment variable in Convex'));
    console.log(error);
    process.exit(1);
  }

  try {
    console.log('\nSetting WorkOS API key as deployment variable in Convex');
    await execAsync(`npx convex env set WORKOS_API_KEY ${workosApiKey}`);
    console.log(chalk.green('WorkOS API key set as deployment variable in Convex'));
  } catch (error) {
    console.log(chalk.red('Failed to set WorkOS API key as deployment variable in Convex'));
    console.log(error);
    process.exit(1);
  }
}

async function main() {
  const STRIPE_API_KEY = await getStripeSecretKey();

  await generateStripeProducts(STRIPE_API_KEY);

  const WORKOS_API_KEY = await getWorkOSSecretKey();
  const WORKOS_CLIENT_ID = await getWorkOSClientId();
  const NEXT_PUBLIC_WORKOS_REDIRECT_URI = 'http://localhost:3000/callback';
  const WORKOS_COOKIE_PASSWORD = generateAuthSecret();

  await setAuditLogSchema(WORKOS_API_KEY);

  await promptRedirectURI();
  await promptRoleCreation();
  await writeEnvFile({
    STRIPE_API_KEY,
    WORKOS_API_KEY,
    WORKOS_CLIENT_ID,
    NEXT_PUBLIC_WORKOS_REDIRECT_URI,
    WORKOS_COOKIE_PASSWORD,
  });

  // read from .env.local and extract the NEXT_PUBLIC_CONVEX_URL
  const env = await fs.readFile(path.join(process.cwd(), '.env.local'), 'utf8');
  const convexUrl = env.match(/NEXT_PUBLIC_CONVEX_URL=(.*)/)?.[1];
  const webhookUrl = convexUrl?.replace('.cloud', '.site') + '/workos-webhook';

  await setupConvex();
  await setupStripeWebhook(STRIPE_API_KEY, webhookUrl);
  await setupWorkOSWebhook(WORKOS_API_KEY, webhookUrl);

  console.log('\n🎉 Setup completed successfully!');
  console.log('You can now start the development server with: pnpm run dev');
}

main().catch(console.error);
