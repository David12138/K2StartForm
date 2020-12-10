using Autofac;
using System.Linq;

namespace KStar.Form.Domain
{
    public class WebServiceModule : Module
    {
        /// <summary>
        /// 关于生命周期
        /// InstancePerDependency  瞬时,服务对于每次请求都会返回单独的实例
        /// InstancePerLifetimeScope 基于线程或者请求的单例
        /// SingleInstance  单例..整个项目公用一个
        /// InstancePerRequest 针对MVC的,或者说是ASP.NET的..每个请求单例
        /// </summary>
        /// <param name="builder"></param>
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(this.ThisAssembly)
                .Where(t => t.IsAssignableTo<IService>())
                .PropertiesAutowired()
                .AsImplementedInterfaces()
                .InstancePerRequest();
        }
    }
}
