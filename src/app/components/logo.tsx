'use client';
import { useIsHydrated } from '@/lib/use-is-hydrated';
import { useTheme } from '@/lib/next-themes';
import Image from 'next/image';

export function Logo() {
  const { resolvedTheme } = useTheme();
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    return <Image src="/logos/superapp_logo.svg" className="logo" alt="SuperApp logo" width={144} height={24} />;
  }

  return (
    <Image
      src={resolvedTheme === 'dark' ? '/logos/superapp_logo_dark.svg' : '/logos/superapp_logo.svg'}
      className="logo"
      alt="SuperApp logo"
      width={144}
      height={24}
    />
  );
}
