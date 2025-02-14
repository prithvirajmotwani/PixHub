import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ReduxProvider from "./redux/redux-provider";
import { ToasterProvider } from "./components/providers/toast-provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReduxProvider>
      <AuthProvider>
        <BrowserRouter>
          <ToasterProvider />
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ReduxProvider>
  </React.StrictMode>
);
