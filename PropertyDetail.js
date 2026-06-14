import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Users, BedDouble, Bath, Wifi, ChevronLeft, Heart, Share2,
  CheckCircle, Shield, ThumbsUp, ChevronRight, Award, Clock, Globe,
  Phone, MessageCircle, Copy, X, ZoomIn } from "lucide-react";
import { properties } from "../data/properties";
import { useAuth } from "../context/AuthContext";
import PropertyCard from "../components/PropertyCard";
import DateRangePicker from "../components/DateRangePicker";
import ReviewsSection from "../components/ReviewsSection";

const amenityIcons = {
  "WiFi":"📶","Pool":"🏊","Beach Access":"🏖️","Kitchen":"🍳","AC":"❄️",
  "Hot Tub":"🛁","Sauna":"🧖","Fireplace":"🔥","Mountain Views":"⛰️","Spa":"💆",
  "Concierge":"🛎️","Butler Service":"🤵","Parking":"🚗","BBQ":"🍖","Gym":"💪",
  "Wine Cellar":"🍷","Private Beach":"🏝️","Ski-in/Ski-out":"⛷️","Yoga Deck":"🧘",
  "Game Room":"🎮","Theater Room":"🎬","Kayaks":"🛶","Breakfast":"🥐","Chef":"👨‍🍳",
};

const mockReviews = [
  { id:1, name:"Alexandra Fontaine", avatar:"https://i.pravatar.cc/80?img=44", location:"London, UK", date:"November 2024", rating:5, text:"Absolutely breathtaking property. The concierge service was impeccable and anticipated every need. Would return without hesitation." },
  { id:2, name:"Marcus Whitfield", avatar:"https://i.pravatar.cc/80?img=55", location:"New York, USA", date:"October 2024", rating:5, text:"This exceeded every expectation. Photos don't do it justice — even more stunning in person. The host was incredibly attentive." },
  { id:3, name:"Yuki Hashimoto", avatar:"https://i.pravatar.cc/80?img=49", location:"Tokyo, Japan", date:"September 2024", rating:5, text:"A once-in-a-lifetime experience. The attention to detail was extraordinary. We're already planning our return visit." },
  { id:4, name:"Sophie Laurent", avatar:"https://i.pravatar.cc/80?img=40", location:"Paris, France", date:"August 2024", rating:4, text:"Beautiful property in an unbeatable location. Minor communication hiccup at arrival but resolved quickly. Highly recommend." },
  { id:5, name:"James O'Brien", avatar:"https://i.pravatar.cc/80?img=18", location:"Dublin, Ireland", date:"July 2024", rating:5, text:"Pure magic. Woke up to the most incredible view every morning. The facilities are world-class and the host is a gem." },
  { id:6, name:"Priya Sharma", avatar:"https://i.pravatar.cc/80?img=63", location:"Mumbai, India", date:"June 2024", rating:5, text:"This is what luxury travel looks like. Nothing was too much trouble. The whole experience felt completely bespoke." },
];

const ratingBreakdown = [
  { label:"Cleanliness", score:4.9 },
  { label:"Accuracy", score:4.8 },
  { label:"Communication", score:4.9 },
  { label:"Location", score:5.0 },
  { label:"Check-in", score:4.7 },
  { label:"Value", score:4.6 },
];

const currencies = [
  { code:"USD", symbol:"$", rate:1 },
  { code:"EUR", symbol:"€", rate:0.92 },
  { code:"GBP", symbol:"£", rate:0.79 },
  { code:"INR", symbol:"₹", rate:83.5 },
  { code:"AED", symbol:"د.إ", rate:3.67 },
  { code:"JPY", symbol:"¥", rate:149 },
];

