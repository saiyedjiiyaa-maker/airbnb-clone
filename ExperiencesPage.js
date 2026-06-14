import React, { useState } from "react";
import {
  Star, Clock, Users, MapPin, Heart, X, ChevronRight,
  Globe, Zap, Utensils, Waves, TreePine, Palette, Mountain, Music
} from "lucide-react";

const categoryIcons = {
  All: Globe, Adventure: Zap, Food: Utensils, Water: Waves,
  Nature: TreePine, Culture: Palette, Wellness: Mountain, Music: Music,
};

const experiences = [
  /* ── ADVENTURE (skydiving, climbing, motorbike, bungee, desert rally etc.) ── */
  {
    id: 1, category: "Adventure",
    title: "Alpine Helicopter & Ski Tour",
    host: "Hans Mueller", hostAvatar: "https://i.pravatar.cc/80?img=11",
    location: "Zermatt, Switzerland", price: 520, rating: 4.99, reviews: 87,
    duration: "6 hours", groupSize: "2–4 guests", tag: "Luxury",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Soar over the iconic Matterhorn in a private helicopter, then ski down pristine untouched slopes guided by a certified alpine expert. Champagne lunch at altitude included.",
    includes: ["Private helicopter", "Expert ski guide", "Champagne lunch", "Equipment rental", "Insurance"],
    highlights: ["Matterhorn flyover", "Off-piste access", "Panoramic glacier views", "Michelin-level cuisine"],
    languages: ["English", "German", "French"],
  },
  {
    id: 2, category: "Adventure",
    title: "Amazon Rainforest Night Trek",
    host: "Carlos Mendez", hostAvatar: "https://i.pravatar.cc/80?img=12",
    location: "Manaus, Brazil", price: 110, rating: 4.94, reviews: 152,
    duration: "5 hours", groupSize: "2–6 guests", tag: "Wild",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Venture deep into the Amazon at night with a local naturalist. Spot nocturnal wildlife — caimans, tarantulas, tree frogs — and learn ancient forest survival techniques.",
    includes: ["Expert naturalist guide", "Headlamps & gear", "Insect repellent kit", "Jungle fruit snack", "Transport"],
    highlights: ["Caiman spotting", "Bioluminescent fungi", "Jungle survival skills", "Star gazing above canopy"],
    languages: ["English", "Portuguese", "Spanish"],
  },
  {
    id: 3, category: "Adventure",
    title: "Dolomites Via Ferrata Climb",
    host: "Lorenzo Bianchi", hostAvatar: "https://i.pravatar.cc/80?img=13",
    location: "Cortina, Italy", price: 195, rating: 4.92, reviews: 204,
    duration: "7 hours", groupSize: "2–5 guests", tag: "Epic",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484139603800-8d3b9e2bdd88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510914828947-36f754990aa5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Scale the dramatic limestone walls of the Dolomites on a protected via ferrata route. No climbing experience needed — your certified guide handles safety while you enjoy breathtaking views.",
    includes: ["Climbing harness & helmet", "UIAGM-certified guide", "Mountain picnic", "Cable car tickets", "Shuttle"],
    highlights: ["360° Dolomite panoramas", "WWII history at altitude", "Sunset summit arrival", "Local cheese & wine picnic"],
    languages: ["English", "Italian", "German"],
  },
  {
    id: 4, category: "Adventure",
    title: "Desert Dune Buggy & Sandboarding",
    host: "Yasmine El-Amin", hostAvatar: "https://i.pravatar.cc/80?img=14",
    location: "Huacachina, Peru", price: 85, rating: 4.90, reviews: 378,
    duration: "3 hours", groupSize: "2–8 guests", tag: "Thrill",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Race across towering sand dunes in a roaring buggy, then carve down 100-metre slopes on a sandboard at sunset. Ends with a cold drink at the oasis lagoon.",
    includes: ["Dune buggy ride", "Sandboard & instructor", "Sunset oasis stop", "Cold beverages", "GoPro footage"],
    highlights: ["100m sand dune descent", "Oasis sunset views", "Professional buggy driver", "GoPro footage"],
    languages: ["English", "Spanish"],
  },
  {
    id: 5, category: "Adventure",
    title: "Iceland Ice Cave Expedition",
    host: "Björn Sigurdsson", hostAvatar: "https://i.pravatar.cc/80?img=15",
    location: "Vatnajökull, Iceland", price: 245, rating: 4.97, reviews: 143,
    duration: "5 hours", groupSize: "2–6 guests", tag: "Surreal",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Enter the glowing blue crystal caves inside Europe's largest glacier with a certified glaciologist. Marvel at ancient ice formations and learn about the glacier's 10,000-year history.",
    includes: ["Glacier guide", "Crampons & ice axe", "Helmet & harness", "4WD glacier truck", "Hot cocoa"],
    highlights: ["Ancient blue ice crystals", "Glaciologist-led tour", "Super Jeep transport", "Photography guidance"],
    languages: ["English", "Icelandic"],
  },
  {
    id: 6, category: "Adventure",
    title: "New Zealand Skydive over Queenstown",
    host: "Liam O'Brien", hostAvatar: "https://i.pravatar.cc/80?img=18",
    location: "Queenstown, New Zealand", price: 350, rating: 4.98, reviews: 412,
    duration: "3 hours", groupSize: "1–4 guests", tag: "Ultimate Rush",
    image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Jump from 15,000 feet over the most scenic drop zone on Earth. See the Remarkables, Lake Wakatipu and Queenstown spread below as you freefall at 200km/h with a certified instructor.",
    includes: ["Tandem skydive", "NZPIA-certified instructor", "Full equipment", "Certificate", "Video & photo package"],
    highlights: ["15,000ft freefall", "Lake Wakatipu views", "The Remarkables backdrop", "HD video package"],
    languages: ["English"],
  },
  {
    id: 7, category: "Adventure",
    title: "Moroccan Sahara Camel Trek",
    host: "Hassan Benali", hostAvatar: "https://i.pravatar.cc/80?img=17",
    location: "Merzouga, Morocco", price: 120, rating: 4.93, reviews: 287,
    duration: "Overnight", groupSize: "2–10 guests", tag: "Iconic",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Ride camels into the golden Erg Chebbi dunes at sunset, spend the night in a luxury Bedouin camp under the stars, and wake to a spectacular Sahara sunrise.",
    includes: ["Camel & guide", "Luxury desert camp", "Traditional dinner & breakfast", "Stargazing", "Berber music"],
    highlights: ["Erg Chebbi sunset ride", "Luxury glamping tent", "Sahara star canopy", "Authentic Berber cuisine"],
    languages: ["English", "French", "Arabic"],
  },
  {
    id: 8, category: "Adventure",
    title: "Patagonia Glacier Trekking",
    host: "Marisol Torres", hostAvatar: "https://i.pravatar.cc/80?img=16",
    location: "El Calafate, Argentina", price: 165, rating: 4.95, reviews: 219,
    duration: "8 hours", groupSize: "2–8 guests", tag: "Bucket List",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Walk on the legendary Perito Moreno Glacier and witness massive ice walls calving into the turquoise lake below — one of the world's only advancing glaciers.",
    includes: ["Certified glacier guide", "Crampons & equipment", "Park entrance", "Catamaran transfer", "Argentine BBQ"],
    highlights: ["Walk on ancient ice", "Glacier calving views", "Condor spotting", "Gaucho BBQ asado"],
    languages: ["English", "Spanish"],
  },
  {
    id: 9, category: "Adventure",
    title: "Vietnam Motorbike Mountain Pass",
    host: "Nguyen Van Duc", hostAvatar: "https://i.pravatar.cc/80?img=19",
    location: "Hai Van Pass, Vietnam", price: 75, rating: 4.91, reviews: 334,
    duration: "Full day", groupSize: "2–6 guests", tag: "Freedom",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Ride the legendary Hai Van Pass on a classic Honda Win, stopping at hidden fishing villages, French colonial ruins, and secret viewpoints that tour buses can't reach.",
    includes: ["Classic motorbike", "Experienced local guide", "Helmet & jacket", "Lunch", "Fuel & insurance"],
    highlights: ["Cloud-piercing mountain pass", "Hidden coastal villages", "Colonial fort ruins", "Fresh seafood lunch"],
    languages: ["English", "Vietnamese"],
  },
  {
    id: 10, category: "Adventure",
    title: "Scottish Highlands Wild Hike & Swim",
    host: "Fiona MacLeod", hostAvatar: "https://i.pravatar.cc/80?img=20",
    location: "Glen Coe, Scotland", price: 90, rating: 4.88, reviews: 167,
    duration: "4 hours", groupSize: "2–8 guests", tag: "Refreshing",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Hike through dramatic Glen Coe valley and plunge into crystal-clear mountain lochs and waterfalls. Your guide shares ancient Highland folklore at secret swimming spots.",
    includes: ["Wetsuit & dry robe", "Safety equipment", "Local guide", "Hot whisky toddy", "Towels"],
    highlights: ["Secret waterfall plunge pools", "Ancient clan folklore", "Misty Highland scenery", "Warming whisky toddy"],
    languages: ["English", "Scottish Gaelic"],
  },

  /* ── FOOD (restaurants, markets, cooking classes, street food) ── */
  {
    id: 11, category: "Food",
    title: "Italian Truffle Hunting & Feast",
    host: "Nonna Giulia", hostAvatar: "https://i.pravatar.cc/80?img=21",
    location: "Tuscany, Italy", price: 140, rating: 4.95, reviews: 218,
    duration: "5 hours", groupSize: "2–6 guests", tag: "Chef's Pick",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Join Nonna Giulia and her prized truffle hound Bruno in the oak forests of Tuscany. Discover black and white truffles, then feast on a 4-course meal made with your finds at her farmhouse.",
    includes: ["Truffle hunting", "4-course truffle feast", "Chianti wine pairing", "Recipe booklet", "Truffle to take home"],
    highlights: ["Hunt with a trained truffle dog", "Farmhouse cooking class", "Chianti wine pairing", "Take-home truffle"],
    languages: ["English", "Italian"],
  },
  {
    id: 12, category: "Food",
    title: "Tokyo Street Food Night Walk",
    host: "Yuki Tanaka", hostAvatar: "https://i.pravatar.cc/80?img=22",
    location: "Tokyo, Japan", price: 75, rating: 4.93, reviews: 489,
    duration: "3 hours", groupSize: "2–12 guests", tag: "Top Rated",
    image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Explore Tokyo's electric back alleys and hidden izakayas with a local foodie. Taste 8–10 dishes across yakitori stalls, ramen counters, and secret sushi spots tourists never find.",
    includes: ["8–10 food tastings", "Local expert guide", "Sake introduction", "Phrase card", "Night market visit"],
    highlights: ["8–10 tasting stops", "Hidden izakayas", "Sake & shochu intro", "Shibuya night market"],
    languages: ["English", "Japanese"],
  },
  {
    id: 13, category: "Food",
    title: "Peruvian Ceviche Masterclass",
    host: "Chef Rodrigo Lima", hostAvatar: "https://i.pravatar.cc/80?img=23",
    location: "Lima, Peru", price: 95, rating: 4.96, reviews: 301,
    duration: "3.5 hours", groupSize: "2–8 guests", tag: "Culinary",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Learn to make authentic Peruvian ceviche, tiradito, and leche de tigre from a Lima-trained chef at his Miraflores home kitchen, then enjoy your creations with Pisco Sours.",
    includes: ["All ingredients", "Recipe cards", "Pisco Sour cocktail", "Full lunch", "Certificate"],
    highlights: ["3 ceviche techniques", "Leche de tigre secrets", "Pisco Sour pairing", "Take-home recipes"],
    languages: ["English", "Spanish"],
  },
  {
    id: 14, category: "Food",
    title: "Marrakech Medina Spice Tour",
    host: "Fatima Zahra", hostAvatar: "https://i.pravatar.cc/80?img=24",
    location: "Marrakech, Morocco", price: 65, rating: 4.92, reviews: 412,
    duration: "4 hours", groupSize: "2–10 guests", tag: "Sensory",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Wind through the ancient Marrakech medina with a local spice expert. Visit family-run cooperatives, learn to blend ras el hanout, and end with a traditional tagine lunch.",
    includes: ["Spice market tour", "Blending workshop", "Tagine lunch", "Spice kit", "Mint tea ceremony"],
    highlights: ["500-year-old spice souk", "Ras el hanout blending", "Argan oil cooperative", "Riad tagine lunch"],
    languages: ["English", "French", "Arabic"],
  },
  {
    id: 15, category: "Food",
    title: "Bordeaux Wine & Château Picnic",
    host: "Jean-Pierre Moreau", hostAvatar: "https://i.pravatar.cc/80?img=25",
    location: "Bordeaux, France", price: 175, rating: 4.97, reviews: 198,
    duration: "5 hours", groupSize: "2–8 guests", tag: "Sommelier",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "A certified sommelier takes you to two private Bordeaux châteaux for barrel tastings and cellar tours, then sets up an elegant vineyard picnic with artisan cheeses and Grand Cru wines.",
    includes: ["2 château visits", "Barrel & cellar tasting", "6 wine tastings", "Vineyard picnic", "Artisan cheese board"],
    highlights: ["Private château access", "Barrel room tasting", "Grand Cru wines", "Vineyard sunset picnic"],
    languages: ["English", "French"],
  },
  {
    id: 16, category: "Food",
    title: "Bangkok Floating Market Feast",
    host: "Ploy Siriporn", hostAvatar: "https://i.pravatar.cc/80?img=26",
    location: "Bangkok, Thailand", price: 55, rating: 4.89, reviews: 523,
    duration: "4 hours", groupSize: "2–12 guests", tag: "Authentic",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Hop in a longtail boat and weave through Bangkok's oldest floating market, sampling pad thai, mango sticky rice, and boat noodles straight from the vendors on the water.",
    includes: ["Longtail boat ride", "6 street food tastings", "Local guide", "Thai cooking tips", "Morning market visit"],
    highlights: ["Longtail boat ride", "Pad Thai at the source", "Mango sticky rice", "100-year-old market"],
    languages: ["English", "Thai"],
  },
  {
    id: 17, category: "Food",
    title: "Oaxaca Mole & Mezcal Journey",
    host: "Abuela Rosa", hostAvatar: "https://i.pravatar.cc/80?img=27",
    location: "Oaxaca, Mexico", price: 105, rating: 4.94, reviews: 267,
    duration: "5 hours", groupSize: "2–8 guests", tag: "Heritage",
    image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615361200141-f45040f367be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Learn the secrets of complex Oaxacan mole negro from a grandmother who has been making it for 50 years, then visit a family palenque to taste artisanal mezcal straight from the still.",
    includes: ["Mole cooking class", "Market ingredient tour", "Mezcal distillery visit", "Full lunch", "Recipe booklet"],
    highlights: ["50-year family mole recipe", "Artisanal mezcal tasting", "Mercado ingredient hunt", "Take-home chile kit"],
    languages: ["English", "Spanish"],
  },
  {
    id: 18, category: "Food",
    title: "Copenhagen New Nordic Farm-to-Table",
    host: "Magnus Lindqvist", hostAvatar: "https://i.pravatar.cc/80?img=28",
    location: "Copenhagen, Denmark", price: 220, rating: 4.98, reviews: 134,
    duration: "6 hours", groupSize: "2–6 guests", tag: "Michelin-Inspired",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Visit an organic farm outside Copenhagen with a former Noma chef, forage seasonal ingredients, then cook a 5-course New Nordic dinner together in a stunning farmhouse kitchen.",
    includes: ["Farm foraging walk", "5-course dinner cook", "Natural wine pairing", "Fermentation intro", "Recipe cards"],
    highlights: ["Former Noma chef host", "Wild foraging session", "Farm-to-plate dinner", "Natural wine pairing"],
    languages: ["English", "Danish"],
  },
  {
    id: 19, category: "Food",
    title: "Istanbul Bosphorus Seafood Cruise",
    host: "Mehmet Yilmaz", hostAvatar: "https://i.pravatar.cc/80?img=29",
    location: "Istanbul, Turkey", price: 130, rating: 4.91, reviews: 289,
    duration: "4 hours", groupSize: "2–10 guests", tag: "Scenic",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Board a private wooden gulet on the Bosphorus and enjoy a fresh meze and seafood feast as you sail between Europe and Asia, watching the mosques and palaces glide past at golden hour.",
    includes: ["Private gulet charter", "12-dish meze spread", "Fresh fish & seafood", "Turkish wine & raki", "Sunset cruise"],
    highlights: ["Europe-Asia crossing", "Golden hour mosques", "Fresh Bosphorus fish", "Turkish raki ceremony"],
    languages: ["English", "Turkish"],
  },
  {
    id: 20, category: "Food",
    title: "Kyoto Kaiseki Tea Ceremony",
    host: "Sensei Haruki Ito", hostAvatar: "https://i.pravatar.cc/80?img=30",
    location: "Kyoto, Japan", price: 160, rating: 4.99, reviews: 176,
    duration: "4 hours", groupSize: "2–6 guests", tag: "Zen",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Experience a traditional chanoyu tea ceremony in a 200-year-old machiya townhouse, followed by a seasonal kaiseki meal prepared by a tea master who trained for 15 years.",
    includes: ["Chanoyu tea ceremony", "Kimono dressing", "6-course kaiseki meal", "Matcha brewing", "Tea bowl gift"],
    highlights: ["200-year-old machiya house", "Full kimono experience", "15-year tea master", "Seasonal kaiseki menu"],
    languages: ["English", "Japanese"],
  },

  /* ── WATER (ocean, rivers, lakes, diving, surfing, kayaking) ── */
  {
    id: 21, category: "Water",
    title: "Private Sunset Yacht Tour",
    host: "Captain Marco", hostAvatar: "https://i.pravatar.cc/80?img=31",
    location: "Santorini, Greece", price: 180, rating: 4.98, reviews: 312,
    duration: "3 hours", groupSize: "2–8 guests", tag: "Most Popular",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Sail the caldera aboard a private sailing yacht as the sun melts into the Aegean. Anchor at the Red Beach for a swim, sip champagne at the volcanic hot springs, and watch the famous Santorini sunset.",
    includes: ["Private sailing yacht", "Champagne & canapés", "Snorkelling gear", "Towels", "Captain & crew"],
    highlights: ["Caldera sunset sail", "Red Beach snorkel stop", "Volcanic hot springs dip", "Champagne on board"],
    languages: ["English", "Greek"],
  },
  {
    id: 22, category: "Water",
    title: "Maldives Bioluminescent Night Kayak",
    host: "Ismail Rasheed", hostAvatar: "https://i.pravatar.cc/80?img=32",
    location: "North Malé Atoll, Maldives", price: 145, rating: 4.96, reviews: 189,
    duration: "2 hours", groupSize: "2–6 guests", tag: "Magical",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Paddle a transparent kayak through glowing bioluminescent waters at night — every stroke lights up the ocean in electric blue. A surreal, unforgettable natural phenomenon.",
    includes: ["Transparent kayak", "Life jacket & guide", "GoPro footage", "Fresh coconut", "Marine biology talk"],
    highlights: ["Electric blue ocean glow", "Transparent kayak", "Marine biology talk", "GoPro footage"],
    languages: ["English", "Dhivehi"],
  },
  {
    id: 23, category: "Water",
    title: "Norwegian Fjord RIB Speedboat",
    host: "Erik Haugen", hostAvatar: "https://i.pravatar.cc/80?img=33",
    location: "Flåm, Norway", price: 210, rating: 4.94, reviews: 231,
    duration: "4 hours", groupSize: "2–8 guests", tag: "Dramatic",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Race through the world's most dramatic fjords in a high-speed RIB boat, stopping at hidden waterfalls, remote Viking farms, and mirror-calm inner fjord coves accessible only by water.",
    includes: ["RIB speedboat", "Survival suit & helmet", "Expert skipper", "Waterfall swim stop", "Hot soup & bread"],
    highlights: ["600m sheer cliff walls", "Hidden waterfall swim", "Ancient Viking settlement", "Mirror-calm inner fjord"],
    languages: ["English", "Norwegian"],
  },
  {
    id: 24, category: "Water",
    title: "Palawan Island-Hopping & Diving",
    host: "Rey Santos", hostAvatar: "https://i.pravatar.cc/80?img=34",
    location: "El Nido, Philippines", price: 95, rating: 4.97, reviews: 445,
    duration: "Full day", groupSize: "2–10 guests", tag: "Paradise",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Explore El Nido's famous limestone karst islands by bangka boat, snorkelling crystal lagoons, swimming through secret sea caves, and diving with sea turtles in the Bacuit Archipelago.",
    includes: ["Bangka boat tour", "Snorkel & dive gear", "Dive instructor", "Beach BBQ lunch", "Park fees"],
    highlights: ["Secret lagoon swim", "Sea turtle diving", "Limestone cave exploration", "Beach BBQ"],
    languages: ["English", "Filipino"],
  },
  {
    id: 25, category: "Water",
    title: "Tahiti Surf Lesson at Teahupo'o",
    host: "Teiva Manutahi", hostAvatar: "https://i.pravatar.cc/80?img=35",
    location: "Teahupo'o, Tahiti", price: 155, rating: 4.90, reviews: 143,
    duration: "4 hours", groupSize: "1–4 guests", tag: "Legendary Wave",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Learn to surf the waters near the world-famous Teahupo'o break with a local champion surfer. Beginners ride the inner reef while advanced surfers can paddle to the outer break.",
    includes: ["Surfboard & wetsuit", "Local champion coach", "Video analysis", "Coconut water", "Boat transfer"],
    highlights: ["World-famous surf break", "Champion surfer coach", "Video feedback session", "Tahitian lagoon swim"],
    languages: ["English", "French", "Tahitian"],
  },
  {
    id: 26, category: "Water",
    title: "Amazon Pink Dolphin Swim",
    host: "Ana Ribeiro", hostAvatar: "https://i.pravatar.cc/80?img=36",
    location: "Rio Negro, Brazil", price: 130, rating: 4.93, reviews: 178,
    duration: "5 hours", groupSize: "2–8 guests", tag: "Extraordinary",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Swim alongside rare pink Amazon river dolphins in the black waters of the Rio Negro, then piranha fish, spot giant otters, and catch the flooded forest sunset by canoe.",
    includes: ["Canoe & local guide", "Pink dolphin swim", "Piranha fishing", "Forest walk", "Tropical fruit snack"],
    highlights: ["Pink dolphin encounter", "Piranha fishing", "Giant otter sighting", "Flooded forest canoe"],
    languages: ["English", "Portuguese"],
  },
  {
    id: 27, category: "Water",
    title: "Lofoten Midnight Sun Kayaking",
    host: "Astrid Norgaard", hostAvatar: "https://i.pravatar.cc/80?img=37",
    location: "Lofoten Islands, Norway", price: 175, rating: 4.95, reviews: 212,
    duration: "4 hours", groupSize: "2–8 guests", tag: "24hr Sun",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Kayak at midnight under the golden midnight sun through Lofoten's dramatic fjords, paddling past red fishermen's huts, sea eagles, and mountains that plunge straight into the Arctic sea.",
    includes: ["Sea kayak & paddle", "Certified guide", "Dry suit & gear", "Midnight snack", "Sea eagle spotting"],
    highlights: ["Midnight sun on the water", "Sea eagle encounters", "Ancient rorbuer huts", "Arctic ocean paddle"],
    languages: ["English", "Norwegian"],
  },
  {
    id: 28, category: "Water",
    title: "Montenegro Sea Cave Snorkel",
    host: "Marko Petrović", hostAvatar: "https://i.pravatar.cc/80?img=38",
    location: "Kotor Bay, Montenegro", price: 70, rating: 4.88, reviews: 298,
    duration: "3 hours", groupSize: "2–10 guests", tag: "Crystal Clear",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Discover hidden sea caves and underwater grottos in the crystal-clear waters of Kotor Bay. Snorkel through blue and green caves glowing with natural light.",
    includes: ["Boat & guide", "Snorkel gear", "Cave entry fees", "Fresh fruit", "Underwater torch"],
    highlights: ["Blue Cave entry", "Bioluminescent grotto", "Kotor Bay views", "Underwater photography"],
    languages: ["English", "Montenegrin"],
  },
  {
    id: 29, category: "Water",
    title: "Oman Whale Shark Snorkel",
    host: "Khalid Al-Balushi", hostAvatar: "https://i.pravatar.cc/80?img=39",
    location: "Musandam, Oman", price: 185, rating: 4.96, reviews: 156,
    duration: "5 hours", groupSize: "2–8 guests", tag: "Ocean Giants",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Snorkel alongside gentle whale sharks in the warm Arabian Sea, then explore the fjord-like Musandam coastline by traditional dhow, stopping at remote beaches and spotting dolphins.",
    includes: ["Dhow boat", "Marine biologist guide", "Snorkel equipment", "Arabic mezze lunch", "Dolphin watch"],
    highlights: ["Whale shark encounter", "Dolphin escort", "Traditional dhow cruise", "Musandam fjords"],
    languages: ["English", "Arabic"],
  },
  {
    id: 30, category: "Water",
    title: "Croatia Sailing & Wine Island Hop",
    host: "Petra Horvat", hostAvatar: "https://i.pravatar.cc/80?img=40",
    location: "Split, Croatia", price: 220, rating: 4.97, reviews: 267,
    duration: "Full day", groupSize: "2–8 guests", tag: "Mediterranean",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Sail the Dalmatian coast visiting Hvar, Brač, and Vis on a classic wooden ketch, swimming in hidden coves, tasting local Plavac Mali wine at island wineries.",
    includes: ["Private wooden ketch", "Skipper & crew", "Island winery visits", "Fresh fish dinner", "Snorkelling gear"],
    highlights: ["3-island sailing route", "Hidden cove swimming", "Family winery tasting", "Sunset Hvar harbour"],
    languages: ["English", "Croatian"],
  },

  /* ── NATURE (wildlife, forests, national parks, aurora, landscapes) ── */
  {
    id: 31, category: "Nature",
    title: "Desert Star Gazing & Meditation",
    host: "Amir Al-Hassan", hostAvatar: "https://i.pravatar.cc/80?img=41",
    location: "Sahara, Morocco", price: 95, rating: 4.97, reviews: 176,
    duration: "4 hours", groupSize: "2–10 guests", tag: "Unique",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Lie back on Berber blankets far from any light pollution and marvel at the Milky Way stretching across the Sahara sky. An astronomy guide explains the constellations while a meditation leader guides a desert sound bath.",
    includes: ["Telescope access", "Astronomy guide", "Sound bath meditation", "Mint tea & dates", "Blankets & cushions"],
    highlights: ["Milky Way above the dunes", "Powerful telescope viewing", "Desert sound bath", "Berber hospitality"],
    languages: ["English", "French", "Arabic"],
  },
  {
    id: 32, category: "Nature",
    title: "Kenya Hot Air Balloon Safari",
    host: "James Kamau", hostAvatar: "https://i.pravatar.cc/80?img=43",
    location: "Masai Mara, Kenya", price: 480, rating: 4.99, reviews: 312,
    duration: "5 hours", groupSize: "2–12 guests", tag: "Once in a Lifetime",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Drift silently over the Masai Mara at sunrise as lions wake, elephants march, and thousands of wildebeest move below. Ends with a bush champagne breakfast on the savannah.",
    includes: ["Hot air balloon flight", "Expert pilot", "Bush champagne breakfast", "Game drive", "KATO-certified guide"],
    highlights: ["Sunrise over the Mara", "Big 5 from the air", "Wildebeest migration views", "Bush champagne feast"],
    languages: ["English", "Swahili"],
  },
  {
    id: 33, category: "Nature",
    title: "Costa Rica Cloud Forest Trek",
    host: "Valentina Cruz", hostAvatar: "https://i.pravatar.cc/80?img=44",
    location: "Monteverde, Costa Rica", price: 115, rating: 4.93, reviews: 389,
    duration: "5 hours", groupSize: "2–10 guests", tag: "Pura Vida",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Trek through Monteverde's misty cloud forest canopy and track sloths, quetzals, and howler monkeys with a certified naturalist guide on secret trails off the tourist path.",
    includes: ["Cloud forest trek", "Naturalist guide", "Sloth & quetzal spotting", "Safety gear", "Fresh fruit snack"],
    highlights: ["Resplendent quetzal sighting", "Three-toed sloth encounter", "Misty cloud forest", "Zip-line option"],
    languages: ["English", "Spanish"],
  },
  {
    id: 34, category: "Nature",
    title: "Norwegian Northern Lights Expedition",
    host: "Sigrid Larsen", hostAvatar: "https://i.pravatar.cc/80?img=45",
    location: "Tromsø, Norway", price: 265, rating: 4.96, reviews: 433,
    duration: "5 hours", groupSize: "2–8 guests", tag: "Aurora",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Chase the Northern Lights in a 4WD minibus with a professional aurora photographer who uses real-time cloud and KP-index data to get you the best show possible.",
    includes: ["Aurora 4WD chase", "Professional photographer guide", "Photography tuition", "Thermal suits", "Hot reindeer soup"],
    highlights: ["Expert aurora chasing", "Photography masterclass", "Reindeer soup under the lights", "Clear sky guarantee"],
    languages: ["English", "Norwegian"],
  },
  {
    id: 35, category: "Nature",
    title: "Borneo Orangutan Jungle Trek",
    host: "Rahmat Bin Ismail", hostAvatar: "https://i.pravatar.cc/80?img=46",
    location: "Sepilok, Borneo", price: 150, rating: 4.95, reviews: 267,
    duration: "6 hours", groupSize: "2–6 guests", tag: "Rare",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Trek deep into untouched Borneo rainforest with a local Dusun ranger to spot semi-wild orangutans, pygmy elephants, and proboscis monkeys in their natural habitat.",
    includes: ["Certified jungle ranger", "Sepilok centre visit", "Trek equipment", "Traditional lunch", "Wildlife ID booklet"],
    highlights: ["Semi-wild orangutan encounter", "Pygmy elephant spotting", "Ancient rainforest trek", "Dusun cultural lunch"],
    languages: ["English", "Malay"],
  },
  {
    id: 36, category: "Nature",
    title: "Patagonia Condor & Puma Tracking",
    host: "Santiago Ríos", hostAvatar: "https://i.pravatar.cc/80?img=47",
    location: "Torres del Paine, Chile", price: 195, rating: 4.94, reviews: 198,
    duration: "Full day", groupSize: "2–6 guests", tag: "Apex Predator",
    image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Track wild pumas through the pampas and steppe of Torres del Paine with a master tracker who has 20+ years reading puma sign, while Andean condors soar overhead.",
    includes: ["Expert tracker & guide", "4WD vehicle", "Telescope & binoculars", "Gaucho-style BBQ lunch", "Tracking data access"],
    highlights: ["Wild puma encounter", "Andean condor sightings", "Torres del Paine backdrop", "Gaucho BBQ asado"],
    languages: ["English", "Spanish"],
  },
  {
    id: 37, category: "Nature",
    title: "Yellowstone Geothermal Dawn Walk",
    host: "River Wolf", hostAvatar: "https://i.pravatar.cc/80?img=48",
    location: "Yellowstone, Wyoming USA", price: 125, rating: 4.91, reviews: 341,
    duration: "4 hours", groupSize: "2–8 guests", tag: "Volcanic",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Access the Grand Prismatic Spring and Mammoth Hot Springs before the park opens to the public. Watch bison steam in the frost, see Old Faithful at dawn, and spot wolves.",
    includes: ["Early access permits", "Certified NPS guide", "Wildlife spotting scopes", "Bison & wolf watch", "Thermos of coffee"],
    highlights: ["Pre-dawn Grand Prismatic", "Wolf pack sighting", "Old Faithful at sunrise", "Lamar Valley bison herd"],
    languages: ["English"],
  },
  {
    id: 38, category: "Nature",
    title: "Sri Lanka Leopard Safari at Dawn",
    host: "Priya Wickramasinghe", hostAvatar: "https://i.pravatar.cc/80?img=49",
    location: "Yala, Sri Lanka", price: 155, rating: 4.97, reviews: 213,
    duration: "5 hours", groupSize: "2–6 guests", tag: "Elusive",
    image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Yala has the world's highest density of wild leopards. A tracker with 15 years' experience takes you in an open-roof 4WD to the best sighting spots at first light.",
    includes: ["Open 4WD jeep", "Master tracker guide", "Binoculars", "Continental breakfast", "Park entrance fees"],
    highlights: ["Highest leopard density on Earth", "Dawn golden hour sighting", "Elephant & crocodile", "Birding with expert"],
    languages: ["English", "Sinhala"],
  },
  {
    id: 39, category: "Nature",
    title: "Azores Whale Watching & Dive",
    host: "João Faria", hostAvatar: "https://i.pravatar.cc/80?img=50",
    location: "Pico Island, Azores", price: 170, rating: 4.95, reviews: 287,
    duration: "5 hours", groupSize: "2–8 guests", tag: "Giants of the Deep",
    image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "The Azores is one of the world's best year-round whale watching sites. Spot sperm, blue, and fin whales from a former whaling lookout, then snorkel with manta rays and dolphins.",
    includes: ["Whale watching boat", "Marine biologist guide", "Snorkel with dolphins", "Manta ray swim", "Azorean lunch"],
    highlights: ["Sperm whale encounters", "Blue whale possibility", "Dolphin snorkel swim", "Manta ray encounter"],
    languages: ["English", "Portuguese"],
  },
  {
    id: 40, category: "Nature",
    title: "Galápagos Tortoise Sanctuary Walk",
    host: "Diego Morales", hostAvatar: "https://i.pravatar.cc/80?img=42",
    location: "Santa Cruz, Galápagos", price: 135, rating: 4.98, reviews: 224,
    duration: "4 hours", groupSize: "2–8 guests", tag: "Conservation",
    image: "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Walk among giant 200-year-old tortoises in the highlands of Santa Cruz, meet marine iguanas, blue-footed boobies, and sea lions — all completely unafraid of humans.",
    includes: ["Darwin Station guide", "Highland tortoise walk", "Marine iguana stop", "Blue-footed boobies", "Organic farm lunch"],
    highlights: ["200-year-old tortoises", "Blue-footed boobies", "Marine iguanas at sea", "Conservation farm visit"],
    languages: ["English", "Spanish"],
  },

  /* ── CULTURE (temples, heritage, ceremonies, arts, history) ── */
  {
    id: 41, category: "Culture",
    title: "Bali Sacred Temple Sunrise",
    host: "Made Wijaya", hostAvatar: "https://i.pravatar.cc/80?img=51",
    location: "Ubud, Bali", price: 65, rating: 4.96, reviews: 341,
    duration: "4 hours", groupSize: "2–8 guests", tag: "Spiritual",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Join a Balinese priest at the sacred Pura Besakih temple complex before dawn for a private sunrise blessing ceremony, then visit three hidden water temples.",
    includes: ["Priest-led ceremony", "Sarong & offering", "Temple entry fees", "3 hidden water temples", "Banana leaf breakfast"],
    highlights: ["Private blessing ceremony", "Mother Temple access", "Holy spring ritual", "Sacred temple sunrise"],
    languages: ["English", "Balinese", "Indonesian"],
  },
  {
    id: 42, category: "Culture",
    title: "Flamenco Masterclass in Seville",
    host: "Isabella Reyes", hostAvatar: "https://i.pravatar.cc/80?img=52",
    location: "Seville, Spain", price: 85, rating: 4.91, reviews: 263,
    duration: "2 hours", groupSize: "2–10 guests", tag: "Artistic",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Learn flamenco from a professional bailaora in her authentic studio in the Triana barrio — birthplace of flamenco. Dress in traditional costume, learn footwork and arms.",
    includes: ["2-hr dance lesson", "Traditional costume", "Castanets use", "Sangria & tapas after", "Video of your dance"],
    highlights: ["Triana barrio studio", "Footwork & arm technique", "Traditional dress-up", "Tapas & sangria finale"],
    languages: ["English", "Spanish"],
  },
  {
    id: 43, category: "Culture",
    title: "Petra by Night Torch Procession",
    host: "Omar Al-Nabatean", hostAvatar: "https://i.pravatar.cc/80?img=53",
    location: "Petra, Jordan", price: 115, rating: 4.97, reviews: 389,
    duration: "3 hours", groupSize: "2–50 guests", tag: "Ancient Wonder",
    image: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Walk the candlelit Siq gorge to the illuminated Treasury at night with a Bedouin storyteller, 1,500 candles lighting the ancient rose-red sandstone as traditional music fills the canyon.",
    includes: ["Candlelit Siq walk", "Bedouin music performance", "Mint tea", "Entry tickets", "Local storyteller"],
    highlights: ["1,500 candles at the Treasury", "Ancient Bedouin music", "Rose-red canyon at night", "Bedouin folklore tales"],
    languages: ["English", "Arabic"],
  },
  {
    id: 44, category: "Culture",
    title: "Rajasthan Maharajah Palace Day",
    host: "Maharaj Vikram Singh", hostAvatar: "https://i.pravatar.cc/80?img=54",
    location: "Jaipur, India", price: 280, rating: 4.98, reviews: 178,
    duration: "Full day", groupSize: "2–6 guests", tag: "Royal",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Live like Maharajah royalty for a day: elephant polo, archery, royal Rajasthani thali cooking class, and a private tour of a real Rajput palace with the 12th-generation owner.",
    includes: ["Elephant polo & archery", "Royal cooking class", "Palace tour with owner", "Royal Rajasthani feast", "Traditional attire"],
    highlights: ["Elephant polo match", "Private palace tour", "Cooking with royalty", "12th-generation prince host"],
    languages: ["English", "Hindi"],
  },
  {
    id: 45, category: "Culture",
    title: "Havana Jazz & Salsa Night",
    host: "Roberto Valdés", hostAvatar: "https://i.pravatar.cc/80?img=56",
    location: "Havana, Cuba", price: 80, rating: 4.93, reviews: 312,
    duration: "4 hours", groupSize: "2–12 guests", tag: "Vibrant",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Start with a salsa class from a national champion dancer in a colonial Havana courtyard, then join the Calle Ocho jazz scene — live son cubano, rum cocktails, and dancing till midnight.",
    includes: ["1-hr salsa lesson", "Local jazz club access", "4 rum cocktails", "Cuban snacks", "Champion dancer host"],
    highlights: ["National champion teacher", "Live son cubano", "Classic Havana courtyard", "Mojito & rum bar"],
    languages: ["English", "Spanish"],
  },
  {
    id: 46, category: "Culture",
    title: "Athens Acropolis After Hours",
    host: "Eleni Papadaki", hostAvatar: "https://i.pravatar.cc/80?img=57",
    location: "Athens, Greece", price: 145, rating: 4.96, reviews: 223,
    duration: "3 hours", groupSize: "2–8 guests", tag: "Exclusive",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555993539-1732b0258235?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603565816030-6987515cc1d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603565816030-6987515cc1d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Access the Acropolis after it closes to the public with a PhD classical archaeologist. Walk the Parthenon in golden evening light with no crowds.",
    includes: ["After-hours Acropolis access", "PhD archaeologist guide", "Parthenon sunset view", "Greek wine & mezes", "Private taxi"],
    highlights: ["Zero-crowd Parthenon", "PhD archaeologist stories", "Athens golden hour sunset", "Private Propylaea access"],
    languages: ["English", "Greek"],
  },
  {
    id: 47, category: "Culture",
    title: "Geisha District Teahouse Evening",
    host: "Maiko Fujiwara", hostAvatar: "https://i.pravatar.cc/80?img=58",
    location: "Gion, Kyoto Japan", price: 320, rating: 4.99, reviews: 134,
    duration: "3 hours", groupSize: "2–4 guests", tag: "Ultra-Rare",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "An exceptionally rare evening: dinner in a private Gion ochaya teahouse with a maiko who performs traditional dance, plays the shamisen, and teaches ozashiki parlour games.",
    includes: ["Private ochaya teahouse", "Maiko performance", "Shamisen music", "8-course kaiseki dinner", "Ozashiki games"],
    highlights: ["Genuine maiko performer", "Private ochaya teahouse", "Shamisen & traditional dance", "8-course kaiseki dinner"],
    languages: ["English", "Japanese"],
  },
  {
    id: 48, category: "Culture",
    title: "Varanasi Ganga Aarti & Boat Ritual",
    host: "Pandit Ravi Shankar", hostAvatar: "https://i.pravatar.cc/80?img=60",
    location: "Varanasi, India", price: 60, rating: 4.97, reviews: 456,
    duration: "5 hours", groupSize: "2–10 guests", tag: "Sacred",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Watch the ancient Ganga Aarti fire ceremony from a private wooden boat on the Ganges as dozens of priests swing flaming lamps in perfect synchrony, then explore the ghats at dawn.",
    includes: ["Private Ganges boat", "Aarti ceremony viewing", "Dawn ghat walking tour", "Chai & lassi", "Sanskrit mantra card"],
    highlights: ["Private boat for Aarti", "Brahmin scholar guide", "Dawn cremation ghat tour", "Sunrise on the Ganges"],
    languages: ["English", "Hindi", "Sanskrit"],
  },
  {
    id: 49, category: "Culture",
    title: "Cape Town Township Music Tour",
    host: "Bongani Dlamini", hostAvatar: "https://i.pravatar.cc/80?img=59",
    location: "Cape Town, South Africa", price: 70, rating: 4.92, reviews: 298,
    duration: "4 hours", groupSize: "2–10 guests", tag: "Soulful",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "A born-and-raised Langa local takes you to community jazz cafés, kwaito dance halls, and a vinyl shop where South African jazz history was made.",
    includes: ["Community jazz venue", "Kwaito dance intro", "Vinyl shop visit", "Township braai dinner", "Local guide transport"],
    highlights: ["Community jazz & kwaito", "Apartheid music history", "Legendary vinyl shop", "Township braai dinner"],
    languages: ["English", "Zulu", "Xhosa"],
  },
  {
    id: 50, category: "Culture",
    title: "Ethiopian Coffee Ceremony & Injera",
    host: "Almaz Haile", hostAvatar: "https://i.pravatar.cc/80?img=55",
    location: "Addis Ababa, Ethiopia", price: 55, rating: 4.90, reviews: 267,
    duration: "4 hours", groupSize: "2–10 guests", tag: "Origin",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Participate in a traditional 3-round Ethiopian coffee ceremony — roasting, grinding, and brewing Yirgacheffe beans — then learn to make injera teff flatbread for a communal feast.",
    includes: ["Coffee ceremony", "Injera cooking class", "Traditional feast", "Coffee beans to take home", "Amharic phrases card"],
    highlights: ["Coffee's original homeland", "3-round ceremony", "Injera teff cooking", "Family communal feast"],
    languages: ["English", "Amharic"],
  },

  /* ── WELLNESS (yoga, spa, meditation, healing, breathwork) ── */
  {
    id: 51, category: "Wellness",
    title: "Ubud Chakra Yoga & Rice Terrace",
    host: "Kadek Surya", hostAvatar: "https://i.pravatar.cc/80?img=61",
    location: "Ubud, Bali", price: 70, rating: 4.94, reviews: 312,
    duration: "3 hours", groupSize: "1–8 guests", tag: "Restorative",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Practice sunrise vinyasa yoga on a platform above the terraced Tegalalang rice fields, follow with breathwork and a chakra meditation, then cleanse at a traditional Balinese water temple.",
    includes: ["Yoga mat & props", "Certified yoga teacher", "Breathwork session", "Water temple visit", "Organic jamu juice"],
    highlights: ["Tegalalang rice terrace yoga", "Sunrise chakra meditation", "Sacred spring cleansing", "Organic jamu ceremony"],
    languages: ["English", "Balinese"],
  },
  {
    id: 52, category: "Wellness",
    title: "Lapland Ice Sauna & Reindeer Ride",
    host: "Mikko Virtanen", hostAvatar: "https://i.pravatar.cc/80?img=62",
    location: "Rovaniemi, Finland", price: 195, rating: 4.97, reviews: 187,
    duration: "4 hours", groupSize: "2–6 guests", tag: "Arctic Ritual",
    image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Experience the Finnish tradition of smoke sauna on a frozen lake, plunge through a hole in the ice into -2°C water, ride reindeer through a snowy forest, and warm up with cloudberry glögi.",
    includes: ["Smoke sauna session", "Ice swimming hole", "Reindeer sled ride", "Thermal suit", "Cloudberry glögi"],
    highlights: ["Smoke sauna on frozen lake", "Ice plunge at -2°C", "Reindeer forest sled", "Cloudberry warm glögi"],
    languages: ["English", "Finnish"],
  },
  {
    id: 53, category: "Wellness",
    title: "Rishikesh Ganges Yoga Retreat",
    host: "Swami Ananda", hostAvatar: "https://i.pravatar.cc/80?img=63",
    location: "Rishikesh, India", price: 85, rating: 4.95, reviews: 423,
    duration: "6 hours", groupSize: "2–12 guests", tag: "Yogic",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Morning yoga and pranayama on a Ganges bank ashram, vedic meditation class, Ayurvedic head massage, and evening aarti flame ceremony at Triveni Ghat — birthplace of yoga's global journey.",
    includes: ["2-hr yoga class", "Pranayama session", "Ayurvedic massage", "Sattvic breakfast", "Aarti ceremony"],
    highlights: ["Birthplace of modern yoga", "Vedic meditation master", "Ganges sunrise yoga", "Ayurvedic full massage"],
    languages: ["English", "Hindi", "Sanskrit"],
  },
  {
    id: 54, category: "Wellness",
    title: "Turkish Hammam Ritual & Massage",
    host: "Fatma Demir", hostAvatar: "https://i.pravatar.cc/80?img=64",
    location: "Istanbul, Turkey", price: 110, rating: 4.92, reviews: 534,
    duration: "3 hours", groupSize: "1–6 guests", tag: "Purifying",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Experience the full traditional Ottoman hammam ritual in a 500-year-old bathhouse: steam room, kese scrub, foam massage, and a hand massage with rose oil — as sultans once did daily.",
    includes: ["Hammam steam session", "Kese exfoliation scrub", "Foam & oil massage", "Traditional peshtemal towel", "Apple tea after"],
    highlights: ["500-year-old hammam building", "Full kese & foam ritual", "Rose oil hand massage", "Ottoman sultan's routine"],
    languages: ["English", "Turkish"],
  },
  {
    id: 55, category: "Wellness",
    title: "Sedona Vortex Sound Healing",
    host: "Luna Redcloud", hostAvatar: "https://i.pravatar.cc/80?img=65",
    location: "Sedona, Arizona USA", price: 150, rating: 4.93, reviews: 289,
    duration: "3 hours", groupSize: "1–8 guests", tag: "Energy",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "A certified energy healer leads you to Sedona's most powerful vortex sites for a Tibetan singing bowl sound bath and crystal grid meditation surrounded by iconic red rock formations.",
    includes: ["Vortex hike", "Tibetan singing bowls", "Crystal grid meditation", "Sage smudging ceremony", "Herbal tea"],
    highlights: ["Cathedral Rock vortex", "Tibetan bowl sound bath", "Crystal grid healing", "Red rock sunset"],
    languages: ["English"],
  },
  {
    id: 56, category: "Wellness",
    title: "Azores Hot Spring Float & Spa",
    host: "Margarida Costa", hostAvatar: "https://i.pravatar.cc/80?img=66",
    location: "São Miguel, Azores", price: 125, rating: 4.96, reviews: 198,
    duration: "4 hours", groupSize: "2–8 guests", tag: "Volcanic Bliss",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Float in geothermal hot springs inside a volcanic crater lake in Furnas valley, then receive a traditional Azorean relaxation massage with volcanic mud and local botanical oils.",
    includes: ["Crater hot spring float", "Volcanic mud treatment", "Botanical oil massage", "Herbal tea infusion", "Geothermal tour"],
    highlights: ["Volcanic crater springs", "Mud mineral treatment", "Botanical oil massage", "Furnas geothermal valley"],
    languages: ["English", "Portuguese"],
  },
  {
    id: 57, category: "Wellness",
    title: "Japanese Forest Bathing (Shinrin-yoku)",
    host: "Dr Yuko Nakashima", hostAvatar: "https://i.pravatar.cc/80?img=67",
    location: "Yakushima, Japan", price: 100, rating: 4.97, reviews: 243,
    duration: "5 hours", groupSize: "2–8 guests", tag: "Science-Backed",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Walk in mindful silence through Yakushima's 2,000-year-old cedar forest with a certified shinrin-yoku practitioner and environmental psychologist — shown to reduce cortisol by 30%.",
    includes: ["Certified forest therapist", "Guided sensory exercises", "Sit spot meditation", "Forest tea ceremony", "Phytoncide journal"],
    highlights: ["2,000-year-old cedar trees", "Clinical forest therapy", "Sensory immersion walk", "Forest tea ceremony"],
    languages: ["English", "Japanese"],
  },
  {
    id: 58, category: "Wellness",
    title: "Tulum Cenote Swim & Cacao Ceremony",
    host: "Ximena Guerrero", hostAvatar: "https://i.pravatar.cc/80?img=68",
    location: "Tulum, Mexico", price: 115, rating: 4.91, reviews: 378,
    duration: "4 hours", groupSize: "2–10 guests", tag: "Sacred Mayan",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Swim in a crystal-clear secret cenote — a sacred Mayan underground pool — then participate in a ceremonial cacao circle with a Mayan shaman using pure Guatemalan cacao.",
    includes: ["Secret cenote swim", "Cacao ceremony", "Mayan shaman guide", "Meditation circle", "Ceremonial cacao drink"],
    highlights: ["Hidden secret cenote", "Mayan shaman ceremony", "Pure ceremonial cacao", "Underground crystal water"],
    languages: ["English", "Spanish", "Mayan"],
  },
  {
    id: 59, category: "Wellness",
    title: "Swiss Alps Cold Therapy Retreat",
    host: "Dr Petra Steiner", hostAvatar: "https://i.pravatar.cc/80?img=69",
    location: "Davos, Switzerland", price: 240, rating: 4.95, reviews: 156,
    duration: "5 hours", groupSize: "2–6 guests", tag: "Wim Hof Method",
    image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Wim Hof Method-certified instructor takes you through breathwork, mindset training, and ice bath immersion in a natural alpine stream — scientifically proven for stress resilience and immune boost.",
    includes: ["Wim Hof breathwork", "Ice bath immersion", "Alpine stream access", "Hot sauna contrast", "Wellness coaching"],
    highlights: ["Certified Wim Hof instructor", "Natural alpine ice bath", "Breathwork science session", "Hot-cold contrast therapy"],
    languages: ["English", "German", "Dutch"],
  },
  {
    id: 60, category: "Wellness",
    title: "Kerala Ayurvedic Panchakarma Day",
    host: "Dr Anitha Nair", hostAvatar: "https://i.pravatar.cc/80?img=70",
    location: "Alleppey, Kerala India", price: 175, rating: 4.98, reviews: 289,
    duration: "8 hours", groupSize: "1–4 guests", tag: "5,000-Year Medicine",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "A full Ayurvedic Panchakarma detox day with a qualified Ayurvedic doctor: Prakriti assessment, Abhyanga oil massage, Shirodhara warm oil forehead treatment, herbal steam, and medicinal meals.",
    includes: ["Ayurvedic doctor consult", "Abhyanga full-body massage", "Shirodhara oil treatment", "Herbal steam bath", "Sattvic Ayurvedic meals"],
    highlights: ["Qualified Ayurvedic MD", "Shirodhara forehead therapy", "Full 5-treatment Panchakarma", "Backwater Kerala setting"],
    languages: ["English", "Malayalam", "Hindi"],
  },

  /* ── MUSIC (concerts, lessons, jam sessions, instruments, live) ── */
  {
    id: 61, category: "Music",
    title: "Nashville Songwriting with a Grammy Artist",
    host: "Jake Morrison", hostAvatar: "https://i.pravatar.cc/80?img=71",
    location: "Nashville, Tennessee USA", price: 350, rating: 4.97, reviews: 134,
    duration: "3 hours", groupSize: "1–4 guests", tag: "Grammy",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Co-write an original song with a Grammy-nominated Nashville songwriter in his Lower Broadway writing room. Leave with a professionally recorded MP3 and the songwriting story of your life.",
    includes: ["Co-writing session", "Studio recording", "Mastered MP3 takeaway", "Guitar & piano use", "Nashville pub tour"],
    highlights: ["Grammy-nominated co-writer", "Your song professionally recorded", "Lower Broadway studio", "MP3 to keep"],
    languages: ["English"],
  },
  {
    id: 62, category: "Music",
    title: "Havana Son Cubano Music Session",
    host: "Elio Revé Jr.", hostAvatar: "https://i.pravatar.cc/80?img=72",
    location: "Havana, Cuba", price: 90, rating: 4.95, reviews: 267,
    duration: "3 hours", groupSize: "2–10 guests", tag: "Legendary",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Jam with legendary Havana musicians in a colonial casa, learning claves, bongó, and tres guitar. Play a full son cubano with the band, then join them for their evening house concert.",
    includes: ["Rhythm instruments lesson", "Full band jam session", "Evening concert attendance", "Cuban cigars & rum", "Recording of your jam"],
    highlights: ["Multi-generational musicians", "Play with the full band", "Attend evening concert", "Colonial casa setting"],
    languages: ["English", "Spanish"],
  },
  {
    id: 63, category: "Music",
    title: "Irish Pub Trad Session & Bodhrán",
    host: "Seamus O'Connor", hostAvatar: "https://i.pravatar.cc/80?img=73",
    location: "Doolin, County Clare Ireland", price: 65, rating: 4.91, reviews: 389,
    duration: "4 hours", groupSize: "2–10 guests", tag: "Traditional",
    image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Learn to play the bodhrán frame drum and basic tin whistle with a Doolin music legend, then join the actual pub trad session — no performance anxiety, just pure craic with the locals.",
    includes: ["Bodhrán & tin whistle lesson", "Trad session participation", "Guinness & Irish stew", "Instrument to borrow", "Doolin history"],
    highlights: ["Genuine pub trad session", "Bodhrán drum lesson", "Ireland's trad music capital", "Pure Irish craic"],
    languages: ["English", "Irish Gaelic"],
  },
  {
    id: 64, category: "Music",
    title: "Buenos Aires Tango at a Milonga",
    host: "Cecilia Narváez", hostAvatar: "https://i.pravatar.cc/80?img=75",
    location: "San Telmo, Buenos Aires", price: 95, rating: 4.94, reviews: 445,
    duration: "4 hours", groupSize: "2–8 guests", tag: "Sensual",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Learn authentic Argentine tango — the embrace, the walk, the pausa — from a world finalist dancer in San Telmo, then dance at a real milonga ballroom with live bandoneon music.",
    includes: ["2-hr private lesson", "Milonga entrance", "Live bandoneon orchestra", "Tango shoes to borrow", "Malbec wine"],
    highlights: ["World finalist teacher", "Real milonga ballroom", "Live bandoneon music", "Malbec wine in San Telmo"],
    languages: ["English", "Spanish"],
  },
  {
    id: 65, category: "Music",
    title: "New Orleans Jazz Funeral & Second Line",
    host: "Professor Longhair II", hostAvatar: "https://i.pravatar.cc/80?img=77",
    location: "New Orleans, Louisiana USA", price: 85, rating: 4.92, reviews: 334,
    duration: "4 hours", groupSize: "2–15 guests", tag: "N'awlins",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Join a real New Orleans brass band second line parade through the Tremé neighbourhood with parasols and handkerchiefs, then visit the Preservation Hall for a private jazz history lesson.",
    includes: ["Brass band parade", "Parasol & hanky", "Preservation Hall visit", "Beignets & chicory coffee", "Jazz history talk"],
    highlights: ["Real second line parade", "Preservation Hall access", "Tremé jazz history", "Beignets at Café Du Monde"],
    languages: ["English"],
  },
  {
    id: 66, category: "Music",
    title: "Fado Soul of Lisbon",
    host: "Ana Moura Jr.", hostAvatar: "https://i.pravatar.cc/80?img=78",
    location: "Alfama, Lisbon Portugal", price: 110, rating: 4.96, reviews: 287,
    duration: "4 hours", groupSize: "2–8 guests", tag: "Soulful",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Follow a fadista through the cobblestone Alfama alleys to a hidden tasca where she performs raw, unfiltered fado — the sound of Portuguese longing — then join a guitar lesson in the back room.",
    includes: ["Private tasca fado show", "Portuguese guitar intro", "History of fado walk", "Wine & petiscos", "Hidden venue access"],
    highlights: ["Hidden tasca fado", "Saudade history walk", "Portuguese guitar lesson", "Alfama cobblestone night"],
    languages: ["English", "Portuguese"],
  },
  {
    id: 67, category: "Music",
    title: "Vienna Private Mozart Concert",
    host: "Maestro Klaus Weber", hostAvatar: "https://i.pravatar.cc/80?img=80",
    location: "Vienna, Austria", price: 195, rating: 4.98, reviews: 223,
    duration: "3 hours", groupSize: "2–10 guests", tag: "Classical",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Sit in an ornate Viennese palace hall for a private chamber concert of Mozart, Beethoven, and Schubert performed by Vienna Philharmonic musicians, followed by Sachertorte and coffee.",
    includes: ["Private palace concert", "Vienna Philharmonic musicians", "Pre-concert talk", "Sachertorte & coffee", "Concert programme"],
    highlights: ["Vienna Philharmonic players", "Ornate palace hall", "Mozart & Beethoven programme", "Sachertorte after-concert"],
    languages: ["English", "German"],
  },
  {
    id: 68, category: "Music",
    title: "Mali Kora & Griot Storytelling",
    host: "Toumani Kouyaté", hostAvatar: "https://i.pravatar.cc/80?img=74",
    location: "Bamako, Mali", price: 75, rating: 4.96, reviews: 143,
    duration: "3 hours", groupSize: "2–8 guests", tag: "Ancient Art",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "A 7th-generation griot teaches you to play the kora — a 21-string West African harp — and shares the oral history tradition of his lineage, keepers of Malian imperial history.",
    includes: ["Kora lesson", "Griot oral history session", "Mande Empire stories", "Traditional meal", "Kora music recording"],
    highlights: ["7th-generation griot", "Kora 21-string harp", "Mande Empire history", "Oral storytelling tradition"],
    languages: ["English", "French", "Bambara"],
  },
  {
    id: 69, category: "Music",
    title: "Djembe Drumming in a Senegal Village",
    host: "Mamadou Diabaté", hostAvatar: "https://i.pravatar.cc/80?img=79",
    location: "Casamance, Senegal", price: 60, rating: 4.93, reviews: 178,
    duration: "3 hours", groupSize: "2–12 guests", tag: "Community",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Learn to play djembe in a Casamance village with a master drummer whose family has played at ceremonies for generations. Join the evening community drum circle as an honorary participant.",
    includes: ["Djembe lesson", "Community drum circle", "Village tour", "Thiéboudienne dinner", "Drum recording"],
    highlights: ["Multi-generational master", "Real community ceremony", "Village life immersion", "Thiéboudienne fish dinner"],
    languages: ["English", "French", "Wolof"],
  },
  {
    id: 70, category: "Music",
    title: "Marrakech Gnawa Trance Music",
    host: "Hamid El-Gnaoui", hostAvatar: "https://i.pravatar.cc/80?img=76",
    location: "Marrakech, Morocco", price: 70, rating: 4.93, reviews: 213,
    duration: "3 hours", groupSize: "2–10 guests", tag: "UNESCO Heritage",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Witness and participate in a private Gnawa healing music ceremony — a UNESCO-recognized Moroccan spiritual practice — with guembri bass lute, krakebs metal castanets, and hypnotic trance chanting.",
    includes: ["Private Gnawa ceremony", "Guembri & krakeb participation", "Gnawa history talk", "Moroccan dinner", "Instrument demonstration"],
    highlights: ["UNESCO Gnawa heritage", "Healing trance ceremony", "Guembri bass lute", "Ancient African spiritual music"],
    languages: ["English", "French", "Darija Arabic"],
  },
];

