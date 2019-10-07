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
	// chrome.storage.sync.get(["list"], function(result) {
	// 	alert(result['list']['linkURL']);
	// });
	get_users_page();
	function get_users_page() {
		$("#selectuser").children().remove();
		chrome.storage.sync.get(["list"], function(result) {
		var list_url = result['list']['linkURL'];
		var list_user = result['list']['username'] || '';
		var url_page = $("#CurrentCookieUrl").val();
		if (list_user != '') {
			for (var i = 0; i < list_user.length; i++) {
				if (list_url[i] == url_page) {
					$("#selectuser").append('<option>'+list_user[i]+'</option>');
				}
			}
		}
	});
	}

	$("select#selectuser").change(function(){
      var selected = $(this).children("option:selected").val();
      var url_page = $("#CurrentCookieUrl").val();
      // alert("You have selected - " + selected);
      chrome.storage.sync.get(["list"], function(result) {
			var list_url = result['list']['linkURL'] || '';
			var list_user = result['list']['username'] || '';
			var list_pass = result['list']['password'] || '';
			 if (list_url != '') {
			 	for (var i = 0; i < list_url.length; i++) {
			 		if (url_page == list_url[i]) {
				 		if (selected == list_user[i]) {
							$('#inputuser').val(list_user[i]);
							$('#inputpassword').val(list_pass[i]);
						}
			 		}
					
					
				}
			
			}
			
		});
    });
    $('#save').click(function () {
    	var get_input_user = $("#inputuser").val();
    	var get_input_pass = $("#inputpassword").val();
    	var get_input_url = $("#CurrentCookieUrl").val();
    	chrome.storage.sync.get(["list"], function(result) {
    		var get_users = result['list'];
    		get_users['linkURL'].push(get_input_url);
    		get_users['username'].push(get_input_user);
    		get_users['password'].push(get_input_pass);
    		chrome.storage.sync.set({
		    "list": get_users
			}, function() {
				console.log("save!");
				get_users_page();
			});
			console.log(get_users);
		});
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


