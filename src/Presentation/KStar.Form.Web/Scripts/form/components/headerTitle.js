/*
 * @Description: 头部表单标题
 * @Author: wsz
 * @Date: 2019-10-9
 * @LastEditors: wsz
 * @LastEditTime: 2019-10-9
 */
var templateContent = '\
    <div class="header-title">\
        <el-row class="header-title-row custom-reset-styles position-fixed">\
            <el-row class="center">\
                <el-col :xs="24" :sm="18" :md="18" :lg="18" class="route  hidden-xs-only" v-text="processroute"></el-col>\
                <el-col :xs="24" :sm="6" :md="6" :lg="6" class="btn custom-reset-styles"><el-button :type="formlanguages == \'cn\' ? \'primary\' : \'-\' " size="mini" plain v-on:click="changeLang(\'cn\')">{{  $t(\'KStarForm.Chinese\') }}</el-button><el-button :type="formlanguages == \'en\' ? \'primary\' : \'-\'" size="mini" plain v-on:click="changeLang(\'en\')">{{  $t(\'KStarForm.English\') }}</el-button></el-col>\
            </el-row>\
        </el-row>\
        <el-row class="header-title-row bg-white">\
            <headertoolbar :formtype="formtype" :formbtnmodel="formbtnmodel" :formbackactivity="formbackactivity" :formoperationmodel="formoperationmodel" :formesetting="formesetting" :operation="formoperationmodel" :procpredictionmodel="procpredictionmodel" :switchvaluemodel="switchvaluemodel"></headertoolbar>\
        </el-row >\
        <el-row class="header-title-row custom-reset-styles">\
            <el-row class="center bg-white">\
                <el-col class="title">\
                    <el-row>\
                        {{ formheadmodel.ProcessName }}\
                        <span class="tag hidden-xs-only" :class="formheadmodel.Status == 1 ? \'bg-orange\' : \'bg-theme\'" v-text="$t(\'KStarForm.FormInstanceStatus\' + [formheadmodel.Status])"><i></i></span>\
                    </el-row>\
                    <el-row class="app-tag visible-xs-only"  v-text="$t(\'KStarForm.FormInstanceStatus\' + [formheadmodel.Status])"></el-row>\
                </el-col>\
                <el-col class="bar-code-box hidden-xs-only">\
                    <span class="bar-code">{{ formheadmodel.Folio }}</span>\
                    <div class="bar-code-text">{{ formheadmodel.Folio }}</div>\
                </el-col>\
            </el-row>\
        </el-row>\
    </div>\
';
var headerTitle = Vue.extend({
    template: templateContent,
    props: ['formheadmodel', 'formprocessroute', 'formtype', 'formlanguages', 'formbtnmodel', 'formbackactivity', 'formoperationmodel', 'formesetting', 'procpredictionmodel', 'switchvaluemodel'],
    data: function () {
        return {
            formhead: {},
            processroute: ''
        };
    },
    watch: {
        formheadmodel: {
            handler: function (curVal, oldVal) {
                this.formhead = curVal;
            },
            deep: true,
            immediate: true
        },
        formprocessroute: {
            handler: function (curVal, oldVal) {
                if (curVal) {
                    if (curVal.toString() != "[object Object]") {
                        this.processroute = this.$t('KStarForm.ProcessRoute') + curVal;
                    }
                }
            },
            immediate: true
        }
    },
    methods: {
        changeLang: function (val) {
            this.locale = val;
            //设置本地缓存语言类型 中文(cn),英文（en）
            localStorage.Lang = val;
            KStarForm.VM._i18n.locale = val;
            var culture = "zh-CN";

            this.processroute = this.$t('KStarForm.ProcessRoute') + this.formprocessroute;//流程路径翻译处理
            //转成后端的语言标识，cn转成zh-CN，en转成en-US
            if (val == "en") {
                culture = "en-US";
                ELEMENT.locale(ELEMENT.lang.en);
                KStarForm.VM.vmUserLanguages = val;
            }
            else {
                ELEMENT.locale(ELEMENT.lang.zhCN);
                KStarForm.VM.vmUserLanguages = val;
            }

            //语言切换是也需要设置后端中英文
            var para = { culture: culture, applicantAccount: KStarForm.VM.vmFormInstance.ApplicantAccount, submitterAccount: KStarForm.VM.vmFormInstance.SubmitterAccount };
            $post("/Token/SetCulture", para, function (response) {
                if (response.status == 200 && response.data) {
                    KStarForm.VM.vmFormInstance.ApplicantDisplayName = response.data.data.ApplicantDisplayName;
                    KStarForm.VM.vmFormInstance.ApplicantOrgName = response.data.data.ApplicantOrgName;
                    KStarForm.VM.vmFormInstance.ApplicantPositionName = response.data.data.ApplicantPositionName;
                    KStarForm.VM.vmFormInstance.SubmitterDisplayName = response.data.data.SubmitterDisplayName;
                }
            }, function (error) { });
        }
    },
});
// 注册
Vue.component('headertitle', headerTitle);


