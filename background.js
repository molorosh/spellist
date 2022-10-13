// q.v.: https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/tutorials/focus-mode/background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("chrome.runtime.onInstalled");
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

chrome.action.onClicked.addListener(async (tab) => {
    console.log("chrome.action.onClicked");
    console.log("tab", tab);

    if(tab.url.startsWith("chrome://")){
        console.log("chrome://");
        return; 
    }

    // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON'

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
    });

    console.log("nextState", nextState);

    if (nextState === "ON") {
        // Insert the CSS file when the user turns the extension on
        await chrome.scripting.insertCSS({
            files: ["content.css"],
            target: { tabId: tab.id },
        });
        chrome.scripting.executeScript({
            target: {tabId: tab.id, allFrames: true},
            files: ['content.js'],
        });
    } else if (nextState === "OFF") {
        // Remove the CSS file when the user turns the extension off
        await chrome.scripting.removeCSS({
            files: ["content.css"],
            target: { tabId: tab.id },
        });
    }

});