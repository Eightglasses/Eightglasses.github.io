/**
 * 	弹框插件
 * 	open1 单选提示弹框（无回调函数）
 *  @param content 提示内容
 * 	_TTPopups.open1({
 *		content:"这条数据删除后，将不可恢复!"
 *	});
 * 	
 * 
 * 
 *  open2 打开提示信息弹框（有回调函数）
 *  @param content 提示内容
 *  @param cancelBtn 取消按钮或关闭
 *  @param submitBtn 确定按钮或者前往其他
 *  @param closeCallBack 回调函数
 *	 * 按钮的回调
 * 	 0：取消
 *   1：确定
 *  _TTPopups.open2({
 *		content:"这条数据删除后，将不可恢复!",
 *		cancelBtn:"取消",
 *		submitBtn:"删除",
 *		closeCallBack:"popCallBackDelDB"
 *	 });
 *
 *
 */

(function(window,undefined){
	
	var TTPopups=function(){
		
		this.zzId1 = "TTPopups_zz_div_id";
		this.zDivId1 = "TTPopups_z_div_id";
		this.tran = 0.7;
		this.opacity = 0;
	}
	
	TTPopups.prototype={
		
		open1:function(options){
			
				this.opt=this.setOpt(options);
				this.layertype1();
				
				//解决点击延迟与按钮生成之间的冲突  lhh 2015-08-25
				var that = this;
				setTimeout(function(){
					that.closePupus1();   
				}, 300)
				
		},
		open2:function(options){
			
				this.opt=this.setOpt(options);
				this.layertype2();
				
				//解决点击延迟与按钮生成之间的冲突  lhh 2015-08-25
				var that = this;
				setTimeout(function(){
					that.closePupus1();   
				}, 300)
				
		},
		layertype1:function(){
				var strhtml = "";
				var body = document.getElementsByTagName("body")[0];
	        
				strhtml = strhtml + "<div id=\""+this.zzId1+"\" style=\"position: fixed;background: #000;background: rgba(0,0,0,.3);filter: Alpha(opacity=30);z-index: 10000;display: block;top: 0;left: 0; width:100%;height:100% \"></div>";
				strhtml = strhtml + "<div id=\""+this.zDivId1+"\" style='width: 80%;left: 10%;top: 30%;border-radius: 5px;position: fixed;z-index: 11000;background: #fff; transform: scale(0.7); opacity:0'>"; 
					strhtml = strhtml + "<div  style='text-align: center;'>";
						strhtml = strhtml + "<div style=\"margin-top: 15px; font-size: 0.24rem; margin-bottom: 10px;line-height: 30px;\">";
						strhtml = strhtml + ""+this.opt.content+"";	
						strhtml = strhtml + "</div>";	
						strhtml = strhtml + "<div  class=\"api_rechsr_submit\" style=\"width: 100%;border-top: 1px solid #EAEAEB;margin-top: 5%;\">";				
							strhtml = strhtml + "<div id=\"submitBtn\" class=\"api_rech_lefts_Button\" index=\"0\" style=\"width: 100%;float: left;font-size: 0.22rem;color: #007AFF;height: 40px;line-height: 40px; \">";					
							strhtml = strhtml + ""+this.opt.submitBtn+"";					
							strhtml = strhtml + "</div>";					
				 	 			
						strhtml = strhtml + "</div>";			 	 	
					strhtml = strhtml + "</div>";			 			 
				strhtml = strhtml + "</div>";			  					
																
				var div = document.createElement("div");
				div.id = "acremove";
				div.innerHTML = strhtml;
				
				body.appendChild(div);		  
				this.submitBtn = document.getElementById("submitBtn"); 
				this.zzDiv1 = this.zzId1;
				this.zDiv1 = this.zDivId1;					    
				this.content1 = this.content;
				this.opacity = 0;
				this.tran = 0.7; 
				this.animat(this.zDivId1);
			     document.ontouchmove = function(e){ e.preventDefault();}
		},
		layertype2:function(){
			
			var strhtml = "";
			var body = document.getElementsByTagName("body")[0];
        
			strhtml = strhtml + "<div id=\""+this.zzId1+"\"  style=\"position: fixed;background: #000;background: rgba(0,0,0,.3);filter: Alpha(opacity=30);z-index: 10000;display: block;top: 0;left: 0; width:100%;height:100% \"></div>";
			strhtml = strhtml + "<div id=\""+this.zDivId1+"\"  style='width: 80%;left: 10%;top: 30%;border-radius: 5px;position: fixed;z-index: 11000;background: #fff; transform: scale(0.7); opacity:0'>"; 
				strhtml = strhtml + "<div  style='text-align: center;'>";
					strhtml = strhtml + "<div  style=\"margin-top: 15px;  font-size: 0.24rem; margin-bottom: 10px;line-height: 30px;\">";
					strhtml = strhtml + ""+this.opt.content+"";	
					strhtml = strhtml + "</div>";	
					strhtml = strhtml + "<div  style=\"width: 100%;border-top: 1px solid #EAEAEB;margin-top: 5%;\">";				
						strhtml = strhtml + "<div id=\"cancelBtn\"  index=\"0\" style=\"width: 49%;float: left;font-size: 0.22rem;color: #007AFF;border-right: 1px solid #EAEAEB;height: 40px;line-height: 40px; \">";					
						strhtml = strhtml + ""+this.opt.cancelBtn+"";					
						strhtml = strhtml + "</div>";					
						strhtml = strhtml + "<div id=\"submitBtn\" index=\"1\" style=\"width: 50%;float: left;color: #007AFF;font-size: 0.22rem;height: 40px;line-height: 40px;\">";					
						strhtml = strhtml + ""+this.opt.submitBtn+"";					
						strhtml = strhtml + "</div>";			 	 			
					strhtml = strhtml + "</div>";			 	 	
				strhtml = strhtml + "</div>";			 			 
			strhtml = strhtml + "</div>";			 					
															
			var div = document.createElement("div");
			div.id = "acremove";  
			div.innerHTML = strhtml;
			
			body.appendChild(div);		 
			this.cancelDom = document.getElementById("cancelBtn");	
			this.submitBtn = document.getElementById("submitBtn");
			this.zzDiv1 = this.zzId1;
			this.zDiv1 = this.zDivId1;					    
			this.content1 = this.content;
			this.opacity = 0;
			this.tran = 0.7; 
			this.animat(this.zDivId1);
		     document.ontouchmove = function(e){ e.preventDefault();}
		},
		closePupus1:function(){	//绑定事件 
			this.resize(); //浏览器变化弹框背景高度和宽度自适应
			if(this.cancelDom){
				this.addEvent(this.cancelDom,'click',this.bind(this,closefn)); 
			    this.addEvent(this.submitBtn,'click',this.bind(this,closefn));
			}else{					
			    this.addEvent(this.submitBtn,'click',this.bind(this,closefn));
			}
		   function closefn(e){	
		   		var dom = e.srcElement || e.target;
		   		var index = dom.getAttribute("index");
		   		var that=this;
		   		
		  	    var _zzDiv1 = document.getElementById(that.zzDiv1);    
		   		var _zDiv1 = document.getElementById(that.zDiv1);
		   		var acremove = document.getElementById("acremove");
		   		var strNeedVal = jQuery(_zDiv1).find("textarea:eq(0)").val();//
		   		if(index == "1" && strNeedVal == ""){//确定的时候textarea必填
		   			jQuery(_zDiv1).find("span[errorSpan]").html("</br>退还原因必填");
		   			return false;
		   		}
				//console.log(_zzDiv1);
				if(_zzDiv1){
					 _zzDiv1.parentNode.removeChild(_zzDiv1);   
			   		 _zDiv1.parentNode.removeChild(_zDiv1);    
				}
				acremove.parentNode.removeChild(acremove); 
		   		
		   		document.ontouchmove = function(e){}
		   		if(that.opt.closeCallBack && that.opt.closeCallBack.length > 0){
		   			var func = that.opt.closeCallBack;
	   	 		 	eval(func+"('"+index+"','"+strNeedVal+"')");
		   		}
		   }
		},
		bind:function(o,fn)
		{
			return function(){
				return fn.apply(o,arguments)
			}
		}, 
		animat: function(id){
			var andom = document.getElementById(id);
			var that = this;
			
			var otime = setInterval(function(){
				that.opacity += 0.1;
				andom.style.opacity = that.opacity.toFixed(1);
				
				if(that.opacity>=0.9){
					clearInterval(otime);	
				}
			},20);
			var timeout = setInterval(function(){
				that.tran += 0.1;
				andom.style.webkitTransform="scale("+that.tran.toFixed(1)+")";
				if(that.tran > 0.9){
					clearInterval(timeout); 
				}
			},20); 
			
		},
		addEvent: function(e, n, o){
			if(e.addEventListener){
			 	e.addEventListener(n, o,false); 
			} else if(e.attachEvent){
				e.attachEvent('on' + n, o);
			}
		},
		winWidth:function(){
	  		if (window.innerWidth){
				winWidth = window.innerWidth; 
			}else if((document.body) && (document.body.clientWidth)){
				winWidth = document.body.clientWidth; 
			}
	  		return winWidth;
		},
		winHeight:function(){
			//获取窗口高度 
			if (window.innerHeight){
				winHeight = window.innerHeight; 
			}else if ((document.body) && (document.body.clientHeight)){
				winHeight = document.body.clientHeight;
			}
			return winHeight;
		},			
		resize:function(){
			var zzID_bk = document.getElementById(this.zzId1);
			this.addEvent(window, 'resize', function () {
				var width = getInner().width;
				var height = getInner().height;
				zzID_bk.style.width = width+"px";
				zzID_bk.style.height = height+"px";
				function getInner(){
					if (typeof window.innerWidth != 'undefined') {
						return {
							width : window.innerWidth,
							height : window.innerHeight
						}
					} else {
						return {
							width : document.documentElement.clientWidth,
							height : document.documentElement.clientHeight
						}
					}							
				}

			})
		},
		setOpt:function(o){
			var defaultOptions={
				title:'',			//title  
				content:'',			//内容 
				closeCallBack:null,	//关闭执行的回调函数  
				cancelBtn:'取消',	//取消文字  
				submitBtn:'确定'	//确定按钮的文字 

			};	
			if(o && Object.prototype.toString.call(o)=='[object Object]')
			{
				for(var k in o)
				{
					defaultOptions[k]= typeof o[k]==='undefined' ? defaultOptions[k] : o[k];
				}
			}
			return defaultOptions; 
		}
		
		
	}
	
	window.TTPopups=TTPopups;
	
	
})(window,undefined)


var _TTPopups = new TTPopups();