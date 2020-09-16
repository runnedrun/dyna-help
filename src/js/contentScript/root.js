import React from "react";
import { render } from "react-dom";
import Body from "./body"

const el = document.createElement("div")
el.setAttribute("style", "position: absolute; z-index: 10000")
document.body.prepend(el)

console.log("easdf ssdfgilee", el)

render(<Body />, el);
