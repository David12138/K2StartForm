/*
 * @Description:头部按钮组退回弹窗
 * @Author:ham
 * @Date:2019-05-23 10:19:10
 * @LastEditors:ytwang
 * @LastEditTime:2019-06-10 03:40:42
 */
var templateContent = '\
<el-dialog title = "退回"  :visible.sync = "paramretrundialog.dialogvisible" width = "30%" :before-close="handleClose">\
    <el-form size="mini" label-width="100px" :model="formoperation" label-position="right" :rules="returnRules" ref="refReturnDialog"  inline-message>\
        <el-row>\
            <el-col :xs="24" :sm="24" :md="24" :lg="24">\
            <el-form-item label="退回到：" prop="ActivityId">\
                <el-select  v-model="formoperation.BackActivity.ActivityId"  filterable>\
                    <el-option  v-for="item in formbackactivity"   :key="item.ActivityId"   :label="item.ActivityName" :value="item.ActivityId">\
                    </el-option>\
                  </el-select>\
                </el-form-item>\
            </el-col>\
        </el-row>\
        <el-row v-if="formoperation.IsRejectNotGoBack">\
            <el-col :xs="24" :sm="24" :md="24" :lg="24">\
            <el-form-item label="退回后再提交/审批时：" label-width="160px;">\
                <el-radio-group v-model="paramretrundialog.isRejectGoBack">\
                  <el-radio label=1>重走所有节点</el-radio>\
                  <el-radio label=0>直接回到当前节点</el-radio>\
                </el-radio-group>\
            </el-form-item>\
            </el-col>\
        </el-row>\
        <el-row>\
            <el-form-item :xs="24" :sm="24" :md="24" :lg="24" prop="Comment"  label-width="0">\
                <el-input type="textarea" :rows="2" placeholder="请输入退回意见...." v-model.trim="formoperation.Comment"></el-input>\
            </el-form-item>\
        </el-row>\
    </el-form>\
    <span slot="footer" class="dialog-footer">\
        <el-button type="primary" v-on:click="submit()" round>确 定</el-button>\
        <el-button v-on:click="handleClose" round>取 消</el-button>\
  </span>\
</el-dialog>\
';
var returnDialog = Vue.extend({
    template: templateContent,
    props: ['paramretrundialog', 'formbackactivity','formoperationmodel'],
    data: function () {
        return {
            formoperation: {},
            //校验规则
            returnRules: {
                ActivityId: [
                    { required: true, message: '请选择退回环节', trigger: 'blur' },
                ],
                Comment: [
                    { required: true, message: '请输入退回意见', trigger: 'blur' }
                ]
            }
        };
    },
    watch: {
        formoperationmodel: {
            handler: function (curVal, oldVal) {
                this.formoperation = curVal;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        //关闭弹窗
        handleClose: function () {
            this.paramretrundialog.dialogvisible = false;
            this.$refs["refReturnDialog"].resetFields();
        },

        //确定按钮
        submit: function () {
            var _this = this;
            this.formoperation.IsRejectGoBack = this.paramretrundialog.isRejectGoBack == "1" ? true : false;
            var resultArr = this.formbackactivity.find(function (item) {
                return item.ActivityId === _this.formoperation.BackActivity.ActivityId;
            });
            this.formoperation.BackActivity.ActivityName = resultArr.ActivityName;
            this.formoperation.BackActivity.ActivityDisplayName = resultArr.ActivityName;
            this.$refs["refReturnDialog"].validate(function (valid) {
                if (!valid) {
                    return false;
                }
                else {
                    _this.$emit('returnconfim');
                    _this.handleClose();
                }
            });

        }
    }
});
// 注册
Vue.component('returndialog', returnDialog);


