using KStar.Platform.Common;
using KStar.Platform.Service;
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace KStar.Form.Mvc.Filter
{
    public class BaseAuthorizeAttribute : AuthorizeAttribute
    {
        /// <summary>
        /// 
        /// </summary>
        public IAuthService authService { get; set; }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            bool flag = filterContext.ActionDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true) || filterContext.ActionDescriptor.ControllerDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true);
            if (flag)
            {
                return;
            }
            var sn = HttpContext.Current.Request.Params["SN"];
            var workId = HttpContext.Current.Request.Params["workId"];
            var _s = HttpContext.Current.Request.Params["_s"];
            var token = HttpContext.Current.Request.Headers["AuthCode"];

            if (!string.IsNullOrEmpty(_s) && !string.IsNullOrEmpty(token))
            {
                if (!authService.VerifyToken(token))
                {
                    throw new KStarCustomException("token error");
                }

                if (authService.VerifyFormCode(sn, workId, _s))
                {
                    var now = DateTime.Now;
                    FormsAuthentication.SetAuthCookie(FormsAuthentication.FormsCookieName, true);

                    var ticket = new FormsAuthenticationTicket(1, "", now, now.Add(FormsAuthentication.Timeout), false, "User", FormsAuthentication.FormsCookiePath);
                    var encryptedTicket = FormsAuthentication.Encrypt(ticket);
                    var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
                    System.Web.HttpContext.Current.Request.Cookies.Add(cookie);
                }
            }

            base.OnAuthorization(filterContext);
        }

    }
}
