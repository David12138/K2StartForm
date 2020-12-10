using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace KStar.Form.Web.Helper
{
    public static class UtilityHelper
    {
        public static DateTime GetCurrentDate()
        {
            return DateTime.Now;
        }

        /// <summary>
        /// 取指定日期是一年中的第几周
        /// </summary>
        /// <param name="dtime">给定的日期</param>
        /// <returns>数字 一年中的第几周</returns>
        public static int WeekOfYear(DateTime dtime)
        {
            try
            {
                //确定此时间在一年中的位置
                int dayOfYear = dtime.DayOfYear;
                //当年第一天
                DateTime tempDate = new DateTime(dtime.Year, 1, 1);
                //确定当年第一天
                int tempDayOfWeek = (int)tempDate.DayOfWeek;

                ////确定星期几
                int index = (int)dtime.DayOfWeek;


                //当前周的范围
                DateTime retStartDay = dtime.AddDays(-index);
                DateTime retEndDay = dtime.AddDays(6 - index);

                //确定当前是第几周
                int weekIndex = (int)Math.Ceiling(((double)dayOfYear + tempDayOfWeek) / 7);

                if (retStartDay.Year < retEndDay.Year)
                {
                    weekIndex = 1;
                }

                return weekIndex;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        /// <summary>
        /// 根据年月日获得星期几
        /// </summary>
        /// <param name="month"></param>
        /// <param name="day"></param>
        /// <returns></returns>
        public static string CaculateWeekDay(DateTime dtime)
        {
            string weekstr = string.Empty;
            var weekValue = dtime.DayOfWeek.GetHashCode();
            return CaculateWeekDay(weekValue);
        }

        public static string CaculateWeekDay(int weekValue)
        {
            string weekstr = string.Empty;
            switch (weekValue)
            {
                case 0: weekstr = "日"; break;
                case 1: weekstr = "一"; break;
                case 2: weekstr = "二"; break;
                case 3: weekstr = "三"; break;
                case 4: weekstr = "四"; break;
                case 5: weekstr = "五"; break;
                case 6: weekstr = "六"; break;
            }
            return weekstr;
        }

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



        /// <summary>
        /// 解析Json，返回键值对，key对应参数
        /// </summary>
        /// <param name="userInfoJson">Json串</param>
        /// <param name="key">参数Key</param>
        /// <returns></returns>
        public static string ConvertToKey(string userInfoJson, string key)
        {
            if (string.IsNullOrWhiteSpace(userInfoJson)) return "";
            var value = string.Empty;
            var dic = KStar.Form.Web.Helpers.JsonHelper.ConvertToModel<Dictionary<string, object>>(userInfoJson);
            if (dic.ContainsKey(key))
            {
                value = dic[key] + "";
            }
            return value;
        }

    }
}