'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Handshake } from 'lucide-react';

export default function SplashPage() {
  const router = useRouter();
  useEffect(() => { const t = setTimeout(() => router.push('/welcome'), 2500); return () => clearTimeout(t); }, [router]);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center px-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <Handshake className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Connecting Communities</h1>
        <p className="text-gray-500 text-center text-sm">Reliable home services & professional opportunities at your fingertips.</p>
        <div className="mt-12">
          <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
        </div>
        <p className="mt-3 text-xs tracking-widest text-gray-400">INITIALIZING SECURE SESSION</p>
      </div>
      <div className="pb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-sm font-medium text-gray-700">English</span>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">हिन्दी</span>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">ગુજરાતી</span>
        </div>
        <p className="text-xs text-gray-400">&copy; 2026 SahYog Trust Platform</p>
        <p className="text-xs text-gray-400">Verified & Secure</p>
      </div>
    </div>
  );
}
