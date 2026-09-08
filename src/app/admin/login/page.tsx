'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, Lock, User, Mail, Phone, KeyRound, 
  ArrowRight, Loader2, AlertCircle, CheckCircle2, Sparkles,
  ExternalLink, ChevronRight
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');

  // Login State
  const [loginIdentifier, setLoginIdentifier] = useState('admin@sahyog.in');
  const [loginPassword, setLoginPassword] = useState('sahyog2026');

  // Signup State
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [secretKey, setSecretKey] = useState('sahyog2026');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailOrPhone: loginIdentifier,
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Persist Admin Session
      if (typeof window !== 'undefined') {
        localStorage.setItem('sahyog-admin-session', 'true');
        localStorage.setItem('sahyog-admin-name', data.admin?.fullName || 'Super Administrator');
        localStorage.setItem('sahyog-admin-email', data.admin?.email || loginIdentifier);
        localStorage.setItem('sahyog-role', 'ADMIN');
      }

      setSuccessMsg('Access granted! Redirecting to Control Hub...');
      setTimeout(() => {
        router.push('/admin/overview');
      }, 500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email: signupEmail,
          phone: signupPhone,
          adminSecret: secretKey,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccessMsg('Admin account verified! Please log in now.');
      setLoginIdentifier(signupEmail);
      setTab('LOGIN');
    } catch (err: any) {
      setErrorMsg(err.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = () => {
    setLoginIdentifier('admin@sahyog.in');
    setLoginPassword('sahyog2026');
    setTimeout(() => {
      handleLogin();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
        
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-slate-800/80 border border-slate-700 mb-3 shadow-inner">
            <img 
              src="/logo.png" 
              alt="SahYog" 
              className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-amber-400" 
            />
          </div>
          
          <div className="flex items-center justify-center gap-1.5">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SahYog Admin Portal
            </h1>
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black px-2 py-0.5 rounded">
              ROOT
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-1">
            Enterprise Management & Real-Time Neon DB Controls
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 p-1 bg-slate-800 rounded-2xl flex border border-slate-700/60 shadow-inner">
          <button
            type="button"
            onClick={() => { setTab('LOGIN'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              tab === 'LOGIN'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Admin Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('SIGNUP'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              tab === 'SIGNUP'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Register Admin
          </button>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Body */}
        {tab === 'LOGIN' ? (
          <form onSubmit={handleLogin} className="mt-5 space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Admin Email / Username
              </label>
              <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 focus-within:border-teal-500 transition">
                <Mail className="w-4 h-4 text-slate-500 mr-2.5 flex-shrink-0" />
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="admin@sahyog.in or phone"
                  className="w-full bg-transparent text-white text-xs sm:text-sm outline-none placeholder-slate-500 font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Password / Access Key
                </label>
                <span className="text-[10px] text-teal-400 font-mono">Master: sahyog2026</span>
              </div>
              <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 focus-within:border-teal-500 transition">
                <Lock className="w-4 h-4 text-slate-500 mr-2.5 flex-shrink-0" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-transparent text-white text-xs sm:text-sm outline-none placeholder-slate-500 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-teal-900/30 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Quick Demo Access */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-amber-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>1-Click Super Admin Login (Demo)</span>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="mt-5 space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Full Name
              </label>
              <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-teal-500 transition">
                <User className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jeel Patel"
                  className="w-full bg-transparent text-white text-xs outline-none placeholder-slate-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Admin Email
              </label>
              <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-teal-500 transition">
                <Mail className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="admin@sahyog.in"
                  className="w-full bg-transparent text-white text-xs outline-none placeholder-slate-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Mobile Number
              </label>
              <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-teal-500 transition">
                <Phone className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
                <input
                  type="tel"
                  required
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  placeholder="10-digit mobile"
                  className="w-full bg-transparent text-white text-xs outline-none placeholder-slate-500 font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Secret Invite Key
                </label>
                <span className="text-[10px] text-slate-500 font-mono">Default: sahyog2026</span>
              </div>
              <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-teal-500 transition">
                <KeyRound className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  required
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Enter master admin key"
                  className="w-full bg-transparent text-white text-xs outline-none placeholder-slate-500 font-medium font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-teal-900/30 cursor-pointer disabled:opacity-50 mt-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering Admin...</span>
                </>
              ) : (
                <>
                  <span>Create Admin Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Footnotes & Quick Redirections */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center space-y-2">
          <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
            <Link href="/customer/dashboard" className="hover:text-teal-400 transition flex items-center gap-1">
              <span>Customer App</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/worker/dashboard" className="hover:text-teal-400 transition flex items-center gap-1">
              <span>Worker Platform</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-[10px] text-slate-600 font-mono">
            Encrypted with 256-bit SSL • Neon PostgreSQL Serverless
          </p>
        </div>

      </div>
    </div>
  );
}
