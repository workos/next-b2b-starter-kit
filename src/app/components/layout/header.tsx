import { Box, Flex, Link, Text } from '@radix-ui/themes';
import { SignInButton } from '../sign-in-button';
import Image from 'next/image';

export async function Header({ signedIn = false }: { signedIn?: boolean }) {
  return (
    <Box>
      <Box position="absolute" left="5" top="5">
        <Box as="div">
          <Link href="/">
            <Image src="/superapp_logo.svg" alt="SuperApp logo" width={144} height={24} />
          </Link>
        </Box>
      </Box>
      <Box position="absolute" right="5" top="5">
        <Flex gap="3" align="center">
          {!signedIn && (
            <Link href="/pricing">
              <Text>Pricing</Text>
            </Link>
          )}
          <SignInButton />
        </Flex>
      </Box>
    </Box>
  );
}
