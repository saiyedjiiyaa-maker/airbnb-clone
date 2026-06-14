import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MapPin, Calendar, Users, DollarSign, Plane, X } from "lucide-react";

const SUGGESTIONS = [
  "Plan a 7-day Maldives honeymoon trip for 2 people, budget $5000",
  "Best places to visit in Europe in December under $3000",
  "Family trip to Bali for 4 people for 10 days",
  "Luxury weekend getaway from Mumbai under $1000",
  "Solo backpacking route through Southeast Asia for 2 weeks",
];

async function askAI(messages) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: `You are an expert luxury travel planner for Airbnb. Help users plan their perfect trips. 
        Format responses with clear sections using emojis. Include:
        - Best time to visit
        - Day-by-day itinerary highlights  
        - Accommodation suggestions (mention Airbnb stays)
        - Budget breakdown
        - Local tips and must-try experiences
        Keep responses engaging, detailed but scannable. Use bullet points and emojis liberally.`,
        messages
      })
    });
    const d = await res.json();
    return d.content?.[0]?.text || null;
  } catch { return null; }
}

export default function TravelPlannerPage({ darkMode }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "✈️ **Welcome to Airbnb AI Travel Planner!**\n\nI'm your personal travel expert. Tell me where you want to go, your budget, travel dates, and who you're travelling with — and I'll create a perfect itinerary for you!\n\n🌍 Where do you dream of going?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    const userMsg = { role: "user", content: msg };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setLoading(true);
    const apiMsgs = newMsgs.map(m => ({ role: m.role, content: m.content }));
    let reply = await askAI(apiMsgs);
    if (!reply) reply = "I'd love to help plan your trip! Could you share more details — destination, dates, budget, and number of travellers? 🌍";
    setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  const bg = darkMode ? "bg-obsidian" : "bg-stone-50";
  const card = darkMode ? "bg-[#1a1a1a] border-white/8" : "bg-white border-stone-100";
  const txt = darkMode ? "text-ivory" : "text-obsidian";
  const sub = darkMode ? "text-ivory/50" : "text-obsidian/50";
  const bubbleUser = { background: "#FF385C" };
  const bubbleAI = darkMode ? "bg-white/8 text-ivory" : "bg-stone-50 text-obsidian";

  function renderMsg(content) {
    return content.split('\n').map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} className="mb-1 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: bold }} />;
    });
  }

  return (
    <div className={`${bg} min-h-screen pt-20`}>
      <div className="max-w-3xl mx-auto px-4 py-8" style={{ height: "calc(100vh - 80px)", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div className="text-center mb-6 flex-shrink-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3" style={{ background: "rgba(255,56,92,0.1)" }}>
            <Sparkles size={14} style={{ color: "#FF385C" }} />
            <span className="font-body text-xs font-semibold" style={{ color: "#FF385C" }}>Powered by Claude AI</span>
          </div>
          <h1 className={`font-display text-3xl font-light ${txt}`}>AI Travel <em>Planner</em></h1>
          <p className={`font-body text-sm ${sub} mt-1`}>Tell me your dream trip — I'll plan every detail</p>
        </div>

        {/* Chat */}
        <div className={`flex-1 overflow-y-auto rounded-2xl border p-4 space-y-4 mb-4 ${card}`}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg,#FF385C,#c9316b)" }}>✈️</div>
              )}
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${m.role === "user" ? "text-white rounded-br-sm" : `${bubbleAI} rounded-bl-sm`}`}
                style={m.role === "user" ? bubbleUser : {}}>
                {renderMsg(m.content)}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg,#FF385C,#c9316b)" }}>✈️</div>
              <div className={`px-4 py-3 rounded-2xl ${bubbleAI}`}>
                <div className="flex gap-1">
                  {[0,150,300].map(d => <div key={d} className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="flex gap-2 flex-wrap mb-3 flex-shrink-0">
            {SUGGESTIONS.slice(0,3).map(s => (
              <button key={s} onClick={() => send(s)}
                className={`text-xs px-3 py-1.5 rounded-full border font-body transition-all hover:border-gold ${darkMode ? "border-white/10 text-ivory/60 hover:text-ivory" : "border-stone-200 text-obsidian/60 hover:text-obsidian"}`}>
                {s.slice(0, 45)}...
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className={`flex gap-2 items-center rounded-2xl border p-2 flex-shrink-0 ${darkMode ? "bg-white/5 border-white/10" : "bg-white border-stone-200"}`}>
          <Plane size={16} className="ml-2 flex-shrink-0" style={{ color: "#c9a84c" }} />
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }}}
            placeholder="Where do you want to go? Describe your dream trip..."
            className={`flex-1 bg-transparent font-body text-sm outline-none ${txt}`} />
          <button onClick={() => send()} disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white disabled:opacity-30 transition-all"
            style={{ background: "#FF385C" }}>
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
