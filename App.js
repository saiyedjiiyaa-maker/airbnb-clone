import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetail from "./pages/PropertyDetail";
import WishlistPage from "./pages/WishlistPage";
import DashboardPage from "./pages/DashboardPage";
import HostUploadPage from "./pages/HostUploadPage";
import HostPage from "./pages/HostPage";
import { LoginPage, SignupPage } from "./pages/AuthPages";
import { ProfilePage, TripsPage } from "./pages/ProfileTripsPages";
import ExperiencesPage from "./pages/ExperiencesPage";
import MessagesPage from "./pages/MessagesPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import AboutPage from "./pages/AboutPage";
import HelpPage from "./pages/HelpPage";
import BookingPage from "./pages/BookingPage";
import NotificationsPage from "./pages/NotificationsPage";
import DestinationPage from "./pages/DestinationPage";
import PricingPage from "./pages/PricingPage";
import CareersPage from "./pages/CareersPage";
import TravelPlannerPage from "./pages/TravelPlannerPage";
import CurrencyConverterPage from "./pages/CurrencyConverterPage";
import ComparePage from "./pages/ComparePage";
import WeatherPage from "./pages/WeatherPage";
import TravelStylePage from "./pages/TravelStylePage";
import AIChatbot from "./components/AIChatbot";
import "./index.css";

function Layout({ children, darkMode, toggleDark }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar darkMode={darkMode} toggleDark={toggleDark} />
      <main className="flex-1">{children}</main>
      <Footer darkMode={darkMode} />
      <AIChatbot darkMode={darkMode} />
    </div>
  );
}

function NotFound({ darkMode }) {
  const pageBg = darkMode ? "bg-obsidian" : "bg-ivory-50";
  const textMain = darkMode ? "text-ivory" : "text-obsidian";
  return (
    <div className={`${pageBg} min-h-screen flex items-center justify-center`}>
      <div className="text-center px-4">
        <p className="font-display text-8xl text-gold/20 font-light mb-4">404</p>
        <h1 className={`font-display text-4xl font-light ${textMain} mb-4`}>Page Not Found</h1>
        <p className={`font-body text-sm ${darkMode ? "text-ivory/50" : "text-obsidian/50"} mb-8`}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="btn-gold rounded-full">← Back to Airbnb</a>
      </div>
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("airbnb_dark") === "1");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDark = () => setDarkMode(d => { localStorage.setItem("airbnb_dark", d ? "0" : "1"); return !d; });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.1 }
    );
    const observe = () => document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    observe();
    const interval = setInterval(observe, 500);
    return () => { observer.disconnect(); clearInterval(interval); };
  }, []);

  const layoutProps = { darkMode, toggleDark };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth pages — no nav/footer */}
          <Route path="/login"  element={<LoginPage  darkMode={darkMode} />} />
          <Route path="/signup" element={<SignupPage darkMode={darkMode} />} />

          {/* All main pages with layout */}
          <Route path="/"               element={<Layout {...layoutProps}><HomePage          darkMode={darkMode} /></Layout>} />
          <Route path="/properties"     element={<Layout {...layoutProps}><PropertiesPage    darkMode={darkMode} /></Layout>} />
          <Route path="/experiences"    element={<Layout {...layoutProps}><ExperiencesPage   darkMode={darkMode} /></Layout>} />
          <Route path="/property/:id"   element={<Layout {...layoutProps}><PropertyDetail    darkMode={darkMode} /></Layout>} />
          <Route path="/book/:id"       element={<Layout {...layoutProps}><BookingPage        darkMode={darkMode} /></Layout>} />
          <Route path="/wishlist"       element={<Layout {...layoutProps}><WishlistPage       darkMode={darkMode} /></Layout>} />
          <Route path="/dashboard"      element={<Layout {...layoutProps}><DashboardPage      darkMode={darkMode} /></Layout>} />
          <Route path="/host"           element={<Layout {...layoutProps}><HostPage           darkMode={darkMode} /></Layout>} />
          <Route path="/host/upload"    element={<Layout {...layoutProps}><HostUploadPage     darkMode={darkMode} /></Layout>} />
          <Route path="/profile"        element={<Layout {...layoutProps}><ProfilePage        darkMode={darkMode} /></Layout>} />
          <Route path="/trips"          element={<Layout {...layoutProps}><TripsPage          darkMode={darkMode} /></Layout>} />
          <Route path="/messages"       element={<Layout {...layoutProps}><MessagesPage       darkMode={darkMode} /></Layout>} />
          <Route path="/search"         element={<Layout {...layoutProps}><SearchResultsPage  darkMode={darkMode} /></Layout>} />
          <Route path="/about"          element={<Layout {...layoutProps}><AboutPage          darkMode={darkMode} /></Layout>} />
          <Route path="/help"           element={<Layout {...layoutProps}><HelpPage           darkMode={darkMode} /></Layout>} />
          <Route path="/notifications"  element={<Layout {...layoutProps}><NotificationsPage  darkMode={darkMode} /></Layout>} />
          <Route path="/destination/:slug" element={<Layout {...layoutProps}><DestinationPage darkMode={darkMode} /></Layout>} />
          <Route path="/pricing" element={<Layout {...layoutProps}><PricingPage darkMode={darkMode} /></Layout>} />
          <Route path="/careers" element={<Layout {...layoutProps}><CareersPage darkMode={darkMode} /></Layout>} />
          <Route path="/travel-planner" element={<Layout {...layoutProps}><TravelPlannerPage darkMode={darkMode} /></Layout>} />
          <Route path="/currency" element={<Layout {...layoutProps}><CurrencyConverterPage darkMode={darkMode} /></Layout>} />
          <Route path="/compare" element={<Layout {...layoutProps}><ComparePage darkMode={darkMode} /></Layout>} />
          <Route path="/weather" element={<Layout {...layoutProps}><WeatherPage darkMode={darkMode} /></Layout>} />
          <Route path="/vibe/:style" element={<Layout {...layoutProps}><TravelStylePage darkMode={darkMode} /></Layout>} />
          <Route path="*"               element={<Layout {...layoutProps}><NotFound           darkMode={darkMode} /></Layout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
