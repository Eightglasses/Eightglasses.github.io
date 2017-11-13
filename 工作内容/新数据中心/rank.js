window.onload = function () {
    //放到项目后把所有click改成tap
    function rankTopBind() {
        //点击父级
        $('.rank-top-div1 p').on('click', function (event) {
            event.stopPropagation();
            var thisOnoff = $(this).attr('onOff');
            var _index = Number($(this).attr('index'));
            if (thisOnoff == 'true') {
                $('.rank-top-div2,.mask').hide();
                $(this).attr('onOff', "false");
            } else {
                $('.rank-top-div2,.mask').show();
                $(this).attr('onOff', "true").siblings().attr("onOff", 'false');
            };
            upDown($(this));
            $('.rank-top-div2 ul').eq(_index).show().siblings().hide();
        });
        //选择子项
        $(".rank-top-div2 ul").on('click', "li", function (event) {
            event.stopPropagation();
            var _index = $(this).parent().attr('index');
            var _html = $(this).html();
            $('.rank-top-div1 span').eq(_index).html(_html);
            $('.rank-top-div1 p').attr('onOff', 'false')
            $('.rank-top-div2,.mask').hide();
            upDown();
            //在这后边加载数据


        });

    };
    rankTopBind();

    function upDown(_this) {
        _this = _this || '';
        var divDisplay = $('.rank-top-div2').css('display');
        if (divDisplay == 'block') {
            _this.addClass('active').siblings().removeClass('active');
        } else {
            $('.rank-top-div1 p').removeClass('active');
        };
    };
    $(document).on('click', function () {
        if ($('.rank-top-div2').css('display') == 'block') {
            $('.rank-top-div2').css('display', 'none')
            $('.rank-top-div2,.mask').hide();
            upDown();
        }

    })
};