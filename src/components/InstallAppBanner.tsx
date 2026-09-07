'use client';
import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Check, Share, PlusSquare } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallAppBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already installed / running in standalone window
    const standaloneMode = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    
    setIsStandalone(standaloneMode);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Capture Chrome / Android install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      setShowModal(true);
    }
  };

  if (isStandalone || dismissed) return null;

  return (
    <>
      {/* Top Banner on Mobile (Hidden on Desktop) */}
      <div className="md:hidden bg-gradient-to-r from-teal-700 to-teal-600 text-white px-3.5 py-2 flex items-center justify-between shadow-sm sticky top-0 z-40 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center p-1 text-teal-700 font-extrabold text-[10px] shadow-xs">
            SY
          </div>
          <div>
            <p className="font-bold leading-tight">Install SahYog App</p>
            <p className="text-[10px] text-teal-100">Add icon to phone home screen</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href="/download"
            className="bg-white text-teal-700 font-bold px-3 py-1 rounded-full text-[11px] shadow-sm hover:bg-teal-50 transition flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            <span>Install APK</span>
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="text-teal-200 hover:text-white p-1 rounded-full"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Guide Modal for iOS Safari / Manual Android Setup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white text-gray-900 rounded-2xl p-5 max-w-xs w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-sm">Install on Phone Desktop</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs text-gray-600">
              {isIOS ? (
                <>
                  <p className="font-medium text-gray-800">
                    To install on your iPhone / iPad:
                  </p>
                  <ol className="space-y-2 list-decimal list-inside text-gray-700">
                    <li className="flex items-center gap-2">
                      <span>1. Tap the</span>
                      <span className="inline-flex items-center gap-1 font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                        <Share className="w-3.5 h-3.5" /> Share
                      </span>
                      <span>button in Safari</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>2. Scroll down & select</span>
                      <span className="inline-flex items-center gap-1 font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                        <PlusSquare className="w-3.5 h-3.5" /> Add to Home Screen
                      </span>
                    </li>
                    <li>
                      <span>3. Tap <b>Add</b> in the top right corner.</span>
                    </li>
                  </ol>
                </>
              ) : (
                <>
                  <p className="font-medium text-gray-800">
                    To add to your Android Home Screen:
                  </p>
                  <ol className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span>1. Tap the Chrome browser menu (<b>⋮</b> or three dots)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>2. Tap</span>
                      <span className="inline-flex items-center gap-1 font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                        <Download className="w-3.5 h-3.5" /> Install App
                      </span>
                      <span>or <b>Add to Home screen</b></span>
                    </li>
                    <li>
                      <span>3. Tap <b>Install</b> to confirm!</span>
                    </li>
                  </ol>
                </>
              )}

              <div className="p-2.5 bg-teal-50 rounded-xl text-teal-800 text-[11px] flex items-start gap-1.5">
                <Check className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  The app icon will appear directly on your phone home screen and launch fullscreen like a native app!
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 bg-teal-600 text-white font-bold rounded-xl text-xs hover:bg-teal-700 transition"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
