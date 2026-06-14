import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Shield, Heart, Star, Users, Home, Award, ChevronDown } from "lucide-react";

const timeline = [
  { year:"2008", event:"Airbnb founded in San Francisco by Brian Chesky, Joe Gebbia & Nathan Blecharczyk." },
  { year:"2010", event:"10,000 listings reached. First international expansion to Europe." },
  { year:"2014", event:"Launched in 190+ countries. Over 1 million nights booked." },
  { year:"2016", event:"Experiences launched — connecting guests with local hosts beyond accommodation." },
  { year:"2019", event:"Over 500 million guest arrivals. Recognised as world's #1 travel platform." },
  { year:"2020", event:"Launched AirCover — the most comprehensive host & guest protection in the industry." },
  { year:"2022", event:"Launched Rooms — reimagining the original homesharing concept." },
  { year:"2025", event:"Luxury Collection launched. Over 7 million listings in 220+ countries." },
];

const team = [
  { name:"Brian Chesky", role:"Co-founder & CEO", avatar:"https://i.pravatar.cc/150?img=11", quote:"We want to create a world where anyone can belong anywhere." },
  { name:"Nathan Blecharczyk", role:"Co-founder & Chief Strategy Officer", avatar:"https://i.pravatar.cc/150?img=12", quote:"Technology should enable human connection, not replace it." },
  { name:"Joe Gebbia", role:"Co-founder & Chairman", avatar:"https://i.pravatar.cc/150?img=13", quote:"Design thinking is at the heart of everything we do." },
  { name:"Dave Stephenson", role:"Chief Financial Officer", avatar:"https://i.pravatar.cc/150?img=14", quote:"Our mission is bigger than revenue — it's community." },
];

const values = [
  { icon:"🌍", title:"Champion the Mission", desc:"We're all here in service of our mission to create a world where anyone can belong anywhere." },
  { icon:"🤝", title:"Be a Host", desc:"We're caring, open, and encouraging to everyone we work with." },
  { icon:"🔓", title:"Embrace the Adventure", desc:"We're not afraid to fail. We believe in the power of big dreams and bold moves." },
  { icon:"🎯", title:"Be a Cereal Entrepreneur", desc:"We're scrappy. We find creative ways to do big things with limited resources." },
  { icon:"🌱", title:"Simplify", desc:"The world is complex. We cut through the noise to the essential and the elegant." },
  { icon:"💡", title:"Think Crazy", desc:"We ask the big questions and imagine the world as it could be." },
];

const faqs = [
  { q:"How does Airbnb work for guests?", a:"Search for a destination, choose your dates and number of guests, then browse thousands of unique properties. Book instantly or request approval from the host. Your payment is held securely until 24 hours after check-in." },
  { q:"How does Airbnb protect hosts?", a:"AirCover for Hosts provides $3 million in damage protection, $1 million liability insurance, and income loss protection — all included automatically at no extra charge." },
  { q:"What is AirCover for guests?", a:"AirCover for Guests means if a host cancels before check-in, your accommodation is unavailable, or your listing is significantly different from its description, we'll find you a similar or better home and cover the cost difference." },
  { q:"How do Experiences work?", a:"Experiences are activities designed and led by inspiring locals — from cooking classes to wilderness hikes. They're separate bookings from accommodation and can be booked on their own." },
  { q:"Is my personal information secure?", a:"Yes. We use bank-level encryption for all transactions, never share payment details with hosts, and are compliant with GDPR and all major privacy regulations worldwide." },
];

