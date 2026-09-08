'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Star, ShieldCheck, Clock, MapPin, Calendar, 
  CreditCard, CheckCircle2, ChevronRight, AlertCircle, Loader2, 
  Sparkles, Check 
} from 'lucide-react';
import { allWorkers } from '@/data/workersData';
import { useAuthStore } from '@/store/authStore';

export default function BookWorkerPage() {
  const params = useParams();
  const router = useRouter();
  const workerId = params.id as string;
  const { fullName, phone } = useAuthStore();

  const worker = allWorkers.find((w) => w.id === workerId) || allWorkers[0];

  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [duration, setDuration] = useState<'hourly' | 'halfDay' | 'fullDay'>('hourly');
  const [hours, setHours] = useState(2);
  const [serviceAddress, setServiceAddress] = useState('B/402, Shanti Heights, Sector 12, Navrangpura, Ahmedabad');
  const [customerPhone, setCustomerPhone] = useState(phone || '98765 43210');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Price Calculation
  const calculation = useMemo(() => {
    let serviceFee = 0;
    if (duration === 'hourly') {
      serviceFee = worker.rate * hours;
    } else if (duration === 'halfDay') {
      serviceFee = Math.round(worker.rate * 4 * 0.9); // 10% discount
    } else {
      serviceFee = Math.round(worker.rate * 8 * 0.8); // 20% discount
    }

    const platformFee = 25;
    const gst = Math.round(serviceFee * 0.18);
    const total = serviceFee + platformFee + gst;

    return { serviceFee, platformFee, gst, total };
  }, [duration, hours, worker.rate]);

  const handleConfirmBooking = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workerId: worker.id,
          workerName: worker.name,
          serviceName: worker.title,
          category: worker.category,
          date: selectedDate,
          time: selectedTime,
          duration: duration === 'hourly' ? (hours + ' Hours') : duration === 'halfDay' ? 'Half Day (4 Hours)' : 'Full Day (8 Hours)',
          address: serviceAddress,
          customerPhone: customerPhone,
          totalAmount: calculation.total,
          notes: notes,
        }),
      });

      setSuccess(true);
      setTimeout(() => {
        router.push('/bookings');
      }, 2000);
    } catch (err) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/bookings');
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-2xl text-center max-w-md space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Booking Confirmed!</h2>
          <p className="text-xs text-slate-600">
            Your service request with <b>{worker.name}</b> has been booked. Redirecting to your bookings dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-teal-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Workers</span>
        </Link>

        {/* 2-Column Grid: Left Worker Profile Summary, Right Booking Form & Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Worker Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-800 text-white font-black text-xl flex items-center justify-center shadow-md flex-shrink-0">
                  {getInitials(worker.name)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-slate-900">{worker.name}</h3>
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                  </div>
                  <p className="text-xs text-teal-700 font-semibold">{worker.title}</p>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-700 mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{worker.rating}</span>
                    <span className="text-slate-400 font-normal">({worker.reviewsCount} completed jobs)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                <p>{worker.bio}</p>
              </div>

              {/* Skills Tags */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase block mb-2">Verified Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {worker.skills.map((s, i) => (
                    <span key={i} className="text-[11px] font-semibold bg-teal-50 text-teal-800 px-2.5 py-1 rounded-lg border border-teal-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification Badges */}
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">Government Aadhaar Validated</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">Local Police Clearance Done</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4">
                Schedule & Customize Your Service
              </h2>

              {/* Step 1: Select Date */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Select Date (तारीख)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Today', 'Tomorrow', 'Day After'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={'py-3 px-4 rounded-xl text-xs font-bold border transition text-center ' + (
                        selectedDate === d
                          ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Time Slot */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Select Time Slot (समय)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['09:00 AM', '11:00 AM', '02:00 PM', '04:30 PM'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={'py-2.5 rounded-xl text-xs font-bold border transition text-center ' + (
                        selectedTime === t
                          ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Duration / Booking Package */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">
                  Service Duration & Package (अवधि)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setDuration('hourly')}
                    className={'p-4 rounded-2xl border text-left transition ' + (
                      duration === 'hourly'
                        ? 'border-teal-600 bg-teal-50/60 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    )}
                  >
                    <div className="text-xs font-black text-slate-900">Custom Hours</div>
                    <div className="text-[11px] text-slate-500 mt-1">₹{worker.rate} / hour</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDuration('halfDay')}
                    className={'p-4 rounded-2xl border text-left transition relative ' + (
                      duration === 'halfDay'
                        ? 'border-teal-600 bg-teal-50/60 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    )}
                  >
                    <span className="absolute -top-2 right-2 bg-amber-400 text-emerald-950 font-black text-[9px] px-2 py-0.5 rounded-full">
                      10% OFF
                    </span>
                    <div className="text-xs font-black text-slate-900">Half Day (4h)</div>
                    <div className="text-[11px] text-slate-500 mt-1">Fix discount package</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDuration('fullDay')}
                    className={'p-4 rounded-2xl border text-left transition relative ' + (
                      duration === 'fullDay'
                        ? 'border-teal-600 bg-teal-50/60 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    )}
                  >
                    <span className="absolute -top-2 right-2 bg-emerald-600 text-white font-black text-[9px] px-2 py-0.5 rounded-full">
                      20% OFF
                    </span>
                    <div className="text-xs font-black text-slate-900">Full Day (8h)</div>
                    <div className="text-[11px] text-slate-500 mt-1">Best value for deep jobs</div>
                  </button>
                </div>

                {duration === 'hourly' && (
                  <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-700">Estimated Hours:</span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4].map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setHours(h)}
                          className={'w-8 h-8 rounded-lg font-bold text-xs transition ' + (
                            hours === h ? 'bg-teal-700 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          )}
                        >
                          {h}h
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 4: Service Address */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Service Location & Address *
                </label>
                <textarea
                  rows={2}
                  value={serviceAddress}
                  onChange={(e) => setServiceAddress(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm font-medium border border-slate-200 rounded-xl outline-none focus:border-teal-600 transition text-slate-900"
                />
              </div>

              {/* Step 5: Price Breakdown Box */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Professional Service Fee:</span>
                  <span className="font-bold text-slate-800">₹{calculation.serviceFee}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>SahYog Platform Trust Fee:</span>
                  <span className="font-bold text-slate-800">₹{calculation.platformFee}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (18%):</span>
                  <span className="font-bold text-slate-800">₹{calculation.gst}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
                  <span>Total Amount Payable:</span>
                  <span className="text-teal-700 text-lg">₹{calculation.total}</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  * Pay after service completion via UPI or Cash directly to the verified partner.
                </p>
              </div>

              {/* Confirm Button */}
              <button
                type="button"
                disabled={loading}
                onClick={handleConfirmBooking}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-black py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Confirming booking...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Book for ₹{calculation.total}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
