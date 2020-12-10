using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.Form.Domain.ViewModels.BPMService
{
    /// <summary>
    /// 接口基类模型
    /// </summary>
    public class BPMBaseModel
    {
        /// <summary>
        /// attr1 弹性字段 1（可选）
        /// </summary>
        public string attr1 { set; get; }
        /// <summary>
        /// attr2 弹性字段 2（可选）
        /// </summary>
        public string attr2 { set; get; }
        /// <summary>
        /// attr3 弹性字段 3（可选）
        /// </summary>
        public string attr3 { set; get; }
    }
}