export default function PropertyDetail({ darkMode }) {
  const { id } = useParams();
  const property = properties.find(p => p.id === Number(id));
  const { wishlist, toggleWishlist, user } = useAuth();
  const [activeImg, setActiveImg]     = useState(0);
  const [checkIn, setCheckIn]         = useState("");
  const [checkOut, setCheckOut]       = useState("");
  const [guests, setGuests]           = useState(1);
  const [booked, setBooked]           = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showShare, setShowShare]     = useState(false);
  const [copied, setCopied]           = useState(false);
  const [lightbox, setLightbox]       = useState(false);
  const [currency, setCurrency]       = useState(currencies[0]);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [reviewText, setReviewText]   = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [userReviews, setUserReviews] = useState([]);
  const [activeTab, setActiveTab]     = useState("overview");

  // Track recently viewed
  useEffect(() => {
    if (!property) return;
    const key = "recentlyViewed";
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = [property.id, ...prev.filter(i => i !== property.id)].slice(0, 6);
    localStorage.setItem(key, JSON.stringify(updated));
  }, [property]);

  if (!property) return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-obsidian text-ivory" : "bg-ivory-50 text-obsidian"}`}>
      <div className="text-center">
        <p className="font-display text-3xl text-gold mb-3">Property not found</p>
        <Link to="/" className="btn-gold rounded-full">Back to Home</Link>
      </div>
    </div>
  );

  const isWished = wishlist.includes(property.id);
  const allImages = property.images?.length ? property.images : [property.img, property.img, property.img];

  const nights = checkIn && checkOut
    ? Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
    : 1;
  const basePrice = property.price * currency.rate;
  const subtotal  = Math.round(basePrice * nights);
  const serviceFee = Math.round(subtotal * 0.12);
  const cleaningFee = Math.round(basePrice * 0.08);
  const total = subtotal + serviceFee + cleaningFee;

  const handleBook = () => {
    if (!user)   { setBookingError("Please sign in to book."); return; }
    if (!checkIn || !checkOut) { setBookingError("Please select check-in and check-out dates."); return; }
    if (new Date(checkOut) <= new Date(checkIn)) { setBookingError("Check-out must be after check-in."); return; }
    setBookingError(""); setBooked(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleReview = () => {
    if (!reviewText.trim()) return;
    setUserReviews(prev => [{
      id: Date.now(), name: user?.name || "You", avatar: "https://i.pravatar.cc/80?img=70",
      location:"Your Location", date:"Just now", rating: reviewRating, text: reviewText,
    }, ...prev]);
    setReviewText(""); setReviewRating(5);
  };

  const similar = properties.filter(p => p.category === property.category && p.id !== property.id).slice(0, 4);
  const amenitiesList = property.amenities || [];
  const visibleAmenities = showAllAmenities ? amenitiesList : amenitiesList.slice(0, 6);
  const allReviews = [...userReviews, ...mockReviews];
  const visibleReviews = showAllReviews ? allReviews : allReviews.slice(0, 3);

  const cardBg  = darkMode ? "bg-obsidian/80 border-gold/10"  : "bg-white border-gold/15";
  const textMain = darkMode ? "text-ivory"    : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const pageBg   = darkMode ? "bg-obsidian"   : "bg-ivory-50";
  const inputStyle = { background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)" };

  const tabs = ["overview","amenities","reviews","location"];

  return (
    <div className={`${pageBg} min-h-screen`}>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white"><X size={28}/></button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            onClick={e => { e.stopPropagation(); setActiveImg(i => (i - 1 + allImages.length) % allImages.length); }}>
            <ChevronLeft size={20}/>
          </button>
          <img src={allImages[activeImg]} alt="" className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl" onClick={e => e.stopPropagation()} />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            onClick={e => { e.stopPropagation(); setActiveImg(i => (i + 1) % allImages.length); }}>
            <ChevronRight size={20}/>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {allImages.map((_,i) => <div key={i} className={`w-2 h-2 rounded-full transition-all ${i===activeImg?"bg-gold w-4":"bg-white/40"}`}/>)}
          </div>
        </div>
      )}

      {/* ── SHARE MODAL ── */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowShare(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"/>
          <div className={`relative rounded-2xl p-6 max-w-sm w-full ${darkMode ? "bg-[#111]" : "bg-white"} shadow-2xl`} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowShare(false)} className="absolute top-4 right-4 text-gold"><X size={18}/></button>
            <h3 className={`font-display text-xl font-light ${textMain} mb-4`}>Share this property</h3>
            <div className="flex flex-col gap-3">
              {[
                { platform: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(window.location.href)}` },
                { platform: "Twitter / X", url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}` },
                { platform: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
              ].map(({ platform, url }) => (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${cardBg} ${textMain} font-body text-sm hover:border-gold transition-colors`}>
                  <Share2 size={14} className="text-gold"/> Share via {platform}
                </a>
              ))}
              <a href={`mailto:?subject=${encodeURIComponent(property.title)}&body=${encodeURIComponent("Check out this property: " + window.location.href)}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${cardBg} ${textMain} font-body text-sm hover:border-gold transition-colors`}>
                <Share2 size={14} className="text-gold"/> Share via Email
              </a>
              <button onClick={handleCopy} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gold text-gold font-body text-sm hover:bg-gold/10 transition-colors">
                <Copy size={14}/> {copied ? "Link copied!" : "Copy link"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">

        {/* Back */}
        <Link to="/properties" className={`inline-flex items-center gap-2 mb-6 font-body text-sm ${textSub} hover:text-gold transition-colors`}>
          <ChevronLeft size={16}/> Back to Properties
        </Link>

        {/* Title Row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {property.luxury && <span className="font-body text-xs font-medium text-gold border border-gold/30 px-2.5 py-0.5 rounded-full">✦ Luxury</span>}
              {property.host?.superhost && <span className={`font-body text-xs border px-2.5 py-0.5 rounded-full ${darkMode?"border-ivory/20 text-ivory/60":"border-obsidian/20 text-obsidian/60"}`}>⭐ Superhost</span>}
              <span className={`font-body text-xs border px-2.5 py-0.5 rounded-full ${darkMode?"border-ivory/20 text-ivory/60":"border-obsidian/20 text-obsidian/60"}`}>{property.category}</span>
            </div>
            <h1 className={`font-display text-3xl md:text-4xl font-medium ${textMain} mb-2`}>{property.title}</h1>
            <div className="flex items-center flex-wrap gap-4">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-gold fill-gold"/>
                <span className={`font-body text-sm font-semibold ${textMain}`}>{property.rating}</span>
                <span className={`font-body text-sm ${textSub}`}>({property.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={13} className="text-gold"/>
                <span className={`font-body text-sm ${textSub}`}>{property.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Currency switcher */}
            <select value={currency.code} onChange={e => setCurrency(currencies.find(c => c.code === e.target.value))}
              className={`lux-input text-xs px-3 py-2 ${darkMode?"text-ivory":"text-obsidian"}`} style={inputStyle}>
              {currencies.map(c => <option key={c.code} value={c.code}>{c.code} {c.symbol}</option>)}
            </select>
            <button onClick={() => toggleWishlist(property.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-body text-sm ${isWished?"bg-gold border-gold text-black":"border-gold/30 text-gold hover:border-gold"}`}>
              <Heart size={14} fill={isWished?"currentColor":"none"}/> {isWished?"Saved":"Save"}
            </button>
            <button onClick={() => setShowShare(true)} className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 text-gold hover:border-gold transition-all font-body text-sm">
              <Share2 size={14}/> Share
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 rounded-2xl overflow-hidden">
          <div className="md:col-span-2 aspect-[4/3] cursor-zoom-in relative group" onClick={() => { setActiveImg(0); setLightbox(true); }}>
            <img src={allImages[activeImg]} alt={property.title} className="w-full h-full object-cover"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity"/>
            </div>
          </div>
          <div className="hidden md:grid grid-rows-2 gap-3">
            {[1,2].map(i => (
              <div key={i} className="overflow-hidden cursor-zoom-in relative group" onClick={() => { setActiveImg(i); setLightbox(true); }}>
                <img src={allImages[i] || allImages[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
              </div>
            ))}
          </div>
          <button onClick={() => setLightbox(true)}
            className="absolute bottom-4 right-4 bg-white/90 text-obsidian font-body text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md hover:bg-white transition-colors">
            <ZoomIn size={13}/> View all photos
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {allImages.map((img,i) => (
            <button key={i} onClick={() => setActiveImg(i)}
              className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImg===i?"border-gold":"border-transparent opacity-60 hover:opacity-100"}`}>
              <img src={img} alt="" className="w-full h-full object-cover"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
            </button>
          ))}
        </div>

        {/* ── TABS ── */}
        <div className={`flex gap-0 mb-8 border-b ${darkMode?"border-white/10":"border-stone-200"}`}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 font-body text-sm capitalize transition-all border-b-2 -mb-px ${
                activeTab===tab ? "border-gold text-gold" : `border-transparent ${textSub} hover:text-gold`
              }`}>{tab}</button>
          ))}
        </div>

        {/* Main Content + Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* ── OVERVIEW TAB ── */}
            {activeTab === "overview" && <>
              {/* Quick stats */}
              <div className={`grid grid-cols-3 gap-4 rounded-2xl border p-5 ${cardBg}`}>
                {[
                  { icon:Users, label:"Max Guests", val:`${property.guests} guests` },
                  { icon:BedDouble, label:"Bedrooms", val:`${property.bedrooms} bed${property.bedrooms>1?"s":""}` },
                  { icon:Bath, label:"Bathrooms", val:`${property.bathrooms} bath${property.bathrooms>1?"s":""}` },
                ].map(({icon:Icon,label,val}) => (
                  <div key={label} className="text-center">
                    <Icon size={20} className="text-gold mx-auto mb-1"/>
                    <p className={`font-body text-xs ${textSub} mb-0.5`}>{label}</p>
                    <p className={`font-body text-sm font-semibold ${textMain}`}>{val}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className={`font-display text-2xl font-medium ${textMain} mb-4`}>About this property</h3>
                <p className={`font-body text-sm leading-relaxed ${textSub}`}>{property.description}</p>
                <p className={`font-body text-sm leading-relaxed ${textSub} mt-3`}>
                  This {property.type?.toLowerCase()} offers an unparalleled escape in {property.city}, {property.country}.
                  Guests enjoy exclusive access to world-class amenities, with our dedicated concierge team available around the clock.
                  Whether you're celebrating a milestone or simply craving the finest in luxury travel, this property delivers an experience that lingers long after checkout.
                </p>
              </div>

              {/* Top amenities preview */}
              <div>
                <h3 className={`font-display text-2xl font-medium ${textMain} mb-4`}>Top Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {visibleAmenities.map(a => (
                    <div key={a} className={`flex items-center gap-2.5 p-3 rounded-xl border ${cardBg}`}>
                      <span className="text-base">{amenityIcons[a] || "✓"}</span>
                      <span className={`font-body text-sm ${textMain}`}>{a}</span>
                    </div>
                  ))}
                </div>
                {amenitiesList.length > 6 && (
                  <button onClick={() => { setShowAllAmenities(!showAllAmenities); setActiveTab("amenities"); }}
                    className={`mt-4 font-body text-sm text-gold hover:underline flex items-center gap-1`}>
                    Show all {amenitiesList.length} amenities <ChevronRight size={14}/>
                  </button>
                )}
              </div>

              {/* Host */}
              <div className={`rounded-2xl border p-6 ${cardBg}`}>
                <h3 className={`font-display text-2xl font-medium ${textMain} mb-4`}>Meet your host</h3>
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <img src={property.host?.avatar} alt={property.host?.name} className="w-16 h-16 rounded-full object-cover border-2 border-gold/30"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                    {property.host?.superhost && <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center text-xs">⭐</div>}
                  </div>
                  <div className="flex-1">
                    <p className={`font-body font-semibold ${textMain} text-base`}>{property.host?.name}</p>
                    {property.host?.superhost && <span className="font-body text-xs text-gold">✦ Superhost · {property.host?.years} years hosting</span>}
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="text-gold fill-gold"/>
                      <span className={`font-body text-sm ${textSub}`}>{property.host?.rating} host rating</span>
                    </div>
                    <div className="flex gap-3 mt-3">
                      <button className="flex items-center gap-1.5 text-xs font-body text-gold border border-gold/30 px-3 py-1.5 rounded-full hover:bg-gold/10 transition-colors">
                        <MessageCircle size={12}/> Message
                      </button>
                      <button className="flex items-center gap-1.5 text-xs font-body text-gold border border-gold/30 px-3 py-1.5 rounded-full hover:bg-gold/10 transition-colors">
                        <Phone size={12}/> Call
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-body text-gold">
                      <Shield size={12}/> Identity verified · Superhost
                    </div>
                  </div>
                </div>
              </div>

              {/* House Rules */}
              <div className={`rounded-2xl border p-6 ${cardBg}`}>
                <h3 className={`font-display text-2xl font-medium ${textMain} mb-4`}>House Rules</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon:"🕐", rule:"Check-in after 3:00 PM" },
                    { icon:"🕙", rule:"Checkout before 11:00 AM" },
                    { icon:"🚭", rule:"No smoking on premises" },
                    { icon:"🐾", rule:"No pets allowed" },
                    { icon:"🎉", rule:"No parties or events" },
                    { icon:"👤", rule:"Max " + property.guests + " guests" },
                  ].map(({icon,rule}) => (
                    <div key={rule} className="flex items-center gap-2.5">
                      <span className="text-base">{icon}</span>
                      <span className={`font-body text-sm ${textSub}`}>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>}

            {/* ── AMENITIES TAB ── */}
            {activeTab === "amenities" && (
              <div>
                <h3 className={`font-display text-2xl font-medium ${textMain} mb-6`}>All Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenitiesList.map(a => (
                    <div key={a} className={`flex items-center gap-3 p-4 rounded-xl border ${cardBg}`}>
                      <span className="text-xl">{amenityIcons[a] || "✓"}</span>
                      <span className={`font-body text-sm font-medium ${textMain}`}>{a}</span>
                    </div>
                  ))}
                </div>

                {/* What's not included */}
                <div className="mt-8">
                  <h4 className={`font-display text-lg font-light ${textMain} mb-4`}>Not available</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 opacity-50">
                    {["Elevator","Crib","EV Charger"].map(a => (
                      <div key={a} className={`flex items-center gap-3 p-4 rounded-xl border ${cardBg} line-through`}>
                        <X size={14} className={textSub}/><span className={`font-body text-sm ${textSub}`}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── REVIEWS TAB ── */}
            {activeTab === "reviews" && (
              <ReviewsSection property={property} darkMode={darkMode} mockReviews={mockReviews} />
            )}

            {/* ── LOCATION TAB ── */}
            {activeTab === "location" && (
              <div>
                <h3 className={`font-display text-2xl font-medium ${textMain} mb-4`}>Where you'll be</h3>
                <p className={`font-body text-sm ${textSub} mb-4`}>{property.location}</p>

                {/* Map placeholder */}
                <div className={`rounded-2xl overflow-hidden border ${cardBg} mb-6`} style={{height:320}}>
                  <div className="relative w-full h-full flex items-center justify-center"
                    style={{background: darkMode ? "linear-gradient(135deg,#1a1a2e,#16213e)" : "linear-gradient(135deg,#e8f4f8,#d4e6f1)"}}>
                    <div className="text-center">
                      <MapPin size={40} className="text-gold mx-auto mb-3"/>
                      <p className={`font-display text-xl font-light ${textMain}`}>{property.city}</p>
                      <p className={`font-body text-sm ${textSub}`}>{property.country}</p>
                    </div>
                    {/* Decorative grid */}
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage:`linear-gradient(${darkMode?"rgba(201,168,76,0.3)":"rgba(0,0,0,0.1)"} 1px,transparent 1px),linear-gradient(90deg,${darkMode?"rgba(201,168,76,0.3)":"rgba(0,0,0,0.1)"} 1px,transparent 1px)`,
                      backgroundSize:"40px 40px"
                    }}/>
                  </div>
                </div>

                {/* Nearby */}
                <h4 className={`font-display text-lg font-light ${textMain} mb-4`}>What's nearby</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {place:"Airport", dist:"35 min drive", icon:"✈️"},
                    {place:"City Center", dist:"15 min drive", icon:"🏙️"},
                    {place:"Beach / Waterfront", dist:"5 min walk", icon:"🏖️"},
                    {place:"Restaurants", dist:"2 min walk", icon:"🍽️"},
                    {place:"Supermarket", dist:"10 min drive", icon:"🛒"},
                    {place:"Hospital", dist:"20 min drive", icon:"🏥"},
                  ].map(({place,dist,icon}) => (
                    <div key={place} className={`flex items-center gap-3 p-3 rounded-xl border ${cardBg}`}>
                      <span className="text-base">{icon}</span>
                      <div>
                        <p className={`font-body text-sm font-medium ${textMain}`}>{place}</p>
                        <p className={`font-body text-xs ${textSub}`}>{dist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ── BOOKING PANEL ── */}
          <div className="lg:col-span-1">
            <div className={`sticky top-24 rounded-2xl border p-6 ${cardBg}`}>
              {booked ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-gold"/>
                  </div>
                  <h3 className={`font-display text-2xl font-medium ${textMain} mb-2`}>Booking Confirmed!</h3>
                  <p className={`font-body text-sm ${textSub} mb-2`}>{checkIn} → {checkOut}</p>
                  <p className={`font-body text-sm ${textSub} mb-4`}>{guests} guest{guests>1?"s":""}</p>
                  <p className="font-display text-2xl font-medium text-gold mb-1">{currency.symbol}{total.toLocaleString()}</p>
                  <p className={`font-body text-xs ${textSub} mb-4`}>Total inc. fees</p>
                  <p className={`font-body text-xs ${textSub} bg-gold/10 rounded-lg p-3`}>
                    Confirmation sent to your email. Our concierge will reach out within 24 hours.
                  </p>
                  <button onClick={() => setBooked(false)} className="mt-4 font-body text-sm text-gold hover:underline">
                    Book another date
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`font-display text-3xl font-medium ${textMain}`}>{currency.symbol}{Math.round(basePrice).toLocaleString()}</span>
                    <span className={`font-body text-sm ${textSub}`}>/night</span>
                  </div>
                  <div className="flex items-center gap-1 mb-5">
                    <Star size={12} className="text-gold fill-gold"/>
                    <span className={`font-body text-xs font-semibold ${textMain}`}>{property.rating}</span>
                    <span className={`font-body text-xs ${textSub}`}>· {property.reviews} reviews</span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <label className={`font-body text-xs font-medium ${textSub} uppercase tracking-wider block mb-1`}>Dates</label>
                      <DateRangePicker
                        checkIn={checkIn}
                        checkOut={checkOut}
                        onChange={(inDate, outDate) => { setCheckIn(inDate); setCheckOut(outDate); }}
                        darkMode={darkMode}
                      />
                    </div>
                    <div>
                      <label className={`font-body text-xs font-medium ${textSub} uppercase tracking-wider block mb-1`}>Guests</label>
                      <select value={guests} onChange={e => setGuests(Number(e.target.value))}
                        className={`lux-input text-sm ${darkMode?"text-ivory":"text-obsidian"}`} style={inputStyle}>
                        {Array.from({length:property.guests},(_,i)=>i+1).map(n => (
                          <option key={n} value={n}>{n} Guest{n>1?"s":""}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {bookingError && <p className="font-body text-xs text-red-400 mb-3">{bookingError}</p>}

                  {/* Price breakdown */}
                  {checkIn && checkOut && (
                    <div className="space-y-2 mb-4 pt-4 border-t border-gold/10">
                      <div className={`flex justify-between font-body text-sm ${textSub}`}>
                        <span>{currency.symbol}{Math.round(basePrice)} × {nights} night{nights>1?"s":""}</span>
                        <span>{currency.symbol}{subtotal.toLocaleString()}</span>
                      </div>
                      <div className={`flex justify-between font-body text-sm ${textSub}`}>
                        <span>Cleaning fee</span><span>{currency.symbol}{cleaningFee.toLocaleString()}</span>
                      </div>
                      <div className={`flex justify-between font-body text-sm ${textSub}`}>
                        <span>Service fee</span><span>{currency.symbol}{serviceFee.toLocaleString()}</span>
                      </div>
                      <div className={`flex justify-between font-body text-sm font-semibold pt-2 border-t border-gold/10 ${textMain}`}>
                        <span>Total</span><span className="text-gold">{currency.symbol}{total.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <button onClick={handleBook} className="btn-gold w-full rounded-xl py-3.5 text-sm justify-center mb-2">
                    Reserve Now
                  </button>
                  <Link to={`/book/${property.id}`} className="block w-full py-3.5 rounded-xl font-body text-sm font-semibold text-center border border-gold/30 text-gold hover:bg-gold/10 transition-colors">
                    ✦ Instant Book
                  </Link>
                  <p className={`font-body text-xs text-center ${textSub} mt-2`}>You won't be charged yet</p>

                  <div className="mt-4 pt-4 border-t border-gold/10 space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield size={12} className="text-gold"/>
                      <span className={`font-body text-xs ${textSub}`}>Airbnb Cover Guarantee included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={12} className="text-gold"/>
                      <span className={`font-body text-xs ${textSub}`}>Free cancellation within 48 hrs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-gold"/>
                      <span className={`font-body text-xs ${textSub}`}>24/7 concierge support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe size={12} className="text-gold"/>
                      <span className={`font-body text-xs ${textSub}`}>Instant confirmation</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── SIMILAR PROPERTIES ── */}
        {similar.length > 0 && (
          <div className="mt-16">
            <div className="mb-8">
              <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-2">You May Also Like</p>
              <h2 className={`font-display text-3xl font-light ${textMain}`}>Similar <em>Properties</em></h2>
              <div className="gold-line mt-3"/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similar.map(p => <PropertyCard key={p.id} property={p} darkMode={darkMode}/>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
