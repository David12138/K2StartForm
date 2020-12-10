using KStar.BPMService.Models;
using KStar.BPMService.Models.Response;
using KStar.Domain.Models;
using KStar.Domain.Service;
using KStar.Form.Domain.Attribute;
using KStar.Form.Domain.Service.BPMService;
using KStar.Form.Domain.ViewModels.BPMService;
using KStar.Form.Domain.ViewModels.BPMService.Requst;
using KStar.Platform.Logger;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Web.Http.ModelBinding;

namespace KStar.BPMService.Service
{
    /// <summary>
    /// BPMService  业务封装层
    /// </summary>
    public class BPMService : IBPMService
    {
        System.Diagnostics.Stopwatch stopwatch = new System.Diagnostics.Stopwatch();
        TimeSpan timespan;

        ILogger _logger;
        IInterfaceLogService _interfaceLogService;
        IProcessBusService _processBusService;
        IWorkFlowService _workFlowService;
        IUserService _userService;
        //IOrganizationService _organizationService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="interfaceLogService"></param>
        /// <param name="processBusService"></param>
        /// <param name="userService"></param>
        /// <param name="workFlowService"></param>
        public BPMService(ILogger logger, 
                          IInterfaceLogService interfaceLogService, 
                          IProcessBusService processBusService,
                          IUserService userService,
                          IWorkFlowService workFlowService)
        {
            _logger = logger;
            _interfaceLogService = interfaceLogService;
            _processBusService = processBusService;
            _userService = userService;
            _workFlowService = workFlowService;
            //_organizationService = organizationService;
        }



        #region 流程发起

        /// <summary>
        /// 流程发起
        /// </summary>
        /// <param name="serviceInfo"></param>
        /// <param name="requestInfo">发起接口Model数据</param>
        /// <returns></returns>
        public ResponseResultModel ProcessStart(BPMServiceModel serviceInfo, ProcessStartArgs requestInfo)
        {
            //校验参数数据正确性
            serviceInfo.ResponseInfo.returnMsg = VerifyArgsData(requestInfo);
            if (!string.IsNullOrWhiteSpace(serviceInfo.ResponseInfo.returnMsg))
            {
                ProStartAddErrorInfo(serviceInfo, requestInfo, 2);
                return serviceInfo.ResponseInfo;
            }

            //获取流程发起信息
            var processInfo = _processBusService.GetProcessStartInfo(requestInfo);
            if (!string.IsNullOrWhiteSpace(processInfo.ResultInfo.Message))
            {
                serviceInfo.ResponseInfo.returnMsg = processInfo.ResultInfo.Message;
                ProStartAddErrorInfo(serviceInfo, requestInfo, 2);
                return serviceInfo.ResponseInfo;
            }
            var processStartInfo = processInfo.ProStartInfo;

            var data = new ProcessStartResponseModel() { k2Id = processStartInfo.K2ID };

            if (requestInfo.startMode == ProcessStartModeEnum.Default.ToString())//直接提交(一步法)
            {
                stopwatch.Reset();
                stopwatch.Start();
                //处理一步法逻辑（模拟表单提交）
                processStartInfo.FormId = _workFlowService.NewTaskStart(processStartInfo);
                stopwatch.Stop();
                timespan = stopwatch.Elapsed;
                _logger.Debug("StartProcess", $"NewTaskStart 执行时间：{ timespan.TotalMilliseconds } ms");//方法计时记录日志系统

                //获取表单查看URL
                data.formUrl = _processBusService.GetFormViewUrl(processStartInfo.FormId);
            }
            else//需要弹出表单确认(二步法)
            {
                data.formUrl = _processBusService.GetFormPreStartuptUrl(processStartInfo.SplitProcessCode, processStartInfo.K2ID);
            }
            serviceInfo.ResponseInfo.data = data;

            ProStartAddSuccessLog(serviceInfo, processStartInfo);//发起添加成功日志
            return serviceInfo.ResponseInfo;
        }

        #endregion







        #region 接口modle初始化

