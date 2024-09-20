import { Flex, Heading } from '@radix-ui/themes';
import StripePricingTable from '../components/stripe-pricing-table';

export default function PricingPage() {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      gap="5"
      height="100vh"
    >
      <Heading size="9">Pricing</Heading>
      <StripePricingTable />
    </Flex>
  );
}
