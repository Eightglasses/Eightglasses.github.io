/*
	ajax
	upload
*/
var ajax = function(url,callback,progress){
	var xhr = new XMLHttpRequest();

	xhr.open('get',url,true);
	xhr.responseType = 'arraybuffer';
	xhr.onprogress = progress;

	xhr.onload = function(){
		callback(xhr.response);
	};

	xhr.send();

};

var upload = function(file,callback){
	var fr = new FileReader();

	fr.onload = function(ev){
		callback(ev.target.result);
	};

	fr.readAsArrayBuffer(file);
};