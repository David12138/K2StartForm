using System.Web.Mvc;

namespace KStar.Form.Web.Areas.BuyerManage
{
    public class BuyerManageAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "BuyerManage";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "BuyerManage_default",
                "BuyerManage/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}