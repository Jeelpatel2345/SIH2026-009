'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Globe, ChevronRight, Shield, Lock, CheckCircle, Smartphone } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleSendOtp = () => { if (phone.length === 10) setOtpSent(true); };

  const handleVerifyOtp = () => {
    const code = otp.join('');
    if (code === '1234') {
      const role = localStorage.getItem('sahyog-role') || 'CUSTOMER';
      setAuth({ userId: 'demo-user', role, phone: `+91${phone}`, fullName: '' });
      if (role === 'ADMIN') router.push('/admin/overview');
      else if (role === 'WORKER') router.push('/onboarding/worker');
      else router.push('/onboarding/customer');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp]; newOtp[index] = value; setOtp(newOtp);
    if (value && index < 3) { const next = document.getElementById(`otp-${index + 1}`); next?.focus(); }
    if (index === 3 && value) setTimeout(() => handleVerifyOtp(), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#042f2e] to-slate-900 flex items-center justify-center p-3 sm:p-6 lg:p-10">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        {/* Left Hero & Security Banner (Desktop) */}
        <div className="bg-gradient-to-br from-[#042f2e] via-[#0d9488] to-[#042f2e] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-amber-400 text-emerald-950 font-black rounded-xl flex items-center justify-center shadow-md text-base">
                SY
              </div>
              <div>
                <h2 className="font-black text-lg tracking-tight text-white leading-none">SahYog</h2>
                <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">Secure Authentication</span>
              </div>
            </div>

            <div className="mt-8">
              <h1 className="text-2xl sm:text-3xl font-black leading-tight text-white">
                One-Time Password (OTP) Login
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
                Fast and passwordless access to your SahYog dashboard. We protect your account with end-to-end phone verification.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-xs bg-white/10 p-3 rounded-xl border border-white/10">
                <CheckCircle className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span>Instant 4-digit code directly to your mobile</span>
              </div>
              <div className="flex items-center gap-3 text-xs bg-white/10 p-3 rounded-xl border border-white/10">
                <Lock className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>256-bit encrypted session authentication</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-white/15 flex justify-around text-center text-[10px] text-emerald-200 font-bold">
            <div><p className="text-white">VERIFIED</p><p className="text-emerald-300/80">Govt IDs</p></div>
            <div><p className="text-white">ENCRYPTED</p><p className="text-emerald-300/80">SSL 256-Bit</p></div>
            <div><p className="text-white">PRIVATE</p><p className="text-emerald-300/80">Zero Spam</p></div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="p-6 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">Welcome Back</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Enter your 10-digit mobile number to verify your account.</p>
            </div>

            {/* Language Selector */}
            <div className="mb-5">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Select Language</p>
              <div className="border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs bg-slate-50">
                <div className="flex items-center gap-2 text-slate-700 font-bold">
                  <Globe className="w-4 h-4 text-teal-600" />
                  <span>English (English)</span>
                </div>
                <span className="text-teal-600 font-bold">✓</span>
              </div>
            </div>

            {/* Mobile Number Input */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-700 block mb-2">Mobile Number</label>
              <div className="border-2 border-slate-200 rounded-xl p-3.5 flex items-center gap-2.5 focus-within:border-teal-600 transition">
                <span className="text-slate-800 font-bold text-sm">+91</span>
                <span className="text-slate-300">|</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit mobile number"
                  className="flex-1 outline-none text-slate-900 font-medium text-sm placeholder-slate-400"
                />
              </div>
            </div>

            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                disabled={phone.length !== 10}
                className="w-full bg-teal-600 disabled:bg-teal-300 hover:bg-teal-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition"
              >
                <span>Send Verification Code</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-600 text-center">
                  Enter the 4-digit code sent to <b className="text-slate-900">+91 {phone}</b>
                </p>
                <div className="flex justify-center gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-12 h-14 text-center text-2xl font-black border-2 border-slate-200 rounded-xl focus:border-teal-600 outline-none text-slate-900 transition"
                    />
                  ))}
                </div>
                <p className="text-xs text-center text-slate-400">
                  Demo OTP: <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">1234</span>
                </p>
                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-bold transition shadow-md"
                >
                  Verify & Continue
                </button>
              </div>
            )}
          </div>

          <p className="text-xs text-center text-slate-400 mt-6">
            By continuing, you agree to SahYog&apos;s Terms of Service & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
