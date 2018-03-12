var dialog = {
    alertdialog: null,								//警告对话框
    editdialog: null,								//编辑对话框
    editdialogmore: null,							//更多对话框
    toastobj: null,
    init: function () {
        if ($("#dialog").size() == 0) { alert('请添加id为dialog的对话框模版'); }
        if ($("#dialogtoast").size() == 0) { alert('请添加id为dialogtoast的toast模版'); }
        this.alertdialog = $("#dialog").clone();
        this.editdialog = $("#dialog").clone();
        this.editdialogmore = $("#dialog").clone();
        this.toastobj = $("#dialogtoast");
    },
    toast: function (msg) {
        this.toastline(this.editdialog.find('#dialogtoast'),msg);
    },
    bodytoast:function(msg){
        this.toastline($('#bodytoast'), msg);
    },
	toastline:function(toast,msg){											//toast方式显示对象
        toast.html(msg).fadeIn("slow"); window.setTimeout(function () { toast.fadeOut("slow") }, 3000);
	},
    alert: function (message, okcallback, data, hidecancel) {								/*弹出提示框(基类)*/
        if (hidecancel) { this.alertdialog.find("#btncancel").hide() } else { this.alertdialog.find("#btncancel").show() }
        this.alertdialog.find(".modal-title").text("提示");
        this.alertdialog.find(".modal-body").text(message);
        this.alertdialog.find("#btnyes").unbind().click(function () { if (st.isfunction(okcallback)) { okcallback($(this).data()) } }).data(data);
        this.alertdialog.modal();
    },
	close:function(){
		this.editdialog.find('#btncancel').click();
	},
	ok:function(){
		this.editdialog.find('#btnyes').click();
	},
	moreclose:function(){
		this.editdialogmore.find('#btncancel').click();
	},
	moreok:function(){
		this.editdialogmore.find('#btnyes').click();
	},
    a:function(message){
        dialog.alert(message,function(){},{},true);
    },
    show: function (title, obj, okcallback, data, beforesubmit, hidecancel,hideok) {									/*弹出操作对话框(基类)*/
        this.showbase(title, obj, okcallback, data, beforesubmit, hidecancel, this.editdialog,null,hideok);
    },
    showcancel: function (title, obj, okcallback, data, cancelcallback) {        /*弹出框,含取消回调*/
        this.showbase(title, obj, okcallback, data, '', false, this.editdialog, cancelcallback,false);
    },
    showmore: function (title, obj, okcallback, data, beforesubmit, hidecancel) {									/*弹出操作对话框(基类).在对话框之上弹出的*/
        this.showbase(title, obj, okcallback, data, beforesubmit, hidecancel, this.editdialogmore);
    },
    showbase: function (title, obj, okcallback, data, beforesubmit, hidecancel, editdialog, cancelcallback, hideok) {/*弹出操作对话框(基类)*/
        editdialog.find('#btnyes,#btncancel').show();
        if (hidecancel) { editdialog.find("#btncancel").hide() } else { editdialog.find("#btncancel").show() }
        //if(hidecancel&&hideok){ editdialog.find("#btncancel").parent().hide()}
        editdialog.find(".modal-title").text(title);
        editdialog.find(".modal-body").empty().append(obj);
        editdialog.find("#btnyes").unbind().bind("click", function () {
                if (st.isfunction(beforesubmit)) { if (beforesubmit($(this).data()) == false) { return false } }
                if (st.isfunction(okcallback)) { okcallback($(this).data()) }
            }
        ).data(data);
        if(hideok){editdialog.find("#btnyes").hide()}
        editdialog.find("#btncancel,#btnclose").unbind().bind("click", function () {
            if (st.isfunction(cancelcallback)) { cancelcallback(); }
        });
        editdialog.modal();
    }
}

