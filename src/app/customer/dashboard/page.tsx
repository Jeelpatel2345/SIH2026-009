'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, Search, MapPin, Star, ChevronRight, ShieldCheck, 
  Calendar, User, Sparkles, Wrench, Zap, Cpu, Hammer, 
  Paintbrush, ArrowRight, Heart, Award, Shield, CheckCircle, Clock
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useAuthStore } from '@/store/authStore';
import { serviceCategories, allWorkers } from '@/data/workersData';

const categoryIcons: Record<string, any> = {
  Sparkles,
  Wrench,
  Zap,
  Cpu,
  Hammer,
  Paintbrush,
};

export default function CustomerDashboard() {
  const { fullName, phone } = useAuthStore();
  const [activeLang, setActiveLang] = useState<'EN' | 'HI' | 'GU'>('EN');
  const [searchQuery, setSearchQuery] = useState('');

  // Top featured workers from the 100 workers collection
  const featuredWorkers = allWorkers.slice(0, 4);

  const displayName = fullName || (phone ? `Member ${phone.slice(-4)}` : 'Friend');

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-20 text-slate-900">
      {/* Desktop Top Navbar */}
      <header className="hidden md:block bg-[#042f2e] border-b border-emerald-900/50 sticky top-0 z-30 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center font-black text-emerald-950 text-sm shadow-md">
              SY
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-white">SahYog</span>
              <span className="ml-2 text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded">
                COMMUNITY HUB
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="flex items-center gap-6 text-sm font-semibold text-emerald-100">
            <Link href="/customer/dashboard" className="text-amber-300 font-bold">
              Home
            </Link>
            <Link href="/customer/services" className="hover:text-white transition">
              All 6 Services
            </Link>
            <Link href="/customer/bookings" className="hover:text-white transition">
              My Bookings
            </Link>
            <Link href="/chat/1" className="hover:text-white transition flex items-center gap-1.5">
              <span>AI Support</span>
              <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                Live
              </span>
            </Link>
            <Link href="/admin/portal" className="text-xs bg-emerald-800/80 hover:bg-emerald-700 text-emerald-200 px-3 py-1.5 rounded-lg border border-emerald-700">
              Admin Portal →
            </Link>
          </nav>

          {/* User Profile Badge */}
          <div className="flex items-center gap-3">
            <Link href="/customer/bookings" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full" />
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-700/60 px-3 py-1.5 rounded-full hover:bg-emerald-900 transition"
            >
              <div className="w-6 h-6 rounded-full bg-amber-400 text-emerald-950 font-black text-xs flex items-center justify-center">
                {displayName.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-xs font-bold text-white max-w-[100px] truncate">{displayName}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-6 space-y-6">
        {/* Top App Header with Rich Emerald Gradient */}
        <div className="bg-gradient-to-r from-[#042f2e] via-[#0d9488] to-[#0f766e] text-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-lg relative overflow-hidden">
          {/* Mobile top bar */}
          <div className="md:hidden flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center font-black text-sm text-amber-300 border border-white/20">
                SY
              </div>
              <div>
                <h1 className="font-black text-base tracking-tight leading-none text-white">SahYog</h1>
                <span className="text-[9px] text-emerald-200 font-medium tracking-wider uppercase">Community Hub</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/customer/bookings" className="p-2 rounded-full bg-white/10 text-white relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full" />
              </Link>
              <Link href="/profile" className="w-8 h-8 rounded-full bg-amber-400 text-emerald-950 font-bold text-xs flex items-center justify-center">
                {displayName.slice(0, 2).toUpperCase()}
              </Link>
            </div>
          </div>

          {/* Greeting & Location */}
          <div className="mt-3 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-200 font-semibold mb-0.5">
                <span>🙏 Namaste, {displayName}!</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white leading-tight">
                What do you need help with today?
              </h2>
            </div>

            <div className="self-start sm:self-auto bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-xs text-white">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-medium">Gujarat / Pan-India Multi-City</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-5 bg-white rounded-2xl p-2 flex items-center gap-2 shadow-xl border border-white/20">
            <Search className="w-5 h-5 text-slate-400 ml-2 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search from 100+ Plumbers, Cleaners, Electricians, Carpenters..."
              className="w-full text-xs sm:text-sm font-medium text-slate-800 outline-none placeholder-slate-400"
            />
            <Link
              href={searchQuery ? `/customer/services?search=${encodeURIComponent(searchQuery)}` : '/customer/services'}
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex-shrink-0"
            >
              Find
            </Link>
          </div>

          {/* Multi-language selector pills */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-emerald-200 font-semibold mr-1">Language:</span>
            {(['EN', 'HI', 'GU'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`text-[11px] font-bold px-3 py-1 rounded-full transition ${
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

        {/* 100% Verified Partners Trust Banner */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-black text-sm text-slate-900">100% Verified & Police-Cleared Partners</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Over 100 background-checked professionals with Aadhaar biometric validation across all 6 service categories.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Insurance Backed</span>
          </div>
        </div>

        {/* 6 Popular Service Categories in Full Responsive Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <h3 className="font-black text-base sm:text-lg text-slate-900">
                All 6 Service Categories ({allWorkers.length} Active Workers)
              </h3>
            </div>
            <Link
              href="/customer/services"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 hover:underline"
            >
              View All 100 Workers <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 6-Column Desktop Grid / 3-Column Tablet / 2-Column Mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {serviceCategories.map((cat) => {
              const Icon = categoryIcons[cat.icon] || Sparkles;
              return (
                <Link
                  key={cat.id}
                  href={`/customer/services?category=${encodeURIComponent(cat.name)}`}
                  className={`${cat.color} rounded-2xl p-4 border transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col items-center text-center group`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-2 group-hover:scale-110 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black tracking-tight text-slate-800">{cat.name}</span>
                  <span className="text-[10px] font-bold text-slate-500 mt-1 bg-white/70 px-2 py-0.5 rounded-full">
                    {cat.count}+ Partners
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Responsive 2-Column Split: Upcoming Bookings & Top Rated Professionals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Upcoming Service Appointment */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-700" />
                <span>Upcoming Appointment</span>
              </h3>
              <Link href="/customer/bookings" className="text-xs font-bold text-teal-700 hover:underline">
                Manage
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Deep Home Cleaning</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> Tomorrow, 10:30 AM
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Confirmed
                </span>
              </div>

              <div className="bg-slate-50 rounded-xl p-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-emerald-950 font-bold flex items-center justify-center text-[10px]">
                    AK
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Amir Khan</p>
                    <p className="text-[10px] text-slate-400">Verified Specialist • ★ 4.9</p>
                  </div>
                </div>
                <Link
                  href="/customer/tracking/1"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition"
                >
                  Track Partner
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Top Rated Nearby Workers */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Highly Rated Service Professionals</span>
              </h3>
              <Link href="/customer/services" className="text-xs font-bold text-teal-700 hover:underline">
                Explore All 100 →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featuredWorkers.map((w) => (
                <div
                  key={w.id}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs hover:border-teal-500 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center font-bold text-teal-800 text-xs">
                          {w.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">{w.name}</h4>
                          <span className="text-[10px] text-teal-700 font-semibold">{w.category}</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded font-bold">
                        {w.badge || 'Verified'}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-2 line-clamp-1">{w.title}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-black text-teal-800">₹{w.rate}</span>
                      <span className="text-[10px] text-slate-400"> / hr</span>
                    </div>
                    <Link
                      href={`/customer/worker/${w.id}`}
                      className="text-xs font-bold text-teal-700 hover:text-white bg-teal-50 hover:bg-teal-700 px-3 py-1.5 rounded-lg transition border border-teal-200/60"
                    >
                      View & Book
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promo Festive Offer Card */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10 pointer-events-none" />
          <span className="bg-emerald-950/40 text-amber-200 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
            Special Launch Offer
          </span>
          <h3 className="font-black text-xl sm:text-2xl mt-1.5 leading-tight text-white">
            Get Flat 20% OFF on Any Service Booking!
          </h3>
          <p className="text-xs sm:text-sm text-amber-100 mt-1">
            Choose from 1 hr, 4 hr half-day, or 8 hr full-day packages. Use code <b className="text-white bg-black/20 px-1.5 py-0.5 rounded font-mono">SAHYOG20</b>.
          </p>
          <Link
            href="/customer/services"
            className="mt-4 inline-flex items-center gap-1.5 bg-white text-emerald-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-sm hover:bg-amber-50 transition"
          >
            <span>Book a Professional Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Mobile-only Bottom Navigation */}
      <BottomNav role="customer" />
    </div>
  );
}
