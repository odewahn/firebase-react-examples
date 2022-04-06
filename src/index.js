import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./index.css";
import App from "./App";
import Login from "./Login";

import { AuthProvider } from "./AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/profiles" component={App} />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
