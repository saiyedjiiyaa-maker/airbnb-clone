import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MapPin, SlidersHorizontal, Grid, Map, ChevronDown, Star, X, ArrowLeft } from "lucide-react";
import { properties } from "../data/properties";
import PropertyCard from "../components/PropertyCard";

const priceRanges = ["Any","$0–200","$200–500","$500–1000","$1000+"];
const roomTypes   = ["Any type","Entire place","Private room","Shared room"];

export default function SearchResultsPage({ darkMode }) {
  const [searchParams] = useSearchParams();
  const query    = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const [results, setResults]   = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState("Any");
  const [roomType, setRoomType]     = useState("Any type");
  const [minRating, setMinRating]   = useState(0);
  const [sortBy, setSortBy]         = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [amenityFilters, setAmenityFilters] = useState([]);
  const [guests, setGuests]         = useState(1);

  const allAmenities = ["Pool","WiFi","Sauna","Fireplace","Kitchen","Hot Tub","Beach Access","Ski Access"];

  useEffect(() => {
    let r = [...properties];
    if (query) r = r.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.location.toLowerCase().includes(query.toLowerCase()) || p.city?.toLowerCase().includes(query.toLowerCase()) || p.country?.toLowerCase().includes(query.toLowerCase()));
    if (category) r = r.filter(p => p.category === category);
    if (minRating > 0) r = r.filter(p => p.rating >= minRating);
    if (priceRange !== "Any") {
      const [min,max] = priceRange.replace("$","").replace("+","–9999").split("–").map(Number);
      r = r.filter(p => p.price >= min && p.price <= max);
    }
    if (amenityFilters.length > 0) r = r.filter(p => amenityFilters.every(a => p.amenities?.includes(a)));
    if (guests > 1) r = r.filter(p => p.guests >= guests);
    if (sortBy==="price-asc")  r.sort((a,b) => a.price - b.price);
    if (sortBy==="price-desc") r.sort((a,b) => b.price - a.price);
    if (sortBy==="rating")     r.sort((a,b) => b.rating - a.rating);
    setResults(r);
  }, [query, category, priceRange, roomType, minRating, sortBy, amenityFilters, guests]);

  const textMain = darkMode ? "text-ivory"    : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg   = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const pageBg   = darkMode ? "bg-obsidian" : "bg-ivory-50";
  const inputBg  = { background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)" };

  const toggleAmenity = (a) => setAmenityFilters(prev => prev.includes(a) ? prev.filter(x=>x!==a) : [...prev,a]);

  return (
    <div className={`${pageBg} min-h-screen pt-24`}>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/" className={`flex items-center gap-1 font-body text-sm ${textSub} hover:text-gold transition-colors`}><ArrowLeft size={15}/> Home</Link>
          <span className={textSub}>/</span>
          <span className={`font-body text-sm ${textMain}`}>{query || category || "All Properties"}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className={`font-display text-3xl font-light ${textMain}`}>
              {query ? <>Results for "<em className="text-gold">{query}</em>"</> : category ? <>{category} <em>Properties</em></> : <>All <em>Properties</em></>}
            </h1>
            <p className={`font-body text-sm ${textSub} mt-1`}>{results.length} properties found</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-4 py-2 rounded-full border font-body text-sm transition-colors ${showFilters?"bg-gold text-black border-gold":`border-gold/30 ${textSub} hover:border-gold hover:text-gold`}`}>
              <SlidersHorizontal size={14}/> Filters {amenityFilters.length>0 && `(${amenityFilters.length})`}
            </button>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className={`lux-input text-sm px-3 py-2 ${darkMode?"text-ivory":"text-obsidian"}`} style={inputBg}>
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low→High</option>
              <option value="price-desc">Price: High→Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <button onClick={() => setViewMode(v => v==="grid"?"list":"grid")}
              className={`w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors`}>
              {viewMode==="grid"?<Map size={16}/>:<Grid size={16}/>}
            </button>
          </div>
        </div>

        {/* Quick filter chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {priceRanges.map(r => (
            <button key={r} onClick={() => setPriceRange(r)}
              className={`px-3 py-1.5 rounded-full font-body text-xs border transition-all ${priceRange===r?"bg-gold text-black border-gold":`border-gold/30 ${textSub} hover:border-gold hover:text-gold`}`}>{r}</button>
          ))}
          <div className="w-px bg-gold/20 mx-1"/>
          {[4.5,4.8,4.9].map(r => (
            <button key={r} onClick={() => setMinRating(minRating===r?0:r)}
              className={`px-3 py-1.5 rounded-full font-body text-xs border transition-all flex items-center gap-1 ${minRating===r?"bg-gold text-black border-gold":`border-gold/30 ${textSub} hover:border-gold hover:text-gold`}`}>
              <Star size={10}/>{r}+
            </button>
          ))}
          <div className="w-px bg-gold/20 mx-1"/>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 ${textSub}`}>
            <span className="font-body text-xs">Guests:</span>
            <button onClick={() => setGuests(g => Math.max(1,g-1))} className="text-gold font-bold text-sm leading-none">−</button>
            <span className={`font-body text-xs font-semibold ${textMain} w-4 text-center`}>{guests}</span>
            <button onClick={() => setGuests(g => g+1)} className="text-gold font-bold text-sm leading-none">+</button>
          </div>
        </div>

        {/* Expanded filters panel */}
        {showFilters && (
          <div className={`rounded-2xl border p-5 mb-6 ${cardBg}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className={`font-body text-xs font-semibold uppercase tracking-wider ${textSub} mb-3`}>Room Type</h4>
                <div className="flex flex-col gap-2">
                  {roomTypes.map(t => (
                    <button key={t} onClick={() => setRoomType(t)}
                      className={`flex items-center gap-2 font-body text-sm ${textMain} hover:text-gold transition-colors text-left`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${roomType===t?"border-gold bg-gold":"border-gold/30"}`}/>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className={`font-body text-xs font-semibold uppercase tracking-wider ${textSub} mb-3`}>Amenities</h4>
                <div className="grid grid-cols-2 gap-2">
                  {allAmenities.map(a => (
                    <button key={a} onClick={() => toggleAmenity(a)}
                      className={`flex items-center gap-2 font-body text-xs px-3 py-2 rounded-lg border transition-all text-left ${amenityFilters.includes(a)?"border-gold bg-gold/10 text-gold":`border-gold/20 ${textSub} hover:border-gold hover:text-gold`}`}>
                      <div className={`w-3 h-3 rounded border flex-shrink-0 ${amenityFilters.includes(a)?"bg-gold border-gold":"border-gold/40"}`}/>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className={`font-body text-xs font-semibold uppercase tracking-wider ${textSub} mb-3`}>Min Rating</h4>
                <input type="range" min={0} max={4.9} step={0.1} value={minRating} onChange={e => setMinRating(Number(e.target.value))} className="w-full mb-2"/>
                <p className={`font-body text-sm ${textMain}`}>{minRating > 0 ? `${minRating}+ stars` : "Any rating"}</p>
              </div>
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t border-gold/10">
              <button onClick={() => { setAmenityFilters([]); setMinRating(0); setPriceRange("Any"); setRoomType("Any type"); }}
                className={`font-body text-sm ${textSub} hover:text-gold flex items-center gap-1`}><X size={14}/> Clear all</button>
              <button onClick={() => setShowFilters(false)} className="btn-gold rounded-full text-sm">Show {results.length} results</button>
            </div>
          </div>
        )}

        {/* Results */}
        {results.length === 0 ? (
          <div className="text-center py-24">
            <p className={`font-display text-3xl text-gold mb-3`}>No results found</p>
            <p className={`font-body text-sm ${textSub} mb-6`}>Try adjusting your filters or search term.</p>
            <Link to="/properties" className="btn-gold rounded-full">View All Properties</Link>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {results.map(p => <PropertyCard key={p.id} property={p} darkMode={darkMode}/>)}
          </div>
        ) : (
          <div className="space-y-4">
            {results.map(p => (
              <Link key={p.id} to={`/property/${p.id}`} className={`flex gap-4 rounded-2xl border p-4 ${cardBg} hover:border-gold/30 transition-all group`}>
                <img src={p.img} alt={p.title} className="w-44 h-32 object-cover rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className={`font-display text-xl font-medium ${textMain} group-hover:text-gold transition-colors leading-tight mb-1`}>{p.title}</h3>
                      <p className={`font-body text-xs ${textSub} flex items-center gap-1`}><MapPin size={10} className="text-gold"/>{p.location}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-display text-xl text-gold">${p.price}</p>
                      <p className={`font-body text-xs ${textSub}`}>/night</p>
                    </div>
                  </div>
                  <div className={`flex flex-wrap gap-3 font-body text-xs ${textSub} my-2`}>
                    <span className="flex items-center gap-1"><Star size={10} className="fill-gold text-gold"/> {p.rating} ({p.reviews})</span>
                    <span>👥 {p.guests} guests</span>
                    <span>🛏 {p.bedrooms} beds</span>
                    <span>🛁 {p.bathrooms} baths</span>
                    <span className={`px-2 py-0.5 rounded-full border border-gold/20 text-gold`}>{p.type}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {p.amenities?.slice(0,4).map(a => <span key={a} className={`font-body text-xs px-2 py-0.5 rounded-full ${darkMode?"bg-white/5 text-ivory/50":"bg-stone-100 text-obsidian/50"}`}>{a}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
