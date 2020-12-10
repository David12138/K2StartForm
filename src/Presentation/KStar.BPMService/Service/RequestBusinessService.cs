using KStar.BPMService.Models;
using KStar.Domain.Models;
using KStar.Domain.ViewModels.BPMService;
using KStar.Form.Domain.Service.BPMService;
using KStar.Form.Domain.Service.Process;
using KStar.Form.Domain.ViewModels.BPMService;
using KStar.Platform.Common;
using KStar.Platform.Common.Helper;
using KStar.Platform.Logger;
using KStar.Platform.Models;
using KStar.Platform.Service;
using KStar.Platform.ViewModel.Interface;
using KStar.Platform.WorkFlow.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.BPMService.Service
{
    /// <summary>
    /// 调用业务系统服务
    /// </summary>
    public class RequestBusinessService : IRequestBusinessService
    {
        ILogger _logger;
        IInterfaceLogService _interfaceLogService;
        IPrcConfigEventInterfaceService _eventInterfaceService;
        IFormInstanceSevice _formInstanceSevice;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="interfaceLogService"></param>
        /// <param name="eventInterfaceService"></param>
        /// <param name="formInstanceSevice"></param>
        public RequestBusinessService(ILogger logger, IInterfaceLogService interfaceLogService,
                                      IPrcConfigEventInterfaceService eventInterfaceService,
                                      IFormInstanceSevice formInstanceSevice)
        {
            _logger = logger;
            _interfaceLogService = interfaceLogService;
            _eventInterfaceService = eventInterfaceService;
            _formInstanceSevice = formInstanceSevice;
        }


        /// <summary>
        /// 调用业务服务系统接口
        /// </summary>
        /// <param name="proEventMsg"></param>
        /// <param name="pushInfo"></param>
        /// <returns></returns>
        public ResponseResultInfo RequestBusInterface(ProcessEventMessage proEventMsg, PushBusInterfaceModel pushInfo)
        {
            var serviceInfo = InitBusinessServiceInfo(proEventMsg, pushInfo);

            try
            {
                //验证单据是否发起
                var formInstanceInfo = _formInstanceSevice.GetPrcFormInstanceByFormId(proEventMsg.FormId);
                if (formInstanceInfo == null)
                {
                    serviceInfo.ResultInfo.returnMsg = string.Format("FormId：{0}，未获取到表单实例数据。", proEventMsg.FormId);
                    AddBusErrorLog(serviceInfo);
                    return serviceInfo.ResultInfo;
                }
                pushInfo.bizId = formInstanceInfo.BizId;
                serviceInfo.ProEventMsgInfo.K2ID = pushInfo.k2Id = formInstanceInfo.Folio;

                serviceInfo.InterfaceConfig = _eventInterfaceService.GetProEventInterfaceInfo(proEventMsg.EventInterfaceId);

                string param = GetRequstParameter(serviceInfo.InterfaceConfig.DataType, formInstanceInfo.SubmitterAccount, proEventMsg, pushInfo);
                string responseString = string.Empty;
                try
                {
                    serviceInfo.BegInterfaceTime = DateTime.Now;
                    responseString = HttpHelper.HttpPostRequest(serviceInfo.InterfaceConfig.Url, param, 60);
                    serviceInfo.EndInterfaceTime = DateTime.Now;

                    var resInfo = JsonConvert.DeserializeObject<ResultModel<ResponseResultInfo>>(responseString);
                    serviceInfo.ResultInfo = resInfo.resultInfo;
                    AddBusinessInterfaceLog(serviceInfo, param, responseString);
                }
                catch (Exception ex)
                {
                    _logger.Error(ex, $"FormId:{ proEventMsg.FormId }");
                    serviceInfo.ResultInfo.returnMsg = "访问ESB服务异常;" + ex.Message.ToString();
                    AddBusErrorLog(serviceInfo, 9, param, responseString);
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, $"FormId:{ proEventMsg.FormId }");
                if (serviceInfo.ResultInfo == null)
                {
                    serviceInfo.ResultInfo = new ResponseResultInfo() { returnStatus = 500 };//返回的格式不对
                }
                serviceInfo.ResultInfo.returnMsg = "调用业务接口异常！" + ex.Message;
                AddBusErrorLog(serviceInfo, 999);
            }

            return serviceInfo.ResultInfo;
        }

        #region private

        /// <summary>
        /// 获取请求接口参数字符串
        /// </summary>
        /// <param name="dataType"></param>
        /// <param name="submitUser"></param>
        /// <param name="proEventMsgInfo"></param>
        /// <param name="pushBusInfo"></param>
        /// <returns></returns>
        private string GetRequstParameter(string dataType, string submitUser, ProcessEventMessage proEventMsgInfo, PushBusInterfaceModel pushBusInfo)
        {
            ResultModel<PushBusInterfaceModel> paramData = new ResultModel<PushBusInterfaceModel>();
            string requstParameter = string.Empty;

            if (dataType == "FormData")
            {
                pushBusInfo.actionResult = string.Empty;
                pushBusInfo.bizData = _formInstanceSevice.GetPrcFormContent(proEventMsgInfo.FormId);
            }
            else
            {
                var approverInfo = GetApproverInfo(proEventMsgInfo, submitUser, pushBusInfo.actionResult);

                if (dataType == "ApprovalData")
                {
                    pushBusInfo.activityName = proEventMsgInfo.ActivityName;
                    pushBusInfo.comment = approverInfo.Comment;
                }
                else if (dataType == "FormAndApprovalData")
                {
                    pushBusInfo.activityName = proEventMsgInfo.ActivityName;
                    pushBusInfo.comment = approverInfo.Comment;
                    pushBusInfo.bizData = _formInstanceSevice.GetPrcFormContent(proEventMsgInfo.FormId);
                }

                pushBusInfo.activityName = proEventMsgInfo.ActivityName;
                pushBusInfo.comment = approverInfo.Comment;
            }

            paramData.resultInfo = pushBusInfo;
            requstParameter = Newtonsoft.Json.JsonConvert.SerializeObject(paramData);
            return requstParameter;
        }

        /// <summary>
        /// 获取上次审批信息
        /// </summary>
        /// <param name="msgItem"></param>
        /// <param name="applyUserCode"></param>
        /// <param name="actionResult"></param>
        /// <returns></returns>
        private PrcServer_FormApprovalHistory GetApproverInfo(ProcessEventMessage msgItem, string applyUserCode, string actionResult)
        {
            var processLogEntity = new PrcServer_FormApprovalHistory()
            {
                UserAccount = applyUserCode,
                EndDate = DateTime.Now
            };

            if (msgItem.EventType == ProcessEventEnum.ActivityRejected.ToString())
            {
                var logItem = _formInstanceSevice.GetFormApprovalHistoryByActionType(msgItem.FormId, ActionType.Reject.ToString(), msgItem.ActivityName, msgItem.RejectActivityName);
                if (logItem != null)
                {
                    return logItem;
                }
            }

            if (msgItem.ActivityName.StartsWith("000_"))
            {
                //ActionType.Reject驳回同步 意见类型、意见到业务系统
                //ActionType.ReSubmit驳回再提交同步 意见类型、意见到业务系统
                var logItem = _formInstanceSevice.GetFormApprovalHistoryByActionType(msgItem.FormId, actionResult);
                if (logItem != null)
                {
                    processLogEntity = logItem;
                }
                return processLogEntity;
            }
            else
            {
                var processOpType = actionResult;//默认查审批日志
                if (actionResult == ActionType.AdminFinalPass.ToString())//流程结束归档
                {
                    //获取最后一个审批日志作为推送接口审批人
                    var logItem = _formInstanceSevice.GetFormApprovalHistoryByActionType(msgItem.FormId, ActionType.Approve.ToString());
                    if (logItem != null)
                    {
                        return logItem;
                    }
                }
                else if (actionResult == ActionType.Cancel.ToString()) //作废
                {
                    //查作废类型的日志Refused、AdminInvalid
                    processOpType = string.Format("{0},{1}", ActionType.Refused.ToString(), ActionType.AdminInvalid.ToString());
                }

                //获取最后一条审批记录日志
                var latestLog = _formInstanceSevice.GetFormApprovalHistoryByActionType(msgItem.FormId, processOpType);
                if (latestLog != null)
                {
                    processLogEntity = latestLog;
                }
            }
            return processLogEntity;
        }


        /// <summary>
        /// 初始化 调用业务系统总模型
        /// </summary>
        /// <param name="proEventMsgInfo"></param>
        /// <param name="pushBusInfo"></param>
        /// <returns></returns>
        private BusinessServiceInfo InitBusinessServiceInfo(ProcessEventMessage proEventMsgInfo, PushBusInterfaceModel pushBusInfo)
        {
            var busServiceInfo = new BusinessServiceInfo()
            {
                ProEventMsgInfo = proEventMsgInfo,
                ResultInfo = new ResponseResultInfo(),

                BusInterfaceLog = new Domain.Models.PrcServer_BusinessInterfaceLog()
                {
                    FormID = proEventMsgInfo.FormId,
                    K2ID = proEventMsgInfo.K2ID,
                    ActivityName = proEventMsgInfo.ActivityName,
                    ActionResult = pushBusInfo.actionResult,
                    EventInterfaceId = proEventMsgInfo.EventInterfaceId.ToString(),

                    RequstID = proEventMsgInfo.RequstID,
                    RequestTime = DateTime.Now,
                    Parameters = Newtonsoft.Json.JsonConvert.SerializeObject(proEventMsgInfo),
                    IsRetry = 0
                }
            };

            return busServiceInfo;
        }

        /// <summary>
        /// 添加调用业务服务错误日志
        /// </summary>
        /// <param name="k2ID"></param>
        /// <param name="busServiceInfo"></param>
        /// <param name="errorCode"></param>
        /// <param name="param"></param>
        /// <param name="responseString"></param>
        public void AddBusErrorLog(BusinessServiceInfo busServiceInfo, int errorCode = 0, string param = "", string responseString = "")
        {
            busServiceInfo.ResultInfo.returnStatus = 500;
            busServiceInfo.ResultInfo.returnCode = errorCode == 999 ? "E0999" : "E000" + errorCode;

            AddBusinessInterfaceLog(busServiceInfo, param, responseString);
        }


        /// <summary>
        /// 添加调用业务接口日志
        /// </summary>
        /// <param name="busServiceInfo"></param>
        /// <param name="param"></param>
        /// <param name="responseString"></param>
        private void AddBusinessInterfaceLog(BusinessServiceInfo busServiceInfo, string param, string responseString)
        {
            if (busServiceInfo.BusInterfaceLog != null)
            {
                busServiceInfo.BusInterfaceLog.Status = busServiceInfo.ResultInfo.returnStatus;
                busServiceInfo.BusInterfaceLog.K2ID = busServiceInfo.ProEventMsgInfo.K2ID;
                busServiceInfo.BusInterfaceLog.RequestMessage = param;

                busServiceInfo.BusInterfaceLog.ResponseString = responseString;
                busServiceInfo.BusInterfaceLog.ResponseMessage = Newtonsoft.Json.JsonConvert.SerializeObject(busServiceInfo.ResultInfo);
                busServiceInfo.BusInterfaceLog.ResponseTime = DateTime.Now;
            }

            if (busServiceInfo.InterfaceConfig != null)
            {
                busServiceInfo.BusInterfaceLog.InterfaceUrl = busServiceInfo.InterfaceConfig.Url;
            }
            if (busServiceInfo.BegInterfaceTime != null)
            {
                busServiceInfo.BusInterfaceLog.BegInterfaceTime = busServiceInfo.BegInterfaceTime;
            }
            if (busServiceInfo.EndInterfaceTime != null)
            {
                busServiceInfo.BusInterfaceLog.EndInterfaceTime = busServiceInfo.EndInterfaceTime;
            }

            if (busServiceInfo.ResultInfo != null)
            {
                busServiceInfo.BusInterfaceLog.LogID = busServiceInfo.ResultInfo.logId;
            }

            _interfaceLogService.AddBusInterfaceLog(busServiceInfo.BusInterfaceLog);
        }


        #endregion

    }
}