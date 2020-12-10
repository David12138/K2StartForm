using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.BPMService
{
    /// <summary>
    /// 元宝配置
    /// </summary>
    public class SdkConfig
    {
        /// <summary>
        /// 企业管理后台"授权管理"中获取的client id
        /// </summary>
        public const string ClientId = "";

        /// <summary>
        /// 企业管理后台"授权管理"中获取的client secret
        /// </summary>
        public const string ClientSecret = "";

        /// <summary>
        /// 需要通过 EntLibManager中 bind 获取库授权获取orgClientId
        /// </summary>
        public const string orgClientId = "aYfb0CmZLqIKTeaG0IYEWQRxls";

        /// <summary>
        /// 需要通过 EntLibManager中 bind 获取库授权获取orgClientSecret
        /// </summary>
        public const string orgClientSecret = "WzWnzo3deevB7KpsugBXqaxxB7k";

        /// <summary>
        /// 企业在合作方系统中的唯一ID
        /// </summary>
        public const string outId = "BBPM";

        /// <summary>
        /// 用户名
        /// </summary>
        public const string admin = "";

        /// <summary>
        /// 密码
        /// </summary>
        public const string password = "";
    }
}