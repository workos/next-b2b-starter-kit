import { DashboardNav } from '../components/layout/DashboardNav/dashboard-nav';
import { Flex } from '@radix-ui/themes';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js B2B Starter Kit Dashboard',
  description: 'Fully featured B2B dashboard with Next.js, Radix UI, and WorkOS',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      ml="9"
      mr="9"
      pt="5"
      gap="3"
      style={{
        borderTop: '1px solid lightgray',
        backgroundColor: 'var(--gray-2)',
      }}
    >
      <DashboardNav />
      {children}
    </Flex>
  );
}
