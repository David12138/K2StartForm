using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Mvc.Models
{
    /// <summary>
    /// 通用返回数据Model
    /// </summary>
    public class ResponseMode
    {
        /// <summary>
        /// 200 代表成功（默认）
        /// 其他值 代表失败
        /// </summary>
        public int code { get; set; } = 200;
        /// <summary>
        /// 
        /// </summary>
        public string message { get; set; }
        /// <summary>
        /// 不带分页 data = res
        /// 分页数据 data = new { total = res.TotalCount, item = res.Items }
        /// </summary>
        public object data { get; set; }
        /// <summary>
        /// LogId
        /// </summary>
        public string logId { get; set; }

    }
}
