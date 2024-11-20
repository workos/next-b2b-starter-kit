import { Header } from './components/layout/header';
import { Footer } from './components/layout/footer';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import { Box, Flex } from '@radix-ui/themes';

import type { Metadata } from 'next';

import './globals.css';
import '@radix-ui/themes/styles.css';
import { ThemeProvider } from 'next-themes';
import { AuthKitProvider } from '@workos-inc/authkit-nextjs';
import { DynamicBackground } from './components/layout/dynamic-background';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js B2B starter kit',
  description: 'Fully featured B2B app with Next.js, Radix UI, and WorkOS',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <DynamicBackground>
            <NextTopLoader showSpinner={false} />
            <Flex direction="column" minHeight="100vh">
              <Header />
              <Box flexGrow="1" asChild>
                <AuthKitProvider>{children}</AuthKitProvider>
              </Box>
              <Footer />
            </Flex>
          </DynamicBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
