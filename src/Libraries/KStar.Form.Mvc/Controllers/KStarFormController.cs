using KStar.Form.Mvc.App_GlobalResources;
using KStar.Form.Mvc.Common.Enum;
using KStar.Form.Mvc.Extension;
using KStar.Form.Mvc.Form;
using KStar.Form.Mvc.Models;
using KStar.Platform.Common;
using KStar.Platform.Service;
using KStar.Platform.Service.Business;
using KStar.Platform.ViewModel.Workflow;
using KStar.Platform.WorkFlow.Service;
using Newtonsoft.Json;
using System;
using System.Web.Mvc;

namespace KStar.Form.Mvc.Controllers
{

    public abstract class KStarFormController : BaseController
    {
        public IKStarWorkFlowService _kStarWorkFlowService { get; set; }
        public IKStarFormStorageService _kStarFormStorageService { get; set; }
        public KStarFormHandleService kStarFormHandleService { get; set; }
        public IProcessActivityService _processActivityService { get; set; }


        #region 审批动作
        /// <summary>
        /// 发起流程
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Submit(string jsonData)
        {
            KStarFormModel formModel = null;
            var response = new ResponseMode() { message = KStarForm_Prompt.SubmitSuccessfully };
            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });

            formModel.UserAgent = HttpContext.Request.UserAgent;
            formModel.ViewUrl = Request.UrlReferrer.LocalPath;

            var result = kStarFormHandleService.Submit(formModel);
            if (!result.IsSuccess)
            {
                response.code = 998;
                response.message = KStarForm_Prompt.SubscribeFailure;
            }
            response.data = (result.IsSuccess, result.FormInstance.Id, result.FormInstance.Folio);

