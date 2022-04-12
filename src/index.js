import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import Game from "./Game";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
