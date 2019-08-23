
    //选择全部菜品
    $(".select-all-checkbox").click(function () {
        $(this).toggleClass("active");
        if ($(this).hasClass('active')){
            $('.checkbox').addClass('onactive');
        }else {
            $('.checkbox').removeClass('onactive');
        }

    });

    //分类选择按钮
    var checkBoxLen = $(document).find('.checkbox').length;
    $(document).on("click", ".checkbox", function () {
        $(this).toggleClass("onactive");
        var activeLen = $('.onactive').length;
        if (activeLen == checkBoxLen){
            $(".select-all-checkbox").addClass('active');
        } else{
            $(".select-all-checkbox").removeClass('active');
        }
    });

    //拖拽
    move("#move");

    $('.food-li-box').each(function(i,item){
        $(this).attr('id','food-li-box'+ i);
    });

    $('.food-li-box').each(function(){
        var mid = $(this).attr('id');
        move('#'+mid)
    });


    function move(ids) {
        'use strict';

        var byId = function (id) {
                return document.querySelector(id);
            },

            loadScripts = function (desc, callback) {
                var deps = [],
                    key, idx = 0;

                for (key in desc) {
                    deps.push(key);
                }

                (function _next() {
                    var pid,
                        name = deps[idx],
                        script = document.createElement('script');

                    script.type = 'text/javascript';
                    script.src = desc[deps[idx]];

                    pid = setInterval(function () {
                        if (window[name]) {
                            clearTimeout(pid);

                            deps[idx++] = window[name];

                            if (deps[idx]) {
                                _next();
                            } else {
                                callback.apply(null, deps);
                            }
                        }
                    }, 30);

                    document.getElementsByTagName('head')[0].appendChild(script);
                })()
            },

            console = window.console;


        // if (!console.log) {
        //     console.log = function () {
        //         alert([].join.apply(arguments, ' '));
        //     };
        // }


        Sortable.create(byId(ids), {
            group: ids,
            animation: 150,
            store: {
                get: function (sortable) {
                    var order = localStorage.getItem(sortable.options.group);
                    return order ? order.split('|') : [];
                },
                set: function (sortable) {
                    var order = sortable.toArray();
                    localStorage.setItem(sortable.options.group, order.join('|'));
                }
            },
            onAdd: function (evt) {
               // console.log('onAdd.foo:', [evt.item, evt.from]);
            },
            onUpdate: function (evt) {
               // console.log('onUpdate.foo:', [evt.item, evt.from]);
            },
            onRemove: function (evt) {
              //  console.log('onRemove.foo:', [evt.item, evt.from]);
            },
            onStart: function (evt) {
               // console.log('onStart.foo:', [evt.item, evt.from]);
            },
            onSort: function (evt) {
               // console.log('onStart.foo:', [evt.item, evt.from]);
            },
            onEnd: function (evt) {
               // console.log('onEnd.foo:', [evt.item, evt.from]);
            }
        });
    }

    //小程序点餐管理使用说明弹框
    $('.tips-icon').click(function(){
        $('.mask-explain').show();
    });

    //小程序点餐管理使用说明 按钮 知道了
    $('.btn-know').click(function(){
        $('.mask').hide();
    });

    //所有x 按钮点击关闭弹框
    $('.mask-title span').click(function(){
        $('.mask').hide();
    });

    //菜品标签点击切换样式
    $('.dishIcon-list').on('click','li',function(){
        $(this).toggleClass('active');
    });

    //菜品标签按钮点击出弹框
    $('.tab1').click(function(){
        $('.mask-dishIcon').show();
    });

    //上下架菜按钮点击出弹框
    $('.tab2').click(function(){
        $('.mask-racks').show();
    });

    //售卖时间按钮点击出弹框
    $('.tab3').click(function(){
        $('.mask-time').show();
    });

    //发布餐单按钮点击出弹框
    $('.tab4').click(function(){
        $('.mask-menu').show();
    });

    //上下架菜选择批量设置按钮
    $('.choise-data').on('click','em',function(){
        $(this).parent().addClass('oncheck').siblings().removeClass('oncheck');
    });

    //售卖时间 点击加号生成新的一列时间选择
    $(document).on('click','.btn-addTime',function(){
        var inputTimeHtml = '<div class="dialog-time">';
        inputTimeHtml += '  <div class="choiseTime time1">';
        inputTimeHtml += '      <div class="timeTxt timeTxt1">00:00</div>';
        inputTimeHtml += '  </div>';
        inputTimeHtml += '  <em></em>';
        inputTimeHtml += '  <div class="choiseTime time2">';
        inputTimeHtml += '      <div class="timeTxt timeTxt2">23:59</div>';
        inputTimeHtml += '  </div>';
        inputTimeHtml += '  <div class="btn-jianTime"></div>';
        inputTimeHtml += '</div>';

        $(this).parent().parent().append(inputTimeHtml);
    });

    $(document).on('click','.btn-jianTime',function(){
        $(this).parent().remove();
    });

    //时间选择插件
    $("#input1").shijian();
    $("#input2").shijian();

    //首页导航点击下拉
    $('.dc-nav-select').click(function(){
        $('.ul-downlist').toggle();
    });
    $('.ul-downlist').on('click','li',function(){
        var thisTxt = $(this).html();
        $('.dc-nav-select p').html(thisTxt)
        $(this).addClass('active').siblings().removeClass('active');
        $('.ul-downlist').hide();
    });

    //input键盘收拾的时候页面滚动到顶部
    $(document).on('blur','.timeTxt',function(){
        document.body.scrollTop = 0;
        $("html,body").animate({scrollTop: document.documentElement.clientHeight},500);
    });

    //时间控件
    $(document).on('click','.timeTxt1',function(event){
        timePacker($(this),event)
    });
    $(document).on('click','.timeTxt2',function(event){
        timePacker($(this),event)
    });

    //判断开始时间大于结束时间
    $('.time-sure').on('click',function(){
        $('.mask-content').find('.dialog-time').each(function(){
            var startTime = $(this).find('.timeTxt1').html();
            var endTime = $(this).find('.timeTxt2').html();
            var stime = startTime.split(':')[0] + startTime.split(':')[1];
            var etime = endTime.split(':')[0] + endTime.split(':')[1];
            console.log(Number(stime),Number(etime))
            if (Number(stime) > Number(etime)) {
                Util.tips('请填写正确的营业时间',600);
            }
        });
    });

    //点击状态
    $('.food-li-box').on('click','.food-li-cont',function () {
        $(this).toggleClass('active')
    });

    //电梯效果
    var tarTop = $('.food-li');
    var dcHeader = $('.dc-header').outerHeight(true);
    var dcNav = $('.dc-nav').outerHeight(true);
    var navTotal = Number(dcHeader) + Number(dcNav);
    $.each(tarTop, function () {
        var indexTop = $(this).offset().top;//每级距最上的高度
        $(this).attr("data-top", indexTop - navTotal);
    });

    /*点击左侧菜单导航到相应的菜品*/
    $('.dc-content-left').on('click', 'p', function () {
        var cid = $(this).attr('class_id');   //左侧存下的classid
        var tarTop = $('.food-li[class_id='+ cid +']').attr('data-top');
        $(this).addClass('active').siblings().removeClass('active');
        $('.food-list').animate({scrollTop: tarTop}, 500);
    });

    var tarNum = 0;
    /*菜单餐品滑动效果*/
    $('.food-list').scroll(function (e) {
        var eScroll = e.currentTarget.scrollTop;
        $('.food-li').each(function (i, item) {
            var target = parseInt($(this).data('top'));
            var classId = $(this).attr('class_id');
            if (eScroll > target) {
                tarNum = i;
            }
            if (eScroll > target) {
                $('.dc-content-left p').removeClass('active');
                $('.dc-content-left p[class_id='+ classId +']').addClass('active');
            }
        });
    });






