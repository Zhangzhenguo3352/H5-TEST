//视频列表
var VideoList={
	videolisttemp:null,
	indextemp:null,
	backgroundtemp:null,
	init: function(){		//初始化
 		var me=this;
		me.content= $('#video_list').html(
			'<h2 class="list_title"><span id="back">返回</span>视频</h2><ul class="list_contain"></ul>');
		me.videolisttemp = $('#video_list');
		me.indextemp = $('#index');
		me.backgroundtemp = $(".index_background_video");
		me.bindData();
		me.bindEvent();
		this.content.show();
		
	},
	bindData: function(){		//绑定数据
		var me = this;
		post(service+'getvideolist?callback=?',{}, function(json){
		   // console.log(json)
			var html = "";
			for (var i  in  json) {
			    var item = json[i];
				
					if(item.ispass == 0){
						html += `<li class="videolistnopass"><img src="${item.icon}"><b></b><span>${item.chapter}关解锁</span></li>`
					} else if (item.ispass == 1) {					
						if (item.isunlock == 0) {		
							html += "`<li class='list_isUnlock_mask' data-src="+item.icon+" eggvideoid="+item.eggvideoid+" unlockmoney="+item.unlockmoney+"><img id='eggvideo' src="+item.icon+"><b class='list_isUnlock_mask' ></b><span>" +
							"<img style='width: .35rem;height: .35rem;margin-right: .06rem;' src='./assets/images/unLockGold.png'>"+item.unlockmoney+"金币</span></li>`"
						} else {
							html += "`<li><img class='listispass'  src="+item.icon+"><span class='listispass' src="+item.icon+">"+item.chapter+"章</span></li>`"
						}
					} 
			}
		
		    html += '<div class="task_video_list_deblock_video task_video_list_deblock">'+
  				'<div class="task_video_list_mask_speed">'+
					'<p>解锁视频</p>'+
					'<p>快速完成需要消耗15钻石，是否继续？</p>'+
					'<p style="display: none"></p>'+
					'<p style="margin-top:15px">'+
						'<span class="cancel">取消</span>'+
						'<span class="aconfirm">确定</span>'+
					'</p>'+
				'</div>'+			
			'</div>'
 			me.content.find(".list_contain").html(html);
			
			$(".cancel").click(function(){
				$(".task_video_list_deblock_video").hide();
			});
		
			$(".videolistnopass").click(function(){
				me.showModal("此关卡暂未解锁",1);
			});
			$(".list_isUnlock_mask11").click(function(){
				$(".list_isUnlock_mask").click();
			});
			$(".list_isUnlock_mask").click(function(){
				var gold = $(this).attr("unlockmoney");
				var eggvideoid = $(this).attr("eggvideoid");
				var src = $(this).attr("data-src");
				$(".task_video_list_deblock_video").attr("data-eggvideoid",eggvideoid);
				$(".task_video_list_deblock_video").attr("data-src",src);
				var listContent1 = '解锁该视频需要消耗'+gold+'金币';
				$(".task_video_list_deblock_video").attr("tempparameter",2);
   				me.showModal(0,0,'解锁视频',listContent1); 
			});
			
			$(".listispass").click(function(){
				$(".task_container").hide();
				var icon = $(this).attr("src");
				var strFileName = st.icontovideo(icon);	
				$(".video_list").attr("src", strFileName);
	 	    	$(".video_list").show();
	 	    	$("#video_list").hide();
			});
			$(".video_list").on('click', function(e) {
				console.log("关闭")
				$("#video_list").show();
 	 	    	$(".video_list").hide();
  			});
			
			$(".aconfirm").click(function(){
				var eggvideoid = $(".task_video_list_deblock_video").attr("data-eggvideoid");
				var src = $(".task_video_list_deblock_video").attr("data-src");
				var tempparameter = $(".task_video_list_deblock_video").attr("tempparameter");
				
				if(tempparameter == 1){//跳转充值界面
					me.videolisttemp.hide();
					//$(".index_background_video").hide();
					//Pay.init();
					Pay.show(me.VideoListBack, 'Wealth_value_right');
					/*if($(this).context.className == 'Wealth_value_right') {
						$(".pay_tab li").attr("class","");
						$(".pay_tab li").eq(1).attr("class","pay_tab_selected");
						$(".pay_buy_diamond").hide();
						$(".pay_buy_gold").show();
					}*/
					
					//$("#pay").show();
				}else{					
					console.log("确定",$(".task_video_list_mask_speed p:first-child").html());
					me.buyeggvideo(eggvideoid,src);
				}
			});
		});
	},
	
	bindEvent: function(){	//绑定事件
		var me = this;
		st.click(this.content.find('.list_title'),function(){
			//me.videolisttemp.hide();
			//me.indextemp.show();	
			$(".video_list").attr("src", "");
			me.content.hide();
			if(me.closecallback){me.closecallback()}
		});
		$(document).on('click', '.chatVideo', function(e) {
			$(".video_list").attr("src", $(this).attr("data-src"));
	 	    $(".video_list").show();
	 	    $("#video_list").hide();
 		});			
	},
	buyeggvideo: function(eggvideoid,src) { //停止做任务
   		var me = this;
 	    post(service+ 'buyeggvideo?callback=?', {"eggvideoid": eggvideoid}, function (json) {
	    	console.log("speed",json);
	    	if(json.result == 1){
	    		console.log("成功");
      	 		me.bindData();
				var strFileName = st.icontovideo(src);	
				$(".video_list").attr("src", strFileName);
	 	    	$(".video_list").show();
				$(".task_video_list_deblock_video").hide();
	 	    	$("#video_list").hide();
   	    	} else {
				$(".task_video_list_deblock_video").attr("tempparameter",1);
				me.showModal(0,0,'充值提示','金币不足是否充值'); 
	    	}
	    }) 
   	},

	showModal: function(content, type,title, content1) {
		if(type) {
			$(".task_video_list_mask_speed").hide();
			$(".task_video_list_deblock_video").prepend('<p class="task_video_list_mask_like">'+content+'</p>');
			setTimeout(function(){
				$(".task_video_list_mask_like").hide();
				$(".task_video_list_deblock_video").hide();
			},1000);
			$(".task_video_list_mask_like").click(function(){
				$(".task_video_list_mask_like").hide();
				$(".task_video_list_deblock_video").hide();
			});
		} else {
			//var pvalue = $(".task_video_list_mask_like").val();
			//alert(pvalue);
			$(".task_video_list_mask_speed p").eq(0).html(title);
			$(".task_video_list_mask_speed p").eq(1).html(content1);
			$(".task_video_list_mask_speed").show();
		}
		$(".task_video_list_deblock_video").show();
    },
	
	closecallback:null,
	show: function(closecallback){	//负责显示或构建html
		this.closecallback=closecallback;
		this.init();
	},
	VideoListBack:function(){
		VideoList.init();
		$("#video_list").show();
	}
}
