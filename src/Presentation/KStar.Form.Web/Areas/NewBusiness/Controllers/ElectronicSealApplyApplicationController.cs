using KStar.Form.Mvc.Controllers;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.NewBusiness.Controllers
{
    /// <summary>
    /// 电子印章申请流程
    /// </summary>
    public class ElectronicSealApplyApplicationController : FormController
    {

        #region 视图
        public ActionResult Index()
        {
            return View();
        } 
        #endregion
    }
}