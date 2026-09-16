import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

/**
 * Returns the signed-in session, or redirects users without the admin role to
 * the product page. Every dashboard page and server action must call this
 * itself: server actions bypass layouts, and layouts do not re-render on
 * client-side navigation.
 */
export async function withAdminAuth() {
  const session = await withAuth({ ensureSignedIn: true });

  if (session.role !== 'admin') {
    redirect('/product');
  }

  return session;
}
