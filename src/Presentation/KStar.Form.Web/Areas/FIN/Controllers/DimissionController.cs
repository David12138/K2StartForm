using KStar.Form.Mvc.Controllers;
using KStar.Platform.Infrastructure;
using KStar.Platform.Models;
using KStar.Platform.Service;
using KStar.Platform.ViewModel.Workflow;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.FIN.Controllers
{
    public class DimissionController : FormController
    {

        public IUserService userService;
        public IKStarFormStorageService KStarFormStorageService;
        private string token = "K2DA007D9ACB44CB829E609AEC432B27";
        public DimissionController(IUserService _userService, IKStarFormStorageService _KStarFormStorageService)
        {
            userService = _userService;
            KStarFormStorageService = _KStarFormStorageService;
        }
        // GET: FIN/Dimission
        public ActionResult Index()
        {
            return View();
        }

       

        /// <summary>
        /// 模糊查询
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public JsonResult FinUserInfo(string input)
        {
            var request = new HttpWebRequestHelp();
            if (!string.IsNullOrEmpty(input))
            {
                var userInfoList = userService.QueryList<MD_User>(s => s.UserAccount.Contains(input) || s.UserName.Contains(input) || s.UserDisplayName.Contains(input));


                if (userInfoList.Count() > 0)
                {
                    var result = userInfoList.Select(s => new { key = Guid.NewGuid(), value = s.UserAccount, label = s.UserDisplayName }).ToList();
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }

            return Json(null, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 通过接口获取人员信息
        /// </summary>
        /// <param name="applicantAccount"></param>
        /// <returns></returns>
        public JsonResult GetUserInfo(string applicantAccount)
        {
            var request = new HttpWebRequestHelp();
            if (!string.IsNullOrEmpty(applicantAccount))
            {
                var userinfo = userService.GetUseInfoByAccount(applicantAccount);

                var userExt = userService.QueryEntity<MD_UserExt>(s => s.UserSysId == userinfo.SysId);
                var db = new SqlSugarClient(new ConnectionConfig()
                {
                    ConnectionString = ConfigurationManager.ConnectionStrings["KStarConnection_Write"].ToString(),//主连接
                    DbType = DbType.SqlServer,
                    IsAutoCloseConnection = true,
                    InitKeyType = InitKeyType.Attribute,
                    SlaveConnectionConfigs = new List<SlaveConnectionConfig>() {//从连接
                        new SlaveConnectionConfig() { HitRate = 10, ConnectionString = ConfigurationManager.ConnectionStrings["KStarConnection_Read"].ToString() }
                    }
                });
                db.SqlQueryable<MD_Rank>("");

                string companyCode = "BB";
                string empNo = "C39456";
                if (userExt != null)
                {
                    companyCode = userExt.EHRCode;
                    empNo = userExt.UUMUserID;
                }
                var result = request.HttpPost("http://58.250.19.210:8080/K2BPM/api/STest/SyncEmployees",
                    string.Format("token={0}&&CompanyCode={1}&&EmpNo={2}", token, companyCode, empNo));

                return Json(new { UserInfo = userinfo, JobTitle = userExt.JobTitle, UserExt = result }, JsonRequestBehavior.AllowGet);
            }
            else
                return Json(null, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 调接口离职
        /// </summary>
        /// <param name="applicantAccount"></param>
        /// <param name="ResignType"></param>
        /// <param name="LastWorkDate"></param>
        public void SyncEmpLeave(string applicantAccount, string ResignType, string LastWorkDate)
        {
            var request = new HttpWebRequestHelp();
            if (!string.IsNullOrEmpty(applicantAccount))
            {
                var userinfo = userService.GetUseInfoByAccount(applicantAccount);

                var userExt = userService.QueryEntity<MD_UserExt>(s => s.UserSysId == userinfo.SysId);
                string companyCode = "BB";
                string empNo = "C39456";
                if (userExt != null)
                {
                    companyCode = userExt.EHRCode;
                    empNo = userExt.UUMUserID;
                }
                var result = request.HttpPost("http://58.250.19.210:8080/K2BPM/api/STest/SyncEmpLeave",
                    string.Format("token={0}&&CompanyCode={1}&&EmpNo={2}&&ResignType={3}&&LastWorkDate={4}", token, companyCode, empNo, ResignType, LastWorkDate));

            }
        }


    }
}