using Autofac;
using KStar.Platform.Logger;
using KStar.Platform.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace KStar.BPMService.Filter
{

    /// <summary>
    /// 
    /// </summary>
    public class BasicAuthenticationAttribute : ActionFilterAttribute
    {
        /// <summary>
        /// 
        /// </summary>
        public IAuthService authService { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="actionContext"></param>
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var unauthorized = actionContext.Request.CreateErrorResponse(HttpStatusCode.Unauthorized, new HttpError("Token Error"));
            var controllerName = actionContext.ControllerContext.ControllerDescriptor.ControllerName;
            var actionName = actionContext.ActionDescriptor.ActionName;
            var route = actionContext.RequestContext.RouteData.Route.RouteTemplate;

            //如果用户访问的Action带有AllowAnonymousAttribute，则不进行授权验证
            if (actionContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any())
            {
                base.OnActionExecuting(actionContext);
                return;
            }

            var token = HttpContext.Current.Request.Headers["AuthCode"];
            if (string.IsNullOrEmpty(token))
            {
                actionContext.Response = unauthorized;
                return;
            }

            var verifyResult = authService.VerifyToken(token);
            if (!verifyResult)
            {
                //如果验证不通过，则返回401错误，并且Body中写入错误原因
                actionContext.Response = unauthorized;
            }

            var verifyResource = authService.VerifyResource(controllerName, actionName, route);
            if (!verifyResource)
            {
                //如果验证不通过，则返回401错误，并且Body中写入错误原因
                var unauthorization = actionContext.Request.CreateErrorResponse(HttpStatusCode.Unauthorized, new HttpError("访问的资源未授权"));
                actionContext.Response = unauthorization;
            }

            base.OnActionExecuting(actionContext);
        }
    }

}