import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minimize2, Maximize2, Sparkles, RotateCcw } from "lucide-react";
import { properties } from "../data/properties";

const SYSTEM_PROMPT = `You are Aria, a warm and knowledgeable AI travel concierge for Luximo Airbnb — a luxury property rental platform.

You help guests find perfect stays, answer questions about properties, give travel advice, and assist with bookings.

Available properties summary: ${JSON.stringify(
  properties.slice(0, 20).map(p => ({
    id: p.id,
    title: p.title,
    location: p.location,
    price: p.price,
    rating: p.rating,
    guests: p.guests,
    category: p.category,
    amenities: p.amenities?.slice(0, 4),
    region: p.region,
  }))
)}

Key things you can help with:
- Recommending properties based on budget, location, travel style, guests
- Answering questions about amenities, pricing, availability
- Travel tips for destinations
- Explaining how to book, wishlist, or compare properties
- General travel advice

Always be concise, warm, and helpful. Format lists with bullet points when appropriate. Keep responses under 200 words unless asked for details. 
When recommending a property, mention the property ID so users can look it up (e.g. "Check out property #5").`;

const QUICK_PROMPTS = [
  "Find me a beachfront villa under $500/night",
  "Best properties for a romantic couples trip",
  "Family-friendly stays with a pool",
  "Top rated properties in Europe",
];

export default function AIChatbot({ darkMode }) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm **Aria**, your AI travel concierge ✨\n\nI can help you find the perfect stay, recommend destinations, and answer any questions. What kind of trip are you dreaming of?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, I had trouble responding. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      if (!open) setHasUnread(true);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMessages([{ role: "assistant", content: "Hi! I'm **Aria**, your AI travel concierge ✨\n\nHow can I help you find your perfect stay today?" }]);
  };

  const cardBg = darkMode ? "bg-[#111] border-white/10" : "bg-white border-stone-200";
  const inputBg = darkMode ? "bg-white/5 border-white/10 text-ivory placeholder-white/30" : "bg-stone-50 border-stone-200 text-obsidian placeholder-obsidian/30";
  const userBubble = "bg-gradient-to-br from-[#FF385C] to-[#E31C5F] text-white";
  const aiBubble = darkMode ? "bg-white/8 text-ivory border border-white/10" : "bg-stone-100 text-obsidian";

  // Render markdown-like text (bold, bullets)
  const renderText = (text) => {
    return text.split("\n").map((line, i) => {
      const boldLine = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      if (line.startsWith("- ") || line.startsWith("• ")) {
        return <li key={i} className="ml-3 list-disc" dangerouslySetInnerHTML={{ __html: boldLine.slice(2) }} />;
      }
      return <p key={i} className={line === "" ? "h-2" : ""} dangerouslySetInnerHTML={{ __html: boldLine }} />;
    });
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setOpen(true); setMinimized(false); }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${open && !minimized ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{ background: "linear-gradient(135deg, #FF385C, #c9a84c)" }}
      >
        <MessageCircle size={24} className="text-white" />
        {hasUnread && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full border-2 border-white text-[9px] font-bold text-black flex items-center justify-center">1</span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className={`fixed bottom-6 right-6 z-50 rounded-2xl shadow-2xl border overflow-hidden transition-all duration-300 ${cardBg} ${minimized ? "w-72 h-14" : "w-80 sm:w-96 h-[560px]"}`}
          style={{ maxHeight: "calc(100vh - 100px)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gold/20"
            style={{ background: "linear-gradient(135deg, #FF385C22, #c9a84c15)" }}>
            <div className="relative w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #FF385C, #c9a84c)" }}>
              <Sparkles size={16} className="text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-body text-sm font-semibold ${darkMode ? "text-ivory" : "text-obsidian"}`}>Aria</p>
              <p className="font-body text-xs text-gold">AI Travel Concierge · Online</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={reset} title="New conversation"
                className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors ${darkMode ? "text-ivory/50" : "text-obsidian/40"}`}>
                <RotateCcw size={12} />
              </button>
              <button onClick={() => setMinimized(!minimized)}
                className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors ${darkMode ? "text-ivory/50" : "text-obsidian/40"}`}>
                {minimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
              </button>
              <button onClick={() => setOpen(false)}
                className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors ${darkMode ? "text-ivory/50" : "text-obsidian/40"}`}>
                <X size={14} />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ height: "calc(100% - 130px)" }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1"
                        style={{ background: "linear-gradient(135deg, #FF385C, #c9a84c)" }}>
                        <Sparkles size={10} className="text-white" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2.5 font-body text-sm leading-relaxed space-y-1 ${msg.role === "user" ? userBubble + " rounded-br-sm" : aiBubble + " rounded-bl-sm"}`}>
                      {renderText(msg.content)}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2"
                      style={{ background: "linear-gradient(135deg, #FF385C, #c9a84c)" }}>
                      <Sparkles size={10} className="text-white" />
                    </div>
                    <div className={`rounded-2xl rounded-bl-sm px-4 py-3 ${aiBubble}`}>
                      <div className="flex gap-1 items-center h-4">
                        {[0, 1, 2].map((d) => (
                          <span key={d} className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce"
                            style={{ animationDelay: `${d * 0.15}s` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick prompts (only on first message) */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((q) => (
                    <button key={q} onClick={() => sendMessage(q)}
                      className="font-body text-xs px-2.5 py-1 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-colors">
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className={`p-3 border-t ${darkMode ? "border-white/5" : "border-stone-100"}`}>
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    placeholder="Ask Aria anything…"
                    className={`flex-1 resize-none rounded-xl border px-3 py-2.5 font-body text-sm outline-none focus:border-gold/50 transition-colors ${inputBg}`}
                    style={{ maxHeight: "80px" }}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || loading}
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #FF385C, #c9a84c)" }}
                  >
                    <Send size={15} className="text-white" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
