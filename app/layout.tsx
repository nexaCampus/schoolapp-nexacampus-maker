import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NexaCampus SchoolMaker — Institutional App Builder Extension',
  description: 'Official multi-tenant school app and portal creator studio for NexaCampus (nexaCampus/school-webapp). Provision attendance, transport, canteen, and library modules in minutes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FDFBF7] text-[#1E293B] antialiased">
        {children}
      </body>
    </html>
  );
}
