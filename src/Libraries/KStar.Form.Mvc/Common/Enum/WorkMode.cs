using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Mvc.Common.Enum
{
    /// <summary>
    /// 任务状态
    /// </summary>
    public enum WorkMode
    {
        /// <summary>
        /// 查看
        /// </summary>
        View,
        /// <summary>
        /// 草稿
        /// </summary>
        Draft,
        /// <summary>
        /// 发起
        /// </summary>
        Startup,
        /// <summary>
        /// 审批
        /// </summary>
        Approval,
        /// <summary>
        /// 预发起 流程发起接口二步法
        /// </summary>
        PreStartup
    }
    public class QueryMode
    {
        /// <summary>
        /// /流程编码
        /// </summary>
        public string ProcessCode { get; set; }
        /// <summary>
        /// 表单ID
        /// </summary>
        public long FormId { get; set; }
        /// <summary>
        /// 草稿ID
        /// </summary>
        public long DraftId { get; set; }
        /// <summary>
        /// SN
        /// </summary>
        public string SN { get; set; }
        /// <summary>
        /// 任务ID
        /// </summary>
        public long WorkId { get; set; }
        /// <summary>
        /// 当前用户
        /// </summary>
        public string UserAccount { get; set; }
        /// <summary>
        /// 代理人
        /// </summary>
        public string SharedUser { get; set; }
        
        /// <summary>
        /// 访问Url
        /// </summary>
        public string Url { get; set; }
        /// <summary>
        /// 抄送Id
        /// </summary>
        public int? CcId { get; set; }
        /// <summary>
        /// token
        /// </summary>
        public string token { get; set; }

        /// <summary>
        /// 流程编号 By KStar.BPMService 流程发起接口二步法
        /// </summary>
        public string K2Id { get; set; }
    }
}
