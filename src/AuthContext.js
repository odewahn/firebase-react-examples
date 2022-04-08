import { React, useEffect, useState } from "react";
import { createContext } from "react";

import firebase from "firebase/compat/app";
const firebaseAuth = firebase.auth();

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState({});

  // Setup listener for the user
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((fbUser) => {
      console.log("logging in", fbUser);
      if (fbUser) {
        console.log("Setting some user state");
        setUser(fbUser);
      } else {
        console.log("deleting some user state");
        setUser({});
      }
    });
  }, []);

  const signup = async (email, password, e) => {
    try {
      e.preventDefault();
      console.log("Doing login for", email, password);
      await firebaseAuth.createUserWithEmailAndPassword(email, password);
      console.log("logged in");
    } catch (error) {
      //add error handling soon
      console.log("An error occurred", error);
    }
  };

  const login = async (email, password, e) => {
    try {
      e.preventDefault();
      await firebaseAuth.signInWithEmailAndPassword(email, password);
      console.log("logged in!");
    } catch (error) {
      //add error handling soon
      console.log("An error occurred", error);
    }
  };

  const logout = async () => {
    try {
      await firebaseAuth.signOut();
      setUser({});
    } catch (error) {
      //add error handling soon
      console.log("An error occurred", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
