import { fromEventPattern } from "rxjs";

export default fromEventPattern(
  (handler) => {
    const wrapper = (request, sender, sendResponse) => {
      const event = { async: false, request, sender, sendResponse };
      handler(event);
      return event.async;
    };
    chrome.runtime.onMessage.addListener(wrapper);
    return wrapper;
  },
  (handler, wrapper) => chrome.runtime.onMessage.removeListener(wrapper)
);
