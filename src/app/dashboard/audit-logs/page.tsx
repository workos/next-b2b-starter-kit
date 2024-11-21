'use client';

import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Heading, Flex, Box, Callout, Button, Skeleton } from '@radix-ui/themes';
import Link from 'next/link';
import { UpgradeButton } from '@/app/components/upgrade-button';
import { DashboardContainer } from '@/app/components/layout/dashboard-container';
import { refreshAuthkitSession } from '@/actions/refreshAuthkitSession';
import { getAuditLogPortalLink } from '@/actions/getAuditLogPortalLink';
import { useEffect, useState } from 'react';

export default function AuditLogs() {
  const [entitlements, setEntitlements] = useState<string[]>([]);
  const [workOSAdminPortalLink, setWorkOSAdminPortalLink] = useState<string | null>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Refresh the session to ensure we have the latest entitlements
    const fetchEntitlements = async () => {
      const response = await refreshAuthkitSession();
      const session = JSON.parse(response);

      if (session.entitlements?.includes('audit-logs')) {
        const link = await getAuditLogPortalLink(session.organizationId);
        setWorkOSAdminPortalLink(link);
      }

      setEntitlements(session.entitlements);
      setLoading(false);
    };

    fetchEntitlements();
  }, []);

  return (
    <Flex direction="column" gap="3" width="100%">
      <Box>
        <Heading>Audit Logs</Heading>
      </Box>
      <DashboardContainer>
        <Skeleton loading={loading}>
          {!entitlements?.includes('audit-logs') ? (
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
                <Link href={workOSAdminPortalLink as string}>View Audit Logs</Link>
              </Button>
            </Box>
          )}
        </Skeleton>
      </DashboardContainer>
    </Flex>
  );
}
