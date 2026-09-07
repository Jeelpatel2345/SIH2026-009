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
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 flex items-center gap-3 border-b">
        <Link href="/admin/overview"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="font-semibold text-lg flex-1">Worker Verification</h1>
        <Bell className="w-5 h-5 text-gray-600" />
        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-teal-600" /></div>
      </div>

      <div className="px-4 mt-4">
        <h2 className="text-xl font-bold mb-1">Document Review Queue</h2>
        <p className="text-sm text-gray-500 mb-4">Maintain platform trust by verifying worker credentials and IDs.</p>

        <div className="space-y-3 mb-4">
          {[
            { icon: Clock, label: 'PENDING REVIEW', value: '24', sub: '+3 since morning', color: 'text-yellow-600 bg-yellow-50' },
            { icon: CheckCircle, label: 'APPROVED TODAY', value: '18', sub: '92% success rate', color: 'text-green-600 bg-green-50' },
            { icon: XCircle, label: 'REJECTED', value: '05', sub: 'Missing documents', color: 'text-red-600 bg-red-50' },
            { icon: Users, label: 'ACTIVE WORKERS', value: '1,240', sub: 'Live on SahYog', color: 'text-teal-600 bg-teal-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 border flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}><s.icon className="w-5 h-5" /></div>
              <div className="flex-1"><p className="text-xs text-gray-500">{s.label}</p><p className="text-xl font-bold">{s.value}</p></div>
              <p className="text-xs text-gray-400">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
          {['Pending', 'In Review', 'Flagged', 'History'].map((t, i) => (
            <button key={t} className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${i === 0 ? 'bg-teal-600 text-white' : 'bg-white border text-gray-600'}`}>{t}</button>
          ))}
        </div>

        <div className="bg-gray-100 rounded-xl p-3 flex items-center gap-2 mb-4">
          <Search className="w-4 h-4 text-gray-400" />
          <input placeholder="Search by name or ID..." className="flex-1 bg-transparent outline-none text-sm" />
        </div>

        <div className="bg-white rounded-xl border overflow-hidden mb-4">
          <div className="grid grid-cols-2 bg-gray-50 p-3 text-xs font-semibold text-gray-500"><span>Worker Details</span><span>Location</span></div>
          {workers.map(w => (
            <div key={w.id} className="grid grid-cols-2 p-3 border-t items-center">
              <div><p className="font-semibold text-sm">{w.name}</p><p className="text-xs text-gray-400">{w.id} • {w.role}</p></div>
              <p className="text-sm text-gray-500">{w.loc}</p>
            </div>
          ))}
          <div className="p-3 border-t text-center text-xs text-gray-400">Showing 3 of 24 pending applications</div>
        </div>

        <div className="bg-white rounded-xl p-4 border mb-4">
          <div className="flex items-center justify-between mb-3"><h3 className="font-bold">Document Inspector</h3><button className="text-teal-600 text-sm font-medium flex items-center gap-1"><Download className="w-3 h-3" />Download Original</button></div>
          <p className="text-sm text-gray-500 mb-3">Government Identity Verification (Aadhar Card)</p>
          <div className="h-40 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center mb-4 border"><p className="text-amber-600 font-bold">AADHAR CARD</p></div>

          <div className="mb-3"><p className="text-xs tracking-wider text-gray-500 mb-1">WORKER CLAIMED DETAILS</p><p className="font-semibold">Rajesh Kumar</p><p className="text-sm text-gray-500">ID: 4421-XXXX-XXXX-9901</p></div>

          <div className="bg-green-50 rounded-xl p-3 flex items-start gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
            <div><p className="text-xs tracking-wider text-green-700 font-semibold">AI VERIFICATION RESULT</p><p className="text-sm text-green-700 font-medium">OCR Match: 98.4%</p><p className="text-xs text-green-600">Face biometric matches profile photo.</p></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border">
          <h3 className="font-bold mb-2">Decision Panel</h3>
          <p className="text-sm text-gray-500 mb-3">Finalize onboarding for this candidate.</p>
          <p className="text-sm text-gray-600 italic mb-4">Checked local electrical board records. Certification is valid until Dec 2025. No criminal record found in regional database.</p>
          <div className="space-y-3">
            <button className="w-full border rounded-xl p-3 flex items-center gap-3 text-left"><Msg className="w-5 h-5 text-blue-500" /><div><p className="font-semibold text-sm">Request Clarification</p><p className="text-xs text-gray-400">Ask for a clearer image upload</p></div></button>
            <button className="w-full border rounded-xl p-3 flex items-center gap-3 text-left"><AlertTriangle className="w-5 h-5 text-yellow-500" /><div><p className="font-semibold text-sm">Flag for Investigation</p><p className="text-xs text-gray-400">Mark as suspicious for senior review</p></div></button>
            <div className="flex gap-3"><button className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold">Reject</button><button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold">Approve</button></div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex justify-around py-3">
          <Link href="/admin/overview" className="text-center"><Home className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Home</p></Link>
          <Link href="/admin/bookings" className="text-center"><Calendar className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Bookings</p></Link>
          <Link href="/chat/1" className="text-center"><MessageSquare className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Chat</p></Link>
          <Link href="/admin/users" className="text-center"><User className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Profile</p></Link>
        </div>
      </div>
    </div>
  );
}
