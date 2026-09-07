'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, MapPin, ShieldCheck, Info, ChevronDown, Calendar, Clock, User } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const dates = [{ day: 'FRI', num: 24 }, { day: 'SAT', num: 25 }, { day: 'SUN', num: 26 }, { day: 'MON', num: 27 }];
const times = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM'];

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(1);
  const [showPrice, setShowPrice] = useState(true);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-32">
      <div className="p-4 flex items-center gap-3 border-b">
        <Link href="/customer/worker/1"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="font-semibold text-lg flex-1">Confirm Booking</h1>
        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-teal-600" /></div>
      </div>

      <div className="p-4">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4 flex items-start gap-2">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div><p className="text-sm text-blue-800">Review your service schedule and payment details below.</p><p className="text-xs text-blue-600 mt-0.5">अपनी सेवा समय और भुगतान विवरण की समीक्षा करें।</p></div>
        </div>

        <p className="text-xs tracking-wider text-gray-500 mb-2">SERVICE PROVIDER</p>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center"><User className="w-7 h-7 text-teal-600" /></div>
          <div>
            <div className="flex items-center gap-1"><span className="font-bold">Arjun Mehta</span><ShieldCheck className="w-4 h-4 text-teal-600" /></div>
            <p className="text-sm text-gray-500">Professional Electrician</p>
            <div className="flex items-center gap-1 mt-0.5"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /><span className="text-teal-600 text-sm font-semibold">4.8</span><span className="text-gray-400 text-xs">(124 reviews)</span></div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-2"><p className="text-xs tracking-wider text-gray-500">SCHEDULE</p><span className="text-xs text-gray-400">English • हिन्दी • ગુજરાતી</span></div>
        <div className="mb-4">
          <p className="font-semibold text-sm flex items-center gap-1 mb-2"><Calendar className="w-4 h-4" />Select Date (तारीख)</p>
          <div className="flex gap-2">
            {dates.map((d, i) => (<button key={i} onClick={() => setSelectedDate(i)} className={`flex-1 py-3 rounded-xl text-center font-bold ${i === selectedDate ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700'}`}><p className="text-xs font-normal">{d.day}</p><p className="text-lg">{d.num}</p></button>))}
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold text-sm flex items-center gap-1 mb-2"><Clock className="w-4 h-4" />Select Time (समय)</p>
          <div className="flex gap-2 flex-wrap">
            {times.map((t, i) => (<button key={i} onClick={() => setSelectedTime(i)} className={`px-4 py-2 rounded-full text-sm font-medium ${i === selectedTime ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700'}`}>{t}</button>))}
          </div>
        </div>

        <p className="text-xs tracking-wider text-gray-500 mb-2">SERVICE LOCATION</p>
        <div className="border rounded-xl p-3 flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center"><MapPin className="w-4 h-4 text-teal-600" /></div>
          <div className="flex-1"><p className="font-semibold text-sm">B/402, Shanti Heights, Sector 12</p><p className="text-xs text-gray-400">Navrangpura, Ahmedabad, Gujarat</p></div>
        </div>

        <p className="text-xs tracking-wider text-gray-500 mb-2">PRICE DETAILS</p>
        <div className="border rounded-xl p-4">
          <button onClick={() => setShowPrice(!showPrice)} className="flex items-center justify-between w-full">
            <span className="text-lg font-bold">Total Payable</span>
            <span className="flex items-center gap-1"><span className="text-xl font-bold text-teal-600">₹ 625</span><ChevronDown className={`w-4 h-4 transition ${showPrice ? 'rotate-180' : ''}`} /></span>
          </button>
          {showPrice && (
            <div className="mt-3 pt-3 border-t space-y-2">
              <div className="flex justify-between text-sm"><div><span>Service Fee (1 hour)</span><p className="text-xs text-gray-400">सेवा शुल्क / સેવા શુલ્ક</p></div><span>₹ 450</span></div>
              <div className="flex justify-between text-sm"><div><span>Material/Visit Base</span><p className="text-xs text-gray-400">भेंट शुल्क / મુલાકાત ફી</p></div><span>₹ 150</span></div>
              <div className="flex justify-between text-sm"><div><span>Platform Trust Fee</span><p className="text-xs text-gray-400">प्लेटफॉर्म शुल्क / પ્લેટફોર્મ ફી</p></div><span>₹ 25</span></div>
            </div>
          )}
        </div>

        <div className="bg-teal-50 rounded-xl p-3 mt-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          <div><p className="text-sm font-medium">Secured via SahYog Trust Payment.</p><p className="text-xs text-gray-500">सहयोग ट्रस्ट भुगतान के माध्यम से सुरक्षित।</p></div>
        </div>

        <div className="mt-4 text-center">
          <Link href="/customer/dashboard" className="text-xs font-semibold text-red-600 hover:underline">
            ✕ Cancel & Return to Services
          </Link>
        </div>
      </div>

      <div className="fixed bottom-14 left-0 right-0 max-w-md mx-auto p-4 bg-white">
        <Link href="/customer/payment/1" className="block w-full bg-teal-600 text-white py-4 rounded-xl font-semibold text-center text-lg hover:bg-teal-700">Confirm & Pay ₹625</Link>
      </div>
      <BottomNav />
    </div>
  );
}
