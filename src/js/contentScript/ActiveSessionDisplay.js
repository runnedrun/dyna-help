import React from "react";
import { useState, useEffect } from "react";
import { useSearchStore } from "./searchStore";
import moment from "moment";
import updateParentNoteWithTransformer from "./updateParentNoteWithTransformer";

const itemTimeLimit = 3 * 60 * 1000;

const reviewSpacing = [1, 2, 5, 7, 14, 28, 72, 180];

const sampleContent = "#morning 4  second rule. !(2020-10-14)+1";
const dateFormat = "YYYY-MM-DD";

function replaceRange(originalString, start, end, substitute) {
  return (
    originalString.substring(0, start) +
    substitute +
    originalString.substring(end)
  );
}

const getUpdatedTextForNote = (noteContent) => {
  const dateRegex = /!\((.*)\)+(\+(\d))?/;
  const dateMatch = dateRegex.exec(noteContent);
  if (dateMatch) {
    const fullMatch = dateMatch[0];
    const dateString = dateMatch[1];
    const lastWaitInterval = parseInt(dateMatch[3]);
    const startIndex = dateMatch.index;
    const endIndex = startIndex + fullMatch.length;
    const nextDateInterval = lastWaitInterval
      ? reviewSpacing[reviewSpacing.indexOf(lastWaitInterval) + 1]
      : reviewSpacing[0];
    const date = moment(dateString, dateFormat);
    const nextDate = date.add(nextDateInterval, "days");
    const outputString = date.format(dateFormat);
    const finalNoteText = replaceRange(
      noteContent,
      startIndex,
      endIndex,
      `!(${outputString})+${nextDateInterval}`
    );

    return finalNoteText;
  }

  return noteContent
};

const ActiveSessionDisplay = () => {
  const [searchData, setSearch] = useSearchStore();
  const [currentTime, setCurrentTime] = useState();

  const finishItem = () => {
    updateParentNoteWithTransformer(getUpdatedTextForNote).then(() => {
      setSearch({ ...searchData, activeItem: null, itemStartedAt: null });
      searchData.bookmarkElement.click();
    });
  };

  useEffect(() => {
    const currentTimeInterval = setInterval(() => {
      setCurrentTime(Date.now());
      if (
        searchData?.itemStartedAt &&
        Date.now() - searchData.itemStartedAt > itemTimeLimit
      ) {
        // finishItem();
      }
    }, 100);
    return () => clearInterval(currentTimeInterval);
  });

  if (searchData?.activeItem) {
    const startTime = searchData.itemStartedAt;
    const stopTime = startTime + itemTimeLimit;
    const timeRemaining = stopTime - currentTime;
    const formatted = moment
      .utc(moment.duration(timeRemaining).asMilliseconds())
      .format("m:ss");
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{ padding: 5, border: "1px solid black", marginRight: 10 }}
          onClick={finishItem}
        >
          Finish
        </div>
        <div>{formatted}</div>
      </div>
    );
  } else {
    return "";
  }
};

export default ActiveSessionDisplay;
