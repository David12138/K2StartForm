using KStar.Form.Mvc.Controllers;
using KStar.Platform.WorkFlow.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.FIN.Controllers
{
    public class ReimburseController : FormController
    {
        public ReimburseController()
        {
            //var a = Request["ProcessCode"];
        }
        // GET: FIN/Reimburse
        public ActionResult Index()
        {
           var a= Request["ProcessCode"];
            return View();
        }
        public ActionResult Leave()
        {
            return View();
        }
    }
}