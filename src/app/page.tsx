'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('sahyog-role');
      if (role === 'WORKER') {
        router.replace('/worker/dashboard');
      } else if (role === 'ADMIN') {
        router.replace('/admin/overview');
      } else {
        router.replace('/customer/dashboard');
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-6">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="SahYog" className="w-12 h-12 rounded-full object-cover shadow-lg border-2 border-emerald-400/40 animate-pulse" />
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white leading-none">SahYog</h1>
          <span className="text-[11px] text-emerald-300 font-semibold tracking-wider uppercase">Loading Workspace</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-5 text-emerald-300 text-sm font-medium">
        <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
        <span>Redirecting to your dashboard...</span>
      </div>
    </div>
  );
}
