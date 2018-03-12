//对话记录
function Start(time, listItem, type) {
	this.time = time;
	this.item = listItem;
	this.type = type;
	console.log('this.type',type);
}
$.extend(Start.prototype, {

	init: function() {
		this.startTime();
	},

	startTime: function(){
		var me = this;
 		me.intervalDialogue = setInterval(function(){
 			console.log('dd',me.time);
			if(me.time == 0){
 				clearInterval(me.intervalDialogue);
				$(".dialogue_log_container").empty();
				$(".dialogue_log_container").append(me.item);
				return
			}
			me.time--;
 		}, 100);
	},
}) 

var DialogueLog={
	init: function(){		//初始化
 		var me=this;
		this.content= $('#dialogue_log').html(
			'<div class="dialogue_log_name">'+
				'<dl class="clearfix">'+
			 		'<dt><h2>林子溪</h2><h3>9天前</h3></dt>'+
			 		'<dd><img src="./assets/images/call_reject.png"></dd>'+
			 	'</dl>'+
			 	'<h4>对话记录</h4>'+	 	
			'</div>'+
			'<div class="dialogue_log_container">'+
 			'</div>'+
 			'<div class="chitchat_man_content dialogue_log_man_select" style="bottom: 7%;">'+
	 			'<ul>'+
	 				'<li>你在干什么？林</li>'+
	 				'<li>要不要一起吃饭</li>'+
	 				'<li>你在家吗？</li>'+
	 			'</ul>'+
	 		'</div>');
		this.manHtml = $('<div class="chitchat_man_speak clearfix dialogue_log_speak dialogue_log_man">'+
				 				'<div class="clearfix">'+
									'<dl>'+
										'<dt>'+
											'<p>你在干什hgfhgfhgfhgfhfh么？林</p><span></span>'+
											'<h6 class="chitchat_like"><b>亲密度</b><i>+2</i></h6>'+
										'</dt>'+
										'<dd><img src="./assets/images/living_man_img.jpg"></dd>'+
									'</dl>'+
								'</div>'+
					  		'</div>');
		this.womenHtml = $('<div class="chitchat_women_speak dialogue_log_speak">'+
							'<dl>'+
								'<dt><img src="./assets/images/moments_actress.png"></dt>'+
								'<dd><p>今天同学帮我录的小视频分享给你看看啊~</p><span></span></dd>'+
							'</dl>'+
				 		'</div>');
		me.bindEvent();
		me.bindData();
	},
	bindData: function(){		//绑定数据
 		var me=this;
 		// loading.show();
		post(service+ 'phonehistorybychapter?callback=?', {"chapterid": me.id, "pagesize": 10}, function (json) {
			console.log(json);
			$(".dialogue_log_container").empty();
			if(json.result){
				var $video = document.getElementsByClassName('chat_video')[0];
					$(".chat_video").attr("src", json.facevideo);
					$(".chat_video").removeAttr("loop");
					$(".chat_video").css("z-index", 0);
				 	$(".chat_video").show();

				 	if(me.videoType == 'video_log'){
				 		$video.addEventListener('ended', function() {
					 		console.log("结束");
					 		$(".chat_video").attr("src", "");
					 		$(".chat_video").css("z-index", 4);
					 		$(".chat_video").hide();
					 		$("#dialogue_log").hide();
							me.goBack();
						})
				 	}
  					me.videoControl(json, $video);
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
	videoControl: function(json, $video){
		var me = this;
		me.arr = [];
		me.brr = [];
	 	for(var i in json.phonehistory) {
			var item = json.phonehistory[i];
 			me.arr.push(item.starttime);
			me.listData(item, 0);
		}
 		if(json.selectlist.length){
			me.pauseTime = json.selectlist[0].starttime;
			me.manSelectData(json.selectlist);
		}
 		$video.addEventListener('timeupdate', function() {
			var time = parseInt(Number(this.currentTime * 1000));
			if(time > me.arr[0]) {
				$(".dialogue_log_container").empty();
				$(".dialogue_log_container").append(me.brr[0]);
				me.arr.shift();
				me.brr.shift();
 			}
			if(time > me.pauseTime) {
				$video.pause();
				$(".dialogue_log_man_select").show();
 			}
  		 	if(me.videoType != 'video_log'){
		 		$(".dialogue_log_name h3").text(me.videoTime(this.currentTime));
		 	}
	    })
	},
  	listData: function(item, type){
		var me = this;
   	 		if(!item.isgirl || type){
	 			var	listHtml = me.manHtml.clone();
 	 				listHtml.find("dt p").text(item.message);
 	 				listHtml.find("dd img").attr("src", main.userphoto);
 	 					listHtml.find(".chitchat_like i").text(item.feeling > 0 ? "+"+ item.feeling : item.feeling );	
					if(item.feeling < 0) {
						listHtml.find(".chitchat_like").css("background-image", "url(../assets/images/moments_minus_intimacy.png)")
					}

	 		} else {
	 			var	listHtml = me.womenHtml.clone();
	 				listHtml.find("dt img").attr("src", main.girlphoto);
 	 				listHtml.find("dd p").text(item.message);
	 		}
	 		if(!type){
	 			me.brr.push(listHtml);
	 		}
	 		if(type){
	 			$(".dialogue_log_container").empty();
				$(".dialogue_log_container").append(listHtml);
	 		}
  	 	// 	var ddd = new Start(parseInt(item.starttime/100), listHtml, type);
	 			// ddd.init();
   	},
	manSelectData: function(data) {
		var me=this;
 		for(var i in data) {
			var item = data[i];
				$(".chitchat_man_content li").eq(i).attr("data-id",item.scriptmessageid); 
				$(".chitchat_man_content li").eq(i).attr("data-time",item.starttime); 
				$(".chitchat_man_content li").eq(i).attr("data-feel",item.feeling); 
 				$(".chitchat_man_content li").eq(i).text(item.message); 
 		} 

	},
	videoTime: function(time) {
		var timeMinute = parseInt(time/60);	 
		var minute = timeMinute < 10 ? "0" + timeMinute : timeMinute;
		var secondTime = parseInt(time) - (60*timeMinute);
        var second = secondTime < 10 ? "0" + secondTime : secondTime;
        console.log("dfdf",minute + ":" + second);
        return minute + ":" + second;
	},
	bindEvent: function(){	//绑定事件
 		var me = this;
		$(function() {
			FastClick.attach(document.body);
  			//点击玩家选项
	 	    $(".dialogue_log_man_select ul li").on('click', function(e){  
	 	    	console.log('id',$(this).attr("data-id"));
	 	    	var $video = document.getElementsByClassName('chat_video')[0];
	 	    	var item = {
	 	    		message: $(this).text(),
	 	    		feeling: $(this).attr("data-feel"),
	 	    		starttime: $(this).attr("data-time")
	 	    	}
	 	    	me.listData(item, 1);
	 	    	$(".dialogue_log_man_select").hide();
	 	    	me.pauseTime = 100000000;
	 	    	$video.play();
	 	    	me.ReplyData($(this).attr("data-id"));
			});
			//点击返回通话记录
	 	    $(".dialogue_log_name").on('click', function(e){  
	 	    	$(".chat_video").attr("src", "");
		 		$(".chat_video").css("z-index", 4);
		 		$(".chat_video").hide();
		 		$("#dialogue_log").hide();
				me.goBack();
 			});
		})
	},
    ReplyData: function(id) { // 立即回复
   		var me = this;
 	    post(service+ 'getphonereply?callback=?', {"scriptmessageid": id}, function (json) {
	    	console.log("立即",json);
 	    	if(json.result == 1){
 	    		if(json.selectlist.length){
 	    			me.pauseTime = json.selectlist[0].starttime;
 	    			me.manSelectData(json.selectlist);
 	    		}
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
	show: function(name,id, day, back, type){	//负责显示或构建html
		var me = this;
  			me.girlname = name;
 			me.id = id;
 			me.goBack = back;
 			me.videoType = type;
 			console.log("对话",me.id);
 			DialogueLog.init();
 			$(".dialogue_log_name h2").text(name);
 			if(type == 'video_log'){
 				$(".dialogue_log_name h3").text(day);
 			} else{
 				$(".dialogue_log_name h4").hide();
 			}
   			$("#dialogue_log").show();

	}
}
