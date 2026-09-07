'use client';
import Link from 'next/link';
import { LayoutDashboard, ShieldCheck, Calendar, DollarSign, Users, Settings, LogOut, TrendingUp, Clock, Search, Filter, Download, Info, Briefcase } from 'lucide-react';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/admin/overview' },
  { icon: ShieldCheck, label: 'Verification', href: '/admin/verification' },
  { icon: Calendar, label: 'Bookings', href: '/admin/bookings', active: true },
  { icon: DollarSign, label: 'Financials', href: '/admin/financials' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

const bookings = [
  { id: 'BK-8291', service: 'Deep Cleaning', customer: 'Anjali S.', status: 'Completed', amount: '₹1,250' },
  { id: 'BK-8292', service: 'Plumbing Repair', customer: 'Rahul V.', status: 'In Progress', amount: '₹650' },
  { id: 'BK-8293', service: 'Electrical Fix', customer: 'Priya P.', status: 'Pending', amount: '₹450' },
  { id: 'BK-8294', service: 'AC Repair', customer: 'Amit K.', status: 'Confirmed', amount: '₹1,800' },
];

export default function AdminBookingsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 bg-white border-r flex flex-col p-4 hidden md:flex">
        <div className="flex items-center gap-2 mb-8"><div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">SY</span></div><span className="font-bold text-lg">SahYog</span></div>
        <nav className="space-y-1 flex-1">
          {sidebarItems.map(item => (
            <Link key={item.label} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${item.active ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
              <item.icon className="w-4 h-4" />{item.label}
            </Link>
          ))}
        </nav>
        <button className="flex items-center gap-3 px-3 py-2.5 text-red-500 text-sm mt-4"><LogOut className="w-4 h-4" />Sign Out</button>
      </aside>

      <main className="flex-1 p-4 md:p-6 max-w-4xl">
        <h1 className="text-2xl font-bold mb-1">Bookings</h1>
        <p className="text-sm text-gray-500 mb-6">Monitor and oversee all platform service orders</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'TOTAL BOOKINGS', value: '1,284', sub: '+12% vs last month', icon: Calendar },
            { label: 'ACTIVE JOBS', value: '42', sub: '8 New since yesterday', icon: Clock },
            { label: 'GROSS VALUE', value: '₹4.2L', sub: '₹28k today', icon: TrendingUp },
            { label: 'CANCEL RATE', value: '3.2%', sub: '-0.5% improvement', icon: Briefcase },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 border">
              <s.icon className="w-5 h-5 text-teal-600 mb-2" />
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-xs text-gray-400">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border">
          <div className="p-4 border-b">
            <h2 className="font-bold">Booking Orders</h2>
            <p className="text-xs text-gray-400">A detailed list of all service requests across India</p>
            <div className="flex gap-2 mt-3">
              <button className="border rounded-lg p-2"><Download className="w-4 h-4 text-gray-500" /></button>
              <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 flex items-center gap-2"><Search className="w-4 h-4 text-gray-400" /><input placeholder="Search bookings..." className="flex-1 bg-transparent outline-none text-sm" /></div>
              <button className="border rounded-lg p-2"><Filter className="w-4 h-4 text-gray-500" /></button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50"><tr><th className="text-left p-3 text-xs text-gray-500 font-semibold">ID</th><th className="text-left p-3 text-xs text-gray-500 font-semibold">Service</th><th className="text-left p-3 text-xs text-gray-500 font-semibold">Customer</th><th className="text-left p-3 text-xs text-gray-500 font-semibold">Status</th><th className="text-right p-3 text-xs text-gray-500 font-semibold">Amount</th></tr></thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id} className="border-t">
                    <td className="p-3 font-medium text-teal-600">{b.id}</td>
                    <td className="p-3">{b.service}</td>
                    <td className="p-3 text-gray-500">{b.customer}</td>
                    <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${b.status === 'Completed' ? 'bg-green-50 text-green-600' : b.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : b.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-teal-50 text-teal-600'}`}>{b.status}</span></td>
                    <td className="p-3 text-right font-semibold">{b.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t flex items-center justify-between text-xs text-gray-400"><span>Showing 1-4 of 284</span><div className="flex gap-2"><button className="border px-3 py-1 rounded">Previous</button><button className="border px-3 py-1 rounded">Next</button></div></div>
        </div>

        <button className="fixed bottom-6 right-6 w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center shadow-lg"><Info className="w-5 h-5 text-white" /></button>
      </main>
    </div>
  );
}
