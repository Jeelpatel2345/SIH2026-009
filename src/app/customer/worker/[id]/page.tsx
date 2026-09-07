'use client';
import Link from 'next/link';
import { ArrowLeft, Bell, Star, MapPin, ShieldCheck, Heart, MessageSquare, CheckCircle, Home, Calendar, User } from 'lucide-react';

const skills = ['Wiring', 'MCB Repair', 'Inverter Setup', 'AC Installation', 'LED Lighting'];
const languages = ['English', 'हिन्दी (Hindi)', 'ગુજરાતી (Gujarati)'];

export default function WorkerProfilePage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-28">
      <div className="p-4 flex items-center gap-3 border-b">
        <Link href="/customer/services"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="font-semibold text-lg flex-1">Worker Profile</h1>
        <Bell className="w-5 h-5 text-gray-600" />
        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-teal-600" /></div>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl flex items-center justify-center relative">
            <User className="w-10 h-10 text-teal-600" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-2"><h2 className="text-xl font-bold">Rajesh Kumar</h2><ShieldCheck className="w-5 h-5 text-teal-600" /></div>
            <p className="text-gray-500">Professional Electrician</p>
            <div className="flex items-center gap-2 mt-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /><span className="font-semibold">4.8</span><span className="text-gray-400">(124)</span><MapPin className="w-3 h-3 text-gray-400 ml-2" /><span className="text-gray-400 text-sm">Sector 14, Gurgaon</span></div>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <Link href="/chat/1" className="flex-1 border-2 rounded-xl py-3 flex items-center justify-center gap-2 font-semibold text-gray-700"><MessageSquare className="w-4 h-4" />Message</Link>
          <button className="flex-1 border-2 rounded-xl py-3 flex items-center justify-center gap-2 font-semibold text-gray-700"><Heart className="w-4 h-4" />Shortlist</button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[{ label: 'Exp.', value: '8+ Years' }, { label: 'Rate', value: '₹350/hr' }, { label: 'Jobs', value: '450+' }].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center"><p className="text-xs text-gray-400">{s.label}</p><p className="font-bold text-gray-900">{s.value}</p></div>
          ))}
        </div>

        <div className="flex gap-6 border-b mb-4 pb-2">
          <span className="text-sm font-semibold text-teal-600 border-b-2 border-teal-600 pb-2">about</span>
          <span className="text-sm text-gray-400">reviews</span>
          <span className="text-sm text-gray-400">details</span>
        </div>

        <h3 className="font-bold text-lg mb-2">Professional Bio</h3>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">Expert in residential wiring, appliance repair, and smart home installations. Committed to safety and timely service. I speak English, Hindi, and Punjabi.</p>

        <h3 className="font-bold text-lg mb-3">Skills & Expertise</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map(s => <span key={s} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm">{s}</span>)}
        </div>

        <h3 className="font-bold text-lg mb-3">Languages Known</h3>
        <div className="flex flex-wrap gap-3">
          {languages.map(l => <span key={l} className="flex items-center gap-1.5 text-sm"><CheckCircle className="w-4 h-4 text-teal-600" />{l}</span>)}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        <div className="bg-white border-t p-4 flex items-center justify-between">
          <div><p className="text-xs text-gray-400">Estimate Cost</p><p className="text-xl font-bold text-teal-700">₹350 / hr</p></div>
          <Link href="/customer/booking/1" className="bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-teal-700">Book Now</Link>
        </div>
        <div className="bg-white border-t flex justify-around py-3">
          <Link href="/customer/dashboard" className="text-center"><Home className="w-5 h-5 text-teal-600 mx-auto" /><p className="text-xs text-teal-600">Home</p></Link>
          <Link href="#" className="text-center"><Calendar className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Bookings</p></Link>
          <Link href="/chat/1" className="text-center relative"><MessageSquare className="w-5 h-5 text-gray-400 mx-auto" /><span className="absolute -top-1 left-1/2 ml-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">9</span><p className="text-xs text-gray-400">Chat</p></Link>
          <Link href="#" className="text-center"><User className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Profile</p></Link>
        </div>
      </div>
    </div>
  );
}
