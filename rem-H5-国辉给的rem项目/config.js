var home = "http://"+window.location.host+"/";                                      //网站根目录
var h5home="http://h5.mobo168.com/";                                //h5目录。用于切换域名时某些部分保留h5.
var pservice="http://123.59.59.90:81/service/openservice";                              //pythonservice
var shome='http://h8.duantian.cn/'
var service =home+"services/OpenData.ashx";             //数据接口的根路径
var services =home+"services/GameData.ashx";    
var powerurlhead='http://h8.mobo168.com/notion2.aspx?url='//分享授权地址头部
var ncservice=shome+"services/OpenData.ashx";
//保存cookie的url。用于微信找回。此地址为公用地址。所有站点公用一个。
var wxcookieurl="http:///h8.mobo168.com/services/OpenData.ashx";
var payhome=home+"gamepay/";                                //支付目录
var client = 0;                                                             //客户端类型0:web,1:android
var post = [
        function post(url, data, callback) {                                //web访问
            $.getJSON(url, data, callback);
        },
        function post(url, data, callback) {                                //android访问
            callback(json);
        }
    ][client];

var h8home = "http://h8.duantian.cn/";
var h8service = h8home + "services/OpenData.ashx";
var h8services =h8home+"services/GameData.ashx";