import React, { useState, useEffect } from "react";
import { ArrowLeftRight, TrendingUp, Globe } from "lucide-react";

const RATES = { USD:1, EUR:0.92, GBP:0.79, INR:83.12, AED:3.67, JPY:149.5, AUD:1.53, CAD:1.36, SGD:1.34, THB:35.1, IDR:15600, MXN:17.2, BRL:4.97, ZAR:18.6, CHF:0.9 };
const FLAGS = { USD:"🇺🇸", EUR:"🇪🇺", GBP:"🇬🇧", INR:"🇮🇳", AED:"🇦🇪", JPY:"🇯🇵", AUD:"🇦🇺", CAD:"🇨🇦", SGD:"🇸🇬", THB:"🇹🇭", IDR:"🇮🇩", MXN:"🇲🇽", BRL:"🇧🇷", ZAR:"🇿🇦", CHF:"🇨🇭" };
const NAMES = { USD:"US Dollar", EUR:"Euro", GBP:"British Pound", INR:"Indian Rupee", AED:"UAE Dirham", JPY:"Japanese Yen", AUD:"Australian Dollar", CAD:"Canadian Dollar", SGD:"Singapore Dollar", THB:"Thai Baht", IDR:"Indonesian Rupiah", MXN:"Mexican Peso", BRL:"Brazilian Real", ZAR:"South African Rand", CHF:"Swiss Franc" };

const POPULAR_TRIPS = [
  { from:"Maldives", price:1250, currency:"USD" },
  { from:"Santorini", price:450, currency:"EUR" },
  { from:"Bali", price:3200000, currency:"IDR" },
  { from:"Swiss Alps", price:890, currency:"CHF" },
  { from:"Amalfi Coast", price:620, currency:"EUR" },
  { from:"Tokyo", price:58000, currency:"JPY" },
];

export default function CurrencyConverterPage({ darkMode }) {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");

  const convert = (val, f, t) => ((val / RATES[f]) * RATES[t]).toFixed(2);
  const swap = () => { const tmp = from; setFrom(to); setTo(tmp); };

  const bg = darkMode ? "bg-obsidian" : "bg-stone-50";
  const card = darkMode ? "bg-[#1a1a1a] border-white/8" : "bg-white border-stone-100";
  const txt = darkMode ? "text-ivory" : "text-obsidian";
  const sub = darkMode ? "text-ivory/50" : "text-obsidian/50";
  const inp = darkMode ? "bg-white/5 border-white/10 text-ivory" : "bg-stone-50 border-stone-200 text-obsidian";
  const sel = darkMode ? "bg-[#1a1a1a] border-white/10 text-ivory" : "bg-white border-stone-200 text-obsidian";

  return (
    <div className={`${bg} min-h-screen pt-20`}>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <Globe size={36} className="mx-auto mb-3" style={{ color: "#FF385C" }} />
          <h1 className={`font-display text-4xl font-light ${txt}`}>Currency <em>Converter</em></h1>
          <p className={`font-body text-sm ${sub} mt-1`}>Check prices in your local currency before booking</p>
        </div>

        {/* Converter */}
        <div className={`rounded-2xl border p-6 mb-6 ${card}`}>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className={`font-body text-xs uppercase tracking-wider ${sub} block mb-1.5`}>Amount</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 font-body text-lg font-semibold outline-none focus:border-gold transition-colors ${inp}`} />
            </div>
            <div className="flex-1">
              <label className={`font-body text-xs uppercase tracking-wider ${sub} block mb-1.5`}>From</label>
              <select value={from} onChange={e => setFrom(e.target.value)}
                className={`w-full border rounded-xl px-3 py-3 font-body text-sm outline-none ${sel}`}>
                {Object.keys(RATES).map(c => <option key={c} value={c}>{FLAGS[c]} {c} — {NAMES[c]}</option>)}
              </select>
            </div>
            <button onClick={swap} className="mt-5 w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors flex-shrink-0">
              <ArrowLeftRight size={16} className="text-gold" />
            </button>
            <div className="flex-1">
              <label className={`font-body text-xs uppercase tracking-wider ${sub} block mb-1.5`}>To</label>
              <select value={to} onChange={e => setTo(e.target.value)}
                className={`w-full border rounded-xl px-3 py-3 font-body text-sm outline-none ${sel}`}>
                {Object.keys(RATES).map(c => <option key={c} value={c}>{FLAGS[c]} {c} — {NAMES[c]}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-5 p-4 rounded-xl text-center" style={{ background: "rgba(255,56,92,0.08)" }}>
            <p className={`font-body text-sm ${sub} mb-1`}>{amount} {from} =</p>
            <p className="font-display text-4xl font-light" style={{ color: "#FF385C" }}>
              {FLAGS[to]} {Number(convert(amount, from, to)).toLocaleString()} <span className="text-2xl">{to}</span>
            </p>
            <p className={`font-body text-xs ${sub} mt-1`}>1 {from} = {convert(1, from, to)} {to}</p>
          </div>
        </div>

        {/* Popular property prices */}
        <h3 className={`font-display text-xl ${txt} mb-4`}>Popular Properties in <em>Your Currency</em></h3>
        <div className="grid grid-cols-2 gap-3">
          {POPULAR_TRIPS.map(trip => (
            <div key={trip.from} className={`rounded-xl border p-4 ${card}`}>
              <p className={`font-body text-xs ${sub} mb-1`}>{trip.from}</p>
              <p className={`font-body text-sm ${sub}`}>{FLAGS[trip.currency]} {trip.price.toLocaleString()} {trip.currency}/night</p>
              <p className="font-body text-base font-semibold text-gold mt-1">
                {FLAGS[to]} {Number(convert(trip.price, trip.currency, to)).toLocaleString()} {to}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
