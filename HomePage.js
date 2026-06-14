import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Search, ArrowRight, Star, MapPin, TrendingUp, Clock, Heart,
         ChevronLeft, ChevronRight, Play, X, Bell, Gift, Zap } from "lucide-react";
import { properties, testimonials } from "../data/properties";
import PropertyCard from "../components/PropertyCard";
import SearchFilters from "../components/SearchFilters";
import { useScrollReveal } from "../hooks/useScrollReveal";

const trendingSearches = ["Santorini villas","Maldives overwater","Swiss chalets","Bali retreats","Dubai penthouses","Amalfi coast"];

const deals = [
  { label:"Last Minute", desc:"Book within 48hrs", discount:"20% off", icon:"⚡", color:"#FF385C" },
  { label:"Weekly Stay", desc:"7+ nights", discount:"15% off", icon:"📅", color:"#c9a84c" },
  { label:"Early Bird", desc:"60 days ahead", discount:"12% off", icon:"🐦", color:"#10b981" },
];

const travelStyles = [
  { label:"Solo", icon:"🧳", desc:"Perfect solo escapes", img:"https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { label:"Couples", icon:"💑", desc:"Romantic getaways", img:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { label:"Families", icon:"👨‍👩‍👧", desc:"Space for everyone", img:"https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { label:"Groups", icon:"🎉", desc:"Epic group stays", img:"https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
];

export default function HomePage({ darkMode }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filtered, setFiltered]   = useState(properties);
  const [heroSearch, setHeroSearch] = useState(searchParams.get("search") || "");
  const [filters, setFilters]     = useState({});
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone]   = useState(false);
  const [notifyBar, setNotifyBar] = useState(() => localStorage.getItem("airbnb_banner_dismissed") !== "1");
  const [sortBy, setSortBy]       = useState("featured");
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) heroRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Load recently viewed
  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    setRecentlyViewed(properties.filter(p => ids.includes(p.id)).slice(0, 4));
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let result = [...properties];
    const q = (heroSearch || "").toLowerCase();
    if (q) result = result.filter(p =>
      p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) || p.country.toLowerCase().includes(q)
    );
    if (filters.activeCategory && filters.activeCategory !== "all" && filters.activeCategory !== "")
      result = result.filter(p => p.category === filters.activeCategory);
    if (filters.activeRegion && filters.activeRegion !== "All")
      result = result.filter(p => p.region === filters.activeRegion);
    if (filters.maxPrice) result = result.filter(p => p.price <= filters.maxPrice);
    if (filters.minRating) result = result.filter(p => p.rating >= filters.minRating);
    if (filters.destination) result = result.filter(p => p.location.toLowerCase().includes(filters.destination.toLowerCase()));
    if (filters.guests) result = result.filter(p => p.guests >= filters.guests);

    // Sort
    if (sortBy === "price-asc")  result.sort((a,b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a,b) => b.price - a.price);
    if (sortBy === "rating")     result.sort((a,b) => b.rating - a.rating);
    if (sortBy === "reviews")    result.sort((a,b) => b.reviews - a.reviews);

    setFiltered(result);
  }, [heroSearch, filters, sortBy]);

  const featured   = properties.filter(p => p.featured);
  const luxury     = properties.filter(p => p.luxury).slice(0, 4);
  const statsRef        = useScrollReveal();
  const featuredRef     = useScrollReveal();
  const testimonialsRef = useScrollReveal();

  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg   = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";

  return (
    <div className={darkMode ? "bg-obsidian" : "bg-ivory-50"}>

      {/* ── NOTIFICATION BAR ── */}
      {notifyBar && (
        <div className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-3 py-2 px-4 text-xs font-body text-white"
          style={{background:"linear-gradient(90deg,#FF385C,#c9316b)"}}>
          <Gift size={13}/> <span>Summer Sale — Up to 30% off luxury villas this week!</span>
          <Link to="/properties" className="underline font-semibold ml-1">Browse deals →</Link>
          <button onClick={() => { setNotifyBar(false); localStorage.setItem("airbnb_banner_dismissed","1"); }} className="ml-auto opacity-70 hover:opacity-100"><X size={14}/></button>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="relative overflow-hidden flex items-center justify-center" style={{minHeight:"100vh", paddingTop: notifyBar?"88px":"80px"}}>
        <div ref={heroRef} className="absolute inset-0 hero-bg" style={{top:"-20%",bottom:"-20%"}}>
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Luxury villa" className="w-full h-full object-cover"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
          <div className="absolute inset-0" style={{background:"linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.55) 60%,rgba(0,0,0,0.8) 100%)"}}/>
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse at 50% 100%,rgba(201,168,76,0.08) 0%,transparent 70%)"}}/>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Zap size={12} className="text-gold"/> <span className="font-body text-xs">Over 500 luxury properties worldwide</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] mb-6 animate-fade-up">
            Belong<br/>
            <em className="not-italic font-medium" style={{color:"#FF385C"}}>Anywhere</em><br/>
            You Go
          </h1>

          <p className="font-body text-lg text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
            Find unique places to stay and things to do — hosted by a global community of locals who make travel memorable.
          </p>

          {/* Hero search */}
          <form onSubmit={e => { e.preventDefault(); if(heroSearch.trim()) navigate(`/properties?q=${encodeURIComponent(heroSearch.trim())}`); }}
            className="flex items-center gap-3 max-w-xl mx-auto glass rounded-full px-4 py-3 mb-4">
            <MapPin size={16} className="text-gold flex-shrink-0"/>
            <input value={heroSearch} onChange={e => setHeroSearch(e.target.value)}
              onKeyDown={e => { if(e.key==="Enter" && heroSearch.trim()) navigate(`/properties?q=${encodeURIComponent(heroSearch.trim())}`); }}
              placeholder="Search destinations, villas, retreats…"
              className="flex-1 bg-transparent outline-none font-body text-sm text-white placeholder-white/50"/>
            <button type="submit" className="btn-gold rounded-full py-2 px-5 text-sm flex-shrink-0 flex items-center gap-1.5">
              <Search size={14}/> Search
            </button>
          </form>

          {/* Trending searches */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {trendingSearches.map(t => (
              <button key={t} onClick={() => { setHeroSearch(t); navigate(`/properties?q=${encodeURIComponent(t)}`); }}
                className="flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-body rounded-full px-3 py-1 hover:bg-white/20 transition-colors">
                <TrendingUp size={10}/> {t}
              </button>
            ))}
          </div>

          {/* Stats + Play button */}
          <div className="flex items-center justify-center gap-8 text-white">
            {[{value:"500+",label:"Properties"},{value:"60+",label:"Countries"},{value:"4.9★",label:"Avg Rating"}].map(({value,label}) => (
              <div key={label} className="text-center">
                <p className="font-display text-2xl font-medium text-gold">{value}</p>
                <p className="font-body text-xs text-white/50">{label}</p>
              </div>
            ))}
            <div className="w-px h-10 bg-white/20"/>
            <button onClick={() => setShowVideo(true)}
              className="flex items-center gap-2 text-xs font-body text-white/70 hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center hover:border-gold transition-colors">
                <Play size={14} className="ml-0.5"/>
              </div> Watch tour
            </button>
          </div>
        </div>
      </section>

      {/* ── VIDEO MODAL ── */}
      {showVideo && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
          <button onClick={() => setShowVideo(false)} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10">
            <X size={20}/>
          </button>
          <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative" style={{paddingBottom:"56.25%", background:"#000"}}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/D1MzAMdnoRw?autoplay=1&rel=0&modestbranding=1&color=white"
                title="Airbnb Luxury Property Tour"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{border:"none"}}
              />
            </div>
            <div className="bg-black px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-white font-semibold">Airbnb Luxury Property Tour</p>
                <p className="font-body text-xs text-white/50 mt-0.5">Experience the world's finest stays</p>
              </div>
              <button onClick={() => setShowVideo(false)}
                className="font-body text-xs text-white/50 border border-white/20 px-3 py-1.5 rounded-full hover:border-white/50 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DEALS BANNER ── */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deals.map(d => (
            <button key={d.label} onClick={() => navigate(`/properties?deal=${encodeURIComponent(d.label)}`)}

              className={`flex items-center gap-4 p-5 rounded-2xl border text-left w-full group transition-all hover:-translate-y-0.5 hover:shadow-lg ${cardBg} hover:border-gold/40`}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-110"
                style={{background:`${d.color}18`}}>{d.icon}</div>
              <div className="flex-1">
                <p className={`font-body text-sm font-semibold ${textMain}`}>{d.label}</p>
                <p className={`font-body text-xs ${textSub} mt-0.5`}>{d.desc}</p>
                <p className="font-body text-xs text-gold mt-1">Tap to explore →</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-display text-xl font-light block" style={{color:d.color}}>{d.discount}</span>
                <span className={`font-body text-xs ${textSub}`}>discount</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div ref={featuredRef} className="reveal mb-12 text-center">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">Editor's Choice</p>
          <h2 className={`font-display text-4xl md:text-5xl font-light ${textMain}`}>Featured <em>Stays</em></h2>
          <div className="gold-line mx-auto mt-4"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p,i) => (
            <div key={p.id} className="reveal" style={{transitionDelay:`${i*0.1}s`}}>
              <PropertyCard property={p} darkMode={darkMode}/>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRAVEL STYLES ── */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">Find Your Vibe</p>
          <h2 className={`font-display text-4xl md:text-5xl font-light ${textMain}`}>Travel <em>Your Way</em></h2>
          <div className="gold-line mx-auto mt-4"/>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {travelStyles.map(s => (
            <Link key={s.label} to={`/vibe/${encodeURIComponent(s.label)}`} className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer block">
              <img src={s.img} alt={s.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent"/>
              <div className="absolute bottom-4 left-4">
                <span className="text-2xl">{s.icon}</span>
                <h3 className="font-display text-xl font-light text-ivory mt-1">{s.label}</h3>
                <p className="font-body text-xs text-ivory/60">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── LUXURY PICKS ── */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-1">Premium Collection</p>
            <h2 className={`font-display text-3xl font-light ${textMain}`}>Luxury <em>Picks</em></h2>
          </div>
          <Link to="/properties" className="flex items-center gap-1 font-body text-sm text-gold hover:underline">
            View all <ArrowRight size={14}/>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {luxury.map(p => <PropertyCard key={p.id} property={p} darkMode={darkMode}/>)}
        </div>
      </section>

      {/* ── SEARCH & ALL PROPERTIES ── */}
      <section className="py-10 px-4 max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">Discover</p>
          <h2 className={`font-display text-4xl md:text-5xl font-light ${textMain}`}>All <em>Properties</em></h2>
          <div className="gold-line mx-auto mt-4 mb-8"/>
        </div>
        <div className="mb-8">
          <SearchFilters onFilter={setFilters} darkMode={darkMode}/>
        </div>

        {/* Sort + Results count */}
        <div className="flex items-center justify-between mb-5">
          <p className={`font-body text-sm ${textSub}`}>
            {filtered.length} propert{filtered.length !== 1 ? "ies" : "y"} found
          </p>
          <div className="flex items-center gap-2">
            <span className={`font-body text-xs ${textSub}`}>Sort by:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className={`lux-input text-xs px-3 py-2 ${darkMode?"text-ivory":"text-obsidian"}`}
              style={{background: darkMode?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.9)"}}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-3xl text-gold mb-3">No properties found</p>
            <p className={`font-body text-sm ${textSub} mb-4`}>Try adjusting your search filters.</p>
            <button onClick={() => { setFilters({}); setHeroSearch(""); }}
              className="btn-gold rounded-full text-sm">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p,i) => (
              <div key={p.id} className="reveal" style={{transitionDelay:`${(i%8)*0.07}s`}}>
                <PropertyCard property={p} darkMode={darkMode}/>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── RECENTLY VIEWED ── */}
      {recentlyViewed.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-1">Continue Exploring</p>
              <h2 className={`font-display text-3xl font-light ${textMain}`}>Recently <em>Viewed</em></h2>
            </div>
            <Clock size={18} className="text-gold"/>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {recentlyViewed.map(p => <PropertyCard key={p.id} property={p} darkMode={darkMode}/>)}
          </div>
        </section>
      )}

      {/* ── EXPLORE LOCATIONS ── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="reveal mb-12 text-center">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">Around the World</p>
          <h2 className={`font-display text-4xl md:text-5xl font-light ${textMain}`}>Explore <em>Locations</em></h2>
          <div className="gold-line mx-auto mt-4"/>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <Link to="/destination/santorini" className="lg:col-span-2 relative rounded-3xl overflow-hidden h-80 group cursor-pointer block">
            <img src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Santorini"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent"/>
            <div className="absolute bottom-6 left-6">
              <p className="font-body text-xs text-gold uppercase tracking-widest mb-1">Europe</p>
              <h3 className="font-display text-3xl font-light text-ivory">Santorini</h3>
              <p className="font-body text-sm text-ivory/60 mt-1">24 properties available</p>
            </div>
          </Link>
          <div className="flex flex-col gap-4">
            {[
              {name:"Maldives",region:"Asia",img:"https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"},
              {name:"Tuscany",region:"Europe",img:"https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"},
            ].map(loc => (
              <Link key={loc.name} to={`/destination/${loc.name.toLowerCase()}`} className="relative rounded-3xl overflow-hidden h-[152px] group cursor-pointer block">
                <img src={loc.img} alt={loc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent"/>
                <div className="absolute bottom-4 left-4">
                  <p className="font-body text-xs text-gold uppercase tracking-widest mb-0.5">{loc.region}</p>
                  <h3 className="font-display text-xl font-light text-ivory">{loc.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {name:"Bali",region:"Asia",count:"38 properties",img:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"},
            {name:"Amalfi Coast",region:"Europe",count:"19 properties",img:"https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"},
            {name:"Dubai",region:"Middle East",count:"31 properties",img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"},
            {name:"Kyoto",region:"Asia",count:"22 properties",img:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"},
          ].map(loc => (
            <Link key={loc.name} to={`/destination/${loc.name.toLowerCase().replace(" ","-")}`} className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer block">
              <img src={loc.img} alt={loc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/10 to-transparent"/>
              <div className="absolute bottom-4 left-4">
                <p className="font-body text-xs text-gold uppercase tracking-widest mb-0.5">{loc.region}</p>
                <h3 className="font-display text-lg font-light text-ivory">{loc.name}</h3>
                <p className="font-body text-xs text-ivory/50 mt-0.5">{loc.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section ref={statsRef} className="reveal py-20 my-16 mx-4 rounded-3xl relative overflow-hidden"
        style={{background:"linear-gradient(135deg,#2c3340 0%,#1a2030 100%)"}}>
        <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse at 30% 50%,rgba(201,168,76,0.12) 0%,transparent 60%)"}}/>
        <div className="relative max-w-5xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[{value:"500+",label:"Luxury Properties"},{value:"60+",label:"Countries"},{value:"12K+",label:"Happy Guests"},{value:"4.97",label:"Average Rating"}].map(({value,label}) => (
            <div key={label}>
              <p className="font-display text-4xl md:text-5xl font-light text-gold mb-2">{value}</p>
              <p className="font-body text-sm text-ivory/60">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS (auto-carousel) ── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div ref={testimonialsRef} className="reveal mb-12 text-center">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">Guest Stories</p>
          <h2 className={`font-display text-4xl md:text-5xl font-light ${textMain}`}>What Guests <em>Say</em></h2>
          <div className="gold-line mx-auto mt-4"/>
        </div>

        {/* Auto carousel */}
        <div className="relative max-w-2xl mx-auto mb-6">
          <div className={`rounded-2xl p-8 border text-center ${cardBg}`}>
            <div className="flex justify-center mb-4">
              {Array.from({length:testimonials[testimonialIdx]?.rating||5}).map((_,j) => (
                <Star key={j} size={16} className="text-gold fill-gold"/>
              ))}
            </div>
            <p className={`font-display text-xl font-light leading-relaxed mb-6 ${textMain}`}>
              "{testimonials[testimonialIdx]?.text}"
            </p>
            <div className="flex items-center justify-center gap-3">
              <img src={testimonials[testimonialIdx]?.avatar} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
              <div className="text-left">
                <p className={`font-body text-sm font-semibold ${textMain}`}>{testimonials[testimonialIdx]?.name}</p>
                <p className="font-body text-xs text-gold">{testimonials[testimonialIdx]?.location}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-4">
            <button onClick={() => setTestimonialIdx(i => (i-1+testimonials.length)%testimonials.length)}
              className="w-8 h-8 rounded-full border border-gold/30 text-gold flex items-center justify-center hover:bg-gold/10 transition-colors">
              <ChevronLeft size={14}/>
            </button>
            {testimonials.map((_,i) => (
              <button key={i} onClick={() => setTestimonialIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${i===testimonialIdx?"bg-gold w-4":"bg-gold/30"}`}/>
            ))}
            <button onClick={() => setTestimonialIdx(i => (i+1)%testimonials.length)}
              className="w-8 h-8 rounded-full border border-gold/30 text-gold flex items-center justify-center hover:bg-gold/10 transition-colors">
              <ChevronRight size={14}/>
            </button>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <div className={`rounded-3xl border p-10 ${cardBg}`}>
          <Bell size={28} className="text-gold mx-auto mb-4"/>
          <h2 className={`font-display text-3xl font-light ${textMain} mb-2`}>Never Miss a <em>Deal</em></h2>
          <p className={`font-body text-sm ${textSub} mb-6`}>Get exclusive offers, new property alerts and travel inspiration delivered to your inbox.</p>
          {newsletterDone ? (
            <div className="flex items-center justify-center gap-2 text-gold font-body text-sm">
              ✓ You're subscribed! Welcome to the club.
            </div>
          ) : (
            <div className="flex gap-2 max-w-md mx-auto">
              <input value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com" type="email"
                className={`lux-input flex-1 text-sm ${darkMode?"text-ivory":"text-obsidian"}`}
                style={{background:darkMode?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.9)"}}/>
              <button onClick={() => { if(newsletterEmail) setNewsletterDone(true); }}
                className="btn-gold rounded-lg px-5 text-sm flex-shrink-0">
                Subscribe
              </button>
            </div>
          )}
          <p className={`font-body text-xs ${textSub} mt-3`}>No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center">
        <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-4">For Property Owners</p>
        <h2 className={`font-display text-4xl md:text-6xl font-light ${textMain} mb-4`}>
          Share Your<br/><em style={{color:"#FF385C"}}>Space</em> with the World
        </h2>
        <p className={`font-body text-base ${textSub} max-w-xl mx-auto mb-10`}>
          Turn your extra space into extra income. Join millions of hosts who share their homes and earn money doing it.
        </p>
        <Link to="/host" className="btn-gold rounded-full text-base px-8 py-4">
          Become a Host <ArrowRight size={18}/>
        </Link>
      </section>

      {/* ── AI TOOLS SECTION ── */}
      <section className={`py-20 px-6 ${darkMode ? "bg-[#141414]" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-2">New Features</p>
            <h2 className={`font-display text-4xl font-light ${darkMode?"text-ivory":"text-obsidian"}`}>Smart <em>Travel Tools</em></h2>
            <p className={`font-body text-sm ${darkMode?"text-ivory/50":"text-obsidian/50"} mt-2`}>Everything you need to plan the perfect trip</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { to:"/travel-planner", emoji:"🤖", title:"AI Travel Planner", desc:"Plan your entire trip with Claude AI — itineraries, budgets, tips", color:"#FF385C" },
              { to:"/compare",        emoji:"⚖️", title:"Compare Properties", desc:"Side-by-side comparison of any two properties", color:"#c9a84c" },
              { to:"/currency",       emoji:"💱", title:"Currency Converter", desc:"Check prices in your local currency instantly", color:"#3b82f6" },
              { to:"/weather",        emoji:"🌤️", title:"Weather Guide",     desc:"Best travel seasons for every destination", color:"#22c55e" },
            ].map(tool => (
              <Link key={tool.to} to={tool.to}
                className={`rounded-2xl p-5 border group hover:scale-[1.02] transition-all duration-300 cursor-pointer block ${darkMode?"bg-[#1a1a1a] border-white/8 hover:border-gold/30":"bg-stone-50 border-stone-100 hover:border-gold/40"}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{background:`${tool.color}18`}}>
                  {tool.emoji}
                </div>
                <h3 className={`font-body text-sm font-semibold mb-1 ${darkMode?"text-ivory":"text-obsidian"}`}>{tool.title}</h3>
                <p className={`font-body text-xs ${darkMode?"text-ivory/40":"text-obsidian/40"} leading-relaxed`}>{tool.desc}</p>
                <p className="font-body text-xs font-semibold mt-3" style={{color:tool.color}}>Try now →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
