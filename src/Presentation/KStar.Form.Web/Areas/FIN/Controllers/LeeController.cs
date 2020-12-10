using KStar.Form.Mvc.Controllers;
using KStar.Platform.ViewModel.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.FIN.Controllers
{
    public class LeeController : FormController
    {
        // GET: FIN/Lee
        public ActionResult Index()
        {
            return View();
        }
    }
}