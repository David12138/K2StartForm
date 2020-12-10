using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Domain.ViewModels
{
    public class DataDictionaryDto
    {
        /// <summary>
        /// Desc:
        /// Default:newid()
        /// Nullable:False
        /// </summary>           
        public Guid Id { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        public Guid? ParentId { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string Name { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string Value { get; set; }

        /// <summary>
        /// Desc:1=文件夹，2=字典
        /// Default:
        /// Nullable:False
        /// </summary>           
        public int Type { get; set; }

        /// <summary>
        /// Desc:
        /// Default:0
        /// Nullable:True
        /// </summary>           
        public int? Order { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string Remark { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool IsLast { get; set; }
    }
}
