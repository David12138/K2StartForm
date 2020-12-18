using KStar.Form.Domain.Service.NewBusiness;
using KStar.Form.Mvc.Controllers;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.NewBusiness.Controllers
{
    public class TrainCostController : FormController
    {
        #region 引用
        public ITrainCostService trainCostService { get; set; }
        #endregion

        #region 视图
        public ActionResult Index()
        {
            return View();
        }
        #endregion
    }
}