/**
 * 数据渲染组件 异步加载插件
 */
var DataRenderAsync = {
	
	// 重写 getData方法
	_getData : function(url, params){
		var self = this;
		var data = self._getLocalData(url, params);
	//	data = [{"sellStatus":null,"ownerToUsers":null,"icoPath":null,"updatedDate":null,"isDeleted":null,"build":"GLC","acreage":null,"type":null,"areaId":null,"updatedBy":null,"id":1624,"area":null,"areaName":"水印城","createdBy":null,"floor":null,"address":null,"zoneAreaId":null,"zoneAreaName":null,"imageStr":null,"zoneArea":null,"houseToCh":"GLC幢 2单元 102室","bedNum":null,"ownersrvs":null,"createdDate":null,"uint":"2","room":"102"},{"sellStatus":null,"ownerToUsers":null,"icoPath":null,"updatedDate":null,"isDeleted":null,"build":"jg","acreage":null,"type":null,"areaId":null,"updatedBy":null,"id":3589,"area":null,"areaName":"荣域社区","createdBy":null,"floor":null,"address":null,"zoneAreaId":null,"zoneAreaName":"金桂花园","imageStr":null,"zoneArea":null,"houseToCh":"jg幢 1单元 2室","bedNum":null,"ownersrvs":null,"createdDate":null,"uint":"1","room":"2"},{"sellStatus":null,"ownerToUsers":null,"icoPath":null,"updatedDate":null,"isDeleted":null,"build":"GLC","acreage":null,"type":null,"areaId":null,"updatedBy":null,"id":4360,"area":null,"areaName":"汇锦园","createdBy":null,"floor":null,"address":null,"zoneAreaId":null,"zoneAreaName":null,"imageStr":null,"zoneArea":null,"houseToCh":"GLC幢 2单元 202室","bedNum":null,"ownersrvs":null,"createdDate":null,"uint":"2","room":"202"},{"sellStatus":null,"ownerToUsers":null,"icoPath":null,"updatedDate":null,"isDeleted":null,"build":"JRGLC","acreage":null,"type":null,"areaId":null,"updatedBy":null,"id":6856,"area":null,"areaName":"景冉佳园","createdBy":null,"floor":null,"address":null,"zoneAreaId":null,"zoneAreaName":null,"imageStr":null,"zoneArea":null,"houseToCh":"JRGLC幢 2单元 204室","bedNum":null,"ownersrvs":null,"createdDate":null,"uint":"2","room":"204"},{"sellStatus":null,"ownerToUsers":null,"icoPath":null,"updatedDate":null,"isDeleted":null,"build":"1","acreage":null,"type":null,"areaId":null,"updatedBy":null,"id":6872,"area":null,"areaName":"暾澜社区","createdBy":null,"floor":null,"address":null,"zoneAreaId":null,"zoneAreaName":null,"imageStr":null,"zoneArea":null,"houseToCh":"1幢 1单元 1101室","bedNum":null,"ownersrvs":null,"createdDate":null,"uint":"1","room":"1101"},{"sellStatus":null,"ownerToUsers":null,"icoPath":null,"updatedDate":null,"isDeleted":null,"build":"A","acreage":null,"type":null,"areaId":null,"updatedBy":null,"id":7210,"area":null,"areaName":"荣域社区","createdBy":null,"floor":null,"address":null,"zoneAreaId":null,"zoneAreaName":"金桂花园","imageStr":null,"zoneArea":null,"houseToCh":"A幢 1单元 101室","bedNum":null,"ownersrvs":null,"createdDate":null,"uint":"1","room":"101"},{"sellStatus":null,"ownerToUsers":null,"icoPath":null,"updatedDate":null,"isDeleted":null,"build":"1","acreage":null,"type":null,"areaId":null,"updatedBy":null,"id":7242,"area":null,"areaName":"荣域社区","createdBy":null,"floor":null,"address":null,"zoneAreaId":null,"zoneAreaName":"金桂花园","imageStr":null,"zoneArea":null,"houseToCh":"1幢 1单元 112室","bedNum":null,"ownersrvs":null,"createdDate":null,"uint":"1","room":"112"},{"sellStatus":null,"ownerToUsers":null,"icoPath":null,"updatedDate":null,"isDeleted":null,"build":"5","acreage":null,"type":null,"areaId":null,"updatedBy":null,"id":7254,"area":null,"areaName":"山水人家","createdBy":null,"floor":null,"address":null,"zoneAreaId":null,"zoneAreaName":"彩云天","imageStr":null,"zoneArea":null,"houseToCh":"5幢 1单元 101室","bedNum":null,"ownersrvs":null,"createdDate":null,"uint":"1","room":"101"},{"sellStatus":null,"ownerToUsers":null,"icoPath":null,"updatedDate":null,"isDeleted":null,"build":"GLC","acreage":null,"type":null,"areaId":null,"updatedBy":null,"id":7257,"area":null,"areaName":"山水人家","createdBy":null,"floor":null,"address":null,"zoneAreaId":null,"zoneAreaName":"彩云天","imageStr":null,"zoneArea":null,"houseToCh":"GLC幢 1单元 101室","bedNum":null,"ownersrvs":null,"createdDate":null,"uint":"1","room":"101"},{"sellStatus":null,"ownerToUsers":null,"icoPath":null,"updatedDate":null,"isDeleted":null,"build":"B","acreage":null,"type":null,"areaId":null,"updatedBy":null,"id":7267,"area":null,"areaName":"山水人家","createdBy":null,"floor":null,"address":null,"zoneAreaId":null,"zoneAreaName":"彩云天","imageStr":null,"zoneArea":null,"houseToCh":"B幢 2单元 202室","bedNum":null,"ownersrvs":null,"createdDate":null,"uint":"2","room":"202"},{"sellStatus":null,"ownerToUsers":null,"icoPath":null,"updatedDate":null,"isDeleted":null,"build":"G","acreage":null,"type":null,"areaId":null,"updatedBy":null,"id":7273,"area":null,"areaName":"水印城","createdBy":null,"floor":null,"address":null,"zoneAreaId":null,"zoneAreaName":null,"imageStr":null,"zoneArea":null,"houseToCh":"G幢 3单元 303室","bedNum":null,"ownersrvs":null,"createdDate":null,"uint":"3","room":"303"},{"sellStatus":null,"ownerToUsers":null,"icoPath":null,"updatedDate":null,"isDeleted":null,"build":null,"acreage":null,"type":null,"areaId":null,"updatedBy":null,"id":7277,"area":null,"areaName":"无幢无单元","createdBy":null,"floor":null,"address":null,"zoneAreaId":null,"zoneAreaName":null,"imageStr":null,"zoneArea":null,"houseToCh":"101室","bedNum":null,"ownersrvs":null,"createdDate":null,"uint":null,"room":"101"}]; 
		return data;
	},
	
	// 重写渲染处理 
	render:function(){
		var self = this;
		self.setup();
		self._asyncLoadData();
	},
	
	// 异步加载图片
	_asyncLoadImg : function(){
		var self = this;
		var compName = self.get("compName");
		var compObj = self._getComp$Obj(compName);
		compObj.find("img").each(function(index){
			var webUrl = $(this).attr(self._KEY_IMG);
			if(!webUrl || webUrl == ""){
				return;
			}
			
			var url = "app/image/ajax-get-version?imgUrl=" + webUrl;
			
			if(url.indexOf("http") < 0 && WV && WV.isSupport){
				var headUrl = WV.getUrl();
				headUrl && (url = headUrl + url);
			}
			var version = Math.random()*100000;
//			var version = tPost(url,null);
			
			WV && WV.isSupport && WV.initImgCache(webUrl, 
				"var fn = function(base64){" +
					"var src = base64;" +
					"var imgs = $(\"["+ self._KEY_COMP +"='"+ compName +"']\").find(\"img\");" +
					"if(imgs && imgs.length > "+index+"){" +
					"	$(imgs["+index+"]).attr(\"src\",src);" +
					"}" +
				"};" +
				"fn($1);"
				, version + "");
		});
	},
	
	// 异步加载数据
	_asyncLoadData : function(){
		var self = this;
		var url = self.get("url");
		
		if(!url) return null;
		
		// url处理，如果是native版本，则通过WV.getUrl 获取头
		if(url.indexOf("http") < 0 && WV && WV.isSupport){
			var headUrl = WV.getUrl();
			headUrl && (url = headUrl + url);
		}
		
		var param = (self.get("param")) ? self.get("param") : null;
		
		var compName = self.get("compName");
		var comp$Obj = self._getComp$Obj(compName);
		var list$Obj = self._getListObj(comp$Obj);
		// 异步回调
		var asyncCallBackFn = self.get("asyncCallBackFn") ? self.get("asyncCallBackFn") : null;
		
		// 异步请求
		tPost(url, param, function(json){
			// 异步渲染页面
			var data = (json && json.result) ? json.result : null;
			if(!data){
				self._showTip(compName);
				//return;
			}else{
				self._hideTip(compName);
			}
			if (!comp$Obj) return;
			
			//TODO 做md5 校验
			var isChg = true;
			
			// 写数据到本地
			(isChg) && WV && WV.isSupport && WV.setLocalData(url, param, json);
			
			var isList = false;
			// 判断组件是list形式还是simple形式
			
			if(list$Obj && list$Obj.length > 0) isList = true;
			
			if(isList){
				self._doDealListData(list$Obj, self._KEY_LIST, data, compName);
			}else{
				self._doDealSimpleData(comp$Obj, data);
			}
			self._showData(compName);
			
			// 调用回调
			if(asyncCallBackFn) asyncCallBackFn();
			
			// 重新从配置中 获取图片
			self._getImgFromConfig();
			
			// 异步加载图片
			self._asyncLoadImg();
		});
	},
	
	// 重新从配置中 获取图片
	_getImgFromConfig : function(){
		var self = this;
		var compName = self.get("compName");
		var compObj = self._getComp$Obj(compName);
		compObj.find("img").each(function(index){
			var webUrl = $(this).attr(self._KEY_IMG);
			if(!webUrl || webUrl == ""){
				return true;
			}
			var imgUrl = self.get("localImg_" + index);
			if(typeof(imgUrl) == "undefined" || imgUrl == ""){
				imgUrl = self._defaultImg;
			}
			$(this).attr("src", imgUrl);
		});
	},
	
	// 获取app本地数据
	_getLocalData : function(url, params){
		var self = this;
		if(!url) return null;
		if(url.indexOf("http") < 0 && WV && WV.isSupport){
			var headUrl = WV.getUrl();
			headUrl && (url = headUrl + url);
		}
		if(!WV || !WV.isSupport) return null;
		
		params = (params) ? params : null;
		var rst = (WV.getLocalData) ? WV.getLocalData(url, params) : null;
		if(!rst) return null;
		
		// 设置md5 用来校验是否有变化
		if(rst.md5) self.set("md5", rst.md5);
		if(rst.data && rst.data.result) {
			return rst.data.result;
		}
		return null;
	},
	
	// 给本地写缓存
	_setLocalData : function(url, params, data){
		if(!url) return null;
		if(!WV || !WV.isSupport) return null;
		
		WV.setLocalData && WV.setLocalData(url, params, data);
	}
};