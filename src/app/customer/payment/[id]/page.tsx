'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Bell, Info, CheckCircle2, CreditCard, Building, 
  Banknote, ShieldCheck, ChevronRight, User, ExternalLink, 
  Smartphone, QrCode, Lock, Sparkles, Check, Loader2, ArrowUpRight
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';

interface UpiApp {
  id: string;
  name: string;
  scheme: string;
  color: string;
  textColor: string;
  badge: string;
}

const upiApps: UpiApp[] = [
  {
    id: 'gpay',
    name: 'Google Pay',
    scheme: 'tez://upi/pay',
    color: 'bg-white border border-gray-200 hover:border-blue-500',
    textColor: 'text-gray-800',
    badge: 'Popular'
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    scheme: 'phonepe://pay',
    color: 'bg-[#5f259f]/5 border border-[#5f259f]/20 hover:border-[#5f259f]',
    textColor: 'text-[#5f259f]',
    badge: 'Instant'
  },
  {
    id: 'paytm',
    name: 'Paytm UPI',
    scheme: 'paytmmp://pay',
    color: 'bg-[#002e6e]/5 border border-[#002e6e]/20 hover:border-[#002e6e]',
    textColor: 'text-[#002e6e]',
    badge: 'Fast'
  },
  {
    id: 'bhim',
    name: 'Any UPI App (BHIM / CRED)',
    scheme: 'upi://pay',
    color: 'bg-emerald-50 border border-emerald-200 hover:border-emerald-500',
    textColor: 'text-emerald-800',
    badge: 'Universal'
  }
];

