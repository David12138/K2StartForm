using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.Form.Web.Areas.Portal.Models
{
    public class InvolvedProcessModel : CriteriaModel
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
        /// 流程处理时间  开始
        /// </summary>
        public DateTime? ProcessingStartDate { get; set; }
        /// <summary>
        /// 流程处理时间  结束
        /// </summary>
        public DateTime? ProcessingEndDate { get; set; }
        /// <summary>
        /// 流程结束时间  开始
        /// </summary>
        public DateTime? FinishStartDate { get; set; }
        /// <summary>
        /// 流程结束时间  结束
        /// </summary>
        public DateTime? FinishEndDate { get; set; }
    }
}