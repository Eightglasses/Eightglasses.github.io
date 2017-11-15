//随机得到一个0和nMaxNumber之间的整数
function rand(nMaxNumber)
{
	return Math.round(Math.random()*nMaxNumber);
}

//将一个文本串编码成XML文本串
function encodeToXMLText(strText)
{
	var strOutput="";
	var nLength=strText.length;
	for(var i=0;i<nLength;i=i+1)
	{
		var ch=strText.charAt(i);
		switch(ch)
		{
			case '&':
				strOutput+="&amp;";
				break;
			case '/':
				strOutput+="&#47;";
				break;
			case '\'':
				strOutput+="&#039;";
				break;
			case '>':
				strOutput+="&gt;";
				break;
			case '<':
				strOutput+="&lt;";
				break;
			case '\"':
				strOutput+="&quot;";
				break;
			case '\r':
				strOutput+="&#xd;";
				break;
			case '\n':
				strOutput+="&#xa;";
				break;
			default:
				strOutput+=ch;
		}
	}
	return strOutput;
}

//将一个文本串编码成HTML文本串
function encodeToHTMLText(strText)
{
	var strOutput="";
	var nLength=strText.length;
	for(var i=0;i<nLength;i=i+1)
	{
		var ch=strText.charAt(i);
		switch(ch)
		{
			case '&':
				strOutput+="&amp;";
				break;
			case '/':
				strOutput+="&#47;";
				break;
			case ' ':
				strOutput+="&nbsp;";
				break;
			case '\'':
				strOutput+="&#039;";
				break;
			case '>':
				strOutput+="&gt;";
				break;
			case '<':
				strOutput+="&lt;";
				break;
			case '\"':
				strOutput+="&quot;";
				break;
			case '\r':
				strOutput+="&#xd;";
				break;
			case '\n':
				strOutput+="&#xa;";
				break;
			default:
				strOutput+=ch;
		}
	}
	return strOutput;
}

function replaceChar(strText,chFromChar,chToChar)
{
	var strResult="";
	
	for(var i=0;i<strText.length;i=i+1)
	{
		var ch=strText.charAt(i);
		if(ch==chFromChar)
		{
			strResult+=chToChar;
		}
		else
		{
			strResult+=ch;
		}
	}
	
	return strResult;
}

function trimLeft(strText)
{
	var nIndex=0;
	for(var i=0;i<strText.length;i=i+1)
	{
		var ch=strText.charAt(i);
		if(ch==' ' || ch=='\n' || ch=='\t')
		{
			nIndex++;
		}
		else
		{
			break;
		}
	}
	
	return strText.substr(nIndex);
}

function trimRight(strText)
{
	var nIndex=strText.length;
	for(var i=strText.length-1;i>=0;i=i-1)
	{
		var ch=strText.charAt(i);
		if(ch==' ' || ch=='\n' || ch=='\t')
		{
			nIndex--;
		}
		else
		{
			break;
		}
	}
	
	return strText.substr(0,nIndex);
}

function trim(strText)
{
	var strResult=trimLeft(strText);
	strResult=trimRight(strResult);

	return strResult;
}

