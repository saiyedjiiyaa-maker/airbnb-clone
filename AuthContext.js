import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "airbnb_user";
const WISHLIST_KEY = "airbnb_wishlist";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [2, 5, 11];
    } catch { return [2, 5, 11]; }
  });

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const login = (email, password) => {
    const u = {
      id: "u1",
      name: "Jiya Saiyed",
      email: email || "jiyasaiyed54@gmail.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jiya&backgroundColor=b6e3f4&clothingColor=FF385C",
      joined: "March 2024",
      superhost: false,
      phone: "+91 98765 43210",
      bio: "Passionate traveller and hospitality lover. Always looking for unique stays that tell a story.",
    };
    setUser(u);
    return true;
  };

  const signup = (name, email, password) => {
    const u = {
      id: "u1",
      name: name || "Jiya Saiyed",
      email: email || "jiyasaiyed54@gmail.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jiya&backgroundColor=b6e3f4&clothingColor=FF385C",
      joined: "Today",
      superhost: false,
      phone: "+91 98765 43210",
      bio: "Passionate traveller and hospitality lover.",
    };
    setUser(u);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = (updates) => {
    setUser(prev => prev ? { ...prev, ...updates } : prev);
  };

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, wishlist, toggleWishlist }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
