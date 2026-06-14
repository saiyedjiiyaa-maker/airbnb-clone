import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Star, Calendar, ChevronRight, Thermometer, Cloud, Sun, Wind } from "lucide-react";
import { properties } from "../data/properties";
import PropertyCard from "../components/PropertyCard";

const destinationData = {
  santorini: { name:"Santorini", country:"Greece", region:"Europe", desc:"The jewel of the Cyclades, Santorini dazzles with its iconic blue-domed churches, cliff-perched villages, and the most dramatic sunsets in the world.", hero:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", weather:[{month:"Jun",temp:26,icon:"☀️"},{month:"Jul",temp:28,icon:"☀️"},{month:"Aug",temp:28,icon:"☀️"},{month:"Sep",temp:25,icon:"🌤️"}], tips:["Visit Oia for sunset views","Take a caldera boat tour","Try fava and tomatokeftedes","Book restaurants in advance in July–August"], attractions:["Oia Village","Akrotiri Ruins","Red Beach","Fira Town","Wine Tasting at Santo Winery"] },
  bali: { name:"Bali", country:"Indonesia", region:"Asia", desc:"The Island of the Gods enchants visitors with emerald rice terraces, ancient temples, world-class surf, and a spiritual energy unlike anywhere else on earth.", hero:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", weather:[{month:"May",temp:29,icon:"🌤️"},{month:"Jun",temp:28,icon:"☀️"},{month:"Jul",temp:27,icon:"☀️"},{month:"Aug",temp:27,icon:"☀️"}], tips:["Dress modestly at temples","Avoid plastic-heavy tourist areas","Rent a scooter for flexibility","Visit Ubud for culture, Seminyak for beaches"], attractions:["Tegalalang Rice Terraces","Tanah Lot Temple","Mount Batur","Ubud Monkey Forest","Seminyak Beach"] },
  maldives: { name:"Maldives", country:"Maldives", region:"Asia", desc:"A scattering of 1,200 coral islands across the Indian Ocean, the Maldives offers unparalleled underwater beauty, overwater villas, and absolute luxury solitude.", hero:"https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", weather:[{month:"Jan",temp:29,icon:"☀️"},{month:"Feb",temp:30,icon:"☀️"},{month:"Mar",temp:31,icon:"☀️"},{month:"Apr",temp:31,icon:"☀️"}], tips:["Book overwater villas early — they sell out months ahead","Bring reef-safe sunscreen","Snorkelling beats diving for beginners","Fly to your resort by seaplane for unforgettable views"], attractions:["Manta Point Diving","Bioluminescent Beach","North Malé Atoll","Vaadhoo Island at Night","Whale Shark Snorkelling"] },
  dubai: { name:"Dubai", country:"UAE", region:"Middle East", desc:"A city of superlatives — tallest building, largest mall, most luxurious hotels. Dubai is a vision of the future rising from the desert.", hero:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", weather:[{month:"Oct",temp:33,icon:"🌤️"},{month:"Nov",temp:27,icon:"☀️"},{month:"Dec",temp:22,icon:"☀️"},{month:"Jan",temp:19,icon:"☀️"}], tips:["Visit Oct–April to avoid extreme heat","Dubai Frame is underrated","Al Fahidi Historic District for culture","Dress modestly outside beach areas"], attractions:["Burj Khalifa","Dubai Mall","Palm Jumeirah","Gold & Spice Souk","Desert Safari"] },
  tuscany: { name:"Tuscany", country:"Italy", region:"Europe", desc:"Rolling hills, cypress-lined roads, Renaissance art, and world-class wine — Tuscany is the soul of Italy distilled into one breathtaking region.", hero:"https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", weather:[{month:"May",temp:22,icon:"🌤️"},{month:"Jun",temp:27,icon:"☀️"},{month:"Jul",temp:30,icon:"☀️"},{month:"Sep",temp:25,icon:"🌤️"}], tips:["Rent a car — villages are only accessible by road","Book winery tours in advance","Visit Siena and San Gimignano beyond Florence","Try bistecca alla Fiorentina at a local trattoria"], attractions:["Florence Duomo","Chianti Wine Region","Siena Piazza del Campo","San Gimignano Towers","Val d'Orcia Valley"] },
  kyoto: { name:"Kyoto", country:"Japan", region:"Asia", desc:"Japan's ancient imperial capital, where 1,600 Buddhist temples and 400 Shinto shrines coexist with geisha districts, bamboo groves, and matcha culture.", hero:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", weather:[{month:"Mar",temp:12,icon:"🌸"},{month:"Apr",temp:18,icon:"🌸"},{month:"Oct",temp:20,icon:"🍂"},{month:"Nov",temp:14,icon:"🍁"}], tips:["Visit Fushimi Inari at dawn to avoid crowds","Hire a kimono for the Gion district","Book ryokan (traditional inn) months ahead","IC Card for buses and metro"], attractions:["Fushimi Inari Shrine","Arashiyama Bamboo Grove","Kinkaku-ji Golden Pavilion","Gion Geisha District","Nishiki Market"] },
  "amalfi-coast": { name:"Amalfi Coast", country:"Italy", region:"Europe", desc:"A UNESCO World Heritage coastline of sheer cliffs, pastel-coloured fishing villages, lemon groves, and impossibly blue Mediterranean waters.", hero:"https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", weather:[{month:"Jun",temp:26,icon:"☀️"},{month:"Jul",temp:29,icon:"☀️"},{month:"Aug",temp:30,icon:"☀️"},{month:"Sep",temp:27,icon:"🌤️"}], tips:["Take the ferry between towns — roads are narrow and slow","Stay in Ravello for quiet luxury above the crowds","Try sfogliatella and limoncello locally","Book restaurants well in advance in peak summer"], attractions:["Positano Village","Path of the Gods Hike","Ravello Gardens","Amalfi Cathedral","Blue Grotto Capri"] },
};

export default function DestinationPage({ darkMode }) {
  const { slug } = useParams();
  const dest = destinationData[slug?.toLowerCase()];
  const [activeTab, setActiveTab] = useState("overview");

  const textMain = darkMode ? "text-ivory"    : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg   = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const pageBg   = darkMode ? "bg-obsidian" : "bg-ivory-50";

  const relatedProps = properties.filter(p => dest && (p.city?.toLowerCase()===slug||p.location?.toLowerCase().includes(dest.name.toLowerCase()))).slice(0,4);
  const fallbackProps = properties.slice(0,4);

  if (!dest) return (
    <div className={`${pageBg} min-h-screen pt-24 flex items-center justify-center`}>
      <div className="text-center">
        <p className={`font-display text-3xl ${textMain} mb-4`}>Destination not found</p>
        <Link to="/" className="btn-gold rounded-full">Back to Home</Link>
      </div>
    </div>
  );

  return (
    <div className={pageBg}>
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <img src={dest.hero} alt={dest.name} className="w-full h-full object-cover"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
        <div className="absolute inset-0" style={{background:"linear-gradient(to bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.7)"}}/>
        <div className="absolute bottom-12 left-0 right-0 text-center text-white">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-2">{dest.region} · {dest.country}</p>
          <h1 className="font-display text-6xl md:text-8xl font-light mb-4">{dest.name}</h1>
          <Link to="/properties" className="btn-gold rounded-full px-8">Browse Properties →</Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl w-fit" style={{background:darkMode?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)"}}>
          {["overview","weather","tips","properties"].map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-2.5 rounded-lg font-body text-sm capitalize transition-all ${activeTab===t?"bg-gold text-black":`${textSub} hover:text-gold`}`}>{t}</button>
          ))}
        </div>

        {activeTab==="overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className={`font-display text-3xl font-light ${textMain} mb-4`}>About <em>{dest.name}</em></h2>
              <p className={`font-body text-base leading-relaxed ${textSub} mb-8`}>{dest.desc}</p>
              <h3 className={`font-display text-xl font-light ${textMain} mb-4`}>Top Attractions</h3>
              <div className="space-y-2">
                {dest.attractions.map((a,i) => (
                  <div key={a} className={`flex items-center gap-3 p-3 rounded-xl border ${cardBg}`}>
                    <span className="font-display text-2xl text-gold/30 w-8">{i+1}</span>
                    <span className={`font-body text-sm ${textMain}`}>{a}</span>
                    <ChevronRight size={14} className="text-gold ml-auto"/>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className={`rounded-2xl border p-5 ${cardBg} mb-4`}>
                <h3 className={`font-display text-lg ${textMain} mb-3`}>Quick Facts</h3>
                {[{label:"Country",value:dest.country},{label:"Region",value:dest.region},{label:"Best Time",value:"Jun–Sep"},{label:"Currency",value:dest.country==="UAE"?"AED (د.إ)":dest.country==="Indonesia"?"IDR (Rp)":"EUR (€)"},{label:"Language",value:dest.country==="UAE"?"Arabic/English":dest.country==="Indonesia"?"Bahasa/English":"Greek/English"},{label:"Time Zone",value:"UTC+2"},].map(({label,value}) => (
                  <div key={label} className={`flex justify-between py-2 border-b border-gold/5 last:border-0 font-body text-sm`}>
                    <span className={textSub}>{label}</span><span className={`font-medium ${textMain}`}>{value}</span>
                  </div>
                ))}
              </div>
              <Link to="/properties" className="btn-gold w-full rounded-xl py-3 text-sm text-center block">Find Properties in {dest.name}</Link>
            </div>
          </div>
        )}

        {activeTab==="weather" && (
          <div>
            <h2 className={`font-display text-3xl font-light ${textMain} mb-6`}>Best Time to <em>Visit</em></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {dest.weather.map(w => (
                <div key={w.month} className={`rounded-2xl border p-5 text-center ${cardBg}`}>
                  <span className="text-3xl">{w.icon}</span>
                  <p className={`font-display text-2xl text-gold mt-2`}>{w.temp}°C</p>
                  <p className={`font-body text-sm ${textSub}`}>{w.month}</p>
                </div>
              ))}
            </div>
            <div className={`rounded-2xl border p-6 ${cardBg}`}>
              <h3 className={`font-display text-xl ${textMain} mb-4`}>Season Guide</h3>
              <div className="space-y-3">
                {[{season:"Peak Season",months:"Jun–Aug",desc:"Best weather, most activities, book well ahead.",badge:"🔥 Busy"},
                  {season:"Shoulder Season",months:"Apr–May, Sep–Oct",desc:"Fewer crowds, lower prices, great conditions.",badge:"✨ Sweet Spot"},
                  {season:"Off Season",months:"Nov–Mar",desc:"Some closures, but authentic local atmosphere and deals.",badge:"💰 Best Value"},
                ].map(s => (
                  <div key={s.season} className={`flex items-start gap-4 p-4 rounded-xl border ${cardBg}`}>
                    <div className="flex-1"><p className={`font-body text-sm font-semibold ${textMain}`}>{s.season} · {s.months}</p><p className={`font-body text-xs ${textSub} mt-0.5`}>{s.desc}</p></div>
                    <span className="font-body text-xs text-gold border border-gold/30 px-2 py-1 rounded-full whitespace-nowrap">{s.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab==="tips" && (
          <div>
            <h2 className={`font-display text-3xl font-light ${textMain} mb-6`}>Insider <em>Tips</em></h2>
            <div className="space-y-3">
              {dest.tips.map((tip,i) => (
                <div key={i} className={`flex gap-4 p-5 rounded-2xl border ${cardBg}`}>
                  <span className="font-display text-3xl text-gold/20 flex-shrink-0">{i+1}</span>
                  <p className={`font-body text-sm leading-relaxed ${textSub} pt-1`}>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==="properties" && (
          <div>
            <h2 className={`font-display text-3xl font-light ${textMain} mb-6`}>Stays in <em>{dest.name}</em></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {(relatedProps.length > 0 ? relatedProps : fallbackProps).map(p => <PropertyCard key={p.id} property={p} darkMode={darkMode}/>)}
            </div>
            <div className="text-center mt-8">
              <Link to="/properties" className="btn-gold rounded-full px-8">View All Properties</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
