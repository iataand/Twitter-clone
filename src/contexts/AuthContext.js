import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const register = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  // const getCurrentUser = () => {
  //   return auth.onAuthStateChanged((user) => {
  //     if (user) return user;
  //     else return null;
  //   });
  // };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const states = {
    currentUser,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={states}>{children}</AuthContext.Provider>;
}
