var logo = document.querySelector('#logo');
var showpage = document.querySelector('.showpage');
var arrimg = [{
	src: 'img/1.jpg',
	title: '阳光河边垂柳树'
}, {
	src: 'img/2.jpg',
	title: '海边观赏风景'
}, {
	src: 'img/3.jpg',
	title: '金毛趴在海边看风景'
}, {
	src: 'img/4.jpg',
	title: '水库旁的杨树'
}, {
	src: 'img/5.jpg',
	title: '一只孤舟'
}];

var welcome = document.querySelector('.welcome');
var oTab = document.querySelector('.tab');
var tabChild = oTab.children[0].children;
//手机左右晃动，整体移动的效果
window.addEventListener('deviceorientation', function(e) {
	var x = Math.round(e.beta);
	var y = Math.round(e.gamma);
	var z = Math.round(e.alpha);
	if(y < 0) {
		welcome.style.transform = 'translateX(' + y + 'px)'
	}
	if(y > 0) {
		welcome.style.transform = 'translateX(' + y + 'px)'
	}
});
//滚动图
$(arrimg).each(function(i) {
	$('<li></li>').append($('<img>').attr('src', arrimg[i].src)).appendTo($('.tab ul'));
	$('.picMask nav').append($('<span>'));
});
var w = document.documentElement.offsetWidth;
var time = null;
var i = 0;
$('.picMask p').html(arrimg[0].title);
$('.picMask span').eq(0).addClass('active');
time = setInterval(function() {
	i++;
	if(i > 4) {
		i = 0;
	}
	$('.picMask span').eq(i).addClass('active').siblings().removeClass('active')
	$('.picMask p').html(arrimg[i].title);
	$(".tab ul").css("left", -w * i + 'px');
}, 2000)

//添加评分的星星
var oScore = document.querySelector('.score');
var oScorespan = document.querySelectorAll('.score span');
for(var i = 0; i < oScorespan.length; i++) {
	star(i);
}
//每个span下的子集都添加星星的方法
function star(index) {
	var oScorea = oScorespan[index].children;
	for(var i = 0; i < oScorea.length; i++) {
		oScorea[i].index = i;
		oScorea[i].onclick = function() {
			for(var i = 0; i < oScorea.length; i++) {
				if(i<=this.index){
					oScorea[i].style.backgroundPositionX = 0;
				}else{
					oScorea[i].style.backgroundPositionX = '-1rem';
				}
			}
		}
	}
}
