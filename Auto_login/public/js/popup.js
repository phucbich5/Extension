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
	chrome.storage.sync.get(["userselected", "passselected"], function(active) {
		$('#inputuser').val(active["userselected"]);
		$('#inputpassword').val(active["passselected"]);
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
			var list = result['list'] || '';
			if (list != '') {
				var list_url = list['linkURL'] || '';
				var list_user = list['username'] || '';
				var url_page = $("#CurrentCookieUrl").val();
				if (list_user != '') {
					for (var i = 0; i < list_user.length; i++) {
						if (list_url[i] == url_page) {
							$("#selectuser").append('<option>'+list_user[i]+'</option>');
						}
					}
				}
			}
		});
	}

	$("select#selectuser").change(function(){
      var selected = $(this).children("option:selected").val();
      var url_page = $("#CurrentCookieUrl").val();
      $('#delete').removeAttr("disabled");
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
							chrome.storage.sync.set({
						    "userselected": list_user[i],
						    "passselected": list_pass[i]
							}, function() {
								console.log("save!");
							});
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
    		var get_list = result['list'];
    		var check = true;
    		var list_url = get_list['linkURL'] || '';
    		var list_user = get_list['username']|| '';
    		var list_pass = get_list['password'] || '';

    		for (var i = 0; i < list_user.length; i++) {
    			if (list_url[i] == get_input_url && list_user[i] == get_input_user) {
    				check = false;
    				console.log(list_pass[i]);
    				console.log(get_input_pass);
    				if (list_pass[i] != get_input_pass) {
    					alert("Chức năng đổi pass chưa ra mắt!"+"\nPass cũ: "+ list_pass[i] +"\nPass mới: " + get_input_pass + '\nTại vị trí: ' + i);
    				}
    			}
    		}
    		if (check && get_input_user != '') {
    			get_list['linkURL'].push(get_input_url);
    			get_list['username'].push(get_input_user);
    			get_list['password'].push(get_input_pass);
    			chrome.storage.sync.set({
			    "list": get_list
				}, function() {
					console.log("save!");
					get_users_page();
				});
    		}
    	});
    });

    $("#login").click(function () {
    	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var activeTab = tabs[0];
		    chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
		});
    });

    chrome.storage.sync.get(["auto-login"], function(checkbox) {
		if (checkbox["auto-login"]) {
			$('#cbx-auto-login').attr('checked', true);
			$('#login').attr('disabled', true);
		    chrome.storage.sync.set({
			    "auto-login": true
			});
		}
		else{
			$('#cbx-auto-login').attr('checked', false);
			$('#login').attr('disabled', false);
		    chrome.storage.sync.set({
			    "auto-login": false
			});
		}
	});

    $('#cbx-auto-login').click(function() {
	    if ($(this).is(':checked')) {
	    	$('#login').attr('disabled', true);
	    	chrome.storage.sync.set({
			    "auto-login": true
				}, function() {
					console.log("auto login is on");
			});
	    } else{
	    	$('#login').attr('disabled', false);
	    	chrome.storage.sync.set({
			    "auto-login": false
				}, function() {
					console.log("auto login is off");
			});
	    }
  	});
}); //end document ready

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


