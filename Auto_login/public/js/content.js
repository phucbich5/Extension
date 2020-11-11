$(document).ready(function(){
	chrome.storage.sync.get(["auto-login"], function(result) {
		if (result["auto-login"]) {
			login();
		}
	});
	
	chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if( request.message === "start" ) {
                login();
            }
        }
    );
       
});
function login() {
	chrome.storage.sync.get(["userselected", "passselected"], function(result) {
		$('input[type=text]').val(result["userselected"]);
		$('input[type=password]').val(result["passselected"]);
		$('button[type=submit]').click();
	});
	
}