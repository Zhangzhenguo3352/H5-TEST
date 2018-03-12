var home = "http://"+window.location.host+"/";                                      //网站根目录
var h5home="http://h5.mobo168.com/";                                //h5目录。用于切换域名时某些部分保留h5.
var pservice="http://123.59.59.90:81/service/openservice";                              //pythonservice
var shome='http://gf.omdatu.com:81'
var service =shome+"/service/";             //数据接口的根路径  
var client = 0;                                                             //客户端类型0:web,1:android
// userid="YVZTVlVzNmNTRVJzIzdkOWZERTFNVGMwTmpRMk5EazVOelk9";
userid = "V2tPUkTXamJSV2RWZVFTOWZERTFNVGMxTmprM09EWTFPVFU9";
var post = [
        function post(url, data, callback) {                                //web访问
            data['userid']=userid;
            $.getJSON(url, data, callback);
        },
        function post(url, data, callback) {                                //android访问
            callback(json);
        }
    ][client];
 //V2tPUkTXamJSV2RWZVFTOWZERTFNVGMxTmprM09EWTFPVFU9