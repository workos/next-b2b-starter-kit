import { Box, Flex, Text, Heading } from '@radix-ui/themes';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';
import { DashboardContainer } from '../components/layout/dashboard-container';

export default async function DashboardPage() {
  const session = await withAuth({ ensureSignedIn: true });

  // This view is restricted to admins
  if (session.role !== 'admin') {
    return redirect('/product');
  }

  return (
    <Flex direction="column" gap="3" width="100%">
      <Box>
        <Heading>Dashboard</Heading>
      </Box>
      <DashboardContainer>
        <Text>Use this area to build your dashboard.</Text>
      </DashboardContainer>
    </Flex>
  );
}
