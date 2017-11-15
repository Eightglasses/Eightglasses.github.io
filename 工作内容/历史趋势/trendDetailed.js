//使用时click全部替换为tap
//点击chose-fenlei-p弹出选择框
$(".chose-fenlei .chose-fenlei-p").on('click', function () {
    $('.trend-chosetype').show();
    $(".maskAll").show();
})

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

//点击list
$('.detailed-list .list-li').each(function (index, item) {
    $(item).attr('onOff', 'true');
    $(item).on('click', function () {
        if ($(item).attr('onOff') == 'true') {
            $('.detailed-list .li-bottom').eq(index).show();
            $(item).attr('onOff', 'flase');
        } else {
            $('.detailed-list .li-bottom').eq(index).hide();
            $(item).attr('onOff', 'true');
        }
    })
})