//工具类，与业务逻辑无关。
var st = {
    hasevent: function (obj) {
        if (!obj || obj.size() < 1) { return false; }
        return !!$._data(obj[0], 'events');
    },
    inarray: function (array, data) {								/*判断某个元素是否存在集合中*/
        for (var o in array) { if (data == array[o]) { return true; } }
        return false;
    },
    dialogs: ['giftarea', 'numbergroup'],
    in: function (array, data) {								/*判断某个元素是否存在集合中*/
        for (var o in array) { if (data == array[o]) { return true; } }
        return false;
    },
    ina: function (array, data) {								/*判断某个元素是否存在集合中*/
        for (var o in array) { if (data == array[o]) { return true; } }
        return false;
    },
    getbasedata: function () {							/*获取用户在存储中的基本信息*/
        return st.getstore('user_basedata', {});
    },
    jsonlen: function (obj) {				//获取json一级节点的长度
        if (!obj) { return 0 }
        var i = 0;
        for (var o in obj) { i++ }
        return i;
    },
    isphone: function () {   //判断客户端是否是手机
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
    },
    todate: function (str) {				//将字符型的日期转换成日期，兼容ios格式
        return new Date(str.replace(/-/g, '/'));
    },
    trim: function (str) {
        str = $.trim(str);
        str = str.replace(/\s+/g, " ");
        str = str.replace(/\r\n/g, "");
        str = str.replace(/\n/g, "");
        str = str.replace(/\r/g, "");
        str = str.replace(/\t/g, "");
        str = str.replace(/　/g, "");
        return str;
    },
    findlist: function (array, data, col) {						/*在集合中查找符合条件的集合*/
        var l = []
        for (var o in array) { if (array[o] && data == array[o][col]) { l[l.length] = array[o]; } }
        return l;
    },
    copy: function (json) {                                                                            //复制json数据对象
        return JSON.parse(JSON.stringify(json));
    },
    objcansee: function (obj) {										//是否可见
        if (!obj) { return false }
        if (obj.size() != 1) { return false }
        var iszerosize = obj.width() == 0 || obj.height() == 0;
        return !(obj.css('display') == 'none' || obj.css('visibility') == 'hidden' || iszerosize);
    },
	getturl:function(url,size){		//获取缩略图url
		var s=st.firstmatch(url,/x(\d+).png/g);
		var reg=s?/x\d+\.png/g:/\.png/g;
		return url.replace(reg,'x'+size+'\.png');
	},
    cansee: function (obj) {
        if (!obj) { return false }
        var me = this;
        var flag = me.objcansee(obj);
        obj.parent().each(function () {
            if (!me.objcansee($(this))) { flag = false; }
        });
        return flag;
    },
    switchshow: function (obj1, obj2, showfirst) {	//根据判定条件，隐藏一部分显示一部分
        if (showfirst) { obj1.show(); obj2.hide(); } else { obj2.show(); obj1.hide(); }
    },
    ishaddialog: function () {//判断是否已有弹窗
        var l = $('div:visible');
        var me = this;
        for (var i = 0; i < l.size() ; i++) {
            if (st.in(me.dialogs, l.get(i).id)) {
                return 1;
            }
        } return 0;
    },
    savebasedata: function (json) {						/*将用户的基本信息保存到存储中*/
        st.setstore('user_basedata', json);
    },
    giftonline: function () {								/*判断是否能在线发放礼包*/
        var spids = [73, 21, 18];
        return st.ctypewx() || st.iswx() || st.inarray(spids, st.int(st.getspinfo().spid)) || st.versions.giftgiveonline;
    },
    ctypewx: function () {			//通过baseinfo的ctype来判断是否是微信。慎用!!!
        return st.getbasedata().ctype == 3;
    },
    safehref: function () {							/*对当前页面url进行编码*/
        return encodeURIComponent(window.location.href);
    },
    savecarrypara: function () {		/*在list,index两个入口保存携带参。该参组确保页面跳转不丢参*/
        var v = st.spmapping();
        var p = {
            spid: v[0],
            device: $.queryString('device'),
            appname: $.queryString('appname'),
            channelid: v[1]
        }
        st.setstore('usercarrypara', p);
    },
    getcarrypara: function () {
        return st.getstore('usercarrypara', {});
    },
    round: function (num) {
        return Math.round(num);
    },
    rint: function (num) {                                         /*获取指定int范围内的随机int数。范围0~n*/
        return Math.floor(Math.random() * num);
    },
    rstr: function (str, len) {		//随机产生字符串。备选字符字符串形式。如：123456789
        var rstr = [], chars = str.split('');
        for (var i = 0; i < len; i++) { rstr[rstr.length] = chars[this.rint(chars.length)] }
        return rstr.join('');
    },
    getfcode: function () {
        return st.rstr('abcdefghijklmnopqrstuvwxyz', 5)
    },
    arrayremove: function (list, i) {							/*删除指定位置的元素*/
        var rlist = [];
        for (var o in list) { if (o != i) { rlist[rlist.length] = list[o] } }
        return rlist;
    },
    arraylistremove: function (list, l) {		/*两数组集合相减。从集合1排除集合2的int或者string*/
        var rlist = [];
        for (var o in list) {
            if (!st.in(l, list[o])) { rlist[rlist.length] = list[o] }
        }
        return rlist;
    },
    jsonarrayremove: function (list, node, ids) {					/*删除指定位置，指定节点值在ids范围内的节点*/
        var rlist = [];
        for (var o in list) { if (!st.in(ids, list[o][node])) { rlist[rlist.length] = list[o] } }
        return rlist;
    },
    slist: function (array, key, val) {									/*查找集合中指定键值所对应的集合*/
        for (var o in array) { if (val == array[o][key]) { return array[o] } }
        return {};
    },
    today: function () {
        return st.format(new Date(), 'yyyyMMdd');
    },
    isempty: function (str) {										/*判断字符串对象是否为空*/
        return str == null || str == undefined || str == "";
    },
    visible: function (obj, isshow) {								/*控制jquery对象的显示和隐藏。不改变大小*/
        obj.css("visibility", isshow ? "visible" : "hidden");
    },
    formatdate: function (time, type) {
        return st.format(time, 'yyyy-MM-dd');
    },
    formatDates: function(time, type) {
       var d = new Date(time);
       var year = d.getFullYear();
       var month = d.getMonth()+1;
       var date = d.getDate();
       var hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
       var minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
       var second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
       if(type == 1) {
            return   year+"-"+month+"-"+date+' '+ hour+':'+minute+':'+second;
       } else if(type == 2) {
            return   year+"-"+month+"-"+date;
       } else if(type == 3) {
            if(Number(hour) > 12){
                return  "下午" + hour+':'+minute;
            } else {
                return  "上午" + hour+':'+minute;
            }
       } else if(type == 4) {
            return  minute+':'+second;
       }
       
    },
    format: function (time, format) {							/*格式化日期*/
        var t = new Date(typeof (time) == 'string' ? time.replace(/-/g, '/') : time);
        var tf = function (i, f) { return (i < 10 ? (f.length == 1 ? '' : '0') : '') + i };
        return format.replace(/yyyy|MM|M|dd|d|HH|H|mm|m|ss|s/g, function (a) {
            switch (a) {
                case 'yyyy':
                    return tf(t.getFullYear(), a);
                case 'MM':
                    return tf(t.getMonth() + 1, a);
                case 'M':
                    return tf(t.getMonth() + 1, a);
                case 'mm':
                    return tf(t.getMinutes(), a);
                case 'm':
                    return tf(t.getMinutes(), a);
                case 'dd':
                    return tf(t.getDate(), a);
                case 'd':
                    return tf(t.getDate(), a);
                case 'HH':
                    return tf(t.getHours(), a);
                case 'H':
                    return tf(t.getHours(), a);
                case 'ss':
                    return tf(t.getSeconds(), a);
                case 's':
                    return tf(t.getSeconds(), a);
            }
        })
    },
    iscrollInt: function(){ //iscroll 挂载
        console.log("挂载");
        this.myScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true, scrollbars: true });
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
            capture: false,
            passive: false
        } : false);
    },
    swiperInit: function(dom, type){ //swiper 挂载
        
        if(type) {
            console.log('type',dom);
            var mySwiper = new Swiper (dom, {
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                    },
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper 
                    observeParents:false,//修改swiper的父元素时，自动初始化swiper 
                    onSlideChangeEnd: function(swiper){ 
                    　　　swiper.update();  
                    　　　mySwiper.startAutoplay();
                    　　  mySwiper.reLoop();
                    },
            })

        } else if(type === 0) {
            var mySwiperMan = new Swiper (dom, {
                // 如果需要分页器
                slidesPerView: 'auto',
                loop: true,
                direction: 'horizontal',
                setWrapperSize: true,
            })
         
        }
    },
    formattime: function (time) {												//格式化成标准时间格式
        return this.format(time, 'yyyy-MM-dd HH:mm:ss');
    },
    week: function (strdate) {                                    //获取字符串格式的日期对应的周日期数
        return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date(strdate).getDay()];
    },
    filter: function (msg, yesarr, notarr) {                               //过滤器。对指定字符串msg进行yes过滤和not集合过滤。如果不符合条件返回空
        if (!msg || !msg.indexOf) { return '' }
        if (yesarr) {
            for (var o in yesarr) { if (msg.indexOf(yesarr[o]) > -1) { return msg } }
        }
        if (yesarr.length > 0) { return '' }
        var r = true;
        if (notarr) {
            for (var o in notarr) { if (msg.indexOf(notarr[o]) > -1) { r = false; break; } }
        }
        return r ? msg : ""
    },
    filterdo: function (msg, kvmethods) {                                //过滤并执行指定方法。kvmethons过滤名方法集合。当key匹配。执行对应方法。例：{'method1':function(){},'method2':function(){},'method3':function(){}}
        if (!msg || !msg.indexOf || !kvmethods) { return }
        for (var o in kvmethods) {
            var method = kvmethods[o];
            if (msg == o && method) { method() }
        }
    },
    join: function (list, key) {									//对列表的指定属性转换成","分隔的形式
        if (list == null || list.length == 0) { return "" }
        var str = "";
        for (var o in list) { str += list[o][key] + ',' }
        return str.substr(0, str.length - 1);
    },
    space: function (str, maxlen) {								/*对字符串进行前端空格补齐*/
        var space = ""; for (var i = 0; i < maxlen - str.length * 2; i++) { space += "&nbsp;&nbsp;" } return space + str;
    },
    spacer: function (number, maxlen) {							/*用空格填充数字后端空白。到指定长度*/
        var space = number + ""; for (var i = space.length; i < maxlen; i++) { space += "&nbsp;&nbsp;" } return space;
    },
    //判断一个对象是否是函数对象。
    isfunction: function (obj) {
        return typeof (obj) == "function";
    },
    inputnumber: function (input) {							/*设置input元素只能输入数字.input:input的jquery对象。如:$("#id")*/
        input.keyup(function () {
            this.value = this.value.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");//如果输入非数字，则替换为''，如果输入数字，则在每4位之后添加一个空格分隔
        });
    },
    number: function (input) {							/*设置input元素只能输入数字.input:input的jquery对象。如:$("#id")*/
        input.keyup(function () {
            this.value = this.value.replace(/[^\d]/g, '');//如果输入非数字，则替换为''，如果输入数字，则在每4位之后添加一个空格分隔
        });
    },
    bool: function (boolenstring) {							/*将字符形式的布尔值转换成布尔型*/
        if (boolenstring == null) { return false; }
        return boolenstring.toLowerCase() == "true";
    },
    suburl: function (url) {                                   /*将url分解为url和参数两部分*/
        var pars = url.split('?');
        return { 'url': pars[0], 'p': url.substr(pars[0].length) }
    },
    nullstr: function (str) {
        return str == null ? '' : str;
    },
    addlink: function (url) {
        if ($("[href='" + url + "']").length != 0) { return; }
        var hint = document.createElement("link")
        hint.setAttribute("rel", "prerender")
        hint.setAttribute("href", url)
        document.getElementsByTagName("head")[0].appendChild(hint)
    },
    preresources: function (json) {
        for (var o in json.figurelist) { this.addlink(json.figurelist[o].ImageUrl); }
        for (var o in json.scenelist) { this.addlink(json.scenelist[o].FgUrl); this.addlink(json.scenelist[o].BgUrl); }
    },
    temp: function (query, parent) {							/*通过query查询条件所获取其复制并显示。主要用于前端模板*/
        if (parent != null) { return parent.find(query).clone().show() }
        return $(query).clone().show();
    },
    reflashOpener: function () {								/*刷新父窗口*/
        if (window.opener == null) { return; }
        window.opener.location.href = window.opener.location.href;
    },
    undrag: function (objs) {							/*使指定对象屏蔽拖动*/
        for (var i in objs) { if (objs[i] == null) { continue }; objs[i].get(0).ontouchmove = function (e) { e.preventDefault() } }	//屏蔽滚动
    },
    tojson: function (str, def) {
        if (this.isempty(str)) { return def }
        return eval("(" + str + ")");
    },
    refalsh: function () {												/*重新刷新页面*/
        window.location.href = window.location.href;
    },
    cachedata: {},
    setcache: function (key, value) {									/*数据缓存方法,缓存数据*/
        this.cachedata[key] = value;
    },
    getcache: function (key) {
        return this.cachedata[key];
    },
    candrag: function (objs) {
        for (var i in objs) { objs[i].get(0).ontouchmove = null }	//取消屏蔽滚动
    },
    alert: function (json) {
        alert(JSON.stringify(json));
    },
    int: function (num) {												/*转换成数字*/
        return /^[1-9]+[0-9]*]*$/.test(num) ? num * 1 : 0;
    },
    last: function (list) {											/*获取集合中最后一条记录*/
        return list == null || list.length == 0 ? {} : list[list.length - 1];
    },
    isjsonempty: function (json) {
        return json == null || JSON.stringify(json) == "{}" || JSON.stringify(json) == "[]";
    },
    tounicode: function (str) {										/*unicode编码*/
        var res = []; str = str.replace('\n', '').replace('\r', '').replace('\t', '');
        for (var i = 0; i < str.length; i++) { res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4) };
        return res.length == 0 ? "" : "\\u" + res.join("\\u");
    },
    fromunicode: function (str) {										/*unicode解码*/
        if (st.isempty(str)) { return "" }
        return unescape(str.replace(/\\/g, "%"));
    },
    jsonencode: function (json) {		//对json的所有值进行 encodeURIComponent
        for (var o in json) { json[o] = encodeURIComponent(json[o]) }
        return json;
    },
    class: function (obj, name) {											/*移除类名,并设置新的类名*/
        return obj.removeClass().addClass(name);
    },
    setclass: function (obj, name) {											/*移除类名,并设置新的类名*/
        return obj.removeClass().addClass(name);
    },
    numberinput: function (input) {										/*限制input只能输入数字*/
        input.keyup(function () {
            if ($(this).val().length > 0 && !/^\d+$/g.test($(this).val())) {
                $(this).val($(this).attr('last'));
            }
            $(this).attr('last', $(this).val());
        });
        input.attr('last', input.val());
    },
    phoneinput: function (input, callback, error, formaterror) {														/*限制input只能输入手机*/
        var ninput = input.get(0); ninput.callback = callback; ninput.error = error; ninput.formaterror = formaterror;
        ninput.oninput = function () {
            if ((!this.valueAsNumber || this.value.length > 11) && this.value.length != 0) {
                var last = $(this).attr('last');
                if (last) { this.value = last; } else { this.value = ''; } return;
            }							//无效数据回滚
            $(this).attr('last', this.value);															//保留备份
            if (this.value.length < 11) { if (this.formaterror) { this.formaterror(); } return; }															//字符长度判断
            if (/^1\d{10}$/g.test(this.value)) { if (this.callback) { this.callback() } } else { if (this.error) { this.error() } }		//长度达到手机号长度。进行有效性判断。
        };
        input.attr('last', this.value);//设置默认值
    },
    codeinput: function (input) {														/*限制input只能输入验证码*/
        input.get(0).oninput = function () {
            if ((!(this.valueAsNumber + '') || this.value.length > 6) && this.value.length != 0) { this.value = $(this).attr('last'); return; }							//无效数据回滚
            $(this).attr('last', this.value);															//保留备份
        };
        input.attr('last', this.value);//设置默认值
    },
    pwdinput: function (input, error, ok) {
        var ninput = input.get(0); ninput.error = error; ninput.ok = ok;
        ninput.oninput = function () {
            if (escape(this.value).indexOf("%u") > 0 || / /g.test(this.value)) { if (this.error) { this.error() } return; }
            $(this).attr('last', this.value); if (this.ok) { this.ok() }
        };
        input.attr('last', this.value);//设置默认值
    },
    rgbinput: function (input, callback) {										/*限制input只能输入数字*/
        input.keyup(function () {
            if ($(this).val().length > 0 && !/^[\da-fA-F]+$/g.test($(this).val())) {
                $(this).val($(this).attr('last'));
            }
            $(this).attr('last', $(this).val());
            if (callback) { callback($(this).val()); }
        });
        input.attr('last', input.val())
        if (callback) { callback(input.val()); }
    },
    getstore: function (key, djson) {               //从本地存储中获取json对象。如果不存在用默认值替代       
        try {
            var storestr = localStorage.getItem(key);
            return st.tojson(storestr, djson ? djson : {});

        } catch (e) {

        }
    },
    setstore: function (key, json) {                //将json对象存储到本地存储中。
        try {
            localStorage.setItem(key, JSON.stringify(json));

        } catch (e) {

        }

    },
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            os5: /OS 5/i.test(u), //os5终端
            os10: /OS 10/i.test(u), //os10终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            androidx5: /TBS/.test(u),		//是否是android盒子x5
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            sdk91: window.location.href.toLowerCase().indexOf('ldsdk91=1') > -1, //是否91sdk
            liebao: u.indexOf('LieBaoFast') > -1,	//是否是猎豹浏览器
            b360: u.indexOf('360 Aphone') > -1,	//是否是360
            sogou: u.indexOf('SogouMobileBrowser') > -1,	//是否是搜狗
            uc: u.indexOf('ucbrowser') > -1,
            budejie: window.location.href.toLowerCase().indexOf('device=') > -1,	//是否是不得姐客户端
            yiliubaGameIos: window.location.href.toLowerCase().indexOf('device=ldios') > -1,//168小游戏IOS
            yiliubaGameAndroidSDK: u.match(/168gamesdk/),//168小游戏Android SDK
            bdjl: window.location.href.toLowerCase().indexOf('showshare=') > -1,				//不得姐长文
            giftgiveonline: u.indexOf('giftgiveonline') > -1,//游戏在线赠送标识
            bdjp: window.location.href.toLowerCase().indexOf('appname=') > -1,					//不得姐推广位
            old: window.location.href.toLowerCase().indexOf('old=') > -1,
            iossafari: !!u.match(/OS.*?Safari.*?\/\d{3}\.\d{1}/g),
            wxPc: u.indexOf('WindowsWechat') > -1,
            singleapp: navigator.userAgent.indexOf('games168') > -1
        };
    }(),
    isPC: function () {
        if (st.versions.ios || st.versions.android || st.versions.iPhone || st.versions.iPad) {
            return false;
        }
        return true;
    },
    yiliubaGameAndroidSDKVersion: function () {
        var version = 0;
        try {
            var u = navigator.userAgent;
            version = parseInt(u.substr(u.indexOf("168gamesdk") + 10));
        } catch (e) { console.log(e); }
        return version;
    },
    sdk91version: function () {			//获取91sdk版本号
        var u = navigator.userAgent;
        return st.firstmatch(u, /version(\d\.\d)/g);
    },
    clicksel: function (obj) {									//绑定点击全选
        st.click(obj, function () { $(this).select(); });
    },
    iossingle: function () {				//判断是否是IOS单款
        var spids = "147,145,143,136,131,129,128,127,126,124,123,122,120,119,115,113,107,106,105,104,103,102,101,100,99,98,97,96,94,93,92,91,90,89,88,87,86,85,84,83,82,81,74,72,71,70,69,68,67,66,65,64,63,61,60,51,49,46,45,41,37,36,35,34,33,26".split(',');
        return st.versions.ios && (!st.iswx()) && (st.versions.giftgiveonline || st.ina(spids, index.spid));
    },
    alipayv1: function () {               //判断是否老版IOS单款 支付宝支付问题
        return false;
        // var spids = "26,33,34,35,36,37,41,45,60,61,63,64,67,68,70,72,74,82,83,84,85,86,87,89,90,91,92,93,94,98,103,105,113".split(',');
        //return st.versions.ios && st.ina(spids, index.spid);
    },
    isiossinglenew: function () {
        return st.versions.ios && st.versions.singleapp;
    },
    androidsingle: function () {
        var spids = "19,28,29,30,31".split(',');
        return st.versions.android && (!st.iswx()) && (st.ina(spids, index.spid));
    }
    ,
    alipayusewebpage: function () {
        return navigator.userAgent.indexOf("alipayusewebpage") > 0;
    },
    budejie: function () {
        var url = window.location.href.toLowerCase();                           //真正的不的姐。排除h5客户端。
        return (this.versions.bdjp || this.versions.budejie) && (url.indexOf('device=android') < 0) && (url.indexOf('device=ldios') < 0);
    },
    budejieVersion: function () {
        var version = 0;
        try {
            var u = navigator.userAgent;
            //u = "Mozilla/5.0 (Linux; Android 5.0; SM-N9006 Build/LRX21V; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/47.0.2526.100 Mobile Safari/537.36 budejie/6.3.5 (SM-N9006) android/5.0";
            version = parseInt(u.substr(u.indexOf("budejie/") + 8, 5).replace(/\./g, ""));
        } catch (e) { console.log(e); }
        return version;
    },
    iswx: function () {																					//判断是否是否微信
        return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
    },
    iswx6_1: function () {
        return navigator.userAgent.toLowerCase().match(/MicroMessenger\/6.1/i) == "micromessenger/6.1";
    },
    iswx6_2: function () {
        return navigator.userAgent.toLowerCase().match(/MicroMessenger\/6.2/i) == "micromessenger/6.2";
    },
    isLDGame: function () {																					//判断是否是乐读APP
        if (/LDGame/i.test(navigator.userAgent) || /device=LDGame/i.test(document.URL)) {
            return true;
        }
        return false;
    },
 
    timespan: function () {                                                                                    //获取时间戳。以秒为单位
        return Date.parse(new Date()) / 1000;
    },
    timespanms: function () {
        return Date.parse(new Date()) / 1;
    },
    iosversion: function () {

        var u = navigator.userAgent;
        return u.match(/OS [0-6]_\d[_\d]* like Mac OS X/i);
    },
    addpara: function (url, json) {                               //对url进行加参数处理。前提参数值不能为url。必须编码
        if (st.isempty(url)) { return ''; }
        var part = {}
        part.afrag = url.split('#');               //以#为中心分解
        part.nfurl = part.afrag.length == 1 ? part.afrag[0] : part.afrag.slice(0, part.afrag.length - 1).join('');
        part.frag = part.afrag.length == 1 ? '' : part.afrag[part.afrag.length - 1];              //获得#参
        part.sp = url.split('?')                  //拆分参数
        part.page = part.sp[0]
        part.paramstr = part.sp.length == 1 ? '' : part.sp.slice(1).join('')            //?与#之间的参数。key=value&key1=value1

        var p = ''; for (var o in json) { p += o + '=' + json[o] + '&' }; p = p == '' ? p : p.substr(p.length - 1, 1)

        return p;
    },
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
    anim: {
        run: function (from, to, callback, endcall, speed) {
            this.start(from, to, speed, null, callback, endcall);
        },
        start: function (from, to, speed, span, callback, endcall) {
            var cfg = { from: from, to: to, span: span, speed: speed, callback: callback, endcall: endcall }
            cfg.sign = cfg.from > cfg.to ? -1 : 1;		//定义符号。是递增还是递进
            cfg.span = cfg.span ? cfg.span : 5;       //设置默认递进量
            cfg.speed = cfg.speed ? cfg.speed : 50;	//设定默认速度
            cfg.current = 0;
            this.loop(cfg);
        },
        loop: function (cfg) {
            var me = this;
            cfg.current += cfg.span * cfg.sign;
            if (cfg.sign > 0 ? cfg.current > cfg.to : cfg.current < cfg.to) { if (cfg.endcall) { cfg.endcall() }; return }
            if (cfg.callback) { cfg.callback(cfg.current) }
            window.setTimeout(function () { me.loop(cfg) }, cfg.speed);
        }
    },
    loop: {
        looptimeout: null,
        funcs: {},
        loop: function () {												//私有方法
            this.looptimeout = window.setTimeout(function name() { st.loop.loop() }, 100);
            var me = this;
            for (var o in this.funcs) { if (me.funcs[o]) { me.funcs[o]() } }
        },
        addloop: function (key, func) {										//添加指定方法到循环序列
            this.funcs[key] = func;
            if (!this.looptimeout) { st.loop.loop() }
        },
        removeloop: function (key) {										//取消循环
            this.funcs[key] = null;
        }
    },
    click: function (obj, callback) {
        obj.bind((st.versions.ios || st.versions.android) ? 'touchstart' : 'click', callback);
    },
    c: function (obj, callback) {
        obj.unbind().bind((st.versions.ios || st.versions.android) ? 'touchstart' : 'click', function () { if (audio) { audio.playbutton() }; callback() });
    },
    bytesize: function (num, unit) {						//获取指定单位所对应的byte大小
        var y = { 'k': 1, 'kb': 1, 'm': 2, 'mb': 2, 'g': 3, 'gb': 3, 't': 4, 'tb': 4 }[unit ? unit.toLowerCase() : ''];
        return num * Math.pow(1024, y ? y : 0);
    },
    inputmaxlen: function (obj) {
        var len = this.int(obj.attr('maxlength'));
        if (obj.size() < 1) { return; }
        obj.get(0).oninput = function () { if (this.value.length > len) { this.value = this.value.slice(0, len); return; } }
    },
    pattr: function (obj, name) {																//向上查找第一个匹配的属性。并返回
        var rval;
        obj.parents().each(function () {
            if (rval) { return; }
            if (typeof ($(this).attr(name)) != "undefined") { rval = $(this).attr(name) }
        });
        return rval;
    },
    strlen: function (str) {									/*获取字符串真实长度。汉字被算为两个字节*/
        return str.replace(/[^x00-xff]/g, "xx").length;
    },
    scrollbottom: function (obj) {
        if (!obj || obj.size() < 1) { return }
        obj.scrollTop(obj[0].scrollHeight);
    },
    htmlclear: function (str) {								/*清除掉html标记*/
        return str.replace(/<[^>].*?>/g, "");
    },
    fontclear: function (str) {								/*清除默认的font标记*/
        return str.replace(/<\/?font.*?>/g, "");
    },
    hashtml: function (str) {
        return /<[^>].*?>/g.test(str);
    },
    clearnbsp: function (str) {
        if (!str) { return str }
        return str.replace(/&nbsp;/g, ' ');
    },
    clearexthtml: function (str) {								//清除编辑框多余的html(font不清除)
        var temp = $('<p></p>'); temp.html(str);
        temp.children().each(function () {
            if (!$(this).is('font')) {
                $(this).replaceWith('<font>' + $(this).text() + '</font>');
            }
        });
        return temp.html();
    },
    cansee: function (obj) {										//是否可见
        if (!obj) { return false }
        return !(obj.css('display') == 'none' || obj.css('visibility') == 'hidden');
    },
    canseeparent: function (obj) {
        return this.cansee(obj.parent()) && this.cansee(obj.parent().parent());
    },
    setcookie: function (cname, cvalue, exdays) {  //设置cookie

        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/;";
    },
    getcookie: function (cname) { //获取cookie
        var name = cname + "=";

        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) {
                return cname == "ld" ? decodeURIComponent(c.substring(name.length, c.length)) : c.substring(name.length, c.length);
            }
        }
        return "";
    },
    clearcookie: function (name) {   //清除cookie  
        st.setcookie(name, "", -1);
    },
    q: function (name) {												//获取url中指定参 
        return this.qstr(window.location.search,name);
    },
    weblog: function (log) {               //用web进行日志输出。方便客户端调试
        st.get('http://h8.mobo168.com/open/js/cp/ZYFC.js?rnd=' + Math.random() + '&' + st.jsontopara(log));
    },
    gethand: function (hid, callback) {					//ajax获取手工内容。并进行回调。
        var post = {
            hid: hid,
            rnd: Math.random()
        }
        if (!callback) { return; }			//无效的回调不请求
        $.getJSON(services + '?action=hand', post, function (json) {
            callback(json);
        });
    },
    jsontopara: function (json) {                                          //将json键值对拼写成url参的形式
        var param = '';
        for (var o in json) {
            param += '&' + o + '=' + (st.in(['subject', 'description'], o) ? encodeURIComponent(json[o]) : json[o]);
        }
        return param.substr(1);
    },
    qstr: function (param, name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = param.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    get: function (url) {                                            //发送get请求
        var script = document.createElement("script");
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    },
    dectohex: function (str) {                                                    //Unicode编码转换 转 unicode
        var res = [];
        for (var i = 0; i < str.length; i++)
            res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
        return "\\u" + res.join("\\u");
    },
    storespinfo: function () {													//保存sp信息
        var json = st.getstore('currentspinfo'),
            v = st.spmapping(),
            spid = v[0]
        channelid = v[1];
        if (channelid > 0) {		//channelid有效。直接拿渠道ID覆盖
            json.channelid = channelid;
            json.spid = spid;
        } else {					//channelid无效时。如果spid改变。才会更改spid，并设为null
            if (json.spid != spid) {
                json.channelid = channelid;
                json.spid = spid;
            }
        }
        st.setstore('currentspinfo', json);
    },
    getspinfo: function () {													//读取sp信息
        return st.getstore('currentspinfo');
    },
    hextodec: function (str) {                                                    //Unicode编码转换 解 unicode
        str = str.replace(/\\/g, "%");
        return unescape(str);
    },
    firstmatch: function (str, reg) {                                        //获取第一个匹配项
        var m = reg.exec(str);
        if (m && m.length > 1) { return m[1] }
        return '';
    },
    isuser: function (clienttype) {                               //判断是否是用户。非游客
        return clienttype > 0;
    },
    countdown: {
        lseconds: 0,
        settime: function (seconds) {
            this.lseconds = seconds;
            return this;
        },
        start: function (callback, endcallback) {
            var me = this;
            if (this.lseconds < 0) { if (endcallback) { endcallback() }; return }
            window.setTimeout(function () { me.start(callback, endcallback) }, 1000)
            if (callback) { callback(this.lseconds) };
            this.lseconds--;
        }
    },
    resume: {
        callback: null,
        lasttime: 0,
        setcallback: function (callback) {
            this.callback = callback;
            this.lasttime = new Date().getTime();
            return this;
        },
        monitor: function () {
            var me = this;
            var timespan = new Date().getTime();
            if (timespan - this.lasttime > 300 && this.callback) { this.callback(); return; }
            window.setTimeout(function () { me.monitor() }, 100);
            this.lasttime = timespan;
        }
    },
    urlset: function (url, para, sharp) {      //设置用json覆盖掉url对应的参数。并返回新的url。para格式为：{p1:1,p2:2},sharp:12233
        var json = this.urltojson(url);
        for (var o in para) { json.para[o] = para[o] }
        if (sharp) { json.sharp = sharp }
        return this.jsontourl(json);
    },
    urltojson: function (url)         //将url转换成json格式。格式{page:'http://www.baidu.com',para:{p1:1,p2:2},sharp:12233}.para为参数集合.sharp为
    {
        var j = { para: {} }, temp = {}
        j.page = url.split('?')[0];
        temp.para = url.substr(j.page.length);
        temp.para = temp.para.length = 0 ? temp.para : temp.para.substr(1);
        j.sharp = this.firstmatch(url.split('?').length == 1 ? j.page : temp.para, /#([^\&]+)/g);
        j.page = j.page.split('#')[0];						//去掉#后面
        temp.para = temp.para.replace('#' + j.sharp, '');
        if (!st.isempty(temp.para)) { temp.paras = temp.para.split('&') };
        for (var o in temp.paras) {
            if (!temp.paras[0]) { continue }
            var p = temp.paras[o].split('=');
            j.para[p[0]] = p.length > 1 ? p[1] : '';
        }
        return j;
    },
	getdatestr:function(timespan){			//获取字符串形式的日期
        var ftime = "";
		if(!timespan){return ""}
        //判断是否是同一天
		var time=new Date(timespan);
		var now=new Date();
        var days = Math.floor((now.getTime()-time.getTime())/86400000);
        if (days == 0) {
            var hour =Math.floor((now.getTime()-time.getTime())/3600000);
            if (hour == 0){
				var minutes=(now.getMinutes()-time.getMinutes());
                ftime=minutes==0?'刚刚':minutes+ "分钟前";
			} else {ftime = hour + "小时前";}
            return ftime;
        } else if (days == 1) {
            ftime = "昨天";
        } else if (days == 2) {
            ftime = "前天";
        } else if (days > 2 && days <= 30) {
            ftime = days + "天前";
        } else if (days > 30 && days <= 60) {
            ftime = "1个月前";
        } else if (days > 60 && days <= 90) {
            ftime = "2个月前";
        } else if (days > 90 && days <= 120) {
            ftime = "3个月前";
        } else if (days > 120 && days <= 150) {
            ftime = "4个月前";
        } else if (days > 150 && days <= 180) {
            ftime = "5个月前";
        } else if (days > 180 && days <= 210) {
            ftime = "6个月前";
        } else if (days > 210 && days <= 240) {
            ftime = "7个月前";
        } else if (days > 240 && days <= 270) {
            ftime = "8个月前";
        } else if (days > 270 && days <= 300) {
            ftime = "9个月前";
        } else if (days > 300 && days <= 330) {
            ftime = "10个月前";
        } else if (days > 330 && days <= 360) {
            ftime = "11个月前";
        } else if (days > 360 && days <= 720) {
            ftime = "一年前";
        } else if (days > 720 && days <= 1080) {
            ftime = "两年前";
        } else if (days > 1080) {
            ftime = st.format(time,'yyyy年MM月dd日');
        }
        return ftime;
	},
    jsontourl: function (json) {       //将标准格式的url转换成para
        var p = '';
        for (var o in json.para) { if (json.para[o] != null) { p += '&' + o + '=' + json.para[o] } }
        return json.page + (p.length == 0 ? '' : '?' + p.substr(1)) + (json.sharp ? '#' + json.sharp : '');
    },
    getTagPar: function () {//获取地址栏有用的参数集合
        var par = "",
            v = st.spmapping();
        if (v[0]) {
            par += "&spid=" + v[0];
        }
        if ($.queryString('device')) {
            par += "&device=" + $.queryString('device');
        }
        if ($.queryString('ver')) {
            par += "&ver=" + $.queryString('ver');
        }
        if (par != "") {
            par = par.substr(1);
        }
        return par;
    },
    spmapping: function () {
        var spid = st.int($.queryString('spid')),
            cid = st.int($.queryString('channelid')),
            v = [spid, cid];
        if (cid === 0) {
            $.each(spmapping, function (i) {
                var item = spmapping[i];
                if (item.spid == spid) {
                    v = [st.int(item.spidval), st.int(item.spcidval)];
                    return false;
                }
            });
        } else {
            $.each(spmapping, function (i) {
                var item = spmapping[i];
                if (item.spid == spid && item.spcid == cid) {
                    v = [st.int(item.spidval), st.int(item.spcidval)];
                    return false;
                }
            });
        }
        return v;
    },
    getdatediff: function (startTime, endTime, diffType) {
        //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
        startTime = startTime.replace(/\-/g, "/");
        endTime = endTime.replace(/\-/g, "/");

        //将计算间隔类性字符转换为小写
        diffType = diffType.toLowerCase();
        var sTime = new Date(startTime);      //开始时间
        var eTime = new Date(endTime);  //结束时间
        //作为除数的数字
        var divNum = 1;
        switch (diffType) {
            case "second":
                divNum = 1000;
                break;
            case "minute":
                divNum = 1000 * 60;
                break;
            case "hour":
                divNum = 1000 * 3600;
                break;
            case "day":
                divNum = 1000 * 3600 * 24;
                break;
            default:
                break;
        }
        return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
    },
    // setTimeout: function(time){ //倒计时
    //     var minutes = parseInt(time/60%60, 10); //计算剩余的分钟
    //     var seconds = parseInt(time%60, 10); //计算剩余的秒数
    //     var 
    //     setTimeout(function(){

    //     },time*1000)
    // },
    addday: function (needadd, day) {
        var dayTime = day * 24 * 60 * 60 * 1000; //参数天数的时间戳
        var need = new Date(needadd.replace(/\-/g, "/"));
        var newdate = new Date(need.getTime() + dayTime); //把两个时间戳转换成普通时间
        return newdate;
    },
    isopenvcinsp: function () {
        var sps = [22, 137, 118, 135, 191, 144, 197],
            nowspid = st.getspinfo().spid;
        return st.inarray(sps, nowspid);
    },
    textWidth: function (text) {
        var sensor = $('<pre>' + text + '</pre>').css({ display: 'none' });
        $('body').append(sensor);
        var width = sensor.width();
        sensor.remove();
        return width;
    },
    wxapplogin: function () {
        var appflag = navigator.userAgent.match(/(ledu168\/(\d+))/);
        if ($.isEmptyObject(appflag))
        {
            return false;
        }
        var versioncode = parseInt(appflag[2]);
        if (st.versions.ios && versioncode >= 200) {
            return true;
        } 
        if (st.versions.android && versioncode >= 2850) {
              return true;            
        }
        return false;
    },
    isofflinegame: function (gameid)
    {
        var gameids = [100019, 100015,100038,100037,100035,100034,100030,100028,100025,100024,100023,100022,100019,100018,100017,100016,100015,100012,100011,100010];
        return st.inarray(gameids, gameid);
    },
    istestgameid: function ()
    {
        var gameids = [100013];
        return st.inarray(gameids, index.gameid);
    }
    ,
    istestgameidv2: function () {
        var gameids = [100194];
        return st.inarray(gameids, index.gameid);
    },
	icontovideo:function(fileName){
		var strFileName = fileName.substring(0,fileName.lastIndexOf(".")); 
		return strFileName + ".mp4";	
	}
}
//点击统计类
var state = {
    click: function (category, label, clabel) {
        try {
            _czc.push(["_trackEvent", category, clabel]);
        } catch (e) { }
    },
    statisticalurl: 'http://123.59.59.90:81/service/countservice',
    h5clicked: false,
    h5share: function (gameid) {                                        //用作点击或者分享成功统计
        if (index.spid == 5) { st.get(state.statisticalurl + '?method=bdjshare&t=o&rnd=' + Math.random() + '&gameid=' + index.gameid); }
        if (gameid == 0) { return; }
        st.get(state.statisticalurl + '?method=ldshare&rnd=' + Math.random() + '&gameid=' + gameid);
    },
    h5click: function (gameid) {                                             //统计展现次数
        if (gameid == 0) { return }
        if (this.h5clicked) { return }
        window.setTimeout(function () {
            st.get(state.statisticalurl + '?method=ldclick&rnd=' + Math.random() + '&gameid=' + gameid);
            //不得姐统计。用openid。
            if (index.spid == 5) { st.get(state.statisticalurl + '?method=bdjclick&t=o&rnd=' + Math.random() + '&gameid=' + index.gameid); }
        }, 5000);
        this.h5clicked = true;
    }
}
var collection = {                            //收藏                                                                                  
    gameid: 0,
    tag: '',
    showtop: ['ilb', 'iwx', 'awx', 'iosbox'],
    bar: null,
    mask: null,
    init: function (gameid) {
        var me = this;
        this.gameid = gameid, this.tag = this.gettag();
        if (this.gameid == 0 || st.isempty(this.tag)) { return; }             //浏览器不在提示范围内不做提示
        me.initlayout(this.tag);
        window.setTimeout(function () { me.showcollection(5) }, 5 * 60000);//5
        window.setTimeout(function () { me.showcollection(15) }, 15 * 60000);//15
    },
    initlayout: function (tag) {
        me = this;
        var css = ".ld_collection_style{height: 84px; z-index: 1000001; width: 100%; position: absolute; bottom: 0px;}\
                 .ld_collection_style div{background-color: white; margin: 10px 20px; height: 60px; line-height: 60px; color: #e94c3d; border: 1px solid #dfdfdf; border-radius: 3px;}\
                 .ld_collection_style span{display: inline-block; background-image: url(image/collection/"+ tag + ".png); width: 30px; height: 32px; background-size: 100% 100%; background-repeat: no-repeat; vertical-align: middle; margin-left: 4px; margin-right: 4px; margin-bottom: 10px;}\
                 .ld_collection_style .down{background-image: url(image/collection/arrdown.png); background-size: 15px 12px; background-repeat: no-repeat; width: 100%; height: 12px; background-position-x: 51%; margin-top: -11px; margin-left: -6px;}\
                 .ld_collection_style .up{background-image: url(image/collection/arrup.png); background-size: 15px 12px; background-repeat: no-repeat; width: 100%; height: 12px; background-position-x: 51%; margin-left: -6px;}\
                ";
        $('body').append('<style>' + css + '</style>');
        var isshare =(st.versions.yiliubaGameIos || st.versions.yiliubaGameAndroidSDK) && !st.iswx();	//游戏盒子的收藏作为分享引导。微信下忽视盒子
        var tstr = isshare?'分享这个游戏给朋友' : '收藏这个游戏，方便下次玩';
        me.bar = $('<div class="ld_collection_style" style="display:none"><div id="collbar">点此<span></span>' + tstr + '</div><span id="colarrow" class="down"></span></div>');
        me.mask = $('<div style=" z-index: 1000000; width: 100%; height: 100%;position: absolute;top:0px;display:none;"></div>');
        st.undrag([me.mask]);
        $('body').append(me.mask).append(me.bar);
        me.bar.click(function () { collection.mask.hide(); collection.bar.hide() });
        me.mask.click(function () { collection.mask.hide(); collection.bar.hide() });
        if (st.in(me.showtop, tag)) {
            me.bar.css('top', '0px').find('#collbar').css({ 'margin-top': '-11px', 'margin-left': '10px', 'margin-right': '10px' }).appendTo(me.bar);
            st.class(me.bar.find('#colarrow'), 'up');
        }
        me.bar.find('#colarrow').css('background-position-x', me.getpositon(tag));
    },
    getpositon: function (tag) {                                                                   //根据tag获取对应的百分比位置
        if (st.in(['ilb'], tag)) { return '5%' };                                                    //最左边
        if (st.in(['abd', 'alb'], tag)) { return '72%' };                                             //右中间
        if (st.in(['axm'], tag)) { return '81%' };                                                   //最右略偏左
        if (st.in(['asg', 'asx'], tag)) { return '93%' };                                             //最右边
        if (st.in(['isg'], tag)) { return '89%' };                                                   //最右边
        if (st.in(['iwx', 'awx'], tag)) { return '95.5%' };			                                //最右边
        if (st.in(['iosbox'], tag)) { return '96.5%' };							                    //最右边
        return '51%';                                                                           //默认中间
    },
    gettag: function () {                                          //获取当前浏览器所对应的tag
        if (st.iswx()) { return st.versions.ios ? 'iwx' : 'awx' }       //判断微信及系统
        if (st.versions.yiliubaGameIos) { return 'iosbox' }			//ios盒子的提示
        if (st.versions.android && st.versions.androidx5) { return '' }			//ios盒子的提示
        var creg = {
            'abd': /Linux.*?baidubrowser/g,                          //android 百度
            'ahw': /Linux.*?Huawei/g,                                //android 华为默认
            'alb': /Linux.*?LieBaoFast/g,                            //android 猎豹
            'aqq': /Linux.*?QQ/g,                                    //android QQ
            'asg': /Linux.*?SogouMobileBrowser/g,                    //android 搜狗
            'asx': /Linux.*?SamsungBrowser/g,                        //android 三星默认
            'auc': /Linux.*?UCBrowser/g,                             //android UC
            'axm': /Linux.*?XiaoMi/g,                                //android 小米默认
            'ilb': /OS.*?Safari.*?\/\d{4,5}\.\d{2}$/g,               //ios 猎豹
            'iqq': /OS.*?QQ/g,                                       //ios QQ
            'isf': /OS.*?Safari.*?\/\d{3}\.\d{1}/g,                  //ios safari
            'isg': /OS.*?SogouMobileBrowser/g,                       //ios 搜狗
            'iuc': /OS.*?UCBrowser/g
        }                                //ios UC
        for (var o in creg) { if (creg[o].test(navigator.userAgent)) { return o } }
        return ''
    },
    showcollection: function (minute) {              //显示收藏
        if (this.canshow(minute)) {
            this.mask.show();
            this.bar.show();
        }
    },
    canshow: function (minute) {
        var data = st.tojson(localStorage.getItem('ldcollect_' + this.gameid), {});
        var cshow = !data['m' + minute];
        data['m' + minute] = 1;
        localStorage.setItem('ldcollect_' + this.gameid, JSON.stringify(data));
        return cshow;
    }
}
var channeldebug = {                                              //远程调试工具
    msgurl: 'http://123.59.59.90:81/service/logservice',
    output: function (msg, cdid) {
        $.getJSON(this.msgurl + '?callback=?', { method: 'log', channel: cdid, msg: msg }, function (json) { });
    }
}

var popup = {
    html: '<div id="popupmask" style="display:none"><div id="popupcontent"><h5><span class="title"></span><span class="close"></span></h5><div style="" class="content"></div></div></div>',
    show: function (title, content, closecallback) {
        $('body').append(popup.html);
        var mask = $("#popupmask");
        mask.css({ 'height': $(window).height() + $(document).scrollTop() });
        mask.find('span.close').click(function () { mask.hide(); $('body').css({ "overflow": "" }); mask.remove(); if (closecallback) { closecallback() } });
        var divcontent = mask.find('#popupcontent');
        divcontent.find("span.title").html(title);
        divcontent.find("div.content").html(content);
        mask.show();
        popup.setpositioncenter(divcontent)
        $('body').css({ "overflow": "hidden" });
        return divcontent;
    },
    setpositioncenter: function (obj) {
        if (!obj) {
            obj = $('#popupcontent');
        }
        obj.css({ 'top': ($(window).height() - obj.outerHeight()) / 2 + $(document).scrollTop(), 'left': ($(window).width() - obj.outerWidth()) / 2 });
    },
    setpositiontop: function (topnum) {
        $('#popupcontent').css({ "top": topnum + "px" });
    },
    remove: function () {
        $("#popupmask").remove();
    }
}
var comment = {
    islogined: function () {//领取之前先判断用户是否登录
        return st.isuser(st.getstore('user_basedata').ctype);
    },
    commentgive: function (vc) {//判断用户是否领取成功
        var me = this;
        var post = {
            ld: st.getcookie("ld"),
            count: vc
        }
        $.getJSON('http://h8.duantian.cn/services/OpenData.ashx' + '?method=commentgive', post, function (json) {
            me.giveresult(json.result);
        })
    },
    giveresult: function (type) {
        window.location.href = st.urlset("giveresult://give?type=" + type)
    },
    commentloginandgive: function () {
        window.location.href = st.urlset("http://h5.duantian.cn/user.aspx?logintype=comment")
    }
}
var loadonlinedebug = {				//加载在线调试代码
    init: function () {
        var online = location.search.match(new RegExp("[\?\&]onlinedebug=([^\&]+)", "i"));
        if (!online) { return; }
        if (online.length < 2 || online[1] != 1) { return; }
        var script = document.createElement("script");
        script.src = 'http://openadmin.mobo168.com:81/js/interactiveclient.js?r=' + Math.random();
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}
loadonlinedebug.init();
