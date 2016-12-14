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
//存当前页面数据，根据newdata加载当前页面
var nowdata = [];
var nowPid = 0;
//存面包屑
var path = [];
//prevchild[1]就是全部文件
prevChild[1].id = 0;
//window的hash默认
window.location.hash = 'path=/';
//面包屑添内容
for(var i = 0; i < prevChild.length; i++) {
	path.push(prevChild[i]);
}

//初始化
show();
window.onhashchange = function() {
	show();
	prevshow();
}

//上一级点击
prevChild[0].onclick = function() {
		if(path.length == 2) {
			return;
		}
		path.pop();
		nowPid = path[path.length - 1].id;
		var str = '';
		for(var i = 2; i < path.length; i++) {
			str += path[i].innerHTML + '/';
		}
		window.location.hash = 'path=/' + 　str;
	}
	//全部点击
prevChild[1].onclick = function() {
	nowPid = 0;
	path = path.splice(0, 2);
	window.location.hash = 'path=/';
}

//新建
newDiv.onclick = function() {
	newdocument();
	//	if(oDiv2.onOff == false) {
	//		return;
	//	} else {
	//		oBox.value = '新建文件夹';
	//		oDiv2.style.display = 'block';
	//		var j = {};
	//		j.id = null;
	//		j.name = null;
	//		j.Pid = nowPid;
	//		data.unshift(j);
	//		nowdata = getChild(nowPid);
	//		create(0, 1);
	//
	//		oSure.onmousedown = function(e) {
	//			var value = oBox.value;
	//			if(value == '') {
	//				alert('内容不能为空');
	//				return;
	//			}
	//			for(var i = 0; i < nowdata.length; i++) {
	//				if(value == nowdata[i].name) {
	//					alert('不能重名');
	//					return;
	//				}
	//			}
	//			j.name = value;
	//			j.id = maxid() + 1;
	//			oDiv1.removeChild(oChild[0]);
	//			oDiv2.onOff = true;
	//			create(0, 1);
	//			oDiv2.style.display = 'none';
	//			e.cancelBubble = true;
	//
	//		}
	//
	//		oCancel.onclick = function() {
	//			data.shift(j);
	//			oDiv1.removeChild(oChild[0]);
	//			oDiv2.style.display = 'none';
	//			oDiv2.onOff = true;
	//			nowdata = getChild(nowPid);
	//		}
	//		oBox.focus();
	//		oDiv2.onOff = false;
	//	}
}
oDelete.onclick = function() {
	deletediv()
		//		for(var i = 0; i < morediv.length; i++) {
		//			var mChild = morediv[i].children[0].children[0];
		//			if(mChild.onOff == false) {
		//				for(var j = 0; j < data.length; j++) {
		//					if(data[j].id == morediv[i].id) {
		//						data.splice(j, 1);
		//						j--;
		//					}
		//				}
		//				oDiv1.removeChild(morediv[i]);
		//				i--;
		//				mChild.onOff == true;
		//			}
		//		}
		//		oRename.style.display = 'block';
}

function deletediv() {
	for(var i = 0; i < morediv.length; i++) {
		var mChild = morediv[i].children[0].children[0];
		if(mChild.onOff == false) {
			for(var j = 0; j < data.length; j++) {
				if(data[j].id == morediv[i].id) {
					data.splice(j, 1);
					j--;
				}
			}
			oDiv1.removeChild(morediv[i]);
			i--;
			mChild.onOff == true;
		}
	}
	oRename.style.display = 'block';
}
//重命名
oRename.onclick = function() {
	rname();
	//	var rName = null;
	//	for(var i = 0; i < spans.length; i++) {
	//		if(spans[i].onOff == false) {
	//			oDiv2.style.display = 'block';
	//			oDiv2.style.left = spans[i].parentNode.offsetLeft + 'px';
	//			oDiv2.style.top = spans[i].parentNode.offsetTop + 'px';
	//			rName = spans[i].parentNode.parentNode;
	//			oBox.value = divname[i].innerHTML;
	//		}
	//	}
	//	console.log(data)
	//		//重命名确定
	//	oSure.onclick = function() {
	//			var value = oBox.value;
	//			for(var i = 0; i < data.length; i++) {
	//				if(value == data[i].name) {
	//					alert('不能重名');
	//					return;
	//				}
	//			}
	//			rName.name = value;
	//			rName.children[1].children[0].innerHTML = value;
	//			rName.className = 'more_div';
	//			rName.children[0].className = 'div_img';
	//			rName.children[0].children[0].onOff = true;
	//
	//			for(var i = 0; i < data.length; i++) {
	//				if(data[i].id == rName.id) {
	//					data[i].name = value;
	//				}
	//			}
	//
	//			oDiv2.style.cssText = '';
	//		}
	//		//重命名取消
	//	oCancel.onclick = function() {
	//		oDiv2.style.cssText = '';
	//	}
}

function rname() {
	console.log(oDiv2.onOff)
	if(oDiv2.onOff == false) {
		return;
	}
	
	var rName = null;
	for(var i = 0; i < spans.length; i++) {
		if(spans[i].onOff == false) {
			oDiv2.style.display = 'block';
			oDiv2.style.left = spans[i].parentNode.offsetLeft + 'px';
			oDiv2.style.top = spans[i].parentNode.offsetTop + 'px';
			rName = spans[i].parentNode.parentNode;
			oBox.value = divname[i].innerHTML;
		}
	}
	//重命名确定
	oSure.onmousedown = function(e) {
			var value = oBox.value;
			if(value == '') {
				alert('内容不能为空');
				return;
			}
			for(var i = 0; i < data.length; i++) {
				if(value == data[i].name) {
					alert('不能重名');
					return;
				}
			}
			rName.name = value;
			rName.children[1].children[0].innerHTML = value;
			rName.className = 'more_div';
			rName.children[0].className = 'div_img';
			rName.children[0].children[0].onOff = true;

			for(var i = 0; i < data.length; i++) {
				if(data[i].id == rName.id) {
					data[i].name = value;
				}
			}

			oDiv2.style.cssText = '';
			oDiv2.onOff = true;
			e.cancelBubble = true;
		}
		//重命名取消
	oCancel.onclick = function() {
		oDiv2.style.cssText = '';
		oDiv2.onOff = true;

	}
	var arronOff = [];
	for (var i = 0; i < spans.length; i++) {
		if(spans[i].onOff == false){
			arronOff.push(spans[i])
		}
	}
	if(arronOff.length>0){
		oDiv2.onOff = false;
	}
}

oShow.oncontextmenu = function(e) {
	var x = e.clientX;
	var y = e.clientY;
	menu.style.left = x + 'px';
	menu.style.top = y + 'px';
	menu.style.display = 'block';
	return false;
}
document.onclick = function() {
	if(menu.style.display == 'block' || divmenu.style.display == 'block') {
		menu.style.display = 'none'
		divmenu.style.display = 'none'
	}
}
menuchild[0].onclick = function() {
	newdocument();
}