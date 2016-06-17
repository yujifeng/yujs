/**
 * 主要实现功能：
 * 事件代理
 * 模版渲染
 * 单向绑定、动态刷新数据
 */
var RichBase = $.extend({}, AbstractComponent, {
	
	// 绑定事件的父节点
	parentNode : "parentNode",
	
	// 事件集
	events : {
		/**
		 * 使用示例
		 *	'input' : {
		 *		keyup : function(self, e) {
		 *			self.setChuckdata('count', self._getNum());
		 *		}
		 *	}
		 */
	},

	// 渲染数据用得模版
	template : "",

	// 初始化配置
	init : function(config) {
		this._config = config;
		this._eventLog();
		this._delegateEvent();
		this.setup();
	},
	
	// 初始化日志
	_eventLog : function(){
		var self = this;
		if(self._eventLogFlag){
			self.on(self._eventLogKey,function(e){
				alert(e);
			});
		}
	},
	
	// 设置绑定事件的父节点 提供子类重写
	_setParentNode : function(){},
	
	// 循环遍历events 使用delegate将事件代理到parentNode
	_delegateEvent : function() {
		var self = this;
		
		self._setParentNode();
		
		var events = this.events || {};
		var eventObjs, fn;
		var parentNode = this.get(self.parentNode) || $(document.body);
		for(var select in events){
			eventObjs = events[select];
			for(var type in eventObjs){
//				(function(fn){
//					parentNode.on(type, select, function(e){
//						fn.call(null, self, e);
//					});
//				})(fn);
				
				fn = eventObjs[type];
				parentNode.delegate(select, type, function(e){
					fn.call(null,self,e);
				});
			}
		}
	},
	
	// 子类可按照逻辑覆盖重写
	setup : function() {
		this.render();
	},
	
	// 实时刷新数据 传入对应的key 和value
	setChuckdata : function(key,value) {
		var self = this;
		var data = self.get("_renderData");
		
		// 更新对应的值
		data[key] = value;
		
		if(!this.template) return;
		
		// 重新渲染
		var newHtmlNode = $(self._parseTemplate(this.template, data));
		
		var currentNode = self.get("_currentNode");
		if(!currentNode) return;
		
		currentNode.replaceWith(newHtmlNode);
		
		self.set("_currentNode", newHtmlNode);
		
	},
	
	// 使用data 渲染模版 append到parentNode中
	render : function(data) {
		var self = this;
		// 存储渲染的data 在setChuckdata中使用
		self.set("_renderData", data);
		
		if(!this.template) return;
		
		var newHtmlNode = $(self._parseTemplate(this.template, data));
		
		var parentNode = self.get(self.parentNode) || $(document.body);
		
		var currentNode = newHtmlNode;
		
		// 存储渲染的Node 在setChuckdata中使用 作为动态刷新使用
		self.set("_currentNode", currentNode);
		parentNode.append(currentNode);
	},
	
	// 销毁
	destory : function() {
		var self = this;
		// 去除所有事件监听
		self.off();
		// 删除渲染好的dom节点
		self.get("_currentNode").remove();
		// 去掉绑定过的事件
		var events = self.events || {};
		var eventObjs, fn;
		var parentNode = self.get(self.parentNode);
		
		for(var select in events){
			eventObjs = events[select];
			for(var type in eventObjs){
				fn = eventObj[type];
				// 解除事件绑定
				parentNode.undelegate(select, type, fn);
			}
		}
	}
});