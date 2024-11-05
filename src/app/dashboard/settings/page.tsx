import { Button, Flex, Heading, Box, Text } from '@radix-ui/themes';
import { workos } from '@/app/api/workos';
import { GeneratePortalLinkIntent } from '@workos-inc/node';
import { withAuth } from '@workos-inc/authkit-nextjs';
import Link from 'next/link';
import { UpgradeButton } from '@/app/components/upgrade-button';

export default async function SettingsPage() {
  const { organizationId } = await withAuth({ ensureSignedIn: true });

  const { link: workOSAdminPortalLink } = await workos.portal.generateLink({
    organization: organizationId as string,
    intent: GeneratePortalLinkIntent.SSO,
  });

  return (
    <Flex direction="column" gap="3" width="100%">
      <Box>
        <Heading>Dashboard</Heading>
      </Box>
      <Flex
        flexGrow="1"
        align="stretch"
        p="4"
        style={{
          borderRadius: 'var(--radius-3)',
          backgroundColor: 'white',
          border: '1px solid var(--gray-3)',
        }}
        direction="column"
        gap="3"
      >
        <Text size="4">Single Sign-On</Text>
        <Text size="2" color="gray">
          Setup or modify an existing SSO connection
        </Text>
        <Box>
          <Button variant="soft" style={{ cursor: 'pointer' }}>
            <Link href={workOSAdminPortalLink}>Configure</Link>
          </Button>
        </Box>
      </Flex>
      <Flex
        flexGrow="1"
        align="stretch"
        p="4"
        style={{
          borderRadius: 'var(--radius-3)',
          backgroundColor: 'white',
          border: '1px solid var(--gray-3)',
        }}
        direction="column"
        gap="3"
      >
        <Text size="4">Payments & Subscriptions</Text>
        <Text size="2" color="gray">
          Update payment method or change plans
        </Text>
        <Box>
          <UpgradeButton path="settings">Configure</UpgradeButton>
        </Box>
      </Flex>
    </Flex>
  );
}
