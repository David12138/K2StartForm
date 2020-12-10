using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.BPMService.Models
{
    /// <summary>
    /// 发起接口请求参数
    /// </summary>
    public class RequestInfo
    {
        /// <summary>
        /// 流程编码
        /// </summary>
        public string processCode { get; set; }
        /// <summary>
        /// 系统来源
        /// </summary>
        public string sourceId { get; set; }
        /// <summary>
        /// 业务数据唯一标识
        /// </summary>
        public string bizId { get; set; }
        /// <summary>
        /// 申请人
        /// </summary>
        public string applyUserCode { get; set; }
        /// <summary>
        /// 申请人岗位编码
        /// </summary>
        public string applyPositonCode { get; set; }
        /// <summary>
        /// 发起人
        /// </summary>
        public string startUserCode { get; set; }
        /// <summary>
        /// 发起人岗位编码
        /// </summary>
        public string startPositionCode { get; set; }
        /// <summary>
        /// 流程主题
        /// </summary>
        public string formSubject { get; set; }
        /// <summary>
        /// 业务系统表单数据
        /// </summary>
        public string bizModel { get; set; }
        /// <summary>
        /// 扩展字段1
        /// </summary>
        public string attr1 { get; set; }
        /// <summary>
        /// 扩展字段2
        /// </summary>
        public string attr2 { get; set; }
        /// <summary>
        /// 扩展字段3
        /// </summary>
        public string attr3 { get; set; }
    }
    /// <summary>
    /// 发起接口返回参数
    /// </summary>
    public class ResultInfo
    {
        /// <summary>
        /// 流程实例编号
        /// </summary>
        public string Folio { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public long FormID { get; set; }
        /// <summary>
        /// 发起地址
        /// </summary>
        public string FormUrl { get; set; }
        /// <summary>
        /// 接口返回代码
        /// </summary>
        public string ReturnCode { get; set; }
        /// <summary>
        /// 接口返回信息
        /// </summary>
        public string ReturnMsg { get; set; }


    }

}