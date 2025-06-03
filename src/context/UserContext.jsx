import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log('Loaded user from localStorage:', storedUser); // Debug
        setUser(storedUser);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        setUser(null);
      }
    };
    loadUser();

    // Listen for storage changes (e.g., from other tabs or manual updates)
    const handleStorageChange = () => {
      loadUser();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (userData) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      console.log('User logged in:', userData); // Debug
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  };

  const logout = () => {
    console.log('Logging out user:', user); // Debug
    localStorage.removeItem('user');
    localStorage.removeItem('wishlist');
    localStorage.removeItem('cart');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser: login, logout }}>
      {children}
    </UserContext.Provider>
  );
};