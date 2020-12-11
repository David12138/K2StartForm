using KStar.Form.Domain.ViewModels.NewBusiness.SocialSecurity;
using KStar.Form.Mvc.Common.Attributes;
using KStar.Platform.ViewModel.Workflow;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace KStar.Form.Mvc.Form.NewBusiness
{
    [KStarFormLogic("social-security")]

    internal class SocialSecurityService : FormLogicBaseService, IFormLogicService
    {
        private KStar.Form.Domain.Service.NewBusiness.ISocialSecurityService _socialSecurityService { get; set; }

        public SocialSecurityService(KStar.Form.Domain.Service.NewBusiness.ISocialSecurityService socialSecurityService)
        {
            _socialSecurityService = socialSecurityService;
        }

        public override void OnKStarFormStartupAfter(KStarFormModel context)
        {
            SocialSecurityModel viewModel = new SocialSecurityModel();
            viewModel.TableBillInfos = new List<BillInfo>() { new BillInfo() };
            context.FormContent.FormDataToJson = JsonConvert.SerializeObject(viewModel);
        }
    }
}