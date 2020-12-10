using SqlSugar;
using System;

namespace KStar.Form.Domain.Logger
{
    ///<summary>
    ///
    ///</summary>
    [SugarTable("PrcServer_UserOperationLog")]
    public partial class PrcServer_UserOperationLog
    {
        public PrcServer_UserOperationLog()
        {


        }
        /// <summary>
        /// Desc:Id
        /// Default:
        /// Nullable:False
        /// </summary>           
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        public long Id { get; set; }

        /// <summary>
        /// Desc:来源（移动端 2，PC 1）
        /// Default:
        /// Nullable:True
        /// </summary>           
        public byte? Source { get; set; }

        /// <summary>
        /// Desc:类型
        /// Default:
        /// Nullable:True
        /// </summary>           
        public byte? Type { get; set; }

        /// <summary>
        /// Desc:审批类型
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string ApprovalType { get; set; }

        /// <summary>
        /// Desc:客户端IP
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string ClientIP { get; set; }

        /// <summary>
        /// Desc:流程名称
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string ProcessName { get; set; }

        /// <summary>
        /// Desc:流程编码
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string ProcessCode { get; set; }

        /// <summary>
        /// Desc:流程单号
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string Folio { get; set; }

        /// <summary>
        /// Desc:节点名称
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string ActivityName { get; set; }

        /// <summary>
        /// Desc:信息
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string Message { get; set; }

        /// <summary>
        /// Desc:用户代理
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string UserAgent { get; set; }

        /// <summary>
        /// Desc:访问Url
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string Url { get; set; }

        /// <summary>
        /// Desc:响应开始时间
        /// Default:
        /// Nullable:True
        /// </summary>           
        public DateTime? StartTime { get; set; }

        /// <summary>
        /// Desc:响应结束时间
        /// Default:
        /// Nullable:True
        /// </summary>           
        public DateTime? EndTime { get; set; }

        /// <summary>
        /// Desc:响应时间 ms
        /// Default:
        /// Nullable:True
        /// </summary>           
        public double? ResponseTime { get; set; }

        /// <summary>
        /// Desc:表单Id
        /// Default:
        /// Nullable:True
        /// </summary>           
        public long? FormId { get; set; }

        /// <summary>
        /// Desc:显示名称
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string CreateDisplayName { get; set; }

        /// <summary>
        /// Desc:操作人
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string CreateBy { get; set; }

        /// <summary>
        /// Desc:创建时间
        /// Default:
        /// Nullable:True
        /// </summary>           
        public DateTime? CreateTime { get; set; }

    }
}
