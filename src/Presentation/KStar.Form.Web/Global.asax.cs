using Exceptionless;
using Hangfire;
using KStar.Form.Mvc.Common.Tools;
using KStar.Form.Web.App_Start;
using System;
using System.Security.Principal;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;

namespace KStar.Form.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            Hangfire.GlobalConfiguration.Configuration.UseSqlServerStorage("JobsStore");

            #region AutoFac
            Bootstrapper.Register();
            #endregion

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            AutoMapperConfig.Mappings.RegisterMappings();
            //启动日志处理程序
            Domain.Logger.DbLogManager.Start();

            //接受证书，无论对错
            System.Net.ServicePointManager.ServerCertificateValidationCallback = (sender, cert, chain, error) =>
            {
                return true;
            };

            //移除所有视图引擎
            ViewEngines.Engines.Clear();
            //添加Razor视图引擎
            ViewEngines.Engines.Add(new RazorViewEngine());
        }
        protected void Application_End(object sender, EventArgs e)
        {
            //不是每次请求都调用
            //在应用程序关闭时运行的代码，在最后一个HttpApplication销毁之后执行
            //比如IIS重启，文件更新，进程回收导致应用程序转换到另一个应用程序域

            //关闭日志处理程序
            Domain.Logger.DbLogManager.Stop();
        }


        protected void Application_Error(object sender, EventArgs e)
        {
            //不是每次请求都调用
            //所有没有处理的错误都会导致这个方法的执行
            Exception lastError = Server.GetLastError();
            ExceptionlessClient.Default.CreateException(lastError).AddTags("Application_Error").Submit();
        }
        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            HttpCookie decryptedCookie =
                Context.Request.Cookies[FormsAuthentication.FormsCookieName];
            if (decryptedCookie != null)
            {
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(decryptedCookie.Value);
                var identity = new GenericIdentity(ticket.Name);
                var roles = ticket.UserData.Split(',');
                var principal = new GenericPrincipal(identity, roles);
                HttpContext.Current.User = principal;
                Thread.CurrentPrincipal = HttpContext.Current.User;
            }
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            string cultureName = null;

            // Attempt to read the culture cookie from Request
            HttpCookie cultureCookie = Request.Cookies["_culture"];
            if (cultureCookie != null)
                cultureName = cultureCookie.Value;
            else
                cultureName = Request.UserLanguages != null && Request.UserLanguages.Length > 0 ?
                        Request.UserLanguages[0] :  // obtain it from HTTP header AcceptLanguages
                        null;
            // Validate culture name
            cultureName = CultureHelper.GetImplementedCulture(cultureName); // This is safe

            // Modify current thread's cultures            
            Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(cultureName);
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
        }
    }
}
