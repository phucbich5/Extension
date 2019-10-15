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
	$('html').append("<div id='display-element-select' style='display: block;font-size: 14px;padding: 2px;z-index:999999;"
		+"background:#ccc;position: fixed; bottom:5px; right:0; border-radius: 10px;'>"
		+"<span style='margin-left: 40%;'>Xin Chào</span><button id='btnExit' style='position: absolute;"
		+"right:0; border: none; background: unset; color: red;'>X</button></div>");
	$('#display-element-select').css("width", "300px");
	$('#display-element-select').css("height", "200px");
	$('#display-element-select').append('<div id="content-element-select"'
		+'style="width: 100%;font-size: 12px; height: 100%;"></div>');
	$('#content-element-select').append('<select multiple class="form-control" style="width:100%;background: #fff;border: none; height: 50%;" id="selectelementv102"></select>');
	$('#content-element-select').append('<div style="width:100%;background: #fff;'
		+'margin-top:1px;height: 30%;" id="hoverelementv102"></div>');
	$('#content-element-select').append('<div style="width: 100%;margin:1px;'
		+'height: 21px;border-bottom-right-radius: 10px;border-bottom-left-radius: 10px;">'
		+ '<input type="button" id="btnSave" disabled value="Save" style="width: 49.5%;visibility: hidden;'
		+'font-size: 14px;border-bottom-left-radius: 10px;float:left;height: 100%;background: #fff; border: none;">'
		+ '<input type="button" id="btnDelete" disabled value="Delete" style="width: 49.5%;'
		+'visibility: hidden;font-size: 14px;border-bottom-right-radius: 10px;height: 100%;float:right;background: #fff; border: none;">'
		+'</div>');

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