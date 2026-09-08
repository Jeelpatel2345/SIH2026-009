'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, MapPin, Clock, Zap, ChevronRight, AlertTriangle, 
  Calendar, Home, MessageSquare, User, Navigation, Phone, 
  CheckCircle2, X, Upload, ShieldCheck, Check, ExternalLink,
  ChevronDown, HelpCircle, ArrowRight
} from 'lucide-react';
import RealTrackingMap from '@/components/RealTrackingMap';

export default function WorkerDashboard() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const [workerName, setWorkerName] = useState('Sanjay Kumar');
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeJobStatus, setActiveJobStatus] = useState<'IN PROGRESS' | 'ON THE WAY' | 'COMPLETED'>('IN PROGRESS');
  const [uploadedAadhar, setUploadedAadhar] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSubmitted, setVerificationSubmitted] = useState(false);

  // Role Guard & Profile Hydration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('sahyog-role');
      if (storedRole === 'CUSTOMER') {
        router.replace('/customer/dashboard');
        return;
      }
      const savedName = localStorage.getItem('sahyog-user-name');
      if (savedName) setWorkerName(savedName);

      // Fetch live worker profile if available
      fetch('/api/user/profile')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.user?.fullName) {
            setWorkerName(data.user.fullName);
            localStorage.setItem('sahyog-user-name', data.user.fullName);
          }
        })
        .catch(() => {});
    }
  }, [router]);

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };
  const initials = getInitials(workerName);

  const handleAadharUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedAadhar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSubmitted(true);
      setShowUploadModal(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 pb-28 text-slate-900">
      {/* Container to maintain max width on mobile while looking elegant on desktop */}
      <div className="max-w-xl mx-auto min-h-screen bg-white shadow-xl shadow-slate-200/50 flex flex-col">
        
        {/* Top Header Bar */}
        <header className="bg-white px-5 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2.5">
            <img 
              src="/logo.png" 
              alt="SahYog" 
              className="w-9 h-9 rounded-full object-cover border border-teal-200 shadow-xs" 
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-black text-lg tracking-tight text-slate-900 leading-none">
                  SahYog Worker
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Partner
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Welcome back, <b className="text-teal-900">{workerName}</b>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link 
              href="/notifications" 
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-600 rounded-full" />
            </Link>

            <Link 
              href="/profile" 
              className="w-9 h-9 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-black text-xs flex items-center justify-center shadow-sm transition"
              title="My Profile"
            >
              {initials}
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-5 space-y-4">
          
          {/* Status Toggle Card (Online / Offline) */}
          <div 
            className={`rounded-2xl p-4 transition-all duration-300 shadow-sm ${
              isOnline 
                ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-teal-900/10' 
                : 'bg-slate-700 text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-300 animate-ping' : 'bg-slate-400'}`} />
                  <p className="text-white font-black text-lg tracking-tight">
                    {isOnline ? 'You are Online' : 'You are Offline'}
                  </p>
                </div>
                <p className="text-teal-100 text-xs sm:text-sm mt-0.5">
                  {isOnline ? 'Accepting new jobs nearby' : 'Not accepting jobs • Switch on when ready'}
                </p>
              </div>

              {/* iOS style toggle switch */}
              <button 
                type="button"
                onClick={() => setIsOnline(!isOnline)} 
                className={`w-14 h-8 rounded-full relative transition-colors duration-200 cursor-pointer ${
                  isOnline ? 'bg-white/30' : 'bg-slate-600'
                }`}
                aria-label="Toggle Online Status"
              >
                <div 
                  className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all duration-200 shadow-md ${
                    isOnline ? 'right-1' : 'left-1'
                  }`} 
                />
              </button>
            </div>

            {isOnline && (
              <div className="mt-3.5 bg-teal-800/60 backdrop-blur-xs rounded-xl p-2.5 flex items-center gap-2 border border-teal-500/30">
                <Zap className="w-4 h-4 text-amber-300 animate-bounce flex-shrink-0" />
                <span className="text-white text-xs font-semibold">
                  High demand in your area! 4+ requests waiting.
                </span>
              </div>
            )}
          </div>

          {/* Weekly Earnings Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                WEEKLY EARNINGS
              </p>
              <Link 
                href="/worker/earnings" 
                className="text-teal-700 hover:text-teal-800 text-xs font-bold flex items-center gap-0.5"
              >
                History <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex items-center justify-between mt-1">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  ₹ 4,850
                </span>
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 text-xs font-bold ml-2 px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                  📈 +12%
                </span>
              </div>

              {/* 7-Day Visual Mini Bar Chart */}
              <div className="flex items-end gap-1.5 h-10 px-2 py-1 bg-slate-50 rounded-xl border border-slate-100">
                {[
                  { day: 'M', h: 40 },
                  { day: 'T', h: 60 },
                  { day: 'W', h: 35 },
                  { day: 'T', h: 80 },
                  { day: 'F', h: 55 },
                  { day: 'S', h: 70 },
                  { day: 'S', h: 95, active: true },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <div 
                      className={`w-2.5 rounded-t-sm transition-all ${
                        bar.active ? 'bg-teal-700 shadow-xs' : 'bg-slate-200'
                      }`} 
                      style={{ height: `${bar.h * 0.35}px` }} 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-slate-500 font-medium">Target: ₹ 6,000</span>
              <span className="text-teal-700 font-bold">80% Reached</span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2 mt-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-teal-600 to-emerald-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: '80%' }} 
              />
            </div>

            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-xs">
              <span className="text-slate-400">Next payout: <b>Monday, 27 Oct</b></span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Direct Bank Transfer
              </span>
            </div>
          </div>

          {/* Active Job Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-700" />
                Active Job
              </h3>
              <span className="text-[11px] font-bold border border-teal-600 bg-teal-50 text-teal-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {activeJobStatus}
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border-2 border-teal-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-full -mr-10 -mt-10 pointer-events-none" />

              <div className="flex items-start justify-between relative z-10">
                <div>
                  <span className="text-teal-700 font-black text-base tracking-tight block">
                    Plumbing Repair
                  </span>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">
                    Amit Sharma
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-xl text-slate-900 leading-none">₹ 650</p>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">Fixed Fee</p>
                </div>
              </div>

              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
                  <span className="font-medium text-slate-800">Sector 45, Gurgaon</span>
                  <span className="text-[11px] text-slate-400">• 2.4 km away</span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
                  <span>Today: <b>10:30 AM - 12:30 PM</b></span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setShowDirectionsModal(true)}
                  className="flex-1 bg-teal-700 hover:bg-teal-800 text-white py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Directions</span>
                </button>

                <button 
                  type="button"
                  onClick={() => setShowContactModal(true)}
                  className="p-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl flex items-center justify-center transition"
                  title="Contact Customer"
                >
                  <Phone className="w-4 h-4 text-teal-700" />
                </button>

                <Link
                  href="/chat/1?role=worker"
                  className="p-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl flex items-center justify-center transition relative"
                  title="Chat with Customer"
                >
                  <MessageSquare className="w-4 h-4 text-teal-700" />
                  <span className="w-2 h-2 bg-amber-500 rounded-full absolute top-1 right-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Upcoming Bookings Section */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span>📋</span> Upcoming Bookings
              </h3>
              <Link 
                href="/worker/bookings" 
                className="text-teal-700 hover:text-teal-800 text-xs font-bold flex items-center gap-0.5"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2">
              {[
                { 
                  id: 'bk-101',
                  title: 'Fan Installation & Wiring', 
                  loc: 'Golf Course Rd, Gurgaon', 
                  date: 'TOMORROW', 
                  time: '09:00 AM', 
                  price: 450,
                  customer: 'Pooja Verma'
                }, 
                { 
                  id: 'bk-102',
                  title: 'Deep Kitchen Cleaning', 
                  loc: 'Cyber Hub, DLF Phase 2', 
                  date: '24 OCT', 
                  time: '02:00 PM', 
                  price: 1200,
                  customer: 'Vikas Mehra'
                }
              ].map((booking) => (
                <Link
                  key={booking.id}
                  href="/worker/bookings"
                  className="bg-white rounded-xl p-3.5 border border-slate-200 hover:border-teal-300 transition flex items-center gap-3.5 group shadow-2xs"
                >
                  <div className="w-10 h-10 bg-teal-50 group-hover:bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center flex-shrink-0 transition">
                    <Calendar className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                      {booking.title}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {booking.customer} • {booking.loc}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {booking.date}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {booking.time}
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="font-black text-slate-900 text-sm sm:text-base">
                      ₹{booking.price}
                    </p>
                    <ChevronRight className="w-4 h-4 text-slate-400 ml-auto mt-1 group-hover:text-teal-700 transition" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Verification Pending Alert Card */}
          {!verificationSubmitted ? (
            <div className="bg-rose-50/80 border border-rose-200/80 rounded-2xl p-4 flex items-start gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-rose-900 text-sm">
                    Verification Pending
                  </p>
                  <span className="text-[10px] font-bold bg-rose-200 text-rose-800 px-2 py-0.5 rounded-md uppercase">
                    Action Required
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Please upload your Aadhaar Card back side to complete your profile verification and unlock 100% daily payouts.
                </p>
                <button 
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                  className="mt-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-3.5 py-1.5 rounded-lg transition inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload Now
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-900 text-sm">
                  Documents Submitted for Verification
                </p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Your Aadhaar card has been submitted. Our team is verifying it within 2 business hours.
                </p>
              </div>
            </div>
          )}

        </main>

        {/* Bottom Navigation Bar */}
        <nav className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex justify-around items-center z-20">
          <Link 
            href="/worker/dashboard" 
            className="flex flex-col items-center justify-center flex-1 py-1 group"
          >
            <div className="p-1 rounded-xl bg-teal-50 text-teal-700">
              <Home className="w-5 h-5 stroke-[2.5]" />
            </div>
            <p className="text-[10px] font-bold text-teal-800 mt-0.5">Home</p>
            <span className="w-1 h-1 bg-teal-600 rounded-full mt-0.5" />
          </Link>

          <Link 
            href="/worker/bookings" 
            className="flex flex-col items-center justify-center flex-1 py-1 text-slate-400 hover:text-slate-600 group"
          >
            <div className="p-1 rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 mt-0.5">Bookings</p>
          </Link>

          <Link 
            href="/chat/1?role=worker" 
            className="flex flex-col items-center justify-center flex-1 py-1 text-slate-400 hover:text-slate-600 group relative"
          >
            <div className="p-1 rounded-xl relative">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                9
              </span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 mt-0.5">Chat</p>
          </Link>

          <Link 
            href="/profile" 
            className="flex flex-col items-center justify-center flex-1 py-1 text-slate-400 hover:text-slate-600 group"
          >
            <div className="p-1 rounded-xl">
              <User className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 mt-0.5">Profile</p>
          </Link>
        </nav>

      </div>

      {/* Real Directions & Map Modal */}
      {showDirectionsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
            <div className="bg-teal-800 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-amber-300" />
                  Route to Amit Sharma
                </h3>
                <p className="text-xs text-teal-200">Sector 45, Gurgaon • 2.4 km (8 mins)</p>
              </div>
              <button 
                type="button"
                onClick={() => setShowDirectionsModal(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              {/* Interactive Live Route Map */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <RealTrackingMap 
                  workerName="You (On the way)" 
                  customerAddress="Sector 45, Gurgaon" 
                  initialDistanceKm={2.4} 
                />
              </div>

              {/* Status Updater */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Update Job Progress
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {(['ON THE WAY', 'IN PROGRESS', 'COMPLETED'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setActiveJobStatus(status)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition border ${
                        activeJobStatus === status
                          ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* External GPS launcher */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Sector+45+Gurgaon"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition"
              >
                <ExternalLink className="w-4 h-4" />
                Open Turn-by-Turn in Google Maps
              </a>
            </div>

            <div className="p-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowDirectionsModal(false)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Aadhaar Upload Verification Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-base text-slate-900">Upload Aadhaar Card (Back)</h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Upload a clear photo or scanned copy of the backside of your Aadhaar card showing your residential address for verified partner status.
            </p>

            <div className="border-2 border-dashed border-teal-300 bg-teal-50/40 rounded-2xl p-6 text-center">
              {uploadedAadhar ? (
                <div className="space-y-2">
                  <img 
                    src={uploadedAadhar} 
                    alt="Aadhaar Preview" 
                    className="max-h-36 mx-auto rounded-lg object-contain border border-teal-200 shadow-xs" 
                  />
                  <p className="text-xs text-emerald-700 font-bold flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" /> Ready to Submit
                  </p>
                </div>
              ) : (
                <label className="cursor-pointer block space-y-2">
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 mx-auto flex items-center justify-center shadow-xs">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-teal-800">Tap to Choose Photo or Document</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">JPG, PNG, or PDF up to 5MB</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*,application/pdf" 
                    className="hidden" 
                    onChange={handleAadharUpload}
                  />
                </label>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!uploadedAadhar || isVerifying}
                onClick={submitVerification}
                className="flex-1 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                {isVerifying ? 'Verifying...' : 'Submit Document'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Customer Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Contact Customer</h3>
              <button 
                type="button"
                onClick={() => setShowContactModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center">
                AS
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Amit Sharma</p>
                <p className="text-xs text-slate-500">Sector 45, Gurgaon</p>
              </div>
            </div>

            <div className="space-y-2">
              <a 
                href="tel:+919876543210"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition"
              >
                <Phone className="w-4 h-4" />
                Call Customer (+91 98765 43210)
              </a>

              <Link
                href="/chat/1?role=worker"
                className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition"
              >
                <MessageSquare className="w-4 h-4" />
                Open Live In-App Chat
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
