using KStar.ProcessEventService.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KStar.ProcessEventService.Api.DataSourceService
{
    /// <summary>
    /// 调用DataSourceService API
    /// </summary>
    [RoutePrefix("api/DataSourceService/SelectDataSource")]
    public class SelectDataSourceController : KStarApiController
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Result> GetLocationByParent(string parentID)
        {
            var result= new List<Result>();
            if (parentID.Equals("1", StringComparison.CurrentCultureIgnoreCase))
            {
                result.Add(new Result { label = "广东省", value = "11" });
                result.Add(new Result { label = "江西省", value = "12" });
            }
            else if(parentID.Equals("11", StringComparison.CurrentCultureIgnoreCase))
            {
                result.Add(new Result { label = "广州市", value = "111" });
                result.Add(new Result { label = "佛山市", value = "112" });
            }
            else if (parentID.Equals("12", StringComparison.CurrentCultureIgnoreCase))
            {
                result.Add(new Result { label = "南昌市", value = "121" });
                result.Add(new Result { label = "九江市", value = "122" });
            }
            else if (parentID.Equals("111", StringComparison.CurrentCultureIgnoreCase))
            {
                result.Add(new Result { label = "白云区", value = "1111" });
                result.Add(new Result { label = "越秀区", value = "1112" });
            }
            else if (parentID.Equals("112", StringComparison.CurrentCultureIgnoreCase))
            {
                result.Add(new Result { label = "顺德区", value = "1121" });
                result.Add(new Result { label = "南海区", value = "1122" });
            }
            else if (parentID.Equals("121", StringComparison.CurrentCultureIgnoreCase))
            {
                result.Add(new Result { label = "高新区", value = "1211" });
                result.Add(new Result { label = "青山湖区", value = "1212" });
            }
            else if (parentID.Equals("122", StringComparison.CurrentCultureIgnoreCase))
            {
                result.Add(new Result { label = "庐山市", value = "1221" });
                result.Add(new Result { label = "德安县", value = "1222" });
            }
            return result;
        }

        /// <summary>
        /// 下拉选择控件返回结果集
        /// </summary>
        public class Result
        {
            /// <summary>
            /// 显示标签
            /// </summary>
            public string label { get; set; }
            /// <summary>
            /// 值
            /// </summary>
            public string value { get; set; }
        }
    }
}