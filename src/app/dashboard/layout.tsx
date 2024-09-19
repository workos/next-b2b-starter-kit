import Header from '../components/layout/header';
import Sidebar from '../components/layout/sidebar';
import { Flex, Section, Box } from '@radix-ui/themes';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'B2B Saas Dashboard Starter',
  description: 'Basic B2B dashboard with Next.js and Radix',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex>
      <Sidebar />
      <Box flexGrow="1" overflow="hidden">
        <Header />
        {children}
      </Box>
    </Flex>
  );
}
