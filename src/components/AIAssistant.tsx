/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, X, ArrowDownCircle, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { PROPERTIES, EQUIPMENTS, MATERIALS } from '../data';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

interface AIAssistantProps {
  onClose: () => void;
}

export function AIAssistant({ onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Welcome to Nova Construction AI Advisory. I am your specialized civil engineer and commercial mortgage advisor. I have real-time access to our machinery catalog, structural materials, land registers, and financing terms.\n\nAsk me about material volume estimations, excavation machinery needs, or monthly loan calculations!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto Scroll Chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Prompt suggestions shortcuts
  const suggestions = [
    "Recommend equipment for deep soil foundations",
    "Estimate portland cement bags for a 1500 sqft slab",
    "Monthly payment for a $2M land acquisition loan",
    "Find commercial properties for lease over 20k sqft"
  ];

  const handleSendMessage = async (userPrompt: string) => {
    if (!userPrompt.trim() || isLoading) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: userPrompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setErrorText('');

    try {
      // Package catalog as reference context so that Gemini knows our properties, material prices and machinery specs
      const catalogContext = {
        properties: PROPERTIES.map(p => ({ title: p.title, type: p.type, price: p.price, location: p.location, size: p.size })),
        equipment: EQUIPMENTS.map(e => ({ name: e.name, price: e.price, category: e.category, specs: e.specs })),
        materials: MATERIALS.map(m => ({ name: m.name, price: m.price, unit: m.unit, category: m.category }))
      };

      // Mapped conversation for Gemini
      // Combine state
      const chatHistory = [...messages, userMsg].map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatHistory,
          context: catalogContext
        })
      });

      if (!response.ok) {
        throw new Error('Our AI advisory channel is highly congested. Please try again.');
      }

      const data = await response.json();
      
      const aiMsg: Message = {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        text: data.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || 'Network delay. Please resend your engineering consult.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col w-[360px] sm:w-[420px] h-[550px] sm:h-[600px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black overflow-hidden animate-in fade-in slide-in-from-bottom duration-300">
      
      {/* Assistant Header */}
      <div className="flex justify-between items-center px-5 py-4 border-b border-zinc-800 bg-zinc-90 w-full bg-zinc-900/40">
        <div className="flex items-center gap-2.5">
          <div className="bg-amber-500 text-zinc-950 p-2 rounded-lg relative">
            <Bot size={18} className="stroke-[2.5]" />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
          </div>
          <div className="text-left">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Nova AI Consultant</h3>
            <p className="text-[10px] text-zinc-500 font-light flex items-center gap-1 mt-0.5">
              <Sparkles size={10} className="text-amber-500 animate-pulse" />
              <span>Grounded on Site Catalogs</span>
            </p>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-805 transition cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* Message History Scroller */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950 text-left">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
            <div className={`p-2 rounded-lg shrink-0 flex items-center justify-center h-8 w-8 border ${
              msg.sender === 'user' 
                ? 'bg-zinc-900 border-zinc-800 text-amber-500' 
                : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
            }`}>
              {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-zinc-900 border-zinc-850 text-white rounded-tr-none'
                : 'bg-zinc-900/45 border-zinc-900 text-zinc-350 rounded-tl-none whitespace-pre-wrap text-zinc-350 font-light'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 max-w-[85%] mr-auto">
            <div className="p-2 rounded-lg shrink-0 h-8 w-8 bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center animate-spin">
              <RefreshCw size={14} />
            </div>
            <div className="p-3 rounded-xl bg-zinc-905 border border-zinc-900 text-xs text-zinc-500 italic">
              Computing technical specifications and financial loan rates...
            </div>
          </div>
        )}

        {errorText && (
          <div className="p-3 bg-red-500/10 border border-red-500/35 rounded-xl text-xs text-red-500 flex items-start gap-2 max-w-[85%] mr-auto">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span>{errorText}</span>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* Suggestions box (Only visible initially when chat is young) */}
      {messages.length < 4 && (
        <div className="px-4 py-2 bg-zinc-900/15 border-t border-zinc-900/60 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5 py-2">
          {suggestions.map((s, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(s)}
              className="px-3 py-1.5 bg-zinc-900 border border-zinc-855 rounded-full text-[10px] text-zinc-400 hover:text-white hover:border-amber-500 transition cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input controls form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="p-4 border-t border-zinc-900 bg-zinc-950 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Nova AI... e.g. Portland Cement formulas"
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs py-2.5 px-3.5 text-white outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-lg bg-amber-500 text-zinc-950 hover:bg-amber-400 disabled:opacity-40 transition cursor-pointer"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
