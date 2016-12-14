var newDiv = document.getElementsByClassName('new_div')[0];
var oDelete = document.getElementsByClassName('delete')[0];
var oRename = document.getElementsByClassName('rename')[0];
var oShow = document.getElementsByClassName('show')[0];
var oDiv1 = document.getElementsByClassName('div1')[0];
var menu = document.getElementsByClassName('oncontextmenu')[0]; //空白位置右键菜单
var menuchild = menu.children;
var divmenu = document.getElementsByClassName('divmenu')[0]; //文件夹位置右键菜单
var dmchild = divmenu.children;
var oRight = document.getElementsByClassName('right')[0];
var oKuang1 = document.getElementById('kuang1');

var oDiv2 = document.getElementsByClassName('div2')[0];
var oSure = document.getElementsByClassName('sure')[0];
var oCancel = document.getElementsByClassName('cancel')[0];
var oBox = document.getElementsByClassName('box')[0];
var value = oBox.value;
var divname = document.getElementsByClassName('div_name');
var morediv = document.getElementsByClassName('more_div');
var divimg = document.getElementsByClassName('div_img');
var child = divimg.children;
oDiv2.onOff = true;
var oChild = oDiv1.children;
var spans = oDiv1.getElementsByTagName('span');
var prev = document.getElementById('prev');
var oKuang = document.getElementById('kuang');
var prevChild = prev.children;

//通过pid获得当前pid的数据存入arr内
function getChild(id) {
	var arr = [];
	for(var i = 0; i < data.length; i++) {
		if(data[i].Pid == id) {
			arr.push(data[i]);
		}
	}
	return arr;
}

//根据id找到下边的所有子数据
function getAllChild(id) {
	var arr = [];
	arr.push(getById(id));
	xkdzmm(id);

	function xkdzmm(id) {
		var arr2 = getChild(id); //第一级子数据
		if(arr2.length == 0) {
			return;
		}
		arr = arr.concat(arr2);
		for(var i = 0; i < arr2.length; i++) {
			var c = getChild(arr2[i].id);
			if(c.length != 0) {
				xkdzmm(arr2[i].id);
			}
		}
	}
	return arr;
}
//根据id找数据
function getById(id) {
	for(var i = 0; i < data.length; i++) {
		if(data[i].id == id) {
			return data[i];
		}
	}
}

//默认渲染页面，根据pid渲染页面，newdata当前数据
function show() {
	nowdata = getChild(nowPid);
	oDiv1.innerHTML = '';
	for(var i = 0; i < nowdata.length; i++) {
		create(i);
	}
}

