$(document).ready(function () {
	chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if( request.message === "start" ) {
            	create_display();
                start();
                // click_lock();
                click_right_lock();
            }
        }
    );
});

function start() {
	let element;
	let element_selected;
	$( 'body' ).mouseover(function(event) {
		$(event.target).css("border", "1.5px dashed red");
		// element = event.target ? event.target : event.srcElement;
		//console.log(event.target);
		$("#hoverelementv102").html(getElementHTML(event.target));
		$('.active').css('color','red');
		element_selected = $("#hoverelementv102").text();
		element = event.target;
	});
	$( 'body' ).mouseout(function(event) {
		$("#hoverelementv102").children().remove();
		$(event.target).css("border", "none");
		 element = event.target;
	});
	//sự kiện nhấn phím R để xóa
	$('body').on('keydown', function(event) {
		if (event.which == 82) {
			$("#hoverelementv102").children().remove();
			$("#selectelementv102").append('<option>'+ element_selected + '</option>');
			$(element).remove();
		}
	});
	//sự kiện nhấn chuột trái để xóa
	$('body').contextmenu(function(event) {
		$("#hoverelementv102").children().remove();
			$("#selectelementv102").append('<option>'+ element_selected + '</option>');
		$(event.target).remove();
	});
	$('#btnExit').click(function () {
    	// $(document).unbind('click');
    	$('#display-element-select').remove();
    	$('body').off();// tắt tất cả sự kiện
		$(document).unbind('contextmenu');
    });
}
function click_lock() {
	$(document).click(function(e) {
	    e.stopPropagation();
	    e.preventDefault();
	    e.stopImmediatePropagation();
	    return false;
	});
}
function click_right_lock() {
	$(document).bind('contextmenu', function(e) {
	    e.stopPropagation();
	    e.preventDefault();
	    e.stopImmediatePropagation();
	    return false;
	});
}
function create_display() {

    $( "#selectelementv102" ).change(function() {
		$('#btnSave').removeAttr('disabled');
		$('#btnSave').css('visibility','visible');
		$('#btnDelete').removeAttr('disabled');
		$('#btnDelete').css('visibility','visible');

		// if ($( "#selectelementv102" ).value() ) {}
	});
	$('#btnDelete').click(function () {
		$("#selectelementv102 option:selected").remove();
		let e = $( "#selectelementv102" ).val() || '';
		if (e == '') {
			$('#btnSave').css('visibility','hidden');
			$('#btnDelete').css('visibility','hidden');
		}
	});
	$('#btnSave').click(function () {
		console.log($("#selectelementv102 option:selected").val());
	});

}
function getElementHTML (element) {
		function getElmName (elm) {
			if (elm.id) {
				return "#" + elm.id;
			} else if (typeof elm.className == "string" && elm.className.trim().length) {
				return elm.tagName.toLowerCase() + "." + elm.className.trim().split(" ").join(".");
			} else {
				return elm.tagName.toLowerCase();
			}
		}

		let path = [];
		let currentElm = element;

		while (currentElm) {
			path.push(currentElm);// thêm mới thành phần vào mảng
			currentElm = currentElm.parentElement;//lấy thẻ cha
		}

		path = path.reverse(); // đảo vị trí cuối lên vị trí đầu của mảng

		let html = [];
		for (let i = 0; i < path.length; i++) {
			//tạo html và kiểm tra nếu là phần tử cuối cùng thì thêm class active (nhằm phân biệt element được chọn)
			html.push(`<span class="elementNode${path.length - 1 - i == 0 ? " active" : ""}">${getElmName(path[i])}</span>`);
		}
		// trả về chuỗi ngăn cách nhau bởi thẻ <span> > </span>
		return html.join("<span> > </span>");
	}