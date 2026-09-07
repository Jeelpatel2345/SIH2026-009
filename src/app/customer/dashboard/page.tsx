'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, Search, MapPin, Star, ChevronRight, ShieldCheck, 
  Calendar, User, Sparkles, Wrench, Zap, Hammer, Shield, 
  Flame, ArrowRight, Heart, Award
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const categories = [
  { name: 'Cleaning', icon: Sparkles, count: 42, color: 'bg-emerald-50 text-emerald-700 border-emerald-200/60', hover: 'hover:bg-emerald-100/50' },
  { name: 'Plumbing', icon: Wrench, count: 18, color: 'bg-blue-50 text-blue-700 border-blue-200/60', hover: 'hover:bg-blue-100/50' },
  { name: 'Electrician', icon: Zap, count: 25, color: 'bg-amber-50 text-amber-700 border-amber-200/60', hover: 'hover:bg-amber-100/50' },
  { name: 'Repair', icon: Hammer, count: 31, color: 'bg-rose-50 text-rose-700 border-rose-200/60', hover: 'hover:bg-rose-100/50' },
];

const topWorkers = [
  { name: 'Expert Electrical Repair', provider: 'Suresh Electricals', price: 499, rating: 4.9, badge: 'Top Rated', tag: 'Fast 30 Min' },
  { name: 'Modern Kitchen Clean', provider: 'Sparkle Pro', price: 899, rating: 4.8, badge: 'Best Value', tag: 'Eco Friendly' },
];

export default function CustomerDashboard() {
  const [activeLang, setActiveLang] = useState<'EN' | 'HI' | 'GU'>('EN');

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 pb-28 text-slate-900">
      {/* Top App Header with Rich Emerald Gradient */}
      <div className="bg-gradient-to-r from-[#042f2e] via-[#0d9488] to-[#0f766e] text-white p-4 sticky top-0 z-20 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center font-black text-sm text-amber-300 border border-white/20 shadow-xs">
              SY
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tight leading-none text-white">SahYog</h1>
              <span className="text-[10px] text-emerald-200 font-medium tracking-wider uppercase">Community Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/customer/bookings" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full" />
            </Link>
            <Link href="/profile" className="w-8 h-8 rounded-full bg-amber-400/90 text-emerald-950 font-bold text-xs flex items-center justify-center shadow-xs border-2 border-white/30 hover:scale-105 transition">
              AS
            </Link>
          </div>
        </div>

        {/* Greeting & Location */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-200 font-semibold mb-0.5">
              <span>🙏 Namaste, Anjali!</span>
            </div>
            <h2 className="text-xl font-black text-white leading-tight">
              What do you need<br />help with today?
            </h2>
          </div>

          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 flex items-center gap-1.5 text-xs text-white">
            <MapPin className="w-3 h-3 text-amber-300" />
            <span className="font-medium">Indore, MP</span>
          </div>
        </div>

        {/* Search Bar with glowing focus */}
        <div className="mt-4 bg-white rounded-2xl p-2 pl-4 flex items-center gap-2 shadow-lg border border-emerald-100">
          <Search className="w-5 h-5 text-emerald-700 flex-shrink-0" />
          <input 
            placeholder="Search for 'Plumber', 'Cleaning', 'AC'..." 
            className="flex-1 bg-transparent outline-none text-xs text-slate-800 placeholder:text-slate-400 font-medium" 
          />
          <button className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs hover:opacity-95 transition">
            Find
          </button>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-2 mt-3 pt-1">
          <span className="text-[11px] text-emerald-200 font-medium">Language:</span>
          {(['EN', 'HI', 'GU'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full transition ${
                activeLang === lang
                  ? 'bg-amber-400 text-emerald-950 shadow-xs'
                  : 'bg-white/10 text-emerald-100 hover:bg-white/20'
              }`}
            >
              {lang === 'EN' ? 'English' : lang === 'HI' ? 'हिन्दी' : 'ગુજરાતી'}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Trust Highlight Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-3.5 flex items-center gap-3 shadow-sm border border-emerald-800/40">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center flex-shrink-0 font-black shadow-xs">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-xs text-amber-300 uppercase tracking-wider">100% Verified Partners</p>
            <p className="text-xs text-emerald-100 leading-snug">Background checked & police-cleared professionals trusted by 10,000+ local homes.</p>
          </div>
        </div>

        {/* Service Categories Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-base">⚡</span>
              <h3 className="font-black text-sm text-slate-900 tracking-tight">Popular Services</h3>
            </div>
            <Link href="/customer/services" className="text-emerald-700 text-xs font-bold flex items-center hover:underline">
              View All <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {categories.map(cat => (
              <Link key={cat.name} href="/customer/services" className="group text-center">
                <div className={`${cat.color} ${cat.hover} border w-full aspect-square rounded-2xl flex flex-col items-center justify-center mb-1.5 shadow-2xs transition group-hover:scale-105`}>
                  <cat.icon className="w-6 h-6 mb-1 transition group-hover:scale-110" />
                  <span className="text-[10px] font-bold text-slate-500">{cat.count}+</span>
                </div>
                <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Active Appointment */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>Upcoming Appointments</span>
            </h3>
            <Link href="/customer/bookings" className="text-xs text-emerald-700 font-bold hover:underline">
              Manage &gt;
            </Link>
          </div>

          <Link href="/customer/bookings" className="block bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:border-emerald-500 transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Deep Home Cleaning</p>
                  <p className="text-xs text-slate-500">Tomorrow, 10:30 AM</p>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Amir Khan (Verified Pro)
                  </p>
                </div>
              </div>

              <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-black px-2.5 py-1 rounded-full">
                Confirmed
              </span>
            </div>
          </Link>
        </div>

        {/* Highly Rated Nearby Workers */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Top Rated in Indore</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">Nearest Available</span>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {topWorkers.map((w, i) => (
              <Link key={i} href="/customer/worker/1" className="min-w-[210px] bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex-shrink-0 hover:border-emerald-500 transition">
                <div className="h-24 bg-gradient-to-br from-emerald-800 via-teal-700 to-cyan-800 p-3 flex flex-col justify-between text-white relative">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-amber-400 text-emerald-950 font-black px-2 py-0.5 rounded-md uppercase">
                      {w.badge}
                    </span>
                    <span className="text-[10px] bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded text-white font-semibold">
                      {w.tag}
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-base font-black text-amber-300">₹{w.price}/hr</span>
                    <span className="text-xs bg-white/90 text-slate-900 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold shadow-xs">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {w.rating}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-bold text-xs text-slate-900 truncate">{w.name}</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <User className="w-3 h-3 text-emerald-600" /> {w.provider}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Promo Offer Card with Saffron CTA */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 pointer-events-none" />
          <span className="bg-emerald-950/40 text-amber-200 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
            Limited Time Festive Offer
          </span>
          <h3 className="font-black text-lg mt-1.5 leading-tight text-white">
            Get Flat 20% OFF on<br />First Deep Cleaning!
          </h3>
          <p className="text-xs text-amber-100 mt-1">Use code <b className="text-white bg-black/20 px-1.5 py-0.5 rounded font-mono">SAHYOG20</b> at checkout.</p>
          <Link
            href="/customer/services"
            className="mt-3 inline-flex items-center gap-1.5 bg-white text-emerald-950 font-black text-xs px-4 py-2 rounded-xl shadow-sm hover:bg-amber-50 transition"
          >
            <span>Claim Offer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
