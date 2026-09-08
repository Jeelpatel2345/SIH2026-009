import type { Metadata } from 'next';
import './globals.css';
import WebHeader from '@/components/WebHeader';
import WebFooter from '@/components/WebFooter';
import FloatingChatbot from '@/components/FloatingChatbot';

export const metadata: Metadata = {
  title: 'SahYog — Verified Home Services Platform',
  description: 'Book verified home services, electricians, plumbers, cleaners, appliance repair, carpenters, and painters across Gujarat and India.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased relative">
        <WebHeader />
        <main className="flex-1">
          {children}
        </main>
        <WebFooter />
        <FloatingChatbot />
      </body>
    </html>
  );
}

