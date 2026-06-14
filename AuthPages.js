import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AirbnbLogo from "../components/AirbnbLogo";
import { Eye, EyeOff } from "lucide-react";

function AuthLayout({ darkMode, children, title, subtitle }) {
  const pageBg = darkMode ? "bg-obsidian" : "bg-ivory-50";
  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  return (
    <div className={`${pageBg} min-h-screen flex items-center justify-center px-4`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <AirbnbLogo size={40} color="#FF385C" />
            <span className="font-display text-3xl font-semibold tracking-tight" style={{color:"#FF385C"}}>airbnb</span>
          </Link>
          <h1 className={`font-display text-3xl font-light ${textMain} mb-2`}>{title}</h1>
          <p className={`font-body text-sm ${darkMode ? "text-ivory/50" : "text-obsidian/50"}`}>{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export function LoginPage({ darkMode }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    login(email, password);
    navigate("/");
  };

  const inputStyle = { background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)" };
  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  const cardBg = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const labelCls = `font-body text-xs font-semibold uppercase tracking-widest block mb-1.5 ${darkMode ? "text-ivory/50" : "text-obsidian/50"}`;

  return (
    <AuthLayout darkMode={darkMode} title="Welcome Back" subtitle="Sign in to your Airbnb account">
      <form onSubmit={handleSubmit} className={`rounded-2xl border p-8 ${cardBg} space-y-4`}>
        {/* EMAIL */}
        <div>
          <label className={labelCls}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={`lux-input text-sm w-full ${textMain}`}
            style={{...inputStyle, WebkitAppearance:"none"}}
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className={labelCls}>Password</label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`lux-input pr-10 text-sm w-full ${textMain}`}
              style={inputStyle}
            />
            <button type="button" onClick={() => setShowPw(!showPw)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-ivory/40" : "text-obsidian/40"} hover:text-gold`}>
              {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {error && <p className="font-body text-xs text-red-400">{error}</p>}

        <button type="submit" className="w-full rounded-xl py-3.5 text-sm mt-2 font-body font-semibold text-white flex items-center justify-center" style={{background:"#FF385C"}}>
          Sign In
        </button>

        <p className={`font-body text-center text-sm ${darkMode ? "text-ivory/50" : "text-obsidian/50"}`}>
          Don't have an account?{" "}
          <Link to="/signup" className="text-gold hover:underline">Join Airbnb</Link>
        </p>
        <div className="text-center">
          <button type="button" onClick={() => { login("demo@luximo.com", "demo"); navigate("/"); }}
            className={`font-body text-xs ${darkMode ? "text-ivory/30" : "text-obsidian/30"} hover:text-gold transition-colors`}>
            Use demo account →
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}

export function SignupPage({ darkMode }) {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    signup(name, email, password);
    navigate("/");
  };

  const inputStyle = { background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)" };
  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  const cardBg = darkMode ? "bg-white/5 border-gold/10" : "bg-white border-gold/15";
  const labelCls = `font-body text-xs font-semibold uppercase tracking-widest block mb-1.5 ${darkMode ? "text-ivory/50" : "text-obsidian/50"}`;

  return (
    <AuthLayout darkMode={darkMode} title="Join Airbnb" subtitle="Create your account for exclusive access to millions of stays">
      <form onSubmit={handleSubmit} className={`rounded-2xl border p-8 ${cardBg} space-y-4`}>
        {/* FULL NAME */}
        <div>
          <label className={labelCls}>Full Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Alexandra Fontaine"
            className={`lux-input text-sm w-full ${textMain}`}
            style={inputStyle}
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className={labelCls}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={`lux-input text-sm w-full ${textMain}`}
            style={{...inputStyle, WebkitAppearance:"none"}}
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className={labelCls}>Password</label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`lux-input pr-10 text-sm w-full ${textMain}`}
              style={inputStyle}
            />
            <button type="button" onClick={() => setShowPw(!showPw)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-ivory/40" : "text-obsidian/40"} hover:text-gold`}>
              {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {error && <p className="font-body text-xs text-red-400">{error}</p>}

        <button type="submit" className="w-full rounded-xl py-3.5 text-sm mt-2 font-body font-semibold text-white flex items-center justify-center" style={{background:"#FF385C"}}>
          Create Account
        </button>

        <p className={`font-body text-xs text-center ${darkMode ? "text-ivory/30" : "text-obsidian/30"}`}>
          By joining, you agree to our <a href="#" className="text-gold hover:underline">Terms</a> and <a href="#" className="text-gold hover:underline">Privacy Policy</a>
        </p>
        <p className={`font-body text-center text-sm ${darkMode ? "text-ivory/50" : "text-obsidian/50"}`}>
          Already have an account?{" "}
          <Link to="/login" className="text-gold hover:underline">Sign In</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
