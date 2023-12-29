console.log("Background Script is Running")

chrome.runtime.onStartup.addListener(() => {
   chrome.action.setBadgeText({
      text: "ON",
   })
 });

chrome.action.onClicked.addListener(async (tab) => {

   // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
   const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
   // Next state will always be the opposite
   const nextState = prevState === 'ON' ? 'OFF' : 'ON'
   // Set the action badge to the next state
   await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
   });

   if (nextState === "ON") {
      console.log("Sending turnOn message")
      chrome.tabs.sendMessage( tab.id, { action: 'turnOn' })
      console.log("Turned On");
   } else if (nextState === "OFF") {
      console.log("Sending turnOff message")
      chrome.tabs.sendMessage( tab.id, { action: 'turnOff' })
      console.log("Turned Off");
   }
});

