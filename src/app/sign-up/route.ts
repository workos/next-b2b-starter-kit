import { getSignUpUrl } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

export async function GET() {
  const signUpUrl = await getSignUpUrl();
  return redirect(signUpUrl);
}
