using KStar.Form.Domain.ViewModels.BPMService;
using KStar.Form.Domain.ViewModels.BPMService.Requst;
using System.Web.Http.ModelBinding;

namespace KStar.BPMService.Service
{
    /// <summary>
    /// BPMSService  业务封装层
    /// </summary>
    public interface IBPMService: IService
    {
        /// <summary>
        /// 流程发起
        /// </summary>
        /// <param name="serviceInfo"></param>
        /// <param name="requestInfo">发起接口Model数据</param>
        /// <returns></returns>
        ResponseResultModel ProcessStart(BPMServiceModel serviceInfo, ProcessStartArgs requestInfo);



        #region 参数接口校验

        /// <summary>
        /// 检查请求信息
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="request"></param>
        /// <param name="langType"></param>
        /// <returns></returns>
        string CheckRequestInfo<T>(RequstModel<T> request, string langType = "");

        /// <summary>
        /// 校验class 数据 必填
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="modelState"></param>
        /// <returns></returns>
        string VerifyRequired(ModelStateDictionary modelState);

        #endregion

        #region 初始化Modle

        /// <summary>
        /// 初始化发起接口返回参数
        /// </summary>
        /// <returns></returns>
        ResultModel<ResponseResultModel> InitProcessStartResponseInfo();

        /// <summary>
        /// 初始化serviceInfo
        /// </summary>
        /// <returns></returns>
        BPMServiceModel InitBPMServiceModel();

        /// <summary>
        /// 初始化 BPMServiceInfo
        /// </summary>
        /// <param name="sourceId"></param>
        /// <param name="requestMessage"></param>
        /// <param name="k2Id"></param>
        /// <returns></returns>
        BPMServiceModel InitBPMServiceInfo(string sourceId, string requestMessage, string k2Id = "");

        #endregion

        #region 返回错误信息并记录日志

        /// <summary>
        /// 错误返回信息，并记录日志
        /// </summary>
        /// <param name="serviceInfo"></param>
        /// <param name="proStartInfo"></param>
        /// <param name="errorCodeType"></param>
        void ProStartAddErrorInfo(BPMServiceModel serviceInfo, ProcessStartArgs proStartInfo, int errorCodeType = 1);

        #endregion

    }
}