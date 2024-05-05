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
            const view_btn = document.getElementById('change-view');
            const length_btn = document.getElementById('extend');
            view_btn.disabled = true;
            length_btn.disabled = true;
        }
    } catch (error) {
        // Disable on an error as well
        console.log("Canvas Full View is disabled on this page")
        const view_btn = document.getElementById('change-view');
        const length_btn = document.getElementById('extend');
        view_btn.disabled = true;
        length_btn.disabled = true;
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

    // Get active tab and send message to change view between full and minimized
    document.getElementById('change-view').addEventListener('click', async function() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.tabs.sendMessage(tab.id, { action: "switchView" });
    });

    // Get active tab and send message to extend vertical length of full view
    document.getElementById('extend').addEventListener('click', async function() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.tabs.sendMessage(tab.id, { action: "extend" });
    });

});