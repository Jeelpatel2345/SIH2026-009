'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Bell, MapPin, Clock, Zap, ChevronRight, AlertTriangle, Calendar, Home, MessageSquare, User, Navigation } from 'lucide-react';

export default function WorkerDashboard() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <h1 className="font-bold text-lg">SahYog Worker</h1>
        <div className="flex items-center gap-3"><Bell className="w-5 h-5 text-gray-600" /><div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-teal-600" /></div></div>
      </div>

      <div className="mx-4 mt-4">
        <div className={`rounded-2xl p-4 ${isOnline ? 'bg-gradient-to-r from-teal-600 to-teal-500' : 'bg-gray-400'}`}>
          <div className="flex items-center justify-between">
            <div><p className="text-white font-bold text-lg">{isOnline ? 'You are Online' : 'You are Offline'}</p><p className="text-teal-100 text-sm">{isOnline ? 'Accepting new jobs' : 'Not accepting jobs'}</p></div>
            <button onClick={() => setIsOnline(!isOnline)} className={`w-14 h-8 rounded-full relative transition ${isOnline ? 'bg-white/30' : 'bg-gray-600'}`}>
              <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${isOnline ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
          {isOnline && <div className="mt-3 bg-teal-700 rounded-xl p-2.5 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-300" /><span className="text-white text-sm font-medium">High demand in your area!</span></div>}
        </div>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-xl p-4 border">
        <p className="text-xs tracking-wider text-gray-500 mb-1">WEEKLY EARNINGS</p>
        <div className="flex items-center justify-between">
          <div><span className="text-2xl font-bold">₹ 4,850</span><span className="text-green-500 text-sm ml-2">📈 +12%</span></div>
          <div className="flex gap-1">{[40,60,35,80,55,70,90].map((h,i)=><div key={i} className="w-3 rounded-t" style={{height:`${h*0.4}px`,backgroundColor:i===6?'#0d9488':'#e5e7eb'}} />)}</div>
        </div>
        <div className="flex items-center justify-between mt-2"><span className="text-sm text-gray-500">Target: ₹ 6,000</span><span className="text-sm font-medium">80%</span></div>
        <div className="w-full bg-gray-100 rounded-full h-2 mt-1"><div className="bg-teal-600 h-2 rounded-full" style={{width:'80%'}} /></div>
        <div className="flex items-center justify-between mt-2"><span className="text-xs text-gray-400">Next payout: Monday, 27 Oct</span><Link href="/worker/earnings" className="text-teal-600 text-sm font-medium">History →</Link></div>
      </div>

      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3"><h3 className="font-bold flex items-center gap-2"><Clock className="w-4 h-4" />Active Job</h3><span className="text-xs border border-teal-600 text-teal-600 px-2 py-0.5 rounded-full font-medium">IN PROGRESS</span></div>
        <div className="bg-white rounded-xl p-4 border">
          <div className="flex items-center justify-between mb-2"><span className="text-teal-600 font-semibold">Plumbing Repair</span><div className="text-right"><p className="font-bold text-lg">₹ 650</p><p className="text-xs text-gray-400">Fixed Fee</p></div></div>
          <p className="font-semibold">Amit Sharma</p>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" />Sector 45, Gurgaon</p>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5"><Calendar className="w-3 h-3" />10:30 AM - 12:30 PM</p>
          <div className="flex gap-2 mt-3"><button className="flex-1 bg-teal-600 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-1"><Navigation className="w-4 h-4" />Open Directions</button><button className="w-10 border rounded-xl flex items-center justify-center"><Zap className="w-4 h-4 text-gray-600" /></button></div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3"><h3 className="font-bold flex items-center gap-2">📋 Upcoming Bookings</h3><span className="text-teal-600 text-sm font-medium">View All</span></div>
        {[{ title: 'Fan Installation', loc: 'Golf Course Rd', date: 'TOMORROW', time: '09:00 AM', price: 450 }, { title: 'Deep Kitchen Cleaning', loc: 'Cyber Hub', date: '24 OCT', time: '02:00 PM', price: 1200 }].map((b, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border mb-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center"><Calendar className="w-5 h-5 text-gray-400" /></div>
            <div className="flex-1"><p className="font-semibold text-sm">{b.title}</p><p className="text-xs text-gray-400">{b.loc}</p><span className="text-xs bg-gray-100 px-2 py-0.5 rounded font-medium">{b.date}</span><span className="text-xs text-gray-400 ml-2">{b.time}</span></div>
            <div className="text-right"><p className="font-bold">₹{b.price}</p><ChevronRight className="w-4 h-4 text-gray-400 ml-auto" /></div>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-4 bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
        <div><p className="font-semibold text-red-600">Verification Pending</p><p className="text-sm text-gray-600">Please upload your Aadhar Card back side to complete your profile verification.</p><button className="text-red-600 font-semibold text-sm mt-1">Upload Now</button></div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex justify-around py-3">
          <Link href="/worker/dashboard" className="text-center"><Home className="w-5 h-5 text-teal-600 mx-auto" /><p className="text-xs text-teal-600 font-medium">Home</p></Link>
          <Link href="#" className="text-center"><Calendar className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Bookings</p></Link>
          <Link href="/chat/1" className="text-center relative"><MessageSquare className="w-5 h-5 text-gray-400 mx-auto" /><span className="absolute -top-1 left-1/2 ml-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">9</span><p className="text-xs text-gray-400">Chat</p></Link>
          <Link href="#" className="text-center"><User className="w-5 h-5 text-gray-400 mx-auto" /><p className="text-xs text-gray-400">Profile</p></Link>
        </div>
      </div>
    </div>
  );
}
