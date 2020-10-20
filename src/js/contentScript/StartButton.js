import React from "react";
import { useSearchStore } from "./searchStore";
import { GlobalHotKeys } from "react-hotkeys";

const StartButton = () => {
  const [searchData, setSearch] = useSearchStore();

  if (searchData?.results?.length && !searchData?.activeItem) {
    const startSession = () => {
      const startingUrl = window.location.href;
      const navigationInterval = setInterval(() => {
        const url = window.location.href;
        if (url !== startingUrl) {
          setSearch({
            ...searchData,
            activeItem: url,
            itemStartedAt: Date.now(),
          });
          console.log("navigation complete");
          clearInterval(navigationInterval);
        }
      }, 100);

      searchData.results[0].click();
    };

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
