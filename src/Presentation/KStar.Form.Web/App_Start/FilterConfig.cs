using KStar.Form.Mvc.Filter;
using System.Web.Mvc;

namespace KStar.Form.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HttpGlobalExceptionFilter());
            //filters.Add(new HandleErrorAttribute());
            filters.Add(new OperationLogFilter());
        }
    }
}
