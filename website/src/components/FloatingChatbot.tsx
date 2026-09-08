'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Bot, User, MessageSquare, X, Send, Sparkles, MapPin, 
  Phone, Video, Shield, CheckCheck, SwitchCamera, Minimize2, Maximize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'customer' | 'worker' | 'ai';
  senderName: string;
  text: string;
  time: string;
  isLocation?: boolean;
  locationLabel?: string;
}

const initialP2PMessages: ChatMessage[] = [
  { 
    id: '1', 
    sender: 'worker', 
    senderName: 'Rajesh Kumar (Plumber)', 
    text: 'नमस्ते! I am on the way to your location for the plumbing repair.', 
    time: '10:00 AM' 
  },
  { 
    id: '2', 
    sender: 'customer', 
    senderName: 'Customer', 
    text: 'Thank you! Are you carrying spare valves and CPVC sealant?', 
    time: '10:02 AM' 
  },
  { 
    id: '3', 
    sender: 'worker', 
    senderName: 'Rajesh Kumar (Plumber)', 
    text: 'Yes, full toolkit and replacement pipe fittings are with me. Reaching in ~10 mins.', 
    time: '10:05 AM' 
  },
  { 
    id: '4', 
    sender: 'customer', 
    senderName: 'Customer', 
    text: 'Great, sharing the building gate location.', 
    time: '10:06 AM',
    isLocation: true,
    locationLabel: 'Gate #2, Shanti Heights, Sector 12'
  }
];

const initialAIMessages: ChatMessage[] = [
  {
    id: 'ai-1',
    sender: 'ai',
    senderName: 'SahYog AI Sahayak',
    text: 'Namaste! 🙏 I am your SahYog AI Assistant (सहयोग मित्र). I can help diagnose home repair problems, estimate service costs, or answer queries in English, हिन्दी, and ગુજરાતી. How can I help you today?',
    time: 'Just now'
  }
];

