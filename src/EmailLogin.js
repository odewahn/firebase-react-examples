import { React, useState, useContext } from "react";

import { AuthContext } from "./AuthContext";

const Main = () => {
  const [email, setEmail] = useState("andrew@odewahn.com");
  const [password, setPassword] = useState("");

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
      <button
        onClick={(e) => {
          authContext.emailLinkLogin(email, e);
        }}
      >
        Sign In
      </button>
      <button
        onClick={(e) => {
          console.log("Sign out");
          authContext.logout();
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Main;
