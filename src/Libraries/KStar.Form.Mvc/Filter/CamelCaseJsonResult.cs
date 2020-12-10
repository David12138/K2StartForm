using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace KStar.Form.Mvc.Filter
{
    /// <summary>
    /// json对象命名小驼峰式转换
    /// </summary>
    public class CamelCaseJsonResult : JsonResult
    {
        /// <summary>
        /// 
        /// </summary>
        public object Data { get; private set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        public CamelCaseJsonResult(object data)
        {
            this.Data = data;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public override void ExecuteResult(ControllerContext context)
        {
            var json = JsonConvert.SerializeObject(
                    this.Data,
                    Formatting.Indented,
                    new JsonSerializerSettings
                    {
                        DateFormatHandling = DateFormatHandling.IsoDateFormat,
                        ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver()
                    }
                );

            context.HttpContext.Response.ContentType = "application/json";
            context.HttpContext.Response.Write(json);
        }
    }
}