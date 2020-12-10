using KStar.Platform.Logger;
using System.Web.Mvc;
namespace KStar.Form.Mvc.Filter
{
    /// <summary>
    /// 操作日志
    /// </summary>
    public class OperationLogFilter : ActionFilterAttribute
    {
        public ILogger log;
        public OperationLogFilter()
        {
            log = DependencyResolver.Current.GetService<ILogger>();
        }
        /// <summary>
        /// 方法执行后进行的操作
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            var con = filterContext.Controller as Controller;
            var controllerName = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;
            var actionName = filterContext.ActionDescriptor.ActionName;

            //var proejctName = ConfigurationManager.AppSettings["ProjectName"] as string;
            //拿到包含注释的xml文档
            //var xml = XDocument.Load(con.Server.MapPath(@"~/bin/KStar.Web.xml"));
            ////拿到方法上的注释
            ////拿到方法上的注释没有参数的方法没有(括号
            //var summary = (from member in xml.Elements("doc").Elements("members").Elements("member") where member.Attribute("name").Value.ToString().Contains("." + controllerName + "Controller." + actionName + "(") select member.Element("summary").Value).FirstOrDefault() ??
            //             (from member in xml.Elements("doc").Elements("members").Elements("member") where member.Attribute("name").Value.ToString().Contains("." + controllerName + "Controller." + actionName) select member.Element("summary").Value).FirstOrDefault();

            string des = $"{controllerName}/{actionName}";
            log.FeatureUsage(des);
        }
    }
}
