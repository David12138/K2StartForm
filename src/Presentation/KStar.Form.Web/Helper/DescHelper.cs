using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace KStar.Form.Web.Helper
{
    /// <summary>
    /// 类说明 ：加解密算法
    /// </summary>
    public class DescHelper
    {
        /// <summary>
        /// 加密
        /// </summary>
        /// <param name="str">加密串</param>
        /// <param name="key">密钥</param>
        /// <returns></returns>
        public static string DES(string str, string key)
        {
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            byte[] inputByteArray = Encoding.GetEncoding("UTF-8").GetBytes(str);

            //建立加密对象的密钥和偏移量   
            //原文使用ASCIIEncoding.ASCII方法的GetBytes方法   
            //使得输入密码必须输入英文文本 
            des.Mode = CipherMode.ECB;
            des.Key = ASCIIEncoding.UTF8.GetBytes(key);
            des.IV = ASCIIEncoding.UTF8.GetBytes(key);
            MemoryStream ms = new MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(), CryptoStreamMode.Write);

            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();

            StringBuilder ret = new StringBuilder();
            foreach (byte b in ms.ToArray())
            {
                ret.AppendFormat("{0:X2}", b);
            }
            ret.ToString();
            return ret.ToString().ToLower();
        }
        /// <summary>
        /// 解密
        /// </summary>
        /// <param name="pToDecrypt">解密串</param>
        /// <param name="key">密钥</param>
        /// <returns></returns>
        public static string DESDeCode(string pToDecrypt, string key)
        {
            //    HttpContext.Current.Response.Write(pToDecrypt + "<br>" + sKey);  
            //    HttpContext.Current.Response.End();  
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();

            byte[] inputByteArray = new byte[pToDecrypt.Length / 2];
            for (int x = 0; x < pToDecrypt.Length / 2; x++)
            {
                int i = (Convert.ToInt32(pToDecrypt.Substring(x * 2, 2), 16));
                inputByteArray[x] = (byte)i;
            }

            //des.Key = ASCIIEncoding.ASCII.GetBytes(sKey);
            //  des.IV = ASCIIEncoding.ASCII.GetBytes(sKey);

            des.Mode = CipherMode.ECB;
            des.Key = ASCIIEncoding.UTF8.GetBytes(key);
            des.IV = ASCIIEncoding.UTF8.GetBytes(key);

            MemoryStream ms = new MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateDecryptor(), CryptoStreamMode.Write);
            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();

            StringBuilder ret = new StringBuilder();

            // return HttpContext.Current.Server.UrlDecode(System.Text.Encoding.Default.GetString(ms.ToArray()));
            return System.Text.Encoding.UTF8.GetString(ms.ToArray());
        }
    }
}