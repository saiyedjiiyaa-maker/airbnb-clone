import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ChevronDown, ArrowRight, Heart, Globe, Zap, Users } from "lucide-react";

const departments = ["All","Engineering","Design","Marketing","Operations","Finance","Legal","Customer Support"];

const jobs = [
  { id:1, title:"Senior Frontend Engineer", dept:"Engineering", location:"San Francisco, CA", type:"Full-time", remote:true, desc:"Build the next generation of Airbnb's web experiences using React, TypeScript, and cutting-edge web technologies." },
  { id:2, title:"Product Designer – Stays", dept:"Design", location:"New York, NY", type:"Full-time", remote:true, desc:"Shape the visual language and interaction design for Airbnb's core stays product used by millions worldwide." },
  { id:3, title:"Growth Marketing Manager", dept:"Marketing", location:"London, UK", type:"Full-time", remote:false, desc:"Drive user acquisition and retention strategies across EMEA markets through data-driven campaigns." },
  { id:4, title:"iOS Engineer", dept:"Engineering", location:"Seattle, WA", type:"Full-time", remote:true, desc:"Build delightful iOS experiences for Airbnb guests and hosts across the globe." },
  { id:5, title:"Data Scientist – Trust & Safety", dept:"Operations", location:"Dublin, Ireland", type:"Full-time", remote:false, desc:"Use machine learning to keep our community safe by detecting fraud and policy violations at scale." },
  { id:6, title:"Brand Designer", dept:"Design", location:"Los Angeles, CA", type:"Full-time", remote:true, desc:"Evolve Airbnb's visual identity and ensure brand consistency across all marketing touchpoints." },
  { id:7, title:"Community Support Specialist", dept:"Customer Support", location:"Remote", type:"Full-time", remote:true, desc:"Be the voice of Airbnb, resolving complex guest and host issues with empathy and efficiency." },
  { id:8, title:"Financial Analyst", dept:"Finance", location:"San Francisco, CA", type:"Full-time", remote:false, desc:"Support strategic financial planning and analysis for Airbnb's global operations." },
];

const perks = [
  {icon:"✈️", label:"Travel Credit", desc:"$2,000/year to stay at Airbnb listings"},
  {icon:"🏥", label:"Health & Wellness", desc:"Comprehensive medical, dental & vision"},
  {icon:"📚", label:"Learning Budget", desc:"$1,500/year for courses and conferences"},
  {icon:"🏠", label:"Remote Friendly", desc:"Flexible working from anywhere"},
  {icon:"🍽️", label:"Free Meals", desc:"Catered lunches 5 days a week"},
  {icon:"👶", label:"Parental Leave", desc:"16 weeks paid for all parents"},
  {icon:"💰", label:"Equity", desc:"Meaningful stock options for all employees"},
  {icon:"🌍", label:"Global Team", desc:"Work with people from 60+ countries"},
];

export default function CareersPage({ darkMode }) {
  const [activeDept, setActiveDept] = useState("All");
  const [expandedJob, setExpandedJob] = useState(null);

  const textMain = darkMode ? "text-ivory"    : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg   = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const pageBg   = darkMode ? "bg-obsidian" : "bg-ivory-50";

  const filtered = activeDept==="All" ? jobs : jobs.filter(j => j.dept===activeDept);

  return (
    <div className={`${pageBg} min-h-screen`}>
      {/* Hero */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"; }}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.7)"}}/>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-4">Join Our Team</p>
          <h1 className="font-display text-5xl md:text-7xl font-light mb-6">Work at <em className="text-gold">Airbnb</em></h1>
          <p className="font-body text-lg text-white/70 mb-8">Help us build a world where anyone can belong anywhere.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="font-body text-sm bg-white/10 px-4 py-2 rounded-full border border-white/20">🌍 Remote First</span>
            <span className="font-body text-sm bg-white/10 px-4 py-2 rounded-full border border-white/20">💼 {jobs.length} Open Roles</span>
            <span className="font-body text-sm bg-white/10 px-4 py-2 rounded-full border border-white/20">✈️ Travel Perks</span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[{icon:Heart,label:"Mission Driven",desc:"We believe in belonging"},{icon:Globe,label:"Global Team",desc:"60+ nationalities"},{icon:Zap,label:"Move Fast",desc:"Ship, learn, iterate"},{icon:Users,label:"Inclusive",desc:"Every voice matters"}].map(({icon:Icon,label,desc}) => (
            <div key={label} className={`rounded-2xl border p-5 text-center ${cardBg}`}>
              <Icon size={24} className="text-gold mx-auto mb-3"/>
              <h3 className={`font-body text-sm font-semibold ${textMain}`}>{label}</h3>
              <p className={`font-body text-xs ${textSub} mt-1`}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Perks */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-2">Why Airbnb</p>
            <h2 className={`font-display text-4xl font-light ${textMain}`}>Amazing <em>Perks</em></h2>
            <div className="gold-line mx-auto mt-4"/>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {perks.map(p => (
              <div key={p.label} className={`rounded-2xl border p-5 hover:border-gold/30 transition-all ${cardBg}`}>
                <span className="text-3xl">{p.icon}</span>
                <h3 className={`font-body text-sm font-semibold ${textMain} mt-3 mb-1`}>{p.label}</h3>
                <p className={`font-body text-xs ${textSub}`}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Roles */}
        <div>
          <div className="text-center mb-8">
            <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-2">Opportunities</p>
            <h2 className={`font-display text-4xl font-light ${textMain}`}>Open <em>Positions</em></h2>
            <div className="gold-line mx-auto mt-4"/>
          </div>

          {/* Dept filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {departments.map(d => (
              <button key={d} onClick={() => setActiveDept(d)}
                className={`px-4 py-2 rounded-full font-body text-sm transition-all ${activeDept===d?"bg-gold text-black":`border border-gold/30 ${textSub} hover:border-gold hover:text-gold`}`}>{d}</button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map(job => (
              <div key={job.id} className={`rounded-2xl border overflow-hidden ${cardBg}`}>
                <button onClick={() => setExpandedJob(expandedJob===job.id?null:job.id)}
                  className="w-full flex items-center justify-between p-5 text-left">
                  <div>
                    <h3 className={`font-body text-base font-semibold ${textMain}`}>{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-1">
                      <span className={`font-body text-xs ${textSub} flex items-center gap-1`}><MapPin size={11} className="text-gold"/>{job.location}</span>
                      <span className="font-body text-xs text-gold border border-gold/30 px-2 py-0.5 rounded-full">{job.dept}</span>
                      {job.remote && <span className="font-body text-xs text-green-400 border border-green-400/30 px-2 py-0.5 rounded-full">🌐 Remote</span>}
                      <span className={`font-body text-xs ${textSub}`}>{job.type}</span>
                    </div>
                  </div>
                  <ChevronDown size={16} className={`text-gold flex-shrink-0 transition-transform ${expandedJob===job.id?"rotate-180":""}`}/>
                </button>
                {expandedJob===job.id && (
                  <div className="px-5 pb-5 border-t border-gold/10">
                    <p className={`font-body text-sm leading-relaxed ${textSub} mt-4 mb-4`}>{job.desc}</p>
                    <button className="btn-gold rounded-full text-sm flex items-center gap-1">Apply Now <ArrowRight size={14}/></button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
