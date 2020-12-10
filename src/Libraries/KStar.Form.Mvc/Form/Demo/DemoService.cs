using KStar.Form.Mvc.Common.Attributes;
using KStar.Platform.ViewModel.Workflow;
using Newtonsoft.Json;

namespace KStar.Form.Mvc.Form.Demo
{
    /// <summary>
    /// 后续可以添加多个流程编码
    /// </summary>
    [KStarFormLogicAttribute("bug")]
    internal class DemoBusinessService : FormLogicBaseService, IFormLogicService
    {
        public override void OnKStarFormViewAfter(KStarFormModel context)
        {
            context.FormContent.FormDataToJson = JsonConvert.SerializeObject(new TestModel() { Content = "OnKStarFormViewAfter" });
        }

        public override void OnFormSaveDraftBefore(KStarFormModel context)
        {
            context.FormContent.FormDataToJson = JsonConvert.SerializeObject(new TestModel() { Content = "OnFormSaveDraftBefore" });
        }


        public override void OnFormSaveDraftAfter(KStarFormModel context)
        {
            context.FormContent.FormDataToJson = JsonConvert.SerializeObject(new TestModel() { Content = "OnFormSaveDraftAfter" });
        }
        public override void OnKStarFormStartupAfter(KStarFormModel context)
        {
            context.FormContent.FormDataToJson = JsonConvert.SerializeObject(new TestModel() { Content = "OnKStarFormStartupAfter" });
        }
        


    }

    class TestModel
    {
        public string Content { get; set; }
    }
}
