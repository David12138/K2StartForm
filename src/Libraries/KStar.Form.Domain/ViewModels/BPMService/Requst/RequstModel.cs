using KStar.Form.Domain.ViewModels.BPMService;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace KStar.Form.Domain.ViewModels.BPMService.Requst
{
    /// <summary>
    /// 请求参数
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class RequstModel<T>
    {
        /// <summary>
        /// 请求参数
        /// </summary>
        [Required]
        public T requestInfo { set; get; }
    }


    /// <summary>
    /// 请求参数模型 基类Modle
    /// </summary>
    public class RequstBaseModel: BPMBaseModel
    {
        /// <summary>
        /// 系统来源
        /// </summary>
        [Required]
        public string sourceId { set; get; }

    }

    /// <summary>
    /// 分页请求模型
    /// </summary>
    public class RequstQuery
    {
        /// <summary>
        /// 页大小
        /// </summary>
        public int pageSize { set; get; }
        /// <summary>
        /// 第几页 
        /// </summary>
        public int currentPage { set; get; }
    }

}