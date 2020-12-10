using KStar.Platform.Logger;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Controllers
{
    public class WarmUpController : Controller
    {
        public ILogger Logger { get; set; }
        // GET: WarmUp
        public ActionResult Index()
        {
            var root = this.Server.MapPath("~/");
            var files = Directory.GetFiles(root, "*.cshtml", SearchOption.AllDirectories)
                .GroupBy(x => Path.GetDirectoryName(x))
                .Select(g => g.First());

            foreach (var file in files)
            {
                if (file.EndsWith("_ViewStart.cshtml")) continue;
                var viewName = $"~/{file.Replace(root, string.Empty).Replace("\\", "/")}";
                var viewEngineResult = ViewEngines.Engines.FindPartialView(this.ControllerContext, viewName);
                try
                {
                    viewEngineResult.View.Render(new ViewContext(
                            this.ControllerContext,
                            viewEngineResult.View,
                            this.ViewData,
                            this.TempData,
                            TextWriter.Null
                        ), TextWriter.Null);
                }
                catch (Exception ex)
                {
                    Logger.Warn("初始化", ex.Message, "预热");
                }
            }
            return new HttpStatusCodeResult(System.Net.HttpStatusCode.OK);
        }
    }
}