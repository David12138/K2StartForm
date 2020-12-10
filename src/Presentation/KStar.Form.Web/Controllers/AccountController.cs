
using KStar.Form.Mvc.Common;
using KStar.Form.Mvc.Common.Tools;
using KStar.Form.Mvc.Filter;
using KStar.Form.Mvc.Models;
using KStar.Form.Web.Helper;
using KStar.Form.Web.Helpers;
using KStar.Platform.Common;
using KStar.Platform.Logger;
using KStar.Platform.Service;
using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace KStar.Form.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserService _userService;
        private ISystemDictionaryService _systemDictionaryService;
        public ILogger logger { get; set; }

        private bool IsAdmin = false;

        private const string Source = "用户登录模块";
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userService"></param>
        public AccountController(IUserService userService, ISystemDictionaryService systemDictionaryService)
        {
            _userService = userService;
            _systemDictionaryService = systemDictionaryService;
        }

        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Login(string UserAccount)
        {
            if (string.IsNullOrEmpty(UserAccount))
            {
                return View();
            }
            else
            {

                UserAccount = UserAccount.Replace(" ", "+");
                var account = DecryptDES(UserAccount, "12345678");
                SetAuthCookie(account);
                return RedirectToAction("Index", "Home");
            }





        }
        /// <summary>
        /// 新登录方法
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <param name="Code"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Login(string username, string password, string verCode)
        {

            logger.Debug(Source, $"Login {username} 登录成功");
            SetAuthCookie(username);
            return Json(new { IsAuthenticated = true, Message = "登录成功", IsAdmin });
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult SignOut()
        {
            logger.Debug(Source, $"SignOut  操作成功");
            FormsAuthentication.SignOut();
            return View("Login");
        }
        /// <summary>
        /// 生成验证码
        /// </summary>
        /// <returns></returns>
        public ActionResult VerifyCode()
        {
            int width = 100;
            int height = 40;
            int fontsize = 20;
            string code = string.Empty;
            byte[] bytes = VerifyCodeHelper.CreateValidateGraphic(out code, 4, width, height, fontsize);
            Session["VerifyCode"] = code;
            return File(bytes, @"image/jpeg");
        }
        /// <summary>
        /// 判断验证码是否正确
        /// </summary>
        /// <param name="vcode"></param>
        /// <returns></returns>
        public bool CheckVCode(string vcode)
        {
            return HttpContext.Session["VerifyCode"].ToString().ToLower() == vcode.ToLower();
        }

        private void SetAuthCookie(string username)
        {
            Platform.ViewModel.UserDto userEntity = null;
            userEntity = _userService.GetUseInfoByName(username);
            var now = DateTime.UtcNow.ToLocalTime();
            TimeSpan expirationTimeSpan = FormsAuthentication.Timeout;
            Session["CurrentUserInfo"] = userEntity ?? throw new Exception("User not found...");



            //FormsAuthentication.SetAuthCookie(FormsAuthentication.FormsCookieName, true);
            FormsAuthenticationTicket ticket;
            IsAdmin = _userService.CheckSuperAdmin(userEntity.SysId);
            var userData = IsAdmin ? SystemRoleEnum.Admin.ToString() : SystemRoleEnum.User.ToString();
            ticket = new FormsAuthenticationTicket(1, userEntity.UserAccount, now, now.Add(expirationTimeSpan), false, userData, FormsAuthentication.FormsCookiePath);
            var encryptedTicket = FormsAuthentication.Encrypt(ticket);
            var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
            #region 多语言处理
            string cultureName = null;
            cultureName = Request.UserLanguages != null && Request.UserLanguages.Length > 0 ?
                       Request.UserLanguages[0] :  // obtain it from HTTP header AcceptLanguages
                       null;
            cultureName = CultureHelper.GetImplementedCulture(cultureName); // This is safe


            HttpCookie cookieCulture = Request.Cookies["_culture"];
            if (cookieCulture != null)
            {
                cookieCulture.Value = cultureName;   // update cookie value
            }
            else
            {
                cookieCulture = new HttpCookie("_culture");
                cookieCulture.Value = cultureName;
                cookieCulture.Expires = DateTime.Now.AddYears(1);
            }
            System.Web.HttpContext.Current.Response.Cookies.Add(cookieCulture);
            #endregion
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



        [BaseAuthorize]
        public JsonResult GetUserInfo(string userAccount, long formId)
        {
            var user = _userService.GetUseInfo(userAccount, formId);
            return Json(new ResponseMode()
            {
                data = new
                {
                    Name = user.UserName,
                    Department = user.Department,
                    Telephone = user.Telephone,
                    Email = user.Email,
                    Mobile = user.Mobile,
                    Photo = user.Portrait
                }
            }, JsonRequestBehavior.AllowGet);

        }

        //DES默认密钥向量
        private static byte[] Keys = { 0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF };
        /// <summary>
        /// DES加密字符串
        /// </summary>
        /// <param name="encryptString">待加密的字符串</param>
        /// <param name="encryptKey">加密密钥,要求为8位</param>
        /// <returns>加密成功返回加密后的字符串，失败返回源串</returns>
        public static string EncryptDES(string encryptString, string encryptKey)
        {
            try
            {
                byte[] rgbKey = Encoding.UTF8.GetBytes(encryptKey.Substring(0, 8));
                byte[] rgbIV = Keys;
                byte[] inputByteArray = Encoding.UTF8.GetBytes(encryptString);
                DESCryptoServiceProvider dCSP = new DESCryptoServiceProvider();
                MemoryStream mStream = new MemoryStream();
                CryptoStream cStream = new CryptoStream(mStream, dCSP.CreateEncryptor(rgbKey, rgbIV), CryptoStreamMode.Write);
                cStream.Write(inputByteArray, 0, inputByteArray.Length);
                cStream.FlushFinalBlock();
                return Convert.ToBase64String(mStream.ToArray());
            }
            catch
            {
                return encryptString;
            }
        }

        /// <summary>
        /// DES解密字符串
        /// </summary>
        /// <param name="decryptString">待解密的字符串</param>
        /// <param name="decryptKey">解密密钥,要求为8位,和加密密钥相同</param>
        /// <returns>解密成功返回解密后的字符串，失败返源串</returns>
        public static string DecryptDES(string decryptString, string decryptKey)
        {
            try
            {
                byte[] rgbKey = Encoding.UTF8.GetBytes(decryptKey);
                byte[] rgbIV = Keys;
                byte[] inputByteArray = Convert.FromBase64String(decryptString);
                DESCryptoServiceProvider DCSP = new DESCryptoServiceProvider();
                MemoryStream mStream = new MemoryStream();
                CryptoStream cStream = new CryptoStream(mStream, DCSP.CreateDecryptor(rgbKey, rgbIV), CryptoStreamMode.Write);
                cStream.Write(inputByteArray, 0, inputByteArray.Length);
                cStream.FlushFinalBlock();
                return Encoding.UTF8.GetString(mStream.ToArray());
            }
            catch
            {
                return decryptString;
            }
        }



    }
}