import { authkitProxy } from '@workos-inc/authkit-nextjs';

// Redirect signed-out visitors to AuthKit before any page renders. Without this,
// withAuth({ ensureSignedIn: true }) has to start the sign-in flow during a
// Server Component render, where it cannot set the PKCE cookie and throws.
export default authkitProxy({
  middlewareAuth: {
    enabled: true,
    // Every other matched path requires a session.
    unauthenticatedPaths: ['/', '/pricing', '/sign-in', '/sign-up', '/callback', '/router'],
  },
});

// Match against pages that require auth
// Static assets are excluded so signed-out visitors can still load logos and images.
export const config = {
  matcher: [
    '/',
    '/pricing',
    '/dashboard/:path*',
    '/product',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:css|svg|png|jpe?g|gif|webp|ico|woff2?)$).*)',
  ],
};
