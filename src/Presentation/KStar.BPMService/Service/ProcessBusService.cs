using KStar.BPMService.AutoMapperConfig;
using KStar.BPMService.Models;
using KStar.Domain.Service;
using KStar.Domain.ViewModels;
using KStar.Form.Domain.Service.BPMService;
using KStar.Form.Domain.Service.Process;
using KStar.Form.Domain.ViewModels.BPMService.Requst;
using KStar.Platform.Service;
using KStar.Platform.Service.KStarFormStorageProvider;

namespace KStar.BPMService.Service
{
    /// <summary>
    /// BPM接口业务逻辑处理
    /// </summary>
    public class ProcessBusService: IProcessBusService
    {
        IFormInstanceSevice _formInstanceSevice;
        IProcessSetService _processSetService;
        IPrcConfigSplitService _prcConfigSplitService;
        IProcessDataStorageProvider _processDataStorageProvider;
        IInterfaceLogService _interfaceLogService;

        /// <summary>
        /// 
        /// </summary>
        public ProcessBusService(IFormInstanceSevice formInstanceSevice, 
            IProcessSetService processSetService, 
            IPrcConfigSplitService prcConfigSplitService, 
            IProcessDataStorageProvider processDataStorageProvider,
            IInterfaceLogService interfaceLogService)
        {
            _formInstanceSevice = formInstanceSevice;
            _processSetService = processSetService;
            _prcConfigSplitService = prcConfigSplitService;
            _processDataStorageProvider = processDataStorageProvider;
            _interfaceLogService = interfaceLogService;
        }

        /// <summary>
        /// 获取流程发起信息
        /// </summary>
        /// <param name="startInfo"></param>
        /// <returns></returns>
        public (ResponseModel ResultInfo, ProcessStartInfo ProStartInfo) GetProcessStartInfo(ProcessStartArgs startInfo)
        {
            //获取发起Model数据
            var processStartInfo = AutoMapperExt.MapTo<ProcessStartInfo>(startInfo);
            var resultInfo = new ResponseModel();

            if (!string.IsNullOrWhiteSpace(startInfo.bizId))
            {
                var proStartLogInfo = _interfaceLogService.GetProcessStartLogInfo(startInfo.processCode, startInfo.bizId);
                if (proStartLogInfo != null)
                {
                    processStartInfo.K2ID = proStartLogInfo.K2ID;

                    //如果流程已作废，则重新生成表单数
                    if (!_formInstanceSevice.IsProcessDeleteByBizId(startInfo.bizId))
                    {
                        resultInfo.Message = "该bizId对应的流程已发起，请勿重复发起";
                        return (resultInfo, processStartInfo);
                    }
                }
            }

            processStartInfo.SplitProcessCode = startInfo.processCode;
            //processStartInfo.SplitProcessCode = GetSplitProcessCode(startInfo);//TODO:获取流程编码
            if (!string.IsNullOrWhiteSpace(processStartInfo.SplitProcessCode))
            {
                //根据流程编码获取流程信息
                var processSetInfo = _processSetService.GetPRC_Config_ProcessSetByCode(processStartInfo.SplitProcessCode);
                if (processSetInfo == null)
                {
                    resultInfo.Message = string.Format("processCode:{0}不存在;", processStartInfo.SplitProcessCode);
                    return (resultInfo, processStartInfo);
                }

                if (string.IsNullOrWhiteSpace(processStartInfo.K2ID))
                {
                    processStartInfo.K2ID = _processSetService.GetSerialNumberByProcessCode(processStartInfo.SplitProcessCode);//生成K2ID
                }
            }

            return (resultInfo, processStartInfo);
        }

        #region 获取表单地址

        /// <summary>
        /// 发起接口 获取流程预发起地址
        /// </summary>
        /// <param name="processCode"></param>
        /// <param name="k2Id"></param>
        /// <returns></returns>
        public string GetFormPreStartuptUrl(string processCode, string k2Id)
        {
            var processStartUrl = _processDataStorageProvider.GetProcessStartUrlByProcessCode(processCode);
            return processStartUrl.IndexOf('?') > -1 ? $"{ processStartUrl }&K2Id={ k2Id }" : $"{ processStartUrl }?K2Id={ k2Id }";
        }

        /// <summary>
        /// 获取表单查看地址
        /// </summary>
        /// <param name="formId"></param>
        /// <returns></returns>
        public string GetFormViewUrl(long formId)
        {
            var processViewUrl = _processDataStorageProvider.GetProcessViewUrl(formId);
            return processViewUrl.IndexOf('?') > -1 ? $"{ processViewUrl }&FormId={ formId }" : $"{ processViewUrl }?FormId={ formId }";
        }

        /// <summary>
        /// 获取流程发起地址 表单地址路由
        /// </summary>
        /// <param name="processCode"></param>
        /// <returns></returns>
        public string GetProcessStartuptUrl(string processCode)
        {
            var processStartuptUrl = _processDataStorageProvider.GetProcessStartUrlByProcessCode(processCode);
            processStartuptUrl = processStartuptUrl.IndexOf('?') > -1 ? processStartuptUrl.Substring(0, processStartuptUrl.IndexOf("?")) : processStartuptUrl;
            processStartuptUrl = processStartuptUrl.EndsWith("Index") ? processStartuptUrl.Substring(0, processStartuptUrl.LastIndexOf("/Index")) : processStartuptUrl;
            return processStartuptUrl;
        }

        /// <summary>
        /// Url添加K2ID
        /// </summary>
        /// <param name="url"></param>
        /// <param name="k2Id"></param>
        /// <returns></returns>
        public string UrlAddK2ID(string url, string k2Id)
        {
            return url.Contains("?") ? string.Format("{0}&K2Id={1}", url, k2Id) : string.Format("{0}?K2Id={1}", url, k2Id);
        }



        #endregion



        /// <summary>
        /// 获取流程编码
        /// 获取拆分规则匹配到的流程编码
        /// </summary>
        /// <param name="processStartInfo"></param>
        /// <returns></returns>
        private string GetSplitProcessCode(ProcessStartArgs processStartInfo)
        {
            var splitProcessCode = processStartInfo.processCode;//默认发起参数流程编码

            //查询流程编码是否有拆分
            var processSplitConfigList = _prcConfigSplitService.GetProcessSplitConfigList(processStartInfo.processCode);

            //存在拆分，则计算拆分后的流程编码
            if (processSplitConfigList.Count > 0)
            {
                //TODO:根据拆分配置规则 获取拆分配置 

            }

            return splitProcessCode;
        }

    }
}