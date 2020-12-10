/*
 * @Description: 搜索内容
 * @Author: wsz
 * @Date: 2019-08-01
 * @LastEditors: wsz
 * @LastEditTime: 
 */
var templateContents = '\
    <span class="advanced-search">\
        <userpick :parmdialog="parmdialog" v-on:closedialog="closedialog" v-on:requseturl="userpickCallBack" v-if="parmdialog.dialogvisible"></userpick>\
        <span>\
            <el-popover placement="bottom-end" :width="width" trigger="manual"  v-model="popVisible" popper-class="my-poper-style my-poper-advanced" id="selfPopover">\
                <el-form :model="form" label-width="100px" size="medium" class="advanced-search-form" label-position="right" ref="refAdvancedForm">\
                    <el-row :gutter="32">\
                        <el-col :span="12" v-for="(item, index) in formItems" :key="index">\
                            <el-form-item :label="item.label">\
                                <el-input  v-if="item.type == \'user\' " v-model="forms[item.model]" readonly v-on:click.native="handleShowDialog(item)">\
                                    <i slot="suffix" class="iconfont" :class="item.icon ? item.icon : \'el-icon-user-solid\' "/>\
                                </el-input>\
                                <el-date-picker v-else-if="item.type == \'datepicker\'" v-model="form[item.model]" type="daterange" range-separator="~" value-format="yyyy-MM-dd" :start-placeholder="$t(\'Portal.HomeSearchPlaceholderStart\')" :end-placeholder="$t(\'Portal.HomeSearchPlaceholderEnd\')" :clearable="false" v-on:change="changeDatePicker(item)"></el-date-picker>\
                                <el-select v-else-if="item.type == \'select\' " v-model="form[item.model]" :placeholder="$t(\'Portal.HomeSearchChoose\')" >\
                                    <el-option v-for="n in item.option" :key="n.label" :label="n.label" :value="n.value"></el-option>\
                                </el-select>\
                                <el-checkbox v-else-if="item.type == \'checkbox\'" v-model="form[item.model]"></el-checkbox>\
                                <el-input v-model="form[item.model]" v-else></el-input>\
                            </el-form-item>\
                        </el-col>\
                    </el-row>\
                    <el-row class="advanced-search-btn text-align-right">\
                        <el-button v-on:click="handleReset" :loading="isloading" size="medium" plain>{{ $t("Portal.HomeSearchReset") }}</el-button>\
                        <el-button type="primary" v-on:click="handleSearch" :loading="isloading" size="medium" plain>{{ $t("Portal.HomeSearchConfirm") }}</el-button>\
                    </el-row>\
                </el-form>\
                <el-button slot="reference" size="medium" type="text" class="advanced-btn" v-on:click="popVisible = !popVisible" id="advanced-btn">{{ $t("Portal.HomeSearchBtn") }}<i class="el-icon-caret-bottom"></i></el-button>\
            </el-popover>\
        </span>\
    </span>\
';
var advancedsearch = Vue.extend({
    template: templateContents,
    props: ['isloading', 'formItems'],
    data: function () {
        return {
            form: {}, // 表单数据
            forms: {},
            loading: false,
            width: 0,
            //选人控件参数
            parmdialog: {
                dialogvisible: false,
                clicktype: '',
                type: '',
                ctype: '',
                title: this.$t('Portal.HomeSearchJSUserSelect'), //"选人控件"
                multiplelimit: false
            },
            popVisible: false,
        };
    },
    // computed: {

    // },
    watch: {
        popVisible: function (val) {
            if (val) {
                document.addEventListener('click', this.closePopover)
            } else {
                document.removeEventListener('click', this.closePopover)
            }
        }
    },
    mounted: function () {
        var that = this
        this.width = 900
    },
    methods: {
        // 改变日期
        changeDatePicker: function (val) {
            switch (val.model) {
                case 'ApplicationDate': // 申请日期
                    this.form.SubmitStartDate = this.form[val.model][0];
                    this.form.SubmitEndDate = this.formatEndDate(this.form[val.model][1]);
                    break;
                case 'ReviewDate': // 审阅日期
                    this.form.ApproveStartDate = this.form[val.model][0];
                    this.form.ApproveEndDate = this.formatEndDate(this.form[val.model][1]);
                    break;
                case 'CcDate': // 抄送日期
                    this.form.CcStartDate = this.form[val.model][0];
                    this.form.CcEndDate = this.formatEndDate(this.form[val.model][1]);
                    break;
                case 'processingTime': // 处理时间
                    this.form.ProcessingStartDate = this.form[val.model][0];
                    this.form.ProcessingEndDate = this.formatEndDate(this.form[val.model][1]);
                    break;
                case 'EndDate':  // 结束日期
                    this.form.FinishStartDate = this.form[val.model][0];
                    this.form.FinishEndDate = this.formatEndDate(this.form[val.model][1]);
                    break;
                case 'EndTime': // 结束时间 流程授权使用
                    this.form.endTime = this.form[val.model][0] + ';' + this.form[val.model][1];
                    break;
                case 'StartDate'://开始日期 流程授权使用
                    this.form.startTime = this.form[val.model][0] + ';' + this.form[val.model][1];
                    break;
            }
        },
        // 日期转换
        formatEndDate: function (date) {
            if (date) {
                var retDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
                return retDate.replace("00:00:00", "23:59:59");
            }
        },
        // 调用选人组件
        handleShowDialog: function (val) {
            switch (val.model) {
                case 'Originator':
                    this.showdialog('Originator', true);
                    break;
                case 'ID':
                    this.showdialog('ID', false);
                    break;
                case 'SubmitterAccount':
                    this.showdialog('SubmitterAccount', false)
                    break;
                case 'FormCCUser':
                    this.showdialog('FormCCUser', false)
                    break;
                case 'ProcessName':
                    this.showdialog('ProcessName', false)
                    break;
                case 'toUser':
                    this.showdialog('toUser', false);
                    break;
            }
        },
        //打开弹窗
        showdialog: function (val, multiple) {
            this.parmdialog.clicktype = val;
            switch (val) {
                case 'Originator':
                    this.parmdialog.type = "User";
                    this.parmdialog.ctype = "UserPick";
                    this.parmdialog.title = this.$t('Portal.HomeSearchJSApplicantSelect');//"请选择申请人"
                    break;
                case 'ID':
                    this.parmdialog.type = "Org";
                    this.parmdialog.ctype = "UserPick";
                    this.parmdialog.title = this.$t('Portal.HomeSearchJSDeptSelect');//"请选择申请部门"
                    break;
                case 'ProcessName':
                    this.parmdialog.type = "Process";
                    this.parmdialog.ctype = "ProcessPick";
                    this.parmdialog.title = this.$t('Portal.HomeSearchJSProcessSelect');//"请选择流程"
                    break;
                case 'SubmitterAccount':
                    this.parmdialog.type = "User";
                    this.parmdialog.ctype = "UserPick";
                    this.parmdialog.title = this.$t('Portal.HomeSearchJSSubmitterSelect');//"请选择填写人"
                    break;
                case 'FormCCUser':
                    this.parmdialog.type = "User";
                    this.parmdialog.ctype = "UserPick";
                    this.parmdialog.title = this.$t('Portal.HomeSearchJSCCFromSelect');//"请选择抄送人"
                    break;
                case 'toUser':
                    this.parmdialog.type = "User";
                    this.parmdialog.ctype = "UserPick";
                    this.parmdialog.title = this.$t('Portal.HomeSearchJSFromUserSelect');//"请选择授权人员"
                    break;
            }
            this.parmdialog.dialogvisible = true;
            this.parmdialog.multiplelimit = multiple;
            return false;
        },
        //关闭弹窗
        closedialog: function (val) {
            this.parmdialog.dialogvisible = false;
        },
        userpickCallBack: function (val, type) {
            if (val.length > 0) {
                switch (type.clicktype) {
                    case 'Originator':
                        var userAccountList = val.map(function (item) {
                            return item.Value;
                        }).join();
                        var userNameList = val.map(function (item) {
                            return item.Name;
                        }).join();
                        this.$set(this.form, 'OriginatorAccount', userAccountList); //传申请人工号
                        this.$set(this.forms, 'Originator', userNameList);
                        break;
                    case 'ID':
                        this.$set(this.form, 'DepartmentId', val[0].Value);
                        this.$set(this.forms, 'ID', val[0].Name);
                        break;
                    case 'ProcessName':
                        this.$set(this.form, 'ProcessCode', val[0].ProcessCode);
                        this.$set(this.forms, 'ProcessName', val[0].ProcessName);
                        break;
                    case 'SubmitterAccount':
                        this.$set(this.form, 'SubmitterAccount', val[0].Value);
                        this.$set(this.forms, 'SubmitterAccount', val[0].Name);
                        break;
                    case 'FormCCUser':
                        this.$set(this.form, 'FormCCUserAccount', val[0].Value);
                        this.$set(this.forms, 'FormCCUser', val[0].Name);
                        break;
                    case 'toUser':
                        this.$set(this.form, 'toUserAccount', val[0].Value);
                        this.$set(this.forms, 'toUser', val[0].Name);
                        break;
                }
            }
        },
        // 查询
        handleSearch: function (val) {
            var temp = JSON.parse(JSON.stringify(this.form))
            var form = {}
            // 此项是为了去除form中不必要的参数
            var list = this.formItems.filter(function (item) {
                return item.type == 'datepicker'
            })
            if (list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    temp[list[i].model] = ''
                }
            }
            for (var i in temp) {
                if (temp[i] !== '') {
                    form[i] = temp[i]
                }
            }
            // end
            this.popVisible = false
            this.$emit('search', form)
        },
        // 重置
        handleReset: function () {
            this.$refs['refAdvancedForm'].resetFields();
            //this.popVisible = false
            this.form = {}
            this.forms = {}
            this.$emit('reset')
        },
        closePopover: function () {
            var selfPopover = document.getElementById("selfPopover");
            var headerNav = document.getElementById('header-nav');
            var mainContent = document.getElementById('main-content');
            var advancedBtn = document.getElementById('advanced-btn');
            if (!selfPopover.contains(event.target) && (headerNav.contains(event.target) || mainContent.contains(event.target))) {   //点击到了id为sellineName以外的区域，隐藏下拉框
                this.popVisible = false
            } else if (advancedBtn && advancedBtn.contains(event.target)) {
                // console.log('不做任何操作')
            } else {
                this.popVisible = true
            }
        }
    }
});
// 注册
Vue.component('advancedsearch', advancedsearch);