export default function PaymentPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking' | 'cash'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>('gpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const amount = 1250;
  const bookingCode = 'SY-9021';
  const upiId = 'sahyogtrust@upi';
  const upiIntentUrl = `upi://pay?pa=${upiId}&pn=SahYog%20Services&mc=0000&tid=TX${Date.now().toString().slice(-6)}&tr=${bookingCode}&tn=SahYog%20Home%20Service%20Booking&am=${amount}&cu=INR`;

  const handleTriggerPayment = (schemePrefix?: string) => {
    setIsProcessing(true);

    const intentToOpen = schemePrefix 
      ? `${schemePrefix}?pa=${upiId}&pn=SahYog%20Services&mc=0000&tr=${bookingCode}&tn=SahYog%20Booking&am=${amount}&cu=INR`
      : upiIntentUrl;

    // Try to open the native UPI intent on mobile device
    try {
      window.location.href = intentToOpen;
    } catch {
      // Fallback
    }

    // Simulate payment callback confirmation
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        router.push('/customer/tracking/1');
      }, 1800);
    }, 2200);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 pb-36 text-slate-900">
      {/* Top Header */}
      <div className="bg-white/95 backdrop-blur-md p-4 flex items-center gap-3 border-b sticky top-0 z-20 shadow-xs">
        <Link href="/customer/booking/1" className="p-1 hover:bg-slate-100 rounded-full transition">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </Link>
        <div className="flex-1">
          <h1 className="font-bold text-base text-slate-900 leading-tight">Payment & Confirmation</h1>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-600" /> 256-bit Encrypted Escrow
          </p>
        </div>
        <div className="w-8 h-8 bg-emerald-100/80 rounded-full flex items-center justify-center text-emerald-800 font-bold text-xs">
          AS
        </div>
      </div>

      {/* Success Overlay */}
      {paymentSuccess && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 text-center max-w-xs w-full shadow-2xl space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black text-slate-900">Payment Successful!</h2>
            <p className="text-xs text-slate-500">
              ₹{amount}.00 received via UPI. Funds held safely in SahYog Escrow until service is completed.
            </p>
            <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-800 text-xs font-mono font-bold">
              Ref: TXN-SY-{Date.now().toString().slice(-6)}
            </div>
            <p className="text-[11px] text-slate-400">Redirecting to live job tracking...</p>
          </div>
        </div>
      )}

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 text-center max-w-xs w-full shadow-2xl space-y-3">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Connecting to UPI App...</h2>
            <p className="text-xs text-slate-500">
              Opening Google Pay / PhonePe on your device. Please approve the payment of ₹{amount}.
            </p>
          </div>
        </div>
      )}

      <div className="p-4 space-y-4">
        {/* Booking Summary Card */}
        <div className="bg-gradient-to-br from-[#042f2e] via-[#0d9488] to-[#059669] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
          
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-100 mb-2">
            <span className="uppercase tracking-wider">Booking #SY-9021</span>
            <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white">Verified Order</span>
          </div>

          <h2 className="text-xl font-black tracking-tight">Deep Cleaning Service</h2>
          <p className="text-xs text-emerald-100 mt-1">📅 Tomorrow • 10:00 AM • 📍 Sector 45, Gurgaon</p>

          <div className="mt-4 pt-3 border-t border-emerald-400/30 space-y-1.5 text-xs text-emerald-50">
            <div className="flex justify-between"><span>Base Service Fee</span><span>₹ 1,000.00</span></div>
            <div className="flex justify-between"><span>Platform Trust & Safety</span><span>₹ 70.00</span></div>
            <div className="flex justify-between"><span>Applicable GST (18%)</span><span>₹ 180.00</span></div>
            <div className="flex justify-between pt-2 border-t border-emerald-400/40 text-base font-black text-white">
              <span>Total Payable</span>
              <span className="text-amber-300">₹ 1,250.00</span>
            </div>
          </div>
        </div>

        {/* Payment Methods Selection */}
        <div>
          <h3 className="font-bold text-sm text-slate-900 mb-2 flex items-center justify-between">
            <span>Choose Payment Method</span>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Buyer Protection
            </span>
          </h3>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => setSelectedMethod('upi')}
              className={`p-3 rounded-2xl border-2 text-left transition flex flex-col justify-between ${
                selectedMethod === 'upi'
                  ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-lg">⚡</span>
                {selectedMethod === 'upi' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </div>
              <div className="mt-2">
                <p className="font-bold text-xs">UPI Apps</p>
                <p className="text-[10px] text-slate-500">Google Pay, PhonePe</p>
              </div>
            </button>

            <button
              onClick={() => setSelectedMethod('card')}
              className={`p-3 rounded-2xl border-2 text-left transition flex flex-col justify-between ${
                selectedMethod === 'card'
                  ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <CreditCard className="w-5 h-5 text-slate-700" />
                {selectedMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </div>
              <div className="mt-2">
                <p className="font-bold text-xs">Debit / Credit Card</p>
                <p className="text-[10px] text-slate-500">Visa, RuPay, Mastercard</p>
              </div>
            </button>
          </div>

          {/* UPI Apps Specific Section */}
          {selectedMethod === 'upi' && (
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>Instant Pay via Installed App</span>
                </div>
                <button
                  onClick={() => setShowQrModal(true)}
                  className="text-[11px] text-emerald-700 font-bold hover:underline flex items-center gap-1"
                >
                  <QrCode className="w-3.5 h-3.5" /> Show QR
                </button>
              </div>

              <div className="space-y-2">
                {upiApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      setSelectedUpiApp(app.id);
                      handleTriggerPayment(app.scheme);
                    }}
                    className={`w-full p-3 rounded-2xl flex items-center justify-between transition ${app.color} shadow-2xs`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center font-black text-xs text-slate-800 shadow-xs">
                        {app.id === 'gpay' ? 'GPay' : app.id === 'phonepe' ? 'Pe' : app.id === 'paytm' ? 'PTM' : 'UPI'}
                      </div>
                      <div className="text-left">
                        <p className={`font-bold text-xs ${app.textColor}`}>{app.name}</p>
                        <p className="text-[10px] text-slate-400">Tap to open app & pay</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-slate-100 font-bold px-2 py-0.5 rounded-full text-slate-600">
                        {app.badge}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-2xl text-[11px] text-amber-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <b>100% Safe Escrow:</b> Amount is transferred to the worker only after you verify the job and share the completion confirmation code.
                </span>
              </div>
            </div>
          )}

          {selectedMethod === 'card' && (
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Card Number</label>
                <input placeholder="4532 •••• •••• 8921" className="w-full border rounded-xl p-2.5 bg-slate-50 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Expiry Date</label>
                  <input placeholder="MM/YY" className="w-full border rounded-xl p-2.5 bg-slate-50 outline-none" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">CVV</label>
                  <input type="password" maxLength={3} placeholder="•••" className="w-full border rounded-xl p-2.5 bg-slate-50 outline-none" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 text-center max-w-xs w-full shadow-2xl space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Scan to Pay with Any UPI App</h3>
            <div className="p-4 bg-slate-100 rounded-2xl mx-auto w-48 h-48 flex items-center justify-center border-2 border-dashed border-emerald-400">
              <QrCode className="w-36 h-36 text-emerald-800" />
            </div>
            <p className="text-xs font-mono font-bold text-emerald-800">{upiId}</p>
            <p className="text-[11px] text-slate-500">Amount: ₹{amount}.00</p>
            <button
              onClick={() => {
                setShowQrModal(false);
                handleTriggerPayment();
              }}
              className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-700 shadow-sm"
            >
              I Have Paid
            </button>
            <button
              onClick={() => setShowQrModal(false)}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-[53px] left-0 right-0 max-w-md mx-auto p-3.5 bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-lg z-20">
        <button
          onClick={() => handleTriggerPayment()}
          className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-2xl font-black text-base shadow-md flex items-center justify-center gap-2 transition"
        >
          <span>Pay ₹1,250 via {selectedMethod === 'upi' ? 'UPI' : 'Card'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
