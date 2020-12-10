using KStar.Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.BPMService.Models
{
    /// <summary>
    /// 流程发起接口需要计算的数据信息
    /// </summary>
    public class ProcessStartInfo
    {
        /// <summary>
        /// 业务Id
        /// </summary>           
        public string BizId { get; set; }
        /// <summary>
        /// 申请人ID
        /// </summary>           
        public string ApplyUserCode { get; set; }
        /// <summary>
        /// Desc:发起人ID
        /// </summary>           
        public string StartUserCode { get; set; }
        /// <summary>
        /// 流程标题
        /// </summary>           
        public string Folio { get; set; }
        /// <summary>
        /// 流程编码
        /// </summary>
        public string ProcessCode { set; get; }
        /// <summary>
        /// 业务数据
        /// </summary>
        public string BizData { set; get; }

        /// <summary>
        /// K2ID(流程实例编号)
        /// </summary>
        public string K2ID { set; get; }
        /// <summary>
        /// 表单ID
        /// </summary>           
        public long FormId { get; set; }
        /// <summary>
        /// 拆分后的流程编码
        /// </summary>
        public string SplitProcessCode { set; get; }

    }
}