/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 * http://spin.js.org/
 *
 * Example:
    var opts = {
      lines: 12             // The number of lines to draw
    , length: 7             // The length of each line
    , width: 5              // The line thickness
    , radius: 10            // The radius of the inner circle
    , scale: 1.0            // Scales overall size of the spinner
    , corners: 1            // Roundness (0..1)
    , color: '#000'         // #rgb or #rrggbb
    , opacity: 1/4          // Opacity of the lines
    , rotate: 0             // Rotation offset
    , direction: 1          // 1: clockwise, -1: counterclockwise
    , speed: 1              // Rounds per second
    , trail: 100            // Afterglow percentage
    , fps: 20               // Frames per second when using setTimeout()
    , zIndex: 2e9           // Use a high z-index by default
    , className: 'spinner'  // CSS class to assign to the element
    , top: '50%'            // center vertically
    , left: '50%'           // center horizontally
    , shadow: false         // Whether to render a shadow
    , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
    , position: 'absolute'  // Element positioning
    }
    var target = document.getElementById('foo')
    var spinner = new Spinner(opts).spin(target)
 */
;(function (root, factory) {

  /* CommonJS */
  if (typeof exports == 'object') module.exports = factory()

  /* AMD module */
  else if (typeof define == 'function' && define.amd) define(factory)

  /* Browser global */
  else root.Spinner = factory()
}(this, function () {
  "use strict"

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */
    , sheet /* A stylesheet to hold the @keyframe or VML rules. */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl (tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for (n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins (parent /* child1, child2, ...*/) {
    for (var i = 1, n = arguments.length; i < n; i++) {
      parent.appendChild(arguments[i])
    }

    return parent
  }

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation (alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }

    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor (el, prop) {
    var s = el.style
      , pp
      , i

    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    if (s[prop] !== undefined) return prop
    for (i = 0; i < prefixes.length; i++) {
      pp = prefixes[i]+prop
      if (s[pp] !== undefined) return pp
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css (el, prop) {
    for (var n in prop) {
      el.style[vendor(el, n) || n] = prop[n]
    }

    return el
  }

  /**
   * Fills in default values.
   */
  function merge (obj) {
    for (var i = 1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def) {
        if (obj[n] === undefined) obj[n] = def[n]
      }
    }
    return obj
  }

  /**
   * Returns the line color from the given string or array.
   */
  function getColor (color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length]
  }

  // Built-in defaults

  var defaults = {
    lines: 12             // The number of lines to draw
  , length: 7             // The length of each line
  , width: 5              // The line thickness
  , radius: 10            // The radius of the inner circle
  , scale: 1.0            // Scales overall size of the spinner
  , corners: 1            // Roundness (0..1)
  , color: '#000'         // #rgb or #rrggbb
  , opacity: 1/4          // Opacity of the lines
  , rotate: 0             // Rotation offset
  , direction: 1          // 1: clockwise, -1: counterclockwise
  , speed: 1              // Rounds per second
  , trail: 100            // Afterglow percentage
  , fps: 20               // Frames per second when using setTimeout()
  , zIndex: 2e9           // Use a high z-index by default
  , className: 'spinner'  // CSS class to assign to the element
  , top: '50%'            // center vertically
  , left: '15%'           // center horizontally
  , shadow: false         // Whether to render a shadow
  , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
  , position: 'absolute'  // Element positioning
  }

  /** The constructor */
  function Spinner (o) {
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  Spinner.defaults = {}

  merge(Spinner.prototype, {
    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function (target) {
      this.stop()

      var self = this
        , o = self.opts
        , el = self.el = createEl(null, {className: o.className})

      css(el, {
        position: o.position
      , width: 0
      , zIndex: o.zIndex
      , left: o.left
      , top: o.top
      })

      if (target) {
        target.insertBefore(el, target.firstChild || null)
      }

      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps / o.speed
          , ostep = (1 - o.opacity) / (f * o.trail / 100)
          , astep = f / o.lines

        ;(function anim () {
          i++
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps))
        })()
      }
      return self
    }

    /**
     * Stops and removes the Spinner.
     */
  , stop: function () {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    }

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
  , lines: function (el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg

      function fill (color, shadow) {
        return css(createEl(), {
          position: 'absolute'
        , width: o.scale * (o.length + o.width) + 'px'
        , height: o.scale * o.width + 'px'
        , background: color
        , boxShadow: shadow
        , transformOrigin: 'left'
        , transform: 'rotate(' + ~~(360/o.lines*i + o.rotate) + 'deg) translate(' + o.scale*o.radius + 'px' + ',0)'
        , borderRadius: (o.corners * o.scale * o.width >> 1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute'
        , top: 1 + ~(o.scale * o.width / 2) + 'px'
        , transform: o.hwaccel ? 'translate3d(0,0,0)' : ''
        , opacity: o.opacity
        , animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px #000'), {top: '2px'}))
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    }

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
  , opacity: function (el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  function initVML () {

    /* Utility function to create a VML tag */
    function vml (tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

    Spinner.prototype.lines = function (el, o) {
      var r = o.scale * (o.length + o.width)
        , s = o.scale * 2 * r

      function grp () {
        return css(
          vml('group', {
            coordsize: s + ' ' + s
          , coordorigin: -r + ' ' + -r
          })
        , { width: s, height: s }
        )
      }

      var margin = -(o.width + o.length) * o.scale * 2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i

      function seg (i, dx, filter) {
        ins(
          g
        , ins(
            css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx})
          , ins(
              css(
                vml('roundrect', {arcsize: o.corners})
              , { width: r
                , height: o.scale * o.width
                , left: o.scale * o.radius
                , top: -o.scale * o.width >> 1
                , filter: filter
                }
              )
            , vml('fill', {color: getColor(o.color, i), opacity: o.opacity})
            , vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
            )
          )
        )
      }

      if (o.shadow)
        for (i = 1; i <= o.lines; i++) {
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')
        }

      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }

    Spinner.prototype.opacity = function (el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i + o < c.childNodes.length) {
        c = c.childNodes[i + o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }

  if (typeof document !== 'undefined') {
    sheet = (function () {
      var el = createEl('style', {type : 'text/css'})
      ins(document.getElementsByTagName('head')[0], el)
      return el.sheet || el.styleSheet
    }())

    var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

    if (!vendor(probe, 'transform') && probe.adj) initVML()
    else useCssAnimations = vendor(probe, 'animation')
  }

  return Spinner

}));


//跨浏览器获取视口大小
function getInner() {
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

//跨浏览器获取滚动条位置
function getScroll() {
	return {
		top : document.documentElement.scrollTop || document.body.scrollTop,
		left : document.documentElement.scrollLeft || document.body.scrollLeft
	}
}


//跨浏览器添加事件绑定
function addEvent(obj, type, fn) {
	if (typeof obj.addEventListener != 'undefined') {
		obj.addEventListener(type, fn, false);
	} else {
		//创建一个存放事件的哈希表(散列表)
		if (!obj.events) obj.events = {};
		//第一次执行时执行
		if (!obj.events[type]) {	
			//创建一个存放事件处理函数的数组
			obj.events[type] = [];
			//把第一次的事件处理函数先储存到第一个位置上
			if (obj['on' + type]) obj.events[type][0] = fn;
		} else {
			//同一个注册函数进行屏蔽，不添加到计数器中
			if (addEvent.equal(obj.events[type], fn)) return false;
		}
		//从第二次开始我们用事件计数器来存储
		obj.events[type][addEvent.ID++] = fn;
		//执行事件处理函数
		obj['on' + type] = addEvent.exec;
	}
}




function Shade_layer(){}  //页面加载中load JS



Shade_layer.prototype.show = function(shade_text){   //显示方法
	shade_text =  (typeof shade_text == "undefined") ? "加载中..." : shade_text;	
	document.getElementById('foo1').style.display="block";
	document.getElementById('foo_r').style.display="block";
	document.documentElement.style.overflow = 'hidden';
	document.ontouchmove = function(e){ e.preventDefault();}
	this.lock(); 
	if(shade_text !=''){
		var shade_width = this.getWidth(shade_text);
		}else{
			this.getWidth(); 
		} 
	 
}
Shade_layer.prototype.lock = function(){  //屏幕锁定方法
		var id = document.getElementById('screen_layer');
		id.style.display = 'block';
		document.documentElement.style.overflow = 'hidden';
		return this;
}

Shade_layer.prototype.winWidth = function(){  //获取窗口宽度
	if (window.innerWidth){
			winWidth = window.innerWidth; 
		}else if((document.body) && (document.body.clientWidth)){
			winWidth = document.body.clientWidth; 
		}
	return winWidth;
}

Shade_layer.prototype.winHeight = function(){  //获取窗口高度
			//获取窗口高度 
		if (window.innerHeight){
			winHeight = window.innerHeight; 
		}else if ((document.body) && (document.body.clientHeight)){
			winHeight = document.body.clientHeight;
		}
	return winHeight;
} 
Shade_layer.prototype.hide = function(){   //隐藏方法
	document.documentElement.style.overflow = 'auto'; //屏幕解锁
	document.ontouchmove = function(e){};
	document.getElementById('screen_layer').style.display="none";
	document.getElementById('foo1').setAttribute("style","  top: 40%; left: 23%;  display: none; line-height: 50px;  border-radius: 10px; height: 50px; z-index: 999999;  position: absolute;");
	document.getElementById('foo_r').setAttribute("style","background: #000;   top: 40%; left: 23%;  display: none; line-height: 50px; border-radius: 10px; opacity: 0.5; height: 50px; z-index: 999998;  position: absolute;");
	document.getElementById('foo1').style.display="none";
	document.getElementById('foo_r').style.display="none";
}
Shade_layer.prototype.creatdiv = function(){
	
	var foo1=document.getElementById("foo1"); 
	if(!typeof foo1 == "object"){
		this.objonload();
		return false;
	}else{
		var body = document.getElementsByTagName("body")[0];
		var screen1 = document.createElement('div');
		screen1.id='screen_layer';
		var winWidth = this.winWidth()+"px";
		var winHeight = this.winHeight()+"px";
		//alert("position:absolute; width: "+winWidth+"; height: "+winHeight+"; top:0;left:0;background:#000;z-index:9998;filter:alpha(opacity=0);opacity:0.5;display:none;");
		screen1.setAttribute("style","position:absolute;  width: "+winWidth+"; height: "+winHeight+"; top:0;left:0;  z-index:9998;  opacity: 0; display:none;");
		body.appendChild(screen1);
		var c_divr = document.createElement('div');
		c_divr.setAttribute("id","foo_r");
		c_divr.setAttribute("style","background: #000;   top: 40%; left: 23%;  display: none; line-height: 50px; border-radius: 10px;  height: 50px; z-index: 999998; opacity: 0.5; position: absolute;");
		var c_div = document.createElement('div');
		c_div.setAttribute("id","foo1");
		c_div.setAttribute("style","top: 40%; left: 23%;  display: none; line-height: 50px; border-radius: 10px;  height: 50px; z-index: 999999; position: absolute;");
		body.appendChild(c_div);
		body.appendChild(c_divr);
		var div  = document.createElement('div');
		div.setAttribute("id","foo");
		div.setAttribute("style","display: block; height: 60px; margin-right: 5%;  float: left; width: 35px; ");
	
		c_div.appendChild(div); 
		divt = document.createElement("div");
		divt.className = 'app_obj_shade_text'; 
		divt.id = 'shade_text';
		c_div.appendChild(divt);

	}
	this.objonload();

}


Shade_layer.prototype.objonload = function()
{
var opts = {
	     lines: 10, // loading小块的数量
	     length: 4, // 小块的长度
	     width: 2, // 小块的宽度
	     radius: 4, // 整个圆形的半径
	     corners: 1, // 小块的圆角，越大则越圆
	     rotate: 0, // loading动画的旋转度数，貌似没什么实际作用
	     color: '#FFF', // 颜色
	     speed: 1, // 变换速度 
	     trail: 60, // 余晖的百分比
	     shadow: false, // 是否渲染出阴影
	     hwaccel: false, // 是否启用硬件加速
	     className: 'spinner', // 给loading添加的css样式名
	     zIndex: 2e9 // The z-index (defaults to 2000000000)
	    };
	    var target = document.getElementById('foo');
	    var spinner = new Spinner(opts).spin(target);
}

Shade_layer.prototype.getWidth = function(fontSize)  
    {  
  		var foo1 = document.getElementById("foo1");
        var shade_text = document.getElementById("shade_text");
		var foo_r = document.getElementById('foo_r');	
			shade_text.setAttribute("style","display: inline-block;color: #FFF; font-size: 0.25rem; ");
			shade_text.style.display = 'block';
			shade_text.innerHTML = fontSize;
			shade_width = shade_text.offsetWidth+60;  
			foo1.style.width = shade_width+'px';
			var shade_top = this.winHeight()/2.2; 
			var shade_left = (this.winWidth()-shade_width)/2;
			foo1.style.left = shade_left+'px';
			foo1.style.top = shade_top+'px'; 
			foo_r.style.width = shade_width+'px';
			foo_r.style.left = shade_left+'px';
			foo_r.style.top = shade_top+'px'; 
      		return shade_text;
			
    }
    
Shade_layer.prototype.deleteDiv = function()
 {
    var my = document.getElementById("shade");
    if (my != null)
        my.parentNode.removeChild(my);
 }

//lhh 定时关闭遮盖层  time毫秒
Shade_layer.prototype.hideTime = function(time){
	setTimeout(function() {
		document.getElementById('shade').style.display="none";
	},time);
}
	_shade_layer = new Shade_layer();
	_shade_layer.creatdiv();
//	_shade_layer.show();
/*
 	<script type="text/javascript">
 	遮罩层传值      var shade_text = '1111111111111111111111'; 
	显示遮罩层	_shade_layer.show(shade_text);
	隐藏遮罩层   _shade_layer.hide();
    </script>
 * 
 * 
 * 
 * */
	
	
