
function login() {
	chrome.storage.sync.get(["userselected", "passselected"], function(result) {
		$('input[type=text]').val(result["userselected"]);
		$('input[type=password]').val(result["passselected"]);
		$('button[type=submit]').click();
	});
	
}