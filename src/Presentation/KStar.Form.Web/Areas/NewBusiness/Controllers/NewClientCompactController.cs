using KStar.Form.Domain.Service.NewBusiness;
using KStar.Form.Domain.ViewModels.NewBusiness.ExpenseApplication;
using KStar.Form.Mvc.Controllers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.NewBusiness.Controllers
{


    public class NewClientCompactController : FormController
    {
        public IPaySalaryApplicationService paySalaryApplicationService { get; set; }

        public INewClientCompactService newclientCompactService { get; set; }

        // GET: NewBusiness/NewClientCompact
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SearchClientInfo(string name)
        {
            //if (string.IsNullOrEmpty(name))
            //    return Json(new List<OAClientInfo>());
            if (string.IsNullOrWhiteSpace(name))
                name = string.Empty;
            name = name.Trim();


            var query = paySalaryApplicationService.SearchClientInfo(name);
            var result = query.Select(m => new OAClientInfo
            {
                Code = m.ClientCode,
                Name = m.ClientName
            });
            return Content(JsonConvert.SerializeObject(result));
        }
    }
}