using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Exceptionless;
using Exceptionless.Logging;
using KStar.BPMService.Logger;
using KStar.Platform.Logger;
using KStar.Platform.Service;
using System.Configuration;
using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;

namespace KStar.BPMService.App_Start
{
    /// <summary>
    /// 
    /// </summary>
    public class Bootstrapper
    {
        /// <summary>
        /// 负责调用autofac框架实现业务逻辑层和数据仓储层程序集中的类型对象的创建
        /// 负责创建MVC控制器类的对象(调用控制器中的有参构造函数),接管DefaultControllerFactory的工作
        /// </summary>
        public static void Register()
        {

            var builder = new ContainerBuilder();
            #region Mvc Register
            ExceptionlessClient.Default.Configuration.UseInMemoryStorage();
            ExceptionlessClient.Default.Configuration.UseReferenceIds();
            ExceptionlessClient.Default.Configuration.SetDefaultMinLogLevel(MinLogLevel());
            // 日志
            builder.RegisterType<ExceptionLessLogger>().As<ILogger>().SingleInstance();

            builder.RegisterType<AuthService>().As<IAuthService>().SingleInstance();




            // 获取包含继承了IService接口类的程序集
            builder.RegisterModule<KStar.Platform.WebServiceModule>();
            builder.RegisterModule<KStar.Domain.WebServiceModule>();
            builder.RegisterModule<KStar.Form.Domain.WebServiceModule>();
            builder.RegisterModule<KStar.BPMService.WebServiceModule>();

            

            builder.RegisterControllers(Assembly.GetExecutingAssembly())
                .PropertiesAutowired()
                .InstancePerLifetimeScope();

            // OPTIONAL: Register model binders that require DI.
            builder.RegisterModelBinders(typeof(WebApiApplication).Assembly);
            builder.RegisterModelBinderProvider();

            // OPTIONAL: Register web abstractions like HttpContextBase.
            builder.RegisterModule<AutofacWebTypesModule>();

            builder.RegisterFilterProvider();
            #endregion

            #region WebApi Register
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly())
                .PropertiesAutowired()
                .InstancePerLifetimeScope();
            builder.RegisterWebApiFilterProvider(GlobalConfiguration.Configuration);
            builder.RegisterWebApiModelBinderProvider();
            #endregion


            // Set the dependency resolver to be Autofac.
            var container = builder.Build();
            //Set the dependency resolver for Web API.
            var webApiResolver = new AutofacWebApiDependencyResolver(container);
            GlobalConfiguration.Configuration.DependencyResolver = webApiResolver;

            // Set the dependency resolver for MVC.
            var resolver = new AutofacDependencyResolver(container);
            DependencyResolver.SetResolver(resolver);


        }
        /// <summary>
        /// 根据配置获取最小的日志级别
        /// </summary>
        /// <returns></returns>
        public static LogLevel MinLogLevel()
        {
            var minLogLevel = ConfigurationManager.AppSettings["MinLogLevel"].ToString();
            if (!string.IsNullOrEmpty(minLogLevel))
            {
                switch (minLogLevel)
                {
                    case "Other":
                        return LogLevel.Other;
                    case "Trace":
                        return LogLevel.Trace;
                    case "Debug":
                        return LogLevel.Debug;
                    case "Info":
                        return LogLevel.Info;
                    case "Warn":
                        return LogLevel.Warn;
                    case "Error":
                        return LogLevel.Error;
                    case "Fatal":
                        return LogLevel.Fatal;
                    case "Off":
                        return LogLevel.Off;
                    default:
                        return LogLevel.Trace;
                }
            }
            return LogLevel.Trace;
        }
    }
}