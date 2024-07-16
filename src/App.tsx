import React from "react";
import ReactDOM from "react-dom/client";

import MiniBag from "./components/MiniBag";
import "./index.css";

const App = () => (
  <div className="container">
    <h3>Mini Bag</h3>
  </div>
);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
