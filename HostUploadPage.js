import React, { useState } from "react";
import { CheckCircle, Upload, Users, BedDouble, Bath, Tag } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const steps = ["Basics", "Details", "Amenities", "Pricing", "Photos", "Review"];
const allAmenities = ["WiFi", "Pool", "Kitchen", "AC", "Hot Tub", "Parking", "Gym", "Washer", "Dryer", "Fireplace", "Balcony", "Garden", "BBQ", "Breakfast", "Concierge", "Spa", "Sauna", "Beach Access"];

export default function HostUploadPage({ darkMode }) {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "", type: "Entire Villa", location: "", country: "", description: "",
    guests: 2, bedrooms: 1, bathrooms: 1, beds: 1,
    amenities: [], price: "", category: "Beachfront",
    images: [], imgUrl: "",
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const toggleAmenity = (a) => set("amenities", form.amenities.includes(a) ? form.amenities.filter(x => x !== a) : [...form.amenities, a]);

  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  const textSub = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const pageBg = darkMode ? "bg-obsidian" : "bg-ivory-50";

  if (!user) return (
    <div className={`${pageBg} min-h-screen pt-24 flex items-center justify-center`}>
      <div className="text-center px-4">
        <h2 className={`font-display text-3xl ${textMain} mb-4`}>Sign in to list your property</h2>
        <Link to="/login" className="btn-gold rounded-full">Sign In</Link>
      </div>
    </div>
  );

  if (submitted) return (
    <div className={`${pageBg} min-h-screen pt-24 flex items-center justify-center`}>
      <div className="text-center px-4 max-w-md">
        <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-gold" />
        </div>
        <h2 className={`font-display text-4xl font-light ${textMain} mb-3`}>Listing Submitted!</h2>
        <p className={`font-body text-sm ${textSub} mb-8`}>
          Thank you for listing with Airbnb. Our curation team will review your property within 48 hours and reach out with next steps.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/dashboard" className="btn-gold rounded-full">View Dashboard</Link>
          <button onClick={() => { setSubmitted(false); setStep(0); setForm({ title: "", type: "Entire Villa", location: "", country: "", description: "", guests: 2, bedrooms: 1, bathrooms: 1, beds: 1, amenities: [], price: "", category: "Beachfront", images: [], imgUrl: "" }); }} className="btn-outline-gold rounded-full">List Another</button>
        </div>
      </div>
    </div>
  );

  const inputStyle = {
    background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)",
  };

  return (
    <div className={`${pageBg} min-h-screen pt-24`}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-2">Host Portal</p>
          <h1 className={`font-display text-4xl font-light ${textMain}`}>List Your <em>Property</em></h1>
          <div className="gold-line mt-4" />
        </div>

        {/* Progress */}
        <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all ${
                  i === step ? "bg-gold text-black" : i < step ? "text-gold border border-gold/30" : `${textSub} border border-gold/10`
                }`}
              >
                {i < step && <CheckCircle size={12} />}
                {i + 1}. {s}
              </button>
              {i < steps.length - 1 && <div className={`flex-1 h-px min-w-4 ${i < step ? "bg-gold" : "bg-gold/15"}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Step Forms */}
        <div className={`rounded-2xl border p-6 ${cardBg} mb-6`}>
          {/* STEP 0: Basics */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className={`font-display text-2xl font-medium ${textMain} mb-1`}>Basic Information</h2>
              <div>
                <label className={`font-body text-xs uppercase tracking-wider ${textSub} block mb-2`}>Property Title *</label>
                <input value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Santorini Cliffside Villa with Pool" className={`lux-input text-sm ${darkMode ? "text-ivory" : "text-obsidian"}`} style={inputStyle} />
              </div>
              <div>
                <label className={`font-body text-xs uppercase tracking-wider ${textSub} block mb-2`}>Property Type</label>
                <select value={form.type} onChange={e => set("type", e.target.value)} className={`lux-input text-sm ${darkMode ? "text-ivory" : "text-obsidian"}`} style={inputStyle}>
                  {["Entire Villa", "Entire Apartment", "Penthouse", "Overwater Bungalow", "Chalet", "Treehouse", "Cabin", "Riad", "Cottage"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={`font-body text-xs uppercase tracking-wider ${textSub} block mb-2`}>Category</label>
                <select value={form.category} onChange={e => set("category", e.target.value)} className={`lux-input text-sm ${darkMode ? "text-ivory" : "text-obsidian"}`} style={inputStyle}>
                  {["Beachfront", "Mountains", "City", "Countryside", "Unique"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={`font-body text-xs uppercase tracking-wider ${textSub} block mb-2`}>Description *</label>
                <textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Describe what makes your property unique and luxurious…" rows={4} className={`lux-input text-sm resize-none ${darkMode ? "text-ivory" : "text-obsidian"}`} style={inputStyle} />
              </div>
            </div>
          )}

          {/* STEP 1: Details */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className={`font-display text-2xl font-medium ${textMain} mb-1`}>Location & Capacity</h2>
              <div>
                <label className={`font-body text-xs uppercase tracking-wider ${textSub} block mb-2`}>Full Address / Location *</label>
                <input value={form.location} onChange={e => set("location", e.target.value)} placeholder="City, Region, Country" className={`lux-input text-sm ${darkMode ? "text-ivory" : "text-obsidian"}`} style={inputStyle} />
              </div>
              <div>
                <label className={`font-body text-xs uppercase tracking-wider ${textSub} block mb-2`}>Country</label>
                <input value={form.country} onChange={e => set("country", e.target.value)} placeholder="e.g. Greece" className={`lux-input text-sm ${darkMode ? "text-ivory" : "text-obsidian"}`} style={inputStyle} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "guests", label: "Max Guests", icon: Users },
                  { key: "bedrooms", label: "Bedrooms", icon: BedDouble },
                  { key: "beds", label: "Beds", icon: BedDouble },
                  { key: "bathrooms", label: "Bathrooms", icon: Bath },
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key}>
                    <label className={`font-body text-xs uppercase tracking-wider ${textSub} block mb-2`}>{label}</label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => set(key, Math.max(1, form[key] - 1))} className="w-8 h-8 rounded-full border border-gold/30 text-gold hover:border-gold flex items-center justify-center font-body">−</button>
                      <span className={`font-display text-2xl ${textMain} w-8 text-center`}>{form[key]}</span>
                      <button onClick={() => set(key, form[key] + 1)} className="w-8 h-8 rounded-full border border-gold/30 text-gold hover:border-gold flex items-center justify-center font-body">+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Amenities */}
          {step === 2 && (
            <div>
              <h2 className={`font-display text-2xl font-medium ${textMain} mb-1`}>Amenities</h2>
              <p className={`font-body text-sm ${textSub} mb-5`}>Select all amenities your property offers</p>
              <div className="flex flex-wrap gap-2">
                {allAmenities.map(a => (
                  <button key={a} onClick={() => toggleAmenity(a)} className={`chip ${form.amenities.includes(a) ? "active" : darkMode ? "text-ivory/60 border-ivory/20" : "text-obsidian/60"}`}>
                    {form.amenities.includes(a) && <CheckCircle size={12} />}
                    {a}
                  </button>
                ))}
              </div>
              <p className={`font-body text-xs ${textSub} mt-4`}>{form.amenities.length} selected</p>
            </div>
          )}

          {/* STEP 3: Pricing */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className={`font-display text-2xl font-medium ${textMain} mb-1`}>Pricing</h2>
              <div>
                <label className={`font-body text-xs uppercase tracking-wider ${textSub} block mb-2`}>Nightly Rate (USD) *</label>
                <div className="flex items-center gap-0">
                  <span className={`lux-input text-sm font-semibold text-gold px-3 py-3 rounded-l-lg rounded-r-none border-r-0`} style={{...inputStyle, width:"auto", minWidth:36}}>$</span>
                  <input type="number" value={form.price} onChange={e => set("price", e.target.value)} placeholder="e.g. 450"
                    className={`lux-input text-sm rounded-l-none ${darkMode ? "text-ivory" : "text-obsidian"}`}
                    style={{...inputStyle, flex:1, borderRadius:"0 8px 8px 0"}} />
                </div>
              </div>
              {form.price && (
                <div className={`rounded-xl border border-gold/10 p-4 space-y-2`} style={{ background: darkMode ? "rgba(201,168,76,0.05)" : "rgba(201,168,76,0.03)" }}>
                  <p className={`font-body text-sm font-semibold ${textMain}`}>Estimated earnings</p>
                  {[
                    { label: "Per night", val: `$${form.price}` },
                    { label: "Per week (est.)", val: `$${(form.price * 7 * 0.85).toFixed(0)}` },
                    { label: "Per month (est.)", val: `$${(form.price * 25 * 0.75).toFixed(0)}` },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex justify-between">
                      <span className={`font-body text-xs ${textSub}`}>{label}</span>
                      <span className="font-body text-sm text-gold font-medium">{val}</span>
                    </div>
                  ))}
                  <p className={`font-body text-xs ${textSub} pt-1 border-t border-gold/10`}>After Airbnb's 12% service fee</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Photos */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className={`font-display text-2xl font-medium ${textMain} mb-1`}>Photos</h2>
              <p className={`font-body text-sm ${textSub}`}>Add image URLs to showcase your property. We recommend high-quality landscape photos.</p>
              <div>
                <label className={`font-body text-xs uppercase tracking-wider ${textSub} block mb-2`}>Add Image URL</label>
                <div className="flex gap-2">
                  <input value={form.imgUrl} onChange={e => set("imgUrl", e.target.value)} placeholder="https://example.com/image.jpg" className={`lux-input flex-1 text-sm ${darkMode ? "text-ivory" : "text-obsidian"}`} style={inputStyle} />
                  <button onClick={() => { if (form.imgUrl) { set("images", [...form.images, form.imgUrl]); set("imgUrl", ""); }}} className="btn-gold rounded-lg px-4 py-2 text-sm">Add</button>
                </div>
              </div>
              {form.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                      <img src={img} alt="" className="w-full h-full object-cover" onError={e => e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} />
                      <button onClick={() => set("images", form.images.filter((_, j) => j !== i))} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-body text-xs">Remove</button>
                    </div>
                  ))}
                </div>
              )}
              {form.images.length === 0 && (
                <div className={`rounded-xl border-2 border-dashed border-gold/20 p-10 text-center`}>
                  <Upload size={32} className="text-gold/30 mx-auto mb-2" />
                  <p className={`font-body text-sm ${textSub}`}>No photos added yet</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Review */}
          {step === 5 && (
            <div className="space-y-5">
              <h2 className={`font-display text-2xl font-medium ${textMain} mb-1`}>Review & Submit</h2>
              <p className={`font-body text-sm ${textSub}`}>Please review your listing before submitting.</p>
              {form.images[0] && <img src={form.images[0]} alt="" className="w-full h-48 object-cover rounded-xl" onError={e => e.target.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} />}
              <div className="space-y-3">
                {[
                  { label: "Title", value: form.title || "—" },
                  { label: "Type", value: form.type },
                  { label: "Location", value: form.location || "—" },
                  { label: "Guests", value: `${form.guests} guests · ${form.bedrooms} bed · ${form.bathrooms} bath` },
                  { label: "Price", value: form.price ? `$${form.price}/night` : "—" },
                  { label: "Amenities", value: form.amenities.length > 0 ? form.amenities.join(", ") : "None selected" },
                  { label: "Photos", value: `${form.images.length} image${form.images.length !== 1 ? "s" : ""}` },
                ].map(({ label, value }) => (
                  <div key={label} className={`flex gap-3 py-2 border-b border-gold/10`}>
                    <span className={`font-body text-xs font-semibold uppercase tracking-wider ${textSub} w-28 flex-shrink-0`}>{label}</span>
                    <span className={`font-body text-sm ${textMain}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className={`btn-outline-gold rounded-full ${step === 0 ? "opacity-30 cursor-not-allowed" : ""}`}>
            ← Back
          </button>
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} className="btn-gold rounded-full">
              Continue →
            </button>
          ) : (
            <button onClick={() => setSubmitted(true)} className="btn-gold rounded-full">
              Submit Listing ✦
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
