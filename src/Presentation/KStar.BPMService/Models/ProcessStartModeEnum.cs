using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.BPMService.Models
{
    /// <summary>
    /// 发起模式枚举
    /// </summary>
    public enum ProcessStartModeEnum
    {
        /// <summary>
        /// 不需要弹出确认页面，直接发起流程
        /// </summary>
        Default,
        /// <summary>
        /// 需要弹出确认页面进行确认
        /// </summary>
        Confirm
    }
}