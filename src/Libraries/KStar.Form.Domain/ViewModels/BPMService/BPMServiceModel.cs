using KStar.Domain.Models;
using KStar.Platform.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Domain.ViewModels.BPMService
{
    /// <summary>
    /// 接口状态及日志 数据承载模型
    /// </summary>
    public class BPMServiceModel
    {
        /// <summary>
        /// 接口日志信息
        /// </summary>
        public PrcServer_BPMInterfaceLog InterfaceLog { get; set; }

        /// <summary>
        /// 响应数据
        /// </summary>
        public ResponseResultModel ResponseInfo { get; set; }

        /// <summary>
        /// 表单实例信息
        /// </summary>
        public PrcServer_FormInstance FormInstanceInfo { get; set; }

    }
}
