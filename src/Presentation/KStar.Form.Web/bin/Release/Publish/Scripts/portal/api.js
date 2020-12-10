// 代办列表
function GetWorkFlow(params) {
    return service({
        url: 'Portal/WorkFlow/GetWorklist',
        method: 'post',
        data: params
    })
}

// 获取用户信息
function GetCurrentUser(params) {
    return service({
        url: 'Home/GetCurrentUser',
        method: 'get',
        data: params
    })
}

// 退出
function GetSignOut(params) {
    return service({
        url: '/Account/SignOut',
        method: 'post',
        data: params
    })
}

// 我的收藏列表
function GetMyFavoriteWorkflow(params) {
    return service({
        url: 'Portal/WorkflowMap/GetMyFavoriteWorkflow',
        method: 'post',
        data: params
    })
}

// 获取流程地图
function GetWorkflowMapByCategoryId(params) {
    return service({
        url: 'Portal/WorkflowMap/GetWorkflowMapByCategoryId',
        method: 'post',
        data: params
    })
}

// 搜索流程地图
function QueryProcessMapByCode(params) {
    return service({
        url: 'Portal/WorkflowMap/QueryProcessMapByCode',
        method: 'get',
        data: params
    })
}

// 收藏流程
function AddWorkflowFavorite(params) {
    return service({
        url: 'Portal/WorkflowMap/AddWorkflowFavorite',
        method: 'post',
        data: params
    })
}

// 取消流程收藏
function DelWorkflowFavorite(params) {
    return service({
        url: 'Portal/WorkflowMap/DelWorkflowFavorite',
        method: 'post',
        data: params
    })
}

// 获取待审任务 业务流程
function GetWorklistBusinessProcess(params) {
    return service({
        url: 'Portal/WorkFlow/GetWorklistBusinessProcess',
        method: 'post',
        data: params
    })
}

// 获取待审任务  费用报销
function GetWorklistExpenseReimbursement(params) {
    return service({
        url: 'Portal/WorkFlow/GetWorklistExpenseReimbursement',
        method: 'post',
        data: params
    })
}

// 获取待审任务  合同结算
function GetWorklistContractSettlement(params) {
    return service({
        url: 'Portal/WorkFlow/GetWorklistContractSettlement',
        method: 'post',
        data: params
    })
}

// 获取待办 待阅 总数量
function GetKStarWorklistAllCount(params) {
    return service({
        url: 'Portal/WorkFlow/GetKStarWorklistAllCount',
        method: 'get',
        data: params
    })
}
// 获取待审任务数量
function GetKStarWorklistTaskCount(params) {
    return service({
        url: 'Portal/WorkFlow/GetKStarWorklistTaskCount',
        method: 'get',
        data: params
    })
}
// 获待阅 数量
function GetCCPendingReadTotalCount(params) {
    return service({
        url: 'Portal/WorkFlow/GetCCPendingReadTotalCount',
        method: 'get',
        data: params
    })
}

// 获取菜单
function GetKStarMenu(params) {
    return service({
        url: 'Portal/WorkFlow/GetKStarMenu',
        method: 'get',
        data: params
    })
}

// 已审任务
function GetMyInvolveds(params) {
    return service({
        url: 'Portal/WorkFlow/GetMyInvolveds',
        method: 'post',
        data: params
    })
}

// 我的申请
function GetMyApplications(params) {
    return service({
        url: 'Portal/WorkFlow/GetMyApplications',
        method: 'post',
        data: params
    })
}

// 抄送我的
function GetMyCCList(params) {
    return service({
        url: 'Portal/WorkFlow/GetMyCCList',
        method: 'post',
        data: params
    })
}

// 查询流程
function GetMyInvolvedsOrRights(params) {
    return service({
        url: 'Portal/WorkFlow/GetMyInvolvedsOrRights',
        method: 'post',
        data: params
    })
}

//获取高级搜索授权人  流程查询
function getDelegationUser(params) {
    return service({
        url: 'Portal/ProcessDelegation/GetDelegationUser',
        method: 'post',
        data: params
    })
}

// 我的草稿
function GetMyDrafts(params) {
    return service({
        url: 'Portal/WorkFlow/GetMyDrafts',
        method: 'post',
        data: params
    })
}

// 同意
function PortalApprove(params) {
    return service({
        url: 'Portal/WorkFlow/PortalApprove',
        method: 'post',
        data: params
    })
}

// 拒绝
function PortalRefused(params) {
    return service({
        url: 'Portal/WorkFlow/PortalRefused',
        method: 'post',
        data: params
    })
}

//切换身份
function SwitchLogin(params) {
    return service({
        url: '/Account/SwitchLogin',
        method: 'post',
        data: params
    })
}

// 沟通
function PortalCommunication(params) {
    return service({
        url: 'Portal/WorkFlow/PortalCommunication',
        method: 'post',
        data: params
    })
}

// 取消沟通
function PortalCancelCommunicate(params) {
    return service({
        url: 'Portal/WorkFlow/PortalCancelCommunicate',
        method: 'post',
        data: params
    })
}

// 转办
function PortalRedirect(params) {
    return service({
        url: 'Portal/WorkFlow/PortalRedirect',
        method: 'post',
        data: params
    })
}

