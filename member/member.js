//添加勾选
$("li[show]").on("click", function () {
    var len = $(".modal-body li.active").length;
    if (len == 10) {
        alert("最对只能选择10条")
        return
    }
    $(this).addClass("active");
})
//确认添加
$("#showbtn").on("click", function () {

    $("[showtemp]").hide();
    $(".modal-body li.active").each(function () {
        var show = $(this).attr("show");
        $("[showtemp=" + show + "]").css("display", "flex")
    })
    bindDatetimepicker();
})
//单条删除
$(document).on('click', ".app-del", function () {
    var cloneTemp = $(this).parents("[showtemp]").find("[cloneTemp]").eq(0);
    var cloneTempAttr = cloneTemp.attr("cloneTemp");
    var temp = $(this).parents("[showtemp]").eq(0);
    var thisAttr = temp.attr("showtemp");

    if (cloneTempAttr == undefined) {
        if ($("[showtemp=" + thisAttr + "]").length > 1) {
            temp.remove();
        } else {
            temp.hide();
            temp.find("input").val("")
            temp.find("[type='checkbox']").prop("checked", false)
            temp.find("[radio]").removeAttr("checked")
            temp.find("select").val("")
            $("[show=" + thisAttr + "]").removeClass("active")
        }
    } else if (cloneTempAttr == "all") {
        var len = $(this).parents("[showtemp]").find("[cloneTemp]").length;
        if (len > 1) {
            $(this).parents("[cloneTemp]").remove();
        } else {
            temp.hide();
            temp.find("input").val("")
            temp.find("[type='checkbox']").prop("checked", false)
            temp.find("[radio]").removeAttr("checked")
            temp.find("select").val("")
            $("[show=" + thisAttr + "]").removeClass("active")
        }
    } else if (cloneTempAttr == "single") {
        var len = $(this).parents("[showtemp]").find(".member-border-right").length;
        if (len > 1) {
            $(this).parents(".member-border-right").remove();
        } else {
            temp.hide();
            temp.find("input").val("")
            temp.find("[type='checkbox']").prop("checked", false)
            temp.find("[radio]").removeAttr("checked")
            temp.find("select").val("")
            $("[show=" + thisAttr + "]").removeClass("active")
        }
    }    
    delName(temp, cloneTempAttr)
})
function resetValue(ele) {
    console.log(ele);

    ele.each(function (i, j) {
        $(j).find("option:selected").attr("selected", false);
        $(j).find("option").first().attr("selected", true);
    })
}
//单条添加
$(document).on("click", ".app-add", function () {
    var cloneTemp = $(this).parents("[showtemp]").find("[cloneTemp]").eq(0);
    var cloneTempAttr = cloneTemp.attr("cloneTemp");
    if (cloneTempAttr == "all") {
        cloneTemp.after(cloneTemp.clone())
    }
    else if (cloneTempAttr == "single") {
        cloneTemp.find(".member-border-right").eq(-1).after(cloneTemp.find(".member-border-right").eq(0).clone())
    }
    else if (cloneTempAttr == undefined) {
        $(this).parents("[showtemp]").after($(this).parents("[showtemp]").eq(0).clone())
    }
    bindDatetimepicker();
    delName($(this).parents("[showtemp]"), cloneTempAttr)
})


//重复绑定日期插件
function bindDatetimepicker() {
    $('.datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn'),
        defaultDate: "1990-1-1"
    });
}
//显示单项最后一个添加
function delName(parents, type) {
    if (type == undefined) {
        $("[showtemp]").each(function () {
            var thisAttr = $(this).attr("showtemp");
            $(this).find(".app-add").hide()
            $("[showtemp=" + thisAttr + "]").eq(-1).find(".app-add").show();

        })
    } else {
        parents.find(".app-add").hide();        
        parents.find(".app-add").eq(-1).show();
    }
}
//固定时间，相对时间互相切换
$(document).on("click", ".timeSelect p", function () {
    $(this).parent().hide().siblings().show();
})
//显示来源
$(document).on("click", ".sourcebtn .sourcebtn-p", function () {
    console.log($(this).parent().find(".source-shadow"));
    $(this).parent().find(".source-shadow").toggle();
})
//点击来源
$(document).on("click", ".source-click", function () {
    $(this).toggleClass("active");
    var str = "";
    $(".source-click.active").each(function () {
        str += $(this).html() + "&nbsp";
    });
    if (str == "") str = "请选择";
    $(".sourcebtn-p").html(str)
})
//点餐联动
$(document).on("change", "#order-select,#discount-select,#unber-select,#level-select", function () {
    var index = $(this).find("option:selected").attr("index");
    $(this).parent().find("[indexshow]").hide();
    $(this).parent().find("[indexshow=" + index + "]").css("display", "flex");
})
//
$(".back").on("click", function () {
    window.history.go(-1)
})


$(".ok").on("click", function () {
    $(".member-border").each(function () {

        if ($(this).css("display") == "flex") {
            var str = "";
            str += $(this).children("label").text() + ":"
            $(this).find("[needtakedata]").each(function () {
                var thisType = $(this).attr("needtakedata")

                if (thisType == "select" && $(this).parent().css("display") != "none") {

                    str += $(this).find("option:selected").text()

                }
                if (thisType == "input" && $(this).parent().css("display") != "none") {
                    str += $(this).val()

                } if (thisType == "text" && $(this).parent().css("display") != "none") {
                    str += $(this).text()

                }


                if (thisType == "checkbox" && $(this).prop("checked") == true && $(this).parent().css("display") != "none") {


                    str += $(this).next().text();
                }

            })
            console.log(str);


        }

    })


    return
    var num = 0;
    $(".member-border").each(function () {
        if ($(this).css("display") == "flex") {
            var input = $(this).find("input");
            var select = $(this).find("select");
            var checkbox = $(this).find("input[type=checkbox]")
            if (input) {
                input.each(function () {
                    if ($(this).val() == "" && $(this).css("display") != "none" && $(this).parent().css("display") != "none") {
                        console.log(input.parent());
                        num++;
                    }
                })
            }
            if (select) {
                select.each(function () {
                    if ($(this).find("option:selected").html().trim() == "请选择") {
                        num++
                    }
                })
            }
            if (checkbox) {
                var checkboxnum = 0;
                checkbox.each(function () {
                    if ($(this).prop("checked") == true) {
                        checkboxnum++;
                    }
                })

                if (checkboxnum == 0) {
                    num++
                }
            }
        }

    })
    if (num > 0) {
        alert('填写完整')
        console.log('填写完整');

        return
        mm
    }
})