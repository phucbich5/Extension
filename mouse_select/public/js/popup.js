$(document).ready(function () {
	chrome.storage.sync.get(["start"], function(result) {
		var ahihi = result['start'] || '';
		if (ahihi != '') {
			$('#btn-start').val('Stop');
			$('#btn-start').css('background', 'red');
		}
	});
	$('#btn-start').click(function(){
		if ($('#btn-start').val() == 'Start') {
			$('#btn-start').val('Stop');
			$('#btn-start').css('background', 'red');
			chrome.storage.sync.set({
			    "start": true
				}, function() {
					console.log("on");
			});
		} else{
			$('#btn-start').val('Start');
			$('#btn-start').css('background', '#007bff');
			chrome.storage.sync.set({
			    "start": false
				}, function() {
					console.log("off");
			});
		}
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {"message": "start"});
		});
	});
});