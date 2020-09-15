import React from "react";
import { render } from "react-dom";

const Test = () => {
  return <div style={{ posittion: "absolute" }}>test</div>;
};

const el = document.createElement("div")
document.body.appendChild(el)

console.log("easdf ssdflee", el)

render(<Test />, el);