const aiPrompts = [
  '💧 Kitchen sink leaking repair cost',
  '⚡ AC trips MCB switch repeatedly',
  '💰 3BHK Deep Cleaning estimate',
  '🛡️ How does arrival OTP protect me?'
];

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'p2p'>('ai');
  const [isExpanded, setIsExpanded] = useState(false);

  // AI Chat state
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>(initialAIMessages);
  const [aiInput, setAiInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Worker & Customer (P2P) state
  const [p2pMessages, setP2pMessages] = useState<ChatMessage[]>(initialP2PMessages);
  const [activeSender, setActiveSender] = useState<'customer' | 'worker'>('customer');
  const [p2pInput, setP2pInput] = useState('');

  // Call simulation modal
  const [callModal, setCallModal] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, activeTab, aiMessages, p2pMessages, isAiTyping]);

  // Handle AI send
  const handleSendAI = (promptText?: string) => {
    const query = promptText || aiInput;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'customer',
      senderName: 'You',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiMessages(prev => [...prev, userMsg]);
    if (!promptText) setAiInput('');
    setIsAiTyping(true);

    setTimeout(() => {
      let reply = 'I understand your query! For verified service in your area, our standard rate is transparent and covered by the SahYog Protection Guarantee.';
      const lower = query.toLowerCase();

      if (lower.includes('sink') || lower.includes('leak') || lower.includes('water')) {
        reply = '🔧 Leakage Guide:\n1. First, turn the shutoff valve clockwise under the sink to stop water flow.\n2. Most sink leaks stem from worn P-trap washers or loose compression nuts.\n3. Rajesh Kumar (assigned plumber) is carrying waterproof sealant and spare fittings. Estimated fix cost: ₹350 - ₹450.';
      } else if (lower.includes('mcb') || lower.includes('ac') || lower.includes('tripping') || lower.includes('electric')) {
        reply = '⚡ Safety Alert:\n1. Avoid repeatedly turning the MCB on if it immediately trips—it indicates an overload or short circuit.\n2. Turn off the AC indoor unit from the remote first.\n3. A certified electrician can measure compressor amp draw and examine the wiring. Platform visit charge is ₹350 flat.';
      } else if (lower.includes('cost') || lower.includes('rate') || lower.includes('clean') || lower.includes('price')) {
        reply = '💰 Pricing Transparency:\n- Deep Home Cleaning (3BHK): ₹1,800 - ₹2,400\n- Single Room / Kitchen Deep Clean: ₹699 - ₹899\n- Plumbing/Electrical labor: ₹350/hr flat rate\nAll rates are GST inclusive with zero hidden visit charges!';
      } else if (lower.includes('otp') || lower.includes('safe') || lower.includes('safety')) {
        reply = '🛡️ SahYog Safety Protocol:\nNever share your 4-digit arrival OTP until the verified worker is physically in front of your doorstep. The OTP unlocks the escrow payment release and records the exact start time of the job.';
      } else if (lower.includes('ગુજરાતી') || lower.includes('gujarati')) {
        reply = '🙏 નમસ્તે! સહયોગ પ્લેટફોર્મ પર તમારું સ્વાગત છે. તમારા ઘરના સમારકામ કે પ્લમ્બિંગ માટે અમે 100% વેરિફાઇડ કારીગરો ઉપલબ્ધ કરાવીએ છીએ. તમને કઈ સેવાની જરૂર છે?';
      } else if (lower.includes('hindi') || lower.includes('हिन्दी')) {
        reply = '🙏 नमस्ते! सहयोग प्लेटफॉर्म आपकी सेवा में तैयार है। आप किसी भी घरेलू समस्या के लिए सीधे हमारे वेरिफाइड कारीगरों से संपर्क कर सकते हैं।';
      }

      const aiReplyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        senderName: 'SahYog AI Sahayak',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setAiMessages(prev => [...prev, aiReplyMsg]);
      setIsAiTyping(false);
    }, 900);
  };

  // Handle P2P send
  const handleSendP2P = (overrideText?: string, isLoc?: boolean) => {
    const textToSend = overrideText || p2pInput;
    if (!textToSend.trim() && !isLoc) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: activeSender,
      senderName: activeSender === 'customer' ? 'You (Customer)' : 'Rajesh Kumar (Worker)',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isLocation: isLoc,
      locationLabel: isLoc ? 'Gate #2, Shanti Heights, Sector 12' : undefined
    };

    setP2pMessages(prev => [...prev, newMsg]);
    if (!overrideText) setP2pInput('');
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20"
            aria-label="Open SahYog Support & Chat"
          >
            <div className="relative">
              <Bot className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
            </div>
            <div className="text-left hidden sm:block pr-1">
              <p className="text-xs font-black uppercase tracking-wider text-amber-300 leading-tight">SahYog AI</p>
              <p className="text-[13px] font-bold text-white leading-tight">Need Help? Chat Now</p>
            </div>
            <span className="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              Live
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 z-50 bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300 ${
            isExpanded 
              ? 'w-[92vw] sm:w-[540px] h-[85vh] max-h-[700px]' 
              : 'w-[92vw] sm:w-[400px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#042f2e] to-teal-900 text-white p-3.5 sm:p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-white">
                {activeTab === 'ai' ? <Bot className="w-5 h-5 text-amber-300" /> : <User className="w-5 h-5 text-emerald-300" />}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-sm sm:text-base text-white">
                    {activeTab === 'ai' ? 'SahYog AI Sahayak' : 'Rajesh Kumar'}
                  </h3>
                  <span className="bg-amber-400 text-emerald-950 text-[9px] font-black px-1.5 py-0.5 rounded">
                    {activeTab === 'ai' ? '24/7 AI' : 'Job #SY-9021'}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  {activeTab === 'ai' ? 'Instant Repair & Cost Diagnostics' : 'Plumber • Online & Active'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {activeTab === 'p2p' && (
                <>
                  <button
                    onClick={() => setCallModal('Voice')}
                    className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-lg transition"
                    title="Audio Call"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCallModal('Video')}
                    className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-lg transition"
                    title="Video Call"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                </>
              )}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-lg transition hidden sm:block"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-lg transition"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dual Mode Switcher: Tab 1 = SahYog AI Assistant, Tab 2 = Worker & Customer Chat */}
          <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('ai')}
              className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition ${
                activeTab === 'ai'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-amber-500" />
              <span>SahYog AI Assistant</span>
            </button>
            <button
              onClick={() => setActiveTab('p2p')}
              className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition ${
                activeTab === 'p2p'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-teal-600" />
              <span>Worker & Customer Chat</span>
            </button>
          </div>

          {/* Role switcher banner in P2P mode */}
          {activeTab === 'p2p' && (
            <div className="bg-teal-50/90 border-b border-teal-100 px-3.5 py-1.5 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-teal-900 font-medium">
                <SwitchCamera className="w-3.5 h-3.5 text-teal-600" />
                <span>Active role: <b>{activeSender === 'customer' ? 'Customer' : 'Worker (Rajesh)'}</b></span>
              </div>
              <button
                onClick={() => setActiveSender(activeSender === 'customer' ? 'worker' : 'customer')}
                className="bg-white border border-teal-200 text-teal-800 font-bold px-2 py-0.5 rounded-full hover:bg-teal-100 transition text-[10px] shadow-2xs"
              >
                Switch Role
              </button>
            </div>
          )}

          {/* Chat Messages Body */}
          <div className="flex-1 p-3.5 space-y-3 overflow-y-auto bg-slate-50">
            <div className="text-center my-0.5">
              <span className="text-[10px] bg-slate-200/80 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">
                {activeTab === 'ai' ? '🤖 SahYog Automated Repair Support • Multi-Language' : '🔒 Direct Encrypted Channel • Job #SY-9021'}
              </span>
            </div>

            {activeTab === 'ai' ? (
              <>
                {aiMessages.map((msg) => {
                  const isUser = msg.sender === 'customer';
                  return (
                    <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                      <span className="text-[10px] text-slate-400 mb-0.5 px-1 font-medium">
                        {msg.senderName}
                      </span>
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 shadow-xs text-xs sm:text-sm ${
                          isUser
                            ? 'bg-emerald-700 text-white rounded-br-xs'
                            : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                        }`}
                      >
                        {!isUser && (
                          <div className="flex items-center gap-1.5 mb-1 pb-1 border-b border-slate-100 text-emerald-800 text-[11px] font-bold">
                            <Bot className="w-3.5 h-3.5 text-amber-500" />
                            <span>SahYog AI Guidance</span>
                          </div>
                        )}
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isUser ? 'text-emerald-200' : 'text-slate-400'}`}>
                          <span>{msg.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isAiTyping && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 p-2 bg-white rounded-2xl w-fit border border-slate-200">
                    <Bot className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                    <span>SahYog AI is typing advice...</span>
                  </div>
                )}
              </>
            ) : (
              <>
                {p2pMessages.map((msg) => {
                  const isMe = msg.sender === activeSender;
                  return (
                    <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <span className="text-[10px] text-slate-400 mb-0.5 px-1 font-medium">
                        {msg.senderName}
                      </span>
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 shadow-xs text-xs sm:text-sm ${
                          isMe
                            ? 'bg-teal-700 text-white rounded-br-xs'
                            : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                        }`}
                      >
                        {msg.isLocation && (
                          <div className="bg-teal-800/80 text-white rounded-xl p-2 mb-1.5 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-amber-300 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-bold">Shared Location</p>
                              <p className="text-[10px] text-teal-100">{msg.locationLabel}</p>
                            </div>
                          </div>
                        )}
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isMe ? 'text-teal-200' : 'text-slate-400'}`}>
                          <span>{msg.time}</span>
                          {isMe && <CheckCheck className="w-3 h-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick reply prompt chips */}
          <div className="px-3 py-1.5 bg-white border-t border-slate-100">
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {activeTab === 'ai' ? (
                <>
                  {aiPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSendAI(prompt)}
                      className="text-[10.5px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition font-medium border border-slate-200/60"
                    >
                      {prompt}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  {[
                    'Where have you reached?',
                    'I am at the main gate',
                    'Parts are ready',
                    'Elevator is working'
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleSendP2P(chip)}
                      className="text-[10.5px] bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition font-medium border border-slate-200/60"
                    >
                      {chip}
                    </button>
                  ))}
                  <button
                    onClick={() => handleSendP2P('Sharing building entrance location', true)}
                    className="text-[10.5px] bg-teal-50 border border-teal-300 text-teal-800 px-2.5 py-1 rounded-full whitespace-nowrap transition font-bold flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-teal-600" /> Share Gate Pin
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Bottom input form */}
          <div className="p-2.5 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (activeTab === 'ai') handleSendAI();
                else handleSendP2P();
              }}
              className="flex items-center gap-1.5"
            >
              {activeTab === 'p2p' && (
                <button
                  type="button"
                  onClick={() => handleSendP2P('Shared doorstep pin', true)}
                  className="p-2 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition"
                  title="Share Location"
                >
                  <MapPin className="w-4 h-4" />
                </button>
              )}

              <input
                type="text"
                value={activeTab === 'ai' ? aiInput : p2pInput}
                onChange={(e) => activeTab === 'ai' ? setAiInput(e.target.value) : setP2pInput(e.target.value)}
                placeholder={
                  activeTab === 'ai'
                    ? 'Ask SahYog AI (e.g., sink leak, AC trip)...'
                    : `Chat as ${activeSender === 'customer' ? 'Customer' : 'Worker'}...`
                }
                className="flex-1 bg-slate-100 rounded-xl px-3 py-2 text-xs sm:text-sm outline-none focus:bg-white focus:ring-1 focus:ring-emerald-600 transition"
              />

              <button
                type="submit"
                className="w-9 h-9 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl flex items-center justify-center transition shadow-sm flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Simulated Call Modal */}
      {callModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 text-center max-w-xs w-full shadow-2xl animate-fade-in">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              {callModal === 'Voice' ? <Phone className="w-7 h-7 text-emerald-700 animate-pulse" /> : <Video className="w-7 h-7 text-emerald-700 animate-pulse" />}
            </div>
            <h3 className="font-bold text-base text-slate-900">Connecting {callModal} Call...</h3>
            <p className="text-xs text-slate-500 mt-1">Dialing Rajesh Kumar (+91 91234 56789) via SahYog Encrypted Bridge.</p>
            <div className="mt-5">
              <button
                onClick={() => setCallModal(null)}
                className="w-full py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
