using KStar.Form.Mvc.Controllers;
using KStar.Form.Mvc.Models;
using KStar.Form.Web.Areas.Portal.Models;
using KStar.Platform.Common;
using KStar.Platform.Service;
using KStar.Platform.ViewModel;
using KStar.Platform.ViewModel.Workflow;
using KStar.Platform.WorkFlow.Pager;
using KStar.Platform.WorkFlow.Service;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.Portal.Controllers
{
    public class UserPickController : BaseController
    {
        private IUserPickService service;
        public IKStarWorkFlowService kStarWorkFlowService { get; set; }
        public UserPickController(IUserPickService _service, IKStarWorkFlowService _kStarWorkFlowService)
        {
            service = _service;
            kStarWorkFlowService = _kStarWorkFlowService;
        }
        // GET: System/UserPick
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 根据上级获取下级树结构（包括组织类型）
        /// </summary>
        /// <param name="ParentID"></param>
        /// <returns></returns>
        public JsonResult GetChildOrgTree(Guid? ParentID,string orgList="")
        {
            var dataTreeResponse = service.GetChildOrgTree(ParentID, orgList,false);
            return new KStar.Form.Mvc.Filter.CamelCaseJsonResult(dataTreeResponse);
        }
        /// <summary>
        /// 根据组织获取人员
        /// </summary>
        /// <param name="OrgId"></param>
        /// <param name="key"></param>
        /// <param name="isLeave"></param>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetUserListByOrgId(Guid? OrgId, string key, bool? isLeave, int page, int limit,string orgList="")
        {
            var user = service.GetUseInfoByName(User.Identity.Name);
            var userList = service.GetUserList(OrgId, key, user.SysId.ToString(), isLeave, page, limit, orgList,false);
            return Json(new { data = userList.Item1, count = userList.Item2, code = userList.Item3, msg = userList.Item4 }, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 获取收藏人员
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetUserListByCollect()
        {
            var userList = service.GetUserListByCollect(this.User.Identity.Name);
            return Json(new { data = userList, count = userList.Count, code = 0, msg = "获取收藏人员成功！" }, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 设置收藏人员
        /// </summary>
        /// <param name="refUserId"></param>
        /// <param name="IsCollect"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult SetCollectPerson(string refUserId, bool IsCollect)
        {
            var flag = service.SetCollectUser(this.User.Identity.Name, new Guid(refUserId), IsCollect);
            return Json(new { code = flag ? 0 : -1 }, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 根据组织获取下级组织
        /// </summary>
        /// <param name="OrgID"></param>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetOrgListByOrgId(Guid? OrgID, int page, int limit)
        {
            int count = 0;
            var orgList = service.GetOrgByParent(OrgID, page, limit, out count);
            if (page == 1)
            {
                var org = service.GetOrgBySysId(OrgID);
                if (org != null)
                {
                    orgList.Insert(0, org);
                }
            }
            return Json(new { data = orgList, count = count, code = 0, msg = "获取组织成功", }, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 根据关键字获取组织,是否需要组织类型？
        /// </summary>
        /// <param name="key"></param>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetOrgListByKey(string key, int page, int limit,string orgList="")
        {
            int count = 0;
            var list = service.GetOrgByKey(key, page, limit, out count, orgList,false);
            return Json(new { data = list, count = count, code = 0, msg = "获取组织成功", }, JsonRequestBehavior.AllowGet);

        }
        /// <summary>
        /// 获取系统角色分类树数据
        /// </summary>
        /// <param name="ParentID"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetSystemRoleCategoryByParent(Guid? ParentID)
        {
            var dataTreeResponse = service.GetSystemRoleCategoryByParent(ParentID);
            return new KStar.Form.Mvc.Filter.CamelCaseJsonResult(dataTreeResponse);
        }
        /// <summary>
        /// 获取系统角色数据
        /// </summary>
        /// <param name="CategoryId"></param>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetSystemRoleByType(Guid? CategoryId, int page, int limit)
        {
            int count = 0;
            var orgList = service.GetSystemRoleListByType(CategoryId);
            return Json(new { data = orgList, count = count, code = 0, msg = "获取系统角色成功", }, JsonRequestBehavior.AllowGet);

        }
        /// <summary>
        /// 根据关键字获取系统角色
        /// </summary>
        /// <param name="key"></param>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetSystemRoleListByKey(string key, int page, int limit)
        {
            int count = 0;
            var orgList = service.GetSystemRoleListByKey(key, page, limit, out count);
            return Json(new { data = orgList, count = count, code = 0, msg = "获取系统角色成功", }, JsonRequestBehavior.AllowGet);

        }
        /// <summary>
        /// 获取岗位数据
        /// </summary>
        /// <param name="OrgID"></param>
        /// <param name="Type">岗位类型：V：虚拟岗位；C：普通岗位</param>
        /// <param name="key"></param>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetPositionList(Guid? OrgID, string key, string Type, int page, int limit,string orgList="")
        {
            if (OrgID == null && key == null)
            {
                return Json(new { data = new List<VCommonPositionDto>(), count = 0, code = 0, msg = "" }, JsonRequestBehavior.AllowGet);
            }
            if (Type == "C")
            {
                var position = service.GetCommonPosList(OrgID, key, page, limit, orgList);
                return Json(new { data = position.Item1, count = position.Item2, code = position.Item3, msg = position.Item4, }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var position = service.GetVirtualPosList(OrgID, key, page, limit);
                return Json(new { data = position.Item1, count = position.Item2, code = position.Item3, msg = position.Item4, }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 获取自定义角色分类树数据
        /// </summary>
        /// <param name="ParentID"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetCustomRoleCategoryByParent(Guid? ParentID)
        {
            var dataTreeResponse = service.GetCustomRoleCategoryByParent(ParentID,false);
            return new KStar.Form.Mvc.Filter.CamelCaseJsonResult(dataTreeResponse);
        }
        /// <summary>
        /// 获取自定义角色数据
        /// </summary>
        /// <param name="CategoryId"></param>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetCustomRoleByCategory(Guid? CategoryId, int page, int limit)
        {
            int count = 0;
            //var orgList = service.GetCustomRoleListByCategory(CategoryId);
            return Json(new { data = new List<CustomRoleDto>(), count = count, code = 0, msg = "获取自定义角色成功", }, JsonRequestBehavior.AllowGet);

        }
        /// <summary>
        /// 根据关键字角色查找自定义角色
        /// </summary>
        /// <param name="key"></param>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetCustomRoleListByKey(string key, int page, int limit)
        {
            int count = 0;
            var orgList = service.GetCustomRoleListByKey(key, page, limit, out count,false);
            return Json(new { data = orgList, count = count, code = 0, msg = "获取自定义角色成功", }, JsonRequestBehavior.AllowGet);

        }
        /// <summary>
        /// 搜索用户
        /// </summary>
        /// <param name="key"></param>
        /// <param name="isLeave"></param>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>

        public JsonResult SearchUser(string key, bool? isLeave, int page, int limit)
        {
            var userList = service.SearchUser(key, isLeave, page, limit);
            return Json(new { data = userList.Item1, count = userList.Item2, code = userList.Item3, msg = userList.Item4 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 手动选择审核人
        /// </summary>
        /// <param name="activityID"></param>
        /// <param name="applicantOrgId"></param>
        /// <param name="key"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public JsonResult ProcPredictionApprover(Guid activityID, Guid? applicantOrgId, string model, string key, int? pageIndex, int? pageSize)
        {
            pageIndex = pageIndex ?? 1;
            pageSize = pageSize ?? 10;
            key = (key == null ? "" : key.ToUpper());
            KStarFormModel formModel = null;
            if (!string.IsNullOrEmpty(model))
            {
                formModel = JsonConvert.DeserializeObject<KStarFormModel>(model);
            }
            //手动选择(有范围),自定义角色有可能缺少表单数据导致报错
            string errorMsg = "";
            var result = kStarWorkFlowService.ProcPredictionApprover(activityID, applicantOrgId,out errorMsg, formModel);
            if (!string.IsNullOrEmpty(key))
            {
                result = result.Where(p => ((p.UserDisplayName == null ? false : p.UserDisplayName.ToUpper().Contains(key))
                    || (p.LoginAccount == null ? false : p.LoginAccount.ToUpper().Contains(key))
                    || (p.PYFull == null ? false : p.PYFull.ToUpper().Contains(key))
                    || (p.PYInitials == null ? false : p.PYInitials.ToUpper().Contains(key)))).ToList();
            }
            result = result.Skip((pageIndex.Value - 1) * pageSize.Value).Take(pageSize.Value).ToList();

            var userArray = result.Select(f => f.UserAccount).ToArray();
            var userList = _userService.GetUserListData(userArray);
            return Json(new { data = userList, count = userList.Count,errorMsg= errorMsg }, JsonRequestBehavior.AllowGet);

        }
    }
}