import React, { useState } from "react";
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Search } from "lucide-react";

const DESTINATIONS = {
  "Maldives":     { temp:29, humidity:78, wind:18, condition:"Sunny", icon:"☀️", desc:"Perfect beach weather year-round! Crystal clear skies, warm turquoise waters.", best:"Nov–Apr", feels:31, uv:9 },
  "Santorini":    { temp:22, humidity:55, wind:22, condition:"Partly Cloudy", icon:"⛅", desc:"Mediterranean magic — mild and pleasant. Light breeze from the Aegean.", best:"May–Oct", feels:24, uv:7 },
  "Bali":         { temp:28, humidity:82, wind:14, condition:"Humid & Warm", icon:"🌤️", desc:"Lush tropical paradise. Rainy season Nov–Mar, dry season Apr–Oct.", best:"Apr–Oct", feels:33, uv:8 },
  "Swiss Alps":   { temp:4,  humidity:65, wind:30, condition:"Snowy", icon:"❄️", desc:"Fresh alpine air with beautiful snow-capped peaks. Perfect for skiing!", best:"Dec–Mar", feels:-1, uv:4 },
  "Tuscany":      { temp:18, humidity:60, wind:15, condition:"Mild & Sunny", icon:"🌤️", desc:"Rolling hills bathed in golden light. Perfect for wine tours and countryside walks.", best:"Apr–Jun, Sep–Oct", feels:20, uv:6 },
  "Amalfi Coast": { temp:24, humidity:62, wind:18, condition:"Sunny", icon:"☀️", desc:"Mediterranean sunshine with sea breeze. Ideal for boat trips and cliff walks.", best:"May–Sep", feels:26, uv:8 },
  "Kyoto":        { temp:16, humidity:68, wind:12, condition:"Cherry Blossoms 🌸", icon:"🌸", desc:"Magical spring with cherry blossoms or fiery autumn leaves. Mild and beautiful.", best:"Mar–May, Oct–Nov", feels:17, uv:5 },
  "Dubai":        { temp:38, humidity:40, wind:20, condition:"Hot & Sunny", icon:"🔆", desc:"Very hot summers, pleasant winters Oct–Apr. Desert safari in cool evenings.", best:"Nov–Mar", feels:42, uv:10 },
  "Tokyo":        { temp:14, humidity:65, wind:16, condition:"Mild", icon:"🌤️", desc:"Four distinct seasons. Spring cherry blossoms and autumn foliage are spectacular.", best:"Mar–May, Sep–Nov", feels:15, uv:5 },
  "Paris":        { temp:15, humidity:72, wind:20, condition:"Cloudy", icon:"☁️", desc:"City of light in every season. Spring is magical with blooming gardens.", best:"Apr–Jun, Sep–Oct", feels:13, uv:4 },
};

export default function WeatherPage({ darkMode }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("Maldives");
  const w = DESTINATIONS[selected];

  const filtered = Object.keys(DESTINATIONS).filter(d => d.toLowerCase().includes(search.toLowerCase()));

  const bg = darkMode ? "bg-obsidian" : "bg-stone-50";
  const card = darkMode ? "bg-[#1a1a1a] border-white/8" : "bg-white border-stone-100";
  const txt = darkMode ? "text-ivory" : "text-obsidian";
  const sub = darkMode ? "text-ivory/50" : "text-obsidian/50";

  const tempColor = w.temp > 30 ? "#FF385C" : w.temp > 18 ? "#c9a84c" : "#3b82f6";

  return (
    <div className={`${bg} min-h-screen pt-20`}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className={`font-display text-4xl font-light ${txt}`}>Travel <em>Weather</em></h1>
          <p className={`font-body text-sm ${sub} mt-1`}>Best time to visit your dream destinations</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Destination list */}
          <div className={`rounded-2xl border p-4 ${card}`}>
            <div className="relative mb-3">
              <Search size={13} className={`absolute left-3 top-1/2 -translate-y-1/2 ${sub}`}/>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search destination..."
                className={`w-full pl-8 pr-3 py-2 rounded-xl border text-xs font-body outline-none focus:border-gold ${darkMode?"bg-white/5 border-white/10 text-ivory":"bg-stone-50 border-stone-200 text-obsidian"}`}/>
            </div>
            <div className="space-y-1">
              {filtered.map(dest => (
                <button key={dest} onClick={() => setSelected(dest)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-colors font-body text-sm
                    ${selected===dest ? "text-white font-semibold" : `${txt} hover:bg-gold/10`}`}
                  style={selected===dest ? {background:"#FF385C"} : {}}>
                  <span className="text-base">{DESTINATIONS[dest].icon}</span>
                  <span>{dest}</span>
                  <span className="ml-auto text-xs opacity-70">{DESTINATIONS[dest].temp}°C</span>
                </button>
              ))}
            </div>
          </div>

          {/* Weather display */}
          <div className="md:col-span-2 space-y-4">
            <div className={`rounded-2xl border p-6 ${card}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className={`font-body text-xs uppercase tracking-widest ${sub} mb-1`}>Current Conditions</p>
                  <h2 className={`font-display text-2xl ${txt}`}>{selected}</h2>
                  <p className={`font-body text-sm ${sub}`}>{w.condition}</p>
                </div>
                <span className="text-6xl">{w.icon}</span>
              </div>
              <div className="flex items-end gap-2 mb-4">
                <span className="font-display text-7xl font-light" style={{color:tempColor}}>{w.temp}°</span>
                <span className={`font-body text-lg ${sub} mb-3`}>C</span>
                <span className={`font-body text-sm ${sub} mb-3`}>Feels {w.feels}°C</span>
              </div>
              <p className={`font-body text-sm ${sub}`}>{w.desc}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {icon:"💧", label:"Humidity", val:`${w.humidity}%`},
                {icon:"💨", label:"Wind", val:`${w.wind} km/h`},
                {icon:"☀️", label:"UV Index", val:`${w.uv}/10`},
              ].map(s => (
                <div key={s.label} className={`rounded-xl border p-4 text-center ${card}`}>
                  <span className="text-2xl">{s.icon}</span>
                  <p className={`font-body text-xs ${sub} mt-1`}>{s.label}</p>
                  <p className={`font-body text-lg font-semibold ${txt}`}>{s.val}</p>
                </div>
              ))}
            </div>

            <div className={`rounded-xl border p-4 ${card}`}>
              <p className={`font-body text-xs uppercase tracking-wider ${sub} mb-2`}>Best Time to Visit</p>
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <p className={`font-body text-sm font-semibold ${txt}`}>{w.best}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
