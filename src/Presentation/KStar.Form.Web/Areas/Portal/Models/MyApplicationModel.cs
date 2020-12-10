using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.Form.Web.Areas.Portal.Models
{
    public class MyApplicationModel: CriteriaModel
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
        /// 填单人
        /// </summary>
        public string SubmitterAccount { get; set; }
        /// <summary>
        /// 流程结束时间  开始
        /// </summary>
        public DateTime? FinishStartDate { get; set; }
        /// <summary>
        /// 流程结束时间  结束
        /// </summary>
        public DateTime? FinishEndDate { get; set; }

        /// <summary>
        /// 是否代我申请的
        /// </summary>
        public int ApplyType { get; set; }
    }
}