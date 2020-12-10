using KStar.Platform.Common;
using System.Configuration;
using System.Web.Optimization;

namespace KStar.Form.Web
{
    public class BundleConfig
    {

        // 有关捆绑的详细信息，请访问 https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            string Enviroment = ConfigurationManager.AppSettings["Enviroment"];
            //kstarform 样式
            bundles.Add(new StyleBundle("~/Content/kstarform").Include(
                    "~/Content/css/reset.css",//element 重定义
                    "~/Content/index.css",//element css
                    "~/Content/form.css",//表单自定义样式，由form.less生成
                    "~/Content/Site.css"));//自定义全局样式


            string vueJs = "~/Scripts/vue/2.6.10/vue.js";//开发 vue
            if (Enviroment.Equals(HostingEnvironment.Production.ToString()))
            {
                vueJs = "~/Scripts/vue/2.6.10/vue.min.js";//生产 vue
            }
            //kstarform js
            bundles.Add(new ScriptBundle("~/Scripts/kstarform").Include(
                        "~/Scripts/IE-promise.js",//ajax Ie兼容与同步Ajax封装
                        "~/Scripts/vue/vue-i18n.js",//多语言工具
                        "~/Scripts/form/components/lang/KStarForm.js",//多语言
                        vueJs,//vue
                        "~/Scripts/ajax/ajax.min.js",//ajax
                        "~/Scripts/axios/0.19.0/axios.min.js",//ajax
                        "~/Scripts/lodash/lodash.min.js",//js处理工具
                        "~/Scripts/moment.min.js",//日期处理
                        "~/Scripts/element/2.13.1/index.js",//element js
                        "~/Scripts/element/2.13.1/umd/locale/en.js",//element 英文包
                        "~/Scripts/element/2.13.1/umd/locale/zh-CN.js",//element 中文包
                        "~/Scripts/form/components/headerSubtitle.js",//副标题组件
                        "~/Scripts/form/components/moduleBasicInformation.js",//基本信息
                        "~/Scripts/form/components/subtitlet.js",//三级标题组件
                        "~/Scripts/form/components/headerToolbar.js",//头部header悬浮按钮工具栏
                        "~/Scripts/form/components/headertitle.js",//头部表单标题
                        "~/Scripts/form/components/moduleProcessToDealWith.js",//流程处理
                        "~/Scripts/form/components/moduleApprovalRecords.js",//审批记录
                        "~/Scripts/form/components/moduleTheAttachment.js",//附件
                        "~/Scripts/form/components/moduleFormCC.js",//申请抄送
                        "~/Scripts/form/components/returnDialog.js",//头部按钮组退回弹窗
                        "~/Scripts/form/components/dialogModal.js",//弹窗
                        "~/Scripts/form/components/moduleProcessThat.js",//流程说明
                        "~/Scripts/form/components/UserPick.js",//选人控件
                        "~/Scripts/form/components/mobileUserPick.js",//手机选人组件
                        "~/Scripts/formmain.js"));//KStarForm实例



            if (Enviroment.Equals(HostingEnvironment.Production.ToString()))
            {
                BundleTable.EnableOptimizations = true;//压缩打包
            }
            else
            {
                BundleTable.EnableOptimizations = false;//不压缩打包  方便调试
            }

        }
    }
}
