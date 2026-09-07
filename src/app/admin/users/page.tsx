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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            User Management & Platform Participants
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor customer accounts, certified service partners, and regional participation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-4 py-2 flex items-center gap-1.5 text-xs font-bold shadow-xs transition">
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards in 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Total Users', value: '2,543', color: 'border-l-blue-500' },
          { icon: ShieldCheck, label: 'Verified Workers', value: '1,120', color: 'border-l-emerald-500' },
          { icon: Clock, label: 'Pending Approvals', value: '48', color: 'border-l-amber-500' },
          { icon: AlertTriangle, label: 'Flagged Accounts', value: '12', color: 'border-l-rose-500' },
        ].map((s) => (
          <div key={s.label} className={`bg-white rounded-2xl p-5 border border-l-4 ${s.color} border-slate-200 shadow-xs flex items-center gap-4`}>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
              <s.icon className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-black text-slate-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900">Platform Participants</h2>
            <div className="flex items-center gap-2">
              {['Customers', 'Service Workers', 'Verified Partners'].map((t, i) => (
                <button
                  key={t}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition ${
                    i === 0 ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input placeholder="Search users by name, email, or mobile..." className="flex-1 bg-transparent outline-none text-xs text-slate-800" />
            </div>
            <button className="border border-slate-200 rounded-xl px-3.5 flex items-center text-slate-600 hover:bg-slate-50">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-6">User Details</th>
                <th className="py-3 px-4">Contact Information</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-6 text-right">Account Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{c.name}</p>
                        <p className="text-xs text-slate-400 font-mono">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-xs text-slate-700 font-medium">{c.email}</p>
                    <p className="text-xs text-slate-400 font-mono">{c.phone}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Active
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button className="text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 px-3 py-1.5 rounded-lg transition">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t flex items-center justify-between text-xs text-slate-400 bg-slate-50">
          <span>Showing 1-3 of 152 registered participants</span>
          <div className="flex gap-2">
            <button className="border border-slate-200 px-3 py-1 rounded-lg hover:bg-white transition">Previous</button>
            <button className="border border-slate-200 px-3 py-1 rounded-lg hover:bg-white transition">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
