$(document).ready(function () {
	var element;
	chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if( request.message === "start" ) {
            	create_display();
                start();
            }
        }
    );
});
function start() {
	$( document ).mouseover(function(event) {
		$(event.target).css("border", "1.5px dashed red");
		element = event.target;
		$("#hoverelementv102").append('<option>'+element + '</option>');
	});
		$( document ).mouseout(function(event) {
			$("#hoverelementv102").children().remove();
			$(event.target).css("border", "none");
			element = event.target;
	});
		$(window).on('keydown', function(event) {
			if (event.which == 68 || event.which == 231) {
				$("#selectelementv102").append('<option>'+element + '</option>');
				console.log(element);
				$(element).remove();
		}
	});
}
function create_display() {
	$('body').append("<div id='display-element-select' style='background:#fff;;position: fixed; bottom:5px; right:0; border: 1px solid #ccc; border-radius: 10px;'><span style='margin-left: 40%;'>Xin Chào</span><button style='position: absolute;right:0; border: none; background: unset; color: red;'>X</button></div>");
	$('#display-element-select').css("width", "300px");
	$('#display-element-select').css("height", "200px");
	$('#display-element-select').append('<div id="content-element-select" style="width: 100%; height: 100%;border-top: 1px solid #ccc;"></div>');
	$('#content-element-select').append('<select multiple class="form-control" style="width:100%; height: 60%; border: none;" id="selectelementv102"></select>');
	$('#content-element-select').append('<select multiple class="form-control" style="width:100%; height: 20%; border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;" id="hoverelementv102"></select>');

}