using KStar.Form.Mvc.Common.Tools;
using KStar.Form.Mvc.Controllers;
using KStar.Form.Mvc.Filter;
using KStar.Form.Mvc.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Controllers
{
    [BaseAuthorize]
    public class TokenController : Controller
    {
        public JsonResult GetToken(string BizFormUrl, string SubmitterAccount, string BizId)
        {
            var bizUrl = BizFormUrl;
            if (bizUrl != null && bizUrl.ToString() != "")
            {
                string ESBUser = ConfigurationManager.AppSettings["ESBUser"] + string.Empty;
                string ESBPassWord = ConfigurationManager.AppSettings["ESBPassWord"] + string.Empty;
                string finAppKey = ConfigurationManager.AppSettings["IFrameURL_FIN_APPKEY"] + string.Empty;
                string finPostUrl = ConfigurationManager.AppSettings["IFrameURL_FIN_URL"] + string.Empty;
                string finDomainName = ConfigurationManager.AppSettings["IFrameURL_FIN_Domain"] + string.Empty;
                string hrPostUrl = ConfigurationManager.AppSettings["IFrameURL_HR_URL"] + string.Empty;
                string hrDomainName = ConfigurationManager.AppSettings["IFrameURL_HR_Domain"] + string.Empty;
                if (bizUrl.ToString().Contains(finDomainName)) //Fin
                {
                    bizUrl = bizUrl.ToString().Substring(0, bizUrl.ToString().IndexOf("act=") + 4);

                    var obj = new JObject { { "appKey", finAppKey }, { "formUrl", bizUrl } };

                    string param = JsonConvert.SerializeObject(obj);
                    try
                    {
                        var resutlData = PostWebRequest(finPostUrl, param, string.Empty);
                        var jsonContent = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(resutlData);
                        bizUrl += "&verify=" + jsonContent.GetValue("data");
                        bizUrl = bizUrl.ToString().Replace("http://", "//");
                    }
                    catch (Exception e)
                    {

                    }
                }
                else if (bizUrl.ToString().Contains(hrDomainName)) //Hr
                {
                    var esbInfo = new JObject { };
                    //bizID作为预留参数，传任意非空值即可
                    var requestInfo = new JObject { { "userID", SubmitterAccount }, { "bizID", BizId }, { "formURL", bizUrl } };
                    var obj = new JObject { };
                    obj.Add("esbInfo", esbInfo);
                    obj.Add("requestInfo", requestInfo);

                    string param = JsonConvert.SerializeObject(obj);
                    string authorization = string.Format("{0}:{1}", ESBUser, ESBPassWord);

                    authorization = "Basic " + Convert.ToBase64String(new ASCIIEncoding().GetBytes(authorization));
                    try
                    {
                        var resutlData = PostWebRequest(hrPostUrl, param, authorization);
                        var jsonContent = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(resutlData);
                        var resultContetn = (JObject)jsonContent.GetValue("resultInfo");
                        bizUrl = resultContetn.GetValue("formURL") == null ? bizUrl : resultContetn.GetValue("formURL").ToString();
                    }
                    catch (Exception e)
                    {

                    }
                }
            }
            return Json(bizUrl, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 设置当前语言
        /// </summary>
        /// <param name="culture"></param>
        /// <returns></returns>
        public JsonResult SetCulture(string culture)
        {
            // Validate input
            culture = CultureHelper.GetImplementedCulture(culture);
            // Save culture in a cookie
            HttpCookie cookie = Request.Cookies["_culture"];
            if (cookie != null)
                cookie.Value = culture;   // update cookie value
            else
            {
                cookie = new HttpCookie("_culture");
                cookie.Value = culture;
                cookie.Expires = DateTime.Now.AddYears(1);
            }
            Response.Cookies.Add(cookie);
            return Json(new ResponseMode() { message = "" }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取当前语言设定
        /// </summary>
        /// <param name="culture"></param>
        /// <returns></returns>
        public JsonResult GetCulture(string culture)
        {
            return Json(new ResponseMode() { message = "", data = System.Threading.Thread.CurrentThread.CurrentCulture.Name }, JsonRequestBehavior.AllowGet);
        }


        /// <summary>
        /// 有 Authorization header
        /// </summary>
        /// <param name="postUrl"></param>
        /// <param name="paramData"></param>
        /// <param name="authorization"></param>
        /// <returns></returns>
        private string PostWebRequest(string postUrl, string paramData, string authorization)
        {
            string ret = string.Empty;
            StreamReader sr = null;
            HttpWebResponse response = null;
            Stream newStream = null;
            try
            {
                var dataEncode = Encoding.UTF8;
                byte[] byteArray = dataEncode.GetBytes(paramData); //转化
                HttpWebRequest webReq = (HttpWebRequest)WebRequest.Create(new Uri(postUrl));
                webReq.Method = "POST";
                webReq.ContentType = "application/json";
                webReq.KeepAlive = false;
                if (!string.IsNullOrWhiteSpace(authorization))
                {
                    webReq.Headers.Add("Authorization", authorization);
                }

                webReq.ContentLength = byteArray.Length;
                newStream = webReq.GetRequestStream();
                newStream.Write(byteArray, 0, byteArray.Length);//写入参数
                newStream.Close();
                response = (HttpWebResponse)webReq.GetResponse();

                sr = new StreamReader(response.GetResponseStream(), Encoding.UTF8);
                ret = sr.ReadToEnd();

                sr.Close();
                response.Close();
                newStream.Close();

            }
            catch (Exception ex)
            {
                return "{\"error\":\"" + ex.Message + "\"}";
            }
            return ret;
        }



    }
}