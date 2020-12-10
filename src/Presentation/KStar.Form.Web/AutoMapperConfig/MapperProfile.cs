using AutoMapper;
using KStar.Form.Web.Areas.Portal.Models;
using KStar.Platform.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.Form.Web.AutoMapperConfig
{
    /// <summary>
    /// MapperProfile
    /// </summary>
    public class MapperProfile : Profile
    {
        /// <summary>
        ///
        /// </summary>
        public MapperProfile()
        {
            CreateMap<ProcessMapByCategoryModel, TreeModel>().ForMember(desc => desc.id, source => source.MapFrom(p => p.Id)).ForMember(desc => desc.label, source => source.MapFrom(p => p.Name)).ReverseMap(); 
        }
    }
}