//生成
function create(n, c) {
	var oMore = document.createElement('div');
	oMore.className = 'more_div';
	var oDivimg = document.createElement('div');
	oDivimg.className = 'div_img';
	var oCheck = document.createElement('span');
	oCheck.className = '';
	var oTitle = document.createElement('div');
	oTitle.className = 'title';
	var oDivname = document.createElement('a');
	oDivname.className = 'divnames';
	var divnames = document.getElementsByClassName('divnames');
	oDivname.className = 'div_name';
	oDivname.innerHTML = nowdata[n].name;
	oDivimg.appendChild(oCheck);
	oTitle.appendChild(oDivname)
	oMore.appendChild(oDivimg);
	oMore.appendChild(oTitle);
	oMore.id = nowdata[n].id;
	oMore.name = nowdata[n].name;
	oMore.oncontextmenu = function(e) {
		var m = 0;
		for(var i = 0; i < morediv.length; i++) {
			morediv[i].children[0].className = 'div_img';
			spans[i].onOff = true;
		}
		oCheck.parentNode.className = 'active div_img';
		oCheck.onOff = false;
		for(var i = 0; i < spans.length; i++) {
			if(spans[i].onOff == false) {
				console.log(spans[i].parentNode.parentNode.id)
				m++;
			}
		}
		if(m > 1) {
			oRename.style.display = 'none';
			dmchild[1].style.display = 'none';
		} else {
			oRename.style.display = 'block';
			dmchild[1].style.display = 'block';
		}

		var _this = this;
		menu.style.display = 'none'
		var x = e.clientX;
		var y = e.clientY;
		divmenu.style.left = x + 'px';
		divmenu.style.top = y + 'px';
		divmenu.style.display = 'block';
		dmchild[0].onclick = function(e) {
			//打开
			dbl(oMore.id, oMore.name);
			e.cancelable = true;
		}
		dmchild[1].onclick = function() {
			//重命名
			rname(oMore);
			e.cancelable = true;
		}
		dmchild[2].onclick = function() {
			//删除
			deletediv();
			e.cancelable = true;
		}
	}

	if(c == 1) {
		oDiv1.insertBefore(oMore, oDiv1.children[0]);
	} else {
		oDiv1.appendChild(oMore);
	}

	oMore.onmousedown = function(e) {
		//		console.log(getAllChild(this.id))
		//		console.log(getById(this.id))
		for(var i = 0; i < spans.length; i++) {
			if(spans[i].onOff == false) {
				getById(spans[i].parentNode.parentNode.id).Pid;
			}
		}
		var arrtrue = [];
		var arrfalse = [];

		document.onmousemove = function(e) {
			var x1 = e.clientX;
			var y1 = e.clientY;
			oKuang1.style.display = 'block';
			oKuang1.style.left = x1 + 'px';
			oKuang1.style.top = y1 + 'px';
			//			if(duang(oKuang1,oMore)){
			//				console.log(1)
			//			}
			arrfalse = [];
			for(var i = 0; i < spans.length; i++) {
				if(duang(oKuang1, spans[i].parentNode.parentNode)) {
					if(spans[i].onOff == true) {
						arrtrue = [];
						console.log(spans[i].onOff)
						arrtrue.push(spans[i].parentNode.parentNode);
					}
				}
				if(spans[i].onOff == false) {
					arrfalse.push(spans[i].parentNode.parentNode);
				}

			}
		}
		document.onmouseup = function(e) {
			oKuang1.style.cssText = '';
			oKuang1.style.display = 'none';
			oKuang1.style.left = 0;
			oKuang1.style.top = 0;
			if(arrtrue.length == 1) {
				for(var i = 0; i < data.length; i++) {
					for(var j = 0; j < arrfalse.length; j++) {
						if(data[i].id == arrfalse[j].id) {
							data[i].Pid = arrtrue[0].id;
						}
					}
				}
				show();
			} 
			document.onmouseup = null;
			document.onmousemove = null;
		}
		e.cancelBubble = true;
		return false;
	}

	oMore.onmouseover = function() {
		if(oDiv2.onOff == false) {
			return;
		} else {
			if(oCheck.onOff == false) {
				this.children[0].className = 'active div_img';
			} else {
				this.children[0].className = 'hover div_img';
			}
		}
	}
	oMore.onmouseout = function() {
			if(oCheck.onOff == false) {
				this.children[0].className = 'active div_img';
			} else {
				this.children[0].className = 'div_img';
			}
		}
		//双击打开
	oMore.ondblclick = function() {
		dbl(this.id, this.name)
			//		nowPid = this.id;
			//		console.log(this.id)
			//		window.location.hash += this.name + '/';
			//		var a = document.createElement('a');
			//		a.href = 'javascript:;';
			//		a.id = this.id;
			//		a.innerHTML = this.name;
			//		a.onclick = function() {
			//			nowPid = this.id;
			//			console.log(path)
			//				//如果path里某一位id==点击的ID那么这个id后边的全部去掉
			//			for(var i = 0; i < path.length; i++) {
			//				if(path[i].id == this.id) {
			//					path = path.splice(0, i + 1);
			//				}
			//			}
			//			var str = '';
			//			for(var i = 2; i < path.length; i++) {
			//				str += path[i].innerHTML + '/';
			//			}
			//			window.location.hash = 'path=/' + str;
			//		}
			//		prevshow();
			//		path.push(a);
	}
	oCheck.onOff = true;
	//左键点击，选框被选中
	oCheck.onclick = function() {
		choice(oCheck);
		//		if(oCheck.onOff == true) {
		//			this.parentNode.className = 'active div_img';
		//		} else {
		//			this.parentNode.className = 'div_img';
		//		}
		//		oCheck.onOff = !oCheck.onOff;
		//		var m = 0;
		//		for(var i = 0; i < spans.length; i++) {
		//			if(spans[i].onOff == false) {
		//				m++;
		//			}
		//		}
		//		if(m > 1) {
		//			oRename.style.display = 'none'
		//		} else {
		//			oRename.style.display = 'block'
		//		}
	}

	//框选
	oDiv1.onmousedown = function(e) {
			oKuang.style.display = 'block';
			var l = e.clientX;
			var t = e.clientY;
			var maxl = oDiv1.offsetWidth + oDiv1.offsetLeft;
			var maxt = oDiv1.offsetHeight + oDiv1.offsetTop;
			var minl = oDiv1.offsetLeft;
			var mint = oDiv1.offsetTop;
			document.onmousemove = function(e) {
				var iL = e.clientX;
				var iT = e.clientY;
				if(iL < minl) {
					iL = minl
				}
				if(iT < mint) {
					iT = mint
				}
				//计算方块宽高
				var w = Math.abs(l - iL);
				var h = Math.abs(t - iT);
				//计算方块定位left,top
				var n = l < iL ? l : iL;
				var m = t < iT ? t : iT;

				oKuang.style.width = w + 'px';
				oKuang.style.height = h + 'px';
				oKuang.style.left = n + 'px';
				oKuang.style.top = m + 'px';

				for(var i = 0; i < morediv.length; i++) {
					if(duang(morediv[i], oKuang)) {
						morediv[i].children[0].className = 'active div_img';
						morediv[i].children[0].children[0].onOff = false;
						var m = 0;
						for(var j = 0; j < spans.length; j++) {
							if(spans[j].onOff == false) {
								m++;
							}
						}
						if(m > 1) {
							oRename.style.display = 'none';
							dmchild[1].style.display = 'none';
						} else {
							oRename.style.display = 'block';
							dmchild[1].style.display = 'block';
						}
					} else {
						morediv[i].children[0].className = 'div_img';
						morediv[i].children[0].children[0].onOff = true;
					}
				}
			}
			document.onmouseup = function() {
				oKuang.style.cssText = '';
				document.onmousemove = null;
				document.onmouseup = null;
			}
			return false;
		}
		//选框是否选中
	function choice(_this) {
		if(oCheck.onOff == true) {
			_this.parentNode.className = 'active div_img';
		} else {
			_this.parentNode.className = 'div_img';
		}
		oCheck.onOff = !oCheck.onOff;
		var m = 0;
		for(var i = 0; i < spans.length; i++) {
			if(spans[i].onOff == false) {
				m++;
			}
		}
		if(m > 1) {
			oRename.style.display = 'none';
			dmchild[1].style.display = 'none';
		} else {
			oRename.style.display = 'block';
			dmchild[1].style.display = 'block';
		}
	}
}
//面包屑show
function prevshow() {
	prev.innerHTML = '';
	for(var i = 0; i < path.length; i++) {
		prev.appendChild(path[i])
	}
}

