using KStar.Domain.Models;
using KStar.Domain.Service.Maintenance;
using KStar.Domain.ViewModels.BPMService;
using KStar.Form.Domain.ViewModels.BPMService;
using Newtonsoft.Json;
using SqlSugar;
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
    internal class InterfaceLogService : BaseRepository, IInterfaceLogService
    {
        IPrcServerInterfaceLogService _prcInterfaceLogService;

        public InterfaceLogService(IPrcServerInterfaceLogService prcInterfaceLogService)
        {
            _prcInterfaceLogService = prcInterfaceLogService;
        }

        #region BPM接口日志

        /// <summary>
        /// 添加BPM接口日志
        /// </summary>
        /// <param name="serviceInfo"></param>
        public void AddBPMInterfaceLogInfo(BPMServiceModel serviceInfo)
        {
            if (serviceInfo.InterfaceLog != null)
            {
                if (serviceInfo.ResponseInfo != null)
                {
                    serviceInfo.InterfaceLog.Status = serviceInfo.ResponseInfo.returnStatus;
                    serviceInfo.InterfaceLog.ResponseMessage = JsonConvert.SerializeObject(serviceInfo.ResponseInfo);
                    serviceInfo.InterfaceLog.ResponseTime = DateTime.Now;
                }

                if (serviceInfo.FormInstanceInfo != null)
                {
                    serviceInfo.InterfaceLog.FormID = serviceInfo.FormInstanceInfo.Id;
                    serviceInfo.InterfaceLog.K2ID = serviceInfo.FormInstanceInfo.Folio;
                    serviceInfo.InterfaceLog.ProcessCode = serviceInfo.FormInstanceInfo.ProcessCode;
                }

                AddBPMInterfaceLog(serviceInfo.InterfaceLog);
            }
        }

        /// <summary>
        /// 添加BPM接口日志
        /// </summary>
        /// <param name="logInfo"></param>
        public void AddBPMInterfaceLog(PrcServer_BPMInterfaceLog logInfo)
        {
            logInfo.CreateTime = DateTime.Now;
            _prcInterfaceLogService.AddPrcServerBPMInterfaceLog(logInfo);
        }

        /// <summary>
        /// 获取发起接口成功发起的日志
        /// </summary>
        /// <param name="processCode"></param>
        /// <param name="bizId"></param>
        /// <returns></returns>
        public PrcServer_BPMInterfaceLog GetProcessStartLogInfo(string processCode, string bizId)
        {
            return Db.Queryable<PrcServer_BPMInterfaceLog>().Where(l => l.Status == 200 && l.InterfaceName == "StartProcess" && l.ProcessCode == processCode && l.BizID == bizId).OrderBy(l => l.ID, SqlSugar.OrderByType.Desc).With(SqlWith.NoLock).First();
        }


        #endregion


        #region Business 接口日志


        /// <summary>
        /// 添加 业务服务 日志
        /// </summary>
        /// <param name="logInfo"></param>
        public void AddBusInterfaceLog(PrcServer_BusinessInterfaceLog logInfo)
        {
            logInfo.CreateTime = DateTime.Now;
            _prcInterfaceLogService.AddPrcServerBusInterfaceLog(logInfo);
        }


        #endregion

    }
}
