import React from "react";
import spinnerGif from "./spinner.gif";

export default function Spinner() {
  return (
    <img
      src={spinnerGif}
      style={{ minHeight: "10vh", maxWidth: "640px" }}
    ></img>
  );
}
