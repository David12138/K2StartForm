/*
 * @Description:当前处理人
 * @Author:ytwang
 * @Date:2019-05-22 20:00:38
 * @LastEditors:ytwang
 * @LastEditTime:2019-05-23 10:23:04
 */
var templateContent = '\
    <div class="module-processing-people custom-reset-styles">\
        <headersubtitle :header-title="headerTitle">\
        <el-table :data="CurrentUserList" border empty-text="加载中" class="m-form-table">\
            <el-table-column prop="ActivityDisplayName" label="当前节点"></el-table-column>\
            <el-table-column prop="ApproverName" label="当前处理人"></el-table-column>\
            <el-table-column prop="StartTime" label="到达时间" >\
                <template scope="scope">\
                    {{ scope.row.StartTime | dateformat(\'YYYY-MM-DD HH:mm\')}}\
                </template>\
            </el-table-column>\
            <el-table-column prop="ElapsedTime" label="持续时间"></el-table-column>\
        </el-table>\
      </headersubtitle>\
    </div>\
';
var moduleProcessingPeople = Vue.extend({
    template: templateContent,
    props: ['headerTitle'],
    data: function () {
        return {
            CurrentUserList: []
        };
    },
    beforeCreate: function () {
        //当前处理人
        var url = getControllerName() + "/GetCurrApproversData";
        var _this = this;
        $post(url, { formId: KStarForm.vmFormData.vmFormInstance.Id }, function (response) {
            if (response.status == 200) {
                _.each(response.data.data, function (item) {
                    var millisecond = moment(item.DateTimeNow) - moment(item.StartTime);
                    var hours = parseInt(millisecond / 1000 / 60 / 60);
                    var minute = parseInt((millisecond - hours * 1000 * 60 * 60) / 1000 / 60);
                    item.ElapsedTime = hours + "小时" + minute + "分钟";
                });
                _this.CurrentUserList = response.data.data;
            }
        }, function (error) {
            console.log(error);
        });
    },
    methods: {

    }
});
// 注册
Vue.component('moduleprocessingpeople', moduleProcessingPeople);


