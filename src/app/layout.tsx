import type { Metadata } from 'next';
import './globals.css';
import { LenisProvider } from '../context/LenisContext';
import { NextAuthSessionProvider } from '../context/NextAuthSessionProvider';
import { AuthProvider } from '../context/AuthContext';
import { AuthModal } from '../components/AuthModal';

export const metadata: Metadata = {
  title: 'Nexora | 100% Full-Need US Admissions & F-1 Visa Roadmap',
  description:
    'Premier interactive roadmap, $0 EFC financial aid strategies, and official portal dashboard for international scholars pursuing US college admissions and F-1 student visas.',
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon-32.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Nexora | 100% Full-Need US Admissions & F-1 Visa Roadmap',
    description:
      'Premier interactive roadmap and portal dashboard for international scholars pursuing 100% full-need US college admissions and F-1 student visas.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F8F5EE] text-[#1F1914] antialiased selection:bg-[#E5D7B7] selection:text-[#1F1914]">
        <NextAuthSessionProvider>
          <AuthProvider>
            <LenisProvider>
              {children}
              <AuthModal />
            </LenisProvider>
          </AuthProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
