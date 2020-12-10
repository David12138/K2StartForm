using KStar.Platform.DBClient;
using KStar.Platform.Logger;
using SqlSugar;
using System;
using System.Threading;

namespace KStar.Form.Domain
{
    abstract class BaseRepository
    {
        //日志注入
        public ILogger _logger { get; set; }

        //注意：不能写成静态的
        public SqlSugarClient Db;
        public SqlSugarClient BusDb;
        public BaseRepository()
        {
            Db = DbConfig.GetDbInstance();
            BusDb = BusinessDbConfig.GetDbInstance();
        }

        /// <summary>
        /// 用户账号
        /// </summary>
        public virtual string UserAccount { get { return Thread.CurrentPrincipal.Identity.Name; } }
        /// <summary>
        /// 管理员
        /// </summary>
        public virtual bool IsAdmin
        {
            get
            {
                try
                {
                    return Thread.CurrentPrincipal.IsInRole(Platform.Common.SystemRoleEnum.Admin.ToString());
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }





    }
}
