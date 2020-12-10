using Exceptionless;
using KStar.Platform.Common;
using KStar.Platform.Logger;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using System.Web.Mvc;

namespace KStar.ProcessEventService.Filter
{
    /// <summary>
    /// 自定义的异常处理程序
    /// </summary>
    public class GlobalExceptionHandler : ExceptionHandler
    {
        /// <summary>
        /// 处理异常
        /// </summary>
        /// <param name="context"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public override Task HandleAsync(ExceptionHandlerContext context, CancellationToken cancellationToken)
        {
            if (!ShouldHandle(context))
            {
                return Task.FromResult(0);
            }
            string logId = ExceptionlessClient.Default.GetLastReferenceId();
            int code = 999;
            if (context.Exception is KStarCustomException)
            {
                code = 998;
            }
            var message = Newtonsoft.Json.JsonConvert.SerializeObject(new { Code = code, Message = context.Exception.Message, Status = false, LogId = logId });
            context.Result = new ErrorResult
            {
                Request = context.ExceptionContext.Request,
                Content = message,
                ErrorContent = $"logid:{logId}" //$"[message:{context.Exception.Message} logid:{logId}]"  TODO 无法处理中文乱码的问题，在状态码中，好像只能用英文。
            };
            return Task.FromResult(0);
        }
        /// <summary>
        /// 判断是否应该处理
        /// 后期扩展，重写方法可过滤掉不需处理的异常
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public override bool ShouldHandle(ExceptionHandlerContext context)
        {
            return true;
        }
        private class ErrorResult : IHttpActionResult
        {
            public HttpRequestMessage Request { get; set; }
            public string ErrorContent { get; set; }
            public string Content { get; set; }
            public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
            {
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                response.Content = new StringContent(Content);
                response.ReasonPhrase = ErrorContent;

                response.RequestMessage = Request;
                return Task.FromResult(response);
            }
        }
    }
    /// <summary>
    /// 全局异常记录
    /// </summary>
    public class GlobalExceptionLogger : ExceptionLogger
    {
        public ILogger log;
        public GlobalExceptionLogger()
        {
            log = DependencyResolver.Current.GetService<ILogger>();
        }
        public override Task LogAsync(ExceptionLoggerContext context, CancellationToken cancellationToken)
        {
            if (!ShouldLog(context))
            {
                return Task.FromResult(0);
            }
            if (context.Exception != null)
            {
                log.Error(context.Exception);
            }
            return Task.FromResult(0);
        }
        /// <summary>
        /// 判断是否应记录异常
        /// 后期重写此方法，可过滤掉不需要记录的异常信息
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public override bool ShouldLog(ExceptionLoggerContext context)
        {
            if ((context.Exception is System.Web.HttpException))
            {
                return false;
            }
            return true;
        }
    }
}