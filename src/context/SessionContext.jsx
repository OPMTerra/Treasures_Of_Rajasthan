import React, { createContext, useContext, useState, useEffect } from 'react';

export const AIDA_HEADLINES = [
  "Transform Your Space with Authentic Rajasthani Artistry",
  "Discover the Secret of Timeless Handicrafts",
  "Experience Royal Craftsmanship in Every Thread",
  "Unlock the Beauty of Traditional Indian Art",
  "Create Memories with Handcrafted Treasures"
];

export const PAS_HEADLINES = [
  "Tired of Mass-Produced Decor? Embrace Authentic Craftsmanship",
  "Don't Settle for Ordinary - Choose Extraordinary Handmade Art",
  "Missing Cultural Depth in Your Home? We Have the Solution",
  "Frustrated with Generic Products? Discover True Artistry",
  "Stop Compromising on Quality - Experience Authentic Handicrafts"
];

export const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [session, setSession] = useState({
    headlines: {},
    visitCount: 0,
    lastVisit: ''
  });

  useEffect(() => {
    const savedSession = localStorage.getItem('handicraft-session');
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('handicraft-session', JSON.stringify(session));
  }, [session]);

  const setHeadline = (productId, headline) => {
    setSession(prev => ({
      ...prev,
      headlines: {
        ...prev.headlines,
        [productId]: headline
      }
    }));
  };

  const incrementVisit = () => {
    setSession(prev => ({
      ...prev,
      visitCount: prev.visitCount + 1,
      lastVisit: new Date().toISOString()
    }));
  };

  return (
    <SessionContext.Provider value={{ 
      session, 
      setHeadline, 
      incrementVisit,
      AIDA_HEADLINES,
      PAS_HEADLINES
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}