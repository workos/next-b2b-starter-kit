import { Flex, Heading, Strong, Text } from '@radix-ui/themes';
import { Pricing } from '../components/pricing';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { SignInButton } from '../components/sign-in-button';

export default async function PricingPage() {
  const { user } = await withAuth();

  return (
    <Flex align="center" justify="center" direction="column" gap="5" flexGrow="1">
      <Heading size="9">Pricing</Heading>
      <Text mb="6">Your application&apos;s pricing page. The Next.js B2B Starter Kit is free to use.</Text>
      <Pricing />
      {!user && (
        <Flex mt="6" direction="column" align="center" gap="3">
          <Text as="div" size="8">
            <Strong>Ready to get started?</Strong>
          </Text>
          <SignInButton large signUp />
        </Flex>
      )}
    </Flex>
  );
}
