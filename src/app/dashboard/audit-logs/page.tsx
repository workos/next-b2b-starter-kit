import { withAdminAuth } from '@/lib/with-admin-auth';
import { AuditLogs } from './audit-logs';

// The audit-logs UI is a client component, so this server wrapper performs the
// admin check that the other dashboard pages do inline.
export default async function AuditLogsPage() {
  await withAdminAuth();

  return <AuditLogs />;
}
