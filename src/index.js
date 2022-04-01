import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CryptoContext from "./CryptoContext";
// styles for carousel
import "react-alice-carousel/lib/alice-carousel.css";

ReactDOM.render(
  // wrap entire App in CryptoContext component
  // removed reactStrickMode because React complaint about the MUI library
  <CryptoContext>
    <App />
  </CryptoContext>,
  document.getElementById("root")
);
