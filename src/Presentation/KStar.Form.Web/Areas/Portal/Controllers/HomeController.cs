using KStar.Form.Mvc.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.Portal.Controllers
{
    public class HomeController : BaseController
    {
        /// <summary>
        /// 首页
        /// </summary>
        /// <returns></returns>
        public ActionResult HomeIndex()
        {
            return PartialView("~/Areas/Portal/Views/Parts/_HomeIndex.cshtml");
        }

        /// <summary>
        /// 发起流程
        /// </summary>
        /// <returns></returns>
        public ActionResult StartProcess()
        {
            return PartialView("~/Areas/Portal/Views/Parts/_StartProcess.cshtml");
        }
        /// <summary>
        /// 我的待办
        /// </summary>
        /// <returns></returns>
        public ActionResult BusinessProcessTask()
        {
            return PartialView("~/Areas/Portal/Views/Parts/_BusinessProcessTask.cshtml");
        }
        /// <summary>
        /// 无用
        /// </summary>
        /// <returns></returns>
        public ActionResult ExpenseReimbursement()
        {
            return PartialView("~/Areas/Portal/Views/Parts/_ExpenseReimbursement.cshtml");
        }
        /// <summary>
        /// 无用
        /// </summary>
        /// <returns></returns>
        public ActionResult ContractSettlement()
        {
            return PartialView("~/Areas/Portal/Views/Parts/_ContractSettlement.cshtml");
        }
        /// <summary>
        /// 我的已办
        /// </summary>
        /// <returns></returns>
        public ActionResult InvolvedTasks()
        {
            return PartialView("~/Areas/Portal/Views/Parts/_InvolvedTasks.cshtml");
        }
        /// <summary>
        /// 我的申请
        /// </summary>
        /// <returns></returns>
        public ActionResult ApplicationTasks()
        {
            return PartialView("~/Areas/Portal/Views/Parts/_ApplicationTasks.cshtml");
        }
        /// <summary>
        /// 我的待阅
        /// </summary>
        /// <returns></returns>
        public ActionResult MyCCTasks()
        {
            return PartialView("~/Areas/Portal/Views/Parts/_MyCCTasks.cshtml");
        }
        /// <summary>
        /// 我的已阅
        /// </summary>
        /// <returns></returns>
        public ActionResult MyRead()
        {
            return PartialView("~/Areas/Portal/Views/Parts/_MyRead.cshtml");
        }
        /// <summary>
        /// 流程草稿
        /// </summary>
        /// <returns></returns>
        public ActionResult Draft()
        {
            return PartialView("~/Areas/Portal/Views/Parts/_Draft.cshtml");
        }
        /// <summary>
        /// 查询流程
        /// </summary>
        /// <returns></returns>
        public ActionResult QueryProcess()
        {
            return PartialView("~/Areas/Portal/Views/Parts/_QueryProcess.cshtml");
        }
        /// <summary>
        /// 流程代理
        /// </summary>
        /// <returns></returns>
        public ActionResult ProcessAgent()
        {
            return PartialView("~/Areas/Portal/Views/Parts/_ProcessAgent.cshtml");
        }
        /// <summary>
        /// 首页
        /// </summary>
        /// <returns></returns>
        public ActionResult Report()
        {
            return PartialView("~/Areas/Portal/Views/Parts/_ReportStatics.cshtml");
        }
    }
}