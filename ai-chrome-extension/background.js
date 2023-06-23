chrome.runtime.onInstalled.addListener(function () {
    chrome.webRequest.onBeforeSendHeaders.addListener(
        function (details) {
            details.requestHeaders.push({ name: "Your-Header-Name", value: "Your-Header-Value" });
            return { requestHeaders: details.requestHeaders };
        },
        { urls: ["<all_urls>"] },
        ["blocking", "requestHeaders"]
    );
});
