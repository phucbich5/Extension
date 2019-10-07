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
	//check active
	chrome.storage.sync.get(["active"], function(active) {
		if (!active['active']) {
			urls = {"urls" : [],
					"cookie": []};
			chrome.storage.sync.set({
		    "list_urls": urls
			}, function() {
				console.log("active finish!");
			});
			chrome.storage.sync.set({
		    "active": true
			});
		}
	});

	
});

function loadCurrentCookie() {
    chrome.tabs.getSelected(null, function (tab) { //lấy cửa sổ làm việc hiện tại
		var currentUrl=tab.url;
		//add địa chỉ url đã lọc
		$('#CurrentCookieUrl').val(extractHostname(currentUrl));
		// lấy cookie đã lưu tùy theo url hiện tại
        chrome.cookies.getAll({ "url": currentUrl }, function (cookie) {
            var result = "";
            for (var i = 0; i < cookie.length; i++) {
                result += cookie[i].name + "=" + cookie[i].value + ";\n";
                if (cookie[i].name == "c_user") {
                    currentUid = cookie[i].value;
                }
            }
            $('#cookieresult').val(result);
        });
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


