import { Heading, Flex, Box, Text } from '@radix-ui/themes';

export default function AuditLogs() {
  return (
    <Flex direction="column" gap="3" width="100%">
      <Box>
        <Heading>Audit Logs</Heading>
      </Box>
      <Flex
        flexGrow="1"
        align="stretch"
        p="4"
        style={{ borderRadius: 'var(--radius-3)', backgroundColor: 'white', border: '1px solid var(--gray-3)' }}
        direction="column"
      >
        <Text>This feature is only available on the Enterprise level plan.</Text>
      </Flex>
    </Flex>
  );
}
