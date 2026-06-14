import React, { useState } from "react";
import { Bell, Check, Trash2, Filter, Star, Calendar, DollarSign, MessageSquare, Shield, Gift, Zap, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const allNotifications = [
  { id:1, type:"booking", icon:"📅", title:"Booking Confirmed", desc:"Your stay at Santorini Cliffside Villa is confirmed for Jun 12–17.", time:"2 minutes ago", unread:true, actionLabel:"View Booking", actionTo:"/trips" },
  { id:2, type:"message", icon:"💬", title:"New Message from Host", desc:"Elena: 'Your check-in details are ready. Door code: 4821'", time:"15 minutes ago", unread:true, actionLabel:"Reply", actionTo:"/messages" },
  { id:3, type:"deal", icon:"⚡", title:"Flash Deal — 30% Off", desc:"Bali Jungle Treehouse — limited time offer expires in 4 hours!", time:"1 hour ago", unread:true, actionLabel:"View Deal", actionTo:"/property/31" },
  { id:4, type:"review", icon:"⭐", title:"Review Request", desc:"How was your stay at Swiss Alps Chalet? Share your experience.", time:"2 hours ago", unread:false, actionLabel:"Write Review", actionTo:"/trips" },
  { id:5, type:"payment", icon:"💰", title:"Payment Processed", desc:"$4,450 has been charged for your Santorini booking.", time:"3 hours ago", unread:false, actionLabel:"View Receipt", actionTo:"/trips" },
  { id:6, type:"priceAlert", icon:"🔔", title:"Price Drop Alert", desc:"Maldives Overwater Villa dropped by 18% — you had it wishlisted!", time:"5 hours ago", unread:false, actionLabel:"View Property", actionTo:"/property/2" },
  { id:7, type:"system", icon:"🛡️", title:"Identity Verified", desc:"Your government ID has been successfully verified.", time:"1 day ago", unread:false },
  { id:8, type:"deal", icon:"🎁", title:"Welcome Bonus", desc:"You've earned a $50 travel credit. Use it on your next booking!", time:"2 days ago", unread:false, actionLabel:"Use Credit", actionTo:"/properties" },
  { id:9, type:"booking", icon:"📅", title:"Upcoming Check-in", desc:"Reminder: You check into Bali Treehouse in 3 days.", time:"2 days ago", unread:false, actionLabel:"Get Directions", actionTo:"/trips" },
  { id:10, type:"message", icon:"💬", title:"New Message", desc:"Made: 'Selamat datang! Your welcome basket is ready 🌺'", time:"3 days ago", unread:false, actionLabel:"Reply", actionTo:"/messages" },
  { id:11, type:"system", icon:"🎉", title:"Superhost Achievement", desc:"Congratulations! Your host profile has reached Superhost status.", time:"1 week ago", unread:false },
  { id:12, type:"priceAlert", icon:"📉", title:"Wishlist Price Change", desc:"3 wishlisted properties have had price changes this week.", time:"1 week ago", unread:false, actionLabel:"View Wishlist", actionTo:"/wishlist" },
];

const typeColors = {
  booking:"text-blue-400 bg-blue-400/10",
  message:"text-green-400 bg-green-400/10",
  deal:"text-[#FF385C] bg-[#FF385C]/10",
  review:"text-gold bg-gold/10",
  payment:"text-purple-400 bg-purple-400/10",
  priceAlert:"text-orange-400 bg-orange-400/10",
  system:"text-teal-400 bg-teal-400/10",
};

export default function NotificationsPage({ darkMode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(allNotifications);
  const [filter, setFilter]   = useState("all");
  const [selected, setSelected] = useState([]);

  const textMain = darkMode ? "text-ivory"    : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg   = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const pageBg   = darkMode ? "bg-obsidian" : "bg-ivory-50";

  const filters = ["all","booking","message","deal","review","payment","priceAlert","system"];
  const filtered = filter==="all" ? notifications : notifications.filter(n=>n.type===filter);
  const unreadCount = notifications.filter(n=>n.unread).length;

  const markAllRead = () => setNotifications(n => n.map(x => ({...x,unread:false})));
  const deleteNotif = (id) => setNotifications(n => n.filter(x => x.id !== id));
  const deleteSelected = () => { setNotifications(n => n.filter(x => !selected.includes(x.id))); setSelected([]); };
  const toggleSelect = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id]);

  if (!user) return (
    <div className={`${pageBg} min-h-screen pt-24 flex items-center justify-center`}>
      <div className="text-center"><h2 className={`font-display text-3xl ${textMain} mb-4`}>Sign in to view notifications</h2><Link to="/login" className="btn-gold rounded-full">Sign In</Link></div>
    </div>
  );

  return (
    <div className={`${pageBg} min-h-screen pt-24`}>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`font-display text-4xl font-light ${textMain}`}>Notifications</h1>
            {unreadCount > 0 && <p className="font-body text-sm text-gold mt-1">{unreadCount} unread</p>}
          </div>
          <div className="flex gap-2">
            {selected.length > 0 && (
              <button onClick={deleteSelected} className="flex items-center gap-1.5 font-body text-sm text-red-400 border border-red-400/30 px-3 py-2 rounded-full hover:bg-red-400/10 transition-colors">
                <Trash2 size={13}/> Delete ({selected.length})
              </button>
            )}
            <button onClick={markAllRead} className="flex items-center gap-1.5 font-body text-sm text-gold border border-gold/30 px-3 py-2 rounded-full hover:bg-gold/10 transition-colors">
              <Check size={13}/> Mark all read
            </button>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full font-body text-xs capitalize whitespace-nowrap transition-all ${filter===f?"bg-gold text-black":`border border-gold/30 ${textSub} hover:border-gold hover:text-gold`}`}>
              {f==="all"?`All (${notifications.length})`:f}
            </button>
          ))}
        </div>

        {/* Notifications list */}
        <div className="space-y-2">
          {filtered.map(n => (
            <div key={n.id} className={`flex gap-3 p-4 rounded-2xl border transition-all cursor-pointer group ${cardBg} ${n.unread?"border-gold/30":""} ${selected.includes(n.id)?"ring-1 ring-gold":""}`}>
              <div className="flex items-start gap-3 flex-1" onClick={() => setNotifications(prev => prev.map(x => x.id===n.id?{...x,unread:false}:x))}>
                {/* Checkbox */}
                <div onClick={e=>{e.stopPropagation();toggleSelect(n.id);}} className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-1 transition-all ${selected.includes(n.id)?"bg-gold border-gold":"border-gold/30 hover:border-gold"}`}>
                  {selected.includes(n.id) && <Check size={10} className="text-black"/>}
                </div>
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg ${typeColors[n.type]||"text-gold bg-gold/10"}`}>
                  {n.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`font-body text-sm font-semibold ${textMain}`}>{n.title} {n.unread && <span className="inline-block w-2 h-2 rounded-full bg-gold ml-1"/>}</p>
                    <span className={`font-body text-xs ${textSub} flex-shrink-0`}>{n.time}</span>
                  </div>
                  <p className={`font-body text-sm ${textSub} mt-0.5`}>{n.desc}</p>
                  {n.actionLabel && (
                    <Link to={n.actionTo||"/"} className="inline-block mt-2 font-body text-xs text-gold border border-gold/30 px-3 py-1 rounded-full hover:bg-gold/10 transition-colors">
                      {n.actionLabel} →
                    </Link>
                  )}
                </div>
              </div>
              <button onClick={() => deleteNotif(n.id)} className={`opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-400/10 text-red-400 transition-all flex-shrink-0`}>
                <X size={13}/>
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Bell size={48} className="text-gold mx-auto mb-4 opacity-30"/>
            <p className={`font-display text-2xl ${textMain} mb-2`}>No notifications</p>
            <p className={`font-body text-sm ${textSub}`}>You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}
