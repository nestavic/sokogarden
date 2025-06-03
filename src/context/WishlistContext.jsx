import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  // Load wishlist and user from localStorage on initial render
  useEffect(() => {
    loadFromStorage();
  }, []);

  const loadFromStorage = () => {
    try {
      const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setWishlist(storedWishlist.filter(item => item && item.id));
      setUser(storedUser);
    } catch (error) {
      console.error('Error parsing localStorage:', error);
      localStorage.setItem('wishlist', JSON.stringify([]));
    }
  };

  const toggleWishlist = (product) => {
    if (!user) {
      return { success: false, message: 'Authentication required' };
    }

    const isInWishlist = wishlist.some(item => item.id === product.id);
    let updatedWishlist;
    
    if (isInWishlist) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    return { 
      success: true, 
      message: isInWishlist ? 'Product removed from wishlist' : 'Product added to wishlist' 
    };
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.setItem('wishlist', JSON.stringify([]));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        setUser
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};