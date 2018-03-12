//购买金币与钻石
function Examine(time, id) {
	this.time = time;
	this.id = id;
}
$.extend(Examine.prototype, {

	init: function() {
		this.startTime();
	},

	startTime: function(){
		var me = this;
		me.intervalPay = setInterval(function(){
			me.time--;
			if(me.time != 0){
			me.orderStatus(); 
			return
			}
			clearInterval(me.intervalPay);
		}, 2000);
	},
 
	orderStatus: function() { //添加任务
 		var me = this;
 		// console.log("id",payid)
     	post(service+ 'buystate?callback=?', {"orderid": me.id}, function (json) {
	    	console.log("订单",json);
	    	if(json.result == 1){
	    		clearInterval(me.intervalPay);
	    		$(".paySuccess p").eq(0).text('购买提示');
	    		$(".paySuccess p").eq(1).text('恭喜您购买成功！');
	    		$(".paySuccess").show();
	    		$("#vido_mask").show();
	    		me.updateIndex();
     	    } else {
       	    	console.log("不成功");
 	    	}
	    }) 
 	},

 	updateIndex: function() { //添加任务
 		var me=this;
 		// loading.show();
		post(service+ 'homepage?callback=?', {}, function (json) {
			console.log(json);
  			if(json.result){
 	 		 	$(".index_Wealth_value").find("span").text(json.golds);
 				$(".index_diamond_value").find("span").text(json.diamonds);
   			} else{
 				$('body').toast({
					content: json.message,
					duration:3000,
					fontSize: 16,
  					animateIn:'bounceIn-hastrans',
					animateOut:'bounceOut-hastrans',
				});
 			}
		});
 	},
}) 