function getBrowserType() 
{ 
	var OsObject = ""; 

	if(navigator.userAgent.indexOf("MSIE")>=0)
	{ 
		return "MSIE"; //IE浏览器 
	} 
	if(navigator.userAgent.indexOf("Firefox")>=0)
	{ 
		return "Firefox"; //Firefox浏览器 
	} 
	if(navigator.userAgent.indexOf("Safari")>=0)
	{ 
		return "Safari"; //Safan浏览器 
	} 
	if(navigator.userAgent.indexOf("Camino")>=0)
	{ 
		return "Camino"; //Camino浏览器 
	} 
	if(navigator.userAgent.indexOf("Gecko/")>=0)
	{ 
		return "Gecko"; //Gecko浏览器 
	}
	
	return "";
}
//在js中 将文本内容格式化以符合HTML显示要求显示
String.prototype.formatTextToHTML=function()
{
	return this.replace(/&gt;/g,">" ).replace(/&lt;/g,"<" ).replace(/&amp;/g,"&").replace(/&nbsp;/g," ")
	.replace(/&#47;/g,"/").replace(/&apos;/g,"'").replace(/&quot;/g,"\"").replace(/""/g,"\r");
}

//自定义统计字符数，一个中文算2个字符
String.prototype.getLength = function() {
	var arr = this.match(/[\u00FF-\uFFFF]/gi);
	if(!arr || arr == null)
		return this.length;
	var len = this.length + arr.length;
	return len;
}

//格式化文本内容(去掉空格换行)
function richTextInputEncoder(source)
{
	var resultStr = source;
	if (source == null)
		return source;
	resultStr = resultStr.replace(/[ ]/g,"");	//去掉空格
	resultStr = resultStr.replace(/[\r\n\t]/g,"");//去掉回车换行水平制表符
	
	return resultStr;
}

//整数数组输出到字符串
function numberArrayToText(arrNumber,strSeperator)
{
	var strNumber="";
	for(var i=0;i<arrNumber.length;i=i+1)
	{
		if(i>0)
		{
			strNumber+=strSeperator;
		}
		strNumber+=arrNumber[i];
	}
	
	return strNumber;
}

//对一个数组中的数字进行排序
function sortNumber(arrNumber,sortMode)
{
	if(sortMode==null)
	{
		sortMode=0;
	}
	for(var i=0;i<arrNumber.length-1;i=i+1)
	{
		for(var j=i+1;j<arrNumber.length;j=j+1)
		{
			if(sortMode==0)
			{
				if(arrNumber[i]>arrNumber[j])
				{
					var nTemp=arrNumber[i];
					arrNumber[i]=arrNumber[j];
					arrNumber[j]=nTemp;
				}
			}
			else
			{
				if(arrNumber[i]<arrNumber[j])
				{
					var nTemp=arrNumber[i];
					arrNumber[i]=arrNumber[j];
					arrNumber[j]=nTemp;
				}
			}
		}
	}
}


//随机选择若干个号码
function randSelectNumber(nMinNumber,nMaxNumber,nOutputCount)
{
	//生成号码数组
	var arrNumber=new Array(nMaxNumber-nMinNumber+1);
	for(var i=nMinNumber;i<=nMaxNumber;i=i+1)
	{
		arrNumber[i-nMinNumber]=i;
	}

	var nLeftCount=nMaxNumber-nMinNumber+1;
	var arrOutput=new Array(nOutputCount);
	for(i=0;i<nOutputCount;i=i+1)
	{
		var nRandNumber=rand(nLeftCount-1);
		arrOutput[i]=arrNumber[nRandNumber];
		
		for(var j=nRandNumber+1;j<arrNumber.length;j=j+1)
		{
			arrNumber[j-1]=arrNumber[j];
		}
		nLeftCount=nLeftCount-1;
	}

	sortNumber(arrOutput);
	return arrOutput;
}


//将0102030405转换成01 02 03 04 05
function stakeToText(strStake,nNumberLength,chSeperator)
{
	var strText="";
	var nNumberCount=strStake.length/nNumberLength;
	var nIndex=0;
	for(var i=0;i<nNumberCount;i=i+1)
	{
		if(i>0)
		{
			strText+=chSeperator;
		}
		strText+=strStake.substr(nIndex,nNumberLength);
		nIndex+=nNumberLength;
	}
	
	return strText;
}

function Cab(nA,nB)
{
	var nResult=1;
	for(var i=0;i<nB;i+=1)
	{
		nResult*=(nA-i);
		nResult/=(i+1);
	}
	
	return nResult;
}


function integerToMoney(nMoney)
{
	var strYuan	=nMoney/100;
	var nCent	=nMoney%100;
	
	if(nCent<10)
	{
		return ""+strYuan+".0"+nCent
	}
	else
	{
		return ""+strYuan+"."+nCent
	}
}

function integerToString(nValue,nLength,chChar)
{
	var strValue=""+nValue;
	var nSize=strValue.length;
	for(var i=0;i<nLength-nSize;i++)
	{
		strValue=chChar+strValue;
	}

	return strValue;
}

function loadXML(xmlString)
{
	var xmlDoc=null;

	if(!window.DOMParser && window.ActiveXObject)
	{//window.DOMParser 判断是否是非ie浏览器
		var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
		for(var i=0;i<xmlDomVersions.length;i++)
		{
			try
			{
				xmlDoc = new ActiveXObject(xmlDomVersions[i]);
				xmlDoc.async = false;
				xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
				break;
			}
			catch(e)
			{
			}
		}
	}
	else if(window.DOMParser && document.implementation && document.implementation.createDocument)
	{
		try
		{
			/* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
			 * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
			 * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
			 * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
			 */
			domParser = new   DOMParser();
			xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
		}
		catch(e)
		{
		}
	}
	else
	{
		return null;
	}

	return xmlDoc.documentElement;
}

/**
 * 查找到 nIndex 位置的字符的匹配字符
 * @param nIndex
 * @param strText
 * @return
 */
function findMatchedChar(nIndex,strText)
{
	if(nIndex<0)
	{
		return -1;
	}
	
	var chChar=strText.charAt(nIndex);
	var nCount=0;
	var nStartIndex=-1;
	var nEndIndex=-1;

	var chFind=' ';
	switch(chChar)
	{
		case '(':
			chFind=')';
			break;
		case '{':
			chFind='}';
			break;
		case '[':
			chFind=']';
			break;
		case ')':
			chFind='(';
			break;
		case '}':
			chFind='{';
			break;
		case ']':
			chFind='[';
			break;
		default:
			return -1;
	}

	var nLength=strText.length;
	switch(chChar)
	{
		case '(':
		case '{':
		case '[':
			for(var i=nIndex+1;i<nLength;i++)
			{
				var ch=strText.charAt(i);
				
				if(ch==chChar)
				{
					nCount++;
				}
				else if(ch==chFind)
				{
					if(nCount==0)
					{
						nEndIndex=i;
						break;
					}
					else
					{
						nCount--;
					}
				}
			}
			return nEndIndex;
		case ')':
		case '}':
		case ']':
			for(var i=nIndex-1;i>=0;i--)
			{
				var ch=strText.charAt(i);
				
				if(ch==chChar)
				{
					nCount++;
				}
				else if(ch==chFind)
				{
					if(nCount==0)
					{
						nStartIndex=i;
						break;
					}
					else
					{
						nCount--;
					}
				}
			}
			return nStartIndex;
		default:
			return -1;
	}
}

function dateToString(date)
{
		var strDate=date.getFullYear()+'-'+integerToString(date.getMonth()+1,2,'0')+'-'+integerToString(date.getDate(),2,'0');

		return strDate;
}

function stringToDate(strDate)
{
	return new Date(eval(strDate.substring(0,4)),eval(strDate.substring(5,7))-1,eval(strDate.substring(8,10)));
}

function getRequestParameter(strParaName)
{
	var url = location.href;  //获取当前url地址
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
	var paraObj = {} 
	for (i=0; j=paraString[i]; i++)
	{ 
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
	} 
	var returnValue = paraObj[strParaName.toLowerCase()]; 
	if(typeof(returnValue)=="undefined")
	{ 
		return null; 
	}
	else
	{ 
		return returnValue;
	}
}

//递归得到一个元素的所有子元素
function allChildren(element)
{
	var arrOutput=[];
	var arr=element.children;
	for(var i=0;i<arr.length;i++)
	{
		arrOutput[arrOutput.length]=arr[i];

		var arrChildren=allChildren(arr[i]);
		for(var j=0;j<arrChildren.length;j++)
		{
			arrOutput[arrOutput.length]=arrChildren[j];
		}
	}

	return arrOutput;
}

function numberTextToInteger(strText,nDigitCount)
{
	if(strText.length==0)
	{
		return null;
	}

	var lValue	=0;
	var nDotCount=0;
	var nDotPos=strText.length;
	for(var i=0;i<strText.length;i++)
	{
		if(strText.charAt(i)=='.')
		{
			if(nDotCount>0)
			{
				return null;
			}
			if(i+nDigitCount+1<strText.length)
			{
				return null;
			}
			nDotCount++;
			nDotPos	=i;
		}
		else if(strText.charAt(i)<'0' || strText.charAt(i)>'9')
		{
			return null;
		}
		else
		{
			if(nDotCount>0 && i-nDotPos>nDigitCount)
			{
				return null;
			}
			lValue=lValue*10+(strText.charAt(i)-'0');
		}
	}
	if(nDotCount==0)
	{
		for(var i=0;i<nDigitCount;i++)
		{
			lValue*=10;
		}
		return lValue;
	}

	for(var i=0;i<nDigitCount-(strText.length-nDotPos-1);i++)
	{
		lValue*=10;
	}

	return lValue;
}

function integerToNumberText(lValue,nDigitCount)
{
	var strDigit	="";
	var lTemp	=lValue;
	for(var i=0;i<nDigitCount;i++)
	{
		if(lTemp>=0)
		{
			strDigit=""+lTemp%10+strDigit;
		}
		else
		{
			strDigit=""+(-lTemp%10)+strDigit;
		}
		lTemp=Math.floor(lTemp/10);
	}

	if(strDigit.length>0)
	{
		if(lTemp==0&&lValue<0)
		{
			return '-'+lTemp+'.'+strDigit;

		}
		else
		{
			return ""+lTemp+'.'+strDigit;
		}
	}
	else
	{
		return ""+lTemp+strDigit;
	}
}

