import { stripe } from '../stripe';
import { workos } from '../workos';
import { NextRequest, NextResponse } from 'next/server';
import { DomainDataState } from '@workos-inc/node';

export const POST = async (req: NextRequest) => {
  const { userId, orgName, domain, subscriptionLevel } = await req.json();

  try {
    const organization = await workos.organizations.createOrganization({
      name: orgName,
      domainData: [
        {
          domain: domain,
          state: 'pending' as DomainDataState,
        },
      ],
    });

    await workos.userManagement.createOrganizationMembership({
      organizationId: organization.id,
      userId,
      roleSlug: 'admin',
    });

    // TODO: Store the org ID on the user here

    // Retrieve price ID from Stripe
    // The Stripe look up key for the price *must* be the same as the subscription level string
    const price = await stripe.prices.list({
      lookup_keys: [subscriptionLevel],
    });

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: price.data[0].id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'http://localhost:3000/router',
      cancel_url: 'http://localhost:3000/pricing',
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};
