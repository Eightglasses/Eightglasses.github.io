function Box_object() {

}
Box_object.prototype.shopacity = 0;
Box_object.prototype.nAlertwidht = 0;
Box_object.prototype.hidewidht = 40; 
Box_object.prototype.nAlertleft=3;
Box_object.prototype.atleft=30;
Box_object.prototype.directionarr = ['width','left'];
Box_object.prototype.c_ification = document.getElementById("c_ification");
Box_object.prototype.cl_ttext = document.getElementById("cl_ttext");
Box_object.prototype.app_Round_onclick = document.getElementById("app_Round_onclick");
Box_object.prototype.app_Round_onclick01 = document.getElementById("app_Round_onclick01");
Box_object.prototype.shownavigation = function(){  //点击显示

	that = this;
	this.c_ification.style.display='block'; 
	this.setOpacityshow(this.c_ification,this.shopacity,this.nAlertwidht); 
	setTimeout(function(){
    	that.onAlertTimeoutshow();
    	that.onclickTimeoutshow();
    },5);  
}
Box_object.prototype.hidenavigation = function(){    //点击隐藏
	that = this;
	//this.setOpacityshow(this.c_ification,this.shopacity,this.nAlertwidht); 
	setTimeout(function(){
    	that.onAlertTimeouthide();
    	that.onclickTimeouthide();
    },5);
}
Box_object.prototype.onclickTimeoutshow = function(){  //按钮滑出
	that = this;
	if(this.nAlertleft<=30) 
	{
		this.nAlertleft+=1;
	}
	if(this.nAlertleft >=30){ 
		this.app_Round_onclick.style.display='none';
		this.app_Round_onclick01.style.display='block'; 
		this.nAlertleft=0;
		return false;
	}	
	that.setOpacityshow(this.app_Round_onclick,this.shOpacity,this.nAlertleft,this.directionarr[1]);
	that.setOpacityshow(this.app_Round_onclick01,this.shOpacity,this.nAlertleft,this.directionarr[1]);
	setTimeout(function(){
			that.onclickTimeoutshow();
	},5);
	
}
Box_object.prototype.onAlertTimeouthide = function(){ //按钮滑入
	that = this;
	var hideacity = 0.8;
	if(this.hidewidht>=0)
	{
		this.hidewidht-=1;
	}
 	if(this.hidewidht==0||this.hidewidht<1){
 		this.c_ification.style.display="none";	
 		this.hidewidht = 40;
		return  false; 
 	}
	this.cl_ttext.style.display="none"; 
	this.setOpacityshow(this.c_ification,this.hideacity,this.hidewidht,this.directionarr[0]);
	setTimeout(function(){
		that.onAlertTimeouthide();
	},5);
}
Box_object.prototype.onclickTimeouthide = function(){
	that = this;
	if(this.atleft>=2) 
	{
		this.atleft-=1;
	}
	if(this.atleft <=2){
		this.app_Round_onclick01.style.display='none';
		this.app_Round_onclick.style.display='block'; 
		this.atleft = 30;
		return false;
	}
	that.setOpacityshow(this.app_Round_onclick,this.shOpacity,this.atleft,this.directionarr[1]);
	that.setOpacityshow(this.app_Round_onclick01,this.shOpacity,this.atleft,this.directionarr[1]);
	setTimeout(function(){			
			that.onclickTimeouthide();
		},5);
}
Box_object.prototype.setOpacityshow = function(obj,value,argument,direction){  
	obj.style.opacity = value; 
	obj.style.filter = 'alpha(opacity=' + value + ')'; 
	if (direction == 'width'){
		obj.style.width = argument + '%'; 
	}else if(direction == 'left'){
		obj.style.left = argument + '%'; 
	}
}
Box_object.prototype.onAlertTimeoutshow = function(){
	that = this;
	if(this.shopacity<=0.8)
	{
		this.shopacity+=0.1;
	}
	if(this.nAlertwidht<=40)
	{
		this.nAlertwidht+=1;  
	}
	if(this.nAlertwidht>=41){
		this.cl_ttext.style.display="block"; 
		this.nAlertwidht = 0;
		this.shopacity = 0;
		return false;
	}
	this.setOpacityshow(this.c_ification,this.shopacity,this.nAlertwidht,this.directionarr[0]);
	setTimeout(function(){
    	//alert(11);
    	that.onAlertTimeoutshow();
    },5);
};

/* 实例化Box,以后都用_box调用 */

var _Box_object = new Box_object();	




//_box.shownavigation();

