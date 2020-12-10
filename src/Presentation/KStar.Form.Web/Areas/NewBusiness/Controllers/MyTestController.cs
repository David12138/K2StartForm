using KStar.Form.Mvc.Controllers;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.NewBusiness.Controllers
{
    /// <summary>
    /// 测试单据
    /// </summary>
    public class MyTestController : FormController
    {
        #region 视图
        public ActionResult Index()
        {
            return View();
        } 
        #endregion
    }
}