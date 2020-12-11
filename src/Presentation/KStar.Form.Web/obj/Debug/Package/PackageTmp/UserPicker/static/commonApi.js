// 获取对应url里面的属性值
function getUrlParam (param, href){
  let reg = new RegExp("[?&]"+param + "=([^&]*)", "i"); // 匹配目标参数，i表示区分大小写
  href = href || window.location.href;
  let result = href.match(reg); // result为数组，分别为全词，匹配的第一项（按括号区隔的），匹配的第二项……
  if (result != null) {
    return decodeURIComponent(result[1]);
  } else {
    return null;
  }
};
constSystem = getUrlParam('Environment');
if(!constSystem){
  //后台环境调用
  module.exports = {
    baseUrl: {
      Base_User_URL: '/System/UserPick', //选人控件接口地址  http://10.10.0.236
      Base_Process_URL: '/workflow/ProcessPick', //流程接口管控
      Base_Delegation_URL: '/Portal/ProcessDelegation', //流程代理接口管控

    }
  };
}
else {
  //前台环境调用
  module.exports = {
    baseUrl: {
      Base_User_URL: '/Portal/UserPick', //选人控件接口地址  http://10.10.0.236
      Base_Process_URL: '/Portal/ProcessPick', //流程接口管控
      Base_Delegation_URL: '/Portal/ProcessDelegation', //流程代理接口管控
    }
  };
}

