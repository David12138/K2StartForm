using Exceptionless;
using Exceptionless.Logging;
using KStar.Platform.Logger;
using System;

namespace KStar.BPMService.Logger
{
    /// <summary>
    /// 
    /// </summary>
    public class ExceptionLessLogger : ILogger
    {
        /// <summary>
        /// 跟踪
        /// </summary>
        public void Trace(string source, string message, params string[] tags)
        {
            ExceptionlessClient.Default.CreateLog(source, message, LogLevel.Trace).AddTags(tags).Submit();
        }

        /// <summary>
        /// 调试
        /// </summary>
        public void Debug(string source, string message, params string[] tags)
        {
            ExceptionlessClient.Default.CreateLog(source, message, LogLevel.Debug).AddTags(tags).Submit();
        }

        /// <summary>
        /// 信息
        /// </summary>
        public void Info(string source, string message, params string[] tags)
        {
            ExceptionlessClient.Default.CreateLog(source, message, LogLevel.Info).AddTags(tags).Submit();
        }

        /// <summary>
        /// 警告
        /// </summary>
        public void Warn(string source, string message, params string[] tags)
        {
            ExceptionlessClient.Default.CreateLog(source, message, LogLevel.Warn).AddTags(tags).Submit();
        }

        /// <summary>
        /// 错误
        /// </summary>
        public void Error(Exception exception, params string[] tags)
        {
            ExceptionlessClient.Default.CreateException(exception).AddTags(tags).Submit();
        }
        /// <summary>
        /// 跟踪
        /// </summary>
        /// <param name="message"></param>
        /// <param name="tags"></param>
        public void FeatureUsage(string message, params string[] tags)
        {
            ExceptionlessClient.Default.CreateFeatureUsage(message).AddTags(tags).Submit();
        }
    }
}