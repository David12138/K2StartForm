/*
 * @Description:头部按钮组退回弹窗
 * @Author:ham
 * @Date:2019-05-23 10:19:10
 * @LastEditors:ytwang
 * @LastEditTime:2019-06-10 03:40:42
 */
var templateContent = '\
<el-dialog :title="$t(\'KStarForm.Reject\')"  :visible.sync = "paramretrundialog.dialogvisible" width="800px" :before-close="handleClose" class="my-dialog-style">\
    <div class="icon-return" v-on:click="handleClose"><i class="el-icon-arrow-left"></i>{{$t(\'KStarForm.Return\') }}</div>\
    <el-form size="mini" label-width="80px" :model="formoperation" label-position="right" :rules="returnRules" ref="refReturnDialog"  inline-message>\
        <el-row>\
            <el-col :xs="24" :sm="24" :md="24" :lg="24">\
            <el-form-item :label="$t(\'KStarForm.ReturnTo\')" prop="ActivityId">\
                <el-select  v-model="formoperation.BackActivity.ActivityId"  filterable>\
                    <el-option  v-for="item in formbackactivity" :key="item.ActivityId" :label="item.ActivityName" :value="item.ActivityId">\
                    </el-option>\
                  </el-select>\
                </el-form-item>\
            </el-col>\
        </el-row>\
        <el-row>\
            <el-col :xs="24" :sm="24" :md="24" :lg="24">\
            <el-form-item :label="$t(\'KStarForm.ReturnToMode\')" label-width="160px;" class="mt-10">\
                <el-radio-group v-model="paramretrundialog.isRejectGoBack">\
                  <el-radio label=1>{{$t(\'KStarForm.RerouteAllNode\')}}</el-radio>\
                  <el-radio label=0 v-if="formoperation.IsRejectNotGoBack">{{$t(\'KStarForm.DirectGoCurrentNode\')}}</el-radio>\
                </el-radio-group>\
            </el-form-item>\
            </el-col>\
        </el-row>\
        <el-row>\
            <el-form-item prop="Comment" :label="$t(\'KStarForm.RejectOpinionComments\')">\
                <el-input type="textarea" :rows="2" :placeholder="$t(\'KStarForm.PhPleaseEnterOpinion\')" v-model="formoperation.Comment"></el-input>\
            </el-form-item>\
            <div >\
                <el-row class="save-comment visible-xs-only">\
                    <el-dialog title="" append-to-body :visible.sync="OpinionVisible" class="my-dialog-style" v-on:close="OpinionVisible=false" v-if="OpinionVisible">\
                        <div class="my-popper">\
                            <div class="icon-return" v-on:click="OpinionVisible=false"><i class="el-icon-arrow-left"></i>{{$t(\'KStarForm.Return\') }}</div>\
                            <el-row class="OpinionList">\
                                <el-col class="thephraseli" v-for="(item, index) in OpinionList" :key="index">\
                                    <span v-on:click="gotoSelectOpinion(item.Opinion)">{{ item.Opinion }}</span>\
                                    <el-button type="text" icon="el-icon-delete" v-on:click="deleteOpinion(index)">{{ $t("KStarForm.Delete") }}</el-button>\
                                </el-col>\
                            </el-row>\
                            <el-row>\
                                <el-col><el-input v-model.trim="OpinionInput" v-on:keyup.enter.native="addOpinion" clearable/>\</el-col>\
                                <el-col class="addthephrase"><el-button v-on:click="addOpinion(1)">{{ $t(\'KStarForm.AddThePhrase\') }}</el-button></el-col>\
                            </el-row>\
                        </div>\
                        <span slot="footer" class="dialog-footer">\
                            <el-button v-on:click="OpinionVisible=false" plain class="m-submit" size="mini" >{{ $t(\'KStarForm.DialogConfirm\') }}</el-button>\
                        </span>\
                    </el-dialog>\
                    <span class="left" v-on:click="OpinionVisible=true;getOpinionList()">{{ $t(\'KStarForm.ThePhrase\') }}</span>\
                </el-row>\
                <el-row class="save-comment hidden-xs-only" style="margin-left: 80px">\
                    <el-popover v-model="OpinionPopVisible" v-on:show="getOpinionList" placement="top" width="250" trigger="click" popper-class="my-popper">\
                        <el-row class="OpinionList">\
                            <el-col class="thephraseli" v-for="(item, index) in OpinionList" :key="index">\
                                <span v-on:click="gotoSelectOpinion(item.Opinion)"> {{ item.Opinion }}</span >\
                                <el-button type="text" icon="el-icon-delete" v-on:click="deleteOpinion(index)">{{ $t("KStarForm.Delete") }}</el-button>\
                            </el-col>\
                        </el-row>\
                        <el-row>\
                            <el-col><el-input v-model.trim="OpinionInput" v-on:keyup.enter.native="addOpinion(1)" clearable/></el-col>\
                            <el-col class="addthephrase"><el-button v-on:click="addOpinion(1)">{{ $t(\'KStarForm.AddThePhrase\') }}</el-button></el-col>\
                        </el-row>\
                        <span class="left" slot="reference">{{$t(\'KStarForm.ThePhrase\')}}<i class="el-icon-s-operation"></i></span>\
                    </el-popover>\
                    <span class="right"><el-switch v-model="switchValue" v-on:change="addOpinion(2)" active-color="#00abd5" inactive-color="#EEEEEE ">\
                    </el-switch>{{$t(\'KStarForm.SaveAsCommonComments\')}}</span>\
                </el-row>\
            </div>\
        </el-row>\
    </el-form>\
    <span slot="footer" class="dialog-footer">\
        <el-button v-on:click="handleClose" plain class="m-cancle"  size="mini">{{ $t(\'KStarForm.DialogCancel\') }}</el-button>\
        <el-button v-on:click="submit()" plain class="m-submit" size="mini">{{ $t(\'KStarForm.DialogConfirm\') }}</el-button>\
  </span>\
</el-dialog>\
';
var returnDialog = Vue.extend({
    template: templateContent,
    props: ['paramretrundialog', 'formbackactivity','formoperationmodel', 'formesetting'],
    data: function () {
        return {
            formoperation: {},
            //校验规则 
            //KStarForm.VM.$t("KStarForm.SelectTeturnActivity") 
            //KStarForm.VM.$t("KStarForm.EnterReturnOpinion")
            returnRules: {
                ActivityId: [
                //请选择退回环节
                    { required: true, message: "请选择退回环节", trigger: 'change' },
                ],
                Comment: []
            },
            OpinionInput: '', // 2019-10-30 常用意见输入框
            OpinionList: [],  // 2019-10-30 常用意见列表
            OpinionVisible: false,  // 2019-10-30 常用意见
            OpinionPopVisible: false, // 2019-10-30 常用意见
            switchValue: false,
        };
    },
    watch: {
        formoperationmodel: {
            handler: function (curVal, oldVal) {
                this.formoperation = JSON.parse(JSON.stringify(curVal));
            },
            deep: true,
            immediate: true
        },
        formesetting: {
            handler: function (curVal, oldVal) {
                if (curVal.ActivityFormSettings.OpinionNumber > 0) {
                    this.returnRules.Comment = [{ required: true, trigger: 'blur', min: curVal.ActivityFormSettings.OpinionNumber, validator: this.validators}]
                } else {
                    if (typeof KStarForm.VM.$t !== 'undefined') {
                        this.returnRules.Comment = [{ required: true, trigger: 'blur', message: KStarForm.VM.$t("KStarForm.EnterReturnOpinion")}]
                    }
                }
            },
            deep: true,
            immediate: true
        },
        formbackactivity: function(val) {
            if (val && val.length > 0) {
                KStarForm.vmFormData.vmOperation.BackActivity.ActivityId = val[0].ActivityId
                this.formoperation.BackActivity.ActivityId = val[0].ActivityId
            }
        }
    },
    methods: {
        // 2019-10-30 增加常用语 addThephrase
        addOpinion: function (type) {
            var isExistOpinion = false;
            var addUserOpinion;
            var deleteUserOpinion;
            var newOpinion = "";

            if (type == 1) {
                newOpinion = this.OpinionInput;
            } else {
                newOpinion = this.formoperation.Comment ? this.formoperation.Comment : '';
            }

            if (newOpinion.length == 0) {
                this.switchValue = false;
                return false;
            } else {
                for (i = 0; i < this.OpinionList.length; i++) {
                    if (this.OpinionList[i].Opinion == newOpinion) {
                        isExistOpinion = true;
                    }
                }
            }

            if (isExistOpinion) {
                return false;
            } else {
                if (this.OpinionList.length >= 10) {
                    deleteUserOpinion = this.OpinionList[0];
                    this.OpinionList.shift();
                }
                addUserOpinion = { Opinion: newOpinion };
                this.saveUserOpinion(addUserOpinion, deleteUserOpinion);

                if (type == 2) {
                    this.switchValue = true;
                }
                this.OpinionList.push(addUserOpinion);
                this.OpinionInput = '';
            }
        },
        //获取用户常用语
        getOpinionList: function () {
            var _this = this;
            var getUserCommonOpinionsUrl = getControllerName() + "/GetUserCommonOpinions";
            //获取常用语列表
            axios({
                url: getUserCommonOpinionsUrl,
                method: 'post',
                responseType: 'json',
            }).then(function (response) {
                if (response.status == 200 && response.data) {
                    var userOpinionData = response.data.data;
                    if (userOpinionData.length > 0) {
                        _this.OpinionList = [];
                        for (i = 0; i < userOpinionData.length; i++) {
                            _this.OpinionList.push(userOpinionData[i]);
                        }
                    }
                }               
            }).catch(function (error) {
                throw error;
            });            
        },
        // 2019-10-30 删除常用语deleteOpinion
        deleteOpinion: function (index) {
            var _this = this;

            var deleteUserCommonOpinionsUrl = getControllerName() + "/DeleteUserCommonOpinion";
            //获取常用语列表
            axios({
                url: deleteUserCommonOpinionsUrl,
                method: 'post',
                data: { delUserOpinion: this.OpinionList[index] },
                responseType: 'json',
            }).then(function (response) {
                if (response.status == 200 && response.data) {
                    _this.OpinionList.splice(index, 1);
                }
            }).catch(function (error) {
                throw error;
            }); 
        },
        // 2019-10-30 保存常用语
        changeOpinion: function () {
            //if (val == false) return false;
            var comment = this.formoperation.Comment ? this.formoperation.Comment : '';
            var that = this;
            if (comment) {
                
            } else {
                this.switchValue = false;
            }
        },
        //保存用户意见
        saveUserOpinion: function (addOpinionItem, deleteOpinionItem) {
            var _this = this;
            if (addOpinionItem) {
                var saveUserCommonOpinionsUrl = getControllerName() + "/SaveUserCommonOpinions";
                //获取常用语列表
                axios({
                    url: saveUserCommonOpinionsUrl,
                    method: 'post',
                    data: { addUserOpinion: addOpinionItem, deleteUserOpinion: deleteOpinionItem },
                    responseType: 'json',
                }).then(function (response) {
                    if (response.status == 200 && response.data) {
                        _this.OpinionList[_this.OpinionList.length - 1] = response.data.data;
                    }
                }).catch(function (error) {
                    throw error;
                }); 
            }
        },
        // 2019-10-30 选中常用语 gotoSelectOpinion
        gotoSelectOpinion: function (val) {
            this.$set(this.formoperation, 'Comment', val);
            this.OpinionVisible = false;  // 2019-10-30 常用语
            this.OpinionPopVisible = false;
        },
        validators: function (rule, value, callback) {
            if (!value) {
                callback(new Error(KStarForm.VM.$t("KStarForm.EnterReturnOpinion")));
            } else if (value.toString().length < rule.min) {
                var msg = KStarForm.VM.$t("KStarForm.PhApprovalOpinionLeast") + this.formesetting.ActivityFormSettings.OpinionNumber + KStarForm.VM.$t("KStarForm.PhCharacters")
                callback(new Error(msg));
            } else {
                callback()
            }
        },
        //关闭弹窗
        handleClose: function () {
            this.paramretrundialog.dialogvisible = false;
            this.$refs["refReturnDialog"].resetFields();
            if (KStarForm.vmFormData.vmOperation.Comment) {
                this.formoperation.Comment = KStarForm.vmFormData.vmOperation.Comment
                // this.$set(this.formoperation, 'Comment', KStarForm.vmFormData.vmOperation.Comment)
            } else {
                this.formoperation.Comment = ''
                // this.$set(this.formoperation, 'Comment', '')
            }
        },

        //确定按钮
        submit: function () {
            
            var _this = this;
            this.formoperation.IsRejectGoBack = this.paramretrundialog.isRejectGoBack == "1" ? true : false;
            KStarForm.vmFormData.vmOperation.IsRejectGoBack = this.paramretrundialog.isRejectGoBack == "1" ? true : false;
            var resultArr = this.formbackactivity.filter(function (item) {
                return item.ActivityId === _this.formoperation.BackActivity.ActivityId;
            })[0];
            if (resultArr) {
                this.formoperation.BackActivity.ActivityName = resultArr.ActivityName;
                this.formoperation.BackActivity.ActivityDisplayName = resultArr.ActivityName;
                KStarForm.vmFormData.vmOperation.BackActivity.ActivityName = resultArr.ActivityName;
                KStarForm.vmFormData.vmOperation.BackActivity.ActivityDisplayName = resultArr.ActivityName;
            }
            
            this.$refs["refReturnDialog"].validate(function (valid) {
                if (!valid) {
                    return false;
                }
                else {
                    KStarForm.vmFormData.vmOperation.Comment = _this.formoperation.Comment
                    _this.$emit('returnconfim');
                    // _this.handleClose();
                    _this.paramretrundialog.dialogvisible = false;
                }
            });

        }
    }
});
// 注册
Vue.component('returndialog', returnDialog);


