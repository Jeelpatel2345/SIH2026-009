'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bell, Cog, FileText, Save, Check, User, Home, Calendar, MessageSquare } from 'lucide-react';

export default function AdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoVerifyWorkers, setAutoVerifyWorkers] = useState(true);
  const [commissionPercent, setCommissionPercent] = useState('15');
  const [activeTab, setActiveTab] = useState<'general' | 'localize' | 'security'>('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Platform Settings & Global Governance
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure system operations, commission models, and multi-language policies.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {(['general', 'localize', 'security'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-6 text-sm font-bold capitalize transition border-b-2 ${
              activeTab === tab ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System Operations Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Cog className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-base text-slate-900">System Operations</h3>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-bold text-sm text-slate-800">Maintenance Mode</p>
              <p className="text-xs text-slate-400">Pause customer booking creations during major updates.</p>
            </div>
            <button
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                maintenanceMode ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md" />
            </button>
          </div>

          <div className="border-t border-slate-100 pt-4 flex items-center justify-between py-2">
            <div>
              <p className="font-bold text-sm text-slate-800">Auto-verify Certified Workers</p>
              <p className="text-xs text-slate-400">Instantly grant verified badge if Aadhaar biometric match &gt; 98%.</p>
            </div>
            <button
              onClick={() => setAutoVerifyWorkers(!autoVerifyWorkers)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                autoVerifyWorkers ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md" />
            </button>
          </div>
        </div>

        {/* Commission Structure Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FileText className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-base text-slate-900">Commission & Platform Trust</h3>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Default Platform Take-Rate (%)
            </label>
            <div className="flex items-center border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus-within:bg-white focus-within:border-teal-600">
              <input
                type="number"
                value={commissionPercent}
                onChange={(e) => setCommissionPercent(e.target.value)}
                className="w-full bg-transparent outline-none text-lg font-black text-slate-800"
              />
              <span className="text-slate-500 font-bold ml-2">%</span>
            </div>
            <p className="text-xs text-slate-400 italic mt-2">
              Automatically split on all UPI / Card settlements before payout release.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-md transition"
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" /> All Changes Saved!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" /> Save All Configurations
            </>
          )}
        </button>
      </div>
    </div>
  );
}
