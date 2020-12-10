using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.Form.Domain.ViewModels.BPMService
{
    /// <summary>
    /// 响应参数 基类模型
    /// </summary>
    public class ResultModel<T>
    {
        /// <summary>
        /// 请求数据模型
        /// </summary>
        public T resultInfo { set; get; }
    }

    /// <summary>
    ///  
    /// </summary>
    public class ResponseResultModel : ResponseResultInfo
    {
        /// <summary>
        /// resultInfo 自定义模型
        /// </summary>
        public object data { set; get; }
    }

    /// <summary>
    /// 分页响应模型
    /// </summary>
    public class ResultQuery
    {
        /// <summary>
        /// 
        /// </summary>
        public int pageSize { set; get; }
        /// <summary>
        /// 
        /// </summary>
        public int currentPage { set; get; }
        /// <summary>
        /// 
        /// </summary>
        public int totalRecord { set; get; }
        /// <summary>
        /// 
        /// </summary>
        public int totalPage { set; get; }
    }
}