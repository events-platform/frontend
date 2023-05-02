import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesApp } from "./App";
import { store } from "./store/store";
import { CookiesProvider } from "react-cookie";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <Router>
          <CookiesApp />
        </Router>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
