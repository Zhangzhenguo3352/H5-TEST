//直播
var Living={
	init: function(){		//初始化
 		var me=this;
		this.content= $('#living').html(
			'<div class="living_header" style="overflow: hidden;">'+
			 	'<dl class="living_actress">'+
			 		'<dt>'+
						'<img class="living_actress_img" src="./assets/images/moments_actress.png">'+
			 		'</dt>'+
			 		'<dd>'+
						'<p>林子溪</p>'+
						'<p><span></span>直播中</p>'+
			 		'</dd>'+
			 	'</dl>'+
			 	'<div class="living_man_ranking_container">'+
			 		'<div class="swiper-container" id="swiper_living" style="width: 4.3rem;float: left;">'+
						 	'<ul class="living_man_ranking swiper-wrapper">'+
		 				 	'</ul>'+
 		 			'</div>'+	 	
				 	'<p class="living_go_back"></p>'+
			 	'</div>'+
		 	'</div> '+
		 	'<div class="living_content">'+
		 		'<h2>温馨提示：涉及色情、低俗、血腥、暴力、无版权等内容将被封停账号及追究法律责任，文明绿色直播从我做起！</h2>'+
 		 		'<div class="living_move_container">'+
 		 			'<div class="living_move"></div>'+
	 			'</div>'+
  		 	'</div>'+
		 	'<div class="living_gift">'+
		 		'<div class="living_gift_container">'+
			 		'<div class="swiper-container" id="swiper_gift_living" style="overflow:visible">'+
						'<div class="swiper-wrapper swiper-wrapper-living">'+
							 
	 				 	'</div>'+ 	
	 				 	'<div class="swiper-pagination" style="top: 4.68rem;"></div>'+
					'</div>'+		
				'</div>'+	
 	 	 		'<h4 class="living_gift_pay" >'+
					'<p>充值：<b></b><i>1620</i>'+					
						'<img class="living_gift_pay_gold" src="./assets/images/living_gift_gold@2x.png">'+
						'<img class="living_gift_more" src="./assets/images/living_gift_more@2x.png">'+
					'</p>'+
					'<span>赠送</span>'+
	 	 		'</h4>'+
		 	'</div>'+
		 	'<img class="living_gift_buy" src="./assets/images/living_gift_default_buy.png">');
		this.giftListHtml = $('<div class="swiper-container" id="swiper_gift_living" style="overflow:visible">'+
									'<div class="swiper-wrapper swiper-wrapper-living">'+
										 
				 				 	'</div>'+ 	
				 				 	'<div class="swiper-pagination" style="top: 4.68rem;"></div>'+
								'</div>');

		this.manHtml = $('<li class="swiper-slide">'+
							'<div>'+
								'<img class="living_man_img" src="./assets/images/living_man_img.jpg">'+
								'<p>1</p>'+
							'</div>'+
				 		'</li>');
 		this.barrageOneHtml = $('<p><strong><span>小青龙</span>：<i>好想你啊宝宝~</i></strong></p>');
		this.barrageTwoHtml = $('<p><strong><span>bb</span>：<b>关注了主播</b></strong></p>');
		this.barrageThreeHtml = $('<p><strong>小飞侠来了</strong></p>');
		this.giftHtml = $('<li>'+
								'<p class="living_gift_name">玫瑰</p>'+
								'<img class="living_gift_img" src="./assets/images/living_gift_rose@2x.png">'+
								'<P class="living_gift_gold">'+
									'<span>10000</span>'+
									'<img class="living_gift_gold_img" src="./assets/images/living_gift_gold@2x.png">'+
								'</P>'+
								'<P>+<b class="living_gift_feel">1450</b><span></span>好感度</P>'+
				 			'</li>');
		this.containerHtml = $('<div class="swiper-slide swiper-slide-living">'+
									'<ul class="living_gift_list clearfix" style="overflow:visible">'+
			 						'</ul>'+
								'</div>');	
 		me.bindEvent();
		me.bindData();
 	},
 	flag: false,
	bindData: function(){		//绑定数据
		var me=this;
  		post(service+ 'getliveinfo?callback=?', {}, function (json) {
  			console.log("直播",json);
			if(json.userlist.length){
 				me.manData(json.userlist);
 			}
 			if(json.bulletscreen.length){
 				me.barrageData(json.bulletscreen);
 			}
 			$(".chat_video").css("z-index",-1);
 			$(".chat_video").attr("src", json.video);
 			$(".chat_video").show();
  		});  
  			
 	},
	manData: function(data){
		var me = this;
 		for(var i in data) {
			var item = data[i],
 		 		listHtml = me.manHtml.clone();
 		 		listHtml.find("img").attr("src", item.userphoto);
  		 		listHtml.find("p").text(Number(i) + 1+ "");
 				$(".living_man_ranking").append(listHtml);
  		}
  		st.swiperInit('#swiper_living', 0);
  	},
	barrageData: function(data){
		var me = this;
 		for(var i in data) {
			var item = data[i];
 	 		switch (Number(item.type)) {
				case 0:
					var barrageOne = me.barrageOneHtml.clone(); 
					    barrageOne.find("span").text(item.name);
					    barrageOne.find("i").text(item.message);
					$(".living_move").append(barrageOne);
					break;
				case 1:
					var barrageTwo = me.barrageTwoHtml.clone();
						barrageTwo.find("span").text(item.name);
					    barrageTwo.find("b").text(item.message);
					$(".living_move").append(barrageTwo);
					break;
				case 2:
					var barrageThree = me.barrageThreeHtml.clone();
 	 					barrageThree.find("strong").text(item.name + "来了"); 
	 				$(".living_move").append(barrageThree);
					break;
				case 3:
					var barrageThree = me.barrageThreeHtml.clone();
						barrageThree.attr("class", "living_player");
 	 					barrageThree.find("strong").text(item.name + "来了"); 
	 				$(".living_move").append(barrageThree);
 					break;
 			} 		 		 
   		}
		me.moveTime(0);
  	},
	giftData: function(brr){
   	 	var me=this;
 		$(".swiper-wrapper-living").html(me.containerHtml.clone());
		for(var o in brr)
		{
			var item=brr[o];
			if($('.swiper-wrapper-living .swiper-slide-living:last').find('li').size()==8){
 				$(".swiper-wrapper-living").append(me.containerHtml.clone());
 			}
  			listHtml = me.giftHtml.clone();
	 		listHtml.find(".living_gift_name").text(item.giftname);
	 		listHtml.find(".living_gift_img").attr("src", item.icon);
	 		listHtml.attr("data-id", item.giftid);
	 		listHtml.attr("data-gold", item.gold);
	 		listHtml.find(".living_gift_gold span").text(item.gold);
	 		listHtml.find(".living_gift_feel").text(item.feeling);
			$('.swiper-wrapper-living .swiper-slide-living:last ul').append(listHtml);
		}
		$(".swiper-slide-living:not(:last)").css("border","0.01rem solid rgba(255, 255, 255, 0.1)");
		
  	},
 	moveTime: function(time) { //轮播定时器
 		var me = this,
 			Height = $(".living_move_container").height() - $(".living_move").height();
    	me.intervalMove = setInterval(function(){
  			time--;
  			console.log("开启");
			if(time != Height){
				$(".living_move").css("transform","translateY("+Number(time/100)+"rem)");
				return
   			}
   			time = 0;
   			$(".living_player").remove();
   			// clearInterval(me.intervalMove);
    	}, 20);
   	},
 	bindEvent: function(){	//绑定事件
 		var me = this;
		$(function() {
			FastClick.attach(document.body);
			//点击礼物图片显示礼物选项
			$(".living_gift_buy").on('click', function(e){
				var	giftListItem = me.giftListHtml.clone();
					$(".living_gift_container").empty();
 					$(".living_gift_container").append(giftListItem);
					me.giftListData();
	 				$(".living_gift").show(); 
	 				st.swiperInit('#swiper_gift_living',1);  
			});
			//选择礼物
			$(document).on('click', '.living_gift_list li', function(e) {
		  		console.log('gold',$(this).attr("data-gold"));	
		  		$(".living_gift_list li").attr("class","");
		  		$(this).attr("class", "living_gift_selected"); 
		  		$(".living_gift_pay span").attr("data-id", $(this).attr("data-id"));
		  		$(".living_gift_pay span").attr("data-gold", $(this).attr("data-gold"));
		  		me.flag = true;
	 		});
	 		//点击增送礼物
			$(document).on('click', '.living_gift_pay span', function(e) {
		  		console.log('id',$(this).attr("data-id"));	
		  		if(me.flag) {
 		  			$(".living_gift").hide(); 
 		  			me.buyGift($(this).attr("data-id"), $(this).attr("data-gold"));
 		  			me.flag = false;
 		  			return
		  		}
		  		me.dialog("请先选择礼物！");
	 		});
	 		//点击关闭礼物选择
			$(document).on('click', '.living_header', function(e) {
				$(".living_gift_container").empty();
 		  		$(".living_gift").hide();
	 		});
			//关闭直播
			$('.living_go_back').unbind().on('click', function(e) {
				clearInterval(me.intervalMove);
				me.intervalMove = null;
 				$(".chat_video").attr("src","");
   				$("#living").hide();
  		  		me.goBack();
	 		});
	 		//关闭弹窗
			$(document).on('click', '#vido_mask', function(e) {
				 $('#vido_mask').children("p").hide();
				 $(this).hide();
	 		});
	 		//点击充值
			$(document).on('click', '.living_gift_more', function(e) {
				clearInterval(me.intervalMove);
				me.intervalMove = null;
				$(".chat_video").attr("src","");
   				$("#living").hide();
				Pay.show(me.livingBack,'Wealth_value_right');
 	 		});
 		})
 
	},
	giftListData: function() {
		var me = this;
		post(service+ 'getgiftlist?callback=?', {}, function (json) {
  			console.log("礼物",json);
 			if(json.giftlist.length){
 				me.giftData(json.giftlist);
 			}
  			$(".living_gift_pay i").text(json.usergold);
    	});
	},
 	buyGift: function(id, gold) {
		var me = this;
		post(service+ 'buygift?callback=?', {"giftid": id}, function (json) {
  			console.log("礼物",json);
 			if(json.result){
 			 	console.log('购买');
 			 	me.dialog("恭喜赠送礼物成功！");
 			 	$(".living_gift_pay i").text($(".living_gift_pay i").text() - gold);
  			 	$(".chat_video").attr("src", json.video);
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
 	livingBack: function(){	//负责显示或构建html
    	var me = this;
    		Living.init();
      		$("#living").show(); 
   	},
	dialog: function(str) { //弹窗
		$('#vido_mask').children("p").text(str);
		$('#vido_mask').children("p").show();	
		$('#vido_mask').show();	
		setTimeout(function(){
			$('#vido_mask').children("p").hide();
			$('#vido_mask').hide();
 		},2000);
 	},
 	show: function(goBack){	//负责显示或构建html
    	var me = this;
    		me.goBack = goBack;
      		Living.init();
      		$("#living").show();
   	}
}

