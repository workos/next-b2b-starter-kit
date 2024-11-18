import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Heading, Flex, Box, Callout, Button } from '@radix-ui/themes';
import Link from 'next/link';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { workos } from '@/app/api/workos';
import { GeneratePortalLinkIntent } from '@workos-inc/node';
import { UpgradeButton } from '@/app/components/upgrade-button';
import { DashboardContainer } from '@/app/components/layout/dashboard-container';

async function getEntitlements(accessToken?: string): Promise<string[]> {
  if (!accessToken) return [];

  try {
    const [, payload] = accessToken.split('.');
    const claims = JSON.parse(atob(payload));
    return claims.entitlements ? claims.entitlements : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function AuditLogs() {
  // Refresh the session to ensure we have the latest entitlements
  const { organizationId, accessToken } = await withAuth({ ensureSignedIn: true });

  const { link: workOSAdminPortalLink } = await workos.portal.generateLink({
    organization: organizationId as string,
    intent: GeneratePortalLinkIntent.AuditLogs,
  });

  const entitlements = await getEntitlements(accessToken);

  return (
    <Flex direction="column" gap="3" width="100%">
      <Box>
        <Heading>Audit Logs</Heading>
      </Box>
      <DashboardContainer>
        {!entitlements.includes('audit-logs') ? (
          <Callout.Root color="blue" style={{ width: '100%' }}>
            <Flex align="center" justify="between" gap="3">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>This feature is only available on the Enterprise level plan.</Callout.Text>
              <UpgradeButton path="audit-logs">Upgrade to Enterprise</UpgradeButton>
            </Flex>
          </Callout.Root>
        ) : (
          <Box>
            <Button variant="soft" style={{ cursor: 'pointer' }}>
              <Link href={workOSAdminPortalLink}>View Audit Logs</Link>
            </Button>
          </Box>
        )}
      </DashboardContainer>
    </Flex>
  );
}
