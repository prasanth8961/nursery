import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "🌱 Prasanth Nursery Garden",
  description: "Discover and share beautiful nursery plants nearby.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GardenStore",
              name: "Prasanth Nursery",
              image: "https://prasanthnursery.com/logo.png",
              description:
                "Discover indoor, outdoor, and flowering plants at Prasanth Nursery.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Green Lane",
                addressLocality: "Coimbatore",
                addressRegion: "TN",
                postalCode: "641001",
                addressCountry: "IN",
              },
              telephone: "+91-9876543210",
              url: "https://prasanthnursery.com",
            }),
          }}
        />
      </head>
      <body
        className={`select-none ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
