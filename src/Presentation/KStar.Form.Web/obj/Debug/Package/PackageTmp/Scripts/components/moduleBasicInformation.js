/*
 * @Description:基本信息
 * @Author:wsz
 * @Date:2019-10-9
 * @LastEditors:wsz
 * @LastEditTime:2019-10-9
 */
var templateContent = '\
    <div class="module-basic-information">\
    <mobileuserpick :pop-visible="parmdialog.mobiledialogvisible" v-on:closedialog="closedialog" :multiple="parmdialog.multiplelimit" :title="parmdialog.title" v-on:change="requseturl" v-if="parmdialog.mobiledialogvisible" :type="parmdialog.clicktype"></mobileuserpick>\
    <userpick :parmdialog = "parmdialog" v-on:closedialog = "closedialog" v-on:requseturl = "requseturl" v-if="parmdialog.dialogvisible"></userpick>\
        <headersubtitle :header-title="headerTitle" ref="headerSubTitleRef">\
            <i slot="subIcon" class="icon-sub iconfont iconxinxi"></i>\
            <el-form size="mini" label-width="120px" label-position="right" :rules="basicInfoRules" ref="refFormBasicInfo" :model="formbasicinformationmodel" class="app-bg-gray custom-reset-styles">\
                <el-row :gutter="24">\
                    <el-col :xs="24" :sm="12" :md="12" :lg="8">\
                        <el-form-item :label="$t(\'KStarForm.Application\')">\
                            <el-input v-if="(formtype==\'Application\'||formtype==\'Draft\')&&(formbasicinformationmodel.ApplicationUserList.length==1&&isEnableProxy==true)" v-model="formbasicinformationmodel.ApplicantDisplayName" size="mini" placeholder="" :disabled="true"><i slot="suffix" class="iconfont iconrenyuan"  v-on:click="actUserPic"/></el-input>\
                            <el-select  v-else-if="(formtype==\'Application\'||formtype==\'Draft\')&&formbasicinformationmodel.ApplicationUserList.length>1&&isEnableProxy==true" v-model="formbasicinformationmodel.ApplicantAccount" filterable :placeholder="$t(\'KStarForm.PhChoice\')" v-on:change="actApplicantChange"  size="mini">\
                            <el-option\
                                    v-for="item in formbasicinformationmodel.ApplicationUserList"\
                                    :key="item.UserAccount"\
                                    :label="item.UserDisplayName"\
                                    :value="item.UserAccount">\
                            </el-option>\
                            </el-select>\
                            <div v-else class="form-item-div" v-popover:[popoverList[0]]>{{ formbasicinformationmodel.ApplicantDisplayName }}</div>\
                        </el-form-item>\
                    </el-col>\
                    <el-col :xs="24" :sm="12" :md="12" :lg="8">\
                        <el-form-item :label="$t(\'KStarForm.ApplicantPosition\')" prop="ApplicantPositionId">\
                            <el-select v-if="formtype==\'Application\'||formtype==\'Draft\'" value-key="OrgPosSysId" v-model="formbasicinformationmodel.ApplicantPositionId" ref="ApplicantPositionId" filterable :placeholder="$t(\'KStarForm.PhChoice\')" v-on:change="actPositionChange" size="mini">\
                                <el-option v-for="(item,i) in formbasicinformationmodel.UserPosList"\
                                    :key="i"\
                                    :label="item.OrgName+\'--\'+item.PosName"\
                                    :value="item.OrgPosSysId">\
                                </el-option>\
                            </el-select>\
                            <div v-else class="form-item-div">{{ formbasicinformationmodel.ApplicantPositionName }}</div>\
                        </el-form-item>\
                    </el-col>\
                    <el-col :xs="24" :sm="12" :md="12" :lg="8">\
                        <el-form-item :label="$t(\'KStarForm.ApplicantDepartment\')">\
                            <div class="form-item-div">{{ formbasicinformationmodel.ApplicantOrgName }}</div>\
                        </el-form-item>\
                    </el-col>\
                    <el-col :xs="24" :sm="12" :md="12" :lg="8">\
                        <el-form-item :label="$t(\'KStarForm.ApplyDate\')">\
                            <div class="form-item-div">{{ formbasicinformationmodel.SubmitDate }}</div>\
                        </el-form-item>\
                    </el-col>\
                    <el-col :xs="24" :sm="12" :md="12" :lg="8">\
                        <el-form-item :label="$t(\'KStarForm.Submitter\')">\
                            <div class="form-item-div" v-popover:[popoverList[1]]>{{ formbasicinformationmodel.SubmitterDisplayName }}</div>\
                        </el-form-item>\
                    </el-col>\
                    <el-col :xs="24" :sm="12" :md="12" :lg="8">\
                        <el-form-item :label="$t(\'KStarForm.ProcessBillNo\')">\
                            <div class="form-item-div">\
                                {{ formbasicinformationmodel.Folio }}\
                            </div>\
                        </el-form-item>\
                    </el-col>\
                    <el-col :xs="24" :sm="12" :md="12" :lg="12">\
                        <el-form-item :label="$t(\'KStarForm.Urgency\')" class="basicInformation-radio-group">\
                             <el-radio-group v-model="formbasicinformationmodel.Urgency"  :hide-required-asterisk="false" :disabled="formtype !=\'Application\' && formtype !=\'ReApproval\' ">\
                                <el-radio :label="1" >{{$t("KStarForm.Normal")}}</el-radio>\
                                <el-radio :label="2" >{{$t("KStarForm.Medium")}}</el-radio>\
                                <el-radio :label="3">{{$t("KStarForm.Urgent")}}</el-radio>\
                            </el-radio-group>\
                           <!-- <el-radio-group v-for="item in urgencyList" v-model="formbasicinformationmodel.Urgency"   :hide-required-asterisk="false" style="margin-right:10px;">\
                                <el-radio  :key="item.value" :value="item.value" :label="item.label"></el-radio>\
                            </el-radio-group>-->\
                        </el-form-item>\
                    </el-col>\
                    <!--<el-col :xs="24" :sm="24" :md="24" :lg="24">\
                        <el-form-item :label="$t(\'KStarForm.FormSubject\')" prop="FormSubject">\
                            <el-input v-if="formtype==\'Application\'||formtype==\'Draft\'" v-model="formbasicinformationmodel.FormSubject" :placeholder="$t(\'KStarForm.PleaseEnterContent\')" size="mini" ref="FormSubject"></el-input>\
                            <div v-else class="form-item-div">{{ formbasicinformationmodel.FormSubject }}</div>\
                        </el-form-item>\
                    </el-col>-->\
                    <el-col :xs="24" :sm="24" :md="24" :lg="24">\
                        <el-form-item label="$t(\'KStarForm.RejectReason\')" v-if="formbasicinformationmodel.Field1">\
                            <div class="form-item-div" >\
                                {{ formbasicinformationmodel.Field1 }}\
                            </div>\
                        </el-form-item>\
                    </el-col>\
                </el-row>\
            </el-form>\
            <el-popover v-for="(item, index) in popoverList" :key="index" :ref="item" placement="top-start" width="200" trigger="hover" :disabled="true" :open-delay="200" v-on:show="showPopover(item)">\
                <el-row v-loading="loading">\
                    <el-col class="user-info-title" style="font-weight: 700; font-size: 16px">{{userInfo.Name}}</el-col>\
                    <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantDept") }}{{userInfo.Department}}</el-col>\
                    <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantTel") }}{{userInfo.Telephone}}</el-col>\
                    <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantMobile") }}{{userInfo.Mobile}}</el-col>\
                    <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantEMail") }}{{userInfo.Email}}</el-col>\
                </el-row>\
            </el-popover>\
      </headersubtitle>\
    </div>\
';
var moduleBasicInformation = Vue.extend({
    template: templateContent,
    props: ['formtype', 'formbasicinformationmodel', 'formoperationmodel', 'headerTitle'],
    data: function () {
        return {
            isEnableProxy: false,
            parmdialog: {
                dialogvisible: false,
                clicktype: '',
                type: '',
                ctype: '',
                title: "选人控件",
                multiplelimit: false,
                mobiledialogvisible: false
            },
            basicInfoRules: {
                //取消申请人岗位验证 2020-03-23 ZGH
                //ApplicantPositionId: [
                //    { required: true, message: '请选择申请人岗位', trigger: 'change' }
                //],
                FormSubject: [
                    { required: true, message: '请输入流程标题', trigger: 'blur' }
                ]
            },
            userInfo: {},
            loading: false,
            disabled: false,
            popoverList: ['popover1', 'popover2'],
            urgencyList: [{ value: 1, label: "Normal" },
            { value: 2, label: "Medium" },
            { value: 3, label: "Urgent" }],
        }
    },
    methods: {
        showPopover: function (val) {
            if (document.body.clientWidth > 767) {
                this.disabled = false
                if (val == this.popoverList[0]) {
                    this.getUserInfo(this.formbasicinformationmodel.ApplicantAccount)
                } else if (val == this.popoverList[1]) {
                    this.getUserInfo(this.formbasicinformationmodel.SubmitterAccount)
                }
            } else {
                this.disabled = true
            }
        },
        // 个人信息
        getUserInfo: function (userAccount) {
            this.loading = true
            // var url = window.location.origin + '/Account/GetUserInfo'
            var that = this
            // axios.post(url, {userAccount: userAccount,FormId: KStarForm.vmFormData.vmFormInstance.Id}).then(function(res) {
            //     that.loading = false
            //     that.userInfo = res.data.data
            // })
            axios.post('/Account/GetUsesDisplayInfo', { userAccount: userAccount }).then(function (res) {
                that.loading = false
                that.userInfo = res.data.data
            })
        },
        actPositionChange: function (value) {
            KStarForm.positionChange(value);
        },
        actApplicantChange: function (value) {
            KStarForm.applicantChange(value);
        },
        actUserPic: function () {
            this.showdialog('Redirect', false);
        },
        //打开弹窗
        showdialog: function (val, multiple) {
            if (document.body.clientWidth > 767) {
                this.parmdialog.dialogvisible = true;
            } else {
                this.parmdialog.mobiledialogvisible = true;
            }
            this.parmdialog.clicktype = val;
            this.parmdialog.type = "User"; //只选人员
            this.parmdialog.ctype = "UserPick"; //选人控件
            // this.parmdialog.dialogvisible = true;
            this.parmdialog.title = KStarForm.VM.$t("KStarForm.SelectUser"); //弹出框标题  请选择人员
            this.parmdialog.multiplelimit = multiple; //是否多选
            return false;
        },
        //关闭弹窗
        closedialog: function (val) {
            this.parmdialog.dialogvisible = false;
            this.parmdialog.mobiledialogvisible = false
        },
        //请求url
        requseturl: function (val, type) {

            if (val.length == 0) {
                // $(window).initSelectPersonHtml({
                //     ctype: "UserPick",
                //     type: "User",
                //     mutilselect: false,
                //     callback: function (data, e) {
                //         if (data.length == 0) {
                //             until.showErrorMsg("请选择用户！");
                //             return false;
                //         }
                //     }
                // });
                // return false;
                this.showdialog(type.clicktype, false);
                return false;
            }

            KStarForm.vmFormData.vmFormInstance.ApplicantAccount = val[0].Value;
            KStarForm.vmFormData.vmFormInstance.ApplicantDisplayName = val[0].Name;

            type.dialogvisible = false;
            this.parmdialog.mobiledialogvisible = false;
        }
    },
    computed: {


    },
    watch: {
        'formbasicinformationmodel.ApplicantAccount': {
            handler: function (curVal, oldVal) {
                var url = getControllerName() + "/GetUserPostionOrgInfo";
                if (curVal && (this.formtype == "Application" || this.formtype == "Draft")) {
                    $post(url, { userAccount: curVal, processCode: KStarForm.vmFormData.vmFormInstance.ProcessCode },
                        function (response) {
                            if (response.status == 200) {
                                //绑定vue前端
                                KStarForm.vmFormData.vmFormInstance.UserPosList = response.data.data.list;
                                KStarForm.vmFormData.vmFormInstance.ApplicantPositionId = response.data.data.positionOrg.OrgPosSysId;
                                KStarForm.vmFormData.vmFormInstance.ApplicantPositionName = response.data.data.positionOrg.PosName;
                                KStarForm.vmFormData.vmFormInstance.ApplicantOrgId = response.data.data.positionOrg.OrgSysId;
                                KStarForm.vmFormData.vmFormInstance.ApplicantOrgName = response.data.data.positionOrg.OrgName;
                                KStarForm.vmFormData.vmFormInstance.ApplicantCompanyId = response.data.data.company.SysId;
                                KStarForm.vmFormData.vmFormInstance.ApplicantCompanyName = response.data.data.company.Name;
                            }
                        },
                        function (error) {
                            alertInfo.call(this, error.response.data.message);
                        });
                }

            },
            deep: true,
            immediate: true
        },
        formoperationmodel: {
            handler: function (curVal, oldVal) {
                this.isEnableProxy = curVal.IsEnableProxy;
            },
            deep: true,
            immediate: true
        },
        // 2019-12-31 审批界面基本信息不展开
        formtype: function(val){
            console.log(val)
            if (val == 'Approval') {
                this.$refs.headerSubTitleRef.visiable = false
            }
        }
    }

});
// 注册
Vue.component('modulebasicinformation', moduleBasicInformation);


