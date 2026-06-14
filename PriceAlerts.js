import React, { useState, useEffect } from "react";
import { Bell, BellOff, TrendingDown, X, Plus, Check, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { properties } from "../data/properties";
import { useAuth } from "../context/AuthContext";

const STORAGE_KEY = "airbnb_price_alerts";

// Simulate price history with slight random variation
function simulatePriceHistory(basePrice) {
  const history = [];
  let price = basePrice * 1.15; // start higher
  for (let i = 6; i >= 0; i--) {
    price = price * (0.97 + Math.random() * 0.06);
    history.push(Math.round(price));
  }
  history.push(basePrice); // current price is lowest
  return history;
}

export default function PriceAlerts({ darkMode }) {
  const { wishlist } = useAuth();
  const [alerts, setAlerts] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
    catch { return {}; }
  });
  const [showPanel, setShowPanel] = useState(false);
  const [addingId, setAddingId] = useState(null);
  const [targetPrice, setTargetPrice] = useState("");
  const [triggered, setTriggered] = useState([]);

  // Persist alerts
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
  }, [alerts]);

  // Simulate checking for price drops on mount
  useEffect(() => {
    const drops = [];
    Object.entries(alerts).forEach(([id, alert]) => {
      const prop = properties.find((p) => p.id === Number(id));
      if (prop && alert.targetPrice && prop.price <= alert.targetPrice && !alert.dismissed) {
        drops.push({ ...prop, targetPrice: alert.targetPrice, savedAmount: alert.originalPrice - prop.price });
      }
    });
    setTriggered(drops);
  }, [alerts]);

  const wishlistProperties = properties.filter((p) => wishlist.includes(p.id));

  const addAlert = (propId) => {
    const prop = properties.find((p) => p.id === propId);
    if (!prop) return;
    const target = Number(targetPrice) || Math.round(prop.price * 0.85);
    setAlerts((prev) => ({
      ...prev,
      [propId]: { targetPrice: target, originalPrice: prop.price, createdAt: Date.now(), dismissed: false },
    }));
    setAddingId(null);
    setTargetPrice("");
  };

  const removeAlert = (propId) => {
    setAlerts((prev) => { const n = { ...prev }; delete n[propId]; return n; });
  };

  const dismissTriggered = (propId) => {
    setAlerts((prev) => ({ ...prev, [propId]: { ...prev[propId], dismissed: true } }));
    setTriggered((prev) => prev.filter((p) => p.id !== propId));
  };

  const alertCount = Object.keys(alerts).length;
  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  const textSub = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg = darkMode ? "bg-[#111] border-white/10" : "bg-white border-stone-200";
  const rowBg = darkMode ? "bg-white/5 border-white/8" : "bg-stone-50 border-stone-100";
  const inputBg = darkMode ? "bg-white/5 border-white/10 text-ivory" : "bg-white border-stone-200 text-obsidian";

  return (
    <>
      {/* Triggered alert banner */}
      {triggered.length > 0 && (
        <div className="fixed top-20 right-4 z-50 space-y-2 max-w-xs w-full">
          {triggered.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-green-500/30 bg-green-500/10 backdrop-blur-sm p-4 shadow-xl"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingDown size={14} className="text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-xs font-semibold text-green-400 mb-0.5">Price Drop Alert! 🎉</p>
                  <p className={`font-body text-xs ${textMain} line-clamp-1 mb-1`}>{p.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-lg text-green-400">${p.price}</span>
                    <span className={`font-body text-xs ${textSub} line-through`}>${p.originalPrice}</span>
                    <span className="font-body text-xs text-green-400 font-semibold">
                      <ArrowDown size={10} className="inline" /> ${p.savedAmount} off
                    </span>
                  </div>
                  <Link
                    to={`/property/${p.id}`}
                    className="mt-2 inline-block font-body text-xs text-gold hover:underline"
                  >
                    View property →
                  </Link>
                </div>
                <button onClick={() => dismissTriggered(p.id)} className={`${textSub} hover:text-gold`}>
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm border transition-all hover:border-gold hover:text-gold ${
          showPanel
            ? "bg-gold text-black border-gold"
            : darkMode
            ? "border-white/15 text-ivory/70"
            : "border-stone-200 text-obsidian/70"
        }`}
      >
        <Bell size={14} />
        Price Alerts
        {alertCount > 0 && (
          <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${showPanel ? "bg-black text-gold" : "bg-gold text-black"}`}>
            {alertCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {showPanel && (
        <div className={`absolute top-full mt-2 right-0 z-40 w-80 rounded-2xl border shadow-2xl ${cardBg}`}
          style={{ minWidth: "300px" }}>
          <div className="p-4 border-b border-gold/15">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-body text-sm font-semibold ${textMain}`}>Price Drop Alerts</h3>
                <p className={`font-body text-xs ${textSub}`}>Get notified when prices fall</p>
              </div>
              <button onClick={() => setShowPanel(false)} className={`${textSub} hover:text-gold`}>
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="p-4 max-h-80 overflow-y-auto space-y-3">
            {wishlistProperties.length === 0 ? (
              <div className="text-center py-6">
                <Bell size={24} className={`mx-auto mb-2 ${textSub}`} />
                <p className={`font-body text-sm ${textSub}`}>Add properties to your wishlist to set price alerts</p>
                <Link to="/properties" className="font-body text-xs text-gold hover:underline mt-1 inline-block">
                  Browse properties →
                </Link>
              </div>
            ) : (
              wishlistProperties.map((p) => {
                const alert = alerts[p.id];
                const isAdding = addingId === p.id;
                const history = simulatePriceHistory(p.price);
                const drop = Math.round(((history[0] - p.price) / history[0]) * 100);

                return (
                  <div key={p.id} className={`rounded-xl border p-3 ${rowBg}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=100&q=80"; }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-body text-xs font-semibold ${textMain} truncate`}>{p.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-display text-sm text-gold">${p.price}/night</span>
                          {drop > 0 && (
                            <span className="font-body text-xs text-green-400 flex items-center gap-0.5">
                              <TrendingDown size={10} /> {drop}% below peak
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Mini sparkline */}
                    <div className="flex items-end gap-0.5 h-8 mb-2">
                      {history.map((val, i) => {
                        const max = Math.max(...history);
                        const min = Math.min(...history);
                        const pct = ((val - min) / (max - min || 1)) * 100;
                        const isLast = i === history.length - 1;
                        return (
                          <div
                            key={i}
                            className="flex-1 rounded-t-sm transition-all"
                            style={{
                              height: `${Math.max(20, pct)}%`,
                              background: isLast ? "#22c55e" : "rgba(201,168,76,0.3)",
                            }}
                          />
                        );
                      })}
                    </div>
                    <p className={`font-body text-[10px] ${textSub} mb-2`}>7-day price history</p>

                    {alert ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Check size={12} className="text-green-400" />
                          <span className={`font-body text-xs ${textSub}`}>
                            Alert set: drop below <strong className="text-gold">${alert.targetPrice}</strong>
                          </span>
                        </div>
                        <button onClick={() => removeAlert(p.id)} className={`${textSub} hover:text-red-400 transition-colors`}>
                          <BellOff size={13} />
                        </button>
                      </div>
                    ) : isAdding ? (
                      <div className="flex items-center gap-2">
                        <span className={`font-body text-xs ${textSub} flex-shrink-0`}>Alert at $</span>
                        <input
                          type="number"
                          value={targetPrice}
                          onChange={(e) => setTargetPrice(e.target.value)}
                          placeholder={Math.round(p.price * 0.85)}
                          className={`flex-1 rounded-lg border px-2 py-1 font-body text-xs outline-none focus:border-gold/50 ${inputBg}`}
                          autoFocus
                        />
                        <button onClick={() => addAlert(p.id)} className="w-7 h-7 rounded-lg bg-gold flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-black" />
                        </button>
                        <button onClick={() => setAddingId(null)} className={`${textSub} hover:text-gold`}>
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setAddingId(p.id); setTargetPrice(""); }}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-gold/30 font-body text-xs text-gold hover:bg-gold/10 transition-colors"
                      >
                        <Plus size={11} /> Set Price Alert
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {wishlistProperties.length > 0 && (
            <div className="p-3 border-t border-gold/10">
              <p className={`font-body text-xs text-center ${textSub}`}>
                Alerts check prices daily · You'll see a notification here
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
