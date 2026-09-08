'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, Clock, MapPin, CheckCircle, ArrowRight, 
  ShieldCheck, AlertCircle, Sparkles, ChevronRight, Phone 
} from 'lucide-react';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) setBookings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = bookings.filter((b) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'ACTIVE') return b.status === 'CONFIRMED' || b.status === 'IN_PROGRESS' || b.status === 'PENDING';
    if (activeTab === 'COMPLETED') return b.status === 'COMPLETED';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Service Bookings</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Track your upcoming appointments, service codes, and history.
            </p>
          </div>

          <Link
            href="/services"
            className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition shadow-sm flex items-center gap-2 self-start sm:self-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Another Service</span>
          </Link>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 w-fit shadow-xs">
          {(['ALL', 'ACTIVE', 'COMPLETED'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={'text-xs font-bold px-5 py-2 rounded-xl transition ' + (
                activeTab === tab
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              {tab === 'ALL' ? 'All Bookings' : tab === 'ACTIVE' ? 'Active / Upcoming' : 'Past Completed'}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                        #{b.serviceCode || b.id.slice(0, 8).toUpperCase()}
                      </span>
                      <span className={'text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ' + (
                        b.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' :
                        b.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      )}>
                        {b.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-2">{b.serviceName || 'Home Service'}</h3>
                  </div>

                  <div className="text-right sm:text-right w-full sm:w-auto">
                    <span className="text-[11px] text-slate-400 block font-medium">Total Amount</span>
                    <span className="text-xl font-black text-teal-800">₹{b.totalAmount}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span><b>Date:</b> {b.bookingDate || 'Scheduled'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span><b>Time:</b> {b.bookingTime || '10:00 AM'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span><b>Security:</b> 4-Digit OTP Guard</span>
                  </div>
                </div>

                {b.address && (
                  <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-xs space-y-4 max-w-md mx-auto">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
            <div>
              <h3 className="text-base font-bold text-slate-800">No bookings in this tab</h3>
              <p className="text-xs text-slate-500 mt-1">
                When you book home services, they will appear right here with full details.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 bg-teal-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs"
            >
              <span>Explore Services</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
