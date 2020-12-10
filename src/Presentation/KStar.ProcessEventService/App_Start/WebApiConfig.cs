using Exceptionless;
using KStar.ProcessEventService.Filter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;

namespace KStar.ProcessEventService
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API 配置和服务

            // Web API 路由
            config.MapHttpAttributeRoutes();

            // 全局异常信息处理
            config.Services.Replace(typeof(IExceptionHandler), new GlobalExceptionHandler());
            // 全局异常记录
            config.Services.Add(typeof(IExceptionLogger), new GlobalExceptionLogger());
            ExceptionlessClient.Default.RegisterWebApi(GlobalConfiguration.Configuration);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

        }
    }
}
