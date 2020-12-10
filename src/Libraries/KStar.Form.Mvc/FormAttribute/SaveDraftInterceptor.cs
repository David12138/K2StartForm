using Autofac;
using Autofac.Aspect;
using KStar.Form.Mvc.Form;
using KStar.Platform.ViewModel.Workflow;
using System.Threading.Tasks;

namespace KStar.Form.Mvc.FormAttribute
{
    /// <summary>
    /// 保存草稿 介入
    /// </summary>
    class SaveDraftInterceptor : PointcutAttribute
    {
        public override async Task OnInvocation(AspectContext aspectContext, AspectDelegate _next)
        {
            KStarFormModel model = (KStarFormModel)aspectContext.InvocationContext.GetArgumentValue(0);
            var isOk = aspectContext.ComponentContext.IsRegisteredWithName<IFormLogicService>(model.FormInstance.ProcessCode);
            IFormLogicService service = null;
            if (isOk)
            {
                service = aspectContext.ComponentContext.ResolveNamed<IFormLogicService>(model.FormInstance.ProcessCode);
                service.OnFormSaveDraftBefore(model);//执行前
            }
            await _next(aspectContext);
            if (isOk)
            {
                //能继续下去，就调用
                //ResponseMode response = (ResponseMode)aspectContext.InvocationContext.ReturnValue;
                service.OnFormSaveDraftAfter(model);//执行后
            }
        }
    }
}
