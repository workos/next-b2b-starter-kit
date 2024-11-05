import { Box, Flex, Text, Heading } from '@radix-ui/themes';

export default function Users() {
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
        <Text>TODO: Add users table</Text>
      </Flex>
    </Flex>
  );
}
