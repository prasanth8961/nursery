import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import { ReduxProvider } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

import { SupportChat } from '@/components/common/SupportChat';

export const metadata: Metadata = {
  title: '🌱 Prasanth Nursery Garden',
  description: 'Discover and share beautiful nursery plants nearby.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'GardenStore',
              name: 'Prasanth Nursery Garden',
              image: 'https://prasanthnurserygarden.com/logo.png',
              description: 'Discover indoor, outdoor, and flowering plants at Prasanth Nursery.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '886/77 - Kallukkudieruppu',
                addressLocality: 'Pudukkottai',
                addressRegion: 'TN',
                postalCode: '622202',
                addressCountry: 'IN',
              },
              telephone: '+91-7639874667',
              url: 'https://prasanthnurserygarden.com',
            }),
          }}
        />
      </head>
      <body className={`select-none ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          {children}
          <SupportChat />
        </ReduxProvider>
      </body>
    </html>
  );
}
