﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KStar.Form.Mvc.Controllers;
using KStar.Form.Domain.Models;
using Newtonsoft.Json;
using SqlSugar;
using KStar.Form.Domain.ViewModels.NewBusiness.PaySalaryApplication;
using KStar.Form.Domain.Service.NewBusiness;

namespace KStar.Form.Web.Areas.NewBusiness.Controllers
{
    public class PaySalaryApplicationController : FormController
    {
        public IPaySalaryApplicationService paySalaryApplicationService { get; set; }

        // GET: NewBusiness/PaySalaryApplication
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

        public ActionResult SearchAccountInfo(string key)
        {
            //if (string.IsNullOrEmpty(name))
            //    return Json(new List<OAClientInfo>());
            if (string.IsNullOrWhiteSpace(key))
                key = string.Empty;
            key = key.Trim();


            var query = paySalaryApplicationService.SearchAccountInfo(key);
            var result = query.Select(m => new AccountInfo
            {
                Id = m.Id,
                Name = m.Name,
                BankOfDeposit = m.BankOfDeposit,
                Account = m.Account
            });
            return Content(JsonConvert.SerializeObject(result));
        }
    }
}