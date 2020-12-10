using KStar.BPMService.Models;
using KStar.BPMService.Models.Response;
using KStar.Domain.ViewModels;
using KStar.Platform.Common.Helper;
using KStar.Platform.Logger;
using KStar.Platform.WorkFlow.Service;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KStar.BPMService.Service
{
    /// <summary>
    /// 流程客户端服务
    /// </summary>
    public class WorkFlowService : IWorkFlowService
    {
        System.Diagnostics.Stopwatch stopwatch = new System.Diagnostics.Stopwatch();
        TimeSpan timespan;

        ILogger _logger;
        IKStarWorkFlowService _KStarWorkFlowService;
        IProcessBusService _processBusService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="KStarWorkFlowService"></param>
        /// <param name="processBusService"></param>
        public WorkFlowService(
            ILogger logger, 
            IKStarWorkFlowService KStarWorkFlowService, 
            IProcessBusService processBusService)
        {
            _logger = logger;
            _KStarWorkFlowService = KStarWorkFlowService;
            _processBusService = processBusService;
        }


        /// <summary>
        /// 发起接口 一步法 直接发起流程处理
        /// </summary>
        /// <returns></returns>
        public long NewTaskStart(ProcessStartInfo ProcessStartInfo)
        {
            //初始化kStarFormModel
            var formModel = _KStarWorkFlowService.GetApiSubmitModel(ProcessStartInfo.StartUserCode, ProcessStartInfo.ApplyUserCode, ProcessStartInfo.SplitProcessCode, "BPMService", Guid.Empty);
            if (formModel != null)
            {
                formModel.FormInstance.Folio = ProcessStartInfo.K2ID; //K2ID
                formModel.FormInstance.BizId = ProcessStartInfo.BizId; //BizID
                formModel.FormInstance.FormSubject = ProcessStartInfo.Folio; //流程标题

                formModel.FormContent.FormDataToJson = ProcessStartInfo.BizData; //流程表单数据                
            }

            var processStartuptUrl = _processBusService.GetProcessStartuptUrl(ProcessStartInfo.SplitProcessCode); //获取流程发起地址
            string apiSubmitUrl = string.Format("{0}/ApiSubmit", processStartuptUrl);//获取表单ApiSubmit请求地址
            apiSubmitUrl = _processBusService.UrlAddK2ID(apiSubmitUrl, ProcessStartInfo.K2ID);//添加K2ID参数

            stopwatch.Stop();
            timespan = stopwatch.Elapsed;
            _logger.Debug("StartProcess", $"url: {apiSubmitUrl} GetProcessStartuptUrl 执行时间：{ timespan.TotalMilliseconds} ms");//方法计时记录日志系统

            //获取参数Json
            string param = Newtonsoft.Json.JsonConvert.SerializeObject(formModel);
            param = Newtonsoft.Json.JsonConvert.SerializeObject(new { jsonData = param });
            string responseString = string.Empty;
            try
            {
                stopwatch.Reset();
                stopwatch.Start();

                //请求模拟提交地址
                responseString = HttpHelper.HttpPostRequest(apiSubmitUrl, param, 60);
                if (string.IsNullOrWhiteSpace(responseString))
                {
                    return 0;
                }

                stopwatch.Stop();
                timespan = stopwatch.Elapsed;
                _logger.Debug("StartProcess", $"ApiSubmit 执行时间：{ timespan.TotalMilliseconds} ms");//方法计时记录日志系统

                //处理返回信息
                var submitResInfo = JsonConvert.DeserializeObject<SubmitResponseModel>(responseString);
                if (submitResInfo == null || (submitResInfo != null && submitResInfo.Code != 200))
                {
                    throw new Exception(submitResInfo.Message);
                }

                return submitResInfo.Data.Item2;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}