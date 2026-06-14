import AirbnbLogo from "../components/AirbnbLogo";
import React from "react";
import { Link } from "react-router-dom";
import { Shield, TrendingUp, Users, Star, ArrowRight, CheckCircle } from "lucide-react";

export default function HostPage({ darkMode }) {
  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  const textSub = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const pageBg = darkMode ? "bg-obsidian" : "bg-ivory-50";

  return (
    <div className={`${pageBg} min-h-screen pt-20`}>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="" className="w-full h-full object-cover" 
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-white">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-4">Host with Airbnb</p>
          <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-6">
            Your Space.<br />
            <em className="">Their Dream.</em>
          </h1>
          <p className="font-body text-lg text-white/70 mb-10">
            Join an exclusive network of luxury hosts. Earn premium rates and connect with discerning travelers worldwide.
          </p>
          <div className="flex gap-4">
            <Link to="/host/upload" className="btn-gold rounded-full text-base px-8 py-4">
              List Your Property <ArrowRight size={18} />
            </Link>
            <Link to="/dashboard" className="btn-outline-gold rounded-full text-base px-8 py-4">
              Host Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Why host */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">Why Airbnb</p>
          <h2 className={`font-display text-4xl font-light ${textMain}`}>The <em>Airbnb</em> Advantage</h2>
          <div className="gold-line mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: TrendingUp, title: "Premium Rates", desc: "Our guests expect luxury and pay accordingly. Average host earns 40% more than other platforms." },
            { icon: Shield, title: "Full Protection", desc: "Comprehensive host guarantee up to $1M. Verified guests only. 24/7 host support team." },
            { icon: Users, title: "Curated Guests", desc: "Every guest is verified and vetted. Our clientele values and respects luxury properties." },
            { icon: Star, title: "Concierge Support", desc: "Dedicated host manager, professional photography, and listing optimization included." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className={`rounded-2xl border p-6 ${cardBg}`}>
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <Icon size={22} className="text-gold" />
              </div>
              <h3 className={`font-display text-xl font-medium ${textMain} mb-2`}>{title}</h3>
              <p className={`font-body text-sm leading-relaxed ${textSub}`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Earnings calculator */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #2c3340 0%, #1a2030 100%)" }}>
          <div className="p-10 text-center">
            <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">Potential Earnings</p>
            <h2 className="font-display text-3xl font-light text-ivory mb-8">How Much Could You Earn?</h2>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { label: "Per Night", value: "$450–$1,200" },
                { label: "Per Month (avg)", value: "$9,800" },
                { label: "Per Year (avg)", value: "$118K" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-display text-2xl text-gold mb-1">{value}</p>
                  <p className="font-body text-xs text-ivory/50">{label}</p>
                </div>
              ))}
            </div>
            <p className="font-body text-xs text-ivory/40 mb-6">*Based on active Airbnb hosts with luxury properties, 70% occupancy</p>
            <Link to="/host/upload" className="btn-gold rounded-full px-8 py-3">Start Listing Now</Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`font-display text-4xl font-light ${textMain}`}>How It <em>Works</em></h2>
          <div className="gold-line mx-auto mt-4" />
        </div>
        <div className="space-y-6">
          {[
            { step: "01", title: "List Your Property", desc: "Complete our guided listing form with photos, details, and pricing. Takes about 15 minutes." },
            { step: "02", title: "Curation Review", desc: "Our team reviews your property within 48 hours to ensure it meets Airbnb's luxury standards." },
            { step: "03", title: "Professional Touch", desc: "We arrange complimentary professional photography and optimize your listing for maximum visibility." },
            { step: "04", title: "Start Earning", desc: "Accept bookings, host exceptional stays, and receive payouts within 24 hours of check-in." },
          ].map(({ step, title, desc }) => (
            <div key={step} className={`flex gap-6 items-start p-6 rounded-2xl border ${cardBg}`}>
              <span className="font-display text-4xl text-gold/30 font-medium flex-shrink-0">{step}</span>
              <div>
                <h3 className={`font-display text-xl font-medium ${textMain} mb-1`}>{title}</h3>
                <p className={`font-body text-sm leading-relaxed ${textSub}`}>{desc}</p>
              </div>
              <CheckCircle size={20} className="text-gold/50 flex-shrink-0 mt-1" />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/host/upload" className="btn-gold rounded-full text-base px-10 py-4">
            List My Property <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
