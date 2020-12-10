using KStar.Form.Mvc.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.NewBusiness.Controllers
{
    public class RefundApplicationController : FormController
    {
        // GET: NewBusiness/RefundApplication
        public ActionResult Index()
        {
            return View();
        }
    }
}