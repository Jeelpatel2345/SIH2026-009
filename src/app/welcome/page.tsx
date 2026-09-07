'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Globe, User, Briefcase, ChevronRight, Users } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();
  const [role, setRole] = useState<'CUSTOMER' | 'WORKER'>('CUSTOMER');

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      <div className="flex items-center justify-between p-4">
        <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xs">SY</span>
        </div>
        <span className="text-sm text-teal-600 border border-teal-200 rounded-full px-3 py-1 flex items-center gap-1">
          <Globe className="w-3 h-3" /> Global Support
        </span>
      </div>

      <div className="mx-4 h-48 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
        <div className="text-center text-white">
          <p className="text-xs tracking-wider font-semibold">OUR COMMUNITY HUB</p>
          <p className="text-sm mt-1 opacity-80">CONNECTING PEOPLE & SKILLS</p>
        </div>
      </div>

      <div className="px-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Welcome to SahYog</h1>
        <p className="text-gray-500 text-center text-sm mt-2 mb-6">Empowering communities by connecting skilled hands with household needs.</p>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2"><Globe className="w-4 h-4 text-teal-600" /><span className="font-semibold text-gray-900">Language</span></div>
          <p className="text-xs text-gray-500 tracking-wider mb-2">SELECT LANGUAGE</p>
          <div className="border border-gray-200 rounded-xl p-3 flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-400" />
            <div><span className="font-medium">English</span> <span className="text-gray-400">(English)</span></div>
            <span className="ml-auto text-teal-600">✓</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3"><Users className="w-4 h-4 text-teal-600" /><span className="font-semibold">Tell us who you are</span></div>
          <button onClick={() => setRole('CUSTOMER')} className={`w-full p-4 rounded-xl border-2 mb-3 flex items-center gap-3 text-left transition ${role === 'CUSTOMER' ? 'border-teal-600 bg-teal-50' : 'border-gray-200'}`}>
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-teal-600" /></div>
            <div className="flex-1"><p className="font-semibold text-gray-900">I need a service</p><p className="text-xs text-gray-500">Book help for home, cleaning, repairs...</p></div>
            {role === 'CUSTOMER' && <span className="text-teal-600">✓</span>}
          </button>
          <button onClick={() => setRole('WORKER')} className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 text-left transition ${role === 'WORKER' ? 'border-teal-600 bg-teal-50' : 'border-gray-200'}`}>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"><Briefcase className="w-5 h-5 text-gray-600" /></div>
            <div className="flex-1"><p className="font-semibold text-gray-900">I want to provide services</p><p className="text-xs text-gray-500">Earn by helping others with your skills...</p></div>
            {role === 'WORKER' && <span className="text-teal-600">✓</span>}
          </button>
        </div>

        <button onClick={() => { localStorage.setItem('sahyog-role', role); router.push('/login'); }} className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-teal-700 transition">
          Get Started <ChevronRight className="w-5 h-5" />
        </button>
        <p className="text-xs text-center text-gray-400 mt-3">By continuing, you agree to SahYog&apos;s <span className="text-teal-600">Terms of Service</span> and <span className="text-teal-600">Privacy Policy</span>.</p>
      </div>

      <div className="flex items-center justify-center gap-2 py-6 mt-4">
        <div className="flex -space-x-2">{[1,2,3].map(i=><div key={i} className="w-7 h-7 bg-teal-100 rounded-full border-2 border-white flex items-center justify-center"><User className="w-3 h-3 text-teal-600"/></div>)}</div>
        <span className="text-sm text-gray-600">Trusted by <b>10,000+</b> users in India</span>
      </div>
    </div>
  );
}
