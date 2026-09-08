'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Bell, Calendar, MapPin, Phone, MessageSquare, 
  Navigation, CheckCircle2, Clock, Search, Filter, ChevronRight, 
  Home, User, AlertCircle, ExternalLink, ShieldCheck, Sparkles 
} from 'lucide-react';
import RealTrackingMap from '@/components/RealTrackingMap';

interface JobBooking {
  id: string;
  service: string;
  category: string;
  customerName: string;
  customerPhone: string;
  address: string;
  date: string;
  time: string;
  amount: number;
  paymentMode: 'Online Paid' | 'Cash on Delivery';
  status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED';
  distance: string;
}

const initialJobs: JobBooking[] = [
  {
    id: 'BK-9801',
    service: 'Plumbing Repair & Leakage Fix',
    category: 'Plumbing',
    customerName: 'Amit Sharma',
    customerPhone: '+91 98765 43210',
    address: 'Sector 45, Gurgaon, Haryana',
    date: 'Today',
    time: '10:30 AM - 12:30 PM',
    amount: 650,
    paymentMode: 'Online Paid',
    status: 'ACTIVE',
    distance: '2.4 km',
  },
  {
    id: 'BK-9802',
    service: 'Ceiling Fan Installation & Wiring',
    category: 'Electrician',
    customerName: 'Pooja Verma',
    customerPhone: '+91 98234 56789',
    address: 'Golf Course Rd, Phase 5, Gurgaon',
    date: 'Tomorrow',
    time: '09:00 AM - 10:30 AM',
    amount: 450,
    paymentMode: 'Online Paid',
    status: 'UPCOMING',
    distance: '4.1 km',
  },
  {
    id: 'BK-9803',
    service: 'Full Deep Kitchen Cleaning & Degreasing',
    category: 'Cleaning',
    customerName: 'Vikas Mehra',
    customerPhone: '+91 97111 22334',
    address: 'Cyber Hub Tower B, DLF Phase 2',
    date: '24 Oct 2026',
    time: '02:00 PM - 04:30 PM',
    amount: 1200,
    paymentMode: 'Cash on Delivery',
    status: 'UPCOMING',
    distance: '5.8 km',
  },
  {
    id: 'BK-9750',
    service: 'Switchboard Repair & MCB Replacement',
    category: 'Electrician',
    customerName: 'Neha Gupta',
    customerPhone: '+91 96555 44332',
    address: 'Sushant Lok 1, Block C, Gurgaon',
    date: '18 Oct 2026',
    time: '11:00 AM - 12:00 PM',
    amount: 550,
    paymentMode: 'Online Paid',
    status: 'COMPLETED',
    distance: '3.2 km',
  },
  {
    id: 'BK-9721',
    service: 'Water Tap & Flush Tank Replacement',
    category: 'Plumbing',
    customerName: 'Rahul Kapoor',
    customerPhone: '+91 99888 77665',
    address: 'South City 1, Gurgaon',
    date: '15 Oct 2026',
    time: '04:00 PM - 05:30 PM',
    amount: 800,
    paymentMode: 'Online Paid',
    status: 'COMPLETED',
    distance: '1.9 km',
  },
];

