function duang(obj1, obj2) {
	var pos1 = obj1.getBoundingClientRect();
	var pos2 = obj2.getBoundingClientRect();
	if(pos1.right < pos2.left || pos1.bottom < pos2.top || pos1.left > pos2.right || pos1.top > pos2.bottom) {
		return false;
	} else {
		return true;
	}
}

//构造函数，桌面上的文件夹
var Folder = function(obj) {
	this.name = name;
	this.obj = obj;
}

Folder.prototype = {
	constructor: Folder,
	move: function(obj) { //点击移动
		this.obj.downTime = null;
		this.obj.onmousedown = function(e) {
			var nowleft = this.offsetLeft;
			var nowtop = this.offsetTop;
			if(e.which == 1) {
				var disx = e.clientX - this.offsetLeft;
				var disy = e.clientY - this.offsetTop;
				this.style.zIndex = '99';
				var _this = this;
				document.onmousemove = function(e) {
					_this.style.opacity = .5;
					var l = e.clientX - disx;
					var t = e.clientY - disy;
					var maxLeft = window.innerWidth - _this.offsetWidth;
					var maxTop = window.innerHeight - _this.offsetHeight;
					//范围限制
					l < 0 ? l = 0 : l = l;
					l > maxLeft ? l = maxLeft : l = l;
					t < 0 ? t = 0 : t = t;
					t > maxTop ? t = maxTop : t = t;
					_this.style.left = l + 'px';
					_this.style.top = t + 'px';
				}
				document.onmouseup = function() {
					var deletediv = document.getElementsByClassName('divlist')[0];
					var deleteimg = document.getElementsByClassName('divlistimg')[0];
					var thisimg = _this.getElementsByClassName('divlistimg')[0];
					var oMain = document.getElementById('main');
					if(duang(thisimg, deleteimg)) {
						if(_this != deletediv) { //this不能是回收站本身
							_this.pid = 0; //this的pid为0，pid为0的都是回收站里的内容 
							var ids = _this.getAttribute('zid'); //获取行间自定义属性
							data[ids].pid = 0; //数据库相对应的的数据的pid也为0
							windowR();
							save();
						}
					}
					$(_this).animate({
						left: nowleft,
						top: nowtop
					})
					_this.style.zIndex = 1;
					_this.style.opacity = 1;
					document.onmousemove = document.onmouseup = null;
				}
				return false;
			}
		}
	},
	contextmenu: function() { //右键事件
		this.obj.oncontextmenu = function(e) {
			e.cancelBubble = true;
			document.onmousemove = null;
			var x = e.clientX;
			var y = e.clientY;
			contextmenu1.style.left = x + 'px';
			contextmenu1.style.top = y + 'px';
			contextmenu1.style.display = 'block';
			return false;
		}
	},
	dbl: function(href, oInvisible) { //双击事件
		this.obj.ondblclick = function(e) {
			var iframe = document.getElementsByTagName('iframe')[0];
			iframe.src = href;
			oinposition(oInvisible, '28', '30')
		}
	}
}

function oinposition(oInvisible, a, b) { //显示内置框 b：定位高
	var child = oInvisible.children[1].children[0]
	oInvisible.style.display = 'block';
	var ohei = oInvisible.offsetHeight;
	var owid = oInvisible.offsetWidth;
	oInvisible.style.left = (document.documentElement.clientWidth - owid) / 2 + 'px';
	child.style.height = ohei - a + 'px';
	oInvisible.style.top = b + 'px';

};

function getdata() {
	//获取本地缓存
	var getItem = localStorage.getItem('str');
	data = JSON.parse(getItem);
	if(data == null) { //如果有本地缓存用本地缓存没有本地缓存用datalist的数据
		data = dataList;
	} else {
		data = data;
	};
};

function windowR() {
	//加载需要显示的内容
	var oMain = document.getElementById('main');
	var oMainc = oMain.children;
	var str1 = '';

	for(var i = 0; i < data.length; i++) {
		if(data[i].pid == 1) { //谁的pid等于1就是当前页面显示的内容
			str1 += '<div zid=' + data[i].id + ' class="divlist ' + data[i].cla + '"><a><span class="divlistimg"></span><p>' + data[i].name + '</p></a></div>'
		}

	};
	oMain.innerHTML = str1;

	var recycle = $('.recycle .divlistimg');
	$(data).each(function(index) {
		console.log(data[index].pid)
		if(data[index].pid == 0) {
			recycle.css("background-image", "url(./img/recycle2.png)");
		}
	})

	location(); //位置
};

function location() { //计算位置，添加方法
	var elem = document.documentElement;
	var elemWidth = elem.clientWidth;
	var elemHeight = elem.clientHeight;
	oBody.style.width = elemWidth + 'px';
	oBody.style.height = elemHeight + 'px';
	oMain.style.height = elemHeight + 'px';
	oMain.style.backgroundSize = '100% 100%';
	//图标位置确定 ，lnum一列能放几个图标
	var lNum = Math.floor(elemHeight / divList[0].offsetHeight);
	oMain.lNum = Math.floor(elemHeight / divList[0].offsetHeight);
	for(var i = 0; i < divList.length; i++) {
		var one = new Folder(divList[i]);
		one.move(); //移动
		one.contextmenu(); //右键
		//one.dbl(data[i].src, oInvisible); //双击
		var oleft = Math.floor(i / lNum) * divList[i].offsetWidth;
		var otop = (i % lNum) * 130;
		$('.divlist').eq(i).css({ //位置
			left: oleft,
			top: otop
		});
		oMain.i = i;
	}
	var oBaidu = document.getElementsByClassName('baidu')[0];
	var baidu = new Folder(oBaidu);
	baidu.dbl(data[1].src, oInvisible);
};

function save() { //保存本地存储
	var str = JSON.stringify(data);
	localStorage.setItem('str', str);
};
