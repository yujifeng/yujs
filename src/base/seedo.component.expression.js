var Expression = {
	// 解析模版字符串
	_analyzeTempStr : function(htmlStr){

		if(!htmlStr) return null;
		
		var self = this;
		// 处理条件判断
		htmlStr = self._doDealTestExp(htmlStr);
		// 处理三目运算
		htmlStr = self._doDeal3ItemOpe(htmlStr);
		
		return htmlStr;
	},
	
	// 处理三目运算
	_doDeal3ItemOpe : function(htmlStr){
		var self = this;
		var rstArr = self._matchExp(htmlStr);
		
		for(var i in rstArr){
			// 表达式
			var temp = rstArr[i][0];
			// 旧模版的Html
			var exp = rstArr[i][1];
			
			var value = self._evalExp(exp);
			// 表达式成立
			if(value != null){
				htmlStr = htmlStr.replace(temp, value);
			}
		}
		return htmlStr;
	},
	
	// 处理条件判断
	_doDealTestExp : function(htmlStr){
		var self = this;
		// 正则匹配结果集
		var rstArr = self._matchTestExp(htmlStr);
		
		// 遍历正则匹配的结果集
		for(var i in rstArr){
			// 表达式
			var exp = rstArr[i].exp;
			// 旧模版的Html
			var temp = rstArr[i].temp;
			// 判断条件标签中的html
			var value = rstArr[i].value;
			
			var isTrue = self._evalExp(exp);
			// 表达式成立
			if(isTrue){
				htmlStr = htmlStr.replace(temp, value);
			}else{
				htmlStr = htmlStr.replace(temp, "");
			}
		}
		
		return htmlStr;
	},
	
	// 解析表达式
	_evalExp : function(exp){
		var self = this;
		var val = false;
		try{
			val = eval(self._escape(exp));
		}catch (e) {
			self.fire(e);
			return null;
		}
		return val;
	},
	
	// 转义双引号
	_escape : function(str){
		return str.replace(/&quot;/g,"'");
	},
	
	// 匹配结果集
	_matchTestExp : function(htmlStr){
		var self = this;
		var reg = new RegExp("<test\\s+" + self._KEY_TEST + "\\s*=\\s*\"(.*?)\">(.*?)<\/test>","gi");
		var arr = reg.exec(htmlStr);
		var newArr = [];
		while(arr){
			newArr.push(new self._matchTestObj(arr[0], arr[1], arr[2]));
			arr = reg.exec(htmlStr);
		}
		return newArr;
	},
	
	// 构建判断条件结果集对象
	_matchTestObj : function(temp, exp, value){
		this.temp = temp;
		this.exp = exp;
		this.value = value;
	},
	
	_matchObj : function(temp,value){
		this.temp = temp;
		this.value = value;
	},
};