/**
 * 管理事件监听、触发的类
 */
var Event = $.extend({}, CompUtils, {
	// 日志事件开关
	_eventLogFlag : true,
	_eventLogKey  : "log",
	
	// 添加事件
	on : function(key, listener){
		// this._events 存储所有需要处理的函数
		if(!this._events){
			this._events = {};
		}
		if(!this._events[key]){
			this._events[key]= [];
		}
		if(_indexOf(this._events, listener) === -1 && typeof listener === "function"){
			this._events[key].push(listener);
		}
	},
	
	// 触发事件
	fire : function(key){
		if(!this._events || arguments.length < 1){
			return;
		}
		var args;
		if(arguments.length === 1){
			args = [key];
			key = this._eventLogKey;
		}else{
			args = Array.prototype.slice.call(arguments, 1) || [];
		}
		
		var listeners = this._events[key];
		
		for(var i in listeners){
			listeners[i].apply(this, args);
		}
		return this;
	},
	
	// 去除事件
	off : function(key, listener){
		// 不传递参数 则去掉所有监听函数
		if(!key && !listener){
			this._events = {};
		}
		// 不传递监听函数  则去掉该Key下所有监听函数
		if(key && !listener){
			delete this._events[key];
		}
		if(key && listener){
			var listener = this._events[key];
			var index = _indexOf(listeners, listener);
			(index > -1) && listeners.splice(index, 1);
		}
		return this;
	}
});