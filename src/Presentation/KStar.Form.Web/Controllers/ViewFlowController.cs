using KStar.Form.Mvc.Controllers;
using KStar.Platform.ViewModel.ViewFlow;
using KStar.Platform.WorkFlow.Service;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Controllers
{
    public class ViewFlowController : BaseController
    {
        public IKStarWorkFlowService _kStarWorkFlowService { get; set; }

        // GET: ViewFlow
        public ActionResult Index()
        {
            ViewBag.Title = "Kstar for K2 flowchart";
            long formId = 0;
            var formIdData = Request.QueryString["FormId"];
            formId = long.Parse(formIdData.ToString());
            var viewModel = _kStarWorkFlowService.GetViewFlowModel(formId, User.Identity.Name);
            string folder = string.Empty, name = string.Empty;
            ViewBag.SoapTest = JsonConvert.SerializeObject(viewModel);
            ViewBag.Lang = System.Threading.Thread.CurrentThread.CurrentCulture.Name;
            return View();
        }
        /// <summary>
        /// 获取已激活节点数据
        /// </summary>
        /// <param name="FormId"></param>
        /// <param name="ActName"></param>
        /// <param name="ActStatus"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetActivityInstanceParticipants(long FormId, string ActName,int ActStatus)
        {
            var participants = _kStarWorkFlowService.GetActivityInstanceParticipants(FormId,ActName, ActStatus);
            return Json(participants);

        }

        /// <summary>
        /// 获取没有激活过节点数据
        /// </summary>
        /// <param name="FormId"></param>
        /// <param name="ActName"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetActivityParticipants(long FormId, string ActName)
        {
            var participants = _kStarWorkFlowService.GetActivityParticipants(FormId, ActName);
            return Json(participants);
        }

    }
}