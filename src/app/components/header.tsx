import { Box, Flex, Link, Text } from '@radix-ui/themes';
import { SignInButton } from './sign-in-button';

export async function Header() {
  return (
    <Box position="absolute" right="5" top="5">
      <Flex gap="3" align="center">
        <Link href="/pricing">
          <Text>Pricing</Text>
        </Link>
        <SignInButton />
      </Flex>
    </Box>
  );
}
