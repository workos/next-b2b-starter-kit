import readline from 'node:readline';
import { exec } from 'node:child_process';
import { promises as fs } from 'node:fs';
import { promisify } from 'node:util';
import crypto from 'node:crypto';
import path from 'node:path';
import { WorkOS } from '@workos-inc/node';
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

async function checkStripeCLI() {
  console.log(`${chalk.bold('Step 1:')} Checking if Stripe CLI is installed and authenticated...`);
  try {
    await execAsync('stripe --version');
    console.log('Stripe CLI is installed.');

    // Check if Stripe CLI is authenticated
    try {
      await execAsync('stripe config --list');
      console.log('Stripe CLI is authenticated.');
    } catch (error) {
      console.log('Stripe CLI is not authenticated or the authentication has expired.');
      console.log('Please run: stripe login');
      const answer = await question('Have you completed the authentication? (y/n): ');
      if (answer.toLowerCase() !== 'y') {
        console.log('Please authenticate with Stripe CLI and run this script again.');
        process.exit(1);
      }

      // Verify authentication after user confirms login
      try {
        await execAsync('stripe config --list');
        console.log('Stripe CLI authentication confirmed.');
      } catch (error) {
        console.error('Failed to verify Stripe CLI authentication. Please try again.');
        process.exit(1);
      }
    }
  } catch (error) {
    console.error('Stripe CLI is not installed. Please install it and try again.');
    console.log('To install Stripe CLI, follow these steps:');
    console.log('1. Visit: https://docs.stripe.com/stripe-cli');
    console.log('2. Download and install the Stripe CLI for your operating system');
    console.log('3. After installation, run: stripe login');
    console.log('After installation and authentication, please run this setup script again.');
    process.exit(1);
  }
}

async function getStripeSecretKey(): Promise<string> {
  console.log('Step 2: Getting Stripe Secret Key');
  console.log('You can find your Stripe Secret Key at: https://dashboard.stripe.com/test/apikeys');
  return await question('Enter your Stripe Secret Key: ');
}

async function getWorkOSSecretKey(): Promise<string> {
  console.log('Step 3: Getting WorkOS API Keys');
  console.log('You can find your WorkOS API Key in the dashboard: https://dashboard.workos.com');
  return await question('Enter your WorkOS API Key: ');
}

async function getWorkOSClientId(): Promise<string> {
  console.log('Step 4: Getting WorkOS Client ID');
  console.log('You can find your WorkOS Client ID in the dashboard: https://dashboard.workos.com');
  return await question('Enter your WorkOS Client ID: ');
}

function generateAuthSecret(): string {
  console.log('Step 5: Generating WORKOS_COOKIE_PASSWORD...');
  return crypto.randomBytes(32).toString('hex');
}

async function setAuditLogSchema(workosApiKey: string) {
  console.log('Step 6: Creating audit log schema');
  console.log('Creating schema for "user.logged_in" event');

  const workos = new WorkOS(workosApiKey);

  try {
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

    console.log(`Created schema for "user.logged_in" event`);
  } catch (e) {
    console.log(chalk.red('Failed to create schema for "user.logged_in" event:'));
    console.log(e);
  }
}

async function promptRedirectURI() {
  console.log('Step 7: Set redirect URI in WorkOS dashboard');
  console.log(
    'Set the redirect URI to: http://localhost:3000/callback in the WorkOS dashboard in the "Redirects" section',
  );
  return await question('Hit enter after you have set the redirect URI');
}

async function promptRoleCreation() {
  console.log('Step 8: Create roles in WorkOS');
  console.log('Add the "Admin" role in the WorkOS dashboard in the "Roles" section');
  return await question('Hit enter after you have created the "Admin" role');
}

async function writeEnvFile(envVars: Record<string, string>) {
  console.log('Step 9: Writing environment variables to .env');
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  await fs.writeFile(path.join(process.cwd(), '.env.local'), envContent);
  console.log('.env.local file created with the necessary variables.');
}

async function main() {
  await checkStripeCLI();

  const STRIPE_API_KEY = await getStripeSecretKey();
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

  console.log('🎉 Setup completed successfully!');
}

main().catch(console.error);
