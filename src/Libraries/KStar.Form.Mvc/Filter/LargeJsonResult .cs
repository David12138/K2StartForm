using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using System.Web.Mvc;

namespace KStar.Form.Mvc.Filter
{
    public class LargeJsonResult : JsonResult
    {
        const string JsonRequest_GetNotAllowed = @"This request has been blocked because sensitive information could be disclosed 
                                                   to third party web sites when this is used in a GET request";

        public LargeJsonResult()
        {
            MaxJsonLength = Int32.MaxValue;
            RecursionLimit = 100;

        }

        public int MaxJsonLength { get; set; }
        public int RecursionLimit { get; set; }

        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }
            if (JsonRequestBehavior == JsonRequestBehavior.DenyGet &&
                String.Equals(context.HttpContext.Request.HttpMethod, "GET", StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException(JsonRequest_GetNotAllowed);
            }

            var response = context.HttpContext.Response;
            
            if (!String.IsNullOrEmpty(ContentType))
            {
                response.ContentType = ContentType;
            }
            else
            {
                response.ContentType = "application/json";
            }
            if (ContentEncoding != null)
            {
                response.ContentEncoding = ContentEncoding;
            }
            if (Data != null)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer() { MaxJsonLength = MaxJsonLength, RecursionLimit = RecursionLimit };
                response.Write(serializer.Serialize(Data));
            }
        }

    }
}
