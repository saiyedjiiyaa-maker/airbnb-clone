import React, { useState } from "react";
import { Star, ThumbsUp, ChevronDown, ChevronUp, Filter, Camera, Check, Image as ImageIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const PHOTO_REVIEWS = [
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1540541338537-d5c7d6b19bcc?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=200&q=80",
];

const ratingBreakdown = [
  { label: "Cleanliness",    score: 4.9, icon: "🧹" },
  { label: "Accuracy",       score: 4.8, icon: "📋" },
  { label: "Communication",  score: 4.9, icon: "💬" },
  { label: "Location",       score: 5.0, icon: "📍" },
  { label: "Check-in",       score: 4.7, icon: "🔑" },
  { label: "Value",          score: 4.6, icon: "💎" },
];

const sentimentTags = [
  { label: "Amazing views", count: 34, positive: true },
  { label: "Super clean",   count: 28, positive: true },
  { label: "Great host",    count: 22, positive: true },
  { label: "Perfect location", count: 19, positive: true },
  { label: "Worth every penny", count: 15, positive: true },
  { label: "Slow WiFi", count: 4, positive: false },
];

export default function ReviewsSection({ property, darkMode, mockReviews }) {
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [sortBy, setSortBy] = useState("recent");
  const [filterRating, setFilterRating] = useState(0);
  const [likes, setLikes] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTag, setActiveTag] = useState(null);
  const [subRatings, setSubRatings] = useState({ Cleanliness: 5, Accuracy: 5, Communication: 5, Location: 5, "Check-in": 5, Value: 5 });
  const [showSubRatings, setShowSubRatings] = useState(false);

  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  const textSub = darkMode ? "text-ivory/60" : "text-obsidian/60";
  const cardBg = darkMode ? "bg-white/5 border-white/8" : "bg-stone-50 border-stone-100";
  const inputBg = darkMode ? "bg-white/5 border-white/10 text-ivory placeholder-white/30" : "bg-white border-stone-200 text-obsidian placeholder-obsidian/30";

  const handleSubmit = () => {
    if (!reviewText.trim()) return;
    const newReview = {
      id: Date.now(),
      name: user?.name || "Anonymous",
      avatar: user?.avatar || `https://i.pravatar.cc/80?img=${Math.floor(Math.random() * 70)}`,
      location: "Your Location",
      date: "Just now",
      rating: reviewRating,
      text: reviewText,
      subRatings: { ...subRatings },
      isUser: true,
    };
    setUserReviews((prev) => [newReview, ...prev]);
    setReviewText("");
    setReviewRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  let allReviews = [...userReviews, ...mockReviews];
  if (filterRating > 0) allReviews = allReviews.filter((r) => r.rating >= filterRating);
  if (activeTag) allReviews = allReviews.filter((r) => r.text.toLowerCase().includes(activeTag.toLowerCase().split(" ")[0]));
  if (sortBy === "highest") allReviews.sort((a, b) => b.rating - a.rating);
  else if (sortBy === "lowest") allReviews.sort((a, b) => a.rating - b.rating);
  else if (sortBy === "helpful") allReviews.sort((a, b) => (likes[b.id] ? 1 : 0) - (likes[a.id] ? 1 : 0));

  const visible = showAll ? allReviews : allReviews.slice(0, 4);
  const avgRating = property?.rating || 4.9;

  return (
    <div className="space-y-8">
      {/* Overall rating header */}
      <div className={`rounded-2xl border p-6 ${cardBg}`}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Big score */}
          <div className="text-center flex-shrink-0">
            <p className="font-display text-7xl font-light text-gold">{avgRating}</p>
            <div className="flex justify-center gap-0.5 my-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} className={s <= Math.round(avgRating) ? "fill-gold text-gold" : textSub} />
              ))}
            </div>
            <p className={`font-body text-sm ${textSub}`}>{property?.reviews} reviews</p>
          </div>

          {/* Breakdown bars */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ratingBreakdown.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-base w-6 text-center flex-shrink-0">{item.icon}</span>
                <span className={`font-body text-xs w-24 flex-shrink-0 ${textSub}`}>{item.label}</span>
                <div className={`flex-1 h-1.5 rounded-full ${darkMode ? "bg-white/10" : "bg-stone-200"}`}>
                  <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${(item.score / 5) * 100}%` }} />
                </div>
                <span className={`font-body text-xs font-semibold w-6 text-right ${textMain}`}>{item.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment tags */}
        <div className="mt-5 pt-5 border-t border-gold/10">
          <p className={`font-body text-xs font-semibold uppercase tracking-wider ${textSub} mb-3`}>What guests mention</p>
          <div className="flex flex-wrap gap-2">
            {sentimentTags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => setActiveTag(activeTag === tag.label ? null : tag.label)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-xs border transition-all ${
                  activeTag === tag.label
                    ? "bg-gold text-black border-gold"
                    : tag.positive
                    ? darkMode ? "border-white/10 text-ivory/70 hover:border-gold hover:text-gold" : "border-stone-200 text-obsidian/70 hover:border-gold hover:text-gold"
                    : darkMode ? "border-red-500/20 text-red-400/70" : "border-red-200 text-red-400"
                }`}
              >
                {tag.positive ? "👍" : "⚠️"} {tag.label}
                <span className={`${activeTag === tag.label ? "text-black/60" : textSub} text-[10px]`}>{tag.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Photo grid */}
        <div className="mt-5 pt-5 border-t border-gold/10">
          <p className={`font-body text-xs font-semibold uppercase tracking-wider ${textSub} mb-3 flex items-center gap-1.5`}>
            <Camera size={12} /> Guest Photos
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {PHOTO_REVIEWS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Guest photo ${i + 1}`}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0 hover:scale-105 transition-transform cursor-pointer"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Write a review */}
      <div className={`rounded-2xl border p-6 ${cardBg}`}>
        <h4 className={`font-display text-xl font-light ${textMain} mb-4`}>Write a Review</h4>

        {/* Star rating input */}
        <div className="mb-4">
          <p className={`font-body text-xs ${textSub} mb-2`}>Overall Rating</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setReviewRating(s)}
              >
                <Star
                  size={28}
                  className={`transition-all ${s <= (hoverRating || reviewRating) ? "fill-gold text-gold scale-110" : textSub}`}
                />
              </button>
            ))}
            <span className={`ml-2 font-body text-sm self-center ${textMain}`}>
              {["", "Poor", "Fair", "Good", "Great", "Exceptional"][hoverRating || reviewRating]}
            </span>
          </div>
        </div>

        {/* Detailed sub-ratings toggle */}
        <button
          onClick={() => setShowSubRatings(!showSubRatings)}
          className={`flex items-center gap-1.5 font-body text-xs ${textSub} hover:text-gold transition-colors mb-3`}
        >
          {showSubRatings ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          Rate by category (optional)
        </button>
        {showSubRatings && (
          <div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-xl bg-black/5">
            {Object.keys(subRatings).map((cat) => (
              <div key={cat}>
                <p className={`font-body text-xs ${textSub} mb-1`}>{cat}</p>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => setSubRatings((prev) => ({ ...prev, [cat]: s }))}>
                      <Star size={14} className={s <= subRatings[cat] ? "fill-gold text-gold" : textSub} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Text area */}
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your experience — what made this stay special?"
          rows={4}
          className={`w-full rounded-xl border px-4 py-3 font-body text-sm outline-none focus:border-gold/50 resize-none transition-colors ${inputBg}`}
        />

        <div className="flex items-center justify-between mt-3">
          <span className={`font-body text-xs ${textSub}`}>{reviewText.length}/500 characters</span>
          <button
            onClick={handleSubmit}
            disabled={!reviewText.trim()}
            className="btn-gold rounded-xl px-5 py-2.5 text-sm disabled:opacity-40 flex items-center gap-2"
          >
            {submitted ? <><Check size={14} /> Posted!</> : "Post Review"}
          </button>
        </div>
      </div>

      {/* Filters + sort */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-gold" />
          <span className={`font-body text-xs ${textSub}`}>Filter:</span>
          {[0, 5, 4, 3].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRating(filterRating === r ? 0 : r)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-body text-xs border transition-all ${
                filterRating === r ? "bg-gold text-black border-gold" : darkMode ? "border-white/10 text-ivory/60 hover:border-gold hover:text-gold" : "border-stone-200 text-obsidian/60 hover:border-gold hover:text-gold"
              }`}
            >
              {r === 0 ? "All" : <><Star size={9} className="fill-current" /> {r}+</>}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className={`font-body text-xs ${textSub}`}>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`font-body text-xs px-3 py-1.5 rounded-lg border outline-none ${inputBg}`}
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {visible.map((r) => (
          <div key={r.id} className={`rounded-2xl border p-5 ${cardBg} ${r.isUser ? "border-gold/30 bg-gold/5" : ""}`}>
            <div className="flex items-start gap-3">
              <img
                src={r.avatar}
                alt={r.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                onError={(e) => { e.currentTarget.src = `https://i.pravatar.cc/80?img=${r.id}`; }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <p className={`font-body text-sm font-semibold ${textMain} flex items-center gap-1.5`}>
                      {r.name}
                      {r.isUser && <span className="text-[10px] font-normal text-gold border border-gold/30 px-1.5 rounded-full">You</span>}
                    </p>
                    <p className={`font-body text-xs ${textSub}`}>{r.location} · {r.date}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} className={s <= r.rating ? "fill-gold text-gold" : textSub} />
                    ))}
                  </div>
                </div>
                <p className={`font-body text-sm leading-relaxed mt-2 ${textMain}`}>{r.text}</p>
                {/* Sub-ratings if present */}
                {r.subRatings && (
                  <div className="flex flex-wrap gap-3 mt-2">
                    {Object.entries(r.subRatings).map(([cat, score]) => (
                      <span key={cat} className={`font-body text-xs ${textSub}`}>
                        {cat}: <strong className="text-gold">{score}/5</strong>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => toggleLike(r.id)}
                    className={`flex items-center gap-1.5 font-body text-xs transition-colors ${likes[r.id] ? "text-gold" : textSub + " hover:text-gold"}`}
                  >
                    <ThumbsUp size={12} className={likes[r.id] ? "fill-current" : ""} />
                    Helpful {likes[r.id] ? "· Thanks!" : ""}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {allReviews.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className={`w-full py-3 rounded-xl border font-body text-sm flex items-center justify-center gap-2 transition-all hover:border-gold hover:text-gold ${
            darkMode ? "border-white/10 text-ivory/60" : "border-stone-200 text-obsidian/60"
          }`}
        >
          {showAll ? <><ChevronUp size={14} /> Show fewer reviews</> : <><ChevronDown size={14} /> Show all {allReviews.length} reviews</>}
        </button>
      )}
    </div>
  );
}
