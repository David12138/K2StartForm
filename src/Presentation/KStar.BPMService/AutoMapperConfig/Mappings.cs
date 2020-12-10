using AutoMapper;
using KStar.Platform;


namespace KStar.BPMService.AutoMapperConfig
{
    /// <summary>
    /// 
    /// </summary>
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
                cfg.AddProfile<Domain.AutoMapperProfile.DomainMapperProfiles>();
                cfg.AddProfile<Form.Domain.AutoMapperProfile.FormDomainMapperProfiles>();
                cfg.AddProfile<MobileMapperProfile>();
               
               
            });

        }
    }
}