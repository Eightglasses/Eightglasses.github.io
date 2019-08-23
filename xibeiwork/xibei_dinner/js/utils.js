var Util = {
    tips: function(msg, millisec){
        var w = $(window),
            at = $('.ui-tips');
//        $('#loading').hide();
        if (typeof millisec == 'undefined') {
            millisec = 1500;
        }
        if (millisec == 'show') {
            at.text(msg)
                //.css('left',( w.width() - at.innerWidth() ) / 2)
                .stop(true,true).show(0);
        } else if (millisec == 'hide') {
            at.text('').hide();
        } else {
            at.text(msg)
                //.css('left',( w.width() - at.innerWidth() ) / 2)
                .stop(true,true).show(0).delay(millisec).fadeOut(500);
        }
    },
                        
    /**
     * 获取URL参数值
     * @param {type} name
     * @returns {unresolved}
     */
    getUrlParam: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg);  
        if (r != null) return decodeURI(r[2]); return null;
    },
    
    getRequest: function() {  
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }, 
    
    /**
     * 格式化会员卡卡号
     * @param {type} cardNo
     * @returns {unresolved}
     */
    formatCardNo: function(cardNo) {
        if (cardNo.length <= 10) {
            return cardNo;
        }
        if (cardNo.length == 13) {
            return cardNo.replace(/(\d{4})(\d{4})(\d{5})/g,"$1-$2-$3");
        }
        return cardNo.replace(/(\d{4})(?=\d)/g,"$1-");
    },
    
    /**
     * 格式化时长
     *
     * @param int   time  时长单位为秒
     * @return string 12:05
     */
    formatTime: function(time) {
        var i = 0,
            s = parseInt(time);
        if (s > 60) {
            i = parseInt(s / 60);
            s = parseInt(s % 60);
        }
        return this.strPad(i, 2) + ':' + this.strPad(s, 2);
    },

    /**
     * 使用另一个字符串填充字符串为指定长度 
     * @todo pad_string长度大于1后处理
     *
     * @param string num
     * @param int    n
     * @return string
     */
    strPad: function(input, pad_length, pad_string, pad_type) {
        var pad_string = pad_string || '0';
        var pad_type   = pad_type || 'left';
        var i = (input + '').length;
        while (i++ < pad_length) {
            if (pad_type == 'left') {
                input = pad_string + input;
            } else {
                input = input + pad_string
            }
        }
        return input;
    },

    /**
     * 格式化日期
     *
     * @param string format    日期格式 (yyyy-MM-dd hh:mm:ss)
     * @param int    timestamp 时间戳
     * @return string
     */
    formatDate: function(format, timestamp) {
        if (!timestamp) {
            timestamp = new Date().getTime();
        }

        var d = new Date(parseInt(this.strPad(timestamp, 13, '0', 'right')));
        var date = {
            "M+": d.getMonth() + 1,
            "d+": d.getDate(),
            "h+": d.getHours(),
            "m+": d.getMinutes(),
            "s+": d.getSeconds(),
            "q+": Math.floor((d.getMonth() + 3) / 3),
            "S+": d.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    },

    /**
     * 计算字符串长度
     *
     */
    getStrLen: function(str){
        return str.replace(/[^\x00-\xff]/g, "3p").length;
    },

    /**
     * 字符串截取
     *
     * @param string     字符串
     * @param textLength 截取长度 
     * @return string
     */
    truncateText: function(str, textLength) {
        var length = textLength || 12;
        if (str) {
            var f = str.substr(0, length);
            if (f.length < str.length) {
                f += "..."
            }
            return f;
        }
        return str;
    },
    transSpecialSymbol:function(str){
    	var htmlChar="&<>";
    	if(null == str ||"undefined" == typeof(str) || ""==str ){
    		return str;
    	}
    	var temstr=str;
    	var strArr = temstr.split(''); 
    	for(var i = 0; i< temstr.length;i++){
    		if(htmlChar.indexOf(str.charAt(i)) !=-1){
    			switch (str.charAt(i)) { 
    			case '<':
    				strArr.splice(i,1,'&#60;'); 
    				break;
    			case '>':
    				strArr.splice(i,1,'&#62;'); 
    				break; 
    			case '&':
    				strArr.splice(i,1,'&#38;'); 
    			}
    			
    		}
    		
    	}
    	
    	return strArr.join('');	
    },
    
    /**
     * 计算天数差的函数
     * 
     * @param {type} sDate1 时间2006-12-18格式
     * @param {type} sDate2
     * @returns {Util.dateDiff.iDays}
     */ 
    dateDiff: function(sDate1, sDate2){    //sDate1和sDate2是2006-12-18格式  
        var  aDate, oDate1, oDate2, iDays;
        aDate  =  sDate1.split("-");
        oDate1  = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); //转换为12-18-2006格式  
        aDate  =  sDate2.split("-");
        oDate2  = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); 
        iDays  =  parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数  
        return iDays;
    }, 
    
    /**
     * 轮询
     *
     * milliSec：每隔多少毫秒轮询一次
     * maxTimes：最多轮询多少次
     *
     */
    loop: function(fn, milliSec, maxTimes) {
        milliSec = milliSec || 10000;
        maxTimes = maxTimes || 2;
        var _interval = -1;
        var instance = {
            times: 0
        };

        var exec = function() {
            if (instance.times >= maxTimes) {
                instance.stop();
            } else {
                fn();
                if (instance && typeof instance.times == 'number') {
                    instance.times++;
                }
            }
        };

        instance.start = function() {
            exec();
            _interval = window.setInterval(function() {
                exec();
            }, milliSec);
        };
        instance.stop = function() {
            _interval = window.clearInterval(_interval);
            instance = null;
        };

        instance.pause = function() {
            _interval = window.clearInterval(_interval);
        };

        instance.pause();
        instance.start();

        return instance;
    },
    /**
     *
     * @param dataStr string 2018-04-12
     * @returns {string}
     */
    formatWeek:function (dataStr) {
        dataStr = new Date().getFullYear() + '-' + dataStr;
        var weekStr = '';
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var myDate = new Date(Date.parse(dataStr.replace(/-/g, "/")));
        var todayStr = "周" + "日一二三四五六".charAt(new Date().getDay());

        if (todayStr === weekDay[myDate.getDay()]) {
            weekStr = '今天';
        } else {
            weekStr = weekDay[myDate.getDay()];
        }

        return weekStr;
    },
    /**
     * 过滤emoji表情
     * @param str
     * @returns {XML|string|void|*}
     */
    filterEmoji: function (str) {
        var ranges = [
            '\ud83c[\udf00-\udfff]',
            '\ud83d[\udc00-\ude4f]',
            '\ud83d[\ude80-\udeff]'
        ];
        emojireg = str.replace(new RegExp(ranges.join('|'), 'g'), '');
        return emojireg;
    }
}
