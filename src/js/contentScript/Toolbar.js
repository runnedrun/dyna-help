import React from "react";
import { useSearchStore } from "./searchStore";
import StartButton from "./StartButton";
import ActiveSessionDisplay from "./ActiveSessionDisplay";

const Toolbar = () => {
  return (
    <div
      style={{ posittion: "absolute", zIndex: "10000", paddingLeft: "20px" }}
    >
      <StartButton />
      <ActiveSessionDisplay />
    </div>
  );
};

export default Toolbar;
