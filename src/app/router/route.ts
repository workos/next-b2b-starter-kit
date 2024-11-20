import { getSession, refreshSession } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';
import { workos } from '../api/workos';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  let session = await getSession();

  if (!session) {
    return redirect('/pricing');
  }

  // If this is a new user who just subscribed, their role won't have been updated
  // so we need to refresh the session to get the updated role
  if (session && !session.role) {
    // Get the user's organization memberships so we can extract the org ID
    const oms = await workos.userManagement.listOrganizationMemberships({
      userId: session.user?.id,
    });

    if (oms.data.length > 0) {
      // @ts-expect-error will be fixed in the next version of @workos-inc/authkit-nextjs
      session = await refreshSession({
        organizationId: oms.data[0].organizationId,
        ensureSignedIn: true,
      });
    }
  }

  if (session && session.organizationId) {
    // Create a new audit log entry
    await workos.auditLogs.createEvent(session.organizationId, {
      action: 'user.logged_in',
      occurredAt: new Date(),
      actor: {
        type: 'user',
        id: session.user?.id,
        name: session.user?.firstName + ' ' + session.user?.lastName,
        metadata: {
          role: session.role as string,
        },
      },
      targets: [
        {
          type: 'user',
          id: session.user?.id,
          name: session.user?.firstName + ' ' + session.user?.lastName,
        },
      ],
      context: {
        location: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      },
      metadata: {},
    });
  }

  const role = session?.role;

  // Redirect based on the user's role
  switch (role) {
    case 'admin':
      return redirect('/dashboard');

    case 'member':
      return redirect('/product');

    default:
      // If there's no role that means the user hasn't subscribed yet, so redirect them to the pricing page
      return redirect('/pricing');
  }
};