export default function AboutPage({ darkMode }) {
  const [openFaq, setOpenFaq] = useState(null);
  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg   = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const pageBg   = darkMode ? "bg-obsidian" : "bg-ivory-50";

  return (
    <div className={`${pageBg} min-h-screen`}>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
        <div className="absolute inset-0" style={{background:"linear-gradient(to bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.7)"}}/>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-4">Our Story</p>
          <h1 className="font-display text-5xl md:text-7xl font-light mb-6">About <em className="text-gold">Airbnb</em></h1>
          <p className="font-body text-lg text-white/70 max-w-xl mx-auto">A community built on belonging. We believe in a world where anyone can belong anywhere.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-4">Our Mission</p>
        <h2 className={`font-display text-4xl md:text-5xl font-light ${textMain} mb-6`}>
          "Belong <em>Anywhere</em>"
        </h2>
        <p className={`font-body text-lg leading-relaxed ${textSub}`}>
          In 2008, three young designers who had just moved to San Francisco decided to rent out air mattresses in their apartment to make rent. Today, Airbnb has grown into a platform trusted by millions worldwide — but our core belief has never changed. Travel should be transformative, not transactional.
        </p>
      </section>

      {/* Stats */}
      <section className="py-16 px-4" style={{background: darkMode?"linear-gradient(135deg,#1a1a2e,#16213e)":"linear-gradient(135deg,#f8f4ed,#f0e8d8)"}}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{value:"7M+",label:"Listings worldwide"},{value:"220+",label:"Countries & regions"},{value:"100M+",label:"Guest reviews"},{value:"4M+",label:"Hosts globally"}].map(({value,label}) => (
            <div key={label}><p className="font-display text-5xl font-light text-gold mb-2">{value}</p><p className={`font-body text-sm ${textSub}`}>{label}</p></div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">What We Stand For</p>
          <h2 className={`font-display text-4xl font-light ${textMain}`}>Our <em>Values</em></h2>
          <div className="gold-line mx-auto mt-4"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map(v => (
            <div key={v.title} className={`rounded-2xl border p-6 ${cardBg} hover:border-gold/30 transition-all`}>
              <span className="text-3xl mb-4 block">{v.icon}</span>
              <h3 className={`font-display text-xl font-medium ${textMain} mb-2`}>{v.title}</h3>
              <p className={`font-body text-sm leading-relaxed ${textSub}`}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">How We Got Here</p>
          <h2 className={`font-display text-4xl font-light ${textMain}`}>Our <em>Journey</em></h2>
          <div className="gold-line mx-auto mt-4"/>
        </div>
        <div className="relative">
          <div className="absolute left-16 top-0 bottom-0 w-px bg-gold/20"/>
          <div className="space-y-8">
            {timeline.map((t,i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="w-16 flex-shrink-0 text-right">
                  <span className="font-display text-lg font-medium text-gold">{t.year}</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-2 w-3 h-3 rounded-full bg-gold border-2 border-gold/50"/>
                  <p className={`font-body text-sm leading-relaxed ${textSub} pl-2`}>{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">Leadership</p>
          <h2 className={`font-display text-4xl font-light ${textMain}`}>Meet the <em>Team</em></h2>
          <div className="gold-line mx-auto mt-4"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(m => (
            <div key={m.name} className={`rounded-2xl border p-6 text-center ${cardBg} hover:border-gold/30 transition-all group`}>
              <img src={m.avatar} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-gold/30 group-hover:border-gold transition-colors"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
              <h3 className={`font-body text-sm font-semibold ${textMain} mb-1`}>{m.name}</h3>
              <p className="font-body text-xs text-gold mb-3">{m.role}</p>
              <p className={`font-body text-xs italic leading-relaxed ${textSub}`}>"{m.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">Got Questions?</p>
          <h2 className={`font-display text-4xl font-light ${textMain}`}>Frequently <em>Asked</em></h2>
          <div className="gold-line mx-auto mt-4"/>
        </div>
        <div className="space-y-3">
          {faqs.map((faq,i) => (
            <div key={i} className={`rounded-2xl border overflow-hidden ${cardBg}`}>
              <button onClick={() => setOpenFaq(openFaq===i?null:i)} className={`w-full flex items-center justify-between p-5 text-left ${textMain}`}>
                <span className="font-body text-sm font-semibold">{faq.q}</span>
                <ChevronDown size={16} className={`text-gold flex-shrink-0 ml-3 transition-transform ${openFaq===i?"rotate-180":""}`}/>
              </button>
              {openFaq===i && <div className={`px-5 pb-5 font-body text-sm leading-relaxed ${textSub}`}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center max-w-2xl mx-auto">
        <h2 className={`font-display text-4xl font-light ${textMain} mb-4`}>Ready to <em className="text-gold">Belong Anywhere</em>?</h2>
        <p className={`font-body text-sm ${textSub} mb-8`}>Join millions of travellers and hosts who make the world feel a little smaller.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/properties" className="btn-gold rounded-full px-8">Explore Properties</Link>
          <Link to="/host" className={`font-body text-sm px-8 py-3 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-colors`}>Become a Host</Link>
        </div>
      </section>
    </div>
  );
}
