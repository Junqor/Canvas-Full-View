// ====== Previous/Next Footer =======

function $(elem) {return document.querySelector(elem)}
let nextbar = $("#sequence_footer");

if (nextbar) {
   var nextbarParent = nextbar.style.display;
}
else {
   console.log("couldnt find nextbar");
}

// ====== Left Side Navigation

let leftLinksColumn = $("#left-side");

if (leftLinksColumn) {
   var leftLinksParent = leftLinksColumn.style.display;
}
else {
   console.log("couldnt find leftlc");
}
// ======= Top Bar
let topBar = $(".ic-app-nav-toggle-and-crumbs.no-print");

if (topBar) {
   var topBarParent = topBar.style.display;
}
else {
   console.log("couldnt find topbar");
}
// ======= Left Margin
let layout = $("#main.ic-Layout-columns");
let padding1 = $("#wrapper.ic-Layout-wrapper")

if (layout && padding1) {
   var layoutMargin = layout.style.marginLeft;
   var padding1Margin = padding1.style.marginLeft;
}
else {
   console.log("couldnt find layout or padding1");
}

// ======= Format Media ========
let content = $("#content");

if (content) {
   var paddingTop = content.style.paddingTop
   var paddingRight = content.style.paddingRight
   var paddingBottom = content.style.paddingBottom
   var paddingLeft = content.style.paddingLeft
}
else {
   console.log("couldnt find content");
}

// ======= Navigation ========
let navBar = $("#header.ic-app-header.no-print");

if (navBar) {
   var navBarParent = navBar.parentNode;
}
else {
   console.log("couldnt find NavBar");
}


//======= Heading =======
let heading = $("h2");
if (heading) {
   var headingParent = heading.parentNode;
}
else {
   console.log("couldnt find heading");
}

//====== TargetSpan Parent (Txt above file)
let targetSpan = $('div > span > a[download="true"]');
if (targetSpan) {
   var subHeading = targetSpan.parentNode.parentNode;
   var subHeadingParent = subHeading.style.display;
} else {
   console.log("subHeading not found");
}

console.log("script loaded");

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

function EnterFullScreen() {
   nextbar.style.display = 'none';
   leftLinksColumn.style.display = 'none';
   topBar.style.display = 'none';
   layout.style.marginLeft = "0";
   padding1.style.marginLeft = "0";
   content.style.paddingTop = "0";
   content.style.paddingRight = "0";
   content.style.paddingBottom = "0";
   content.style.paddingLeft = "0";
   navBar.style.display = 'none';
   heading.style.display = 'none';
   subHeading.style.display = 'none';
   console.log("Entered Full Screen!")
}

// Exit full screen by reversing changes in reverse order
function ExitFullScreen() {
   subHeading.style.display = subHeadingParent
   heading.style.display = "block";
   navBar.style.display = "block";
   content.style.paddingBottom = paddingBottom
   content.style.paddingTop = paddingTop
   content.style.paddingLeft = paddingLeft
   content.style.paddingRight = paddingRight
   layout.style.marginLeft = layoutMargin
   padding1.style.marginLeft = padding1Margin
   topBar.style.display = topBarParent;
   leftLinksColumn.style.display = leftLinksParent;
   nextbar.style.display = nextbarParent;
   console.log("Page Restored!")
}