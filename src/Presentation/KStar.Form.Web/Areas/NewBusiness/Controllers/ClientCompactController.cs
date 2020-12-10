using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KStar.Form.Mvc.Controllers;
using KStar.Form.Domain.Models;
using Newtonsoft.Json;
using SqlSugar;
using KStar.Form.Domain.ViewModels.NewBusiness.PaySalaryApplication;
using KStar.Form.Domain.ViewModels.NewBusiness.ClientCompact;
using KStar.Form.Domain.Service.NewBusiness;

namespace KStar.Form.Web.Areas.NewBusiness.Controllers
{

    public class ClientCompactController : FormController
    {
        public IPaySalaryApplicationService paySalaryApplicationService { get; set; }

        public IClientCompactService clientCompactService { get; set; }
        // GET: NewBusiness/ClientCompact
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
            var result = query.Select(m => new Domain.ViewModels.NewBusiness.ClientCompact.OAClientInfo
            {
                Code = m.ClientCode,
                Name = m.ClientName
            });
            return Content(JsonConvert.SerializeObject(result));
        }



    }
}