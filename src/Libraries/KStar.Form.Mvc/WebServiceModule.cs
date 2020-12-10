using Autofac;
using Autofac.Annotation;
using KStar.Form.Mvc.Common.Attributes;
using KStar.Form.Mvc.Common.Tools;
using KStar.Form.Mvc.Form;
using KStar.Platform;
using System.Linq;

namespace KStar.Form.Mvc
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

            #region 表单逻辑注入
            this.ThisAssembly.GetTypes()
            .Where(t => t.GetInterfaces().Contains(typeof(IFormLogicService)) && t.Name != "FormLogicBaseService").ToList()
            .ForEach(type =>
            {
                builder.RegisterType(type).Named<IFormLogicService>(type.GetCustomAttributeValue<KStarFormLogicAttribute>(x => x.ProcessCode)).InstancePerDependency();
            });
            builder.RegisterModule(new AutofacAnnotationModule(typeof(KStar.Form.Mvc.Form.KStarFormHandleService).Assembly));
            //如果需要开启支持循环注入
            //builder.RegisterModule(new AutofacAnnotationModule(typeof(AnotationTest).Assembly).SetAllowCircularDependencies(true));
            #endregion
        }
    }
}
