$(document).ready(function () {
	var element;
	chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if( request.message === "start" ) {
                alert("Vui lòng load lại trang web! F5 :))");
            }
        }
    );
	chrome.storage.sync.get(["start"], function(result) {
		var ahihi = result['start'] || '';
		if (ahihi != '' && ahihi == true) {
			$( document ).mouseover(function(event) {
				$(event.target).css("border", "3px double red");
				element = event.target;

			});
			$( document ).mouseout(function(event) {
				$(event.target).css("border", "none");
				element = event.target;
			});
			$(window).on('keydown', function(event) {
				if (event.which == 68 || event.which == 231) {
					$(element).remove();
				}
			});
		}
		
	});
});