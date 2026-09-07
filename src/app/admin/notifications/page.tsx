'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, ShieldCheck, Users, Calendar, AlertTriangle, 
  CheckCircle2, Clock, Trash2, ChevronRight, Sparkles, Database
} from 'lucide-react';

interface AdminNotification {
  id: string;
  category: 'audit' | 'verification' | 'financial' | 'system';
  title: string;
  desc: string;
  timestamp: string;
  severity: 'info' | 'success' | 'warning';
  read: boolean;
  link?: string;
  linkLabel?: string;
}

const adminNotifs: AdminNotification[] = [
  {
    id: 'an-1',
    category: 'system',
    title: 'Neon PostgreSQL Database Connected',
    desc: 'Production database successfully synchronized with AWS US-East-2 pooled Neon instance. Schema v5.22 active.',
    timestamp: 'Just now',
    severity: 'success',
    read: false,
  },
  {
    id: 'an-2',
    category: 'verification',
    title: 'New Worker Document Uploaded',
    desc: 'Rajesh Kumar (WF-8801, Electrician) submitted Aadhaar card front & back for OCR verification.',
    timestamp: '15 mins ago',
    severity: 'info',
    read: false,
    link: '/admin/verification',
    linkLabel: 'Review Document'
  },
  {
    id: 'an-3',
    category: 'financial',
    title: 'High Value Booking Settled',
    desc: 'Booking #SY-9021 (Gross value ₹1,250.00) completed with 100% Escrow security clearance.',
    timestamp: '1 hour ago',
    severity: 'success',
    read: true,
    link: '/admin/bookings',
    linkLabel: 'View Booking'
  },
  {
    id: 'an-4',
    category: 'audit',
    title: 'Real-Time User Registration via OTP',
    desc: 'New user account registered using Mobile 4-digit OTP verification and saved to Neon DB.',
    timestamp: '3 hours ago',
    severity: 'info',
    read: true,
    link: '/admin/users',
    linkLabel: 'View User in DB'
  },
  {
    id: 'an-5',
    category: 'audit',
    title: 'Platform SLA Active (99.98%)',
    desc: 'Zero downtime reported across Gujarat and Pan-India regional endpoints.',
    timestamp: 'Today, 09:00 AM',
    severity: 'info',
    read: true,
  }
];

export default function AdminNotificationsPage() {
  const [items, setItems] = useState<AdminNotification[]>(adminNotifs);
  const [activeFilter, setActiveFilter] = useState<'all' | 'verification' | 'financial' | 'system'>('all');

  const unreadCount = items.filter(i => !i.read).length;

  const markAllRead = () => {
    setItems(items.map(i => ({ ...i, read: true })));
  };

  const filtered = items.filter(i => {
    if (activeFilter === 'all') return true;
    return i.category === activeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            System Alerts & Administrative Feed
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time notifications on database sync, identity audits, and high-value orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs"
            >
              Mark All Read ({unreadCount})
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'verification', label: 'Verifications' },
          { id: 'financial', label: 'Financials' },
          { id: 'system', label: 'Cloud Database' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
              activeFilter === tab.id
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-4 sm:p-5 rounded-2xl border transition flex items-start justify-between gap-4 ${
              item.read
                ? 'bg-white border-slate-200/90 shadow-2xs'
                : 'bg-emerald-50/40 border-emerald-300 shadow-xs'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  item.severity === 'success'
                    ? 'bg-emerald-100 text-emerald-800'
                    : item.severity === 'warning'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {item.category === 'system' ? (
                  <Database className="w-5 h-5" />
                ) : item.category === 'verification' ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : (
                  <Bell className="w-5 h-5" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.2 rounded-full ${
                      item.severity === 'success'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                <p className="text-[11px] text-slate-400 mt-2 font-mono">{item.timestamp}</p>
              </div>
            </div>

            {item.link && (
              <Link
                href={item.link}
                className="text-xs font-bold text-teal-700 hover:text-teal-800 bg-white border border-teal-200 px-3 py-1.5 rounded-lg flex-shrink-0 flex items-center gap-1 hover:bg-teal-50 transition"
              >
                <span>{item.linkLabel || 'View'}</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
