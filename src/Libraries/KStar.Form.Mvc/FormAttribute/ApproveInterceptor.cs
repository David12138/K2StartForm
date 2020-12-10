using Autofac;
using Autofac.Aspect;
using KStar.Form.Mvc.Form;
using KStar.Platform.Common;
using KStar.Platform.Logger;
using KStar.Platform.Service;
using KStar.Platform.ViewModel.Dto;
using KStar.Platform.ViewModel.Workflow;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace KStar.Form.Mvc.FormAttribute
{
    /// <summary>
    /// 审批 同意 介入
    /// </summary>
    public class ApproveInterceptor : PointcutAttribute
    {
        public ILogger logger { get; set; }
        private const string Source = "审批行为";
        public override async Task OnInvocation(AspectContext aspectContext, AspectDelegate _next)
        {
            var startTime = System.DateTime.Now;
            var stopwatch = new System.Diagnostics.Stopwatch();
            stopwatch.Start();

            KStarFormModel model = (KStarFormModel)aspectContext.InvocationContext.GetArgumentValue(0);
            var isOk = aspectContext.ComponentContext.IsRegisteredWithName<IFormLogicService>(model.FormInstance.ProcessCode);
            IFormLogicService service = null;
            if (isOk)
            {
                //个性化事件
                service = aspectContext.ComponentContext.ResolveNamed<IFormLogicService>(model.FormInstance.ProcessCode);
                service.OnFormApproveBefore(model);//执行前
            }

            #region 审批行为执行前事件-配置 2019-11-26 ZGH  暂时去掉审批行为事件
            //IProcessActivityService prcActService = null;
            //var onApprCompletedUrl = string.Empty;
            //InterfaceContextApproverModel startedModel = null;
            //if (model.FormInstance.ProcVersionID != null)
            //{
            //    logger = DependencyResolver.Current.GetService<ILogger>();
            //    prcActService = aspectContext.ComponentContext.Resolve<IProcessActivityService>();
            //    var entity = prcActService.GetActionEventUrl((System.Guid)model.FormInstance.ProcVersionID, model.Operation.ActivityName, "Approve");

            //    #region 拼裝Model
            //    startedModel = new InterfaceContextApproverModel
            //    {
            //        ActInstID = model.Operation.ActivityId,
            //        ActivityName = model.Operation.ActivityName,
            //        EventType = ProcessEventEnum.ApproveActStarted.ToString(),
            //        FormId = model.FormContent.FormId,
            //        ProcInstID = model.FormInstance.ProcInstID ?? 0,
            //        ApproverType = ApproverTypeEnum.Approve.ToString(),
            //        ApproverUserName = model.Operation.CurrentUserDisplayName?.Split('|')?[0],
            //        ApproverUserCode = model.Operation.CurrentUserAccount,
            //        ApproverUserBip = model.Operation.CurrentUserDisplayName?.Split('|').Length > 1 ? model.Operation.CurrentUserDisplayName?.Split('|')[1] : ""
            //    };
            //    #endregion

            //    #region 审批行为前事件 2019-11-25 ZGH
            //    if (!string.IsNullOrWhiteSpace(entity.onApprStartedUrl))
            //    {
            //        var execActStartedEvent = prcActService.ExecutionActionEvent(entity.onApprStartedUrl, startedModel);
            //        if (!execActStartedEvent.state)
            //        {
            //            logger.Warn(Source, $"FormId[{model.FormContent.FormId}]审批行为【{model.FormType}】执行前验证[{entity.onApprStartedUrl}]，失败：{execActStartedEvent.errorMsg}");
            //            //返回错误日志，阻止运行
            //            throw new KStarCustomException($"审批行为【{model.FormType}】执行前验证失败：{execActStartedEvent.errorMsg}");
            //        }
            //    }
            //    #endregion

            //    //执行后事件API地址赋值
            //    onApprCompletedUrl = entity.onApprCompletedUrl;
            //}
            #endregion

            //实际执行审批行为
            await _next(aspectContext);

            if (isOk)
            {
                //能继续下去，就调用，个性化事件
                //ResponseMode response = (ResponseMode)aspectContext.InvocationContext.ReturnValue;
                service.OnFormApproveAfter(model);//执行后
            }

            #region 审批行为后事件 2019-11-25 ZGH  暂时去掉审批行为事件
            //if (!string.IsNullOrWhiteSpace(onApprCompletedUrl))
            //{
            //    var execActCompletedEvent = prcActService.ExecutionActionEvent(onApprCompletedUrl, startedModel);
            //    if (!execActCompletedEvent.state)
            //    {
            //        //记录错误日志，不阻止运行
            //        logger.Warn(Source, $"FormId[{model.FormContent.FormId}]审批行为【{model.FormType}】执行后验证[{onApprCompletedUrl}]，失败：{execActCompletedEvent.errorMsg}");
            //    }
            //}

            #endregion

            stopwatch.Stop();
            Domain.Logger.DbLogManager.Post(System.Web.HttpContext.Current, new Domain.Logger.PrcServer_UserOperationLog()
            {
                ActivityName = model.Operation.ActivityName,
                ApprovalType = string.IsNullOrEmpty(model.Operation.ActionName)? Platform.WorkFlow.Models.ActionType.Approve.GetDescription() : model.Operation.ActionName,
                StartTime = startTime,
                Folio = model.FormInstance.Folio,
                ProcessCode = model.FormInstance.ProcessCode,
                ProcessName = model.FormInstance.ProcessName,
                Type = (byte)Domain.Logger.UserOperationEnum.Approval,
                ResponseTime = stopwatch.Elapsed.TotalMilliseconds,
                FormId = model.FormInstance.Id,
                CreateDisplayName = model.Operation.CurrentUserDisplayName
            });
        }
    }
}
