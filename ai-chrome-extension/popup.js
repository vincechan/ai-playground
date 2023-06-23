document.addEventListener('DOMContentLoaded', function () {
    var applyButton = document.getElementById('applyHeader');
    applyButton.addEventListener('click', function () {
        var headerName = document.getElementById('headerName').value;
        var headerValue = document.getElementById('headerValue').value;

        // Send a message to the background script to update the header values
        chrome.runtime.sendMessage({ headerName, headerValue });

        window.close();
    });
});
