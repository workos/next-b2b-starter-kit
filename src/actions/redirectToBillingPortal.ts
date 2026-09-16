'use server';

import { redirect } from 'next/navigation';
import { stripe } from '../app/api/stripe';
import { workos } from '@/app/api/workos';
import { withAdminAuth } from '@/lib/with-admin-auth';

export default async function redirectToBillingPortal(path: string) {
  const { organizationId } = await withAdminAuth();

  const response = await fetch(`${workos.baseURL}/organizations/${organizationId}`, {
    headers: {
      'Authorization': `Bearer ${process.env.WORKOS_API_KEY}`,
      'content-type': 'application/json',
    },
  });
  const workosOrg = await response.json();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const billingPortalSession = await stripe.billingPortal.sessions.create({
    customer: workosOrg?.stripe_customer_id,
    return_url: `${baseUrl}/dashboard/${path}`,
  });

  redirect(billingPortalSession?.url);
}
