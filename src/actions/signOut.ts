'use server';

import { signOut as workosSignOut } from '@workos-inc/authkit-nextjs';

export default async function signOut() {
  await workosSignOut();
}
