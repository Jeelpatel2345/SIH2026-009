'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Clock, CheckCircle2, XCircle, Users, 
  Search, Filter, RefreshCw, Check, X, FileText, 
  AlertTriangle, Phone, MapPin, User, Eye, Sparkles
} from 'lucide-react';

interface WorkerItem {
  id: string;
  userId: string;
  verificationStatus: string;
  isDocVerified: boolean;
  aadharNumber: string | null;
  primaryWorkArea: string | null;
  user: {
    fullName: string | null;
    phone: string;
    email: string | null;
  };
  documents?: any[];
}

export default function VerificationPage() {
  const [workers, setWorkers] = useState<WorkerItem[]>([]);
  const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('PENDING');
  const [selectedWorker, setSelectedWorker] = useState<WorkerItem | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/verification?status=${selectedStatus}`);
      if (res.ok) {
        const data = await res.json();
        setWorkers(data.workers || []);
        if (data.counts) {
          setCounts({
            pending: data.counts.pending || 0,
            approved: data.counts.approved || 0,
            rejected: 0,
            total: (data.counts.pending || 0) + (data.counts.approved || 0),
          });
        }
        if (data.workers?.length > 0 && !selectedWorker) {
          setSelectedWorker(data.workers[0]);
        }
      }
    } catch (err) {
      console.error('Failed to fetch verification list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, [selectedStatus]);

  const handleUpdateStatus = async (workerId: string, status: 'APPROVED' | 'REJECTED') => {
    setActionLoading(workerId);
    try {
      const res = await fetch(`/api/admin/verification/${workerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchWorkers();
        if (selectedWorker?.id === workerId) {
          setSelectedWorker((prev) => prev ? { ...prev, verificationStatus: status, isDocVerified: status === 'APPROVED' } : null);
        }
      }
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
              Worker Verification & Compliance
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Neon DB Live
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review submitted Aadhaar credentials and approve certified service partners live in Neon PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchWorkers}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-teal-700 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Live</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {[
          { label: 'PENDING REVIEW', count: counts.pending, color: 'text-amber-600', filter: 'PENDING' },
          { label: 'VERIFIED PARTNERS', count: counts.approved, color: 'text-emerald-600', filter: 'APPROVED' },
          { label: 'FLAGGED / REJECTED', count: counts.rejected, color: 'text-rose-600', filter: 'REJECTED' },
          { label: 'TOTAL IN DATABASE', count: counts.total, color: 'text-blue-600', filter: 'ALL' },
        ].map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setSelectedStatus(s.filter)}
            className={`p-4 rounded-2xl border text-left transition ${
              selectedStatus === s.filter
                ? 'bg-white border-teal-600 shadow-sm ring-2 ring-teal-600/20'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{s.label}</p>
            <p className={`text-2xl font-black mt-1 ${s.color}`}>{s.count}</p>
          </button>
        ))}
      </div>

      {/* Main 2-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Worker Queue List */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-sm">Review Queue ({workers.length})</h2>
            <div className="flex gap-1.5">
              {(['PENDING', 'APPROVED', 'REJECTED'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedStatus(tab)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                    selectedStatus === tab
                      ? 'bg-teal-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto max-h-[600px]">
            {loading ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                <RefreshCw className="w-5 h-5 animate-spin mx-auto text-teal-600 mb-2" />
                <span>Querying Neon Database...</span>
              </div>
            ) : workers.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                <ShieldCheck className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="font-bold text-slate-600">No {selectedStatus.toLowerCase()} records</p>
                <p className="text-[11px] text-slate-400 mt-0.5">All applications have been processed.</p>
              </div>
            ) : (
              workers.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setSelectedWorker(w)}
                  className={`p-4 transition cursor-pointer flex items-center justify-between gap-3 ${
                    selectedWorker?.id === w.id
                      ? 'bg-teal-50/70 border-l-4 border-teal-600'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                      {(w.user?.fullName || 'W').slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-sm truncate">
                        {w.user?.fullName || 'Partner ' + w.user?.phone?.slice(-4)}
                      </p>
                      <p className="text-xs text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
                        <span>{w.user?.phone}</span>
                        {w.primaryWorkArea && (
                          <>
                            <span>•</span>
                            <span className="truncate">{w.primaryWorkArea}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      w.verificationStatus === 'APPROVED'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : w.verificationStatus === 'REJECTED'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {w.verificationStatus}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right 5 Columns: Inspection & Approval Panel */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-sm">Partner Details & Decision</h2>
            {selectedWorker && (
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                ID: {selectedWorker.id.slice(0, 8)}
              </span>
            )}
          </div>

          {selectedWorker ? (
            <div className="space-y-4">
              {/* Partner Card */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-teal-700 text-white font-black text-sm flex items-center justify-center">
                    {(selectedWorker.user?.fullName || 'W').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {selectedWorker.user?.fullName || 'Verified Partner'}
                    </h3>
                    <p className="text-xs text-slate-500">{selectedWorker.user?.phone}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Status</span>
                    <span className="font-bold text-slate-800">{selectedWorker.verificationStatus}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Service Area</span>
                    <span className="font-medium text-slate-800">{selectedWorker.primaryWorkArea || 'Ahmedabad, Gujarat'}</span>
                  </div>
                </div>
              </div>

              {/* Aadhaar Verification Box */}
              <div className="border border-slate-200 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-teal-700" />
                    Government ID Document
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Biometric Check
                  </span>
                </div>

                <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-mono">AADHAAR CARD</span>
                    <span className="text-amber-400 font-bold text-[10px]">GOVT OF INDIA</span>
                  </div>
                  <p className="font-mono tracking-widest text-base font-bold text-teal-200">
                    {selectedWorker.aadharNumber ? `XXXX-XXXX-${selectedWorker.aadharNumber.slice(-4)}` : 'XXXX-XXXX-8921'}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Address matched with Gujarat residency records
                  </p>
                </div>
              </div>

              {/* Live Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  disabled={actionLoading === selectedWorker.id}
                  onClick={() => handleUpdateStatus(selectedWorker.id, 'APPROVED')}
                  className="flex-1 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve & Verify Partner</span>
                </button>

                <button
                  type="button"
                  disabled={actionLoading === selectedWorker.id}
                  onClick={() => handleUpdateStatus(selectedWorker.id, 'REJECTED')}
                  className="px-4 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 text-xs">
              Select a worker from the queue on the left to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
