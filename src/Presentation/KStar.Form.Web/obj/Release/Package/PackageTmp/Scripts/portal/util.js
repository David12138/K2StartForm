var tableColumn = {
    Folio: {
        prop: 'Folio',
        label: '流程编号',
        width: 180,
        sortable: true,
        link: true
    },
    Folio1: {
        prop: 'Folio',
        label: '流程单号',
        width: 180,
        sortable: true,
        link: true
    },
    ProcessName: {
        prop: 'ProcessName',
        label: '流程名称',
        width: null,
        link: true
    },
    FormSubject: {
        prop: 'FormSubject',
        label: '流程标题',
        width: null,
        popover: true
    },
    SubmitDate2: {
        prop: 'SubmitDate',
        label: '保存时间',
        width: null,
        sortable: true,
        time: true
    },
    SubmitterDisplayName: {
        prop: 'SubmitterDisplayName',
        label: '填写人',
        width: null
    },
    ApplicantDisplayName: {
        prop: 'ApplicantDisplayName',
        label: '申请人',
        width: null
    },
    ActivityDisplayName: {
        prop: 'ActivityDisplayName',
        label: '节点名称',
        width: null,
    },
    ApprovalUsers: {
        prop: 'ApprovalUsers',
        label: '当前处理人',
        width: null,
        popover: true
    },
    OriginatorName: {
        prop: 'OriginatorName',
        label: '抄送人',
        width: null,
    },
    ReceiverEndDate: {
        prop: 'ReceiverEndDate',
        label: '审阅日期',
        width: null,
        sortable: true,
        time: true
    },
    IsReadName: {
        prop: 'IsReadName',
        label: '审阅状态',
        width: null,
        link: false
    },
    ReceiverDate: {
        prop: 'ReceiverDate',
        label: '抄送日期',
        width: null,
        sortable: true,
        time: true
    },
    SubmitDate1: {
        prop: 'SubmitDate',
        label: '申请日期',
        width: null,
        sortable: true,
        time: true
    },
    ProcessingDate: {
        prop: 'ProcessingDate',
        label: '处理时间',
        width: null,
        sortable: true,
        time: true
    },
    FinishDate: {
        prop: 'FinishDate',
        label: '流程结束日期',
        width: null,
        sortable: true,
        time: true
    },
    SubmitDate: {
        prop: 'SubmitDate',
        label: '抄送到达时间',
        width: null,
        sortable: true,
        time: true
    },
    TaskArriveDate: {
        prop: 'StartDate',
        label: '任务到达时间',
        width: null,
        sortable: true,
        time: true
    },
    StatusName: {
        prop: 'StatusName',
        label: '流程状态',
        width: null
    },
}

var advancedSearchItem = {
    ProcessNum: {
        label: '编号',
        model: 'ProcessNum',
        type: 'input'
    },
    FormSubject: {
        label: '标题',
        model: 'FormSubject',
        type: 'input'
    },
    Originator: {
        label: '申请人',
        model: 'Originator',
        type: 'user'
    },
    ID: {
        label: '申请人部门',
        model: 'ID',
        type: 'user',
        icon: 'el-icon-search'
    },
    SubmitterAccount: {
        label: '填写人',
        model: 'SubmitterAccount',
        type: 'user'
    },
    ProcessName: {
        label: '流程名称',
        model: 'ProcessName',
        type: 'user'
    },
    processingTime: {
        label: '处理时间',
        model: 'processingTime',
        type: 'datepicker'
    },
    FormCCUser: {
        label: '抄送人',
        model: 'FormCCUser',
        type: 'user'
    },
    ProcessStatus: {
        label: '流程状态',
        model: 'ProcessStatus',
        type: 'select',
        option: [ // 流程状态选项
            { value: null, label: '所有' },
            { value: 0, label: '流程异常' },
            { value: 2, label: '运行中' },
            { value: 3, label: '审批通过' },
            { value: 31, label: '作废' },
            { value: 32, label: '删除' },
            { value: 33, label: '终审通过' },
            { value: 34, label: '拒绝' }]
    },
    Summary: {
        label: '流程摘要',
        model: 'Summary',
        type: 'input'
    },
    CcDate: {
        label: '抄送日期',
        model: 'CcDate',
        type: 'datepicker'
    },
    ReviewDate: {
        label: '审阅日期',
        model: 'ReviewDate',
        type: 'datepicker'
    },
    ApplicationDate: {
        label: '申请日期',
        model: 'ApplicationDate',
        type: 'datepicker'
    },
    EndDate: {
        label: '结束日期',
        model: 'EndDate',
        type: 'datepicker'
    },
    EndTime: {
        label: '结束日期',
        model: 'EndTime',
        type: 'datepicker'
    },
    ApplyForMe: {
        label: '申请类型',
        model: 'ApplyType',
        type: 'select',
        option: [ 
            { value: 0, label: '所有' },
            { value: 1, label: '本人申请' },
            { value: 2, label: '代我申请' },
            { value: 3, label: '代别人申请' }]
    },
    ReaderStatus: {
        label: '审阅状态',
        model: 'ReaderStatus',
        type: 'select',
        option: [
            { value: null, label: '所有' },
            { value: false, label: '待阅' },
            { value: true, label: '已阅' },
        ]
    },
    toUser: {
        label: '代理人',
        model: 'toUser',
        type: 'user'
    },
    StartDate: {
        label: '开始日期',
        model: 'StartDate',
        type: 'datepicker'
    },
    // processName: {
    //     label: '流程名称',
    //     model: 'processName',
    //     type: 'input'
    // },
    status: {
        label: '状态',
        model: 'status',
        type: 'select',
        option: [
            { value: 'All', label: '全部' },
            { value: 'true', label: '有效' },
            { value: 'false', label: '失效' },
        ]
    },
    delegationUser: {
        label: '授权人',//流程查询使用
        model: 'delegationUser',
        type: 'select',
        option: [
            //{ value: 'All', label: '全部' },
            //{ value: 'true', label: '有效' },
            //{ value: 'false', label: '失效' },
        ]
    }
}