            return Json(response);
        }
        /// <summary>
        /// 重新提交
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult ReSubmit(string jsonData)
        {
            KStarFormModel formModel = null;
            var response = new ResponseMode() { message = KStarForm_Prompt.ReSubmitSuccessfully };
            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });
            formModel.UserAgent = HttpContext.Request.UserAgent;
            formModel.ViewUrl = Request.UrlReferrer.LocalPath;
            var result = kStarFormHandleService.ReSubmit(formModel);
            if (!result.IsSuccess)
            {
                response.code = 998;
                response.message = KStarForm_Prompt.ReSubmitFailure;
            }
            return Json(response);
        }
        /// <summary>
        /// 保存草稿
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns
        [HttpPost]
        public JsonResult SaveDraft(string jsonData)
        {
            KStarFormModel formModel = null;
            var response = new ResponseMode() { message = KStarForm_Prompt.SaveDraftSuccessfully };
            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });
            formModel.UserAgent = HttpContext.Request.UserAgent;
            formModel.ViewUrl = Request.UrlReferrer.LocalPath;
            var result = kStarFormHandleService.SaveDraft(formModel);
            if (!result.IsSuccess)
            {
                response.code = 998;
                response.message = KStarForm_Prompt.SaveDraftFailure;
            }
            return Json(response);
        }
        /// <summary>
        /// 审批 同意
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Approve(string jsonData)
        {
            KStarFormModel formModel = null;

            var response = new ResponseMode() { message = KStarForm_Prompt.ApproveSuccessfully };

            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });
            formModel.UserAgent = HttpContext.Request.UserAgent;
            formModel.ViewUrl = Request.UrlReferrer?.LocalPath;
            var result = kStarFormHandleService.Approve(formModel);
            if (!result.IsSuccess)
            {
                response.code = 998;
                response.message = KStarForm_Prompt.ApproveFailure;
            }
            return Json(response);
        }
        /// <summary>
        /// 作废流程  申请人
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Cancel(string jsonData)
        {
            KStarFormModel formModel = null;
            var response = new ResponseMode() { message = KStarForm_Prompt.CancelSuccessfully };

            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });
            formModel.UserAgent = HttpContext.Request.UserAgent;
            formModel.ViewUrl = Request.UrlReferrer.LocalPath;
            var result = kStarFormHandleService.Cancel(formModel);
            if (!result.IsSuccess)
            {
                response.code = 998;
                response.message = KStarForm_Prompt.CancelFailure;
            }
            return Json(response);
        }

        #region 退回
        /// <summary>
        /// 退回
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Reject(string jsonData)
        {
            KStarFormModel formModel = null;

            var response = new ResponseMode() { message = KStarForm_Prompt.RejectSuccessfully };

            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });

            formModel.UserAgent = HttpContext.Request.UserAgent;
            formModel.ViewUrl = Request.UrlReferrer.LocalPath;
            var result = kStarFormHandleService.Reject(formModel);

            //TODO 失败后还原修改项
            if (!result.IsSuccess)
            {
                response.code = 998;
                response.message = KStarForm_Prompt.RejectFailure;
            }

            return Json(response);
        }
        #endregion

        /// <summary>
        /// 转办
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Redirect(string jsonData)
        {
            KStarFormModel formModel = null;

            var response = new ResponseMode() { message = KStarForm_Prompt.RedirectSuccessfully };

            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });
            formModel.UserAgent = HttpContext.Request.UserAgent;
            formModel.ViewUrl = Request.UrlReferrer.LocalPath;
            var result = kStarFormHandleService.Redirect(formModel);
            if (!result.IsSuccess)
            {
                response.code = 998;
                response.message = KStarForm_Prompt.RedirectFailure;
            }
            return Json(response);
        }
        /// <summary>
        /// 撤回
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Withdrawn(string jsonData)
        {
            KStarFormModel formModel = null;

            var response = new ResponseMode() { message = KStarForm_Prompt.WithdrawnSuccessfully };

            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });

            formModel.UserAgent = HttpContext.Request.UserAgent;
            formModel.ViewUrl = Request.UrlReferrer.LocalPath;
            var result = kStarFormHandleService.Withdrawn(formModel);
            if (!result.IsSuccess)
            {
                response.code = 998;
                response.message = KStarForm_Prompt.WithdrawnFailure;
            }
            return Json(response);
        }
        /// <summary>
        /// 沟通
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Communication(string jsonData)
        {
            KStarFormModel formModel = null;

            var response = new ResponseMode() { message = KStarForm_Prompt.CommunicationSuccessfully };

            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });
            formModel.UserAgent = HttpContext.Request.UserAgent;
            formModel.ViewUrl = Request.UrlReferrer.LocalPath;
            var result = kStarFormHandleService.Communication(formModel);
            if (!result.IsSuccess)
            {
                response.code = 998;
                response.message = KStarForm_Prompt.CommunicationFailure;
            }
            return Json(response);
        }
        /// <summary>
        /// 取消沟通
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult CancelCommunicate(string jsonData)
        {
            KStarFormModel formModel = null;

            var response = new ResponseMode() { message = KStarForm_Prompt.CancelCommunicateSuccessfully };

            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });
            formModel.UserAgent = HttpContext.Request.UserAgent;
            formModel.ViewUrl = Request.UrlReferrer.LocalPath;
            var result = kStarFormHandleService.CancelCommunicate(formModel);
            if (!result.IsSuccess)
            {
                response.code = 998;
                response.message = KStarForm_Prompt.CancelCommunicateFailure;
            }
            return Json(response);
        }
        /// <summary>
        /// 沟通反馈
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult CommunicateFeedback(string jsonData)
        {
            KStarFormModel formModel = null;

            var response = new ResponseMode() { message = KStarForm_Prompt.CommunicateFeedbackSuccessfully };

            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });
            formModel.UserAgent = HttpContext.Request.UserAgent;
            formModel.ViewUrl = Request.UrlReferrer.LocalPath;
            var result = kStarFormHandleService.CommunicateFeedback(formModel);
            if (!result.IsSuccess)
            {
                response.code = 998;
                response.message = KStarForm_Prompt.CommunicateFeedbackFailure;
            }
            return Json(response);
        }
        /// <summary>
        /// 传阅
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Circulate(string jsonData)
        {
            KStarFormModel formModel = null;

            var response = new ResponseMode() { message = KStarForm_Prompt.CirculateSuccessfully };

            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });
            formModel.UserAgent = HttpContext.Request.UserAgent;
            formModel.ViewUrl = Request.UrlReferrer.LocalPath;
            var result = kStarFormHandleService.Circulate(formModel);
            if (!result.IsSuccess)
            {
                response.code = 998;
                response.message = KStarForm_Prompt.CirculateFailure;
            }
            return Json(response);
        }
        /// <summary>
        /// 拒绝
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Refused(string jsonData)
        {
            KStarFormModel formModel = null;

            var response = new ResponseMode() { message = KStarForm_Prompt.RefusedSuccessfully };

            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });
            formModel.UserAgent = HttpContext.Request.UserAgent;
            formModel.ViewUrl = Request.UrlReferrer.LocalPath;
            var result = kStarFormHandleService.Refused(formModel);
            if (!result.IsSuccess)
            {
                response.code = 998;
                response.message = KStarForm_Prompt.RejectFailure;
            }
            return Json(response);
        }
        /// <summary>
        /// 订阅
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Subscribe(string jsonData)
        {
            KStarFormModel formModel = null;

            var response = new ResponseMode() { message = KStarForm_Prompt.SubscribeSuccessfully };

            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });
            formModel.UserAgent = HttpContext.Request.UserAgent;
            formModel.ViewUrl = Request.UrlReferrer.LocalPath;
            var result = kStarFormHandleService.Subscribe(formModel);
            if (!result.IsSuccess)
            {
                response.code = 998;
                response.message = KStarForm_Prompt.SubscribeFailure;
            }
            return Json(response);
        }
        /// <summary>
        /// 取消订阅
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult CancelSubscribe(string jsonData)
        {
            KStarFormModel formModel = null;


            var response = new ResponseMode() { message = KStarForm_Prompt.CancelSubscribeSuccessfully };

            formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });
            formModel.UserAgent = HttpContext.Request.UserAgent;
            formModel.ViewUrl = Request.UrlReferrer.LocalPath;
            var result = kStarFormHandleService.CancelSubscribe(formModel);
            if (!result.IsSuccess)
            {
                response.code = 998;
                response.message = KStarForm_Prompt.CancelSubscribeFailure;
            }
            return Json(response);
        }
        #endregion

        #region 接口调用

        #endregion

        #region 表单初始化
        public virtual JsonResult GetFormData(QueryMode queryMode)
        {
            if (queryMode.ProcessCode == "null")
                queryMode.ProcessCode = null;
            if (queryMode.SharedUser == "null")
                queryMode.SharedUser = null;

            var workMode = this.GetWorkMode(queryMode);
            #region formInput

            var formInput = new KStarFormInput();
            //formInput.UserName = CurrentUser.UserAccount;//Startup
            formInput.UserName = !string.IsNullOrEmpty(queryMode.UserAccount) ? queryMode.UserAccount : CurrentUser?.UserAccount;
            formInput.ProcessCode = queryMode.ProcessCode;//Startup
            formInput.Url = queryMode.Url;
            formInput.SN = queryMode.SN;
            formInput.WorkItemId = queryMode.WorkId;
            formInput.FormId = queryMode.FormId;
            formInput.SharedUser = queryMode.SharedUser;
            formInput.CcId = queryMode.CcId;
            formInput.Token = queryMode.token;
            #endregion
            var model = kStarFormHandleService.GetFormData(queryMode, formInput, workMode, CurrentUser?.UserAccount);
            return Json(model, JsonRequestBehavior.AllowGet);
        }


        //public virtual JsonResult GetEnBaseInfo(string account, Guid positionId, Guid orgId)
        //{ 

        //}

        #endregion

        #region Api

        /// <summary>
        /// Api 发起流程
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost]
        public JsonResult ApiSubmit(string jsonData)
        {
            KStarFormModel formModel = null;
            var response = new ResponseMode() { message = "提交成功" };
            try
            {
                QueryMode queryMode = new QueryMode() { K2Id = this.GetK2ID() };
                var workMode = this.GetWorkMode(queryMode);

                formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
                {
                    DateTimeZoneHandling = DateTimeZoneHandling.Local
                });
                if (workMode == WorkMode.PreStartup)
                {
                    //预发起模式校验K2ID重复提交
                    var formInstance = _kStarFormStorageService.GetPrcServer_FormInstanceByFolio(queryMode.K2Id);
                    if (formInstance != null)
                    {
                        //表单状态为已提交，请勿重复提交！
                        throw new KStarCustomException(KStarForm_Prompt.FormIDRepeatSubmit);
                    }
                }

                formModel.UserAgent = HttpContext.Request.UserAgent;
                var result = kStarFormHandleService.Submit(formModel);
                if (!result.IsSuccess)
                {
                    response.code = 998;
                    response.message = KStarForm_Prompt.SubmitFailure;
                }

                response.data = (result.IsSuccess, result.FormInstance.Id, result.FormInstance.Folio);
            }
            catch (Exception ex)
            {
                throw new KStarCustomException(ex.Message);
            }

            return Json(response);
        }

        #endregion


        #region  日志
        /// <summary>
        /// 访问日志
        /// </summary>
        /// <param name="logId"></param>
        public void UpdateLog(long logId)
        {
            _kStarWorkFlowService.ChangeFormLog(logId);
        }
        /// <summary>
        /// 行为日志
        /// </summary>
        public void ActionLog(string jsonData, string url)
        {
            var formModel = JsonConvert.DeserializeObject<KStarFormModel>(jsonData, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            });
            var log = new Platform.Models.PrcServer_FormLog()
            {
                IsDeleted = false,
                Url = url,
                CreateBy = CurrentUser.LoginAccount,
                CreateTime = DateTime.Now,
                FormId = formModel.FormInstance.Id,
                UserAccount = CurrentUser.LoginAccount,
                ActionName = formModel.Operation.ActionName,
                LogType = (int)Platform.WorkFlow.Models.LogType.Action,
                StartDate = DateTime.Now,
                UserPositionId = formModel.FormInstance.ApplicantPositionId,
                UserPositionName = formModel.FormInstance.ApplicantPositionName,
                UserDisplayName = CurrentUser.UserDisplayName,
            };
            _kStarFormStorageService.SaveFormLog(log);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="actionName"></param>
        /// <param name="url"></param>
        public void PortalLog(string actionName, string url)
        {
            var log = new Platform.Models.PrcServer_FormLog()
            {
                IsDeleted = false,
                Url = url,
                CreateBy = CurrentUser.LoginAccount,
                CreateTime = DateTime.Now,
                UserAccount = CurrentUser.LoginAccount,
                ActionName = actionName,
                LogType = (int)Platform.WorkFlow.Models.LogType.Portal,
                StartDate = DateTime.Now,
                UserDisplayName = CurrentUser.UserDisplayName,
            };
            _kStarFormStorageService.SaveFormLog(log);
        }
        #endregion

        #region 审核要点
        /// <summary>
        /// 审核要点
        /// </summary>
        /// <param name="procVersionID">使用的版本</param>
        /// <param name="actName">节点名称</param>
        /// <returns></returns>
        public void GetApprovalNote(Guid procVersionID, string actName)
        {
            _kStarWorkFlowService.GetApprovalNote(procVersionID, actName);
        }
        #endregion
    }
}
