import { DashboardNav } from '../components/layout/DashboardNav/dashboard-nav';
import { Flex } from '@radix-ui/themes';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SuperApp Dashboard',
  description: 'Basic B2B dashboard with Next.js and Radix',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex ml="9" mr="9" pt="5" gap="3" style={{ borderTop: '1px solid lightgray', backgroundColor: '#FCFCFD' }}>
      <DashboardNav />
      {children}
    </Flex>
  );
}
