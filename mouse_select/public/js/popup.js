$(document).ready(function () {
	$('#btn-start').click(function(){
		if ($('#btn-start').val() == 'Start') {
			$('#btn-start').val('Started');
			$('#btn-start').attr('disabled', "true");
		}
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {"message": "start"});
		});
	});
});