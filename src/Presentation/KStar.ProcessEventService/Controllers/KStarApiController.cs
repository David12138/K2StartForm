using KStar.Platform.Logger;
using KStar.Platform.Service;
using KStar.Platform.Service.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace KStar.ProcessEventService.Controllers
{
    /// <summary>
    /// 基类
    /// </summary>
    [ValidateInput(false)]
    public class KStarApiController : ApiController
    {
        /// <summary>
        /// 获取数据
        /// </summary>
        public IBaseBusinessService baseBusinessService { get; set; }
        /// <summary>
        /// 日志
        /// </summary>
        public ILogger logger { get; set; }

    }
}
