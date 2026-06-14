import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Phone, MapPin, Edit2, CheckCircle, Plane, Star, Calendar,
  Shield, Award, Globe, Camera, Heart, MessageSquare, Settings, ChevronRight,
  Download, Share2, Clock, Bookmark, Bell, Lock, CreditCard, Trash2, Plus } from "lucide-react";
import { properties } from "../data/properties";
import PropertyCard from "../components/PropertyCard";

const achievements = [
  { icon:"🌍", label:"World Traveler", desc:"10+ countries visited", unlocked:true },
  { icon:"⭐", label:"5-Star Guest", desc:"Always rated 5 stars", unlocked:true },
  { icon:"🔥", label:"Loyal Explorer", desc:"5+ trips booked", unlocked:true },
  { icon:"💎", label:"Luxury Lover", desc:"3+ luxury stays", unlocked:false },
  { icon:"🏆", label:"Top Reviewer", desc:"10+ helpful reviews", unlocked:false },
  { icon:"🚀", label:"Early Adopter", desc:"Member since 2022", unlocked:true },
];

export function ProfilePage({ darkMode }) {
  const { user, logout, wishlist } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [name, setName]   = useState(user?.name || "");
  const [bio, setBio]     = useState(user?.bio || "");
  const [phone, setPhone] = useState(user?.phone || "+1 (555) 000-0000");
  const [location, setLocation] = useState("New York, USA");
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState({ email:true, sms:true, push:false, deals:true });

  const textMain = darkMode ? "text-ivory"    : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg   = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const pageBg   = darkMode ? "bg-obsidian" : "bg-ivory-50";
  const inputBg  = { background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)" };

  if (!user) return (
    <div className={`${pageBg} min-h-screen pt-24 flex items-center justify-center`}>
      <div className="text-center">
        <h2 className={`font-display text-3xl ${textMain} mb-4`}>Sign in to view your profile</h2>
        <Link to="/login" className="btn-gold rounded-full">Sign In</Link>
      </div>
    </div>
  );

  const tabs = ["profile","achievements","reviews","security","notifications"];
  const wishedProps = properties.filter(p => wishlist?.includes(p.id)).slice(0,4);

  return (
    <div className={`${pageBg} min-h-screen pt-24`}>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-2">Account</p>
          <h1 className={`font-display text-4xl font-light ${textMain}`}>My <em>Profile</em></h1>
          <div className="gold-line mt-4"/>
        </div>

        {/* Profile hero card */}
        <div className={`rounded-2xl border p-6 mb-6 ${cardBg}`}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative flex-shrink-0">
              <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4 border-gold/30"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
              <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-gold flex items-center justify-center">
                <Camera size={12} className="text-black"/>
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start mb-1">
                <h2 className={`font-display text-2xl font-medium ${textMain}`}>{name||user.name}</h2>
                <span className="w-5 h-5 rounded-full bg-gold flex items-center justify-center"><CheckCircle size={12} className="text-black"/></span>
                {user.superhost && <span className="font-body text-xs text-gold border border-gold/30 px-2 py-0.5 rounded-full">✦ Superhost</span>}
              </div>
              <p className={`font-body text-sm ${textSub} mb-3`}>Member since {user.joined}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {[{icon:Globe, label:language},{icon:MapPin, label:location},{icon:Star, label:"4.95 guest rating"}].map(({icon:Icon,label}) => (
                  <span key={label} className={`flex items-center gap-1 font-body text-xs ${textSub}`}>
                    <Icon size={12} className="text-gold"/>{label}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(!editing)} className="flex items-center gap-1.5 font-body text-sm text-gold border border-gold/30 px-4 py-2 rounded-full hover:bg-gold/10 transition-colors">
                <Edit2 size={13}/> Edit Profile
              </button>
              <button className="flex items-center gap-1.5 font-body text-sm border border-gold/30 px-4 py-2 rounded-full hover:border-gold transition-colors text-gold">
                <Share2 size={13}/> Share
              </button>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            {label:"Trips", value:"7", icon:"✈️"},
            {label:"Wishlist", value:wishlist?.length||0, icon:"❤️"},
            {label:"Reviews", value:"5", icon:"⭐"},
            {label:"Countries", value:"12", icon:"🌍"},
          ].map(({label,value,icon}) => (
            <div key={label} className={`rounded-2xl border p-4 text-center ${cardBg}`}>
              <span className="text-xl">{icon}</span>
              <p className="font-display text-2xl text-gold mt-1">{value}</p>
              <p className={`font-body text-xs ${textSub}`}>{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className={`flex gap-1 mb-6 p-1 rounded-xl border border-gold/10 w-fit overflow-x-auto`} style={{background:darkMode?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.03)"}}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-lg font-body text-sm font-medium capitalize transition-all whitespace-nowrap ${
                activeTab===t ? "bg-gold text-black" : `${textSub} hover:text-gold`
              }`}>{t}</button>
          ))}
        </div>

        {/* ── PROFILE TAB ── */}
        {activeTab==="profile" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`rounded-2xl border p-6 ${cardBg}`}>
              <h3 className={`font-display text-xl ${textMain} mb-4`}>Personal Details</h3>
              {editing ? (
                <div className="space-y-4">
                  {[
                    {label:"Full Name", val:name, set:setName, type:"text"},
                    {label:"Phone", val:phone, set:setPhone, type:"tel"},
                    {label:"Location", val:location, set:setLocation, type:"text"},
                    {label:"Language", val:language, set:setLanguage, type:"text"},
                  ].map(({label,val,set,type}) => (
                    <div key={label}>
                      <label className={`font-body text-xs uppercase tracking-wider ${textSub} block mb-1`}>{label}</label>
                      <input type={type} value={val} onChange={e => set(e.target.value)}
                        className={`lux-input text-sm w-full ${darkMode?"text-ivory":"text-obsidian"}`} style={inputBg}/>
                    </div>
                  ))}
                  <div>
                    <label className={`font-body text-xs uppercase tracking-wider ${textSub} block mb-1`}>Bio</label>
                    <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
                      className={`lux-input text-sm resize-none w-full ${darkMode?"text-ivory":"text-obsidian"}`} style={inputBg}/>
                  </div>
                  <button onClick={() => setEditing(false)} className="btn-gold rounded-full text-sm">Save Changes</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {[
                    {icon:User, label:"Name", val:name||user.name},
                    {icon:Mail, label:"Email", val:user.email},
                    {icon:Phone, label:"Phone", val:phone},
                    {icon:MapPin, label:"Location", val:location},
                    {icon:Globe, label:"Language", val:language},
                  ].map(({icon:Icon,label,val}) => (
                    <div key={label} className={`flex items-center gap-3 py-2 border-b border-gold/5 last:border-0`}>
                      <Icon size={14} className="text-gold flex-shrink-0"/>
                      <div>
                        <p className={`font-body text-xs ${textSub}`}>{label}</p>
                        <p className={`font-body text-sm ${textMain}`}>{val}</p>
                      </div>
                    </div>
                  ))}
                  <p className={`font-body text-sm ${textSub} pt-2`}>{bio||user.bio||"No bio yet. Add one to let hosts know more about you."}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className={`rounded-2xl border p-5 ${cardBg}`}>
                <h3 className={`font-display text-lg ${textMain} mb-3`}>Verification</h3>
                {[
                  {label:"Identity verified", done:true},
                  {label:"Email confirmed", done:true},
                  {label:"Phone confirmed", done:true},
                  {label:"Payment method", done:true},
                  {label:"Government ID", done:false},
                ].map(({label,done}) => (
                  <div key={label} className={`flex items-center gap-3 py-2 border-b border-gold/5 last:border-0`}>
                    {done ? <CheckCircle size={14} className="text-green-400"/> : <Clock size={14} className={textSub}/>}
                    <span className={`font-body text-sm ${done?textMain:textSub}`}>{label}</span>
                    {!done && <button className="ml-auto font-body text-xs text-gold hover:underline">Verify</button>}
                  </div>
                ))}
              </div>
              <div className={`rounded-2xl border p-5 ${cardBg}`}>
                <h3 className={`font-display text-lg ${textMain} mb-3`}>Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    {icon:Heart, label:"View Wishlist", to:"/wishlist"},
                    {icon:Plane, label:"My Trips", to:"/trips"},
                    {icon:MessageSquare, label:"Messages", to:"/dashboard"},
                    {icon:Settings, label:"Account Settings", to:"/profile"},
                  ].map(({icon:Icon,label,to}) => (
                    <Link key={label} to={to} className={`flex items-center gap-3 p-2.5 rounded-xl hover:bg-gold/5 transition-colors ${textSub} hover:text-gold`}>
                      <Icon size={14} className="text-gold"/><span className="font-body text-sm flex-1">{label}</span><ChevronRight size={14}/>
                    </Link>
                  ))}
                </div>
              </div>
              <button onClick={logout} className="w-full py-3 rounded-xl border border-red-400/30 text-red-400 font-body text-sm hover:bg-red-400/5 transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* ── ACHIEVEMENTS ── */}
        {activeTab==="achievements" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map(a => (
                <div key={a.label} className={`rounded-2xl border p-5 text-center transition-all ${cardBg} ${!a.unlocked?"opacity-40 grayscale":""}`}>
                  <span className="text-4xl">{a.icon}</span>
                  <h3 className={`font-display text-lg font-light ${textMain} mt-2`}>{a.label}</h3>
                  <p className={`font-body text-xs ${textSub} mt-1`}>{a.desc}</p>
                  {a.unlocked && <span className="inline-block mt-2 font-body text-xs text-gold border border-gold/30 px-2 py-0.5 rounded-full">Unlocked ✓</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── REVIEWS ── */}
        {activeTab==="reviews" && (
          <div className="space-y-4">
            <p className={`font-body text-sm ${textSub}`}>Reviews from hosts about you as a guest.</p>
            {[
              {host:"Elena Papadopoulos",avatar:"https://i.pravatar.cc/80?img=47",property:"Santorini Cliffside Villa",date:"Jun 2025",rating:5,text:"Wonderful guest! Treated the property with great care and was a pleasure to host. Would welcome back anytime."},
              {host:"Made Wijaya",avatar:"https://i.pravatar.cc/80?img=28",property:"Bali Jungle Treehouse",date:"Jan 2025",rating:5,text:"Fantastic guest — respectful, clean and very communicative. Left the treehouse in perfect condition."},
              {host:"Giulia Ferrara",avatar:"https://i.pravatar.cc/80?img=36",property:"Amalfi Coast Manor",date:"Nov 2024",rating:5,text:"Absolute pleasure to host. Quiet, clean, and followed all house rules. Highly recommend."},
            ].map((r,i) => (
              <div key={i} className={`rounded-2xl border p-5 ${cardBg}`}>
                <div className="flex items-start gap-3 mb-3">
                  <img src={r.avatar} alt="" className="w-10 h-10 rounded-full object-cover"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-body text-sm font-semibold ${textMain}`}>{r.host}</p>
                      <span className={`font-body text-xs ${textSub}`}>{r.date}</span>
                    </div>
                    <p className={`font-body text-xs ${textSub}`}>{r.property}</p>
                    <div className="flex gap-0.5 mt-1">{[...Array(r.rating)].map((_,i)=><Star key={i} size={10} className="fill-gold text-gold"/>)}</div>
                  </div>
                </div>
                <p className={`font-body text-sm ${textSub}`}>{r.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── SECURITY ── */}
        {activeTab==="security" && (
          <div className="space-y-4">
            {[
              {icon:Lock, label:"Change Password", desc:"Last changed 3 months ago", action:"Update"},
              {icon:Shield, label:"Two-Factor Authentication", desc:"Not enabled — recommended", action:"Enable"},
              {icon:CreditCard, label:"Payment Methods", desc:"Visa **** 4521, PayPal connected", action:"Manage"},
              {icon:Globe, label:"Connected Apps", desc:"Google, Apple ID", action:"Manage"},
              {icon:Download, label:"Download My Data", desc:"Request a copy of your data", action:"Request"},
              {icon:Trash2, label:"Delete Account", desc:"Permanently delete your account", action:"Delete", danger:true},
            ].map(s => (
              <div key={s.label} className={`flex items-center gap-4 p-4 rounded-2xl border ${cardBg}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.danger?"bg-red-500/10":"bg-gold/10"}`}>
                  <s.icon size={16} className={s.danger?"text-red-400":"text-gold"}/>
                </div>
                <div className="flex-1">
                  <p className={`font-body text-sm font-semibold ${s.danger?"text-red-400":textMain}`}>{s.label}</p>
                  <p className={`font-body text-xs ${textSub}`}>{s.desc}</p>
                </div>
                <button className={`font-body text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  s.danger?"border-red-400/30 text-red-400 hover:bg-red-400/10":"border-gold/30 text-gold hover:bg-gold/10"
                }`}>{s.action}</button>
              </div>
            ))}
          </div>
        )}

        {/* ── NOTIFICATIONS TAB ── */}
        {activeTab==="notifications" && (
          <div className="space-y-4">
            {[
              {key:"email", label:"Email Notifications", desc:"Booking confirmations, reminders"},
              {key:"sms", label:"SMS Alerts", desc:"Check-in info, urgent updates"},
              {key:"push", label:"Push Notifications", desc:"Real-time app alerts"},
              {key:"deals", label:"Deals & Offers", desc:"Exclusive discounts and new properties"},
            ].map(n => (
              <div key={n.key} className={`flex items-center gap-4 p-4 rounded-2xl border ${cardBg}`}>
                <Bell size={16} className="text-gold"/>
                <div className="flex-1">
                  <p className={`font-body text-sm font-semibold ${textMain}`}>{n.label}</p>
                  <p className={`font-body text-xs ${textSub}`}>{n.desc}</p>
                </div>
                <button onClick={() => setNotifications(prev => ({...prev,[n.key]:!prev[n.key]}))}
                  className={`w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${notifications[n.key]?"bg-gold":"bg-gold/20"}`}>
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${notifications[n.key]?"left-6":"left-0.5"}`}/>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function TripsPage({ darkMode }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [expandedTrip, setExpandedTrip] = useState(null);

  const textMain = darkMode ? "text-ivory"    : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg   = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const pageBg   = darkMode ? "bg-obsidian" : "bg-ivory-50";

  const trips = [
    { id:1, title:"Santorini Cliffside Villa", location:"Oia, Greece", dates:"Jun 12–17, 2025", nights:5, guests:4, total:4450, status:"upcoming",
      img:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", rating:null,
      host:"Elena Papadopoulos", hostAvatar:"https://i.pravatar.cc/80?img=47", confirmCode:"AIR-2025-SAN-0612" },
    { id:2, title:"Swiss Alps Glass Chalet", location:"Grindelwald, Switzerland", dates:"Mar 5–10, 2025", nights:5, guests:2, total:4900, status:"upcoming",
      img:"https://images.unsplash.com/photo-1605368493346-5d3b5ae14f1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", rating:null,
      host:"Hans Müller", hostAvatar:"https://i.pravatar.cc/80?img=53", confirmCode:"AIR-2025-CHT-0305" },
    { id:3, title:"Bali Jungle Treehouse", location:"Ubud, Bali", dates:"Jan 5–10, 2025", nights:5, guests:2, total:1600, status:"completed",
      img:"https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", rating:5,
      host:"Made Wijaya", hostAvatar:"https://i.pravatar.cc/80?img=28", confirmCode:"AIR-2025-BAL-0105" },
    { id:4, title:"Paris Haussmann Apartment", location:"7ème, Paris, France", dates:"Nov 20–25, 2024", nights:5, guests:2, total:2400, status:"completed",
      img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", rating:5,
      host:"Margaux Dubois", hostAvatar:"https://i.pravatar.cc/80?img=44", confirmCode:"AIR-2024-PAR-1120" },
    { id:5, title:"Maldives Overwater Villa", location:"North Malé Atoll, Maldives", dates:"Aug 3–8, 2024", nights:5, guests:2, total:6250, status:"completed",
      img:"https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", rating:5,
      host:"Aisha Rasheed", hostAvatar:"https://i.pravatar.cc/80?img=31", confirmCode:"AIR-2024-MLD-0803" },
    { id:6, title:"Moroccan Riad", location:"Marrakech, Morocco", dates:"Apr 10–15, 2024", nights:5, guests:4, total:1700, status:"cancelled",
      img:"https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", rating:null,
      host:"Fatima El Mansouri", hostAvatar:"https://i.pravatar.cc/80?img=43", confirmCode:"AIR-2024-MAR-0410" },
  ];

  const filtered = activeTab==="all" ? trips : trips.filter(t => t.status===activeTab);
  const totalSpent = trips.filter(t=>t.status==="completed").reduce((a,t)=>a+t.total,0);

  if (!user) return (
    <div className={`${pageBg} min-h-screen pt-24 flex items-center justify-center`}>
      <div className="text-center">
        <h2 className={`font-display text-3xl ${textMain} mb-4`}>Sign in to view your trips</h2>
        <Link to="/login" className="btn-gold rounded-full">Sign In</Link>
      </div>
    </div>
  );

  return (
    <div className={`${pageBg} min-h-screen pt-24`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-2">Travel History</p>
          <h1 className={`font-display text-4xl font-light ${textMain}`}>My <em>Trips</em></h1>
          <div className="gold-line mt-4"/>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            {label:"Total Trips", value:trips.length, icon:"✈️"},
            {label:"Countries", value:"8", icon:"🌍"},
            {label:"Total Spent", value:`$${totalSpent.toLocaleString()}`, icon:"💰"},
          ].map(({label,value,icon}) => (
            <div key={label} className={`rounded-2xl border p-4 text-center ${cardBg}`}>
              <span className="text-xl">{icon}</span>
              <p className="font-display text-2xl text-gold mt-1">{value}</p>
              <p className={`font-body text-xs ${textSub}`}>{label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {["all","upcoming","completed","cancelled"].map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-full font-body text-sm capitalize transition-all ${
                activeTab===t?"bg-gold text-black":`border border-gold/30 ${textSub} hover:border-gold hover:text-gold`
              }`}>{t} <span className="opacity-60 text-xs">({trips.filter(x=>t==="all"||x.status===t).length})</span>
            </button>
          ))}
        </div>

        {/* Trips list */}
        <div className="space-y-4">
          {filtered.map(trip => (
            <div key={trip.id} className={`rounded-2xl border overflow-hidden ${cardBg}`}>
              <div className="flex flex-col md:flex-row gap-0">
                <div className="relative w-full md:w-40 h-36 md:h-auto flex-shrink-0">
                  <img src={trip.img} alt={trip.title} className="w-full h-full object-cover"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-obsidian/20"/>
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                    <div>
                      <h3 className={`font-body font-semibold ${textMain}`}>{trip.title}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin size={11} className="text-gold"/>
                        <span className={`font-body text-xs ${textSub}`}>{trip.location}</span>
                      </div>
                    </div>
                    <span className={`font-body text-xs px-2.5 py-1 rounded-full border ${
                      trip.status==="upcoming"?"border-blue-400/30 text-blue-400":
                      trip.status==="completed"?"border-green-400/30 text-green-400":
                      "border-red-400/30 text-red-400"
                    }`}>{trip.status==="upcoming"?"✈ Upcoming":trip.status==="completed"?"✓ Completed":"✕ Cancelled"}</span>
                  </div>
                  <div className={`flex flex-wrap gap-3 font-body text-xs ${textSub} mb-3`}>
                    <span className="flex items-center gap-1"><Calendar size={11}/>{trip.dates}</span>
                    <span className="flex items-center gap-1"><Clock size={11}/>{trip.nights} nights</span>
                    <span className="flex items-center gap-1"><User size={11}/>{trip.guests} guests</span>
                    <span className="font-medium text-gold">${trip.total.toLocaleString()} total</span>
                  </div>
                  {trip.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(trip.rating)].map((_,i)=><Star key={i} size={12} className="text-gold fill-gold"/>)}
                      <span className={`font-body text-xs ${textSub} ml-1`}>Your rating</span>
                    </div>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => setExpandedTrip(expandedTrip===trip.id?null:trip.id)}
                      className="font-body text-xs text-gold border border-gold/30 px-3 py-1.5 rounded-full hover:bg-gold/10 transition-colors">
                      {expandedTrip===trip.id?"Hide Details":"View Details"}
                    </button>
                    {trip.status==="completed" && !trip.rating && (
                      <button className="font-body text-xs text-gold border border-gold/30 px-3 py-1.5 rounded-full hover:bg-gold/10 transition-colors">
                        Write Review
                      </button>
                    )}
                    {trip.status==="upcoming" && (
                      <>
                        <button className="font-body text-xs text-gold border border-gold/30 px-3 py-1.5 rounded-full hover:bg-gold/10 transition-colors">
                          Modify
                        </button>
                        <button className="font-body text-xs text-red-400 border border-red-400/30 px-3 py-1.5 rounded-full hover:bg-red-400/10 transition-colors">
                          Cancel
                        </button>
                      </>
                    )}
                    <button className="font-body text-xs border border-gold/30 text-gold px-3 py-1.5 rounded-full hover:bg-gold/10 transition-colors flex items-center gap-1">
                      <Download size={11}/> Receipt
                    </button>
                  </div>

                  {/* Expanded details */}
                  {expandedTrip===trip.id && (
                    <div className={`mt-4 pt-4 border-t border-gold/10 grid grid-cols-2 gap-3`}>
                      <div>
                        <p className={`font-body text-xs ${textSub} mb-0.5`}>Host</p>
                        <div className="flex items-center gap-2">
                          <img src={trip.hostAvatar} alt="" className="w-6 h-6 rounded-full object-cover"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                          <span className={`font-body text-sm ${textMain}`}>{trip.host}</span>
                        </div>
                      </div>
                      <div>
                        <p className={`font-body text-xs ${textSub} mb-0.5`}>Confirmation Code</p>
                        <p className={`font-body text-sm font-mono text-gold`}>{trip.confirmCode}</p>
                      </div>
                      <div>
                        <p className={`font-body text-xs ${textSub} mb-0.5`}>Check-in</p>
                        <p className={`font-body text-sm ${textMain}`}>3:00 PM</p>
                      </div>
                      <div>
                        <p className={`font-body text-xs ${textSub} mb-0.5`}>Check-out</p>
                        <p className={`font-body text-sm ${textMain}`}>11:00 AM</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length===0 && (
          <div className="text-center py-20">
            <Plane size={48} className="text-gold mx-auto mb-4 opacity-50"/>
            <h2 className={`font-display text-2xl ${textMain} mb-3`}>No {activeTab} trips</h2>
            <Link to="/" className="btn-gold rounded-full">Explore Properties</Link>
          </div>
        )}
      </div>
    </div>
  );
}
