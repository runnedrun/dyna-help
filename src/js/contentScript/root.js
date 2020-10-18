import React from "react";
import { render } from "react-dom";
import Toolbar from "./Toolbar";
import { GlobalHotKeys, configure } from "react-hotkeys";


const el = document.createElement("div");
el.setAttribute("style", "position: absolute; z-index: 10000");
document.body.prepend(el);

configure({
  ignoreEventsCondition: () => false,
})

render(<Toolbar />, el);
