import { React, useEffect, useState } from "react";
import { AuthConsumer } from "./AuthContext";

const Main = () => {
  const [email, setEmail] = useState("andrew@odewahn.com");
  const [password, setPassword] = useState("password");

  const loginForm = (state) => {
    console.log(state);
    return (
      <div>
        <h1>Login {state.email}</h1>
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
            state.login(email, password, e);
          }}
        >
          Sign In
        </button>
        <button
          onClick={(e) => {
            console.log("Sign up with", email, password);
            state.signup(email, password, e);
          }}
        >
          Sign Up
        </button>
        <button
          onClick={(e) => {
            console.log("Sign out");
            state.logout();
          }}
        >
          Log Out
        </button>
        <button
          onClick={(e) => {
            console.log(state.user);
          }}
        >
          Print User
        </button>
      </div>
    );
  };

  return <AuthConsumer>{(state) => loginForm(state)}</AuthConsumer>;
};

export default Main;
