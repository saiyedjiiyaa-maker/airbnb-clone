import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Star, Zap, Shield, Globe, ChevronDown } from "lucide-react";

const plans = [
  {
    name:"Explorer",
    price:0,
    desc:"Perfect for first-time travellers",
    color:"#c9a84c",
    features:[
      "Browse all properties",
      "Save to wishlist (up to 10)",
      "Standard booking",
      "Email support",
      "Basic trip management",
    ],
    notIncluded:["Priority customer support","Early access deals","Concierge service","Loyalty rewards"],
    cta:"Get Started Free",
    to:"/signup",
  },
  {
    name:"Traveller",
    price:9.99,
    desc:"For frequent travellers who want more",
    color:"#FF385C",
    badge:"Most Popular",
    features:[
      "Everything in Explorer",
      "Unlimited wishlist",
      "Priority booking",
      "24/7 chat support",
      "Early access to deals",
      "10% loyalty cashback",
      "Free cancellation upgrade",
    ],
    notIncluded:["Dedicated concierge","Airport transfers"],
    cta:"Start Free Trial",
    to:"/signup",
  },
  {
    name:"Luxury",
    price:29.99,
    desc:"The ultimate experience for discerning travellers",
    color:"#8b5cf6",
    features:[
      "Everything in Traveller",
      "Dedicated luxury concierge",
      "15% loyalty cashback",
      "Complimentary airport transfers",
      "VIP host introductions",
      "Exclusive member-only properties",
      "Personal travel consultant",
      "Priority dispute resolution",
    ],
    notIncluded:[],
    cta:"Go Luxury",
    to:"/signup",
  },
];

const faqs = [
  { q:"Can I switch plans anytime?", a:"Yes, you can upgrade or downgrade at any time. Changes take effect at the next billing cycle." },
  { q:"Is there a free trial?", a:"Yes! The Traveller plan comes with a 14-day free trial. No credit card required to start." },
  { q:"What is loyalty cashback?", a:"A percentage of every booking is returned as Airbnb credit, redeemable on future stays." },
  { q:"How does the concierge service work?", a:"Luxury members get a dedicated human concierge available 24/7 via phone, WhatsApp, or email to handle all trip arrangements." },
  { q:"Can I cancel anytime?", a:"Absolutely. There are no long-term contracts. Cancel anytime with no penalty." },
];

export default function PricingPage({ darkMode }) {
  const [annual, setAnnual]   = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const textMain = darkMode ? "text-ivory"    : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg   = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const pageBg   = darkMode ? "bg-obsidian" : "bg-ivory-50";

  return (
    <div className={`${pageBg} min-h-screen pt-24`}>
      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">Membership Plans</p>
          <h1 className={`font-display text-5xl md:text-6xl font-light ${textMain} mb-4`}>Simple, <em className="text-gold">Honest</em> Pricing</h1>
          <p className={`font-body text-base ${textSub} max-w-lg mx-auto mb-8`}>Choose the plan that fits your travel style. Upgrade or cancel anytime.</p>

          {/* Annual toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`font-body text-sm ${annual ? textSub : textMain}`}>Monthly</span>
            <button onClick={() => setAnnual(!annual)}
              className={`w-14 h-7 rounded-full relative transition-all duration-300 ${annual ? "bg-gold" : "bg-gold/30"}`}>
              <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-all duration-300 ${annual ? "left-7" : "left-0.5"}`}/>
            </button>
            <span className={`font-body text-sm ${annual ? textMain : textSub}`}>
              Annual <span className="text-green-400 text-xs ml-1">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map(plan => {
            const price = plan.price === 0 ? 0 : annual ? (plan.price * 0.8).toFixed(2) : plan.price;
            return (
              <div key={plan.name} className={`rounded-3xl border p-7 relative ${cardBg} ${plan.badge ? "ring-2 ring-[#FF385C]" : ""} hover:border-gold/40 transition-all`}>
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-xs font-body font-semibold" style={{background:"#FF385C"}}>
                    {plan.badge}
                  </div>
                )}
                <div className="mb-6">
                  <div className="w-11 h-11 rounded-xl mb-4 flex items-center justify-center" style={{background:`${plan.color}18`}}>
                    {plan.name==="Explorer" ? <Globe size={20} style={{color:plan.color}}/> :
                     plan.name==="Traveller" ? <Zap size={20} style={{color:plan.color}}/> :
                     <Star size={20} style={{color:plan.color}}/>}
                  </div>
                  <h2 className={`font-display text-2xl font-medium ${textMain}`}>{plan.name}</h2>
                  <p className={`font-body text-sm ${textSub} mt-1`}>{plan.desc}</p>
                </div>
                <div className="mb-6">
                  <span className="font-display text-5xl font-light" style={{color:plan.color}}>
                    {price === 0 ? "Free" : `$${price}`}
                  </span>
                  {price > 0 && <span className={`font-body text-sm ${textSub} ml-1`}>/{annual?"year":"month"}</span>}
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={14} className="mt-0.5 flex-shrink-0" style={{color:plan.color}}/>
                      <span className={`font-body text-sm ${textMain}`}>{f}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map(f => (
                    <li key={f} className="flex items-start gap-2.5 opacity-40">
                      <span className="text-sm flex-shrink-0 mt-0.5">✕</span>
                      <span className={`font-body text-sm ${textSub} line-through`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to={plan.to} className="block w-full py-3.5 rounded-xl font-body text-sm font-semibold text-center transition-all hover:opacity-90"
                  style={{background:plan.color, color:"white"}}>
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Trust */}
        <div className={`rounded-2xl border p-6 mb-16 ${cardBg}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {icon:"🔒", label:"SSL Secured", desc:"256-bit encryption"},
              {icon:"↩️", label:"Cancel Anytime", desc:"No lock-in contracts"},
              {icon:"💳", label:"All Cards", desc:"Visa, MC, PayPal, Apple Pay"},
              {icon:"🛡️", label:"AirCover", desc:"Every booking protected"},
            ].map(t => (
              <div key={t.label}>
                <span className="text-3xl">{t.icon}</span>
                <p className={`font-body text-sm font-semibold ${textMain} mt-2`}>{t.label}</p>
                <p className={`font-body text-xs ${textSub}`}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className={`font-display text-3xl font-light ${textMain} text-center mb-8`}>Common <em>Questions</em></h2>
          <div className="space-y-3">
            {faqs.map((f,i) => (
              <div key={i} className={`rounded-2xl border overflow-hidden ${cardBg}`}>
                <button onClick={() => setOpenFaq(openFaq===i?null:i)} className={`w-full flex items-center justify-between p-5 text-left`}>
                  <span className={`font-body text-sm font-semibold ${textMain}`}>{f.q}</span>
                  <ChevronDown size={15} className={`text-gold flex-shrink-0 transition-transform ${openFaq===i?"rotate-180":""}`}/>
                </button>
                {openFaq===i && <p className={`px-5 pb-5 font-body text-sm leading-relaxed ${textSub}`}>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
