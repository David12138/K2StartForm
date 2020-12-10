using KStar.BPMService.Models;
using KStar.Domain.ViewModels.BPMService;
using KStar.Form.Domain.ViewModels.BPMService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.BPMService.Service
{
    /// <summary>
    /// 调用业务系统服务
    /// </summary>
    public interface IRequestBusinessService : IService
    {

        /// <summary>
        /// 调用业务服务系统接口
        /// </summary>
        /// <param name="proEventMsg"></param>
        /// <param name="pushInfo"></param>
        /// <returns></returns>
        ResponseResultInfo RequestBusInterface(ProcessEventMessage proEventMsg, PushBusInterfaceModel pushInfo);


        /// <summary>
        /// 添加调用业务服务错误日志
        /// </summary>
        /// <param name="k2ID"></param>
        /// <param name="busServiceInfo"></param>
        /// <param name="errorCode"></param>
        /// <param name="param"></param>
        /// <param name="responseString"></param>
        void AddBusErrorLog(BusinessServiceInfo busServiceInfo, int errorCode = 0, string param = "", string responseString = "");

    }
}