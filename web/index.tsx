// web/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { auth } from "./firebaseConfig";

function App() {
  return <h1>Welcome to WhoDoggy Web!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
