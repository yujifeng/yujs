
(function(window, WV){
	
/**
 * 数据渲染组件
 */
var DataRender = $.extend({}, AbstractComponent, {
//var DataRender = ExtendJs({
//	"js/componets/base/seedo.abstract.component.js" : "AbstractComponent"},{
	
	_KEY_COMP	: "data-comp",
	_KEY_URL	: "data-comp-url",
	_KEY_PARAM	: "data-comp-param",
	_KEY_LIST	: "data-comp-list",
	_KEY_DATA	: "data-comp-data",
	_KEY_TEST	: "data-comp-test",
	_KEY_TEMP	: "data-comp-temp",
	_KEY_IMG	: "data-comp-img",
	
	events : {},
	
	template : {},
	
	// 获取组件对象
	_getComp$Obj : function(compName){
		var self = this;
		
		var comp$Obj = $("div["+self._KEY_COMP+"='"+compName+"']");
		if(!comp$Obj){
			//self.fire("找不到该组件名:" + compName);
			return null;
		}
		return comp$Obj;
	},
	
	// 获取组件名称
	_getCompName : function (comp$Obj){
		var self = this;
		if(!comp$Obj) return null;
		return comp$Obj.attr(self._KEY_COMP);
	},
	
	// 获取数据
	_getData : function(url, params){
		var self = this;
		return self._getServiceData(url,params);
	},
	
	// 获取后台传递数据
	_getServiceData : function(url, params){
		var self = this;
		
		if(!url) return null;
		
		// url处理，如果是native版本，则通过WV.getUrl 获取头
		
		if(url.indexOf("http") < 0 && WV && WV.isSupport){
			var headUrl = WV.getUrl();
			headUrl && (url = headUrl + url);
		}
		
		var self = this;
		var postType = self.get("postType");
		var json;
		if(postType && postType == "tPost"){
			json = tPost(url, params);
		}else{
			json = post(url, params);
		}
		//json = {"messageInfo":null,"msgList":[],"result":{"keyList":[{"accessAreas":[],"accessEnts":[],"accessId":10164,"accessInfoModel":{"accessModel":null,"accessVer":"","areaId":0,"batteryPower":0,"btStatus":"","createdBy":0,"createdDate":null,"id":0,"isDeleted":false,"lockStatus":"","termId":0,"termNo":"","upDate":null,"updatedBy":0,"updatedDate":null,"whiteCardVer":0},"accessRecordInfoHis":[],"accessRecordInfos":[],"accessType":"","area":null,"areaEntName":"桂花园null小区杭州荣域网络科技有限公司","areaId":10003,"areaName":"桂花园","areaNames":"桂花园","areaType":"","bleFlag":"1","bleKeys":[],"bleRoomId":0,"btStatus":"","build":"","buleToothCode":"","cityId":86,"cityName":"杭州市","createdBy":0,"createdDate":null,"entId":131,"entName":"杭州荣域网络科技有限公司","entRecodeInfos":[],"enterprise":null,"flag":"","houseRelationAccesses":[],"icoPath":"","id":0,"isDeleted":false,"normalPasswdFile":0,"operPasswdFileVer":0,"pAreaName":"","room":"","status":"","temporaryChargeLogEnt":[],"temporaryChargeLogOut":[],"termAddress":"企业蓝牙门禁","termIP":"","termId":"","termMacAddress":"","termType":"","termVer":"","unit":"","updatedBy":0,"updatedDate":null,"version":"","whiteCardVer":0,"zoneArea":null,"zoneAreaId":0,"zoneAreaName":""}]}};
		if(json && json.result){
			self.set("_renderData", json.result);
			return json.result;
		}
		else{
			self._showTip(self.get("compName"));
			return null;
			//self.fire("json字符串解析错误");
		}
	},
	
	// 获取list对象
	_getListObj : function(comp$Obj){
		var self = this;
		//return $("div["+self._KEY_LIST+"]");
		return comp$Obj.find("["+self._KEY_LIST+"]") || null;
	},
	
	// 处理list形式的数据
	_doDealListData : function(list$Obj, listKey, data, compName){
		var self = this;
		var showData = true;
		list$Obj.each(function(){
			// 用于替换的数据对象
			var listDataObj = null;
			// 后台数据名称
			var listVal = ($(this).attr(listKey)) ? $(this).attr(listKey) : compName;
			
			// 获取模版html
			var htmlStr = $(this).html();
			// 设置模版
			if(!self.template[listVal] || self.template[listVal] === ""){
				self.template[listVal] = htmlStr;
			}
			var temp = self.template[listVal];
			
			// 删除页面上旧模版
			$(this).empty();
			
			
			if(!listVal || listVal === "" || listVal === compName){
				$(this).attr(listKey, compName);
				listDataObj = data;
			}else{
				try{
					eval("listDataObj = data."+listVal+";");
				}catch(e){
					//self.fire(e);
				}
			}
			
			//if(!listDataObj) self.fire("属性:" + listVal + " 的值在json处理后的data中不存在");
			
			// 如果数据为空 则显示自定义提示语
            if(!listDataObj || listDataObj == {} || listDataObj == ""){
            	self._showTip(listVal);
				return;
			}else{
				showData = false;
				self._hideTip(listVal);
			}
			
			for(var m=0; m<listDataObj.length; m++){
				var curObj = listDataObj[m];
				// 加入 list大小 和索引值
				curObj.listSize = listDataObj.length;
				curObj.listIndex = m;
				var newHtmlStr = self._parseTemplate(temp, curObj);
				$(this).append(newHtmlStr);
			}
			
			// 处理条件判断
			var rstHtml = self._analyzeTempStr($(this).html());
			$(this).html(rstHtml);
			
			// 处理完成后 显示数据
			self._showList(listVal);
		});
		
		if(showData){
			self._showTip(compName);
		}else{
			self._hideTip(compName);
		}
	},
	
	// 处理简单数据
	_doDealSimpleData : function(comp$Obj, data){
		var self = this;
		// 获取模版html
		var htmlStr = comp$Obj.html();
		// 设置模版
		if(!self.template[0] || self.template[0] === ""){
			self.template[0] = htmlStr;
		}
		var temp = self.template[0];
		
		// 删除页面上旧模版
		comp$Obj.empty();
		
		var newHtmlStr = self._parseTemplate(temp, data);
		comp$Obj.append(newHtmlStr);
		
		// 处理完成后 显示数据
//		self._showData(listKey);
	},
	
	// 同步加载图片
	_synchroLoadImg : function(){
		var self = this;
		var compName = self.get("compName");
		var compObj = self._getComp$Obj(compName);
		compObj.find("img").each(function(index){
			var webUrl = $(this).attr(self._KEY_IMG);
			if(!webUrl || webUrl == ""){
				return;
			}
			var localImg = self._getLocalImg(webUrl);
			localImg = (localImg == "" || localImg == null) ? self._defaultImg : localImg;
			
			self.set("localImg_" + index, localImg);
			$(this).attr("src", localImg);
		});
	},
	
	_getLocalImg : function(webUrl){
		if(WV && WV.isSupport && WV.getLocalImg){
			return WV.getLocalImg(webUrl);
		}
		return "";
	},
	
	_showTip : function(key){
		var self = this;
//		var compName = self.get("compName");
		$("div["+self._KEY_DATA+"='"+key+"']").show();
	},
	
	_hideTip : function(key){
		var self = this;
		$("div["+self._KEY_DATA+"='"+key+"']").hide();
	},
	
	// 解析模版字符串
	_analyzeTempStr : function(tempStr){
		return tempStr;
	},
	
	_showList : function(key){
		var self = this;
		var obj = $("["+ self._KEY_LIST +"='"+key +"']");
		obj.show();
	},
	
	_showData : function(compName){
		var self = this;
		var compObj = self._getComp$Obj(compName);
		compObj.show();
	},

	// 渲染处理 
	render:function(){
		var self = this;
		self.setup();
	},
	
	// 组件业务逻辑实现
	setup : function(){
		var self = this;
		
		var compName = self.get("compName");
		
		var comp$Obj = self._getComp$Obj(compName);
		if (!comp$Obj) return;
		// 获取后台传递的数据
		var url = comp$Obj.attr(self._KEY_URL);
		self.set("url", url);
		// 获取参数值
		var params = self.get("param") || comp$Obj.attr(self._KEY_PARAM);
		var data = self._getData(url, params);
		if(!data) {
			self._hideTip(compName);
			return;	
		}
		
		var isList = false;
		// 判断组件是list形式还是simple形式
		var list$Obj = self._getListObj(comp$Obj);
		if(list$Obj && list$Obj.length > 0) isList = true;
		
		if(isList){
			self._doDealListData(list$Obj, self._KEY_LIST, data, compName);
			
			//TODO 处理滚动
			var screenH = window.innerHeight;
			var headH = $("#head").height();
//			var bottomH = 49;
			var navH = 45;
			var objH = screenH - headH - navH;
			self._scroll2List($("#" + compName), objH);
		}else{
			self._doDealSimpleData(comp$Obj, data);
		}
		
		self._synchroLoadImg();
		
		self._showData(compName);
	},
	
	_defaultImg : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABUNJREFUeNrMWolN3EAUHZvlPhaEAHGJ7SB0QFJBSAUhFYR0QAchFWRTQegA6CCpIAmIS4A23Debec781d9h7B17xrv+kgWyDZ43/3r//xHCg9Tr9bK83svre91NavL6iv8lOi1yEQtqMXkIgH7GN7KuL8gKSv5Yk9eK6fnT05O4vb0V9/f34u7uTjw/P4vHx8fogvT09IgwDKOrt7dX9PX1Rfe6urriPlmV12oQBGe5gYP54SMKWJM8PDyI6+trcXFxEYHKIgA5ODgohoaGTED/4rsS4Bfv4CSwV2oHF/n9m5sbcXZ2FgHzKQA4NjYmuru79UdbsBgJ8o8XcMrBq7qmjo+PI/PLUwByfHxc1yS0uCwBbjuBg1MrU2xIrVaLrnYJfBMAh4eH9UfQ4LdM4BAJedBAoDg6OspdWym1GAswsNUYot7BwUEU+TopiKrT09NWAAMbHysKMJJSqSSmpqaiNMLkte6DQUxU/FFUYBzg7Ows1yCCzCKPooEhjwFYhXxsd3e3cMASTHRLgnvTCETa+2sEDFJEjXEBWTg9PW0yTamgjy80J28uqQTZkXDvIhMTEzxNwDwroGoc3CaQk5/t7e05fRDsAnTKRkDZLi8vnfLg/Pw8N8+qBPchMGltf3/fKZfBF+bm5lL9zc7OToNYZ82Bk5OT/FaFfG6Vc0XXJG2rMT36uQg0D0rIZDVU5csy9zVXSShdcgNnWPtKyIHB13xQqyyaM7D/TNpD+lIyGnLuiNKlkznLh/DAVOL1WRqtUTVtkv7+/kxmGadxXsW3kqurK1Eul//nOTQr0oZ/La+0RWBVWsKOlYWFhcjvw7RaQ/5qNzAItGHry9TmKPEUkFewoEBFVA7mPDAwkDqIYFNtlIB34BoNcHlwSGwYTMnUMMJ9bBSKT610cU4X2Mwm4uy7uj45OYmId1InDN+En4N++RRSVCkP/wCw8/PzhgnCX0CPyAyxs+iWIUhgIWg0kdkVGhxMkYDFtAQiM8QFv6OyiszURzInawl9gyMKBI2ZgOkg8Q7ttu8Syys4Tt9gijYcEwBhsjq7cG1BeAfHgxJMzlbQQk+bklKB88HteDqxDe9kwj5TEv2/0GfJ4cVPQndjoo0Ns+y0TZJNY16cFPsAR1YYutCqJGqWJjHTuzSv87WOkJcprruGHMUjH9GgVsB4hPWhNYrSQPM7S4RLqhpok5Cgk8wTwIidwKRHRkacv89ZDlaxYXrgoj2QYYp8AIhuGoAAKA0rcY+AYTPQ+8/Se9GFKwgRoErdr6hMkDvo0mKjTcKCsXgAhNnFEfOYoUZmYJy+hUEQ/BSsZwmzss1lrRIzGqXwQZMvAxS+hWGGLbBWs3bNZ6vUlG0aWSU1SBGJZmZmMlEzXqym1RS6WiiPUqyrwtvpv4QagsAv4CtJ6seu+zAl16KXBFbCTHJDWuS72EHI4eGh9xMKeQk2WnMnDEL+NJxBTSU3eIerKJSsVcLWgK3RAFIfPqK1juHjKPlJkWd0hukOcvYinTQyjY3fcg3yRFs0YCh0Nb9fVNFfGMEpgE0nGYoGMAbYixMNSUc1ms6gACAiVqdNNAbYugT2SX831SEb+CAO2bgyGBdSDDajNZGiKarpfZvjUS9OEcFE250mDOE+EZgVOJMPUmIFyLy1mNCVTjz3ZQ2ORdEqpQnui2jJ+QZJ+cswDkO4X+ZR0Rkcy4Prgk1juSYBFOaaNejQgAQEOIbaraskbTUlzXoMeElpsRLHBVHiIABBo3GcENoBIGgHvydw1S0FarttTq5OpG/W85NNtZGZ5J8AAwAwOOx5SdQMOgAAAABJRU5ErkJggg=="

});

/**
 * 初始化DataRder
 * config	配置参数object对象
 * isAsync	是否需要本地缓存，异步获取后台数据
 */
var DataRder = function(config, isAsync) {
	// 初始化对象
	var Dr;
	// 根据参数判断是否需要本地缓存,异步操作.
	if(isAsync || arguments.length < 2){
		Dr = CompUtils._cloneObj($.extend(DataRender, DataRenderAsync, Expression));
		Dr.init(config);
	}else{
		//初始化参数
		Dr = CompUtils._cloneObj(DataRender);
		Dr.init(config);
	}
};

if (typeof module != 'undefined' && module.exports) {
	module.exports = DataRder;
} else {
	window.DataRder = DataRder;
}

})(window, WV);