/**
 * 组件抽象类
 */
var AbstractComponent = $.extend({},Event,{
//	var _config = null;
	_config : {},
	
	// 初始化配置项
	init:function(config){
		var self = this;
		self._config = config;
		this.render();
	},
	
	// 获取配置项
	get:function(key){
		var self = this;
		return self._config[key];
	},
	
	// 设置配置项
	set:function(key,value){
		var self = this;
		self._config[key] = value;
	},
	
	// 渲染处理 子类可以覆盖该方法
	render:function(){},
	
	// 销毁方法
	destory:function(){
		this.off();
	}
});