'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bell, Info, CheckCircle, CreditCard, Building, Banknote, ShieldCheck, ChevronRight, User, Home, Calendar, MessageSquare } from 'lucide-react';

const methods = [
  { id: 'upi', label: 'UPI (PhonePe, Google Pay)', desc: 'Google Pay, PhonePe, Paytm', icon: '💳' },
  { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', icon: CreditCard },
  { id: 'netbanking', label: 'Net Banking', desc: 'All major banks supported', icon: Building },
  { id: 'cash', label: 'Cash after Service', desc: 'Pay directly after service', icon: Banknote },
];

export default function PaymentPage() {
  const [selected, setSelected] = useState('upi');

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-32">
      <div className="p-4 flex items-center gap-3 border-b">
        <Link href="/customer/booking/1"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="font-semibold text-lg flex-1">Payment & Confirmation</h1>
        <Bell className="w-5 h-5 text-gray-600" />
        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-teal-600" /></div>
      </div>

      <div className="p-4">
        <div className="bg-teal-50 border-l-4 border-teal-600 p-3 rounded-r-xl mb-4">
          <p className="text-xs tracking-wider text-teal-700 font-semibold flex items-center gap-1"><Info className="w-4 h-4" />BOOKING SUMMARY</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-1"><h2 className="text-xl font-bold">Deep Cleaning Service</h2><span className="text-xs border border-gray-300 rounded-full px-2 py-0.5">Verified</span></div>
          <p className="text-sm text-gray-500">📅 12 Oct 2023 • 10:00 AM</p>
          <p className="text-sm text-gray-500">📍 Sector 45, Gurgaon</p>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span>₹1,000.00</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-600">Service Fee</span><span>₹70.00</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-600">GST (18%)</span><span>₹180.00</span></div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t"><span>Total Amount</span><span className="text-teal-600">₹1,250.00</span></div>
          </div>
        </div>

        <h3 className="font-bold text-lg mb-3">Payment Methods</h3>
        <div className="space-y-3">
          {methods.map(m => (
            <button key={m.id} onClick={() => setSelected(m.id)} className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 text-left transition ${selected === m.id ? 'border-teal-600 bg-teal-50' : 'border-gray-100'}`}>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                {typeof m.icon === 'string' ? <span className="text-lg">{m.icon}</span> : <m.icon className="w-5 h-5 text-gray-600" />}
              </div>
              <div className="flex-1"><p className="font-semibold text-sm">{m.label}</p><p className="text-xs text-gray-400">{m.desc}</p></div>
              {selected === m.id && <CheckCircle className="w-5 h-5 text-teal-600" />}
            </button>
          ))}
        </div>

        <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1"><ShieldCheck className="w-4 h-4" />100% Secure Payment powered by SahYog Trust</p>
      </div>

      <div className="fixed bottom-14 left-0 right-0 max-w-md mx-auto p-4 bg-white">
        <Link href="/customer/tracking/1" className="block w-full bg-teal-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-teal-700">Pay ₹1,250 <ChevronRight className="w-5 h-5" /></Link>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex justify-around py-3">
          <Link href="/customer/dashboard" className="text-center"><Home className="w-5 h-5 text-teal-600 mx-auto" /><p className="text-xs text-teal-600">Home</p></Link>
          <Link href="#" className="text-center"><Calendar className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Bookings</p></Link>
          <Link href="/chat/1" className="text-center"><MessageSquare className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Chat</p></Link>
          <Link href="#" className="text-center"><User className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Profile</p></Link>
        </div>
      </div>
    </div>
  );
}
