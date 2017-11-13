window.onload = function () {
    //按日统计，按月统计，放在项目中tap替换click
    $('.trend-showTable-div1 div').on('click', function () {
        var thisId = $(this).attr('id');
        $(this).addClass('active').siblings().removeClass('active');
        if (thisId == 'dayStatistics') {
            $('.trend-showTable-div4').addClass('month').removeClass('years');
            //在这加载按日统计数据

        } else if (thisId == 'monthStatistics') {
            $('.trend-showTable-div4').addClass('years').removeClass('month');
            //在这加载按月统计数据
        };
    });
    //近7天，近30天...
    $('.div4-1 span').on('click', function () {
        //在这加选择参数

        $(this).addClass('active').siblings().removeClass('active');
    });
    //选择框显示
    $('.trend-showTable-div2').on('click', function () {
        $('.trend-chosetype').show();
        $('.maskAll').show();
    });
    //点击选择框
    $('.trend-chosetype li').on('click', function () {
        //在这加选择操作



        $(this).addClass('active').css('background', '#f2f2f2').siblings().removeClass('active');
        setTimeout(function () {
            closeTag();
            $('.trend-chosetype li').css('background', '');
        }, 100);
    });

    function closeTag() {
        $('.maskAll').hide();
        $('.trend-chosetype').hide();
    }
};