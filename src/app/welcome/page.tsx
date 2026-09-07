'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Globe, User, Briefcase, ChevronRight, Users } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();
  const [role, setRole] = useState<'CUSTOMER' | 'WORKER'>('CUSTOMER');
  const [lang, setLang] = useState<'English' | 'हिन्दी' | 'ગુજરાતી'>('English');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#042f2e] to-slate-900 flex items-center justify-center p-3 sm:p-6 lg:p-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        {/* Left Hero Section (Desktop showcase / Mobile top) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#042f2e] via-[#0d9488] to-[#042f2e] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-amber-400 text-emerald-950 font-black rounded-xl flex items-center justify-center shadow-md text-base">
                  SY
                </div>
                <div>
                  <h2 className="font-black text-lg tracking-tight text-white leading-none">SahYog</h2>
                  <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">Community Hub</span>
                </div>
              </div>
              <span className="text-xs bg-white/15 border border-white/25 rounded-full px-3 py-1 font-bold text-amber-300">
                Verified Platform
              </span>
            </div>

            <div className="mt-8 lg:mt-12">
              <h1 className="text-2xl sm:text-3xl font-black leading-tight text-white">
                Connecting Communities, Empowering Skills.
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-3 leading-relaxed">
                Reliable household services and verified professional opportunities at your fingertips across Gujarat and India.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {[
                { title: '100% Background Verified', desc: 'Aadhaar biometric inspected partners' },
                { title: 'Instant UPI & Full Refund', desc: 'Secure Google Pay & PhonePe integration' },
                { title: 'Local Languages', desc: 'English, हिन्दी (Hindi), ગુજરાતી (Gujarati)' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs">
                  <div className="w-5 h-5 rounded-full bg-amber-400 text-emerald-950 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="text-[11px] text-emerald-200/80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-white/15 flex items-center justify-between text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-300" />
              <span><b>10,000+</b> trusted households</span>
            </div>
            <Link href="/admin/overview" className="text-amber-300 hover:underline font-bold">
              Admin Portal →
            </Link>
          </div>
        </div>

        {/* Right Role Selection & Onboarding (Form area) */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">Welcome to SahYog</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Select your preferred language and account type to begin.</p>
              </div>
            </div>

            {/* Language Selector Tabs */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Select Language / ભાષા / भाषा
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['English', 'हिन्दी', 'ગુજરાતી'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                      lang === l
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Role Cards */}
            <div className="space-y-3 mb-6">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Choose How You Want To Use SahYog
              </label>

              <button
                onClick={() => setRole('CUSTOMER')}
                className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 text-left transition ${
                  role === 'CUSTOMER'
                    ? 'border-teal-600 bg-teal-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  role === 'CUSTOMER' ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                }`}>
                  <User className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 text-sm sm:text-base">I need home services</p>
                  <p className="text-xs text-slate-500">Book verified cleaners, electricians, plumbers & repairs</p>
                </div>
                {role === 'CUSTOMER' && (
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                    ✓
                  </span>
                )}
              </button>

              <button
                onClick={() => setRole('WORKER')}
                className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 text-left transition ${
                  role === 'WORKER'
                    ? 'border-teal-600 bg-teal-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  role === 'WORKER' ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 text-sm sm:text-base">I want to provide services</p>
                  <p className="text-xs text-slate-500">Earn with your skills, receive direct bookings & fast payouts</p>
                </div>
                {role === 'WORKER' && (
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                    ✓
                  </span>
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                localStorage.setItem('sahyog-role', role);
                router.push('/login');
              }}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg transition"
            >
              <span>Get Started</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-center text-slate-400 mt-3">
              By continuing, you agree to SahYog&apos;s <span className="text-teal-700 font-semibold underline">Terms of Service</span> and <span className="text-teal-700 font-semibold underline">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
