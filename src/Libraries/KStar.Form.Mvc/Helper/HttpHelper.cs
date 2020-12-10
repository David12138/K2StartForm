using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Mvc.Helper
{
    public static class HttpHelper
    {

        /// <summary>
        /// 有 Authorization header
        /// </summary>
        /// <param name="postUrl"></param>
        /// <param name="paramData"></param>
        /// <param name="authorization"></param>
        /// <returns></returns>
        public static string PostWebRequest(string postUrl, string paramData, string authorization)
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
