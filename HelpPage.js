import React, { useState } from "react";
import { Search, ChevronDown, ChevronRight, Phone, Mail, MessageCircle, Book, Shield, Home, CreditCard, Star, Plane } from "lucide-react";

const helpCategories = [
  { icon:Home, label:"Getting Started", color:"#FF385C", articles:["How to create an account","How to search for properties","Understanding listings","Your first booking"] },
  { icon:CreditCard, label:"Payments & Refunds", color:"#c9a84c", articles:["Accepted payment methods","How refunds work","Cancellation policies","Price breakdown explained"] },
  { icon:Shield, label:"Trust & Safety", color:"#10b981", articles:["AirCover for guests","Identity verification","Reporting a concern","Safety during your stay"] },
  { icon:Star, label:"Reviews", color:"#8b5cf6", articles:["How the review system works","Leaving a review","Responding to reviews","Review dispute process"] },
  { icon:Plane, label:"Trips & Experiences", color:"#f59e0b", articles:["Managing your booking","Check-in instructions","Experiences overview","Trip itinerary planning"] },
  { icon:Home, label:"Hosting", color:"#06b6d4", articles:["Listing your space","Pricing your home","Managing reservations","Host protection"] },
];

const popularArticles = [
  "How do I cancel a reservation?",
  "What is AirCover?",
  "How does payment work?",
  "How do I contact my host?",
  "What if my host cancels?",
  "How do I leave a review?",
];

export default function HelpPage({ darkMode }) {
  const [search, setSearch]     = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [openArticle, setOpenArticle]       = useState(null);

  const textMain = darkMode ? "text-ivory"    : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg   = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const pageBg   = darkMode ? "bg-obsidian" : "bg-ivory-50";
  const inputBg  = { background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.95)" };

  return (
    <div className={`${pageBg} min-h-screen pt-24`}>
      {/* Hero search */}
      <section className="py-16 px-4" style={{background:"linear-gradient(135deg,#FF385C,#c9316b)"}}>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-light text-white mb-3">How can we <em>help?</em></h1>
          <p className="font-body text-white/70 text-sm mb-8">Search our help centre or browse categories below</p>
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian/50"/>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for help..."
              className="w-full pl-11 pr-4 py-4 rounded-full font-body text-sm text-obsidian outline-none shadow-lg" style={{background:"white"}}/>
          </div>
          {search && (
            <div className="mt-2 bg-white rounded-2xl shadow-xl overflow-hidden text-left">
              {popularArticles.filter(a => a.toLowerCase().includes(search.toLowerCase())).map(a => (
                <button key={a} className="flex items-center gap-2 w-full px-4 py-3 text-sm text-obsidian hover:bg-stone-50 border-b last:border-0 font-body">
                  <ChevronRight size={13} className="text-[#FF385C]"/>{a}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Popular articles */}
        <div className="mb-14">
          <h2 className={`font-display text-2xl font-light ${textMain} mb-6`}>Popular <em>Articles</em></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {popularArticles.map(a => (
              <button key={a} onClick={() => setOpenArticle(openArticle===a?null:a)}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${cardBg} hover:border-gold/30`}>
                <ChevronRight size={14} className="text-gold flex-shrink-0"/>
                <span className={`font-body text-sm ${textMain}`}>{a}</span>
              </button>
            ))}
          </div>
          {openArticle && (
            <div className={`mt-4 p-5 rounded-2xl border ${cardBg}`}>
              <h3 className={`font-display text-lg font-medium ${textMain} mb-2`}>{openArticle}</h3>
              <p className={`font-body text-sm leading-relaxed ${textSub}`}>
                This is a detailed explanation of "{openArticle}". Our support team is available 24/7 to assist you with any questions or concerns. We strive to resolve all issues within 24 hours of being reported.
              </p>
              <div className="flex gap-2 mt-4">
                <button className="font-body text-xs text-gold border border-gold/30 px-3 py-1.5 rounded-full hover:bg-gold/10 transition-colors">👍 Helpful</button>
                <button className="font-body text-xs text-gold border border-gold/30 px-3 py-1.5 rounded-full hover:bg-gold/10 transition-colors">👎 Not helpful</button>
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="mb-14">
          <h2 className={`font-display text-2xl font-light ${textMain} mb-6`}>Browse by <em>Category</em></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {helpCategories.map(cat => (
              <div key={cat.label} className={`rounded-2xl border overflow-hidden ${cardBg}`}>
                <button onClick={() => setActiveCategory(activeCategory===cat.label?null:cat.label)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-gold/3 transition-colors">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:`${cat.color}18`}}>
                    <cat.icon size={20} style={{color:cat.color}}/>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-body text-sm font-semibold ${textMain}`}>{cat.label}</h3>
                    <p className={`font-body text-xs ${textSub}`}>{cat.articles.length} articles</p>
                  </div>
                  <ChevronDown size={14} className={`text-gold transition-transform ${activeCategory===cat.label?"rotate-180":""}`}/>
                </button>
                {activeCategory===cat.label && (
                  <div className="border-t border-gold/10">
                    {cat.articles.map(a => (
                      <button key={a} className={`flex items-center gap-2 w-full px-5 py-3 text-left font-body text-sm ${textSub} hover:text-gold hover:bg-gold/5 transition-colors border-b border-gold/5 last:border-0`}>
                        <ChevronRight size={12} className="text-gold flex-shrink-0"/>{a}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className={`font-display text-2xl font-light ${textMain} mb-6 text-center`}>Still need <em>help?</em></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon:MessageCircle, label:"Live Chat", desc:"Chat with us now", action:"Start Chat", color:"#FF385C" },
              { icon:Phone, label:"Call Us", desc:"+1 855-424-4923", action:"Call Now", color:"#c9a84c" },
              { icon:Mail, label:"Email", desc:"support@airbnb.com", action:"Send Email", color:"#10b981" },
            ].map(c => (
              <div key={c.label} className={`rounded-2xl border p-6 text-center ${cardBg} hover:border-gold/30 transition-all`}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{background:`${c.color}18`}}>
                  <c.icon size={24} style={{color:c.color}}/>
                </div>
                <h3 className={`font-display text-lg font-medium ${textMain} mb-1`}>{c.label}</h3>
                <p className={`font-body text-sm ${textSub} mb-4`}>{c.desc}</p>
                <button className="font-body text-sm font-semibold text-white px-6 py-2.5 rounded-full transition-opacity hover:opacity-90"
                  style={{background:c.color}}>{c.action}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
