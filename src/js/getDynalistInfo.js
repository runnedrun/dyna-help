import React from "react";
import { render } from "react-dom";

const Test = () => {
  return <div style={{ posittion: "absolute", zIndex: "10000" }}>test</div>;
};

const el = document.createElement("div")
el.setAttribute("style", "position: absolute; z-index: 10000")
document.body.prepend(el)

console.log("easdf ssdfgilee", el)

render(<Test />, el);
