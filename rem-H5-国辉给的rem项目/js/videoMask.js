//彩带视频遮套层
var VidoMask={
	init: function(){		//初始化
 		var me=this;
		this.content= $('#vido_mask').html(
			'<div class="task_gift_list_mask_speed vido_mask_ribbons">'+
				'<p>彩带视频</p>'+
				'<p>眼镜在为你下雨，心却在为你打伞</p>'+
				'<p>'+
					'<span>-80</span>'+
					'<span></span>'+
					'<span>+52</span>'+
				'</p>'+		
				'<p>'+
					'<span>取消</span>'+
					'<span>观看</span>'+
				'</p>'+
			'</div>'+	 	
			'<div class="vido_mask_general">'+
			 	'<ul>'+
	 		 		'<li>'+
						'<p>那就继续看吧！</p>'+
						'<p>'+
							'<span>-80</span>'+
							'<span></span>'+
							'<span>+52</span>'+
						'</p>'+
	 		 		'</li>'+
	 		 		'<li>'+
						'<h2>算了，还是赶紧出去吧！</h2>'+
	 		 		'</li>'+
	 		 	'</ul>'+ 	
	 		'</div>');
		me.bindEvent();
		me.bindData();
	},
	bindData: function(){		//绑定数据
 		 
	},
	bindEvent: function(){	//绑定事件
 
	},
	show: function(){	//负责显示或构建html


	}
}