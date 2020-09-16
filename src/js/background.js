import "../img/icon-128.png";
import "../img/icon-34.png";

// chrome.runtime.getURL("myfile.html")

// chrome.runtime.getPackageDirectoryEntry(function(root) {
//   root.getFile("getDynalistInfo.bundle.js", {}, function(fileEntry) {
//     fileEntry.file(function(file) {
//       var reader = new FileReader();
//       reader.onloadend = function(e) {
//         console.log("got it?", reader.result)
//       };
//       reader.readAsText(file);
//     });
//   });
// });

chrome.webNavigation.onCompleted.addListener(
  function({ tabId }) {
    console.log("sending!", tabId);
    chrome.tabs.executeScript(tabId, {
      file: "getDynalistInfo.bundle.js",
    });
  },
  { url: [{ hostContains: "dynalist.io" }] }
);

// chrome.tabs.onUpdated.addListener((id, tabInfo, tab) => {
//   console.log("cheking!", tab.pendingUrl && tab.pendingUrl, tab);
//   if (tab.url && tab.url.indexOf("dynalist.io") > 0) {
//   }
// });

console.log("running");
