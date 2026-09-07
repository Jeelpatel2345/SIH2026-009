'use client';
import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, ShieldCheck, Users, Calendar, DollarSign, 
  Settings, LogOut, Menu, X, Globe, Bell, ChevronRight,
  ExternalLink, Sparkles, Smartphone
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/admin/overview', label: 'Analytics Hub', icon: LayoutDashboard, badge: 'Live' },
  { href: '/admin/verification', label: 'Worker Verification', icon: ShieldCheck, badge: '24' },
  { href: '/admin/users', label: 'User Management', icon: Users },
  { href: '/admin/bookings', label: 'Bookings Manager', icon: Calendar, badge: '42' },
  { href: '/admin/financials', label: 'Financials & Revenue', icon: DollarSign },
  { href: '/admin/settings', label: 'Platform Settings', icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('English');

  const isActive = (href: string) => {
    if (href === '/admin/overview') {
      return pathname === '/admin' || pathname === '/admin/' || pathname === '/admin/overview' || pathname === '/admin/portal' || pathname === '/admin-portal';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-[#042f2e] text-white border-r border-emerald-900/60 sticky top-0 h-screen z-30 shadow-xl">
        {/* Brand Header */}
        <div className="p-5 border-b border-emerald-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center font-black text-emerald-950 shadow-md text-base">
              SY
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-white">SahYog</span>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-emerald-300 font-medium">Enterprise Control Hub</p>
            </div>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="px-4 pt-4 pb-2">
          <div className="bg-emerald-950/70 border border-emerald-700/50 rounded-xl px-3 py-2 flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Platform Active
            </span>
            <span className="text-[11px] text-emerald-400 font-mono font-semibold">99.98% SLA</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400/70">
            Control Center
          </p>
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-emerald-700 to-teal-700 text-white shadow-md shadow-emerald-950/40 font-bold border-l-4 border-amber-400'
                    : 'text-emerald-100/80 hover:bg-emerald-800/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-amber-300' : 'text-emerald-300/80'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      active
                        ? 'bg-amber-400 text-emerald-950'
                        : 'bg-emerald-800 text-emerald-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4">
            <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400/70">
              Quick Shortcuts & URLs
            </p>
            <div className="space-y-1">
              <Link
                href="/admin/portal"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-emerald-200 hover:bg-emerald-800/40"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Admin URL 1: /admin/portal
                </span>
                <ChevronRight className="w-3 h-3 text-emerald-400" />
              </Link>
              <Link
                href="/admin-portal"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-emerald-200 hover:bg-emerald-800/40"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Admin URL 2: /admin-portal
                </span>
                <ChevronRight className="w-3 h-3 text-emerald-400" />
              </Link>
              <Link
                href="/welcome"
                target="_blank"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-emerald-200 hover:bg-emerald-800/40"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                  Open Live Website
                </span>
              </Link>
              <Link
                href="/customer/dashboard"
                target="_blank"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-emerald-200 hover:bg-emerald-800/40"
              >
                <span className="flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-teal-400" />
                  Customer App Preview
                </span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-emerald-800/60 bg-emerald-950/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-800 border border-emerald-600 flex items-center justify-center text-xs font-bold text-emerald-200">
                AD
              </div>
              <div className="text-xs">
                <p className="font-semibold text-white">Super Admin</p>
                <p className="text-[10px] text-emerald-300">admin@sah-yog.in</p>
              </div>
            </div>
            <Link
              href="/login"
              className="p-2 rounded-lg text-emerald-300 hover:bg-rose-500/20 hover:text-rose-300 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Responsive Desktop / Mobile Topbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Toggle + Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-black text-slate-900">
                    SahYog Platform Management
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                    Gujarat Multi-Region
                  </span>
                </div>
                <p className="hidden sm:block text-xs text-slate-500">
                  Real-time synchronization across Mobile, Tablet, and Desktop participants.
                </p>
              </div>
            </div>

            {/* Right Tools (Language, Direct URLs, Notifications) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Direct URLs selector */}
              <div className="hidden lg:flex items-center bg-slate-100 rounded-lg p-1 text-xs border border-slate-200">
                <span className="px-2 py-1 text-slate-500 font-semibold">Admin URL:</span>
                <Link
                  href="/admin/portal"
                  className="px-2.5 py-1 rounded-md hover:bg-white text-slate-700 font-medium transition-all"
                >
                  /admin/portal
                </Link>
                <Link
                  href="/admin-portal"
                  className="px-2.5 py-1 rounded-md hover:bg-white text-slate-700 font-medium transition-all"
                >
                  /admin-portal
                </Link>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 border border-slate-200">
                <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
                {(['English', 'हिन्दी', 'ગુજરાતી'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-2 py-1 rounded-md text-xs font-semibold transition-all ${
                      activeLang === lang
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Notification bell */}
              <button className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Nav Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-slate-200 space-y-1 animate-in fade-in-50">
              <div className="px-2 pb-2 text-xs font-semibold text-slate-500">Navigation</div>
              {navItems.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold ${
                      active
                        ? 'bg-teal-600 text-white font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-xs bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-slate-200">
                <div className="px-2 py-1 text-xs font-semibold text-slate-500">Admin URLs:</div>
                <div className="flex gap-2 px-2">
                  <Link
                    href="/admin/portal"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-1.5 bg-slate-100 rounded text-xs font-medium text-slate-800"
                  >
                    /admin/portal
                  </Link>
                  <Link
                    href="/admin-portal"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-1.5 bg-slate-100 rounded text-xs font-medium text-slate-800"
                  >
                    /admin-portal
                  </Link>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
