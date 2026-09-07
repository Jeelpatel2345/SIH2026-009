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
  { id: 'TX-1089', name: 'Sunita G.', service: 'Plumbing', amount: '₹800', status: 'Failed' },
];

export default function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState<'revenue' | 'category'>('revenue');

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 flex items-center gap-3 border-b">
        <Link href="/admin/overview"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="font-semibold text-lg flex-1">Financial Dashboard</h1>
        <Bell className="w-5 h-5 text-gray-600" />
        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-teal-600" />
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold">Revenue Analytics</h2>
          <div className="flex items-center gap-1 border rounded-full px-3 py-1 text-xs bg-white text-gray-700">
            <Globe className="w-3 h-3 text-teal-600" /> English (English) ✓
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-4">Monitoring SahYog platform growth</p>

        {/* Growth Overview card */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-600 rounded-2xl p-5 mb-4 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-lg">Growth Overview</p>
              <p className="text-xs text-teal-100 mt-1 max-w-[220px]">Track platform commissions and service fee distributions in real-time.</p>
            </div>
            <span className="text-3xl">🌿</span>
          </div>
        </div>

        {/* 2 stat cards row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl p-4 border shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-base font-bold text-teal-600">₹</span>
              <span className="text-xs font-semibold text-green-600 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" />+12.5%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">₹8.45L</p>
            <p className="text-xs text-gray-500 tracking-wider mt-0.5 uppercase">Total Revenue</p>
          </div>

          <div className="bg-white rounded-xl p-4 border shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <DollarSign className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-semibold text-green-600 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" />+8.2%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">₹84.5K</p>
            <p className="text-xs text-gray-500 tracking-wider mt-0.5 uppercase">Platform Fee</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab('revenue')}
            className={`flex-1 py-2.5 text-sm font-semibold text-center border-b-2 transition ${activeTab === 'revenue' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-400'}`}
          >
            Revenue
          </button>
          <button
            onClick={() => setActiveTab('category')}
            className={`flex-1 py-2.5 text-sm font-semibold text-center border-b-2 transition ${activeTab === 'category' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-400'}`}
          >
            Category Split
          </button>
        </div>

        {/* Earnings Trend Chart */}
        <div className="bg-white rounded-xl p-4 border shadow-sm mb-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-sm text-gray-900">Earnings Trend</h3>
            <span className="text-xs text-teal-600 font-medium cursor-pointer">Last 6 Months &gt;</span>
          </div>
          <p className="text-xs text-gray-400 mb-3">Monthly revenue vs commission growth</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis hide />
                <Tooltip formatter={(val: number) => [`₹${(val / 1000).toFixed(0)}k`, 'Amount']} />
                <Area type="monotone" dataKey="revenue" stroke="#0d9488" fill="#0d9488" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial Tools */}
        <h3 className="font-bold text-sm text-gray-900 mb-2">Financial Tools</h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white border rounded-xl p-3 text-center shadow-sm cursor-pointer hover:bg-gray-50">
            <Download className="w-5 h-5 text-teal-600 mx-auto mb-1" />
            <p className="text-xs font-semibold text-gray-800">Export</p>
            <p className="text-[10px] text-gray-400">Reports</p>
          </div>
          <div className="bg-white border rounded-xl p-3 text-center shadow-sm cursor-pointer hover:bg-gray-50">
            <CreditCard className="w-5 h-5 text-teal-600 mx-auto mb-1" />
            <p className="text-xs font-semibold text-gray-800">Bulk</p>
            <p className="text-[10px] text-gray-400">Payouts</p>
          </div>
          <div className="bg-white border rounded-xl p-3 text-center shadow-sm cursor-pointer hover:bg-gray-50">
            <Sliders className="w-5 h-5 text-teal-600 mx-auto mb-1" />
            <p className="text-xs font-semibold text-gray-800">Tax</p>
            <p className="text-[10px] text-gray-400">Settings</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl p-4 border shadow-sm mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-gray-900">Recent Transactions</h3>
            <span className="text-xs text-teal-600 font-medium cursor-pointer">View All</span>
          </div>

          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between pb-2 border-b last:border-0 last:pb-0">
                <div>
                  <p className="font-semibold text-sm text-gray-900">{tx.name}</p>
                  <p className="text-xs text-gray-500">{tx.service} • <span className="text-gray-400">{tx.id}</span></p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-gray-900">{tx.amount}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                    tx.status === 'Completed' ? 'bg-green-50 text-green-700' :
                    tx.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t text-center">
            <button className="text-xs text-teal-600 font-semibold hover:underline">Load More Transactions</button>
          </div>
        </div>

        {/* Monthly Target card */}
        <div className="bg-gray-900 text-white rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-bold">Monthly Target</p>
            <span className="text-sm font-extrabold text-teal-400">72%</span>
          </div>
          <p className="text-xs text-gray-400 mb-2">Platform revenue progress • Goal: ₹10L</p>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div className="bg-teal-500 h-2 rounded-full" style={{ width: '72%' }} />
          </div>
          <p className="text-[11px] text-gray-400">₹2.8L remaining to hit May milestone.</p>
        </div>
      </div>

      <button className="fixed bottom-20 right-6 w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-teal-700 transition">
        <Plus className="w-6 h-6" />
      </button>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex justify-around py-3">
          <Link href="/admin/overview" className="text-center">
            <Home className="w-5 h-5 text-teal-600 mx-auto" />
            <p className="text-xs text-teal-600 font-medium">Home</p>
          </Link>
          <Link href="/admin/bookings" className="text-center">
            <Calendar className="w-5 h-5 text-gray-400 mx-auto" />
            <p className="text-xs text-gray-400">Bookings</p>
          </Link>
          <Link href="/chat/1" className="text-center">
            <MessageSquare className="w-5 h-5 text-gray-400 mx-auto" />
            <p className="text-xs text-gray-400">Chat</p>
          </Link>
          <Link href="/admin/users" className="text-center">
            <User className="w-5 h-5 text-gray-400 mx-auto" />
            <p className="text-xs text-gray-400">Profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