export default function WorkerBookingsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobBooking[]>(initialJobs);
  const [filterTab, setFilterTab] = useState<'ALL' | 'ACTIVE' | 'UPCOMING' | 'COMPLETED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDirectionsJob, setActiveDirectionsJob] = useState<JobBooking | null>(null);

  // Role Guard
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('sahyog-role');
      if (storedRole === 'CUSTOMER') {
        router.replace('/customer/dashboard');
      }
    }
  }, [router]);

  const handleMarkCompleted = (id: string) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: 'COMPLETED' } : job))
    );
  };

  const filteredJobs = jobs.filter((job) => {
    if (filterTab !== 'ALL' && job.status !== filterTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        job.service.toLowerCase().includes(q) ||
        job.customerName.toLowerCase().includes(q) ||
        job.address.toLowerCase().includes(q) ||
        job.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100/70 pb-28 text-slate-900">
      <div className="max-w-xl mx-auto min-h-screen bg-white shadow-xl shadow-slate-200/50 flex flex-col">
        
        {/* Top App Header */}
        <header className="bg-white px-4 py-3.5 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <Link 
              href="/worker/dashboard" 
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-black text-lg tracking-tight text-slate-900 leading-none">
                My Bookings & Jobs
              </h1>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Manage your accepted and completed jobs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link 
              href="/notifications" 
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition relative"
            >
              <Bell className="w-5 h-5" />
              <span className="w-2 h-2 bg-teal-600 rounded-full absolute top-1.5 right-1.5" />
            </Link>
            <Link 
              href="/profile" 
              className="w-8 h-8 rounded-full bg-teal-700 text-white font-bold text-xs flex items-center justify-center shadow-xs"
            >
              SK
            </Link>
          </div>
        </header>

        {/* Search & Tabs */}
        <div className="p-4 border-b border-slate-100 space-y-3 bg-slate-50/60">
          {/* Search Bar */}
          <div className="flex items-center bg-white border border-slate-200 rounded-2xl px-3 py-2 text-sm shadow-xs focus-within:border-teal-600 transition">
            <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
            <input 
              type="text"
              placeholder="Search by customer, service or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-xs sm:text-sm font-medium placeholder-slate-400"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {(['ALL', 'ACTIVE', 'UPCOMING', 'COMPLETED'] as const).map((tab) => {
              const count = jobs.filter(j => tab === 'ALL' || j.status === tab).length;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilterTab(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                    filterTab === tab
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab === 'ALL' ? 'All Jobs' : tab.charAt(0) + tab.slice(1).toLowerCase()}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    filterTab === tab ? 'bg-teal-900/60 text-teal-100' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Jobs List */}
        <main className="flex-1 p-4 space-y-3.5">
          {filteredJobs.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <Calendar className="w-12 h-12 mx-auto text-slate-300" />
              <p className="font-bold text-sm text-slate-600">No bookings found</p>
              <p className="text-xs">No jobs match your current search or filter criteria.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div 
                key={job.id}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:border-teal-300 transition space-y-3"
              >
                {/* Header info */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {job.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        job.status === 'ACTIVE'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                          : job.status === 'UPCOMING'
                            ? 'bg-teal-50 text-teal-800 border border-teal-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <h3 className="font-black text-slate-900 text-sm sm:text-base mt-1 leading-snug">
                      {job.service}
                    </h3>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="font-black text-lg text-slate-900">₹{job.amount}</p>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      {job.paymentMode}
                    </span>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between font-medium text-slate-800">
                    <span className="font-bold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-teal-700" />
                      {job.customerName}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{job.distance} away</span>
                  </div>

                  <p className="flex items-center gap-1.5 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
                    <span>{job.address}</span>
                  </p>

                  <p className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
                    <span><b>{job.date}</b> • {job.time}</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  {job.status !== 'COMPLETED' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setActiveDirectionsJob(job)}
                        className="flex-1 py-2 px-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Directions</span>
                      </button>

                      <a
                        href={`tel:${job.customerPhone}`}
                        className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 transition"
                        title="Call Customer"
                      >
                        <Phone className="w-4 h-4 text-teal-700" />
                      </a>

                      <Link
                        href="/chat/1"
                        className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 transition"
                        title="Chat"
                      >
                        <MessageSquare className="w-4 h-4 text-teal-700" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleMarkCompleted(job.id)}
                        className="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs rounded-xl transition flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Complete</span>
                      </button>
                    </>
                  ) : (
                    <div className="w-full py-2 bg-emerald-50 text-emerald-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Completed & Payment Credited (₹{job.amount})</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </main>

        {/* Bottom Navigation */}
        <nav className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex justify-around items-center z-20">
          <Link 
            href="/worker/dashboard" 
            className="flex flex-col items-center justify-center flex-1 py-1 text-slate-400 hover:text-slate-600 group"
          >
            <div className="p-1 rounded-xl">
              <Home className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 mt-0.5">Home</p>
          </Link>

          <Link 
            href="/worker/bookings" 
            className="flex flex-col items-center justify-center flex-1 py-1 group"
          >
            <div className="p-1 rounded-xl bg-teal-50 text-teal-700">
              <Calendar className="w-5 h-5 stroke-[2.5]" />
            </div>
            <p className="text-[10px] font-bold text-teal-800 mt-0.5">Bookings</p>
            <span className="w-1 h-1 bg-teal-600 rounded-full mt-0.5" />
          </Link>

          <Link 
            href="/chat/1" 
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

      {/* Directions Modal */}
      {activeDirectionsJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
            <div className="bg-teal-800 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-amber-300" />
                  Route to {activeDirectionsJob.customerName}
                </h3>
                <p className="text-xs text-teal-200">{activeDirectionsJob.address}</p>
              </div>
              <button 
                type="button"
                onClick={() => setActiveDirectionsJob(null)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition"
              >
                ✕
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <RealTrackingMap 
                  workerName="You (On the way)" 
                  customerAddress={activeDirectionsJob.address} 
                  initialDistanceKm={parseFloat(activeDirectionsJob.distance) || 2.5} 
                />
              </div>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeDirectionsJob.address)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition"
              >
                <ExternalLink className="w-4 h-4" />
                Open in Google Maps Navigation
              </a>
            </div>

            <div className="p-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveDirectionsJob(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
