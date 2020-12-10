/*
 * @Description:步骤信息
 * @Author:ytwang
 * @Date:2019-05-23 10:19:08
 * @LastEditors:ytwang
 * @LastEditTime:2019-05-26 04:42:20
 * @Description:过期的组件，不再支持
 * @LastEditors:fenglin
 * @LastEditorsDate:2020-04-16 10:19:08
 */
var templateContent = '\
    <div v-if="formtype===\'Application\'||formtype===\'Draft\'||formtype===\'ReApproval\'" class="module-step-information">\
        <headersubtitle header-title="审核人信息" class="temporarily-hide">\
        <el-table size="mini" class="step-information" :data="manualuseractivitymodel" style="width:100%">\
            <el-table-column prop="ActivityDisplayName" label="步骤名称"></el-table-column>\
            <el-table-column prop="name" label="审批人">\
                <template slot-scope="scope">\
                    <el-select multiple filterable remote placeholder="请输入姓名、姓名首字母、姓名全拼、账号进行搜索"  v-model="scope.row.ApproversUser"  v-on:change="SelectChange(scope.row,scope.$index)" v-on:focus="FocusSelect(scope.$index)"  :close-on-click-modal="false" :remote-method="BindApplicantSelect" :loading="scope.row.loading">\
                            <el-option v-for="item in scope.row.Approvers" :key="item.key" :label="item.label" :value="item">\
                                  <span style="float: left">{{ item.label }}</span>\
                                  <span style="color: #8492a6; font-size: 13px">（{{ item.value }}）</span>\
                            </el-option>\
                            <div v-on:click="LoadMore" style="text-align:center;cursor:pointer;" class="loadmore" v-if="scope.row.lastData">加载更多</div>\
                    </el-select>\
                  </template>\
              </el-table-column>\
            </el-table>\
          </headersubtitle>\
    </div>\
    <div v-else class="module-step-information">\
        <headersubtitle header-title="审核人信息" class="temporarily-hide">\
            <el-table size="mini" class="step-information" :data="manualuseractivitymodel" style="width:100%">\
                <el-table-column prop="ActivityDisplayName" label="步骤名称"></el-table-column>\
                <el-table-column prop="ApproverName" label="审批人"></el-table-column>\
            </el-table>\
        </headersubtitle>\
    </div>\
';
var moduleStepInformation = Vue.extend({
    template: templateContent,
    props: ['formtype', 'procpredictionmodel', 'manualuseractivitymodel'],
    data: function () {
        return {
            rowData: []
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
        FocusSelect: function (idx) {
            this.rowData = this.manualuseractivitymodel[idx];
        }
    }
});
// 注册
Vue.component('modulestepinformation', moduleStepInformation);


