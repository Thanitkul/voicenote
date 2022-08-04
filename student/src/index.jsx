import React from "react";
import ReactDOM from "react-dom/client";
import store from "./context/store";
import { Provider } from "react-redux";

import App from "./App";

import "./sass/main.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
