'use server';

import { signOut as workosSignOut, withAuth } from '@workos-inc/authkit-nextjs';
import { workos } from '../app/api/workos';
import { headers } from 'next/headers';

export default async function signOut() {
  const { organizationId, user } = await withAuth();

  // get headers from next request
  const requestHeaders = await headers();

  // Create an audit log entry if the user is in an organization
  if (organizationId) {
    await workos.auditLogs.createEvent(organizationId, {
      action: 'user.logged_out',
      occurredAt: new Date(),
      actor: {
        type: 'user',
        id: user?.id,
        name: user?.firstName + ' ' + user?.lastName,
      },
      targets: [
        {
          type: 'user',
          id: user?.id,
        },
      ],
      context: {
        location: requestHeaders.get('x-forwarded-for') || requestHeaders.get('x-real-ip') || 'unknown',
      },
      metadata: {},
    });
  }

  await workosSignOut();
}
