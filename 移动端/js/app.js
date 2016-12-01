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
var tag = ['服务好', '景色赞', '千篇一律', '看人海', '挤爆了', '服务好', '态度好', '景色赞', '服务好', ]
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
//5s后 首页消失
setTimeout(function(){
	
		$('.welcome').fadeOut('slow',function(){
			$('.showpage').fadeIn('slow');
		});
		
		
},5000)

//滚动图<section class="showpage"> 数据arrimg
$(arrimg).each(function(i) {
	$('<li></li>').append($('<img>').attr('src', arrimg[i].src)).appendTo($('.tab ul'));
	$('.picMask nav').append($('<span>'));
});
var w = $('.tab li').width;
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
	console.log(oScorea)
	for(var i = 0; i < oScorea.length; i++) {
		oScorea[i].index = i;
		oScorea[i].onclick = function() {
			for(var i = 0; i < oScorea.length; i++) {
				if(i <= this.index) {
					oScorea[i].style.backgroundPositionX = 0;
				} else {
					oScorea[i].style.backgroundPositionX = '-1rem';
				}
			}
		}
	}
}

//添加标签<seciton class= 'tag'> ;数据tag
$(tag).each(function(index) {
	$('<li>').append($('<input>').attr('type', 'radio')).append($('<span>').html(tag[index])).appendTo($('.tag ul'))
});
$('.tag li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
