using AutoMapper;
using KStar.Domain.AutoMapperProfile;
using KStar.Form.Domain.AutoMapperProfile;
using KStar.Platform;

namespace KStar.Form.Web.AutoMapperConfig
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
                cfg.AddProfile<DomainMapperProfiles>();
                cfg.AddProfile<FormDomainMapperProfiles>();
                cfg.AddProfile<MapperProfile>();
            });

        }
    }
}