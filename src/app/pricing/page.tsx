import { Flex, Heading, Strong, Text } from '@radix-ui/themes';
import { Pricing } from '../components/pricing';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { SignInButton } from '../components/sign-in-button';

export default async function PricingPage() {
  const { user } = await withAuth();

  return (
    <Flex align="center" justify="center" direction="column" gap="5" flexGrow="1">
      <Heading size="9">Pricing</Heading>
      <Text>Every plan includes a 30-day trial.</Text>
      <Pricing />
      {!user && (
        <Flex direction="column" align="center" gap="3">
          <Text as="div" size="8">
            <Strong>Ready to get started?</Strong>
          </Text>
          <SignInButton large />
        </Flex>
      )}
    </Flex>
  );
}
