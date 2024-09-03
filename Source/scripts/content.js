// Activate content script on matched sites
let isActive = RegExp("https:\/\/fresnostate\.instructure\.com\/courses\/.*\/files\/.*").test(location.href);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Send a response to popup script indicating whether content script is ready or not
  // this will decide if buttons are activated or not
  if (message.action === "isContentScriptReady") {
    const contentScriptReady = isActive
    sendResponse({ contentScriptReady });
  }
});

// Set to store DOM elements
const domElements = {};

let fullView = false;

if (isActive) {
  console.log("Canvas full view is active on this page!");
  // Add IFrame element & properties to set for ez access
  domElements.iFrame = document.querySelector("#doc_preview");
  domElements.prevHeight = domElements.iFrame.style.height;
  domElements.prevWidth = domElements.iFrame.style.width;
} else {
  console.log("Canvas full view is inactive on this page!")
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message) => {
   if (isActive) {
      // Check the message
      if (message.action === 'switchView') {
         switch (fullView) {
            case true:
               ExitFullView();
               break;
            case false:
               EnterFullView();
               break;
         }
      } else if (message.action === 'extend') {
         Extend();
   }}
});

// Enter full view by hiding all elements except the content
function EnterFullView() {
  domElements.iFrame.style.position = 'fixed';
  domElements.iFrame.style.top = '0px';
  domElements.iFrame.style.left = '0px';
  domElements.iFrame.style.height = '100vh';
  domElements.iFrame.style.width = '100vw';
  domElements.iFrame.style.zIndex = '100';
  fullView = true;
}

// Exit full view by reversing changes
function ExitFullView() {
  domElements.iFrame.style.position = 'static';
  domElements.iFrame.style.height = domElements.prevHeight
  domElements.iFrame.style.width = domElements.prevWidth
  fullView = false;
}