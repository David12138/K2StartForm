using Autofac.Annotation;
using Autofac.Aspect;
using KStar.Domain.Service.Maintenance;
using KStar.Form.Domain.ViewModels.BPMService.Requst;
using KStar.Form.Mvc.App_GlobalResources;
using KStar.Form.Mvc.Common.Enum;
using KStar.Form.Mvc.FormAttribute;
using KStar.Platform.Common;
using KStar.Platform.Service;
using KStar.Platform.ViewModel.Workflow;
using KStar.Platform.WorkFlow.Service;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KStar.Form.Mvc.Form
{
    [Component]
    [Aspect]
    public class KStarFormHandleService
    {
        public IKStarWorkFlowService _kStarWorkFlowService;
        public IKStarFormStorageService _kStarFormStorageService;
        public IPrcServerInterfaceLogService _bpmInterfaceLogService;

        public KStarFormHandleService(IKStarWorkFlowService kStarWorkFlowService, IKStarFormStorageService kStarFormStorageService, IPrcServerInterfaceLogService bpmInterfaceLogService)
        {
            _kStarWorkFlowService = kStarWorkFlowService;
            _kStarFormStorageService = kStarFormStorageService;
            _bpmInterfaceLogService = bpmInterfaceLogService;
        }


        #region 审批动作
        /// <summary>
        /// 发起流程
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [SubmitInterceptor]
        public virtual KStarFormModel Submit(KStarFormModel formModel)
        {
            var result = _kStarWorkFlowService.Submit(formModel);
            formModel.FormInstance.Id = result.FormId;
            formModel.FormInstance.Folio = result.Folio;
            formModel.IsSuccess = result.Results;

            return formModel;
        }
        /// <summary>
        /// 重新提交
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [ReSubmitInterceptor]
        public virtual KStarFormModel ReSubmit(KStarFormModel formModel)
        {
            var result = _kStarWorkFlowService.ReSubmit(formModel);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 保存草稿
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns
        [SaveDraftInterceptor]
        public virtual KStarFormModel SaveDraft(KStarFormModel formModel)
        {
            var result = _kStarWorkFlowService.SaveDraft(formModel);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 审批 同意
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [ApproveInterceptor]
        public virtual KStarFormModel Approve(KStarFormModel formModel)
        {
            var result = _kStarWorkFlowService.Approve(formModel);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 作废流程  申请人
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [CancelInterceptor]
        public virtual KStarFormModel Cancel(KStarFormModel formModel)
        {
            var result = _kStarWorkFlowService.Cancel(formModel);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 退回
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [RejectInterceptor]
        public virtual KStarFormModel Reject(KStarFormModel formModel)
        {
            var result = _kStarWorkFlowService.Reject(formModel);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 转办
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [RedirectInterceptor]
        public virtual KStarFormModel Redirect(KStarFormModel formModel)
        {
            var result = _kStarWorkFlowService.Redirect(formModel);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 撤回
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [WithdrawnInterceptor]
        public virtual KStarFormModel Withdrawn(KStarFormModel formModel)
        {
            var result = _kStarWorkFlowService.Withdrawn(formModel);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 沟通
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [CommunicationInterceptor]
        public virtual KStarFormModel Communication(KStarFormModel formModel)
        {
            var result = _kStarWorkFlowService.Communication(formModel);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 取消沟通
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [CancelCommunicateInterceptor]
        public virtual KStarFormModel CancelCommunicate(KStarFormModel formModel)
        {
            var result = _kStarWorkFlowService.CancelCommunicate(formModel);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 沟通反馈
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [CommunicateFeedbackInterceptor]
        public virtual KStarFormModel CommunicateFeedback(KStarFormModel formModel)
        {
            var result = _kStarWorkFlowService.CommunicateFeedback(formModel);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 传阅
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [CirculateInterceptor]
        public virtual KStarFormModel Circulate(KStarFormModel formModel)
        {
            var result = _kStarWorkFlowService.Circulate(formModel);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 拒绝
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [RefusedInterceptor]
        public virtual KStarFormModel Refused(KStarFormModel formModel)
        {
            var result = _kStarWorkFlowService.Refused(formModel);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 订阅
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [SubscribeInterceptor]
        public virtual KStarFormModel Subscribe(KStarFormModel formModel)
        {
            var result = _kStarWorkFlowService.Subscribe(formModel);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 取消订阅
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        [CancelSubscribeInterceptor]
        public virtual KStarFormModel CancelSubscribe(KStarFormModel formModel)
        {
            var result = _kStarWorkFlowService.CancelSubscribe(formModel);
            formModel.IsSuccess = result;
            return formModel;
        }
        #endregion

        #region 表单初始化

        [FormDataInterceptor]
        public virtual KStarFormModel GetFormData(QueryMode queryMode, KStarFormInput formInput, WorkMode workMode, string userName)
        {
            var model = new KStarFormModel();
            switch (workMode)
            {
                //查看、
                case WorkMode.View:
                    formInput.FormId = queryMode.FormId;
                    model = _kStarWorkFlowService.GetKStarFormByView(formInput);
                    break;
                case WorkMode.Draft:
                    if (queryMode.DraftId > 0)
                    {
                        formInput.FormId = queryMode.DraftId;
                    }
                    model = _kStarWorkFlowService.GetKStarFormByDraft(formInput);
                    break;
                case WorkMode.Approval:
                    model = _kStarWorkFlowService.GetKStarFormByApproval(formInput);
                    break;
                case WorkMode.Startup:
                    formInput.UserName = userName;
                    if (formInput.ProcessCode == KStar.Platform.Infrastructure.SystemSettings.KStarFormPreview)
                    {
                        model = _kStarWorkFlowService.GetKStarFormPreviewKStarFormModel(formInput.UserName, formInput.ProcessCode);
                    }
                    else {
                        model = _kStarWorkFlowService.GetKStarFormByApplication(formInput);
                    }
                    break;
                case WorkMode.PreStartup:
                    model = GetPreStartupData(formInput, queryMode.K2Id, userName);
                    break;
            }
            return model;
        }

        /// <summary>
        /// 获取预发起FormMode
        /// </summary>
        /// <param name="formInput"></param>
        /// <param name="k2Id"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        private KStarFormModel GetPreStartupData(KStarFormInput formInput, string k2Id, string userName)
        {
            var proStartLogInfo = _bpmInterfaceLogService.GetProStartInterfaceLog(k2Id);//根据K2ID获取流程发起日志信息

            #region 权限检查 K2ID是否已经提交
            if (proStartLogInfo == null)
            {
                //您没有权限打开此表单
                throw new KStarCustomException(KStarForm_Prompt.NoOpenFormAuthority);
            }

            var formInstance = _kStarFormStorageService.GetPrcServer_FormInstanceByFolio(k2Id);
            if (formInstance != null)
            {
                //如果已经存在表单，返回查看页面数据
                formInput.FormId = formInstance.Id;
                return _kStarWorkFlowService.GetKStarFormByView(formInput);
                ////表单状态为已提交，请勿重复提交！
                //throw new KStarCustomException(KStarForm_Prompt.FormIDRepeatSubmit);
            }
            #endregion

            var requestMessage = proStartLogInfo.RequestMessage;
            var proStartData = JsonConvert.DeserializeObject<RequstModel<ProcessStartArgs>>(requestMessage);
            var proStartInfo = proStartData.requestInfo;

            var model = _kStarWorkFlowService.GetApiSubmitModel(userName, proStartInfo.applyUserCode, proStartLogInfo.SplitProcessCode, "BPMService", Guid.Empty);
            model.FormInstance.Folio = k2Id;//更新流程编码
            model.FormInstance.BizId = proStartLogInfo.BizID;//更新BizId
            model.FormInstance.FormSubject = proStartInfo.folio; //流程标题
            model.KStarFormButtons = model.KStarFormButtons.Where(t => t.Code != "SaveDraft").ToList();// 过虑保存草稿按钮

            model.FormContent.FormDataToJson = proStartInfo.bizData;  //流程表单数据
            return model;
        }

        #endregion

        #region 初始化预览数据

        #endregion

        #region Portal操作
        /// <summary>
        /// 同意
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [PortalApproveInterceptor]
        public virtual KStarFormModel PortalApprove(KStarFormModel formModel, string userName, string sharedUser, long workItemId, string comment)
        {
            var result = _kStarWorkFlowService.PortalApprove(userName, sharedUser, workItemId, comment);
            formModel.IsSuccess = result;
            return formModel;
        }

        /// <summary>
        /// 拒绝
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [PortalRefusedInterceptor]
        public virtual KStarFormModel PortalRefused(KStarFormModel formModel, string userName, string sharedUser, long workItemId, string comment)
        {
            var result = _kStarWorkFlowService.PortalRefused(userName, sharedUser, workItemId, comment);
            formModel.IsSuccess = result;
            return formModel;
        }

        /// <summary>
        /// 沟通
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [PortalCommunicationInterceptor]
        public virtual KStarFormModel PortalCommunication(KStarFormModel formModel, string userName, string sharedUser, long workItemId, List<KStarFormUser> toUser, string folio, string comment)
        {
            var result = _kStarWorkFlowService.PortalCommunication(userName, sharedUser, workItemId, toUser, folio, comment);
            formModel.IsSuccess = result;
            return formModel;
        }

        /// <summary>
        /// 取消沟通
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [PortalCancelCommunicateInterceptor]
        public virtual KStarFormModel PortalCancelCommunicate(KStarFormModel formModel, string userName, string sharedUser, long workItemId, string folio, string comment)
        {
            var result = _kStarWorkFlowService.PortalCancelCommunicate(userName, sharedUser, workItemId, folio, comment);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 沟通反馈
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [PortalCommunicateFeedbackInterceptor]
        public virtual KStarFormModel PortalCommunicateFeedback(KStarFormModel formModel, string userName, string sharedUser, long workItemId, string folio, string comment)
        {
            var result = _kStarWorkFlowService.PortalCommunicateFeedback(userName, sharedUser, workItemId, folio, comment);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 转办
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [PortalRedirectInterceptor]
        public virtual KStarFormModel PortalRedirect(KStarFormModel formModel, string userName, string sharedUser, List<KStarFormUser> toUser, long workItemId, string comment)
        {
            var result = _kStarWorkFlowService.PortalRedirect(userName, sharedUser, toUser, workItemId, comment);
            formModel.IsSuccess = result;
            return formModel;
        }
        /// <summary>
        /// 退回
        /// </summary>
        /// <param name="formModel"></param>
        /// <returns></returns>
        [PortalRejectInterceptor]
        public virtual KStarFormModel PortalReject(KStarFormModel formModel, string userName, string sharedUser, long workItemId, string activityName, bool isRejectGoBack, string comment)
        {
            var result = _kStarWorkFlowService.PortalReject(userName, sharedUser, workItemId, activityName, isRejectGoBack, comment);
            formModel.IsSuccess = result;
            return formModel;
        }
        #endregion

    }
}
