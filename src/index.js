import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ShopContextProvider from "./Context/ShopContext";
import { AuthWrapper } from "./Context/auth.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthWrapper>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </AuthWrapper>
);
