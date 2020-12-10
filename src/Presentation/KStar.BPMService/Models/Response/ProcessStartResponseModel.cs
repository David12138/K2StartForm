using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.BPMService.Models.Response
{
    /// <summary>
    /// 流程发起、重新发起接口 响应模型
    /// </summary>
    public class ProcessStartResponseModel
    {
        /// <summary>
        /// 表单唯一标识
        /// </summary>
        public string k2Id { set; get; }
        /// <summary>
        /// 表单打开地址
        /// </summary>
        public string formUrl { set; get; }
    }
}