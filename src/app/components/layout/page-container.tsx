import React from 'react';
import { Box, ScrollArea } from '@radix-ui/themes';

export default function PageContainer({
  children,
  scrollable = false,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea type="always">
          <Box pt="4" pl="8" height="calc(100dvh-64px)">
            {children}
          </Box>
        </ScrollArea>
      ) : (
        <Box p="2">{children}</Box>
      )}
    </>
  );
}
