//聊天
var ChitChat={
	init: function(){		//初始化
 		var me=this;
		this.content= $('#chitchat').html(
			'<div class="chitchat_container">'+
				'<h2 class="chitchat_title header"><span>返回</span>林欣溪</h2>'+
				'<div class="middle">'+
		 			
				'</div>'+
		   		'<div class="chitchat_man_content">'+
		 			'<ul>'+
		 				'<li>你在干什么？林</li>'+
		 				'<li>要不要一起吃饭</li>'+
		 				'<li>你在家吗？</li>'+
		 			'</ul>'+
		 		'</div>'+
		 		'<div class="chitchat_bottom footer">'+
		 			'<dl>'+
						'<dt>'+
							'<h4><p>对方正在输入<img style="margin-top: 0.2rem;" src="./assets/images/points.gif"></p>'+
								'<p class="fast_reply">10<span></span>立即回复</p>'+
							'</h4>'+
							'<h5 style="display: none;">你在干什么？林</h5>'+
						'</dt>'+
						'<dd>发送</dd>'+
					'</dl>'+
				'</div>'+
	 		'</div>');
 		this.chatListContainerHtml = $('<div id="wrapper">'+
											'<div id="scroller">'+
												'<div id="pullDown">'+
													'<span class="pullDownIcon"></span><h2 class="pullDownLabel">下拉刷新...</h2>'+
					 							'</div>'+
					 							'<div class="history_log">'+
													'<h2>查看历史记录</h2>'+
					 							'</div>'+
					 		 				'</div>'+
										'</div>')
		this.containerHtml = $('<div class="chitchat_content">'+
 	 					     '</div>');	
		this.manChatHtml = $('<div class="chitchat_man_speak">'+
						 			'<h3>下午15:12</h3>'+
									'<div class="clearfix">'+
										'<dl>'+
											'<dt>'+
												'<p>你在干什么？林</p><span></span>'+
												'<h6 class="chitchat_like"><b>亲密度</b><i>-2</i></h6>'+
											'</dt>'+
											'<dd><img src="./assets/images/living_man_img.jpg"></dd>'+
										'</dl>'+
									'</div>'+
					  			'</div>');	
		this.womanChat = $('<div class="chitchat_women_speak">'+
							'<dl>'+
								'<dt><img src="./assets/images/moments_actress.png"></dt>'+
								'<dd><p>今天同学帮我录的小视频分享给你看看啊~</p><span></span></dd>'+
							'</dl>'+
				 		'</div>');
		this.womanChatImg = $('<div class="chitchat_women_speak chitchat_women_video">'+
						 			'<div class="clearfix">'+
										'<dl>'+
											'<dt><img src="./assets/images/moments_actress.png"></dt>'+
											'<dd class="chatImg">'+
												'<span></span>'+
												'<img style="width: 1rem;height: 1.3rem" src=""></img>'+
 											'</dd>'+
										'</dl>'+
									'</div>'+
						 		'</div>');
		this.womanChatVideo = $('<div>'+
									'<div class="chitchat_women_speak chitchat_women_video">'+
							 			'<div class="clearfix">'+
											'<dl>'+
												'<dt><img src="./assets/images/moments_actress.png"></dt>'+
												'<dd class="chatVideo">'+
													'<h3></h3>'+
													'<img src="">'+
	 												'<span></span>'+
						 							'<p>0:04</p>'+
												'</dd>'+
											'</dl>'+
										'</div>'+
									'</div>'+
						 		'</div>');
		this.womanChatAudio = $('<div class="chitchat_women_speak chitchat_women_audio">'+
									'<div class="clearfix">'+
										'<dl>'+
											'<dt><img src="./assets/images/moments_actress.png"></dt>'+
											'<dd class="chatAudio chat_audio_play">'+
												'<audio id="audio" src="someaudio.wav"></audio>'+
												'<span></span>'+
												'<p>10"</p>'+
											'</dd>'+
										'</dl>'+
									'</div>'+
						 		'</div>');
		var	chatListContainer = me.chatListContainerHtml.clone();
			$(".chitchat_container .middle").append(chatListContainer);
		me.bindEvent();
		me.bindData("init", main.chapter);
		st.iscrollInt();
		st.myScroll.on('scroll', $.proxy(this.updatePosition, this));
		st.myScroll.on('scrollEnd', $.proxy(this.pullUpLoad, this));
		this.chapter = main.chapter;
		me.historyflag = true;
		if(me.historyflag){
			me.historyShow();
		}
  	},
	chatSelect: false,
 	bindData: function(type, chapter){		//绑定数据
		var me=this;
			me.flag = false;
 			console.log("章节", main.chapter);
		var param = { 'chapter': chapter };
		//历史回看与玩家第一次聊天
		post(service+ 'getwechathistory?callback=?', param, function (json) {
  			console.log("json",json);
   			console.log("加载数据");
   			if(json.result){
   				if(json.wechathistory.length) {
	  				var container= me.containerHtml.clone();
	   				$(".history_log").after(container);
	  				me.historyData(json.wechathistory, container);
	  			}

	  			if(json.selectlist.length) {
	  				me.chatSelect = true;
	   				me.manSelectData(json.selectlist);
 	  			} else {
 	  				$(".chitchat_bottom h5").show();
 	  				$(".chitchat_bottom h5").text("别打扰人家了,让人家休息吧!")
	  				me.chatSelect = false;
	  			}
	  			
   			} else {
   				me.flag = true;
   				me.pullUpLoad();
 	   		}	

       	});  
   			
 
	},
	historyData: function(data, container) {
		var me=this;
		// console.log("回看记录了", str);
 		for(var i in data) {
			var item = data[i];
 			if(item.isgirl) {
 				me.girlData(item, item.format, container, 0);
 			} else{
 				me.manData(item, container, 0);
 			}
 			st.myScroll.refresh();
 		} 
 	},
	girlData: function(item, data, container, type) {
		var me = this;
 		switch (Number(data)) {
			case 0:
					var womanChatHtml = me.womanChat.clone(); 
						womanChatHtml.find("dt img").attr('src', main.girlphoto);
					    womanChatHtml.find("p").text(item.message);
					container.append(womanChatHtml);
				break;
			case 1:
				var imgHtml = me.womanChatImg.clone();
					imgHtml.find("dt img").attr('src', main.girlphoto);
					imgHtml.find("dd img").attr("src", item.message);
					imgHtml.find('dd').attr('data-src',item.message);
				container.append(imgHtml);
				break;
			case 2:
				var audioHtml = me.womanChatAudio.clone();
					audioHtml.find("dt img").attr('src', main.girlphoto);
 					audioHtml.find("dd audio").attr("src", item.message);
					audioHtml.find('dd').attr('data-src', item.message);
 					audioHtml.find('p').text(item.length + '"');
 				container.append(audioHtml);
				break;
			case 3:
				var videoHtml = me.womanChatVideo.clone();
					videoHtml.find("dt img").attr('src', main.girlphoto);
					videoHtml.find("dd img").attr("src", me.videoSrc(item.message));
					videoHtml.find('dd').attr('data-src', item.message);
					videoHtml.find('dd p').text(me.videoTime(item.length));
					videoHtml.find('.chitchat_women_video h3').css("zIndex", 6);
				container.append(videoHtml);
				break;
		}
  		st.myScroll.refresh();
  		if(me.historyflag){
			me.historyShow();
		}
   		if(type){
  			st.myScroll.scrollTo(0,$("#wrapper").height()-$("#scroller").height())
  		}
	},
	manData: function(item, container, type) {
		var me = this;
		var manChat= me.manChatHtml.clone();
			manChat.find("dd img").attr("src", main.userphoto);
			manChat.find("h3").text(st.formatDates(item.addtime, 1));
			manChat.find("p").text(item.message);
			manChat.find(".chitchat_like i").text(item.feeling > 0 ? "+"+ item.feeling : item.feeling );	
		if(item.feeling < 0) {
			manChat.find(".chitchat_like").css("background-image", "url(../assets/images/moments_minus_intimacy.png)")
		}
		container.append(manChat);	
		st.myScroll.refresh();

		if(me.historyflag){
			me.historyShow();
		}
 		if(type){
  			st.myScroll.scrollTo(0,$("#wrapper").height()-$("#scroller").height())
  		}
	},
	manSelectData: function(data) {
		var me=this;
 		for(var i in data) {
			var item = data[i];
				$(".chitchat_man_content li").eq(i).attr("data-id",item.scriptmessageid); 
				$(".chitchat_man_content li").eq(i).attr("data-time",item.answertime); 
				$(".chitchat_man_content li").eq(i).attr("data-feel",item.feeling); 
 				$(".chitchat_man_content li").eq(i).text(item.message); 
 		} 

	},
  	updatePosition: function() {
 		var me = this;
 
 		if(st.myScroll.y > 20){
 			$("#pullDown").show();
 		} 

 		if(st.myScroll.y < 20){
 			$("#pullDown").hide();
 		} 
  		if(st.myScroll.y > 100){
 			console.log('dfsdfsdfsd');
 			me.flag = true;
  		}
 
	},
	pullUpLoad: function() {
		var me = this;
		if(me.flag) {
			me.flag = false;
			$("#pullDown").hide();
			console.log(this.chapter);
 			if(this.chapter > 6){
 				this.chapter --;
				console.log("章节减", this.chapter)
				me.bindData("new", this.chapter);
			}
 		}
  	},
	historyShow: function() {
		var me = this;
			me.heightChit =  $("#chitchat").height() - $(".chitchat_title").height() - $(".chitchat_bottom").height() + 10;
	  		me.contentHeight = $("#scroller").height();

	  		if(me.contentHeight > me.heightChit) {
 				$(".history_log").hide();
 				me.historyflag = false;
 			}
			console.log("盒子高度", me.heightChit)
			console.log("滚动高度", me.contentHeight)
   	},
  	bindEvent: function(){	//绑定事件
		var me = this;
		$(function() {
			FastClick.attach(document.body);
  			//点击返回首页
	 	    $(".chitchat_title span").off("click").on('click', function(e){  
	 	    	st.myScroll.destroy();
				st.myScroll = null;
 				$(".chitchat_container .middle").empty();
 	 	    	$("#chitchat").hide(); 
	 	    	me.goBack();
			});
			//点击图片
	 	    $(document).on('click', '.chatImg', function(e) {
	 	    	console.log("图片");
	 	    	var imgSrc = $(this).attr("data-src");
 	 	    	$("#chat_img").css("background-image", "url("+imgSrc+")");
	 	    	$("#chat_img").show();
	 	    	$("#chitchat").hide();
 			});
			//点击图片
	 	    $(document).on('click', '#chat_img', function(e) {
	 	    	console.log("图片");
 	 	    	$("#chat_img").hide();
	 	    	$("#chitchat").show();
 			});
			//点击视频播放
			$(document).on('click', '.chatVideo', function(e) {
				$(".chat_video").attr("src", $(this).attr("data-src"));
	 	    	$(".chat_video").show();
	 	    	$("#chitchat").hide();
 			});
 			//点击视频停止播放
			$('.chat_video_control .chat_video').on('click', function(e) {
				console.log("关闭")
				$("#chitchat").show();
 	 	    	$(".chat_video").hide();
  			});
  			//点击音频播放
			$(document).on('click', '.chatAudio', function(e) {
				console.log('ccc');
				var audio =  $('audio').get(0);
 					audio.play();
 					$(".chatAudio").attr("id", "chat_audio_play");
 					audio.onended = function() {
 						console.log("完了");
 						$(".chatAudio").attr("id", "");
  					}
  			});
  			//点击聊天框
			$(document).on('click', '.chitchat_bottom dt', function(e) {
				if(me.chatSelect){
					$(".chitchat_man_content").show();
				}
  			});
  			//选择聊天内容 
			$(document).on('click', '.chitchat_man_content li', function(e) {
 				$(".chitchat_man_content").hide();
				$(".chitchat_bottom h5").text($(this).text());
				$(".chitchat_bottom h5").show();
				$(".chitchat_bottom dd").attr("data-id", $(this).attr("data-id"));
				$(".chitchat_bottom dd").attr("data-time", $(this).attr("data-time"));
				$(".chitchat_bottom dd").attr("data-feel", $(this).attr("data-feel"));
				$(".chitchat_bottom dd").attr("data-msg", $(this).text());
				$(".chitchat_bottom dd").attr("class", "chat_select");
   			});
   			//关闭聊天内容选择框
			$(document).on('click', '.chitchat_content', function(e) {
 				$(".chitchat_man_content").hide();
 			});
  			//发送聊天内容
			$(document).on('click', '.chitchat_bottom dd', function(e) {
				console.log("发送聊天内容");
  				console.log($(this).attr("data-id"));
				if($(this).attr("class")){
					$(this).attr("class", "");
					$(".chitchat_bottom h5").text("");
					me.chatSelect = false;
					var item = {
						"addtime": Date.parse(new Date()),
						"message": $(this).attr("data-msg"),
						"feeling": $(this).attr("data-feel")
					}
					me.manData(item, $(".chitchat_content:last"), 6);
					me.replyTime($(this).attr("data-time"), $(this).attr("data-id"));
				}
				
   			});
   			//点击立即回复
			$(document).on('click', '.fast_reply', function(e) {
 				me.handleFastReply()
			});
			//点击关闭弹窗
			$(document).on('click', '.task_gift_list_mask, .confirm', function(e) {
				console.log("立即回复");
				$(".task_gift_list_mask").hide();
			});
 			//点击查看历史记录
			$(document).on('click', '.history_log', function(e) {
				me.flag = true;
				me.pullUpLoad();	 
			});
 			 
 	    })

	},
 	videoSrc: function(src) {
    	return src.split(".mp4")[0] + ".png"
    },
	videoTime: function(time) {
        
		if(time < 10) {
			var time = time + "0:";
		} else {
			var minute = parseInt(time/60) < 10 ? "0" + parseInt(time/60) : parseInt(time/60);
	   		var second = time - parseInt(time/60) < 10 ? "0" + time - parseInt(time/60) : time - parseInt(time/60);
			time = minute + ":" + second;
		}
    	return time
    },
    handleSendInfo: function(id) { // 发送聊天内容
   		var me = this;
 	    post(service+ 'getweixinreply?callback=?', {"scriptmessageid": id}, function (json) {
	    	console.log("speed",json);
 	    	if(json.result != 0){
	    		console.log("成功");
	    		if(json.replylist.length){
	    			$(".chitchat_bottom h4").hide();
	    			me.chatSelect = true;
	    			me.girlData(json.replylist[0], json.replylist[0].format, $(".chitchat_content:last"), 6);
	    		} else{
	    			$(".chitchat_bottom h5").text("别打扰人家了，让人家休息吧！");
	    		}

 	    		if(json.selectlist.length) {
	  				me.chatSelect = true;
	   				me.manSelectData(json.selectlist, 6);
	   				return
	  			}
	  			me.chatSelect = false;
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
   	replyTime: function(time, id) { //回复定时器
 		var me = this;
 			this.replyId = id;
       	me.intervalChat = setInterval(function(){
 			if(time == 0){
				clearInterval(me.intervalChat);
  				me.handleSendInfo(id);
  				return
   			}
   			time--;
   			me.chatSelect = false;
   			$(".chitchat_bottom h4").show();
   			console.log("回复",time);
     	}, 1000);
  
   	},
    handleFastReply: function() { // 立即回复
   		var me = this;
 	    post(service+ 'promptlyreply?callback=?', {}, function (json) {
	    	console.log("立即",json);
 	    	if(json.result == 1){
 	    		console.log('立即回复了')
	    		clearInterval(me.intervalChat);
  				me.handleSendInfo(me.replyId);
     	    } else {
    	    	$(".chat_msg b").text(10 - json.usergolds);
     	    	$(".chat_msg").show();
	    		$("#vido_mask").show();
	    	}
	    }) 
   	},
	show: function(goBack){	//负责显示或构建html
		var me = this;
			me.goBack = goBack;
			me.init();
 			$('#chitchat').show();
 		console.log("返回",me.content);
		console.log("返回",goBack);
 	}
}
 