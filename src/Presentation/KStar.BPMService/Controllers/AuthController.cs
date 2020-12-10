using KStar.BPMService.Models;
using KStar.Domain.ViewModels;
using KStar.Platform.Service;
using System;
using System.Text;
using System.Web.Http;

namespace KStar.BPMService.Controllers
{
    /// <summary>
    /// 第三方系统交互做认证
    /// </summary>
    [RoutePrefix("API/Auth")]
    [AllowAnonymous]
    public class AuthController : ApiController
    {
        IAuthService iAuthService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="_iAuthService"></param>
        public AuthController(IAuthService _iAuthService)
        {
            iAuthService = _iAuthService;
        }


        /// <summary>
        /// 模拟客户端生成Base64加密(appkey + secret + time)
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("Base64Encrypt")]
        public IHttpActionResult Base64Encrypt(string appkey, string secret)
        {
            var str = $"{appkey}&{secret}&{DateTime.Now}";
            byte[] b = Encoding.Default.GetBytes(str);
            var res = Convert.ToBase64String(b);
            return Json(new ResponseModel { Data = res });
        }

        /// <summary>
        ///Base64解密
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("Base64Decrypt/{secret}")]
        public IHttpActionResult Base64Decrypt(string secret)
        {
            byte[] b = Convert.FromBase64String(secret);
            var res = Encoding.Default.GetString(b).Split('&');

            return Json(new ResponseModel
            {
                Data = new
                {
                    appKey = res[0],
                    secret = res[1],
                    time = res[2]
                }
            });

        }

        /// <summary>
        /// 获取Token
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("Token")]
        public IHttpActionResult GetToken(string secret)
        {
            byte[] b = Convert.FromBase64String(secret);
            var res = Encoding.Default.GetString(b).Split('&');
            (string appKey, string secret) model = (res[0], res[1]);
            var entity = iAuthService.GetEntity(model.appKey, model.secret);
            if (entity == null)
            {
                return Json("未验证的秘钥");
            }
            var time = DateTime.Now + TimeSpan.FromMinutes(double.Parse(entity.Expire.ToString()));
            var str = $"{model.appKey}&{model.secret}&{time.ToString("yyyy-MM-dd HH:mm:ss")}";
            byte[] b2 = Encoding.Default.GetBytes(str);
            var res2 = Convert.ToBase64String(b2);

            return Json(new ResponseModel
            {
                Data = new
                {
                    expirat = time,
                    token = res2
                }
            });
        }
    }
}
