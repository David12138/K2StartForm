using KStar.Form.Mvc.Controllers;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.HumanResources.Controllers
{
    /// <summary>
    /// 人力资源-调薪申请
    /// </summary>
    public class PayRiseApplicationController : FormController
    {
        #region 视图
        public ActionResult Index()
        {
            return View();
        } 
        #endregion
    }
}