using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.Form.Web.Areas.Portal.Models
{
    public class ProcessQueryModel : CriteriaModel
    {
        /// <summary>
        /// 当前处理人
        /// </summary>
        public string CurrentUser { get; set; }
        /// <summary>
        /// 流程结束时间  开始
        /// </summary>
        public DateTime? FinishStartDate { get; set; }
        /// <summary>
        /// 流程结束时间  结束
        /// </summary>
        public DateTime? FinishEndDate { get; set; }
        /// <summary>
        /// 流程状态
        /// </summary>
        public int? ProcessStatus { get; set; }
        /// <summary>
        /// 授权人
        /// </summary>
        public string delegationUser { get; set; }

    }
}