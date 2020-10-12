import React from "react";
import { useSearchStore } from "./searchStore";

const StartButton = () => {
  const [searchData, setSearch] = useSearchStore();

  console.log("searchData", searchData);

  if (searchData?.results?.length && !searchData?.activeItem) {
    const startSession = () => {
      console.log("starting");
      const startingUrl = window.location.href;
      const navigationInterval = setInterval(() => {
        console.log("hashy");
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
    );
  } else {
    return "" 
  }
};

export default StartButton;
