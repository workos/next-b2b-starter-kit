import { Flex, Text } from '@radix-ui/themes';
import { SignInButton } from './sign-in-button';

export async function Header() {
  return (
    <Flex gap="3">
      <Text>Pricing</Text>
      <SignInButton />
    </Flex>
  );
}
