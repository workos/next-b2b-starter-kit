'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { refreshAuthkitSession } from '@/actions/refreshAuthkitSession';

// After a successful Stripe checkout, refresh the AuthKit session so the
// entitlements WorkOS just provisioned appear in the access token now, rather
// than on the user's next login/natural refresh. `refreshAuthkitSession` sets
// cookies, so it must run from a client-triggered server action rather than
// during the dashboard's server render.
export function CheckoutSuccessRefresh() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      try {
        await refreshAuthkitSession();
      } catch {
        // If the refresh fails, still drop the marker below so we don't retry on
        // every page load. The entitlements will appear on the next natural
        // session refresh.
      }
      if (cancelled) return;

      // Drop the ?checkout=success marker and re-render with fresh entitlements.
      router.replace('/dashboard');
      router.refresh();
    };

    refresh();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}
