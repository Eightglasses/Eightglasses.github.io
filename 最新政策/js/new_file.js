var policyList = {};


policyList.navtab = function(){
	$('.newpolicy_nav').on('touchstart','li',function(){
		var index = $(this).attr('val');
		$(this).addClass('active').siblings().removeClass('active');
		$('.demobox .demo').eq(index-1).show().siblings().hide();
	})
}
policyList.navtab()
