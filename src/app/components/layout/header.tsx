import { Box, Flex, Link, Text } from '@radix-ui/themes';
import { UserNav } from './user-nav';
import ThemeToggle from './theme-toggle';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { SignInButton } from '../sign-in-button';
import { Logo } from '../logo';

export async function Header() {
  const { user, role } = await withAuth();

  return (
    <Flex direction="row" justify="between" pb="4" pt="4">
      <Box pl="9">
        <Link href="/">
          <Logo />
        </Link>
      </Box>
      <Box pr="9">
        <Flex gap="3" align="center">
          {!user && (
            <>
              <Link href="/pricing">
                <Text>Pricing</Text>
              </Link>
              <SignInButton />
              <ThemeToggle />
            </>
          )}
          {user && (
            <>
              {!role && (
                <Link href="/pricing">
                  <Text>Pricing</Text>
                </Link>
              )}
              <ThemeToggle />
              <UserNav user={user} role={role} />
            </>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
