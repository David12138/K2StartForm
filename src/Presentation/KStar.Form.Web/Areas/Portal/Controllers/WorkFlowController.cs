using KStar.Domain.Service;
using KStar.Form.Domain.Helper;
using KStar.Form.Mvc.Controllers;
using KStar.Form.Mvc.Models;
using KStar.Form.Web.Areas.Portal.Models;
using KStar.Form.Web.Helper;
using KStar.Platform.Common;
using KStar.Platform.Service;
using KStar.Platform.Service.KStarFormStorageProvider;
using KStar.Platform.ViewModel;
using KStar.Platform.ViewModel.Workflow;
using KStar.Platform.WorkFlow.Pager;
using KStar.Platform.WorkFlow.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.Portal.Controllers
{
    public class WorkFlowController : KStarFormController
    {
        IKStarWorkFlowService _workFlowService;
        IProcessSetService _processSetService;
        IProcessCCService _processCCService;
        IProcessDataStorageProvider _ProcessDataStorageProvider;
        IPortalMenuService _menuService;

        public SystemDictionaryContext _dictionaryContext { get; set; }
        private const string MixDate = "1970-1-1";

        public WorkFlowController(IKStarWorkFlowService workFlowService,
            IProcessSetService processSetService, IProcessCCService processCCService, IProcessDataStorageProvider ProcessDataStorageProvider, IPortalMenuService menuService)
        {
            _workFlowService = workFlowService;
            _processSetService = processSetService;
            _processCCService = processCCService;
            _ProcessDataStorageProvider = ProcessDataStorageProvider;
            _menuService = menuService;
        }

        /// <summary>
        /// 首页 待审任务
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public JsonResult GetWorklist(int? pageIndex, int? pageSize)
        {
            var criteria = new KStarHomeWorklistItemCriteria();
            criteria.PageIndex = pageIndex ?? 1;
            criteria.PageSize = pageSize ?? 10;

            var data = _workFlowService.GetKStarHomeWorklistItems(User.Identity.Name, criteria);
            return Json(new ResponseMode
            {
                data = new
                {
                    total = data.TotalCount,
                    item = data.Items
                }
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 首页 待阅任务
        /// </summary>
        /// <returns></returns>
        public JsonResult GetTODOReadlist(int? pageIndex, int? pageSize)
        {
            KStarCcProcessCriteria criteria = new KStarCcProcessCriteria();
            criteria.PageIndex = pageIndex ?? 1;
            criteria.PageSize = pageSize ?? 10;
            criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.IsRead, CriteriaCompare.Equal, false);
            var res = _workFlowService.GetCCs(User.Identity.Name, criteria);
            return Json(new ResponseMode()
            {
                data = new
                {
                    total = res.TotalCount,
                    item = res.Items
                }
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 待审任务
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        //public JsonResult GetWorklistBusinessProcess(CriteriaModel model, string keyword)
        //{
        //    WorklistItemCriteria criteria = BuildQueryFilter(model, keyword);
        //    criteria.AddRegularFilter(CriteriaLogical.And, WorklistItemField.BusinessType, CriteriaCompare.Equal, BusinessTypeEnum.BusinessProcess.ToString());

        //    var data = _workFlowService.GetKStarWorklistItems(User.Identity.Name, criteria);
        //    return Json(new ResponseMode
        //    {
        //        data = new
        //        {
        //            total = data.TotalCount,
        //            item = data.Items
        //        }
        //    }, JsonRequestBehavior.AllowGet);
        //}

        /// <summary>
        /// 待审任务
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public JsonResult GetWorklistBusinessProcess(CriteriaModel model, string keyword)
        {
            WorklistItemCriteria criteria = BuildQueryFilter(model, keyword);
            var data = _workFlowService.GetKStarWorklistItems(User.Identity.Name, criteria);
            return Json(new ResponseMode
            {
                data = new
                {
                    total = data.TotalCount,
                    item = data.Items
                }
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 待审任务
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public JsonResult GetWorklistExpenseReimbursement(CriteriaModel model, string keyword)
        {
            WorklistItemCriteria criteria = BuildQueryFilter(model, keyword);
            criteria.AddRegularFilter(CriteriaLogical.And, WorklistItemField.BusinessType, CriteriaCompare.Equal, BusinessTypeEnum.ExpenseReimbursement.ToString());

            var data = _workFlowService.GetKStarWorklistItems(User.Identity.Name, criteria);
            return Json(new ResponseMode
            {
                data = new
                {
                    total = data.TotalCount,
                    item = data.Items
                }
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 待审任务
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public JsonResult GetWorklistContractSettlement(CriteriaModel model, string keyword)
        {
            WorklistItemCriteria criteria = BuildQueryFilter(model, keyword);
            criteria.AddRegularFilter(CriteriaLogical.And, WorklistItemField.BusinessType, CriteriaCompare.Equal, BusinessTypeEnum.ContractSettlement.ToString());

            var data = _workFlowService.GetKStarWorklistItems(User.Identity.Name, criteria);
            return Json(new ResponseMode
            {
                data = new
                {
                    total = data.TotalCount,
                    item = data.Items
                }
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 待办 待阅 总数量
        /// </summary>
        /// <returns></returns>
        public JsonResult GetKStarWorklistAllCount()
        {
            var res = _workFlowService.GetKStarWorklistItemCounts(User.Identity.Name, null)
                .Select((item, index) => new { type = "BusinessProcess", count = item })
                .ToDictionary(p => p.type, p => p.count);


            res.Add("TODOReadCount", _workFlowService.GetCCPendingReadTotalCount(User.Identity.Name));

            return Json(new ResponseMode { data = res }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 待办数量
        /// </summary>
        /// <returns></returns>
        public JsonResult GetKStarWorklistTaskCount()
        {
            var res = _workFlowService.GetKStarWorklistItemCounts(User.Identity.Name, null)
                .Select((item, index) => new { type = "BusinessProcess", count = item })
                .ToDictionary(p => p.type, p => p.count);
            return Json(new ResponseMode { data = res }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 待阅 数量
        /// </summary>
        /// <returns></returns>
        public JsonResult GetCCPendingReadTotalCount()
        {
            Dictionary<string, int> res = new Dictionary<string, int>();
            res.Add("TODOReadCount", _workFlowService.GetCCPendingReadTotalCount(User.Identity.Name)); ;
            return Json(new ResponseMode { data = res }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取菜单
        /// </summary>
        /// <returns></returns>
        public JsonResult GetKStarMenu()
        {
            //var menuList = _menuService.GetListByType("KStarPortal", User.Identity.Name);
            var menuList = _menuService.GetMenuAll(base.CurrentUser.UserAccount);
            ////menuList.Add(new MenuDto { Id = Guid.NewGuid(), DisplayName = "首页",EnDisplayName = "Home", Hyperlink = "/Portal/Home/HomeIndex", Parent_Id = null, IconKey = "home" });
            //menuList.Add(new MenuDto { Id = Guid.NewGuid(), DisplayName = "发起流程", EnDisplayName = "Start Process", Hyperlink = "/Portal/Home/StartProcess", Parent_Id = null, IconKey = "flow" });
            //menuList.Add(new MenuDto { Id = Guid.Parse("40D120D5-7131-4E39-9971-0B26D0F82738"), DisplayName = "我的待办", EnDisplayName = "My Pending Tasks", Hyperlink = "/Portal/Home/BusinessProcessTask", Parent_Id = null, IconKey = "tasks" });
            ////menuList.Add(new MenuDto { Id = Guid.NewGuid(), DisplayName = "业务流程", EnDisplayName = "发起流程",  Hyperlink = "/Portal/Home/BusinessProcessTask", Parent_Id = Guid.Parse("40D120D5-7131-4E39-9971-0B26D0F82738"), IconKey = "A" });
            ////menuList.Add(new MenuDto { Id = Guid.NewGuid(), DisplayName = "费用报销", EnDisplayName = "发起流程",  Hyperlink = "/Portal/Home/ExpenseReimbursement", Parent_Id = Guid.Parse("40D120D5-7131-4E39-9971-0B26D0F82738"), IconKey = "A" });
            ////menuList.Add(new MenuDto { Id = Guid.NewGuid(), DisplayName = "合同结算", EnDisplayName = "发起流程",  Hyperlink = "/Portal/Home/ContractSettlement", Parent_Id = Guid.Parse("40D120D5-7131-4E39-9971-0B26D0F82738"), IconKey = "A" });
            //menuList.Add(new MenuDto { Id = Guid.NewGuid(), DisplayName = "我的已办", EnDisplayName = "My Done Tasks", Hyperlink = "/Portal/Home/InvolvedTasks", Parent_Id = null, IconKey = "trial-tasks" });
            //menuList.Add(new MenuDto { Id = Guid.NewGuid(), DisplayName = "我的申请", EnDisplayName = "My Request Tasks", Hyperlink = "/Portal/Home/ApplicationTasks", Parent_Id = null, IconKey = "application" });
            //menuList.Add(new MenuDto { Id = Guid.NewGuid(), DisplayName = "我的待阅", EnDisplayName = "Carboncopy Tasks", Hyperlink = "/Portal/Home/MyCCTasks", Parent_Id = null, IconKey = "copy" });
            //menuList.Add(new MenuDto { Id = Guid.NewGuid(), DisplayName = "我的已阅", EnDisplayName = "Carboncopy Read", Hyperlink = "/Portal/Home/MyRead", Parent_Id = null, IconKey = "copy" });
            //menuList.Add(new MenuDto { Id = Guid.NewGuid(), DisplayName = "我的草稿", EnDisplayName = "My Drafts", Hyperlink = "/Portal/Home/Draft", Parent_Id = null, IconKey = "draft" });
            //menuList.Add(new MenuDto { Id = Guid.NewGuid(), DisplayName = "查询流程", EnDisplayName = "Query", Hyperlink = "/Portal/Home/QueryProcess", Parent_Id = null, IconKey = "query-process" });
            //menuList.Add(new MenuDto { Id = Guid.NewGuid(), DisplayName = "流程代理", EnDisplayName = "Authorization", Hyperlink = "/Portal/Home/ProcessAgent", Parent_Id = null, IconKey = "process-agent" });
            return Json(new ResponseMode { data = menuList }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 已审任务
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public JsonResult GetMyInvolveds(InvolvedProcessModel model, string keyword)
        {
            KStarInvolvedProcessCriteria criteria = GetInvolvedProcessCriteria(model, keyword);

            var res = _workFlowService.GetInvolveds(User.Identity.Name, criteria);
            return Json(new ResponseMode()
            {
                data = new
                {
                    total = res.TotalCount,
                    item = res.Items
                }
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取已办 KStarInvolvedProcessCriteria
        /// </summary>
        /// <param name="model"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        private KStarInvolvedProcessCriteria GetInvolvedProcessCriteria(InvolvedProcessModel model, string keyword)
        {
            KStarInvolvedProcessCriteria criteria = new KStarInvolvedProcessCriteria();
            criteria.PageIndex = model.PageIndex;
            criteria.PageSize = model.PageSize;

            //关键字 标题、编号、申请人
            if (!string.IsNullOrEmpty(keyword))
            {
                criteria.AddRegularFilter(CriteriaLogical.AndBracket, KStarInvolvedField.Folio, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, KStarInvolvedField.FormSubject, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, KStarInvolvedField.ApplicantAccount, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, KStarInvolvedField.ApplicantDisplayName, CriteriaCompare.Like, keyword, CriteriaLogical.EndBracket);
            }
            //流程编号
            if (!string.IsNullOrEmpty(model.ProcessNum))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.Folio, CriteriaCompare.Like, model.ProcessNum);
            }
            //流程主题
            if (!string.IsNullOrEmpty(model.FormSubject))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.FormSubject, CriteriaCompare.Like, model.FormSubject);
            }
            //申请人
            if (!string.IsNullOrEmpty(model.OriginatorAccount))
            {
                var userList = model.OriginatorAccount.Split(',').ToList();
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.ApplicantAccount, CriteriaCompare.In, userList);
            }
            //开始时间
            if (model.SubmitStartDate.HasValue && model.SubmitEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.SubmitDate, CriteriaCompare.Between, model.SubmitStartDate, model.SubmitEndDate);
            }
            else if (model.SubmitStartDate.HasValue && !model.SubmitEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.SubmitDate, CriteriaCompare.Between, model.SubmitStartDate, DateTime.Now);
            }
            else if (!model.SubmitStartDate.HasValue && model.SubmitEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.SubmitDate, CriteriaCompare.Between, DateTime.Parse(MixDate), model.SubmitEndDate);
            }
            //流程类别
            if (model.ProcessCategory != null && model.ProcessCategory.Any())
            {
                var processCode = CategoryConvertProcessCode(model.ProcessCategory);
                model.ProcessCode.AddRange(processCode);
            }
            //流程名称
            if (model.ProcessCode != null && model.ProcessCode.Any())
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.ProcessCode, CriteriaCompare.In, model.ProcessCode);
            }
            //申请人 部门
            if (!string.IsNullOrEmpty(model.DepartmentId))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.ApplicantOrgId, CriteriaCompare.Equal, model.DepartmentId);
            }
            //当前处理人
            if (!string.IsNullOrEmpty(model.CurrentUser))
            {
                //criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.CurrentUser, CriteriaCompare.Equal, model.CurrentUser);
            }
            //流程状态
            if (model.ProcessStatus.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.Status, CriteriaCompare.Equal, model.ProcessStatus);
            }
            //处理时间
            if (model.ProcessingStartDate.HasValue && model.ProcessingEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.ProcessingDate, CriteriaCompare.Between, model.ProcessingStartDate, model.ProcessingEndDate);
            }
            else if (model.ProcessingStartDate.HasValue && !model.ProcessingEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.ProcessingDate, CriteriaCompare.Between, model.ProcessingStartDate, DateTime.Now);
            }
            else if (!model.ProcessingStartDate.HasValue && model.ProcessingEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.ProcessingDate, CriteriaCompare.Between, DateTime.Parse(MixDate), model.ProcessingEndDate);
            }
            //结束时间
            if (model.FinishStartDate.HasValue && model.FinishEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.FinishDate, CriteriaCompare.Between, model.FinishStartDate, model.FinishEndDate);
            }
            else if (model.FinishStartDate.HasValue && !model.FinishEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.FinishDate, CriteriaCompare.Between, model.FinishStartDate, DateTime.Now);
            }
            else if (!model.FinishStartDate.HasValue && model.FinishEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.FinishDate, CriteriaCompare.Between, DateTime.Parse(MixDate), model.FinishEndDate);
            }

            //摘要
            if (!string.IsNullOrEmpty(model.Summary))
            {
                string re = Regex.Replace(model.Summary, @"<[^<>]+>", "").Trim();
                criteria.AddRegularFilter(CriteriaLogical.And, KStarInvolvedField.Summary, CriteriaCompare.Like, re);
            }

            //排序
            if (!string.IsNullOrEmpty(model.SortField) && !string.IsNullOrEmpty(model.SortDirection))
            {
                criteria.AddSortFilter(new SortFilter(model.SortField, model.SortDirection));
            }

            return criteria;
        }

        /// <summary>
        /// 我的申请
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public JsonResult GetMyApplications(MyApplicationModel model, string keyword)
        {
            KStarMyProcessCriteria criteria = GetApplicationCriteria(model, keyword);

            var res = _workFlowService.GetApplications(User.Identity.Name, criteria);
            return Json(new ResponseMode()
            {
                data = new
                {
                    total = res.TotalCount,
                    item = res.Items
                }
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取我的申请 KStarMyProcessCriteria
        /// </summary>
        /// <param name="model"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        private KStarMyProcessCriteria GetApplicationCriteria(MyApplicationModel model, string keyword)
        {
            KStarMyProcessCriteria criteria = new KStarMyProcessCriteria();
            criteria.PageIndex = model.PageIndex;
            criteria.PageSize = model.PageSize;

            //关键字 标题、编号、申请人
            if (!string.IsNullOrEmpty(keyword))
            {
                criteria.AddRegularFilter(CriteriaLogical.AndBracket, KStarMyField.Folio, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, KStarMyField.FormSubject, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, KStarMyField.ApplicantDisplayName, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, KStarMyField.ApplicantDisplayName, CriteriaCompare.Like, keyword, CriteriaLogical.EndBracket);
            }
            //流程编号
            if (!string.IsNullOrEmpty(model.ProcessNum))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarMyField.Folio, CriteriaCompare.Like, model.ProcessNum);
            }
            //流程主题
            if (!string.IsNullOrEmpty(model.FormSubject))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarMyField.FormSubject, CriteriaCompare.Like, model.FormSubject);
            }
            //申请人
            if (!string.IsNullOrEmpty(model.OriginatorAccount))
            {
                var userList = model.OriginatorAccount.Split(',').ToList();
                criteria.AddRegularFilter(CriteriaLogical.And, KStarMyField.ApplicantAccount, CriteriaCompare.In, userList);
            }
            //开始时间
            if (model.SubmitStartDate.HasValue && model.SubmitEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarMyField.SubmitDate, CriteriaCompare.Between, model.SubmitStartDate, model.SubmitEndDate);
            }
            else if (model.SubmitStartDate.HasValue && !model.SubmitEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarMyField.SubmitDate, CriteriaCompare.Between, model.SubmitStartDate, DateTime.Now);
            }
            else if (!model.SubmitStartDate.HasValue && model.SubmitEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarMyField.SubmitDate, CriteriaCompare.Between, DateTime.Parse(MixDate), model.SubmitEndDate);
            }
            //流程类别
            if (model.ProcessCategory != null && model.ProcessCategory.Any())
            {
                var processCode = CategoryConvertProcessCode(model.ProcessCategory);
                model.ProcessCode.AddRange(processCode);
            }
            //流程名称
            if (model.ProcessCode != null && model.ProcessCode.Any())
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarMyField.ProcessCode, CriteriaCompare.In, model.ProcessCode);
            }
            //申请人 部门
            if (!string.IsNullOrEmpty(model.DepartmentId))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarMyField.ApplicantOrgId, CriteriaCompare.Equal, model.DepartmentId);
            }
            //当前处理人
            if (!string.IsNullOrEmpty(model.CurrentUser))
            {
                //criteria.AddRegularFilter(CriteriaLogical.And, KStarMyField.CurrentUser, CriteriaCompare.Equal, model.CurrentUser);
            }
            //流程状态
            if (model.ProcessStatus.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarMyField.Status, CriteriaCompare.Equal, model.ProcessStatus);
            }
            //填单人
            if (!string.IsNullOrEmpty(model.SubmitterAccount))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarMyField.SubmitterAccount, CriteriaCompare.Equal, model.SubmitterAccount);
            }
            //结束时间
            if (model.FinishStartDate.HasValue && model.FinishEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarMyField.FinishDate, CriteriaCompare.Between, model.FinishStartDate, model.FinishEndDate);
            }
            else if (model.FinishStartDate.HasValue && !model.FinishEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarMyField.FinishDate, CriteriaCompare.Between, model.FinishStartDate, DateTime.Now);
            }
            else if (!model.FinishStartDate.HasValue && model.FinishEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarMyField.FinishDate, CriteriaCompare.Between, DateTime.Parse(MixDate), model.FinishEndDate);
            }
            //排序
            if (!string.IsNullOrEmpty(model.SortField) && !string.IsNullOrEmpty(model.SortDirection))
            {
                criteria.AddSortFilter(new SortFilter(model.SortField, model.SortDirection));
            }
            //摘要
            if (!string.IsNullOrEmpty(model.Summary))
            {
                string re = Regex.Replace(model.Summary, @"<[^<>]+>", "").Trim();
                criteria.AddRegularFilter(CriteriaLogical.And, KStarMyField.Summary, CriteriaCompare.Like, re);
            }
            //是否勾选代我申请的
            criteria.ApplyType = model.ApplyType;

            return criteria;
        }

        /// <summary>
        /// 抄送我的（待阅、已阅）  
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public JsonResult GetMyCCList(MyCCModel model, string keyword)
        {
            KStarCcProcessCriteria criteria = GetCcProcessCriteria(model, keyword);

            var res = _workFlowService.GetCCs(User.Identity.Name, criteria);
            return Json(new ResponseMode()
            {
                data = new
                {
                    total = res.TotalCount,
                    item = res.Items
                }
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取 我的待阅 KStarCcProcessCriteria
        /// </summary>
        /// <param name="model"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        private KStarCcProcessCriteria GetCcProcessCriteria(MyCCModel model, string keyword)
        {
            KStarCcProcessCriteria criteria = new KStarCcProcessCriteria();
            criteria.PageIndex = model.PageIndex;
            criteria.PageSize = model.PageSize;


            //关键字 标题、编号、申请人
            if (!string.IsNullOrEmpty(keyword))
            {
                criteria.AddRegularFilter(CriteriaLogical.AndBracket, KStarCcField.Folio, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, KStarCcField.FormSubject, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, KStarCcField.ApplicantAccount, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, KStarCcField.ApplicantDisplayName, CriteriaCompare.Like, keyword, CriteriaLogical.EndBracket);
            }
            //流程编号
            if (!string.IsNullOrEmpty(model.ProcessNum))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.Folio, CriteriaCompare.Like, model.ProcessNum);
            }
            //流程主题
            if (!string.IsNullOrEmpty(model.FormSubject))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.FormSubject, CriteriaCompare.Like, model.FormSubject);
            }
            //申请人
            if (!string.IsNullOrEmpty(model.OriginatorAccount))
            {
                var userList = model.OriginatorAccount.Split(',').ToList();
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.ApplicantAccount, CriteriaCompare.In, userList);
            }
            //开始时间
            if (model.SubmitStartDate.HasValue && model.SubmitEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.SubmitDate, CriteriaCompare.Between, model.SubmitStartDate, model.SubmitEndDate);
            }
            else if (model.SubmitStartDate.HasValue && !model.SubmitEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.SubmitDate, CriteriaCompare.Between, model.SubmitStartDate, DateTime.Now);
            }
            else if (!model.SubmitStartDate.HasValue && model.SubmitEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.SubmitDate, CriteriaCompare.Between, DateTime.Parse(MixDate), model.SubmitEndDate);
            }
            //流程类别
            if (model.ProcessCategory != null && model.ProcessCategory.Any())
            {
                var processCode = CategoryConvertProcessCode(model.ProcessCategory);
                model.ProcessCode.AddRange(processCode);
            }
            //流程名称
            if (model.ProcessCode != null && model.ProcessCode.Any())
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.ProcessCode, CriteriaCompare.In, model.ProcessCode);
            }
            //申请人 部门
            if (!string.IsNullOrEmpty(model.DepartmentId))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.ApplicantOrgId, CriteriaCompare.Equal, model.DepartmentId);
            }
            //当前处理人
            if (!string.IsNullOrEmpty(model.CurrentUser))
            {
                //criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.CurrentUser, CriteriaCompare.Equal, model.CurrentUser);
            }
            //流程状态
            if (model.ProcessStatus.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.Status, CriteriaCompare.Equal, model.ProcessStatus);
            }
            //抄送人
            if (!string.IsNullOrEmpty(model.FormCCUserAccount))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.Originator, CriteriaCompare.Equal, model.FormCCUserAccount);
            }
            //抄送时间
            if (model.CcStartDate.HasValue && model.CcEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.ReceiverDate, CriteriaCompare.Between, model.CcStartDate, model.CcEndDate);
            }
            else if (model.CcStartDate.HasValue && !model.CcEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.ReceiverDate, CriteriaCompare.Between, model.CcStartDate, DateTime.Now);
            }
            else if (!model.CcStartDate.HasValue && model.CcEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.ReceiverDate, CriteriaCompare.Between, DateTime.Parse(MixDate), model.CcEndDate);
            }
            //审阅时间
            if (model.ApproveStartDate.HasValue && model.ApproveEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.ReceiverEndDate, CriteriaCompare.Between, model.ApproveStartDate, model.ApproveEndDate);
            }
            else if (model.ApproveStartDate.HasValue && !model.ApproveEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.ReceiverEndDate, CriteriaCompare.Between, model.ApproveStartDate, DateTime.Now);
            }
            else if (!model.ApproveStartDate.HasValue && model.ApproveEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.ReceiverEndDate, CriteriaCompare.Between, DateTime.Parse(MixDate), model.ApproveEndDate);
            }
            //结束时间
            if (model.FinishStartDate.HasValue && model.FinishEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.FinishDate, CriteriaCompare.Between, model.FinishStartDate, model.FinishEndDate);
            }
            else if (model.FinishStartDate.HasValue && !model.FinishEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.FinishDate, CriteriaCompare.Between, model.FinishStartDate, DateTime.Now);
            }
            else if (!model.FinishStartDate.HasValue && model.FinishEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.FinishDate, CriteriaCompare.Between, DateTime.Parse(MixDate), model.FinishEndDate);
            }
            //处理状态
            if (model.ReaderStatus.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.IsRead, CriteriaCompare.Equal, model.ReaderStatus);
            }

            //摘要
            if (!string.IsNullOrEmpty(model.Summary))
            {
                string re = Regex.Replace(model.Summary, @"<[^<>]+>", "").Trim();
                criteria.AddRegularFilter(CriteriaLogical.And, KStarCcField.Summary, CriteriaCompare.Like, re);
            }

            //排序
            if (!string.IsNullOrEmpty(model.SortField) && !string.IsNullOrEmpty(model.SortDirection))
            {
                criteria.AddSortFilter(new SortFilter(model.SortField, model.SortDirection));
            }

            return criteria;
        }

        /// <summary>
        /// 获取查询列表（参与、申请、权限内）  查询流程
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public JsonResult GetMyInvolvedsOrRights(ProcessQueryModel model, string keyword)
        {
            KStarQueryProcessCriteria criteria = GetMyInvolvedsOrRightsCriteria(model, keyword);
            string user = User.Identity.Name;
            if (!String.IsNullOrEmpty(model.delegationUser))
            {
                user = model.delegationUser;
            }

            var res = _workFlowService.GetInvolvedsOrRights(user, criteria);
            return Json(new ResponseMode()
            {
                data = new
                {
                    total = res.TotalCount,
                    item = res.Items
                }
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取流程查询 KStarQueryProcessCriteria
        /// </summary>
        /// <param name="model"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        private KStarQueryProcessCriteria GetMyInvolvedsOrRightsCriteria(ProcessQueryModel model, string keyword)
        {
            KStarQueryProcessCriteria criteria = new KStarQueryProcessCriteria();
            criteria.PageIndex = model.PageIndex;
            criteria.PageSize = model.PageSize;

            //关键字 标题、编号、申请人
            if (!string.IsNullOrEmpty(keyword))
            {
                criteria.AddRegularFilter(CriteriaLogical.AndBracket, KStarQueryField.Folio, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, KStarQueryField.FormSubject, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, KStarQueryField.ApplicantAccount, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, KStarQueryField.ApplicantDisplayName, CriteriaCompare.Like, keyword, CriteriaLogical.EndBracket);
            }
            //流程编号
            if (!string.IsNullOrEmpty(model.ProcessNum))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarQueryField.Folio, CriteriaCompare.Like, model.ProcessNum);
            }
            //流程主题
            if (!string.IsNullOrEmpty(model.FormSubject))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarQueryField.FormSubject, CriteriaCompare.Like, model.FormSubject);
            }
            //申请人
            if (!string.IsNullOrEmpty(model.OriginatorAccount))
            {
                var userList = model.OriginatorAccount.Split(',').ToList();
                criteria.AddRegularFilter(CriteriaLogical.And, KStarQueryField.ApplicantAccount, CriteriaCompare.In, userList);
            }
            //开始时间
            if (model.SubmitStartDate.HasValue && model.SubmitEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarQueryField.SubmitDate, CriteriaCompare.Between, model.SubmitStartDate, model.SubmitEndDate);
            }
            else if (model.SubmitStartDate.HasValue && !model.SubmitEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarQueryField.SubmitDate, CriteriaCompare.Between, model.SubmitStartDate, DateTime.Now);
            }
            else if (!model.SubmitStartDate.HasValue && model.SubmitEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarQueryField.SubmitDate, CriteriaCompare.Between, DateTime.Parse(MixDate), model.SubmitEndDate);
            }
            //流程类别
            if (model.ProcessCategory != null && model.ProcessCategory.Any())
            {
                var processCode = CategoryConvertProcessCode(model.ProcessCategory);
                model.ProcessCode.AddRange(processCode);
            }
            //流程名称
            if (model.ProcessCode != null && model.ProcessCode.Any())
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarQueryField.ProcessCode, CriteriaCompare.In, model.ProcessCode);
            }
            //申请人 部门
            if (!string.IsNullOrEmpty(model.DepartmentId))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarQueryField.ApplicantOrgId, CriteriaCompare.Equal, model.DepartmentId);
            }
            //当前处理人
            if (!string.IsNullOrEmpty(model.CurrentUser))
            {
                //criteria.AddRegularFilter(CriteriaLogical.And, KStarQueryField.CurrentUser, CriteriaCompare.Equal, model.CurrentUser);
            }
            //结束时间
            if (model.FinishStartDate.HasValue && model.FinishEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarQueryField.FinishDate, CriteriaCompare.Between, model.FinishStartDate, model.FinishEndDate);
            }
            else if (model.FinishStartDate.HasValue && !model.FinishEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarQueryField.FinishDate, CriteriaCompare.Between, model.FinishStartDate, DateTime.Now);
            }
            else if (!model.FinishStartDate.HasValue && model.FinishEndDate.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarQueryField.FinishDate, CriteriaCompare.Between, DateTime.Parse(MixDate), model.FinishEndDate);
            }

            //摘要
            if (!string.IsNullOrEmpty(model.Summary))
            {
                string re = Regex.Replace(model.Summary, @"<[^<>]+>", "").Trim();
                criteria.AddRegularFilter(CriteriaLogical.And, KStarQueryField.Summary, CriteriaCompare.Like, re);
            }

            //流程状态
            if (model.ProcessStatus.HasValue)
            {
                criteria.AddRegularFilter(CriteriaLogical.And, KStarQueryField.Status, CriteriaCompare.Equal, model.ProcessStatus);
            }

            //排序
            if (!string.IsNullOrEmpty(model.SortField) && !string.IsNullOrEmpty(model.SortDirection))
            {
                criteria.AddSortFilter(new SortFilter(model.SortField, model.SortDirection));
            }

            criteria.AddRegularFilter(CriteriaLogical.And, KStarQueryField.Status, CriteriaCompare.NotEqual, (int)KStar.Platform.WorkFlow.Models.FormInstanceStatus.Draft);
            return criteria;
        }

        /// <summary>
        /// 获取草稿列表   流程草稿
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public JsonResult GetMyDrafts(int? pageIndex, int? pageSize, string keyword)
        {
            KStarDraftProcessCriteria criteria = new KStarDraftProcessCriteria();
            criteria.PageIndex = pageIndex ?? 1;
            criteria.PageSize = pageSize ?? 10;

            //关键字 标题、编号、申请人
            if (!string.IsNullOrEmpty(keyword))
            {
                criteria.AddRegularFilter(CriteriaLogical.AndBracket, KStarDraftField.ProcessName, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, KStarDraftField.FormSubject, CriteriaCompare.Like, keyword, CriteriaLogical.EndBracket);
            }

            var res = _workFlowService.GetDrafts(User.Identity.Name, criteria);
            return Json(new ResponseMode()
            {
                data = new
                {
                    total = res.TotalCount,
                    item = res.Items
                }
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取我的督办列表
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public JsonResult GetMySupervision(SupervisionModel model, string keyword)
        {
            KStarSupervisionCriteria criteria = new KStarSupervisionCriteria();
            criteria.PageIndex = model.PageIndex;
            criteria.PageSize = model.PageSize;

            //关键字 标题、编号、申请人
            if (!string.IsNullOrEmpty(keyword))
            {
                criteria.AddRegularFilter(CriteriaLogical.OrBracket, SupervisionField.Folio, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, SupervisionField.FormSubject, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, SupervisionField.ApplicantAccount, CriteriaCompare.Like, keyword, CriteriaLogical.EndBracket);
            }
            //流程编号
            if (!string.IsNullOrEmpty(model.ProcessNum))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, SupervisionField.Folio, CriteriaCompare.Like, model.ProcessNum);
            }
            //流程主题
            if (!string.IsNullOrEmpty(model.FormSubject))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, SupervisionField.FormSubject, CriteriaCompare.Like, model.FormSubject);
            }
            //申请人
            if (!string.IsNullOrEmpty(model.Originator))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, SupervisionField.ApplicantAccount, CriteriaCompare.Equal, model.Originator);
            }
            //当前处理人
            if (!string.IsNullOrEmpty(model.CurrentUser))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, SupervisionField.CurrentUser, CriteriaCompare.Equal, model.CurrentUser);
            }
            //流程类别
            if (model.ProcessCategory != null && model.ProcessCategory.Any())
            {
                var processCode = CategoryConvertProcessCode(model.ProcessCategory);
                model.ProcessCode.AddRange(processCode);
            }
            //流程名称/编码
            if (model.ProcessCode != null && model.ProcessCode.Any())
            {
                criteria.AddRegularFilter(CriteriaLogical.And, SupervisionField.ProcessCode, CriteriaCompare.In, model.ProcessCode);
            }
            //申请人 部门
            if (!string.IsNullOrEmpty(model.DepartmentId))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, SupervisionField.ApplicantOrgId, CriteriaCompare.Equal, model.DepartmentId);
            }

            //开始时间
            criteria.AddRegularFilter(CriteriaLogical.And, SupervisionField.StartDate, CriteriaCompare.Between, model.SubmitStartDate ?? DateTime.Parse("1900-1-1"), model.SubmitEndDate ?? DateTime.Now);

            //排序
            if (!string.IsNullOrEmpty(model.SortField) && !string.IsNullOrEmpty(model.SortDirection))
            {
                criteria.AddSortFilter(new SortFilter(model.SortField, model.SortDirection));
            }

            var data = _workFlowService.GetSupervisionWorkItems(User.Identity.Name, criteria);
            return Json(new ResponseMode
            {
                data = new
                {
                    total = data.TotalCount,
                    item = data.Items
                }
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 同意
        /// </summary>
        /// <param name="sharedUser"></param>
        /// <param name="workItemId"></param>
        /// <returns></returns>
        public JsonResult PortalApprove(AuditModel model)
        {
            var queryMode = new Mvc.Common.Enum.QueryMode()
            {
                WorkId = model.WorkItemId
            };
            var formModel = (KStarFormModel)base.GetFormData(queryMode).Data;
            formModel.Operation.ActionName = "同意";
            var res = base.kStarFormHandleService.PortalApprove(formModel, User.Identity.Name, model.SharedUser, model.WorkItemId, model.Comment);

            return Json(new ResponseMode() { data = res });
        }

        /// <summary>
        /// 拒绝
        /// </summary>
        /// <param name="sharedUser"></param>
        /// <param name="workItemId"></param>
        /// <returns></returns>
        public JsonResult PortalRefused(AuditModel model)
        {
            var queryMode = new Mvc.Common.Enum.QueryMode()
            {
                WorkId = model.WorkItemId
            };
            var formModel = (KStarFormModel)base.GetFormData(queryMode).Data;
            formModel.Operation.ActionName = "拒绝";
            var res = base.kStarFormHandleService.PortalRefused(formModel, User.Identity.Name, model.SharedUser, model.WorkItemId, model.Comment);

            return Json(new ResponseMode() { data = res });
        }

        /// <summary>
        /// 沟通
        /// </summary>
        /// <param name="sharedUser">共享用户</param>
        /// <param name="workItemId">任务Id</param>
        /// <param name="toUser">被沟通人列表 UserAccount UserDisplayName</param>
        /// <param name="processNum">流程单号</param>
        /// <param name="comment">审批意见</param>
        /// <returns></returns>
        public JsonResult PortalCommunication(string sharedUser, long workItemId, string comment, string processNum, List<KStarFormUser> toUser)
        {
            var queryMode = new Mvc.Common.Enum.QueryMode()
            {
                WorkId = workItemId
            };
            var formModel = (KStarFormModel)base.GetFormData(queryMode).Data;
            formModel.Operation.ActionName = "沟通";
            var res = base.kStarFormHandleService.PortalCommunication(formModel, User.Identity.Name, sharedUser, workItemId, toUser, processNum, comment);


            return Json(new ResponseMode() { data = res });
        }

        /// <summary>
        /// 取消沟通
        /// </summary>
        /// <param name="sharedUser">共享用户</param>
        /// <param name="workItemId">任务Id</param>
        /// <param name="processNum">流程单号</param>
        /// <param name="comment">审批意见</param>
        /// <returns></returns>
        public JsonResult PortalCancelCommunicate(AuditModel model, string processNum)
        {
            var queryMode = new Mvc.Common.Enum.QueryMode()
            {
                WorkId = model.WorkItemId
            };
            var formModel = (KStarFormModel)base.GetFormData(queryMode).Data;
            formModel.Operation.ActionName = "取消沟通";
            var res = base.kStarFormHandleService.PortalCancelCommunicate(formModel, User.Identity.Name, model.SharedUser, model.WorkItemId, processNum, model.Comment);


            return Json(new ResponseMode() { data = res });
        }

        /// <summary>
        /// 沟通反馈
        /// </summary>
        /// <param name="sharedUser">共享用户</param>
        /// <param name="workItemId">任务Id</param>
        /// <param name="processNum">流程单号</param>
        /// <param name="comment">审批意见</param>
        /// <returns></returns>
        public JsonResult PortalCommunicateFeedback(AuditModel model, string processNum)
        {
            var queryMode = new Mvc.Common.Enum.QueryMode()
            {
                WorkId = model.WorkItemId
            };
            var formModel = (KStarFormModel)base.GetFormData(queryMode).Data;
            formModel.Operation.ActionName = "沟通反馈";
            var res = base.kStarFormHandleService.PortalCommunicateFeedback(formModel, User.Identity.Name, model.SharedUser, model.WorkItemId, processNum, model.Comment);


            return Json(new ResponseMode() { data = res });
        }

        /// <summary>
        /// 转办
        /// </summary>
        /// <param name="sharedUser"></param>
        /// <param name="workItemId"></param>
        /// <param name="toUser"></param>
        /// <returns></returns>
        public JsonResult PortalRedirect(string sharedUser, long workItemId, List<KStarFormUser> toUser, string comment)
        {
            var queryMode = new Mvc.Common.Enum.QueryMode()
            {
                WorkId = workItemId
            };
            var formModel = (KStarFormModel)base.GetFormData(queryMode).Data;
            formModel.Operation.ActionName = "转办";
            var res = base.kStarFormHandleService.PortalRedirect(formModel, User.Identity.Name, sharedUser, toUser, workItemId, comment);

            return Json(new ResponseMode() { data = res });
        }

        /// <summary>
        /// 退回 节点 数据
        /// </summary>
        /// <param name="sharedUser"></param>
        /// <param name="workItemId"></param>
        /// <returns></returns>
        public JsonResult GetPortalRejectData(string sharedUser, long workItemId)
        {
            var res = _workFlowService.GetPortalRejectData(User.Identity.Name, sharedUser, workItemId);
            return Json(new ResponseMode() { data = new { res.IsRejectNotGoBack, res.BackActivitys } });
        }

        /// <summary>
        /// 退回
        /// </summary>
        /// <param name="model"></param>
        /// <param name="activityName"></param>
        /// <param name="isRejectNotGoBack"></param>
        /// <returns></returns>
        public JsonResult PortalReject(AuditModel model, string activityName, bool isRejectNotGoBack)
        {
            var queryMode = new Mvc.Common.Enum.QueryMode()
            {
                WorkId = model.WorkItemId
            };
            var formModel = (KStarFormModel)base.GetFormData(queryMode).Data;
            formModel.Operation.ActionName = "退回";
            var res = base.kStarFormHandleService.PortalReject(formModel, User.Identity.Name, model.SharedUser, model.WorkItemId, activityName, isRejectNotGoBack, model.Comment);

            return Json(new ResponseMode() { data = res });
        }

        /// <summary>
        /// 批量  审批
        /// </summary>
        /// <param name="models"></param>
        /// <returns></returns>
        public JsonResult MutliApprove(List<AuditModel> models)
        {
            models.ForEach(item =>
            {
                _workFlowService.PortalApprove(User.Identity.Name, item.SharedUser, item.WorkItemId, item.Comment);
            });
            return Json(new ResponseMode() { data = true });
        }

        /// <summary>
        /// 批量  审批
        /// </summary>
        /// <param name="models"></param>
        /// <returns></returns>
        [AllowAnonymous]
        public JsonResult MutliApproveForBatch(List<AuditModel> VModels)
        {
            VModels.ForEach(item =>
            {
                var queryMode = new Mvc.Common.Enum.QueryMode()
                {
                    WorkId = item.WorkItemId,
                    UserAccount = item.UserAccount,
                    SharedUser = item.SharedUser
                };
                var formModel = (KStarFormModel)base.GetFormData(queryMode).Data;
                formModel.Operation.Comment = item.Comment;
                base.Approve(Newtonsoft.Json.JsonConvert.SerializeObject(formModel));

            });
            return Json(new ResponseMode() { data = true });
        }

        /// <summary>
        /// 催办
        /// </summary>
        /// <param name="formList"></param>
        /// <param name="type">WaitRead方式 email邮件方式</param>
        /// <returns></returns>
        public JsonResult Remind(List<long> formList, List<string> type)
        {
            _processCCService.RemindExcute(formList, type);
            var response = new ResponseMode();
            response.message = "催办成功";
            return Json(response);
        }

        /// <summary>
        /// 批量  查阅
        /// </summary>
        /// <param name="ccIds"></param>
        /// <returns></returns>
        public JsonResult MutliDoRead(List<int> ccIds, List<long> formIds)
        {
            if (ccIds != null && ccIds.Count > 0)
            {
                for (int i = 0; i < ccIds.Count; i++)
                {
                    _workFlowService.PortalDoRead(User.Identity.Name, formIds[i], ccIds[i]);
                }
            }
            return Json(new ResponseMode() { data = true });
        }
        /// <summary>
        /// 一键审阅
        /// </summary>
        /// <returns></returns>
        public JsonResult AllDoRead()
        {
            _workFlowService.PortalAllDoRead(User.Identity.Name);
            return Json(new ResponseMode() { data = true });
        }

        /// <summary>
        /// 结束  流程
        /// </summary>
        /// <param name="models"></param>
        /// <returns></returns>
        public JsonResult MutliRefused(List<AuditModel> models)
        {
            models.ForEach(item =>
            {
                _workFlowService.PortalRefused(User.Identity.Name, item.SharedUser, item.WorkItemId, item.Comment);
            });
            return Json(new ResponseMode() { data = true });
        }

        /// <summary>
        /// 删除  草稿
        /// </summary>
        /// <param name="formIds"></param>
        /// <returns></returns>
        public JsonResult DeleteDraft(List<long> formIds)
        {
            var res = _workFlowService.DeleteDraft(User.Identity.Name, formIds);
            return Json(new ResponseMode() { data = res });
        }


        private WorklistItemCriteria BuildQueryFilter(CriteriaModel model, string keyword)
        {
            WorklistItemCriteria criteria = new WorklistItemCriteria();
            criteria.PageIndex = model.PageIndex;
            criteria.PageSize = model.PageSize;

            //关键字 标题、编号、申请人
            if (!string.IsNullOrEmpty(keyword))
            {
                criteria.AddRegularFilter(CriteriaLogical.AndBracket, WorklistItemField.Folio, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, WorklistItemField.FormSubject, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, WorklistItemField.ApplicantAccount, CriteriaCompare.Like, keyword);
                criteria.AddRegularFilter(CriteriaLogical.Or, WorklistItemField.ApplicantDisplayName, CriteriaCompare.Like, keyword, CriteriaLogical.EndBracket);
            }
            //流程编号
            if (!string.IsNullOrEmpty(model.ProcessNum))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, WorklistItemField.Folio, CriteriaCompare.Like, model.ProcessNum);
            }
            //流程主题
            if (!string.IsNullOrEmpty(model.FormSubject))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, WorklistItemField.FormSubject, CriteriaCompare.Like, model.FormSubject);
            }
            //申请人
            if (!string.IsNullOrEmpty(model.OriginatorAccount))
            {
                var userList = model.OriginatorAccount.Split(',').ToList();
                criteria.AddRegularFilter(CriteriaLogical.And, WorklistItemField.ApplicantAccount, CriteriaCompare.In, userList);
            }
            //流程类别
            if (model.ProcessCategory != null && model.ProcessCategory.Any())
            {
                var processCode = CategoryConvertProcessCode(model.ProcessCategory);
                model.ProcessCode.AddRange(processCode);
            }
            //流程名称/编码
            if (model.ProcessCode != null && model.ProcessCode.Any())
            {
                criteria.AddRegularFilter(CriteriaLogical.And, WorklistItemField.ProcessCode, CriteriaCompare.In, model.ProcessCode);
            }
            //申请人 部门
            if (!string.IsNullOrEmpty(model.DepartmentId))
            {
                criteria.AddRegularFilter(CriteriaLogical.And, WorklistItemField.ApplicantOrgId, CriteriaCompare.Equal, model.DepartmentId);
            }

            //摘要
            if (!string.IsNullOrEmpty(model.Summary))
            {
                string re = Regex.Replace(model.Summary, @"<[^<>]+>", "").Trim();
                criteria.AddRegularFilter(CriteriaLogical.And, WorklistItemField.Summary, CriteriaCompare.Like, re);
            }

            //开始时间
            criteria.AddRegularFilter(CriteriaLogical.And, WorklistItemField.StartDate, CriteriaCompare.Between, model.SubmitStartDate ?? DateTime.Parse("1900-1-1"), model.SubmitEndDate ?? DateTime.Now);

            //排序
            if (!string.IsNullOrEmpty(model.SortField) && !string.IsNullOrEmpty(model.SortDirection))
            {
                criteria.AddSortFilter(new SortFilter(model.SortField, model.SortDirection));
            }

            return criteria;
        }

        private List<string> CategoryConvertProcessCode(List<Guid> category)
        {
            return _processSetService.GetProcessCodeByCategory(category);
        }

        #region 列表导出

        /// <summary>
        /// 我的待办列表导出
        /// 导出查询到的所有数据、限制超过5000条数据提示用户不允许导出
        /// </summary>
        /// <param name="model"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        public FileResult ExportMyPendingTask(MyApplicationModel model, string keyword)
        {
            string exportTemplate = @"\Content\ExportTemplate\我的待办模板.xlsx";

            try
            {
                WorklistItemCriteria criteria = BuildQueryFilter(model, keyword);
                criteria.PageIndex = 1;
                criteria.PageSize = 5000;

                var pendingTasks = _workFlowService.GetKStarWorklistItems(User.Identity.Name, criteria);//获取导出数据
                var list = new List<MyPendingTaskModel>();
                if (pendingTasks.Items.Count > 0)
                {
                    foreach (var item in pendingTasks.Items)
                    {
                        list.Add(new MyPendingTaskModel()
                        {
                            Folio = item.Folio,
                            FormSubject = item.FormSubject,
                            ApplicantDisplayName = item.ApplicantDisplayName,
                            ActivityDisplayName = item.ActivityDisplayName,
                            SubmitDate = item.SubmitDate.ToString(),
                            WaittingTime = GetWaittingTime(item.StartDate)
                        });
                    }
                }

                var dataTable = ConvertHelper.ToDataTable(list);

                NpoiForExcel excel = new NpoiForExcel(Server.MapPath(exportTemplate));
                byte[] file = excel.DataTable2Excel(dataTable, "", false);

                var fileName = $"{ base.CurrentUser.UserFormDisplayName }-我的待办列表-{ DateTime.Now.ToString() }.xlsx";
                return File(file, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 我的已办列表导出
        /// 导出查询到的所有数据、限制超过5000条数据提示用户不允许导出
        /// </summary>
        /// <param name="model"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        public FileResult ExportMyInvolveds(InvolvedProcessModel model, string keyword)
        {
            string exportTemplate = @"\Content\ExportTemplate\我的已办模板.xlsx";

            try
            {
                KStarInvolvedProcessCriteria criteria = GetInvolvedProcessCriteria(model, keyword);
                criteria.PageIndex = 1;
                criteria.PageSize = 5000;

                var involvedsTasks = _workFlowService.GetInvolveds(User.Identity.Name, criteria);//获取导出数据
                var list = new List<MyInvolvedModel>();
                if (involvedsTasks.Items.Count > 0)
                {
                    foreach (var item in involvedsTasks.Items)
                    {
                        string approvalUsers = string.Empty;
                        if (!string.IsNullOrWhiteSpace(item.ActivityDisplayName) && !string.IsNullOrWhiteSpace(item.ApprovalUsers))
                        {
                            approvalUsers = $"{ item.ActivityDisplayName }:{ item.ApprovalUsers }";
                        }
                        list.Add(new MyInvolvedModel()
                        {
                            Folio = item.Folio,
                            FormSubject = item.FormSubject,
                            ApplicantDisplayName = item.ApplicantDisplayName,
                            ApprovalUsers = approvalUsers,
                            SubmitDate = item.SubmitDate.ToString(),
                            ProcessingDate = item.ProcessingDate.ToString(),
                            FinishDate = item.FinishDate.ToString(),
                            StatusName = GetProcessStatusName(item.StatusName)
                        });
                    }
                }

                var dataTable = ConvertHelper.ToDataTable(list);

                NpoiForExcel excel = new NpoiForExcel(Server.MapPath(exportTemplate));
                byte[] file = excel.DataTable2Excel(dataTable, "", false);

                var fileName = $"{ base.CurrentUser.UserFormDisplayName }-我的已办列表-{ DateTime.Now.ToString() }.xlsx";
                return File(file, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 我的申请列表导出
        /// 导出查询到的所有数据、限制超过5000条数据提示用户不允许导出
        /// </summary>
        /// <param name="model"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        public FileResult ExportMyApplications(MyApplicationModel model, string keyword)
        {
            string exportTemplate = @"\Content\ExportTemplate\我的申请模板.xlsx";

            try
            {
                KStarMyProcessCriteria criteria = GetApplicationCriteria(model, keyword);
                criteria.PageIndex = 1;
                criteria.PageSize = 5000;

                var applications = _workFlowService.GetApplications(User.Identity.Name, criteria);//获取导出数据
                var list = new List<MyApplicationExportModel>();
                if (applications.Items.Count > 0)
                {
                    foreach (var item in applications.Items)
                    {
                        string approvalUsers = string.Empty;
                        if (!string.IsNullOrWhiteSpace(item.ActivityDisplayName) && !string.IsNullOrWhiteSpace(item.ApprovalUsers))
                        {
                            approvalUsers = $"{ item.ActivityDisplayName }:{ item.ApprovalUsers }";
                        }
                        list.Add(new MyApplicationExportModel()
                        {
                            Folio = item.Folio,
                            FormSubject = item.FormSubject,
                            ApplicantDisplayName = item.ApplicantDisplayName,
                            ApprovalUsers = approvalUsers,
                            SubmitDate = item.SubmitDate.ToString(),
                            FinishDate = item.FinishDate.ToString(),
                            StatusName = GetProcessStatusName(item.StatusName)
                        });
                    }
                }

                var dataTable = ConvertHelper.ToDataTable(list);

                NpoiForExcel excel = new NpoiForExcel(Server.MapPath(exportTemplate));
                byte[] file = excel.DataTable2Excel(dataTable, "", false);

                var fileName = $"{ base.CurrentUser.UserFormDisplayName }-我的申请列表-{ DateTime.Now.ToString() }.xlsx";
                return File(file, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 我的待阅列表导出
        /// 导出查询到的所有数据、限制超过5000条数据提示用户不允许导出
        /// </summary>
        /// <param name="model"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        public FileResult ExportMyToDoRead(MyCCModel model, string keyword)
        {
            string exportTemplate = @"\Content\ExportTemplate\我的待阅模板.xlsx";

            try
            {
                model.ReaderStatus = 0;
                KStarCcProcessCriteria criteria = GetCcProcessCriteria(model, keyword);
                criteria.PageIndex = 1;
                criteria.PageSize = 5000;

                var myCCList = _workFlowService.GetCCs(User.Identity.Name, criteria);//获取导出数据
                var list = new List<MyToDoReadExportModel>();
                if (myCCList.Items.Count > 0)
                {
                    foreach (var item in myCCList.Items)
                    {
                        string approvalUsers = string.Empty;
                        if (!string.IsNullOrWhiteSpace(item.ActivityDisplayName) && !string.IsNullOrWhiteSpace(item.ApprovalUsers))
                        {
                            approvalUsers = $"{ item.ActivityDisplayName }:{ item.ApprovalUsers }";
                        }
                        list.Add(new MyToDoReadExportModel()
                        {
                            Folio = item.Folio,
                            FormSubject = item.FormSubject,
                            ApplicantDisplayName = item.ApplicantDisplayName,
                            ApprovalUsers = approvalUsers,
                            OriginatorName = item.OriginatorName,
                            ReceiverDate = item.ReceiverDate.ToString(),
                            StatusName = GetProcessStatusName(item.StatusName)
                        });
                    }
                }

                var dataTable = ConvertHelper.ToDataTable(list);

                NpoiForExcel excel = new NpoiForExcel(Server.MapPath(exportTemplate));
                byte[] file = excel.DataTable2Excel(dataTable, "", false);

                var fileName = $"{ base.CurrentUser.UserFormDisplayName }-我的待阅列表-{ DateTime.Now.ToString() }.xlsx";
                return File(file, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 我的已阅列表导出
        /// 导出查询到的所有数据、限制超过5000条数据提示用户不允许导出
        /// </summary>
        /// <param name="model"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        public FileResult ExportMyRead(MyCCModel model, string keyword)
        {
            string exportTemplate = @"\Content\ExportTemplate\我的已阅模板.xlsx";

            try
            {
                model.ReaderStatus = 1;
                KStarCcProcessCriteria criteria = GetCcProcessCriteria(model, keyword);
                criteria.PageIndex = 1;
                criteria.PageSize = 5000;

                var myCCList = _workFlowService.GetCCs(User.Identity.Name, criteria);//获取导出数据
                var list = new List<MyReadExportModel>();
                if (myCCList.Items.Count > 0)
                {
                    foreach (var item in myCCList.Items)
                    {
                        string approvalUsers = string.Empty;
                        if (!string.IsNullOrWhiteSpace(item.ActivityDisplayName) && !string.IsNullOrWhiteSpace(item.ApprovalUsers))
                        {
                            approvalUsers = $"{ item.ActivityDisplayName }:{ item.ApprovalUsers }";
                        }
                        list.Add(new MyReadExportModel()
                        {
                            Folio = item.Folio,
                            FormSubject = item.FormSubject,
                            ApplicantDisplayName = item.ApplicantDisplayName,
                            ApprovalUsers = approvalUsers,
                            ReceiverEndDate = item.ReceiverEndDate.ToString(),
                            OriginatorName = item.OriginatorName,
                            ReceiverDate = item.ReceiverDate.ToString(),
                            StatusName = GetProcessStatusName(item.StatusName)
                        });
                    }
                }

                var dataTable = ConvertHelper.ToDataTable(list);

                NpoiForExcel excel = new NpoiForExcel(Server.MapPath(exportTemplate));
                byte[] file = excel.DataTable2Excel(dataTable, "", false);

                var fileName = $"{ base.CurrentUser.UserFormDisplayName }-我的已阅列表-{ DateTime.Now.ToString() }.xlsx";
                return File(file, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 流程查询列表导出
        /// 导出查询到的所有数据、限制超过5000条数据提示用户不允许导出
        /// </summary>
        /// <param name="model"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        public FileResult ExportMyInvolvedsOrRights(ProcessQueryModel model, string keyword)
        {
            string exportTemplate = @"\Content\ExportTemplate\流程查询模板.xlsx";

            try
            {
                KStarQueryProcessCriteria criteria = GetMyInvolvedsOrRightsCriteria(model, keyword);
                criteria.PageIndex = 1;
                criteria.PageSize = 5000;

                string user = User.Identity.Name;
                if (!String.IsNullOrEmpty(model.delegationUser))
                {
                    user = model.delegationUser;
                }

                var myInvolvedsOrRights = _workFlowService.GetInvolvedsOrRights(User.Identity.Name, criteria);//获取导出数据
                var list = new List<MyApplicationExportModel>();
                if (myInvolvedsOrRights.Items.Count > 0)
                {
                    foreach (var item in myInvolvedsOrRights.Items)
                    {
                        string approvalUsers = string.Empty;
                        if (!string.IsNullOrWhiteSpace(item.ActivityDisplayName) && !string.IsNullOrWhiteSpace(item.ApprovalUsers))
                        {
                            approvalUsers = $"{ item.ActivityDisplayName }:{ item.ApprovalUsers }";
                        }
                        list.Add(new MyApplicationExportModel()
                        {
                            Folio = item.Folio,
                            FormSubject = item.FormSubject,
                            ApplicantDisplayName = item.ApplicantDisplayName,
                            ApprovalUsers = approvalUsers,
                            SubmitDate = item.SubmitDate.ToString(),
                            FinishDate = item.FinishDate.ToString(),
                            StatusName = GetProcessStatusName(item.StatusName)
                        });
                    }
                }

                var dataTable = ConvertHelper.ToDataTable(list);

                NpoiForExcel excel = new NpoiForExcel(Server.MapPath(exportTemplate));
                byte[] file = excel.DataTable2Excel(dataTable, "", false);

                var fileName = $"{ base.CurrentUser.UserFormDisplayName }-流程查询列表-{ DateTime.Now.ToString() }.xlsx";
                return File(file, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 获取任务等待时长
        /// </summary>
        /// <param name="dateTime">任务到达时间</param>
        /// <returns></returns>
        private string GetWaittingTime(DateTime? dateTime)
        {
            string waittingTime = string.Empty;
            var currentTime = DateTime.Now;

            var startDate = Convert.ToDateTime(dateTime);
            TimeSpan ts = currentTime - startDate;
            int days = 0; int hours = 0; int minutes = 0;
            if (ts.Days >= 1)
            {
                days = ts.Days;
            }
            if (ts.Hours >= 1)
            {
                hours = ts.Hours;
            }
            if (ts.Minutes >= 1)
            {
                minutes = ts.Minutes;
            }
            if (days > 0)
            {
                hours += days * 24;
            }
            if (hours > 0)
            {
                waittingTime = $"{ hours }小时{ minutes }分钟";
            }
            else
            {
                waittingTime = $"{ minutes }分钟";
            }

            return waittingTime;
        }

        /// <summary>
        /// 获取流程状态名称
        /// </summary>
        /// <param name="proStatusName"></param>
        /// <returns></returns>
        private string GetProcessStatusName(string proStatus)
        {
            switch (proStatus)
            {
                case "流程异常":
                    proStatus += "[Error]";
                    break;
                case "运行中":
                    proStatus += "[InOperation]";
                    break;
                case "审批通过":
                    proStatus += "[ApprovalComplete]";
                    break;
                case "作废":
                    proStatus += "[Cancel]";
                    break;
                case "删除":
                    proStatus += "[Delete]";
                    break;
                case "终审通过":
                    proStatus += "[FinalAdoption]";
                    break;
                case "拒绝":
                    proStatus += "[Refuse]";
                    break;
                case "异常结束":
                    proStatus += "[AbnormalEnd]";
                    break;
                default:
                    return proStatus;
            }
            return proStatus;
        }

        #endregion

    }
}