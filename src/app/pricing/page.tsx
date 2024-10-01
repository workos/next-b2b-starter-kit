import { Flex, Heading } from '@radix-ui/themes';
import { Pricing } from '../components/pricing';

export default async function PricingPage() {
  return (
    <Flex align="center" justify="center" direction="column" gap="5" height="100vh">
      <Heading size="9">Pricing</Heading>
      <Pricing />
    </Flex>
  );
}
