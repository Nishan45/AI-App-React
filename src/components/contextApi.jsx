import React, { createContext, useState, useEffect, useContext } from 'react';
import { studentProfile } from '../data/courseData';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data from localStorage on initial app load (handles refreshes)
  useEffect(() => {
    const storedUser = localStorage.getItem('user_profile');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function called by your Login component
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user_profile', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_profile');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook for easy consumption
export const useAuth = () => useContext(AuthContext);
