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
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <h1 className="font-bold text-lg">Admin Overview</h1>
        <div className="flex items-center gap-3"><Bell className="w-5 h-5 text-gray-600" /><div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-teal-600" /></div></div>
      </div>

      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-1"><h2 className="text-xl font-bold">Analytics Hub</h2><div className="flex items-center gap-1 border rounded-full px-3 py-1 text-sm"><Globe className="w-3 h-3" />English</div></div>
        <p className="text-sm text-gray-500 mb-4">Monitoring SahYog growth</p>

        <div className="bg-gradient-to-br from-teal-600 to-teal-500 rounded-2xl p-5 mb-4">
          <p className="text-white/60 text-xs tracking-wider">COLLABORATIVE DATA INSIGHTS</p>
          <p className="text-white font-bold text-lg mt-1">Platform Status</p>
          <div className="flex items-center gap-2 mt-1"><div className="w-2 h-2 bg-green-400 rounded-full" /><span className="text-white text-sm">Live & Stable</span></div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 border">
              <div className="flex items-center justify-between mb-2"><div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}><s.icon className="w-4 h-4" /></div><span className={`text-xs font-medium px-1.5 py-0.5 rounded ${s.up ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>{s.change}</span></div>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-4 border mb-4">
          <h3 className="font-bold mb-1">Platform Growth</h3>
          <p className="text-xs text-gray-400 mb-4">Monthly booking & signup trends</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="bookings" stroke="#0d9488" fill="#0d9488" fillOpacity={0.1} strokeWidth={2} name="Total Bookings" />
                <Area type="monotone" dataKey="signups" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} strokeWidth={2} name="Worker Signups" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2"><span className="flex items-center gap-1 text-xs"><div className="w-2 h-2 bg-teal-600 rounded-full" />Bookings</span><span className="flex items-center gap-1 text-xs"><div className="w-2 h-2 bg-indigo-500 rounded-full" />Signups</span></div>
        </div>

        <div className="bg-white rounded-xl p-4 border mb-4">
          <h3 className="font-bold mb-3">Regional Impact</h3>
          <p className="text-xs text-gray-400 mb-3">Market share across major cities</p>
          {[{ city: 'Ahmedabad', pct: 45, color: 'bg-teal-600' }, { city: 'Surat', pct: 25, color: 'bg-indigo-500' }, { city: 'Rajkot', pct: 20, color: 'bg-amber-500' }, { city: 'Vadodara', pct: 10, color: 'bg-pink-500' }].map(c => (
            <div key={c.city} className="flex items-center gap-3 mb-2"><div className={`w-3 h-3 rounded-full ${c.color}`} /><span className="text-sm flex-1">{c.city}</span><span className="text-sm font-semibold">{c.pct}%</span></div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-4 border mb-4">
          <div className="flex items-center justify-between mb-3"><h3 className="font-bold">Verification Queue</h3><Link href="/admin/verification" className="text-teal-600 text-sm font-medium">View All</Link></div>
          {[{ name: 'Rahul Sharma', role: 'Electrician', status: 'Pending', time: '2h ago' }, { name: 'Priya Patel', role: 'Cleaning Expert', status: 'Reviewing', time: '5h ago' }].map((w, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-t first:border-0">
              <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-gray-500" /></div>
              <div className="flex-1"><p className="font-semibold text-sm">{w.name}</p><p className="text-xs text-gray-400">{w.role}</p></div>
              <div className="text-right"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${w.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-blue-50 text-blue-600'}`}>{w.status}</span><p className="text-xs text-gray-400 mt-0.5">{w.time}</p></div>
            </div>
          ))}
        </div>

        <div className="bg-teal-600 rounded-xl p-4 flex items-start gap-3 mb-4">
          <MessageSquare className="w-6 h-6 text-white mt-0.5" />
          <p className="text-white text-sm">Platform accessibility is currently high for Gujarati and Hindi speakers. Maintain 24/7 verification support for high conversion.</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex justify-around py-3">
          <Link href="/admin/overview" className="text-center"><Home className="w-5 h-5 text-teal-600 mx-auto" /><p className="text-xs text-teal-600 font-medium">Home</p></Link>
          <Link href="/admin/bookings" className="text-center"><Calendar className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Bookings</p></Link>
          <Link href="/chat/1" className="text-center"><MessageSquare className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Chat</p></Link>
          <Link href="/admin/users" className="text-center"><User className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Profile</p></Link>
        </div>
      </div>
    </div>
  );
}
