window.onload = function() {
	var oMain = document.getElementById('main');
	var oDesktop = document.getElementById('desktop');
	var oBottom = document.getElementById('bottom');
	var divList = document.getElementsByClassName('divlist');
	var oContextmenu1 = document.getElementById('contextmenu1');
	var oContextmenu2 = document.getElementById('contextmenu2');
	var menu2child = oContextmenu2.children[0].children;
	var menu1child = oContextmenu1.children;
	var oInvisible = document.getElementById('invisible'); //弹出框
	var oBody = document.body;
	//宽度高度自适用
	windowresize();

	function windowresize() {
		//加载需要显示的内容
		var oMainc = oMain.children;
		if(oMainc.length == '0') { //判断omain是否有子集，有的话就不添加了
			$(data).each(function(index) {
				$('#main').append($('<div>').addClass('divlist').append($('<a>').append($('<span>').addClass('divlistimg')).append($('<p>').html(data[index].name))));
			});
		};
		menu2child[2].onmousedown = function(e) {
				oContextmenu2.style.display = 'none';
				$('#main').append($('<div>').addClass('divlist').append($('<a>').append($('<span>').addClass('divlistimg')).append($('<p>').html('新建文件夹'))));
				e.cancelBubble = true;
			}
			//宽高自适用
		var elem = document.documentElement;
		var elemWidth = elem.clientWidth;
		var elemHeight = elem.clientHeight;
		oBody.style.width = elemWidth + 'px';
		oBody.style.height = elemHeight + 'px';
		oMain.style.height = elemHeight + 'px';
		oMain.style.backgroundSize = '100% 100%';
		//图标位置确定
		var lNum = Math.floor(elemHeight / divList[0].offsetHeight);
		for(var i = 0; i < divList.length; i++) {
			one.move(divList[i]); //移动
			one.contextmenu(divList[i]); //右键
			console.log(data[i].href)
			one.dbl(divList[i], data[i].href, oInvisible); //双击
			//位置
			var oleft = Math.floor(i / lNum) * divList[i].offsetWidth;
			var otop = (i % lNum) * 130;

			$('.divlist').eq(i).animate({
				left: oleft,
				top: otop
			}, 100)
		}

	}

	var child = oInvisible.children[0].children[1].children;
	child[2].onclick = function(e) {
		e.cancelBubble = true;
		console.log(this)
		oInvisible.style.display = 'none';
	}

	child[1].onoff = true;
	child[1].onclick = function(e) { //iframe窗口放大缩小
			e.cancelBubble = true;
			if(child[1].onoff) {
				oInvisible.style.width = '100%';
				oInvisible.style.height = '100%';
				this.style.backgroundPosition = 'left -60px'
				oinposition(oInvisible, '28', '0');
				child[1].onoff = false;
			} else {
				oInvisible.style.width = '750px';
				oInvisible.style.height = '450px';
				child[1].onoff = true;
				oinposition(oInvisible, '28', '30');

			}

		}
		//窗口大小改变时重新加载
	window.onresize = function() {
		windowresize();
	};

	document.onmousedown = function() {
		contextmenu2.style.display = 'none';
		contextmenu1.style.display = 'none';
		return false;
	}
	document.oncontextmenu = function(e) {
		var x = e.clientX;
		var y = e.clientY;
		contextmenu2.style.left = x + 'px';
		contextmenu2.style.top = y + 'px';
		contextmenu2.style.display = 'block';
		return false;
	};
	menu2child[1].onmousedown = function(e) { //刷新页面
		e.cancelBubble;
		location.reload()
	}
	menu2child[0].onmousedown = function(e) { //整理桌面
		e.cancelBubble;
		windowresize()
	}

}
