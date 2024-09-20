import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { AuthKitProvider } from '@workos-inc/authkit-nextjs';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light">
        <AuthKitProvider>{children}</AuthKitProvider>
      </ThemeProvider>
    </>
  );
}
