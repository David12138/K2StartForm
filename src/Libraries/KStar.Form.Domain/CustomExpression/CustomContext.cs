using KStar.Platform.Logger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Domain.CustomExpression
{
    /// <summary>
    /// 用户自定义表达式  "@custom"，
    /// 自定义方法直接在这个类中扩展即可
    /// </summary>
    public class CustomContext
    {
        public ILogger _logger { get; set; }
        private Dictionary<string, string> DictDataFields = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        public CustomContext(int procInstID)
        {
            try
            {
                //using (KStarFramekWorkDbContext dbContext = new KStarFramekWorkDbContext())
                //{
                //    string sql = " select dataFields from [dbo].[FormDraft] where procInstID=" + procInstID;

                //    var result = dbContext.Database.SqlQuery<string>(sql).FirstOrDefault();

                //    if (!string.IsNullOrWhiteSpace(result))
                //    {
                //        DictDataFields = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, string>>(result);
                //    }
                //}
            }
            catch (Exception ex)
            {
                _logger.Debug("自定义表达式", $"CustomContext procInstID { procInstID };错误信息{ ex.Message }");
                _logger.Error(ex);
            }
        }

        public CustomContext(string dataFields)
        {
            try
            {
                if (!string.IsNullOrEmpty(dataFields))
                {
                    DictDataFields = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, string>>(dataFields);
                }
            }
            catch (Exception ex)
            {
                _logger.Debug("自定义表达式", $"CustomContext dataFields { dataFields };错误信息{ ex.Message }");
                _logger.Error(ex);
            }
        }

        /// <summary>
        /// decimal 转换.
        /// </summary>
        /// <param name="str1">Object 类型</param>
        /// <returns></returns>
        public decimal DecimalConvert(object str1)
        {
            decimal intValue = 0;

            if (str1 == null)
            {
                return intValue;
            }
            //转换错误，则为零
            try
            {
                intValue = Convert.ToDecimal(str1.ToString());
            }
            catch (Exception ex)
            {
                intValue = 0;
            }
            return intValue;
        }

        /// <summary>
        /// 获取DataFields
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public string DataFields(string key)
        {
            if (DictDataFields.ContainsKey(key))
            {
                return (DictDataFields[key] + string.Empty).ToString();
            }
            else
            {
                return string.Empty;
            }
        }

        public bool IsIn(string source, string strKeywords)
        {
            var keywordList = strKeywords.Split(',');

            var isExists = keywordList.Contains(source);

            return isExists;
        }

        public bool IsNumEqual(string strNum1, string strNum2)
        {
            var num1 = Convert.ToDecimal(strNum1);
            var num2 = Convert.ToDecimal(strNum2);

            return num1 == num2;
        }

        public bool IsEqual(string str1, string str2)
        {
            return string.Equals(str1, str2, StringComparison.OrdinalIgnoreCase);
        }

        /// <summary>
        /// 验证字符串是否为空或为NULL 2019-08-02 ZGH
        /// </summary>
        /// <param name="str1"></param>
        /// <returns></returns>
        public bool IsNullOrEmpty(object str1)
        {
            if (str1 == null) return true;
            return string.IsNullOrWhiteSpace(str1 + string.Empty);
        }

        public bool IsLarge(string strNum1, string strNum2)
        {
            var num1 = Convert.ToDecimal(strNum1);
            var num2 = Convert.ToDecimal(strNum2);

            return num1 > num2;
        }

        public bool IsLargeOrEqual(string strNum1, string strNum2)
        {
            var num1 = Convert.ToDecimal(strNum1);
            var num2 = Convert.ToDecimal(strNum2);

            return num1 >= num2;
        }

        public bool IsLess(string strNum1, string strNum2)
        {
            var num1 = Convert.ToDecimal(strNum1);
            var num2 = Convert.ToDecimal(strNum2);

            return num1 < num2;
        }

        public bool IsLessOrEqual(string strNum1, string strNum2)
        {
            var num1 = Convert.ToDecimal(strNum1);
            var num2 = Convert.ToDecimal(strNum2);

            return num1 <= num2;
        }

        public bool IsContains(string source, string keyword)
        {
            if (string.IsNullOrEmpty(source) || string.IsNullOrEmpty(keyword))
            {
                return false;
            }

            return source.Contains(keyword);
        }
        /// <summary>
        /// 判断该组中是否存在该用户
        /// </summary>
        /// <param name="GroupCode"></param>
        /// <param name="UserCode"></param>
        /// <returns></returns>
        public bool IsExistUserGroup(string GroupCode, string UserCode)
        {
            bool Result;
            if (string.IsNullOrWhiteSpace(GroupCode) || string.IsNullOrWhiteSpace(UserCode))
            {
                Result = false;
            }
            else
            {
                Result = true;
                //using (KStarFramekWorkDbContext dbContext = new KStarFramekWorkDbContext())
                //{
                //    var RegionGroup = dbContext.RegionGroups.Where(r => r.GroupCode.Equals(GroupCode)).FirstOrDefault();
                //    if (RegionGroup != null)
                //    {
                //        var User = dbContext.User.Where(u => u.UserName.Equals(UserCode)).FirstOrDefault();
                //        if (User != null)
                //        {
                //            var UserRegionGroup = dbContext.UserRegionGroups.Where(u => u.User_SysID.Equals(User.SysId) && u.Group_SysID.Equals(RegionGroup.SysId)).FirstOrDefault();
                //            if (UserRegionGroup != null)
                //            {
                //                Result = true;
                //            }
                //            else
                //            {
                //                Result = false;
                //            }
                //        }
                //        else
                //        {
                //            Result = false;
                //        }
                //    }
                //    else
                //    {
                //        Result = false;
                //    }

                //}
            }
            return Result;
        }

        public bool IsOtherArea(string profitCode)
        {
            return false;
            //var dicManager = new DataDictionaryManager();

            //var dicList = dicManager.GetDataDictionaryByCode("QiTaQuYu");

            //if (dicList == null || dicList.Count() == 0)
            //{
            //    return false;
            //}

            //var result = dicList.FirstOrDefault(r => r.Value.Equals(profitCode, StringComparison.OrdinalIgnoreCase));

            //return result != null;
        }


        /// <summary>
        /// 两个字符串集合的交集个数
        /// 使用场景：费用报销费用类型包含业务招待费或差旅费费时走特定分支，差旅系统传递给K2的是费用类型组合的字符串，用分隔符分开，如：1,2,3
        /// 当交集数量为其中一个集合数量时，代表完全包含，当交集大于0时，代表部分包含关系。当为0时代表集合无交集。
        /// IntersectCount("1,2","报销费用类型字符串")
        /// </summary>
        /// <param name="firstStr">第一个字符串</param>
        /// <param name="secondStr">第二个字符串</param>
        /// <returns></returns>
        public static int IntersectCount(string firstStr, string secondStr)
        {
            if (string.IsNullOrEmpty(firstStr) || string.IsNullOrEmpty(secondStr))
                return 0;
            var firstList = firstStr.Split(new char[] { ',', ';', '-', '_' }, StringSplitOptions.RemoveEmptyEntries).ToList<string>();
            var secondList = secondStr.Split(new char[] { ',', ';', '-', '_' }, StringSplitOptions.RemoveEmptyEntries).ToList<string>();
            return firstList.Intersect(secondList).Count();
        }
    }
}
