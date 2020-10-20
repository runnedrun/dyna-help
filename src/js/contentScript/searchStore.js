import { BehaviorSubject } from "rxjs";
import { useObservable, useObservableState } from "observable-hooks";

const sampleSearch = {
  activeItem:
    "https://dynalist.io/d/2BpJ2voZlFQPZh9u_B58xP8V#z=2qqYuKs5ypFrTiAgAr9hD5R6",
  itemStartedAt: Date.now(),
  processing: null,
  query:
    "https://dynalist.io/#q=until%3A0h%20-is%3Acompleted%20-%22%23reflection%22%20-ancestor%3A%23reflection%20-%22%23ssr%22",
};

// const searchStore = new BehaviorSubject({
//   query: null,
//   processing: null,
// });

const searchStore = new BehaviorSubject(null);

const getAllResultsNodes = () => {
  return document.querySelectorAll(".node-time.is-overdue");
};

const bookmarkClicked = (clickedEl) => {
  const resultsInterval = setInterval(() => {
    const results = getAllResultsNodes();
    if (results.length) {
      clearInterval(resultsInterval);
      searchStore.next({
        query: window.location.href,
        processing: null,
        results: results,
        bookmarkElement: clickedEl,
      });
    }
  }, 200);
};

window.document.addEventListener("click", (e) => {
  const clickedEl = e.target;
  if (clickedEl?.className?.includes("Bookmark")) {
    bookmarkClicked(clickedEl);
  }
});
// window.addEventListener("hashchange", hashChange);

const useSearchStore = () => [
  useObservableState(searchStore),
  (_) => searchStore.next(_),
];

export { searchStore, useSearchStore };
