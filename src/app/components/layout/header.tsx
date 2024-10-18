import { Box, Flex, Link, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { UserNav } from './user-nav';
import ThemeToggle from './ThemeToggle/theme-toggle';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { SignInButton } from '../sign-in-button';

export async function Header() {
  const { user, role } = await withAuth();

  return (
    <Flex direction="row" justify="between" width="100vw" pb="4" pt="4">
      <Box pl="9">
        <Link href="/">
          <Image src="/logos/superapp_logo.svg" className="logo" alt="SuperApp logo" width={144} height={24} />
        </Link>
      </Box>
      <Box pr="9">
        <Flex gap="3" align="center">
          {!user && !role && (
            <>
              <Link href="/pricing">
                <Text>Pricing</Text>
              </Link>
              <SignInButton />
            </>
          )}
          {user && role && (
            <>
              <ThemeToggle />
              <UserNav user={user} role={role} />
            </>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
