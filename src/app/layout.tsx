import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import ReactQueryProvider from '@/components/react-query-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '@/components/layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sleakops - Dashboard',
  description: 'Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang='en' suppressHydrationWarning>
        <head>
          <script>
            {`
              (function() {
                const value = localStorage.getItem('chakra-ui-color-mode')
                if (value === 'dark') {
                  document.documentElement.style.setProperty('color-scheme', 'dark')
                }
              })()
            `}
          </script>
        </head>
        <body className={`${inter} antialiased`}>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </html>
    </ReactQueryProvider>
  );
}
