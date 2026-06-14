import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin, Users, SlidersHorizontal, X, Clock, ArrowUpLeft } from "lucide-react";
import { regions } from "../data/properties";

const categoryImages = [
  { id: "Beachfront",  label: "Beachfront",  img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: "Mountains",   label: "Mountains",   img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: "City",        label: "City",        img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: "Unique",      label: "Unique",      img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: "Countryside", label: "Countryside", img: "https://images.unsplash.com/photo-1500076656116-558758f991c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
];

export default function SearchFilters({ onFilter, darkMode }) {
  const [activeCategory, setActiveCategory] = useState("");
  const [activeRegion,   setActiveRegion]   = useState("All");
  const [showAdvanced,   setShowAdvanced]   = useState(false);
  const [maxPrice,       setMaxPrice]       = useState(1500);
  const [minRating,      setMinRating]      = useState(0);
  const [destination,    setDestination]    = useState("");
  const [guests,         setGuests]         = useState(1);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        dropdownRef.current._open && setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try { return JSON.parse(localStorage.getItem("recentSearches") || "[]"); } catch { return []; }
  });

  const saveRecent = (val) => {
    const updated = [val, ...recentSearches.filter(r => r !== val)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const apply = () => {
    if (destination.trim()) saveRecent(destination.trim());
    onFilter({ activeCategory, activeRegion, maxPrice, minRating, destination, guests });
    setDropdownOpen(false);
  };

  const reset = () => {
    setActiveCategory("all"); setActiveRegion("All");
    setMaxPrice(1500); setMinRating(0); setDestination(""); setGuests(1);
    onFilter({});
  };

  const cardBg  = darkMode ? "bg-obsidian/60 border-gold/10" : "bg-white/90 border-gold/20";
  const textSub = darkMode ? "text-ivory/50" : "text-obsidian/50";
  const dropBg  = darkMode
    ? "bg-[#111] border-white/10 shadow-2xl shadow-black/60"
    : "bg-white border-stone-200 shadow-2xl shadow-black/15";

  return (
    <div className={`rounded-2xl border p-5 ${cardBg}`} style={{ backdropFilter: "blur(20px)" }}>

      {/* ── UNIFIED SEARCH BAR ── */}
      <div className="flex items-stretch mb-5 rounded-xl border border-gold/30 overflow-visible"
        style={{ background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.95)" }}>

        {/* Where to input */}
        <div className="flex-1 relative" ref={dropdownRef}>
          <div className="flex items-center h-full">
            <MapPin size={15} className="absolute left-4 text-gold pointer-events-none" />
            <input
              value={destination}
              onChange={e => setDestination(e.target.value)}
              onFocus={() => setDropdownOpen(true)}
              placeholder="Where to?"
              className={`w-full bg-transparent outline-none font-body text-sm pl-10 pr-4 py-3.5 ${darkMode ? "text-ivory placeholder-ivory/40" : "text-obsidian placeholder-obsidian/40"}`}
            />
          </div>

          {/* Floating dropdown — rich version */}
          {dropdownOpen && (
            <div className={`absolute left-0 top-[calc(100%+8px)] rounded-2xl border z-[9999] overflow-hidden ${dropBg}`}
              style={{ width: "min(460px, 95vw)", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>

              {/* Scrollable content */}
              <div className="overflow-y-auto" style={{ maxHeight: "480px" }}>

                {/* Recent searches */}
                {recentSearches.length > 0 && (
                  <div className="p-4 border-b border-gold/10">
                    <div className="flex items-center justify-between mb-3">
                      <p className={`font-body text-xs font-semibold uppercase tracking-widest ${textSub}`}>Recent Searches</p>
                      <button onClick={() => setRecentSearches([])} className="font-body text-xs text-gold hover:underline">Clear</button>
                    </div>
                    <div className="flex flex-col gap-1">
                      {recentSearches.map(r => (
                        <button key={r} onClick={() => { setDestination(r); setDropdownOpen(false); apply(); }}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${darkMode?"hover:bg-white/5":"hover:bg-stone-50"}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${darkMode?"bg-white/5":"bg-stone-100"}`}>
                            <Clock size={13} className="text-gold"/>
                          </div>
                          <span className={`font-body text-sm ${darkMode?"text-ivory/70":"text-obsidian/70"}`}>{r}</span>
                          <ArrowUpLeft size={12} className={`ml-auto ${textSub}`}/>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Destinations — clean emoji cards */}
                <div className="p-4 border-b border-gold/10">
                  <p className={`font-body text-xs font-semibold uppercase tracking-widest ${textSub} mb-3`}>Popular Destinations</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name:"Santorini", country:"Greece",    emoji:"🇬🇷", color:"#4FC3F7" },
                      { name:"Bali",      country:"Indonesia", emoji:"🇮🇩", color:"#81C784" },
                      { name:"Maldives",  country:"Maldives",  emoji:"🇲🇻", color:"#4DB6AC" },
                      { name:"Dubai",     country:"UAE",       emoji:"🇦🇪", color:"#FFD54F" },
                      { name:"Tuscany",   country:"Italy",     emoji:"🇮🇹", color:"#E57373" },
                      { name:"Kyoto",     country:"Japan",     emoji:"🇯🇵", color:"#F48FB1" },
                    ].map(dest => (
                      <button key={dest.name}
                        onClick={() => { setDestination(`${dest.name}, ${dest.country}`); saveRecent(`${dest.name}, ${dest.country}`); setDropdownOpen(false); apply(); }}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl text-center transition-all hover:scale-105 border ${darkMode?"border-white/5 hover:border-gold/30 hover:bg-white/5":"border-stone-100 hover:border-gold/30 hover:bg-stone-50"}`}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                          style={{background:`${dest.color}22`}}>{dest.emoji}</div>
                        <div>
                          <p className={`font-body text-xs font-semibold leading-tight ${darkMode?"text-ivory":"text-obsidian"}`}>{dest.name}</p>
                          <p className={`font-body text-xs ${textSub}`}>{dest.country}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Browse by type */}
                <div className="p-4 border-b border-gold/10">
                  <p className={`font-body text-xs font-semibold uppercase tracking-widest ${textSub} mb-3`}>Browse by Type</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label:"Beachfront",  icon:"🌊", query:"beach" },
                      { label:"Mountains",   icon:"⛰️", query:"mountain" },
                      { label:"City Stays",  icon:"🌆", query:"city" },
                      { label:"Countryside", icon:"🌿", query:"countryside" },
                      { label:"Unique Stays",icon:"💎", query:"unique" },
                      { label:"Luxury Villas",icon:"✦", query:"luxury" },
                    ].map(t => (
                      <button key={t.label}
                        onClick={() => { setDestination(t.label); saveRecent(t.label); setDropdownOpen(false); apply(); }}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors border ${darkMode?"border-white/5 hover:border-gold/30 hover:bg-white/5":"border-stone-100 hover:border-gold/30 hover:bg-stone-50"}`}>
                        <span className="text-base">{t.icon}</span>
                        <span className={`font-body text-sm ${darkMode?"text-ivory/70":"text-obsidian/70"}`}>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Top cities list */}
                <div className="p-4">
                  <p className={`font-body text-xs font-semibold uppercase tracking-widest ${textSub} mb-3`}>Top Cities</p>
                  <div className="flex flex-col gap-0.5">
                    {[
                      { city:"Santorini, Greece",    flag:"🇬🇷", props:"24 properties" },
                      { city:"Bali, Indonesia",       flag:"🇮🇩", props:"38 properties" },
                      { city:"Dubai, UAE",            flag:"🇦🇪", props:"31 properties" },
                      { city:"Amalfi Coast, Italy",  flag:"🇮🇹", props:"19 properties" },
                      { city:"Maldives",              flag:"🇲🇻", props:"12 properties" },
                      { city:"Kyoto, Japan",          flag:"🇯🇵", props:"22 properties" },
                      { city:"Paris, France",         flag:"🇫🇷", props:"27 properties" },
                      { city:"Mykonos, Greece",       flag:"🇬🇷", props:"18 properties" },
                      { city:"Cape Town, South Africa",flag:"🇿🇦",props:"15 properties" },
                      { city:"Queenstown, NZ",        flag:"🇳🇿", props:"11 properties" },
                    ].map(d => (
                      <button key={d.city}
                        onClick={() => { setDestination(d.city); saveRecent(d.city); setDropdownOpen(false); apply(); }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group ${darkMode?"hover:bg-white/5":"hover:bg-stone-50"}`}>
                        <span className="text-lg flex-shrink-0">{d.flag}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-body text-sm ${darkMode?"text-ivory/80":"text-obsidian/80"} truncate`}>{d.city}</p>
                          <p className={`font-body text-xs ${textSub}`}>{d.props}</p>
                        </div>
                        <MapPin size={12} className="text-gold opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity"/>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px self-stretch" style={{ background: "rgba(201,168,76,0.2)" }} />

        {/* Guests */}
        <div className="flex items-center gap-2 px-4 border-r border-gold/20">
          <Users size={14} className="text-gold flex-shrink-0" />
          <select value={guests} onChange={e => setGuests(Number(e.target.value))}
            className={`bg-transparent outline-none text-sm font-body cursor-pointer ${darkMode ? "text-ivory" : "text-obsidian"}`}>
            {[1,2,3,4,5,6,8,10].map(n => <option key={n} value={n}>{n} Guest{n>1?"s":""}</option>)}
          </select>
        </div>

        {/* Filters toggle */}
        <button onClick={() => setShowAdvanced(o => !o)}
          className={`flex items-center gap-2 px-4 text-sm font-body border-r border-gold/20 transition-colors ${
            showAdvanced ? "text-gold" : darkMode ? "text-ivory/60 hover:text-gold" : "text-obsidian/60 hover:text-gold"
          }`}>
          <SlidersHorizontal size={14} /> Filters
        </button>

        {/* Search */}
        <button onClick={apply}
          className="flex items-center gap-2 px-5 py-3.5 font-body text-sm font-semibold text-white rounded-r-xl transition-opacity hover:opacity-90 flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #FF385C 0%, #c9316b 100%)" }}>
          <Search size={14} /> Search
        </button>
      </div>

      {/* ── CATEGORY CHIPS ── */}
      <div className="flex gap-2 flex-wrap mb-4">
        {categoryImages.map(cat => (
          <button key={cat.id}
            onClick={() => { setActiveCategory(cat.id); onFilter({ activeCategory: cat.id, activeRegion, maxPrice, minRating, destination, guests }); }}
            className={`chip text-xs ${activeCategory === cat.id ? "active" : darkMode ? "text-ivory/60 border-ivory/20" : "text-obsidian/60"}`}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── REGION CHIPS ── */}
      <div className="flex gap-2 flex-wrap">
        {regions.map(r => (
          <button key={r} onClick={() => { setActiveRegion(r); onFilter({ activeCategory, activeRegion: r, maxPrice, minRating, destination, guests }); }}
            className={`chip text-xs ${activeRegion === r ? "active" : darkMode ? "text-ivory/60 border-ivory/20" : "text-obsidian/60"}`}>
            {r}
          </button>
        ))}
      </div>

      {/* ── ADVANCED FILTERS ── */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gold/10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={`font-body text-sm font-medium ${darkMode ? "text-ivory" : "text-obsidian"} mb-2 block`}>
              Max Price: <span className="text-gold">${maxPrice}/night</span>
            </label>
            <input type="range" min={50} max={2000} step={50} value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))} className="w-full" />
            <div className={`flex justify-between text-xs ${textSub} mt-1`}><span>$50</span><span>$2,000</span></div>
          </div>
          <div>
            <label className={`font-body text-sm font-medium ${darkMode ? "text-ivory" : "text-obsidian"} mb-2 block`}>
              Min Rating: <span className="text-gold">{minRating > 0 ? `${minRating}+` : "Any"}</span>
            </label>
            <input type="range" min={0} max={4.5} step={0.5} value={minRating}
              onChange={e => setMinRating(Number(e.target.value))} className="w-full" />
            <div className={`flex justify-between text-xs ${textSub} mt-1`}><span>Any</span><span>4.5+</span></div>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button onClick={reset} className={`flex items-center gap-2 text-sm font-body ${textSub} hover:text-gold transition-colors`}>
              <X size={14} /> Reset filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
