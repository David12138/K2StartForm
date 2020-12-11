
//表单页面多语言文件
//创建人：陈潜
//创建日期：2019-10-16
//基本信息模块、表单信息模块、备注模块、传阅模块、审批人信息模块、流程记录(审批、传阅、订阅)模块、流程处理模块

var KStarFormLang = {
    cn: {
        KStarForm: {
            //标准通用类型
            Confirm: "确定",
            Cancel: "作废",
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

            //单位
            Hour: "小时",
            Minute: "分钟",

            //流程状态
            FormInstanceStatus0: "流程异常", 
            FormInstanceStatus1: "草稿",   
            FormInstanceStatus2: "运行中",
            FormInstanceStatus3: "审批通过", 
            FormInstanceStatus31: "作废",  
            FormInstanceStatus32: "删除", 
            FormInstanceStatus33: "终审通过", 
            FormInstanceStatus34: "拒绝", 
            FormInstanceStatus35: "异常结束", 

            //选人控件模块
            SelectUser: "请选择人员",
            SelectFormCCUser: "请选择传阅人员", //请选择传阅人员
            SelectApprovalUser: "请选择审批人", //请选择审批人

            //弹框
            DialogCancel: "取 消",
            DialogConfirm: "确 定",
            DialogConfirmRefused: "确定拒绝？",
            WhetherConfirmSubmit: "是否确认提交",
            ConfirmSubmit: "确认提交",

            //表单头部模块
            ProcessRoute: "流程路径：",
            Chinese: "中文",
            English: "ENG",

            //按钮模块
            ProcessSeer: "流程走向",
            ViewFlow: "流程图",
            Print: "打印",  
            Close: "关闭",
            Save: "暂存",
            SaveDraft: "草稿",
            //"取消",
            Submit: "提交",
            Redirect: "转办",
            ReSubmit: "重新提交",
            Subscribe: "订阅",
            CancelSubscribe: "取消订阅",
            Communication: "沟通",
            CommunicateFeedback: "沟通反馈",
            CancelCommunication: "取消沟通",
            Withdrawn: "撤回",
            Returned: "驳回",
            Reject: "驳回",
            //按钮弹出框
            ProcessDescription: "流程说明",
            RelevantSystem: "相关制度",
            RelatedDocuments: "相关文档",
            CCOpinion: "传阅意见",
            //传阅按钮
            CirculateUser: "传阅人",
            CirculateOpinions: "传阅意见",


            //基本信息模块
            BaseInfo: "基本信息",
            ApplicantPosition: "申请人岗位",
            ApplicantDepartment: "申请人部门",
            ApplyDate: "申请日期",
            Submitter: "填单人",
            ProcessBillNo: "流程单号",
            Urgency: "紧急程度",
            RejectReason: "请求驳回原因",
            Normal: "一般",
            Medium: "急",
            Urgent: "紧急",

            //表单信息模块
            FormInfo: "表单信息",
            FormSubject: "流程标题",
            PleaseEnterContent: "请输入内容",
            PleaseEnterProcessTitle: "请输入流程标题",

            //附件模块
            Attachment: "附件",
            UploadAttachments: "上传附件",
            FileSize: "文件大小",
            UploadNode: "上传节点",
            UploadUser: "上传人",
            UploadTime: "上传时间",
            Download: "下载",
            Preview: "预览",
            Delete: "删除",
            Reduction: "还原",
            AttachmentMaxTips: "文件大小不能超过",
            AttachmentFormatTips: "为了确保各审批人能在手机端看到相关附件，请您使用标准化格式上传。标准化格式如下",
            AllDownload: "全部下载",
            //弹出提示
            AttachmentSizeLimitPrompt: "文件大小超过限制",
            AttachmentFormatError: "文件格式不正确",
            DownloadUrlGetFail: "下载地址获取失败",
            DeleteRowMessage: "只有上传人在上传节点才能删除",
            RoundRowMessage: "只有上传人在上传节点才能撤回删除",

            //备注模块
            Remarks: "备注说明",
            Nothing: "暂无",

            //传阅模块
            Circulate: "传阅",

            //审批人信息 
            ApproverInformation: "审批人信息",
            StepName: "步骤名称",
            SerialNumber: "序号",
            Approver: "审批人",
            PhStepInfo: "请输入姓名、姓名首字母、姓名全拼、账号进行搜索",

            //流程记录模块
            ProcessRecord: "流程记录",
            ProcessRecordListNoData: "暂无数据",

            //审批记录
            ApprovalRecord: "审批记录",
            ProcessingTime: "处理时间",
            Duration: "历时",
            ViewAllProcesses: "查看全部处理过程",
            Approve: "同意",
            AutoApprove: "同意",//自动审批
            InProcessing: "处理中",
            Communicate:"沟通",
            PlatformEnd: "通过",
            CancelCommunicate: "取消沟通",
            CommunicateFeedback: "沟通反馈",
            Delegate: "授权",
            AutoApprove: "同意",
            //管理员操作
            AdminInvalid: "删除",
            AdminFinalPass: "终审通过",
            AdminSave: "保存",
            AdminShow: "显示",
            AdminHide: "隐藏",
            AdminReActivated: "重新激活",
            AdminDelegate: "管理员授权",
            AdminRedirect: "管理员转办",
            AdminSkip: "管理员跳转",
            AdminIntervene: "管理员干预",
            AdminRetry: "管理员重试",
            AdminReminder: "管理员催办",
            //平台操作
            PlatformSkip: "相邻节点自动同意",
            PlatformActSkip: "无处理人节点自动跳过",
            PlatformEnd_Completed: "审批通过",
            PlatformEnd_Cancel: "作废",
            PlatformEnd_Invalid: "删除",
            PlatformEnd_FinalPass: "终审通过",
            PlatformEnd_Refused: "拒绝",
            ExceptionEnd: "异常结束",
            Unknown: "未知",



            //传阅记录
            CommicationRecord: "传阅记录",
            FormCCUser: "传阅人",
            CirculatingNode: "传阅节点",
            Sendee: "接收人",
            CirculatingTime: "传阅时间",

            //抄送记录  lhy
            CourtesyCopyRecord: "抄送记录",
            FormReceiverUser: "接收人",
            CourtesyCopyActivityName: "抄送节点",
            CourtesyCopyType: "抄送",
            CourtesyCopyUser: "抄送人",
            CourtesyCopyTime: "抄送时间",


            //订阅记录
            SubscribeRecord: "订阅记录",
            SubscribeUser: "订阅人",
            OperationPeople: "{operation}人",


            //流程处理模块
            ProcessHandling: "流程处理",
            AuditPoints: "审批要点",
            AuditNode: "审批节点",
            AgreeOpinion: "同意",
            ReSubmitOpinion: "重新提交",
            RejectOpinion: "驳回",
            RefusedOpinion: "拒绝",
            RedirectOpinion: "转办",
            CommunicationOpinion: "沟通",
            CancelCommunicateOpinion: "取消沟通",
            CommunicateFeedbackOpinion: "沟通反馈",
            WithdrawnOpinion: "撤回",
            CancelOpinion: "作废",
            CirculateOpinion: "传阅",
            PhApprovalOpinionLeast: "意见至少要求输入",
            PhCharacters: "个字符",
            //流程处理弹框提示
            ReturnTo: "驳回到",
            ReturnToMode: "驳回后再提交/审批时",
            RerouteAllNode: "重走所有节点",
            DirectGoCurrentNode: "直接回到当前节点",
            PhPleaseEnterReturnOpinion: "请输入驳回意见....",
            EnterReturnOpinion: "请输入意见",
            SelectTeturnActivity: "请选择驳回环节",
            //After 
            ConfirmApprove: "确认审批",
            WhetherConfirmApprove: "是否确认此次同意审批",
            ConfirmReSubmit: "确认重新提交",
            WhetherConfirmReSubmit: "是否确认重新提交",
            ConfirmCancelCommunicate: "确认取消沟通",
            WhetherConfirmCancelCommunicate: "是否确认取消沟通",
            ConfirmCommunicateFeedback: "确认沟通反馈",
            WhetherConfirmCommunicateFeedback: "是否确认沟通反馈",
            ConfirmRefused: "确认拒绝",
            WhetherConfirmRefused: "是否确认此次拒绝",
            ConfirmWithdrawn: "确认撤回",
            WhetherConfirmWithdrawn: "是否确认此次撤回",
            ConfirmCancel: "确认作废",
            WhetherConfirmCancel: "是否确认此次取消",
            ThePhrase: "常用语",
            SaveAsCommonComments: "保存为常用语",
            SelectRedirectUser: "请选择转办人",
            SelectCirculateUser: "请选择传阅人",
            SelectCommunicationUser: "请选择沟通人",
            SelectApplicantPost: "请选择申请人岗位",
            RejectOpinionComments: "驳回意见",
            CommunicationComments: '沟通意见',
            RefusedComments: '拒绝意见',
            RedirectComments: '转办意见',
            WhetherConfirmReject: '是否确认此次驳回', // 2019-11-21
            ConfirmReject: "确认驳回", // 2019-11-21
            CommunicateWidthYourself: '不能自己与自己沟通', // 2019-12-11
            TableMode: '表格模式', // 2019-12-11
            ListMode: '列表模式', // 2019-12-11
            ProcessingOpinion: '处理意见', //  // 2019-12-11
            NodeName: '节点名称', // 2019-12-11
            SolvePeople: '处理人', // 2019-12-11 
            PostSolve: '处理人岗位', // 2019-12-11 
            CanTTransferYourself: "不能转办给自己", // 2019-12-11 
            FormCCTime: "传阅时间",// 2019-12-13
            SubscribeTime: "订阅时间",// 2019-12-13
            HomeListApplicantDept: "部门：",// 2019-12-13
            HomeListApplicantTel: "座机：",// 2019-12-13
            HomeListApplicantMobile: "手机：",// 2019-12-13
            HomeListApplicantEMail: "邮箱：",// 2019-12-13
            PhPleaseEnterOpinion: "请输入意见....", // 2019-12-117

            //formmain.js
            Processing: "处理中",
            Loading: "加载中",
            ConfirmLaunchProcess: "确认要发起流程？",
            ConfirmCancelProcess: "确认要取消流程？",
            SelectAppPost: "请选择申请人岗位",
            SelectActivity: "请选择节点 ",
            RequiredActivityUser: "没有配置处理人，请配置后再提交流程",
            ActivityApprover: " 的审批人",
            AdminInfo: " 请联系管理员处理。",
            //请求返回错误信息标准 errorMessage
            ErrorLogIDMessage: "reference:",
            ProcessExceptionPrompt: "流程异常，请联系管理员，",

            //审批人控制
            PredictionNode: "环节：",
            PredictionTipTail: "个人",
            PredictionTipLeast: "至少",
            PredictionTipNoMore: "至多",
            PredictionTipEqual: "等于",


            Tip: '提示', // 2019-10-30
            PCApprovalOpinion: '请输入审批意见', // 2019-10-30
            AddThePhrase: '新增常用语',  // 2019-10-30
            NodeOnlyApprovedPC: '该节点只能在pc端审批', // 2019-10-30

            InputRequired: "必填",
            SelectRequired: "请选择",
            DateRequired: "请选择日期",
            SetNextApproval: "选择审批人",
            NotStart: "未发起",

            Unknown: "未知", // 2019-12-19
            RushToSign: "抢签", // 2019-12-19
            StringSignature: " 串签", // 2019-12-19
            JointlySign: "会签", // 2019-12-19
            Resigned: '已离职', // 2019-12-19



        }
    },
    en: {
        KStarForm: {
            //标准通用类型
            Confirm: "Confirm",
            Cancel: "Invalid",
            FormCC: "Form CC",
            Status: "Status",
            Type: "Type",
            Time: "Time",
            PhChoice: "Choice",
            Opinion: "Opinion",
            ApprovalOpinion: "Opinions",//Approval Opinion
            Agree: "Agree",
            Refused: "Refused",
            Application: "Application",
            AttachmentName: "Attachment Name",
            SystemPrompt: "System Prompt",
            Operation: "Operation",
            More: "More",
            FormRequiredRrompt: "The form check is not passed, please check again and try again!",//表单必填未通过提示
            Return: 'Return', // 返回 2019-11-07

            //单位
            Hour: "Hour",
            Minute: "Minute",

            //流程状态
            FormInstanceStatus0: "Error", //流程异常
            FormInstanceStatus1: "Draft",//草稿
            FormInstanceStatus2: "Available",//运行中
            FormInstanceStatus3: "ApprovalComplete",//审批通过
            FormInstanceStatus31: "Invalid",//作废
            FormInstanceStatus32: "Delete",//删除
            FormInstanceStatus33: "FinalAdoption",//终审通过
            FormInstanceStatus34: "Refuse",//拒绝
            FormInstanceStatus35: "AbnormalEnd", //异常结束



            //选人控件模块
            SelectUser: "Please select personnel",
            SelectFormCCUser: "Please select CC personnel", //请选择传阅人员
            SelectApprovalUser: "Please select approver", //请选择审批人

            //弹框
            DialogCancel: "Cancel",
            DialogConfirm: "Confirm",
            DialogConfirmRefused: "Confirm rejection？",
            WhetherConfirmSubmit: "Confirm to submit",
            ConfirmSubmit: "Confirm submission",

            //表单头部模块
            ProcessRoute: "Process Route:",
            Chinese: "CN",
            English: "ENG",

            //按钮模块
            ProcessSeer: "Process Seer",
            ViewFlow: "View flow",
            Print: "Print",  
            Close: "Close",
            Save: "Save",
            SaveDraft: "Save Draft",
            //"Cancel",
            Submit: "Submit",
            Redirect: "Redirect",
            ReSubmit: "ReSubmit",
            Subscribe: "Subscribe",
            CancelSubscribe: "Unsubscribe",
            Communication: "Communicate",//Communication
            CommunicateFeedback: "Communicate Feedback",
            CancelCommunication: "Cancel Communicate",//Cancel Communication
            Withdrawn: "Withdrawn",
            Returned: "Returned",
            Reject: "Reject",
            //按钮弹出框
            ProcessDescription: "Process Description",
            RelevantSystem: "Relevant System",
            RelatedDocuments: "Related Documents",
            CCOpinion: "CC Opinion",
            //传阅按钮
            CirculateUser: "Circulate User",
            CirculateOpinions: "Opinions",

            //基本信息模块
            BaseInfo: "Base Information",
            ApplicantPosition: "Position",
            ApplicantDepartment: "Department",
            ApplyDate: "Apply Date",
            Submitter: "Submitter",
            ProcessBillNo: "Bill No.",
            Urgency: "Priority",
            RejectReason: "Reject Reason",
            Normal: "Normal",
            Medium: "Medium",
            Urgent: "Urgent",

            //表单信息模块
            FormInfo: "Form Information",
            FormSubject: "Subject",
            PleaseEnterContent: "Please Enter Content",
            PleaseEnterProcessTitle: "Please Enter Process Title",

            //附件模块
            Attachment: "Attachment",
            UploadAttachments: "Upload Attachments",
            FileSize: "File Size",
            UploadNode: "Upload Node",
            UploadUser: "Upload User",
            UploadTime: "Upload Time",
            Download: "Download",
            Preview: "Preview",
            Delete: "Delete",
            Reduction: "Reduction",
            AttachmentMaxTips: "File size cannot exceed",
            AttachmentFormatTips: "In order to ensure that the approvers can see the relevant attachments on the mobile terminal, please upload them in a standardized format. The standardized format is as follows:",
            AllDownload: "All download", // 全部下载
            //弹出提示
            AttachmentSizeLimitPrompt: "File size exceeds limit",
            AttachmentFormatError: "Incorrect file format",
            DownloadUrlGetFail: "Download address acquisition failed",
            DeleteRowMessage: "Only the uplink can be deleted in the upload node",
            RoundRowMessage: "Only the sender can withdraw the deletion at the upload node",

            //备注模块
            Remarks: "Remarks",
            Nothing: "No Data",

            //传阅模块
            Circulate: "Circulate",

            //审批人信息 
            ApproverInformation: "Approver Information",
            StepName: "Step Name",
            SerialNumber: "SN.",
            Approver: "Approver",
            AutoApprove: "Approver",//自动审批
            PhStepInfo: "Please input name, initials, full spelling and account number to search",

            //流程记录模块
            ProcessRecord: "Process Record",
            ProcessRecordListNoData: "No Data",
            //审批记录
            ApprovalRecord: "Approval Record",
            ProcessingTime: "Processing Time",
            Duration: "Duration",
            ViewAllProcesses: "View All Processes",
            Approve: "Agree",
            InProcessing: "Processing",
            Communicate: "Communication",
            CancelCommunicate: "CancelCommunicate",
            CommunicateFeedback: "CommunicateFeedback",
            Delegate: "authorization",
            AutoApprove: "Agree",//同意
            //管理员操作
            AdminInvalid: "Delete",//删除
            AdminFinalPass: "FinalAdoption",//终审通过
            AdminSave: "Save", //保存
            AdminShow: "Show",//显示
            AdminHide: "Hide",//隐藏
            AdminReActivated: "Reactivation",//重新激活
            AdminDelegate: "Admin Delegate",//管理员授权
            AdminRedirect: "Admin Redirect", //管理员转办
            AdminSkip: "Admin Goto",//管理员跳转
            AdminIntervene: "Admin Intervene",//管理员干预
            AdminRetry: "Admin Retry",//管理员重试
            AdminReminder: "Admin Reminder",//管理员催办
            //平台操作
            PlatformSkip: "Automatic agree",//相邻节点自动同意
            PlatformActSkip: "Automatic skip",//无处理人节点自动跳过
            PlatformEnd_Completed: "End",//审批通过
            PlatformEnd_Cancel: "Invalid",//作废
            PlatformEnd_Invalid: "Delete",//删除
            PlatformEnd_FinalPass: "FinalAdoption",//终审通过
            PlatformEnd_Refused: "Refuse",//拒绝
            ExceptionEnd: "Abnormal end",//异常结束
           
            Unknown: "Unknown",//未知
            //传阅记录
            CommicationRecord: "Commication Record",
            CirculatingNode: "Circulating Node",
            Sendee: "sendee",
            FormCCUser: "CC User",
            CirculatingTime: "Circulating Time",
            //订阅记录authorization
            SubscribeRecord: "Subscribe Record",
            SubscribeUser: "Subscribe User",
            OperationPeople: "{operation} People",

            //流程处理模块
            ProcessHandling: "Process Handling",
            AuditPoints: "Audit Points",
            AuditNode: "Audit Node",
            AgreeOpinion: "Agree",
            ReSubmitOpinion: "ReSubmit",
            RejectOpinion: "Reject",
            RefusedOpinion: "Refused",
            RedirectOpinion: "Redirect",
            CommunicationOpinion: "Communication",
            CancelCommunicateOpinion: "CancelCommunicate",
            CommunicateFeedbackOpinion: "CommunicateFeedback",
            WithdrawnOpinion: "Withdrawn",
            CancelOpinion: "Invalid",
            CirculateOpinion: "Circulate",
            PhApprovalOpinionLeast: "Approval comments shall be input at least",
            PhCharacters: "characters",
            //流程处理弹框提示
            ReturnTo: "Reject To",
            ReturnToMode: "After reject",
            RerouteAllNode: "Reroute all nodes",//重走所有节点
            DirectGoCurrentNode: "Go directly to the current node",//直接回到当前节点
            PhPleaseEnterReturnOpinion: "Please enter the return comments....",
            EnterReturnOpinion: "Please enter the comments",
            SelectTeturnActivity: "Please select the return phase",
            ConfirmApprove: "Confirmation audit",
            WhetherConfirmApprove: "Are you sure to approve this audit",
            ConfirmReSubmit: "Confirm resubmission",
            WhetherConfirmReSubmit: "Confirm to resubmit",
            ConfirmCancelCommunicate: "Confirm cancellation of communication",
            WhetherConfirmCancelCommunicate: "Confirm to cancel communication",
            ConfirmCommunicateFeedback: "Confirm communication feedback",
            WhetherConfirmCommunicateFeedback: "Confirm communication feedback",
            ConfirmRefused: "Confirm rejection",
            WhetherConfirmRefused: "Confirm this rejection",
            ConfirmWithdrawn: "Confirm withdrawal",
            WhetherConfirmWithdrawn: "Confirm this withdrawal",
            ConfirmCancel: "Confirm Invalid",
            WhetherConfirmCancel: "Confirm this cancellation",
            ThePhrase: "The Phrase", // 常用语
            SaveAsCommonComments: "Save as Phrase", // 保存为常用意见
            SelectRedirectUser: "Please select a transfer agent", //请选择转办人
            SelectCirculateUser: "Please select the reader",//请选择传阅人
            SelectCommunicationUser: "Please select a communicator",//请选择沟通人
            SelectApplicantPost: "Please select the applicant's position",//请选择申请人岗位
            RejectOpinionComments: "Comments",
            CommunicationComments: 'Comments',
            RefusedComments: 'Comments',
            RedirectComments: 'Comments',
            WhetherConfirmReject: 'Are you sure to reject this audit', // 2019-11-21: 是否确认此次退回
            ConfirmReject: "Confirm reject", // 确认退回2019-11-21
            CommunicateWidthYourself: "You can't communicate with yourself", // 2019-12-11
            TableMode: 'Table mode', // 2019-12-11,表格模式
            ListMode: 'List mode', // 2019-12-11,列表模式
            ProcessingOpinion: 'Processing opinion', //  // 2019-12-11, 处理意见
            NodeName: 'Node name', // 2019-12-11, 节点名称
            SolvePeople: 'Solve people', // 2019-12-11 处理人
            PostSolve: 'Post of solve', // 2019-12-11 处理人岗位
            CanTTransferYourself: "You can't transfer it to yourself", // 2019-12-11 不能转办给自己
            FormCCTime: "Form CC Time",// 2019-12-13传阅时间
            SubscribeTime: "Subscribe Time",// 2019-12-13订阅时间
            HomeListApplicantDept: "Dept:",// 2019-12-13
            HomeListApplicantTel: "Tel:",// 2019-12-13
            HomeListApplicantMobile: "Mobile:",// 2019-12-13
            HomeListApplicantEMail: "Email:",// 2019-12-13
            PhPleaseEnterOpinion: "Please enter the comments....", // 2019-12-117

            //formmain.js
            Processing: "In processing",
            Loading: "Loading",
            ConfirmLaunchProcess: "Confirm to initiate process?",
            ConfirmCancelProcess: "Confirm to cancel process?",
            SelectAppPost: "Please select the applicant's position",
            SelectActivity: "Please select a node ",
            RequiredActivityUser: "There is no configuration of the processor, please configure the process before submitting",
            ActivityApprover: " Approver",
            AdminInfo: " Please contact the administrator.",
            //请求返回错误信息标准 errorMessage
            ErrorLogIDMessage: "reference:",
            ProcessExceptionPrompt: "Process exception, please contact administrator,",

            //审批人控制
            PredictionNode: "Node：",
            PredictionTipTail: "People",
            PredictionTipLeast: "At Least",
            PredictionTipNoMore: "No More",
            PredictionTipEqual: "Equal",

            Tip: 'tip', // 提示 2019-10-30
            PCApprovalOpinion: 'Please choose Approval opinion', // 2019-10-30
            AddThePhrase: 'Add the phrase',  // 2019-10-30
            NodeOnlyApprovedPC: 'This node can only be approved on PC',

            InputRequired: "Required",
            SelectRequired: "Please Select",
            DateRequired: "Please Select Date",
            SetNextApproval: "Select approver ",
            NotStart: "Not Start",

            Unknown: "Unknown", // 未知2019-12-19
            RushToSign: "Rush to sign", // 抢签2019-12-19
            StringSignature: " String signature", // 串签2019-12-19
            JointlySign: "Jointly sign", // 会签2019-12-19
            Resigned: 'Resigned', //已离职2019-12-19

            //抄送记录  lhy
            CourtesyCopyRecord: "Copy records",
            FormReceiverUser: "Sendee",
            CourtesyCopyActivityName: "CC node",
            CourtesyCopyType: "CC",
            CourtesyCopyUser: "Copy",
            CourtesyCopyTime: "CC time",
        }
    }
}
