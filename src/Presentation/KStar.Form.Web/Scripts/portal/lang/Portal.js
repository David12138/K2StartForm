
//Portal 多语言文件
//创建人：陈潜
//创建日期：2019-11-21

var PortalLang = {
    'zh-CN': {
        Portal: {
            //首页 处理流程
            //同意
            HomeProcessDealDialogUserSelect: "请选择人员",
            HomeProcessDealAgreeName: "同意", 
            HomeProcessDealAgreeApprovalOpinion: "同意意见", 
            HomeProcessDealAgreeTitle: "你确定同意该流程",
            //退回
            HomeProcessDealRejectName: "退回",
            HomeProcessDealRejectTitle: "退回流程",
            HomeProcessDealRejectReturnTo: "退回到",
            HomeProcessDealRejectReturnToMode: "退回后再提交/审批时",
            HomeProcessDealRejectRerouteAllNode: "重走所有节点",
            HomeProcessDealRejectDirectGoCurrentNode: "直接回到当前节点",
            HomeProcessDealRejectOpinionComments: "退回意见",
            //转办
            HomeProcessDealRedirectName: "转办",
            HomeProcessDealRedirectUser: "转办人",
            HomeProcessDealRedirectComments: "转办意见",
            //沟通
            HomeProcessDealCommunicationName: "沟通",
            HomeProcessDealCommunicationUser: "沟通人",
            HomeProcessDealCommunicationComments: "沟通意见",
            //沟通
            HomeProcessDealCancelCommunicationName: "取消沟通",//取消意见
            HomeProcessDealCancelCommunicationComments: "取消意见",
            //沟通反馈
            HomeProcessDealCommunicateFeedbackName: "意见反馈",
            HomeProcessDealCommunicateFeedbackComments: "反馈内容",

            HomeProcessDealApprovalOpinionHint: "请输入意见",
            HomeProcessDealApprovalOpinionHintStart: "意见至少",
            HomeProcessDealApprovalOpinionHintEnd: "个字符",

            HomeProcessDealAgreeSuccess: "审批通过",
            HomeProcessDealAgreeWarn: "审批不通过",
            HomeProcessDealRejectSuccess: "退回成功",
            HomeProcessDealRejectWarn: "退回失败",
            HomeProcessDealRedirectSuccess: "转办成功",
            HomeProcessDealRedirectWarn: "转办失败",
            HomeProcessDealRedirectError: "请选择转办人",
            HomeProcessDealCancelCommunicationSuccess: "取消沟通成功",
            HomeProcessDealCancelCommunicationWarn: "取消沟通失败",
            HomeProcessDealCommunicationSuccess: "沟通成功",
            HomeProcessDealCommunicationWarn: "沟通失败",
            HomeProcessDealCommunicationError: "请选择沟通人",
            HomeProcessDealCommunicateFeedbackSuccess: "沟通反馈成功",
            HomeProcessDealCommunicateFeedbackWarn: "沟通反馈失败",
            


            //首页左侧菜单
            HomeLeftMenuIndex: "首页",
            HomeLeftMenuStartProcess: "发起流程",
            HomeLeftMenuBusinessProcessTask: "我的待办",
            HomeLeftMenuInvolvedTasks: "我的已办",
            HomeLeftMenuApplicationTasks: "我的申请",
            HomeLeftMenuMyCCTasks: "我的传阅",
            HomeLeftMenuDraft: "我的草稿",
            HomeLeftMenuQueryProcess: "流程查询",
            HomeLeftMenuProcessAgent: "流程授权",
            HomeLeftMenuMyWaiting: '我的待阅', // 2019-12-19
            HomeLeftMenuMyRead: '我的已阅', // 2019-12-19

            //首页流程代理 _ProcessAgent
            HomeProcessAgentSearchProcessName: "流程名称",
            HomeProcessAgentSearchtoUser: "代理人",
            HomeProcessAgentReceiverUser: "接收人",
            HomeProcessAgentCCUser: "传阅人",
            HomeProcessAgentSearchAgentStartDate: "开始日期",
            HomeProcessAgentSearchAgentEndDate: "结束日期",
            HomeProcessAgentSearchAgentStatus: "状态",


            HomeProcessAgentApplicationAuthorityAgent: "申请权限授权",
            HomeProcessAgentApprovalAuthorityAgent: "审批权限授权",
            HomeProcessAgentDoneViewAuthorityAgent: "已办查看授权",
            HomeProcessAgentApprovalCirculateAuthorityAgent: "审批后传阅设置",

            HomeProcessAgentNew: "新增",
            HomeProcessAgentSearchPlcaceholderText: "请输入代理人",
            HomeProcessAgentListNote: "备注",
            HomeProcessAgentListOperation: "操作",
            HomeProcessAgentListFromUser: "授权人",
            HomeProcessAgentListEffectivePeriod: "生效时间段",
            HomeProcessAgentAddProcessName: "流程名称",
            HomeProcessAgentAddProcessCaty: "流程分类",
            HomeProcessAgentAddIsEnable: "是否生效",
            HomeProcessAgentAddApprovalMode: "审批模式",
            HomeProcessAgentAddProcessTransfer: "转办",
            HomeProcessAgentAddProcessAuto: "自动审批",
            HomeProcessAgentAddProcessDel: "删除",
            HomeProcessAgentAddProcessSelectProcess: "选择流程",
            HomeProcessAgentAddPlaceholderStartDate: "开始日期",
            HomeProcessAgentAddPlaceholderEndDate: "结束日期",
            HomeProcessAgentAddPlaceholderSeparator: "至",
            HomeProcessAgentAddTitleNew: "新增",
            HomeProcessAgentAddTitleView: "查看",
            HomeProcessAgentAddTitleEdit: "编辑",
            HomeProcessAgentAddTitleSuccess: "设置成功!",
            HomeProcessAgentAddTitleError: "操作失败!错误信息:",
            HomeProcessAgentAddChecktoUser: "代理人不能为空！",
            HomeProcessAgentAddCheckEffectiveStart: "生效开始时间不能为空！",
            HomeProcessAgentAddCheckEffectiveEnd: "生效结束时间不能为空！",
            HomeProcessAgentAddCheckApprovalMode: "请选择审批模式！",
            HomeProcessAgentAddCheckProcessSelect: "请选择流程！",
            HomeProcessAgentAddCheckFromToUser: "授权人与代理人不能相同！",
            HomeProcessAgentAddCheckSpecialUser: "特殊账号不能使用！",
            HomeProcessAgentAddCheckEffectiveStartEnd: "生效开始时间大于生效结束时间！",



            //首页搜索
            HomeSearchBtn: "高级搜索",
            HomeSearchReset: "重置",
            HomeSearchConfirm: "确定",
            HomeSearchChoose: "请选择",
            HomeSearchPlaceholderStart: "开始日期",
            HomeSearchPlaceholderEnd: "结束日期",
            
            HomeSearchProcessNum: "编号",
            HomeSearchFormSubject: "标题",
            HomeSearchOriginator: "申请人",
            HomeSearchWrittenBy: "填写人",
            HomeSearchApplicationDate: "申请日期",
            HomeSearchProcessName: "流程名称",
            HomeSearchID: "申请人部门",
            HomeSearchProcessingTime: "处理时间",
            HomeSearchProcessStatus: "流程状态",
            HomeSearchEndDate: "结束日期",
            HomeSearchSummary: "流程摘要",
            HomeSearchDelegationUser: "授权人",
            HomeSearchJSUserSelect: "选人控件",
            HomeSearchJSApplicantSelect: "请选择申请人",
            HomeSearchJSDeptSelect: "请选择申请部门",
            HomeSearchJSProcessSelect: "请选择流程",
            HomeSearchJSSubmitterSelect: "请选择填写人",
            HomeSearchJSCCFromSelect: "请选择抄送人",
            HomeSearchJSFromUserSelect: "请选择代理人员",

            //高级搜索选项卡
            HomeSearchIApply: "本人申请",
            HomeSearchApplyForMe: "代我申请",
            HomeSearchApplyForOthers: "代别人申请",

            //首页流程列表
            HomeProcessCode: "流程编号",
            HomeProcessName: "流程名称",
            HomeProcessTitle: "流程主题",
            HomeProcessWrittenBy: "填写人",
            HomeProcessApplicant: "申请人",
            HomeProcessNodeName: "节点名称",
            HomeProcessApplicationDate: "申请时间",
            HomeProcessTaskArrivalTime: "任务到达时间",
            HomeProcessSaveTime: "保存时间",
            HomeProcessFlowChart: "流程图",
            HomeProcessApprovalTime: "处理时间",
            HomeProcessEndTime: "流程结束时间",
            HomeProcessStatus: "流程状态",
            HomeProcessCurrentProcessor: "当前处理人",
            HomeProcessReviewDate: "阅读时间",
            HomeProcessReviewStatus: "审阅状态",
            HomeProcessCCFrom: "传阅人",
            HomeProcessCCTime: "传阅时间",
            HomeProcessCCArrivalTime: "传阅到达时间",
            HomeProcessWaitingTime: '等待时长', // 2019-12-25

            
            //单位
            Hour: "小时",
            Minute: "分钟",

            //流程状态
            ProError: "流程异常",           //流程异常
            ProInOperation: "运行中",       //运行中
            ProApprovalComplete: "审批通过",//审批通过
            ProCancel: "作废",              //作废
            ProDelete: "删除",              //删除
            ProFinalAdoption: "终审通过",   //终审通过
            ProRefuse: "拒绝",              //拒绝
            ProAbnormalEnd: "异常结束",     //异常结束


            //首页
            HomePage: "首页",
            MyFavorites: "我的收藏",
            MyFavoritesDel: "取消收藏",
            MyFavoritesDelSuccess:"取消收藏成功",
            MyFrequentlyUsed: "常用流程",
            MyToDoItems: "待办",
            MyToReadItems: "待阅",
            HomeUrgent: "紧急",
            HomeMore: "更多",
            HomeLoadMore: "加载更多",
            HomeListCode: "编号：",
            HomeListApplicant: "申请人：",
            HomeListCurrentNode: "当前环节：",
            HomeListStartTime: "开始时间：",
            HomeListFeedback: "反馈意见：",
            HomeListApplicantDept: "部门：",
            HomeListApplicantTel: "座机：",
            HomeListApplicantMobile: "手机：",
            HomeListApplicantEMail: "邮箱：",
            Export: "导出",
            ExportErrorTips: "数量量超过了5000，不允许导出！",

            //发起流程
            StartProcessSearch: "搜索",
            StartProcessSearchShort: "搜索",
            StartProcessPlaceholderCategory: "请输入流程类型",
            StartProcessPlaceholderProcess: "请输入流程名称或流程编码",
            StartProcessShowAllProcess: "显示全部流程",
            StartProcessIconAuth: "权",
            StartProcessIconExternalSystem: "外",
            StartProcessUnFavoritesSuccess: "取消收藏成功",
            StartProcessUnFavoritesFailed: "取消收藏失败",
            StartProcessFavoritesAddSuccess: "收藏成功",
            StartProcessFavoritesAddFailed: "收藏失败",
            StartProcessOperationException: "数据获取失败!错误信息:",
            
            //待审任务BusinessProcessTask
            BusinessProcessTaskSearch: "搜索",
            BusinessProcessTaskBatchApproval:"批量审批",
            BusinessProcessTaskBatchApprovalOpinion:"审批意见：",
            BusinessProcessTaskBatchApprovalApprover:"办理人：",
            BusinessProcessTaskBatchApprovalTime:"办理时间：",
            BusinessProcessConfirm:"确 定",
            BusinessProcessCancel:"取 消",
            BusinessProcessTaskBatchApprovalSuccess:"审批成功！",
            BusinessProcessTaskBatchApprovalError:"审批失败!错误信息:",


            //已审任务_BusinessProcessTask

            //我的申请_ApplicationTasks
            ApplicationTaskUrge: "催办",
            ApplicationTaskUrgeTitle: "邮件催办流程",
            ApplicationTaskUrgeMethod: "催办方式",
            ApplicationTaskUrgeEmail: "邮件",
            ApplicationTaskUrgeSysMsg: "待阅", 
            ApplicationTaskUrgeSuccess: "催办成功!",
            ApplicationTaskUrgeError: "催办错误!错误信息:",
            ApplyForMe:"申请类型",


            //我的传阅 _MyCCTasks
            MyCCTaskskMarkAsRead: "批量查阅",
            MyCCTasksMarkAllAsRead: "一键查阅",
            MyCCTasksMarkAsReadMsgStart: "您确定",
            MyCCTasksMarkAsReadMsgEnd: "吗？",
            MyCCTasksMarkAsReadSuccess: "查阅成功!",
            MyCCTasksMarkAsReadError: "查阅失败!错误信息:",


            //流程草稿_Draft
            HomeDraftKeyword: "请输入流程名称或标题",
            HomeDraftDelete: "删除草稿",
            HomeDraftDeleteDivTitle: "申请删除草稿",
            HomeDraftDeleteDivContent: "您确认需要删除所选草稿吗？",
            HomeDraftDeleteSuccess: "删除成功!",
            HomeDraftDeleteError: "删除失败!错误信息:",


            //顶部模块
            OperationManual: "操作手册",
            Logout: "注销",
            Chinese: "中文",
            English: "ENG",
            HomeHeaderChangeLogUser: "切换身份",
            HomeHeaderChangeLogUserDivTitle: "提示",
            HomeHeaderChangeLogUserDivLable: "切换用户名",

            //查询输入框字段
            PleaseEnterContent: "请输入流程编码或标题",


            //标准通用类型
            Confirm: "确定",
            Cancel: "取消",
            FormCC: "传阅",
            Status: "状态",
            Type: "类型",
            Time: "时间",
            PhChoice: "请选择",
            Opinion: "意见",
            ApprovalOpinion: "审批意见",
            Agree: "同意",
            Refused: "拒绝",
            Application: "申请人",
            AttachmentName: "附件名称",
            SystemPrompt: "系统提示",
            Operation: "操作",
            More: "更多",
            FormRequiredRrompt: "表单校验未通过，请检查之后再重试！",//表单必填未通过提示
            Return: '返回', // 2019-11-07
            All: "所有",//所有
            Effective: "有效",//有效
            Invalid: "失效",//失效
        }
    },
    'en-US': {
        Portal: {
            //首页 处理流程
            //同意
            HomeProcessDealDialogUserSelect: "User Select",
            HomeProcessDealAgreeName: "Agree",
            HomeProcessDealAgreeApprovalOpinion: "Approval Opinion",
            HomeProcessDealAgreeTitle: "Agree Approval",
            //退回
            HomeProcessDealRejectName: "Reject",
            HomeProcessDealRejectTitle: "Reject",
            HomeProcessDealRejectReturnTo: "Return To",
            HomeProcessDealRejectReturnToMode: "After return",
            HomeProcessDealRejectRerouteAllNode: "Reroute all nodes",
            HomeProcessDealRejectDirectGoCurrentNode: "Go directly to the current node",
            HomeProcessDealRejectOpinionComments: "Reject opinion comments",
            //转办
            HomeProcessDealRedirectName: "Redirect",
            HomeProcessDealRedirectUser: "Redirect User",
            HomeProcessDealRedirectComments: "Redirect comments",
            //沟通
            HomeProcessDealCommunicationName: "Communicate",
            HomeProcessDealCommunicationUser: "Communicate User",
            HomeProcessDealCommunicationComments: "Communicate comments",
            HomeProcessDealCancelCommunicationName: "CancelCommunicate",
            HomeProcessDealCancelCommunicationComments: "Cancel comments",
            //沟通反馈
            HomeProcessDealCommunicateFeedbackName: "CommunicateFeedback",
            HomeProcessDealCommunicateFeedbackComments: "Feedback Comments",

            HomeProcessDealApprovalOpinionHint: "Please enter approval comments",
            HomeProcessDealApprovalOpinionHintStart: "Approval comments shall be input at least",
            HomeProcessDealApprovalOpinionHintEnd: "characters",

            HomeProcessDealAgreeSuccess: "Approval success",
            HomeProcessDealAgreeWarn: "Approval failed",
            HomeProcessDealRejectSuccess: "Reject success",
            HomeProcessDealRejectWarn: "Reject failed",
            HomeProcessDealRedirectSuccess: "Redirect success",
            HomeProcessDealRedirectWarn: "Redirect failed",
            HomeProcessDealRedirectError: "Redirect user required",
            HomeProcessDealCancelCommunicationSuccess: "CancelCommunication success",
            HomeProcessDealCancelCommunicationWarn: "CancelCommunication failed",
            HomeProcessDealCommunicationSuccess: "Communication success",
            HomeProcessDealCommunicationWarn: "Communication failed",
            HomeProcessDealCommunicationError: "Communication user required",
            HomeProcessDealCommunicateFeedbackSuccess: "Communicate Feedback success",
            HomeProcessDealCommunicateFeedbackWarn: "Communicate Feedback failed",

            //首页左侧菜单
            HomeLeftMenuIndex: "Home",
            HomeLeftMenuStartProcess: "Start Process",
            HomeLeftMenuBusinessProcessTask: "My Pending Tasks",
            HomeLeftMenuInvolvedTasks: "My Done Tasks",
            HomeLeftMenuApplicationTasks: "My Request Tasks",
            HomeLeftMenuMyCCTasks: "My Form Read",
            HomeLeftMenuDraft: "My Drafts",
            HomeLeftMenuQueryProcess: "Query",
            HomeLeftMenuProcessAgent: "Authorization",
            HomeLeftMenuMyWaiting: 'Carboncopy Tasks', // 2019-12-19
            HomeLeftMenuMyRead: 'Carboncopy Read', // 2019-12-19我的已阅

            //首页流程代理 _ProcessAgent
            HomeProcessAgentSearchProcessName: "Process Name",
            HomeProcessAgentSearchtoUser: "Agent",
            HomeProcessAgentReceiverUser: "Receiver",//接收人
            HomeProcessAgentCCUser: "CC User",
            HomeProcessAgentSearchAgentStartDate: "Start Date",
            HomeProcessAgentSearchAgentEndDate: "End Date",
            HomeProcessAgentSearchAgentStatus: "Status",


            HomeProcessAgentApplicationAuthorityAgent: "Application Authority",
            HomeProcessAgentApprovalAuthorityAgent: "Approval Authority",
            HomeProcessAgentDoneViewAuthorityAgent: "View of done-process Authority",
            HomeProcessAgentApprovalCirculateAuthorityAgent: "Review settings after approval",
            HomeProcessAgentNew: "New",
            HomeProcessAgentSearchPlcaceholderText: "Please enter agent to search",
            HomeProcessAgentListNote: "Note",
            HomeProcessAgentListOperation: "Operation",
            HomeProcessAgentListFromUser: "Authorized by",
            HomeProcessAgentListEffectivePeriod: "Effective",
            HomeProcessAgentAddProcessName: "Process Name",
            HomeProcessAgentAddProcessCaty: "Category",
            HomeProcessAgentAddIsEnable: "Status",
            HomeProcessAgentAddApprovalMode: "Mode",
            HomeProcessAgentAddProcessAuto: "Process AutoApprove",
            HomeProcessAgentAddProcessDel: "Delete",
            HomeProcessAgentAddProcessSelectProcess: "Process select",
            HomeProcessAgentAddPlaceholderStartDate: "Start Date",
            HomeProcessAgentAddPlaceholderEndDate: "End Date",
            HomeProcessAgentAddPlaceholderSeparator: "to",
            HomeProcessAgentAddTitleNew: "New",
            HomeProcessAgentAddTitleView: "View",
            HomeProcessAgentAddTitleEdit: "Edit",
            HomeProcessAgentAddTitleSuccess: "Operation success!",
            HomeProcessAgentAddTitleError: "Operation error!Error message:",
            HomeProcessAgentAddChecktoUser: "Agent required！",
            HomeProcessAgentAddCheckEffectiveStart: "Effective start date required！",
            HomeProcessAgentAddCheckEffectiveEnd: "Effective end date required！",
            HomeProcessAgentAddCheckApprovalMode: "Please select approval Mode！",
            HomeProcessAgentAddCheckProcessSelect: "Please select process！",
            HomeProcessAgentAddCheckFromToUser: "Not allowed to be your own agent！",
            HomeProcessAgentAddCheckSpecialUser: "Special account cannot be used！",
            HomeProcessAgentAddCheckEffectiveStartEnd: "Effective start date should be less than end date！",


            //首页搜索
            HomeSearchBtn: "Advanced search",
            HomeSearchReset: "Reset",
            HomeSearchConfirm: "Confirm",
            HomeSearchChoose: "Please select",
            HomeSearchPlaceholderStart: "Start Date",
            HomeSearchPlaceholderEnd: "End Date",
            
            HomeSearchProcessNum: "BillNo",
            HomeSearchFormSubject: "Title",
            HomeSearchOriginator: "Applicant",
            HomeSearchWrittenBy: "Submitter",
            HomeSearchApplicationDate: "APP Time",
            HomeSearchProcessName: "Name",
            HomeSearchID: "App Dept",
            HomeSearchProcessingTime: "APV Time",
            HomeSearchProcessStatus: "Status",
            HomeSearchEndDate: "End Time",
            HomeSearchSummary: "Summary",
            HomeSearchDelegationUser: "Authorized by",
            HomeSearchJSUserSelect: "User Select Control",
            HomeSearchJSApplicantSelect: "Applicant Select",
            HomeSearchJSDeptSelect: "Dept Select",
            HomeSearchJSProcessSelect: "Process Select",
            HomeSearchJSSubmitterSelect: "Submitter Select",
            HomeSearchJSCCFromSelect: "FormCCUser Select",
            HomeSearchJSFromUserSelect: "Agent",

            //高级搜索选项卡
            HomeSearchIApply: "I Apply",
            HomeSearchApplyForMe: "Apply for me",
            HomeSearchApplyForOthers: "Apply for others",

            //首页流程列表
            HomeProcessCode: "BillNo",
            HomeProcessName: "Name",
            HomeProcessTitle: "Title",
            HomeProcessWrittenBy: "Submitter",
            HomeProcessApplicant: "Applicant",
            HomeProcessNodeName: "Node",
            HomeProcessApplicationDate: "APP Time",
            HomeProcessTaskArrivalTime: "Arrival Time",
            HomeProcessSaveTime: "Save Time",
            HomeProcessFlowChart: "Chart",
            HomeProcessApprovalTime: "APV Time",
            HomeProcessEndTime: "End Time",
            HomeProcessStatus: "Status",
            HomeProcessCurrentProcessor: "Curr Processor",
            HomeProcessReviewDate: "Read Time",
            HomeProcessReviewStatus: "Read Stat",
            HomeProcessCCFrom: "CC From",
            HomeProcessCCTime: "CC Time",
            HomeProcessCCArrivalTime: "CC Arrival Time",
            HomeProcessWaitingTime: 'Waiting time', // 2019-12-25等待时长

            //单位
            Hour: "Hour",
            Minute: "Minute",

            //流程状态
            ProError: "Error",                   //流程异常
            ProInOperation: "InOperation",       //运行中
            ProApprovalComplete: "ApprovalComplete",//审批通过
            ProCancel: "Cancel",                //作废
            ProDelete: "Delete",                //删除 
            ProFinalAdoption: "FinalAdoption",  //终审通过
            ProRefuse: "Refuse",                //拒绝
            ProAbnormalEnd: "AbnormalEnd",      //异常结束

            //首页
            HomePage: "Home",
            MyFavorites: "Favorites",
            MyFavoritesDel: "unfavorite",
            MyFavoritesDelSuccess: "unfavorite success",
            MyFrequentlyUsed: "Frequently-used",
            MyToDoItems: "To Do",
            MyToReadItems: "To Read",
            HomeUrgent: "Urgent",
            HomeMore: "More",
            HomeLoadMore: "Load More",
            HomeListCode: "BillNo:",
            HomeListApplicant: "Applicant:",
            HomeListCurrentNode: "Current Node:",
            HomeListStartTime: "Start:",
            HomeListFeedback: "Feedback:",
            HomeListApplicantDept: "Dept:",
            HomeListApplicantTel: "Tel:",
            HomeListApplicantMobile: "Mobile:",
            HomeListApplicantEMail: "Email:",
            Export: "Export",
            ExportErrorTips: " data exceeds 5000, cannot be exported!",

            //发起流程
            StartProcessSearch: "Search",
            StartProcessSearchShort: "SEC",
            StartProcessPlaceholderCategory: "Pls enter the category to search",
            StartProcessPlaceholderProcess: "Please enter the process name or billNo to search",
            StartProcessShowAllProcess: "Show All",
            StartProcessIconAuth: "R",
            StartProcessIconExternalSystem: "E",
            StartProcessUnFavoritesSuccess: "Operation success",
            StartProcessUnFavoritesFailed: "Operation failed",
            StartProcessFavoritesAddSuccess: "Operation success",
            StartProcessFavoritesAddFailed: "Operation failed",
            StartProcessOperationException: "Operation failed!Error Msg:",

            //待审任务BusinessProcessTask
            BusinessProcessTaskSearch: "Search",
            BusinessProcessTaskBatchApproval:"Batch Approval",
            BusinessProcessTaskBatchApprovalOpinion:"Opinion:",
            BusinessProcessTaskBatchApprovalApprover:"Approver:",
            BusinessProcessTaskBatchApprovalTime:"Date:",
            BusinessProcessConfirm:"Confirm",
            BusinessProcessCancel:"Cancel",
            BusinessProcessTaskBatchApprovalSuccess:"Successful approval!",
            BusinessProcessTaskBatchApprovalError: "Approval error!Error Msg:",

            //已审任务

            //我的申请
            ApplicationTaskUrge: "Remind",
            ApplicationTaskUrgeTitle: "Remind Approver",
            ApplicationTaskUrgeMethod: "Ways",
            ApplicationTaskUrgeEmail: "Email",
            ApplicationTaskUrgeSysMsg: "System Message", 
            ApplicationTaskUrgeSuccess: "Remind success!",
            ApplicationTaskUrgeError: "Remind error!Error Msg:",
            ApplyForMe: "Apply Type",

            //我的传阅 _MyCCTasks
            MyCCTaskskMarkAsRead: "Consult",
            MyCCTasksMarkAllAsRead: "Consult all",
            MyCCTasksMarkAsReadMsgStart: "Are you sure to ",
            MyCCTasksMarkAsReadMsgEnd: "?",
            MyCCTasksMarkAsReadSuccess: "Operation success!",
            MyCCTasksMarkAsReadError: "Operation error!Error message:",

            //流程草稿_Draft
            HomeDraftKeyword: "Please enter process name or title",
            HomeDraftDelete: "Delete Selected",
            HomeDraftDeleteDivTitle: "Process Draft Delete",
            HomeDraftDeleteDivContent: "Are you sure to delete?",
            HomeDraftDeleteSuccess: "Delete success!",
            HomeDraftDeleteError: "Delete Error!Error message:",

            
            //顶部模块
            OperationManual: "Operation Manual",
            Logout: "Log out",
            Chinese: "CN",
            English: "ENG",
            HomeHeaderChangeLogUser: "Switch",
            HomeHeaderChangeLogUserDivTitle: "Tips",
            HomeHeaderChangeLogUserDivLable: "Switch User",

            //查询输入框字段
            PleaseEnterContent: "Please enter process billNo or title", //请输入流程编码或标题

            //标准通用类型
            Confirm: "Confirm",
            Cancel: "Cancel",
            FormCC: "Form CC",
            Status: "Status",
            Type: "Type",
            Time: "Time",
            PhChoice: "Choice",
            Opinion: "Opinion",
            ApprovalOpinion: "Approval Opinion",
            Agree: "Agree",
            Refused: "Refused",
            Application: "Application",
            AttachmentName: "Attachment Name",
            SystemPrompt: "System Prompt",
            Operation: "Operation",
            More: "More",
            FormRequiredRrompt: "The form check is not passed, please check again and try again!",//表单必填未通过提示
            Return: 'Return', // 返回 2019-11-07
            All: "All",           //所有
            Effective: "Effective",//有效
            Invalid: "Invalid",//失效
            
        }
    }
}
