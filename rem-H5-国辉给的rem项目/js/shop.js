//商店
var Shop={
	init: function(){		//初始化
 		var me=this;
		this.content= $('#shop').html(
			'<div class="shop_container">'+
				'<h2 class="shop_title"><span>返回</span>商城</h2>'+
				'<div class="middle">'+	
 					
   				'</div>'+	
			'</div>');
		this.shopContainerHtml = $('<div id="wrapper">'+
										'<div id="scroller" class="shop_gift_list">'+
											'<ul>'+
				 							'</ul>'+
										'</div>'+
					 				'</div>')
		this.shopHtml = $('<li>'+
								'<dl>'+
									'<dt>'+
										'<img src="./assets/images/shop_gift.png">'+
			 						'</dt>'+
									'<dd>'+
										'<h4>尊享金币礼包</h4>'+
										'<p>内含：<b>钻石*300888，+珍藏版视频！</b></p>'+
									'</dd>'+
								'</dl>'+
								'<p class="shop_gift_list_price">￥<b>999.00</b></p>'+
							'</li>');
		var	shopContainer = me.shopContainerHtml.clone();
 			$("#shop .middle").append(shopContainer);
			me.bindData();
			me.bindEvent();
	  		Pay.init("shopInit");
	 		st.iscrollInt();
	},
	bindData: function(){		//绑定数据
 		var me=this;
 		// var param = { 'chapter': chapter };
 		post(service+ 'getstoreinfo?callback=?', {}, function (json) {
  			console.log("礼物",json);
			if(json.length){
				for(var i in json) {
					var item = json[i];
						me.shopListData(item);
 				}
  			}

       	});  	 
	},
	shopListData: function(item){
		var me = this;
 	 		listHtml = me.shopHtml.clone();
	 		listHtml.find("dt img").attr("src", item.icon);
 	 		listHtml.find("dd h4").text(item.title);
	 		listHtml.find("dd b").text(item.explain);
	 		listHtml.find(".shop_gift_list_price b").text(item.price);
	 		listHtml.find(".shop_gift_list_price").attr("data-id", item.purchaseid);
	 		listHtml.find(".shop_gift_list_price").attr("data-isBuy", item.isbuy);
	 		if(item.isbuy){
	 			listHtml.find(".shop_gift_list_price").text("已购买");
	 		}
			$(".shop_gift_list ul").append(listHtml);
 			st.myScroll.refresh();
 	},
 	bindEvent: function(){	//绑定事件
		var me = this;
		//点击返回首页
  	    $(".shop_title span").on('click', function(e){  
  	    	st.myScroll.destroy();
			st.myScroll = null;
			$("#shop .middle").empty();
 	    	$("#shop").hide(); 
 	    	me.goBack();
		}); 
  	},
	show: function(back){	//负责显示或构建html
 		var me = this;
			me.goBack = back;
 			Shop.init();
			$('#shop').show();
	}
}