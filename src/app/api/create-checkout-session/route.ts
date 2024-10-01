import Stripe from 'stripe';
import { workos } from '../workos';
import { NextRequest, NextResponse } from 'next/server';
import { DomainDataState } from '@workos-inc/node';

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

export const GET = async (req: NextRequest, res: NextResponse) => {
  const { userId, orgName, domain } = await req.json();

  console.log(userId, orgName, domain);

  // const orgMemberships = await workos.userManagement.listOrganizationMemberships({
  //   userId,
  // });

  // let organization;

  // // if there are no org memberships, create a new organization
  // if (!orgMemberships.data.length) {
  //   organization = await workos.organizations.createOrganization({
  //     name: orgName,
  //     domainData: [{
  //       domain: domain,
  //       state: 'pending' as DomainDataState,
  //     }]
  //   });

  //   await workos.userManagement.createOrganizationMembership({
  //     organizationId: organization.id,
  //     userId,
  //     roleSlug: 'admin',
  //   });
  // } else {
  //   organization = orgMemberships.data[0];
  // }

  // const session = await stripe.checkout.sessions.create({

  // })
};
