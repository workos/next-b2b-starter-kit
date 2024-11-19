'use client';

import { Flex } from '@radix-ui/themes';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function DashboardContainer({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const color = mounted ? (resolvedTheme === 'light' ? 'white' : 'transparent') : 'transparent';

  return (
    <Flex
      flexGrow="1"
      align="stretch"
      p="4"
      style={{
        borderRadius: 'var(--radius-3)',
        backgroundColor: color,
        border: '1px solid var(--gray-3)',
      }}
      direction="column"
    >
      {children}
    </Flex>
  );
}
