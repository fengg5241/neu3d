$(function() {
	// 获取url中的phone
	var user_phone = getQueryVariable("phone");
	var $ = jQuery.noConflict();
	// 获取数据信息
	$.ajax({
				type : "GET",
				dataType : "json",
				url : "./json/userInfo.json",
				success : function(data) {
					for (var i = 0; i < data.userInfo.length; i++) {
						if (data.userInfo[i].phone == user_phone) {
							$("#wel_name").html(
									"Welcome," + data.userInfo[i].name);
							$("#sharelink").attr("data-clipboard-text",
									window.location.href);
							$("#left-username").html(data.userInfo[i].name);
							$("#left-phone").html("(65)"+data.userInfo[i].phone);
							for (var j = 0; j < data.apartmentInfo.length; j++) {
								var id = data.apartmentInfo[j].name;
								var image = data.apartmentInfo[j].image;
								var image_large = data.apartmentInfo[j].image_large;
								var td_url = data.apartmentInfo[j].td_url;
								var b_num = data.apartmentInfo[j].type;
								var str = "<div class='card shadow-sm'><img class='card-img-top' src='"
										+ image
										+ "' alt='layout image'>"
										+ "<div class='card-footer-btn d-flex'><div class='left-btn' data-url='"
										+ image_large
										+ "'>FLOOR PLAN</div>"
										+ "<div class='right-btn bg-primary text-white' td-url="
										+ td_url + ">3D TOUR</div></div></div>";
								if (b_num == 2) {
									$("#b2").append(str);
								} else if (b_num == 3) {
									$("#b3").append(str);
								} else {
									$("#b4").append(str);
								}
							}
							_content();
							break;
						}

					}

				}
			});

	$("#sharelink").click(function() {
		copyUrl("sharelink");
	});
	$("#demo_btn").click(function() {
		copyUrl("demo_btn");
	});
	function copyUrl(id) {
		var clipboard = new ClipboardJS("#" + id);
		clipboard.on('success', function(e) {
			alert("Copy success");
		});
		clipboard.on('error', function(e) {
			console.log(e);
		});

	}

	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			}
		}
		return (false);
	}

	function _content() {
		var $ = jQuery.noConflict();
		$('.right-content .card .right-btn').click(function() {
			var url = $(this).attr('td-url');
			window.location.href="https://"+url;
		});
		
		$('.right-content .card .card-img-top').click(function() {
			var url = $(this).attr('src');
			$('#modal-img').attr('src', url);
			$('#imageModal').modal('show');
		});

		$('.right-content .card .left-btn').click(function() {
			var url = $(this).attr('data-url');
			$('#modal-img').attr('src', url);
			$('#imageModal').modal('show');
		});

		$('.right-content .card .right-btn bg-primary text-white')
				.click(
						function() {
							var url = $(this).attr('data-type');
							if (url === 'a1') {
								window
										.open("https://www.720yuntu.com/tour/7c027b2cb06e154c");
							}
						});
	}
})