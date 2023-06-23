# Chrome extension using AI Tools

## Files
* manifest.json: This file contains metadata about your extension.
* background.js: This file handles background processes for your extension.
* contentScript.js: This file injects the custom header into web pages.
* popup.html and popup.js (optional): These files create a popup window for your extension.

## Load the extension in Chrome

1. Open Google Chrome and navigate to chrome://extensions.
2. Enable the "Developer mode" option.
3. Click on "Load unpacked" and select the folder containing your extension project.
4. The extension should now be loaded and active in Chrome.

## History

1. GPT: Initial Commit
2. GPT: Switch from event page to background page because got error `"The 'webRequest' API cannot be used with event pages. Could not load manifest."`. 
