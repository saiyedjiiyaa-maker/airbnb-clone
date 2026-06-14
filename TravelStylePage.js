import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Users, SlidersHorizontal, X } from "lucide-react";
import { properties } from "../data/properties";
import PropertyCard from "../components/PropertyCard";

const STYLES = {
  Solo: {
    icon: "🧳",
    label: "Solo Escapes",
    tagline: "Your adventure. Your rules.",
    desc: "Handpicked properties perfect for solo travellers — private, peaceful, and full of character.",
    hero: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    color: "#c9a84c",
    accent: "gold",
    // Solo = 1-2 guests, private rooms or solo-friendly
    filter: (p) => p.guests <= 4,
    tags: ["Solo-Friendly", "Private", "City", "Mountains", "Budget Pick"],
    highlights: [
      { icon: "🔐", title: "Private Spaces", desc: "Your own room or entire place" },
      { icon: "📍", title: "Great Locations", desc: "Central, walkable, connected" },
      { icon: "🌐", title: "Fast WiFi", desc: "For remote workers & explorers" },
      { icon: "⭐", title: "Top Rated", desc: "Trusted by solo travelers" },
    ],
  },
  Couples: {
    icon: "💑",
    label: "Romantic Getaways",
    tagline: "Made for two.",
    desc: "Intimate escapes, breathtaking views, and unforgettable moments for couples.",
    hero: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    color: "#FF385C",
    accent: "rose",
    filter: (p) => p.guests >= 2 && p.guests <= 4 && (p.amenities?.includes("Hot Tub") || p.amenities?.includes("Infinity Pool") || p.amenities?.includes("Sea Views") || p.amenities?.includes("Ocean Views") || p.amenities?.includes("Private Pool") || p.luxury),
    tags: ["Romantic", "Beachfront", "Infinity Pool", "Hot Tub", "Private"],
    highlights: [
      { icon: "🌅", title: "Stunning Views", desc: "Sunsets made for two" },
      { icon: "🛁", title: "Private Amenities", desc: "Hot tubs, pools & more" },
      { icon: "🍾", title: "Luxury Comfort", desc: "Premium stays for special moments" },
      { icon: "🗺️", title: "Ideal Locations", desc: "Santorini, Maldives, Bali & more" },
    ],
  },
  Families: {
    icon: "👨‍👩‍👧",
    label: "Family Adventures",
    tagline: "Space for everyone.",
    desc: "Spacious homes, multiple bedrooms, and family-friendly amenities for the whole crew.",
    hero: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    color: "#00A699",
    accent: "teal",
    filter: (p) => p.guests >= 6 && p.bedrooms >= 3,
    tags: ["Family-Friendly", "Spacious", "Pool", "Kitchen", "Multiple Bedrooms"],
    highlights: [
      { icon: "🛏️", title: "Multiple Bedrooms", desc: "Room for everyone to spread out" },
      { icon: "🏊", title: "Pools & Play", desc: "Kids and adults love them" },
      { icon: "🍳", title: "Full Kitchens", desc: "Cook meals together" },
      { icon: "📍", title: "Safe Locations", desc: "Family-friendly neighborhoods" },
    ],
  },
  Groups: {
    icon: "🎉",
    label: "Epic Group Stays",
    tagline: "Go big. Go together.",
    desc: "Massive villas, private estates, and resort-style homes for unforgettable group trips.",
    hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    color: "#7B68EE",
    accent: "purple",
    filter: (p) => p.guests >= 8,
    tags: ["Large Groups", "Private Estate", "Party Friendly", "Pool", "Scenic"],
    highlights: [
      { icon: "🏡", title: "Entire Estates", desc: "Private spaces for your whole group" },
      { icon: "🎊", title: "Entertaining Areas", desc: "BBQ, terraces, open spaces" },
      { icon: "🛏️", title: "Many Beds", desc: "Lots of room for everyone" },
      { icon: "🌊", title: "Premium Settings", desc: "Beach, mountain, and jungle estates" },
    ],
  },
};

const priceRanges = ["Any", "$0–200", "$200–500", "$500–1000", "$1000+"];

