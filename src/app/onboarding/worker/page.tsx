'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, FileText, Wrench, MapPin, Building, ChevronRight, CheckCircle, Upload } from 'lucide-react';
import Link from 'next/link';

export default function WorkerOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const tabs = [{ icon: User, label: 'Profile' }, { icon: FileText, label: 'Docs' }, { icon: Wrench, label: 'Skills' }];
  const skills = ['Cleaning', 'Plumbing', 'Electrician', 'Repair', 'Painting', 'Carpentry'];
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-20">
      <div className="p-4 text-center border-b"><h1 className="font-semibold text-lg">Profile Setup</h1></div>

      <div className="flex justify-center gap-8 py-4 border-b">
        {tabs.map((t, i) => (<div key={i} className="text-center"><div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto ${i + 1 <= step ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-400'}`}><t.icon className="w-5 h-5" /></div><p className={`text-xs mt-1 ${i + 1 <= step ? 'text-teal-600 font-medium' : 'text-gray-400'}`}>{t.label}</p></div>))}
      </div>
      <div className="h-1 bg-gray-100"><div className="h-full bg-teal-600 transition-all" style={{ width: `${(step / 3) * 100}%` }} /></div>

      <div className="p-6">
        {step === 1 && (
          <>
            <div className="h-36 bg-gradient-to-br from-teal-700 to-teal-600 rounded-2xl flex items-end p-4 mb-6"><p className="text-white font-bold">Professional Identity</p></div>
            <div className="space-y-4">
              <div><label className="font-semibold text-sm block mb-1">Full Name (As per Aadhar)</label><div className="border rounded-xl p-3 flex items-center gap-2"><User className="w-4 h-4 text-gray-400" /><input placeholder="Enter your full name" className="flex-1 outline-none" /></div></div>
              <div><label className="font-semibold text-sm block mb-1">Primary Work Area</label><div className="border rounded-xl p-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /><input placeholder="Locality, City" className="flex-1 outline-none" /></div></div>
              <div><label className="font-semibold text-sm block mb-1">Years of Experience</label><div className="border rounded-xl p-3 flex items-center gap-2"><Building className="w-4 h-4 text-gray-400" /><input placeholder="Years of experience" className="flex-1 outline-none" /></div></div>
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold mt-6 flex items-center justify-center gap-2">Save & Continue <ChevronRight className="w-5 h-5" /></button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-2">Document Verification</h2>
            <p className="text-sm text-gray-500 mb-6">Upload your Aadhar card for identity verification.</p>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center mb-6">
              <Upload className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-semibold text-gray-700">Upload Aadhar Card</p>
              <p className="text-xs text-gray-400 mt-1">Front & back side (JPG, PNG, PDF)</p>
            </div>
            <button onClick={() => setStep(3)} className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2">Continue <ChevronRight className="w-5 h-5" /></button>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="text-xl font-bold mb-2">Select Your Skills</h2>
            <p className="text-sm text-gray-500 mb-6">Choose the services you can provide.</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {skills.map(s => (<button key={s} onClick={() => setSelectedSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])} className={`p-4 rounded-xl border-2 text-center font-medium transition ${selectedSkills.includes(s) ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-gray-200 text-gray-700'}`}>
                {selectedSkills.includes(s) && <CheckCircle className="w-4 h-4 text-teal-600 mx-auto mb-1" />}{s}
              </button>))}
            </div>
            <button onClick={() => router.push('/worker/dashboard')} className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold">Complete Setup</button>
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex justify-around py-3">
          {[{ icon: '🏠', label: 'Home', href: '/worker/dashboard' }, { icon: '📅', label: 'Bookings', href: '#' }, { icon: '💬', label: 'Chat', href: '#', badge: 9 }, { icon: '👤', label: 'Profile', href: '#' }].map(item => (
            <Link key={item.label} href={item.href} className="text-center relative">
              <span className="text-lg">{item.icon}</span>
              {item.badge && <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{item.badge}</span>}
              <p className="text-xs text-gray-500">{item.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
