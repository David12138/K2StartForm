using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace KStar.BPMService.ActionFilters
{

    /// <summary>
    ///  action 过滤属性
    /// </summary>
    public class ActionHeaderFilterAttribute : ActionFilterAttribute, IActionFilter
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="actionContext"></param>
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            //var ignoreEsbKey = System.Configuration.ConfigurationManager.AppSettings["IgnoreEsbKey"] + string.Empty; ; //是否 忽略 总线ESB Key 
            //if (!string.IsNullOrWhiteSpace(ignoreEsbKey) && ignoreEsbKey == "1")
            //{
            //    return;
            //}

            //var headers = actionContext.Request.Headers;
            //string headerEsbKey = string.Empty;
            //try
            //{
            //    var headerEsbInfo = headers.GetValues("esbkey").ToList();
            //    if (headerEsbInfo.Count > 0)
            //    {
            //        headerEsbKey = headerEsbInfo[0];
            //    }
            //}
            //catch (Exception ex)
            //{
            //    actionContext.Response = new HttpResponseMessage(HttpStatusCode.Forbidden);
            //    return;
            //}

            //string esbkey = System.Configuration.ConfigurationManager.AppSettings["esbkey"] + string.Empty;
            //if (string.IsNullOrWhiteSpace(esbkey))
            //{
            //    actionContext.Response = new HttpResponseMessage(HttpStatusCode.Forbidden);
            //    return;
            //}

            //if (headerEsbKey != esbkey)
            //{
            //    actionContext.Response = new HttpResponseMessage(HttpStatusCode.Forbidden);
            //    return;
            //}
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="actionExecutedContext"></param>
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {

        }
    }

}