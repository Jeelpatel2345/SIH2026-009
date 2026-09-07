'use client';
import Link from 'next/link';
import { Bell, Search, MapPin, Star, ChevronRight, ShieldCheck, Calendar, User, Sparkles, Wrench, Zap, Hammer } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const categories = [
  { name: 'Cleaning', icon: Sparkles, count: 42, color: 'bg-amber-50 text-amber-600' },
  { name: 'Plumbing', icon: Wrench, count: 18, color: 'bg-blue-50 text-blue-600' },
  { name: 'Electrician', icon: Zap, count: 25, color: 'bg-yellow-50 text-yellow-600' },
  { name: 'Repair', icon: Hammer, count: 31, color: 'bg-red-50 text-red-600' },
];

const topWorkers = [
  { name: 'Expert Electrical Repair', provider: 'Suresh Electricals', price: 499, rating: 4.9, badge: 'Top Rated' },
  { name: 'Modern Kitchen Clean', provider: 'Sparkle Pro', price: 899, rating: 4.8, badge: 'Best Value' },
];

export default function CustomerDashboard() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <h1 className="font-bold text-lg">SahYog</h1>
        <div className="flex items-center gap-3">
          <Link href="/customer/bookings" className="text-gray-600 hover:text-teal-600">
            <Bell className="w-5 h-5" />
          </Link>
          <Link href="/profile" className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center hover:bg-teal-200 transition">
            <User className="w-5 h-5 text-teal-600" />
          </Link>
        </div>
      </div>

      <div className="bg-white px-4 pb-4">
        <div className="flex items-center justify-between mt-3">
          <div><h2 className="text-xl font-bold text-gray-900">Namaste, Rajesh!</h2><p className="text-sm text-gray-500">Find reliable help for your home today.</p></div>
          <span className="text-xs bg-white border rounded-full px-3 py-1 flex items-center gap-1"><MapPin className="w-3 h-3 text-teal-600" />Indore, MP</span>
        </div>

        <div className="mt-4 bg-gray-50 rounded-xl p-3 flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input placeholder="Search for 'Plumber' or 'Cleaning'..." className="flex-1 bg-transparent outline-none text-sm" />
        </div>

        <div className="flex items-center gap-3 mt-3">
          <span className="bg-teal-600 text-white text-sm px-4 py-1.5 rounded-full font-medium">English</span>
          <span className="text-sm text-gray-500">हिन्दी</span>
          <span className="text-sm text-gray-500">ગુજરાતી</span>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 flex items-center gap-2"><span>📈</span>Service Categories</h3>
          <Link href="/customer/services" className="text-teal-600 text-sm font-medium flex items-center">View All <ChevronRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {categories.map(cat => (
            <Link key={cat.name} href="/customer/services" className="text-center">
              <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-1`}><cat.icon className="w-7 h-7" /></div>
              <p className="text-xs font-medium text-gray-700">{cat.name}</p>
              <p className="text-xs text-gray-400">{cat.count} partners</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-4 mt-4 bg-teal-50 rounded-xl p-4 flex items-center gap-3">
        <ShieldCheck className="w-10 h-10 text-teal-600 flex-shrink-0" />
        <div><p className="font-semibold text-gray-900 text-sm">Verified & Background Checked Workers</p><p className="text-xs text-gray-500">Trusted by 5,000+ local households</p></div>
      </div>

      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 flex items-center gap-2"><Calendar className="w-4 h-4" />Upcoming Appointments</h3>
          <Link href="/customer/bookings" className="text-xs text-teal-600 font-semibold">View All &gt;</Link>
        </div>
        <Link href="/customer/bookings" className="block bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:border-teal-200 transition">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center"><Sparkles className="w-5 h-5 text-teal-600" /></div>
              <div><p className="font-semibold text-sm">Deep Home Cleaning</p><p className="text-xs text-gray-500">Tomorrow, 10:30 AM</p><p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><User className="w-3 h-3" />Amir Khan (Verified)</p></div>
            </div>
            <span className="text-xs bg-teal-50 text-teal-700 font-medium px-2 py-1 rounded-full">Confirmed</span>
          </div>
        </Link>
      </div>

      <div className="px-4 mt-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-3"><Star className="w-4 h-4" />Highly Rated Nearby</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {topWorkers.map((w, i) => (
            <Link key={i} href="/customer/worker/1" className="min-w-[220px] bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="h-28 bg-gradient-to-br from-teal-100 to-teal-50 relative">
                <span className={`absolute top-2 left-2 text-xs text-white px-2 py-0.5 rounded ${i === 0 ? 'bg-red-500' : 'bg-teal-600'}`}>{w.badge}</span>
                <span className="absolute bottom-2 left-2 text-sm font-bold text-teal-800">₹{w.price}/hr</span>
                <span className="absolute bottom-2 right-2 text-xs bg-white/90 px-2 py-0.5 rounded flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />{w.rating}</span>
              </div>
              <div className="p-3"><p className="font-semibold text-sm">{w.name}</p><p className="text-xs text-gray-400 flex items-center gap-1 mt-1"><User className="w-3 h-3" />{w.provider}</p></div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-4 mt-4 bg-gradient-to-r from-teal-700 to-teal-600 rounded-2xl p-5">
        <h3 className="text-white font-bold text-lg">Special Discount<br />for New Members</h3>
        <p className="text-teal-100 text-sm mt-1">Get up to 20% off on your first deep cleaning session.</p>
        <button className="mt-3 bg-white text-teal-700 font-semibold text-sm px-5 py-2 rounded-lg">Claim Offer</button>
      </div>

      <BottomNav />
    </div>
  );
}
