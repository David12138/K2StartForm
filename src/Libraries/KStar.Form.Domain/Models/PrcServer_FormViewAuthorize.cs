using System;
using System.Linq;
using System.Text;
using SqlSugar;

namespace KStar.Form.Domain.Models
{
    ///<summary>
    ///
    ///</summary>
    [SugarTable("PrcServer_FormViewAuthorize")]
    public partial class PrcServer_FormViewAuthorize
    {
           public PrcServer_FormViewAuthorize(){


           }
           /// <summary>
           /// Desc:表自增主键
           /// Default:
           /// Nullable:False
           /// </summary>           
           [SugarColumn(IsPrimaryKey=true,IsIdentity=true)]
           public int RecordId {get;set;}

           /// <summary>
           /// Desc:表单ID
           /// Default:
           /// Nullable:False
           /// </summary>           
           public long FormID {get;set;}

           /// <summary>
           /// Desc:授权账号
           /// Default:
           /// Nullable:False
           /// </summary>           
           public string UserAccount {get;set;}

           /// <summary>
           /// Desc:是否可用
           /// Default:
           /// Nullable:True
           /// </summary>           
           public bool? EnabledFlag {get;set;}

           /// <summary>
           /// Desc:创建人
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string CreatedBy {get;set;}

           /// <summary>
           /// Desc:新建时间
           /// Default:
           /// Nullable:True
           /// </summary>           
           public DateTime? CreateTime {get;set;}

           /// <summary>
           /// Desc:修改人
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string ModifiedBy {get;set;}

           /// <summary>
           /// Desc:修改时间
           /// Default:
           /// Nullable:True
           /// </summary>           
           public DateTime? ModifiedTime {get;set;}

           /// <summary>
           /// Desc:扩展字段1
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string Attr1 {get;set;}

           /// <summary>
           /// Desc:扩展字段2
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string Attr2 {get;set;}

           /// <summary>
           /// Desc:扩展字段3
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string Attr3 {get;set;}

    }
}
