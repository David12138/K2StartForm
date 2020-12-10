using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Domain.ViewModels.BPMService
{
    /// <summary>
    /// 推送业务系统接口 数据模型
    /// </summary>
    public class PushBusInterfaceModel
    {
        /// <summary>
        /// K2ID(流程实例编号)
        /// </summary>
        public string k2Id { get; set; }

        /// <summary>
        /// 业务单号 业务单据唯一标识
        /// </summary>
        public string bizId { get; set; }


        /// <summary>
        /// JSON格式数据，业务数据（必填）
        /// </summary>
        public string bizData { get; set; }

        /// <summary>
        /// 节点名称
        /// </summary>
        public string activityName { get; set; }

        /// <summary>
        /// 审批结果
        /// (已提交 Submit)、(同意 Approve)、(作废 Cancel)、(重新提交 ReSubmit)、(驳回 Reject)、(审批通过 AdminFinalPass)
        /// </summary>
        public string actionResult { get; set; }

        /// <summary>
        /// 意见说明(会签时取最后一条审批意见)
        /// </summary>
        public string comment { get; set; }

        /// <summary>
        /// 标识此次请求是否为异常重试(默认0:否；1：是)
        /// 初次请求时值为0；若因网络或其他异常导致该次请求异常后，重试请求接口时值为1
        /// </summary>
        public int isRetry { get; set; } = 0;

    }
}
