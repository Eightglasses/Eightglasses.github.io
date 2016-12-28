// JavaScript Document

$(document).ready(function() {
	var blw = $(".scroll-box ul li").outerWidth(true);
	var liArr = $(".scroll-box ul").children("li");
	var mysw = $(".scroll-box .scroll-cont").width();
	var mus = parseInt(mysw / blw);
	var length = liArr.length - mus;
	var i = 0
	$(".btn-next").each(function() {
		$(this).click(function() {
			i++;
			if(i < length) {
				$(this).parent().find('ul').css("left", -(blw * i));
			} else {
				i = length;
				$(this).parent().find('ul').css("left", -(blw * (length - 1)));
			}
		})
	});
	$(".btn-prev").each(function() {
		$(this).click(function() {
			i--;
			if(i >= 0) {
				$(this).parent().find('ul').css("left", -(blw * i));
			} else {
				i = 0;
				$(this).parent().find('ul').css("left", 0);
			}
		})
	});

	var oPicClick = document.getElementsByClassName('PicClick');
	var oPicImg = document.getElementsByClassName('PicImg');
	oPicClick[0].onchange = function() {
		change(oPicClick[0], oPicImg[0])
	}
	oPicClick[1].onchange = function() {
		change(oPicClick[1], oPicImg[1])
	}
	oPicClick[2].onchange = function() {
		change(oPicClick[2], oPicImg[2])
	}

	$('.btn-sure').click(function() {//点击提交

		$("#form1").ajaxSubmit({

			type: 'post',
			dataType: 'json',
			url: 'www.sina.com',
			succes:function(){
				console.log(1)
			},
			error:function(){
				console.log(2)
			}
		})

		//		console.log($("#form1").serialize())
		//		var options = {
		//			url: 'www.baidu.com',
		//			type: 'post',
		//			dataType: 'images',
		//			data: $("#form1").serialize(),
		//			success: function(data) {
		//				if(data.length > 0)
		//					console.log(data)
		//			},
		//			error: function() {
		//				console.log('error')
		//			}
		//		};
		//		$.ajax(options);
	})

})

function change(f, p) {
	//	var pic = document.getElementById("preview"),
	//		file = document.getElementById("f");

	var pic = p;
	var file = f;

	var ext = file.value.substring(file.value.lastIndexOf(".") + 1).toLowerCase();

	// gif在IE浏览器暂时无法显示
	if(ext != 'png' && ext != 'jpg' && ext != 'jpeg') {
		alert("图片的格式必须为png或者jpg或者jpeg格式！");
		return;
	}
	var isIE = navigator.userAgent.match(/MSIE/) != null,
		isIE6 = navigator.userAgent.match(/MSIE 6.0/) != null;

	if(isIE) {
		file.select();
		var reallocalpath = document.selection.createRange().text;

		// IE6浏览器设置img的src为本地路径可以直接显示图片
		if(isIE6) {
			pic.src = reallocalpath;
		} else {
			// 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
			pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
			// 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
			pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
		}
	} else {
		html5Reader(file, pic);
	}
}

function html5Reader(file, pic) {

	var file = file.files[0];
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e) {
		pic.src = this.result;
		pic.style.width = '67px';
		pic.style.height = '57px';
	}
}