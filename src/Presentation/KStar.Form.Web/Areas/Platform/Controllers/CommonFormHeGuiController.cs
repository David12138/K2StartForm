using KStar.Form.Mvc.Controllers;
using KStar.Plateform.Models;
using KStar.Plateform.Service;
using KStar.Plateform.Service.FormCommon;
using System;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Caching;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.Plateform.Controllers
{
    public class CommonFormHeGuiController : HeGuiFormController
    {
        private readonly ITemplateVersionViewService _templateVesionViewService;
        private const char _delimit = '▓';
        public CommonFormHeGuiController(ITemplateVersionViewService templateVesionViewService)
        {
            _templateVesionViewService = templateVesionViewService;
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

                if (!string.IsNullOrWhiteSpace(Request.Params["Bill"]))
                {
                    Guid sysId = new Guid(Request.Params["Bill"]);
                    var versionView = _templateVesionViewService.QueryEntity<Form_TemplateVersionView>(x => x.RecordId == sysId);
                    string html = versionView.RenderHtml;

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
                ViewBag.FormInfo = ex.StackTrace;
            }
            return View();
        }

    }
}