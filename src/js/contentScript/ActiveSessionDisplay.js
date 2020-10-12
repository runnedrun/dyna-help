import React from "react";
import { useState, useEffect } from "react";
import { useSearchStore } from "./searchStore";
import moment from "moment";

const itemTimeLimit = 3 * 60 * 1000;

const eventFire = (el, etype) => {
  if (el.fireEvent) {
    el.fireEvent("on" + etype);
  } else {
    var evObj = document.createEvent("Events");
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
};

dispatchMouseEvent = (el) => {
  const elPosition = el.getBoundingClientRect();

  console.log("elPosit", elPosition)

  var event = new MouseEvent("mousedown", {
    view: window,
    bubbles: true,
    cancelable: true,
    screenX: elPosition.left,
    screenY: elPosition.top,
  });

  el.dispatchEvent(event);
};

finishActiveNote = () => {
  const parentNote = document.querySelector(
    ".Node-renderedContent.node-line"
  );

const parentNoteContent = document.querySelector(
    ".Node-content.node-line.needsclick"
  );  
  // eventFire(parentNote, "blur");
  setTimeout(() => {
    dispatchMouseEvent(parentNote);
    setTimeout(() => {
      parentNoteContent.innerHTML = parentNoteContent.innerHTML + " testing";
      setTimeout(() => {
        console.log("ritining keydown");
        eventFire(parentNote, "keypress");
      }, 100);
    }, 100);
  }, 100);
};

const ActiveSessionDisplay = () => {
  // const [searchData, setSearch] = useSearchStore();
  // const [currentTime, setCurrentTime] = useState();

  // const finishItem = () => {
  //   setSearch({ ...searchData, activeItem: null, itemStartedAt: null });
  //   searchData.bookmarkElement.click();
  // };

  // useEffect(() => {
  //   const currentTimeInterval = setInterval(() => {
  //     setCurrentTime(Date.now());
  //     if (
  //       searchData?.itemStartedAt &&
  //       Date.now() - searchData.itemStartedAt > itemTimeLimit
  //     ) {
  //       // finishItem();
  //     }
  //   }, 100);
  //   return () => clearInterval(currentTimeInterval);
  // });

  // if (searchData?.activeItem) {
  //   console.log("where?");
  //   const startTime = searchData.itemStartedAt;
  //   const stopTime = startTime + itemTimeLimit;
  //   const timeRemaining = stopTime - currentTime;
  //   const formatted = moment
  //     .utc(moment.duration(timeRemaining).asMilliseconds())
  //     .format("m:ss");
  //   return (
  //     <div style={{ display: "flex" }}>
  //       <div
  //         style={{ padding: 5, border: "1px solid black", marginRight: 10 }}
  //         onClick={finishItem}
  //       >
  //         Finish
  //       </div>
  //       <div>{formatted}</div>
  //     </div>
  //   );
  // } else {
  return "";
  // }
};

export default ActiveSessionDisplay;
