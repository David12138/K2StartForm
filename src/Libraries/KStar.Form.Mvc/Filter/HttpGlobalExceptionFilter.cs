using Exceptionless;
using KStar.Form.Mvc.Models;
using KStar.Platform.Common;
using KStar.Platform.Logger;
using KStar.WorkFlow.Infrastructure;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Mvc.Filter
{
    /// <summary>
    /// 全局异常过滤器
    /// </summary>
    public class HttpGlobalExceptionFilter : FilterAttribute,IExceptionFilter
    {
        private string _Enviroment = ConfigurationManager.AppSettings["Enviroment"];//部署环境 2019-11-13 ZGH
        public ILogger log;
        public HttpGlobalExceptionFilter()
        {
            log = DependencyResolver.Current.GetService<ILogger>();
        }


        public void OnException(ExceptionContext filterContext)
        {
            Exception exception = filterContext.Exception;
            if (filterContext.ExceptionHandled == true || exception is UnauthorizedAccessException)
            {
                return;
            }
            HttpException httpException = new HttpException(null, exception);
            int code = 999;
            if (!_Enviroment.Equals(HostingEnvironment.Production.ToString(), StringComparison.OrdinalIgnoreCase))
            {
                //非生产环境显示异常信息 
                code = 998;
            }
            else
            {
                if (exception is KStarCustomException || exception is KStarWorkflowException)
                {
                    code = 998;//已处理的错误提示，不关闭页面
                }
                else if(exception is KStarFormAutoCloseException)
                {
                    code = 997;//已处理的错误提示，自动关闭页面
                }
                else if (exception is KStarCustomSimException)
                {
                    code = 996;//常规错误提示 
                }
                else if (exception is KStarFormCloseException)
                {
                    code = 995;//已处理的错误提示，点击确定关闭页面
                }
            }
            var content = Newtonsoft.Json.JsonConvert.SerializeObject(new ResponseMode { code = code, message = filterContext.Exception.Message, logId = ExceptionlessClient.Default.GetLastReferenceId() });
            if (httpException != null && (httpException.GetHttpCode() == (int)HttpStatusCode.BadRequest || httpException.GetHttpCode() == (int)HttpStatusCode.NotFound))
            {
                filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                filterContext.Result = new ContentResult { Content = content };
                //filterContext.HttpContext.Response.WriteFile("~/HttpError/404.html");
            }
            else
            {
                filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                filterContext.Result = new ContentResult { Content = content };
                //filterContext.HttpContext.Response.WriteFile("~/HttpError/500.html");
            }
            log.Error(filterContext.Exception);
            filterContext.ExceptionHandled = true;
            filterContext.HttpContext.Response.Clear();
            filterContext.HttpContext.Response.TrySkipIisCustomErrors = true;
        }
    }
}
