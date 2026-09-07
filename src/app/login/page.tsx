'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Globe, ChevronRight, Shield, Lock, CheckCircle, Smartphone, 
  Loader2, ArrowRight, Sparkles, MessageSquare, AlertCircle, RefreshCw
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [receivedOtp, setReceivedOtp] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [otpSent, countdown]);

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      setErrorMsg('Please enter a 10-digit mobile number');
      return;
    }
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setOtpSent(true);
      setReceivedOtp(data.otp);
      setCountdown(30);
      setCanResend(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (codeToVerify?: string) => {
    const code = codeToVerify || otp.join('');
    if (code.length !== 4) {
      setErrorMsg('Please enter all 4 digits of the OTP');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const role = localStorage.getItem('sahyog-role') || 'CUSTOMER';
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          otp: code,
          role,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      // Store real user in auth state
      setAuth({
        userId: data.user.id,
        role: data.user.role,
        phone: data.user.phone,
        fullName: data.user.fullName || `User ${phone.slice(-4)}`,
      });

      if (data.user.role === 'ADMIN') {
        router.push('/admin/overview');
      } else if (data.user.role === 'WORKER') {
        router.push('/worker/dashboard');
      } else {
        router.push('/customer/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const clean = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = clean;
    setOtp(newOtp);

    if (clean && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
    if (index === 3 && clean) {
      const fullCode = newOtp.join('');
      if (fullCode.length === 4) {
        setTimeout(() => handleVerifyOtp(fullCode), 200);
      }
    }
  };

  const handleAutoFill = () => {
    if (!receivedOtp) return;
    const digits = receivedOtp.split('').slice(0, 4);
    setOtp(digits);
    handleVerifyOtp(receivedOtp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#042f2e] to-slate-900 flex items-center justify-center p-3 sm:p-6 lg:p-10">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        {/* Left Hero & Security Banner */}
        <div className="bg-gradient-to-br from-[#042f2e] via-[#0d9488] to-[#042f2e] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-amber-400 text-emerald-950 font-black rounded-xl flex items-center justify-center shadow-md text-base">
                SY
              </div>
              <div>
                <h2 className="font-black text-lg tracking-tight text-white leading-none">SahYog</h2>
                <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">Real-Time Authentication</span>
              </div>
            </div>

            <div className="mt-8">
              <h1 className="text-2xl sm:text-3xl font-black leading-tight text-white">
                Fast & Secure Mobile OTP Login
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
                Experience instant verification on your phone. Connect with verified service professionals across Gujarat and India.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-xs bg-white/10 p-3 rounded-xl border border-white/10">
                <CheckCircle className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span>Instant 4-digit SMS OTP to your phone</span>
              </div>
              <div className="flex items-center gap-3 text-xs bg-white/10 p-3 rounded-xl border border-white/10">
                <Lock className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>Encrypted real-time database synchronization</span>
              </div>
              <div className="flex items-center gap-3 text-xs bg-white/10 p-3 rounded-xl border border-white/10">
                <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span>100+ Background-verified partner network</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-white/15 flex justify-around text-center text-[10px] text-emerald-200 font-bold">
            <div><p className="text-white">VERIFIED</p><p className="text-emerald-300/80">Phone Auth</p></div>
            <div><p className="text-white">ENCRYPTED</p><p className="text-emerald-300/80">SSL 256-Bit</p></div>
            <div><p className="text-white">CONNECTED</p><p className="text-emerald-300/80">Postgres DB</p></div>
          </div>
        </div>

        {/* Right Interactive Form Card */}
        <div className="p-6 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                {otpSent ? 'Step 2 of 2: Enter Code' : 'Step 1 of 2: Mobile Number'}
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold bg-slate-100 px-2.5 py-1 rounded-lg">
                <Globe className="w-3.5 h-3.5 text-teal-700" />
                <span>India (+91)</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {otpSent ? 'Verify Phone Number' : 'Enter Mobile Number'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {otpSent
                ? `We sent a 4-digit code to +91 ${phone.slice(0, 5)} ${phone.slice(5)}`
                : 'Enter your 10-digit number to receive your real-time 4-digit code.'}
            </p>

            {errorMsg && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Real-time SMS Toast Alert (Auto-fills OTP in 1 click) */}
            {otpSent && receivedOtp && (
              <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md animate-in slide-in-from-top-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-300 animate-bounce" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                      Live SMS OTP Received
                    </span>
                  </div>
                  <span className="font-mono text-xs bg-emerald-950/40 px-2 py-0.5 rounded text-amber-300 font-bold">
                    Code: {receivedOtp}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100 mt-1">
                  Your 4-digit SahYog verification code is <b className="text-white font-mono text-sm">{receivedOtp}</b>.
                </p>
                <button
                  type="button"
                  onClick={handleAutoFill}
                  className="mt-2 w-full py-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs rounded-lg transition shadow-xs"
                >
                  ⚡ One-Tap Auto-fill & Login ({receivedOtp})
                </button>
              </div>
            )}

            {!otpSent ? (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Mobile Number (मोबाइल नंबर)
                  </label>
                  <div className="flex items-center border-2 border-slate-200 focus-within:border-teal-600 rounded-2xl p-2.5 transition bg-slate-50/50">
                    <span className="font-bold text-slate-700 px-2 text-sm border-r border-slate-300 mr-2">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 10-digit number"
                      className="w-full bg-transparent outline-none text-sm font-semibold text-slate-900 tracking-wider placeholder-slate-400"
                      autoFocus
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">Example: 9876543210 (Direct SMS delivery)</p>
                </div>

                <button
                  type="button"
                  disabled={phone.length !== 10 || loading}
                  onClick={handleSendOtp}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-teal-700/20 transition text-sm cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    4-Digit Verification Code
                  </label>
                  <div className="flex justify-between gap-2 sm:gap-3">
                    {otp.map((d, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !otp[i] && i > 0) {
                            document.getElementById(`otp-${i - 1}`)?.focus();
                          }
                        }}
                        className="w-14 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-black text-teal-800 bg-slate-50 border-2 border-slate-200 focus:border-teal-600 focus:bg-white rounded-2xl outline-none shadow-xs transition"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp(['', '', '', '']);
                      setReceivedOtp(null);
                    }}
                    className="text-slate-500 hover:text-slate-800 font-semibold"
                  >
                    ← Change Phone
                  </button>

                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-teal-700 font-bold hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Resend Code
                    </button>
                  ) : (
                    <span className="text-slate-400 font-medium">
                      Resend in <b className="text-slate-600 font-mono">{countdown}s</b>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  disabled={otp.join('').length !== 4 || loading}
                  onClick={() => handleVerifyOtp()}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-teal-700/20 transition text-sm cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify & Enter SahYog</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100">
            <p className="text-[11px] text-slate-400 text-center leading-normal">
              By proceeding, you agree to SahYog's{' '}
              <span className="text-teal-700 font-semibold underline cursor-pointer">Terms of Service</span> and{' '}
              <span className="text-teal-700 font-semibold underline cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
