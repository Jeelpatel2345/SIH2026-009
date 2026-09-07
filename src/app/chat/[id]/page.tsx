'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Phone, Video, Paperclip, Smile, Send, MapPin, 
  Bot, User, Sparkles, CheckCheck, Shield, ChevronRight, 
  SwitchCamera, AlertCircle, RefreshCw, X, Image as ImageIcon
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';

interface Message {
  id: string;
  sender: 'customer' | 'worker' | 'ai';
  senderName: string;
  text: string;
  time: string;
  isLocation?: boolean;
  locationLabel?: string;
  isImage?: boolean;
}

const initialP2PMessages: Message[] = [
  { 
    id: '1', 
    sender: 'worker', 
    senderName: 'Rajesh Kumar (Worker)', 
    text: 'नमस्ते! I\'m on my way to your location for the plumbing repair.', 
    time: '10:00 AM' 
  },
  { 
    id: '2', 
    sender: 'customer', 
    senderName: 'Anjali Sharma (Customer)', 
    text: 'Thank you, Rajesh. Are you bringing the spare parts and sealant we discussed?', 
    time: '10:02 AM' 
  },
  { 
    id: '3', 
    sender: 'worker', 
    senderName: 'Rajesh Kumar (Worker)', 
    text: 'Yes! I have the 0.5-inch CPVC pipe joint and waterproof silicone sealant.', 
    time: '10:05 AM' 
  },
  { 
    id: '4', 
    sender: 'customer', 
    senderName: 'Anjali Sharma (Customer)', 
    text: 'Great. I am sharing my exact tower gate location for easy parking.', 
    time: '10:06 AM',
    isLocation: true,
    locationLabel: 'Tower B, Shanti Heights, Gate #2'
  },
  { 
    id: '5', 
    sender: 'worker', 
    senderName: 'Rajesh Kumar (Worker)', 
    text: 'Received the location. Estimated arrival time: 10 mins.', 
    time: '10:08 AM' 
  }
];

const initialAIMessages: Message[] = [
  {
    id: 'ai-1',
    sender: 'ai',
    senderName: 'SahYog AI Assistant',
    text: 'Namaste! 🙏 I am your SahYog AI Assistant (सहयोग मित्र). I can help you diagnose household repair issues, estimate service pricing in your city, or assist in English, हिन्दी, and ગુજરાતી. How can I help you today?',
    time: 'Just now'
  }
];

