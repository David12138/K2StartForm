var service = axios.create({
    baseURL: '',
    timeout: 120000 
});

// request拦截器
service.interceptors.request.use(function(config) {
    //设置Cookies
    var cookie = getCookie('ASP.NET_SessionId');
    if(!cookie || cookie.length==0) {
        var cook = "quwn2peh1tdgmatwiklg20f4";
        var KStarManagement = "66D77CFBB274408791AFC57E81B465AD2EEA4C4D45FBD04354D5C7F31024A73D1FDF822F78F1A6B19CE949C6FC7122B2C71EB3C500C51C48E9CE11C8BA8763FADA5E88020A28FFD5397CBEC5B102B50D245BC3E8F9D91228FEE7E38F2509F3EC";
        setCookie('ASP.NET_SessionId', cook);
        setCookie('KStarManagement', KStarManagement);
    }
    config.headers['cache-control'] = 'no-cache'
    config.headers['Pragma'] = 'no-cache'
    return config
   }, function(error) {
    return Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
    function(response){
        if(response.data){
            if(response.headers['content-type']!=='application/vnd.ms-excel'){
                if(response.data.hasOwnProperty('responseCode') && response.data.responseCode!='100'){
                    // throw new Error(`${response.data.messageList[0].message}(日志ID：${response.data.logId})`);
                }
            };
            return response;
        }
    }, function (err) {
        if (err && err.response) {
            switch (err.response.status) {
            case 400: err.message = '请求错误(400)' ;
                    window.that.$message({
                        message: '请求错误(400)',
                        type: 'error'
                    });
            break;
            case 401:
                err.message = '未授权，请重新登录(401)';
                window.that.$message({
                    message: '未授权，请重新登录(401)',
                    type: 'error'
                });
                break;
            case 403: err.message = '拒绝访问(403)';
                    window.that.$message({
                        message: '拒绝访问(403)',
                        type: 'error'
                    });
            break;
            case 404: err.message = '请求出错(404)'; 
                    window.that.$message({
                        message: '请求出错(404)',
                        type: 'error'
                    });
            break;
            case 408: err.message = '请求超时(408)';
                    window.that.$message({
                        message: '请求超时(408)',
                        type: 'error'
                    });
            break;
            case 500: err.message = '服务器错误(500)';
                    window.that.$message({
                        message: '服务器错误(500)',
                        type: 'error'
                    });
            break;
            case 501: err.message = '服务未实现(501)';
                    window.that.$message({
                        message: '服务未实现(501)',
                        type: 'error'
                    });
            break;
            case 502: err.message = '网络错误(502)';
                    window.that.$message({
                        message: '网络错误(502)',
                        type: 'error'
                    });
            break;
            case 503: err.message = '服务不可用(503)';
                    window.that.$message({
                        message: '服务不可用(503)',
                        type: 'error'
                    });
            break;
            case 504: err.message = '网络超时(504)';
                    window.that.$message({
                        message: '网络超时(504)',
                        type: 'error'
                    });
            break;
            case 505: err.message = 'HTTP版本不受支持(505)';
                    window.that.$message({
                        message: 'HTTP版本不受支持(505)',
                        type: 'error'
                    });
            break;
            default: err.message = '连接出错!';
                    window.that.$message({
                        message: '连接出错!',
                        type: 'error'
                    });
            }
        }else{
            err.message = '连接服务器失败!'
            window.that.$message({
                message: '连接服务器失败!',
                type: 'error'
            });
        }
        return Promise.reject(err)
    },
    function(error) {
        console.log(error) // for debug
        // Toast('服务器异常, 请稍后重试')
        window.that.$message({
            message: '服务器异常, 请稍后重试',
            type: 'error'
        });
        return Promise.reject(error)
    }
);

//获取cookie、
function getCookie (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return (arr[2]);
    } else {
      return null;
    }
}
//设置cookie
function setCookie(name, cvalue) {
    document.cookie = name + "=" + cvalue + "; ";
}
