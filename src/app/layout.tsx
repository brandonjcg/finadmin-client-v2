import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { inter } from '@/fonts';

import './globals.css';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'FinAdmin',
  description: 'Finances administration app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense>
        <body className={`${inter.className} antialiased`}>
          <ToastContainer theme="dark" />
          {children}
        </body>
      </Suspense>
    </html>
  );
}
