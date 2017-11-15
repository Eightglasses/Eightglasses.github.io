var strAlertHTML="<div id='divAlert' class='alertCSs'></div>";
document.writeln(strAlertHTML);
var nAlertOpacity=1;
function setOpacity(obj,value)
{ 
	obj.style.opacity = value; 
	obj.style.filter = 'alpha(opacity=' + value + ')'; 
}

window.alert=function(strText,time)
{
	if(null == time || time=="" || time == undefined)time=300;
	document.getElementById("divAlert").style.backgroundColor="#000";
	document.getElementById("divAlert").innerText=strText;
	document.getElementById("divAlert").style.display="block";
	
	nAlertOpacity=0.6;
	setOpacity(document.getElementById("divAlert"),nAlertOpacity);
	setTimeout("onAlertTimeout()",time);
}

var error=function(strText)
{
	document.getElementById("divAlert").style.backgroundColor="#000";
	document.getElementById("divAlert").innerText=strText;
	document.getElementById("divAlert").style.display="block";
	
	nAlertOpacity=0.6;
	setOpacity(document.getElementById("divAlert"),nAlertOpacity);
	setTimeout("onAlertTimeout()",3000);
}


var onAlertTimeout=function()
{
	if(nAlertOpacity>=0)
	{
		nAlertOpacity-=0.1;
	}
	setOpacity(document.getElementById("divAlert"),nAlertOpacity);
	
	if(nAlertOpacity==0||nAlertOpacity<0.1)
	{
		document.getElementById("divAlert").style.display="none";
		return;
	}
	setTimeout("onAlertTimeout()",100);
}

