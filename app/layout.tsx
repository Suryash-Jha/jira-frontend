"use client"; // ✅ Forces client-side execution


import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { QueryProvider } from '@/components/query-provider';
import { Provider } from 'react-redux';
import store from '@/redux/store';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Jira Clone',
//   description: 'A modern Jira clone built with Next.js and NestJS',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Provider store={store}>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
        </Provider>

      </body>
    </html>
  );
}