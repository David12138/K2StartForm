using Newtonsoft.Json.Linq;


namespace KStar.Form.Domain.CustomExpression
{
    /// <summary>
    /// 规则上下文
    /// </summary>
    public class RuleService
    {
        /// <summary>
        /// 
        /// </summary>
        public JObject FormContent { set; get; }

        public RuleService(string bizModel)
        {
            if (!string.IsNullOrWhiteSpace(bizModel))
            {
                this.FormContent = JObject.Parse(bizModel);
            }
        }

    }

}
