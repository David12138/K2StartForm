using KStar.Platform.ViewModel.Workflow;

namespace KStar.Form.Mvc.Form
{
    internal class FormLogicBaseService : IFormLogicService
    {
        #region 加载事件

        #region 查看页面
        /// <summary>
        /// 查看页面数据 后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnKStarFormViewAfter(KStarFormModel context)
        {
        }
        #endregion

        #region 草稿页面
        /// <summary>
        /// 草稿页面数据 后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnKStarFormDraftAfter(KStarFormModel context)
        {
        }
        #endregion

        #region 审批页面
        /// <summary>
        /// 审批页面数据 后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnKStarFormApprovalAfter(KStarFormModel context)
        {
        }
        #endregion

        #region 发起页面
        /// <summary>
        /// 发起页面数据 后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnKStarFormStartupAfter(KStarFormModel context)
        {
        }
        #endregion

        #endregion

        #region 流程执行事件

        #region 提交
        /// <summary>
        /// 提交流程前
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormSubmitBefore(KStarFormModel context)
        {
        }
        /// <summary>
        /// 提交流程后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormSubmitAfter(KStarFormModel context)
        {

        }
        #endregion

        #region 重新提交
        /// <summary>
        /// 重新提交流程前
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormReSubmitBefore(KStarFormModel context)
        {
        }
        /// <summary>
        /// 重新提交流程后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormReSubmitAfter(KStarFormModel context)
        {

        }
        #endregion

        #region 保存草稿
        /// <summary>
        /// 保存草稿前
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormSaveDraftBefore(KStarFormModel context)
        {

        }
        /// <summary>
        /// 保存草稿后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormSaveDraftAfter(KStarFormModel context)
        {

        }
        #endregion

        #region 审批 同意
        /// <summary>
        /// 审批 同意前
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormApproveBefore(KStarFormModel context)
        {

        }
        /// <summary>
        /// 审批 同意后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormApproveAfter(KStarFormModel context)
        {

        }
        #endregion

        #region 取消流程
        /// <summary>
        /// 取消流程前
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormCancelBefore(KStarFormModel context)
        {

        }
        /// <summary>
        /// 取消流程后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormCancelAfter(KStarFormModel context)
        {

        }
        #endregion

        #region 退回
        /// <summary>
        /// 退回前
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormRejectBefore(KStarFormModel context)
        {

        }
        /// <summary>
        /// 退回后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormRejectAfter(KStarFormModel context)
        {

        }
        #endregion

        #region 转办
        /// <summary>
        /// 转办前
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormRedirectBefore(KStarFormModel context)
        {

        }
        /// <summary>
        /// 转办后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormRedirectAfter(KStarFormModel context)
        {

        }
        #endregion

        #region 撤回
        /// <summary>
        /// 撤回前
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormWithdrawnBefore(KStarFormModel context)
        {

        }
        /// <summary>
        /// 撤回后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormWithdrawnAfter(KStarFormModel context)
        {

        }
        #endregion

        #region 沟通
        /// <summary>
        /// 沟通前
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormCommunicationBefore(KStarFormModel context)
        {

        }
        /// <summary>
        /// 沟通后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormCommunicationAfter(KStarFormModel context)
        {

        }
        #endregion

        #region 取消沟通
        /// <summary>
        /// 取消沟通前
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormCancelCommunicateBefore(KStarFormModel context)
        {

        }
        /// <summary>
        /// 取消沟通后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormCancelCommunicateAfter(KStarFormModel context)
        {

        }
        #endregion

        #region 沟通反馈
        /// <summary>
        /// 沟通反馈前
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormCommunicateFeedbackBefore(KStarFormModel context)
        {

        }
        /// <summary>
        /// 沟通反馈后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormCommunicateFeedbackAfter(KStarFormModel context)
        {

        }
        #endregion

        #region 传阅
        /// <summary>
        /// 传阅前
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormCirculateBefore(KStarFormModel context)
        {

        }
        /// <summary>
        /// 传阅后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormCirculateAfter(KStarFormModel context)
        {

        }
        #endregion

        #region 拒绝
        /// <summary>
        /// 拒绝前
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormRefusedBefore(KStarFormModel context)
        {

        }
        /// <summary>
        /// 拒绝后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormRefusedAfter(KStarFormModel context)
        {

        }
        #endregion

        #region 订阅
        /// <summary>
        /// 订阅前
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormSubscribeBefore(KStarFormModel context)
        {

        }
        /// <summary>
        /// 订阅后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormSubscribeAfter(KStarFormModel context)
        {

        }
        #endregion

        #region 取消订阅
        /// <summary>
        /// 取消订阅前
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormCancelSubscribeBefore(KStarFormModel context)
        {

        }
        /// <summary>
        /// 取消订阅后
        /// </summary>
        /// <param name="context"></param>
        public virtual void OnFormCancelSubscribeAfter(KStarFormModel context)
        {

        }
        #endregion

        #endregion

        #region 审批行为执行前事件 2019-11-26 ZGH
        //public void OnActionEventBefore(string onApprStartedUrl, KStarFormModel context)
        //{
        //    if (string.IsNullOrWhiteSpace(onApprStartedUrl)) return;
        //}
        //#endregion

        //#region 审批行为执行后事件 2019-11-26 ZGH
        //public void OnActionEventAfter(string onApprCompletedUrl, KStarFormModel context)
        //{
        //    if (string.IsNullOrWhiteSpace(onApprCompletedUrl)) return;

        //}
        #endregion

    }
}
