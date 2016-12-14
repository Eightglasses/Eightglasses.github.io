var oMain = document.getElementById('main');
var oDesktop = document.getElementById('desktop');
var oBottom = document.getElementById('bottom');
var divList = document.getElementsByClassName('divlist');
var oRemove = document.getElementsByClassName('removeItem')[0];
var oNew_file = document.getElementsByClassName('new_file')[0];
var oContextmenu1 = document.getElementById('contextmenu1');
var oContextmenu2 = document.getElementById('contextmenu2');
var menu2child = oContextmenu2.children[0].children;
var menu1child = oContextmenu1.children;
var oInvisible = document.getElementById('invisible'); //弹出框
var oBody = document.body;
var data = null; //本地缓存数据

getdata();

//默认加载
windowR();
//数据
save();
//存数据

//添加div
//	function windowR() {
//		//加载需要显示的内容
//		var oMainc = oMain.children;
//		//			$(data).each(function(index) {
//		//				if(data[index].pid == 1) {
//		//					$('#main').append($('<div>').addClass('divlist').append($('<a>').append($('<span>').addClass('divlistimg')).append($('<p>').html(data[index].name))));
//		//				}
//		//			});
//		var str1 = '';
//		for(var i = 0; i < data.length; i++) {
//			if(data[i].pid == 1) {
//				str1 += '<div class="divlist"><a><span class="divlistimg"></span><p>' + data[i].name + '</p></a></div>'
//			}
//		}
//		oMain.innerHTML = str1;
//
//		location();
//
//	}

var child = oInvisible.children[0].children[1].children;
child[2].onclick = function(e) {
	e.cancelBubble = true;
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
	windowR();
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
	document.location.reload();
};
menu2child[0].onmousedown = function(e) { //整理桌面
	e.cancelBubble;
	windowR();
};
oRemove.onmousedown = function() {
	localStorage.removeItem('str');
	document.location.reload();
};

oNew_file.onmousedown = function(e) { //新建文件夹
	oContextmenu2.style.display = 'none';
	var newdata = '';
	//新数据
	newdata = {
		name: '新建文件夹',
		pid: 1,
		id: data.length ,
		href: '',
		cid: 1
	};
	data.push(newdata);
	save();
	
	$('#main').append($('<div>').attr('zid',newdata.id).addClass('divlist').append($('<a>').append($('<span>').addClass('divlistimg')).append($('<p>').html('新建文件夹'))));
	var ol = Math.floor((oMain.i + 1) / oMain.lNum) * divList[oMain.i + 1].offsetWidth;
	var ot = ((oMain.i + 1) % oMain.lNum) * 130;
	$('#main div').each(function(index) {
		$('#main div').last().animate({
			left: ol,
			top: ot
		})
	})

	oMain.i++;
	location();
	e.cancelBubble = true;
};
