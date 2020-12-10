using System.Web.Mvc;

namespace KStar.Form.Web.Areas.NewBusiness
{
    public class NewBusinessAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "NewBusiness";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "NewBusiness_default",
                "NewBusiness/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}