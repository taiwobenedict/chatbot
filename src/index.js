import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UIContextProvider } from "./context/UiContext";

// Bootstrap
import "bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UIContextProvider>
      <App />
    </UIContextProvider>
  </React.StrictMode>
);
