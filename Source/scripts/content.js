// Activate Content Script on Matched sites
let isActive = RegExp("https:\/\/fresnostate\.instructure\.com\/courses\/.*\/files\/.*").test(location.href);

// Send a response to popup script indicating whether content script is ready or not
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
   if (message.action === "isContentScriptReady") {
      const contentScriptReady = isActive
      sendResponse({ contentScriptReady });
   }
});

// Create alias for query selector
function $(elem) {return document.querySelector(elem)}

// Object to store DOM elements
const domElements = {};

function getDOMelements() {
   var fileContent = null;
    // Previous/Next Footer
    domElements.nextbar = $("#sequence_footer");

    // Left Side Navigation
    domElements.leftLinksColumn = $("#left-side");

    // Top Bar
    domElements.topBar = $(".ic-app-nav-toggle-and-crumbs.no-print");

    // Left Margin
    domElements.layout = $("#main.ic-Layout-columns");
    domElements.padding = $("#wrapper.ic-Layout-wrapper");
    if (domElements.layout && domElements.padding) {
      // Save original state to use when restoring
      domElements.layoutMargin = domElements.layout.style.marginLeft;
      domElements.paddingMargin = domElements.padding.style.marginLeft;
   }
   else {
      console.log("couldnt find layout or padding");
   }

    // Format Media
    domElements.content = $("#content");
    if (domElements.content) {
      // Save original state to use when restoring
      domElements.paddingTop = domElements.content.style.paddingTop
      domElements.paddingRight = domElements.content.style.paddingRight
      domElements.paddingBottom = domElements.content.style.paddingBottom
      domElements.paddingLeft = domElements.content.style.paddingLeft
   }
   else {
      console.log("couldnt find content");
   }

   // Leftmost Navigation Column
   domElements.navBar = $("#header.ic-app-header.no-print");

   // Title Heading
   domElements.heading = $("h2");

   // Download Links below Title
   domElements.targetSpan = $('div > span > a[download="true"]');
   if (domElements.targetSpan) {
      domElements.subHeading = domElements.targetSpan.parentNode.parentNode;
   } else {
      console.log("subHeading not found");
   }
}

if (isActive) {
   getDOMelements();
   console.log("Content script is active!")
} else {
   console.log("Content script is inactive!")
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message) => {
   if (isActive) {
      console.log("Message Received");
      // Check the message
      if (message.action === 'turnOn') {
         EnterFullScreen();
      }
      else if (message.action === 'turnOff') {
         ExitFullScreen();
   }}
});

// Enter full view by hiding all elements except the content
function EnterFullScreen() {
   if (!domElements.fileContent) {
      domElements.fileContent = $("#doc_preview > div")
   }
   domElements.nextbar.style.display      = 'none';
   domElements.leftLinksColumn.style.display = 'none';
   domElements.topBar.style.display       = 'none';
   domElements.layout.style.marginLeft    = "0";
   domElements.padding.style.marginLeft   = "0";
   domElements.content.style.paddingTop   = "0";
   domElements.content.style.paddingRight = "0";
   domElements.content.style.paddingBottom = "0";
   domElements.content.style.paddingLeft  = "0";
   domElements.navBar.style.display       = 'none';
   domElements.heading.style.display      = 'none';
   domElements.subHeading.style.display   = 'none';
   domElements.fileContent.style.overflow = 'visible';
   console.log("Entered Full Screen!");
}

// Exit full view by reversing changes
function ExitFullScreen() {
   domElements.subHeading.style.display   = "block";
   domElements.heading.style.display      = "block";
   domElements.navBar.style.display       = "flex";
   domElements.content.style.paddingBottom = domElements.paddingBottom
   domElements.content.style.paddingTop    = domElements.paddingTop
   domElements.content.style.paddingLeft   = domElements.paddingLeft
   domElements.content.style.paddingRight  = domElements.paddingRight
   domElements.layout.style.marginLeft     = domElements.layoutMargin
   domElements.padding.style.marginLeft    = domElements.paddingMargin
   domElements.topBar.style.display       = "flex";
   domElements.leftLinksColumn.style.display = "block";
   domElements.nextbar.style.display      = "block";
   domElements.fileContent.style.overflow = 'auto';
   console.log("Page Restored!")
}