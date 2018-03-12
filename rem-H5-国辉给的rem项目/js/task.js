//做任务
var Task={
	
  	init: function(){		//初始化
 		var me=this;
 		this.content= $('.task_container').empty();
 		// me.swiperInit();
  		this.content= $('.task_container').html(
			'<div id="task">'+
				'<h5 class="task_return"></h5>'+
				'<div class="task_content">'+
					'<ul class="task_tab">'+
						'<li class="task_tab_selected">任务</li>'+
 						'<li>赚钱</li>'+
						'<li>一键领取</li>'+
					'</ul>'+
 					'<div class="task_do_task">'+
 						// '<p class="task_content_detail_tab"><span></span><span></span></p>'+
					'</div>'+
		 			'<dl class="task_make_money">'+
 					'</dl>'+
				'</div>'+
			'</div>'+
			'<div class="task_gift_list_container">'+
		 		'<div class="task_gift_list shop_container">'+
					'<h2 class="task_title"><span>返回</span>任务</h2>'+
						'<div class="middle">'+	
							'<div id="wrapper">'+
		    					'<div id="scroller">'+
		 							'<ul class="task_gift_list_content">'+
		 			   				'</ul>'+
		 			   			'</div>'+
		 				    '</div>'+
	 				    '</div>'+		
				'</div>'+
			'</div>'+	
			'<div class="task_gift_list_mask_task task_gift_list_mask">'+
  				'<div class="task_gift_list_mask_speed">'+
					'<p class="task_type">加速完成</p>'+
					'<p>快速完成需要消耗15钻石，是否继续？</p>'+
					'<p style="display: none"></p>'+
					'<p>'+
						'<span>取消</span>'+
						'<span class="confirm">确定</span>'+
					'</p>'+
				'</div>'+
			'</div>');
  		this.taskContainerHtml = $('<div class="swiper-container" id="swiper_do_task">'+
										'<div class="swiper-wrapper swiper-wrapper-task">'+
											'<div class="swiper-slide swiper-slide1">'+
												'<ul class="task_content_detail clearfix">'+
						 							'<li class="task_add">'+
									 					'<h4>添加任务</h4>'+
														'<img class="task_add_img" src="./assets/images/task_add.png">'+
									 				'</li>'+
												'</ul>'+
											'</div>'+	
			 							'</div>'+
			 							'<div class="swiper-pagination"></div>'+
			 						'</div>')
  		this.taskListContainerHtml = $('<div id="wrapper">'+
				    					'<div id="scroller">'+
				 							'<ul class="task_gift_list_content">'+
				 			   				'</ul>'+
				 			   			'</div>'+
				 				    '</div>')
		this.taskListItem = $('<li>'+
								'<dl>'+
									'<dt>'+
										'<img src="">'+
 			 						'</dt>'+
									'<dd>'+
										'<h4></h4>'+
										'<p>亲密度+<b> </b></p>'+
											'<p>消耗时间：02：30</p>'+
									'</dd>'+
								'</dl>'+
									'<p class="task_gift_list_speed" style="display:none">加速</p>'+
									'<p class="task_gift_list_get" style="display:none">领取</p>'+
									'<p class="task_gift_list_start" style="display:none"><span>开始</span><span class="task_list_gold">100</span></p>'+
									'<p class="task_gift_list_wait" style="display:none">等待</p>'+
									'<p class="task_gift_list_unlock" style="display:none">2关解锁</p>'+
							'</li>');
		this.taskItemStr = $('<li>'+
							'<h3 class="task_time" style="display:none"><b>00:00</b><span></span></h3>'+
							'<h3 class="task_wait" style="display:none">等待</h3>'+
							'<h4></h4>'+
							'<img src="">'+
							'<i></i>'+
							'<p class="task_get" style="display:none">领取</p>'+
							'<p class="task_fast" style="display:none">加速</p>'+
							'<p class="task_stop" style="display:none">中止</p>'+
						'</li>');
		this.containerHtml = $('<div class="swiper-slide swiper-slide1">'+
									'<ul class="task_content_detail clearfix">'+
			 						'</ul>'+
								'</div>');	
		this.addTask = $('<li class="task_add">'+
		 					'<h4>添加任务</h4>'+
							'<img class="task_add_img" src="./assets/images/task_add.png">'+
		 				'</li>');
		this.makeMoneyHtml = $('<div>'+
							'<dt>'+
								'<p> dfd</p>'+
								'<p>fdf </p>'+
								'<p>fdf </p>'+
								'<p>fdfd </p>'+
							'</dt>'+
							'<dd>'+
								'<ul class="task_content_detail task_content_detail_make_money">'+
									'<li>'+
										'<h3 class="make_time"><b>00:54</b><span></span></h3>'+'<h4>工作</h4>'+'<img class="work" src="./assets/images/task_work.png">'+
											'<p class="do_times" style="display: block;"> </p>'+
											'<p class="do_get" style="display: none;">领取</p>'+
									'</li>'+
									'<li>'+
										'<h4>升职</h4>'+
										'<img class="promotion" src="./assets/images/task_promotion.png">'+
										'<p>' + '<b></b>' +
											'<img src="./assets/images/index_gold.png">'+
										'</p>'+
									'</li>'+
								'</ul>'+
							'</dd>'+
							'</div>');
		var	taskContainer = me.taskContainerHtml.clone();
			$(".task_do_task").append(taskContainer);
  		me.bindEvent();
		me.bindData("init");
	},
  	listHtml: "",
 	positionTypeInfo: ["实习生","职员","部门主管","部门经理","总监","副总裁","CEO","董事长"],
  	listState: [],
  	bindData: function(prize){		//绑定数据
		var me=this;
		// var post={};
		// loading.show();
 		post(service+ 'getalljoblist?callback=?', {}, function (json) {
  			console.log("json",json);
 			me.listHtml = '';
    		//任务页面渲染
   			if(!json.checkedlist.length && !json.goldjoblist.length && !json.uncheckedlist.length) {
   				return
  			} 
  			if(prize == 'toImprove') {
  				$('.task_make_money').empty();
  				me.makeMoneyData(me.positionTypeInfo, json.goldjoblist[0], json.promotionjoblist, prize);
  				return
  			}
  			if(prize == 'addLike') {
  				me.listHtml = '';
  				$(".swiper-wrapper-task").empty();
   			}
 			var arr = [],
				brr = [];
			me.addData(json.checkedlist, brr, arr);
			me.taskData(arr, brr, prize);
	    	me.handleTaskData(brr);
	    	if(prize == 'list_start') {
 	    		return
	    	}
 			//赚钱页面渲染
 			if(!json.goldjoblist.length || prize == 'addLike') {
				return
			}
			$('.task_make_money').empty();
 			me.makeMoneyData(me.positionTypeInfo, json.goldjoblist[0], json.promotionjoblist, prize);
			//列表渲染
    		if(prize != 'add') {
    			return
   			}
    		me.listData(json);
    		 
     	});  
 	},
 	addData: function(data, brr, arr) {
 		var me=this;
		for (var i  in  data) {
		    var item = data[i];
		    var listItem=me.taskListItem.clone();
		    me.listItemView(item, listItem);
			var taskItem=me.taskItemStr.clone();
			me.taskItemView(item, taskItem);
			if(item.finishtime == 0) {
				taskItem.find('.task_get').show();
				taskItem.find('h4').attr("class","get_like");
				listItem.find('.task_gift_list_get').show();
				brr.push(taskItem[0]['outerHTML']);
				me.listHtml += listItem[0]['outerHTML'];
			} else {
				arr.push(item)
			} 
 		}
 	},
 	taskData: function(arr, brr, prize) {
 		var me=this;
 		    this.index = 0;
 		    this.listIndex=0;
		for(var j in arr) {
			var listItemArr=me.taskListItem.clone();
			me.listItemView(arr[j], listItemArr); 
			var taskItemArr=me.taskItemStr.clone();
			me.taskItemView(arr[j], taskItemArr);
			if(j == 0) {
  				taskItemArr.find('.task_time').attr("id", "speed");
   				taskItemArr.find('.task_time').show();		 
				taskItemArr.find('.task_fast').show();
				listItemArr.find('.task_gift_list_speed').attr("id", "list_speed");
				listItemArr.find('.task_gift_list_speed').show();
 				me.listState.push(arr[j].jobid);
				if(prize == 'init') {
					me.doTaskTime(arr[j].finishtime/1000);  
					
				}	
				if(prize == 'add'){
					console.log("定时器",me.intervalList)
					clearInterval(me.intervalList);
					me.doListTime(arr[j].finishtime/1000);
					
				}
 				brr.push(taskItemArr[0]['outerHTML']);
 			} else {

 				taskItemArr.find('h4').attr("class", "wait_start");
 				taskItemArr.find('h4').attr("data-dotime", arr[j].timeuse);
				taskItemArr.find('.task_wait').show();		
				taskItemArr.find('.task_stop').show();
			 	listItemArr.find('.task_gift_list_wait').show();
			 	listItemArr.find('dl').attr("class", "list_wait_start" + (++this.index));
				brr.push(taskItemArr[0]['outerHTML']);
			}
			console.log("cc",this.index);
			me.listHtml += listItemArr[0]['outerHTML'];
			console.log("listHtml",listItemArr)
		}
		brr.push(me.addTask[0]['outerHTML']);
 	},
  	taskItemView: function(item, infotask) { //任务生成Dom
 		infotask.find('h4').text(item.jobname);
		infotask.find('h4').attr('data-jobid',item.jobid);
		infotask.find('h4').attr('data-diamond', item.diamond);
		infotask.find('h4').attr('data-feeling', item.feeling);
		infotask.find('h4').attr('data-icon', item.icon);
		infotask.find('img').attr("src", item.icon);
		infotask.find('i').text(item.feeling);
  	},
 	listItemView: function(item, infoList) { //任务列表生成Dom
 		var me = this;
 		infoList.find('dl').attr('data-jobid',item.jobid);
		infoList.find('dl').attr('data-diamond', item.diamond);
		infoList.find('dl').attr('data-feeling', item.feeling);
		infoList.find('dl').attr('data-timeuse', item.timeuse);
 		infoList.find('img').attr("src", item.icon);
		infoList.find('h4').text(item.jobname);
		infoList.find('dd p').eq(0).find("b").text(item.feeling);
		infoList.find('dd p').eq(1).text('消耗时间：'+me.showTime(item.timeuse));
		infoList.find('.task_list_gold').text(item.gold);
  	},
 	makeMoney: function(typeInfo, doWorkInfo, toPromote) {//赚钱页面渲染
  		var me = this,
  		    moneyItem=this.makeMoneyHtml.clone(),
  		    position = '下一级：'+typeInfo[doWorkInfo.positiontype !=7 ? doWorkInfo.positiontype + 1 : 7 ];
  			me.doTimes = doWorkInfo.surplustimes;
  			me.totalDoTimes = doWorkInfo.times;
  			me.goldPrize = doWorkInfo.salary;
  			$(".task_make_money").append(moneyItem);
 			moneyItem.find('dt p').eq(0).text('职位：'+typeInfo[doWorkInfo.positiontype]);
			moneyItem.find('.work').attr('data-jobid',doWorkInfo.goldjobid);
			moneyItem.find('.work').attr('data-iswork',doWorkInfo.iswork);
			moneyItem.find('.work').attr('data-finishtime',doWorkInfo.finishtime);
			moneyItem.find('.work').attr('data-timeuse',doWorkInfo.timeuse);
			moneyItem.find('dt p').eq(1).text('薪水：'+doWorkInfo.salary+'金币');
			moneyItem.find('dt p').eq(2).text('时长：'+doWorkInfo.timeuse/60+'分钟');
 			moneyItem.find('dt p').eq(3).text(doWorkInfo.positiontype !=7 ? position : "");
			moneyItem.find('dd li').eq(0).find("p").eq(0).text('次数'+ me.doTimes  +
											'/'+ me.totalDoTimes);
			if(!toPromote.length) {
				$(".task_content_detail_make_money li").eq(1).hide();
				return
			}
 			moneyItem.find('.promotion').attr('data-jobid',toPromote[0].promotionjobid);
			moneyItem.find('dd li').eq(1).find("p b").text(toPromote[0].gold);
 		
 	},
 	makeMoneyData: function(typeData, doWorkData, toProData, prize) {
 		var me = this;
			me.makeMoney(typeData, doWorkData, toProData);
			// console.log("is",doWorkData.iswork);
			if(doWorkData.iswork) {
				if(doWorkData.finishtime) {
					if(prize == 'init') {
						me.doWorkTime(doWorkData.finishtime/1000);
						return
					}
				}
				console.log("工作完成");
				$(".do_times").hide();
				$(".do_get").attr("data-get","1");
				$(".do_get").show();
				return
			}
			$(".do_get").attr("data-get","0");
 	},
  	handleTaskData: function(brr) { //任务展示处理
 		var me=this;
 		$(".swiper-wrapper-task").html(me.containerHtml.clone());
		for(var o in brr)
		{
			var dr=brr[o];
			if($('.swiper-wrapper-task .swiper-slide1:last').find('li').size()==4){
				$(".swiper-wrapper-task").append(me.containerHtml.clone());
 			}
  			$('.swiper-wrapper-task .swiper-slide1:last ul').append(dr);
		}
		st.swiperInit('#swiper_do_task', 1);

  	},
  	listData: function(json) {  	//添加任务列表渲染
  		var me=this;
  		var taskListInfo = json.uncheckedlist;
  		if(!taskListInfo.length) {
			return
		}  
		$(".task_gift_list_content").empty();
		var taskHtml = "";
		for(var i in taskListInfo){
			var item = taskListInfo[i],
			listItem=me.taskListItem.clone();
			me.listItemView(item, listItem);
			listItem.find('.task_gift_list_unlock').text(item.chapter+'关解锁');
			if(item.ispass == 1){
				listItem.find('.task_gift_list_start').show();
			} else {
				listItem.find('.task_gift_list_unlock').show();			
	 		}
	 		taskHtml += listItem[0]['outerHTML'];
		}
	 	taskHtml = me.listHtml + taskHtml;
		$(".task_gift_list_content").html(taskHtml);
 	    //iscroll初始化
		me.iscrollInt();
  	},
  	iscrollInt: function(){ //iscroll 挂载
 
 		$(document).ready(function () {
 			var myScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true });
 	   		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
				capture: false,
				passive: false
			} : false);
    	})
   	    
 	},
	bindEvent: function(){	//绑定事件
		var me=this;

  		//点击切换
		$(".task_tab").on('click', 'li', function(e){  
		    var target = $(this)["context"]["innerHTML"];
  			if(target == '一键领取') {
 				for(var i=0; i < $(".get_like").length; i++) {
	    			var jobid = $(".get_like").eq(i).attr("data-jobid");
	     			me.handleAddLike(jobid, $(".task_get").eq(i))
	   			}
	   			return
 			} 
  		    if(target == '任务') {
 		    	$(this).css("background-image","url(../assets/images/task_tab_selected_background.png)");
				$(".task_tab li:eq(1)").css("background-image","url(../assets/images/task_tab_background.png)");
  				$(".task_tab li:eq(2)").show();
  				$(".task_make_money").hide(); 
				$(".task_do_task").show();
  			} else {
 				$(this).css("background-image","url(../assets/images/task_tab_selected_background.png)");
				$(".task_tab li:eq(0)").css("background-image","url(../assets/images/task_tab_background.png)");
  				$(".task_tab li:eq(2)").hide();
  				$(".task_do_task").hide();
  				$(".task_make_money").show(); 
   			}
   		}) 
 		//点击领取获得好感度
		$(document).off('click', '.task_get, .task_gift_list_get').on('click', '.task_get, .task_gift_list_get', function(e) {
			var item = $(this),
 				jobid = $(this)["context"]["className"] == 'task_get' ? item.prevAll("h4").attr("data-jobid") : item.prevAll("dl").attr("data-jobid");
  			me.handleAddLike(jobid, item)
  		});
 		//点击获得好感度提示隐藏
 		$(document).off('click', '.task_gift_list_mask_task').on('click', '.task_gift_list_mask_task', function(e) {
 			// alert("4")
 		    var i = $(".task_gift_list_mask_like").length - 1;
		    if($(".task_gift_list_mask_like").length > 1){
		    	$(".task_gift_list_mask_like").eq(i).remove();
		    } else {
		    	$(this).hide();
		    	$(".task_gift_list_mask_like").eq(0).remove();
		    }
 		});

 		//点击添加任务到任务列表页 
 		$(document).off('click', '.task_add_img').on('click', '.task_add_img', function(e) {
   			var taskListContainer = me.taskListContainerHtml.clone();
  				$("#task").hide();
  				clearInterval(me.Interval);
  				$(".task_gift_list_container .middle").empty();
  			    $(".task_gift_list_container .middle").append(taskListContainer);
  			    $(".task_gift_list_container").css("z-index","3");
    			me.bindData("add");
  		});
 		//点击开始进行做任务并添加
  		$(document).off('click', '.task_gift_list_start span:first-child').on('click', '.task_gift_list_start span:first-child', function(e) {
  			var item = $(this),
  			    jobid = item.parent("p").prevAll("dl").attr("data-jobid"),
  			    timeuse = item.parent("p").prevAll("dl").attr("data-timeuse");
      		me.handleAddTask(jobid, item, timeuse);
 		});

 		//点击返回，回到任务主页
 		$(".task_title span").off('click').on('click', function(e){ 
 			$(".task_gift_list_container .middle").empty();
  			$(".task_gift_list_container").css("z-index","-3");
 			clearInterval(me.interval);
  			clearInterval(me.intervalWork);
 			$("#task").show();
  			me.bindData('init');
   		}) 
 		//点击加速
		$(document).off('click', '.task_fast, .task_stop, .task_gift_list_speed').on('click', '.task_fast, .task_stop, .task_gift_list_speed', function(e) {
			var item = $(this),
				itemSpeed = $(this)["context"]["className"],
 				jobid = $(this)["context"]["className"] == 'task_gift_list_speed' ? item.prevAll("dl").attr("data-jobid") : item.prevAll("h4").attr("data-jobid") ;
 			$(".task_gift_list_mask_task").attr("data-jobid",jobid);
	 		$(".task_gift_list_mask_task").attr("data-item",itemSpeed);

  			if(item["context"]["className"] == 'task_gift_list_speed') {
 				var listContent1 = '快速完成需要消耗'+item.prevAll("dl").attr("data-diamond")+'钻石，是否继续？';
   				me.showModal(0,0,'加速完成',listContent1); 
  			} else if(item["context"]["className"] == 'task_fast') {
  				var itemContent1 = '快速完成需要消耗'+item.prevAll("h4").attr("data-diamond")+'钻石，是否继续？';
   				me.showModal(0,0,'加速完成',itemContent1);
	 		} else {
	 			$(this).parent("li").attr("class","stop")
	 			me.showModal(0,0,'终止任务','您是否要终止此任务！');
 	 		}
     	});
  		//点击确定花费钻石或终止任务
		$('.confirm').off("click").on('click', function(e) {
			var jobid = $(".task_gift_list_mask_task").attr("data-jobid"),
				itemSpeed = $(".task_gift_list_mask_task").attr("data-item"),
				taskType = $(".task_type").text();
				console.log("确定",taskType)
				if(taskType == '加速完成') {
					me.handleSpeed(jobid, itemSpeed);
				} else if(taskType == '余额不足'){
					$("#task").hide();
	  				$(".task_container").hide();
					Pay.show(me.taskBack, 'Wealth_value_right');
				} else {
					me.stopTask(jobid, ".stop");
				}
   		});
   		//点击工作
		$(document).off('click', '.work').on('click', '.work', function(e) {
			var jobid = $(this).attr("data-jobid"),
				iswork = Number($(this).attr("data-iswork")),
				time = $(this).attr("data-timeuse"),
 				getFlag = $(".do_get").attr("data-get") == 0 ? false : true;
				console.log("工作",iswork)
 			if(getFlag) {
				me.showModal('领取后才能工作！', 1);
				return
			}
			if(!me.doTimes) {
				me.showModal("没有可用次数了！",1)
				return
			}
			if(!iswork) {
				$(".work").attr("data-iswork",0);
				me.doWork(jobid, time);
			}
    	})
    	//点击领取工作奖励
		$(document).off('click', '.do_get').on('click', '.do_get', function(e) {
			var jobid = $(this).prevAll(".work").attr("data-jobid");
			console.log("jobid",jobid);
  			me.getDoPrize(jobid); 
    	})
    	//点击升职
		$(document).off('click', '.promotion').on('click', '.promotion', function(e) {
			var jobid = $(this).attr("data-jobid"),
				flag = $(".work").attr("data-iswork") == 0 ? true : false,
				getFlag = $(".do_get").attr("data-get") == 0 ? false : true;
 			if(getFlag) {
				me.showModal('领取后才能升职！', 1);
				return
			}
			if(flag) {
				me.handleToPromote(jobid); 
				return
			}
 			me.showModal('正在工作不能升职！', 1);
     	})
     	//点击返回首页
		$(document).off('click', '.task_return').on('click', '.task_return', function(e) {
			clearInterval(me.interval);
			clearInterval(me.intervalList);
			clearInterval(me.intervalWork);
			$(".task_do_task").empty();
			$(".chat_video").attr("src", "");
			$(".task_container").hide();
			me.goBack();
        })
     },
  	handleAddLike: function(jobid, item) { //获取好感度
 		var me = this;
 	    post(service+ 'getreward?callback=?', {"jobid": jobid}, function (json) {
	    	console.log("addJob",json);
	    	if(json.result == 1){
	    		console.log("成功");
    	 		if(item["context"]["className"] == 'task_gift_list_get') {
    	 			var listNumber = '获得好感度*'+item.prevAll("dl").find("b").text();
 	 				me.showModal(listNumber, 1);
  	 				item.hide();
  	 				item.siblings('.task_gift_list_start').show();
  	  			} else {
  	  				var taskNumber = '获得好感度*'+item.prev().html();
 	  				me.showModal(taskNumber, 1); 
 	  				item.parent("li").remove();
  	  				me.bindData("addLike");
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
 	showTime: function(time) { //时间显示
  		var minute = parseInt(time/60),
 			second = time - minute * 60;
 		return 	(minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second)
 	},
 	doTaskTime: function(time) { //做任务定时器
 		var me = this,
 			totalTime = time;
      	me.interval = setInterval(function(){
  			time--;
   			if(time != 0){
				console.log("a",me.showTime(time));
 				$("#speed b").text(me.showTime(time));
				$("#speed span").css("width", parseInt(100 - (time/totalTime * 100),10) +"%");
				return
   			}
   			me.taskSpeed();
     	}, 1000);
   	},
   	taskSpeed: function() { //任务主页加速状态变化
   		var me=this;
   		clearInterval(me.interval);
  		$("#speed").hide();
		$("#speed").siblings(".task_fast").hide();
		$("#speed").siblings(".task_get").show();
		$("#speed").siblings("h4").attr("class","get_like");
		$("#speed").attr("id","");
		if($(".wait_start").length) {
			var item = $(".wait_start").eq(0);
			item.siblings(".task_wait").hide(); 
			item.siblings(".task_time").show();
			item.siblings(".task_time b").text(me.doTaskTime(item.attr("data-dotime")));
			item.siblings(".task_stop").hide();
			item.siblings(".task_fast").show();
			item.siblings(".task_time").attr("id","speed");
			item.attr("class","");
			return
		}
 		me.listState = [];
   	},
   	doListTime: function(listTime, type, item) { //做任务定时器
 		var me = this;

      	me.intervalList = setInterval(function(){
  			listTime--;
			if(listTime != 0){
				console.log("list",me.showTime(listTime));
 				return
   			}
  			me.listSpeed();
    	}, 1000);
    	if(type == "start") {
 			item.parent("p").siblings(".task_gift_list_speed").show();
			item.parent("p").siblings(".task_gift_list_speed").attr("id","list_speed");
 		}
   	},
   	listSpeed: function() { //任务列表加速状态变化
		var me=this;
			max = me.index + 1;
 			console.log("index",me.index);
		clearInterval(me.intervalList);
     	$("#list_speed").hide();
		$("#list_speed").siblings(".task_gift_list_get").show();
		$("#list_speed").attr("id","");	
		++this.listIndex;
		if(this.listIndex != max) {
 			var str = ".list_wait_start" + this.listIndex;
			console.log(str);
			console.log("m",this.listIndex);
			var listItem = $(str);
			listItem.siblings(".task_gift_list_wait").hide(); 
			listItem.siblings(".task_gift_list_speed").show();
			me.doListTime(listItem.attr("data-timeuse"));
			listItem.siblings(".task_gift_list_speed").attr("id","list_speed");
			listItem.attr("class","");
			return
 		} 
 		me.listState = [];
    },
   	handleSpeed: function(jobid, item) { //加速任务
 		var me = this;
 	    post(service+ 'speedjob?callback=?', {"jobid": jobid}, function (json) {
	    	console.log("speed",json);
	    	if(json.result == 1){
	    		console.log("成功");
	    		$(".task_gift_list_mask_task").attr("data-jobid","");
    	 		if(item == 'task_gift_list_speed') {
	 				me.listSpeed();
	 				clearInterval(me.interval);
  	  			} else {
 	  				me.taskSpeed();
 	  				clearInterval(me.intervalList);
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
   	stopTask: function(jobid, item) { //停止做任务
   		var me = this;
 	    post(service+ 'discontinuejob?callback=?', {"jobid": jobid}, function (json) {
	    	console.log("speed",json);
	    	if(json.result == 1){
	    		console.log("成功");
      	 		me.bindData("addLike"); 
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
   	doWorkTime: function(time) { //做工作定时器
 		var me = this,
 			totalTimeWork = time;
      	me.intervalWork = setInterval(function(){
  			time--;
   			if(time != 0){
				console.log("do",me.showTime(time));
				$(".make_time").show();
				$(".do_get").attr("data-get","0");
				$(".make_time span").css("width", parseInt(100 - (time/totalTimeWork * 100),10) +"%");
				$(".work").prevAll("h3").find("b").text(me.showTime(time));	
  				return
   			}
 			clearInterval(me.intervalWork);
			$(".work").attr("data-iswork",0);
			$(".make_time").hide();
			$(".do_times").hide();
			$(".do_get").attr("data-get","1"); 
			$(".do_get").show();
       	}, 1000);
   	},
   	doWork: function(jobid, time) { //开始做工作 
   		var me = this;
 	    post(service+ 'dogoldjob?callback=?', {"jobid": jobid, "type": 1}, function (json) {
	    	console.log("speed",json);
	    	if(json.result == 1){
	    		console.log("成功");
	    		$(".work").attr("data-iswork",1);
	    		if(me.jobFast){
	    			$(".work").attr("data-iswork",0);
	    			$(".do_times").hide();
 					$(".do_get").attr("data-get","1"); 
 					$(".do_get").show();
	    			return
	    		}
       	 		me.doWorkTime(time) 
   	    	} else {
   	    		$(".work").attr("data-iswork",0);
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
   	handleToPromote: function(jobid) { //提升工作职位
   		var me = this;
 	    post(service+ 'dogoldjob?callback=?', {"jobid": jobid, "type": 0}, function (json) {
	    	console.log("speed",json);
	    	if(json.result == 1){
	    		console.log("成功");
      	 		me.bindData('toImprove'); 
   	    	} else if(json.result == 0){
 	    		me.showModal(0, 0, "余额不足", "余额不足，是否要去充值！");
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
   	getDoPrize: function(jobid) { //领取工作奖励
   		var me = this;
 	    post(service+ 'getgoldreward?callback=?', {"goldjobid": jobid}, function (json) {
	    	console.log("speed",json);
	    	if(json.result == 1){
	    		console.log("成功");
	    		$(".work").attr("data-iswork",0);
 		 		me.showModal('获得'+me.goldPrize+'金币',1)
 	    		me.doTimes = me.doTimes - 1;
	    		$(".do_times").text('次数'+ me.doTimes +'/'+ me.totalDoTimes);
	    		$(".do_get").attr("data-get","0");
 	    		$(".do_get").hide(); 
      	 		$(".do_times").show();
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
 	handleAddTask: function(jobid, item, timeuse) { //添加任务
 		var me = this;
 		console.log("id",jobid)
     	post(service+ 'addjob?callback=?', {"jobid": jobid}, function (json) {
	    	console.log("addJob",json);
	    	if(json.result == 1){
	    		console.log("成功");
	    		if(me.jobFast){
	    			item.parent(".task_gift_list_start").hide();
	    			item.parent(".task_gift_list_start").siblings('.task_gift_list_get').show();
	    			return
	    		}
	    		item.parent(".task_gift_list_start").hide();
	    		clearInterval(me.IntervalList);
   	    		if(!me.listState.length) {
  	    			me.doListTime(timeuse, "start", item);
  	    			me.listState.push(jobid);
  	    			me.listIndex = 0;
  	    			me.index = 0;
  	    		} else {
 	    			var str = "list_wait_start" + (++me.index);
 	    			console.log("添加",str);
 	    			item.parent("p").siblings("dl").attr("class",str);
	    			item.parent("p").siblings(".task_gift_list_wait").show();
 	    			
 	    		}
  	    	} else {
	    		$('body').toast({
					content: json.message,
					duration:3000,
					fontSize: 16,
  					animateIn:'bounceIn-hastrans',
					animateOut:'bounceOut-hastrans',
				});	    	}
	    }) 
 	},
   	showModal: function(content, type, title, content1) {
   		if(type) {
			$(".task_gift_list_mask_speed").hide();
			$(".task_gift_list_mask_task").prepend('<p class="task_gift_list_mask_like">'+content+'</p>');
		} else {
   			$(".task_gift_list_mask_task p").eq(0).html(title);
 			$(".task_gift_list_mask_task p").eq(1).html(content1);
    		$(".task_gift_list_mask_like").hide();
	    	$(".task_gift_list_mask_speed").show();
		}
   		$(".task_gift_list_mask_task").show();
    },
    videoSrc: function(src) {
    	return src.split(".png")[0] + ".mp4"
    },
   	taskBack: function(){	//
   		var me = this;
    		me.init();
	   		$("#task").show();
	  		$(".task_container").show();
	},
   	show: function(back, jobFast){	//负责显示或构建html
   		var me = this;
	   		me.goBack = back;
	   		me.jobFast = jobFast;
	   		me.init();
	   		$("#task").show();
	  		$(".task_container").show();
	}
}