using KStar.Form.Domain.Attribute;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace KStar.Form.Domain.ViewModels.BPMService.Requst
{
    /// <summary>
    /// 流程发起 接口参数
    /// </summary>
    public class ProcessStartArgs : RequstBaseModel
    {
        /// <summary>
        /// 流程编码
        /// </summary>
        [Required]
        public string processCode { set; get; }

        /// <summary>
        /// 业务系统唯一标识
        /// </summary>
        [Required]
        public string bizId { set; get; }

        /// <summary>
        /// 发起模式（默认值为default）
        /// default:不需要弹出确认页面，直接发起流程
        /// confirm:需要弹出确认页面进行确认
        /// </summary>
        public string startMode { set; get; } = "default";

        /// <summary>
        /// 流程主题
        /// </summary>
        [Required]
        public string folio { set; get; }

        /// <summary>
        /// 业务数据（json格式）
        /// 方案三：{\"bizFormUrl\":\"http://baidu.com\",\"Amount\":5000}
        /// </summary>
        [Required]
        public string bizData { set; get; }

        /// <summary>
        /// 申请人ID
        /// </summary>
        [Required]
        [Custom(Function = "UserCode")]
        public string applyUserCode { set; get; }
        /// <summary>
        /// 申请人部门编码
        /// </summary>
        [Custom(Function = "DeptCode")]
        public string applyDeptCode { set; get; }

        /// <summary>
        /// 发起人ID
        /// </summary>
        [Required]
        [Custom(Function = "UserCode")]
        public string startUserCode { set; get; }
        /// <summary>
        /// 发起人部门编码
        /// </summary>
        [Custom(Function = "DeptCode")]
        public string startDeptCode { set; get; }

    }
}