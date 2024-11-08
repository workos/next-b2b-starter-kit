'use server';

import { redirect } from 'next/navigation';
import { stripe } from '../app/api/stripe';
import { workos } from '@/app/api/workos';
import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function redirectToBillingPortal(path: string) {
  const { organizationId } = await withAuth();

  const response = await fetch(`${workos.baseURL}/organizations/${organizationId}`, {
    headers: {
      'Authorization': `Bearer ${process.env.WORKOS_API_KEY}`,
      'content-type': 'application/json',
    },
  });
  const workosOrg = await response.json();

  console.log('workosOrg', workosOrg);

  const baseUrl = process.env.BASE_URL || 'https://erc-demo-app.vercel.app';
  const billingPortalSession = await stripe.billingPortal.sessions.create({
    customer: workosOrg?.stripe_customer_id,
    return_url: `${baseUrl}/dashboard/${path}`,
  });

  redirect(billingPortalSession?.url);
}