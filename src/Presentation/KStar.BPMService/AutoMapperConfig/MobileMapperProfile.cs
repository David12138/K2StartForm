using AutoMapper;
using KStar.BPMService.Models;
using KStar.Form.Domain.ViewModels.BPMService.Requst;
using KStar.Platform.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace KStar.BPMService.AutoMapperConfig
{
    /// <summary>
    /// 
    /// </summary>
    public class MobileMapperProfile : Profile
    {
        /// <summary>
        /// 
        /// </summary>
        public SystemDictionaryContext _dictionaryContext { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public MobileMapperProfile()
        {

            #region BPMService Map配置

            //发起接口模型映射
            CreateMap<ProcessStartArgs, ProcessStartInfo>().ReverseMap();

            #endregion

        }

        private string ConvertUrl(string url)
        {
            var dic = new Dictionary<string, object>();
            Regex regex = new Regex(@"(^|&)?(\w+)=(\w+)(&|$)?", RegexOptions.Compiled);
            MatchCollection mc = regex.Matches(url);
            foreach (Match m in mc)
            {
                dic.Add(m.Result("$2"), m.Result("$3"));
            }

            byte[] b = Encoding.Default.GetBytes($"{dic["sn"]}&{dic["workId"]}&{DateTime.Now}");
            var secret = Convert.ToBase64String(b);
            return $"{url}&_s={secret}";
        }

    }
}