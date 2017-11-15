/**
 * 	上拉加载列表插件
 *  @param scrollid 列表页滚动的ID，如果滚动条在body上不需要传ID
 *  @param loadId 加载动画的ID，在加载的时候显示加载完毕需要用这个ID操作
 *  @param slip 控制向上向下拉动方向，目前只支持向下拉动
 *  @param closeCallBack 执行回调函数拉动到最底部时回调
 *  
 *  引用方法
 *	 _Downscroll.nscroll({
 * 		scrollid："sid", //可选 滚动条在body上不需要传此参数
 *      loadId:"01",     //必须 加载动画的ID，在加载的时候显示加载完毕需要用这个ID操作
 *      slip:"",         //可以不传
 *		closeCallBack:"asd"  //必须回调函数
 *	 });
 * 	 显示动画方法调用 _Downscroll.loadShow();
 *   隐藏动画方法调用 _Downscroll.loadHide();
 */

(function(window,undefined){
	
	var Downscroll=function(){
		this.opt = this.setOpt({});
		if(typeof _plus != 'undefined' && _plus!= null){
			this.index = _plus.raiseTransIndex;
		}
	}
	
	Downscroll.prototype={
		
		nscroll:function(options){
			this.opt=this.setOpt(options);				
			//解决点击延迟与按钮生成之间的冲突  lhh 2015-08-25				
			(typeof this.opt.scrollid=="undefined") ? this.winscroll() : this.idscroll();
			this.creatediv();
			this.xloading();
		},
		winscroll:function(){	
			var that = this;
			window.onscroll = function(){
				var conOffset = this.offsetTop;
				var scrollTop = that.getScrollTop();	 			   
				var scrollHeight = that.getScrollHeight();
				var windowHeight = that.getWindowHeight();
				if(scrollTop + windowHeight >= scrollHeight-10){
					var func = that.opt.closeCallBack;
					if(typeof _plus != 'undefined' && _plus!= null ){
						if(that.index != _plus.raiseTransIndex){
							eval(func+"()");
							that.index == _plus.raiseTransIndex
						}
					}
				}
			}
		},
		idscroll:function(){
			var that = this;		
			that.getId(this.opt.scrollid).onscroll = function(){
			   var conOffset = this.offsetTop;
			   var scrollTop = this.scrollTop;			   
			　   var scrollHeight = this.scrollHeight;
			　  var windowHeight = document.body.clientHeight-conOffset;
			　  if(scrollTop + windowHeight >= scrollHeight-10){
					var func = that.opt.closeCallBack;
					if(typeof _plus != 'undefined' && _plus!= null ){
						if(that.index != _plus.raiseTransIndex){
							eval(func+"()");
							that.index == _plus.raiseTransIndex
						}
					}
			　　}
			}		
		},
		creatediv:function(){
			var loadhtml = "";
			var dealload = "width:100%;height:0.5rem;background:#FFF;line-height:0.5rem;position:absolute;bottom:0px;z-index:100;display:none";
			var bodyload = "width:100%;height:0.5rem;background:#FFF;line-height:0.5rem;display:none";
			var loadstyle = (typeof this.opt.scrollid=="undefined") ? bodyload : dealload;
			var body = document.getElementsByTagName("body")[0];
			loadhtml = loadhtml + "<div style="+loadstyle+" id="+this.opt.loadId+">";
			loadhtml = loadhtml + "<div style=\"width: 100%;text-align: center;color: #999999;display:block;height:0.5rem;line-height:0.5rem;position: relative;font-size: 0.16rem;\"><div id=\"loadfoo\" style=\"position: absolute;left: 37%;top: 45%;\"></div>努力加载中...</div>";
			loadhtml = loadhtml + "</div>";		
			var div = document.createElement("div");
			div.innerHTML = loadhtml;
			body.appendChild(div);
				
		},
		getId:function(id){
			return document.getElementById(id);
		},
		getScrollTop:function(){
			var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
		　　if(document.body){
		　　　　bodyScrollTop = document.body.scrollTop;
		　　}
		　　if(document.documentElement){
		　　　　documentScrollTop = document.documentElement.scrollTop;
		　　}
		　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
		　　return scrollTop;		
		},
		getScrollHeight:function(){
			var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
		　　if(document.body){
		　　　　bodyScrollHeight = document.body.scrollHeight;
		　　}
		　　if(document.documentElement){
		　　　　documentScrollHeight = document.documentElement.scrollHeight;
		　　}
		　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
		　　return scrollHeight;
			
		},
		getWindowHeight:function(){//浏览器视口的高度
		   var windowHeight = 0;
		　　return document.body.clientHeight;
			
		},
		loadShow:function(){		
			if(this.opt.loadId){
				var dom =  this.getId(this.opt.loadId);
				if(dom){
					dom.style.display = "block";
				}
			}
		},
		loadHide:function(){
			if(this.opt.loadId){
				var dom =  this.getId(this.opt.loadId);
				if(dom){
					dom.style.display = "none";
				}
			}		
		},
		setOpt:function(o){
			var defaultOptions={
				scrollid:undefined,			//滑动事件ID 不传ID取body事件
				loadId:"public_loading",	//加载小动画ID
				slip:"up",	//上、下、同时
				closeCallBack:null	//关闭执行的回调函数
			};	
			if(o && Object.prototype.toString.call(o)=='[object Object]')
			{
				for(var k in o)
				{
					defaultOptions[k]= typeof o[k]==='undefined' ? defaultOptions[k] : o[k];
				}
			}
			return defaultOptions;
		},
		xloading:function(){
			var opts = {
			     lines: 10, // loading小块的数量
			     length: 2, // 小块的长度
			     width: 1, // 小块的宽度
			     radius: 3, // 整个圆形的半径
			     corners: 1, // 小块的圆角，越大则越圆
			     rotate: 0, // loading动画的旋转度数，貌似没什么实际作用
			     color: '#000', // 颜色
			     speed: 1, // 变换速度 
			     trail: 60, // 余晖的百分比
			     shadow: false, // 是否渲染出阴影
			     hwaccel: false, // 是否启用硬件加速
			     className: 'spinner', // 给loading添加的css样式名
			     zIndex: 2e9 // The z-index (defaults to 2000000000)
			    };
		    var target = document.getElementById('loadfoo'); 
		    var spinner = new Spinner(opts).spin(target);
		}	
	}	
	window.Downscroll=Downscroll;	
})(window,undefined)
var _Downscroll = new Downscroll();

