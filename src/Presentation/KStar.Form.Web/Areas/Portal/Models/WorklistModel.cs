using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.Form.Web.Areas.Portal.Models
{
    public class WorklistModel
    {

        /// <summary>
        /// 流程编号
        /// </summary>
        public string ProcessNum { get; set; }
        /// <summary>
        /// 流程主题
        /// </summary>
        public string FormSubject { get; set; }
        /// <summary>
        /// 申请人
        /// </summary>
        public string Originator { get; set; }
        /// <summary>
        /// 申请时间  开始
        /// </summary>
        public DateTime? SubmitStartDate { get; set; }
        /// <summary>
        /// 申请时间  结束
        /// </summary>
        public DateTime? SubmitEndDate { get; set; }
        /// <summary>
        /// 流程名称
        /// </summary>
        public List<string> ProcessCode { get; set; } = new List<string>();
        /// <summary>
        /// 流程类别
        /// </summary>
        public List<Guid> ProcessCategory { get; set; } = new List<Guid>();
        /// <summary>
        /// 申请人 部门
        /// </summary>
        public string DepartmentId { get; set; }
        /// <summary>
        /// 排序字段
        /// </summary>
        public string SortField { get; set; }
        /// <summary>
        ///  排序方式 asc or desc
        /// </summary>
        public string SortDirection { get; set; }
        /// <summary>
        /// 当前页码
        /// </summary>
        public int PageIndex { get; set; } = 1;
        /// <summary>
        /// 页面码大小
        /// </summary>
        public int PageSize { get; set; } = 10;
    }
}