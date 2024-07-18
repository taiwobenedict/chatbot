import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UIContextProvider } from "./context/UiContext";
import ChatContextProvider from "./context/ChatContext";
import { BrowserRouter } from "react-router-dom"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// Bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";


const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UIContextProvider>
        <ChatContextProvider>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </ChatContextProvider>
      </UIContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
