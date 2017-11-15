
/**
 * 引擎插件对象
 * @type 
 */
var _plus = {};

	_plus.serial_brk_queue = [];	//定义串行队列，使用队列调用并发
	_plus.isPC = true;				//true-PC端使用,false-手机端使用
	

	/**
	 * 打开新的页面
	 * @param {} strURI				页面URL
	 * @param {} strTitle			页面标题
	 * @param {} strAttachedData	传过去的参数
	 * @param {} nOpenMode			0、1正常打开,2-除自己页面外，其他页面全部干掉
	 * @param {} strClearURI		从那个页面开始干掉
	 * @param {} strAnimation		动画打开方向：打开一个新窗口，默认不传；返回的时候，传1；相反方向动画
	 */
	_plus.openWindow=function(strURI,strTitle,strAttachedData,nOpenMode,strClearURI,strAnimation){
		strClearURI = strClearURI || "";
		strAnimation = strAnimation || 0;
	
		if(_plus.isPC == true){
			strAttachedData=encodeURI(strAttachedData);
			var HTTP = document.location.protocol;
			window.location.href = HTTP+"//pocketWap.dafy.com/" + strURI + "?" + strAttachedData ;
		}else{
			try
			{
				_plus.blur();
				setTimeout(function(){			
					clientEngine.openWindow(strURI,strTitle,strAttachedData,nOpenMode,strClearURI,strAnimation);				
				},200);			
			}
			catch(e)
			{
				if(_shade_layer){_shade_layer.hide();}
				_plus.tryInfo(e);
				_plus.info("打开窗口出现错误");
			}
		}
	}
	
	/**
	 * 延迟打开新的页面
	 * @param {} strURI				页面URL
	 * @param {} strTitle			页面标题
	 * @param {} strAttachedData	传过去的参数
	 * @param {} nOpenMode			0、1正常打开,2-除自己页面外，其他页面全部干掉
	 * @param {} strClearURI		从那个页面开始干掉
	 * @param {} strAnimation		动画打开方向：打开一个新窗口，默认不传；返回的时候，传1；相反方向动画
	 */
	_plus.openDelayWindow=function(strURI,strTitle,strAttachedData,nOpenMode,strClearURI,strAnimation){
		try{
			setTimeout(function() {
				if(_plus.isPC == true){
					var strAttachedData=encodeURI(strAttachedData);
					window.location.href = "pocketWap.dafy.com" + strURI + "?" + strAttachedData ;				
				}else{
					_obj.openWindow(strURI,strTitle,strAttachedData,nOpenMode,strClearURI,strAnimation);
				}
			}, 400);
		}catch(e){
			_plus.tryInfo(e);
		}
	}
	
	
	/**
	 * 调用服务
	 * @param {} cdoRequest					请求发起cdo对象
	 * @param {} strCallbackFunctionName	请求发起回调js方法名
	 * @remark	 回调的JS函数的格式：callbackFunction(cdoRequest,cdoResponse,ret)，cdoResponse为从服务器端收到的应答文本
	 */
	_plus.raiseTransIndex = 0;
	_plus.raiseTrans=function(cdoRequest,strCallbackFun){
		_plus.raiseTransIndex++;
		//当有列表页的时候,显示downscroll.js中的加载中
		if(typeof _Downscroll != 'undefined' && _Downscroll!= null ){
			_Downscroll.loadShow();
		}
		
		if(_plus.isPC == true){
			var HTTP = document.location.protocol;
			var httpClient=new HttpClient(HTTP+"//pocketWap.dafy.com/handleTrans.cdo");
			cdoRequest.setStringValue("fcName",strCallbackFun);
			httpClient.raiseTrans(cdoRequest,new CDO(),eval("callbackPCFuc"));
		}else{
			try
			{
				strRequest=cdoRequest.toXML();
				clientEngine.raiseTrans(strRequest,"callbackFunction",strCallbackFun,null);
			}
			catch(e)
			{
				if(_shade_layer){_shade_layer.hide();}
				_plus.tryInfo(e);
				_plus.info("请求引擎服务失败");
			}
		}
	}
	
	/**
	 * PC端调用的时候模拟手机端的回调 
	 * @param {} request
	 * @param {} response
	 * @param {} ret
	 */
	function callbackPCFuc(request,response,ret){
		try{
			var fcName = request.getStringValue("fcName");
			var newRes = new CDO();
			newRes.setCDOValue("cdoResponse",response);
			
			var retCDO = new CDO();
			retCDO.setIntegerValue("nCode",ret.nCode);
			retCDO.setStringValue("strText",ret.strText);
			newRes.setCDOValue("cdoReturn",retCDO);
			
			callbackFunction(request.toXML(),newRes.toXML(),fcName);
		}catch(e){
			_plus.tryInfo(e);
		}
	}
	
	
	/**
	 * http请求
	 * @param {} cdoRequest			请求CDO		
	 * @param {} strCallbackFun		回调函数名
	 * @param {} strHttpClient		请求服务的URL
	 */
	_plus.raiseTranshHttp=function(cdoRequest,strCallbackFun,strHttpClient)
	{
		_plus.raiseTransIndex++;
		try
		{
			if(_plus.isPC == true){
				var HTTP = document.location.protocol;
				var httpClient=new HttpClient(HTTP+"//pocketWap.dafy.com/handleTrans.cdo");
				cdoRequest.setStringValue("fcName",strCallbackFun);
				cdoRequest.setStringValue("strRoutePath",strHttpClient);
				httpClient.raiseTrans(cdoRequest,new CDO(),eval("callbackPCFuc"));
			}else{
				strRequest=cdoRequest.toXML();
				clientEngine.raiseTrans(strRequest,"callbackFunction",strCallbackFun,strHttpClient);
			}
		}
		catch(e)
		{
			_plus.tryInfo(e);
			_plus.info("请求引擎服务失败");
		}
	}
	
	/**
	 * 手机引擎发起调用后回调方法
	 * @param {} strRequest			请求CDO
	 * @param {} strResponse		响应CDO
	 * @param {} strCallbackData	回调函数	
	 */
	function callbackFunction(strRequest,strResponse,strCallbackData)
	{
		try{
			var member = {};
			member.strRequest = strRequest;
			member.strResponse = strResponse;
			member.strCallbackData = strCallbackData;
			_plus.serial_brk_queue.push(member);
			setTimeout("procInThreadCallback()",100);
		}
		catch(e)
		{
			_plus.tryInfo(e);
			_plus.info("回调方法发生错误");
		}
	}
	
	/**
	 * 最终的回调
	 */
	function procInThreadCallback()
	{
		_plus.raiseTransIndex++;
		//当有列表页的时候,显示downscroll.js中的加载中
		if(typeof _Downscroll != 'undefined' && _Downscroll!= null ){
			_Downscroll.loadHide();
		}
		
		try{
			//从队列里面取出
			var member = _plus.serial_brk_queue.pop();
			if(member == null || typeof member == "undefined"){
				_plus.info("系统错误：-0001001");
				eval(member.strCallbackData+"(null,null,null)");
				return;
			}
			var cdoRequest=new CDO();
			//检测Request
			if(_plus.isStringNull(member.strRequest)){
				_plus.info("系统错误：-0001002");
				eval(member.strCallbackData+"(null,null,null)");
				return;
			}
		    cdoRequest.fromXMLText(member.strRequest);
		    
		    var cdoResponse=new CDO();
		    //检测Response
		    if(_plus.isStringNull(member.strResponse)){
		    	_plus.info("系统错误：-0001003");
		    	eval(member.strCallbackData+"(null,null,null)");
		    	return;
			}
		    cdoResponse.fromXMLText(member.strResponse);
		    //检测cdoReturn
		    if(!cdoResponse.exists("cdoReturn")){
		    	_plus.info("系统错误：-0001004");
		    	eval(member.strCallbackData+"(null,null,null)");
		    	return;
		    }
		    var cdoReturn=cdoResponse.getCDOValue("cdoReturn");
		    //检测cdoResponse
		    if(!cdoResponse.exists("cdoResponse")){
		    	//检测strText
			    if(!cdoReturn.exists("strText")){
			    	_plus.info("系统错误：-0001005");
			    	eval(member.strCallbackData+"(null,null,null)");
			    	return;
			    }
			    //检测nCode
			    if(!cdoReturn.exists("nCode")){
			    	_plus.info("系统错误：-0001006");
			    	eval(member.strCallbackData+"(null,null,null)");
			    	return;
			    }
			    var strText=cdoReturn.getStringValue("strText");
			    var nCode=cdoReturn.getIntegerValue("nCode");
			    
			    if(nCode <= - 9000000){ //cookie出现问题
			    	_plus.info(strText);
			    	setTimeout(function() {
			    		_plus.openWindow("login.htm","登录页面","" ,"","","");
			    	}, 2000);
			    	return ;
			    }
			    
			    //现在暂时只是用于cookie验证的时候使用的
			    if(strText != null && strText.indexOf("is not allowed") > 0 && nCode == -1){
			    	_plus.info("系统调用失败，请检查网络设置或者联系管理员。");
			    	setTimeout(function() {
			    		_plus.openWindow("login.htm","登录页面","" ,"","","");
			    	}, 3000);
			    }else{
			    	_plus.info("系统错误：-0001007");
			    	eval(member.strCallbackData+"(null,null,null)");
			    	return;
			    }
			    
		    }
		    cdoResponse=cdoResponse.getCDOValue("cdoResponse");
		    //检测nCode
		    if(!cdoReturn.exists("nCode")){
		    	_plus.info("系统错误：-0001008");
		    	eval(member.strCallbackData+"(null,null,null)");
		    	return;
		    }
		    var nCode=cdoReturn.getIntegerValue("nCode");
		    //检测strText
		    if(!cdoReturn.exists("strText")){
		    	_plus.info("系统错误：-0001009");
		    	eval(member.strCallbackData+"(null,null,null)");
		    	return;
		    }
		    var strText=cdoReturn.getStringValue("strText");
		    var ret=new Return();
		    ret.setCode(nCode);
		    ret.setText(strText);
		    
		    if(nCode <= - 9000000){ //cookie出现问题
		    	_plus.info(strText);
		    	setTimeout(function() {
		    		_plus.openWindow("login.htm","登录页面","" ,"","","");
		    	}, 2000);
		    }
		    
		    if(strText != null && strText.indexOf("is not allowed") > 0 && nCode == -1){
		    	_plus.info("系统调用失败，请检查网络设置或者联系管理员。");
		    	setTimeout(function() {
		    		_plus.openWindow("login.htm","登录页面","" ,2,"");
		    	}, 3000);
		    }else{
		    	eval(member.strCallbackData+"(cdoRequest,cdoResponse,ret)");
		    }
		}catch(e){
			//返回事件    ,调用不到返回页的方法报错
			if(e.name == "ReferenceError"){
				return
			}
			_plus.tryInfo(e);
			_plus.info("回调函数发现错误"+e);
			eval(member.strCallbackData+"(null,null,null)");
		}
	   
	}
	
	/**
	 * 判断是否为空
	 * @param {} str
	 * @return {}
	 */
	_plus.isStringNull=function(str){
		var isNull = false;
		if(typeof str == "undefined"){
			isNull = true;
		}
		
		if(""==str){
			isNull = true;
		}
		
		if(null == str){
			isNull = true;
		}
		return isNull;
	}
	
	/**
	 * 调用手机引擎,弹出扫一扫窗体
	 * @param {} strCallbackFunctionName	回调方法名
	 */
	_plus.openRichScan=function(strCallbackFunctionName){
		try{
			clientEngine.richScan(strCallbackFunctionName);
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("系统错误：-0009001");
		}
	};
	
	/**
	 * 扫一扫功能得到参数后，回调
	 * @param {} val		值
	 * @param {} strCallbackFunctionName	回调方法名
	 */
	function callbackRichScan(val,strCallbackFunctionName){
		try{
			eval(strCallbackFunctionName+"('"+val+"')");
		}catch(e){
			_plus.info("系统错误：-0009002");	
		}
	}
	
	/**
	 * 调用引擎的消息提示
	 * @param {} strMessage
	 */
	_plus.info=function(strMessage,isUploading){
		isUploading = isUploading || false;
		if(_plus.isPC == true){
			alert(strMessage);
		}else{
			clientEngine.info(strMessage);
		}
		if(isUploading == true){
			_plus.addError(e);
		}
	}
	
	/**
	 * 显示一个文本消息 是|否 按钮的模态对话框
	 * @param {} strMessage	 
	 * @return {}
	 * @remark	如果选择是，则返回1，否则返回0
	 */
	_plus.yesno=function(strMessage){
		try{
			return clientEngine.yesno(strMessage);
		}catch(e){
			_plus.info("系统错误：-0009004");
		}
	};
	
	/**
	 * 显示一个文本消息 确定|取消 按钮的模态对话框
	 * @param {} strMessage
	 * @return {}
	 * @remark  如果选择确定，则返回0，否则返回-1
	 */
	_plus.okcancel=function(strMessage){
		try{
			return clientEngine.okcancel(strMessage);
		}catch(e){
			_plus.info("系统错误：-0009005");
		}
	}
	
	/**
	 * 调用手机引擎，弹出分享功能模块
	 * @param {} strTitle		标题
	 * @param {} strContent		内容
	 * @param {} type			1-红包类型，2-微名片
	 * @param {} strUrl			分享的链接
	 * @param {} picURL			分享图片的URL
	 * @return {}
	 */
	_plus.shareInfo=function(strTitle,strContent,type,strUrl,picURL){
		try{
			return clientEngine.shareInfo(strTitle,strContent,type,strUrl,picURL);
		}catch(e){
			_plus.info("系统错误：-0009006");
		}
	}
	
	/**
	 * 返回
	 */
	_plus.back=function(){
		try{
			_plus.blur();
			setTimeout(function(){
				if(_plus.isPC == true){
					history.go(-1);
				}else{
					clientEngine.back();
				}
			}, 200)
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("系统错误：-0009007");
		}
	};
	
	/**
	 * 键盘不收起的手机用到
	 */
	_plus.blur=function(){
		var ac = document.activeElement;
		ac.blur();
	}
	
	/**
	 * 安卓控制手机返回，返回指定要打开页面
	 * @param {} strURI				返回地址
	 * @param {} strTitle			标题
	 * @param {} strAttachedData	打开html后面跟的参数值
	 * @param {} nOpenMode			打开html方式：0、1正常打开；2-除自己页面外，其他页面全部干掉
	 * @param {} strClearURI		从哪个页面开始干掉
	 */
	_plus.setBackURL=function(strURI,strTitle,strAttachedData,nOpenMode,strClearURI) 
	{
		try{
			if(_plus.isPC == true){
				
			}else{
				clientEngine.setBackURL(strURI,strTitle,strAttachedData,nOpenMode,strClearURI);
			}
			
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("系统错误：-0009008");
		}
	};
	
	/**
	 * 获取cookie
	 * @param {} strName  cookie的Key
	 * @return {}
	 */
	_plus.getCookie=function(strName){
		try{
			if(_plus.isPC == true){
				var arr,reg=new RegExp("(^| )"+strName+"=([^;]*)(;|$)");
				if(arr=document.cookie.match(reg))
					return unescape(arr[2]);
				else
					return "";
			}else{
				return clientEngine.getCookie(strName);
			}
		}catch(e){
			_plus.info("系统错误：-0008001");
		}
	};
	
	/**
	 * 设置cookie及有效期，单位为秒
	 * @param {} strName
	 * @param {} strValue
	 * @param {} nLifeTime
	 */
	_plus.setCookie=function(strName,strValue,nLifeTime){
		try{
			clientEngine.setCookie(strName,strValue,nLifeTime);
		}catch(e){
			_plus.info("系统错误：-0008002");
		}
	};
	
	/**
	 * 持久化存储字符串
	 * @param {} key	字符串
	 * @param {} value  字符串
	 * @return {}
	 */
	_plus.setStringValue=function(key,value){
		try{
			if(_plus.isPC == true){
				if((key != null && key.length > 0) || (value != null && value.length > 0 )){
					try{
						localStorage.removeItem(key);
						localStorage.setItem(key,value);
						return true;
					}catch(e){ //localStorage在iOS Safari、chrome和UC浏览器中的隐私模式（也叫无痕模式）下无法使用
				        alert("请关闭无痕浏览、或者隐私模式");
				        setTimeout(function(){
					        _plus.openWindow("login.htm","首页","",2,"","");
				        },1500);
				        return false;
				    }
				}
			}else{
				return clientEngine.setStringValue(key+"",value+"");
			}
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("系统错误：-0008003");
			return false;
		}
	}
	
	/**
	 * 获取持久化存储的字符串
	 * @param {} key	字符串
	 * @return {}
	 */
	_plus.getStringValue=function(key)
	{
		try{
			if(_plus.isPC == true){
				return localStorage.getItem(key);
			}else{
				if(value == null || value == undefined || value == ""){
					return null;
				}
				var value = clientEngine.getStringValue(key);
				return value;
			}
		}catch(e){
			_plus.info("系统错误：-0008004");
			return null;
		}
	}
	
	_plus.splitCode = "#@!";
	
	/**
	 * 持久化存储数组
	 * @param {} key	 字符串
	 * @param {} value	 数组
	 * @return {}
	 */
	_plus.setArrayValue=function(key,value)
	{
		try{
			var strValue = "";
			if(value != null){
				for(var i = 0;i < value.length;i++){ 
					if(i != 0){
						strValue += _plus.splitCode + value[i];
					}else{
						strValue += value[i];
					}
				} 
				return clientEngine.setStringValue(key,strValue);
			}else{
				return false;
			}
		}catch(e){
			_plus.info("系统错误：-0008005");
			return false;
		}
	}
	
	/**
	 * 获取持久化存储的数组
	 * @param {} key 字符串
	 * @return {}
	 */
	_plus.getArrayValue = function(key)
	{
		try{
			var value = clientEngine.getStringValue(key);
			if(value == null || value == undefined || value == ""){
				return null;
			}
			return value.split(_plus.splitCode);
		}catch(e){
			_plus.info("系统错误：-0008006");
			return null;
		}
	}
	
	/**
	 * 删除持久化存储的数组
	 * @param {} key	
	 * @return {}
	 */
	_plus.clearArray=function(key){
		try{
			if(_plus.isPC == true){
				if(key || key.length > 0){
					for(var i=0;i<key.length;i++){
						localStorage.removeItem(key[i]);
					}
				}
			}else{
				return clientEngine.clearArray(key);
			}
		}catch(e){
			_plus.info("系统错误：-0008007");
		}
	}
	
	/**
	 * 删除所有持久化数据
	 * @return {}
	 */
	_plus.clearAll=function(){
		try{
			if(_plus.isPC == true){
				localStorage.clear();
			}else{
				return clientEngine.clearAll();
			}
		}catch(e){
			_plus.info("系统错误：-0008008");
		}
	}
	
	/**
	 * 获取通过URL传递的参数
	 * @param {} name	key
	 * @return {}
	 */
	_plus.getQueryString=function(name)
	{
		try
		{
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var search = window.location.search;
			var r = window.location.search.substr(1).match(reg);
			if(r!=null)return  unescape(r[2]); return null;
		}
		catch(e)
		{
			_plus.tryInfo(e);
			_plus.info("系统错误：-0008009");
		}
	};
	
	/**
	 * 显示退出对话框
	 */
	_plus.showExitDialog=function(){
		try{
			clientEngine.showExitDialog();
		}catch(e){
			_plus.info("系统错误：-0009009");
		}
	}
	
	/**
	 * 销毁内存对象中保存的配置数据及其它数据，释放内存 一般系统退出时调用
	 */
	_plus.destroy=function(){
		try{
			clientEngine.destroy();
		}catch(e){
			_plus.info("系统错误：-0009010");
		}
	}
	
	/**
	 * 打电话，不直接播出
	 * @param {} strPhoneNumber
	 */
	_plus.call=function(strPhoneNumber){
		try{
			if(_plus.isPC == true){
				//<a href="tel:18688888888">拨号</a>
				var a = document.createElement("a");
				a.href="tel:"+strPhoneNumber;
				var body = document.getElementsByTagName("body")[0];
				body.appendChild(a);
				a.click();
			}else{
				clientEngine.call(strPhoneNumber);
			}
		}catch(e){
			_plus.info("系统错误：-0009011");
		}
	}
	
	/**
	 * 备份信息
	 * @param {} strBackupURL	上传地址
	 * @param {} strPhone		手机号码
	 * @param {} strCusId		用户ID
	 * @param {} nType			类型
	 */
	_plus.backupDataToRemote=function(strBackupURL,strPhone,strCusId,nType)
	{
		try{
			if(nType == 1){
				//备份所有信息 
				clientEngine.startBackupAll(strPhone,strCusId);
			}else if(nType == 2){
				//备份通话资料到云端
				clientEngine.backupCallData(strBackupURL,strPhone,strCusId);
			}else if(nType == 3){
				//备份短信资料到云端
				clientEngine.backupSms(strBackupURL,strPhone,strCusId);
			}
		}catch(e)
		{
			_plus.info("系统错误：-0009012");
		}
	}
	
	
	/**
	 * 获取用户的位置信息
	 * @return {}
	 */
	_plus.getLoaction=function(){
		try{
			return clientEngine.getLoaction();
		}catch(e){
			_plus.info("系统错误：-0009013");
		}
	}
	
	/**
	 * 获取设备信息
	 * @return {}
	 */
	_plus.getDeviceMessage=function(){
		try{
			if(_plus.isPC == true){
				return "";
			}else{
				return clientEngine.getDeviceMessage();
			}
		}catch(e){
			_plus.info("系统错误：-0009014");
		}
	}

	/**
	 * 编辑短信，但是不发送
	 * @param {} strPhoneNumber		手机号
	 * @param {} strMsgContent		短信内容
	 */
	_plus.editMsg=function(strPhoneNumber,strMsgContent){
		try{
			clientEngine.editMsg(strPhoneNumber,strMsgContent);
		}catch(e){
			_plus.info("系统错误：-0009015");
		}
	}
	
	/**
	 * 打开通讯录
	 */
	_plus.openContacts = function(){
		try{
			clientEngine.openContacts();
		}catch(e){
			_plus.info("系统错误：-0009016");
		}
	}
	
	/**
	 * 获取手机系统
	 * @return {}
	 */
	_plus.getChannelType = function(){
		try{
			if(_plus.isPC == true) return "1";
			return clientEngine.getChannelType();
		}catch(e){
			_plus.info("系统错误：-0009017");
			return null;
		}
	}
	
	/**
	 * 调用支付窗口
	 * @param {} strTitle			标题
	 * @param {} lMoney				交易金额
	 * @param {} strRealPayMoney	实付金额
	 * @param {} strRealPayPoint	实付积分
	 * @param {} isEncode			是否加密
	 * @param {} strCallbackFun		回调函数名
	 * @return {}
	 */
	_plus.openPayWindow = function(strTitle,lMoney,strRealPayMoney,strRealPayPoint,isEncode,strCallbackFun)
	{
		try{
			return clientEngine.openPayWindow(strTitle,lMoney,strRealPayMoney,strRealPayPoint,isEncode,strCallbackFun);
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("系统错误：-0007001");
			return null;
		}
	}
	
	/**
	 * 调用支付窗口【简易版本】	
	 * @param {} title				标题
	 * @param {} isEncode			是否加密
	 * @param {} strCallbackFun	回调函数名
	 * @return {}
	 */
	_plus.openNewPayWindow = function(title, isEncode, strCallbackFun)
	{
		try{
			return clientEngine.openNewPayWindow(title,isEncode,strCallbackFun);
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("系统错误：-0007002");
			return null;
		}
	}
	
	/**
	 * 调用支付窗口【简易版本】的回调
	 * @param {} strMD5Pass			加密后的支付密码
	 * @param {} strCallbackFun		回调函数名
	 * @param {} okOrCanel			0-取消按钮，1-确定按钮
	 */
	function callbackFunctionOpenPayWindow(strMD5Pass,strCallbackFun,okOrCanel){
		try{
			setTimeout(function(){
				eval(strCallbackFun+"('" + strMD5Pass + "','" + okOrCanel + "')");
			},200);
		}catch(e){
			_plus.info("系统错误：-0007003");
		}
		
	}
	
	/**
	 * 设置头像
	 * @param {} strCallbackFun		回调函数名
	 * 				|-- localURL	本地图片的URL
	 * @param {} uniqueId			唯一ID
	 */
	_plus.selectAvatarSource = function(strCallbackFun,uniqueId){
		try{
			clientEngine.selectAvatarSource(strCallbackFun,uniqueId);
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("系统错误：-0009018");
		}
	}
	
	/**
	 * 获取头像路径 注：这里如果没有传的话，默认取得是字符串："strLoginId"的值
	 * @param {} uniqueId 唯一ID
	 * @return {}
	 */
	_plus.getAvatarSource = function(uniqueId){
		try{
			if(_plus.isPC == true){
				return "";
			}else{
				return clientEngine.getAvatarPath(uniqueId);
			}
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("系统错误：-0009019");
			return null;
		}
	}
	
	/**
	 * 获取版本号
	 * @return {}
	 */
	_plus.getVersionCode=function(){
		try{
			if(_plus.isPC == true){
				return "1.0";
			}else{
				return clientEngine.getVersionName();
			}
		}catch(e){
			_plus.info("系统错误：-0009020");
			return "";
		}
	}

	
	/**
	 * 给设备打标签，极光推送用
	 * @param {} tagsArray	数组
	 */
	_plus.setTags=function(tagsArray){
		try{
			if(_plus.isPC == true){
				
			}else{
				clientEngine.setTags(tagsArray);
			}
		}catch(e){
			_plus.info("系统错误：-0006001");
		}
	}
	
	/**
	 * 给设备设置别名,极光推送用
	 * @param {} alias 字符串 别名字符类型用于存储如lUserId
	 */
	_plus.setAlias=function(alias){
		try{
			if(_plus.isPC == true){
				
			}else{
				clientEngine.setAlias(alias);
			}
		}catch(e){
			_plus.info("系统错误：-0006002");
		}
	}
	
	/**
	 * 
	 * 这里是用于极光推送的，这里要配合极光推送的后台
	 * 	|-- alias 等同于极光推送的设备别名，相当于点对点的推送，可以推送到单个人
	 *  |-- tags  等同于极光推送的设备标签，例如口袋助手：分业务员和便利店，只需要设置不同的标签即可
	 *	
	 * 	例如:setNotices(lUserId,[001]);设置了用户Id和001的设备标签，推送的时候，就可以分只推送给用户Id的，还是001标签的
	 * 
	 * 给设备设置一个别名、给设备打上标签
	 * @param alias 	{String}	别名	字符类型用于存储如lUserId
	 * @param tags		{array}		tags[10]、[20]、[10,20,30,40]... ...
	 */
	_plus.setNotices=function(alias,tagsArray){
		try{
			if(_plus.isPC == true){
				
			}else{
				clientEngine.setNotices(alias,tagsArray);
			}
		}catch(e){
			_plus.info("系统错误：-0006003");
		}
	}
	
	/**
	 * 打开App短信界面 <用于激活App2.0账号>
	 * @param {} strMobile		手机号
	 * @param {} strContent		短信内容
	 */
	_plus.openMsgWindow=function(strMobile,strContent){
		try{
			clientEngine.openMsgWindow(strMobile,strContent);
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("系统错误：-0009021");
		}
	}
	
	/**
	 * 获取手机设备号
	 * @return {}
	 */
	_plus.getDeviceCode=function(){
		try{
			if(_plus.isPC == true){
				return "";
			}else{
				return clientEngine.getDeviceCode();
			}
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("系统错误：-0009022");
			return null;
		}
	}
	
	/**
	 * 拍照，上传到服务器
	 * @param {} Id					Dom元素Id ,用于拍照后更改图片地址
	 * @param {} strCallbackFunc	回调方法名称
	 * 				|-- remoteURL	远程图片地址
	 * 				|-- localURL	本地地址
	 * 				|-- Id			我们传过去的Id
	 */
	_plus.picToRemote = function(Id,strCallbackFunc){
		try{
			if(_plus.isPC == true){
				_upload.start({
					id:Id,
					callBackFunc:strCallbackFunc
				});
			}else{
				clientEngine.takePictureAndUpload(strCallbackFunc,Id);
			}
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("调用拍照出现错误");
		}
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
	_plus.uploadPicture = function(nType,strCallbackFunc,oDataObj){
		oDataObj = oDataObj || {};
		nType = nType || 0;
		if(_plus.isPC == true){
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
	
	/**
	 * 拍照后的回调
	 * @param {} dataObj  这个主要是用于回调的时候使用的，可以自己包含自己想要的东西，回调的时候都会带着的
	 	 *			|-- strCallbackFunc  回调的方法
		 * 			|-- nType      回调的不同类型，通过这个类型来改_plus.callbackuploadPicture里面对于回调的具体方法，其实主要就是控制最终回调函数的参数
	 	 *			|-- nState 	   状态：0-成功，-1-失败;这个是回调的时候加的，不需要传
		 * 			|-- strMsg	   成功为图片上传地址,失败为失败的文本信息；这个是回调的时候加的，不需要传
		 * 			|-- other	   这个是自己传过去的,回到的时候会带过来的
		 * 			...
		 * 
	 */
	_plus.callbackuploadPicture = function(oDataObj){
		try{
			oDataObj = JSON.parse(oDataObj);
			var strCallbackFunc = oDataObj["strCallbackFunc"];  //获取回调的方法
			var nType = oDataObj["nType"];		  //获取回调的不同类型
			var nState = oDataObj["nState"];    //上传状态
			var msg = oDataObj["strMsg"];			  //上传的结果：成功为图片上传地址,失败为失败的文本信息
			if(!strCallbackFunc){alert("上传回调函数不存在");}
			
			if(nType == 0){ // function callBackLocalPhotograph(nstate,msg,id)  需要这些参数
				var strId = oDataObj["strId"];
				eval(strCallbackFunc+"('"+nState+"','"+msg+"','"+strId+"')");
				
			}else if(nType == 1){ //callbackFunctionSavePhotoAvatar = function(state, remoteUri, localUri, fileSize)
				var fileSize = oDataObj["fileSize"];
				eval(strCallbackFunc+"('"+nState+"','"+msg+"','"+msg+"','"+fileSize+"')");
			}else{
				alert("上传出现错误");
			}
		}catch(e){
			_shade_layer.hide();
			alert("出现错误");
		}
	}
	
	/**
	 * 调用时间控件
	 * @param {} Id					Dom元素Id，用于选择时间后填充值
	 * @param {} strCallbackFunc	回调方法名
	 * 				|-- str		选择的日期
	 * 				|-- 我们传过去的ID	
	 */
	_plus.chooseDate = function(Id,strCallbackFunc){
		try{
			clientEngine.getCurrentDate(strCallbackFunc,Id);
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("调用时间控件出现错误");
		}
	}
	
	/**
	 * 拍照，存到本地
	 * @param {} Id
	 * @param {} strCallbackFunc
	 */
	_plus.picToLocal = function(Id,strCallbackFunc){
		try{
			if(_plus.isPC == true){
				_upload.start({
					id:Id,
					callBackFunc:strCallbackFunc
				});
			}else{
				clientEngine.plusPhotograph(strCallbackFunc,Id);
			}
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("调用拍照出现错误");
		}
	}
	
	/**
	 * 上传图片到服务器
	 * @param {} picURL				图片URL	
	 * @param {} strCallbackFunc	回调方法名
	 */
	_plus.picUploading = function(picURL,strCallbackFunc){
		try{
			clientEngine.plusPicUploading(picURL,strCallbackFunc);
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("上传图片出现错误");
		}
	}
	
	/** 
	 * 数据更新操作
	 * @param strSQL            
	 *          |-- update table1 set name='张三' where lId = 1;
	 *          |-- delete table1 where lId = 1;
	 *          |-- insert table1 values('张三',1);
	 
	 * @param strCallbackFunc   回调方法名称
	 *          |-- nstate      状态：0，成功  -1，失败
	 *          |-- msg         成功或者失败的文本信息
	 * 
	 */
	_plus.executeSQL = function(strSQL,strCallbackFunc){
		try{
		    clientEngine.plusExecuteSQL(strSQL,strCallbackFunc);
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("执行更新sql出现错误");
		}
	}
	
	
	/** 
	 * 查询
	 * @param strSQL            
	 *          |-- select * from table1 where lId = 1;
	 *          
	 * @param strCallbackFunc   回调方法名称
	 *          |-- nstate      状态：0，成功  -1，失败
	 *          |-- msg         成功和失败的文本信息,这里的成功应该返回删除的条数
	 *          |-- CDO数组       这里返回的是CDO数组，只有一条记录也返回CDO数组
	 */
	_plus.querySQL = function(strSQL,strCallbackFunc){
		try{
		    clientEngine.plusQuerySQL(strSQL,strCallbackFunc);
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("执行更新sql出现错误");
		}
	}
	
	/**
	 * 获取手机端照片（相册选择或拍照）
	 * @param {} maxFileSize		最大大小
	 * @param {} strCallbackFunc	回调函数
	 * 			|-- state
				|-- remoteURL
			    |-- localURL
				|-- fileSize
	 */
	_plus.pickLocalPhoto=function(maxFileSize, strCallbackFunc){
		try{
			clientEngine.pickLocalPhoto(strCallbackFunc, maxFileSize);
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("获取手机端照片出现错误");
		}
	}
	
	/**
	 * 从服务器路径下载图片/文件到本地
	 * @param {} strCallbackFunc
	 * 				|-- localURL	 返回文件在本地的路径 
 	*				|-- state    	 文件下载状态 0 成功， -1 失败
	 * @param {} fileType			 文件类型： 0 图片， 1 文件
	 * @param {} url				 服务器文件路径
	 */
	_plus.downloadFile = function(strCallbackFunc,fileType, url){
		try{
			clientEngine.downloadFile(strCallbackFunc,fileType, url);
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("下载图片出现错误");
		}
	}
	
	/**
	 * 获取IOS图片前缀
	 * @return {}
	 */
	_plus.getIOSPicPrefix=function(){
		try{
			if(_plus.isPC == true){
				return "";
			}else{
				return clientEngine.iOSNSDocumentPath();
			}
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("获取图片前缀出现错误");
			return null;
		}
	}
	
	/**
		 * 获取手机信息<SalesmanMongoService>
		 * 回调方法callbackFunctionGetMobileBasicInfo
		 * 返回参数
		 * @param strLastLoginEquip			{String}	最后登录设备
		 * @param strLastLoginEquipId		{String}	最后登录设备唯一标识
		 * @param strLastLoginEquipVersion	{String}	最后登录设备版本号
		 * @param strLastLoginPosX			{String}	经纬度X					
		 * @param strLastLoginPosY			{String}	经纬度Y
		 * @param strEquipmentNo			{String}	设备号
	 */
	_plus.getMobileBasicInfo = function(){
		try{
			if(_plus.isPC == true){
				
			}else{
				clientEngine.getMobileBasicInfo();
			}
		}catch(e){
			_plus.tryInfo(e);
			if(_shade_layer){_shade_layer.hide();}
			_plus.info("获取手机信息出现错误");
		}
	}
	
	/**
	 * 判断是否是安卓设备
	 */
	_plus.judge_Android=function(){
		var regular_result = navigator.userAgent.match(/(Android)\s+([\d.]+)/),
			os_boolean = !!regular_result;
		return os_boolean;
	}
	
	/**
	 * 判断是否是IOS设备
	 */
	_plus.judge_IOS=function(){
		var regular_result = navigator.userAgent.match(/.*OS\s([\d_]+)/),
			os_boolean = !!regular_result;
		return os_boolean;
	}
	/**
	 * 获取手机端照片（相册选择或拍照）
	 * 
	 *@param strCallbackFunc 选择照片后的回调方法
	 *       回调参数
	 *       |-- state
	 *		 |-- remoteURL
	 *	     |-- localURL
	 *		 |-- fileSize
	 *@author lishengyong
	 *@date 2015-12-11 下午2:55:08
	 */
	_plus.pickLocalPhoto=function(maxFileSize, strCallbackFunc){
		clientEngine.pickLocalPhoto(strCallbackFunc, maxFileSize);
	}

	/**
	 * 从服务器路径下载图片/文件到本地
	 * 
	 *@param strCallbackFunc 回调函数
	 *		回调参数
	 *		|-- localURL 返回文件在本地的路径 
	 *		|-- state    文件下载状态 0 成功， -1 失败
	 *@param    fileType    文件类型： 0 图片， 1 文件
	 *@param    url         服务器文件路径
	 *@returns
	 *@author lishengyong
	 *@date 2015-12-18 下午4:00:10
	 */
	_plus.downloadFile=function(strCallbackFunc,fileType, url){
		clientEngine.downloadFile(strCallbackFunc,fileType, url);
	}

	/**
	 * 直言发送消息到手机通知
	 * 
	 *@param title 消息主题
	 *@param content 消息内容
	 *@returns
	 *@author lishengyong
	 *@date 2015-12-24 下午3:39:20
	 */
	_plus.directTalk_noticeMsg = function(title, content){
		clientEngine.noticeMsg(title, content);
	}
	
	/**
	 * 控制android物理键开关
     * @param nStatus	状态	1：open、2：close.
	 */
	_plus.setControlAndroidBack = function (nStatus){
		if(_plus.isPC == false){
			clientEngine.setControlAndroidBack(nStatus);
		}
	}

	/**
	 * 解析try catch里面的错误上传到服务器，通过它可以解析到行号和具体的文件地址
	 * @param {} e
	 */
	_plus.tryInfo = function(e,dataSource){
		var msg = "";
		try{
			if(dataSource == undefined || dataSource == null){
				msg = e.stack;
			}else{
				msg = e.stack +  _plus.getDataByDataType(dataSource);
			}
		}catch(e){
			msg = e.stack + "【异常】";
		}
        _plus.addError(msg);   
	}
	/**
	 * 解析数据类型打印日志
	 * @param {} obj
	 * @return {}
	 */
	_plus.getDataByDataType = function(dataResource) {
		if (typeof dataResource == 'object'){
			if (dataResource.constructor.name == 'Array') {
				var msg = "";
				for (var i = 0; i < dataResource.length; i++) {
					msg += _plus.getDataByDataType(dataResource[i]);
				}
				return msg;
			}else if (dataResource.constructor.name == 'CDO') {
				return "【CDO:"+dataResource.toString()+"】";
			}else {
				return "【Object:"+dataResource+"】";
			}
		}
		return"【类型:"+dataResource+"】";
	}
	
	_plus.baseInfo = {
		"lSaleId":"",
		"lConvStoreId":"",
		"strName":"",
		"strMobile":""
	}
	
	_plus.addErrorIndex = 0;
	_plus.addErrorFlag = true;
	
	/**
	 * 将错误信息上传服务器
	 * @param {} msg
	 */
	_plus.addError = function(msg){
		if(_plus.addErrorFlag == false){return ;}
		try{
			if(_plus.addErrorIndex == 0){
				var lSaleId = _plus.getStringValue("lSaleId") || 0;
				var lConvStoreId = _plus.getStringValue("lConvStoreId") || 0;
				var strName = _plus.getStringValue("strName") || "";
				var strMobile = _plus.getStringValue("strMobile") || "";
				
				_plus.baseInfo["lSaleId"]=lSaleId;
				_plus.baseInfo["lConvStoreId"]=lConvStoreId;
				_plus.baseInfo["strName"]=strName;
				_plus.baseInfo["strMobile"]=strMobile;
				
				_plus.addErrorIndex = _plus.addErrorIndex + 1;
			}
			
			var cdoRequest = new CDO();
			cdoRequest.setStringValue("strServiceName","PocketErrorService");
			cdoRequest.setStringValue("strTransName","addError");
			cdoRequest.setLongValue("lSaleId",Number(_plus.baseInfo["lSaleId"]));
			cdoRequest.setLongValue("lConvStoreId",Number(_plus.baseInfo["lConvStoreId"]));
			cdoRequest.setStringValue("strName",_plus.baseInfo["strName"]);
			cdoRequest.setStringValue("strMobile",_plus.baseInfo["strMobile"]);
			cdoRequest.setStringValue("strInfo",msg);
			_plus.raiseTrans(cdoRequest,"callBackAddError");
			_plus.addErrorFlag = false;
		}catch(e){
		}
	}
	
	function callBackAddError(){
		_plus.addErrorFlag = true;
	}
	
	/**
	 * 拍照，存到本地 选择多张照片
	 * @param {} strJson {
	 *		id				业务传值 				String
	 *		nSelectLimit	选取图片最大数量			int
	 *		nIsNeedEdit		是否选择编辑(0:否,1是)	int
	 *		nIsUpload		是否上传(0:否,1是)		int
	 * }	
	 * @param {} strCallbackFunc
	 * @returns [{}] strJsonArray [{
	 * 		strLocalURL		本地URL				String
	 * 		strThumURL		本地缩略图URL			String
	 * 		strRemoteURL	远程URL				String	无
	 * 		nCode			状态：0成功，1失败		int
	 * 		strMsg			错误的文本消息			String
	 * 		id				业务原样返回的			String
	 * }]
	 * 
	 */
	_plus.picToLocalMore = function(strJSON,strCallbackFunc){
		try{
			clientEngine.getPhoto(strCallbackFunc,strJSON);
		}catch(e){
			_plus.tryInfo(e,strJSON);
			_plus.info("调用拍照出现错误");
		}
	}
	
	/**
	 * 上传图片到服务器-多张上传
	 * @param {} strJsonArray [{
	 *		id				业务传值 				String
	 *		strLocalURL		本地URL				String
	 * }]	
	 * 
	 * @param {} strCallbackFunc
	 * 
	 * @returns [{}] strJsonArray [{
	 * 		strLocalURL		本地URL				String
	 * 		strThumURL		本地缩略图URL			String	无
	 * 		strRemoteURL	远程URL				String
	 * 		nCode			状态：0成功，1失败		int
	 * 		strMsg			错误的文本消息			String
	 * 		id				业务原样返回的			String
	 * }]
	 * 
	 */
	_plus.picUploadingMore = function(strJSON,strCallbackFunc){
		try{
			clientEngine.plusPhotosUploading(strCallbackFunc,strJSON);
		}catch(e){
			_plus.tryInfo(e);
			_plus.info("上传图片出现错误");
		}
	}
	
	function exitWebPage() {
		
	}
	
	
	/*
	 * 修改顶部颜色
	 * **/
	_plus.checkStatusStyle = function(colorString){
		try{
			clientEngine.checkStatusStyle(colorString);
		}catch(e){
			
		}
	}
	
	/**
	 * 打开一个外网地址,并返回到制定的本地资源页面
	 * strWebURL:外网地址
	 * strTitle:新开窗体标题
	 * strBackURL:本地资源页面路径
	 * **/
	_plus.openOneURL = function(strWebURL,strTitle,strBackURL){
		try{
			if(_plus.isPC == true) window.location.href = strWebURL ;
			else clientEngine.openOneURL(strWebURL,strTitle,strBackURL); 
		}catch(e){
			_plus.tryInfo(e);
		}
	}
	
	_plus.checkStatusStyle('');
	_plus.setControlAndroidBack(2);
	