        /// <summary>
        /// 初始化发起接口返回参数
        /// </summary>
        /// <returns></returns>
        public ResultModel<ResponseResultModel> InitProcessStartResponseInfo()
        {
            return new ResultModel<ResponseResultModel>();
        }

        /// <summary>
        /// 初始化serviceInfo
        /// </summary>
        /// <returns></returns>
        public BPMServiceModel InitBPMServiceModel()
        {
            return new BPMServiceModel()
            {
                ResponseInfo = new ResponseResultModel(),
                InterfaceLog = new PrcServer_BPMInterfaceLog(),
            };
        }

        /// <summary>
        /// 初始化 BPMServiceInfo
        /// </summary>
        /// <param name="sourceId"></param>
        /// <param name="requestMessage"></param>
        /// <param name="k2Id"></param>
        /// <returns></returns>
        public BPMServiceModel InitBPMServiceInfo(string sourceId, string requestMessage, string k2Id = "")
        {
            System.Diagnostics.StackTrace ss = new System.Diagnostics.StackTrace(true);
            System.Reflection.MethodBase mb = ss.GetFrame(1).GetMethod();
            var interfaceName = mb.Name;  //父方法名  父方法类名(mb.DeclaringType.Name)

            var logId = Guid.NewGuid().ToString();
            BPMServiceModel BPMServiceInfo = new BPMServiceModel()
            {
                ResponseInfo = new ResponseResultModel()
                {
                    logId = logId
                },
                InterfaceLog = new PrcServer_BPMInterfaceLog()
                {
                    LogID = logId,
                    SourceId = sourceId,
                    K2ID = k2Id,
                    InterfaceName = interfaceName,
                    RequestMessage = requestMessage,
                    RequestTime = DateTime.Now
                }
            };
            return BPMServiceInfo;
        }


        #endregion

        #region 参数接口校验

        /// <summary>
        /// 检查请求信息
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="request"></param>
        /// <param name="langType"></param>
        /// <returns></returns>
        public string CheckRequestInfo<T>(RequstModel<T> request, string langType = "")
        {
            if (request == null)
            {
                if (langType == "EN")
                {
                    return "Invoking Parameter Failed.";
                }
                else
                {
                    return "请求参数缺失.";
                }
            }
            if (request.requestInfo == null)
            {
                if (langType == "EN")
                {
                    return "requestInfo Parameter Missing.";
                }
                else
                {
                    return "requestInfo参数缺失.";
                }
            }
            return string.Empty;
        }

        /// <summary>
        /// 校验class 数据 必填
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="modelState"></param>
        /// <returns></returns>
        public string VerifyRequired(ModelStateDictionary modelState)
        {
            var retstr = string.Empty;
            if (!modelState.IsValid)
            {
                foreach (var error in modelState)
                {
                    var errors = from a in error.Value.Errors
                                 select a.ErrorMessage;
                    string errStr = string.Join(",", errors.ToList<string>());
                    if (!string.IsNullOrWhiteSpace(errStr))
                    {
                        retstr += error.Key + ":" + errStr;
                    }
                }
            }
            return retstr;
        }


        /// <summary>
        /// 校验参数 数据正确性
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="model"></param>
        /// <returns></returns>
        public string VerifyArgsData<T>(T model)
        {
            string retstr = string.Empty;

            Type t = model.GetType();
            System.Reflection.PropertyInfo[] properties = t.GetProperties();
            foreach (System.Reflection.PropertyInfo info in properties)
            {
                var Attribute = (CustomAttribute[])info.GetCustomAttributes(typeof(CustomAttribute), false);
                //如果必填特性，直接过滤掉
                if (Attribute.Length > 0 && !string.IsNullOrWhiteSpace(Attribute[0].Function))
                {
                    string value = string.Empty;

                    if (info != null)
                    {
                        object o = info.GetValue(model, null);
                        value = o != null ? o.ToString() : "";

                        if (!string.IsNullOrEmpty(value))
                        {
                            var verifyMsg = VerifyData(Attribute[0].Function, value, model);
                            if (!string.IsNullOrWhiteSpace(verifyMsg))
                            {
                                if (verifyMsg == "false")
                                {
                                    retstr = string.Format("{0}不存在;", info.Name);
                                }
                                else
                                {
                                    retstr = verifyMsg;
                                }
                                break;
                            }
                        }
                    }
                }
            }

            return retstr;
        }

