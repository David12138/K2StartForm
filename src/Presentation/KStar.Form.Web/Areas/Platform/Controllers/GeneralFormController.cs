using KStar.Form.Mvc.Controllers;
using KStar.Platform.Service;
using System;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Caching;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.Platform.Controllers
{
    public class GeneralFormController : FormController
    {
        private readonly IBSIFService _service;
        public GeneralFormController(IBSIFService service)
        {
            _service = service;
        }
        // GET: Platform/GeneralForm
        public ActionResult Index()
        {
            try
            {
                Guid sysId = new Guid(Request.Params["Bill"]);
                //var model = _service.GetBSIFConfigById(sysId);
                string html = (string)HttpRuntime.Cache[sysId.ToString()];
                if (string.IsNullOrEmpty(html))
                {
                    string path = Server.MapPath($"\\Areas\\Platform\\Views\\GeneralForm\\_BusinessForm\\{sysId}.cshtml");
                    CacheDependency dp = new CacheDependency(path);//建立缓存依赖项dp
                    using (FileStream stream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                    {
                        using (StreamReader sr = new StreamReader(stream, Encoding.UTF8))
                        {
                            html = sr.ReadToEnd().ToString();
                            sr.Close();
                        }
                    }
                    //如果文件发生改变， 就自动更新缓存，否则，如果不使用，30分钟缓存自动失效
                    HttpRuntime.Cache.Insert(sysId.ToString(), html, dp, Cache.NoAbsoluteExpiration, new TimeSpan(0, 30, 0));
                }
                var header = "";
                if (html.Trim().IndexOf("<script") == 0)
                {
                    header = html.Substring(0, html.IndexOf("<el-form"));
                    html = html.Substring(html.IndexOf("<el-form"));
                }
                ViewBag.Header = header;
                var foot = "";
                if (html.IndexOf("<script>") > 0)
                {
                    foot = html.Substring(html.IndexOf("<script>"));
                    html = html.Substring(0,html.IndexOf("<script>"));
                }
                var methods = "";
                if (!foot.EndsWith("</script>"))
                {
                    methods = foot.Substring(foot.IndexOf("</script>") + 9);
                    foot= foot.Substring(0, foot.IndexOf("</script>")+9);
                }
                ViewBag.Foot = foot;
                ViewBag.Methods = methods;
                ViewBag.FormInfo = html;
            }
            catch (Exception ex)
            {
                ViewBag.Header = "";
                ViewBag.Foot = "";
                ViewBag.Methods = "";
                ViewBag.FormInfo =  ex.StackTrace ;
            }
            return View();
        }
    }
}