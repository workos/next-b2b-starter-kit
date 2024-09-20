import PageContainer from '@/app/components/layout/page-container';
import { Box, Text, Heading, Separator } from '@radix-ui/themes';

export default function Users() {
  return (
    <PageContainer scrollable={true}>
      <Heading>Users page</Heading>
      <Box pt="2">
        <Text as="p">User element goes here.</Text>
        <Separator my="3" size="4" />
        <Text as="p">Option to invite users or enable domain capture</Text>
      </Box>
    </PageContainer>
  );
}
