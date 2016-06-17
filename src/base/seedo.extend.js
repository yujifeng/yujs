(function(window){
/**
 * 用于js继承 并加载的方法
 */
var jfJs = {
	
	/**
	 * 记录已经引入的js
	 */
	_extendedJs : [],
	
	/**
	 * 需要加载的JS数量
	 */
	_extendCount : 0,
	
	/**
	 * 全局标识 是否有js在加载
	 */
	_isLoading : false,
	
	/**
	 * 没加载完成一个js 则调用该方法
	 * count	加载的js个数  该参数可以不传
	 */
	_decreaseExtendCount : function(count){
		var self = this;

		if(arguments.length > 0){
			self._extendCount -= count;
		}else{
			self._extendCount --;
		}
		if(self._extendCount == 0){
			console.log("aaa");
//			JsIsLoading = false;
			self._isLoading = false;
		}
	},
	
	
	_doIsNotLoading : function(){},
	
	/**
	 * 判断该jspath 是否已经存在 
	 * path		js的url
	 * 
	 * return 	存在 true;不存在 false;
	 */
	_isExtend : function(path){
		var self = this;
		return (self._extendedJs.indexOf(path) < 0) ? false:true;
	},
	
	/**
	 * 增加jspath 到extendedJs数组中
	 * path		js的url
	 */
	_addJs : function(path){
		var self = this;
		self._extendedJs.push(path);
	},
	
	/**
	 * 加载js的主方法
	 * extendJs		要加载的依赖的js对象
	 * O			当前要写的JS对象
	 * 例:
	 * {"/js/componets/base/seedo.event.js" 		  : "Event"
	 *  "/js/componets/base/seedo.component.utils.js" : "Utils"}
	 *  
	 * return		obj对象
	 */
	_extendJs : function(extendJs, O){
		var self = this;
		var paths = [];
		var clzNames = [];
		
		// 遍历extendJs 获得path数组 和对象名数组
		for(var p in extendJs){
			paths.push(p);
			clzNames.push(extendJs[p]);
		}
		// path数组不为空 则引入js
		(paths.length > 0) && self._importJs(paths);
		
		// 直到loadding结束
//		while(self._isLoading){
//			
//		}
		var fn = function(self){
			var str = self._isLoading + " " + new Date().getTime();
			console.log(str);
		};
		
//		setInterval(fn(self), 100);
		var obj = {};
		var evlStr = "obj = $.extend({}";
		var evlStr2= ");";
		for(var i in clzNames){
			evlStr += ", " + clzNames[i];
		}
		try {
			eval(evlStr + evlStr2);
		} catch (e) {
			console.log(e);
			return {};
		}
		return (typeof(O) == undefined) ? obj : $.extend({}, obj, O);
	},
	
	_extendJs2 : function(extendJs, O, callback){
		var self = this;
		var obj = {};
		for(var path in extendJs){
			// path 不为空、且没有引入过   则引入js
			($.trim(path) !== "" && !self._isExtend(path)) && self._importJs(path, function(){
				// 如果类型为string 则eval操作执行继承
				if(typeof(extendJs[path]) === "string"){
					try {
						eval("obj = $.extend({}, " + extendJs[path]+ ");");
					} catch (e) {
						console.log(e);
					}
				}else{
					obj = $.extend({}, extendJs[path]);
				}
				
			});
//				while(!self._isLoading){
//					ddd
//				}
			
			
		}
		return (extendJs) ? $.extend({}, obj, O) : {};
	},
	
	/**
	 * 内部引入js
	 * paths		js文件的相对路径或者绝对路径
	 */
	_importJs : function(path){
		var self = this;
		
//		JsIsLoading = true;
		self._isLoading = true;
		self._extendCount = (path)?path.length:0;
		
		var jsDom = document.createElement("script");
		jsDom.type = "text/javascript";
		jsDom.async = false;
		// 执行回调
		// IE
		if (jsDom.readyState) {
			jsDom.onreadystatechange = function(self) {
				if (jsDom.readyState == "loaded" || jsDom.readyState == "complete") {
					jsDom.onreadystatechange = null;
					self._decreaseExtendCount();
				}
			};
		// Others: Firefox, Safari, Chrome, and Opera
		}else {
			jsDom.onload = function() {
				self._decreaseExtendCount();
			};
		} 
		
		jsDom.src = self._getContextPath() + (path.indexOf("/") == 0 ? path.replace("/", "") : path);
		var headDom = document.getElementsByTagName("head")[0];
		headDom.appendChild(jsDom);
		
		self._addJs(path);
	},
	
	/**
	 * 获取项目名
	 */
	_getContextPath : function(){
		var pathName = location.pathname.replace("/","");
		return "/" + pathName.substring(0,pathName.indexOf("/")) + "/";
	}
};


/**
 * 初始化ExtendJs
 * extendJs		加载的Js
 */
var ExtendJs = function(extendJs, O) {
	return jfJs._extendJs(extendJs, O);
};

//var JsIsLoading = false;

if (typeof module != 'undefined' && module.exports) {
	module.exports = ExtendJs;
//	module.exports = JsIsLoading;
} else {
	window.ExtendJs = ExtendJs;
//	window.JsIsLoading = JsIsLoading;
}
})(window);