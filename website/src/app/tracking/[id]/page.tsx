'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Phone, MessageSquare, ShieldCheck, MapPin, 
  Clock, CheckCircle2, AlertTriangle, Navigation, Star, 
  Sparkles, Check, Share2 
} from 'lucide-react';
import RealTrackingMap from '@/components/RealTrackingMap';
import WorkerChatDrawer from '@/components/WorkerChatDrawer';
import { allWorkers } from '@/data/workersData';

export default function TrackingPage() {
  const params = useParams();
  const bookingId = params.id as string;

  const [booking, setBooking] = useState<any>(null);
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const workerOtp = '5821';

  useEffect(() => {
    // 1. Check local storage bookings
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('sahyog-user-bookings');
        if (raw) {
          const list = JSON.parse(raw);
          const found = list.find((b: any) => b.id === bookingId);
          if (found) setBooking(found);
        }
      } catch {}

      // 2. Also query API
      fetch('/api/bookings')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.bookings) {
            const found = data.bookings.find((b: any) => b.id === bookingId);
            if (found) setBooking(found);
          }
        })
        .catch(() => {});
    }
  }, [bookingId]);

  const worker = allWorkers.find((w) => w.id === booking?.workerId) || allWorkers[0];

  const handleCopyOtp = () => {
    navigator.clipboard.writeText(workerOtp);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            href="/bookings"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-teal-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to My Bookings</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Live GPS Signal Active
            </span>
          </div>
        </div>

        {/* 2-Column Desktop View: Left GPS Map, Right Status & Worker Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Real Map */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Real-Time Worker Location</h2>
                  <p className="text-xs text-slate-500">Live GPS tracking powered by OpenStreetMap</p>
                </div>
                <div className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">
                  #{bookingId.slice(0, 8).toUpperCase()}
                </div>
              </div>

              {/* The Real Interactive Map */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-inner">
                <RealTrackingMap
                  workerName={worker.name + ' (' + worker.title + ')'}
                  customerAddress={booking?.address || 'B/402, Shanti Heights, Navrangpura, Ahmedabad'}
                  initialDistanceKm={2.4}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-teal-600" />
                  <span>Route: C.G. Road & Ashram Road, Ahmedabad</span>
                </div>
                <span className="font-semibold text-emerald-700">Traffic: Clear</span>
              </div>
            </div>
          </div>

          {/* Right Column: Status Card + OTP + Worker Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                  Status: In Transit
                </span>
                <span className="text-xs font-bold text-slate-400">ETA ~ 8 Mins</span>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">Worker is On The Way</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {worker.name} has accepted your job and is traveling with equipment.
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span>Trip Progress</span>
                  <span className="text-teal-700">65%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full transition-all duration-500" style={{ width: '65%' }} />
                </div>
              </div>

              {/* OTP Guard Box */}
              <div className="bg-gradient-to-br from-[#042f2e] to-[#0d9488] text-white p-5 rounded-2xl space-y-2 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                    Safety Arrival OTP
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>SahYog Guard</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-3xl font-black font-mono tracking-widest text-amber-300">
                    {workerOtp}
                  </div>
                  <button
                    onClick={handleCopyOtp}
                    className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1.5"
                  >
                    {copiedOtp ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedOtp ? 'Copied' : 'Share'}</span>
                  </button>
                </div>

                <p className="text-[10px] text-emerald-100/80 pt-1">
                  Share this 4-digit code ONLY when the partner physically arrives at your home.
                </p>
              </div>

              {/* Worker Profile Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-700 text-white font-black text-base flex items-center justify-center shadow-md">
                    {getInitials(worker.name)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{worker.name}</h4>
                    <p className="text-xs text-teal-700 font-semibold">{worker.title}</p>
                    <div className="flex items-center gap-1 text-xs text-amber-600 font-bold mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{worker.rating}</span>
                      <span className="text-slate-400 font-normal">({worker.reviewsCount} jobs)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={'tel:' + worker.phone}
                    className="p-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white shadow-xs transition"
                    title="Call Worker"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setIsChatDrawerOpen(true)}
                    className="p-2.5 rounded-xl bg-slate-200 hover:bg-teal-50 hover:text-teal-700 text-slate-700 transition relative"
                    title="Chat with Worker"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                  </button>
                </div>
              </div>

              {/* Service Details */}
              <div className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-400">Service:</span>
                  <span className="font-bold text-slate-800">{booking?.serviceTitle || booking?.serviceName || worker.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Address:</span>
                  <span className="font-bold text-slate-800 max-w-[200px] truncate text-right">
                    {booking?.address || 'Navrangpura, Ahmedabad'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Paid:</span>
                  <span className="font-black text-teal-700">₹{booking?.totalAmount || 625} (UPI Confirmed)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Chat Drawer */}
      <WorkerChatDrawer
        isOpen={isChatDrawerOpen}
        onClose={() => setIsChatDrawerOpen(false)}
        workerName={worker.name}
        workerRole={worker.title}
        workerPhone={worker.phone}
        bookingCode={booking?.serviceCode || booking?.bookingCode || 'SY-9842'}
      />
    </div>
  );
}
