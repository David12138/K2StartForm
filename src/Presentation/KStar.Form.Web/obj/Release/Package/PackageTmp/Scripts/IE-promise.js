//如果是IE浏览器，就添加es6-promise引用
function loadJS() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = "/Scripts/es6-promise/es6-promise.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
        var script2 = document.createElement('script');
        script2.type = 'text/javascript';
        script2.src = "/Scripts/es6-promise/es6-promise.auto.min.js"
        document.getElementsByTagName('head')[0].appendChild(script2);
    }
}
/*
 * @Description: 同步ajax请求，表单使用
 * @Author: fenglin
 * @Date: 2020-04-17 14:07:21
 * @参数表
 * 参数	       默认值	描述	可选值
 * url	       ""	    请求的链接	string
 * type	       get	    请求的方法	get,post
 * data	       null 	请求的数据	object,string
 * contentType	""	    请求头	string
 * dataType	   ""	    请求的类型	jsonp
 * async	   true	    是否异步	 blooean
 * timeOut	   undefined	超时时间	number
 * before	   function(){}	发送之前执行的函数	function
 * error	   function(){}	请求报错执行的函数	function
 * success	   function(){}	请求成功的回调函数	function
 */
function ajaxSync(url, type, data, success, error) {
    ajax({
        type: type,
        url: url,
        async: false,
        data: data,
        timeOut: 5000,
        success: function (response) {
            (success && typeof (success) == "function") && success(response);
        },
        error: function (response) {
            (error && typeof (error) == "function") && error(response);
        }
    });
}
loadJS();