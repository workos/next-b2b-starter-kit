'use server';

import { workos } from '@/app/api/workos';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { GenerateLinkIntent } from '@workos-inc/node';

export async function getAuditLogPortalLink(): Promise<string> {
  // Read the organization and entitlements from the server-side session rather
  // than accepting them from the caller, so a client cannot request a portal
  // link for an organization it does not belong to.
  const { organizationId, entitlements } = await withAuth({ ensureSignedIn: true });

  if (!organizationId) {
    throw new Error('No organization found in session.');
  }

  if (!entitlements?.includes('audit-logs')) {
    throw new Error('Audit logs entitlement is required to view audit logs.');
  }

  const { link } = await workos.adminPortal.generateLink({
    organization: organizationId,
    intent: GenerateLinkIntent.AuditLogs,
  });

  return link;
}
