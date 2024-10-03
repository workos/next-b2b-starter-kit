import { Flex, Heading, Strong, Text } from '@radix-ui/themes';
import { Pricing } from '../components/pricing';
import { Header } from '../components/layout/header';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { SignInButton } from '../components/sign-in-button';

export default async function PricingPage() {
  const { user } = await withAuth();

  return (
    <Flex align="center" justify="center" direction="column" gap="5" height="100vh">
      <Header signedIn={user !== null} />
      <Heading size="9">Pricing</Heading>
      <Pricing />
      {!user && (
        <Flex align="center" justify="center" gap="2">
          <SignInButton large />
          <Text size="5">
            <Strong>to subscribe to a plan</Strong>
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
