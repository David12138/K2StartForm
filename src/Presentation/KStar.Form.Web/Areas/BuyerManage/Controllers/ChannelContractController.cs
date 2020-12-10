using KStar.Form.Mvc.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KStar.Form.Domain.Service.BuyerManage;

namespace KStar.Form.Web.Areas.BuyerManage.Controllers
{
    public class ChannelContractController : FormController
    {

        public IChanneContractService channelcontractService { get; set; }
        // GET: BuyerManage/ChannelContract
        public ActionResult Index()
        {
            return View();
        }
    }
}