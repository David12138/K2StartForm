using KStar.BPMService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.BPMService.Service
{
    /// <summary>
    /// 流程客户端服务
    /// </summary>
    public interface IWorkFlowService : IService
    {

        /// <summary>
        /// 发起接口 一步法 直接发起流程处理
        /// </summary>
        /// <returns></returns>
        long NewTaskStart(ProcessStartInfo ProcessStartInfo);
    }
}