using KStar.Form.Mvc.Controllers;
using KStar.Platform.ViewModel.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.FIN.Controllers
{
    public class LeaveController : FormController
    {
        // GET: FIN/Leave
        public ActionResult Index()
        {
            //var a = Request.QueryString["ProcessCode"].ToString();
            return View();
        }
    }
}