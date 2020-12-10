using KStar.Form.Mvc.Controllers;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.Platform.Controllers
{
    public class SimpleFormController : FormController
    {

        // GET: Platform/ SimpleForm
        public ActionResult Index()
        {
            return View();
        }
    }
}