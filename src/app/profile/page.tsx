'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Bell, User, MapPin, Phone, Mail, ShieldCheck, 
  CreditCard, Globe, ChevronRight, LogOut, Heart, FileText, 
  HelpCircle, Settings, Camera, CheckCircle2, AlertCircle, 
  Sparkles, Wrench, Clock, Star, Edit3, Plus, SwitchCamera
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const [role, setRole] = useState<'customer' | 'worker'>('customer');
  const [language, setLanguage] = useState<'English' | 'हिन्दी' | 'ગુજરાતી'>('English');
  const [notifications, setNotifications] = useState({
    whatsapp: true,
    sms: true,
    promo: false,
  });
  const [editSuccess, setEditSuccess] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/welcome');
  };

  const showSaveNotice = () => {
    setEditSuccess(true);
    setTimeout(() => setEditSuccess(false), 2500);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-24">
      {/* Top Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link href={role === 'customer' ? '/customer/dashboard' : '/worker/dashboard'}>
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="font-bold text-lg text-gray-900">My Profile</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Role Preview Switcher */}
          <button 
            onClick={() => setRole(role === 'customer' ? 'worker' : 'customer')}
            className="flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-700 rounded-full text-xs font-semibold hover:bg-teal-100 transition"
            title="Switch Profile Mode"
          >
            <SwitchCamera className="w-3.5 h-3.5" />
            <span>{role === 'customer' ? 'Customer View' : 'Worker View'}</span>
          </button>
        </div>
      </div>

      {editSuccess && (
        <div className="bg-green-600 text-white text-xs py-2 px-4 text-center font-medium sticky top-[57px] z-30 flex items-center justify-center gap-1 shadow">
          <CheckCircle2 className="w-3.5 h-3.5" /> Settings updated successfully!
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-white p-5 border-b">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {role === 'customer' ? 'AS' : 'RK'}
            </div>
            <button 
              onClick={showSaveNotice}
              className="absolute -bottom-1 -right-1 bg-teal-600 text-white p-1.5 rounded-full shadow border-2 border-white hover:bg-teal-700 transition"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="text-xl font-bold text-gray-900">
                {role === 'customer' ? 'Anjali Sharma' : 'Rajesh Kumar'}
              </h2>
              <ShieldCheck className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-xs font-medium text-gray-500 mt-0.5">
              {role === 'customer' ? 'SahYog Member since Oct 2023' : 'Master Electrician • 8+ Yrs Exp'}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> Aadhar Verified
              </span>
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium bg-teal-50 text-teal-700">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> 4.9 Rating
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t">
          {role === 'customer' ? (
            <>
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-gray-500">Bookings</p>
                <p className="text-base font-bold text-gray-900 mt-0.5">14 Done</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-gray-500">Saved</p>
                <p className="text-base font-bold text-teal-600 mt-0.5">₹1,450</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-gray-500">Trust Score</p>
                <p className="text-base font-bold text-gray-900 mt-0.5">100%</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-gray-500">Jobs Done</p>
                <p className="text-base font-bold text-gray-900 mt-0.5">450+</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-gray-500">Monthly</p>
                <p className="text-base font-bold text-teal-600 mt-0.5">₹42,850</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-gray-500">Hourly Rate</p>
                <p className="text-base font-bold text-gray-900 mt-0.5">₹350/hr</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Contact & Personal Information */}
        <div className="bg-white rounded-xl p-4 border shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-2 border-b">
            <h3 className="font-bold text-sm text-gray-900">Personal & Contact Info</h3>
            <button onClick={showSaveNotice} className="text-xs text-teal-600 font-semibold flex items-center gap-1">
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-400">Mobile Number (OTP Verified)</p>
                <p className="font-medium text-gray-800">+91 98765 43210</p>
              </div>
              <span className="text-[11px] bg-green-50 text-green-700 px-2 py-0.5 rounded font-medium">Verified</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-400">Email Address</p>
                <p className="font-medium text-gray-800">
                  {role === 'customer' ? 'anjali.sharma@example.com' : 'rajesh.kumar@example.com'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <div className="flex-1">
                <p className="text-xs text-gray-400">Emergency Contact</p>
                <p className="font-medium text-gray-800">Suresh Sharma (+91 98220 11223)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Addresses / Service Locations */}
        <div className="bg-white rounded-xl p-4 border shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-2 border-b">
            <h3 className="font-bold text-sm text-gray-900">
              {role === 'customer' ? 'Saved Addresses' : 'Primary Work Areas'}
            </h3>
            <button onClick={showSaveNotice} className="text-xs text-teal-600 font-semibold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
              <MapPin className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">Home (Primary)</span>
                  <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.2 rounded">Default</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">B/402, Shanti Heights, Sector 12, Navrangpura</p>
                <p className="text-xs text-gray-400">Ahmedabad, Gujarat - 380015</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 text-sm">
                <span className="font-semibold text-gray-900">Work / Office</span>
                <p className="text-xs text-gray-500 mt-0.5">401 Synergy Tower, SG Highway</p>
                <p className="text-xs text-gray-400">Ahmedabad, Gujarat - 380054</p>
              </div>
            </div>
          </div>
        </div>

        {/* Language Preference */}
        <div className="bg-white rounded-xl p-4 border shadow-sm">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b">
            <Globe className="w-4 h-4 text-teal-600" />
            <h3 className="font-bold text-sm text-gray-900">App Language (ભાષા / भाषा)</h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(['English', 'हिन्दी', 'ગુજરાતી'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  showSaveNotice();
                }}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition border ${
                  language === lang
                    ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Payment & Wallet */}
        <div className="bg-white rounded-xl p-4 border shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-2 border-b">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-teal-600" />
              <h3 className="font-bold text-sm text-gray-900">Payment & SahYog Wallet</h3>
            </div>
            <Link href="/customer/payment/1" className="text-xs text-teal-600 font-semibold">
              Manage &gt;
            </Link>
          </div>

          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-100 mb-3">
            <div>
              <p className="text-xs text-gray-500">Wallet Balance / Rewards</p>
              <p className="text-lg font-bold text-teal-700">₹ 250.00</p>
            </div>
            <button onClick={showSaveNotice} className="px-3 py-1.5 bg-teal-600 text-white text-xs font-semibold rounded-lg hover:bg-teal-700 shadow-sm">
              Add Money
            </button>
          </div>

          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center justify-between py-1">
              <span>Default UPI ID</span>
              <span className="font-semibold text-gray-800">anjali@okhdfcbank</span>
            </div>
            <div className="flex items-center justify-between py-1 border-t">
              <span>Linked Card</span>
              <span className="font-semibold text-gray-800">HDFC Visa •••• 4092</span>
            </div>
          </div>
        </div>

        {/* SahYog Trust & Security Badges */}
        <div className="bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-teal-200" />
            <h4 className="font-bold text-sm">SahYog Trust Protection</h4>
          </div>
          <p className="text-xs text-teal-100 leading-relaxed">
            Your bookings are insured up to ₹10,000 for damages and guaranteed service quality. Worker background checks completed via state police verification APIs.
          </p>
          <div className="mt-3 pt-2 border-t border-teal-500/50 flex justify-between text-[11px] text-teal-200">
            <span>✓ Verified Identity</span>
            <span>✓ Secure Escrow Pay</span>
            <span>✓ 24/7 Helpline</span>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-xl p-4 border shadow-sm">
          <h3 className="font-bold text-sm text-gray-900 mb-3 pb-2 border-b">Notification Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">WhatsApp Service Updates</p>
                <p className="text-xs text-gray-400">Receive arrival OTP and invoice on WhatsApp</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.whatsapp}
                onChange={(e) => {
                  setNotifications({ ...notifications, whatsapp: e.target.checked });
                  showSaveNotice();
                }}
                className="w-4 h-4 text-teal-600 accent-teal-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">SMS Booking Alerts</p>
                <p className="text-xs text-gray-400">Important safety codes and OTP alerts</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => {
                  setNotifications({ ...notifications, sms: e.target.checked });
                  showSaveNotice();
                }}
                className="w-4 h-4 text-teal-600 accent-teal-600 rounded"
              />
            </div>
          </div>
        </div>

        {/* Support & Quick Links */}
        <div className="bg-white rounded-xl border divide-y shadow-sm text-sm">
          <Link href="/download" className="p-3.5 flex items-center justify-between hover:bg-teal-50 transition bg-teal-50/40">
            <div className="flex items-center gap-3">
              <Smartphone className="w-4 h-4 text-teal-600" />
              <div>
                <span className="font-bold text-gray-900">Install Native Android App (.APK)</span>
                <p className="text-[11px] text-teal-700">Add to phone desktop like WhatsApp & Instagram</p>
              </div>
            </div>
            <span className="text-[10px] bg-teal-600 text-white font-bold px-2 py-0.5 rounded-full">Download</span>
          </Link>

          <Link href="/customer/bookings" className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-teal-600" />
              <span className="font-medium text-gray-800">My Booking History</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link href="/chat/1" className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="font-medium text-gray-800">SahYog AI Assistant Support</span>
            </div>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">24/7 Live</span>
          </Link>

          <div className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-800">Help & FAQs (सहायता केंद्र)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-800">Terms of Service & Privacy</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-white hover:bg-red-50 text-red-600 border border-red-200 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out / Log Out</span>
        </button>

        <p className="text-center text-xs text-gray-400 pb-2">
          SahYog App Version 2.4.0 • Made with ❤️ for Indian Households
        </p>
      </div>

      <BottomNav role={role} />
    </div>
  );
}
