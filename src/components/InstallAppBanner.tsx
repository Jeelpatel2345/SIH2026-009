'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Download, X, CheckCircle } from 'lucide-react';

export default function InstallAppBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    // Never show inside admin portal
    if (pathname.startsWith('/admin')) {
      setVisible(false);
      return;
    }

    // 1. If user already downloaded the APK on this device, do not show
    const alreadyDownloaded = localStorage.getItem('sahyog_apk_downloaded') === 'true';
    if (alreadyDownloaded) return;

    // 2. If user dismissed in this session, do not show
    const isDismissed = sessionStorage.getItem('sahyog_banner_dismissed') === 'true';
    if (isDismissed) return;

    // 3. If running inside standalone PWA, native Android WebView, or our custom APK, do not show
    const ua = navigator.userAgent;
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      ua.includes('wv') ||
      ua.includes('SahYogApp');  // custom UA set in our APK
    if (isStandalone) return;

    // Show banner after brief mount delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname]);

  const handleDownload = () => {
    setDownloading(true);

    // Trigger APK download
    const link = document.createElement('a');
    link.href = '/sahyog.apk';
    link.download = 'sahyog.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Mark as downloaded in localStorage so it is gone permanently!
    localStorage.setItem('sahyog_apk_downloaded', 'true');
    setDownloaded(true);

    // Automatically remove the banner completely after brief notification
    setTimeout(() => {
      setVisible(false);
    }, 2800);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('sahyog_banner_dismissed', 'true');
    setVisible(false);
  };

  if (!visible || pathname.startsWith('/admin')) return null;

  return (
    <aside aria-label="Install SahYog App" className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#042f2e] via-[#0d9488] to-[#042f2e] text-white shadow-md border-b border-teal-500/30">
      <div className="max-w-4xl mx-auto px-3.5 py-2.5 flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/logo.png"
            alt="SahYog"
            className="w-8 h-8 rounded-full object-cover shadow-xs border border-teal-300"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs sm:text-sm text-white truncate">
                {downloaded ? 'Downloading SahYog APK...' : 'SahYog Android App'}
              </span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 font-semibold px-1.5 py-0.2 rounded hidden sm:inline">
                5.4 MB
              </span>
            </div>
            <p className="text-[11px] text-teal-100 truncate">
              {downloaded 
                ? 'Check phone notifications & tap to install' 
                : 'Install native app for faster access & real-time OTP'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {downloaded ? (
            <div className="flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-xl">
              <CheckCircle className="w-3.5 h-3.5 text-amber-300" />
              <span>Downloaded!</span>
            </div>
          ) : (
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs px-3.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 animate-bounce" />
              <span>Download APK</span>
            </button>
          )}

          <button
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="p-1 rounded-lg text-teal-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
