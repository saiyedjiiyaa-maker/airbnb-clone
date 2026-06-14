import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CheckCircle, Shield, Calendar, Users, CreditCard, Lock, ChevronRight, Star, MapPin, ArrowLeft } from "lucide-react";
import { properties } from "../data/properties";
import { useAuth } from "../context/AuthContext";

const currencies = [{code:"USD",symbol:"$",rate:1},{code:"EUR",symbol:"€",rate:0.92},{code:"GBP",symbol:"£",rate:0.79},{code:"INR",symbol:"₹",rate:83.5}];

export default function BookingPage({ darkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const property = properties.find(p => p.id === Number(id));

  const [step, setStep]         = useState(1); // 1=details, 2=payment, 3=confirmed
  const [checkIn, setCheckIn]   = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests]     = useState(1);
  const [cardNum, setCardNum]   = useState("");
  const [expiry, setExpiry]     = useState("");
  const [cvv, setCvv]           = useState("");
  const [cardName, setCardName] = useState("");
  const [payMethod, setPayMethod] = useState("card");
  const [currency, setCurrency] = useState(currencies[0]);
  const [specialReq, setSpecialReq] = useState("");
  const [agreed, setAgreed]     = useState(false);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const confirmCode = `AIR-${Date.now().toString().slice(-8)}`;

  const textMain = darkMode ? "text-ivory"    : "text-obsidian";
  const textSub  = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg   = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const pageBg   = darkMode ? "bg-obsidian" : "bg-ivory-50";
  const inputBg  = { background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.95)" };

  if (!property) return <div className={`${pageBg} min-h-screen pt-24 flex items-center justify-center`}><Link to="/" className="btn-gold rounded-full">Back to Home</Link></div>;
  if (!user) return (
    <div className={`${pageBg} min-h-screen pt-24 flex items-center justify-center`}>
      <div className="text-center"><h2 className={`font-display text-3xl ${textMain} mb-4`}>Sign in to book</h2><Link to="/login" className="btn-gold rounded-full">Sign In</Link></div>
    </div>
  );

  const nights    = checkIn && checkOut ? Math.max(1, Math.round((new Date(checkOut)-new Date(checkIn))/(1000*60*60*24))) : 1;
  const rate      = Math.round(property.price * currency.rate);
  const subtotal  = rate * nights;
  const cleaning  = Math.round(rate * 0.08);
  const service   = Math.round(subtotal * 0.12);
  const total     = subtotal + cleaning + service;

  const validateStep1 = () => {
    const e = {};
    if (!checkIn)  e.checkIn  = "Required";
    if (!checkOut) e.checkOut = "Required";
    if (checkOut && checkIn && new Date(checkOut) <= new Date(checkIn)) e.checkOut = "Must be after check-in";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (payMethod==="card") {
      if (cardNum.replace(/\s/g,"").length < 16) e.cardNum = "Enter valid card number";
      if (!expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = "Format: MM/YY";
      if (cvv.length < 3) e.cvv = "Enter valid CVV";
      if (!cardName.trim()) e.cardName = "Required";
    }
    if (!agreed) e.agreed = "Please accept the terms";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) {
      setLoading(true);
      setTimeout(() => { setLoading(false); setStep(3); }, 2000);
    }
  };

  const formatCard = (v) => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();

  return (
    <div className={`${pageBg} min-h-screen pt-24`}>
      <div className="max-w-5xl mx-auto px-4 py-10">

        {step < 3 && (
          <div className="mb-8">
            <Link to={`/property/${id}`} className={`flex items-center gap-1 font-body text-sm ${textSub} hover:text-gold mb-4 transition-colors`}><ArrowLeft size={14}/> Back to property</Link>
            <h1 className={`font-display text-3xl font-light ${textMain}`}>
              {step===1?"Confirm your <em>Trip</em>":"Secure <em>Payment</em>"}
            </h1>
            {/* Progress */}
            <div className="flex items-center gap-2 mt-4">
              {["Trip Details","Payment","Confirmed"].map((s,i) => (
                <React.Fragment key={s}>
                  <div className={`flex items-center gap-1.5 font-body text-xs ${i+1<=step?"text-gold":textSub}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${i+1<step?"bg-gold border-gold text-black":i+1===step?"border-gold text-gold":"border-gold/30 text-gold/30"}`}>
                      {i+1<step?"✓":i+1}
                    </div>
                    <span className="hidden sm:block">{s}</span>
                  </div>
                  {i<2 && <div className={`flex-1 h-px ${i+1<step?"bg-gold":"bg-gold/20"}`}/>}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {step === 3 ? (
          <div className="max-w-lg mx-auto text-center py-10">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-green-400"/></div>
            <h2 className={`font-display text-4xl font-light ${textMain} mb-3`}>Booking <em className="text-gold">Confirmed!</em></h2>
            <p className={`font-body text-sm ${textSub} mb-6`}>Confirmation sent to {user.email}</p>
            <div className={`rounded-2xl border p-6 mb-6 ${cardBg} text-left space-y-3`}>
              <div className="flex items-center gap-3 mb-4">
                <img src={property.img} alt="" className="w-16 h-16 rounded-xl object-cover"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                <div><p className={`font-body text-sm font-semibold ${textMain}`}>{property.title}</p><p className={`font-body text-xs ${textSub}`}>{property.location}</p></div>
              </div>
              {[["Dates",`${checkIn} → ${checkOut}`],["Guests",`${guests} guest${guests>1?"s":""}`],["Nights",`${nights}`],["Total",`${currency.symbol}${total.toLocaleString()}`],["Confirmation",confirmCode]].map(([k,v]) => (
                <div key={k} className="flex justify-between"><span className={`font-body text-sm ${textSub}`}>{k}</span><span className={`font-body text-sm font-semibold ${k==="Total"?"text-gold":textMain}`}>{v}</span></div>
              ))}
            </div>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link to="/trips" className="btn-gold rounded-full px-6">View My Trips</Link>
              <Link to="/" className={`font-body text-sm border border-gold/30 text-gold px-6 py-2.5 rounded-full hover:bg-gold/10 transition-colors`}>Back to Home</Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left — form */}
            <div className="lg:col-span-2 space-y-6">
              {step === 1 && (
                <>
                  <div className={`rounded-2xl border p-6 ${cardBg}`}>
                    <h3 className={`font-display text-xl ${textMain} mb-4`}>Your Trip</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className={`font-body text-xs uppercase tracking-wider ${textSub} mb-1 block`}>Check-in</label>
                        <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} min={new Date().toISOString().split("T")[0]}
                          className={`lux-input text-sm w-full ${darkMode?"text-ivory":"text-obsidian"}`} style={inputBg}/>
                        {errors.checkIn && <p className="text-red-400 text-xs mt-1">{errors.checkIn}</p>}
                      </div>
                      <div>
                        <label className={`font-body text-xs uppercase tracking-wider ${textSub} mb-1 block`}>Check-out</label>
                        <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} min={checkIn||new Date().toISOString().split("T")[0]}
                          className={`lux-input text-sm w-full ${darkMode?"text-ivory":"text-obsidian"}`} style={inputBg}/>
                        {errors.checkOut && <p className="text-red-400 text-xs mt-1">{errors.checkOut}</p>}
                      </div>
                    </div>
                    <div>
                      <label className={`font-body text-xs uppercase tracking-wider ${textSub} mb-1 block`}>Guests</label>
                      <select value={guests} onChange={e=>setGuests(Number(e.target.value))} className={`lux-input text-sm w-full ${darkMode?"text-ivory":"text-obsidian"}`} style={inputBg}>
                        {Array.from({length:property.guests},(_,i)=>i+1).map(n=><option key={n} value={n}>{n} Guest{n>1?"s":""}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className={`rounded-2xl border p-6 ${cardBg}`}>
                    <h3 className={`font-display text-xl ${textMain} mb-4`}>Special Requests</h3>
                    <textarea value={specialReq} onChange={e=>setSpecialReq(e.target.value)} rows={3} placeholder="Early check-in, dietary needs, special occasions..."
                      className={`lux-input text-sm w-full resize-none ${darkMode?"text-ivory":"text-obsidian"}`} style={inputBg}/>
                    <p className={`font-body text-xs ${textSub} mt-2`}>Special requests cannot be guaranteed but we'll do our best.</p>
                  </div>
                  <div className={`rounded-2xl border p-6 ${cardBg}`}>
                    <h3 className={`font-display text-xl ${textMain} mb-3`}>Ground Rules</h3>
                    {["No smoking or parties","Pets require prior approval","Check-out by 11:00 AM","Treat the property with care"].map(r=>(
                      <div key={r} className="flex items-center gap-2 py-2 border-b border-gold/5 last:border-0">
                        <CheckCircle size={13} className="text-gold flex-shrink-0"/><span className={`font-body text-sm ${textSub}`}>{r}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className={`rounded-2xl border p-6 ${cardBg}`}>
                    <h3 className={`font-display text-xl ${textMain} mb-4`}>Payment Method</h3>
                    <div className="flex gap-3 mb-5">
                      {[{id:"card",label:"💳 Card"},{id:"paypal",label:"🅿️ PayPal"},{id:"apple",label:"🍎 Apple Pay"}].map(m=>(
                        <button key={m.id} onClick={()=>setPayMethod(m.id)}
                          className={`flex-1 py-3 rounded-xl border font-body text-sm transition-all ${payMethod===m.id?"border-gold bg-gold/10 text-gold":`border-gold/20 ${textSub} hover:border-gold/40`}`}>{m.label}</button>
                      ))}
                    </div>
                    {payMethod==="card" && (
                      <div className="space-y-4">
                        <div>
                          <label className={`font-body text-xs uppercase tracking-wider ${textSub} mb-1 block`}>Card Number</label>
                          <div className="relative">
                            <CreditCard size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${textSub}`}/>
                            <input value={cardNum} onChange={e=>setCardNum(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19}
                              className={`lux-input pl-9 text-sm w-full font-mono ${darkMode?"text-ivory":"text-obsidian"}`} style={inputBg}/>
                          </div>
                          {errors.cardNum && <p className="text-red-400 text-xs mt-1">{errors.cardNum}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={`font-body text-xs uppercase tracking-wider ${textSub} mb-1 block`}>Expiry (MM/YY)</label>
                            <input value={expiry} onChange={e=>{const v=e.target.value.replace(/\D/g,"").slice(0,4);setExpiry(v.length>2?v.slice(0,2)+"/"+v.slice(2):v);}} placeholder="MM/YY" maxLength={5}
                              className={`lux-input text-sm w-full ${darkMode?"text-ivory":"text-obsidian"}`} style={inputBg}/>
                            {errors.expiry && <p className="text-red-400 text-xs mt-1">{errors.expiry}</p>}
                          </div>
                          <div>
                            <label className={`font-body text-xs uppercase tracking-wider ${textSub} mb-1 block`}>CVV</label>
                            <div className="relative">
                              <Lock size={13} className={`absolute left-3 top-1/2 -translate-y-1/2 ${textSub}`}/>
                              <input value={cvv} onChange={e=>setCvv(e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="123" maxLength={4}
                                className={`lux-input pl-9 text-sm w-full ${darkMode?"text-ivory":"text-obsidian"}`} style={inputBg}/>
                            </div>
                            {errors.cvv && <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>}
                          </div>
                        </div>
                        <div>
                          <label className={`font-body text-xs uppercase tracking-wider ${textSub} mb-1 block`}>Name on Card</label>
                          <input value={cardName} onChange={e=>setCardName(e.target.value)} placeholder="As it appears on your card"
                            className={`lux-input text-sm w-full ${darkMode?"text-ivory":"text-obsidian"}`} style={inputBg}/>
                          {errors.cardName && <p className="text-red-400 text-xs mt-1">{errors.cardName}</p>}
                        </div>
                      </div>
                    )}
                    {payMethod!=="card" && (
                      <div className="py-8 text-center">
                        <p className={`font-body text-sm ${textSub}`}>You'll be redirected to {payMethod==="paypal"?"PayPal":"Apple Pay"} to complete your payment securely.</p>
                      </div>
                    )}
                  </div>

                  <div className={`rounded-2xl border p-5 ${cardBg}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} id="agree" className="accent-gold"/>
                      <label htmlFor="agree" className={`font-body text-sm ${textSub} cursor-pointer`}>
                        I agree to the <button className="text-gold hover:underline">Terms of Service</button>, <button className="text-gold hover:underline">Privacy Policy</button>, and <button className="text-gold hover:underline">Cancellation Policy</button>.
                      </label>
                    </div>
                    {errors.agreed && <p className="text-red-400 text-xs">{errors.agreed}</p>}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-green-400">
                    <Shield size={13}/><span>Your payment is protected by 256-bit SSL encryption.</span>
                  </div>
                </>
              )}

              <button onClick={handleNext} disabled={loading}
                className="w-full py-4 rounded-2xl font-body text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-70"
                style={{background:"linear-gradient(135deg,#FF385C,#c9316b)"}}>
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Processing...</>
                ) : step===1 ? <>Continue to Payment <ChevronRight size={16}/></> : <>Confirm & Pay {currency.symbol}{total.toLocaleString()} <Lock size={14}/></>}
              </button>
            </div>

            {/* Right — property summary */}
            <div>
              <div className={`sticky top-24 rounded-2xl border p-5 ${cardBg}`}>
                <img src={property.img} alt={property.title} className="w-full h-40 object-cover rounded-xl mb-4"
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                <h3 className={`font-display text-base font-medium ${textMain} mb-1 leading-tight`}>{property.title}</h3>
                <div className="flex items-center gap-1 mb-1"><MapPin size={11} className="text-gold"/><span className={`font-body text-xs ${textSub}`}>{property.location}</span></div>
                <div className="flex items-center gap-1 mb-4"><Star size={11} className="text-gold fill-gold"/><span className={`font-body text-xs font-semibold ${textMain}`}>{property.rating}</span><span className={`font-body text-xs ${textSub}`}> ({property.reviews})</span></div>

                <div className="flex items-center gap-2 mb-4">
                  <select value={currency.code} onChange={e=>setCurrency(currencies.find(c=>c.code===e.target.value))}
                    className={`lux-input text-xs flex-1 ${darkMode?"text-ivory":"text-obsidian"}`} style={inputBg}>
                    {currencies.map(c=><option key={c.code} value={c.code}>{c.code} {c.symbol}</option>)}
                  </select>
                </div>

                <div className="space-y-2 text-xs font-body border-t border-gold/10 pt-4">
                  <div className="flex justify-between"><span className={textSub}>{currency.symbol}{rate} × {nights} night{nights>1?"s":""}</span><span className={textMain}>{currency.symbol}{subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className={textSub}>Cleaning fee</span><span className={textMain}>{currency.symbol}{cleaning.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className={textSub}>Service fee</span><span className={textMain}>{currency.symbol}{service.toLocaleString()}</span></div>
                  <div className="flex justify-between font-semibold border-t border-gold/10 pt-2">
                    <span className={textMain}>Total</span><span className="text-gold">{currency.symbol}{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5">
                  {[{icon:Shield,label:"AirCover included"},{icon:CheckCircle,label:"Free cancellation 48hrs"},{icon:Lock,label:"Secure payment"}].map(({icon:Icon,label})=>(
                    <div key={label} className="flex items-center gap-2"><Icon size={12} className="text-gold"/><span className={`font-body text-xs ${textSub}`}>{label}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
