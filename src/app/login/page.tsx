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
    <div className="max-w-md mx-auto min-h-screen bg-white">
      <div className="border-b p-4 text-center"><h1 className="font-semibold text-lg">Login</h1></div>

      <div className="p-6">
        <div className="h-40 bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl flex items-center justify-center mb-6">
          <div className="text-center">
            <Smartphone className="w-12 h-12 text-teal-600 mx-auto mb-2" />
            <Shield className="w-8 h-8 text-teal-500 mx-auto" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-1">Welcome to SahYog</h2>
        <p className="text-gray-500 text-center text-sm mb-6">Secure access to community services</p>

        <div className="mb-4">
          <p className="text-xs tracking-wider text-gray-500 mb-2">SELECT LANGUAGE</p>
          <div className="border rounded-xl p-3 flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-400" />
            <span className="font-medium">English</span> <span className="text-gray-400">(English)</span>
            <span className="ml-auto text-teal-600">✓</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="font-semibold text-gray-900 block mb-2">Mobile Number</label>
          <div className="border rounded-xl p-3 flex items-center gap-2">
            <span className="text-gray-600 font-medium">+91</span>
            <span className="text-gray-300">|</span>
            <input type="tel" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="Enter 10-digit mobile number" className="flex-1 outline-none text-gray-700" />
          </div>
        </div>

        {!otpSent ? (
          <button onClick={handleSendOtp} disabled={phone.length !== 10} className="w-full bg-teal-600 disabled:bg-teal-300 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-teal-700 transition">
            Send Verification Code <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <div className="mt-4">
            <p className="text-sm text-gray-600 text-center mb-4">Enter the 4-digit code sent to +91 {phone}</p>
            <div className="flex justify-center gap-3 mb-4">
              {otp.map((digit, i) => (
                <input key={i} id={`otp-${i}`} type="text" maxLength={1} value={digit} onChange={(e) => handleOtpChange(i, e.target.value)}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-teal-600 outline-none" />
              ))}
            </div>
            <p className="text-xs text-center text-gray-400">Demo OTP: <span className="font-bold text-teal-600">1234</span></p>
            <button onClick={handleVerifyOtp} className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold mt-4 hover:bg-teal-700 transition">Verify & Continue</button>
          </div>
        )}

        <div className="mt-8 bg-teal-50 rounded-xl p-4 flex items-center gap-3">
          <Shield className="w-10 h-10 text-teal-600" />
          <div><p className="font-semibold text-gray-900">Trust & Security</p><p className="text-xs text-gray-500">Your data is encrypted and secure</p></div>
        </div>

        <div className="flex justify-center gap-8 mt-6">
          {[{ icon: CheckCircle, label: 'VERIFIED' }, { icon: Lock, label: 'ENCRYPTED' }, { icon: Shield, label: 'PRIVATE' }].map(({ icon: Icon, label }) => (
            <div key={label} className="text-center"><Icon className="w-6 h-6 text-teal-600 mx-auto mb-1" /><p className="text-xs text-gray-500">{label}</p></div>
          ))}
        </div>
        <p className="text-xs text-center text-gray-400 mt-4">By continuing, you agree to our Terms & Privacy Policy</p>
      </div>
    </div>
  );
}
