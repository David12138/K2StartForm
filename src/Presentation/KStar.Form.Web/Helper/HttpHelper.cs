using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Web;

namespace KStar.Form.Web.Helper
{
    public class HttpHelper
    {
        public static string compileStr(string code) 
        {
            //对字符串进行加密      
            var c = Convert.ToChar(((char)code.First() + code.Length)).ToString();
            for (var i = 1; i < code.Length; i++)
            {
                c += Convert.ToChar((char)code[i] + (char)c[i - 1]).ToString();
            }
            return c;
        }
        public static string GetTemplateContent(string url, int authType)
        {
            string pageHtml = string.Empty;            
            string requestHost = "";
            string httpRequestUser = ConfigurationManager.AppSettings["HttpRequestUser"];
            string httpRequestPassword = compileStr(ConfigurationManager.AppSettings["HttpRequestPassword"].ToString());
            if (url.ToLower().StartsWith("http"))
            {
                string tempurl = url.Remove(0, 7);
                requestHost = tempurl.Split('/')[0];
                // requestHost = "http://" + requestHost;
                //2018/5/14 wbc modify
                requestHost = HttpContext.Current.Request.Url.Scheme + @"://" + requestHost;
            }
            else
            {
                // url = "http://" + HttpContext.Current.Request.Headers["Host"] + url;
                // requestHost = "http://" + HttpContext.Current.Request.Headers["Host"];
                //2018/5/14 wbc modify
                //2018/08/06 sxy modify
                requestHost = ConfigurationManager.AppSettings["KStarFormUrl"];
                url = requestHost  + url;
            }
            CookieContainer cc = new CookieContainer();
            string postData ="";
            try
            {
                if (authType == 0)
                {
                    postData = "account=" + httpRequestUser + "&password=" + httpRequestPassword;
                    byte[] byteArray = Encoding.UTF8.GetBytes(postData);
                    HttpWebRequest weblogin = (HttpWebRequest)WebRequest.Create(new Uri(requestHost+"/Account/Login"));
                    weblogin.CookieContainer = cc;
                    weblogin.Method = "POST";
                    weblogin.ContentType = "application/x-www-form-urlencoded";
                    weblogin.ContentLength = byteArray.Length;
                    Stream streamlogin = weblogin.GetRequestStream();
                    streamlogin.Write(byteArray, 0, byteArray.Length);
                    streamlogin.Close();
                    HttpWebResponse responselogin = (HttpWebResponse)weblogin.GetResponse();

                    HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(new Uri(url));
                    webRequest.CookieContainer = cc;
                    HttpWebResponse response = (HttpWebResponse)webRequest.GetResponse();
                    StreamReader sr = new StreamReader(response.GetResponseStream(), Encoding.UTF8);
                    pageHtml = sr.ReadToEnd();
                }
                else
                {
                    HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(new Uri(url));
                    webRequest.CookieContainer = cc;
                    webRequest.Method = "POST";
                    webRequest.ContentType = "application/x-www-form-urlencoded";
                    webRequest.ContentLength = 0;
                    webRequest.PreAuthenticate = true;
                    NetworkCredential netCreden = new NetworkCredential(httpRequestUser, httpRequestPassword); //登入的帳號密碼
                    webRequest.Credentials = netCreden.GetCredential(new Uri(url), "authType");
                    HttpWebResponse response = (HttpWebResponse)webRequest.GetResponse();
                    StreamReader sr = new StreamReader(response.GetResponseStream(), Encoding.UTF8);
                    pageHtml = sr.ReadToEnd();
                }
            }
            catch (Exception ex){

            }
            return pageHtml;
        }

        /// <summary>
        /// 给url增加params
        /// </summary>
        /// <param name="url"></param>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string AddOrEditUrlParams(string url, string key, string value)
        {
            StringBuilder _url = new StringBuilder();
            if (url.Contains("?"))
            {
                string[] separateURL = url.Split('?');
                _url.Append(separateURL[0]);
                System.Collections.Specialized.NameValueCollection queryString = System.Web.HttpUtility.ParseQueryString(separateURL[1]);
                //不存在则添加
                if (queryString.Get(key) == null)
                {
                    queryString.Add(key, value);
                }
                else
                {
                    queryString[key] = value;
                }
                _url.Append("?" + queryString.ToString());
            }
            else
            {
                _url.Append(url + "?" + key + "=" + value);
            }
            return _url.ToString();
        }

        /// <summary>
        /// 给url增加params
        /// </summary>
        /// <param name="url"></param>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string QueryString(string url, string key)
        {
            string value = string.Empty;
            if (url.Contains("?"))
            {
                string[] separateURL = url.Split('?');                
                System.Collections.Specialized.NameValueCollection queryString = System.Web.HttpUtility.ParseQueryString(separateURL[1]);                
                if (queryString.Get(key) != null)
                {
                    value = queryString[key];
                }                
            }
            return value;
        }


        /// <summary>
        /// 调用API
        /// </summary>
        /// <param name="url">API地址</param>
        /// <param name="paramData">参数</param>
        /// <returns>返回结果</returns>
        public static string HttpPostAsJsonAsync(string url, string paramData)
        {
            try
            {
                //byte[] byteArray = Encoding.UTF8.GetBytes(paramData); //转化
                url = string.Format("{0}?{1}", url, paramData);

                ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback(CheckValidationResult);//验证服务器证书回调自动验证

                HttpWebRequest webReq = (HttpWebRequest)WebRequest.Create(new Uri(url));
                webReq.Method = "POST";
                webReq.ContentType = "application/text";
                //webReq.ContentLength = byteArray.Length;
                webReq.KeepAlive = false;
                Stream newStream = webReq.GetRequestStream();
                //newStream.Write(byteArray, 0, byteArray.Length);//写入参数            
                var result = (HttpWebResponse)webReq.GetResponse();
                StreamReader sr = new StreamReader(result.GetResponseStream(), Encoding.UTF8);
                string ret = sr.ReadToEnd();
                newStream.Close();
                webReq.Abort();
                return ret;
            }
            catch (Exception ex)
            {
                return string.Empty;
            }
        }


        /// <summary>  
        /// 创建GET方式的HTTP请求  
        /// </summary>  
        /// <param name="url">请求的URL</param>  
        /// <param name="timeout">请求的超时时间</param>  
        /// <param name="userAgent">请求的客户端浏览器信息，可以为空</param>  
        /// <param name="cookies">随同HTTP请求发送的Cookie信息，如果不需要身份验证可以为空</param>  
        /// <returns></returns>  
        public static string CreateGetHttpResponse(string url)//, int? timeout, string userAgent, CookieCollection cookies)
        {
            try
            {
                ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback(CheckValidationResult);//验证服务器证书回调自动验证

                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "GET";
                request.ContentType = "text/html;charset=UTF-8";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream myResponseStream = response.GetResponseStream();
                StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("utf-8"));
                string retString = myStreamReader.ReadToEnd();
                myStreamReader.Close();
                myResponseStream.Close();
                return retString;
            }
            catch (Exception ex)
            {
                return string.Empty;
            }
        }
        public static bool CheckValidationResult(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors)
        {   // 总是接受  
            return true;
        }
    }
}