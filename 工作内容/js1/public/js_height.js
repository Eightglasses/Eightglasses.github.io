var winWidth = 0; 
var winHeight = 0; 
function findDimensions() //函数：获取尺寸 
{ 
//获取窗口宽度 
if (window.innerWidth) 
winWidth = window.innerWidth; 
else if ((document.body) && (document.body.clientWidth)) 
winWidth = document.body.clientWidth; 
//获取窗口高度 
if (window.innerHeight) 
winHeight = window.innerHeight; 
else if ((document.body) && (document.body.clientHeight)) 
winHeight = document.body.clientHeight; 
//通过深入Document内部对body进行检测，获取窗口大小 
if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) 
{ 
winHeight = document.documentElement.clientHeight; 
winWidth = document.documentElement.clientWidth; 
} 
//结果输出至两个文本框 
} 
findDimensions(); 
//调用函数，获取数值 
window.onresize=findDimensions; 
function loadAddButton(id){
	// window.onload=function(){
		 var d1=document.getElementById(id);
		 var h1=d1.clientHeight+d1.scrollHeight;
		 var h2=d1.offsetHeight+40;
		 var wheight = winHeight;
		 
		 if(h2<wheight){
			// alert(wheight);
			// alert("wheight："+wheight);
			// alert("wheight："+wheight);
		 	document.getElementById(id).style.height=wheight+"px";
		 }else {//alert("h2："+h2);
		 	document.getElementById(id).style.height=h2+"px";
		 }
		//}
}




function loadAddlist(id,height){
	 findDimensions(); 
	 var wheight = winHeight - height;
	 document.getElementById(id).style.height=wheight+"px";
}
function bodyheight(){
	findDimensions();
	var body = document.getElementsByTagName("body")[0];
	body.style.height=winHeight+"px";
}

function getBodyheight(){
	findDimensions();
	return winHeight;
}
jQuery(function(){
	bodyheight();	
	addEvent(window, 'resize', function () {
		setTimeout(function(){			
			bodyheight();			
		},300);		
	});
});
function addEvent(e, n, o){
	if(e.addEventListener){
	 	e.addEventListener(n, o,false);
	} else if(e.attachEvent){
		e.attachEvent('on' + n, o);
	}
}