using KStar.ProcessEventService.Controllers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace KStar.ProcessEventService.Api.Cost
{
    /// <summary>
    /// 成本拆分
    /// </summary>
    [RoutePrefix("api/Cost/CostSplit")]
    public class CostSplitController : KStarApiController
    {
        private static string _userName = ConfigurationManager.AppSettings["ESBUser"] + String.Empty;// "bgy_bbpm-overseas01" + String.Empty; /
        private static string _passWord = ConfigurationManager.AppSettings["ESBPassWord"] + String.Empty;//"93ec1cf456844e70b1b8d40b3a17090e" + String.Empty;// ;
        private static string _contentType = ConfigurationManager.AppSettings["ContentType"] + String.Empty;// "application/json;charset=UTF-8" + String.Empty;// 


        /// <summary>
        /// 查询成本拆分
        /// </summary>
        /// <param name="k2id"></param>
        /// <param name="paramData"></param>
        /// <returns></returns>
        [Route("GetSplitStatus")]
        public HttpResponseMessage GetSplitStatus(string k2id,string paramData)
        {

          //   paramData = "{{\"esbInfo\":{{\"instId\":\"D12S003-SAPCOSTING-1804-038-{0}\",\"requestTime\":\"{1}\",\"attr1\":\"\",\"attr2\":\"更新拆分状态\",\"attr3\":\"\"}},\"requestInfo\":{{\"k2Id\":\"{2}\",\"processCode\":\"CGP030001\",\"bizDataFields\":null,\"action\":\"2\",\"bizmodel\":null}}}}";
            var time1 = DateTime.Now.Ticks.ToString();
            var time2 = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            var url = ConfigurationManager.AppSettings["SplitURL"];// "http://soauat.countrygarden.com.cn:8011/CostingSB/Sapcosting/Contract/ProxyServices/SapcostingContractSplitStatusQueryRestProxy";// 
            var authorization = GetAuthorization(_userName, _passWord);
          
             paramData = string.Format(paramData, time1, time2, k2id);
            
            var result = PostWebRequest(url, paramData, authorization);
            return new HttpResponseMessage(){ Content = new StringContent(result, Encoding.UTF8, "application/json")  };
        }
        private string PostWebRequest(string postUrl, string paramData, string authorization)
        {
            string ret = string.Empty;

            try
            {
                var dataEncode = Encoding.UTF8;
                byte[] byteArray = dataEncode.GetBytes(paramData); //转化
                HttpWebRequest webReq = (HttpWebRequest)WebRequest.Create(new Uri(postUrl));
                webReq.Method = "POST";
                webReq.ContentType = "application/json";
                webReq.KeepAlive = false;

                webReq.Headers.Add("Authorization", authorization);

                webReq.ContentLength = byteArray.Length;
                Stream newStream = webReq.GetRequestStream();
                newStream.Write(byteArray, 0, byteArray.Length);//写入参数
                newStream.Close();
                HttpWebResponse response = (HttpWebResponse)webReq.GetResponse();

                StreamReader sr = new StreamReader(response.GetResponseStream(), Encoding.UTF8);
                ret = sr.ReadToEnd();
                sr.Close();
                response.Close();
                newStream.Close();
            }
            catch (Exception ex)
            {
                return "";
            }
            return ret;
        }
        #region # 生成 Http Basic 访问凭证,基本信息 #

        private static string GetAuthorization(string username, string password)
        {
            string authorization = string.Format("{0}:{1}", username, password);

            return "Basic " + Convert.ToBase64String(new ASCIIEncoding().GetBytes(authorization));
        }
        #endregion
    }
}