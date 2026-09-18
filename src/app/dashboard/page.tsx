import { Box, Flex, Text, Heading } from '@radix-ui/themes';
import { withAdminAuth } from '@/lib/with-admin-auth';
import { DashboardContainer } from '../components/layout/dashboard-container';
import { CheckoutSuccessRefresh } from './checkout-success-refresh';

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ checkout?: string }> }) {
  await withAdminAuth();

  const { checkout } = await searchParams;

  return (
    <Flex direction="column" gap="3" width="100%">
      {checkout === 'success' && <CheckoutSuccessRefresh />}
      <Box>
        <Heading>Dashboard</Heading>
      </Box>
      <DashboardContainer>
        <Text>Use this area to build your dashboard.</Text>
      </DashboardContainer>
    </Flex>
  );
}
