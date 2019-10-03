$(document).ready(function() {
	chrome.storage.sync.set({
    "location-href": location.href
	});
	chrome.storage.sync.get(["auto-delete"], function(checkbox) {
		if (checkbox["auto-delete"]) {
			deleteElements();
		}
	});
	chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if( request.message === "start" ) {
                deleteElements();
            }
        }
    );
});

function deleteElements() {
	chrome.storage.sync.get(["list_urls"], function(items) {
		var urls = items["list_urls"]["urls"];
		var elements = items["list_urls"]["elements"];
		if (urls.length > 0) {
			if (elements.length > 0) {
				for (var i = 0; i < urls.length; i++) {
					if (urls[i] == location.href) {
						for (var i = 0; i < elements.length; i++) {
							$(elements[i]).remove();
						}
					}
				}
			}
		}
	});
}