'use client';
import Link from 'next/link';
import { Bell, TrendingUp, TrendingDown, Users, ShieldCheck, Briefcase, DollarSign, Globe, Clock, Home, Calendar, MessageSquare, User } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Jan', bookings: 200, signups: 50 }, { month: 'Feb', bookings: 350, signups: 80 }, { month: 'Mar', bookings: 500, signups: 130 },
  { month: 'Apr', bookings: 650, signups: 190 }, { month: 'May', bookings: 780, signups: 250 }, { month: 'Jun', bookings: 900, signups: 300 },
];

const stats = [
  { label: 'Total Users', value: '12,480', change: '+12%', up: true, icon: Users, color: 'text-blue-600 bg-blue-50' },
  { label: 'Verified Workers', value: '3,245', change: '+5%', up: true, icon: ShieldCheck, color: 'text-green-600 bg-green-50' },
  { label: 'Active Jobs', value: '842', change: '-2%', up: false, icon: Briefcase, color: 'text-orange-600 bg-orange-50' },
  { label: 'Commission', value: '₹42.5k', change: '+18%', up: true, icon: DollarSign, color: 'text-teal-600 bg-teal-50' },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Analytics & Executive Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time health, operations, and revenue metrics across Gujarat & India.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/financials"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-xs transition"
          >
            <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
            <span>Revenue Breakdown</span>
          </Link>
          <Link
            href="/admin/verification"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Review Queue (24)</span>
          </Link>
        </div>
      </div>

      {/* 4 Responsive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.up ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
                {s.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl lg:text-3xl font-black text-slate-900 mt-1">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts & Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Wide Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Platform Growth & Order Volume</h2>
              <p className="text-xs text-slate-500">Monthly booking volume compared with new partner onboarding</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-teal-600" />
                <span className="text-slate-600">Total Bookings</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-slate-600">Worker Signups</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }} />
                <Area type="monotone" dataKey="bookings" stroke="#0d9488" fill="#0d9488" fillOpacity={0.15} strokeWidth={3} name="Bookings" />
                <Area type="monotone" dataKey="signups" stroke="#6366f1" fill="#6366f1" fillOpacity={0.12} strokeWidth={2} name="Signups" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Column: Regional Impact */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Regional Impact</h2>
            <p className="text-xs text-slate-500 mb-5">Market share across major Gujarat cities</p>
            <div className="space-y-4">
              {[
                { city: 'Ahmedabad', pct: 45, color: 'bg-teal-600' },
                { city: 'Surat', pct: 25, color: 'bg-indigo-500' },
                { city: 'Rajkot', pct: 20, color: 'bg-amber-500' },
                { city: 'Vadodara', pct: 10, color: 'bg-rose-500' }
              ].map((c) => (
                <div key={c.city}>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>{c.city}</span>
                    <span>{c.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div className={`${c.color} h-2.5 rounded-full`} style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-teal-50 border border-teal-200 rounded-xl p-4">
            <p className="text-xs font-bold text-teal-900">Accessibility Index: Peak</p>
            <p className="text-[11px] text-teal-700 mt-1">Gujarati and Hindi interface adoption is currently over 72% across all active booking requests.</p>
          </div>
        </div>
      </div>

      {/* Verification Queue & Quick Action Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Worker Verification Queue</h2>
            <p className="text-xs text-slate-500 mt-0.5">Maintain customer trust by reviewing government ID submissions</p>
          </div>
          <Link
            href="/admin/verification"
            className="text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 px-3.5 py-2 rounded-xl transition"
          >
            Open Verification Console →
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {[
            { name: 'Rahul Sharma', role: 'Electrician', status: 'Pending', time: '2h ago', city: 'Ahmedabad, Gujarat' },
            { name: 'Priya Patel', role: 'Cleaning Expert', status: 'Reviewing', time: '5h ago', city: 'Surat, Gujarat' },
            { name: 'Rajesh Kumar', role: 'Plumbing Specialist', status: 'Pending', time: '30m ago', city: 'Vadodara, Gujarat' }
          ].map((w, i) => (
            <div key={i} className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 text-teal-800 rounded-xl font-bold flex items-center justify-center text-xs">
                  {w.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{w.name}</p>
                  <p className="text-xs text-slate-400">{w.role} • {w.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${w.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                  {w.status}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">{w.time}</span>
                <Link href="/admin/verification" className="text-xs font-bold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-slate-700 transition">
                  Review
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
