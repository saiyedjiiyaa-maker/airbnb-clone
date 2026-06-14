import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Plus, Trash2, Share2, Grid, List, SlidersHorizontal, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { properties } from "../data/properties";
import PropertyCard from "../components/PropertyCard";

const defaultCollections = [
  { id:"all", name:"All Saved", emoji:"❤️" },
  { id:"beach", name:"Beach Escapes", emoji:"🌊" },
  { id:"mountains", name:"Mountain Retreats", emoji:"⛰️" },
  { id:"romantic", name:"Romantic Getaways", emoji:"💑" },
];

export default function WishlistPage({ darkMode }) {
  const { user, wishlist, toggleWishlist } = useAuth();
  const [activeCollection, setActiveCollection] = useState("all");
  const [collections, setCollections]           = useState(defaultCollections);
  const [viewMode, setViewMode]                 = useState("grid");
  const [sortBy, setSortBy]                     = useState("saved");
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionEmoji, setNewCollectionEmoji] = useState("📍");
  const [showShare, setShowShare]               = useState(false);
  const [compareList, setCompareList]           = useState([]);
  const [showCompare, setShowCompare]           = useState(false);

  const wished = properties.filter(p => wishlist.includes(p.id));

  const sorted = [...wished].sort((a, b) => {
    if (sortBy === "price-asc")  return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating")     return b.rating - a.rating;
    return 0;
  });

  const textMain = darkMode ? "text-ivory"    : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg   = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const pageBg   = darkMode ? "bg-obsidian" : "bg-ivory-50";
  const inputBg  = { background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)" };

  const toggleCompare = (id) => {
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const addCollection = () => {
    if (!newCollectionName.trim()) return;
    setCollections(prev => [...prev, { id: Date.now().toString(), name: newCollectionName, emoji: newCollectionEmoji }]);
    setNewCollectionName(""); setShowNewCollection(false);
  };

  const compareProps = properties.filter(p => compareList.includes(p.id));

  if (!user) return (
    <div className={`${pageBg} min-h-screen pt-24 flex items-center justify-center`}>
      <div className="text-center">
        <Heart size={48} className="text-gold mx-auto mb-4 opacity-50"/>
        <h2 className={`font-display text-3xl ${textMain} mb-3`}>Sign in to view your wishlist</h2>
        <Link to="/login" className="btn-gold rounded-full">Sign In</Link>
      </div>
    </div>
  );

  return (
    <div className={`${pageBg} min-h-screen pt-24`}>

      {/* Compare bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border border-gold/30"
          style={{background: darkMode ? "rgba(15,15,15,0.95)" : "rgba(255,255,255,0.97)", backdropFilter:"blur(20px)"}}>
          <span className="font-body text-sm text-gold">{compareList.length} selected</span>
          {compareProps.map(p => (
            <div key={p.id} className="flex items-center gap-1.5">
              <img src={p.img} alt="" className="w-8 h-8 rounded-lg object-cover"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
              <button onClick={() => toggleCompare(p.id)} className={`${textSub} hover:text-red-400`}><X size={12}/></button>
            </div>
          ))}
          <button onClick={() => setShowCompare(true)} disabled={compareList.length < 2}
            className="btn-gold rounded-full text-xs py-2 px-4 disabled:opacity-40">Compare {compareList.length}</button>
          <button onClick={() => setCompareList([])} className={`${textSub} hover:text-red-400`}><X size={16}/></button>
        </div>
      )}

      {/* Compare Modal */}
      {showCompare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowCompare(false)}>
          <div className={`relative rounded-3xl p-6 max-w-4xl w-full max-h-[85vh] overflow-y-auto ${darkMode?"bg-[#0f0f0f]":"bg-white"} shadow-2xl`} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowCompare(false)} className="absolute top-4 right-4 text-gold"><X size={20}/></button>
            <h2 className={`font-display text-2xl font-light ${textMain} mb-6`}>Comparing Properties</h2>
            <div className={`grid grid-cols-${compareProps.length} gap-4`}>
              {compareProps.map(p => (
                <div key={p.id} className={`rounded-2xl border p-4 ${cardBg}`}>
                  <img src={p.img} alt="" className="w-full h-36 object-cover rounded-xl mb-3"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                  <h3 className={`font-display text-base font-medium ${textMain} mb-1 leading-tight`}>{p.title}</h3>
                  <p className={`font-body text-xs ${textSub} mb-3`}>{p.location}</p>
                  {[
                    ["Price", `$${p.price}/night`],
                    ["Rating", `⭐ ${p.rating} (${p.reviews})`],
                    ["Guests", `👥 ${p.guests}`],
                    ["Bedrooms", `🛏 ${p.bedrooms}`],
                    ["Bathrooms", `🚿 ${p.bathrooms}`],
                    ["Type", p.type],
                    ["Category", p.category],
                  ].map(([label, val]) => (
                    <div key={label} className={`flex justify-between py-2 border-b border-gold/5 last:border-0 font-body text-xs`}>
                      <span className={textSub}>{label}</span>
                      <span className={`font-medium ${textMain}`}>{val}</span>
                    </div>
                  ))}
                  <Link to={`/property/${p.id}`} className="btn-gold w-full rounded-xl py-2 text-xs text-center mt-3 block">View Property</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowShare(false)}>
          <div className={`relative rounded-2xl p-6 max-w-sm w-full ${darkMode?"bg-[#111]":"bg-white"} shadow-2xl`} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowShare(false)} className="absolute top-4 right-4 text-gold"><X size={18}/></button>
            <h3 className={`font-display text-xl ${textMain} mb-4`}>Share Wishlist</h3>
            <div className="flex flex-col gap-2">
              {["Copy Link","Share on WhatsApp","Share via Email"].map(opt => (
                <button key={opt} onClick={() => setShowShare(false)}
                  className={`px-4 py-3 rounded-xl border ${cardBg} ${textMain} font-body text-sm text-left hover:border-gold transition-colors`}>{opt}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-2">My Collection</p>
            <h1 className={`font-display text-4xl md:text-5xl font-light ${textMain}`}>My <em>Wishlist</em></h1>
            <div className="gold-line mt-4"/>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowShare(true)} className="flex items-center gap-1.5 font-body text-sm text-gold border border-gold/30 px-4 py-2 rounded-full hover:bg-gold/10 transition-colors">
              <Share2 size={13}/> Share
            </button>
            <button onClick={() => setViewMode(v => v==="grid"?"list":"grid")}
              className={`w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors`}>
              {viewMode==="grid" ? <List size={15}/> : <Grid size={15}/>}
            </button>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className={`lux-input text-xs px-3 py-2 ${darkMode?"text-ivory":"text-obsidian"}`} style={inputBg}>
              <option value="saved">Recently Saved</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Collections row */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          {collections.map(c => (
            <button key={c.id} onClick={() => setActiveCollection(c.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-sm whitespace-nowrap transition-all ${
                activeCollection===c.id ? "bg-gold text-black" : `border border-gold/30 ${textSub} hover:border-gold hover:text-gold`
              }`}>
              {c.emoji} {c.name}
              {c.id==="all" && <span className="ml-1 text-xs opacity-70">({wished.length})</span>}
            </button>
          ))}
          <button onClick={() => setShowNewCollection(true)}
            className={`flex items-center gap-1 px-4 py-2 rounded-full font-body text-sm border border-dashed border-gold/30 ${textSub} hover:border-gold hover:text-gold transition-all whitespace-nowrap`}>
            <Plus size={13}/> New List
          </button>
        </div>

        {/* New collection form */}
        {showNewCollection && (
          <div className={`rounded-2xl border p-5 mb-6 ${cardBg}`}>
            <h3 className={`font-body text-sm font-semibold ${textMain} mb-3`}>Create New Collection</h3>
            <div className="flex gap-2">
              <input value={newCollectionEmoji} onChange={e => setNewCollectionEmoji(e.target.value)}
                className={`lux-input w-12 text-center text-base ${darkMode?"text-ivory":"text-obsidian"}`} style={inputBg} maxLength={2}/>
              <input value={newCollectionName} onChange={e => setNewCollectionName(e.target.value)}
                placeholder="Collection name..." className={`lux-input flex-1 text-sm ${darkMode?"text-ivory":"text-obsidian"}`} style={inputBg}/>
              <button onClick={addCollection} className="btn-gold rounded-lg px-4 text-sm">Create</button>
              <button onClick={() => setShowNewCollection(false)} className={`px-3 ${textSub} hover:text-red-400`}><X size={16}/></button>
            </div>
          </div>
        )}

        {/* Compare tip */}
        {wished.length > 1 && (
          <div className={`flex items-center gap-2 mb-4 p-3 rounded-xl border border-gold/20 ${darkMode?"bg-gold/5":"bg-gold/3"}`}>
            <SlidersHorizontal size={13} className="text-gold"/>
            <p className={`font-body text-xs ${textSub}`}>Select up to 3 properties to compare them side by side.</p>
          </div>
        )}

        {/* Empty state */}
        {wished.length === 0 ? (
          <div className="text-center py-24">
            <Heart size={56} className="text-gold mx-auto mb-4 opacity-40"/>
            <h2 className={`font-display text-2xl ${textMain} mb-3`}>Your wishlist is empty</h2>
            <p className={`font-body text-sm ${textSub} mb-6`}>Start exploring and save properties you love.</p>
            <Link to="/" className="btn-gold rounded-full">Explore Properties</Link>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sorted.map(p => (
              <div key={p.id} className="relative">
                <PropertyCard property={p} darkMode={darkMode}/>
                <div className="absolute bottom-16 left-3 right-3 flex gap-2">
                  <button onClick={() => toggleCompare(p.id)}
                    className={`flex-1 py-1.5 rounded-lg font-body text-xs transition-all ${
                      compareList.includes(p.id) ? "bg-gold text-black" : "bg-black/40 text-white backdrop-blur-sm hover:bg-gold hover:text-black"
                    }`}>{compareList.includes(p.id) ? "✓ Selected" : "Compare"}</button>
                  <button onClick={() => toggleWishlist(p.id)}
                    className="py-1.5 px-2 rounded-lg bg-black/40 text-white backdrop-blur-sm hover:bg-red-500 transition-colors">
                    <Trash2 size={12}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List view */
          <div className="space-y-3">
            {sorted.map(p => (
              <div key={p.id} className={`flex gap-4 rounded-2xl border p-4 ${cardBg} hover:border-gold/30 transition-all`}>
                <Link to={`/property/${p.id}`} className="flex-shrink-0">
                  <img src={p.img} alt={p.title} className="w-32 h-24 object-cover rounded-xl"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/property/${p.id}`}>
                    <h3 className={`font-display text-lg font-medium ${textMain} hover:text-gold transition-colors leading-tight`}>{p.title}</h3>
                  </Link>
                  <p className={`font-body text-xs ${textSub} mt-0.5 mb-2`}>{p.location}</p>
                  <div className={`flex flex-wrap gap-3 font-body text-xs ${textSub}`}>
                    <span>⭐ {p.rating} ({p.reviews})</span>
                    <span>👥 {p.guests} guests</span>
                    <span>🛏 {p.bedrooms} beds</span>
                    <span className="text-gold font-semibold">${p.price}/night</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button onClick={() => toggleCompare(p.id)}
                    className={`px-3 py-1.5 rounded-lg font-body text-xs transition-all border ${
                      compareList.includes(p.id) ? "bg-gold border-gold text-black" : `border-gold/30 ${textSub} hover:border-gold hover:text-gold`
                    }`}>{compareList.includes(p.id) ? "✓" : "Compare"}</button>
                  <button onClick={() => toggleWishlist(p.id)} className="px-3 py-1.5 rounded-lg border border-red-400/30 text-red-400 font-body text-xs hover:bg-red-400/10 transition-colors">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
