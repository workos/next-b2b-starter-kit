'use client';

import { Flex } from '@radix-ui/themes';
import { useTheme } from 'next-themes';

export function DashboardContainer({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <Flex
      flexGrow="1"
      align="stretch"
      p="4"
      style={{
        borderRadius: 'var(--radius-3)',
        backgroundColor: resolvedTheme === 'light' ? 'white' : 'transparent',
        border: '1px solid var(--gray-3)',
      }}
      direction="column"
    >
      {children}
    </Flex>
  );
}
