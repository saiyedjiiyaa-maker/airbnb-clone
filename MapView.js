import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { X, MapPin, Star, ExternalLink } from "lucide-react";

// Approximate lat/lng for property locations
const COORDS = {
  "Oia, Santorini, Greece":         [36.461, 25.375],
  "North Malé Atoll, Maldives":     [4.175, 73.509],
  "Positano, Amalfi Coast, Italy":  [40.628, 14.484],
  "Surin Beach, Phuket, Thailand":  [7.981, 98.289],
  "Clifton, Cape Town, South Africa": [-33.936, 18.374],
  "Seminyak, Bali, Indonesia":      [-8.69, 115.164],
  "Tulum, Quintana Roo, Mexico":    [20.215, -87.465],
  "Gold Coast, Queensland, Australia": [-28.017, 153.4],
  "Mykonos Town, Mykonos, Greece":  [37.448, 25.328],
  "Santa Monica, California, USA":  [34.019, -118.491],
  "Zermatt, Valais, Switzerland":   [46.020, 7.748],
  "Aspen, Colorado, USA":           [39.191, -106.817],
  "Chamonix, French Alps, France":  [45.923, 6.869],
  "Banff, Alberta, Canada":         [51.178, -115.570],
  "Queenstown, New Zealand":        [-45.031, 168.662],
  "Innsbruck, Tirol, Austria":      [47.269, 11.404],
  "Whistler, British Columbia, Canada": [50.116, -122.953],
  "Cortina d'Ampezzo, Italy":       [46.536, 12.135],
  "Courchevel, Savoie, France":     [45.414, 6.634],
  "Park City, Utah, USA":           [40.646, -111.498],
  "Manhattan, New York, USA":       [40.754, -73.984],
  "Shibuya, Tokyo, Japan":          [35.659, 139.703],
  "Marais, Paris, France":          [48.855, 2.352],
  "South Kensington, London, UK":   [51.495, -0.179],
  "Mitte, Berlin, Germany":         [52.517, 13.388],
  "Gracia, Barcelona, Spain":       [41.404, 2.158],
  "Trastevere, Rome, Italy":        [41.889, 12.468],
  "Eixample, Barcelona, Spain":     [41.393, 2.163],
  "Notting Hill, London, UK":       [51.513, -0.201],
  "Nishiki, Kyoto, Japan":          [35.005, 135.768],
  "Ubud, Bali, Indonesia":          [-8.506, 115.263],
  "Masai Mara, Kenya":              [-1.508, 35.144],
  "Jungfrau Region, Switzerland":   [46.614, 7.978],
  "Torres del Paine, Chile":        [-51.093, -73.056],
  "Amangiri, Utah, USA":            [37.087, -111.452],
  "Uluru, Northern Territory, Australia": [-25.344, 131.036],
  "Amazon, Manaus, Brazil":         [-3.119, -60.021],
  "Serengeti, Tanzania":            [-2.333, 34.833],
  "Ha Long Bay, Vietnam":           [20.910, 107.184],
  "Cappadocia, Türkiye":            [38.643, 34.828],
  "Tuscany, Italy":                 [43.45, 11.10],
  "Cotswolds, England, UK":         [51.83, -1.76],
  "Alentejo, Portugal":             [38.57, -7.90],
  "Burgundy, France":               [47.05, 4.86],
  "Kerala, India":                  [9.50, 76.35],
  "Rajasthan, India":               [26.91, 75.79],
  "Loire Valley, France":           [47.41, 0.69],
  "Andalusia, Spain":               [37.39, -5.99],
  "Puglia, Italy":                  [40.79, 17.10],
  "Sonoma, California, USA":        [38.29, -122.45],
  "Oahu, Hawaii, USA":              [21.44, -158.00],
  "Kauai, Hawaii, USA":             [22.09, -159.52],
  "Marbella, Costa del Sol, Spain": [36.51, -4.88],
  "Douro Valley, Portugal":         [41.16, -7.79],
  "Champagne, France":              [49.05, 3.56],
  "Mosel Valley, Germany":          [50.36, 7.60],
  "Marlborough, New Zealand":       [-41.51, 173.96],
  "Mendoza, Argentina":             [-32.89, -68.84],
  "Barossa Valley, Australia":      [-34.53, 138.96],
  "Napa Valley, California, USA":   [38.50, -122.27],
};

