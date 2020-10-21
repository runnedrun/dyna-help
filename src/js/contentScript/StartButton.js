import React from "react";
import { useSearchStore } from "./searchStore";
import { GlobalHotKeys } from "react-hotkeys";
import startNewItem from "./startNewItem";

const StartButton = () => {
  const [searchData, setSearch] = useSearchStore();

  if (searchData?.results?.length && !searchData?.activeItem) {
    const startSession = () =>
      startNewItem(searchData.results[0], { newSession: true });
    return (
      <GlobalHotKeys
        keyMap={{
          START_SESSION: "Meta+Shift+'",
        }}
        handlers={{
          START_SESSION: startSession,
        }}
        allowChanges
      >
        <div
          style={{
            border: "1px solid black",
            borderRadius: "4px",
            padding: "4px",
          }}
          onClick={startSession}
        >
          Start Session
        </div>
      </GlobalHotKeys>
    );
  } else {
    return "";
  }
};

export default StartButton;
