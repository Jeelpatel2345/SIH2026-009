'use client';

import { useState, useEffect } from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => {
      setIsOffline(false);
      setWasOffline(true);
      const timer = setTimeout(() => setWasOffline(false), 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    // Initial check
    if (!navigator.onLine) {
      setIsOffline(true);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register PWA service worker if supported
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('SahYog ServiceWorker registered:', reg.scope);
        })
        .catch((err) => {
          console.warn('ServiceWorker registration skipped:', err);
        });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline && !wasOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top-2 duration-300">
      {isOffline ? (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold shadow-md flex items-center justify-between border-b border-amber-600">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 animate-pulse flex-shrink-0" />
            <span>
              <b>Offline Mode Active</b> — Cached services, active OTP, and rate cards are accessible offline.
            </span>
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-slate-950 text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 hover:bg-slate-800 transition ml-2 flex-shrink-0"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry</span>
          </button>
        </div>
      ) : (
        <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold shadow-md flex items-center gap-2 border-b border-emerald-700">
          <Wifi className="w-4 h-4 text-emerald-200 flex-shrink-0" />
          <span>
            <b>Back Online!</b> Connected to SahYog Cloud Services.
          </span>
        </div>
      )}
    </div>
  );
}
