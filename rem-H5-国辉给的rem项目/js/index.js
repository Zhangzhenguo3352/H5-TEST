var main={
	modules: [VideoList, Moments, Living, Call, CallLog, ChitChat, DialogueLog, NameChange, Pay, Shop, VidoMask, Task],
	phoneReminder: null,
	wechathStrip:null,
	init: function(){
		var me = this;
		me.startVideoPlay();
		//初始化
		this.bindData();
		this.bindEvent();
		me.chapterVideo();
  	},
 	chapter: null,
	bindData:function(){		//绑定数据
		var me=this;
 		// loading.show();
		post(service+ 'homepage?callback=?', {}, function (json) {
			console.log(json);
  			if(json.result){
 				me.show(json);
 				me.girlname = json.girlname;
 				me.girlphoto = json.girlphoto;
  				me.userphoto = json.userphoto;
	 			me.phoneReminder = json.isfinishphone;
	 			me.wechathStrip = json.endwechathint;
	 			me.quickjob = json.quickjob;
 	 			me.chapter = json.chapter;
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
  	bindEvent: function(){	//绑定事件
		var me = this;
 		$(function() {
			FastClick.attach(document.body);
			//点击头像修改，昵称修改
			$(".index_head_img").on('click', function(e){  
 				$(".index_mask").show(); 
			});
			//昵称修改
			$(".index_mask_personal_homepage").find('p').children("span").on('click', function(e){
 				$("#index,.index_mask").hide();
 				$(".index_background_video").hide();
 				$(this).attr("src", "./assets/images/index_mask_click_change_name.png"); 
 			 	NameChange.show(main.goBack);
 			});
			//点击取消昵称头像设置
			$(".index_mask_image_change").find('h3').children("span").on('click', function(e){
 				$(".index_mask").hide();
 				$(".index_mask_personal_homepage").show();
 				$(".index_mask_image_change").hide();
 			});
 			//隐藏昵称头像弹窗
			$("#index").on('click', function(e){
  				if($(e.target).addClass().context.id!="index_mask_hide"){
 					$(".index_mask").hide();
				}
  			});
 			//头像修改
			$(".index_mask_personal_homepage").find('img').on('click', function(e){  
  				$(".index_mask_personal_homepage").hide();
 				$(".index_mask_image_change").show();
 			});
 			//点击拍一张照片
 			$(".index_mask_image_change p:eq(0)").find('span').on('click', function(e){  
   				var cmr = plus.camera.getCamera();
				var res = cmr.supportedImageResolutions[0];
				var fmt = cmr.supportedImageFormats[0];
				console.log("Resolution: "+res+", Format: "+fmt);
				cmr.captureImage( function( path ){
						alert( "Capture image success: " + path );  
					},
					function( error ) {
						alert( "Capture image failed: " + error.message );
					},
					{resolution:res,format:fmt}
				);
 			});
 			//点击从相册中取照片
 			$(".index_mask_image_change p:eq(1)").find('span').on('click', function(e){  
  				 alert("555")
 			});
			//点击金币与钻石并跳转到购买页
			$(".Wealth_value_right,.diamond_value_right").on('click', function(e){ 
  				$(this).attr("src", "./assets/images/index_click_add.png"); 
 				$("#index").hide();
 				$(".index_background_video").hide();
		 		Pay.show(me.goBack, $(this).context.className);
  		 		$(this).attr("src", "./assets/images/index_add.png"); 
  			});
 			//点击章节并跳转到视频列表
			$(".index_chapter").on('click', function(e){ 
  				$("#index").hide();
 				$(".index_background_video").hide();
  				VideoList.show(me.goBack);
 			});
			
			//挂断电话提醒
			$(".index_phone_reject_img").on('click', function(e){ 
				console.log("phone",me.phoneReminder);
				$(".index_phone_infor").hide();
				if(me.wechathStrip == 1) {
					$(".index_wechat_infor").show();
				} else if(me.wechathStrip == 0) {
					$(".index_wechat_infor").hide();
				} 
				if(me.phoneReminder == 1) {
					$(".index_phone").find("h2").show();
				} else if(me.phoneReminder == 0) {
					$(".index_phone").find("h2").hide();
				}
			});
			//拨打电话跳到拨打电话页
			$(".index_answer_img").on('click', function(e){ 
   			 	$("#index").hide();
 				$(".index_background_video").hide();
 				CallLog.show(me.goBack, me.girlname);
 			});
			//点击电话跳到拨打电话页
			$(".index_phone").find("img").on('click', function(e){ 
				$(this).attr("src", "./assets/images/index_click_phone.png"); 
   			 	$("#index").hide();
 				$(".index_background_video").hide();
  			  	CallLog.show(me.goBack, me.girlname);
  			  	$(this).attr("src", "./assets/images/index_phone.png");
			});
			//点击微信提示跳转到微信页
			$(".index_wechat_infor").on('click', function(e){ 
  				$("#index").hide();
 				$(".index_background_video").hide();
  			 	ChitChat.show(me.goBack);
 			})
 			//点击微信跳转到微信页
			$(".index_wechat").find("img").on('click', function(e){ 
  				$(this).attr("src", "./assets/images/index_click_wechat.png");
  				$("#index").hide();
 				$(".index_background_video").hide();
 		 		ChitChat.show(me.goBack);
 			 	$(this).attr("src", "./assets/images/index_wechat.png");
 			})
			//点击商城跳转到商城页
			$(".index_shop").find("img").on('click', function(e){ 
				$(this).attr("src", "./assets/images/index_click_shop.png"); 
				$("#index").hide();
 				$(".index_background_video").hide();
 		 		Shop.show(me.goBack);
 			 	$(this).attr("src", "./assets/images/index_shop.png"); 
 			})
 			//点击朋友圈跳转到朋友圈页
			$(".index_moments").find("img").on('click', function(e){ 
				$(this).attr("src", "./assets/images/index_click_moments.png");
 				$("#index").hide();
 				$(".index_background_video").hide();
 				Moments.show(me.goBack);
 				$(this).attr("src", "./assets/images/index_moments.png");

 			})
			//点击直播图片跳转到直播页
			$(".index_live").on('click', function(e){ 
   				$("#index").hide();
  				$(".index_background_video").hide();
 		 		Living.show(me.goBack);
  			})
			//点击任务跳转到做任务页
			$(".index_task").find("img").on('click', function(e){
				$(this).attr("src", "./assets/images/index_click_task.png"); 
  				$("#index").hide();
 				$(".index_background_video").hide();
 				Task.show(me.goBack, me.quickjob);
 				$(this).attr("src", "./assets/images/index_task.png");
			})

		})
	},
	goBack: function(){	
		// var me = this;	
		 main.bindData();
		$('.call_audio').attr("src", "");
		$('.chat_video').attr("src", "");
		$(".call_audio").hide();
 		$(".index_background_video").hide();
 		$(".index_common_reminder").hide();
		$(".index_video").show();
		$("#index").show();
	},
	startVideoPlay: function(){	 
		var $video = document.getElementsByTagName('video')[1];
  		if($.isEmptyObject(st.getstore('startVideo'))) {
			$(".chat_video").removeAttr("loop");
 			$(".chat_video").attr("src", "http://gf.omdatu.com:81/res/video/20180130113156_277515.mp4");
			$(".chat_video").show();
			$video.addEventListener('ended', function() {
			    $(".chat_video").attr("src","");
			    $(".chat_video").attr("loop","loop");
				$(".chat_video").hide();
				st.setstore('startVideo',{"video":'eeee'});
			})
 		}
		console.log("开篇视频",$.isEmptyObject(st.getstore('startVideo')));
 	},
   	chapterVideo: function() { //章节视频
   		var me = this;
 	    post(service+ 'getchaptervideo?callback=?', {"chapterid": 1}, function (json) {
	    	console.log("video",json);
	    	if(json.result == 1){
	    		console.log("成功");
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
   	chapterVideoEnd: function() { //章节视频播放完成的状态变更
   		var me = this;
 	    post(service+ 'finishchaptervideo?callback=?', {}, function (json) {
	    	console.log("video",json);
	    	if(json.result == 1){
	    		console.log("成功");
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
	show:function(json){	//负责显示或构建html  
		var me = this;
  		$(".index_head_img, .index_mask_personal_homepage").find("img").attr("src", json.userphoto); 
 		$(".index_head_img h2").html(json.username);
 		$(".index_mask_personal_homepage b").html(json.username);
 		$(".index_Wealth_value").find("span").text(json.golds);
 		$(".index_diamond_value").find("span").text(json.diamonds);
 		$(".index_chapter").find("span").find("b:eq(0)").text('第'+json.chapter+'章');
 		$(".index_chapter span b:eq(0)").text('第'+json.chapter+'章');
 		$(".index_chapter").find("span").find("b:eq(1)").text(json.chaptername);
 		$(".index_wechat_infor_name span").text(json.girlname);
 		$(".index_phone_infor p").text(json.girlname);
 		$(".index_phone_actress_img").attr("src", json.girlphoto); 
  		var intimacy = parseInt(json.userfeeling / json.needfeeling * 100, 10);
  		    intimacy = (intimacy > 100) ? "100%" : intimacy + "%";
  		if(intimacy == "100%") {
  			$(".index_intimacy p").css({"width": intimacy,"borderRadius": ".27rem",});
  		} else {
  			$(".index_intimacy p").css({"width": intimacy});
  		}  
  		$(".index_intimacy_content").find("span").text(json.userfeeling+"/"+json.needfeeling);
   		if(json.existphone == 1) {  //电话图标展示
 			$(".index_phone").show(); 
 		} else{
  			$(".index_phone").hide(); 
  		}
 		
 		if(json.existwechat == 1) { //微信图标展示
 			$(".index_wechat").show(); 
 			$(".index_moments").show();
 		} else{
 			$(".index_wechat").hide();
 			$(".index_moments").hide(); 
 		}
 		if(json.existlivestream == 1) { //直播图标展示
 			$(".index_live").show(); 
 		} else{
 			$(".index_live").hide(); 
 		}
 		if(json.endwatchcircle == 1) {  //朋友圈图标不展示红点
 			$(".index_moments").find("h2").hide(); 
 		} else{
 			$(".index_moments").find("h2").show(); 
 		}
 		if(json.isfinishjob == 1) {  // 任务图标不展示
 			$(".index_task").find("h2").show();
 		} else{
 			$(".index_task").find("h2").hide(); 
 		}

 		if(json.endphonehint == 0){  //需要电话提示
  			$(".index_phone_infor").show();

 		} else if(json.endphonehint == 1){  //不需要电话提示
 			$(".index_phone_infor").hide();
 			//需要判断电话红点
 			if(json.isfinishphone == 1) {  //电话图标不显示红点
 				$(".index_phone").find("h2").show();

 				if(json.isfinishchat == 1) {  //不展示红点 微信聊天结束
					$(".index_wechat").find("h2").hide();
 				} else　{
 					$(".index_wechat").find("h2").show();　
 				}
 			} else {
 				$(".index_phone").find("h2").hide();
  			}
 
 			if(json.endwechathint == 1){   //不需要微信提示
 				$(".index_wechat_infor").hide();
   			} else {
  				$(".index_wechat_infor").show();
  			}
		}
  		
  		if(json.ismaxchapter == 1) {
			$(".index_task").hide();
		} else {
			$(".index_task").show();
		}
 	}
}

//修改昵称
var NameChange={
	init: function(){		//初始化
 		var me=this;
		this.content= $('#name_change').html(
			'<h2 class="name_change_title"><span>取消</span><b></b>设置名字<span>完成</span></h2>'+	
	 		'<div class="name_change_content">'+
	 			'<input type="text" name="旧岛空心">'+
	 		'</div>');
		me.bindEvent();
 	},
	bindData: function(name){		//绑定数据
		var me=this;
		var param={username:name};
		// loading.show();
		post(service+ 'updateuserinfo?callback=?', param, function (json) {
  			console.log("json",json)
  			if(json.result == 1){
 				$("#name_change").hide();
				me.goBack();
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
	bindEvent: function(){	//绑定事件
		var me=this;
		//点击取消昵称设置返回首页
		$(".name_change_title span:eq(0)").on('click', function(e){ 
			console.log("333"); 
			$("#name_change").hide();
			me.goBack(); 
		})
		//点击完成昵称设置返回首页
		$(".name_change_title span:eq(1)").on('click', function(e){ 
 			var name = $(".name_change_content input").val();
			var reg =  /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi;
 			if(name.length < 4 || name.length > 14) {
 				$('body').toast({
					content: "请输入长度在4到14个的昵称！",
					duration:3000,
					fontSize: 16,
  					animateIn:'bounceIn-hastrans',
					animateOut:'bounceOut-hastrans',
				});
 			} else if(!reg.test(name)) {
 				$('body').toast({
					content: "不能包含特殊字符！",
					duration:3000,
					fontSize: 16,
  					animateIn:'bounceIn-hastrans',
					animateOut:'bounceOut-hastrans',
				});
			} else {
				me.bindData(name);
 			}
  		})
	},
	show: function(back){	//负责显示或构建html
		var me = this;
			me.goBack = back;
			me.init();
			$("#name_change").show();
	}
}

$(function(){main.init()})