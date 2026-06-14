import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Youtube, Mail, MapPin, Phone,
  ArrowUp, Globe, DollarSign, ChevronDown } from "lucide-react";
import AirbnbLogo from "./AirbnbLogo";

const footerLinks = {
  Discover: [
    {label:"All Properties", to:"/properties"},
    {label:"Beachfront Villas", to:"/properties?q=beachfront"},
    {label:"Mountain Retreats", to:"/properties?q=mountain"},
    {label:"City Apartments", to:"/properties?q=city"},
    {label:"Unique Stays", to:"/properties?q=unique"},
    {label:"Experiences", to:"/experiences"},
    {label:"Luxury Collection", to:"/properties?q=luxury"},
  ],
  Hosting: [
    {label:"Become a Host", to:"/host"},
    {label:"Host Dashboard", to:"/dashboard"},
    {label:"Airbnb Setup", to:"/host/upload"},
    {label:"Host Resources", to:"/host"},
    {label:"Community Forum", to:"/host"},
    {label:"Responsible Hosting", to:"/host"},
  ],
  Company: [
    {label:"About Us", to:"/about"},
    {label:"Careers", to:"/about"},
    {label:"Press", to:"/about"},
    {label:"Investors", to:"/about"},
    {label:"Newsroom", to:"/about"},
    {label:"Sustainability", to:"/about"},
  ],
  Support: [
    {label:"Help Center", to:"/help"},
    {label:"Safety Info", to:"/help"},
    {label:"Cancellation Options", to:"/help"},
    {label:"Trust & Safety", to:"/help"},
    {label:"Accessibility", to:"/help"},
    {label:"Report Concern", to:"/help"},
  ],
};

const currencies = ["USD $","EUR €","GBP £","INR ₹","AED د.إ","JPY ¥"];
const languages  = ["English","Español","Français","Deutsch","日本語","العربية"];

