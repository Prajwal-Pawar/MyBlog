import { useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";

export const AuthProvider = ({ children }) => {
  // get token from localstorage
  const storedToken = localStorage.getItem("token");

  const [token, setToken] = useState(storedToken || null);

  // function to set the token and update local storage
  const setAuthToken = (newToken) => {
    setToken(null);
    localStorage.setItem("token", newToken);
  };

  // function to remove the token and clear local storage after logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