const aiPrompts = [
  '💧 Water leaking under kitchen sink',
  '⚡ MCB tripping after turning on AC',
  '💰 Estimated cost for 3BHK deep cleaning',
  '🛡️ How does the SahYog safety OTP work?'
];

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<'p2p' | 'ai'>('p2p');
  
  // P2P State
  const [p2pMessages, setP2pMessages] = useState<Message[]>(initialP2PMessages);
  const [activeSender, setActiveSender] = useState<'customer' | 'worker'>('customer');
  const [p2pInput, setP2pInput] = useState('');

  // AI State
  const [aiMessages, setAiMessages] = useState<Message[]>(initialAIMessages);
  const [aiInput, setAiInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Call modal state
  const [callingModal, setCallingModal] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [p2pMessages, aiMessages, isAiTyping, activeTab]);

  // Send P2P message
  const handleSendP2P = (overrideText?: string, isLoc?: boolean) => {
    const textToSend = overrideText || p2pInput;
    if (!textToSend.trim() && !isLoc) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: activeSender,
      senderName: activeSender === 'customer' ? 'Anjali Sharma (Customer)' : 'Rajesh Kumar (Worker)',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isLocation: isLoc,
      locationLabel: isLoc ? 'Gate #2, Shanti Heights, Sector 12' : undefined
    };

    setP2pMessages(prev => [...prev, newMsg]);
    if (!overrideText) setP2pInput('');
  };

  // Send AI message
  const handleSendAI = (promptText?: string) => {
    const query = promptText || aiInput;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'customer',
      senderName: 'You',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiMessages(prev => [...prev, userMsg]);
    if (!promptText) setAiInput('');
    setIsAiTyping(true);

    // Generate intelligent contextual response
    setTimeout(() => {
      let reply = 'I understand your query! For verified service in your area, our standard rate is transparent and covered by the SahYog Protection Guarantee.';
      const lower = query.toLowerCase();

      if (lower.includes('sink') || lower.includes('leak') || lower.includes('water')) {
        reply = '🔧 Leakage Guide:\n1. First, turn the shutoff valve clockwise under the sink to stop water flow.\n2. Most sink leaks stem from worn P-trap washers or loose compression nuts.\n3. Rajesh Kumar (your assigned plumber) is carrying waterproof sealant and spare fittings to fix this in ~30 mins. Estimated fix cost: ₹350 - ₹450.';
      } else if (lower.includes('mcb') || lower.includes('ac') || lower.includes('tripping') || lower.includes('electric')) {
        reply = '⚡ Safety Alert:\n1. Avoid repeatedly turning the MCB on if it immediately trips—it indicates an overload or short circuit.\n2. Turn off the AC indoor unit from the remote first.\n3. A certified electrician like Rajesh Kumar can measure compressor amp draw and examine the wiring. Platform visit charge is ₹350.';
      } else if (lower.includes('cost') || lower.includes('rate') || lower.includes('clean') || lower.includes('price')) {
        reply = '💰 Pricing Transparency:\n- Deep Home Cleaning (3BHK): ₹1,800 - ₹2,400\n- Single Room / Kitchen Deep Clean: ₹699 - ₹899\n- Plumbing/Electrical labor: ₹350/hr flat rate\nAll rates are GST inclusive with zero hidden visit charges!';
      } else if (lower.includes('otp') || lower.includes('safe') || lower.includes('safety')) {
        reply = '🛡️ SahYog Safety Protocol:\nNever share your 4-digit arrival OTP until the verified worker is physically in front of your doorstep. The OTP unlocks the escrow payment release and records the exact start time of the job.';
      } else if (lower.includes('ગુજરાતી') || lower.includes('gujarati')) {
        reply = '🙏 નમસ્તે! સહયોગ પ્લેટફોર્મ પર તમારું સ્વાગત છે. તમારા ઘરના સમારકામ કે પ્લમ્બિંગ માટે અમે 100% વેરિફાઇડ કારીગરો ઉપલબ્ધ કરાવીએ છીએ. તમને કઈ સેવાની જરૂર છે?';
      } else if (lower.includes('hindi') || lower.includes('हिन्दी')) {
        reply = '🙏 नमस्ते! सहयोग प्लेटफॉर्म आपकी सेवा में तैयार है। आप किसी भी घरेलू समस्या के लिए सीधे हमारे वेरिफाइड कारीगरों से संपर्क कर सकते हैं।';
      }

      const aiReplyMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        senderName: 'SahYog AI Assistant',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setAiMessages(prev => [...prev, aiReplyMsg]);
      setIsAiTyping(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Top App Bar */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link href="/customer/dashboard" className="p-1 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div>
              <h1 className="font-bold text-base text-gray-900 leading-tight">
                {activeTab === 'p2p' ? 'Rajesh Kumar' : 'SahYog AI Sahayak'}
              </h1>
              <p className="text-[11px] text-gray-500 flex items-center gap-1">
                {activeTab === 'p2p' ? (
                  <>
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span>Plumbing Job #SY-9021 • Online</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>AI Repair Diagnostics • 24/7 Active</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {activeTab === 'p2p' && (
              <>
                <button 
                  onClick={() => setCallingModal('Audio')}
                  className="p-2 text-teal-700 hover:bg-teal-50 rounded-full transition"
                  title="Voice Call"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setCallingModal('Video')}
                  className="p-2 text-teal-700 hover:bg-teal-50 rounded-full transition"
                  title="Video Call"
                >
                  <Video className="w-4 h-4" />
                </button>
              </>
            )}
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs">
              {activeTab === 'p2p' ? 'RK' : 'AI'}
            </div>
          </div>
        </div>

        {/* Tab Switcher: 2-Person Chat vs AI Assistant */}
        <div className="grid grid-cols-2 p-1.5 bg-gray-100 mx-3 mb-2 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('p2p')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
              activeTab === 'p2p' 
                ? 'bg-white text-teal-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Worker & Customer Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
              activeTab === 'ai' 
                ? 'bg-white text-teal-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-amber-500" />
            <span>SahYog AI Assistant</span>
          </button>
        </div>

        {/* Role Switcher in P2P mode so user can test chatting as both parties */}
        {activeTab === 'p2p' && (
          <div className="bg-teal-50/90 border-t border-teal-100 px-3.5 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-teal-800">
              <SwitchCamera className="w-3.5 h-3.5 text-teal-600" />
              <span>You are currently typing as: <b>{activeSender === 'customer' ? 'Customer (Anjali)' : 'Worker (Rajesh)'}</b></span>
            </div>
            <button
              onClick={() => setActiveSender(activeSender === 'customer' ? 'worker' : 'customer')}
              className="bg-white border border-teal-300 text-teal-700 font-semibold px-2.5 py-0.5 rounded-full hover:bg-teal-100 transition shadow-xs text-[11px]"
            >
              Switch Role
            </button>
          </div>
        )}
      </div>

      {/* Simulated Call Modal */}
      {callingModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 text-center max-w-xs w-full shadow-2xl animate-fade-in">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
              {callingModal === 'Audio' ? <Phone className="w-8 h-8 text-teal-600 animate-pulse" /> : <Video className="w-8 h-8 text-teal-600 animate-pulse" />}
            </div>
            <h3 className="font-bold text-lg text-gray-900">Connecting {callingModal} Call...</h3>
            <p className="text-xs text-gray-500 mt-1">Dialing Rajesh Kumar (+91 91234 56789) via SahYog Encrypted Bridge.</p>
            <div className="mt-6">
              <button
                onClick={() => setCallingModal(null)}
                className="w-full py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages Container */}
      <div className="flex-1 p-3.5 space-y-3 overflow-y-auto">
        <div className="text-center my-1">
          <span className="text-[11px] bg-gray-200/70 text-gray-600 px-3 py-1 rounded-full font-medium">
            {activeTab === 'p2p' ? 'Direct Encrypted Channel • Job #SY-9021' : 'SahYog Intelligent Repair AI Assistant'}
          </span>
        </div>

        {activeTab === 'p2p' ? (
          <>
            {p2pMessages.map((msg) => {
              const isMe = msg.sender === activeSender;
              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-gray-400 mb-0.5 px-1 font-medium">
                    {msg.senderName}
                  </span>
                  <div
                    className={`max-w-[82%] rounded-2xl p-3 shadow-xs text-sm ${
                      isMe
                        ? 'bg-teal-600 text-white rounded-br-xs'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-xs'
                    }`}
                  >
                    {msg.isLocation ? (
                      <div className="bg-teal-700/80 rounded-xl p-2.5 mb-1.5 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-white flex-shrink-0" />
                        <div>
                          <p className="text-white text-xs font-bold">Shared Location</p>
                          <p className="text-teal-100 text-[11px]">{msg.locationLabel}</p>
                        </div>
                      </div>
                    ) : null}

                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isMe ? 'text-teal-100' : 'text-gray-400'}`}>
                      <span>{msg.time}</span>
                      {isMe && <CheckCheck className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {aiMessages.map((msg) => {
              const isUser = msg.sender === 'customer';
              return (
                <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-gray-400 mb-0.5 px-1 font-medium">
                    {msg.senderName}
                  </span>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs text-sm ${
                      isUser
                        ? 'bg-teal-600 text-white rounded-br-xs'
                        : 'bg-white text-gray-800 border border-gray-200/80 rounded-bl-xs'
                    }`}
                  >
                    {!isUser && (
                      <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-gray-100 text-teal-700 text-xs font-bold">
                        <Bot className="w-3.5 h-3.5 text-amber-500" />
                        <span>SahYog AI Guidance</span>
                      </div>
                    )}
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isUser ? 'text-teal-100' : 'text-gray-400'}`}>
                      <span>{msg.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {isAiTyping && (
              <div className="flex items-center gap-2 text-xs text-gray-500 p-2 bg-white rounded-2xl w-fit border border-gray-100">
                <Bot className="w-3.5 h-3.5 text-teal-600 animate-spin" />
                <span>SahYog AI is analyzing solutions...</span>
              </div>
            )}
          </>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompts / Quick Replies */}
      <div className="px-3 py-1.5 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {activeTab === 'p2p' ? (
            <>
              {[
                'नमस्ते! Where have you reached?',
                'I am at the building gate',
                'Parts are ready with me',
                'Please take the elevator to 4th floor'
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSendP2P(chip)}
                  className="text-[11px] bg-white border border-gray-200 hover:border-teal-500 text-gray-700 px-3 py-1 rounded-full whitespace-nowrap transition shadow-2xs font-medium"
                >
                  {chip}
                </button>
              ))}
              <button
                onClick={() => handleSendP2P('Sharing my building entrance location', true)}
                className="text-[11px] bg-teal-50 border border-teal-300 text-teal-800 px-3 py-1 rounded-full whitespace-nowrap transition font-semibold flex items-center gap-1"
              >
                <MapPin className="w-3 h-3 text-teal-600" /> Share Gate Location
              </button>
            </>
          ) : (
            <>
              {aiPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendAI(prompt)}
                  className="text-[11px] bg-white border border-amber-200 text-gray-700 hover:bg-amber-50 px-3 py-1 rounded-full whitespace-nowrap transition shadow-2xs font-medium"
                >
                  {prompt}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-white p-2.5 border-t sticky bottom-[53px] z-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (activeTab === 'p2p') handleSendP2P();
            else handleSendAI();
          }}
          className="flex items-center gap-2"
        >
          {activeTab === 'p2p' && (
            <button
              type="button"
              onClick={() => handleSendP2P('Sharing building location card', true)}
              className="p-2 text-gray-500 hover:text-teal-600 hover:bg-gray-100 rounded-full transition"
              title="Share Location"
            >
              <MapPin className="w-4 h-4" />
            </button>
          )}

          <input
            type="text"
            value={activeTab === 'p2p' ? p2pInput : aiInput}
            onChange={(e) => activeTab === 'p2p' ? setP2pInput(e.target.value) : setAiInput(e.target.value)}
            placeholder={
              activeTab === 'p2p'
                ? `Type as ${activeSender === 'customer' ? 'Customer' : 'Worker'} (English, हिन्दी, ગુજરાતી)...`
                : 'Ask SahYog AI for instant repair help or cost estimate...'
            }
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-teal-600 transition"
          />

          <button
            type="submit"
            className="w-9 h-9 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition shadow-sm flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
}
