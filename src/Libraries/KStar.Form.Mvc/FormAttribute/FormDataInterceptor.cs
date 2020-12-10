using Autofac;
using Autofac.Aspect;
using KStar.Form.Mvc.Form;
using KStar.Platform.Common;
using KStar.Platform.ViewModel.Workflow;
using System;
using System.Threading.Tasks;

namespace KStar.Form.Mvc.FormAttribute
{
    /// <summary>
    /// 获取数据 介入
    /// </summary>
    public class FormDataInterceptor : PointcutAttribute
    {
        public override async Task OnInvocation(AspectContext aspectContext, AspectDelegate _next)
        {
            var startTime = DateTime.Now;
            var stopwatch = new System.Diagnostics.Stopwatch();
            stopwatch.Start();
            await _next(aspectContext);
            KStarFormModel response = (KStarFormModel)aspectContext.InvocationContext.ReturnValue;
            if (aspectContext.ComponentContext.IsRegisteredWithName<IFormLogicService>(response.FormInstance.ProcessCode))
            {
                var service = aspectContext.ComponentContext.ResolveNamed<IFormLogicService>(response.FormInstance.ProcessCode);

                FormTypeEnum formType = (FormTypeEnum)Enum.Parse(typeof(FormTypeEnum), response.FormType);
                switch (formType)
                {
                    case FormTypeEnum.Application:
                        service.OnKStarFormStartupAfter(response);
                        break;
                    case FormTypeEnum.Draft:
                        service.OnKStarFormDraftAfter(response);
                        break;
                    case FormTypeEnum.Approval:
                        service.OnKStarFormApprovalAfter(response);
                        break;
                    case FormTypeEnum.View:
                        service.OnKStarFormViewAfter(response);
                        break;
                    default:
                        break;
                }
            }
            stopwatch.Stop();
            Domain.Logger.DbLogManager.Post(System.Web.HttpContext.Current, new Domain.Logger.PrcServer_UserOperationLog()
            {
                ActivityName = response.Operation.ActivityName,
                ApprovalType = null,
                StartTime = startTime,
                Message=response.FormType,
                Folio = response.FormInstance.Folio,
                ProcessCode = response.FormInstance.ProcessCode,
                ProcessName = response.FormInstance.ProcessName,
                Type = (byte)Domain.Logger.UserOperationEnum.OpenForm,
                ResponseTime = stopwatch.Elapsed.TotalMilliseconds,
                FormId = response.FormInstance.Id,
                CreateDisplayName = response.Operation.CurrentUserDisplayName
            });
        }
    }
}
