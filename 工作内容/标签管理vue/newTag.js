var cdo = [{
    userName: '张1',
    userPhone: '13388999881',
    userId: '1'
}, {
    userName: '张2',
    userPhone: '13388999882',
    userId: '2'
}, {
    userName: '张3',
    userPhone: '13388999883',
    userId: '3'
}, {
    userName: '张4',
    userPhone: '13388999884',
    userId: '4'
}, {
    userName: '张5',
    userPhone: '13388999885',
    userId: '5'
} ]


/**
 * 去选择客户
 */
function goToselect() {
    $(document).on('click', '.goToselect', function () {
        $('.select').css({
            'left': 0
        });
        $('.newtag').css('left', -10 + "rem");
        $('.select header').css('z-index', '10000')
    })
}
goToselect();

/**
 * 删除已选
 */
function goDelete() {
    $(document).on('click', '.goTodelete', function () {
        $('.newtag-person-list .person-list-li').addClass('active');
    })
    $(document).on('click', '.newtag-person-list .active', function () {
        $(this).remove();
    })
}
goDelete()
/**
 * 选择完客户返回
 */
function selectOk() {
    $(document).on('click', '.selectok', function () {

        $('.select').css({
            'left': 7.5 + 'rem'
        });
        $('.newtag').css('left', 0 + "rem");
        $('.select header').css('z-index', '99');
    })
}
selectOk();
/**
 * 选择客户列表
 */
function selectList() {
    $(document).on('click', '.selectcustomers-list-li', function () {
        var indexs = $(this).attr('index');
        if (indexs != 1) {
            $(this).attr('index', '1');
        } else {
            $(this).attr('index', '0');
        }
        noGou();
    })
    /**
     * 如果index：1，img链接改变
     */
    function noGou() {
        $('.selectcustomers-list-li').each(function (index, item) {
            if ($(item).attr('index') == 1) {
                $(item).find('img').attr('src', 'img/gou.png');
            } else {
                $(item).find('img').attr('src', 'img/nogou.png');
            }
        })
    }

}
selectList();