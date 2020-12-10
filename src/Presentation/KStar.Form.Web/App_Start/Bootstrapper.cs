using Autofac;
using Autofac.Annotation;
using Autofac.Integration.Mvc;
using CacheManager.Core;
using Exceptionless;
using Exceptionless.Logging;
using KStar.Form.Domain.Logger;
using KStar.Platform.Logger;
using KStar.Platform.Service;
using System.Configuration;
using System.Reflection;
using System.Web.Mvc;
using ConfigurationBuilder = CacheManager.Core.ConfigurationBuilder;

namespace KStar.Form.Web.App_Start
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
            var cacheConfig = ConfigurationBuilder.BuildConfiguration(settings => settings.WithMaxRetries(1000).WithMemcachedCacheHandle("cacheManager/memcached"));
            var builder = new ContainerBuilder();
            //缓存注册
            builder.RegisterGeneric(typeof(BaseCacheManager<>))
               .WithParameters(new[]
               {
                    new TypedParameter(typeof(ICacheManagerConfiguration), cacheConfig)
               })
               .As(typeof(ICacheManager<>))
               .SingleInstance();
            //builder.RegisterAssemblyTypes(this.ThisAssembly)
            //.Where(t => t.IsAssignableTo<IService>())
            //.AsImplementedInterfaces()
            //.InstancePerLifetimeScope();
            ExceptionlessClient.Default.Configuration.UseInMemoryStorage();
            ExceptionlessClient.Default.Configuration.UseReferenceIds();
            ExceptionlessClient.Default.Configuration.SetDefaultMinLogLevel(MinLogLevel());
            // 日志
            builder.RegisterType<ExceptionLessLogger>().As<ILogger>().SingleInstance();
            builder.RegisterType<AuthService>().As<IAuthService>().SingleInstance();
            // 获取包含继承了IService接口类的程序集
            builder.RegisterModule<KStar.Form.Mvc.WebServiceModule>();
            builder.RegisterModule<KStar.Domain.WebServiceModule>();
            builder.RegisterModule<KStar.Form.Domain.WebServiceModule>();
            builder.RegisterModule<KStar.Platform.WebServiceModule>(); 


            // Register your MVC controllers. (MvcApplication is the name of
            // the class in Global.asax.)
            builder.RegisterControllers(Assembly.GetExecutingAssembly())
                .PropertiesAutowired()// Enable property injection
                .InstancePerLifetimeScope();

            // OPTIONAL: Register model binders that require DI.
            builder.RegisterModelBinders(typeof(MvcApplication).Assembly);
            builder.RegisterModelBinderProvider();

            // OPTIONAL: Register web abstractions like HttpContextBase.
            builder.RegisterModule<AutofacWebTypesModule>();

            // OPTIONAL: Enable property injection in view pages.
            //builder.RegisterSource(new ViewRegistrationSource());

            // OPTIONAL: Enable property injection into action filters.
            builder.RegisterFilterProvider();

            // Set the dependency resolver to be Autofac.
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
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