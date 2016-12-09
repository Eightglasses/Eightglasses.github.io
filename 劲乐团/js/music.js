/*
	music对象创建

*/

var Music = function(cas){
	//音频解析对象
	this.ac = new AudioContext();
	this.gc = cas.getContext("2d");
	this.status = 0;
	this.onready = null;
	this.onstart = null;
	this.onend = null;
};
Music.prototype = {
	constructor:Music,
	read:function(data){
		
		if(this.status > 0){

			this.stop();
		}
		var that = this;
		//音频处理
		//解析音频数据。
		this.ac.decodeAudioData(data,function(buffer){
			//buffer>音源

			//创建音频输出节点
			var source = that.ac.createBufferSource();
			//创建频谱分析对象。
			var analyser = that.ac.createAnalyser();
			//音源=>分析器=>音频输出节点
			source.connect(analyser);
			analyser.connect(that.ac.destination);
			//添加音频数据
			source.buffer = buffer;
			
			that.source = source;
			that.analyser = analyser;
			that.onready&&that.onready();
		},function(error){
			console.log(error);
		});
	
	},
	play:function(){
		this.status = 1;
		//播放
		this.source.start(0);
		this.onstart&&this.onstart();
	},
	stop:function(){
		//停止播放
		this.source.stop(0);
		this.onend&&this.onend();
	},
	sonic:function(){
		var analyser = this.analyser;
		var data = new Uint8Array(128);
		//analyser.frequencyBinCount
		console.log(data);
		var gc = this.gc;
		var gradient1 =gc.createLinearGradient(0, 0, 0, 100);
			gradient1.addColorStop(0, "rgb(255, 0, 0)");
			gradient1.addColorStop(0.7, "rgb(0, 255, 0)");	
			gradient1.addColorStop(1, "rgb(0, 0, 255)");
		var gradient2 = gc.createLinearGradient(0, 0, 0, 90);
			gradient2.addColorStop(1, "rgba(255, 120, 120, 0.3)");
			gradient2.addColorStop(0.5, "rgba(120, 255, 120, 0.6)");	
			gradient2.addColorStop(0, "rgba(120, 120, 255, 1)");	
		(function(){
			var arg = arguments;
			requestAnimationFrame(function(){
				analyser.getByteFrequencyData(data);
				gc.clearRect(0, 0, 500, 300);
								
				for(var i=0;i<512;i++){
					gc.fillStyle = gradient1;
					gc.fillRect(i*2, 150-data[i], 1, data[i]);					
					gc.save();
					gc.translate(0, 150);					
					gc.fillStyle = gradient2;
					gc.fillRect(i*2, 0, 1, data[i]);			
					gc.restore();
				}
				
				arg.callee();
			})
		})();
	}
}