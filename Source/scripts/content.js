function $(elem) {return document.querySelector(elem)}

var fileContent = null;
// test

// ====== Previous/Next Footer =======
let nextbar = $("#sequence_footer");

// ====== Left Side Navigation =======
let leftLinksColumn = $("#left-side");

// ======= Top Bar =======
let topBar = $(".ic-app-nav-toggle-and-crumbs.no-print");

// ======= Left Margin =======
let layout = $("#main.ic-Layout-columns");
let padding = $("#wrapper.ic-Layout-wrapper")

if (layout && padding) {
   // Save original state to use when restoring
   var layoutMargin = layout.style.marginLeft;
   var paddingMargin = padding.style.marginLeft;
}
else {
   console.log("couldnt find layout or padding");
}

// ======= Format Media ========
let content = $("#content");

if (content) {
   // Save original state to use when restoring
   var paddingTop = content.style.paddingTop
   var paddingRight = content.style.paddingRight
   var paddingBottom = content.style.paddingBottom
   var paddingLeft = content.style.paddingLeft
}
else {
   console.log("couldnt find content");
}

// ======= Leftmost Navigation Column ========
let navBar = $("#header.ic-app-header.no-print");

//======= Title Heading =======
let heading = $("h2");

//====== Download Links below Title =======
let targetSpan = $('div > span > a[download="true"]');
if (targetSpan) {
   var subHeading = targetSpan.parentNode.parentNode;
} else {
   console.log("subHeading not found");
}

console.log("Script loaded");

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
   console.log("Message Received");
   // Check the message
   if (message.action === 'turnOn') {
      EnterFullScreen();
   }
   else if (message.action === 'turnOff') {
      ExitFullScreen();
   }
});

// Enter Full Screen by hiding all elements except the content
function EnterFullScreen() {
   if (!fileContent) {
      fileContent = $("#doc_preview > div")
   }
   nextbar.style.display = 'none';
   leftLinksColumn.style.display = 'none';
   topBar.style.display = 'none';
   layout.style.marginLeft = "0";
   padding.style.marginLeft = "0";
   content.style.paddingTop = "0";
   content.style.paddingRight = "0";
   content.style.paddingBottom = "0";
   content.style.paddingLeft = "0";
   navBar.style.display = 'none';
   heading.style.display = 'none';
   subHeading.style.display = 'none';
   console.log("Entered Full Screen!");
   fileContent.style.overflow = 'visible';
}

// Exit full screen by reversing changes
function ExitFullScreen() {
   subHeading.style.display = "block";
   heading.style.display = "block";
   navBar.style.display = "flex";
   content.style.paddingBottom = paddingBottom
   content.style.paddingTop = paddingTop
   content.style.paddingLeft = paddingLeft
   content.style.paddingRight = paddingRight
   layout.style.marginLeft = layoutMargin
   padding.style.marginLeft = paddingMargin
   topBar.style.display = "flex";
   leftLinksColumn.style.display = "block";
   nextbar.style.display = "block";
   fileContent.style.overflow = 'auto';
   console.log("Page Restored!")
}