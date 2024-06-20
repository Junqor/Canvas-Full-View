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

// Create alias for query selector
function $(elem) {return document.querySelector(elem)}

// Set to store DOM elements
const domElements = {};

let fullView = false;

if (isActive) {
   console.log("Canvas full view is active!")
   // Clone file display. Store both in set for later access
   domElements.newDisplay = $("#doc_preview").cloneNode(true);
   domElements.newDisplay.id = 'newFile';
   domElements.newDisplay.style.overflow = 'visible'
   domElements.newDisplay.style.display = 'none';
   document.body.appendChild(domElements.newDisplay);
   domElements.originalDisplay = $('#application');
} else {
   console.log("Canvas full view is inactive!")
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
   domElements.newDisplay.style.display = 'block';
   domElements.originalDisplay.style.display = 'none';
   fullView = true;
   console.log("Entered Full View!");
}

// Exit full view by reversing changes
function ExitFullView() {
   domElements.newDisplay.style.display = 'none'
   domElements.originalDisplay.style.display = 'block';
   fullView = false;
   console.log("Page Restored!")
}

function Extend() {
   if (!domElements.length) {
      domElements.length = domElements.newDisplay.childNodes[0];
      domElements.length.style.height = '1000px';
   }
   else {
      domElements.length.style.height = (parseFloat(domElements.length.style.height) + 500) + 'px';
   }
}