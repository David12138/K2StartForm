/*
 * @Description:流程处理
 * @Author:ytwang
 * @Date:2019-05-23 11:34:43
 * @LastEditors:ytwang
 * @LastEditTime:2019-05-26 04:46:07
 */
var templateContent = '\
    <div class="module-process-to-deal-with">\
    <userpick :parmdialog="parmdialog" v-on:closedialog="closedialog" v-on:requseturl="requseturl"></userpick>\
        <headersubtitle header-title="流程处理" class="process-deal">\
            <i slot="subIcon" class="icon-sub icon iconfont iconliuchengchuli"></i>\
            <el-form size="mini" :model="formoperation"  ref="refFormProcessToDeal" label-width="100px">\
          <el-form-item label="审核要点：">\
                <div>{{ formprocesstodealwith.ActivityFormSettings.AuditPoints }}</div>\
            </el-form-item>\
            <el-form-item label="审核节点：">\
                <div>{{ formoperation.ActivityName }}</div>\
            </el-form-item>\
            <el-form-item label="审批意见：">\
            </el-form-item>\
            <el-form-item prop="Comment" label-width="20px">\
                <el-input type="textarea" v-model="formoperation.Comment" class="textarea is-emphasis"></el-input>\
                <p v-if="formprocesstodealwithmodel.ActivityFormSettings.OpinionNumber&&formprocesstodealwithmodel.ActivityFormSettings.OpinionNumber>0" style="color:red;font-size:12px;text-align:right;">审批意见至少要求输入{{ formprocesstodealwithmodel.ActivityFormSettings.OpinionNumber }}个字符</p>\
            </el-form-item>\
        </el-form>\
        <el-row type="flex" justify="end" class="hidden-xs-only">\
            <div class="button-tools">\
                <el-button v-if="ifBtn(\'Approve\')" @click="actApprove" type="text">同意</el-button>\
                <el-button v-if="ifBtn(\'ReSubmit\')" @click="actReSubmit" type="text">重新提交</el-button>\
                    <el-dropdown v-if="ifBtn(\'Returned\')" @command="handlerReturned" placement="bottom" trigger="click">\
                        <el-button type="text"> 退回</el-button>\
                        <el-dropdown-menu slot="dropdown">\
                            <el-dropdown-item v-for="(item,i) in formbackactivity" :key="i" :command="item.ActivityId +\'&\'+ item.ActivityName">{{ item.ActivityDisplayName }}</el-dropdown-item>\
                        </el-dropdown-menu>\
                     </el-dropdown>\
                 <el-button v-if="ifBtn(\'Redirect\')" @click="actRedirect" type="text"> 转办</el-button>\
                 <el-button v-if="ifBtn(\'Communication\')" @click="actCommunication" type="text"> 沟通</el-button>\
                 <el-button v-if="ifBtn(\'CancelCommunicate\')" @click="actCancelCommunicate" type="text"> 取消沟通</el-button>\
                 <el-button v-if="ifBtn(\'CommunicateFeedback\')" @click="actCommunicateFeedback" type="text"> 沟通反馈</el-button>\
                 <el-button v-if="ifBtn(\'Refused\')" @click="actRefused" type="text"> 拒绝</el-button>\
                 <el-button v-if="ifBtn(\'Withdrawn\')" @click="actWithdrawn" type="text"> 撤回</el-button>\
                 <el-button v-if="ifBtn(\'Cancel\')" @click="actCancel" type="text"> 作废</el-button>\
                 <el-button v-if="ifBtn(\'Circulate\')" @click="actCirculate" type="text"> 传阅</el-button>\
                 <el-button v-if="ifBtn(\'Subscribe\')" @click="actSubscribe" type="text"> 订阅</el-button>\
                 <el-button v-if="ifBtn(\'CancelSubscribe\')" @click="actCancelSubscribe" type="text"> 取消订阅</el-button>\
                 <el-button icon="iconfont iconcaozuo" circle></el-button>\
          </div>\
        </el-row>\
      </headersubtitle>\
    </div>\
';
var moduleProcessToDealWith = Vue.extend({
    template: templateContent,
    props: ['formprocesstodealwithmodel', 'formoperationmodel', 'formbtnmodel', 'formbackactivitymodel'],
    data: function () {
        return {
            formprocesstodealwith: {},
            formoperation: {},
            formbtn: {},
            formbackactivity: {},
            parmdialog: {
                dialogvisible: false,
                clicktype: '',
                multiple: true
            }
        };
    },
    watch: {
        formprocesstodealwithmodel: {
            handler: function (curVal, oldVal) {
                this.formprocesstodealwith = curVal;
            },
            deep: true,
            immediate: true
        },
        formoperationmodel: {
            handler: function (curVal, oldVal) {
                this.formoperation = curVal;
            },
            deep: true,
            immediate: true
        },
        formbtnmodel: {
            handler: function (curVal, oldVal) {
                this.formbtn = curVal;
            },
            deep: true,
            immediate: true
        },
        formbackactivitymodel: {
            handler: function (curVal, oldVal) {
                this.formbackactivity = curVal;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        actApprove: function () {
            KStarForm.formApprove(this);
        },
        actReSubmit: function () {
            KStarForm.formReSubmit(this);
        },
        handlerReturned: function (activityId) {
            //驳回事件
            var actId = activityId.split('&')[0];
            var actName = activityId.split('&')[1];
            KStarForm.formReject(this, actId, actName);
            //this.$message('click on item ' + activityId);
        },
        actRedirect: function () {
            this.showdialog('Redirect', false);
        },
        actCommunication: function () {
            this.showdialog('Communication', false);
        },
        actCancelCommunicate: function () {
            KStarForm.formCancelCommunicate(this);
        },
        actCommunicateFeedback: function () {
            KStarForm.formCommunicateFeedback(this);
        },
        actRefused: function () {
            KStarForm.formRefused(this);
        },
        actWithdrawn: function () {
            KStarForm.formWithdrawn(this);
        },
        actCancel: function () {
            KStarForm.formCancel(this);
        },
        actCirculate: function () {
            this.showdialog('Circulate', true);
        },
        actSubscribe: function () {
            KStarForm.formSubscribe(this);
        },
        actCancelSubscribe: function () {
            KStarForm.formCancelSubscribe(this);
        },
        //打开弹窗
        showdialog: function (val, multiple) {
            this.parmdialog.clicktype = val;
            this.parmdialog.dialogvisible = true;
            this.parmdialog.multiple = multiple;
        },
        //关闭弹窗
        closedialog: function (val) {
            this.parmdialog.dialogvisible = false;
        },
        //请求url
        requseturl: function (val, type) {
            if (val.length == 0) {
                alertInfo.call(this, "请选择人员", "提示框");
                return false;
            }
            if (type.clicktype == "Redirect") {
                var obj = {
                    UserAccount: val[0].Value,
                    UserDisplayName: val[0].Name
                }
                KStarForm.formRedirect(this, obj);
            } else if (type.clicktype == "Communication") {
                var arry = [];
                _.forEach(val, function (el, index) {
                    arry.push({
                        UserAccount: el.Value,
                        UserDisplayName: el.Name
                    });
                });
                KStarForm.formCommunication(this, arry);
            } else if (type.clicktype == "Circulate") {
                var arry = [];
                _.forEach(val, function (el, index) {
                    arry.push({
                        UserAccount: el.Value,
                        UserDisplayName: el.Name
                    });
                });
                KStarForm.formCirculate(this, arry);
            }
            type.dialogvisible = false;
        },
        ifBtn: function (code) {//提交按钮可见性

            var btnCodeArray = _.map(this.formbtn, function (n) {
                return n.Code;
            });
            if (_.indexOf(btnCodeArray, code) > -1) {
                return true;
            }
            return false;
        }
    }
});
// 注册
Vue.component('moduleprocesstodealwith', moduleProcessToDealWith);


