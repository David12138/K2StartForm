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
    public class CommonFormController : FormController
    {
        private readonly ITemplateVersionViewService _templateVesionViewService;
        public IProcessVersionService _processVersionService;
        private const char _delimit = '▓';
        public CommonFormController(ITemplateVersionViewService templateVesionViewService
            , IProcessVersionService processVersionService)
        {
            _templateVesionViewService = templateVesionViewService;
            _processVersionService = processVersionService;
        }
        // GET: Plateform/CommonForm
        public ActionResult Index()
        {
            try
            {
                var cultureName = string.Empty;
                HttpCookie cultureCookie = Request.Cookies["_culture"];
                if (cultureCookie != null)
                    cultureName = cultureCookie.Value;
                else
                    cultureName = Request.UserLanguages != null && Request.UserLanguages.Length > 0 ?
                            Request.UserLanguages[0] :  // obtain it from HTTP header AcceptLanguages
                            null;

                Guid sysId = Guid.Empty;
                string processCode = Request.Params["StartProcessCode"];
                if (!string.IsNullOrEmpty(processCode))
                {
                    var startUrl = _processVersionService.GetStartUrlByProcessCode(processCode);
                    sysId = new Guid(startUrl.Substring(startUrl.LastIndexOf("=") + 1, startUrl.Length - startUrl.LastIndexOf("=") - 1));
                }
                else
                {
                    var bill = Request.Params["Bill"];
                    if (string.IsNullOrWhiteSpace(bill))
                    {
                        ViewBag.Header = "";
                        ViewBag.Foot = "";
                        ViewBag.Methods = "";
                        ViewBag.FormInfo = @"<span style='color:#ff0000;font-size:30px'>流程发起地址配置错误</span>";
                    }
                    else
                    {
                        sysId = new Guid(bill);
                    }
                }
                if (sysId != Guid.Empty)
                {
                    string html = _templateVesionViewService.GetFormTemplateVersionRenderHtml(sysId);
                    var scriptArrays = html.Split(_delimit);
                    ViewBag.FormInfo = scriptArrays[0];
                    ViewBag.Foot = scriptArrays[1];
                    ViewBag.Methods = scriptArrays[2];
                    ViewBag.CustomScript = scriptArrays[3];
                }
            }
            catch (Exception ex)
            {
                ViewBag.Header = "";
                ViewBag.Foot = "";
                ViewBag.Methods = "";
                ViewBag.FormInfo = ex.Message;

            }
            return View();
        }
    }
}