export default function Footer({ darkMode }) {
  const [email, setEmail]           = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currency, setCurrency]     = useState("USD $");
  const [language, setLanguage]     = useState("English");
  const [openSection, setOpenSection] = useState(null);

  const scrollTop = () => window.scrollTo({top:0,behavior:"smooth"});

  const text    = "text-ivory/70";
  const heading = "text-ivory";

  return (
    <footer className={`border-t ${darkMode?"bg-obsidian border-white/5":"bg-slate border-white/10"} mt-auto`}>

      {/* Top CTA strip */}
      <div className="border-b border-white/5 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl text-ivory">🌍 Ready to explore the world?</p>
            <p className="font-body text-sm text-ivory/50 mt-0.5">Join 12,000+ luxury travellers who trust Airbnb.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/properties" className="btn-gold rounded-full text-sm">Browse Properties</Link>
            <Link to="/experiences" className={`font-body text-sm px-5 py-2.5 rounded-full border border-white/20 text-ivory hover:border-gold transition-colors`}>Explore Experiences</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

          {/* Brand — 2 cols */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <AirbnbLogo size={36} color="#FF385C"/>
              <span className="font-display text-2xl font-semibold" style={{color:"#FF385C"}}>airbnb</span>
            </div>
            <p className={`font-body text-sm leading-relaxed ${text} mb-6`}>
              Belong Anywhere. Discover unique homes, experiences, and places around the world, hosted by a global community of passionate locals.
            </p>

            {/* Social */}
            <div className="flex gap-2 mb-6">
              {[
                { Icon: Instagram, url: "https://www.instagram.com/airbnb/", label: "Instagram" },
                { Icon: Twitter,   url: "https://twitter.com/airbnb",        label: "Twitter/X" },
                { Icon: Linkedin,  url: "https://www.linkedin.com/company/airbnb/", label: "LinkedIn" },
                { Icon: Youtube,   url: "https://www.youtube.com/@airbnb",   label: "YouTube" },
              ].map(({Icon, url, label}) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-ivory/50 hover:text-white hover:border-[#FF385C] hover:bg-[#FF385C] transition-all duration-300">
                  <Icon size={15}/>
                </a>
              ))}
            </div>

            {/* App download badges */}
            <div className="flex gap-2 flex-wrap">
              {[
                { store:"App Store",   icon:"🍎", url:"https://apps.apple.com/app/airbnb/id401626263" },
                { store:"Google Play", icon:"▶",  url:"https://play.google.com/store/apps/details?id=com.airbnb.android" },
              ].map(({store,icon,url}) => (
                <a key={store} href={url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/10 rounded-xl px-3 py-2 hover:border-white/30 transition-colors">
                  <span className="text-lg">{icon}</span>
                  <div className="text-left">
                    <p className="font-body text-xs text-ivory/40 leading-none">Download on</p>
                    <p className="font-body text-xs text-ivory font-semibold leading-tight">{store}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              {/* Mobile accordion */}
              <button onClick={() => setOpenSection(openSection===section?null:section)}
                className="flex items-center justify-between w-full md:cursor-default">
                <h4 className={`font-display text-base font-medium ${heading} mb-0 md:mb-5`}>{section}</h4>
                <ChevronDown size={14} className={`text-ivory/40 md:hidden transition-transform ${openSection===section?"rotate-180":""}`}/>
              </button>
              <ul className={`space-y-2.5 mt-3 md:mt-0 ${openSection===section?"block":"hidden md:block"}`}>
                {links.map(({label,to}) => (
                  <li key={label}>
                    <Link to={to} className={`font-body text-sm ${text} hover:text-white transition-colors`}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-b border-white/5 py-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h4 className={`font-display text-lg ${heading}`}>Get travel inspiration & exclusive deals</h4>
              <p className={`font-body text-sm ${text}`}>Weekly luxury picks, last-minute deals, and destination guides.</p>
            </div>
            {subscribed ? (
              <div className="font-body text-sm text-gold">✓ You're subscribed!</div>
            ) : (
              <div className="flex gap-2 w-full md:w-auto">
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" type="email"
                  className="flex-1 md:w-64 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-ivory outline-none focus:border-gold transition-colors"/>
                <button onClick={() => { if(email) setSubscribed(true); }}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white font-body whitespace-nowrap"
                  style={{background:"#FF385C"}}>Subscribe</button>
              </div>
            )}
          </div>
        </div>

        {/* Contact row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {icon:MapPin, val:"888 Brannan St, San Francisco, CA 94103"},
            {icon:Mail, val:"support@airbnb.com", href:"mailto:support@airbnb.com"},
            {icon:Phone, val:"+1 855-424-4923", href:"tel:+18554244923"},
          ].map(({icon:Icon,val,href}) => (
            <div key={val} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FF385C]/10 flex items-center justify-center flex-shrink-0">
                <Icon size={15} style={{color:"#FF385C"}}/>
              </div>
              {href
                ? <a href={href} className={`font-body text-sm ${text} hover:text-white transition-colors`}>{val}</a>
                : <span className={`font-body text-sm ${text}`}>{val}</span>}
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            {label:"🔒 SSL Secured",        url:"https://www.airbnb.com/trust"},
            {label:"🛡️ AirCover Protection", url:"https://www.airbnb.com/aircover"},
            {label:"⭐ 4.97 Avg Rating",     url:"https://www.airbnb.com/reviews"},
            {label:"✅ Verified Hosts",      url:"https://www.airbnb.com/help/article/196"},
            {label:"💳 Secure Payments",     url:"https://www.airbnb.com/help/article/126"},
          ].map(({label,url}) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer"
              className={`font-body text-xs px-3 py-1.5 rounded-full border border-white/10 ${text} hover:border-gold hover:text-white transition-all cursor-pointer`}>
              {label}
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <div className="flex items-center gap-2">
            <AirbnbLogo size={16} color="#FF385C"/>
            <p className={`font-body text-xs ${text}`}>© 2025 Airbnb, Inc. All rights reserved.</p>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              {label:"Privacy",        url:"https://www.airbnb.com/help/article/2855"},
              {label:"Terms",          url:"https://www.airbnb.com/help/article/2908"},
              {label:"Sitemap",        url:"https://www.airbnb.com/sitemaps/v2"},
              {label:"Destinations",   url:"https://www.airbnb.com/s/experiences"},
              {label:"Company Details",url:"https://www.airbnb.com/about/about-us"},
            ].map(({label,url}) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                className={`font-body text-xs ${text} hover:text-white transition-colors`}>{label}</a>
            ))}
          </div>

          {/* Currency + Language + Scroll top */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border border-white/10 rounded-lg px-2.5 py-1.5">
              <Globe size={12} className="text-ivory/40"/>
              <select value={language} onChange={e => setLanguage(e.target.value)}
                className="bg-transparent text-xs text-ivory/70 outline-none cursor-pointer">
                {languages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-1 border border-white/10 rounded-lg px-2.5 py-1.5">
              <DollarSign size={12} className="text-ivory/40"/>
              <select value={currency} onChange={e => setCurrency(e.target.value)}
                className="bg-transparent text-xs text-ivory/70 outline-none cursor-pointer">
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button onClick={scrollTop}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-ivory/40 hover:border-gold hover:text-gold transition-all">
              <ArrowUp size={14}/>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
