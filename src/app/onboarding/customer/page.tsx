'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, User, Mail, Phone, Globe, ChevronRight, MapPin, CheckCircle } from 'lucide-react';

export default function CustomerOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ fullName: '', email: '', address: '', city: '', state: 'Gujarat', pincode: '' });

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      <div className="border-b p-4 flex items-center gap-3">
        <button onClick={() => step > 1 ? setStep(step - 1) : router.back()}><ArrowLeft className="w-5 h-5" /></button>
        <h1 className="font-semibold text-lg">Complete Profile</h1>
      </div>

      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${s <= step ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
              {s < 3 && <div className={`w-20 h-0.5 mx-1 ${s < step ? 'bg-teal-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 -mt-6 mb-8 px-1">
          <span className={step >= 1 ? 'text-teal-600 font-medium' : ''}>Profile</span>
          <span className={step >= 2 ? 'text-teal-600 font-medium' : ''}>Location</span>
          <span className={step >= 3 ? 'text-teal-600 font-medium' : ''}>Finish</span>
        </div>

        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-2">Tell us about yourself</h2>
            <p className="text-sm text-gray-500 mb-6">Setup your SahYog profile to start connecting with service providers in your community.</p>
            <div className="h-36 bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl flex items-center justify-center mb-6 relative">
              <div className="w-16 h-16 bg-teal-200 rounded-full flex items-center justify-center"><User className="w-8 h-8 text-teal-600" /></div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2"><Camera className="w-4 h-4 text-white bg-teal-600 rounded-full p-0.5" /><span className="text-white font-semibold text-sm">Profile Photo</span></div>
            </div>
            <div className="space-y-4">
              <div><label className="font-semibold text-sm block mb-1">Full Name</label><div className="border rounded-xl p-3 flex items-center gap-2"><User className="w-4 h-4 text-gray-400" /><input value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} placeholder="Anjali Sharma" className="flex-1 outline-none" /></div></div>
              <div><label className="font-semibold text-sm block mb-1">Email Address</label><div className="border rounded-xl p-3 flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@example.com" className="flex-1 outline-none" /></div></div>
              <div><label className="font-semibold text-sm block mb-1">Phone Number</label><div className="border rounded-xl p-3 flex items-center gap-2 bg-gray-50"><Phone className="w-4 h-4 text-gray-400" /><span className="text-gray-600">+91 98765 43210</span></div><p className="text-xs text-gray-400 mt-1">Mobile number verified via OTP</p></div>
              <div><p className="text-xs tracking-wider text-gray-500 mb-1">SELECT LANGUAGE</p><div className="border rounded-xl p-3 flex items-center gap-2"><Globe className="w-4 h-4 text-gray-400" /><span>English (English)</span><span className="ml-auto text-teal-600">✓</span></div></div>
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold mt-6 flex items-center justify-center gap-2">Continue to Location <ChevronRight className="w-5 h-5" /></button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-2">Your Location</h2>
            <p className="text-sm text-gray-500 mb-6">Help us find service providers near you.</p>
            <div className="space-y-4">
              <div><label className="font-semibold text-sm block mb-1">Address</label><div className="border rounded-xl p-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /><input value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="B/402, Shanti Heights, Sector 12" className="flex-1 outline-none" /></div></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="font-semibold text-sm block mb-1">City</label><input value={form.city} onChange={e => setForm({...form, city: e.target.value})} placeholder="Ahmedabad" className="border rounded-xl p-3 w-full outline-none" /></div>
                <div><label className="font-semibold text-sm block mb-1">State</label><input value={form.state} onChange={e => setForm({...form, state: e.target.value})} placeholder="Gujarat" className="border rounded-xl p-3 w-full outline-none" /></div>
              </div>
              <div><label className="font-semibold text-sm block mb-1">Pincode</label><input value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} placeholder="380015" className="border rounded-xl p-3 w-full outline-none" /></div>
            </div>
            <button onClick={() => setStep(3)} className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold mt-6 flex items-center justify-center gap-2">Continue <ChevronRight className="w-5 h-5" /></button>
          </>
        )}

        {step === 3 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-10 h-10 text-teal-600" /></div>
            <h2 className="text-2xl font-bold mb-2">You&apos;re All Set!</h2>
            <p className="text-gray-500 mb-8">Your profile is ready. Start exploring services in your community.</p>
            <button onClick={() => router.push('/customer/dashboard')} className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold">Go to Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
}
