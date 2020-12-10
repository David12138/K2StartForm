using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.Form.Web.Areas.Portal.Models
{
    public class AuditModel
    {
        /// <summary>
        /// 用户
        /// </summary>
        public string UserAccount { get; set; }
        /// <summary>
        /// 共享用户
        /// </summary>
        public string SharedUser { get; set; }
        /// <summary>
        /// 流程ID
        /// </summary>
        public long WorkItemId { get; set; }
        /// <summary>
        /// 同意/拒绝 理由
        /// </summary>
        public string Comment { get; set; }
    }
}