'use client';
import Link from 'next/link';
import { ArrowLeft, Bell, Users, ShieldCheck, Clock, AlertTriangle, Search, Filter, Plus, ChevronRight, Home, Calendar, MessageSquare, User } from 'lucide-react';

const customers = [
  { name: 'Anjali Sharma', id: 'C-101', email: 'anjali.s@email.com', phone: '+91 98765 43210' },
  { name: 'Rahul Varma', id: 'C-102', email: 'rahul.v@email.com', phone: '+91 91234 56789' },
  { name: 'Priya Patel', id: 'C-103', email: 'priya.p@email.com', phone: '+91 99887 76655' },
];

export default function UserManagementPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 flex items-center gap-3 border-b">
        <Link href="/admin/overview"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="font-semibold text-lg flex-1">User Management</h1>
        <Bell className="w-5 h-5 text-gray-600" />
        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-teal-600" /></div>
      </div>

      <div className="px-4 mt-4 space-y-3 mb-4">
        {[
          { icon: Users, label: 'Total Users', value: '2,543', color: 'border-l-blue-500' },
          { icon: ShieldCheck, label: 'Verified Workers', value: '1,120', color: 'border-l-green-500' },
          { icon: Clock, label: 'Pending Approvals', value: '48', color: 'border-l-orange-500' },
          { icon: AlertTriangle, label: 'Flagged Users', value: '12', color: 'border-l-red-500' },
        ].map(s => (
          <div key={s.label} className={`bg-white rounded-xl p-4 border border-l-4 ${s.color} flex items-center gap-3`}>
            <s.icon className="w-5 h-5 text-gray-600" />
            <div className="flex-1"><p className="text-sm text-gray-500">{s.label}</p><p className="text-xl font-bold">{s.value}</p></div>
          </div>
        ))}
      </div>

      <div className="px-4">
        <h2 className="text-xl font-bold mb-3">Platform Participants</h2>
        <div className="flex gap-2 mb-3">
          <div className="flex-1 bg-gray-100 rounded-xl p-3 flex items-center gap-2"><Search className="w-4 h-4 text-gray-400" /><input placeholder="Search..." className="flex-1 bg-transparent outline-none text-sm" /></div>
          <button className="border rounded-xl px-3 flex items-center"><Filter className="w-4 h-4" /></button>
          <button className="bg-teal-600 text-white rounded-xl px-3 flex items-center gap-1 text-sm font-medium"><Plus className="w-4 h-4" />Add</button>
        </div>

        <div className="flex gap-2 mb-3">
          {['Customers', 'Service Workers', 'Verified'].map((t, i) => (
            <button key={t} className={`px-4 py-2 text-sm font-medium rounded-full ${i === 0 ? 'bg-teal-600 text-white' : 'bg-white border text-gray-600'}`}>{t}</button>
          ))}
        </div>

        <div className="bg-white rounded-xl border overflow-hidden mb-4">
          <div className="grid grid-cols-2 bg-gray-50 p-3 text-xs font-semibold text-gray-500"><span>Customer Name</span><span>Contact Info</span></div>
          {customers.map(c => (
            <div key={c.id} className="grid grid-cols-2 p-3 border-t items-center">
              <div className="flex items-center gap-2"><div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-gray-500" /></div><div><p className="font-semibold text-sm">{c.name}</p><p className="text-xs text-gray-400">{c.id}</p></div></div>
              <div><p className="text-sm text-gray-600">{c.email}</p><p className="text-xs text-gray-400">{c.phone}</p></div>
            </div>
          ))}
          <div className="p-3 border-t flex items-center justify-between text-xs text-gray-400"><span>Showing 1-3 of 152 customers</span><div className="flex gap-2"><button className="border px-2 py-1 rounded">Previous</button><button className="border px-2 py-1 rounded">Next</button></div></div>
        </div>

        <div className="bg-teal-600 rounded-xl p-4 mb-4">
          <h3 className="text-white font-bold mb-1">Regional User Growth</h3>
          <p className="text-teal-100 text-sm mb-3">Worker registrations are trending up in Ahmedabad (+12%) and Surat (+8%).</p>
          {[{ city: 'Ahmedabad', pct: 72 }, { city: 'Surat', pct: 58 }].map(c => (
            <div key={c.city} className="mb-2"><div className="flex justify-between text-white text-xs mb-1"><span>{c.city}</span><span>{c.pct}%</span></div><div className="w-full bg-teal-700 rounded-full h-1.5"><div className="bg-white h-1.5 rounded-full" style={{ width: `${c.pct}%` }} /></div></div>
          ))}
          <Link href="#" className="text-white text-sm font-medium flex items-center gap-1 mt-2">View Detailed Geographic Report <ChevronRight className="w-4 h-4" /></Link>
        </div>

        <div className="bg-white rounded-xl p-4 border mb-4 text-center">
          <p className="text-gray-600 mb-2">Need help with user resolution?</p>
          <button className="border-2 border-teal-600 text-teal-600 px-6 py-2 rounded-xl font-semibold text-sm">Contact Tech Support</button>
        </div>
        <p className="text-center text-xs text-gray-400 mb-4">&copy; 2024 SahYog Admin Console. Optimized for accessible social cooperation.</p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex justify-around py-3">
          <Link href="/admin/overview" className="text-center"><Home className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Home</p></Link>
          <Link href="/admin/bookings" className="text-center"><Calendar className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Bookings</p></Link>
          <Link href="/chat/1" className="text-center"><MessageSquare className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Chat</p></Link>
          <Link href="#" className="text-center"><User className="w-5 h-5 text-teal-600 mx-auto" /><p className="text-xs text-teal-600 font-medium">Profile</p></Link>
        </div>
      </div>
    </div>
  );
}
