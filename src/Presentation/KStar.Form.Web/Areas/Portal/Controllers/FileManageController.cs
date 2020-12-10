using KStar.Form.Domain.Service;
using KStar.Form.Mvc.Controllers;
using KStar.Platform.Service;
using KStar.Platform.ViewModel;
using System;
using System.Diagnostics;
using System.IO;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.Portal.Controllers
{
    public class FileManageController : KStarFormController
    {
        private ISystemDictionaryService service;
        public SystemDictionaryContext _dictionaryContext { get; set; }
        public FileManageController(ISystemDictionaryService _service)
        {
            service = _service;
        }
        // GET: System/FileManage
        public ActionResult Index()
        {
            return View();
        }

        #region UserName
        public string UserName
        {
            get
            {
                if (User.Identity.IsAuthenticated)
                {
                    return User.Identity.Name;
                }
                else
                {
                    return string.Empty;
                }
            }
        }
        #endregion

        /// <summary>
        /// 连接服务器
        /// </summary>
        /// <param name="path"></param>
        /// <param name="userName"></param>
        /// <param name="passWord"></param>
        /// <returns></returns>
        private static bool connectState(string path, string userName, string passWord)
        {
            bool Flag = false;
            Process proc = new Process();
            try
            {
                proc.StartInfo.FileName = "cmd.exe";
                proc.StartInfo.UseShellExecute = false;
                proc.StartInfo.RedirectStandardInput = true;
                proc.StartInfo.RedirectStandardOutput = true;
                proc.StartInfo.RedirectStandardError = true;
                proc.StartInfo.CreateNoWindow = true;
                proc.Start();
                string dosLine = "net use " + path + " " + passWord + " /user:" + userName;
                proc.StandardInput.WriteLine(dosLine);
                proc.StandardInput.WriteLine("exit");
                while (!proc.HasExited)
                {
                    proc.WaitForExit(1000);
                }
                string errormsg = proc.StandardError.ReadToEnd();
                proc.StandardError.Close();
                if (string.IsNullOrEmpty(errormsg))
                {
                    Flag = true;
                }
                else
                {
                    throw new Exception(errormsg);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                proc.Close();
            }
            return Flag;
        }

        /// <summary>
        /// 上传文件,安照数据流
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="path"></param>
        /// <param name="fileExt"></param>
        /// <returns></returns>
        public ActionResult UploadFileStream(object stream, string path, string fileExt)
        {
            try
            {
                string FileFormat = _dictionaryContext[SettingType.FileUpload, SettingVariable.FileFormat];

                string[] extArray = FileFormat.Replace("*.", "").Split(',');
                int id = Array.IndexOf(extArray, fileExt);
                if (id == -1)
                {
                    return Json(new { code = "E", msg = "文件格式不正确！" }, JsonRequestBehavior.AllowGet);
                }

                var tf = (HttpPostedFileBase[])stream;
                HttpPostedFileBase file = tf[0];
                var ss = file.InputStream;
                var fileserver = _dictionaryContext[SettingType.FileServer, SettingVariable.FileServerPath];
                var account = _dictionaryContext[SettingType.FileServer, SettingVariable.Account];
                var password = _dictionaryContext[SettingType.FileServer, SettingVariable.Password];
                var status = connectState(fileserver, account, password);
                if (status)
                {
                    string newName = Guid.NewGuid() + "." + fileExt;
                    if (path.Length == 0)
                    {
                        path = DateTime.Now.ToString("yyyyMMdd");
                    }
                    var filePath = fileserver + "\\" + path;
                    if (!Directory.Exists(filePath))
                    {
                        Directory.CreateDirectory(filePath);
                    }
                    filePath = filePath + "\\" + newName;
                    byte[] bytes = new byte[file.InputStream.Length];
                    file.InputStream.Read(bytes, 0, bytes.Length);
                    FileStream outFileStream = new FileStream(filePath, FileMode.OpenOrCreate);
                    outFileStream.Write(bytes, 0, bytes.Length);
                    outFileStream.Flush();
                    outFileStream.Close();
                    return Json(new { code = "S", path = path + "\\" + newName, msg = "上传文件成功！" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { code = "E", msg = "文件服务器连接失败！" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { code = "E", msg = "上传文件失败:" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 下载文件数据流
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public FileStreamResult DownloadFileStream(string filePath)
        {
            try
            {
                var fileserver = _dictionaryContext[SettingType.FileServer, SettingVariable.FileServerPath];
                var account = _dictionaryContext[SettingType.FileServer, SettingVariable.Account];
                var password = _dictionaryContext[SettingType.FileServer, SettingVariable.Password];
                if (connectState(fileserver, account, password))
                {
                    FileStream inFileStream = new FileStream(fileserver + "\\" + filePath, FileMode.Open);
                    //byte[] buf = new byte[inFileStream.Length];
                    //inFileStream.Read(buf, 0, buf.Length);
                    //Stream stream = new MemoryStream(buf);

                    //inFileStream.Close();
                    var contentType = MimeMapping.GetMimeMapping(filePath);
                    return File(inFileStream, contentType);

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
        /// 校验文件后缀
        /// </summary>
        /// <param name="fileFormatArry"></param>
        /// <param name="fileExtension"></param>
        /// <returns></returns>
        private bool CheckFileExtension(string[] fileFormatArry, string fileExtension)
        {
            if (fileFormatArry != null && fileFormatArry.Length > 0)
            {
                foreach (var item in fileFormatArry)
                {
                    if (string.Equals(item, fileExtension, StringComparison.OrdinalIgnoreCase))
                    {
                        return true;
                    }
                }
            }
            return false;
        }


    }
}