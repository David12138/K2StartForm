using KStar.ProcessEventService.Controllers;
using KStar.Platform.Service.Business;
using KStar.Platform.ViewModel.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KStar.ProcessEventService.Api.Demo
{
    /// <summary>
    /// 示例
    /// </summary>
    [RoutePrefix("api/Demo/Leave")]
    public class LeaveController : KStarApiController
    {

        #region 流程级
        /// <summary>
        /// 流程开始事件
        /// </summary>
        /// <param name="input">参数</param>
        /// <returns></returns>
        [HttpPost]
        [Route("OnPrcStarted")]
        public HttpResponseMessage OnPrcStarted([FromBody]InterfaceContextModel input)
        {
            logger.Info("流程事件", $"Start OnPrcStarted FormId {input.FormId} ProcInstID {input.ProcInstID}");
            System.Diagnostics.Stopwatch stopwatch = new System.Diagnostics.Stopwatch();
            stopwatch.Start();

            //var formDataToJson = baseBusinessService.GetFormDataToJson(input.FormId);
            //业务逻辑

            stopwatch.Stop();
            TimeSpan timespan = stopwatch.Elapsed;
            logger.Info("流程事件", $"End OnPrcStarted FormId {input.FormId} ProcInstID {input.ProcInstID} 执行时间：{timespan.TotalMilliseconds} ms");
            return new HttpResponseMessage() { StatusCode = System.Net.HttpStatusCode.OK };
        }

        /// <summary>
        /// 流程结束事件
        /// </summary>
        /// <param name="input">参数</param>
        /// <returns></returns>
        [HttpPost]
        [Route("OnPrcCompleted")]
        public HttpResponseMessage OnPrcCompleted([FromBody]InterfaceContextModel input)
        {
            logger.Info("流程事件", $"Start OnPrcCompleted FormId {input.FormId} ProcInstID {input.ProcInstID}");
            System.Diagnostics.Stopwatch stopwatch = new System.Diagnostics.Stopwatch();
            stopwatch.Start();

            //var formDataToJson = baseBusinessService.GetFormDataToJson(input.FormId);
            //业务逻辑
            //var res = baseBusinessService.GetFormInstanceStatus(input.FormId);
            stopwatch.Stop();
            TimeSpan timespan = stopwatch.Elapsed;
            logger.Info("流程事件", $"End OnPrcCompleted FormId {input.FormId} ProcInstID {input.ProcInstID} 执行时间：{timespan.TotalMilliseconds} ms");
            return new HttpResponseMessage() { StatusCode = System.Net.HttpStatusCode.OK };
        }
        #endregion

        #region 节点级


        /// <summary>
        /// 节点开始事件
        /// </summary>
        /// <param name="input">参数</param>
        /// <returns></returns>
        [Route("OnActStarted")]
        [HttpPost]
        public HttpResponseMessage OnActStarted([FromBody]InterfaceContextModel input)
        {
            logger.Info("流程事件", $"Start OnActStarted FormId {input.FormId} ProcInstID {input.ActInstID} ActivityName {input.ActivityName}");
            System.Diagnostics.Stopwatch stopwatch = new System.Diagnostics.Stopwatch();
            stopwatch.Start();

            //var formDataToJson = baseBusinessService.GetFormDataToJson(input.FormId);
            //业务逻辑

            stopwatch.Stop();
            TimeSpan timespan = stopwatch.Elapsed;
            logger.Info("流程事件", $"End OnActStarted FormId {input.FormId} ProcInstID {input.ActInstID} ActivityName {input.ActivityName} 执行时间：{timespan.TotalMilliseconds} ms");
            return new HttpResponseMessage() { StatusCode = System.Net.HttpStatusCode.OK };
        }

        /// <summary>
        /// 节点结束事件
        /// </summary>
        /// <param name="input">参数</param>
        /// <returns></returns>
        [Route("OnActCompleted")]
        [HttpPost]
        public HttpResponseMessage OnActCompleted([FromBody]InterfaceContextModel input)
        {
            logger.Info("流程事件", $"Start OnActCompleted FormId {input.FormId} ProcInstID {input.ActInstID} ActivityName {input.ActivityName}");
            System.Diagnostics.Stopwatch stopwatch = new System.Diagnostics.Stopwatch();
            stopwatch.Start();

            //var formDataToJson = baseBusinessService.GetFormDataToJson(input.FormId);
            //业务逻辑
           
            stopwatch.Stop();
            TimeSpan timespan = stopwatch.Elapsed;
            logger.Info("流程事件", $"End OnActCompleted FormId {input.FormId} ProcInstID {input.ActInstID} ActivityName {input.ActivityName} 执行时间：{timespan.TotalMilliseconds} ms");
            return new HttpResponseMessage() { StatusCode = System.Net.HttpStatusCode.OK };
        }
        #endregion
    }
}