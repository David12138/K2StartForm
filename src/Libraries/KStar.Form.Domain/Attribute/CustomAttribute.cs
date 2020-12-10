using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.Form.Domain.Attribute
{
    /// <summary>
    /// 自定义必填属性
    /// </summary>
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Class, Inherited = true)]
    public class CustomAttribute : System.Attribute
    {
        /// <summary>
        /// 
        /// </summary>
        public CustomAttribute()
        {

        }

        private bool _required;
        /// <summary>
        /// 是否必填
        /// </summary>
        public bool Required
        {
            get { return _required; }
            set { _required = value; }
        }

        private string _function;
        /// <summary>
        /// 数据校验方法
        /// </summary>
        public string Function
        {
            get { return _function; }
            set { _function = value; }
        }
    }


}