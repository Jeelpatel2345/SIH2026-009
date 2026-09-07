'use client';
import Link from 'next/link';
import { ArrowLeft, Bell, TrendingUp, Wallet, Clock, CheckCircle, Download, Home, Calendar, MessageSquare, User } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Jan', earnings: 2000 }, { month: 'Feb', earnings: 2800 }, { month: 'Mar', earnings: 3200 },
  { month: 'Apr', earnings: 4500 }, { month: 'May', earnings: 5000 }, { month: 'Jun', earnings: 6500 },
];

export default function WorkerEarningsPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 flex items-center gap-3 border-b">
        <Link href="/worker/dashboard"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="font-semibold text-lg flex-1">Earnings & Payouts</h1>
        <Bell className="w-5 h-5 text-gray-600" />
        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-teal-600" /></div>
      </div>

      <div className="mx-4 mt-4 bg-gradient-to-r from-teal-700 to-teal-600 rounded-2xl p-5">
        <h2 className="text-white text-xl font-bold">Great job, Sanjay!</h2>
        <p className="text-teal-100 text-sm mt-1">Your earnings increased by 12% this month.</p>
        <span className="text-3xl mt-2 block">🌱</span>
      </div>

      <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 border">
          <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-5 h-5 text-teal-600" /><span className="text-green-500 text-sm font-medium">↗ +12.5%</span></div>
          <p className="text-xs text-gray-500">TOTAL EARNINGS</p>
          <p className="text-2xl font-bold">₹42,850</p>
          <p className="text-xs text-gray-400">Current cycle: June 1-30</p>
        </div>
        <div className="bg-white rounded-xl p-4 border">
          <Wallet className="w-5 h-5 text-teal-600 mb-2" />
          <p className="text-xs text-gray-500">AVAILABLE BALANCE</p>
          <p className="text-2xl font-bold">₹8,420</p>
          <p className="text-xs text-gray-400">Next payout: July 5th</p>
        </div>
      </div>

      <div className="mx-4 mt-4 flex gap-2">
        <button className="flex-1 py-2 border-b-2 border-teal-600 text-teal-600 font-semibold text-sm">Performance</button>
        <button className="flex-1 py-2 text-gray-400 text-sm">Payout History</button>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-xl p-4 border">
        <div className="flex items-center justify-between mb-1"><h3 className="font-bold">Income Trends</h3><span className="text-xs border rounded-full px-3 py-1">Last 6M</span></div>
        <p className="text-xs text-gray-400 mb-4">Monthly earnings over the last 6 months</p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis hide />
              <Tooltip formatter={(v: number) => [`₹${v}`, 'Earnings']} />
              <Area type="monotone" dataKey="earnings" stroke="#0d9488" fill="#0d9488" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2"><div className="w-3 h-3 bg-teal-600 rounded-full" /><span className="text-xs text-gray-500">Earnings (₹)</span></div>
      </div>

      <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 border text-center"><Clock className="w-6 h-6 text-teal-600 mx-auto mb-1" /><p className="text-xs text-gray-500">Comm. Rate</p><p className="text-2xl font-bold">10%</p><p className="text-xs text-green-500 font-medium">Standard Plan</p></div>
        <div className="bg-white rounded-xl p-4 border text-center"><CheckCircle className="w-6 h-6 text-teal-600 mx-auto mb-1" /><p className="text-xs text-gray-500">Job Success</p><p className="text-2xl font-bold">98%</p><p className="text-xs text-green-500 font-medium">Top Rated</p></div>
      </div>

      <div className="mx-4 mt-4 bg-gray-800 rounded-2xl p-5">
        <div className="flex items-center justify-between"><div><h3 className="text-white font-bold">Commission Reports</h3><p className="text-gray-400 text-sm">Detailed tax & platform fee breakdown</p></div><Download className="w-5 h-5 text-white" /></div>
        <div className="mt-3 flex items-center gap-2"><span className="bg-teal-600 text-white text-xs px-2 py-0.5 rounded">FY 2023-24</span><span className="text-gray-400 text-xs">• 12 Files Available</span></div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex justify-around py-3">
          <Link href="/worker/dashboard" className="text-center"><Home className="w-5 h-5 text-teal-600 mx-auto" /><p className="text-xs text-teal-600">Home</p></Link>
          <Link href="#" className="text-center"><Calendar className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Bookings</p></Link>
          <Link href="/chat/1" className="text-center"><MessageSquare className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Chat</p></Link>
          <Link href="#" className="text-center"><User className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Profile</p></Link>
        </div>
      </div>
    </div>
  );
}
