import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { properties } from "../data/properties";
import PropertyCard from "../components/PropertyCard";
import SearchFilters from "../components/SearchFilters";
import MapView from "../components/MapView";
import PriceAlerts from "../components/PriceAlerts";
import { Map, Grid } from "lucide-react";

const DEAL_LABELS = {
  "Last Minute": { tag: "⚡ Last Minute Deal", filter: p => true },
  "Weekly Stay": { tag: "📅 Weekly Stay", filter: p => true },
  "Early Bird":  { tag: "🐦 Early Bird", filter: p => true },
};

export default function PropertiesPage({ darkMode }) {
  const [searchParams] = useSearchParams();
  const dealParam = searchParams.get("deal") || "";
  const qParam    = searchParams.get("q") || "";

  const [filtered, setFiltered] = useState(properties);
  const [filters, setFilters] = useState({});
  const [showMap, setShowMap] = useState(false);
  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  const pageBg = darkMode ? "bg-obsidian" : "bg-ivory-50";

  useEffect(() => {
    let result = [...properties];
    if (filters.activeCategory && filters.activeCategory !== "")
      result = result.filter(p => p.category === filters.activeCategory);
    if (filters.activeRegion && filters.activeRegion !== "All")
      result = result.filter(p => p.region === filters.activeRegion);
    if (filters.maxPrice) result = result.filter(p => p.price <= filters.maxPrice);
    if (filters.minRating) result = result.filter(p => p.rating >= filters.minRating);
    if (filters.destination) result = result.filter(p =>
      p.location.toLowerCase().includes(filters.destination.toLowerCase()) ||
      p.city.toLowerCase().includes(filters.destination.toLowerCase())
    );
    if (filters.guests) result = result.filter(p => p.guests >= filters.guests);
    // Handle search query from hero
    if (qParam) result = result.filter(p =>
      p.title.toLowerCase().includes(qParam.toLowerCase()) ||
      p.location.toLowerCase().includes(qParam.toLowerCase()) ||
      p.city?.toLowerCase().includes(qParam.toLowerCase()) ||
      p.category?.toLowerCase().includes(qParam.toLowerCase())
    );
    setFiltered(result);
  }, [filters, qParam]);

  return (
    <div className={`${pageBg} min-h-screen pt-24`}>
      {showMap && <MapView properties={filtered} darkMode={darkMode} onClose={() => setShowMap(false)} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-2">Discover</p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h1 className={`font-display text-4xl md:text-5xl font-light ${textMain}`}>All <em>Properties</em></h1>
            <div className="flex items-center gap-3 relative">
              <PriceAlerts darkMode={darkMode} />
              <button
                onClick={() => setShowMap(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm border border-gold/30 text-gold hover:bg-gold/10 transition-all"
              >
                <Map size={14} /> Map View
              </button>
            </div>
          </div>
          {dealParam && DEAL_LABELS[dealParam] && (
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-body font-semibold"
              style={{background: dealParam==="Last Minute"?"#FF385C": dealParam==="Weekly Stay"?"#c9a84c":"#10b981"}}>
              {DEAL_LABELS[dealParam].tag} — showing all properties eligible for this deal
            </div>
          )}
          {qParam && (
            <p className={`font-body text-sm mt-2 ${darkMode?"text-ivory/50":"text-obsidian/50"}`}>
              Search results for: <span className="text-gold font-semibold">"{qParam}"</span>
            </p>
          )}
          <div className="gold-line mt-4" />
        </div>
        <div className="mb-8">
          <SearchFilters onFilter={setFilters} darkMode={darkMode} />
        </div>
        <p className={`font-body text-sm ${darkMode ? "text-ivory/50" : "text-obsidian/50"} mb-6`}>
          {filtered.length} propert{filtered.length !== 1 ? "ies" : "y"} found
        </p>
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-3xl text-gold mb-3">No properties found</p>
            <p className={`font-body text-sm ${darkMode ? "text-ivory/50" : "text-obsidian/50"}`}>Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(p => (
              <PropertyCard key={p.id} property={p} darkMode={darkMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
