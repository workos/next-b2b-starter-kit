import { getSignInUrl, getUser, signOut } from '@workos-inc/authkit-nextjs';
import { Button, Flex } from '@radix-ui/themes';
import * as Avatar from '@radix-ui/react-avatar';

export async function SignInButton({ large }: { large?: boolean }) {
  const { user } = await getUser();
  const authorizationUrl = await getSignInUrl();

  if (user) {
    return (
      <Flex gap="3">
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
        <Avatar.Root>
          <Avatar.Image
            src={user.profilePictureUrl as string}
            alt={`${user.firstName} ${user.lastName}`}
          />
          <Avatar.Fallback delayMs={600}>
            {user.firstName?.[0] ?? ''}
            {user.lastName?.[0] ?? ''}
          </Avatar.Fallback>
        </Avatar.Root>
      </Flex>
    );
  }

  return (
    <Button asChild size={large ? '3' : '2'}>
      <a href={authorizationUrl}>Sign In</a>
    </Button>
  );
}
