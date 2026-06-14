import React, { useState } from "react";
import { X, Check, Star, Users, BedDouble, Bath, Wifi, Pool, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { properties } from "../data/properties";

const FEATURES = ["wifi","pool","kitchen","parking","ac","gym","spa","breakfast","pet_friendly","beachfront"];

export default function ComparePage({ darkMode }) {
  const [selected, setSelected] = useState([properties[0], properties[1]]);
  const [picker, setPicker] = useState(null); // index being picked

  const bg = darkMode ? "bg-obsidian" : "bg-stone-50";
  const card = darkMode ? "bg-[#1a1a1a] border-white/8" : "bg-white border-stone-100";
  const txt = darkMode ? "text-ivory" : "text-obsidian";
  const sub = darkMode ? "text-ivory/50" : "text-obsidian/50";
  const rowAlt = darkMode ? "bg-white/3" : "bg-stone-50/60";

  const rows = [
    { label: "Price / night", key: p => `$${p.price}` },
    { label: "Rating", key: p => `⭐ ${p.rating} (${p.reviews} reviews)` },
    { label: "Max Guests", key: p => `${p.guests} guests` },
    { label: "Bedrooms", key: p => `${p.bedrooms || 2} bedrooms` },
    { label: "Bathrooms", key: p => `${p.bathrooms || 2} baths` },
    { label: "Location", key: p => p.location },
    { label: "Category", key: p => p.category || "Luxury" },
  ];

  return (
    <div className={`${bg} min-h-screen pt-20`}>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className={`font-display text-4xl font-light ${txt}`}>Compare <em>Properties</em></h1>
          <p className={`font-body text-sm ${sub} mt-1`}>Side-by-side comparison to find your perfect stay</p>
        </div>

        {/* Property selectors + cards */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {[0, 1].map(idx => {
            const p = selected[idx];
            return (
              <div key={idx} className={`rounded-2xl border overflow-hidden ${card}`}>
                {p ? (
                  <>
                    <div className="relative h-44">
                      <img src={p.images?.[0] || p.image} alt={p.title} className="w-full h-full object-cover" />
                      <button onClick={() => setSelected(prev => { const n=[...prev]; n[idx]=null; return n; })}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70">
                        <X size={14}/>
                      </button>
                    </div>
                    <div className="p-4">
                      <p className={`font-display text-base font-medium ${txt} mb-1 line-clamp-1`}>{p.title}</p>
                      <p className="font-body text-xs text-gold">{p.location}</p>
                      <p className={`font-body text-xl font-semibold ${txt} mt-2`}>${p.price}<span className={`text-xs font-normal ${sub}`}>/night</span></p>
                      <Link to={`/property/${p.id}`} className="block mt-3 text-center py-2 rounded-xl text-sm font-body font-semibold text-white" style={{background:"#FF385C"}}>
                        View Property →
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-8 cursor-pointer min-h-64" onClick={() => setPicker(idx)}>
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-gold/30 flex items-center justify-center mb-3">
                      <span className="text-gold text-2xl">+</span>
                    </div>
                    <p className={`font-body text-sm ${sub}`}>Click to select property</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Property picker modal */}
        {picker !== null && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setPicker(null)}>
            <div className={`w-full max-w-lg rounded-2xl p-4 max-h-[70vh] overflow-y-auto ${card}`} onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`font-display text-lg ${txt}`}>Choose a Property</h3>
                <button onClick={() => setPicker(null)}><X size={18} className={sub}/></button>
              </div>
              <div className="space-y-2">
                {properties.filter(p => !selected.includes(p)).map(p => (
                  <button key={p.id} onClick={() => { setSelected(prev => { const n=[...prev]; n[picker]=p; return n; }); setPicker(null); }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-colors hover:border-gold ${card}`}>
                    <img src={p.images?.[0]||p.image} alt="" className="w-14 h-10 rounded-lg object-cover flex-shrink-0"/>
                    <div className="flex-1 min-w-0">
                      <p className={`font-body text-sm font-semibold ${txt} truncate`}>{p.title}</p>
                      <p className="font-body text-xs text-gold truncate">{p.location}</p>
                    </div>
                    <p className={`font-body text-sm font-bold ${txt} flex-shrink-0`}>${p.price}/night</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Comparison table */}
        {selected[0] && selected[1] && (
          <div className={`rounded-2xl border overflow-hidden ${card}`}>
            <table className="w-full">
              <thead>
                <tr className={`border-b ${darkMode ? "border-white/8" : "border-stone-100"}`}>
                  <th className={`text-left px-4 py-3 font-body text-xs uppercase tracking-wider ${sub} w-1/3`}>Feature</th>
                  <th className={`text-center px-4 py-3 font-body text-xs uppercase tracking-wider ${sub}`}>{selected[0]?.title?.slice(0,20)}</th>
                  <th className={`text-center px-4 py-3 font-body text-xs uppercase tracking-wider ${sub}`}>{selected[1]?.title?.slice(0,20)}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label} className={`border-b ${darkMode?"border-white/5":"border-stone-50"} ${i%2===0 ? rowAlt : ""}`}>
                    <td className={`px-4 py-3 font-body text-sm ${sub}`}>{row.label}</td>
                    <td className={`px-4 py-3 font-body text-sm text-center font-medium ${txt}`}>{row.key(selected[0])}</td>
                    <td className={`px-4 py-3 font-body text-sm text-center font-medium ${txt}`}>{row.key(selected[1])}</td>
                  </tr>
                ))}
                {/* Amenity rows */}
                {FEATURES.map((f, i) => {
                  const a = selected[0]?.amenities?.map(x=>x.toLowerCase()).some(x=>x.includes(f));
                  const b = selected[1]?.amenities?.map(x=>x.toLowerCase()).some(x=>x.includes(f));
                  return (
                    <tr key={f} className={`border-b ${darkMode?"border-white/5":"border-stone-50"} ${(rows.length+i)%2===0?rowAlt:""}`}>
                      <td className={`px-4 py-3 font-body text-sm ${sub} capitalize`}>{f.replace("_"," ")}</td>
                      <td className="px-4 py-3 text-center">{a ? <Check size={16} className="inline text-emerald-500"/> : <X size={16} className="inline text-red-400 opacity-50"/>}</td>
                      <td className="px-4 py-3 text-center">{b ? <Check size={16} className="inline text-emerald-500"/> : <X size={16} className="inline text-red-400 opacity-50"/>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
