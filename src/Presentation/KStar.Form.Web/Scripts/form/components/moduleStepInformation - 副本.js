/*
 * @Description:步骤信息
 * @Author:ytwang
 * @Date:2019-05-23 10:19:08
 * @LastEditors:ytwang
 * @LastEditTime:2019-05-26 04:42:20
 */
var templateContent = '\
    <div v-if="formtype===\'Application\'||formtype===\'Draft\'||formtype===\'ReApproval\'" class="module-step-information">\
    <mobileuserpick :pop-visible="parmdialog.mobiledialogvisible" :multiple="parmdialog.multiplelimit" :title="parmdialog.title" :params="parmdialog"  v-on:closedialog = "closedialog" v-on:change="userpickCallback" v-if="parmdialog.mobiledialogvisible" :type="parmdialog.clicktype"></mobileuserpick>\
        <userpick :parmdialog = "parmdialog" v-on:closedialog = "closedialog" v-on:requseturl = "userpickCallBack" v-if="parmdialog.dialogvisible"></userpick>\
        <headersubtitle :header-title="headerTitle" class="temporarily-hide">\
        <div class="custom-reset-styles">\
        <el-table size="mini" class="step-information m-form-table" :data="manualuseractivitymodel" border>\
            <el-table-column prop="ActivityDisplayName" :label="$t(\'KStarForm.StepName\')"></el-table-column>\
            <el-table-column prop="name" :label="$t(\'KStarForm.Approver\')">\
                <template slot-scope="scope">\
                    <!--<el-select multiple filterable remote :placeholder="$t(\'KStarForm.PhStepInfo\')"  v-model="scope.row.ApproversUser"  v-on:change="SelectChange(scope.row,scope.$index)" v-on:focus="FocusSelect(scope.$index)"  :close-on-click-modal="false" :remote-method="BindApplicantSelect" :loading="scope.row.loading">\
                            <el-option v-for="item in scope.row.Approvers" :key="item.key" :label="item.label" :value="item">\
                                  <span style="float: left">{{ item.label }}</span>\
                                  <span style="color: #8492a6; font-size: 13px">（{{ item.value }}）</span>\
                            </el-option>\
                            <div v-on:click="LoadMore" style="text-align:center;cursor:pointer;" class="loadmore" v-if="scope.row.lastData">加载更多</div>\
                    </el-select>-->\
                    <el-input v-model="scope.row.ApproverName" size="mini" ><el-button slot="append" v-on:click="selectApprove(scope.row)" icon="ic-search"></el-button></el-input>\
                  </template>\
              </el-table-column>\
            </el-table>\
            </div>\
          </headersubtitle>\
    </div>\
    <div v-else class="module-step-information custom-reset-styles">\
        <headersubtitle :header-title="headerTitle" class="temporarily-hide">\
            <el-table size="mini" class="step-information m-form-table" :data="manualuseractivitymodel" border>\
                <el-table-column prop="ActivityDisplayName" :label="$t(\'KStarForm.StepName\')"></el-table-column>\
                <el-table-column prop="ApproverName" :label="$t(\'KStarForm.Approver\')"></el-table-column>\
            </el-table>\
        </headersubtitle>\
    </div>\
';
var moduleStepInformation = Vue.extend({
    template: templateContent,
    props: ['formtype', 'procpredictionmodel', 'manualuseractivitymodel', 'headerTitle'],
    data: function () {
        return {
            rowData: [],
            //选人控件参数
            parmdialog: {
                dialogvisible: false,
                clicktype: '',
                type: '',
                ctype: '',
                title: "选人控件",
                multiplelimit: false,
                activityID: "",
                applicantOrgId: "",
                mobiledialogvisible:false
            },
        }
    },
    mounted: function () {

    },
    methods: {
        //远程搜索
        ApplicantSelect: function (loadmore) {
            var that = this;
            if (!loadmore) that.rowData.Approvers = [];
            that.rowData.loading = true;
            var data = {
                sourceType: that.rowData.ProcessingSource,
                activityID: that.rowData.ActivityID,
                applicantOrgId: KStarForm.vmFormData.vmFormInstance.ApplicantOrgId,
                pageIndex: that.rowData.parm.pageIndex,
                pageSize: that.rowData.parm.pageSize,
                key: that.rowData.tempQuery,
            };
            axios.post("/Leave/ProcPredictionApprover", data).then(function (res) {
                if (res.data.item.length >= 0) {
                    if (that.rowData.parm.pageIndex * that.rowData.parm.pageSize >= res.data.count) {
                        that.rowData.lastData = false;
                    }
                    _.each(res.data.item, function (item, idx) {
                        if (_.findIndex(that.rowData.Approvers, function (o) { return o.key == item.UserAccount; }) < 0) {
                            that.rowData.Approvers.push({
                                activityName: that.rowData.ActivityName,
                                value: item.UserAccount,
                                key: item.UserAccount,
                                label: item.UserDisplayName
                            });
                        }

                    });
                }
            }).catch(function (err) {
                throw new Error(err);
            });
            that.rowData.loading = false;
        },
        //加载更多
        LoadMore: function () {
            this.rowData.parm.pageIndex += 1;
            this.ApplicantSelect(true);
        },
        //远程搜索
        BindApplicantSelect: function (query) {
            this.rowData.tempQuery = query;
            if (query && query !== '') {
                this.ApplicantSelect();
            }
        },
        //选中值发生改变的时候
        SelectChange: function (row, index) {
            var manualUsers = KStarForm.vmFormData.vmOperation.ManualUsers;
            var containUser = _.filter(manualUsers, function (data) {
                return data.ActivityName != row.ActivityName;
            });
            _.each(row.ApproversUser, function (item) {
                containUser.push({
                    ActivityName: row.ActivityName,
                    Approver: item.value,
                    ApproverName: item.label,
                    ApproverType: "User"
                });
            });
            KStarForm.vmFormData.vmOperation.ManualUsers = containUser;
            this.procpredictionmodel.splice(index, 1, row);
        },
        FocusSelect: function (idx) { //老选人控件使用的
            this.rowData = this.manualuseractivitymodel[idx];
        },
        selectApprove: function (row) {
            this.rowData = row;
            var type = "User";
            if (row.ProcessingSource == 2) {
                type = "GroupPerson";
            }
            var activityId = row.ActivityID;
            var orgId = KStarForm.vmFormData.vmFormInstance.ApplicantOrgId;
            this.showdialog('ApproveUser', true, type, activityId, orgId);
        },
        //打开弹窗
        showdialog: function (val, multiple, type, activityId, orgId) {
            this.parmdialog.clicktype = val;
            switch (val) {
                case 'ApproveUser'://审核人
                    this.parmdialog.type = type;
                    this.parmdialog.ctype = "UserPick";
                    this.parmdialog.title = "请选择审核人";
                    this.parmdialog.activityID = activityId;
                    this.parmdialog.applicantOrgId = orgId;
                    break;
            }
            // this.parmdialog.dialogvisible = true;
            if (document.body.clientWidth > 767) {
                this.parmdialog.dialogvisible = true;
            } else {
                this.parmdialog.mobiledialogvisible = true;
            }
            this.parmdialog.multiplelimit = multiple;
            return false;

        },
        //关闭弹窗
        closedialog: function (val) {
            this.parmdialog.dialogvisible = false;
            this.parmdialog.mobiledialogvisible = false
        },
        userpickCallBack: function (val, type) {
            //debugger;
            var that = this;
            if (val.length > 0) {
                switch (type.clicktype) {
                    case 'ApproveUser':
                        //var containUser = [];
                        var manualUsers = KStarForm.vmFormData.vmOperation.ManualUsers;
                        var containUser = _.filter(manualUsers, function (data) {
                            return data.ActivityName != that.rowData.ActivityName;
                        });
                        _.each(val, function (item) {
                            containUser.push({
                                ActivityName: that.rowData.ActivityName,
                                Approver: item.Value,
                                ApproverName: item.Name,
                                ApproverType: "User"
                            });
                        });
                        KStarForm.vmFormData.vmOperation.ManualUsers = containUser;

                        var userName = val.map(function (item) {
                            return item.Name;
                        }).join();

                        _.each(this.manualuseractivitymodel, function (item) {
                            if (item.ActivityID == type.activityID) {
                                item.ApproverName = userName;
                            }
                        });

                        //this.procpredictionmodel.splice(index, 1, row);
                        break;
                }
            }
            this.parmdialog.mobiledialogvisible = false
        },
    }
});
// 注册
Vue.component('modulestepinformation', moduleStepInformation);