export default function TravelStylePage({ darkMode }) {
  const { style } = useParams();
  const config = STYLES[style] || STYLES["Solo"];

  const [priceRange, setPriceRange] = useState("Any");
  const [sortBy, setSortBy] = useState("recommended");
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let r = properties.filter(config.filter);
    if (minRating > 0) r = r.filter((p) => p.rating >= minRating);
    if (priceRange !== "Any") {
      const [min, max] = priceRange.replace("$", "").replace("+", "–9999").split("–").map(Number);
      r = r.filter((p) => p.price >= min && p.price <= max);
    }
    if (sortBy === "price-asc") r.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") r.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") r.sort((a, b) => b.rating - a.rating);
    else r.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return r;
  }, [style, priceRange, sortBy, minRating]);

  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  const textSub = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg = darkMode ? "bg-white/5 border-white/10" : "bg-white border-stone-200";
  const pageBg = darkMode ? "bg-obsidian" : "bg-ivory-50";
  const chipBase = darkMode ? "border-white/10 text-ivory/50 hover:border-gold hover:text-gold" : "border-stone-200 text-obsidian/50 hover:border-gold hover:text-gold";

  return (
    <div className={`${pageBg} min-h-screen`}>
      {/* ── HERO ── */}
      <div className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img
          src={config.hero}
          alt={config.label}
          className="w-full h-full object-cover scale-105"
          style={{ filter: "brightness(0.55)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-obsidian/80" />

        {/* back */}
        <Link
          to="/"
          className="absolute top-28 left-6 flex items-center gap-2 text-ivory/80 hover:text-gold font-body text-sm transition-colors z-10"
        >
          <ArrowLeft size={16} /> Home
        </Link>

        {/* hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 max-w-7xl mx-auto">
          <span className="text-4xl mb-3 block">{config.icon}</span>
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-2">
            Travel Style
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-light text-ivory leading-tight">
            {config.label}
          </h1>
          <p className="font-body text-ivory/70 mt-2 text-sm md:text-base max-w-xl">
            {config.desc}
          </p>
        </div>
      </div>

      {/* ── HIGHLIGHTS ── */}
      <div className={`border-b ${darkMode ? "border-white/5" : "border-stone-100"}`}>
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {config.highlights.map((h) => (
            <div key={h.title} className="flex items-start gap-3">
              <span className="text-2xl">{h.icon}</span>
              <div>
                <p className={`font-body text-sm font-semibold ${textMain}`}>{h.title}</p>
                <p className={`font-body text-xs ${textSub} mt-0.5`}>{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── OTHER STYLES CHIPS ── */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-3 flex-wrap">
        <span className={`font-body text-xs ${textSub}`}>Other vibes:</span>
        {Object.keys(STYLES)
          .filter((s) => s !== style)
          .map((s) => (
            <Link
              key={s}
              to={`/vibe/${s}`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-body text-xs transition-all ${chipBase}`}
            >
              {STYLES[s].icon} {s}
            </Link>
          ))}
      </div>

      {/* ── FILTERS + RESULTS ── */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className={`font-display text-2xl font-light ${textMain}`}>
              {filtered.length} perfect{" "}
              <em className="text-gold">{style?.toLowerCase()}</em> stays
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* price chips */}
            {priceRanges.map((r) => (
              <button
                key={r}
                onClick={() => setPriceRange(r)}
                className={`px-3 py-1.5 rounded-full font-body text-xs border transition-all ${
                  priceRange === r
                    ? "bg-gold text-black border-gold"
                    : chipBase
                }`}
              >
                {r}
              </button>
            ))}
            <div className={`w-px h-5 ${darkMode ? "bg-white/10" : "bg-stone-200"}`} />
            {[4.5, 4.8, 4.9].map((r) => (
              <button
                key={r}
                onClick={() => setMinRating(minRating === r ? 0 : r)}
                className={`px-3 py-1.5 rounded-full font-body text-xs border transition-all flex items-center gap-1 ${
                  minRating === r ? "bg-gold text-black border-gold" : chipBase
                }`}
              >
                <Star size={9} /> {r}+
              </button>
            ))}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`lux-input text-xs px-3 py-2 rounded-lg border ${
                darkMode
                  ? "bg-white/5 border-white/10 text-ivory"
                  : "bg-white border-stone-200 text-obsidian"
              }`}
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* clear filters */}
        {(priceRange !== "Any" || minRating > 0) && (
          <div className="mb-4 flex items-center gap-2">
            <span className={`font-body text-xs ${textSub}`}>Active filters:</span>
            {priceRange !== "Any" && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold/10 text-gold font-body text-xs border border-gold/30">
                {priceRange}
                <button onClick={() => setPriceRange("Any")}><X size={10} /></button>
              </span>
            )}
            {minRating > 0 && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold/10 text-gold font-body text-xs border border-gold/30">
                ⭐ {minRating}+
                <button onClick={() => setMinRating(0)}><X size={10} /></button>
              </span>
            )}
          </div>
        )}

        {/* grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-3xl text-gold mb-3">No stays found</p>
            <p className={`font-body text-sm ${textSub} mb-6`}>Try adjusting your filters.</p>
            <button
              onClick={() => { setPriceRange("Any"); setMinRating(0); }}
              className="btn-gold rounded-full"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} darkMode={darkMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
