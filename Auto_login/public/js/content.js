$(document).ready(function() {
	chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if( request.message === "start" ) {
                login();
            }
        }
    );
});
function login() {
	$('input[type=text]').val("17211TT2685");
	$('input[type=password]').val("Huycntt6@gmail.com");
	$('button[type=submit]').click();
}