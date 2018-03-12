//朋友圈
var Moments={
	fullimg:null,
	fullscreen:function(timg){			//图片全屏
		var src=timg.attr('url');
		var img=$('.fullscreen img');
		img.attr('src',src);
		$('.fullscreen').show(100);
		var sw=$(window).width(),sh=$(window).height();
		var w=timg.get(0).naturalWidth,h=timg.get(0).naturalHeight;
		var isv=sw/sh>w/h;
		img.css({width:(isv?'auto':'100%'),height:(isv?'100%':'auto')});
		st.click($('.fullscreen'),function(){$(this).hide()});
	},
	init: function(){		//初始化
 		var me=this;
		this.content= $('#moments').html(
			'<h2 class="moments_title"><span>返回</span>朋友圈</h2>'+
			'<div class="moments_content">'+
				'<dl style="display:none;">'+
					'<dt>'+
						'<img class="moments_actress_img" src="'+main.girlphoto+'">'+
					'</dt>'+
					'<dd>'+
						'<p class="moments_actress_name">'+main.girlname+'</p>'+
						'<p class="moments_share_content"></p>'+
						'<img class="moments_share_img">'+
						'<div class="moments_share_details">'+
							'<p class="moments_share_time"></p>'+
	 						'<h4 id="divcomment" class="moments_comment">'+
								'<div class="moments_comment_frame">'+
									'<img id="docomment" class="moments_default_comment_img" src="./assets/images/moments_add_comment_img.png">'+
									'<img id="notcomment" class="moments_default_comment_img" src="./assets/images/moments_default_comment_img.png">'+
									'<span></span>'+
								'</div>'+
								'<p id="commentcount"></p>'+
							'</h4>'+
							'<h3 id="praise" class="moments_like">'+
								'<img id="notgood" class="moments_add_like_img" src="./assets/images/moments_default_like_img.png"/>'+
								'<img id="dogood" class="moments_add_like_img" src="./assets/images/moments_add_like_img.png"/>'+
								'<p id="goodcount"></p>'+
							'</h3>'+
						'</div>'+
						'<div class="moments_comment_content_container">'+
							'<div class="moments_comment_content">'+
								'<span></span>'+
							'</div>'+
							'<p class="moments_add_intimacy">'+
								'亲密度<span></span><font></font>'+
							'</p>'+
						'</div>'+
					'</dd>'+
				'</dl>'+
			'</div>'+
			'<div id="sellist" class="moments_comment_content_select" >'+
			'</div>'
			);
		this.dl=st.temp(this.content.find('dl'));
		this.content.find('dl').remove();
		me.loaddatanext();
		me.bindevent();
		this.content.show();
	},
	page:0,
	loadlock:false,
	pagecount:1,
	loaddatanext: function(){		//绑定数据
		var me=this;
		if(this.loadlock){return;}
		this.loadlock=true;
		if(this.page>=me.pagecount){return;}
		this.page++;
		var data={
			userid:userid,
			page:this.page,
			pagesize:10
		}
 	    post(service+ 'getcircleoffriendsinfo?callback=?',data, function (json) {
			me.pagecount=json.pagecount;
			me.appendlist(json.list);
			me.loadlock=false;
		});
 	},
	bindevent:function(){
		var me=this;
		st.click(this.content.find('.moments_title'),function(){
			me.content.hide();
			if(me.closecallback){me.closecallback()}
		});
		this.content.find('.moments_content').scroll(function(e){
			me.onscroll($(this));
		});
	},
	onscroll:function(obj){
		if(obj.get(0).scrollHeight-(obj.get(0).scrollTop+obj.height())<200){
			this.loaddatanext();
		}
	},
	appendlist:function(list){
		var me=this;
		for(var o in list){
			var dr=list[o];
			var td=st.temp(this.dl);
			this.content.find('.moments_content').append(td);
			me.bindblock(td,dr);
		}
	},
	commentbutton:function(block,isseled){			//根据状态更换图标显示
		st.switchshow(block.find('#docomment'),block.find('#notcomment'),isseled);
		if(isseled){block.find('.moments_comment_frame span').hide();}
	},
	bindblock:function(block,item)				//绑定单个回复框内容
	{
		var me=this;
		block.attr('cfid',item.circleoffriendsid);
		block.find('.moments_share_content').text(item.message);
		block.find('.moments_share_img').attr('src',st.getturl(item.photo,120));
		block.find('.moments_share_img').attr('url',item.photo).click(function(){
			me.fullscreen($(this));
		});
		block.find('#goodcount').text(st.int(item.goodcount)+(item.isgood?1:0));
		block.find('#commentcount').text(item.circlecomment.length);
		var answer=block.find('.moments_comment_content');
		var feelb=block.find('.moments_add_intimacy');
		var feel=item.circlecomment.length==0?undefined:item.circlecomment[item.circlecomment.length-1].feeling;
		me.commentbutton(block,feel);
		if(feel){feelb.find('font').text(feel);}else{feelb.hide()}
		block.find('#praise').click(function(){me.clickgood($(this))});
		st.switchshow(block.find('#dogood'),block.find('#notgood'),item.isgood);
		st.click(block.find('#divcomment'),function(){me.showselect($(this))});
		answer.find('p').remove();
		if(item.circlecomment.length==0){answer.hide();}		//无留言不显示留言框
		me.appendcomments(answer,item.circlecomment);
		block.find('.moments_share_time').text(st.getdatestr(item.addtime));
	},
	appendcomments:function(answer,cms){
		for(var o in cms)
		{
			var dr=cms[o];
			var tr=$('<p><b id="girl">'+main.girlname+'</b><font id="reply">回复</font><b id="user"></b>：&nbsp;<font id="msg"></font></p>');
			tr.find('#user').text(dr.username);
			if(!dr.reply) {tr.find('#girl,#reply').hide();}
			tr.find('#msg').text(dr.message);
			answer.append(tr);
		}
		if(cms.length>0){answer.show();}
	},
	showselect:function(line){					//显示对话选择列表
		var obj=line.find('#notcomment');
		if(!st.cansee(obj)){return;}
		var me=this;
		var cfid=st.pattr(obj,'cfid');
		var data={
			userid:userid,
			circleoffriendsid:cfid
		}
		var sellist=me.content.find('#sellist').empty();
 	    post(service+ 'getcirclefriendcomment?callback=?',data, function (json) {
			for(var o in json)
			{
				dr=json[o];
				var tr=$('<p></p>');
				tr.text(dr.message).attr(dr);
				st.click(tr,function(){
					var block=obj.parent().parent().parent().parent();
					me.doselect(block,$(this).attr('cfmessageid'),$(this).attr('message'),$(this).attr('feeling'));
					sellist.hide();
				});
				sellist.append(tr);
			}
			sellist.show();
		});
	},
	doselect:function(block,cfmessageid,msg,feel){		//点击对话选项
		var me=this;
		var data={
			userid:userid,
			cfmessageid:cfmessageid
		}
 	    post(service+ 'getgirlcirclefriendcomment?callback=?',data, function (json) {
			me.commentbutton(block,true);		
			var feelb=block.find('.moments_add_intimacy').show();
			feelb.find('font').text(feel);
			var comment= [{
				"username": json.username,
				"message":msg,
				"feeling": feel
			}]
			me.appendcomments(block.find('.moments_comment_content'),comment);
			block.find('#commentcount').text(st.int(block.find('#commentcount').text())+1);
		});
	},
	clickgood:function(line){			//点赞
		var obj=line.find('#notgood');
		if(!st.cansee(obj)){return;}		//判断是否点过赞
		var data={
			userid:userid,
			circleoffriendsid:st.pattr(obj,'cfid')
		}
 	    post(service+ 'clickgood?callback=?',data, function (json) {
			obj.hide();
			obj.next().show();
			var goodcount=obj.parent().find('#goodcount');
			goodcount.text(st.int(goodcount.text())+1);
		});
	},
	closecallback:null,
	show: function(closecallback){	//负责显示或构建html
		this.page=0;
		this.loadlock=false;
		this.pagecount=1;
		this.closecallback=closecallback;
		this.init();
	}
}
