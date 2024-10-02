import { Flex, Heading, Strong, Text } from '@radix-ui/themes';
import { Pricing } from '../components/pricing';
import { Header } from '../components/layout/header';
import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function PricingPage() {
  const { user } = await withAuth();

  return (
    <Flex align="center" justify="center" direction="column" gap="5" height="100vh">
      <Header />
      <Heading size="9">Pricing</Heading>
      <Pricing />
      {!user && (
        <Text size="5">
          <Strong>Sign in to subscribe to a plan</Strong>
        </Text>
      )}
    </Flex>
  );
}
