'use client';

import { useState, ReactNode } from 'react';
import { Box, Button, Tooltip } from '@radix-ui/themes';
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';

export default function CopyButton({ children, copyValue }: { children: ReactNode; copyValue: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    setCopied(true);

    try {
      await navigator.clipboard.writeText(copyValue);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Box>
      <Button variant="outline" size="3" onClick={copyToClipboard} style={{ cursor: 'pointer' }}>
        {children}
        <Tooltip content={copied ? 'Copied' : 'Copy'}>{copied ? <CheckIcon /> : <CopyIcon />}</Tooltip>
      </Button>
    </Box>
  );
}
