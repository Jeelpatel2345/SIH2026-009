'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bell, Globe, TrendingUp, DollarSign, Download, CreditCard, Sliders, CheckCircle, Clock, XCircle, Plus, Home, Calendar, MessageSquare, User } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Feb', revenue: 450000, commission: 45000 },
  { month: 'Mar', revenue: 580000, commission: 58000 },
  { month: 'Apr', revenue: 640000, commission: 64000 },
  { month: 'May', revenue: 750000, commission: 75000 },
  { month: 'Jun', revenue: 845000, commission: 84500 },
];

const transactions = [
  { id: 'TX-1092', name: 'Rajesh Kumar', service: 'Deep Cleaning', amount: '₹2,499', status: 'Completed' },
  { id: 'TX-1091', name: 'Priya Shah', service: 'AC Repair', amount: '₹1,200', status: 'Pending' },
  { id: 'TX-1090', name: 'Amit Patel', service: 'Home Painting', amount: '₹15,000', status: 'Completed' },
  { id: 'TX-1089', name: 'Sunita G.', service: 'Plumbing', amount: '₹800', status: 'Failed' }
];

export default function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState<'revenue' | 'category'>('revenue');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Financial Dashboard & Revenue Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track gross booking volume, commission revenue, and service partner disbursements.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition">
            <Download className="w-3.5 h-3.5" />
            <span>Export Financial Audit</span>
          </button>
        </div>
      </div>

      {/* 4 Responsive Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-base font-black text-teal-600">₹</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">+12.5%</span>
          </div>
          <p className="text-2xl lg:text-3xl font-black text-slate-900 mt-2">₹8.45L</p>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">TOTAL REVENUE (GMV)</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <DollarSign className="w-5 h-5 text-indigo-600" />
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">+8.2%</span>
          </div>
          <p className="text-2xl lg:text-3xl font-black text-slate-900 mt-2">₹84.5K</p>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">PLATFORM COMMISSION</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <CreditCard className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Weekly</span>
          </div>
          <p className="text-2xl lg:text-3xl font-black text-slate-900 mt-2">₹7.60L</p>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">WORKER EARNINGS PAID</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <Sliders className="w-5 h-5 text-teal-600" />
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">Standard</span>
          </div>
          <p className="text-2xl lg:text-3xl font-black text-slate-900 mt-2">10%</p>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">COMMISSION RATE</p>
        </div>
      </div>

      {/* Recharts Area Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Revenue & Commission Growth</h2>
              <p className="text-xs text-slate-500">Monthly breakdown over the last 5 operational cycles</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-teal-600" /> Revenue (₹)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-indigo-600" /> Commission (₹)</span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="revenue" stroke="#0d9488" strokeWidth={2} fill="#0d9488" fillOpacity={0.12} />
                <Area type="monotone" dataKey="commission" stroke="#6366f1" strokeWidth={2} fill="#6366f1" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial Tools & Milestone Card */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold">Monthly Target</p>
              <span className="text-base font-black text-teal-400">72%</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Goal: ₹10,00,000 GMV</p>
            <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2 overflow-hidden">
              <div className="bg-teal-400 h-2.5 rounded-full" style={{ width: '72%' }} />
            </div>
            <p className="text-[11px] text-slate-400">₹2.8L remaining to hit monthly milestone target.</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Quick Financial Operations</h3>
            <button className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-left flex items-center gap-3 transition">
              <Download className="w-4 h-4 text-teal-600" />
              <div>
                <p className="text-xs font-bold text-slate-800">Export Monthly Tax Invoices</p>
                <p className="text-[10px] text-slate-400">GST 18% compliance sheets</p>
              </div>
            </button>
            <button className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-left flex items-center gap-3 transition">
              <CreditCard className="w-4 h-4 text-amber-600" />
              <div>
                <p className="text-xs font-bold text-slate-800">Initiate Worker Payout Batch</p>
                <p className="text-[10px] text-slate-400">12 verified partners ready</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Recent Settled Transactions</h2>
          <span className="text-xs font-bold text-teal-700">Auto UPI Settlements</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-6">Transaction ID</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Partner</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6 text-right">Settled Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-6 font-mono font-bold text-teal-700">{tx.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{tx.service}</td>
                  <td className="py-3.5 px-4 text-slate-600 text-xs">{tx.name}</td>
                  <td className="py-3.5 px-4">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      tx.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right font-black text-slate-900">{tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
