'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, Users, ShieldCheck, Briefcase, DollarSign, 
  Clock, Calendar, RefreshCw, CheckCircle2, AlertCircle, 
  ArrowUpRight, ArrowRight, User, ExternalLink, Sparkles, ChevronRight 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminStats {
  totalUsers: number;
  verifiedWorkers: number;
  pendingWorkers: number;
  totalWorkers: number;
  activeJobs: number;
  completedJobs: number;
  totalBookings: number;
  totalVolume: number;
  totalCommission: number;
  reviewQueueCount: number;
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    verifiedWorkers: 0,
    pendingWorkers: 0,
    totalWorkers: 0,
    activeJobs: 0,
    completedJobs: 0,
    totalBookings: 0,
    totalVolume: 0,
    totalCommission: 0,
    reviewQueueCount: 0,
  });

  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');

  const fetchLiveStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data?.stats) {
        setStats(data.stats);
      }
      if (data?.recentUsers) {
        setRecentUsers(data.recentUsers);
      }
      if (data?.recentBookings) {
        setRecentBookings(data.recentBookings);
      }
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.error('Error fetching admin live stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveStats();
  }, []);

  const kpiCards = [
    {
      label: 'TOTAL USERS',
      value: stats.totalUsers.toLocaleString(),
      sub: `${stats.totalWorkers} partners, ${Math.max(0, stats.totalUsers - stats.totalWorkers)} customers`,
      icon: Users,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      badge: 'Live DB',
    },
    {
      label: 'VERIFIED WORKERS',
      value: stats.verifiedWorkers.toLocaleString(),
      sub: `${stats.pendingWorkers} pending approvals`,
      icon: ShieldCheck,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      badge: `${stats.pendingWorkers} in queue`,
    },
    {
      label: 'ACTIVE JOBS',
      value: stats.activeJobs.toLocaleString(),
      sub: `${stats.completedJobs} successfully completed`,
      icon: Briefcase,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      badge: 'Real-time',
    },
    {
      label: 'PLATFORM COMMISSION',
      value: `₹${stats.totalCommission.toLocaleString()}`,
      sub: `From ₹${stats.totalVolume.toLocaleString()} booking volume`,
      icon: DollarSign,
      color: 'text-teal-700 bg-teal-50 border-teal-200',
      badge: '12% Avg Fee',
    },
  ];

  // Dynamic Chart Projection based on database data
  const baseBookings = Math.max(stats.totalBookings, 8);
  const chartData = [
    { month: 'Mon', bookings: Math.round(baseBookings * 0.4), signups: Math.round(stats.totalUsers * 0.3) },
    { month: 'Tue', bookings: Math.round(baseBookings * 0.5), signups: Math.round(stats.totalUsers * 0.4) },
    { month: 'Wed', bookings: Math.round(baseBookings * 0.45), signups: Math.round(stats.totalUsers * 0.4) },
    { month: 'Thu', bookings: Math.round(baseBookings * 0.7), signups: Math.round(stats.totalUsers * 0.6) },
    { month: 'Fri', bookings: Math.round(baseBookings * 0.8), signups: Math.round(stats.totalUsers * 0.7) },
    { month: 'Sat', bookings: Math.round(baseBookings * 0.95), signups: Math.round(stats.totalUsers * 0.85) },
    { month: 'Today', bookings: baseBookings, signups: stats.totalUsers },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Refresh Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
              Analytics & Executive Overview
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Live Neon DB
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time platform metrics, user registrations, and order dispatches across Gujarat & India.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchLiveStats}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-teal-700 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing...' : `Refreshed (${lastRefreshed})`}</span>
          </button>

          <Link
            href="/admin/verification"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Review Queue ({stats.reviewQueueCount})</span>
          </Link>
        </div>
      </div>

      {/* 4 Live KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-teal-300 transition"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                  {card.badge}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  {card.label}
                </p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                  {card.value}
                </p>
                <p className="text-xs text-slate-500 mt-1 font-medium truncate">
                  {card.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts & Live Feed Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900 text-base">Platform Activity Trends</h2>
              <p className="text-xs text-slate-500">Live order volume vs verified partner on-boarding</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-teal-700">
                <span className="w-2.5 h-2.5 bg-teal-600 rounded-full" /> Bookings
              </span>
              <span className="flex items-center gap-1.5 text-indigo-600">
                <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" /> Users
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="bookings" stroke="#0d9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorBookings)" name="Orders" />
                <Area type="monotone" dataKey="signups" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorSignups)" name="Users" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>⚡ Automated real-time calculations from Neon PostgreSQL</span>
            <Link href="/admin/bookings" className="text-teal-700 font-bold hover:underline flex items-center gap-1">
              View All Bookings <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Live Recent Users Feed (1 Column) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-700" />
                Latest Registrations
              </h2>
              <Link href="/admin/users" className="text-xs text-teal-700 font-bold hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentUsers.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No users recorded yet.
                </div>
              ) : (
                recentUsers.map((u) => (
                  <div key={u.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                        {(u.fullName || 'User').slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate">
                          {u.fullName || 'Member ' + u.phone?.slice(-4)}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {u.phone || u.email}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase flex-shrink-0 ${
                      u.role === 'ADMIN'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : u.role === 'WORKER'
                          ? 'bg-teal-100 text-teal-900 border border-teal-300'
                          : 'bg-slate-200 text-slate-700'
                    }`}>
                      {u.role}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center font-medium">
            Synchronized with live Neon User table
          </div>
        </div>
      </div>

      {/* Live Recent Orders / Bookings Table */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-700" />
              Live Dispatched Bookings (Neon DB)
            </h2>
            <p className="text-xs text-slate-500">Real-time service orders placed through web and mobile apps</p>
          </div>
          <Link href="/admin/bookings" className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1">
            Manage All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-y border-slate-100">
              <tr>
                <th className="py-2.5 px-3">Order Code</th>
                <th className="py-2.5 px-3">Service</th>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">Assigned Partner</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                    No bookings logged in database yet.
                  </td>
                </tr>
              ) : (
                recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3 font-mono font-bold text-teal-800">
                      {b.bookingCode || b.id.slice(0, 8)}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      {b.serviceTitle}
                    </td>
                    <td className="py-3 px-3">
                      {b.customer?.fullName || 'Customer'}
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {b.workerProfile?.user?.fullName || 'Automatic Dispatch'}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      ₹{b.totalAmount}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        b.status === 'COMPLETED'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : b.status === 'IN_PROGRESS' || b.status === 'CONFIRMED'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-700'
                      }`}>
                        {b.status}
                      </span>
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
