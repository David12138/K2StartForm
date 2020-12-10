using System.Web.Mvc;

namespace KStar.Form.Web.Areas.Portal
{
    public class PortalAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Portal";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {

            context.MapRoute(
                "Portal_default",
                "Portal/{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                new string[] { "KStar.Form.Web.Areas.Portal.Controllers" }
            );

            context.MapRoute(
                "Portal_Home",
                "Portal/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                new string[] { "KStar.Form.Web.Areas.Portal.Controllers" }
            );

            #region 用于在线预览
            context.MapRoute(
               "GetLink",
               "PreviewOnline/GetLink",
               new { controller = "PreviewOnline", action = "GetLink" }
           );

            context.MapRoute(
                "GetFileInfo",
                "wopi/files/{guid}",
                new { controller = "PreviewOnline", action = "GetFileInfo" }
            );

            context.MapRoute(
                "GetFile",
                "wopi/files/{guid}/contents",
                new { controller = "PreviewOnline", action = "GetFile" }
            );
            #endregion
        }
    }
}