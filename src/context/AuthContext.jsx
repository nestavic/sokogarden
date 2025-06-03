import React, { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not authenticated

  // Example: Check for user session (replace with your auth logic, e.g., token check)
  useEffect(() => {
    // Simulated auth check (replace with API call or localStorage token check)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Example login function (replace with your actual login logic)
  const login = async (credentials) => {
    try {
      // Replace with your API call to authenticate
      const response = await fetch("https://your-api/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Example logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};