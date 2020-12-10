using KStar.Platform.Infrastructure;
using KStar.Platform.Service;
using KStar.Platform.ViewModel;
using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Xml.Serialization;

namespace KStar.Form.Web.Areas.Portal.Controllers
{
    public class PreviewOnlineController : Controller
    {
        private ISystemDictionaryService service;
        public SystemDictionaryContext _dictionaryContext { get; set; }
        public PreviewOnlineController(ISystemDictionaryService _service)
        {
            service = _service;
        }

        #region 用于文件在线预览

        /// <summary>
        /// 获取文件信息
        /// </summary>
        /// <param name="guid">与获取文件路径中的文件名称一致</param>
        /// <param name="path"></param>
        /// <param name="access_token"></param>
        /// <returns></returns>
        public JsonResult GetFileInfo(Guid guid, string path, string access_token)
        {
            string name = Path.GetFileName(path);
            WOPI wopi = new WOPI(service);
            if (!wopi.Validate(name, access_token))
            {
                return Json(new CheckFileInfo(), JsonRequestBehavior.AllowGet);
            }

            var fileInfo = wopi.GetFileInfo(path);

            fileInfo.SupportsUpdate = false;
            fileInfo.UserCanWrite = false;
            fileInfo.SupportsLocks = false;

            return Json(fileInfo, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 校验时效获取文件数据流
        /// </summary>
        /// <param name="guid">与获取文件路径中的文件名称一致</param>
        /// <param name="path"></param>
        /// <param name="access_token"></param>
        /// <returns></returns>
        public FileStreamResult GetFile(Guid guid, string path, string access_token)
        {
            try
            {
                string name = Path.GetFileName(path);
                WOPI wopi = new WOPI(service);
                if (!wopi.Validate(name, access_token))
                {
                    var stream = new MemoryStream(UTF8Encoding.Default.GetBytes(""));
                    return File(stream, "application/octet-stream");
                }
                //var config = service.GetDicItemsByCode("FileServer");
                var fileserver = _dictionaryContext[SettingType.FileServer, SettingVariable.FileServerPath];// config.First(f => f.Name == "FileServerPath").Value;
                var account = _dictionaryContext[SettingType.FileServer, SettingVariable.Account];// config.First(f => f.Name == "Account").Value;
                var password = _dictionaryContext[SettingType.FileServer, SettingVariable.Password];// config.First(f => f.Name == "Password").Value;
                if (ConnectFileServerHelp.ConnectFileServer(fileserver, account, password))
                {
                    var stream = new FileStream(path, FileMode.Open);
                    var contentType = MimeMapping.GetMimeMapping(path);
                    return File(stream, contentType);
                }
                else
                {
                    throw new Exception("连接文件服务器失败");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        /// <summary>
        /// 获取在线预览链接
        /// </summary>
        /// <param name="path">文件路径例如：20190529\6843a10a-c21c-47f8-82dd-0ed3e77a2eff.png</param>
        /// <returns></returns>
        public string GetLink(string path)
        {

            #region 非office文件类不需要在线预览链接,直接返回参数
            var fileExtension = Path.GetExtension(path);
            if (".png;.jpg;.jpeg;.gif;.txt".Contains(fileExtension.ToLower()))
            {
                return path;
            }
            #endregion

            #region 获取office文件在线预览链接
            WOPI wopi = new WOPI(service);
            //var config = service.GetDicItemsByCode("FileServer");
            var fileserver = _dictionaryContext[SettingType.FileServer, SettingVariable.FileServerPath];// config.First(f => f.Name == "FileServerPath").Value;
            var account = _dictionaryContext[SettingType.FileServer, SettingVariable.Account];// config.First(f => f.Name == "Account").Value;
            var password = _dictionaryContext[SettingType.FileServer, SettingVariable.Password];// config.First(f => f.Name == "Password").Value;
            var kstarFormWebURL = _dictionaryContext[SettingType.EnvironmentVariable, SettingVariable.KStarFormWebURL];// config.First(f => f.Name == "KstarFormWebURL").Value;
            if (!ConnectFileServerHelp.ConnectFileServer(fileserver, account, password))
            {
                throw new Exception("连接文件服务器失败");
            }

            var filePath = fileserver + "\\" + path;

            //"http://localhost:63222"
            //HttpContext.Current.Request.Url.OriginalString.Replace(HttpContext.Current.Request.RawUrl, "")
            string url = kstarFormWebURL + @"/wopi/files";
            return wopi.GetLink(filePath, url);
            #endregion
        }

        /// <summary>
        /// 文件返回处理
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="contentType"></param>
        private void FileResponse(string filePath, string contentType)
        {
            FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read);

            int fslength = (int)fs.Length;
            byte[] bimg = new byte[fslength];
            fs.Read(bimg, 0, fslength);
            fs.Close();
            Response.ClearContent();
            Response.ContentType = contentType;
            Response.OutputStream.Write(bimg, 0, fslength);
            Response.End();
        }

        /// <summary>
        /// 预览页面
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        [Authorize]
        public ActionResult PreviewOnline(string path)
        {
            var temp = PartialView("~/Areas/Portal/Views/PreviewOnline.cshtml");
            WOPI wopi = new WOPI(service);
            var fileserver = _dictionaryContext[SettingType.FileServer, SettingVariable.FileServerPath];
            var account = _dictionaryContext[SettingType.FileServer, SettingVariable.Account];
            var password = _dictionaryContext[SettingType.FileServer, SettingVariable.Password];
            //连接不上报错
            if (!ConnectFileServerHelp.ConnectFileServer(fileserver, account, password))
            {
                throw new Exception("连接文件服务器失败");
            }
            var filePath = fileserver + "\\" + path;
            var fileExtension = Path.GetExtension(path);

            if (".png;.jpg;.jpeg;.gif".Contains(fileExtension.ToLower()))
            {
                FileResponse(filePath, "image" + fileExtension.Replace(".", "/"));
                return temp;
            }
            if (".txt".Contains(fileExtension.ToLower()))
            {
                FileResponse(filePath, "text/plain");
                return temp;
            }

            HttpContext.Response.Write(@"<iframe src='" + path + "' frameborder='0' scrolling='no' id='external-frame'  style='height:100%; width:100%; margin-top: -7px;'></iframe>");
            return temp;
        }
        #endregion
    }

    #region 在线预览相关文件验证操作类

    public class WOPI
    {
        private ISystemDictionaryService service;
        public SystemDictionaryContext _dictionaryContext;
        public WOPI(ISystemDictionaryService _service)
        {
            service = _service;
            _dictionaryContext = DependencyResolver.Current.GetService<SystemDictionaryContext>();
        }

        const string s_WopiHostFormat = "{0}?WOPISrc={1}";
        const string s_WopiHostFormatPdf = "{0}?PdfMode=1&WOPISrc={1}";
        const string key = "Dbh1zG6OvhISvBNHqLDDWIF7Nvwdf2iTJEkv04sH8rTjzfiROd4WJunI0yP+Amd3K2MqMa4rphNYGTd1XzV8tA==";
        const bool CanEdit = false;//还不支持编辑
        public CheckFileInfo GetFileInfo(string path)
        {
            string fileName = path;
            FileInfo info = new FileInfo(fileName);
            string sha256 = string.Empty;

            using (FileStream stream = File.OpenRead(fileName))
            using (var sha = SHA256.Create())
            {
                byte[] checksum = sha.ComputeHash(stream);
                sha256 = Convert.ToBase64String(checksum);
            }

            var rv = new CheckFileInfo
            {
                BaseFileName = info.Name,
                OwnerId = "admin",
                Size = info.Length,
                SHA256 = sha256,
                Version = info.LastWriteTimeUtc.ToString("s")
            };

            return rv;
        }

        public string GetToken(string fileName)
        {
            KeyGen keyGen = new KeyGen(key, GetEffectiveTime());
            var rv = keyGen.GetToken(fileName);

            return HttpUtility.UrlEncode(rv);
        }
        /// <summary>
        /// 获取有效时间单位是秒
        /// </summary>
        /// <returns></returns>
        private int GetEffectiveTime()
        {
            int second = 0;
            var value = _dictionaryContext[SettingType.FileServer, SettingVariable.EffectiveTime];
            if (string.IsNullOrEmpty(value) || !int.TryParse(value, out second))
            {
                throw new ArgumentException("invalid config TimeOut ");
            }
            return second;
        }
        /// <summary>
        /// 验证是否有权限查看文件
        /// </summary>
        /// <param name="name"></param>
        /// <param name="access_token"></param>
        /// <returns></returns>
        public bool Validate(string name, string access_token)
        {
            return new KeyGen(key, this.GetEffectiveTime()).Validate(name, access_token);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="path">真实文件路径，filename则是由guid名称组成</param>
        /// <returns></returns>
        public string GetLink(string path, string url)
        {
            #region 初始化配置信息
            string xml = HttpContext.Current.Server.MapPath("~/Discovery.xml");
            WopiHost.wopidiscovery _wopiDiscovery;

            if (string.IsNullOrEmpty(url))
            {
                throw new ArgumentException("invalid config WopiServer ");
            }

            using (StreamReader fileReader = new StreamReader(xml))
            {
                XmlSerializer reader = new XmlSerializer(typeof(WopiHost.wopidiscovery));
                var wopiDiscovery = reader.Deserialize(fileReader) as WopiHost.wopidiscovery;
                _wopiDiscovery = wopiDiscovery;
            }
            #endregion
            if (string.IsNullOrEmpty(path))
            {
                throw new ApplicationException("Incorrect path for preview file.");
            }

            var fileName = Path.GetFileName(path);
            var fileId = Path.GetFileNameWithoutExtension(path);
            var fileExtension = Path.GetExtension(path).Replace(".", "");
            var netzoneApp = _wopiDiscovery.netzone.app.AsEnumerable()
                .Where(c => c.action.Where(d => d.ext == fileExtension).Count() > 0);

            var appName = netzoneApp.FirstOrDefault();

            if (null == appName)
            {
                throw new ArgumentException("invalid file extension " + fileExtension);
            }

            var appStuff = _wopiDiscovery.netzone.app.Where(c => c.name == appName.name).FirstOrDefault();


            var action = CanEdit ? "edit" : "view";

            if (appName.Equals("WordPdf"))
            {
                action = "view";
            }
            if (HttpContext.Current.Request.Browser.IsMobileDevice)
            {
                action = "mobileView";
            }
            var appAction = appStuff.action.Where(c => c.ext == fileExtension && c.name == action).FirstOrDefault();

            if (null == appAction)
            {
                throw new ApplicationException("Can't locate UrlSrc for : " + appName);
            }

            var endPoint = appAction.urlsrc.IndexOf('?');
            var endAction = appAction.urlsrc.Substring(0, endPoint);

            string fullPath = null;
            string accessToken = this.GetToken(fileName);
            string wopiHostUrlsafe = HttpUtility.UrlEncode((url + "/" + fileId + "?path=" + HttpUtility.UrlEncode(path) + "&access_token=" + accessToken).Replace(" ", "%20"));
            if (fileExtension.Contains("pdf"))
            {
                fullPath = string.Format(s_WopiHostFormatPdf, endAction, wopiHostUrlsafe);
            }
            else
            {
                fullPath = string.Format(s_WopiHostFormat, endAction, wopiHostUrlsafe);
            }
            return fullPath;
        }
    }
    public class KeyGen
    {
        byte[] _key;
        int _saltLength = 8;

        static RNGCryptoServiceProvider s_rngCsp = new RNGCryptoServiceProvider();
        private int _second;
        public KeyGen(string key, int second)
        {
            _second = second;
            _key = Encoding.UTF8.GetBytes(key);
        }

        public string GetToken(string value)
        {
            byte[] salt = new byte[_saltLength];
            s_rngCsp.GetBytes(salt);

            var saltStr = Convert.ToBase64String(salt);
            //给token加上时间 便于校验是否超时
            return GetHash(value, saltStr) + DateTime.Now.Ticks.ToString().Substring(0, 12);
        }

        internal string GetHash(string value, string saltStr)
        {
            HMACSHA256 hmac = new HMACSHA256(_key);
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(saltStr + value));
            var rv = Convert.ToBase64String(hash);
            return saltStr + rv;
        }


        public bool Validate(string name, string access_token)
        {
            //检验token是否已经超时
            var time = new DateTime(Convert.ToInt64(access_token.Substring(access_token.Length - 12, 12) + "000000"));
            if (time.AddSeconds(_second) < DateTime.Now)
            {
                return false;
            }

            access_token = access_token.Substring(0, access_token.Length - 12);
            var targetHash = GetHash(name, access_token.Substring(0, _saltLength + 4));  //hack for base64 form
            return String.Equals(access_token, targetHash);
        }


    }
    public class CheckFileInfo
    {
        public CheckFileInfo()
        {
            this.SupportsUpdate = false;
            this.UserCanWrite = false;
        }
        public string BaseFileName { get; set; }
        public string OwnerId { get; set; }
        public long Size { get; set; } //in bytes
        public string SHA256 { get; set; } //SHA256: A 256 bit SHA-2-encoded [FIPS180-2] hash of the file contents
        public string Version { get; set; }  //changes when file changes.
        public bool SupportsUpdate { get; set; }
        public bool UserCanWrite { get; set; }
        public bool SupportsLocks { get; set; }
    }
    #endregion
}