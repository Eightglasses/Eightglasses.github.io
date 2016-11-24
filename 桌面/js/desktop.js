window.onload = function() {
	var oMain = document.getElementById('main');
	var oDesktop = document.getElementById('desktop');
	var oBottom = document.getElementById('bottom');
	var divList = document.getElementsByClassName('divlist');
	var oContextmenu1 = document.getElementById('contextmenu1');
	var oContextmenu2 = document.getElementById('contextmenu2');
	var menu2child = oContextmenu2.children[0].children;
	var menu1child = oContextmenu1.children;
	var oInvisible = document.getElementById('invisible');
	var oBody = document.body;
	//宽度高度自适用

	windowresize();

	function windowresize() {
		//加载需要显示的内容
		var divlisthtml = '';
		for(var i = 0; i < data.length; i++) {
			divlisthtml += `
				<div class="divlist">
					<a href="javascript:;">
						<span class="divlistimg"> </span>
						<p>` + data[i].name + `</p>
					</a>
				</div>`;
		}

		//宽高自适用
		oMain.innerHTML = divlisthtml;
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
			one.dbl(divList[i], data[i].href, oInvisible); //双击
			//位置
			var oleft = Math.floor(i / lNum) * divList[i].offsetWidth;
			var otop = (i % lNum) * 130;
			//divList[i].style.left = Math.floor(i / lNum) * divList[i].offsetWidth + 'px';
			//divList[i].style.top = (i % lNum) * 130 + 'px';
			move(divList[i], {
				left: oleft,
				top: otop
			}, 200, 'linear')
		}

	}

	var child = oInvisible.children[0].children[1].children;
	child[2].onclick = function(e) {
		e.cancelBubble = true;
		console.log(this)
		oInvisible.style.display = 'none';
	}
	child[1].onclick = function(e) {
			//		var child = oInvisible.children[1].children[0]
			e.cancelBubble = true;
			//			oInvisible.style.left = 0;
			//			oInvisible.style.top = 0;
			oInvisible.style.width = '100%';
			oInvisible.style.height = '100%';
			oinposition(oInvisible, '28', '0');
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
	menu2child[1].onmousedown = function(e){//刷新页面
		e.cancelBubble;
		location.reload()
	}
	menu2child[0].onmousedown = function(e){//整理桌面
		e.cancelBubble;
		windowresize()
	}

}