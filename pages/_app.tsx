"use client"; // Ensures client-side execution

import type { AppProps } from 'next/app';
import '../styles/style.css'; // Ensure global styles are loaded
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { QueryProvider } from '@/components/query-provider';
import { Provider } from 'react-redux';
import store from '@/redux/store';

const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <QueryProvider>
          <main className={inter.className}>
            <Component {...pageProps} />
            <Toaster />
          </main>
        </QueryProvider>
      </ThemeProvider>
    </Provider>
  );
}
