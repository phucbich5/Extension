var currentCookie="";
var currentUid = "";
$(document).ready(function () {
	$('#go-to-options').click(function() {
		if (chrome.runtime.openOptionsPage) {
		chrome.runtime.openOptionsPage();
		} else {
		window.open(chrome.runtime.getURL('options.html'));
		}
	});
	chrome.storage.sync.get(["active"], function(active) {
		if (!active['active']) {
			user = {"linkURL" : [],
					"username": [],
					"password": []};

			chrome.storage.sync.set({
		    "list": user
			}, function() {
				console.log("active finish!");
			});
			chrome.storage.sync.set({
		    "active": true
			});
		}
	});
	chrome.storage.sync.get(["list_user", "list"], function(result) {
		alert(result['list']['linkURL']);
	});

	$("select#selectuser").change(function(){
      var selected= $(this).children("option:selected").val();
      // alert("You have selected - " + selected);
    });
    $('#save').click(function () {
    	var get_input_user = $("#inputuser").val();
    	var get_input_pass = $("#inputpassword").val();
    	alert(get_input_pass + get_input_user);
    });
}); //end document

function loadCurrentCookie() {
    chrome.tabs.getSelected(null, function (tab) { //lấy cửa sổ làm việc hiện tại
		var currentUrl=tab.url;
		//add địa chỉ url đã lọc
		$('#CurrentCookieUrl').val(extractHostname(currentUrl));
		
    });
}
function extractHostname(url) {
	var hostname;
	//lọc url của web
	if (url.indexOf("://") > -1) {
		hostname = url.split('/')[2];
	}
	else {
		hostname = url.split('/')[0];
	}
	//tìm và xóa địa chỉ port
	hostname = hostname.split(':')[0];
	//tìm và xóa "?"
	hostname = hostname.split('?')[0];
	return hostname;
}
//gọi chức năng load loadCurrentCookie()
loadCurrentCookie();


