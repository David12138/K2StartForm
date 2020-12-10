using KStar.Form.Mvc.Controllers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Controllers
{
    public class HomeController : BaseController
    {
        public static string Enviroment = ConfigurationManager.AppSettings["Enviroment"];
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetCurrentUser()
        {
            return Json(new Mvc.Models.ResponseMode
            {
                data = new
                {
                    this.IsAdmin,
                    this.CurrentUser.Email,
                    this.CurrentUser.UserAccount,
                    this.CurrentUser.UserDisplayName,
                    this.CurrentUser.LoginAccount,
                    this.CurrentUser.Portrait,
                    CurrentLang = System.Threading.Thread.CurrentThread.CurrentCulture.Name,
                    Enviroment
                }
            }, JsonRequestBehavior.AllowGet);
        }


        /// <summary>
        /// 创建水印
        /// </summary>
        /// <returns></returns>
        public ActionResult CreateWaterMark()
        {
            string Code = this.CurrentUser.UserDisplayName + "\r\n"
                                  + this.CurrentUser.UserAccount + "\r\n"
                                + DateTime.Now.ToString();
            return Json(Code);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}