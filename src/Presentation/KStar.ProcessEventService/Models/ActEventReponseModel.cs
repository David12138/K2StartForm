using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.ProcessEventService.Models
{
    /// <summary>
    /// 审批行为验证事件传参对象 2019-11-27 ZGH
    /// </summary>
    public class ActEventReponseModel
    {
        /// <summary>
        /// K2ID
        /// </summary>
        public string k2Id { get; set; }
        /// <summary>
        /// 系统编号
        /// </summary>
        public string sourceId { get; set; }
        /// <summary>
        /// 审批行为：ApproverTypeEnum.ToString()
        /// </summary>
        public string approverType { get; set; }
        /// <summary>
        /// 业务单据号
        /// </summary>
        public string bizId { get; set; }
        /// <summary>
        /// 流程编码
        /// </summary>
        public string processCode { get; set; }
        /// <summary>
        /// K2表单查看地址
        /// </summary>
        public string formUrl { get; set; }
        /// <summary>
        /// 业务表单数据
        /// </summary>
        public string bizModel { get; set; }
        /// <summary>
        /// 业务系统数据
        /// </summary>
        public string bizDataFields { get; set; }
        /// <summary>
        /// 审批人员工编码
        /// </summary>
        public string approverUserCode { get; set; }
        /// <summary>
        /// 当前审批环节名称
        /// </summary>
        public string activityName { get; set; }
        /// <summary>
        /// 流程附件记录 2020-01-06 ZGH
        /// </summary>
        public string formAttachments { get; set; }
        /// <summary>
        /// 流程审批记录 2020-01-06 ZGH
        /// </summary>
        public string formApprovalHistorys { get; set; }
        /// <summary>
        /// 流程信息 2020-01-06 ZGH
        /// </summary>
        public string formDataToJson { get; set; }
        /// <summary>
        /// 备用字段1
        /// </summary>
        public string attr1 { get; set; }
        /// <summary>
        /// 备用字段2
        /// </summary>
        public string attr2 { get; set; }
        /// <summary>
        /// 备用字段3
        /// </summary>
        public string attr3 { get; set; }
    }
    /// <summary>
    /// 表单附件信息 2020-01-06 ZGH
    /// </summary>
    public class FormAttachmentModel
    {
        /// <summary>
        /// 文件下载ID
        /// </summary>
        public long FileId { get; set; }
        /// <summary>
        /// 上传文件节点名称
        /// </summary>
        public string ActDisplayName { get; set; }
        /// <summary>
        /// 上传文件人
        /// </summary>
        public  string UploaderUser { get; set; }
        /// <summary>
        /// 文件名称
        /// </summary>
        public string FileName { get; set; }

    } 
    /// <summary>
    /// 表单审批记录 2020-01-06 ZGH
    /// </summary>
    public class FormApprovalHistoryModel
    {
        /// <summary>
        /// 审批节点
        /// </summary>
        public string ActivityName { get; set; }
        /// <summary>
        /// 审批人
        /// </summary>
        public string UserDisplayName { get; set; }
        /// <summary>
        /// 审批行为
        /// </summary>
        public string ActionName { get; set; }
        /// <summary>
        /// 审批意见
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// 审批时间
        /// </summary>
        public string CreateTime { get; set; }
    }
}