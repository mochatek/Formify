import { render } from "react-dom";
import { StrictMode } from "react";
import App from "./App";
import "./index.css";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
