import { DashboardContainer } from '@/app/components/layout/dashboard-container';
import { Box, Flex, Text, Heading } from '@radix-ui/themes';

export default function Users() {
  return (
    <Flex direction="column" gap="3" width="100%">
      <Box>
        <Heading>Users Management</Heading>
      </Box>
      <DashboardContainer>
        <Text>TODO: Add users table</Text>
      </DashboardContainer>
    </Flex>
  );
}
