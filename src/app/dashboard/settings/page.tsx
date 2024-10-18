import { Button, Flex, Heading, Box, Text } from '@radix-ui/themes';

export default function SettingsPage() {
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
        gap="3"
      >
        <Text size="4">Single Sign-On</Text>
        <Text size="2" color="gray">
          Setup or modify an existing SSO connection
        </Text>
        <Box>
          <Button variant="soft">Configure</Button>
        </Box>
      </Flex>
      <Flex
        flexGrow="1"
        align="stretch"
        p="4"
        style={{ borderRadius: 'var(--radius-3)', backgroundColor: 'white', border: '1px solid var(--gray-3)' }}
        direction="column"
        gap="3"
      >
        <Text size="4">Payments & Subscriptions</Text>
        <Text size="2" color="gray">
          Update payment method or change plans
        </Text>
        <Box>
          <Button variant="soft">Configure</Button>
        </Box>
      </Flex>
    </Flex>
  );
}
