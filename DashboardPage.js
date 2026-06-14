import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Star, Home, Calendar, DollarSign, Plus, Eye, Pause, Play,
  BarChart3, Users, Bell, MessageSquare, Download, ArrowUp, ArrowDown,
  ChevronRight, Settings, Zap, Award, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { hostStats, hostProperties } from "../data/properties";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const earningsData = [3200,4100,5800,6200,7400,8940,7200,9100,8300,6700,5400,7800];
const bookingsData = [8,11,15,17,19,24,20,26,22,18,14,21];

const notifications = [
  { id:1, type:"booking", icon:"📅", title:"New booking request", desc:"Alexandra F. wants to book Santorini Villa Jun 12–17", time:"2 min ago", unread:true },
  { id:2, type:"review", icon:"⭐", title:"New 5-star review", desc:"Marcus W. left a glowing review for Amalfi Manor", time:"1 hr ago", unread:true },
  { id:3, type:"payout", icon:"💰", title:"Payout processed", desc:"$4,450 transferred to your bank account", time:"3 hrs ago", unread:false },
  { id:4, type:"message", icon:"💬", title:"Guest message", desc:"Yuki H.: 'What time is earliest check-in?'", time:"5 hrs ago", unread:false },
  { id:5, type:"system", icon:"🔔", title:"Price suggestion", desc:"Raise your Santorini price by 12% — peak season", time:"1 day ago", unread:false },
];

const recentBookings = [
  { property:"Santorini Cliffside Villa", guest:"Alexandra F.", avatar:"https://i.pravatar.cc/80?img=44", dates:"Jun 12–17", guests:4, amount:4450, status:"confirmed" },
  { property:"Amalfi Coast Manor", guest:"Marco R.", avatar:"https://i.pravatar.cc/80?img=62", dates:"Jul 5–12", guests:6, amount:5040, status:"confirmed" },
  { property:"Santorini Cliffside Villa", guest:"Yuki H.", avatar:"https://i.pravatar.cc/80?img=49", dates:"Jul 20–25", guests:2, amount:4450, status:"pending" },
  { property:"Tokyo Penthouse", guest:"Sophie L.", avatar:"https://i.pravatar.cc/80?img=40", dates:"Aug 3–8", guests:3, amount:3750, status:"pending" },
  { property:"Amalfi Coast Manor", guest:"James O.", avatar:"https://i.pravatar.cc/80?img=18", dates:"Aug 15–22", guests:8, amount:5040, status:"confirmed" },
];

