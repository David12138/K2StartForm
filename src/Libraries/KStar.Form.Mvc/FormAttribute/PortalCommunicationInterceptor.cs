using Autofac;
using Autofac.Aspect;
using KStar.Form.Mvc.Form;
using KStar.Platform.Common;
using KStar.Platform.ViewModel.Workflow;
using System.Threading.Tasks;

namespace KStar.Form.Mvc.FormAttribute
{
    /// <summary>
    /// 沟通 介入
    /// </summary>
    public class PortalCommunicationInterceptor : PointcutAttribute
    {
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
                service = aspectContext.ComponentContext.ResolveNamed<IFormLogicService>(model.FormInstance.ProcessCode);
                service.OnFormCommunicationBefore(model);//执行前
            }
            await _next(aspectContext);
            if (isOk)
            {
                //能继续下去，就调用
                //ResponseMode response = (ResponseMode)aspectContext.InvocationContext.ReturnValue;
                service.OnFormCommunicationAfter(model);//执行后
            }

            stopwatch.Stop();
            Domain.Logger.DbLogManager.Post(System.Web.HttpContext.Current, new Domain.Logger.PrcServer_UserOperationLog()
            {
                ActivityName = model.Operation.ActivityName,
                ApprovalType = string.IsNullOrEmpty(model.Operation.ActionName) ? Platform.WorkFlow.Models.ActionType.Communicate.GetDescription() : model.Operation.ActionName,
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
