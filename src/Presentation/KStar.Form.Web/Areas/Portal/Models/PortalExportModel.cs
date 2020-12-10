using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.Form.Web.Areas.Portal.Models
{
    /// <summary>
    /// 我的待办导出 数据模型
    /// </summary>
    public class MyPendingTaskModel
    {
        /// <summary>
        /// 流程单号
        /// </summary>           
        public string Folio { get; set; }

        /// <summary>
        /// 流程主题
        /// </summary>           
        public string FormSubject { get; set; }

        /// <summary>
        ///  申请人 显示名称
        /// </summary>           
        public string ApplicantDisplayName { get; set; }

        /// <summary>
        /// 节点显示名称
        /// </summary>           
        public string ActivityDisplayName { get; set; }

        /// <summary>
        /// 流程开始时间
        /// </summary>           
        public string SubmitDate { get; set; }

        /// <summary>
        /// 等待时长
        /// </summary>
        public string WaittingTime { get; set; }
    }

    /// <summary>
    /// 我的已办导出 数据模型
    /// </summary>
    public class MyInvolvedModel
    {
        /// <summary>
        /// 流程单号
        /// </summary>           
        public string Folio { get; set; }

        /// <summary>
        /// 流程主题
        /// </summary>           
        public string FormSubject { get; set; }

        /// <summary>
        ///  申请人 显示名称
        /// </summary>           
        public string ApplicantDisplayName { get; set; }

        /// <summary>
        /// 当前处理人
        /// </summary>           
        public string ApprovalUsers { get; set; }

        /// <summary>
        /// 流程开始时间
        /// </summary>           
        public string SubmitDate { get; set; }

        /// <summary>
        /// 处理时间
        /// </summary>           
        public string ProcessingDate { get; set; }

        /// <summary>
        /// 流程结束时间
        /// </summary>           
        public string FinishDate { get; set; }

        /// <summary>
        /// 状态显示名称
        /// </summary>
        public string StatusName { get; set; }
    }

    /// <summary>
    /// 我的申请导出 数据模型
    /// </summary>
    public class MyApplicationExportModel
    {
        /// <summary>
        /// 流程单号
        /// </summary>           
        public string Folio { get; set; }

        /// <summary>
        /// 流程主题
        /// </summary>           
        public string FormSubject { get; set; }

        /// <summary>
        ///  申请人 显示名称
        /// </summary>           
        public string ApplicantDisplayName { get; set; }

        ///// <summary>
        ///// 当前环节
        ///// </summary>           
        //public string ActivityDisplayName { get; set; }

        /// <summary>
        /// 当前处理人
        /// </summary>           
        public string ApprovalUsers { get; set; }

        /// <summary>
        /// 流程开始时间
        /// </summary>           
        public string SubmitDate { get; set; }

        /// <summary>
        /// 流程结束时间
        /// </summary>           
        public string FinishDate { get; set; }

        /// <summary>
        /// 状态显示名称
        /// </summary>
        public string StatusName { get; set; }

    }

    /// <summary>
    /// 我的待阅导出 数据模型
    /// </summary>
    public class MyToDoReadExportModel
    {
        /// <summary>
        /// 流程单号
        /// </summary>           
        public string Folio { get; set; }

        /// <summary>
        /// 流程主题
        /// </summary>           
        public string FormSubject { get; set; }

        /// <summary>
        ///  申请人 显示名称
        /// </summary>           
        public string ApplicantDisplayName { get; set; }
        
        /// <summary>
        /// 当前处理人
        /// </summary>           
        public string ApprovalUsers { get; set; }

        /// <summary>
        /// 传阅人
        /// </summary>
        public string OriginatorName { get; set; }

        /// <summary>
        /// 传阅时间
        /// </summary>
        public string ReceiverDate { get; set; }

        /// <summary>
        /// 状态显示名称
        /// </summary>
        public string StatusName { get; set; }

    }

    /// <summary>
    /// 我的已阅导出 数据模型
    /// </summary>
    public class MyReadExportModel
    {
        /// <summary>
        /// 流程单号
        /// </summary>           
        public string Folio { get; set; }

        /// <summary>
        /// 流程主题
        /// </summary>           
        public string FormSubject { get; set; }

        /// <summary>
        ///  申请人 显示名称
        /// </summary>           
        public string ApplicantDisplayName { get; set; }

        /// <summary>
        /// 当前处理人
        /// </summary>           
        public string ApprovalUsers { get; set; }

        /// <summary>
        /// 抄送处理时间 | 阅读时间
        /// </summary>
        public string ReceiverEndDate { get; set; }

        /// <summary>
        /// 传阅人
        /// </summary>
        public string OriginatorName { get; set; }

        /// <summary>
        /// 传阅时间
        /// </summary>
        public string ReceiverDate { get; set; }

        /// <summary>
        /// 状态显示名称
        /// </summary>
        public string StatusName { get; set; }

    }

}