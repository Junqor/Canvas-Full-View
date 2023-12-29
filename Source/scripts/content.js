// ====== Previous/Next Footer =======

function $(sel) {return document.querySelector(sel)}
let nextbar = $("#sequence_footer");

if (nextbar) {
   var nextbarParent = nextbar.parentNode;
   nextbar.remove();
}
else {
   console.log("couldnt find nextbar");
}

// ====== Left Side Navigation

let leftLinksColumn = $("#left-side");

if (leftLinksColumn) {
   var leftLinksParent = leftLinksColumn.parentNode;
   leftLinksColumn.remove();
}
else {
   console.log("couldnt find leftlc");
}
// ======= Top Bar
let topBar = $(".ic-app-nav-toggle-and-crumbs.no-print");

if (topBar) {
   var topBarParent = topBar.parentNode;
   topBar.remove();
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
   layout.style.marginLeft = 0;
   padding1.style.marginLeft = 0;
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
   content.style.paddingTop = "0";
   content.style.paddingRight = "0";
   content.style.paddingBottom = "0";
   content.style.paddingLeft = "0";
}
else {
   console.log("couldnt find content");
}

// ======= Navigation ========
let navBar = $("#header.ic-app-header.no-print");

if (navBar) {
   var navBarParent = navBar.parentNode;
   navBar.remove();
}
else {
   console.log("couldnt find NavBar");
}


//======= Heading =======
let heading = $("h2");
if (heading) {
   var headingParent = heading.parentNode;
   heading.remove();
}
else {
   console.log("couldnt find heading");
}

//====== TargetSpan Parent (Txt above file)
let targetSpan = $('div > span > a[download="true"]');
if (targetSpan) {
   var subHeading = targetSpan.parentNode.parentNode;
   var subHeadingParent = subHeading.parentNode;
   subHeading.remove();
} else {
   console.log("subHeading not found");
}

console.log("script loaded");

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
   console.log("Message Received");
   // Check the message
   if (message.action === 'turnOn') {
      console.log('Extension turned ON');
      EnterFullScreen();
   }
   else if (message.action === 'turnOff') {
      console.log('Extension turned OFF');
      ExitFullScreen();
   }
});

function EnterFullScreen() {
   nextbar.remove();
   leftLinksColumn.remove();
   topBar.remove();
   layout.style.marginLeft = 0;
   padding1.style.marginLeft = 0;
   content.style.width = '100%';
   content.style.height = '100%';
   content.style.margin = '0';
   content.style.padding = '0';
   navBar.remove();
   heading.remove();
   subHeading.remove();
   console.log("Entered Full Screen!")
}

// Exit full screen by reversing changes in reverse order
function ExitFullScreen() {
   subHeadingParent.insertBefore(subHeading, subHeadingParent.firstChild);
   headingParent.insertBefore(heading, headingParent.firstChild);
   navBarParent.insertBefore(navBar, navBarParent.firstChild.nextSibling.nextSibling.nextSibling);
   content.style.paddingBottom = paddingBottom
   content.style.paddingTop = paddingTop
   content.style.paddingLeft = paddingLeft
   content.style.paddingRight = paddingRight
   layout.style.marginLeft = layoutMargin
   padding1.style.marginLeft = padding1Margin
   topBarParent.insertBefore(topBar, topBarParent.firstChild);
   leftLinksParent.insertBefore(leftLinksColumn, leftLinksParent.firstChild.nextSibling.nextSibling);
   nextbarParent.appendChild(nextbar)
   console.log("Page Restored!")
}