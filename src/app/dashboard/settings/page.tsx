import { Flex, Heading, Card, Box, Text } from '@radix-ui/themes';
import { GearIcon, CardStackIcon } from '@radix-ui/react-icons';
import PageContainer from '@/app/components/layout/page-container';

export default function SettingsPage() {
  return (
    <PageContainer scrollable>
      <Heading>Settings</Heading>
      <Flex mt="4" gap="4">
        <Card>
          <Flex gap="3" align="center">
            <GearIcon />
            <Box>
              <Text as="div" size="2" weight="bold">
                Configure SSO settings
              </Text>
              <Text as="div" size="2" color="gray">
                Set up or modify an existing SSO connection
              </Text>
            </Box>
          </Flex>
        </Card>
        <Card>
          <Flex gap="3" align="center">
            <CardStackIcon />
            <Box>
              <Text as="div" size="2" weight="bold">
                Configure payment settings
              </Text>
              <Text as="div" size="2" color="gray">
                Update payment method or change plans
              </Text>
            </Box>
          </Flex>
        </Card>
      </Flex>
    </PageContainer>
  );
}
