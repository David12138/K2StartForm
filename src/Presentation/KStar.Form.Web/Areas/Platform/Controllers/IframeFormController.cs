using KStar.Form.Mvc.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.Platform.Controllers
{
    public class IframeFormController : FormController
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}