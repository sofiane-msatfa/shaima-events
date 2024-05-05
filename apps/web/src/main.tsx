import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import { Toaster } from 'sonner'

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />  
      <Toaster />
    </React.StrictMode>,
  );
}
