'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, Search, Filter, Download, RefreshCw, 
  CheckCircle2, Clock, XCircle, AlertCircle, Phone, 
  MapPin, User, ChevronRight, MoreVertical 
} from 'lucide-react';

export default function AdminBookingsPage() {
  const [bookingList, setBookingList] = useState<any[]>([]);
  const [counts, setCounts] = useState({ total: 0, active: 0, completed: 0, pending: 0 });
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchLiveBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedStatus !== 'ALL') params.append('status', selectedStatus);
      if (search.trim()) params.append('search', search.trim());

      const res = await fetch(`/api/admin/bookings?${params.toString()}`);
      const data = await res.json();
      if (data?.bookings) {
        setBookingList(data.bookings);
      }
      if (data?.counts) {
        setCounts(data.counts);
      }
    } catch (err) {
      console.error('Failed to fetch admin bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveBookings();
  }, [selectedStatus]);

  const handleUpdateStatus = async (bookingId: string, newStatus: string) => {
    setActionLoading(bookingId);
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });
      if (res.ok) {
        fetchLiveBookings();
      }
    } catch (err) {
      console.error('Failed to update booking status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
              Bookings & Dispatch Orders
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Neon DB Live
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time management of all customer service orders across Gujarat and India.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchLiveBookings}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-teal-700 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {[
          { label: 'TOTAL ORDERS', val: counts.total, color: 'text-blue-600', filter: 'ALL' },
          { label: 'ACTIVE DISPATCH', val: counts.active, color: 'text-amber-600', filter: 'IN_PROGRESS' },
          { label: 'COMPLETED', val: counts.completed, color: 'text-emerald-600', filter: 'COMPLETED' },
          { label: 'PENDING', val: counts.pending, color: 'text-slate-600', filter: 'PENDING' },
        ].map((m) => (
          <button
            key={m.label}
            type="button"
            onClick={() => setSelectedStatus(m.filter)}
            className={`p-4 rounded-2xl border text-left transition ${
              selectedStatus === m.filter 
                ? 'bg-white border-teal-600 shadow-sm ring-2 ring-teal-600/20' 
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{m.label}</p>
            <p className={`text-2xl font-black mt-1 ${m.color}`}>{m.val}</p>
          </button>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus-within:border-teal-600 transition">
          <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by code, service, or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchLiveBookings()}
            className="w-full bg-transparent outline-none font-medium placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['ALL', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedStatus === st
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {st === 'ALL' ? 'All Status' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Live Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Order Code</th>
                <th className="py-3 px-4">Service Details</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Assigned Partner</th>
                <th className="py-3 px-4">Scheduled Slot</th>
                <th className="py-3 px-4">Fee / Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-teal-600 mb-2" />
                    <span>Loading real bookings from Neon database...</span>
                  </td>
                </tr>
              ) : bookingList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Calendar className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-slate-600">No bookings found</p>
                    <p className="text-[11px]">No records match the current filter or search criteria.</p>
                  </td>
                </tr>
              ) : (
                bookingList.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-teal-800">
                      {b.bookingCode || b.id.slice(0, 8)}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{b.serviceTitle}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span className="truncate max-w-[150px]">{b.serviceLocation}</span>
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">{b.customer?.fullName || 'Customer'}</p>
                      <p className="text-[10px] text-slate-400">{b.customer?.phone || 'No phone'}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">
                        {b.workerProfile?.user?.fullName || 'Auto Dispatch'}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {b.workerProfile?.user?.phone || 'Partner'}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-slate-800">
                        {new Date(b.scheduledDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-[10px] text-slate-400">{b.scheduledTime}</p>
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      ₹{b.totalAmount}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        b.status === 'COMPLETED'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : b.status === 'IN_PROGRESS' || b.status === 'CONFIRMED'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : b.status === 'CANCELLED'
                              ? 'bg-rose-50 text-rose-800 border border-rose-200'
                              : 'bg-slate-100 text-slate-700'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {b.status !== 'COMPLETED' && (
                          <button
                            type="button"
                            disabled={actionLoading === b.id}
                            onClick={() => handleUpdateStatus(b.id, 'COMPLETED')}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-[10px] font-bold transition"
                          >
                            Mark Done
                          </button>
                        )}
                        {b.status !== 'CANCELLED' && b.status !== 'COMPLETED' && (
                          <button
                            type="button"
                            disabled={actionLoading === b.id}
                            onClick={() => handleUpdateStatus(b.id, 'CANCELLED')}
                            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[10px] font-bold transition"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
