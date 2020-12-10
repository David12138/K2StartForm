using KStar.Form.Mvc.Common.Attributes;

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
    }
}