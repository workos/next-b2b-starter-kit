import { Header } from './components/layout/header';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import { Box, Flex, Theme } from '@radix-ui/themes';

import type { Metadata } from 'next';

import './globals.css';
import '@radix-ui/themes/styles.css';
import ThemeProvider from './components/layout/ThemeToggle/theme-provider';
import { AuthKitProvider } from '@workos-inc/authkit-nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'B2B starter kit',
  description: 'Basic B2B app with Next.js and Radix UI',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden `} suppressHydrationWarning={true}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Theme radius="medium">
            <NextTopLoader showSpinner={false} />
            <Flex direction="column">
              <Box flexGrow="1">
                <Header />
              </Box>
              <Box flexGrow="1">
                <AuthKitProvider>{children}</AuthKitProvider>
              </Box>
            </Flex>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
