'use client';

import { useIsHydrated } from '@/lib/use-is-hydrated';
import { Flex } from '@radix-ui/themes';
import { useTheme } from '@/lib/next-themes';

export function DashboardContainer({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const isHydrated = useIsHydrated();

  const color = isHydrated ? (resolvedTheme === 'light' ? 'white' : 'transparent') : 'transparent';

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
