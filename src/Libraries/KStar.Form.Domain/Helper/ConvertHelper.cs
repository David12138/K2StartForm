using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Domain.Helper
{
    /// <summary>
    /// 
    /// </summary>
    public static class ConvertHelper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static DateTime ToDateTime(string dateTime)
        {
            if (string.IsNullOrWhiteSpace(dateTime))
            {
                return DateTime.Now;
            }
            else
            {
                if (dateTime.Contains("."))
                {
                    dateTime = dateTime.Replace("-", "/").Split('.')[0];
                }
                else
                {
                    dateTime = dateTime.Replace("-", "/").Substring(0, dateTime.Length - 4);//取消毫秒:fff -转成/

                }
                return Convert.ToDateTime(dateTime);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="number"></param>
        /// <returns></returns>
        public static int ToInt(string number)
        {
            if (string.IsNullOrWhiteSpace(number))
            {
                return 0;
            }
            else
            {
                try
                {
                    return Convert.ToInt32(number);
                }
                catch
                {
                    return 0;
                }
            }
        }
        
        /// <summary>
        /// 
        /// </summary>
        public static string GetClassParameters<T>(T model)
        {
            string retstr = string.Empty;
            Type t = model.GetType();
            System.Reflection.PropertyInfo[] properties = t.GetProperties();
            foreach (System.Reflection.PropertyInfo info in properties)
            {
                string value = string.Empty;

                if (info != null)
                {
                    object o = info.GetValue(model, null);
                    value = o != null ? o.ToString() : "";
                }
                retstr += info.Name + "=" + value + "&";
            }
            return retstr;
        }


        #region 数据转换

        /// <summary>
        /// 将指定的集合转换成DataTable。
        /// </summary>
        /// <param name="list">将指定的集合。</param>
        /// <returns>返回转换后的DataTable。</returns>
        public static DataTable ToDataTable(this IList list)
        {
            DataTable table = new DataTable();
            if (list.Count > 0)
            {
                PropertyInfo[] propertys = list[0].GetType().GetProperties();
                foreach (PropertyInfo pi in propertys)
                {
                    Type pt = pi.PropertyType;
                    if ((pt.IsGenericType) && (pt.GetGenericTypeDefinition() == typeof(Nullable<>)))
                    {
                        pt = pt.GetGenericArguments()[0];
                    }
                    table.Columns.Add(new DataColumn(pi.Name, pt));
                }

                for (int i = 0; i < list.Count; i++)
                {
                    ArrayList tempList = new ArrayList();
                    foreach (PropertyInfo pi in propertys)
                    {
                        object obj = pi.GetValue(list[i], null);
                        tempList.Add(obj);
                    }
                    object[] array = tempList.ToArray();
                    table.LoadDataRow(array, true);
                }
            }
            return table;
        }

        /// <summary>
        /// 会 创建列头
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="list"></param>
        /// <returns></returns>
        public static DataTable ToDataTable<T>(this List<T> list)
        {
            DataTable table = new DataTable();
            //创建列头
            PropertyInfo[] propertys = typeof(T).GetProperties();
            foreach (PropertyInfo pi in propertys)
            {
                Type pt = pi.PropertyType;
                if ((pt.IsGenericType) && (pt.GetGenericTypeDefinition() == typeof(Nullable<>)))
                {
                    pt = pt.GetGenericArguments()[0];
                }
                table.Columns.Add(new DataColumn(pi.Name, pt));
            }
            //创建数据行
            if (list.Count > 0)
            {
                for (int i = 0; i < list.Count; i++)
                {
                    ArrayList tempList = new ArrayList();
                    foreach (PropertyInfo pi in propertys)
                    {
                        object obj = pi.GetValue(list[i], null);
                        tempList.Add(obj);
                    }
                    object[] array = tempList.ToArray();
                    table.LoadDataRow(array, true);
                }
            }
            return table;
        }

        #endregion

    }
}
