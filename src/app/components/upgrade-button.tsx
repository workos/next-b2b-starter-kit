'use client';

import { Button } from '@radix-ui/themes';
import redirectToBillingPortal from '@/actions/redirectToBillingPortal';

export function UpgradeButton({ children, path }: { children: React.ReactNode; path: string }) {
  const handleClick = () => {
    redirectToBillingPortal(path);
  };

  return (
    <Button variant="soft" style={{ cursor: 'pointer' }} onClick={handleClick}>
      {children}
    </Button>
  );
}
