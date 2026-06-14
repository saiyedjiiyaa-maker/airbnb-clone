import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Search, Moon, Sun, Menu, X, Heart, User, Home,
  LayoutDashboard, LogOut, ChevronDown, MapPin,
  Bell, MessageSquare, HelpCircle, Info, Plane, Sparkles, Globe
} from "lucide-react";
import AirbnbLogo from "./AirbnbLogo";

const NOTIF_COUNT = 3;

function getUnreadMessages() {
  try {
    const msgs = JSON.parse(localStorage.getItem("airbnb_messages") || "{}");
    // Count unread from initial conversations data
    return [3, 0, 1, 0, 0].reduce((a, b) => a + b, 0); // static demo count
  } catch { return 2; }
}

export default function Navbar({ darkMode, toggleDark }) {
  const { user, logout, wishlist } = useAuth();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const [searchFocus, setSearchFocus]   = useState(false);
  // Persist notification read state
  const [notifRead, setNotifRead] = useState(() => localStorage.getItem("airbnb_notif_read") === "1");
  const [msgRead,   setMsgRead]   = useState(() => localStorage.getItem("airbnb_msg_read")   === "1");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Mark as read when visiting those pages
  useEffect(() => {
    if (location.pathname === "/notifications") { setNotifRead(true); localStorage.setItem("airbnb_notif_read","1"); }
    if (location.pathname === "/messages")      { setMsgRead(true);   localStorage.setItem("airbnb_msg_read","1");   }
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdownOpen(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const navBg = isHome && !scrolled
    ? "bg-transparent"
    : darkMode
    ? "bg-obsidian/95 shadow-lg shadow-black/30 border-b border-white/5"
    : "bg-white/95 shadow-lg shadow-black/5 border-b border-stone-100";

  const textColor = isHome && !scrolled ? "text-white" : darkMode ? "text-ivory" : "text-obsidian";

  const dropLinks = [
    { to:"/profile",        icon:User,           label:"My Profile" },
    { to:"/wishlist",       icon:Heart,          label:"Wishlist",        badge: wishlist?.length },
    { to:"/trips",          icon:Plane,          label:"My Trips" },
    { to:"/messages",       icon:MessageSquare,  label:"Messages",        badge: msgRead   ? 0 : 4 },
    { to:"/notifications",  icon:Bell,           label:"Notifications",   badge: notifRead ? 0 : NOTIF_COUNT },
    { to:"/travel-planner", icon:Sparkles,       label:"AI Travel Planner 🤖" },
    { to:"/compare",        icon:LayoutDashboard,label:"Compare Properties" },
    { to:"/currency",       icon:Globe,          label:"Currency Converter" },
    { to:"/weather",        icon:Info,           label:"Weather Guide" },
    { to:"/dashboard",      icon:LayoutDashboard,label:"Host Dashboard" },
  ];

  const mobileLinks = [
    { to:"/",             label:"Home" },
    { to:"/properties",   label:"Properties" },
    { to:"/experiences",  label:"Experiences" },
    { to:"/search",       label:"Search" },
    { to:"/wishlist",     label:"Wishlist" },
    { to:"/trips",        label:"My Trips" },
    { to:"/messages",     label:"Messages" },
    { to:"/notifications",label:"Notifications" },
    { to:"/host",         label:"Become a Host" },
    { to:"/dashboard",    label:"Host Dashboard" },
    { to:"/about",        label:"About Us" },
    { to:"/help",         label:"Help Center" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
        style={{ backdropFilter: scrolled || !isHome ? "blur(20px)" : "none" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <AirbnbLogo size={36} color={isHome && !scrolled ? "#ffffff" : "#FF385C"} className="transition-all duration-300 group-hover:scale-110"/>
              <span className="font-display text-2xl font-semibold tracking-tight transition-colors" style={{ color: isHome && !scrolled ? "#ffffff" : "#FF385C" }}>airbnb</span>
            </Link>

            {/* Center search (scrolled) */}
            {scrolled && (
              <form onSubmit={handleSearch} className={`hidden md:flex items-center gap-2 rounded-full px-4 py-2 border transition-all duration-300 shadow-sm ${darkMode ? "bg-white/5 border-white/10 text-ivory" : "bg-white border-stone-200 text-obsidian"}`} style={{ minWidth: 280 }}>
                <MapPin size={14} className="text-[#FF385C] flex-shrink-0"/>
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search destinations…" className="bg-transparent outline-none text-sm font-body flex-1"/>
                <button type="submit" className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background:"#FF385C" }}>
                  <Search size={12} className="text-white"/>
                </button>
              </form>
            )}

            {/* Right nav */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/properties" className={`font-body text-sm font-medium hover:text-[#FF385C] transition-colors ${textColor}`}>Properties</Link>
              <Link to="/experiences" className={`font-body text-sm font-medium hover:text-[#FF385C] transition-colors ${textColor}`}>Experiences</Link>
              <Link to="/host" className={`font-body text-sm font-medium hover:text-[#FF385C] transition-colors ${textColor}`}>Become a Host</Link>
              <Link to="/about" className={`font-body text-sm font-medium hover:text-[#FF385C] transition-colors ${textColor}`}>About</Link>

              {/* Notifications bell */}
              {user && (
                <Link to="/notifications" className="relative">
                  <Bell size={18} className={`${textColor} hover:text-[#FF385C] transition-colors`}/>
                  {!notifRead && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#FF385C] text-white text-xs flex items-center justify-center font-bold">{NOTIF_COUNT}</span>}
                </Link>
              )}

              {/* Messages */}
              {user && (
                <Link to="/messages" className="relative">
                  <MessageSquare size={18} className={`${textColor} hover:text-[#FF385C] transition-colors`}/>
                  {!msgRead && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#FF385C] text-white text-xs flex items-center justify-center font-bold">4</span>}
                </Link>
              )}

              {/* Dark mode */}
              <button onClick={toggleDark} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${darkMode ? "border-white/20 text-ivory hover:border-[#FF385C] hover:text-[#FF385C]" : "border-stone-200 text-obsidian hover:border-[#FF385C] hover:text-[#FF385C]"}`}>
                {darkMode ? <Sun size={15}/> : <Moon size={15}/>}
              </button>

              {/* User dropdown */}
              {user ? (
                <div className="relative">
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all hover:shadow-md ${darkMode ? "border-white/20 hover:border-white/40" : "border-stone-200 hover:border-stone-300"}`}>
                    <Menu size={15} className={darkMode ? "text-ivory" : "text-obsidian"}/>
                    <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                    <ChevronDown size={12} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} style={{ color:"#FF385C" }}/>
                  </button>
                  {dropdownOpen && (
                    <div className={`absolute right-0 top-12 w-56 rounded-2xl shadow-2xl border overflow-hidden z-50 ${darkMode ? "bg-obsidian border-white/10" : "bg-white border-stone-100"}`}>
                      <div className="p-4 border-b" style={{ borderColor: darkMode ? "rgba(255,255,255,0.05)" : "#f5f5f5" }}>
                        <p className={`font-body text-sm font-semibold ${darkMode ? "text-ivory" : "text-obsidian"}`}>{user.name}</p>
                        <p className="font-body text-xs" style={{ color:"#FF385C" }}>{user.email}</p>
                      </div>
                      {dropLinks.map(({ to, icon: Icon, label, badge }) => (
                        <Link key={to} to={to} className={`flex items-center gap-3 px-4 py-3 text-sm font-body transition-colors hover:bg-[#FF385C]/10 hover:text-[#FF385C] ${darkMode ? "text-ivory/80" : "text-obsidian/80"}`}>
                          <Icon size={15}/> {label}
                          {badge > 0 && <span className="ml-auto w-5 h-5 rounded-full bg-[#FF385C] text-white text-xs flex items-center justify-center font-bold">{badge}</span>}
                        </Link>
                      ))}
                      <div className="border-t" style={{ borderColor: darkMode ? "rgba(255,255,255,0.05)" : "#f5f5f5" }}>
                        <Link to="/help" className={`flex items-center gap-3 px-4 py-3 text-sm font-body transition-colors hover:bg-[#FF385C]/10 hover:text-[#FF385C] ${darkMode ? "text-ivory/80" : "text-obsidian/80"}`}>
                          <HelpCircle size={15}/> Help Center
                        </Link>
                        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-sm font-body text-red-400 hover:bg-red-50 transition-colors w-full">
                          <LogOut size={15}/> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className={`font-body text-sm font-medium hover:text-[#FF385C] transition-colors ${textColor}`}>Sign In</Link>
                  <Link to="/signup" className="font-body text-sm font-semibold text-white py-2.5 px-5 rounded-full transition-all hover:opacity-90 hover:shadow-lg" style={{ background:"#FF385C" }}>Sign Up</Link>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden w-9 h-9 flex items-center justify-center rounded-full border transition-all ${darkMode ? "border-white/20 text-ivory" : "border-stone-200 text-obsidian"}`}>
              {mobileOpen ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} style={{ background:"rgba(0,0,0,0.5)" }} onClick={() => setMobileOpen(false)}/>

      {/* Mobile drawer */}
      <div className={`fixed top-0 right-0 h-full w-72 z-50 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"} ${darkMode ? "bg-obsidian" : "bg-white"} overflow-y-auto`}>
        <div className="p-6 pt-24">
          <div className="flex items-center gap-2 mb-6">
            <AirbnbLogo size={28} color="#FF385C"/>
            <span className="font-display text-xl font-semibold" style={{ color:"#FF385C" }}>airbnb</span>
          </div>
          {/* Mobile search */}
          <form onSubmit={e => { handleSearch(e); setMobileOpen(false); }} className={`flex items-center gap-2 rounded-xl px-3 py-2.5 border mb-4 ${darkMode ? "border-white/10 bg-white/5" : "border-stone-200 bg-stone-50"}`}>
            <Search size={13} className="text-[#FF385C]"/>
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search…" className={`bg-transparent outline-none text-sm font-body flex-1 ${darkMode ? "text-ivory" : "text-obsidian"}`}/>
          </form>
          <div className="flex flex-col gap-0.5">
            {mobileLinks.map(({ to, label }) => (
              <Link key={to} to={to} className={`font-body text-sm py-2.5 px-3 rounded-xl transition-colors hover:bg-[#FF385C]/10 hover:text-[#FF385C] ${darkMode ? "text-ivory" : "text-obsidian"}`}>{label}</Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t flex flex-col gap-2" style={{ borderColor: darkMode ? "rgba(255,255,255,0.05)" : "#f0f0f0" }}>
            {user ? (
              <button onClick={logout} className="w-full py-3 rounded-full font-body text-sm font-semibold border text-center" style={{ borderColor:"#FF385C", color:"#FF385C" }}>Sign Out</button>
            ) : (
              <>
                <Link to="/login" className="w-full py-3 rounded-full font-body text-sm font-semibold border text-center" style={{ borderColor:"#FF385C", color:"#FF385C" }}>Sign In</Link>
                <Link to="/signup" className="w-full py-3 rounded-full font-body text-sm font-semibold text-white text-center" style={{ background:"#FF385C" }}>Sign Up</Link>
              </>
            )}
            <button onClick={toggleDark} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${darkMode ? "text-ivory" : "text-obsidian"}`}>
              {darkMode ? <Sun size={15}/> : <Moon size={15}/>}
              <span className="font-body text-sm">{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
