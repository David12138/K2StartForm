using KStar.Form.Mvc.App_GlobalResources;
using KStar.Form.Mvc.Models;
using KStar.Platform.Models;
using KStar.Platform.Service;
using KStar.Platform.Service.FormCommon;
using KStar.Platform.ViewModel;
using KStar.Platform.ViewModel.Workflow;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static KStar.Platform.ViewModel.Workflow.ProcPredictionModel;

namespace KStar.Form.Mvc.Controllers
{
    [ValidateInput(false)]
    public class FormController : KStarFormController
    {
        public IProcessDelegation _processDelegation { get; set; }

        public IOrganizationService _organizationService { get; set; }

        public IUserCommonOpinionService _userCommonOpinionService { get; set; }

        public FormController()
        {

        }

        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="userAccount"></param>
        /// <returns></returns>
        public JsonResult GetUserInfo(string userAccount)
        {
            var userInfo = _userService.GetUserInfo(userAccount);

            var response = new ResponseMode() { message = KStarForm_Prompt.GetSuccessfully };
            response.data = userInfo;
            if (userInfo == null)
            {
                response.code = 999;
                response.message = KStarForm_Prompt.GetFailure;
            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="approver"></param>
        /// <returns></returns>
        public JsonResult GetApproverData(string[] approver)
        {
            var response = new ResponseMode() { message = KStarForm_Prompt.GetSuccessfully };

            if (approver.Length == 0)
            {
                return Json(response, JsonRequestBehavior.AllowGet);
            }

            var userList = _userService.GetUserListData(approver);
            response.data = userList;
            if (userList.Count == 0)
            {
                response.code = 999;
                response.message = KStarForm_Prompt.GetFailure;
            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取用户常用语
        /// </summary>
        /// <param name="userAccount"></param>
        /// <returns></returns>
        public JsonResult GetUserCommonOpinions()
        {
            var userCommonOpinionList = _userCommonOpinionService.GetUserCommonOpinions(this.CurrentUser.SysId);

            var response = new ResponseMode() { message = KStarForm_Prompt.GetSuccessfully };
            response.data = userCommonOpinionList;
            if (userCommonOpinionList.Count == 0)
            {
                response.code = 999;
                response.message = KStarForm_Prompt.GetFailure;
            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 保存用户常用语
        /// </summary>
        /// <param name="userCommonOpinions"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult SaveUserCommonOpinions(SF_UserCommonOpinions addUserOpinion, SF_UserCommonOpinions deleteUserOpinion)
        {
            var response = new ResponseMode() { message = KStarForm_Prompt.SaveDraftSuccessfully };
            var add = true;
            var del = true;

            if (addUserOpinion != null)
            {
                addUserOpinion.Id = Guid.NewGuid();
                addUserOpinion.UserId = this.CurrentUser.SysId;
                addUserOpinion.CreateBy = this.CurrentUser.LoginAccount;
                add = _userCommonOpinionService.AddUserCommonOpinion(addUserOpinion);
            }

            if (deleteUserOpinion != null && deleteUserOpinion.Id != Guid.Empty)
            {
                deleteUserOpinion.ModifiedBy = this.CurrentUser.LoginAccount;
                del = _userCommonOpinionService.DeleteUserCommonOpinion(deleteUserOpinion);
            }

            if (!add && !del)
            {
                response.code = 999;
                response.message = KStarForm_Prompt.SaveDraftFailure;
            }

            response.data = addUserOpinion;
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 保存用户常用语
        /// </summary>
        /// <param name="delUserOpinion"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult DeleteUserCommonOpinion(SF_UserCommonOpinions delUserOpinion)
        {
            var response = new ResponseMode() { message = KStarForm_Prompt.SaveDraftSuccessfully };
            var del = false;

            if (delUserOpinion != null && delUserOpinion.Id != Guid.Empty)
            {
                delUserOpinion.ModifiedBy = this.CurrentUser.LoginAccount;
                del = _userCommonOpinionService.DeleteUserCommonOpinion(delUserOpinion);
            }

            if (!del)
            {
                response.code = 999;
                response.message = KStarForm_Prompt.SaveDraftFailure;
            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }



        /// <summary>
        /// 获取申请人岗位组织公司信息
        /// </summary>
        /// <param name="userAccount"></param>
        /// <returns></returns>
        public JsonResult GetUserPostionOrgInfo(string userAccount, string processCode)
        {
            var cultureName = string.Empty;
            HttpCookie cultureCookie = Request.Cookies["_culture"];
            if (cultureCookie != null)
            {
                cultureName = cultureCookie.Value;
            }
            else
            {
                cultureName = Request.UserLanguages != null && Request.UserLanguages.Length > 0 ? Request.UserLanguages[0] : null;
            }

            //审批人默认岗位列表
            var list = _userService.GetStartUserPostionOrgInfo(userAccount, processCode, cultureName);
            //审批人默认岗位
            var result = _organizationService.GetUserDefaultPostionOrgInfo(userAccount, processCode);

            var response = new ResponseMode() { message = KStarForm_Prompt.GetSuccessfully };
            response.data = new { list = list, positionOrg = result.PositionOrg, company = result.Company };
            if (list == null)
            {
                response.code = 999;
                response.message = KStarForm_Prompt.GetFailure;
            }
            return Json(response);
        }

        /// <summary>
        /// 前端加载申请人列表数据
        /// </summary>
        /// <param name="userAccount"></param>
        /// <param name="appUserAccount"></param>
        /// <param name="processCode"></param>
        /// <returns></returns>
        public JsonResult GetApplicationUserList(string userAccount, string appUserAccount, string processCode)
        {
            List<MD_User> applicationUserList = _processDelegation.GetDelegationUserList(userAccount, processCode, 1, appUserAccount);

            var response = new ResponseMode() { message = KStarForm_Prompt.GetSuccessfully };
            response.data = applicationUserList;
            if (applicationUserList == null)
            {
                response.code = 999;
                response.message = KStarForm_Prompt.GetFailure;
            }
            return Json(response);
        }

        public JsonResult GetFormContentField(long formId, string fieldName)
        {
            KStarFormData formData = _kStarFormStorageService.GetFormDataById(formId);
            FormContentModel formContent = formData.FormContent;
            var model = JObject.Parse(formContent.FormDataToJson);

            var response = new ResponseMode() { message = KStarForm_Prompt.GetSuccessfully };
            response.data = model[fieldName].ToString();
            if (model[fieldName] == null)
            {
                response.code = 999;
                response.message = KStarForm_Prompt.GetFailure;
            }
            return Json(response);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="orgSysId"></param>
        /// <returns></returns>
        public JsonResult GetApplicantCompanyInfo(Guid orgSysId)
        {
            var response = _userService.GetCompanyInfo(orgSysId);

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        //流程预判
        [AllowAnonymousAttribute]
        public JsonResult ProcPrediction(string jsonData)
        {
            KStarFormModel formModel = null;
            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData);
            //DOTO 被曝光说有常规流程，如果节点编码是乱序的，预判的节点排序是不对的。--等待案例验证这个bug
            var result = _kStarWorkFlowService.ProcPrediction(formModel);
            List<ProcPredictionDeal> procPredictionDealList = ConvertProcPredictionDeal(result);
            var response = new ResponseMode() { message = KStarForm_Prompt.GetSuccessfully };
            response.data = procPredictionDealList;
            if (procPredictionDealList == null)
            {
                response.code = 999;
                response.message = KStarForm_Prompt.GetFailure;
            }
            return Json(response);
        }

        #region 获取设置下一节点需要设置审批人的节点
        /// <summary>
        /// 获取设置下一节点需要设置审批人的节点
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        public JsonResult SetNextNodeApproves(string jsonData)
        {
            //KStarFormModel formModel = null;
            //var response = new ResponseMode() { message = KStarForm_Prompt.GetSuccessfully };

            //formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData);
            ////查询审批节点是否有需要设置下一节点审批人的数据
            //var data = _processActivityService.GetSetApproverActivity(formModel.Operation.ActivityName, formModel.FormInstance.ProcVersionID.Value);
            //if (data != null)
            //{
            //    List<ProcPredictionDeal> lstNode = new List<ProcPredictionDeal>();

            //    foreach (var item in data)
            //    {
            //        lstNode.Add(new ProcPredictionDeal { ActivityDisplayName = item.ActivityName, ActivityID = item.ActivityId.Value, ActivityName = item.ActivityName });
            //    }
            //    response.data = lstNode;


            //    response.message = "设置审批人";
            //    return Json(response);
            //}            
            //return Json(response);




            KStarFormModel formModel = null;
            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData);
            //DOTO 被曝光说有常规流程，如果节点编码是乱序的，预判的节点排序是不对的。--等待案例验证这个bug
            var result = _kStarWorkFlowService.ProcPrediction(formModel);
            List<ProcPredictionDeal> procPredictionDealList = ConvertProcPredictionDeal(result);

            //查询审批节点是否有需要设置下一节点审批人的数据
            var data = _processActivityService.GetSetApproverActivity(formModel.Operation.ActivityName, formModel.FormInstance.ProcVersionID.Value);
            if (data != null)
            {
                var tempProcPredictionDealList = new List<ProcPredictionDeal>(procPredictionDealList);
                foreach (var item in tempProcPredictionDealList)
                {
                    if (data.Where(p => p.SetApproverActivityName == item.ActivityName).Count() <= 0)
                    {
                        procPredictionDealList.RemoveAll(p => p.ActivityName == item.ActivityName);
                    }
                }
            }

            var response = new ResponseMode() { message = KStarForm_Prompt.GetSuccessfully };
            response.data = procPredictionDealList;
            if (procPredictionDealList == null)
            {
                response.code = 999;
                response.message = KStarForm_Prompt.GetFailure;
            }
            return Json(response);
        }
        #endregion

        protected List<ProcPredictionDeal> ConvertProcPredictionDeal(List<ProcPredictionModel> procPredictionList)
        {
            List<ProcPredictionDeal> procPredictionDealList = new List<ProcPredictionDeal>();
            procPredictionList = procPredictionList.Where(p => p.ActivityName != Platform.Infrastructure.SystemSettings.ReActivity).ToList();
            List<string> userNames = new List<string>();
            foreach (ProcPredictionModel item in procPredictionList)
            {
                var userStr = GetApproveName(item);
                ProcPredictionDeal procPredictionDeal = new ProcPredictionDeal
                {
                    ActivityID = item.ActivityID,
                    ActivityName = item.ActivityName,
                    ActivityDisplayName = item.ActivityDisplayName,
                    Status = item.Status,
                    ApprovalMode = item.ApprovalMode,
                    ProcessingSource = item.ProcessingSource,
                    Settings = item.Settings,
                    Sort = item.Sort,
                    StartTime = item.StartTime,
                    NoneProcessing = item.NoneProcessing,
                    SelectActivityName = item.SelectActivityName,
                    Approvers = GetApproves(item),
                    ApproverName = userStr.ApproveName
                    //,ApproverPositions = userStr[1]
                };

                userNames.AddRange(procPredictionDeal.Approvers.Select(t => t.UserAccount));
                procPredictionDealList.Add(procPredictionDeal);
            }
            //离职状态
            procPredictionDealList = SetApproversUserUserStatus(procPredictionDealList, userNames);
            return procPredictionDealList;
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
        public JsonResult ProcPredictionApprover(Guid activityID, Guid applicantOrgId, string key, int? pageIndex, int? pageSize)
        {
            pageIndex = pageIndex ?? 1;
            pageSize = pageSize ?? 10;
            key = key.ToUpper();

            //手动选择(有范围)
            string errorMsg = "";
            var result = _kStarWorkFlowService.ProcPredictionApprover(activityID, applicantOrgId, out errorMsg, null);
            if (!string.IsNullOrEmpty(key))
            {
                result = result.Where(p => (p.UserDisplayName == null ? false : p.UserDisplayName.ToUpper().Contains(key))
                    || (p.LoginAccount == null ? false : p.LoginAccount.ToUpper().Contains(key))
                    || (p.PYFull == null ? false : p.PYFull.ToUpper().Contains(key))
                    || (p.PYInitials == null ? false : p.PYInitials.ToUpper().Contains(key))).ToList();
            }
            return Json(new { item = result, count = result.Count, errorMsg = errorMsg }, JsonRequestBehavior.AllowGet);

        }


        private List<UserModel> GetApproves(ProcPredictionModel procPredictionModel)
        {
            List<UserModel> userList = new List<UserModel>();
            if (procPredictionModel.Approvers == null || procPredictionModel.Approvers.Count == 0)
            {
                return userList;
            }
            foreach (ApproversGroupModel item in procPredictionModel.Approvers)
            {
                if (item.Users != null)
                {
                    userList.AddRange(item.Users);
                }
            }
            HashSet<UserModel> list = new HashSet<UserModel>();
            foreach (UserModel item in userList)
            {
                if (list.FirstOrDefault(f => f.UserAccount == item.UserAccount && f.ActionName == item.ActionName) == null)
                {
                    list.Add(item);
                }
            }
            return list.ToList();
        }


        /// <summary>
        /// 20191212 增加返回 岗位串，对函数改造
        /// </summary>
        /// <param name="procPredictionModel"></param>
        /// <returns></returns>
        private (string ApproveName, string ApproverPositions) GetApproveName(ProcPredictionModel procPredictionModel)
        {
            List<UserModel> userList = new List<UserModel>();
            if (procPredictionModel.Approvers == null)
            {
                return (null, null);
            }
            foreach (ApproversGroupModel item in procPredictionModel.Approvers)
            {
                if (item.Users != null)
                {
                    userList.AddRange(item.Users);
                }
            }
            HashSet<UserModel> list = new HashSet<UserModel>();
            foreach (UserModel item in userList)
            {
                //不要加入重复审批人
                if (list.FirstOrDefault(f => f.UserAccount == item.UserAccount && f.ActionName == item.ActionName) == null)
                {
                    list.Add(item);
                }
            }
            return (string.Join(";", list.Select(r => r.UserDisplayName)), string.Join(";", list.Select(r => r.UserPositionName)));
        }

        /// <summary>
        /// 获取当前处理人
        /// 1 porttal 表单页面 流程记录-审批记录： 获取“当前处理人”使用 
        /// </summary>
        /// <param name="formId"></param>
        /// <returns></returns>
        public JsonResult GetCurrApproversData(long formId)
        {
            var result = _kStarWorkFlowService.GetCurrApproversProcessing(formId);
            List<ProcPredictionDeal> procPredictionDealList = new List<ProcPredictionDeal>();
            List<string> userNames = new List<string>();
            foreach (ProcPredictionModel item in result)
            {
                var userStr = GetApproveName(item);

                ProcPredictionDeal procPredictionDeal = new ProcPredictionDeal
                {
                    ActivityName = item.ActivityName,
                    ActivityDisplayName = item.ActivityDisplayName,
                    Status = item.Status,
                    Sort = item.Sort,
                    ApprovalMode = item.ApprovalMode,
                    StartTime = item.StartTime,
                    Settings=item.Settings,
                    ProcessingSource=item.ProcessingSource,
                    ActivityID=item.ActivityID,
                    NoneProcessing = item.NoneProcessing,
                    SelectActivityName = item.SelectActivityName,
                    Approvers = GetApproves(item),
                    ApproverName = userStr.ApproveName,
                    ApproverPositions = userStr.ApproverPositions
                };
                userNames.AddRange(procPredictionDeal.Approvers.Select(t => t.UserAccount));
                procPredictionDealList.Add(procPredictionDeal);
            }
            procPredictionDealList = SetApproversUserUserStatus(procPredictionDealList, userNames);
            var response = new ResponseMode() { message = KStarForm_Prompt.GetSuccessfully };
            response.data = procPredictionDealList;
            if (procPredictionDealList == null)
            {
                response.code = 999;
                response.message = KStarForm_Prompt.GetFailure;
            }
            return Json(response);
        }

        #region Private
        /// <summary>
        /// 设置用户离职状态
        /// </summary>
        /// <param name="procs"></param>
        /// <param name="userNames"></param>
        /// <returns></returns>
        private List<ProcPredictionDeal> SetApproversUserUserStatus(List<ProcPredictionDeal> procs, List<string> userNames)
        {
            userNames = userNames.Distinct().ToList();
            var users = _userService.GetUserListUserStatus(userNames.ToArray());

            foreach (var item in procs)
            {
                foreach (var user in item.Approvers)
                {
                    var userInfo = users.Where(t => t.UserAccount == user.UserAccount).FirstOrDefault();
                    if (userInfo != null)
                    {
                        user.UserStatus = userInfo.UserStatus;
                    }
                }
            }
            return procs;
        }
        #endregion
    }
}
