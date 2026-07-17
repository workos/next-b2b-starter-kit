import { Box, Flex, Text, Heading } from '@radix-ui/themes';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';
import { DashboardContainer } from '../components/layout/dashboard-container';
import { CheckoutSuccessRefresh } from './checkout-success-refresh';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const session = await withAuth({ ensureSignedIn: true });

  // This view is restricted to admins
  if (session.role !== 'admin') {
    return redirect('/product');
  }

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
