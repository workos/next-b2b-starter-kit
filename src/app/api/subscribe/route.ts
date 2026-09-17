import { stripe } from '../stripe';
import { workos } from '../workos';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  // The subscribing user comes from the session, never from the request body,
  // so a caller cannot create an organization on behalf of someone else.
  const { user } = await withAuth();

  if (!user) {
    return NextResponse.json({ error: 'You must be signed in to subscribe.' }, { status: 401 });
  }

  const { orgName, subscriptionLevel } = await req.json();

  if (typeof orgName !== 'string' || orgName.trim() === '' || typeof subscriptionLevel !== 'string') {
    return NextResponse.json({ error: 'Organization name and subscription level are required.' }, { status: 400 });
  }

  try {
    const organization = await workos.organizations.createOrganization({
      name: orgName,
    });

    await workos.userManagement.createOrganizationMembership({
      organizationId: organization.id,
      userId: user.id,
      roleSlug: 'admin',
    });

    // Retrieve price ID from Stripe
    // The Stripe look up key for the price *must* be the same as the subscription level string
    let price;

    try {
      price = await stripe.prices.list({
        lookup_keys: [subscriptionLevel],
      });
    } catch (error) {
      console.error(
        'Error retrieving price from Stripe. This is likely because the products and prices have not been created yet. Run the setup script `pnpm run setup` to automatically create them.',
        error,
      );
      return NextResponse.json({ error: 'Error retrieving price from Stripe' }, { status: 500 });
    }

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        workOSOrganizationId: organization.id,
      },
    });

    // Update WorkOS organization with Stripe customer ID
    // This will allow WorkOS to automatically add entitlements to the access token
    await workos.organizations.updateOrganization({
      organization: organization.id,
      stripeCustomerId: customer.id,
    });

    // Entitlements are provisioned onto the organization's access token by
    // WorkOS automatically (via the Stripe Entitlements integration) once the
    // Stripe customer ID is set on the org above. No app-side Stripe webhook is
    // required. We tag the success URL so /dashboard can refresh the session and
    // surface the new entitlements immediately instead of on the next login.
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      billing_address_collection: 'auto',
      line_items: [
        {
          price: price.data[0].id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    console.error(errorMessage, error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
