import { getSession, refreshSession } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';
import { workos } from '../api/workos';

export const GET = async () => {
  let session = await getSession();

  // If this is a new user who just subscribed, their role won't have been updated
  // so we need to refresh the session to get the updated role
  if (session && !session.role) {
    // Get the user's organization memberships so we can extract the org ID
    const oms = await workos.userManagement.listOrganizationMemberships({
      userId: session.user?.id,
    });

    if (oms.data.length > 0) {
      session = await refreshSession({
        organizationId: oms.data[0].organizationId,
        ensureSignedIn: true,
      });
    }
  }

  const role = session?.role;

  // Redirect based on the user's role
  switch (role) {
    case 'admin':
      return redirect('/dashboard');
      break;

    case 'member':
      return redirect('/product');
      break;

    default:
      // If there's no role that means the user hasn't subscribed yet, so redirect them to the pricing page
      return redirect('/pricing');
      break;
  }
};
