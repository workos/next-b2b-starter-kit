import { DashboardNav } from '../components/dashboard-nav';
import { Flex, Box } from '@radix-ui/themes';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SuperApp Dashboard',
  description: 'Basic B2B dashboard with Next.js and Radix',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex m="9" mt="6" style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px inset', backgroundColor: '#FCFCFD' }}>
      <DashboardNav />
      <Box flexGrow="1" overflow="hidden">
        {children}
      </Box>
    </Flex>
  );
}
