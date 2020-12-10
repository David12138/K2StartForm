using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Domain.ViewModels
{
    /// <summary>
    /// 表单基类模型
    /// </summary>
    public class BaseFormModel
    {
        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 系统来源编号
        /// </summary>
        public string SourceId { get; set; }

        /// <summary>
        /// 流程角色信息 供流程角色使用(解析器后)
        /// </summary>
        public string FlowRoleInfo { get; set; }

        /// <summary>
        /// 流程角色信息 影响流程走向(解析器前)
        /// </summary>
        public string FlowRoleInfoDataFields { get; set; }

        /// <summary>
        /// 业务系统表单数据(json格式)
        /// </summary>
        public string BizModel { get; set; }

        /// <summary>
        /// 业务字段集合
        /// </summary>
        public string BizDataFields { get; set; }

        /// <summary>
        /// 线规则字段集合
        /// </summary>
        public string DataFields { get; set; }

        /// <summary>
        /// 外部业务表单Url
        /// </summary>
        public string BizFormUrl { get; set; }

    }
}
