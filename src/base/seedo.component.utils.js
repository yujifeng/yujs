/**
 * 组件工具类
 */
var CompUtils = {
		
	/**
	 * 获取该key值在array中的索引号
	 * array 	obj对象 如 {"a" : "1", "b" : "2"}
	 * key 		obj对象中的key值
	 * 
	 * return	返回索引值,如果不存在则返回 -1
	 */
	_indexOf : function(array, key) {
		if (array === null){
			return -1;
		}
		var length = array.length;
		for (var i = 0; i < length; i++){
			if (array[i] === key){
				return i;
			}
		}
		return -1;
	},

	/**
	 * 模版解析引擎
	 * str		用来替换的str字符串
	 * data		替换用的obj对象
	 * 
	 * return	替换好的字符串
	 * 例:
	 * var str = "@{a}测试@{b}";
	 * var data = {"a":"啊", "b":"不"};
	 * _parseTemplate(str, data); // 返回  "啊测试不"
	 */
	_parseTemplate : function(str, data) {
//		if(!str) return null;
		var fn = new Function('obj',
			'var p=[];' +
			'with(obj){p.push(\"' +
			str.replace(/[\r\t\n]/g, " ")
			.replace(/\"/g,"'")
			.replace(/@{/g, "\",")
			.replace(/}/g, ",\"") +
			"\");}return p.join('');");
		return data ? fn(data) : fn;
	},
	
	_matchExp : function(str){
		var reg = /#\((.*?)\)/gi;
		var arr = [];
		var rstArr = [];
		arr = reg.exec(str);
		while(arr){
			rstArr.push(arr);
			arr = reg.exec(str);
		}
		return rstArr;
	},
	
	/**
	 * 获取jquery对象包含自身的html
	 * $obj		jquery对象
	 * 
	 * return	包含自身的html字符串
	 */
	_html : function($obj){
		var temp = "<div></div>";
		var temp$Obj = $(temp);
		$obj.prependTo(temp$Obj);
		return temp$Obj.html();
	},
	
	/**
	 * json字符串转对象
	 * str		转换用的json字符串
	 * 
	 * return	obj对象,如果出错则返回null
	 */
	_str2JsonObj : function(str){
		if(!str) return null;
		str = str.replace(/'/g,"\"");
		if(jQuery.parseJSON(str)) return jQuery.parseJSON(str);
		var data;
		try{
			data = eval('(' + str + ')');
		}catch (e) {
			self.fire(self._eventLogKey,e);
			return null;
		}
		return data;
	},
	
	/**
	 * 处理列表页面滚动
	 * $obj		处理滚动的对象
	 * objH		该对象的高度
	 */
	_scroll2List : function($obj, objH){
		if(!$obj || typeof($obj) == undefined){
			return;
		}
		$obj.css("overflow-y","scroll");
		$obj.height(objH);
	},
	
	/**
	 * 复制对象 返回新对象
	 * obj		需要复制的对象
	 * 
	 * return 	复制的新对象
	 */
	_cloneObj : function(obj){
		var self = this;
		if(typeof(obj) != 'object') return obj;
		if(!obj) return obj;
		var newObj = new Object();
		for(var i in obj)
		newObj[i] = self._cloneObj(obj[i]);
		return newObj;
	}
};