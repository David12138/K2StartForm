using Hangfire;
using Hangfire.SqlServer;
using Microsoft.Owin;
using Owin;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;

[assembly: OwinStartup(typeof(KStar.BPMService.Startup))]

namespace KStar.BPMService
{
    public class Startup
    {
        //       //private IEnumerable<IDisposable> GetHangfireServers()
        //{
        //    Hangfire.GlobalConfiguration.Configuration
        //      .UseSqlServerStorage("JobsStore");
        //    yield return new BackgroundJobServer();
        //}
        public void Configuration(IAppBuilder app)
        {
            //app.UseHangfireAspNet(GetHangfireServers);
            // Let's also create a sample background job

#if DEBUG
            //BackgroundJob.Enqueue(() => Debug.WriteLine("KStar.Web Hangfire Service Start-Up!"));
#endif

            // ...other configuration logic
        }
    }
}
