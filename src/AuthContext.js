import { React, useEffect, useState } from "react";
import { createContext } from "react";

import { useHistory } from "react-router-dom";

import firebase from "firebase/compat/app";

const firebaseAuth = firebase.auth();

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState({});

  const history = useHistory();

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

  // Try email link signup
  useEffect(() => {
    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
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
      history.push("/profiles/");
      console.log("logged in!");
    } catch (error) {
      //add error handling soon
      console.log("An error occurred", error);
    }
  };

  const emailLinkLogin = async (email, e) => {
    const actionCodeSettings = {
      url: "http://localhost:3000/profiles",
      handleCodeInApp: true,
    };
    try {
      e.preventDefault();
      firebaseAuth.sendSignInLinkToEmail(email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
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
    <AuthContext.Provider
      value={{ user, signup, login, logout, emailLinkLogin }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
