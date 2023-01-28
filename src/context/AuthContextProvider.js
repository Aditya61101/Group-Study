import React, { createContext, useState, useEffect } from "react";
import router from "next/router";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedUserLoggedInfo = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogin = (token, uId, emailID) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("userID", uId);
    localStorage.setItem("email", emailID);
    setIsLoggedIn(true);
  };
  const handleLogout = React.useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userID");
    localStorage.removeItem("email");
  }, []);
  const authValue = {
    isLoggedIn,
    handleLogin,
    handleLogout,
  };
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
