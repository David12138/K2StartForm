using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.Form.Domain.ViewModels.BPMService
{
    /// <summary>
    /// BPM接口固定的响应信息
    /// </summary>
    public class ResponseResultInfo : BPMBaseModel
    {
        /// <summary>
        /// 接口日志记录id（方便查找日志,建议调用方记录此Id） 
        /// </summary>
        public string logId { set; get; }
        /// <summary>
        /// 接口返回状态：200（成功）/ 500（错误）
        /// </summary>
        public int returnStatus { set; get; } = 200;
        /// <summary>
        /// 接口返回代码，成功：A0001 失败：E0001 
        /// </summary>
        public string returnCode { set; get; } = "A0001";
        /// <summary>
        /// 接口返回信息 
        /// </summary>
        public string returnMsg { set; get; } = "调用成功";
    }
}