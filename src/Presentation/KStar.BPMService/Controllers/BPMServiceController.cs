using KStar.BPMService.Models;
using KStar.BPMService.Service;
using KStar.Form.Domain.ViewModels.BPMService;
using KStar.Form.Domain.ViewModels.BPMService.Requst;
using KStar.Platform.Logger;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace KStar.BPMService.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    public class BPMServiceController : ApiController
    {
        /// <summary>
        /// 
        /// </summary>
        public const string LogSource = "调用BPMService日志";
        ILogger _logger;
        IBPMService _BPMService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="BPMService"></param>
        public BPMServiceController(ILogger logger, IBPMService BPMService)
        {
            _logger = logger;
            _BPMService = BPMService;
        }

        /// <summary>
        /// 流程发起
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public Task<ResultModel<ResponseResultModel>> StartProcess(RequstModel<ProcessStartArgs> requst)
        {
            _logger.Trace(LogSource, $"Start StartProcess bizId:{ requst?.requestInfo?.bizId }", "StartProcess");
            #region 初始化信息

            System.Diagnostics.Stopwatch stopwatch_Start = new System.Diagnostics.Stopwatch();
            stopwatch_Start.Start();

            System.Diagnostics.Stopwatch stopwatch = new System.Diagnostics.Stopwatch();
            TimeSpan timespan;

            //初始化返回信息
            var responseInfo = _BPMService.InitProcessStartResponseInfo();
            var serviceInfo = _BPMService.InitBPMServiceModel();

            //初始化sourceId
            var sourceId = (requst != null && requst.requestInfo != null) ? requst.requestInfo.sourceId : string.Empty;

            //获取requst Json数据
            var requstJson = JsonConvert.SerializeObject(requst);
            #endregion

            try
            {
                //初始化BPMServiceInfo
                serviceInfo = _BPMService.InitBPMServiceInfo(sourceId, requstJson);
                responseInfo.resultInfo = serviceInfo.ResponseInfo;

                //校验Esb请求参数是否为空
                serviceInfo.ResponseInfo.returnMsg = _BPMService.CheckRequestInfo(requst);
                if (!string.IsNullOrWhiteSpace(serviceInfo.ResponseInfo.returnMsg))
                {
                    _BPMService.ProStartAddErrorInfo(serviceInfo, requst.requestInfo, 0);
                    return Task.FromResult(responseInfo);
                }

                //必填参数校验
                serviceInfo.ResponseInfo.returnMsg = _BPMService.VerifyRequired(ModelState);
                if (!string.IsNullOrWhiteSpace(serviceInfo.ResponseInfo.returnMsg))
                {
                    _BPMService.ProStartAddErrorInfo(serviceInfo, requst.requestInfo);
                    return Task.FromResult(responseInfo);
                }
                var requestInfo = requst.requestInfo;
                //发起模式（默认值为Default）
                requestInfo.startMode = string.IsNullOrWhiteSpace(requestInfo.startMode) ? ProcessStartModeEnum.Default.ToString() : requestInfo.startMode;

                //流程发起
                responseInfo.resultInfo = _BPMService.ProcessStart(serviceInfo, requestInfo);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "StartProcess");//记录日志到日志系统
                responseInfo.resultInfo.returnMsg = "接口错误！" + ex.Message;

                //返回错误信息，记录日志
                _BPMService.ProStartAddErrorInfo(serviceInfo, requst.requestInfo, 999);
            }

            stopwatch_Start.Stop();
            var timespan_Start = stopwatch_Start.Elapsed;
            _logger.Debug("StartProcess", $"StartProcess 执行时间：{ timespan_Start.TotalMilliseconds } ms");//方法计时记录日志系统
            _logger.Trace(LogSource, $"End StartProcess流程发起 bizId:{requst?.requestInfo?.bizId}");

            return Task.FromResult(responseInfo);
        }



        /// <summary>
        /// 业务系统测试接口
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public Task<ResultModel<ResponseResultInfo>> PushBusTest(RequstModel<PushBusInterfaceModel> requst)
        {
            _logger.Trace(LogSource, $"Start PushBusTest Data:{ JsonConvert.SerializeObject(requst) }", "PushBusTest");

            var responseInfo = new ResultModel<ResponseResultInfo>();
            responseInfo.resultInfo = new ResponseResultInfo() { logId = Guid.NewGuid().ToString() };
            return Task.FromResult(responseInfo);
        }


    }
}