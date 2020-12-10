using KStar.BPMService.Service;
using KStar.Domain.Models;
using KStar.Domain.ViewModels.BPMService;
using KStar.Form.Domain.Service.BPMService;
using KStar.Form.Domain.Service.Process;
using KStar.Form.Domain.ViewModels.BPMService;
using KStar.Platform.Common;
using KStar.Platform.Infrastructure;
using KStar.Platform.Logger;
using KStar.Platform.Service;
using KStar.Platform.WorkFlow.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace KStar.BPMService.Controllers
{
    /// <summary>
    /// Create by：chenqian
    /// Create Time：2020-05-09
    /// K2调用业务系统接口服务
    /// </summary>
    public class BusinessServiceController : ApiController
    {
        /// <summary>
        /// 
        /// </summary>
        public const string LogSource = "调用业务接口服务";

        ILogger _logger;
        IInterfaceLogService _interfaceLogService;
        IFormInstanceSevice _formInstanceSevice;
        IRequestBusinessService _requestBusinessService;
        IPrcConfigEventInterfaceService _prcEventInterfaceService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="interfaceLogService"></param>
        /// <param name="formInstanceSevice"></param>
        /// <param name="requestBusinessService"></param>
        /// <param name="prcConfigEventInterfaceService"></param>
        public BusinessServiceController(ILogger logger, IInterfaceLogService interfaceLogService,
                                         IFormInstanceSevice formInstanceSevice, 
                                         IRequestBusinessService requestBusinessService,
                                         IPrcConfigEventInterfaceService prcConfigEventInterfaceService)
        {
            _logger = logger;
            _interfaceLogService = interfaceLogService;
            _formInstanceSevice = formInstanceSevice;
            _requestBusinessService = requestBusinessService;
            _prcEventInterfaceService = prcConfigEventInterfaceService;

            ServicePointManager.DefaultConnectionLimit = 512;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
        }


        /// <summary>
        /// 推送业务服务 Rest 请求接 入口
        /// </summary>
        /// <param name="proEventMessage"></param>
        /// <returns></returns>
        public Task<bool> PushBusinessServiceEntrance(ProcessEventMessage proEventMessage)
        {
            _logger.Info(LogSource, $"Start PushBusinessServiceEntrance Data:{ JsonConvert.SerializeObject(proEventMessage) }");

            return Task.Factory.StartNew(() =>
            {
                var returnInfo = new ResponseResultInfo();

                CheckProcessEventMessage(proEventMessage, returnInfo);
                if (returnInfo.returnStatus != 200)
                {
                    _logger.Warn(LogSource, $"End PushBusinessServiceEntrance Data:{ JsonConvert.SerializeObject(proEventMessage) },RequestMessage:{ JsonConvert.SerializeObject(returnInfo) }");
                    throw new Exception(returnInfo.returnMsg);
                }

                returnInfo = CallBusinessService(proEventMessage);
                //如果接口出错，则抛出来给队列
                if (returnInfo.returnStatus != 200)
                {
                    _logger.Warn(LogSource, $"End PushBusinessServiceEntrance Data:{ JsonConvert.SerializeObject(proEventMessage) },RequestMessage:{ JsonConvert.SerializeObject(returnInfo) }");
                    throw new Exception(returnInfo.returnMsg);
                }

                _logger.Info(LogSource, $"End PushBusinessServiceEntrance Data:{ JsonConvert.SerializeObject(proEventMessage) }");
                return true;
            });
        }


        #region 事件方法处理

        /// <summary>
        /// 调用业务系统接口 推送状态处理
        /// </summary>
        /// <param name="msgItem"></param>
        /// <returns></returns>
        private ResponseResultInfo CallBusinessService(ProcessEventMessage msgItem)
        {
            PushBusInterfaceModel pushInfo = new PushBusInterfaceModel();

            if (msgItem.EventType == ProcessEventEnum.ProcessStarted.ToString())  //流程开始
            {
                pushInfo.actionResult = ActionType.Submit.ToString();//已提交
            }
            else if (msgItem.EventType == ProcessEventEnum.ActivityStarted.ToString()) //节点开始
            {
                pushInfo.actionResult = ActionType.Approve.ToString();//同意
                if (msgItem.ActivityName == SystemSettings.ReActivity)
                {
                    //000重新发起环节开始 审批结果为驳回
                    pushInfo.actionResult = ActionType.Reject.ToString();//驳回
                }
            }
            else if (msgItem.EventType == ProcessEventEnum.ActivityCompleted.ToString())  //节点结束
            {
                pushInfo.actionResult = ActionType.Approve.ToString();//同意
                if (msgItem.ActivityName == SystemSettings.ReActivity)
                {
                    pushInfo.actionResult = ActionType.ReSubmit.ToString();//重新提交
                }
            }
            else if (msgItem.EventType == ProcessEventEnum.ProcessCompleted.ToString())//流程结束
            {
                pushInfo.actionResult = ActionType.AdminFinalPass.ToString();//审批通过
                if (_formInstanceSevice.IsProcessDelete(msgItem.FormId))//单据有作废 则 审批结果为作废
                {
                    pushInfo.actionResult = ActionType.Cancel.ToString();//作废
                }
            }
            else if (msgItem.EventType == ProcessEventEnum.ActivityRejected.ToString())//节点驳回
            {
                pushInfo.actionResult = ActionType.Reject.ToString();//驳回
            }

            return _requestBusinessService.RequestBusInterface(msgItem, pushInfo);
        }

        #endregion


        /// <summary>
        /// 校验推送消息
        /// </summary>
        /// <param name="proEventMessage"></param>
        /// <param name="returnInfo"></param>
        /// <returns></returns>
        private void CheckProcessEventMessage(ProcessEventMessage proEventMessage, ResponseResultInfo returnInfo)
        {
            if (!_prcEventInterfaceService.IsEnableEventInterface(proEventMessage.EventInterfaceId))
            {
                returnInfo.returnMsg = string.Format("FormId：{0},EventInterfaceId：{1}，未获取到流程事件接口配置。", proEventMessage.FormId, proEventMessage.EventInterfaceId);
                ReturnErrorInfo(proEventMessage, returnInfo);
            }
        }

        /// <summary>
        /// 错误信息返回信息、记录错误日志
        /// </summary>
        /// <param name="proEventMsgInfo"></param>
        /// <param name="resResultInfo"></param>
        private void ReturnErrorInfo(ProcessEventMessage proEventMsgInfo, ResponseResultInfo resResultInfo)
        {
            resResultInfo.returnStatus = 500;
            resResultInfo.returnCode = "E0001";
            var logItem = new Domain.Models.PrcServer_BusinessInterfaceLog()
            {
                Status = 500,
                FormID = proEventMsgInfo.FormId,
                ActivityName = proEventMsgInfo.ActivityName,
                EventInterfaceId = proEventMsgInfo.EventInterfaceId.ToString(),
                RequstID = proEventMsgInfo.RequstID,

                RequestTime = DateTime.Now,
                Parameters = Newtonsoft.Json.JsonConvert.SerializeObject(proEventMsgInfo),
                ResponseMessage = Newtonsoft.Json.JsonConvert.SerializeObject(resResultInfo),
                ResponseTime = DateTime.Now,
                IsRetry = 0
            };
            _interfaceLogService.AddBusInterfaceLog(logItem);
        }

    }
}