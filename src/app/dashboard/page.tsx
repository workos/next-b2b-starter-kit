import { Box, Flex, Text, Heading, Container, Section } from '@radix-ui/themes';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

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
      <Flex
        flexGrow="1"
        align="stretch"
        p="4"
        style={{ borderRadius: 'var(--radius-3)', backgroundColor: 'white', border: '1px solid var(--gray-3)' }}
        direction="column"
      >
        <Text>To get started, select an item from the sidebar.</Text>
      </Flex>
    </Flex>
  );
}
