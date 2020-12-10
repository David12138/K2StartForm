using KStar.BPMService.Models;
using KStar.Domain.ViewModels;
using KStar.Form.Domain.ViewModels.BPMService.Requst;

namespace KStar.BPMService.Service
{
    /// <summary>
    /// BPM接口业务逻辑处理
    /// </summary>
    public interface IProcessBusService : IService
    {
        /// <summary>
        /// 获取流程发起信息
        /// </summary>
        /// <param name="startInfo"></param>
        /// <returns></returns>
        (ResponseModel ResultInfo, ProcessStartInfo ProStartInfo) GetProcessStartInfo(ProcessStartArgs startInfo);


        #region  获取表单地址

        /// <summary>
        /// 发起接口 获取流程预发起地址
        /// </summary>
        /// <param name="processCode"></param>
        /// <param name="k2Id"></param>
        /// <returns></returns>
        string GetFormPreStartuptUrl(string processCode, string k2Id);

        /// <summary>
        /// 获取表单查看地址
        /// </summary>
        /// <param name="formId"></param>
        /// <returns></returns>
        string GetFormViewUrl(long formId);

        /// <summary>
        /// 获取流程发起地址 表单地址路由
        /// </summary>
        /// <param name="processCode"></param>
        /// <returns></returns>
        string GetProcessStartuptUrl(string processCode);


        /// <summary>
        /// Url添加K2ID
        /// </summary>
        /// <param name="url"></param>
        /// <param name="k2Id"></param>
        /// <returns></returns>
        string UrlAddK2ID(string url, string k2Id);

        #endregion


    }
}