export default function DashboardPage({ darkMode }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMonth, setSelectedMonth] = useState(5);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  const [propertyStatus, setPropertyStatus] = useState(
    Object.fromEntries(hostProperties.map(p => [p.id, p.status]))
  );

  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg   = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const pageBg   = darkMode ? "bg-obsidian" : "bg-ivory-50";
  const inputBg  = darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)";

  const unreadCount = notifs.filter(n => n.unread).length;
  const maxEarning = Math.max(...earningsData);
  const maxBooking = Math.max(...bookingsData);
  const thisMonth = earningsData[selectedMonth];
  const lastMonth = earningsData[selectedMonth - 1] || earningsData[11];
  const earningsDiff = ((thisMonth - lastMonth) / lastMonth * 100).toFixed(1);

  if (!user) return (
    <div className={`${pageBg} min-h-screen pt-24 flex items-center justify-center`}>
      <div className="text-center">
        <h2 className={`font-display text-3xl ${textMain} mb-4`}>Sign in to access your dashboard</h2>
        <Link to="/login" className="btn-gold rounded-full">Sign In</Link>
      </div>
    </div>
  );

  const statCards = [
    { label:"Total Earnings", value:`$${hostStats.totalEarnings.toLocaleString()}`, icon:DollarSign, color:"text-gold", sub:`+$${hostStats.thisMonthEarnings.toLocaleString()} this month`, trend:"up" },
    { label:"Total Bookings", value:hostStats.totalBookings, icon:Calendar, color:"text-blue-400", sub:`${hostStats.pendingRequests} pending`, trend:"up" },
    { label:"Avg Rating", value:hostStats.avgRating, icon:Star, color:"text-gold", sub:"across all properties", trend:"up" },
    { label:"Occupancy Rate", value:`${hostStats.occupancyRate}%`, icon:BarChart3, color:"text-green-400", sub:"last 30 days", trend:"down" },
  ];

  const tabs = ["overview","properties","earnings","bookings","notifications","settings"];

  return (
    <div className={`${pageBg} min-h-screen pt-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-2">Host Portal</p>
            <h1 className={`font-display text-4xl font-light ${textMain}`}>
              Welcome back, <em>{user.name.split(" ")[0]}</em>
            </h1>
            <p className={`font-body text-sm ${textSub} mt-1`}>Here's what's happening with your properties today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:border-gold transition-colors">
              <Bell size={16}/>
              {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{unreadCount}</span>}
            </button>
            <Link to="/host/upload" className="btn-gold rounded-full self-start md:self-auto">
              <Plus size={16}/> List New Property
            </Link>
          </div>
        </div>

        {/* Notification dropdown */}
        {showNotifications && (
          <div className={`fixed top-20 right-4 z-50 w-80 rounded-2xl border shadow-2xl overflow-hidden ${darkMode?"bg-[#111] border-white/10":"bg-white border-stone-200"}`}>
            <div className="flex items-center justify-between p-4 border-b border-gold/10">
              <h3 className={`font-body text-sm font-semibold ${textMain}`}>Notifications</h3>
              <button onClick={() => setNotifs(n => n.map(x => ({...x,unread:false})))}
                className="font-body text-xs text-gold hover:underline">Mark all read</button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifs.map(n => (
                <div key={n.id} onClick={() => setNotifs(prev => prev.map(x => x.id===n.id?{...x,unread:false}:x))}
                  className={`flex gap-3 p-3 cursor-pointer transition-colors hover:bg-gold/5 ${n.unread ? darkMode?"bg-gold/5":"bg-gold/3" : ""}`}>
                  <span className="text-xl flex-shrink-0">{n.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-body text-xs font-semibold ${textMain}`}>{n.title}</p>
                    <p className={`font-body text-xs ${textSub} truncate`}>{n.desc}</p>
                    <p className="font-body text-xs text-gold/60 mt-0.5">{n.time}</p>
                  </div>
                  {n.unread && <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0 mt-1"/>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(({label,value,icon:Icon,color,sub,trend}) => (
            <div key={label} className={`rounded-2xl border p-5 ${cardBg}`}>
              <div className="flex items-start justify-between mb-3">
                <span className={`font-body text-xs ${textSub} uppercase tracking-wider`}>{label}</span>
                <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center">
                  <Icon size={16} className={color}/>
                </div>
              </div>
              <p className={`font-display text-3xl font-medium ${textMain} mb-1`}>{value}</p>
              <div className="flex items-center gap-1">
                {trend==="up" ? <ArrowUp size={11} className="text-green-400"/> : <ArrowDown size={11} className="text-red-400"/>}
                <p className={`font-body text-xs ${textSub}`}>{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl border border-gold/10 w-fit overflow-x-auto" style={{background:darkMode?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.03)"}}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-body text-sm font-medium capitalize transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab===tab ? "bg-gold text-black" : `${textSub} hover:text-gold`
              }`}>
              {tab==="notifications" && unreadCount>0 && <span className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{unreadCount}</span>}
              {tab}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab==="overview" && (
          <div className="space-y-8">
            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Earnings chart */}
              <div className={`rounded-2xl border p-6 ${cardBg}`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className={`font-display text-xl ${textMain}`}>Monthly Earnings</h3>
                    <p className={`font-body text-xs ${textSub}`}>Click a bar to see details</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl text-gold">${earningsData[selectedMonth].toLocaleString()}</p>
                    <p className={`font-body text-xs flex items-center justify-end gap-1 ${parseFloat(earningsDiff)>=0?"text-green-400":"text-red-400"}`}>
                      {parseFloat(earningsDiff)>=0?<ArrowUp size={10}/>:<ArrowDown size={10}/>}{Math.abs(earningsDiff)}% vs last month
                    </p>
                  </div>
                </div>
                <div className="flex items-end gap-1.5 h-32">
                  {earningsData.map((val,i) => (
                    <button key={i} onClick={() => setSelectedMonth(i)} className="flex-1 flex flex-col items-center gap-1 group">
                      <div className={`w-full rounded-t-sm transition-all duration-200 ${i===selectedMonth?"bg-gold":"bg-gold/30 group-hover:bg-gold/50"}`}
                        style={{height:`${(val/maxEarning)*100}%`}}/>
                      <span className={`font-body text-xs ${i===selectedMonth?"text-gold":textSub}`}>{months[i].slice(0,1)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookings chart */}
              <div className={`rounded-2xl border p-6 ${cardBg}`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className={`font-display text-xl ${textMain}`}>Monthly Bookings</h3>
                    <p className={`font-body text-xs ${textSub}`}>Total reservations per month</p>
                  </div>
                  <p className="font-display text-2xl text-gold">{bookingsData[selectedMonth]}</p>
                </div>
                <div className="flex items-end gap-1.5 h-32">
                  {bookingsData.map((val,i) => (
                    <button key={i} onClick={() => setSelectedMonth(i)} className="flex-1 flex flex-col items-center gap-1 group">
                      <div className={`w-full rounded-t-sm transition-all duration-200 ${i===selectedMonth?"bg-blue-400":"bg-blue-400/30 group-hover:bg-blue-400/50"}`}
                        style={{height:`${(val/maxBooking)*100}%`}}/>
                      <span className={`font-body text-xs ${i===selectedMonth?"text-blue-400":textSub}`}>{months[i].slice(0,1)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent bookings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-display text-xl ${textMain}`}>Recent Bookings</h3>
                <button onClick={() => setActiveTab("bookings")} className="font-body text-xs text-gold hover:underline flex items-center gap-1">
                  View all <ChevronRight size={12}/>
                </button>
              </div>
              <div className={`rounded-2xl border overflow-hidden ${cardBg}`}>
                <table className="w-full">
                  <thead>
                    <tr className={`border-b border-gold/10 ${darkMode?"bg-white/3":"bg-stone-50"}`}>
                      {["Guest","Property","Dates","Amount","Status"].map(h => (
                        <th key={h} className={`px-4 py-3 text-left font-body text-xs uppercase tracking-wider ${textSub}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.slice(0,4).map((b,i) => (
                      <tr key={i} className={`border-b border-gold/5 last:border-0 hover:bg-gold/3 transition-colors`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <img src={b.avatar} alt="" className="w-7 h-7 rounded-full object-cover"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                            <span className={`font-body text-sm ${textMain}`}>{b.guest}</span>
                          </div>
                        </td>
                        <td className={`px-4 py-3 font-body text-sm ${textSub} max-w-[140px] truncate`}>{b.property}</td>
                        <td className={`px-4 py-3 font-body text-sm ${textSub}`}>{b.dates}</td>
                        <td className="px-4 py-3 font-display text-sm text-gold">${b.amount.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`font-body text-xs px-2.5 py-1 rounded-full border ${
                            b.status==="confirmed"?"border-green-500/30 text-green-400":"border-yellow-500/30 text-yellow-400"
                          }`}>{b.status==="confirmed"?"✓ Confirmed":"⏳ Pending"}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {label:"Response Rate", value:"98%", icon:"💬", color:"text-green-400"},
                {label:"Acceptance Rate", value:"94%", icon:"✅", color:"text-green-400"},
                {label:"Avg Stay", value:"5.2 nights", icon:"🌙", color:"text-blue-400"},
                {label:"Repeat Guests", value:"32%", icon:"❤️", color:"text-red-400"},
              ].map(m => (
                <div key={m.label} className={`rounded-2xl border p-4 text-center ${cardBg}`}>
                  <span className="text-2xl">{m.icon}</span>
                  <p className={`font-display text-2xl font-light ${m.color} mt-1`}>{m.value}</p>
                  <p className={`font-body text-xs ${textSub} mt-0.5`}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PROPERTIES ── */}
        {activeTab==="properties" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`font-display text-2xl font-medium ${textMain}`}>Your Properties</h2>
              <Link to="/host/upload" className="btn-gold rounded-full text-sm"><Plus size={14}/> Add New</Link>
            </div>
            <div className="space-y-4">
              {hostProperties.map(p => (
                <div key={p.id} className={`rounded-2xl border p-5 ${cardBg}`}>
                  <div className="flex flex-col md:flex-row gap-4">
                    <img src={p.img} alt={p.title} className="w-full md:w-36 h-24 object-cover rounded-xl"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                    <div className="flex-1">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                        <div>
                          <h3 className={`font-body font-semibold ${textMain}`}>{p.title}</h3>
                          <p className={`font-body text-xs ${textSub}`}>{p.location} · <span className="text-gold">${p.price}/night</span></p>
                        </div>
                        <span className={`font-body text-xs px-2.5 py-1 rounded-full border ${
                          propertyStatus[p.id]==="active"?"border-green-500/30 text-green-400":"border-yellow-500/30 text-yellow-400"
                        }`}>{propertyStatus[p.id]==="active"?"● Active":"⏸ Paused"}</span>
                      </div>
                      <div className={`flex flex-wrap gap-4 font-body text-xs ${textSub} mb-3`}>
                        <span className="flex items-center gap-1"><Star size={11} className="text-gold fill-gold"/>{p.rating} ({p.reviews} reviews)</span>
                        <span className="flex items-center gap-1"><Calendar size={11}/>{p.bookings} bookings total</span>
                        <span className="flex items-center gap-1 text-gold"><DollarSign size={11}/>${p.earnings.toLocaleString()} earned</span>
                        <span className="flex items-center gap-1"><Clock size={11}/>Next: {p.nextCheckIn}</span>
                      </div>
                      {/* Mini earnings bar */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`font-body text-xs ${textSub} w-16`}>Occupancy</span>
                        <div className={`flex-1 h-1.5 rounded-full ${darkMode?"bg-white/10":"bg-stone-200"}`}>
                          <div className="h-full bg-gold rounded-full" style={{width:`${70+Math.random()*25}%`}}/>
                        </div>
                        <span className="font-body text-xs text-gold">78%</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <button className="btn-outline-gold rounded-full text-xs py-1.5 px-4">Edit Listing</button>
                        <button className="btn-outline-gold rounded-full text-xs py-1.5 px-4">View Calendar</button>
                        <button className="btn-outline-gold rounded-full text-xs py-1.5 px-4">Analytics</button>
                        <button onClick={() => setPropertyStatus(prev => ({...prev,[p.id]:prev[p.id]==="active"?"paused":"active"}))}
                          className={`font-body text-xs px-4 py-1.5 rounded-full border transition-all ${
                            propertyStatus[p.id]==="active"?"border-red-400/30 text-red-400 hover:border-red-400":"border-green-400/30 text-green-400 hover:border-green-400"
                          }`}>{propertyStatus[p.id]==="active"?"Pause":"Activate"}</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── EARNINGS ── */}
        {activeTab==="earnings" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`font-display text-2xl font-medium ${textMain}`}>Earnings Overview</h2>
              <button className="flex items-center gap-2 font-body text-sm text-gold border border-gold/30 px-4 py-2 rounded-full hover:bg-gold/10 transition-colors">
                <Download size={14}/> Export CSV
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {label:"This Month", value:`$${hostStats.thisMonthEarnings.toLocaleString()}`, sub:"+18% vs last month", color:"text-green-400"},
                {label:"Total Earned", value:`$${hostStats.totalEarnings.toLocaleString()}`, sub:"Lifetime earnings", color:textSub},
                {label:"Pending Payout", value:"$2,340", sub:"Processing in 3 days", color:"text-yellow-400"},
              ].map(({label,value,sub,color}) => (
                <div key={label} className={`rounded-2xl border p-5 text-center ${cardBg}`}>
                  <p className={`font-body text-sm ${textSub} mb-2`}>{label}</p>
                  <p className="font-display text-3xl text-gold">{value}</p>
                  <p className={`font-body text-xs ${color} mt-1`}>{sub}</p>
                </div>
              ))}
            </div>
            {/* Full chart */}
            <div className={`rounded-2xl border p-6 ${cardBg}`}>
              <h3 className={`font-display text-xl ${textMain} mb-6`}>12-Month Breakdown</h3>
              <div className="space-y-3">
                {months.map((month,i) => {
                  const pct = (earningsData[i]/maxEarning)*100;
                  return (
                    <div key={month} className="flex items-center gap-4">
                      <span className={`font-body text-sm w-10 ${textSub}`}>{month}</span>
                      <div className={`flex-1 h-2.5 rounded-full ${darkMode?"bg-white/10":"bg-stone-200"} overflow-hidden`}>
                        <div className="h-full rounded-full transition-all duration-700" style={{width:`${pct}%`,background:"linear-gradient(90deg,#c9a84c,#f0d080)"}}/>
                      </div>
                      <span className="font-body text-sm font-medium text-gold w-20 text-right">${earningsData[i].toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Per-property breakdown */}
            <div className={`rounded-2xl border p-6 ${cardBg}`}>
              <h3 className={`font-display text-xl ${textMain} mb-4`}>Per Property</h3>
              <div className="space-y-3">
                {hostProperties.map(p => (
                  <div key={p.id} className="flex items-center gap-4">
                    <img src={p.img} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                    <div className="flex-1 min-w-0">
                      <p className={`font-body text-sm font-medium ${textMain} truncate`}>{p.title}</p>
                      <p className={`font-body text-xs ${textSub}`}>{p.bookings} bookings</p>
                    </div>
                    <span className="font-display text-base text-gold">${p.earnings.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── BOOKINGS ── */}
        {activeTab==="bookings" && (
          <div>
            <h2 className={`font-display text-2xl font-medium ${textMain} mb-6`}>All Bookings</h2>
            <div className={`rounded-2xl border overflow-hidden ${cardBg}`}>
              <table className="w-full">
                <thead>
                  <tr className={`border-b border-gold/10 ${darkMode?"bg-white/3":"bg-stone-50"}`}>
                    {["Guest","Property","Dates","Guests","Amount","Status","Action"].map(h => (
                      <th key={h} className={`px-4 py-3 text-left font-body text-xs uppercase tracking-wider ${textSub}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b,i) => (
                    <tr key={i} className="border-b border-gold/5 last:border-0 hover:bg-gold/3 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <img src={b.avatar} alt="" className="w-8 h-8 rounded-full object-cover"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                          <span className={`font-body text-sm ${textMain}`}>{b.guest}</span>
                        </div>
                      </td>
                      <td className={`px-4 py-3 font-body text-sm ${textSub} max-w-[120px] truncate`}>{b.property}</td>
                      <td className={`px-4 py-3 font-body text-sm ${textSub}`}>{b.dates}</td>
                      <td className={`px-4 py-3 font-body text-sm ${textSub}`}>{b.guests}</td>
                      <td className="px-4 py-3 font-display text-sm text-gold">${b.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`font-body text-xs px-2.5 py-1 rounded-full border ${
                          b.status==="confirmed"?"border-green-500/30 text-green-400":"border-yellow-500/30 text-yellow-400"
                        }`}>{b.status==="confirmed"?"✓ Confirmed":"⏳ Pending"}</span>
                      </td>
                      <td className="px-4 py-3">
                        {b.status==="pending" && (
                          <div className="flex gap-1">
                            <button className="w-7 h-7 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center hover:bg-green-500/20 transition-colors"><CheckCircle size={12}/></button>
                            <button className="w-7 h-7 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors"><XCircle size={12}/></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── NOTIFICATIONS ── */}
        {activeTab==="notifications" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`font-display text-2xl font-medium ${textMain}`}>Notifications</h2>
              <button onClick={() => setNotifs(n => n.map(x => ({...x,unread:false})))}
                className="font-body text-sm text-gold hover:underline">Mark all as read</button>
            </div>
            <div className="space-y-3">
              {notifs.map(n => (
                <div key={n.id} onClick={() => setNotifs(prev => prev.map(x => x.id===n.id?{...x,unread:false}:x))}
                  className={`flex gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${cardBg} ${n.unread?"border-gold/30":""}`}>
                  <span className="text-2xl flex-shrink-0">{n.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className={`font-body text-sm font-semibold ${textMain}`}>{n.title}</p>
                      <span className={`font-body text-xs ${textSub}`}>{n.time}</span>
                    </div>
                    <p className={`font-body text-sm ${textSub}`}>{n.desc}</p>
                  </div>
                  {n.unread && <div className="w-2.5 h-2.5 rounded-full bg-gold flex-shrink-0 mt-1.5"/>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {activeTab==="settings" && (
          <div className="space-y-6">
            <h2 className={`font-display text-2xl font-medium ${textMain}`}>Host Settings</h2>
            {[
              {title:"Payout Method", desc:"Bank transfer · **** 4521", icon:"💳", action:"Update"},
              {title:"Notification Preferences", desc:"Email, SMS, Push", icon:"🔔", action:"Manage"},
              {title:"Calendar Sync", desc:"Google Calendar connected", icon:"📅", action:"Configure"},
              {title:"Pricing Rules", desc:"Smart pricing enabled", icon:"💰", action:"Edit"},
              {title:"House Rules", desc:"3 rules set", icon:"📋", action:"Edit"},
              {title:"Co-Host Access", desc:"2 co-hosts active", icon:"👥", action:"Manage"},
              {title:"Tax Documents", desc:"2024 tax forms ready", icon:"📄", action:"Download"},
            ].map(s => (
              <div key={s.title} className={`flex items-center gap-4 p-4 rounded-2xl border ${cardBg} hover:border-gold/30 transition-colors`}>
                <span className="text-2xl">{s.icon}</span>
                <div className="flex-1">
                  <p className={`font-body text-sm font-semibold ${textMain}`}>{s.title}</p>
                  <p className={`font-body text-xs ${textSub}`}>{s.desc}</p>
                </div>
                <button className="font-body text-xs text-gold border border-gold/30 px-3 py-1.5 rounded-full hover:bg-gold/10 transition-colors">{s.action}</button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
