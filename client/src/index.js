import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppProviders from "./AppProviders";
import reportWebVitals from "./reportWebVitals";
import { ReactQueryDevtools } from "react-query/devtools";

import "./styles/index.less";
import "./styles/index.scss";

ReactDOM.render(
  <AppProviders>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </AppProviders>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
