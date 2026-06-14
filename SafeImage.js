import React, { useState } from "react";
import { IMG } from "../utils/images";

export default function SafeImage({ src, alt="", className="", style={}, fallback, onClick }) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded]   = useState(false);

  const finalSrc = errored
    ? (fallback || IMG.fallback)
    : (src || fallback || IMG.fallback);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style} onClick={onClick}>
      {/* Skeleton shimmer while loading */}
      {!loaded && (
        <div className="absolute inset-0 skeleton" style={{
          background:"linear-gradient(90deg,rgba(201,168,76,0.05) 0%,rgba(201,168,76,0.15) 50%,rgba(201,168,76,0.05) 100%)",
          backgroundSize:"200% 100%",
          animation:"shimmer 1.5s infinite",
        }}/>
      )}
      <img
        src={finalSrc}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => { setErrored(true); setLoaded(true); }}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