        /// <summary>
        /// 数据校验
        /// </summary>
        /// <param name="verifyFunction"></param>
        /// <param name="args"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        public string VerifyData<T>(string verifyFunction, string args, T model)
        {
            string ret = string.Empty;

            switch (verifyFunction.ToLower())
            {
                case "usercode":
                    //校验员工ID是否存在
                    if (!_userService.IsEnableUserAccount(args))
                    {
                        return "false";
                    }
                    break;
                case "deptcode":
                    //var orgSysId = new Guid(args);
                    ////校验 部门编码 是否存在
                    //if (!_organizationService.IsEnableOrgCode(args))
                    //{
                    //    return "false";
                    //}
                    //break;
                case "k2id":
                    ////获取FormDraft信息
                    //var formDraft = FormDraftRepository.GetFormDraftModle(args);
                    //if (formDraft == null)
                    //{
                    //    return "false";
                    //}

                    ////sourceId与FormDraft表数据对比
                    //if (formDraft.SourceId != GetModelValue("sourceId", model))
                    //{
                    //    return string.Format("sourceId与原单据sourceId不一致;");
                    //}
                    break;
            }

            return ret;
        }

        #endregion

        #region 返回错误信息并记录日志

        /// <summary>
        /// 错误返回信息，并记录日志
        /// </summary>
        /// <param name="serviceInfo"></param>
        /// <param name="proStartInfo"></param>
        /// <param name="errorCodeType"></param>
        /// <param name="returnStatus"></param>
        public void ProStartAddErrorInfo(BPMServiceModel serviceInfo, ProcessStartArgs proStartInfo, int errorCodeType = 1)
        {
            serviceInfo.ResponseInfo.returnStatus = 500;
            serviceInfo.ResponseInfo.returnMsg = errorCodeType == 0 ? "requestInfo参数缺失." : serviceInfo.ResponseInfo.returnMsg;
            serviceInfo.ResponseInfo.returnCode = errorCodeType == 999 ? "E0999" : "E000" + errorCodeType;

            if (proStartInfo != null)
            {
                serviceInfo.InterfaceLog.BizID = proStartInfo.bizId;
                serviceInfo.InterfaceLog.ProcessCode = proStartInfo.processCode;
            }

            //记录日志
            _interfaceLogService.AddBPMInterfaceLogInfo(serviceInfo);
        }

        /// <summary>
        /// 发起接口调用成功添加日志
        /// </summary>
        /// <param name="serviceInfo"></param>
        /// <param name="proStartInfo"></param>
        private void ProStartAddSuccessLog(BPMServiceModel serviceInfo, ProcessStartInfo proStartInfo)
        {
            if (proStartInfo != null)
            {
                if (serviceInfo.ResponseInfo != null)
                {
                    serviceInfo.InterfaceLog.Status = serviceInfo.ResponseInfo.returnStatus;
                    serviceInfo.InterfaceLog.ResponseMessage = JsonConvert.SerializeObject(serviceInfo.ResponseInfo);
                    serviceInfo.InterfaceLog.ResponseTime = DateTime.Now;
                }

                serviceInfo.InterfaceLog.BizID = proStartInfo.BizId;
                serviceInfo.InterfaceLog.ProcessCode = proStartInfo.ProcessCode;

                serviceInfo.InterfaceLog.K2ID = proStartInfo.K2ID;
                serviceInfo.InterfaceLog.FormID = proStartInfo.FormId;
                serviceInfo.InterfaceLog.SplitProcessCode = proStartInfo.SplitProcessCode;

                //记录日志
                _interfaceLogService.AddBPMInterfaceLog(serviceInfo.InterfaceLog);
            }
        }

        #endregion

    }
}