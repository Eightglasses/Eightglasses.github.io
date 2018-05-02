	var _public = {};
	/**
	 * 获取通过URL传递的参数
	 * @param {} name	key
	 * @return {}
	 */
	_public.getQueryString=function(name) {
		try 
		{
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var search = window.location.search;
			var r = window.location.search.substr(1).match(reg);
			if(r!=null)return  unescape(r[2]); return null;
		}
		catch(e)
		{
			_thisForm_.info("系统错误：-0008009");
		}
	};
	
	/**
	 * 绑定事件方法
	 * @param {} a  dom对象或者id  
	 * @param {} b  URL
	 * @param {} c  参数
	 */
	_public.addOpenEvent = function(a,b,c){
		try {
			c = c || "";
			var a = ((typeof a === 'string') && a.constructor==String) ? document.getElementById(a) : a;
			if(a){
				a.addEventListener("tap",function(){
					_thisForm_.openForm("file://"+b,"",0,"",1);				
				},false);
			}
		}catch(e){
			_thisForm_.info("系统错误：-0008009");
		}
	}
	
	/**
	 * 获取dom对象
	 * @param {} id
	 * @return {}
	 */
	_public.get=function(id){
		return document.getElementById(id);
	}
	
	/**
	 * 显示div
	 * @param {} dom  dom对象或者id
	 * @param {} flag true-显示;false-隐藏
	 */
	_public.show = function(dom,flag){
		if((typeof dom === 'string') && dom.constructor==String){dom = document.getElementById(dom)}
		if(dom){
			var _style = flag == true ? "block" : "none";
			dom.style.display = _style;
		}
	}
	
	/**
	 * 设置元素的内容
	 * @param {} dom  dom对象或者id  
	 * @param {} data 数据
	 */
	_public.html = function(dom,data){
		if((typeof dom === 'string') && dom.constructor==String){dom = document.getElementById(dom)}
		if(dom){
			dom.innerHTML = '';
			dom.innerHTML = data;
		}
	}
	
	/**
	 * 绑定back事件
	 * @param {} a
	 */
	_public.back=function(a){
		var a = a || "back_id";   //如果没有ID，这调用默认的
		a = ((typeof a === 'string') && a.constructor==String) ? document.getElementById(a) : a;
		if(a){
			setTimeout(function(){
				a.addEventListener("tap",function(){_thisForm_.back(2, true);},false);
			},100);
		}
	}
	
	function resizeRoot(){
		var Dpr = 1, uAgent = window.navigator.userAgent;
		var isIOS = uAgent.match(/iphone/i);
		var wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width : window.innerWidth : window.innerWidth, wDpr, wFsize;
		if (window.devicePixelRatio) {
			wDpr = window.devicePixelRatio;
		} else {
			wDpr = isIOS ? wWidth > 818 ? 3 : wWidth > 480 ? 2 : 1 : 1; 
		}
		if(isIOS) wWidth = screen.width;
		wFsize = wWidth > 1080 ? 144 : wWidth / 7.5; 
		window.screenWidth_ = wWidth;
		document.getElementsByTagName('html')[0].dataset.dpr = wDpr; 
		document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
		document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+wFsize+"px !important");
	}
	//判断安卓手机浏览器低版本的用ready方法执行
	function appsion(){
		uAgent = window.navigator.userAgent;
		var isIOS = uAgent.match(/iphone/i);
		if(navigator.appVersion.substring(navigator.appVersion.length-6)<537 && !isIOS){		
			document.ready=function(){
				resizeRoot();
			}
		}else{
			resizeRoot();
		}
	}
	
	appsion();
	
	/**
	 * 设置头部标题
	 */
	_public.setposition=function(){
		var _lheader=document.getElementsByTagName("header")[0];
		var _lSearch=document.querySelector(".search_content");
		var _NavigationHandle=document.querySelector(".navigationHandle");
		var _mask=document.querySelector(".mask");
		var ua = navigator.userAgent.toLowerCase();	
	
		//设置遮罩层的高度为body的高度
		if(_mask){
			setTimeout(function(){
				var h =document.body.offsetHeight;
				_mask.style.height = h+"px";
			},200);
		}
	}
	
	
	/**
	 * 去除前后空格
	 * @return {}
	 */
	String.prototype.trim=function() {
		return this.replace(/(^\s*)|(\s*$)/g,'');
	}
	
	
	/**
	 * 时间格式化
	 * @param {} format
	 * @return {}
	 * 
			var now = new Date();
			var nowStr = now.format("yyyy-MM-dd hh:mm:ss");
	
			var testDate = new Date();
			var testStr = testDate.format("YYYY年MM月dd日hh小时mm分ss秒");
	 * 
	 */
	Date.prototype.format =function(format){
		var o = {
				"M+" : this.getMonth()+1, //month
				"d+" : this.getDate(), //day
				"h+" : this.getHours(), //hour
				"m+" : this.getMinutes(), //minute
				"s+" : this.getSeconds(), //second
				"q+" : Math.floor((this.getMonth()+3)/3), //quarter
				"S" : this.getMilliseconds() //millisecond
		}
	
		if(/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
		}
	
		for(var k in o) {
			if(new RegExp("("+ k +")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
			}
		}
		return format;
	}
	
	/**
	 * 把2016-01-07  		   格式化成  2016年01月07日
	 * 把2016-01-07 13:34:35   格式化成   2016年01月07日
	 * @return {}
	 */
	_public.formatDate=function(dateTime){
		if(!dateTime){return "";}
		var subDateTime = dateTime.substring(0,10);
		var arrDateTime = subDateTime.split("-");
		return arrDateTime[0]+"年"+arrDateTime[1]+"月"+arrDateTime[2]+"日";
	}
	
	/**
	 * 把2016-01-07  		   格式化成  2016/01/07/
	 * 把2016-01-07 13:34:35    格式化成   2016/01/07/
	 * @return {}
	 */
	_public.formatDateTypeOne=function(dateTime){
		if(!dateTime){return "";}
		var subDateTime = dateTime.substring(0,10);
		var arrDateTime = subDateTime.split("-");
		return arrDateTime[0]+"/"+arrDateTime[1]+"/"+arrDateTime[2];
	}	
	
	/**
	 * 暂无数据调用方法
	 * _public.notData() id:要传位置的ID  path:图片路径为空时默认路径../
	 */
	_public.notData = function(id,path){
		var str = "";
		var list_id = ((typeof id === 'string') && id.constructor==String) ? document.getElementById(id) : id;
		if(path && path!=undefined && path!=""){
			str += "<div class='_ldirTi' style='width: 40%; margin: 0 auto; padding-top: 40%;text-align:center;'>";
			str += "<img style='width: 2rem;height:2rem;' src='"+path+"img/bir-none.png' />";
			str += "<p style='font-size:0.34rem;color:#666;text-align:center;padding-top:0.6rem;'>暂无数据</p>";
			str +="</div>";		 
		}else{
			str += "<div class='_ldirTi' style='width: 40%; margin: 0 auto; padding-top: 40%;opacity：0.5'>";
			str += "<img style='width: 100%;' src='img/notdata.png' />";	
			str +="</div>";		
		}
		list_id.innerHTML = '';
		list_id.innerHTML = str;
	}
	
	_public.notBillData = function(id,path){
		var str = "";
		var list_id = ((typeof id === 'string') && id.constructor==String) ? document.getElementById(id) : id;
		if(path && path!=undefined && path!=""){
			str += "<div class='_ldirTi' style='width: 80%; margin: 0 auto; padding-top: 30%;opacity：0.5'>";
			str += "<img style='width: 100%;' src='"+path+"img/notBillData.png' />";
			str +="</div>";		 
		}else{
			str += "<div class='_ldirTi' style='width: 80%; margin: 0 auto; padding-top: 30%;opacity：0.5'>";
			str += "<img style='width: 100%;' src='img/notBillData.png' />";	
			str +="</div>";		
		}
		list_id.innerHTML = '';
		list_id.innerHTML = str;
	}
	
	/**
	 * 计算手机屏幕宽度
	 */		
	_public.winWidth = function(){
		var winWidth;
		if (window.innerWidth) 
			winWidth = window.innerWidth; 
		else if ((document.body) && (document.body.clientWidth)) 
			winWidth = document.body.clientWidth; 
		return winWidth;
	}
	
	
	/**
	 * 计算手机屏幕高度
	 */		
	_public.winHeight = function(){
		var winHeight;
		//获取窗口高度 
		if (window.innerHeight) 
			winHeight = window.innerHeight; 
		else if ((document.body) && (document.body.clientHeight)) 
			winHeight = document.body.clientHeight; 
		return winHeight;
	}
	
	
	/**
	 * 借款和理财自适应拍照后图片
	 * _public.imgmax() imgid:图片ID或者图片地址  paddtop:图片的外层div
	 */		
	_public.imgmax = function(imgid,divid){
		var img_url,
		imgdom,
		winWidth,
		winHeight;
		var imgdom = (typeof imgid == 'object') ? imgid : document.getElementById(imgid);
	
		// 创建对象
		var img = new Image();	    
		// 改变图片的src
		img.src = imgdom.src;  
		// 加载完成执行
		img.onload = function(){
	
			winHeight = _public.winHeight() * 0.7;
			winWidth = _public.winWidth() * 0.9;
	
			if(img.width<img.height){
				document.getElementById(divid).style.paddingTop = "15%";
				imgdom.style.width = ""; 
				imgdom.style.height = winHeight+"px";  			        	
			}else{	
				document.getElementById(divid).style.paddingTop = "25%";
				imgdom.style.height = "";	   
				imgdom.style.width = winWidth+"px";	    	
			} 
	
		};
	}
	
	//格式化时间(按照  消息中心业务相关时间规则  输出格式化后字符串)
	_public.formateDateForMessage = function(strDate,strDateNow){
		if( ((typeof strDate )== undefined )|| (strDate==null)
				||((typeof strDate )== undefined )|| (strDate==null)
				|| (strDate.length<19) || (strDateNow.length<10) ){//
			return strDate;//如果参数非法则原样展示
		}
		strDateNow = strDateNow.substr(0,10);//至获取当前时间年月日部分
		var strYearMonthDay = strDate.substr(0,10);//获取年月日字符串
		if(strYearMonthDay == strDateNow ){ //当天 展示 时分
			return strDate.substr(11,5);
		}
		if(strYearMonthDay.substr(0,4) == strDateNow.substr(0,4) ){//当年非当天  展示 月,日
			return strDate.substr(5,5).replace("-","月")+"日 "+strDate.substr(11,5);
		}
		//默认非当年的日期,显示年月日
		return strYearMonthDay.replace("-","年").replace("-","月")+"日";
	}
	
	//计算消息展示数目(大于9显示9+)
	_public.getNumberOfInfo = function(nCount){
		if( isNaN(nCount)){//
			return 0;//如果是非数字,返回零
		}
		if(nCount <= 9 ){ //当天 展示 时分
			return nCount;
		}
		return "9+";
	}
	
	/**
	 * 截取字符
	 * @param {} str         字符文字
	 * @param {} sub_length	 如果需要保留字符23，则写46
	 * @return {}
	 */
	_public.suolve = function(str,sub_length){
		var temp1 = str.replace(/[^\x00-\xff]/g,"**");//精髓
		var temp2 = temp1.substring(0,sub_length);
		//找出有多少个*
		var x_length = temp2.split("\*").length - 1 ;
		var hanzi_num = x_length /2 ;
		sub_length = sub_length - hanzi_num ;//实际需要sub的长度是总长度-汉字长度
		var res = str.substring(0,sub_length);
		if(sub_length < str.length ){
			var end =res+"…" ;
		}else{
			var end = res ;
		}
		return end ;
	}
	
	/**
	 * 检验业务员ID和便利店ID是否存在，如果不存在则直接跳转到登录页面
	 * @param {} identity		0-便利店,1-业务员
	 * @param {} lSaleId		业务员ID
	 * @param {} lConvStoreId	便利店ID
	 */
	_public.checkValueExists = function(identity,lSaleId,lConvStoreId){
		if(identity == 0){
			if(!lConvStoreId){
				setTimeout(function(){
					_plus.openWindow("login.htm","登录页面","" ,"","","");
				},200);
				return false;
			}
		}else if(identity == 1){
			if(!lSaleId){
				setTimeout(function(){
					_plus.openWindow("login.htm","登录页面","" ,"","","");
				},200);
				return false;
			}
		}else{
			setTimeout(function(){
				_plus.openWindow("login.htm","登录页面","" ,"","","");
			},200);
			return false;
		}
	}
	
	/**
	 * 格式化金额，121212.23  -> 121,212.23
	 * @param {} s
	 * @param {} n
	 * @return {}
	 */
	_public.fmoney = function(s, n){
		n = n > 0 && n <= 20 ? n : 2;  
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
		var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];  
		t = "";  
		for (i = 0; i < l.length; i++) {  
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
		}
		var result = t.split("").reverse().join("") + "." + r; 
		if(s<0 && result.indexOf('-,') == 0){
			result = '-' + result.substring(2);
		}
		return result;
	}
	/**
	 * 金额格式化
	 * 例子：fmoney("12345.675910", 3)，返回12,345.676 
	 * @data  备注lhh  2016-09-18
	 */
	function fmoney(s, n) { 
		if(n==0){
			s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + ""; 
			var l = s.split(".")[0].split("").reverse(),   
			t = "";   
			for(i = 0; i < l.length; i ++ ) {   
				t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
			}   
			return t.split("").reverse().join("");   
		}
		n = n > 0 && n <= 20 ? n : 2;   
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
		var l = s.split(".")[0].split("").reverse(),   
		r = s.split(".")[1];   
		t = "";   
		for(i = 0; i < l.length; i ++ ) {   
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
		}   
		return t.split("").reverse().join("") + "." + r;   
	} 
	
	/**
	 * 控制标签中金额字段显示与否
	 * 如果金额为零,则不显示
	 */
	_public.displayControlForMoney = function(dom) { 
		jQuery(dom).find("li").each(function(i,dom1){
			dom1 = jQuery(dom1);
			var strVal = dom1.find("[moneyDom]").html();
			if( strVal == "0.00元" || strVal == "0.00"){
				dom1.hide();
			}
		});
	} 
	
	/**
	 * 判断开始时间是否大于结束时间
	 */
	_public.startLaterThanEnd = function(beginDate,endDate) { 
		var d1 = new Date(beginDate.replace(/\-/g, "\/"));  
		var d2 = new Date(endDate.replace(/\-/g, "\/"));  
		if(beginDate!=""&&endDate!=""&&d1 >d2)	return true;  
		return false;
	};
	
	_public.trimString=function(str){
		return str.toString().replace(/^\s+|\s+$/g,"");
	}
	
	
	
	
	_public.imgDownload=function(){
		var body = document.getElementsByTagName("body")[0];
		var willDownImg = _public.get('willDownImg');
		willDownImg?willDownImg:willDownImg = document.getElementsByTagName('body')[0];
		var maskAll = _public.get('maskAll');
		var isShow = false;
		var _time = null;
		var imgSrc = null;
		willDownImg.addEventListener('touchstart',function(e){
			showDownLoad(e);
		});
		willDownImg.addEventListener('touchmove',function(){
			clearTimeout(_time);
		});
		willDownImg.addEventListener('touchend',function(){
			clearTimeout(_time);
		});
		/*弹出保存框和遮罩层*/
		function showDownLoad(e){
			if(e.target.tagName.toLowerCase() == 'img'){
				$('p').addClass('notap1');
				$('h2').addClass('notap1');
				imgSrc = e.target.src;
				_time = setTimeout(function(){
					var div = document.createElement('div');
					//var str = '<p style="height:1rem;line-height:1rem;text-align:center;border-bottom:1px solid #eee" class="saveImg">保存图片</p><p style="height:1rem;line-height:1rem;text-align:center;"  class="cancelImg">取消</p>';
					var str = "<img src="+ imgSrc +" ><span class='saveImg flex alignc justifyc'>保存</span>"
					div.innerHTML = str;
					div.setAttribute('id','saveImgDiv');
					div.setAttribute('class','flex alignc');
					body.appendChild(div);
					setTimeout(function(){
						maskAll?maskAll.style.display= 'block':null;
						div.style.opacity = '1';
						isShow = true;
					},20);
				},100);
	
				return false;
				e.stopPropagation();
			}else{
				$('p').removeClass('notap1');
				$('h2').removeClass('notap1');
			}
	
		};
	
		sDEvent();
		/*保存框弹出后的事件*/
		function sDEvent(){
			//关闭窗口
			body.addEventListener("touchstart",function(e){
				if(isShow){
					$('p').removeClass('notap1');
					$('h2').removeClass('notap1');
					if(e.target.className == 'saveImg flex alignc justifyc'){
						_plus.fileDown(imgSrc)
					}
					maskAll?maskAll.style.display = 'none':null;
					setTimeout(function(){
						body.removeChild(_public.get("saveImgDiv"));
						isShow = false;
					},300)
				};
			});
		};
	}
	
	//过滤emoji字符
	_public.filteremoji = function(strData){
		var ranges = [
		              '\ud83c[\udf00-\udfff]', 
		              '\ud83d[\udc00-\ude4f]', 
		              '\ud83d[\ude80-\udeff]'
		              ];
		return strData.replace(new RegExp(ranges.join('|'), 'g'), '');
	}
	/**
	 * 键盘不收起的手机用到
	 */
	_public.blur=function(){
		var ac = document.activeElement;
		ac.blur();
	}
	/**
	 * 直接上传到服务器端，H5的时候使用
	 * @param {} nType    回调的不同类型，通过这个类型来改_plus.callbackuploadPicture里面对于回调的具体方法，其实主要就是控制最终回调函数的参数
	 * @param {} strCallbackFunc  回调的方法
	 * @param {} dataObj  这个主要是用于回调的时候使用的，可以自己包含自己想要的东西，回调的时候都会带着的
		 * 			|-- strCallbackFunc  回调的方法
		 * 			|-- nType      回调的不同类型，通过这个类型来改_plus.callbackuploadPicture里面对于回调的具体方法，其实主要就是控制最终回调函数的参数
	 * 				|-- nState 	   状态：0-成功，-1-失败;这个是回调的时候加的，不需要传
		 * 			|-- strMsg	   成功为图片上传地址,失败为失败的文本信息；这个是回调的时候加的，不需要传
		 * 			|-- other	   这个是自己传过去的,回到的时候会带过来的
		 * 			...
		 * 			
		 * 
	 */
	_public.uploadPicture = function(nType,strCallbackFunc,oDataObj){
		oDataObj = oDataObj || {};
		nType = nType || 0;
		if(_thisForm_.isDebug == true){
			_upload.start({
				"nType" : nType,
				"strCallbackFunc" : strCallbackFunc,
				"frameCallBackFunc" :"_plus.callbackuploadPicture",
				"oDataObj" : oDataObj
			});
		}else{
			alert("只支持H5的上传图片");
		}
	}