//找最大id
function maxid() {
	var maxid = data[0].id;
	for(var i = 0; i < data.length; i++) {
		if(data[i].id > maxid) {
			maxid = data[i].id;
		}
	}

	return maxid;
}

//新建文件夹
function newdocument() {
	if(oDiv2.onOff == false) {
		return;
	} else {
		oBox.value = '新建文件夹';
		oDiv2.style.display = 'block';
		var j = {};
		j.id = null;
		j.name = null;
		j.Pid = nowPid;
		data.unshift(j);
		nowdata = getChild(nowPid);
		create(0, 1);

		oSure.onclick = function() {
			var value = oBox.value;
			if(value == '') {
				alert('内容不能为空');
				return;
			}
			for(var i = 0; i < nowdata.length; i++) {
				if(value == nowdata[i].name) {
					alert('不能重名');
					return;
				}
			}
			j.name = value;
			j.id = maxid() + 1;
			oDiv1.removeChild(oChild[0]);
			oDiv2.onOff = true;
			create(0, 1);
			oDiv2.style.display = 'none';

		}

		oCancel.onclick = function() {
			data.shift(j);
			oDiv1.removeChild(oChild[0]);
			oDiv2.style.display = 'none';
			oDiv2.onOff = true;
			nowdata = getChild(nowPid);
		}
		oBox.focus();
		oDiv2.onOff = false;
	}
}
//双击,右键打开，都可以用
function dbl(id, name) {
	nowPid = id;
	window.location.hash += name + '/';
	var a = document.createElement('a');
	a.href = 'javascript:;';
	a.id = id;
	a.innerHTML = name;
	a.onclick = function() {
		nowPid = id;
		//如果path里某一位id==点击的ID那么这个id后边的全部去掉
		for(var i = 0; i < path.length; i++) {
			if(path[i].id == this.id) {
				path = path.splice(0, i + 1);
			}
		}
		var str = '';
		for(var i = 2; i < path.length; i++) {
			str += path[i].innerHTML + '/';
		}
		window.location.hash = 'path=/' + str;
	}
	prevshow();
	path.push(a);
}

function drag(obj) {
	obj.onmousedown = function(e) {
		var disx = e.clientX - obj.offsetLeft;
		var disy = e.clientY - obj.offsetTop;
		document.onmousemove = function(e) {
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
			document.onmousemove = document.onmouseup = null;
		}
		return false;
	}
}

var oRight = document.getElementsByClassName('right')[0];
var oDiv1 = document.getElementsByClassName('div1')[0];

//碰撞检测
function duang(obj1, obj2) {
	var pos1 = obj1.getBoundingClientRect();
	var pos2 = obj2.getBoundingClientRect();
	if(pos1.right < pos2.left || pos1.bottom < pos2.top || pos1.left > pos2.right || pos1.top > pos2.bottom) {
		return false;
	} else {
		return true;
	}
}

divmenu.oncontextmenu = function() {
	return false;
}