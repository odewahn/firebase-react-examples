import { React, useEffect, useState, useContext } from "react";

import { AuthContext } from "./AuthContext";

const Main = () => {
  const [email, setEmail] = useState("andrew@odewahn.com");
  const [password, setPassword] = useState("password");

  const authContext = useContext(AuthContext);

  return (
    <div>
      <h1>Login {authContext.user.email}</h1>
      Email:
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      Password:
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button
        onClick={(e) => {
          console.log("Login with", email, password);
          authContext.login(email, password, e);
        }}
      >
        Sign In
      </button>
      <button
        onClick={(e) => {
          console.log("Sign up with", email, password);
          authContext.signup(email, password, e);
        }}
      >
        Sign Up
      </button>
      <button
        onClick={(e) => {
          console.log("Sign out");
          authContext.logout();
        }}
      >
        Log Out
      </button>
      <button
        onClick={(e) => {
          console.log(authContext.user);
        }}
      >
        Print User
      </button>
    </div>
  );
};

export default Main;
