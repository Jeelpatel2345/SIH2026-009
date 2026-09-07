'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, MessageSquare, User } from 'lucide-react';

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
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 max-w-md mx-auto z-50">
      <div className="flex justify-around items-center py-2.5 px-2">
        <Link href={homeHref} className="flex flex-col items-center justify-center flex-1 py-1">
          <Home className={`w-5 h-5 transition ${isHome ? 'text-teal-600 scale-105 stroke-[2.5]' : 'text-gray-400 hover:text-gray-600'}`} />
          <span className={`text-[11px] mt-1 transition ${isHome ? 'text-teal-600 font-semibold' : 'text-gray-400'}`}>Home</span>
        </Link>

        <Link href={bookingsHref} className="flex flex-col items-center justify-center flex-1 py-1">
          <Calendar className={`w-5 h-5 transition ${isBookings ? 'text-teal-600 scale-105 stroke-[2.5]' : 'text-gray-400 hover:text-gray-600'}`} />
          <span className={`text-[11px] mt-1 transition ${isBookings ? 'text-teal-600 font-semibold' : 'text-gray-400'}`}>Bookings</span>
        </Link>

        <Link href="/chat/1" className="flex flex-col items-center justify-center flex-1 py-1 relative">
          <div className="relative">
            <MessageSquare className={`w-5 h-5 transition ${isChat ? 'text-teal-600 scale-105 stroke-[2.5]' : 'text-gray-400 hover:text-gray-600'}`} />
            <span className="absolute -top-1.5 -right-2.5 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center shadow-sm">
              AI
            </span>
          </div>
          <span className={`text-[11px] mt-1 transition ${isChat ? 'text-teal-600 font-semibold' : 'text-gray-400'}`}>Chat</span>
        </Link>

        <Link href="/profile" className="flex flex-col items-center justify-center flex-1 py-1">
          <User className={`w-5 h-5 transition ${isProfile ? 'text-teal-600 scale-105 stroke-[2.5]' : 'text-gray-400 hover:text-gray-600'}`} />
          <span className={`text-[11px] mt-1 transition ${isProfile ? 'text-teal-600 font-semibold' : 'text-gray-400'}`}>Profile</span>
        </Link>
      </div>
    </div>
  );
}