// 退回节点数据
function GetPortalRejectData(params) {
    return service({
        url: 'Portal/WorkFlow/GetPortalRejectData',
        method: 'post',
        data: params
    })
}

// 退回
function PortalReject(params) {
    return service({
        url: 'Portal/WorkFlow/PortalReject',
        method: 'post',
        data: params
    })
}

// 沟通反馈
function PortalCommunicateFeedback(params) {
    return service({
        url: 'Portal/WorkFlow/PortalCommunicateFeedback',
        method: 'post',
        data: params
    })
}

// 批量 审批
function MutliApprove(params) {
    return service({
        url: 'Portal/WorkFlow/MutliApproveForBatch',
        method: 'post',
        data: params
    })
}

// 结束 流程
function MutliRefused(params) {
    return service({
        url: 'Portal/WorkFlow/MutliRefused',
        method: 'post',
        data: params
    })
}

// 催办
function sendEmai(params) {
    return service({
        url: '/Portal/WorkFlow/Remind',
        method: 'post',
        data: params
    })
}

// 删除草稿
function DeleteDraft(params) {
    return service({
        url: 'Portal/WorkFlow/DeleteDraft',
        method: 'post',
        data: params
    })
}

// 流程代理 -- 发起流程代理
function GetProcessDelegation(params) {
    return service({
        url: 'Portal/ProcessDelegation/GetProcessDelegation',
        method: 'post',
        data: params
    })
}

// 首页-常用流程
function GetCommonWorkflow(params) {
    return service({
        url: 'Portal/WorkflowMap/GetCommonWorkflow',
        method: 'post',
        data: params
    })
}


// 首页-当前用户信息
function GetUserInfo(params) {
    return service({
        url: 'Account/GetUserInfo',
        method: 'post',
        data: params
    })
}

// 首页-待阅信息
function GetTODOReadlist(params) {
    return service({
        url: 'Portal/WorkFlow/GetTODOReadlist',
        method: 'post',
        data: params
    })
}

// 流程代理
function GetProcessDelegation(params) {
    return service({
        url: 'Portal/ProcessDelegation/GetProcessDelegation',
        method: 'post',
        data: params
    })
}
// 流程代理状态切换
function SetDelegationStatus(params) {
    return service({
        url: 'Portal/ProcessDelegation/SetDelegationStatus',
        method: 'post',
        data: params
    })
}
// 流程代理弹框提交 -- 编辑
function UpdateProcessDelegation(params) {
    return service({
        url: 'Portal/ProcessDelegation/UpdateProcessDelegation',
        method: 'post',
        data: params
    })
}
// 流程代理弹框提交 -- 新增
function AddProcessDelegation(params) {
    return service({
        url: 'Portal/ProcessDelegation/AddProcessDelegation',
        method: 'post',
        data: params
    })
}
// 流程代理弹框表格数据 
function GetDelegationProcessList(params) {
    return service({
        url: 'Portal/ProcessDelegation/GetDelegationProcessList',
        method: 'post',
        data: params
    })
}
// 流程代理弹 根据流程分类获取流程
function GetProcessByCategoryId(params) {
    return service({
        url: 'Portal/ProcessDelegation/GetProcessByCategoryId',
        method: 'post',
        data: params
    })
}


// 批量查阅
function MutliDoRead(params) {
    return service({
        url: 'Portal/WorkFlow/MutliDoRead',
        method: 'post',
        data: params
    })
}
// 一键查阅
function AllDoRead(params) {
    return service({
        url: 'Portal/WorkFlow/AllDoRead',
        method: 'post',
        data: params
    })
}

// 获取皮肤
function GetSkinList(params) {
    return service({
        url: 'Home/GetSkinList',
        method: 'post',
        data: params
    })
}

// 切换子门户
function SwitchProtal(params) {
    return service({
        url: 'Home/SwitchProtal',
        method: 'post',
        data: params
    })
}

// 获取子门户
function GetProtalList(params) {
    return service({
        url: 'Home/GetProtalList',
        method: 'get',
        data: params
    })
}


// 获取菜单
function GetPortalMenu(params) {
    return service({
        url: 'Portal/WorkflowMap/GetPortalMenu',
        method: 'post',
        data: params
    })
}

// 流程授权
function GetMyProcessQueryAuthList(params) {
    return service({
        url: 'Portal/WorkFlow/GetMyProcessQueryAuthList',
        method: 'post',
        data: params
    })
}

// 流程地图新版--不带参数
function GetNewProcessMapByCategory(params) {
    return service({
        url: 'Portal/WorkflowMap/GetNewProcessMapByCategory',
        method: 'post',
        data: params
    })
}

// 流程地图新版--查询
function GetNewProcessMapByProcess(params) {
    return service({
        url: 'Portal/WorkflowMap/GetNewProcessMapByProcess',
        method: 'post',
        data: params
    })
}
//报表
function GetReportOrgTree(params) {
    return service({
        url: '/Portal/WorkflowMap/GetReportOrgTree',
        method: 'post',
        data: params
    })
}

//报表
function GetUserApproveReport(params) {
    return service({
        url: '/Portal/WorkflowMap/GetUserApproveReport',
        method: 'post',
        data: params
    })
}


//报表
function GetResultReason(params) {
    return service({
        url: '/Portal/WorkflowMap/GetResultReason',
        method: 'post',
        data: params
    })
}