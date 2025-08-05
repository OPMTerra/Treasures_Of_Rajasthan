import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('handicraft-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('handicraft-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('handicraft-user');
    }
  }, [user]);

  const login = (email, name) => {
    const newUser = {
      id: Date.now().toString(),
      email,
      name: name || email.split('@')[0],
      isGuest: false
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const setGuestUser = () => {
    const guestUser = {
      id: `guest-${Date.now()}`,
      email: 'guest@example.com',
      name: 'Guest User',
      isGuest: true
    };
    setUser(guestUser);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setGuestUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}