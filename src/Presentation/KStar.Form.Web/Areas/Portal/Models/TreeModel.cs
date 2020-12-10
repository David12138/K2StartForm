using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KStar.Form.Web.Areas.Portal.Models
{
    /// <summary>
    /// 树形Model
    /// </summary>
    public class TreeModel
    {
        public TreeModel() {
            children = new List<TreeModel>();
        }
        /// <summary>
        /// Id
        /// </summary>
        public Guid id { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string label { get; set; }
        public Guid Parent_Id { get; set; }
        /// <summary>
        /// 子树
        /// </summary>
        public List<TreeModel> children { get; set; }
    }
}