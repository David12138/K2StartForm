using KStar.Form.Mvc.Controllers;
using KStar.Platform.Common;
using KStar.Platform.Models;
using KStar.Platform.Service;
using KStar.Platform.Service.FormCommon;
using System;
using System.Configuration;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Caching;
using System.Web.Mvc;
using System.Web.Security;

namespace KStar.Form.Web.Areas.Platform.Controllers
{
    /// <summary>
    /// 通用表单预览页面
    /// </summary>
    public class FormPreviewController : FormController
    {
        private readonly ITemplateVersionViewService _templateVesionViewService;
        private const char _delimit = '▓';
        public FormPreviewController(ITemplateVersionViewService templateVesionViewService)
        {
            _templateVesionViewService = templateVesionViewService;
        }
        [AllowAnonymous]
        // GET: Platform/CommonForm
        public ActionResult Index()
        {
            if (!User.Identity.IsAuthenticated)
            {
                SetAuthCookie("K2Admin");
            }
            try
            {
                var cultureName = string.Empty;
                HttpCookie cultureCookie = Request.Cookies["_culture"];
                if (cultureCookie != null)
                {
                    cultureName = cultureCookie.Value;
                }
                else
                {
                    cultureName = Request.UserLanguages != null && Request.UserLanguages.Length > 0 ?
                            Request.UserLanguages[0] :  // obtain it from HTTP header AcceptLanguages
                            null;
                }

                Guid sysId = new Guid(Request.Params["Bill"]);
                var versionView = _templateVesionViewService.QueryEntity<Form_TemplateVersionView>(x => x.RecordId == sysId);
                string html = versionView.DraftRenderHtml;

                var scriptArrays = html.Split(_delimit);
                ViewBag.FormInfo = scriptArrays[0];
                ViewBag.Foot = scriptArrays[1];
                ViewBag.Methods = scriptArrays[2];
                ViewBag.CustomScript = scriptArrays[3];
            }
            catch (Exception ex)
            {
                ViewBag.Header = "";
                ViewBag.Foot = "";
                ViewBag.Methods = "";
                ViewBag.FormInfo = ex.StackTrace;
            }
            return View();
        }

        private void SetAuthCookie(string username)
        {
            KStar.Platform.ViewModel.UserDto userEntity = null;
            //测试环境 不验证密码
            //var isOAuth = ConfigurationManager.AppSettings["isOAuth"];//是否启用OAuth验证：1=启用
            //if (!string.IsNullOrWhiteSpace(isOAuth) && Convert.ToInt32(isOAuth) == 1)
            //{
            //    userEntity = _userService.GetUseInfoByAccount(username);
            //}
            //else
            //{
            //    userEntity = _userService.GetUseInfoByName(username);
            //}

            userEntity = _userService.GetUseInfoByName(username);
            var now = DateTime.UtcNow.ToLocalTime();
            TimeSpan expirationTimeSpan = FormsAuthentication.Timeout;
            Session["CurrentUserInfo"] = userEntity ?? throw new Exception("User not found...");



            //FormsAuthentication.SetAuthCookie(FormsAuthentication.FormsCookieName, true);
            FormsAuthenticationTicket ticket;
            var IsAdmin = _userService.CheckSuperAdmin(userEntity.SysId);
            var userData = IsAdmin ? SystemRoleEnum.Admin.ToString() : SystemRoleEnum.User.ToString();
            ticket = new FormsAuthenticationTicket(1, userEntity.UserAccount, now, now.Add(expirationTimeSpan), false, userData, FormsAuthentication.FormsCookiePath);
            var encryptedTicket = FormsAuthentication.Encrypt(ticket);
            var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
            cookie.HttpOnly = true;
            cookie.Path = FormsAuthentication.FormsCookiePath;


            if (ticket.IsPersistent)
            {
                cookie.Expires = ticket.Expiration;
            }
            if (FormsAuthentication.CookieDomain != null)
            {
                cookie.Domain = FormsAuthentication.CookieDomain;
            }
            System.Web.HttpContext.Current.Response.Cookies.Add(cookie);
        }
    }
}