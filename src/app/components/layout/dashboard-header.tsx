import { Box, Flex } from '@radix-ui/themes';
import ThemeToggle from './ThemeToggle/theme-toggle';
import { UserNav } from './user-nav';

export default function DashboardHeader() {
  return (
    <Box position="sticky" inset="0" top="0" width="full">
      <Flex align="center" justify="end" gap="4" style={{ padding: '1rem' }}>
        <UserNav />
        <ThemeToggle />
      </Flex>
    </Box>
  );
}
