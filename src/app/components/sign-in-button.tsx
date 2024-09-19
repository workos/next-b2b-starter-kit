import { getSignInUrl, getUser, signOut } from '@workos-inc/authkit-nextjs';
import { Button, Flex, Avatar, Link } from '@radix-ui/themes';

export async function SignInButton({ large }: { large?: boolean }) {
  const { user } = await getUser();
  const authorizationUrl = await getSignInUrl();

  if (user) {
    return (
      <Flex gap="3" align="center">
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <Button type="submit" size={large ? '3' : '2'}>
            Sign Out
          </Button>
        </form>
        <a href="/dashboard">
          <Avatar
            size="2"
            src={user.profilePictureUrl as string}
            fallback={user.firstName?.[0] || ''}
          />
        </a>
      </Flex>
    );
  }

  return (
    <Button asChild size={large ? '3' : '2'}>
      <Link href={authorizationUrl}>Sign In</Link>
    </Button>
  );
}
