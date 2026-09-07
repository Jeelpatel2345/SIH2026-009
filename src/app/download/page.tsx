'use client';
import Link from 'next/link';
import { Download, ShieldCheck, CheckCircle2, ArrowLeft, Smartphone, Sparkles, ExternalLink } from 'lucide-react';

export default function DownloadAppPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col p-5">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/customer/dashboard" className="p-2 bg-white rounded-full border shadow-xs">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Link>
        <h1 className="font-bold text-lg text-gray-900">Install Native App</h1>
      </div>

      <div className="bg-white rounded-3xl p-6 border shadow-sm text-center flex-1 flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-700 rounded-3xl flex items-center justify-center text-white text-3xl font-extrabold shadow-lg mb-4">
          SY
        </div>

        <h2 className="text-2xl font-black text-gray-900">SahYog App</h2>
        <p className="text-xs text-teal-700 font-semibold mt-0.5 uppercase tracking-wider">
          Official Android Application (.APK)
        </p>
        <p className="text-sm text-gray-500 mt-3 max-w-xs leading-relaxed">
          Install the real SahYog native app directly onto your phone system. Appears on your home screen next to WhatsApp, Instagram & Facebook!
        </p>

        <div className="w-full my-6 p-4 bg-teal-50 rounded-2xl border border-teal-100 text-left space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-900">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Standalone full-screen application</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-900">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>No browser address bar or search tabs</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-900">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Direct icon on phone home screen & app drawer</span>
          </div>
        </div>

        <a
          href="/sahyog.apk"
          download="sahyog.apk"
          className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl text-base shadow-md flex items-center justify-center gap-2 transition"
        >
          <Download className="w-5 h-5 animate-bounce" />
          <span>Download & Install APK</span>
        </a>

        <p className="text-[11px] text-gray-400 mt-2">
          File: <span className="font-mono font-medium text-gray-600">sahyog.apk</span> (Safe & Verified)
        </p>

        <div className="mt-8 pt-4 border-t w-full text-left">
          <p className="text-xs font-bold text-gray-800 mb-2">How to install in 3 steps:</p>
          <ol className="text-xs text-gray-600 space-y-1.5 list-decimal list-inside">
            <li>Tap the button above to download <b>sahyog.apk</b>.</li>
            <li>When download finishes, tap <b>Open</b> on the notification.</li>
            <li>Tap <b>Install</b> (allow &apos;Install from this source&apos; if prompted).</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
