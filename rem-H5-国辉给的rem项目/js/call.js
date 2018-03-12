//打电话
var Call={
		init: function(){		//初始化
	 		var me=this;
			this.content= $('#call').html(
				'<div class="call_actress">'+
		 			'<img src="./assets/images/moments_actress.png">'+
		 			'<P></P>'+
		 			'<h2>拨号中<img src="./assets/images/points.gif" style="width:.24rem;height: .24rem;margin-top: .2rem;"></h2>'+
		 		'</div>'+
		 		'<div class="call_reject">'+
		 			'<img src="./assets/images/call_reject.png">'+
		 			'<h3>取消</h3>'+
		 		'</div>');
			me.bindEvent();
			me.bindData();
		},
		bindData: function(){		//绑定数据
			var me = this;
	 		$(".call_actress p").text(me.girlname);
	 	},
		bindEvent: function(){	//绑定事件
	 
		},
		show: function(name, id, day, goBack, type){	//负责显示或构建html
			var me = this;
	 			me.girlname = name;
 	 			$(".call_audio").attr("src", "./assets/audio/phone_chat.mp3");
 	 			// $(".call_audio").show();
 	 			setTimeout(function(){
 	 				$(".call_audio").attr("src", "");
 	 				$("#call").hide();
 	 				console.log("模块",id);
 	 				DialogueLog.show(name, id, day, goBack, type);
 	 			},3000)
				Call.init();
				$("#call").show();
				console.log("name", me.girlname);
	
		}
	}