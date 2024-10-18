import PageContainer from '../components/layout/page-container';
import { Box, Text, Heading } from '@radix-ui/themes';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await withAuth({ ensureSignedIn: true });

  // This view is restricted to admins
  if (session.role !== 'admin') {
    return redirect('/product');
  }

  return (
    <PageContainer scrollable={true}>
      <Heading>Welcome to the Dashboard</Heading>
      <Box pt="2">
        <Text>Select a section from the sidebar to get started.</Text>
      </Box>
    </PageContainer>
  );
}
