using Exceptionless;
using KStar.Form.Mvc.Common.Tools;
using KStar.Form.Mvc.Filter;
using KStar.Form.Mvc.Models;
using KStar.Platform.Common;
using KStar.Platform.Logger;
using KStar.Platform.Service;
using KStar.Platform.ViewModel;
using System;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Mvc.Controllers
{
    [SessionState(System.Web.SessionState.SessionStateBehavior.ReadOnly)]
    [BaseAuthorize]
    public class BaseController : Controller
    {
        public IUserService _userService { get; set; }

        public ILogger _logger { get; set; }

        /// <summary>
        /// Gets the current windows logon user.
        /// </summary>
        protected UserDto CurrentUser
        {
            get
            {
                var userInfo = Session["CurrentUserInfo"];
                if (userInfo == null || (userInfo as UserDto).UserAccount != User.Identity.Name)
                {
                    if (!string.IsNullOrEmpty(User.Identity.Name))
                    {
                        Session["CurrentUserInfo"] = _userService.GetUseInfoByAccount(User.Identity.Name);
                    }
                }
                return Session["CurrentUserInfo"] as UserDto;
            }
        }

        protected bool IsAdmin
        {
            get
            {
                return _userService.CheckSuperAdmin(CurrentUser.SysId);
            }
        }

        protected override void OnException(ExceptionContext filterContext)
        {
            Exception exception = filterContext.Exception;
            if (filterContext.ExceptionHandled == true)
            {
                return;
            }
            HttpException httpException = new HttpException(null, exception);
            var content = Newtonsoft.Json.JsonConvert.SerializeObject(new ResponseMode { code = 999, message = filterContext.Exception.Message, logId = ExceptionlessClient.Default.GetLastReferenceId() });
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
            _logger.Error(filterContext.Exception);
            filterContext.ExceptionHandled = true;
            filterContext.HttpContext.Response.Clear();
            filterContext.HttpContext.Response.TrySkipIisCustomErrors = true;
        }
        /// <summary>
        /// 多语言处理，设置当前进行默认的CurrentCulture
        /// </summary>
        /// <param name="callback"></param>
        /// <param name="state"></param>
        /// <returns></returns>
        //protected override IAsyncResult BeginExecuteCore(AsyncCallback callback, object state)
        //{
        //    string cultureName = null;

        //    // Attempt to read the culture cookie from Request
        //    HttpCookie cultureCookie = Request.Cookies["_culture"];
        //    if (cultureCookie != null)
        //        cultureName = cultureCookie.Value;
        //    else
        //        cultureName = Request.UserLanguages != null && Request.UserLanguages.Length > 0 ?
        //                Request.UserLanguages[0] :  // obtain it from HTTP header AcceptLanguages
        //                null;
        //    // Validate culture name
        //    cultureName = CultureHelper.GetImplementedCulture(cultureName); // This is safe

        //    // Modify current thread's cultures            
        //    Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(cultureName);
        //    Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;

        //    return base.BeginExecuteCore(callback, state);
        //}
    }
}
