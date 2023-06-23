chrome.runtime.onInstalled.addListener(function () {
    // Register the declarativeNetRequest rules
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [], // Remove any existing rules if necessary
        addOrUpdateRuleIds: ["my_custom_rules"] // Add the ID of your custom rule
    });
});

// Respond to events from the declarativeNetRequest API
chrome.declarativeNetRequest.onRequest.getRulesetVersion(
    function (details, callback) {
        if (details.rulesetId === "my_custom_rules") {
            callback({ rulesetVersion: 1 });
        } else {
            callback({});
        }
    }
);
