import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';
import { cache } from 'react';

/**
 * Every dashboard page and server action must call this itself: server
 * actions bypass layouts, and layouts do not re-render on client-side
 * navigation.
 *
 * Wrapped in React's `cache` so the layout and the page share one session
 * decode per request instead of each unsealing the cookie again.
 */
export const withAdminAuth = cache(async () => {
  const session = await withAuth({ ensureSignedIn: true });

  if (session.role !== 'admin') {
    redirect('/product');
  }

  return session;
});
