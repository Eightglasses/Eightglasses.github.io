(function(window,undefined){
	
	var upload = function(){
		this.init();
	};
	
	upload.prototype={
		init:function(){
			var inputDom = document.createElement("input");
			inputDom.type = "file";
		    inputDom.setAttribute("accept","image/*");
		    inputDom.setAttribute("multiple","multiple");
		    this.inputDom = inputDom;
		    this.bindChange();
		},
		start:function(o){
			this.opt = this.setOpt(o);
			this.inputDom.value = "";
			this.canvasBefore();
			this.inputDom.click();
		},
		bindChange:function(){
			var dom = this.inputDom;
			var that = this;
		 	dom.onchange = function() {
		 		try{
		 			
				    if (!this.files.length) return;
				    var files = Array.prototype.slice.call(this.files);
				    if (files.length > 1) {
				        alert("最多只可上传1张图片");
				        return;
				    }
				    
				    _shade_layer.show("上传中，请稍后...");
				    files.forEach(function(file, i) {
				        if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
				        var reader = new FileReader();
				
				        //获取图片大小
				        var size = file.size / 1024 > 1024 ? (~~ (10 * file.size / 1024 / 1024)) / 10 + "MB": ~~ (file.size / 1024) + "KB";
				        
				        reader.onload = function() {
				            var result = this.result;
				            var img = new Image();
				            img.src = result;
				            
				            //超出大小
				            if(result.length > that.opt.maxSize){
				            	alert("图片大小不能超过5M");
				            	_shade_layer.hide();
				            	return;
				            }
				            
				            //如果图片大小小于100kb，则直接上传
				            if (result.length <= that.opt.minSize) {
				                img = null;
				                that.upload(result, file.type);
				                return;
				            }
				            //图片加载完毕之后进行压缩，然后上传
				            if (img.complete) {
				                callback();
				            } else {
				                img.onload = callback;
				            }
				            function callback() {
				                var data = that.compress(img);
				                that.upload(data, file.type);
				                img = null;
				            }
				        };
				        reader.readAsDataURL(file);
				    })
				    
		 		}catch(e){
		 			_shade_layer.hide();
		 			alert("上传出现错误");
		 			return ;
		 		}
			};
		},
		/**
		 * 绘制压缩图片的canvas
		 */
		canvasBefore:function(){
			var canvasDom = document.getElementById("canvas_id");
			if(canvasDom){canvasDom.parent().remove();}
			
			var tCanvasDom = document.getElementById("tCanvas_id");
			if(tCanvasDom){tCanvasDom.parent().remove();}
			
			//用于压缩图片的canvas
			var canvas = document.createElement("canvas");
			canvas.id = "canvas_id";
			this.canvas = canvas;
			this.ctx = canvas.getContext('2d');
			
			//瓦片canvas
			var tCanvas = document.createElement("canvas");
			tCanvas.id = "tCanvas_id";
			this.tCanvas = tCanvas;
			this.tctx = tCanvas.getContext("2d");
		},
		/**
		 * 使用canvas对大图片进行压缩
		 * @param {} img   图片对象
		 * @return {}
		 */
		compress:function(img) {
			var canvas = this.canvas;
			var tCanvas = this.tCanvas;
			var tctx = this.tctx;
			var ctx = this.ctx;
			
		    var initSize = img.src.length;
		    var width = img.width;
		    var height = img.height;
		
		    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
		    var ratio;
		    if ((ratio = width * height / 4000000) > 1) {
		        ratio = Math.sqrt(ratio);
		        width /= ratio;
		        height /= ratio;
		    } else {
		        ratio = 1;
		    }
		    canvas.width = width;
		    canvas.height = height;
		
		    //铺底色
		    ctx.fillStyle = "#fff";
		    ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		    //如果图片像素大于100万则使用瓦片绘制
		    var count;
		    if ((count = width * height / 1000000) > 1) {
		        count = ~~ (Math.sqrt(count) + 1); //计算要分成多少块瓦片
		        //计算每块瓦片的宽和高
		        var nw = ~~ (width / count);
		        var nh = ~~ (height / count);
		        tCanvas.width = nw;
		        tCanvas.height = nh;
		        for (var i = 0; i < count; i++) {
		            for (var j = 0; j < count; j++) {
		                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
		                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
		            }
		        }
		    } else {
		        ctx.drawImage(img, 0, 0, width, height);
		    }
		    
		    //进行最小压缩
		    var ndata = canvas.toDataURL('image/jpeg', this.opt.proportion);
		    /*
		    console.log('压缩前：' + initSize);
		    console.log('压缩后：' + ndata.length);
		    console.log('压缩率：' + ~~ (100 * (initSize - ndata.length) / initSize) + "%");
		    */
		    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
		    
		    this.canvas = canvas;
			this.tCanvas = tCanvas;
			this.tctx = tctx;
			this.ctx = ctx;
		    return ndata;
		},
		/**
		   * 获取blob对象的兼容性写法
		   * @param buffer
		   * @param format
		   * @returns {*}
		   */
		getBlob:function(buffer, format) {
		    try {
		        return new Blob(buffer, {
		            type: format
		        });
		    } catch(e) {
		        var bb = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
		        buffer.forEach(function(buf) {
		            bb.append(buf);
		        });
		        return bb.getBlob(format);
		    }
		},
		/**
		 * 获取formdata
		 * @return {}
		 */
		getFormData:function() {
		    var isNeedShim = ~navigator.userAgent.indexOf('Android') && ~navigator.vendor.indexOf('Google') && !~navigator.userAgent.indexOf('Chrome') && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
		    return isNeedShim ? new this.FormDataShim() : new FormData();
		},
		/**
		 * formdata 补丁, 给不支持formdata上传blob的android机打补丁
		 */
		FormDataShim:function() {
		    var o = this,
		    parts = [],
		    boundary = Array(21).join('-') + ( + new Date() * (1e16 * Math.random())).toString(36),
		    oldSend = XMLHttpRequest.prototype.send;
		    this.append = function(name, value, filename) {
		        parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
		        if (value instanceof Blob) {
		            parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
		            parts.push(value);
		        } else {
		            parts.push('\r\n\r\n' + value);
		        }
		        parts.push('\r\n');
		    };
		
		    // Override XHR send()
		    XMLHttpRequest.prototype.send = function(val) {
		        var fr, data, oXHR = this;
		        if (val === o) {
		            // Append the final boundary string
		            parts.push('--' + boundary + '--\r\n');
		            // Create the blob
		            data = getBlob(parts);
		            // Set up and read the blob into an array to be sent
		            fr = new FileReader();
		            fr.onload = function() {
		                oldSend.call(oXHR, fr.result);
		            };
		            fr.onerror = function(err) {
		                throw err;
		            };
		            fr.readAsArrayBuffer(data);
		            // Set the multipart content type and boudary
		            this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
		            XMLHttpRequest.prototype.send = oldSend;
		        } else {
		            oldSend.call(this, val);
		        }
		    };
		},
		/**
		 * 图片上传，将base64的图片转成二进制对象，塞进formdata上传
		 * @param {} basestr  
		 * @param {} type
		 * @param {} $li
		 */
		upload:function(basestr, type) {
			var that = this;
		    var text = window.atob(basestr.split(",")[1]);
		    var buffer = new Uint8Array(text.length);
		    var pecent = 0,
		    loop = null;
		    for (var i = 0; i < text.length; i++) {
		        buffer[i] = text.charCodeAt(i);
		    }
		    var blob = this.getBlob([buffer], type);
		    var xhr = new XMLHttpRequest();
		    var formdata = this.getFormData();
		    formdata.append('imagefile', blob);
		    xhr.open('post', this.opt.uploadURL);
		    xhr.onreadystatechange = function() {
		    	this.canvas = null;
				this.tCanvas = null;
				this.tctx = null;
				this.ctx = null;
				
				var func = that.opt.callBackFunc;
	        	var id = that.opt.id;
				
	        	var oDataObj = that.opt.oDataObj;
	        	var nType = that.opt.nType;
	        	var frameCallBackFunc = that.opt.frameCallBackFunc;
	        	var strCallbackFunc = that.opt.strCallbackFunc;
	        	oDataObj["strCallbackFunc"] = strCallbackFunc;
	        	oDataObj["nType"] = nType;
	        	
		        if (xhr.readyState == 4 && xhr.status == 200) {
		        	var url = xhr.responseText || "";
		            console.log(url);
	            	var nState = url.length == 0 ? -1 : 0;
	            	var strMsg = url.length == 0 ? "上传失败" : url;
	            	oDataObj["nState"] = nState;
		        	oDataObj["strMsg"] = strMsg;
		        	oDataObj = JSON.stringify(oDataObj);
	            	eval(frameCallBackFunc+"('"+oDataObj+"')");
		            _shade_layer.hide();
		        }
		        
		        if(xhr.status != 200){
		        	oDataObj["nState"] = -1;
		        	oDataObj["strMsg"] = "上传失败";
		        	oDataObj = JSON.stringify(oDataObj);
		        	eval(frameCallBackFunc+"('"+oDataObj+"')");
		        	_shade_layer.hide();
		        }
		    };
		    xhr.send(formdata);
		
		},setOpt:function(o){
			var defaultOptions={  
					nType:'',			 //回调的不同类型，通过这个类型来改_plus.callbackuploadPicture里面对于回调的具体方法，其实主要就是控制最终回调函数的参数
					minSize:100 * 1024,  //最小为100kb,也就是说100kb以下的不压缩直接上传
					maxSize:1024 * 1024 * 5,  //最大为10M,也就是说100kb以下的不压缩直接上传
					proportion:0.3,    //压缩比例：从0-1之间
					strCallbackFunc:'',
					frameCallBackFunc:'',
					oDataObj:{},
					uploadURL:'https://pocketwap.dafy.com/Servlet/fileUpload.svl'
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
	
	window.upload=upload;
})(window,undefined)

var _upload = new upload();
