//通话记录
var CallLog={
	init: function(){		//初始化
 		var me=this;
		this.content= $('#call_log').html(
			'<div class="pay_container">'+
				'<h2 class="chitchat_title"><span class="call_log_title">返回</span>通话记录</h2>'+
					'<div class="middle">'+	
 						
					'</div>'+	
				'</div>');
		this.callContainerHtml = $('<div id="wrapper">'+
										'<div id="scroller" class="call_content_container">'+	
									 		'<div id="pullDown" class="call_pullUp">'+
												'<h2 class="pullDownLabel" style="color: white;padding: .2rem 0;">上拉加载</h2>'+
											'</div>'+
										'</div>'+
									'</div>')
		this.containerHtml = $('<div class="call_log_content">'+
						 			'<h4>昨天</h4>'+	
						 			'<ul>'+
 									'</ul>'+
					 		    '</div>');
		this.notCallHtml = $('<li>'+
								'<dl>'+
									'<dt>'+
										'<img src="./assets/images/index_phone_actress.png">'+
										'<b>林子溪</b>'+
									'</dt>'+
									'<dd style="margin-right: 0;">'+
										'<h6>'+
											'<span></span>'+
										'</h6>'+
									'</dd>'+
								'</dl>'+
					 		'</li>');
 		this.callHtml = $('<li>'+
							'<dl>'+
								'<dt>'+
									'<img src="./assets/images/index_phone_actress.png">'+
									'<div class="call_log_content_detail">'+
										'<span>林子溪</span>'+
										'<p>好啦好啦，有感觉行了吗？不聊咯，我要去睡觉了！</p>'+
									'</div>'+
								'</dt>'+
								'<dd>'+
									'<p>下午15:06</p>'+
									'<h5></h5>'+
								'</dd>'+
							'</dl>'+
				 		'</li>');
 		var	callContainer = me.callContainerHtml.clone();
			$("#call_log .middle").append(callContainer);
 		me.bindEvent();
		me.bindData(1);
 		st.iscrollInt();
 		me.page = 0;
 		me.flag = false;
 		st.myScroll.on('scroll', $.proxy(this.updatePosition,this));
		st.myScroll.on('scrollEnd', $.proxy(this.pullUpLoad,this));
 	},
	bindData: function(page){		//绑定数据
 		var me=this;
 		// loading.show();
		post(service+ 'phonehistory?callback=?', {"page": page, "pagesize": 10}, function (json) {
			console.log(json);
   			if(json.result){
				var	container = me.containerHtml.clone();
					me.pageCount = json.pagecount;
   				$(".call_pullUp").before(container);
  				for(var i in json.list) {
					var item = json.list[i];
						me.day = st.formatDates(item.addtime, 2)
					if(Number(i) > 0) {
						var itemPrev = json.list[Number(i) - 1];
						    me.day = st.formatDates(itemPrev.addtime, 2);
					}
					me.listData(item);
  	 			}
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
  	listData: function(item){
		var me = this;
   	 		if(item.isfinish){
	 			var	listHtml = me.callHtml.clone();
 	 				listHtml.find(".call_log_content_detail p").text(item.message);
  					listHtml.find("dd p").text(st.formatDates(item.addtime, 3));
   	 		} else {
	 			var	listHtml = me.notCallHtml.clone();
	 				listHtml.find("dd h4").text(item.title);
	 		}
	 		if(me.day != st.formatDates(item.addtime, 2)){
	 			container = me.containerHtml.clone();
   				$(".call_pullUp").before(container);
	 		}
	 		listHtml.find(".call_log_content_detail span").text(me.girlname);
	 		listHtml.find("dt img").attr("src", main.girlphoto);
	 		listHtml.find("dl").attr("data-id",item.chapterid);
	 		listHtml.find("dl").attr("data-day",st.formatDates(item.addtime, 2));
	 		$(".call_log_content:last").find('h4').text(st.formatDates(item.addtime, 2));
	 		$(".call_log_content:last").find('ul').append(listHtml);
			st.myScroll.refresh();
 	},
	bindEvent: function(){	//绑定事件
		var me = this;
 		$(function() {
			FastClick.attach(document.body);
			//点击电话到电话俩天
	  	    $(document).off('click', '.call_log_content h6').on('click', '.call_log_content h6', function(e){  
	  	    	var id = $(this).parent().parent("dl").attr("data-id"),
	  	    		day = $(this).parent().parent("dl").attr("data-day");
		  	    	st.myScroll.destroy();
					st.myScroll = null;
	 	 	    	$("#call_log").hide(); 
 	 	    		Call.show(me.girlname, id, day, CallLog.callLogBack, 'video_chat');
 			});
 			//点击已拨电话看聊天记录
	  	    $(document).off('click', '.call_log_content h5').on('click', '.call_log_content h5', function(e){  
	  	    	var idH = $(this).parent().parent("dl").attr("data-id"),
	  	    		dayH = $(this).parent().parent("dl").attr("data-day");
		  	    	st.myScroll.destroy();
					st.myScroll = null;
	 	 	    	$("#call_log").hide(); 
	 	 	    	DialogueLog.show(me.girlname, idH, dayH, CallLog.callLogBack, 'video_log');
 			});
 			//点击返回首页
	  	    $(document).off('click', '.call_log_title').on('click', '.call_log_title', function(e){  
	  	    	st.myScroll.destroy();
				st.myScroll = null;
				$("#call_log .middle").empty();
 	 	    	$("#call_log").hide(); 
	 	    	me.goBack(); 
 			});

 		})
	},
 	updatePosition: function() {
 		var me = this;
 		var height = $(".call_content_container").height()/2 -17;
  		if(st.myScroll.y < -height && me.page < me.pageCount){
  			$(".call_pullUp").show();
 			console.log("ccc");
 		} 
  		if(st.myScroll.y > -height){
 			$(".call_pullUp").hide();
  		} 

  		if(st.myScroll.y < -height - 40 && me.page < me.pageCount){
 			me.flag = true;
 			console.log("bb");
 		} 
 	},
	pullUpLoad: function() {
		var me = this;
		if(me.flag) {
			me.flag = false;
			me.page ++;
			$(".call_pullUp").hide();
			console.log('调到页数',this)
			console.log("总数",me.pageCount);
			if(me.page < me.pageCount){
   				var page = me.page + 1;
   				console.log("到这");
 				me.bindData(page);
			}
 		}
  	},
	callLogBack: function() {
		var me = this;
			CallLog.init();
			$("#call_log").show();
  	},
	show: function(goBack, name){	//负责显示或构建html
		var me = this;
			me.goBack = goBack;
			me.girlname = name;
			CallLog.init();
			$("#call_log").show();
  	}
}
