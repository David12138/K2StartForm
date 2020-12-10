/*
 * @Description:审批记录
 * @Author:ytwang
 * @Date:2019-05-23 11:34:42
 * @LastEditors:ytwang
 * @LastEditTime:2019-06-10 03:29:47
 */
var templateContent = '\
  <div class="module-approval-records">\
    <headersubtitle :header-title="$t(\'KStarForm.ProcessRecord\')" class="process-deal custom-reset-styles">\
        <i slot="subIcon" class="icon-sub icon iconfont iconliuchengchuli"></i>\
        <el-tabs v-model="activeName" v-on:tab-click="changeTabValue">\
            <el-tab-pane :label="$t(\'KStarForm.ApprovalRecord\')" name="first">\
                <span slot="label" class="anchor-one-floor pd-24">{{ $t(\'KStarForm.ApprovalRecord\') }}</span>\
                <el-collapse-transition>\
                <el-row class="sub-body">\
                    <el-row :class="curActive == \'list\' ? \'displayBlockNotXS\' : \'displayHiddenk\' ">\
                        <el-row class="examination-list" v-for= "(item,ind) in formapproval" :key = "ind" :class="ind == formapproval.length - 1 ? \'examination-list-last\' : \'\' ">\
                            <el-col>\
                                <i class="radius">{{ind + 1}}</i>\
                                <el-row class="activeName">{{ item.ActivityName }}</el-row>\
                                <el-row class="m-content">\
                                    <el-row>\
                                        <el-col v-for="(item2,index) in formapproval[ind].actApprovalHistorys" :key="ind+index">\
                                            <el-row>\
                                                <el-col :xs="18" :sm="10" :md="10" :lg="10" class="name">\
                                                    <el-popover placement="top-start" width="200" trigger="hover" :disabled="disabled" :open-delay="800" v-on:show="getUserInfo(item2.UserAccount)">\
                                                        <el-row v-loading="loading">\
                                                            <el-col class="user-info-title" style="font-weight: 700; font-size: 16px">{{userInfo.Name}}</el-col>\
                                                            <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantDept") }}{{userInfo.Department}}</el-col>\
                                                            <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantTel") }}{{userInfo.Telephone}}</el-col>\
                                                            <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantMobile") }}{{userInfo.Mobile}}</el-col>\
                                                            <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantEMail") }}{{userInfo.Email}}</el-col>\
                                                        </el-row>\
                                                        <span slot="reference">{{ item2.UserDisplayName }}</span>\
                                                    </el-popover>\
                                                 <i class="hidden-xs-only"> {{ item2.UserPositionName }} </i></el-col>\
                                                <el-col :xs="6" :sm="12" :md="12" :lg="12" class="time-pc hidden-xs-only" v-if="item2.EndDate">\
                                                    <span >{{ $t(\'KStarForm.ProcessingTime\') }}：{{ item2.EndDate | dateformat(\'YYYY-MM-DD HH:mm\') }}</span>\
                                                    <span class="hidden-xs-only">{{ $t(\'KStarForm.Duration\') }}：{{ FormatDate(item2.EndDate, item2.StartDate) }}</span>\
                                                </el-col>\
                                                <el-col :xs="6" :sm="2" :md="2" :lg="2" class="action" :class="addClass(item2.ActionType)">{{ $t(\'KStarForm.\' + [item2.ActionType]) }}</el-col>\
                                            </el-row>\
                                            <el-row class="visible-xs-only app-gap">\
                                                <el-col :xs="12" :sm="12" :md="12" :lg="12">{{ item2.UserPositionName }}</el-col>\
                                                <el-col :xs="12" :sm="12" :md="12" :lg="12" v-if="item2.EndDate">{{ $t(\'KStarForm.Duration\') }}：{{ FormatDate(item2.EndDate, item2.StartDate) }}</el-col>\
                                            </el-row>\
                                            <el-row class="tip" v-if="item2.Comment">{{ item2.Comment}}</el-row>\
                                            <el-row class="time visible-xs-only" v-if="item2.EndDate">\
                                                <!--<span>到达时间{{ $t(\'KStarForm.ApprovalRecord\') }}：{{ item2.StartDate | dateformat(\'YYYY-MM-DD HH:mm\') }}</span>-->\
                                                <span >{{ $t(\'KStarForm.ProcessingTime\') }}：{{ item2.EndDate | dateformat(\'YYYY-MM-DD HH:mm\') }}</span>\
                                                <span class="hidden-xs-only">{{ $t(\'KStarForm.Duration\') }}：{{ FormatDate(item2.EndDate, item2.StartDate) }}</span>\
                                            </el-row>\
                                        </el-col>\
                                    </el-row>\
                                </el-row>\
                            </el-col>\
                        </el-row>\
                    </el-row>\
                    <el-table :data="formapprovalTable" border class="m-form-table hidden-xs-only" size="mini" v-if="curActive == \'table\' " :span-method="objectSpanMethod">\
                        <el-table-column prop="ActivityName" :label="$t(\'KStarForm.NodeName\')"></el-table-column>\
                        <el-table-column prop="UserDisplayName" :label="$t(\'KStarForm.SolvePeople\')">\
                            <template slot-scope="scope">\
                                 <el-popover placement="top-start" width="200" trigger="hover" :disabled="true" :open-delay="800" v-on:show="getUserInfo(scope.row.UserAccount)">\
                                    <el-row v-loading="loading">\
                                        <el-col class="user-info-title" style="font-weight: 700; font-size: 16px">{{userInfo.Name}}</el-col>\
                                        <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantDept") }}{{userInfo.Department}}</el-col>\
                                        <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantTel") }}{{userInfo.Telephone}}</el-col>\
                                        <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantMobile") }}{{userInfo.Mobile}}</el-col>\
                                        <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantEMail") }}{{userInfo.Email}}</el-col>\
                                    </el-row>\
                                    <div slot="reference">{{scope.row.UserDisplayName}}</div>\
                                </el-popover>\
                            </template>\
                        </el-table-column>\
                        <el-table-column prop="UserPositionName" :label="$t(\'KStarForm.PostSolve\')" width="120px"></el-table-column>\
                        <el-table-column prop="ActionName" :label="$t(\'KStarForm.Operation\')" width="100px">\
                            <template slot-scope="scope">\
                                <span class="action" :class="addClass(scope.row.ActionType)">{{ $t(\'KStarForm.\' + [scope.row.ActionType]) }}</span>\
                            </template>\
                        </el-table-column>\
                        <el-table-column prop="Comment" :label="$t(\'KStarForm.ProcessingOpinion\')"></el-table-column>\
                        <el-table-column prop="EndDate" :label="$t(\'KStarForm.ProcessingTime\')" width="130px">\
                            <template slot-scope="scope">\
                                <span v-if="scope.row.EndDate">{{ scope.row.EndDate | dateformat(\'YYYY-MM-DD HH:mm\') }}</span>\
                            </template>\
                        </el-table-column>\
                        <el-table-column prop="StartDate" :label="$t(\'KStarForm.Duration\')" width="110px">\
                            <template slot-scope="scope">\
                                {{ FormatDate(scope.row.EndDate, scope.row.StartDate) }}\
                            </template>\
                        </el-table-column>\
                    </el-table>\
                    <el-row style="text-align:right" v-if="adminVisible" > <el-checkbox v-model="allCheck" v-on:change="changeAllCheck">{{ $t(\'KStarForm.ViewAllProcesses\') }}</el-checkbox></el-row>\
                </el-row>\
                </el-collapse-transition>\
            </el-tab-pane>\
            <el-tab-pane :label="$t(\'KStarForm.CommicationRecord\')" name="second">\
                <span slot="label" class="pd-24">{{ $t(\'KStarForm.CommicationRecord\') }}</span>\
                <el-collapse-transition>\
                    <div class="sub-body">\
                        <el-row :class="curActive == \'list\' ? \'displayBlockNotXS\' : \'displayHiddenk\'" class="formcirculaterecord-list">\
                            <el-row class="examination-list" v-for= "(item,index) in formcirculaterecord" :key="index">\
                                <el-row class="visible-xs-only">\
                                    <el-col class="actionName" :span="12">{{$t(\'KStarForm.FormCCUser\')}}: {{item.UserDisplayName}}</el-col>\
                                    <el-col class="time" :span="12">{{ item.StartDate | dateformat(\'YYYY-MM-DD HH:mm\') }}</el-col>\
                                </el-row>\
                                <el-row class="visible-xs-only">\
                                    <el-col>{{$t(\'KStarForm.Opinion\')}}</el-col>\
                                    <el-col>{{item.Comment}}</el-col>\
                                </el-row>\
                                <el-col class="hidden-xs-only">\
                                    <i class="radius">{{index + 1}}</i>\
                                    <el-row class="activeName">{{ getProRecordTypeName(item.ActionName) }}</el-row>\
                                    <el-row class="m-content">\
                                        <el-row>\
                                            <el-col>\
                                                <el-row>\
                                                    <el-col :xs="18" :sm="10" :md="10" :lg="10" class="name">\
                                                        <el-popover placement="top-start" width="200" trigger="hover" :disabled="disabled" :open-delay="800" v-on:show="getUserInfo(item.UserAccount)">\
                                                            <el-row v-loading="loading">\
                                                                <el-col class="user-info-title" style="font-weight: 700; font-size: 16px">{{userInfo.Name}}</el-col>\
                                                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantDept") }}{{userInfo.Department}}</el-col>\
                                                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantTel") }}{{userInfo.Telephone}}</el-col>\
                                                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantMobile") }}{{userInfo.Mobile}}</el-col>\
                                                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantEMail") }}{{userInfo.Email}}</el-col>\
                                                            </el-row>\
                                                            <div slot="reference">{{ item.UserDisplayName }}</div>\
                                                        </el-popover>\
                                                    </el-col>\
                                                    <el-col :xs="6" :sm="12" :md="12" :lg="12" class="time-pc">\
                                                        <span>{{ $t(\'KStarForm.FormCCTime\') }}：{{ item.StartDate | dateformat(\'YYYY-MM-DD HH:mm\') }}</span>\
                                                    </el-col>\
                                                </el-row>\
                                                <el-row class="tip" v-if="item.Comment">{{ item.Comment}}</el-row>\
                                            </el-col>\
                                        </el-row>\
                                    </el-row>\
                                </el-col>\
                            </el-row>\
                            <el-row v-if="formcirculaterecord && formcirculaterecord.length == 0" class="no-result">{{$t(\'KStarForm.ProcessRecordListNoData\')}}</el-row>\
                        </el-row>\
                        <el-table :data="formcirculaterecord" border class="m-form-table hidden-xs-only" size="mini" v-if="curActive == \'table\'">\
                            <el-table-column prop="UserDisplayName" :label="$t(\'KStarForm.FormCCUser\')" width="150px">\
                                <template slot-scope="scope">\
                                    <el-popover placement="top-start" width="200" trigger="hover" :disabled="true" :open-delay="800" v-on:show="getUserInfo(scope.row.UserAccount)">\
                                        <el-row v-loading="loading">\
                                            <el-col class="user-info-title" style="font-weight: 700; font-size: 16px">{{userInfo.Name}}</el-col>\
                                            <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantDept") }}{{userInfo.Department}}</el-col>\
                                            <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantTel") }}{{userInfo.Telephone}}</el-col>\
                                            <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantMobile") }}{{userInfo.Mobile}}</el-col>\
                                            <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantEMail") }}{{userInfo.Email}}</el-col>\
                                        </el-row>\
                                        <div slot="reference">{{scope.row.UserDisplayName}}</div>\
                                    </el-popover>\
                                </template>\
                            </el-table-column>\
                            <el-table-column prop="ActivityName" :label="$t(\'KStarForm.CirculatingNode\')" :minWidth="150"></el-table-column>\
                            <!--<el-table-column prop="ToUsers" :label="$t(\'KStarForm.Sendee\')" :minWidth="150"></el-table-column> -->\
                            <el-table-column prop="Comment" :label="$t(\'KStarForm.Opinion\')" :minWidth="250"></el-table-column>\
                            <el-table-column prop="StartDate" :label="$t(\'KStarForm.CirculatingTime\')"  width="150px">\
                                <template slot-scope="scope">\
                                    {{ scope.row.StartDate | dateformat(\'YYYY-MM-DD HH:mm\') }}\
                                </template>\
                            </el-table-column>\
                        </el-table>\
                    </div>\
                </el-collapse-transition>\
            </el-tab-pane>\
            <el-tab-pane :label="$t(\'KStarForm.SubscribeRecord\')" name="third">\
                <span slot="label" class="pd-24">{{ $t(\'KStarForm.SubscribeRecord\') }}</span>\
                <el-collapse-transition>\
                    <div class="sub-body">\
                        <el-row :class="curActive == \'list\' ? \'displayBlockNotXS\' : \'displayHiddenk\'" class="formsubscriberecord-list">\
                            <el-row class="examination-list" v-for= "(item,index) in formsubscriberecord" :key="index">\
                                <el-row class="visible-xs-only">\
                                    <el-col class="actionName" :span="10">{{ getProRecordTypeName(item.ActionName) }}</el-col>\
                                    <el-col class="time" :span="14">{{ item.StartDate | dateformat(\'YYYY-MM-DD HH:mm\') }}</el-col>\
                                </el-row>\
                                <el-row class="visible-xs-only">\
                                    <el-col :span="12">{{ $t(\'KStarForm.OperationPeople\', {operation: $t(\'KStarForm.\' + [item.ActionType])}) }}</el-col>\
                                    <el-col :span="12">{{item.UserDisplayName}}</el-col>\
                                </el-row>\
                                <el-col class="hidden-xs-only">\
                                    <i class="radius">{{index + 1}}</i>\
                                    <el-row class="activeName">{{ getProRecordTypeName(item.ActionName) }}</el-row>\
                                    <el-row class="m-content">\
                                        <el-row>\
                                            <el-col>\
                                                <el-row>\
                                                    <el-col :xs="18" :sm="10" :md="10" :lg="10" class="name">\
                                                        <el-popover placement="top-start" width="200" trigger="hover" :disabled="disabled" :open-delay="800" v-on:show="getUserInfo(item.UserAccount)">\
                                                            <el-row v-loading="loading">\
                                                                <el-col class="user-info-title" style="font-weight: 700; font-size: 16px">{{userInfo.Name}}</el-col>\
                                                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantDept") }}{{userInfo.Department}}</el-col>\
                                                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantTel") }}{{userInfo.Telephone}}</el-col>\
                                                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantMobile") }}{{userInfo.Mobile}}</el-col>\
                                                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantEMail") }}{{userInfo.Email}}</el-col>\
                                                            </el-row>\
                                                            <div slot="reference">{{ item.UserDisplayName }}</div>\
                                                        </el-popover>\
                                                    </el-col>\
                                                    <el-col :xs="6" :sm="12" :md="12" :lg="12" class="time-pc">\
                                                        <span>{{ $t(\'KStarForm.SubscribeTime\') }}：{{ item.StartDate | dateformat(\'YYYY-MM-DD HH:mm\') }}</span>\
                                                    </el-col>\
                                                </el-row>\
                                                <el-row class="tip" v-if="item.Comment">{{ item.Comment}}</el-row>\
                                            </el-col>\
                                        </el-row>\
                                    </el-row>\
                                </el-col>\
                            </el-row>\
                            <el-row v-if="formsubscriberecord && formsubscriberecord.length == 0" class="no-result">{{$t(\'KStarForm.ProcessRecordListNoData\')}}</el-row>\
                        </el-row>\
                        <el-table :data="formsubscriberecord" border class="m-form-table hidden-xs-only" size="mini" v-if="curActive == \'table\'">\
                            <el-table-column prop="ActionName" :label="$t(\'KStarForm.Type\')">\
                                <template slot-scope="scope">{{ getProRecordTypeName(scope.row.ActionName) }}</template>\
                            </el-table-column>\
                            <el-table-column prop="UserDisplayName" :label="$t(\'KStarForm.SubscribeUser\')">\
                                <template slot-scope="scope">\
                                    <el-popover placement="top-start" width="200" trigger="hover" :disabled="true" :open-delay="800" v-on:show="getUserInfo(scope.row.UserAccount)">\
                                        <el-row v-loading="loading">\
                                            <el-col class="user-info-title" style="font-weight: 700; font-size: 16px">{{userInfo.Name}}</el-col>\
                                            <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantDept") }}{{userInfo.Department}}</el-col>\
                                            <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantTel") }}{{userInfo.Telephone}}</el-col>\
                                            <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantMobile") }}{{userInfo.Mobile}}</el-col>\
                                            <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantEMail") }}{{userInfo.Email}}</el-col>\
                                        </el-row>\
                                        <div slot="reference">{{scope.row.UserDisplayName}}</div>\
                                    </el-popover>\
                                </template>\
                            </el-table-column>\
                            <el-table-column prop="StartDate" :label="$t(\'KStarForm.Time\')">\
                                <template slot-scope="scope">\
                                    {{ scope.row.StartDate | dateformat(\'YYYY-MM-DD HH:mm\') }}\
                                </template>\
                            </el-table-column>\
                        </el-table>\
                    </div>\
                </el-collapse-transition>\
            </el-tab-pane>\
        </el-tabs>\
    <!--</div>-->\
        <div class="btn hidden-xs-only">\
            <el-button type="text" :class="curActive == \'table\' ? \'active\' : \'\'" icon="el-icon-s-grid" v-on:click="curActive = \'table\' " size="mini"> {{ $t(\'KStarForm.TableMode\') }}</el-button>\
            <el-button type="text" :class="curActive == \'list\' ? \'active\' : \'\'" icon="el-icon-s-operation" v-on:click="curActive = \'list\' " size="mini"> {{ $t(\'KStarForm.ListMode\') }}</el-button>\
        </div>\
    </headersubtitle>\
  </div>\
';
var moduleApprovalRecords = Vue.extend({
    template: templateContent,
    props: ['formapprovalmodel', 'formsubscriberecord', 'formcirculaterecord', 'curactivename'],
    data: function () {
        return {
            formapproval: [],
            activeName: 'first',
            up: 'icon-turn turn-right',
            down: 'icon-turn',
            tableData: [],
            allCheck: false,
            initFormapproval: [],
            curActive: 'table',
            formapprovalTable: [],
            userInfo: {},
            adminVisible: false,
            loading: false,
            disabled: false,
            currApprovers: [],
            popoverList: ['popover1', 'popover2']
        };
    },
    mounted: function () {
        this.activeName = this.curactivename ? this.curactivename : 'first'
    },
    watch: {
        formapprovalmodel: {
            handler: function (curVal, oldVal) {
                this.initFormapproval = _.cloneDeep(curVal);
                if (curVal.length > 0) {
                    //深拷贝 _.cloneDeep
                    this.formapproval = _.cloneDeep(curVal);
                    this.formapproval = this.formapproval.filter(function (item) {
                        return item.ActivityName !== '管理员运维'
                    });
                    if (this.formapproval.length < this.initFormapproval.length) {
                        this.adminVisible = true;
                    }
                    var that = this;
                    var temp = {};
                    that.formapprovalTable = [];
                    that.formapproval.map(function (item) {
                        var l = item.actApprovalHistorys.length > 1 ? item.actApprovalHistorys.length : -1
                        item.actApprovalHistorys.map(function (m, n) {
                            temp = m
                            temp.ActivityName = item.ActivityName
                            if (n == 0) {
                                temp.ColSapn = l
                            } else {
                                temp.ColSapn = 0
                            }
                            that.formapprovalTable.push(temp)
                        })
                    })
                }
                // 获取当前处理人
                if (KStarForm.vmFormData.vmFormInstance.Id && KStarForm.vmFormData.vmFormInstance.Status == 2) {
                    this.getCurrApproversData()
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // tab切换事件 2019-12-13
        changeTabValue: function () {
            // this.curActive = 'table'
        },
        // 个人信息
        getUserInfo: function (userAccount) {
            this.loading = true
            // var url = window.location.origin + 
            var that = this
            axios.post('/Account/GetUsesDisplayInfo', { userAccount: userAccount }).then(function (res) {
                that.loading = false
                that.userInfo = res.data.data
            })
        },
        // 当前处理人2019-12-12
        getCurrApproversData: function () {
            if (this.currApprovers.length == 0) {
                var url = getControllerName() + "/GetCurrApproversData";
                var that = this;
                $post(url, { formId: KStarForm.vmFormData.vmFormInstance.Id }, function (response) {
                    if (response.status == 200) {
                        if (response.data.data && response.data.data.length > 0) {
                            that.currApprovers = response.data.data;
                            _.each(response.data.data, function (item) {
                                var len = item.Approvers.length > 1 ? item.Approvers.length : -1
                                item.Approvers.map(function (m, n) {

                                    that.formapproval.push({
                                        ActivityName: item.ActivityDisplayName,
                                        actApprovalHistorys: [
                                            {
                                                UserDisplayName: m.UserDisplayName,
                                                UserPositionName: m.UserPositionName,
                                                UserAccount: m.UserAccount,
                                                ActionName: m.ActionName,
                                                ActionType: m.ActionType
                                                // EndDate: item.DateTimeNow,
                                                // StartDate: item.StartTime
                                            }
                                        ]
                                    })
                                    that.formapprovalTable.push({
                                        ActivityName: item.ActivityDisplayName,
                                        ColSapn: n == 0 ? len : 0,
                                        UserDisplayName: m.UserDisplayName,
                                        UserPositionName: m.UserPositionName,
                                        ActionName: m.ActionName,
                                        ActionType: m.ActionType,
                                        UserAccount: m.UserAccount,
                                        // EndDate: item.DateTimeNow,
                                        // StartDate: item.StartTime
                                    })
                                })

                            });
                        }
                    }
                }, function (error) {
                    console.log(error);
                });
            }
            else {
                var currApprovers = this.formapprovalTable.filter(function (item) {
                    return item.ActionType == 'InProcessing'
                })
                if (currApprovers.length == 0) {
                    var that = this;
                    _.each(that.currApprovers, function (item) {
                        var len = item.Approvers.length > 1 ? item.Approvers.length : -1
                        item.Approvers.map(function (m, n) {
                            that.formapproval.push({
                                ActivityName: item.ActivityDisplayName,
                                actApprovalHistorys: [
                                    {
                                        UserDisplayName: m.UserDisplayName,
                                        UserPositionName: m.UserPositionName,
                                        UserAccount: m.UserAccount,
                                        ActionName: m.ActionName,
                                        ActionType: m.ActionType
                                        // EndDate: item.DateTimeNow,
                                        // StartDate: item.StartTime
                                    }
                                ]
                            })
                            that.formapprovalTable.push({
                                ActivityName: item.ActivityDisplayName,
                                ColSapn: n == 0 ? len : 0,
                                UserDisplayName: m.UserDisplayName,
                                UserPositionName: m.UserPositionName,
                                ActionName: m.ActionName,
                                ActionType: m.ActionType,
                                UserAccount: m.UserAccount,
                                // EndDate: item.DateTimeNow,
                                // StartDate: item.StartTime
                            })
                        })

                    });
                }

            }

        },
        // 2019-12-11
        objectSpanMethod: function (val) {
            if (val.columnIndex == 0) {
                if (val.row.ColSapn > 0) {
                    return {
                        rowspan: val.row.ColSapn,
                        colspan: 1
                    }
                } else {
                    if (val.row.ColSapn == 0) {
                        return {
                            rowspan: 0,
                            colspan: 0
                        }
                    } else {
                        return {
                            rowspan: 1,
                            colspan: 1
                        }
                    }

                }
            }

        },
        // 添加class --2019-11-05
        addClass: function (val) {
            if (val == 'Approve' || val == 'ActionType' || val == 'Communicate' || val == 'ReSubmit' || val == 'Submit' || val == 'CommunicateFeedback' || val == 'PlatformEnd' || val == 'Circulate' || val == 'Subscribe' || val == 'SaveDraft' || val == 'Redirect') {
                // 正向用主题色
                return 'font-theme';
            } else if (val == 'CancelCommunicate' || val == 'Reject' || val == 'Cancel' || val == 'Withdrawn' || val == 'CancelSubscribe' || val == 'Refused' || val == 'Returned' || val == 'InProcessing') {
                // 逆向用红色
                return 'font-red';
            } else {
                // 进行中的用黄色
                return 'font-yellow';
            }
        },
        FormatDate: function (data1, data2, format) {
            if (data1 && data2) {
                // var end = data1.replace()
                var end = moment(data1).format('YYYY/MM/DD HH:mm');
                var start = moment(data2).format('YYYY/MM/DD HH:mm');
                var date = new Date(end) - new Date(start);
                if (date) {
                    var hour = parseInt(date / 3600000);
                    var minute = parseInt((date - hour * 3600000) / 60000);
                    return hour + KStarForm.VM.$t("KStarForm.Hour") + minute + KStarForm.VM.$t("KStarForm.Minute");
                } else {
                    return '0' + KStarForm.VM.$t("KStarForm.Minute");
                }
            }
        },
        changeAllCheck: function () {
            if (this.allCheck) {
                this.formapproval = _.cloneDeep(this.initFormapproval);
                var that = this;
                var temp = {};
                that.formapprovalTable = [];
                that.formapproval.map(function (item) {
                    var l = item.actApprovalHistorys.length > 1 ? item.actApprovalHistorys.length : -1
                    item.actApprovalHistorys.map(function (m, n) {
                        temp = m
                        temp.ActivityName = item.ActivityName
                        if (n == 0) {
                            temp.ColSapn = l
                        } else {
                            temp.ColSapn = 0
                        }
                        that.formapprovalTable.push(temp)
                    })
                });
                // 获取当前处理人
                if (KStarForm.vmFormData.vmFormInstance.Id && KStarForm.vmFormData.vmFormInstance.Status == 2) {
                    this.getCurrApproversData()
                }
            } else {
                this.formapproval = this.initFormapproval.filter(function (item) {
                    return item.ActivityName !== '管理员运维'
                })
                var that = this;
                var temp = {};
                that.formapprovalTable = [];
                that.formapproval.map(function (item) {
                    var l = item.actApprovalHistorys.length > 1 ? item.actApprovalHistorys.length : -1
                    item.actApprovalHistorys.map(function (m, n) {
                        temp = m
                        temp.ActivityName = item.ActivityName
                        if (n == 0) {
                            temp.ColSapn = l
                        } else {
                            temp.ColSapn = 0
                        }
                        that.formapprovalTable.push(temp)
                    })
                });
                // 获取当前处理人
                if (KStarForm.vmFormData.vmFormInstance.Id && KStarForm.vmFormData.vmFormInstance.Status == 2) {
                    this.getCurrApproversData()
                }
            }
        },
        getProRecordTypeName: function (typeName) {
            if (typeName) {
                switch (typeName) {
                    case '订阅':
                        return this.$t('KStarForm.Subscribe');
                        break;
                    case '取消订阅':
                        return this.$t('KStarForm.CancelSubscribe');
                        break;

                    case '传阅':
                        return this.$t('KStarForm.Circulate');
                        break;
                    default:
                        return typeName;
                }
            }
        }
    }
});
// 注册
Vue.component('moduleapprovalrecords', moduleApprovalRecords);



