using KStar.Domain.Models;
using KStar.Domain.Service.Maintenance;
using KStar.Domain.ViewModels.BPMService;
using KStar.Form.Domain.ViewModels.BPMService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Domain.Service.BPMService
{
    /// <summary>
    /// BPM项目日志服务
    /// </summary>
    public interface IInterfaceLogService : IService
    {
        /// <summary>
        /// 添加BPM接口日志
        /// </summary>
        /// <param name="serviceInfo"></param>
        void AddBPMInterfaceLogInfo(BPMServiceModel serviceInfo);

        /// <summary>
        /// 添加BPM接口日志
        /// </summary>
        /// <param name="logInfo"></param>
        void AddBPMInterfaceLog(PrcServer_BPMInterfaceLog logInfo);

        /// <summary>
        /// 获取发起接口成功发起的日志
        /// </summary>
        /// <param name="processCode"></param>
        /// <param name="bizId"></param>
        /// <returns></returns>
        PrcServer_BPMInterfaceLog GetProcessStartLogInfo(string processCode, string bizId);


        /// <summary>
        /// 添加 业务服务 日志
        /// </summary>
        /// <param name="logInfo"></param>
        void AddBusInterfaceLog(PrcServer_BusinessInterfaceLog logInfo);

    }
}
