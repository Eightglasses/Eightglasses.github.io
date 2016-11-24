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
var folder = function() {
	this.name = name;
}
folder.prototype = {
	//	constructor = menu,
	move: function(obj) { //点击移动
		obj.downTime = null;
		obj.onmousedown = function(e) {
				var that = obj;
				that.downTime = setTimeout(function() {
//					console.log(123)
					if(e.which == 1) {
						var disx = e.clientX - obj.offsetLeft;
						var disy = e.clientY - obj.offsetTop;
						console.log(that)
						that.style.zIndex = '99';
						var _this = that;
						document.onmousemove = function(e) {
							_this.style.opacity = .5;
							var l = e.clientX - disx;
							var t = e.clientY - disy;
							var maxLeft = window.innerWidth - obj.offsetWidth;
							var maxTop = window.innerHeight - obj.offsetHeight;
							//范围限制
							l < 0 ? l = 0 : l = l;
							l > maxLeft ? l = maxLeft : l = l;
							t < 0 ? t = 0 : t = t;
							t > maxTop ? t = maxTop : t = t;

							obj.style.left = l + 'px';
							obj.style.top = t + 'px';
						}
						document.onmouseup = function() {
							_this.style.zIndex = 1;
							_this.style.opacity = 1;
							document.onmousemove = document.onmouseup = null;
						}
						return false;
					}
				}, 1000)
			},
			obj.onmouseup = function(e) {
				this.downTime = null;
				console.log(123);
			}
	},
	contextmenu: function(obj) { //右键事件
		obj.oncontextmenu = function(e) {
			console.log(e.which)
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
	dbl: function(obj, href, oInvisible) { //双击事件
		obj.ondblclick = function(e) {
			oinposition(oInvisible, '28', '30')
		}
	}
}

var one = new folder();

function oinposition(oInvisible, a, b) { //显示内置框
	var child = oInvisible.children[1].children[0]
	oInvisible.style.display = 'block';
	var ohei = oInvisible.offsetHeight;
	var owid = oInvisible.offsetWidth;
	oInvisible.style.left = (document.documentElement.clientWidth - owid) / 2 + 'px';
	console.log(a)
	child.style.height = ohei - a + 'px';
	oInvisible.style.top = b + 'px';

}