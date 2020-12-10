using AutoMapper;
using KStar.Form.Domain.AutoMapperProfile;
using KStar.Platform;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.ProcessEventService.AutoMapperConfig
{
    public class Mappings
    {
        /// <summary>
        /// 注册所有程序集的Profile
        /// </summary>
        public static void RegisterMappings()
        {
            //注册映射
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<PlatformMapperProfiles>();
                cfg.AddProfile<ProcessMapperProfiles>();
                cfg.AddProfile<FormDomainMapperProfiles>();
            });

        }
    }
}