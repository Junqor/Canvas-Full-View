// Disable popup functionality based on content script activity
async function updatePopup() {
    try {
        const tabs = await chrome.tabs.query({
            currentWindow: true,
            active: true,
        });
        
        const isEnabled = await isScriptActive(tabs[0]);
        
        if (!isEnabled) {
            // Disable buttons
            console.log("Canvas Full View is disabled on this page")
            const enlarge_btn = document.getElementById('fullscreen');
            const minimize_btn = document.getElementById('minimize');
            enlarge_btn.disabled = true;
            minimize_btn.disabled = true;
        }
    } catch (error) {
        // Disable on an error as well
        console.log("Canvas Full View is disabled on this page")
        const enlarge_btn = document.getElementById('fullscreen');
        const minimize_btn = document.getElementById('minimize');
        enlarge_btn.disabled = true;
        minimize_btn.disabled = true;
    }
}

// Check if content script is active on current page by sending message to content script
async function isScriptActive(tab) {
    try {
        if (!tab) {
            console.error("No active tab found");
            return false;
        }

        const response = await chrome.tabs.sendMessage(tab.id, { action: "isContentScriptReady" });

        console.log("Message from the content script:");
        console.log(response.contentScriptReady);

        return response && response.contentScriptReady;
    } catch (error) {
        return false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Call the updatePopup function when the popup is opened
    updatePopup();

    // Get active tab and send message to turn on functionality
    document.getElementById('fullscreen').addEventListener('click', async function() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const response = await chrome.tabs.sendMessage(tab.id, { action: "turnOn" });
    });

    // Get active tab and send message to turn off functionality
    document.getElementById('minimize').addEventListener('click', async function() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const response = await chrome.tabs.sendMessage(tab.id, { action: "turnOff" });
    });

});