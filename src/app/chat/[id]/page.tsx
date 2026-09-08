'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Send, Bot, Sparkles 
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';

interface Message {
  id: string;
  sender: 'customer' | 'ai';
  senderName: string;
  text: string;
  time: string;
}

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
  // AI State
  const [aiMessages, setAiMessages] = useState<Message[]>(initialAIMessages);
  const [aiInput, setAiInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages, isAiTyping]);

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
    }, 850);
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
                SahYog AI Assistant
              </h1>
              <p className="text-[11px] text-gray-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>AI Repair Diagnostics • 24/7 Active</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xs">
              <Bot className="w-4 h-4 text-emerald-700" />
            </div>
          </div>
        </div>

        {/* Sub-banner */}
        <div className="bg-emerald-50 border-t border-emerald-100 px-4 py-2 flex items-center justify-between text-xs text-emerald-900 font-medium">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Ask anything about home services
          </span>
          <span className="text-[10px] font-bold bg-amber-400 text-emerald-950 px-2 py-0.5 rounded-full">
            Online
          </span>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 p-3.5 space-y-3 overflow-y-auto">
        <div className="text-center my-1">
          <span className="text-[11px] bg-gray-200/70 text-gray-600 px-3 py-1 rounded-full font-medium">
            🤖 SahYog Intelligent Repair AI Assistant • 24/7 Active
          </span>
        </div>
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

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompts / Quick Replies */}
      <div className="px-3 py-1.5 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {aiPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSendAI(prompt)}
              className="text-[11px] bg-white border border-amber-200 text-gray-700 hover:bg-amber-50 px-3 py-1 rounded-full whitespace-nowrap transition shadow-2xs font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-white p-2.5 border-t sticky bottom-[53px] z-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendAI();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder="Ask SahYog AI for instant repair help or cost estimate..."
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
