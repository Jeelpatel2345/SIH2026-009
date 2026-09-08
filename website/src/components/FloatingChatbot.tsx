'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Bot, X, Send, Sparkles, Minimize2, Maximize2, RefreshCw 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'customer' | 'ai';
  senderName: string;
  text: string;
  time: string;
}

const initialAIMessages: ChatMessage[] = [
  {
    id: 'ai-1',
    sender: 'ai',
    senderName: 'SahYog AI Assistant',
    text: 'Namaste! 🙏 I am your SahYog AI Assistant (सहयोग मित्र). I can help you diagnose household repair problems, calculate service charges, and assist you in English, हिन्दी, and ગુજરાતી. How can I help you today?',
    time: 'Just now'
  }
];

const aiPrompts = [
  '💧 Kitchen sink leaking repair cost',
  '⚡ AC trips MCB switch repeatedly',
  '💰 3BHK Deep Cleaning estimate',
  '🛡️ How does arrival OTP protect me?',
  '🔨 Furniture repair visit cost'
];

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // AI Chat state
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>(initialAIMessages);
  const [aiInput, setAiInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, aiMessages, isAiTyping]);

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
        reply = '🔧 Leakage Guide:\n1. First, turn the shutoff valve clockwise under the sink to stop water flow.\n2. Most sink leaks stem from worn P-trap washers or loose compression nuts.\n3. A verified plumber carries waterproof sealant and spare fittings. Estimated fix cost: ₹350 - ₹450.';
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
      } else if (lower.includes('carpenter') || lower.includes('furniture')) {
        reply = '🪚 Carpentry Services:\n- Hinge & lock repair: ₹299\n- Custom shelf fitting: ₹499\n- Modular wardrobe repair: ₹599\nAll technicians carry high-grade hardware tools.';
      }

      const aiReplyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        senderName: 'SahYog AI Assistant',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setAiMessages(prev => [...prev, aiReplyMsg]);
      setIsAiTyping(false);
    }, 850);
  };

  const handleResetChat = () => {
    setAiMessages(initialAIMessages);
  };

  return (
    <>
      {/* Floating Action Button on the side (Clean Circular Icon) */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative w-14 h-14 bg-gradient-to-tr from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white/30 flex items-center justify-center cursor-pointer"
            aria-label="Open SahYog AI Chat"
            title="Chat with SahYog AI Assistant"
          >
            <div className="relative flex items-center justify-center">
              <Bot className="w-7 h-7 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-[#042f2e]" />
            </div>
            
            {/* Tooltip on hover */}
            <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#042f2e] text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none border border-emerald-800/60 hidden sm:block">
              SahYog AI Assistant
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Window (compact & well-proportioned) */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 z-50 bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 ${
            isExpanded 
              ? 'w-[94vw] sm:w-[480px] h-[82vh] max-h-[640px]' 
              : 'w-[92vw] sm:w-[360px] h-[500px] max-h-[80vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#042f2e] to-teal-900 text-white p-3 sm:p-3.5 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-white flex-shrink-0">
                <Bot className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-sm sm:text-base text-white">
                    SahYog AI Assistant
                  </h3>
                  <span className="bg-amber-400 text-emerald-950 text-[9px] font-black px-1.5 py-0.5 rounded">
                    24/7 Live
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Instant Repair Diagnostics & Pricing
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-lg transition"
                title="Restart Chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
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

          {/* Sub-banner */}
          <div className="bg-emerald-50 border-b border-emerald-100/80 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-emerald-900 font-medium">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Automated Home Services Support
            </span>
            <span className="text-emerald-700 font-bold">English • हिन्दी • ગુજરાતી</span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3.5 space-y-3 overflow-y-auto bg-slate-50">
            {aiMessages.map((msg) => {
              const isUser = msg.sender === 'customer';
              return (
                <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-slate-400 mb-0.5 px-1 font-medium">
                    {msg.senderName}
                  </span>
                  <div
                    className={`max-w-[86%] rounded-2xl p-3 shadow-xs text-xs sm:text-sm ${
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
                <span>SahYog AI is analyzing solutions...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick reply prompt chips */}
          <div className="px-3 py-1.5 bg-white border-t border-slate-100">
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {aiPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendAI(prompt)}
                  className="text-[10.5px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition font-medium border border-slate-200/60"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom input form */}
          <div className="p-2.5 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendAI();
              }}
              className="flex items-center gap-1.5"
            >
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask SahYog AI (e.g., sink leak, AC tripping, cleaning)..."
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
    </>
  );
}

