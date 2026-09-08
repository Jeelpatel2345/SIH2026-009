'use client';
import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, ShieldCheck, Users, Calendar, DollarSign, 
  Settings, LogOut, Menu, X, Globe, Bell, ExternalLink,
  ChevronRight, Sparkles, Smartphone, CheckCircle
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/admin/overview', label: 'Analytics Hub', icon: LayoutDashboard, badge: 'Live' },
  { href: '/admin/verification', label: 'Worker Verification', icon: ShieldCheck, badge: 'Active' },
  { href: '/admin/users', label: 'User Management', icon: Users },
  { href: '/admin/bookings', label: 'Bookings Manager', icon: Calendar, badge: 'DB' },
  { href: '/admin/financials', label: 'Financials & Revenue', icon: DollarSign },
  { href: '/admin/settings', label: 'Platform Settings', icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('English');
  const [adminName, setAdminName] = useState('Super Administrator');
  const [adminEmail, setAdminEmail] = useState('admin@sahyog.in');
  const [authChecked, setAuthChecked] = useState(false);

  // If we are on the admin login page, bypass the layout chrome completely
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('sahyog-admin-session') === 'true';
      if (!isLoginPage && !isAuth) {
        router.replace('/admin/login');
        return;
      }
      const savedName = localStorage.getItem('sahyog-admin-name');
      const savedEmail = localStorage.getItem('sahyog-admin-email');
      if (savedName) setAdminName(savedName);
      if (savedEmail) setAdminEmail(savedEmail);
      setAuthChecked(true);
    }
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sahyog-admin-session');
      localStorage.removeItem('sahyog-admin-name');
      localStorage.removeItem('sahyog-admin-email');
    }
    router.push('/admin/login');
  };

  const isActive = (href: string) => {
    if (href === '/admin/overview') {
      return pathname === '/admin' || pathname === '/admin/' || pathname === '/admin/overview' || pathname === '/admin/portal' || pathname === '/admin-portal';
    }
    return pathname.startsWith(href);
  };

  // If on login page, render children raw without admin sidebar/topbar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Brief loading barrier while verifying admin credentials
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <img src="/logo.png" alt="SahYog" className="w-12 h-12 rounded-full object-cover animate-pulse mb-3" />
        <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Verifying Admin Access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-[#042f2e] text-white border-r border-emerald-900/60 sticky top-0 h-screen z-30 shadow-xl">
        {/* Brand Header */}
        <div className="p-5 border-b border-emerald-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="SahYog"
              className="w-10 h-10 rounded-full object-cover shadow-md border-2 border-amber-400/80"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-white leading-none">SahYog</span>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black px-1.5 py-0.5 rounded">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-emerald-300 font-medium mt-0.5">Enterprise Control Hub</p>
            </div>
          </div>
        </div>

        {/* Live Neon Status Pill */}
        <div className="px-4 pt-4 pb-2">
          <div className="bg-emerald-950/70 border border-emerald-700/50 rounded-xl px-3 py-2 flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-emerald-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Neon DB Live
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-900/80 px-2 py-0.5 rounded">
              Postgres Cloud
            </span>
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

          <div className="pt-6">
            <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400/70">
              Live Platforms
            </p>
            <div className="space-y-1">
              <Link
                href="/customer/dashboard"
                target="_blank"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-emerald-200 hover:bg-emerald-800/40 transition"
              >
                <span className="flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-teal-400" />
                  Customer App Preview
                </span>
                <ExternalLink className="w-3 h-3 text-emerald-400" />
              </Link>
              <Link
                href="/worker/dashboard"
                target="_blank"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-emerald-200 hover:bg-emerald-800/40 transition"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                  Worker Platform
                </span>
                <ExternalLink className="w-3 h-3 text-emerald-400" />
              </Link>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer with Admin Profile & Logout */}
        <div className="p-4 border-t border-emerald-800/60 bg-emerald-950/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-emerald-800 border border-emerald-600 flex items-center justify-center text-xs font-bold text-amber-300 flex-shrink-0">
                SA
              </div>
              <div className="text-xs truncate">
                <p className="font-bold text-white truncate">{adminName}</p>
                <p className="text-[10px] text-emerald-300 truncate">{adminEmail}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-lg text-emerald-300 hover:bg-rose-500/20 hover:text-rose-300 transition-colors flex-shrink-0 cursor-pointer"
              title="Logout from Admin Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Clean Desktop / Mobile Topbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-xs px-4 sm:px-6 lg:px-8 py-3.5">
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
                  <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-none">
                    SahYog Platform Management
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Gujarat Live Hub
                  </span>
                </div>
                <p className="hidden sm:block text-xs text-slate-500 mt-1">
                  Connected directly to live Neon PostgreSQL database. Real-time metrics and operations.
                </p>
              </div>
            </div>

            {/* Right Tools (Language, Logout, Notifications) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Selector */}
              <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 border border-slate-200">
                <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
                {(['English', 'हिन्दी', 'ગુજરાતી'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeLang === lang
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Notification bell */}
              <Link 
                href="/admin/notifications" 
                className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition" 
                title="System Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
              </Link>

              {/* Logout button in top bar */}
              <button
                type="button"
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Nav Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-slate-200 space-y-1 animate-in fade-in-50">
              <div className="px-2 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Navigation</div>
              {navItems.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                      active
                        ? 'bg-teal-700 text-white font-bold'
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
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2 bg-rose-50 text-rose-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout from Admin Portal</span>
                </button>
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
