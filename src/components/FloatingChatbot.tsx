'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bot, X, Send, Sparkles, Minimize2, Maximize2, RefreshCw, ArrowRight 
} from 'lucide-react';
import { diagnoseUserQuery } from '@/lib/aiDiagnosticEngine';

interface ChatMessage {
  id: string;
  sender: 'customer' | 'ai';
  senderName: string;
  text: string;
  time: string;
  recommendedWorker?: string | null;
  actionText?: string;
  actionHref?: string;
}

const initialAIMessages: ChatMessage[] = [
  {
    id: 'ai-1',
    sender: 'ai',
    senderName: 'SahYog AI Assistant',
    text: 'Namaste! 🙏 I am your SahYog AI Assistant (सहयोग मित्र).\n\nAsk me **ANY manual question** about home repair issues (e.g. *"my sink is leaking"*, *"fan is sparking"*, *"what type of worker should I book?"*), pricing, or 4-digit arrival OTP protection. How can I help you today?',
    time: 'Just now',
    actionText: 'What type of worker should I book? →',
    actionHref: '/services'
  }
];

const defaultPrompts = [
  '💧 What worker to book for water leakage?',
  '⚡ AC trips MCB repeatedly',
  '💰 3BHK Deep Cleaning estimate',
  '🛡️ How does arrival OTP protect me?',
  '🪚 Door lock is jammed repair cost'
];

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // AI Chat state
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>(initialAIMessages);
  const [aiInput, setAiInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [activePrompts, setActivePrompts] = useState<string[]>(defaultPrompts);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, aiMessages, isAiTyping]);

  // Handle AI send with full diagnostic intelligence
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

    // Run query through our advanced multi-language diagnosis engine
    setTimeout(() => {
      const diagnosis = diagnoseUserQuery(query);

      const aiReplyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        senderName: 'SahYog AI Assistant',
        text: diagnosis.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedWorker: diagnosis.recommendedWorker,
        actionText: diagnosis.actionText,
        actionHref: diagnosis.actionHref
      };

      setAiMessages(prev => [...prev, aiReplyMsg]);
      if (diagnosis.quickFollowUps && diagnosis.quickFollowUps.length > 0) {
        setActivePrompts(diagnosis.quickFollowUps);
      }
      setIsAiTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setAiMessages(initialAIMessages);
    setActivePrompts(defaultPrompts);
  };

  // Helper to render bold markdown (**bold**) cleanly
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      // Split line by ** to toggle bold
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={idx} className="block min-h-[1.1rem]">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return <em key={pIdx} className="italic text-slate-600">{part.slice(1, -1)}</em>;
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Action Button on the side (Clean Circular Icon) */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative w-13 h-13 sm:w-14 sm:h-14 bg-gradient-to-tr from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white/30 flex items-center justify-center cursor-pointer"
            aria-label="Open SahYog AI Chat"
            title="Chat with SahYog AI Assistant"
          >
            <div className="relative flex items-center justify-center">
              <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-[#042f2e]" />
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
          className={`fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-50 bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 ${
            isExpanded 
              ? 'w-[94vw] sm:w-[500px] h-[80vh] max-h-[680px]' 
              : 'w-[92vw] sm:w-[380px] h-[520px] max-h-[75vh]'
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
                  Free-Form Diagnostics & Worker Recommendations
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
              <Sparkles className="w-3 h-3 text-amber-500" /> Ask any household issue or question
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
                    className={`max-w-[88%] rounded-2xl p-3 shadow-xs text-xs sm:text-sm ${
                      isUser
                        ? 'bg-emerald-700 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                    }`}
                  >
                    {!isUser && (
                      <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-slate-100 text-emerald-800 text-[11px] font-bold">
                        <Bot className="w-3.5 h-3.5 text-amber-500" />
                        <span>SahYog AI Guidance</span>
                      </div>
                    )}
                    
                    <div className="leading-relaxed">
                      {renderFormattedText(msg.text)}
                    </div>

                    {/* Action Button inside Chat Bubble */}
                    {msg.actionText && msg.actionHref && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100">
                        {msg.actionHref.startsWith('tel:') ? (
                          <a
                            href={msg.actionHref}
                            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition transform hover:scale-[1.02] active:scale-95"
                          >
                            <span>{msg.actionText}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <Link
                            href={msg.actionHref}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition transform hover:scale-[1.02] active:scale-95"
                          >
                            <span>{msg.actionText}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    )}

                    <div className={`flex items-center justify-end gap-1 mt-1.5 text-[10px] ${isUser ? 'text-emerald-200' : 'text-slate-400'}`}>
                      <span>{msg.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {isAiTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-500 p-2.5 bg-white rounded-2xl w-fit border border-slate-200 shadow-xs">
                <Bot className="w-4 h-4 text-emerald-600 animate-spin" />
                <span className="font-medium">SahYog AI is diagnosing solution...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick reply prompt chips */}
          <div className="px-3 py-1.5 bg-white border-t border-slate-100">
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {activePrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendAI(prompt)}
                  className="text-[10.5px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition font-medium border border-slate-200/60 cursor-pointer"
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
                placeholder="Ask any issue (e.g. 'leak in sink', 'fan spark', 'what worker to book?')..."
                className="flex-1 bg-slate-100 rounded-xl px-3 py-2 text-xs sm:text-sm outline-none focus:bg-white focus:ring-1 focus:ring-emerald-600 transition"
              />

              <button
                type="submit"
                className="w-9 h-9 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl flex items-center justify-center transition shadow-sm flex-shrink-0 cursor-pointer"
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