var Pay={
	init: function(type){		//初始化
 		var me=this;
		this.content= $('#pay').html(
			'<div class="pay_container">'+
	 			'<h2 class="pay_title"><span>返回</span>充值</h2>'+	
				'<ul class="pay_tab">'+	
					'<li class="pay_tab_selected">钻石</li>'+
					'<li>金币</li>'+
				'</ul>'+
				'<div class="pay_money_value">'+
					'<h3>尊敬的&nbsp;早安&nbsp;<b>实习生</b>：</h3>'+
					'<p class="pay_money_diamond_value">'+
						'<img src="./assets/images/pay_diamond.png">'+
						'<span>8</span>'+
					'</p>'+
					'<p class="pay_money_gold_value">'+
						'<img src="./assets/images/pay_gold.png">'+
						'<span>1000</span>'+
					'</p>'+	
				'</div>'+
				'<div class="middle">'+	
 					
   				'</div>'+
  			'</div>');

		this.payContainerHtml = $('<div id="wrapper">'+
									'<div id="scroller">'+
										'<ul class="pay_buy_diamond">'+
			 							'</ul>'+
			 							'<ul class="pay_buy_gold">'+
			 							'</ul>'+
									'</div>'+
				 				'</div>')
		this.payHtml = $('<li>'+
							'<dl>'+
								'<dt>'+
									'<img src="./assets/images/pay_diamond_buy.png">'+
		 						'</dt>'+
								'<dd>'+
									'<h4>钻石*60</h4>'+
									'<p>内含：<b>钻石*300</b></p>'+
									'<p>赠送：<b>钻石*15</b></p>'+
								'</dd>'+
							'</dl>'+
							'<p class="pay_buy_diamond_price">￥<b>98.00</b></p>'+
						'</li>');
  		if(type == 'payInit'){
 			var	payContainer = me.payContainerHtml.clone();
 				$("#pay .middle").append(payContainer);
	 			me.bindData();
 				st.iscrollInt();
 		}
		Pay.bindEvent();
 	},
  	bindData: function(){		//绑定数据
 		var me=this;
 		// var param = { 'chapter': chapter };
 		post(service+ 'getrechargeinfo?callback=?', {}, function (json) {
  			console.log("充值",json);
 			$(".pay_money_value h3 b").text(json.position);
  			$(".pay_money_diamond_value span").text(json.userdiamonds);
  			$(".pay_money_gold_value span").text(json.usergolds);
 			if(json.diamondrechargelist.length){
 				var data = json.diamondrechargelist; 
 				for(var i in data) {
					var item = data[i];
		 				me.listData(item, 6);
	 			}
 			}
 			if(json.goldrechargelist.length){
 				var dataGold = json.goldrechargelist; 
 				for(var j in dataGold) {
					var itemGold = dataGold[j];
		 				me.listData(itemGold, 0);
	 			}
  			}
     	});
 	},
 	listData: function(item, type){
		var me = this;
	 		listHtml = me.payHtml.clone();
	 		listHtml.find("dt img").attr("src", item.icon);
	 		listHtml.find("dd h4").text(item.title);
	 		listHtml.find("dd p").eq(0).find("b").text(item.title);
	 		listHtml.find("dd p").eq(1).hide();
	 		if(item.present){
	 			listHtml.find("dd p").eq(1).find("b").text(item.present);
	 			listHtml.find("dd p").eq(1).show();
	 		}
	 		listHtml.find(".pay_buy_diamond_price b").text(item.price);
	 		
	 		if(type){
	 			listHtml.find(".pay_buy_diamond_price").attr("data-id", item.purchaseid);
	 			$(".pay_buy_diamond").append(listHtml);
	 		} else{
	 			listHtml.find(".pay_buy_diamond_price").attr("class", "pay_buy_gold_price");
	 			listHtml.find(".pay_buy_gold_price").attr("data-id", item.purchaseid);
 	 			$(".pay_buy_gold").append(listHtml);
	 		}
  			st.myScroll.refresh();
   	},
 	bindEvent: function(){	//绑定事件
		var me = this;
  		$(function() {
			FastClick.attach(document.body);
			//点击返回首页
	  	    $(".pay_title span").on('click', function(e){  
	  	    	st.myScroll.destroy();
				st.myScroll = null;
				$("p").unbind(); 
 				$("#pay .middle").empty();
	 	    	$("#pay").hide(); 
 	 	    	me.goBack();  
			});
 			//点击购买切换
			$(".pay_tab").on('click', 'li', function(e) {
 				$(".pay_tab li").attr("class","");
				if($(this).index()){
  					$(".pay_buy_diamond").hide();
					$(".pay_buy_gold").show();
				} else{
					$(".pay_buy_diamond").show();
					$(".pay_buy_gold").hide();
				}
				$(this).attr("class", "pay_tab_selected");
			});
			//点击支付
			$(document).off('click', '.pay_buy_diamond_price, .pay_buy_gold_price, .shop_gift_list_price').on('click', '.pay_buy_diamond_price, .pay_buy_gold_price, .shop_gift_list_price', function(e) {
   				
   				if($(this).context.className == "shop_gift_list_price") {
   					var buy = $(this).attr("data-isBuy");
   						console.log(buy)
   						if(Number(buy)) {
   							console.log("999")
   							return
   						}
   				}
   				console.log("333")
				me.handlePayMoney($(this).attr("data-id"));
 			});

			//点击关闭弹窗
			$(document).on('click', '#vido_mask, .confirm', function(e) {
 				$(".paySuccess").hide();
 				$("#vido_mask").hide();
			});
		})
 	},
 	handlePayMoney: function(id) { //添加任务
 		var me = this;
 		// console.log("id",payid)
     	post(service+ 'recharge?callback=?', {"purchaseid": id}, function (json) {
	    	console.log("payMoney",json);
	    	if(json.result == 1){
	    	  h5platform.pay(json);
	    		var aaa = new Examine(20, json.game_orderno);
	    			aaa.init();
   	    	} else {
	    		$('body').toast({
					content: json.message,
					duration:3000,
					fontSize: 16,
  					animateIn:'bounceIn-hastrans',
					animateOut:'bounceOut-hastrans',
				});
	    	}
	    }) 
 	},
	closecallback:null,
   	show: function(back, type){	//负责显示或构建html
   		var me = this;
		me.goBack = back;
		me.type = type;
 		me.init("payInit");
 		if(type == 'Wealth_value_right') {
 			$(".pay_tab li").attr("class","");
 			$(".pay_tab li").eq(1).attr("class","pay_tab_selected");
 			$(".pay_buy_diamond").hide();
 			$(".pay_buy_gold").show();
 		}
 		$("#pay").show();
  	}
}