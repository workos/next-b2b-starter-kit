import PageContainer from '../components/layout/page-container';
import { Box, Text, Heading } from '@radix-ui/themes';

export default function Page() {
  return (
    <PageContainer scrollable={true}>
      <Heading>Welcome to the Dashboard</Heading>
      <Box pt="2">
        <Text>Select a section from the sidebar to get started.</Text>
      </Box>
    </PageContainer>
  );
}
