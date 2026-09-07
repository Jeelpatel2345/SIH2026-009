'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, MessageSquare, User, Sparkles } from 'lucide-react';

interface BottomNavProps {
  role?: 'customer' | 'worker' | 'admin';
}

export default function BottomNav({ role = 'customer' }: BottomNavProps) {
  const pathname = usePathname();

  const homeHref = role === 'admin' 
    ? '/admin/overview' 
    : role === 'worker' 
      ? '/worker/dashboard' 
      : '/customer/dashboard';

  const bookingsHref = role === 'admin' 
    ? '/admin/bookings' 
    : '/customer/bookings';

  const isHome = pathname === homeHref;
  const isBookings = pathname.includes('/bookings') || pathname.includes('/tracking');
  const isChat = pathname.startsWith('/chat');
  const isProfile = pathname.startsWith('/profile') || (role === 'admin' && pathname === '/admin/users');

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 max-w-md mx-auto z-50 shadow-lg">
      <div className="flex justify-around items-center py-2 px-3">
        {/* Home */}
        <Link href={homeHref} className="flex flex-col items-center justify-center flex-1 py-1 relative group">
          <div className={`p-1 rounded-xl transition-all duration-200 ${isHome ? 'bg-emerald-50 text-emerald-700' : 'text-slate-400 group-hover:text-slate-600'}`}>
            <Home className={`w-5 h-5 ${isHome ? 'stroke-[2.5]' : ''}`} />
          </div>
          <span className={`text-[10px] mt-0.5 font-bold transition-all ${isHome ? 'text-emerald-800' : 'text-slate-400'}`}>
            Home
          </span>
          {isHome && <span className="w-1 h-1 bg-emerald-600 rounded-full mt-0.5" />}
        </Link>

        {/* Bookings */}
        <Link href={bookingsHref} className="flex flex-col items-center justify-center flex-1 py-1 relative group">
          <div className={`p-1 rounded-xl transition-all duration-200 ${isBookings ? 'bg-emerald-50 text-emerald-700' : 'text-slate-400 group-hover:text-slate-600'}`}>
            <Calendar className={`w-5 h-5 ${isBookings ? 'stroke-[2.5]' : ''}`} />
          </div>
          <span className={`text-[10px] mt-0.5 font-bold transition-all ${isBookings ? 'text-emerald-800' : 'text-slate-400'}`}>
            Bookings
          </span>
          {isBookings && <span className="w-1 h-1 bg-emerald-600 rounded-full mt-0.5" />}
        </Link>

        {/* Chat / AI */}
        <Link href="/chat/1" className="flex flex-col items-center justify-center flex-1 py-1 relative group">
          <div className="relative">
            <div className={`p-1 rounded-xl transition-all duration-200 ${isChat ? 'bg-emerald-50 text-emerald-700' : 'text-slate-400 group-hover:text-slate-600'}`}>
              <MessageSquare className={`w-5 h-5 ${isChat ? 'stroke-[2.5]' : ''}`} />
            </div>
            <span className="absolute -top-1 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black rounded-full h-3.5 min-w-3.5 px-1 flex items-center justify-center shadow-xs">
              AI
            </span>
          </div>
          <span className={`text-[10px] mt-0.5 font-bold transition-all ${isChat ? 'text-emerald-800' : 'text-slate-400'}`}>
            Chat
          </span>
          {isChat && <span className="w-1 h-1 bg-emerald-600 rounded-full mt-0.5" />}
        </Link>

        {/* Profile */}
        <Link href="/profile" className="flex flex-col items-center justify-center flex-1 py-1 relative group">
          <div className={`p-1 rounded-xl transition-all duration-200 ${isProfile ? 'bg-emerald-50 text-emerald-700' : 'text-slate-400 group-hover:text-slate-600'}`}>
            <User className={`w-5 h-5 ${isProfile ? 'stroke-[2.5]' : ''}`} />
          </div>
          <span className={`text-[10px] mt-0.5 font-bold transition-all ${isProfile ? 'text-emerald-800' : 'text-slate-400'}`}>
            Profile
          </span>
          {isProfile && <span className="w-1 h-1 bg-emerald-600 rounded-full mt-0.5" />}
        </Link>
      </div>
    </div>
  );
}
