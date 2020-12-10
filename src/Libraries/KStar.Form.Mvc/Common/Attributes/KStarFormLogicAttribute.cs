using System;

namespace KStar.Form.Mvc.Common.Attributes
{
    /// <summary>
    /// 标记业务逻辑  
    /// </summary>
    [AttributeUsage(AttributeTargets.Class)]
    public class KStarFormLogicAttribute : Attribute
    {
        /// <summary>
        /// 需要处理哪个流程的业务
        /// </summary>
        /// <param name="processCode">流程编码</param>
        public KStarFormLogicAttribute(string processCode)
        {
            ProcessCode = processCode;
        }
        public string ProcessCode { get; }
    }
}
