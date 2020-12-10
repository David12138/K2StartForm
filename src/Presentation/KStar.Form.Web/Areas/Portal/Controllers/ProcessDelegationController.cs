using KStar.Platform.Models;
using KStar.Platform.Service;
using KStar.Platform.ViewModel.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.Portal.Controllers
{
    public class ProcessDelegationController : Controller
    {
        private readonly IProcessDelegation _processDelegationService;
        // GET: WorkFlow/ProcessDelegation
        public ProcessDelegationController(IProcessDelegation processDelegationService)
        {
            _processDelegationService = processDelegationService;
        }
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 获取流程授权数据
        /// </summary>
        /// <param name="fromUser"></param>
        /// <param name="toUser"></param>
        /// <param name="processName"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="status"></param>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetProcessDelegation(ProcessDelegationQueryModel queryModel, int PageIndex, int PageSize)
        {
            int totalCount = 0;
            DateTime? startBegin = null;
            DateTime? startEnd = null;
            if (!string.IsNullOrEmpty(queryModel.startTime))
            {
                var time = queryModel.startTime.Split(';');//.Replace(" - ", ";")
                startBegin = DateTime.Parse(time[0]);
                startEnd = DateTime.Parse(time[1]);
            }
            DateTime? endBegin = null;
            DateTime? endEnd = null;
            if (!string.IsNullOrEmpty(queryModel.endTime))
            {
                var time = queryModel.endTime.Split(';');//.Replace(" - ", ";")
                endBegin = DateTime.Parse(time[0]);
                endEnd = DateTime.Parse(time[1]);
            }
            string isEnabled = null;
            if (!string.IsNullOrEmpty(queryModel.status))
            {
                switch (queryModel.status)
                {
                    case "true": isEnabled = "1"; break;
                    case "false": isEnabled = "0"; break;
                }
            }
            var user = _processDelegationService.GetProcessDelegationList(queryModel.sType, queryModel.fromUser, queryModel.toUser, queryModel.processName, startBegin, startEnd, endBegin, endEnd, isEnabled, PageIndex, PageSize, ref totalCount);
            return Json(new { data = user, count = totalCount, code = 0, msg = "获取流程授权数据成功" }, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 获取代理的流程列表
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="limit"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetDelegationProcessList(int Id, int limit, int page)
        {
            int totalCount = 0;
            var data = _processDelegationService.GetDelegationProcessList(Id, page, limit, out totalCount);
            return Json(new { data = data, count = totalCount, code = 0, msg = "获取流程数据成功" }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult GetProcessByCategoryId(List<Guid> cate)
        {
            var data = _processDelegationService.GetProcessByCategoryId(cate);
            return Json(new { data = data, msg = "获取流程数据成功" }, JsonRequestBehavior.AllowGet);
        }

        //获取流程授权人

        [HttpPost]
        public JsonResult GetDelegationUser()
        {
            var data = _processDelegationService.GetDelegationUser();
            return Json(new { data = data, code = 0, msg = "获取流程数据成功" }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 设置流程代码状态
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="Status"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult SetDelegationStatus(int Id, bool Status)
        {
            _processDelegationService.SetDelegationStatus(User.Identity.Name, Id, Status);
            return Json(new { code = 0 }, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 编辑流程代理
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="fromUserName"></param>
        /// <param name="fromUserAccount"></param>
        /// <param name="toUserName"></param>
        /// <param name="toUserAccount"></param>
        /// <param name="isEnabled"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <param name="processList"></param>
        /// <param name="txtNote"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult UpdateProcessDelegation(int Id, byte? sType, string fromUserName, string fromUserAccount, string toUserName, string toUserAccount, bool isEnabled, DateTime start, DateTime end, List<PrcServer_DelegationProcessMap> processList, string txtNote, bool isAllProcess, byte? authorizationMode, string lineRule, string lineRuleDisplay)
        {
            _processDelegationService.UpdateDelegation(User.Identity.Name, Id, sType, fromUserName, fromUserAccount, toUserName, toUserAccount, isEnabled, start, end, processList, txtNote, isAllProcess, authorizationMode, "", "");
            return Json(new { code = 0 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 新增流程授权
        /// </summary>
        /// <param name="fromUserName"></param>
        /// <param name="fromUserAccount"></param>
        /// <param name="toUserName"></param>
        /// <param name="toUserAccount"></param>
        /// <param name="isEnabled"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <param name="processList"></param>
        /// <param name="txtNote"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult AddProcessDelegation(byte sType, string fromUserName, string fromUserAccount, string toUserName, string toUserAccount, bool isEnabled, DateTime start, DateTime end, List<PrcServer_DelegationProcessMap> processList, string txtNote,bool isAllProcess, byte? authorizationMode)
        {
            //isAdminCreate 前端默认false
            _processDelegationService.AddProcessDelegation(sType, fromUserName, fromUserAccount, toUserName, toUserAccount, isEnabled, start, end, processList, txtNote, User.Identity.Name, isAllProcess, authorizationMode, "", "", false);
            return Json(new { code = 0 }, JsonRequestBehavior.AllowGet);
        }
    }
}