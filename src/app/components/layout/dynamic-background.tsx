'use client';

import { usePathname } from 'next/navigation';
import { Theme } from '@radix-ui/themes';

export function DynamicBackground({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <Theme radius="medium" style={{ backgroundColor: isDashboard ? 'var(--gray-2)' : undefined }}>
      {children}
    </Theme>
  );
}
