'use client';
import Link from 'next/link';
import { ArrowLeft, Bell, Clock, CheckCircle, XCircle, Users, Filter, Search, Download, ShieldCheck, AlertTriangle, MessageSquare as Msg, Home, Calendar, MessageSquare, User } from 'lucide-react';

const workers = [
  { id: 'WF-8801', name: 'Rajesh Kumar', role: 'Electrician', loc: 'Ahmedabad, Gujarat' },
  { id: 'WF-8802', name: 'Priya Sharma', role: 'Plumber', loc: 'Mumbai, Maharashtra' },
  { id: 'WF-9799', name: 'Suresh Patel', role: 'Carpenter', loc: 'Surat, Gujarat' },
];

export default function VerificationPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Worker Verification & ID Compliance
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Maintain community safety by inspecting government Aadhaar credentials and biometric matches.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
            Auto-Verify AI: Active (98.4%)
          </span>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Clock, label: 'Pending Review', value: '24', sub: '+3 since morning', color: 'text-amber-600 bg-amber-50 border-amber-200' },
          { icon: CheckCircle, label: 'Approved Today', value: '18', sub: '92% approval rate', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
          { icon: XCircle, label: 'Rejected / Flagged', value: '05', sub: 'Missing documents', color: 'text-rose-600 bg-rose-50 border-rose-200' },
          { icon: Users, label: 'Active Verified', value: '1,240', sub: 'Live in marketplace', color: 'text-teal-600 bg-teal-50 border-teal-200' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${s.color}`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-black text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 2-Column Responsive Workspace on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Queue Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900">Document Review Queue</h2>
              <div className="flex gap-1.5 overflow-x-auto">
                {['Pending', 'In Review', 'Flagged', 'History'].map((t, i) => (
                  <button
                    key={t}
                    className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                      i === 0 ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input placeholder="Search candidate by name or ID..." className="bg-transparent outline-none text-xs flex-1 text-slate-800" />
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-5">Candidate</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {workers.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-5">
                      <p className="font-bold text-slate-900">{w.name}</p>
                      <p className="text-xs text-slate-400">{w.id} • {w.role}</p>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">{w.loc}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        Pending
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button className="px-3 py-1.5 rounded-lg bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition">
                        Inspect ID
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t text-center text-xs text-slate-400 bg-slate-50">
            Showing 3 of 24 pending applications
          </div>
        </div>

        {/* Right 5 Columns: Document Inspector */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900">Document Inspector</h3>
              <button className="text-teal-600 text-xs font-bold flex items-center gap-1 hover:underline">
                <Download className="w-3 h-3" />Download Original
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">Government Identity Verification (Aadhaar Card)</p>

            {/* Aadhaar Preview Card */}
            <div className="h-44 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-2xl p-4 border-2 border-dashed border-amber-300 flex flex-col justify-between shadow-inner">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-amber-900 tracking-wider uppercase">GOVERNMENT OF INDIA • UIDAI</span>
                <span className="text-xs font-bold text-amber-700">आधार</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-16 bg-slate-200 rounded-lg border flex items-center justify-center text-[10px] font-bold text-slate-400">
                  PHOTO
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm">Rajesh Kumar</p>
                  <p className="text-[11px] text-slate-600">DOB: 12/04/1985 • Male</p>
                  <p className="font-mono font-bold text-slate-800 text-xs tracking-wider mt-1">4421-XXXX-XXXX-9901</p>
                </div>
              </div>
              <div className="flex justify-between text-[9px] text-amber-800 font-bold border-t border-amber-200/60 pt-1">
                <span>मेरा आधार, मेरी पहचान</span>
                <span>BIOMETRIC ENCRYPTED</span>
              </div>
            </div>

            <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-emerald-800">AI VERIFICATION RESULT (98.4% Match)</p>
                <p className="text-[11px] text-emerald-700">Face biometric matches selfie photo. Name & DOB match official registry.</p>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <p className="text-xs font-bold text-slate-700">Decision Panel</p>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-bold text-xs transition">
                  Request Re-upload
                </button>
                <button className="py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs transition">
                  Reject Profile
                </button>
              </div>
              <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition">
                Approve & Activate Worker
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
