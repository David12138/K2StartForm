using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace KStar.Form.Mvc.Helper
{
    public static class UtilityHelper
    {

        /// <summary>
        /// 共享上收类流程条件对照字典  
        /// </summary>
        /// <param name="dataFields">Model DataFields</param>
        /// <returns></returns>
        public static bool GetIsCollect(string dataFields)
        {
            //费用  应收  应付
            string[] str2 = "isCollect,ZSDLX,ZSFSS".Split(',');
            string[] str3 = "1,2,X".Split(',');
            JObject jo = (JObject)JsonConvert.DeserializeObject(dataFields);
            for (int i = 0; i < str2.Length; i++)
            {
                if (dataFields.Contains(str2[i]))
                {
                    if (jo[str2[i]].ToString() == str3[i])
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        /// <summary>
        /// 获取DataField里面的数据
        /// </summary>
        /// <param name="dataFields"></param>
        /// <param name="name">属性名称</param>
        /// <returns></returns>
        public static string GetDataFieldsByName(string dataFields, string name)
        {
            JObject jo = (JObject)JsonConvert.DeserializeObject(dataFields);
            if (dataFields.Contains(name))
            {
                return jo[name].ToString();
            }

            return string.Empty;
        }

    }
}