'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
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
