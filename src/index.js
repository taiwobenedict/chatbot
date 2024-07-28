import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UIContextProvider } from "./context/UiContext";
import ChatContextProvider from "./context/ChatContext";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { HashRouter } from "react-router-dom";

// Bootstrap
import "bootstrap/dist/css/bootstrap.css";

const options = {
  // you can also just use 'bottom center'
  timeout: 2000,
  position: positions.TOP_CENTER,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UIContextProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <ChatContextProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </ChatContextProvider>
      </AlertProvider>
    </UIContextProvider>
  </React.StrictMode>
);
