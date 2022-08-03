import { getAuth } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  registerRequest,
  logOut,
  onAuthChange,
} from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  // getAuth().beforeAuthStateChanged((usr) => {
  //   console.log(usr);c
  //   if (usr) {
  //     setUser(usr);
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(false);
  //   }
  // });
  getAuth().onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };
  const onRegister = (email, password, reapeatedPassword) => {
    setIsLoading(true);
    if (reapeatedPassword !== password) {
      setError("Passwords Do not Match");
      return;
    }
    registerRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };
  const onLogOut = () => {
    logOut()
      .then(() => {
        setUser(null);
        setError(null);
      })
      .catch((e) => {
        setError(e.toString());
      });
  };
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogOut,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
