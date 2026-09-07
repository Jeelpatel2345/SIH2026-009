'use client';
import Link from 'next/link';
import { ArrowLeft, Bell, Search, Star, MapPin, Filter, ChevronRight, User, Zap, Clock } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const workers = [
  { id: '1', name: 'Rajesh Kumar', title: 'Professional Plumber', exp: 8, distance: 1.2, rating: 4.8, rate: 450 },
  { id: '2', name: 'Sunita Mehra', title: 'Home Cleaning Expert', exp: 5, distance: 2.5, rating: 4.9, rate: 300 },
  { id: '3', name: 'Amit Shah', title: 'Certified Electrician', exp: 12, distance: 0.8, rating: 4.7, rate: 550 },
];

export default function ServiceResultsPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 flex items-center gap-3 border-b">
        <Link href="/customer/dashboard"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="font-semibold text-lg flex-1">Available Services</h1>
        <Bell className="w-5 h-5 text-gray-600" />
        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-teal-600" /></div>
      </div>

      <div className="bg-white px-4 py-3">
        <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2"><Search className="w-5 h-5 text-gray-400" /><input placeholder="Search plumbers, cleaners..." className="flex-1 bg-transparent outline-none text-sm" /></div>
        <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar">
          <span className="flex items-center gap-1 border rounded-full px-3 py-1.5 text-sm whitespace-nowrap"><Filter className="w-3 h-3" />Filters</span>
          <span className="bg-teal-50 text-teal-700 rounded-full px-3 py-1.5 text-sm whitespace-nowrap font-medium">Rating 4.5+</span>
          <span className="border rounded-full px-3 py-1.5 text-sm whitespace-nowrap">Immediate</span>
          <span className="border rounded-full px-3 py-1.5 text-sm whitespace-nowrap flex items-center gap-1"><MapPin className="w-3 h-3" />Map View</span>
        </div>
      </div>

      <div className="px-4 mt-3">
        <p className="text-sm text-gray-500 mb-3">3 professionals nearby</p>
        <div className="space-y-3">
          {workers.map(w => (
            <div key={w.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-50 rounded-xl flex items-center justify-center flex-shrink-0"><User className="w-8 h-8 text-teal-600" /></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between"><h3 className="font-semibold">{w.name}</h3><span className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />{w.rating}</span></div>
                  <p className="text-sm text-gray-500">{w.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-teal-500" />{w.exp} years exp</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{w.distance} km away</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div><span className="text-xs text-gray-400 block">STARTING FROM</span><span className="flex items-center gap-1"><Clock className="w-3 h-3 text-gray-400" /><span className="font-bold text-teal-700">₹{w.rate}</span><span className="text-gray-400 text-sm">/ hr</span></span></div>
                    <Link href={`/customer/worker/${w.id}`} className="bg-white border-2 border-teal-600 text-teal-600 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 hover:bg-teal-50">Book Now <ChevronRight className="w-4 h-4" /></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="fixed bottom-24 right-6 w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center shadow-lg"><Zap className="w-6 h-6 text-white" /></button>

      <BottomNav />
    </div>
  );
}