const categories = ["All", "Adventure", "Food", "Water", "Nature", "Culture", "Wellness", "Music"];

export default function ExperiencesPage({ darkMode }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [selected, setSelected] = useState(null);
  const [galleryIdx, setGalleryIdx] = useState(0);

  const pageBg = darkMode ? "bg-obsidian" : "bg-ivory-50";
  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  const cardBg = darkMode ? "bg-[#141414] border-white/10" : "bg-white border-stone-200";
  const modalBg = darkMode ? "bg-[#0f0f0f]" : "bg-white";
  const subText = darkMode ? "text-ivory/50" : "text-obsidian/50";

  const filtered = activeCategory === "All" ? experiences : experiences.filter(e => e.category === activeCategory);
  const toggleWishlist = id => setWishlist(p => p.includes(id) ? p.filter(w => w !== id) : [...p, id]);

  const openModal = (exp) => { setSelected(exp); setGalleryIdx(0); document.body.style.overflow = "hidden"; };
  const closeModal = () => { setSelected(null); document.body.style.overflow = ""; };

  return (
    <div className={`${pageBg} min-h-screen pt-24`}>

      {/* ── HERO ── */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Experiences" className="w-full h-full object-cover" 
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
        <div className="absolute inset-0 bg-obsidian/60 flex flex-col items-center justify-center text-center px-4">
          <p className="font-body text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">Curated for You</p>
          <h1 className="font-display text-4xl md:text-6xl font-light text-ivory mb-3">
            Unforgettable <em className="text-gold">Experiences</em>
          </h1>
          <p className="font-body text-sm text-ivory/70 max-w-xl">
            70 handpicked adventures across 7 categories, hosted by passionate experts around the world.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── CATEGORY PILLS ── */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat => {
            const Icon = categoryIcons[cat] || Globe;
            const active = activeCategory === cat;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-medium border transition-all duration-200 ${
                  active ? "bg-gold text-obsidian border-gold shadow-md"
                    : darkMode ? "border-white/20 text-ivory/70 hover:border-gold hover:text-gold"
                    : "border-stone-300 text-obsidian/60 hover:border-gold hover:text-gold"
                }`}>
                <Icon size={14} />{cat}
              </button>
            );
          })}
        </div>

        <p className={`font-body text-sm ${subText} mb-6`}>
          {filtered.length} experience{filtered.length !== 1 ? "s" : ""} available
        </p>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(exp => (
            <div key={exp.id} onClick={() => openModal(exp)}
              className={`${cardBg} border rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}>
              <div className="relative h-48 overflow-hidden">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                <span className="absolute top-3 left-3 bg-obsidian/70 text-gold text-xs font-body font-medium px-3 py-1 rounded-full backdrop-blur-sm">{exp.tag}</span>
                <button onClick={e => { e.stopPropagation(); toggleWishlist(exp.id); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
                  <Heart size={14} className={wishlist.includes(exp.id) ? "fill-rose-500 text-rose-500" : "text-white"} />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-1">
                  <MapPin size={11} className="text-gold" />
                  <span className={`font-body text-xs ${subText}`}>{exp.location}</span>
                </div>
                <h3 className={`font-display text-base font-light ${textMain} leading-snug mb-1`}>{exp.title}</h3>
                <p className={`font-body text-xs ${subText} mb-3`}>Hosted by {exp.host}</p>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`flex items-center gap-1 font-body text-xs ${subText}`}><Clock size={11} className="text-gold" />{exp.duration}</span>
                  <span className={`flex items-center gap-1 font-body text-xs ${subText}`}><Users size={11} className="text-gold" />{exp.groupSize}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-dashed border-gold/20">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-gold text-gold" />
                    <span className={`font-body text-xs font-medium ${textMain}`}>{exp.rating}</span>
                    <span className={`font-body text-xs ${subText}`}>({exp.reviews})</span>
                  </div>
                  <div>
                    <span className="text-gold font-display text-base font-light">${exp.price}</span>
                    <span className={`font-body text-xs ${subText}`}>/person</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DETAIL MODAL ── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className={`relative ${modalBg} rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`} onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-obsidian/60 text-white flex items-center justify-center hover:bg-obsidian transition-colors backdrop-blur-sm">
              <X size={18} />
            </button>
            {/* Gallery */}
            <div className="relative h-64 md:h-80 rounded-t-3xl overflow-hidden">
              <img src={selected.gallery[galleryIdx]} alt={selected.title} className="w-full h-full object-cover" 
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {selected.gallery.map((_, i) => (
                  <button key={i} onClick={() => setGalleryIdx(i)} className={`h-2 rounded-full transition-all ${i === galleryIdx ? "bg-gold w-4" : "bg-white/50 w-2"}`} />
                ))}
              </div>
              {selected.gallery.length > 1 && <>
                <button onClick={() => setGalleryIdx(i => (i - 1 + selected.gallery.length) % selected.gallery.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"><ChevronRight size={16} className="rotate-180" /></button>
                <button onClick={() => setGalleryIdx(i => (i + 1) % selected.gallery.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"><ChevronRight size={16} /></button>
              </>}
              <span className="absolute top-4 left-4 bg-obsidian/70 text-gold text-xs font-body font-medium px-3 py-1 rounded-full backdrop-blur-sm">{selected.tag}</span>
            </div>
            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-1 mb-1"><MapPin size={12} className="text-gold" /><span className={`font-body text-xs ${subText}`}>{selected.location}</span></div>
                  <h2 className={`font-display text-2xl md:text-3xl font-light ${textMain} leading-tight`}>{selected.title}</h2>
                </div>
                <button onClick={() => toggleWishlist(selected.id)} className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors flex-shrink-0 ml-4">
                  <Heart size={16} className={wishlist.includes(selected.id) ? "fill-rose-500 text-rose-500" : "text-gold"} />
                </button>
              </div>
              {/* Host */}
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-dashed border-gold/20">
                <img src={selected.hostAvatar} alt={selected.host} className="w-10 h-10 rounded-full object-cover" 
          onError={e => { e.currentTarget.src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
        />
                <div>
                  <p className={`font-body text-sm font-medium ${textMain}`}>Hosted by {selected.host}</p>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-gold text-gold" />
                    <span className="font-body text-xs text-gold font-medium">{selected.rating}</span>
                    <span className={`font-body text-xs ${subText}`}>· {selected.reviews} reviews</span>
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-gold font-display text-2xl font-light">${selected.price}</p>
                  <p className={`font-body text-xs ${subText}`}>per person</p>
                </div>
              </div>
              {/* Meta */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[{ icon: Clock, label: "Duration", value: selected.duration }, { icon: Users, label: "Group Size", value: selected.groupSize }, { icon: Globe, label: "Languages", value: selected.languages.join(", ") }].map(({ icon: Icon, label, value }) => (
                  <div key={label} className={`rounded-xl p-3 text-center ${darkMode ? "bg-white/5" : "bg-stone-50"}`}>
                    <Icon size={16} className="text-gold mx-auto mb-1" />
                    <p className={`font-body text-xs ${subText} mb-0.5`}>{label}</p>
                    <p className={`font-body text-xs font-medium ${textMain}`}>{value}</p>
                  </div>
                ))}
              </div>
              <p className={`font-body text-sm leading-relaxed ${darkMode ? "text-ivory/70" : "text-obsidian/70"} mb-5`}>{selected.description}</p>
              {/* Highlights */}
              <div className="mb-5">
                <h4 className={`font-display text-lg font-light ${textMain} mb-3`}>Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selected.highlights.map(h => (
                    <div key={h} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      <span className={`font-body text-sm ${darkMode ? "text-ivory/70" : "text-obsidian/70"}`}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Includes */}
              <div className="mb-6">
                <h4 className={`font-display text-lg font-light ${textMain} mb-3`}>What's Included</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selected.includes.map(inc => (
                    <div key={inc} className="flex items-center gap-2">
                      <span className="text-gold text-xs">✓</span>
                      <span className={`font-body text-sm ${darkMode ? "text-ivory/70" : "text-obsidian/70"}`}>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full py-4 rounded-2xl font-body text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #FF385C 0%, #c9316b 100%)" }}>
                Reserve · ${selected.price} / person
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
