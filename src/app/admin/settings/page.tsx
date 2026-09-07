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
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 flex items-center gap-3 border-b">
        <Link href="/admin/overview"><ArrowLeft className="w-5 h-5 text-gray-700" /></Link>
        <h1 className="font-semibold text-lg flex-1">Admin Settings</h1>
        <Bell className="w-5 h-5 text-gray-600" />
        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-teal-600" />
        </div>
      </div>

      <div className="px-4 mt-4">
        <h2 className="text-xl font-bold text-gray-900">Platform Configuration</h2>
        <p className="text-xs text-gray-500 mb-4">Manage global SahYog parameters and accessibility.</p>

        {/* Tabs */}
        <div className="flex border-b mb-5">
          {(['general', 'localize', 'security'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-semibold capitalize text-center border-b-2 transition ${
                activeTab === tab ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* System Operations Card */}
        <div className="bg-white rounded-xl p-4 border shadow-sm mb-4">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b">
            <Cog className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-sm text-gray-900">System Operations</h3>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="max-w-[240px]">
              <p className="font-semibold text-sm text-gray-800">Maintenance Mode</p>
              <p className="text-xs text-gray-400">Disable platform for users during updates.</p>
            </div>
            <button
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                maintenanceMode ? 'bg-teal-600 justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform" />
            </button>
          </div>

          <div className="border-t my-2" />

          <div className="flex items-center justify-between py-2">
            <div className="max-w-[240px]">
              <p className="font-semibold text-sm text-gray-800">Auto-verify Workers</p>
              <p className="text-xs text-gray-400">Approve profiles meeting base criteria.</p>
            </div>
            <button
              onClick={() => setAutoVerifyWorkers(!autoVerifyWorkers)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                autoVerifyWorkers ? 'bg-teal-600 justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform" />
            </button>
          </div>
        </div>

        {/* Commission Structure Card */}
        <div className="bg-white rounded-xl p-4 border shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b">
            <FileText className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-sm text-gray-900">Commission Structure</h3>
          </div>

          <div className="py-2">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-2">
              Platform Commission (%)
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50 focus-within:bg-white focus-within:border-teal-600">
              <input
                type="number"
                value={commissionPercent}
                onChange={(e) => setCommissionPercent(e.target.value)}
                className="w-full bg-transparent outline-none text-base font-bold text-gray-800"
              />
              <span className="text-gray-500 font-bold ml-2">%</span>
            </div>
            <p className="text-xs text-gray-400 italic mt-2">
              Currently applied to all service bookings across the platform.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-teal-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal-700 transition shadow-sm"
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" /> Changes Saved!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" /> Save All Changes
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">Version 2.4.0 (Build 892)</p>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex justify-around py-3">
          <Link href="/admin/overview" className="text-center">
            <Home className="w-5 h-5 text-gray-400 mx-auto" />
            <p className="text-xs text-gray-400">Home</p>
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
            <User className="w-5 h-5 text-teal-600 mx-auto" />
            <p className="text-xs text-teal-600 font-medium">Profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
