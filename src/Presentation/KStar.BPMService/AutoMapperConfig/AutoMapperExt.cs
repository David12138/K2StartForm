using AutoMapper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace KStar.BPMService.AutoMapperConfig
{
    /// <summary>
    /// Create by：Awen
    /// Create Time：2017-11-14
    /// Description：AutoMapper 
    /// </summary>
    public static class AutoMapperExt
    {
        /// <summary>
        ///  类型映射
        /// </summary>
        public static T MapTo<T>(this object obj)
        {
            if (obj == null) return default(T);
            return Mapper.Map<T>(obj);
        }

        /// <summary>
        /// 集合列表类型映射
        /// </summary>
        public static List<TDestination> MapToList<TDestination>(this IEnumerable source)
        {
            return Mapper.Map<List<TDestination>>(source);
        }

        /// <summary>
        /// 集合列表类型映射
        /// </summary>
        public static List<TDestination> MapToList<TSource, TDestination>(this IEnumerable<TSource> source)
        {

            return Mapper.Map<List<TDestination>>(source);
        }

        /// <summary>
        /// 类型映射
        /// </summary>
        public static TDestination MapTo<TSource, TDestination>(this TSource source, TDestination destination)
            where TSource : class
            where TDestination : class
        {
            if (source == null) return destination;
            return Mapper.Map(source, destination);
        }

        /// <summary>
        /// 表达式映射
        /// </summary>
        /// <typeparam name="DtoModel"></typeparam>
        /// <typeparam name="DomainModel"></typeparam>
        /// <param name="selector"></param>
        /// <returns></returns>
        public static Expression<Func<DomainModel, bool>> ExpressionMap<DtoModel, DomainModel>(System.Linq.Expressions.Expression<Func<DtoModel, bool>> selector)
        {
            var expression = Mapper.Map<Expression<Func<DtoModel, bool>>, Expression<Func<DomainModel, bool>>>(selector);
            return expression;
        }

        /// <summary>
        /// 表达式映射
        /// </summary>
        /// <typeparam name="DtoModel"></typeparam>
        /// <typeparam name="DomainModel"></typeparam>
        /// <param name="selector"></param>
        /// <returns></returns>
        public static Expression<Func<DomainModel, DomainModel>> ExpressionMap<DtoModel, DomainModel>(System.Linq.Expressions.Expression<Func<DtoModel, DtoModel>> selector)
        {
            var expression = Mapper.Map<Expression<Func<DtoModel, DtoModel>>, Expression<Func<DomainModel, DomainModel>>>(selector);
            return expression;
        }
    }
}