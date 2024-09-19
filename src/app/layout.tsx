import Providers from './components/layout/providers';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import { Theme } from '@radix-ui/themes';

import './globals.css';
import '@radix-ui/themes/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Radix',
  description: 'Basic dashboard with Next.js and Radix UI',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-hidden `}
        suppressHydrationWarning={true}
      >
        <Theme>
          <NextTopLoader showSpinner={false} />
          <Providers>{children}</Providers>
        </Theme>
      </body>
    </html>
  );
}
