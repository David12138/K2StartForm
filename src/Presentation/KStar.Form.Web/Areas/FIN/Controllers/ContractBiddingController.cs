using KStar.Form.Mvc.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.FIN.Controllers
{
    public class ContractBiddingController : FormController
    {
        // GET: FIN/ContractBidding
        public ActionResult Index()
        {
            return View();
        }
    }
}