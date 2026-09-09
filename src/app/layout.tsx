import type { Metadata, Viewport } from "next";
import "./globals.css";
import InstallAppBanner from "@/components/InstallAppBanner";
import OfflineBanner from "@/components/OfflineBanner";

export const metadata: Metadata = {
  title: "SahYog - Connecting Communities",
  description: "Reliable home services & verified local professionals at your fingertips.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SahYog",
  },
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SahYog" />
        <meta name="theme-color" content="#0d9488" />
      </head>
      <body className="antialiased bg-gray-50 min-h-screen">
        <OfflineBanner />
        <InstallAppBanner />
        {children}
      </body>
    </html>
  );
}
