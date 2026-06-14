import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, MapPin, Users, BedDouble, Bath, Eye, Share2, Zap } from "lucide-react";
import SafeImage from "./SafeImage";
import { useAuth } from "../context/AuthContext";

export default function PropertyCard({ property, darkMode }) {
  const { wishlist, toggleWishlist, user } = useAuth();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered]     = useState(false);
  const [imgIdx, setImgIdx]       = useState(0);
  const [showQuick, setShowQuick] = useState(false);
  const isWished = wishlist.includes(property.id);

  const images = property.images?.length ? property.images : [property.img];

  const handleWishlist = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!user) return;
    toggleWishlist(property.id);
  };

  const handleShare = (e) => {
    e.preventDefault(); e.stopPropagation();
    navigator.clipboard?.writeText(`${window.location.origin}/property/${property.id}`);
  };

  const cardBg = darkMode ? "bg-obsidian/80 border-gold/10" : "bg-white border-stone-100";

  return (
    <Link to={`/property/${property.id}`}
      className={`luxury-card block rounded-2xl overflow-hidden border ${cardBg} group relative`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setImgIdx(0); }}>

      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <SafeImage
          src={images[imgIdx] || property.img}
          alt={property.title}
          className={`absolute inset-0 w-full h-full transition-transform duration-700 ${hovered?"scale-110":"scale-100"}`}
          style={{transition:"transform 0.7s ease"}}
        />
        <div className="img-overlay absolute inset-0"/>

        {/* Image dots — show on hover if multiple images */}
        {images.length > 1 && hovered && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_,i) => (
              <button key={i} onClick={e => { e.preventDefault(); e.stopPropagation(); setImgIdx(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i===imgIdx?"bg-white w-3":"bg-white/50"}`}/>
            ))}
          </div>
        )}

        {/* Prev / Next arrows on hover */}
        {images.length > 1 && hovered && (
          <>
            <button onClick={e => { e.preventDefault(); e.stopPropagation(); setImgIdx(i => (i-1+images.length)%images.length); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center text-xs hover:bg-black/60 z-10">‹</button>
            <button onClick={e => { e.preventDefault(); e.stopPropagation(); setImgIdx(i => (i+1)%images.length); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center text-xs hover:bg-black/60 z-10">›</button>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap max-w-[65%]">
          {property.luxury && <span className="glass text-xs font-body font-medium text-gold px-2.5 py-1 rounded-full">✦ Luxury</span>}
          {property.host?.superhost && <span className="glass text-xs font-body font-medium text-ivory px-2.5 py-1 rounded-full">Superhost</span>}
          {property.featured && <span className="font-body text-xs font-medium px-2.5 py-1 rounded-full" style={{background:"#FF385C",color:"white"}}>⚡ Featured</span>}
        </div>

        {/* Action buttons top-right */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <button onClick={handleWishlist}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isWished?"bg-gold":"glass hover:bg-gold/30"}`}>
            <Heart size={15} className={isWished?"text-black fill-black":"text-white"} fill={isWished?"currentColor":"none"}/>
          </button>
          <button onClick={handleShare} className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100">
            <Share2 size={13} className="text-white"/>
          </button>
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <span className="glass text-white font-body text-sm font-semibold px-3 py-1.5 rounded-full">
            ${property.price}<span className="font-normal text-xs opacity-80"> /night</span>
          </span>
        </div>

        {/* Quick view button */}
        <div className={`absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity`}>
          <button onClick={e => { e.preventDefault(); e.stopPropagation(); setShowQuick(true); }}
            className="glass text-white font-body text-xs px-2.5 py-1.5 rounded-full flex items-center gap-1 hover:bg-white/20 transition-colors">
            <Eye size={11}/> Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 ${darkMode?"text-ivory":"text-obsidian"}`}>
        <div className="flex items-center gap-1 mb-1">
          <MapPin size={11} className="text-gold flex-shrink-0"/>
          <span className={`font-body text-xs ${darkMode?"text-ivory/50":"text-obsidian/50"} truncate`}>{property.location}</span>
        </div>
        <h3 className="font-display text-lg font-medium leading-tight mb-2 line-clamp-2 group-hover:text-gold transition-colors">{property.title}</h3>
        <div className={`flex items-center gap-3 mb-3 text-xs font-body ${darkMode?"text-ivory/50":"text-obsidian/50"}`}>
          <span className="flex items-center gap-1"><Users size={11}/>{property.guests}</span>
          <span className="flex items-center gap-1"><BedDouble size={11}/>{property.bedrooms} bed{property.bedrooms>1?"s":""}</span>
          <span className="flex items-center gap-1"><Bath size={11}/>{property.bathrooms} bath</span>
        </div>

        {/* Top amenities */}
        {property.amenities?.length > 0 && (
          <div className="flex gap-1.5 mb-3 flex-wrap">
            {property.amenities.slice(0,3).map(a => (
              <span key={a} className={`font-body text-xs px-2 py-0.5 rounded-full ${darkMode?"bg-white/5 text-ivory/50":"bg-stone-100 text-obsidian/50"}`}>{a}</span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star size={13} className="text-gold fill-gold"/>
            <span className={`font-body text-sm font-semibold ${darkMode?"text-ivory":"text-obsidian"}`}>{property.rating}</span>
            <span className={`font-body text-xs ${darkMode?"text-ivory/40":"text-obsidian/40"}`}>({property.reviews})</span>
          </div>
          <span className={`font-body text-xs px-2 py-0.5 rounded-full border ${darkMode?"border-gold/20 text-gold/70":"border-gold/30 text-gold"}`}>{property.type}</span>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuick && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowQuick(false)}>
          <div className={`relative rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden ${darkMode?"bg-[#0f0f0f]":"bg-white"}`} onClick={e => e.stopPropagation()}>
            <img src={property.img} alt={property.title} className="w-full h-52 object-cover"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
            <div className="p-6">
              <h3 className={`font-display text-2xl font-medium ${darkMode?"text-ivory":"text-obsidian"} mb-1`}>{property.title}</h3>
              <p className={`font-body text-sm mb-3 ${darkMode?"text-ivory/60":"text-obsidian/60"}`}>{property.location}</p>
              <div className={`grid grid-cols-3 gap-3 mb-4 font-body text-sm ${darkMode?"text-ivory/60":"text-obsidian/60"}`}>
                <div className="text-center"><p className="text-gold font-semibold">${property.price}</p><p className="text-xs">per night</p></div>
                <div className="text-center"><p className="text-gold font-semibold">{property.rating}⭐</p><p className="text-xs">{property.reviews} reviews</p></div>
                <div className="text-center"><p className="text-gold font-semibold">{property.guests}</p><p className="text-xs">guests max</p></div>
              </div>
              <p className={`font-body text-sm leading-relaxed mb-4 ${darkMode?"text-ivory/60":"text-obsidian/60"}`}>{property.description}</p>
              <div className="flex gap-2">
                <Link to={`/property/${property.id}`} className="btn-gold flex-1 rounded-xl py-3 text-sm text-center">View Full Details</Link>
                <button onClick={handleWishlist}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${isWished?"bg-gold border-gold":"border-gold/30"}`}>
                  <Heart size={16} className={isWished?"text-black fill-black":"text-gold"} fill={isWished?"currentColor":"none"}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
