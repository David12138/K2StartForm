using Exceptionless;
using KStar.Platform.DBClient;
using System;
using System.Configuration;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
using System.Web;

namespace KStar.Form.Domain.Logger
{
    public static class DbLogManager
    {
        /// <summary>
        /// 处理时间
        /// </summary>
        private static DateTime BatchHandleTime = DateTime.Now;
        /// <summary>
        /// 间隔 
        /// </summary>
        private static int IntervalSeconds = 10;
        /// <summary>
        /// 时间间隔  定时保存日志
        /// </summary>
        private static int IntervalTime = IntervalSeconds * 1000;
        /// <summary>
        /// 批次大小
        /// </summary>
        private static int BatchSize = 200;
        /// <summary>
        /// 是否记录日志
        /// </summary>
        private static bool DbLog = true;

        private static System.Threading.CancellationTokenSource tokenSource = new System.Threading.CancellationTokenSource();

        //创建一个日志数据流
        //默认200条日志一个批次
        public static BatchBlock<PrcServer_UserOperationLog> batchLogs = new BatchBlock<PrcServer_UserOperationLog>(BatchSize);

        // 创建一个日志数据处理对象
        public static ActionBlock<PrcServer_UserOperationLog[]> insertLogs = new ActionBlock<PrcServer_UserOperationLog[]>(logs => InsertLogs(logs));
        /// <summary>
        /// 添加日志
        /// </summary>
        /// <param name="log"></param>
        public static void Post(HttpContext context, PrcServer_UserOperationLog log)
        {
            if (GetDbLogValue())
            {
                GetBaseLog(context, log);
                batchLogs.Post(log);
            }
        }
        /// <summary>
        /// 获取配置
        /// </summary>
        /// <returns></returns>
        private static bool GetDbLogValue()
        {
            var configValue = ConfigurationManager.AppSettings["DbLog"];

            if (string.IsNullOrEmpty(configValue))
            {
                return DbLog;
            }

            bool value;
            return bool.TryParse(configValue, out value) ? value : DbLog;
        }

        /// <summary>
        /// 启动
        /// </summary>
        public static void Start()
        {
            if (GetDbLogValue())
            {
                //将数据流链接到处理对象上。
                batchLogs.LinkTo(insertLogs, new DataflowLinkOptions { PropagateCompletion = true });
                //每间隔10s，都手动提交批处理
                Task.Run(async () =>
                {
                    while (true)
                    {
                        TimeSpan ts = DateTime.Now - BatchHandleTime;
                        if (ts.Seconds > IntervalSeconds)
                        {
                            batchLogs.TriggerBatch();//触发批处理
                        }
                        await Task.Delay(IntervalTime);
                    }
                }, tokenSource.Token);
            }
        }
        /// <summary>
        /// 停止
        /// </summary>
        public static void Stop()
        {
            if (GetDbLogValue())
            {
                tokenSource.Cancel();//取消定时任务
                batchLogs.Complete();//停止接收数据
                insertLogs.Completion.Wait();//处理并结束
            }
        }

        /// <summary>
        /// 处理数据流
        /// </summary>
        /// <param name="msgs"></param>
        private static void InsertLogs(PrcServer_UserOperationLog[] logs)
        {
            try
            {
                var Db = DbConfig.GetDbInstance();
                Db.Insertable(logs).ExecuteCommand();
                ExceptionlessClient.Default.CreateLog("用户日志-DB", "添加新日志,数量:" + logs.Length, Exceptionless.Logging.LogLevel.Trace).AddTags("DB日志").Submit();
            }
            catch (Exception ex)
            {
                ExceptionlessClient.Default.CreateLog("用户日志-DB", "添加新日志,数量:" + logs.Length + " 出现错误:" + ex.Message, Exceptionless.Logging.LogLevel.Error).AddTags("DB日志").Submit();
            }
            BatchHandleTime = DateTime.Now;
        }

        #region 获取上下文信息
        private static void GetBaseLog(HttpContext context, PrcServer_UserOperationLog log)
        {
            if (context != null)
            {
                log.ClientIP = GetUserIpAddress(context);
                log.CreateBy = context.User?.Identity?.Name;
                log.CreateTime = DateTime.Now;
                log.EndTime = log.CreateTime;
                log.UserAgent = context.Request.UserAgent;
                log.Url = context.Request.Url.AbsoluteUri;
                log.Source = GetTerminalType(log.UserAgent);

            }
        }
        private static string GetUserIpAddress(HttpContext context)
        {
            string clientIp = context.Request?.ServerVariables?["HTTP_X_FORWARDED_FOR"];
            if (String.IsNullOrEmpty(clientIp))
            {
                clientIp = context.Request?.UserHostAddress;
            }

            return clientIp;
        }
        /// <summary>
        /// 判断是否是来源
        /// </summary>
        /// <param name="userAgent"></param>
        /// <returns></returns>
        private static byte GetTerminalType(string userAgent)
        {
            var sUserAgent = userAgent.ToLower();
            var bIsIpad = sUserAgent.Contains("ipad");
            var bIsIphoneOs = sUserAgent.Contains("iphone os");
            var bIsMidp = sUserAgent.Contains("midp");
            var bIsUc7 = sUserAgent.Contains("rv:1.2.3.4");
            var bIsUc = sUserAgent.Contains("ucweb");
            var bIsAndroid = sUserAgent.Contains("android");
            var bIsCE = sUserAgent.Contains("windows ce");
            var bIsWM = sUserAgent.Contains("windows mobile");
            //var bIsWeiXn = sUserAgent.Contains("micromessenger");
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)
            {
                return 2;//移动端
            }
            else
            {
                return 1;//PC
            }
        }
        #endregion

        #region 定义

        #endregion
    }

    /// <summary>
    /// 用户操作类型
    /// </summary>
    public enum UserOperationEnum
    {
        /// <summary>
        /// 发起 提交
        /// </summary>
        Submit = 1,
        /// <summary>
        /// 审批
        /// </summary>
        Approval = 2,
        /// <summary>
        /// 表单加载
        /// </summary>
        OpenForm = 3,
        /// <summary>
        /// 用户操作
        /// </summary>
        Operation = 4
    }

}
