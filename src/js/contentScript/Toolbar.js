import React from "react";
import { useSearchStore } from "./searchStore";
import StartButton from "./StartButton";
import ActiveSessionDisplay from "./ActiveSessionDisplay";
import { GlobalHotKeys } from "react-hotkeys";

const Toolbar = () => {
  const [searchData] = useSearchStore();

  return (
    <GlobalHotKeys
      keyMap={{
        JUMP_TO_ACTIVE_BOOKMARK: "Meta+Shift+.",
      }}
      handlers={{
        JUMP_TO_ACTIVE_BOOKMARK: () => {
          searchData?.bookmarkElement?.click()
        },
      }}
      allowChanges
    >
      <div
        style={{ posittion: "absolute", zIndex: "10000", paddingLeft: "20px" }}
      >
        <StartButton />
        <ActiveSessionDisplay />
      </div>
    </GlobalHotKeys>
  );
};

export default Toolbar;
