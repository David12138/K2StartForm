using KStar.Domain.ViewModels.BPMService;
using KStar.Platform.Common;
using KStar.Platform.Service.ProcessConfig;
using KStar.Platform.ViewModel;
using KStar.Platform.ViewModel.Dto;
using KStar.ProcessEventService.Controllers;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Web.Http;

namespace KStar.Form.Rest.Api.BPMService
{
    /// <summary>
    /// 调用BPMService API
    /// </summary>
    [RoutePrefix("api/BPMService/Business")]
    public class BusinessController : KStarApiController
    {
        /// <summary>
        /// 
        /// </summary>
        public SystemDictionaryContext _dictionaryContext { get; set; }

        IEventBusinessInterfaceService _eventBusinessInterfaceService;

        /// <summary>
        /// 
        /// </summary>
        public BusinessController(IEventBusinessInterfaceService eventBusinessInterfaceService)
        {
            _eventBusinessInterfaceService = eventBusinessInterfaceService;
        }

        /// <summary>
        /// 节点驳回事件接口 
        /// KStar.K2Service 服务中 OperationCompleted 节点回退时 用户操作：退回时  调用接口
        /// </summary>
        /// <param name="input">参数</param>
        /// <returns></returns>
        [HttpPost]
        [Route("ActivityRejectInterface")]
        public HttpResponseMessage ActivityRejectInterface([FromBody]InterfaceContextModel input)
        {
            logger.Info("调用并节点驳回接口", $"Start ActivityRejectInterface Data:{ JsonConvert.SerializeObject(input) }");
            System.Diagnostics.Stopwatch stopwatch = new System.Diagnostics.Stopwatch();
            stopwatch.Start();

            try
            {
                string _busServiceEntranceUrl = _dictionaryContext[SettingType.EnvironmentVariable, SettingVariable.PushBusServiceEntranceUrl];//推送业务系统接口地址

                var eventInterfaceList = _eventBusinessInterfaceService.GetProcessEventInterfaceList(input.FormId, input.EventType, input.ActivityName, input.RejectActivityName);
                if (eventInterfaceList.Count == 0)
                {
                    var processEvent = (ProcessEventEnum)Enum.Parse(typeof(ProcessEventEnum), input.EventType);
                    logger.Warn("调用并节点驳回接口", $"End ActivityRejectInterface Data:{ JsonConvert.SerializeObject(input) }.FormId:{ input.FormId }没有配置“{ processEvent.GetDescription() }”事件接口。");
                    return new HttpResponseMessage() { StatusCode = System.Net.HttpStatusCode.OK };
                }
                else
                {
                    foreach (var interfaceInfo in eventInterfaceList)
                    {
                        var processEventMsg = GetProEventMessageModel(input, interfaceInfo.InterfaceId);
                        KStar.Jobs.EventBusHttpService.QueueHttpsRequest(_busServiceEntranceUrl, Newtonsoft.Json.JsonConvert.SerializeObject(processEventMsg));
                    }
                }
            }
            catch (Exception ex)
            {
                logger.Error(ex, $"FormId:{ input.FormId }");
            }

            stopwatch.Stop();
            TimeSpan timespan = stopwatch.Elapsed;
            logger.Info("调用并节点驳回接口", $"End ActivityRejectInterface Data:{ JsonConvert.SerializeObject(input) } 执行时间：{timespan.TotalMilliseconds} ms");
            return new HttpResponseMessage() { StatusCode = System.Net.HttpStatusCode.OK };
        }


        /// <summary>
        /// 调用业务系统推送服务接口
        /// 流程开始、流程结束、节点开始、节点结束 事件接口中，配置了业务系统接口时调用的接口
        /// </summary>
        /// <param name="input">参数</param>
        /// <returns></returns>
        [HttpPost]
        [Route("BusinessInterfacePush")]
        public HttpResponseMessage BusinessInterfacePush([FromBody]InterfaceContextModel input)
        {
            logger.Info("调用业务系统推送接口", $"Start BusinessInterfacePush Data:{JsonConvert.SerializeObject(input)}");
            System.Diagnostics.Stopwatch stopwatch = new System.Diagnostics.Stopwatch();
            stopwatch.Start();
            try
            {
                string _busServiceEntranceUrl = _dictionaryContext[SettingType.EnvironmentVariable, SettingVariable.PushBusServiceEntranceUrl];//推送业务系统接口地址

                var eventInterfaceList = _eventBusinessInterfaceService.GetProcessEventInterfaceList(input.FormId, input.EventType, input.ActivityName, input.RejectActivityName);
                if (eventInterfaceList.Count == 0)
                {
                    var processEvent = (ProcessEventEnum)Enum.Parse(typeof(ProcessEventEnum), input.EventType);
                    logger.Warn("调用业务系统推送接口", $"End BusinessInterfacePush Data:{JsonConvert.SerializeObject(input)}.FormId:{ input.FormId }没有配置“{ processEvent.GetDescription() }”事件接口。");
                    return new HttpResponseMessage() { StatusCode = System.Net.HttpStatusCode.OK };
                }
                else
                {
                    foreach (var interfaceInfo in eventInterfaceList)
                    {
                        var processEventMsg = GetProEventMessageModel(input, interfaceInfo.InterfaceId);
                        KStar.Jobs.EventBusHttpService.QueueHttpsRequest(_busServiceEntranceUrl, Newtonsoft.Json.JsonConvert.SerializeObject(processEventMsg));
                    }
                }
            }
            catch (Exception ex)
            {
                logger.Error(ex, $"FormId:{ input.FormId }");
            }

            stopwatch.Stop();
            TimeSpan timespan = stopwatch.Elapsed;
            logger.Info("调用业务系统推送接口", $"End BusinessInterfacePush Data:{JsonConvert.SerializeObject(input)} 执行时间：{timespan.TotalMilliseconds} ms");
            return new HttpResponseMessage() { StatusCode = System.Net.HttpStatusCode.OK };
        }


        private ProcessEventMessage GetProEventMessageModel(InterfaceContextModel input, Guid eventId)
        {
            return new ProcessEventMessage()
            {
                FormId = input.FormId,
                EventType = input.EventType,
                ActivityName = input.ActivityName,
                RejectActivityName = input.RejectActivityName,
                ProcInstID = input.ProcInstID,
                ActInstID = input.ActInstID,
                EventInterfaceId = eventId,

                RequstID = Guid.NewGuid().ToString()
            };
        }

    }
}
