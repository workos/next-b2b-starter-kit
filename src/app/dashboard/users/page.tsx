import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';

import { UsersManagement, WorkOsWidgets } from '@workos-inc/widgets';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { workos } from '../../api/workos';

export default async function Users() {
  const { user, organizationId } = await withAuth({ ensureSignedIn: true });

  if (!organizationId) {
    return (
      <Flex direction="column" gap="3" width="100%">
        <Box>
          <Heading>Users Management</Heading>
        </Box>
        <Card>
          <Text>No organization found</Text>
        </Card>
      </Flex>
    );
  }

  const authToken = await workos.widgets.getToken({
    organizationId,
    userId: user.id,
    scopes: ['widgets:users-table:manage'],
  });

  return (
    <Flex direction="column" gap="3" width="100%">
      <Box>
        <Heading>Users Management</Heading>
      </Box>
      <Flex
        flexGrow="1"
        align="stretch"
        p="4"
        style={{ borderRadius: 'var(--radius-3)', backgroundColor: 'white', border: '1px solid var(--gray-3)' }}
        direction="column"
      >
        <WorkOsWidgets>
          <UsersManagement authToken={authToken} />
        </WorkOsWidgets>
      </Flex>
    </Flex>
  );
}
