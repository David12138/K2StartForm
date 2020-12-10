using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.Form.Web.Areas.Portal.Models
{
    public class MyCCModel: CriteriaModel
    {
        
        /// <summary>
        /// 当前处理人
        /// </summary>
        public string CurrentUser { get; set; }
        /// <summary>
        /// 流程状态
        /// </summary>
        public int? ProcessStatus { get; set; }
        /// <summary>
        /// 填单人账号
        /// </summary>
        public string SubmitterAccount { get; set; }
        /// <summary>
        /// 抄送人 账号
        /// </summary>
        public string FormCCUserAccount { get; set; }
        /// <summary>
        /// 抄送时间 开始
        /// </summary>
        public DateTime? CcStartDate { get; set; }
        /// <summary>
        /// 抄送时间 结束
        /// </summary>
        public DateTime? CcEndDate { get; set; }
        /// <summary>
        /// 审阅时间 开始
        /// </summary>
        public DateTime? ApproveStartDate { get; set; }
        /// <summary>
        /// 审阅时间 结束
        /// </summary>
        public DateTime? ApproveEndDate { get; set; }
        /// <summary>
        /// 流程结束时间  开始
        /// </summary>
        public DateTime? FinishStartDate { get; set; }
        /// <summary>
        /// 流程结束时间  结束
        /// </summary>
        public DateTime? FinishEndDate { get; set; }
        /// <summary>
        /// 处理状态 待阅 已阅
        /// </summary>
        public int? ReaderStatus { get; set; }
       
    }
}