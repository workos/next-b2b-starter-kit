import PageContainer from '@/app/components/layout/page-container';
import { Heading, Box, Text, Separator } from '@radix-ui/themes';

export default function AuditLogs() {
  return (
    <PageContainer scrollable={true}>
      <Heading>Audit Logs</Heading>
      <Box pt="2">
        <Text as="p">User element goes here.</Text>
        <Separator my="3" size="4" />
        <Text as="p">Option to invite users or enable domain capture</Text>
      </Box>
    </PageContainer>
  );
}
