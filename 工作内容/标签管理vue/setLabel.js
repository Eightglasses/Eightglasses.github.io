/**
 * 需求：
 * 1，获取客户经理下所有标签--         数组1
 * 
 * 2，获取当前客户被标注标签--         数组2
 * 
 * 3，当点击客户经理下所有标签（数组1）时，数组2添加此条数据。
 * 
 * 4，当input输入内容并回车时，数组2添加value，并判断数组1内有没有，如果有，数组1内同样元素变色
 * 
 * 5，当点击数组2时，可以删除本条数据
 * 
 * 6，点击提交，判断出哪些是新增的数据，哪些是删除的数据,最终都会进入数组1
 * 
 */


/**
 * ajax1:客户经理有的所有标签
 * ajax2:查看当前客户有的标签
 * 关系:ajax2有的数据必然在ajax1内
 */

var ajax1 = [{ //所有标签
        lUserId: 1,
        strName: '名一'
    },
    {
        lUserId: 2,
        strName: '名二'
    },
    {
        lUserId: 3,
        strName: '名三'
    },
    {
        lUserId: 4,
        strName: '名四'
    },
    {
        lUserId: 5,
        strName: '名五'
    }
];
var ajax2 = [{ //当前标签
        lUserId: 2,
        strName: '名二'
    },
    {
        lUserId: 3,
        strName: '名三'
    },
    {
        lUserId: 5,
        strName: '名五'
    }
];

var Label = new Vue({
    el: '#set-label',
    data: {
        nowData: ajax2,
        allData: ajax1
    },
    methods: {
        setNowData: function (event) {
            var nowValue = event.currentTarget.value.trim();
            this.$refs.nowInput.value = '';
            var alreadyhave = this.nowData.map(function (item, index, arr) {
                if(nowValue !=item.strName){
                    return false;
                }else{
                    return true;
                }
            })
            if (nowValue != "" && nowValue.length < 12) {
                if(alreadyhave == 'true'){
                    console.log(1)
                }else{
                    console.log(2)
                }
                this.nowData.push({
                    lUserId: '',
                    strName: nowValue
                })
            }

        }
    }

})