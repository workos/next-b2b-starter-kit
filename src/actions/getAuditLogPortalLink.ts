'use server';

import { workos } from '@/app/api/workos';
import { GeneratePortalLinkIntent } from '@workos-inc/node';

export async function getAuditLogPortalLink(organizationId: string): Promise<string> {
  const { link } = await workos.portal.generateLink({
    organization: organizationId,
    intent: GeneratePortalLinkIntent.AuditLogs,
  });

  return link;
}
