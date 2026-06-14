import React from "react";

// Official Airbnb "Bélo" symbol SVG
export default function AirbnbLogo({ size = 32, color = "#FF385C", className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32 4C21.46 4 14 14.08 14 24.5c0 6.3 2.64 11.56 5.18 16.12L32 60l12.82-19.38C47.36 36.06 50 30.8 50 24.5 50 14.08 42.54 4 32 4zm0 28a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/>
    </svg>
  );
}
