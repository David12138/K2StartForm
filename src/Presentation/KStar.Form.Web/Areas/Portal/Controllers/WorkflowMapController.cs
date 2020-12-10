using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KStar.Form.Mvc.Controllers;
using KStar.Form.Mvc.Models;
using KStar.Plateform.Service;
using KStar.Platform.Models;
using KStar.Platform.Service;

namespace KStar.Form.Web.Areas.Portal.Controllers
{
    public class WorkflowMapController : BaseController
    {
        IProcessMapService _workflowMapService;
        IReportService _reportService;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="workflowMapService"></param>
        /// <param name="reportService"></param>
        public WorkflowMapController(IProcessMapService workflowMapService, IReportService reportService)
        {
            _workflowMapService = workflowMapService;
            _reportService = reportService;
        }

        /// <summary>
        /// 流程地图
        /// </summary>
        /// <param name="categoryID"></param>
        /// <param name="categoryID2"></param>
        /// <param name="key"></param>
        /// <param name="showAll"></param>
        /// <returns></returns>
        public JsonResult GetWorkflowMapByCategoryId(string categoryID, string categoryID2, string key, bool showAll = false)
        {
            var res = _workflowMapService.GetProcessMapCategoryID(categoryID, categoryID2, key, showAll);
            return Json(new ResponseMode { data = res }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 添加收藏
        /// </summary>
        /// <param name="processCode"></param>
        /// <returns></returns>
        public JsonResult AddWorkflowFavorite(string processCode)
        {
            var model = new PRC_ProcessMapCollection()
            {
                ProcessCode = processCode,
                UserAccount = this.User.Identity.Name,
                CreateBy = this.User.Identity.Name,
                CreateTime = DateTime.Now
            };
            var res = _workflowMapService.AddProcessFavorite(model);
            return Json(new ResponseMode { data = res }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 删除收藏
        /// </summary>
        /// <param name="processCode"></param>
        /// <returns></returns>
        public JsonResult DelWorkflowFavorite(string processCode)
        {
            var res = _workflowMapService.DeleteProcessFavorite(processCode);
            return Json(new ResponseMode { data = res }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取收藏列表
        /// </summary>
        /// <returns></returns>
        public JsonResult GetMyFavoriteWorkflow(int? pageIndex, int? pageSize)
        {
            var res = _workflowMapService.GetMyFavorite(pageIndex ?? 1, pageSize ?? 10);
            return Json(new ResponseMode { data = new { res.items, res.count } }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取常用流程列表
        /// </summary>
        /// <returns></returns>
        public JsonResult GetCommonWorkflow()
        {
            var res = _workflowMapService.GetMyCommonWorkflow();
            return Json(new ResponseMode { data = res }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 流程地图查询
        /// </summary>
        /// <param name="processCode"></param>
        /// <returns></returns>
        public JsonResult QueryProcessMapByCode(string processCode)
        {
            var res = _workflowMapService.QueryProcessMapByCode(processCode);
            return Json(new ResponseMode() { data = res }, JsonRequestBehavior.AllowGet);
        }


        /// <summary>
        /// 获取流程数据
        /// </summary>
        /// <param name="processName"></param>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public JsonResult GetNewProcessMapByProcess(string processName, Guid? categoryId, bool? isFull)
        {
            List<KStar.Platform.ViewModel.ProcessMapByProcessModel> res = new List<KStar.Platform.ViewModel.ProcessMapByProcessModel>();
            if (isFull.GetValueOrDefault())
            {
                res = _workflowMapService.GetProcessMapFullByProcesses(User.Identity.Name, processName, categoryId.GetValueOrDefault());
            }
            else
            {
                res = _workflowMapService.GetProcessMapByProcesses(User.Identity.Name, processName, categoryId.GetValueOrDefault(), IsAdmin);
            }

            return Json(new ResponseMode() { data = res }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取流程分类
        /// </summary>
        /// <returns></returns>
        public JsonResult GetNewProcessMapByCategory(bool? isFull)
        {
            List<KStar.Platform.ViewModel.ProcessMapByCategoryModel> res = new List<KStar.Platform.ViewModel.ProcessMapByCategoryModel>();
            if (isFull.GetValueOrDefault())
            {
                res = _workflowMapService.GetProcessMapByCategories(User.Identity.Name, true);
            }
            else
            {
                res = _workflowMapService.GetProcessMapByCategories(User.Identity.Name, IsAdmin);
            }
            var roots = res.Where(p => p.Parent_Id == Guid.Empty).OrderBy(p => p.Sort).ToList();
            List<Models.TreeModel> nodes = AutoMapper.Mapper.Map<List<Models.TreeModel>>(roots);
            foreach (Models.TreeModel item in nodes)
            {
                item.children = GetChildrens(item, res);
            }
            return Json(new ResponseMode() { data = nodes }, JsonRequestBehavior.AllowGet);
        }
        public List<Models.TreeModel> GetChildrens(Models.TreeModel node, List<KStar.Platform.ViewModel.ProcessMapByCategoryModel> processMapModel)
        {
            var list = processMapModel.Where(c => c.Parent_Id == node.id).ToList();
            List<Models.TreeModel> childrens = AutoMapper.Mapper.Map<List<Models.TreeModel>>(list);
            foreach (Models.TreeModel item in childrens)
            {
                item.children = GetChildrens(item, processMapModel);
            }
            return childrens;
        }
        /// <summary>
        /// 增加附件打开日志
        /// </summary>
        /// <param name="formId"></param>
        /// <param name="attachId"></param>
        /// <returns></returns>
        public ActionResult AddAttachLog(long formId, Guid attachId)
        {
            _reportService.AddAttachLog(User.Identity.Name, formId, attachId);
            return Json(new { code = 0 }, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 获取报表数据
        /// </summary>
        /// <returns></returns>
        public ActionResult GetReportOrgTree()
        {
            var data = _reportService.GetReportOrgTree(User.Identity.Name);
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }
        //测试方法
        public ActionResult GetuserReporttest()
        {
            var companyid = new Guid("C4BA4807-9F91-E857-9BB6-B73B581E16A8");
            var depId = new Guid("5FBD3E72-C61D-4454-D52C-C4354052134F");
            string orgStart = "2020-01-01";
            string orgEnd = "2020-01-31";
            return GetUserApproveReport(companyid, depId, orgStart, orgEnd, null, null);
        }
        /// <summary>
        /// 根据公司人员获取个人审批报表数据
        /// </summary>
        /// <param name="companyId"></param>
        /// <param name="depId"></param>
        /// <param name="orgStart"></param>
        /// <param name="orgEnd"></param>
        /// <param name="userStart"></param>
        /// <param name="userEnd"></param>
        /// <returns></returns>
        public ActionResult GetUserApproveReport(Guid companyId, Guid depId, string orgStart, string orgEnd, string userStart, string userEnd)
        {
            string start = orgStart;
            string end = orgEnd;
            int staticType = 0;
            if (string.IsNullOrEmpty(orgStart) || string.IsNullOrEmpty(orgEnd))
            {
                start = userStart;
                end = userEnd;
                staticType = 2;
            }
            if (string.IsNullOrEmpty(userStart) || string.IsNullOrEmpty(userStart))
            {
                staticType = 1;
            }
            var data = _reportService.GetUserApproveReport(User.Identity.Name, companyId, depId, start, end, staticType);
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }
    }
}