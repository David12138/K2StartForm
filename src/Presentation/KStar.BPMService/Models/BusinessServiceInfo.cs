using KStar.Domain.Models;
using KStar.Domain.ViewModels.BPMService;
using KStar.Form.Domain.ViewModels.BPMService;
using KStar.Platform.Models;
using KStar.Platform.ViewModel.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.BPMService.Models
{
    /// <summary>
    /// 调用业务接口服务总模型
    /// </summary>
    public class BusinessServiceInfo
    {
        /// <summary>
        /// 入口接收参数信息
        /// </summary>
        public ProcessEventMessage ProEventMsgInfo { get; set; }

        /// <summary>
        /// 响应数据
        /// </summary>
        public ResponseResultInfo ResultInfo { get; set; }

        /// <summary>
        /// 接口配置信息
        /// </summary>
        public PRC_Config_EventInterface InterfaceConfig { get; set; }

        /// <summary>
        /// 调用业务系统接口日志信息
        /// </summary>
        public PrcServer_BusinessInterfaceLog BusInterfaceLog { get; set; }

        /// <summary>
        /// 调用业务系统接口开始时间
        /// </summary>
        public DateTime? BegInterfaceTime { get; set; }
        /// <summary>
        /// 调用业务系统接口结束时间
        /// </summary>
        public DateTime? EndInterfaceTime { get; set; }

    }
}