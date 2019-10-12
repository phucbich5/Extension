$(document).ready(function() {
	chrome.storage.sync.get(["list_urls"], function(items) {
		setTimeout(function() {
			var urls = items["list_urls"]["urls"];
			var elements = items["list_urls"]["elements"];
			$(".loader").remove();
			for (var i = 0; i < urls.length; i++) {
				$("#list-urls").append('<input type="button" id = "url" class="btn btn-outline-primary btn-lg btn-block" value="'+urls[i]+'"></input>');
			}
			for (var i = 0; i < elements.length; i++) {
				$("#list-element").append('<input type="button" id = "element" class="btn btn-outline-primary btn-lg btn-block" value="'+elements[i]+'"></input>');
			}
			$("input[type=button]").click(function() {
				var deleteE = $(this).val();
				var getIDE = $(this).attr("id");
				var tempArr = [];
				var j = 0;
				if (getIDE == "url") {
					for (var i = 0; i < urls.length; i++) {
						if (urls[i] != deleteE) {
							tempArr[j] = urls[i];
							j++;
						}
					}
					urls = {"urls":tempArr, "elements":elements};
					chrome.storage.sync.set({
				    "list_urls": urls
					}, function() {
						location.reload();
					});
				} else{
					for (var i = 0; i < elements.length; i++) {
						if (elements[i] != deleteE) {
							tempArr[j] = elements[i];
							j++;
						}
					}
					urls = {"urls":urls, "elements":tempArr};
					chrome.storage.sync.set({
				    "list_urls": urls
					}, function() {
						location.reload();
					});
				}
			});
		}, 750);
	});

	var color = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];
	for (var i = 0; i < color.length; i++) {
		$("#border-color").append('<option style = "color: '+color[i]+';" value="'+color[i]+'">'+color[i]+'</option>');
		$("#color").append('<option style = "color: '+color[i]+';" value="'+color[i]+'">'+color[i]+'</option>');
		$("#text-color").append('<option style = "color: '+color[i]+';" value="'+color[i]+'">'+color[i]+'</option>');
	}

	$("#border-color").change(function() {
		$("#border-color").css("color",$("#border-color").val());
	});
	$("#color").change(function() {
		$("#color").css("color",$("#color").val());
	});
	$("#text-color").change(function() {
		$("#text-color").css("color",$("#text-color").val());
	});

	$("#save").click(function() {
		var color1 = $("#border-color").val();
		var color2 = $("#color").val();
		var color3 = $("#text-color").val();

		chrome.storage.sync.set({
	    "border-color": color1,
	    "color": color2,
	    "text-color": color3
		}, function() {
			$("#save").html("Save Finish!");
			$("#save").attr('disabled', true);
			setTimeout(function() {
				$("#save").html("Save");
				$("#save").attr('disabled', false);
			}, 2000);
		});
	});

	chrome.storage.sync.get(["border-color", "color", "text-color"], function(colors) {
		$("#border-color").val(colors["border-color"]);
		$("#color").val(colors["color"]);
		$("#text-color").val(colors["text-color"]);

		$("#border-color").css("color",colors["border-color"]);
		$("#color").css("color",colors["color"]);
		$("#text-color").css("color",colors["text-color"]);
	});	

});
