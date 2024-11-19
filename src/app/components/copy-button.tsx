'use client';

import { useState, ReactNode, useEffect } from 'react';
import { Box, Button, Tooltip } from '@radix-ui/themes';
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

export default function CopyButton({ children, copyValue }: { children: ReactNode; copyValue: string }) {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = async () => {
    setCopied(true);

    try {
      await navigator.clipboard.writeText(copyValue);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const color: 'gray' | 'blue' = mounted ? (resolvedTheme === 'dark' ? 'gray' : 'blue') : 'blue';

  return (
    <Box>
      <Button variant="surface" color={color} size="3" onClick={copyToClipboard} style={{ cursor: 'pointer' }}>
        {children}
        <Tooltip content={copied ? 'Copied' : 'Copy'}>{copied ? <CheckIcon /> : <CopyIcon />}</Tooltip>
      </Button>
    </Box>
  );
}
