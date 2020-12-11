/*
 * @Description: 流程说明
 * @Author: ytwang
 * @Date: 2019-05-23 10:19:13
 * @LastEditors: ytwang
 * @LastEditTime: 2019-05-26 04:24:20
 */
var templateContent = '\
  <div class="module-process-that">\
    <headersubtitle header-title="流程说明" class="process-that">\
        <i slot="subIcon" class="icon-sub icon iconfont iconliuchengshuoming"></i>\
        <el-form size="mini" label-width="100px">\
            <el-form-item label="流程路径：" v-if="formsettingmodel.VersionFormSettings.IsShowProcPath===true&&formsettingmodel.VersionFormSettings.ProcessPath" class="item-is-border">\
                <el-button type="text" icon="icon iconfont icondianji" class="link-btn" @click="OnlinePreview">点击查看</el-button>\
            </el-form-item>\
            <el-form-item label="流程说明：" v-if="formsettingmodel.VersionFormSettings.IsShowDesc===true" class="process-that-item">\
            <div v-html="formsettingmodel.VersionFormSettings.ProcessDescription"></div>\
            </el-form-item>\
            <el-form-item label="相关案例：" v-if="formsettingmodel.VersionFormSettings.IsShowRelatedCase===true&&formsettingmodel.VersionFormSettings.ProcessRelatedCases">\
                <i class="icon iconfont iconwenjiantxt attachment"></i>\
                <i class="icon iconfont iconwenjiantxt attachment"></i>\
                <i class="icon iconfont iconwenjiantxt attachment"></i>\
                <i class="icon iconfont iconwenjiantxt attachment"></i>\
            </el-form-item>\
       </el-form>\
     </headersubtitle>\
     </el-dialog>\
   </div>\
';
var moduleProcessThat = Vue.extend({
    template: templateContent,
    props: ['formsettingmodel'],
    data: function () {
        return {};
    },
    methods: {
        OnlinePreview: function () {
            //在线预览
            var formSetting = KStarForm.vmFormData.vmFormSetting.VersionFormSettings;
            if (formSetting.ProcessPath) {
                //TODO...
                window.open("/PreviewOnline/PreviewOnline?path=" + formSetting.ProcessPath.Path, "_blank");
            }
        }
    }
});
// 注册
Vue.component('moduleprocessthat', moduleProcessThat);


