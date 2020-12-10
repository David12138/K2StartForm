using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.BPMService.Models.Response
{

    /// <summary>
    /// 
    /// </summary>
    public class SubmitResponseModel
    {
        /// <summary>
        /// 200 代表成功（默认）
        /// 其他值 代表失败
        /// </summary>
        public int Code { get; set; } = 200;
        /// <summary>
        /// 
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// 不带分页 data = res
        /// </summary>
        public SubmitResultMessage Data { get; set; }
        /// <summary>
        /// LogId
        /// </summary>
        public string LogId { get; set; }
    }

    /// <summary>
    /// 表单提交 响应消息模型
    /// </summary>
    public class SubmitResultMessage
    {
        /// <summary>
        /// 提交是否成功
        /// </summary>
        public bool Item1 { get; set; }
        /// <summary>
        /// 表单ID
        /// </summary>
        public long Item2 { get; set; }
        /// <summary>
        /// 流程实例编码
        /// </summary>
        public string Item3 { get; set; }
    }

}