function getCoords(location) {
  // Exact match first
  if (COORDS[location]) return COORDS[location];
  // Partial match
  const key = Object.keys(COORDS).find((k) => location.includes(k.split(",")[0]));
  return key ? COORDS[key] : null;
}

export default function MapView({ properties, darkMode, onClose }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [selected, setSelected] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Load Leaflet CSS + JS dynamically
  useEffect(() => {
    const linkEl = document.createElement("link");
    linkEl.rel = "stylesheet";
    linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(linkEl);

    const scriptEl = document.createElement("script");
    scriptEl.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    scriptEl.onload = () => setLoaded(true);
    document.head.appendChild(scriptEl);

    return () => {
      document.head.removeChild(linkEl);
      document.head.removeChild(scriptEl);
    };
  }, []);

  useEffect(() => {
    if (!loaded || !mapRef.current || mapInstanceRef.current) return;
    const L = window.L;

    // Init map
    const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: true });
    mapInstanceRef.current = map;

    L.tileLayer(
      darkMode
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      { attribution: "© OpenStreetMap © CARTO", maxZoom: 18 }
    ).addTo(map);

    // Add markers
    const validProps = properties.filter((p) => getCoords(p.location));
    const bounds = [];

    validProps.forEach((p) => {
      const coords = getCoords(p.location);
      if (!coords) return;
      bounds.push(coords);

      const icon = L.divIcon({
        className: "",
        html: `<div style="background: #FF385C; color: white; border-radius: 20px; padding: 4px 10px; font-family: DM Sans, sans-serif; font-size: 12px; font-weight: 600; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.3); border: 2px solid white; cursor: pointer;">
          $${p.price}
        </div>`,
        iconAnchor: [28, 16],
      });

      const marker = L.marker(coords, { icon }).addTo(map);
      marker.on("click", () => setSelected(p));
      markersRef.current.push(marker);
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 5 });
    }
  }, [loaded, properties, darkMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const cardBg = darkMode ? "bg-[#111] border-white/10" : "bg-white border-stone-200";
  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  const textSub = darkMode ? "text-ivory/60" : "text-obsidian/60";

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Map */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-[1000] flex items-center gap-2 px-4 py-2.5 rounded-full font-body text-sm font-medium shadow-lg transition-all hover:scale-105"
        style={{ background: darkMode ? "#111" : "white", color: darkMode ? "#f5f0e8" : "#0a0a0a" }}
      >
        <X size={14} /> Exit Map
      </button>

      {/* Stats badge */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] px-4 py-2 rounded-full font-body text-sm shadow-lg"
        style={{ background: darkMode ? "#111" : "white", color: darkMode ? "#c9a84c" : "#c9a84c" }}
      >
        <MapPin size={13} className="inline mr-1.5" />
        {properties.filter((p) => getCoords(p.location)).length} properties on map
      </div>

      {/* Property popup */}
      {selected && (
        <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] rounded-2xl border shadow-2xl w-72 overflow-hidden ${cardBg}`}>
          <button
            onClick={() => setSelected(null)}
            className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          >
            <X size={12} />
          </button>
          <img
            src={selected.img}
            alt={selected.title}
            className="w-full h-36 object-cover"
            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"; }}
          />
          <div className="p-4">
            <h3 className={`font-display text-lg font-medium leading-tight mb-1 ${textMain}`}>{selected.title}</h3>
            <p className={`font-body text-xs flex items-center gap-1 mb-3 ${textSub}`}>
              <MapPin size={10} className="text-gold" />{selected.location}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-display text-xl text-gold">${selected.price}</span>
                <span className={`font-body text-xs ${textSub}`}> /night</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={12} className="text-gold fill-gold" />
                <span className={`font-body text-sm font-semibold ${textMain}`}>{selected.rating}</span>
                <span className={`font-body text-xs ${textSub}`}>({selected.reviews})</span>
              </div>
            </div>
            <Link
              to={`/property/${selected.id}`}
              onClick={onClose}
              className="mt-3 w-full flex items-center justify-center gap-1.5 btn-gold rounded-xl py-2.5 text-sm"
            >
              View Property <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
