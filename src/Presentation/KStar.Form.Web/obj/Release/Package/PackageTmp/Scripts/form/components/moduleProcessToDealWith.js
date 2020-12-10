/*
 * @Description:流程处理
 * @Author:ytwang
 * @Date:2019-05-23 11:34:43
 * @LastEditors:ytwang
 * @LastEditTime:2019-05-26 04:46:07
 */
var templateContent = '\
    <div class="module-process-to-deal-with" v-if="processToDealWithVisible">\
        <mobileuserpick :pop-visible="parmdialog.mobiledialogvisible" v-on:closedialog="closedialog" :multiple="parmdialog.multiplelimit" :title="parmdialog.title" v-on:change="userpickCallback" v-if="parmdialog.mobiledialogvisible" :type="parmdialog.clicktype"></mobileuserpick>\
        <userpick :parmdialog="parmdialog" v-on:closedialog="closedialog" v-on:requseturl="requseturl"></userpick>\
        <!--<returndialog :paramretrundialog="paramRetrunDialog" :formoperationmodel="formoperationmodel"  :formbackactivity="formbackactivitymodel" v-on:returnconfim="returnConfim"></returndialog>-->\
        <headersubtitle :header-title="headerTitle" class="process-deal custom-reset-styles">\
            <i slot="subIcon" class="icon-sub icon iconfont iconliuchengchuli"></i>\
            <el-form size="mini" :model="formoperation"  ref="refFormProcessToDeal" :rules="returnRules" label-width="120px" label-position="right">\
                <!--<subtitle subtitle="处理"></subtitle>-->\
                <el-row :gutter="40">\
                    <el-col v-if="formprocesstodealwithmodel.ActivityFormSettings && formprocesstodealwithmodel.ActivityFormSettings.AuditPoints">\
                        <el-form-item :label="$t(\'KStarForm.AuditPoints\')">\
                           <div class="form-item-div">{{ formprocesstodealwithmodel.ActivityFormSettings.AuditPoints }}</div>\
                        </el-form-item>\
                    </el-col>\
                    <el-col>\
                        <el-form-item :label="$t(\'KStarForm.AuditNode\')">\
                            <div class="form-item-div">{{ formoperation.ActivityName }}</div>\
                        </el-form-item>\
                    </el-col>\
                    <el-col class="hidden-xs-only" v-if="false">\
                        <el-form-item :label="$t(\'KStarForm.ApprovalOpinion\')">\
                            <el-radio-group v-model="actionRadio" v-on:change="changeAction">\
                                <el-radio v-if="ifBtn(\'Approve\')" label="Approve">{{  $t(\'KStarForm.AgreeOpinion\') }}</el-radio>\
                                <el-radio v-if="ifBtn(\'ReSubmit\')" label="ReSubmit">{{  $t(\'KStarForm.ReSubmitOpinion\') }}</el-radio>\
                                <el-radio v-if="ifBtn(\'Returned\')" label="Returned">{{  $t(\'KStarForm.RejectOpinion\') }}</el-radio>\
                                <el-radio v-if="ifBtn(\'Refused\')" label="Refused">{{  $t(\'KStarForm.RefusedOpinion\') }}</el-radio>\
                                <el-radio v-if="ifBtn(\'Redirect\')" label="Redirect">{{  $t(\'KStarForm.RedirectOpinion\') }}</el-radio>\
                                <el-radio v-if="ifBtn(\'Communication\')" label="Communication">{{  $t(\'KStarForm.CommunicationOpinion\') }}</el-radio>\
                                <el-radio v-if="ifBtn(\'CancelCommunicate\')" label="CancelCommunicate">{{  $t(\'KStarForm.CancelCommunicateOpinion\') }}</el-radio>\
                                <el-radio v-if="ifBtn(\'CommunicateFeedback\')"label="CommunicateFeedback">{{  $t(\'KStarForm.CommunicateFeedbackOpinion\') }}</el-radio>\
                                <el-radio v-if="ifBtn(\'Withdrawn\')" label="Withdrawn">{{  $t(\'KStarForm.WithdrawnOpinion\') }}</el-radio>\
                                <el-radio v-if="ifBtn(\'Cancel\')" label="Cancel">{{  $t(\'KStarForm.CancelOpinion\') }}</el-radio>\
                                <!--<el-radio v-if="ifBtn(\'Circulate\')" label="Circulate">{{  $t(\'KStarForm.CirculateOpinion\') }}</el-radio>-->\
                            </el-radio-group>\
                        </el-form-item>\
                    </el-col>\
                    <el-col v-if="actionRadio == \'Redirect\' || actionRadio == \'Communication\' || actionRadio == \'Circulate\' ">\
                        <el-form-item class="addUser" :label="actionRadio == \'Redirect\' ? $t(\'KStarForm.OperationPeople\', {operation: $t(\'KStarForm.RedirectOpinion\')}) : actionRadio == \'Communication\' ? $t(\'KStarForm.OperationPeople\', {operation: $t(\'KStarForm.CommunicationOpinion\')}) : $t(\'KStarForm.OperationPeople\', {operation: $t(\'KStarForm.CirculateOpinion\')}) " v-on:click.native="addUser">\
                            <el-input v-model="userName" size="mini" readonly >\
                                <i slot="suffix" class="iconfont iconrenyuan"  v-on:click="addUser"/>\
                            </el-input>\
                        </el-form-item>\
                    </el-col>\
                    <el-col v-if="actionRadio == \'Returned\' ">\
                        <el-form-item :label="$t(\'KStarForm.ReturnTo\')" prop="ActivityId" v-if="formoperation && formoperation.BackActivity">\
                            <el-select  v-model="formoperation.BackActivity.ActivityId"  filterable>\
                                <el-option  v-for="item in formbackactivity" :key="item.ActivityId" :label="item.ActivityName" :value="item.ActivityId">\
                                </el-option>\
                            </el-select>\
                        </el-form-item>\
                    </el-col>\
                    <el-col v-if="actionRadio == \'Returned\'">\
                        <el-form-item class="mt-10" style="margin-left: 120px">\
                            <el-radio-group v-model="paramRetrunDialog.isRejectGoBack">\
                                <el-radio label=1 >{{  $t(\'KStarForm.RerouteAllNode\') }}</el-radio>\
                                <el-radio label=0 v-if="formoperation.IsRejectNotGoBack">{{  $t(\'KStarForm.DirectGoCurrentNode\') }}</el-radio>\
                            </el-radio-group>\
                        </el-form-item>\
                    </el-col>\
                    <el-col class="visible-xs-only">\
                        <el-form-item :label="$t(\'KStarForm.ApprovalOpinion\')" prop="Comment">\
                            <el-input type="textarea" v-model="formoperation.Comment" class="textarea is-emphasis"></el-input>\
                            <p v-if="formprocesstodealwithmodel.ActivityFormSettings.OpinionNumber && formprocesstodealwithmodel.ActivityFormSettings.OpinionNumber > 0" style="color:#b5b1b1;font-size:12px;text-align:left;">{{ $t(\'KStarForm.PhApprovalOpinionLeast\') + formprocesstodealwithmodel.ActivityFormSettings.OpinionNumber + $t(\'KStarForm.PhCharacters\')  }}</p>\
                            <el-row class="save-comment">\
                                <dialogmodal :visible="OpinionVisible" :button="[$t(\'KStarForm.Confirm\')]" v-on:submit="OpinionVisible=false" v-on:cancle="OpinionVisible=false" v-if="OpinionVisible">\
                                    <div slot="dialogcontent" class="my-popper">\
                                        <div class="icon-return" v-on:click="OpinionVisible=false"><i class="el-icon-arrow-left"></i>{{$t(\'KStarForm.Return\') }}</div>\
                                        <el-row class="OpinionList">\
                                            <el-col class="thephraseli" v-for="(item, index) in OpinionList" :key="index">\
                                                <span v-on:click="gotoSelectOpinion(item.Opinion)">{{ item.Opinion }}</span>\
                                                <el-button type="text" icon="el-icon-delete" v-on:click="deleteOpinion(index)">{{ $t("KStarForm.Delete") }}</el-button>\
                                            </el-col>\
                                        </el-row>\
                                        <el-row>\
                                            <el-col><el-input v-model="OpinionInput" v-on:keyup.enter.native="addOpinion" clearable/>\</el-col>\
                                            <el-col class="addthephrase"><el-button v-on:click="addOpinion(1)">{{ $t(\'KStarForm.AddThePhrase\') }}</el-button></el-col>\
                                        </el-row>\
                                    </div>\
                                </dialogmodal>\
                                <span class="left" v-on:click="OpinionVisible=true;getOpinionList()">{{ $t(\'KStarForm.ThePhrase\') }}</span>\
                            </el-row>\
                        </el-form-item>\
                    </el-col>\
                    <el-col class="hidden-xs-only">\
                        <!--<el-form-item prop="Comment" class="comment" :label="actionRadio == \'Returned\' ? $t(\'KStarForm.RejectOpinionComments\') : actionRadio == \'Communication\' ? $t(\'KStarForm.CommunicationComments\') : actionRadio == \'Refused\' ? $t(\'KStarForm.RefusedComments\') : actionRadio == \'Redirect\' ? $t(\'KStarForm.RedirectComments\') : \'\' " :style="{marginLeft: actionRadio == \'Redirect\' || actionRadio == \'Refused\' || actionRadio == \'Returned\' || actionRadio == \'Communication\' ? \'\' : \'120px\'} ">-->\
                        <el-form-item :label="$t(\'KStarForm.ApprovalOpinion\')" prop="Comment" class="comment">\
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="formoperation.Comment" class="textarea is-emphasis"></el-input>\
                            <p v-if="formprocesstodealwithmodel.ActivityFormSettings.OpinionNumber&&formprocesstodealwithmodel.ActivityFormSettings.OpinionNumber>0" class="limtNumber" style="color:#b5b1b1;font-size:12px;text-align:left;">{{ $t(\'KStarForm.PhApprovalOpinionLeast\') + formprocesstodealwithmodel.ActivityFormSettings.OpinionNumber + $t(\'KStarForm.PhCharacters\')  }}</p>\
                            <el-row class="save-comment">\
                                <el-popover v-model="OpinionPopVisible" v-on:show="getOpinionList" placement="top" width="250" trigger="click" popper-class="my-popper">\
                                    <el-row class="OpinionList">\
                                        <el-col class="thephraseli" v-for="(item, index) in OpinionList" :key="index">\
                                            <span v-on:click="gotoSelectOpinion(item.Opinion)"> {{ item.Opinion }}</span >\
                                            <el-button type="text" icon="el-icon-delete" v-on:click="deleteOpinion(index)">{{ $t("KStarForm.Delete") }}</el-button>\
                                        </el-col>\
                                    </el-row>\
                                    <el-row>\
                                        <el-col><el-input v-model="OpinionInput" v-on:keyup.enter.native="addOpinion(1)" clearable/></el-col>\
                                        <el-col class="addthephrase"><el-button v-on:click="addOpinion(1)">{{ $t(\'KStarForm.AddThePhrase\') }}</el-button></el-col>\
                                    </el-row>\
                                    <span class="left" slot="reference">{{$t(\'KStarForm.ThePhrase\')}}<i class="el-icon-s-operation"></i></span>\
                                </el-popover>\
                                <span class="right"><el-switch v-model="switchValue"      active-color="#00abd5" inactive-color="#EEEEEE ">\
                                </el-switch>{{$t(\'KStarForm.SaveAsCommonComments\')}}</span>\
                            </el-row>\
                        </el-form-item>\
                    </el-col>\
                </el-row>\
                <moduletheattachment :isupload="isupload" :attachmentmodel="formprocesstodealwithmodel" :formattachmentsmodel = "formattachmentsmodel" :formusernamemodel="formoperationmodel.CurrentUserAccount" :attachmentactname="formoperationmodel.ActivityName" :attachmenttype="\'Platform\'" :attachmenttitle="\$t(\'KStarForm.Attachment\')\" ></moduletheattachment >\
                <el-row class="submitBtn hidden-xs-only"><el-button  v-on:click="actSubmit" size="mini" type="primary" plain v-if="false">{{  $t(\'KStarForm.Submit\') }}</el-button>\</el-row>\
            </el-form>\
      </headersubtitle>\
    </div>\
';

var moduleProcessToDealWith = Vue.extend({
    template: templateContent,
    props: ['formprocesstodealwithmodel', 'formoperationmodel', 'formbtnmodel', 'formbackactivitymodel', 'headerTitle', 'formattachmentsmodel', 'switchvaluemodel'],
    data: function () {
        return {
            formprocesstodealwith: {},
            formoperation: {},
            formbtn: {},
            isupload: true,
            formbackactivity: {},
            parmdialog: {
                dialogvisible: false,
                clicktype: '',
                multiple: true,
                mobiledialogvisible: false
            },
            tableData: [],
            actionRadio: '',
            paramRetrunDialog: {//退回框参数
                dialogvisible: false,
                isRejectGoBack: "1"
            },
            RedirectUser: {},
            CommunicationUser: [],
            CirculateUser: [],
            userName: '',
            switchValue: false,
            switchValueabc: {},
            returnRules: {
                ActivityId: [
                    //请选择退回环节
                    { required: true, message: KStarForm.VM.$t("KStarForm.SelectTeturnActivity"), trigger: 'blur' },
                ],
                Comment: []
            },
            OpinionInput: '', // 2019-10-30 常用意见输入框
            OpinionList: [],  // 2019-10-30 常用意见列表
            OpinionVisible: false,  // 2019-10-30 常用意见
            OpinionPopVisible: false, // 2019-10-30 常用意见
            processToDealWithVisible: true, // 2019-11-13 是否显示流程处理？外系统的不显示
        };
    },
    watch: {
        formprocesstodealwithmodel: {
            handler: function (curVal, oldVal) {
                this.formprocesstodealwith = curVal;
                if (curVal.ActivityFormSettings.OpinionNumber > 0) {
                    this.returnRules.Comment = [{ required: true, trigger: 'blur', min: curVal.ActivityFormSettings.OpinionNumber, validator: this.validators }]
                } else {
                    this.returnRules.Comment = [{ required: true, message:  KStarForm.VM.$t("KStarForm.EnterReturnOpinion"), trigger: 'blur' }]
                }
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
                // var that = this
                // curVal.forEach(function(item) {
                //     if (item.Code == 'Approve') {
                //         that.actionRadio = 'Approve'
                //     } else if (item.Code == 'ReSubmit') {
                //         that.actionRadio = 'ReSubmit'
                //     } else if (item.Code == 'CommunicateFeedback') {
                //         that.actionRadio = 'CommunicateFeedback'
                //     }
                // })
                // Approve,ReSubmit,Returned,Refused,Redirect,Communication,CancelCommunicate,CommunicateFeedback,Withdrawn,Cancel
                var len = curVal.filter(function(item) {
                    return item.Code == 'Approve' || item.Code == 'ReSubmit' || item.Code == 'Returned' || item.Code == 'Redirect' || item.Code == 'Communication' || item.Code == 'CancelCommunicate' || item.Code == 'CommunicateFeedback' || item.Code == 'Withdrawn' || item.Code == 'Cancel' || item.Code == 'Refused'
                })
                this.processToDealWithVisible = len.length > 0 ? true : false
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
        },
        switchvaluemodel: {
            handler: function (curVal, oldVal) {

                this.switchValue = curVal;
            },
            deep: true,
            immediate: true
        },
    },
    methods: {
        // 弹框输入框是否必填 2019-12-13增加
        validators: function (rule, value, callback) {
            if (!value) {
                callback(new Error(KStarForm.VM.$t("KStarForm.EnterReturnOpinion")));
            } else if (value.toString().length < rule.min) {
                var msg = KStarForm.VM.$t("KStarForm.PhApprovalOpinionLeast") + this.formprocesstodealwithmodel.ActivityFormSettings.OpinionNumber + KStarForm.VM.$t("KStarForm.PhCharacters")
                callback(new Error(msg));
            } else {
                callback()
            }
        },
        // 2019-10-30 增加常用语 addThephrase
        addOpinion: function (type) {
            var isExistOpinion = false;
            var addUserOpinion;
            var deleteUserOpinion;
            var newOpinion = "";

            if (type == 1) {
                newOpinion = this.OpinionInput.trim();
            } else {
                newOpinion = this.formoperation.Comment ? this.formoperation.Comment.trim() : '';
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
            var comment = this.formoperation.Comment ? this.formoperation.Comment.trim() : '';
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
            this.formoperation.Comment = val;
            this.OpinionVisible = false;  // 2019-10-30 常用语
            this.OpinionPopVisible = false;
        },
        changeAction: function () {
            this.userName = ''
            // 2019-11-21
            if (this.userName) {
                this.$refs['refFormProcessToDeal'].resetFields();
                // this.userName = ''
            }
            switch (this.actionRadio) {
                case 'Returned':
                    this.formoperation.BackActivity.ActivityId = this.formbackactivity.length > 0 ? this.formbackactivity[0].ActivityId : ''
                    // this.returnRules.Comment = [
                    //         { required: true, message: " ", trigger: 'blur' }
                    //     ]
                    break;
            }
        },
        addUser: function () {
            switch (this.actionRadio) {
                case 'Redirect':
                    this.actRedirect();
                    break;
                case 'Communication':
                    this.actCommunication();
                    break;
                case 'Circulate':
                    this.actCirculate();
                    break;
            }
        },
        actSubmit: function () {
            var that = this;
            this.$refs["refFormProcessToDeal"].validate(function (valid) {
                if (!valid) {
                    return false;
                } else if (that.actionRadio == '') {
                    that.$alert(KStarForm.VM.$t("KStarForm.PCApprovalOpinion"), KStarForm.VM.$t("KStarForm.Tip"), {
                        confirmButtonText: KStarForm.VM.$t("KStarForm.Confirm"),
                        customClass: 'my-message-box',
                        confirmButtonClass: 'm-submit'
                    });
                } else {
                    switch (that.actionRadio) {
                        case 'Approve':
                            that.actApprove();
                            break;
                        case 'ReSubmit':
                            that.actReSubmit();
                            break;
                        case 'Returned':
                            that.returnConfim();
                            // that.actReturned()
                            break;
                        case 'Refused':
                            that.actRefused();
                            break;
                        case 'Redirect':
                            if (that.userName) {
                                if (that.formoperation.CurrentUserAccount == that.RedirectUser.UserAccount) {
                                    alertInfo.call(that, KStarForm.VM.$t("KStarForm.CanTTransferYourself")); // 不能转办给自己
                                } else {
                                    KStarForm.formRedirect(that, that.RedirectUser);
                                }
                            } else {
                                alertInfo.call(that, KStarForm.VM.$t("KStarForm.SelectRedirectUser")); //请选择转办人
                            }
                            // that.actRedirect()
                            break;
                        case 'Communication':
                                if (that.userName) {
                                    var len = that.CommunicationUser.filter(function(item) {
                                        return item.UserAccount == that.formoperation.CurrentUserAccount
                                    })
                                    if (len.length > 0) {
                                        alertInfo.call(that, KStarForm.VM.$t("KStarForm.CommunicateWidthYourself")); //不能自己与自己沟通
                                    } else {
                                        KStarForm.formCommunication(that, that.CommunicationUser);
                                    }
                                } else {
                                    alertInfo.call(that, KStarForm.VM.$t("KStarForm.SelectCommunicationUser")); //请选择沟通人
                                }
                            // that.actCommunication()
                            break;
                        case 'CancelCommunicate':
                            that.actCancelCommunicate();
                            break;
                        case 'CommunicateFeedback':
                            that.actCommunicateFeedback();
                            break;
                        case 'Withdrawn':
                            that.actWithdrawn();
                            break;
                        case 'Cancel':
                            that.actCancel();
                            break;
                        case 'Circulate':
                            if (that.userName) {
                                KStarForm.formCirculate(that, that.CirculateUser);
                            } else {
                                alertInfo.call(that, KStarForm.VM.$t("KStarForm.SelectCirculateUser")); //请选择传阅人
                            }
                            // that.actCirculate()
                            break;
                    }
                }
            });
        },
        //驳回弹框确定
        returnConfim: function () {
            var _this = this;
            this.formoperation.IsRejectGoBack = this.paramRetrunDialog.isRejectGoBack == "1" ? true : false;
            var resultArr = this.formbackactivity.filter(function (item) {
                return item.ActivityId === _this.formoperation.BackActivity.ActivityId;
            })[0];
            if (resultArr) {
                this.formoperation.BackActivity.ActivityName = resultArr.ActivityName;
                this.formoperation.BackActivity.ActivityDisplayName = resultArr.ActivityName;
            }
            this.$refs["refFormProcessToDeal"].validate(function (valid) {
                if (!valid) {
                    return false;
                }
                else {
                    //是否确认此次驳回--2019-11-21
                    _this.showConfirm(KStarForm.VM.$t("KStarForm.WhetherConfirmReject"), KStarForm.VM.$t("KStarForm.ConfirmReject"), function (value) {
                        if (value == 'confirm') {
                            KStarForm.formReject(_this);
                        }
                    })
                    // KStarForm.formReject(_this);
                }
            });
            // KStarForm.formReject(this);
        },
        actReturned: function () { //驳回事件2
            this.paramRetrunDialog.dialogvisible = true;
            this.paramRetrunDialog.isRejectGoBack = this.formoperationmodel.IsRejectGoBack ? "1" : "0";
        },
        showConfirm: function (content, title, callback) {
            this.$confirm(content, title, {
                lockScroll: false,
                confirmButtonText: KStarForm.VM.$t("KStarForm.Confirm"),
                customClass: 'my-message-box',
                confirmButtonClass: 'm-submit',
                cancelButtonText: KStarForm.VM.$t("KStarForm.Cancel"),
                cancelButtonClass: 'm-cancle',
                callback: callback
            })
        },
        actApprove: function () {
            var that = this;
            //是否确认此次同意审批  确认审批
            this.showConfirm(KStarForm.VM.$t("KStarForm.WhetherConfirmApprove"), KStarForm.VM.$t("KStarForm.ConfirmApprove"), function (value) {
                if (value == 'confirm') {
                    KStarForm.formApprove(that);
                }
            })
        },
        actReSubmit: function () {
            var that = this
            //是否确认重新提交  确认重新提交
            this.showConfirm(KStarForm.VM.$t("KStarForm.WhetherConfirmReSubmit"), KStarForm.VM.$t("KStarForm.ConfirmReSubmit"), function (value) {
                if (value == 'confirm') {
                    KStarForm.formReSubmit(that);
                }
            })

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
            var that = this
            //是否确认取消沟通 确认取消沟通
            this.showConfirm(KStarForm.VM.$t("KStarForm.WhetherConfirmCancelCommunicate"), KStarForm.VM.$t("KStarForm.ConfirmCancelCommunicate"), function (value) {
                if (value == 'confirm') {
                    KStarForm.formCancelCommunicate(that);
                }
            })
        },
        actCommunicateFeedback: function () {
            var that = this
            //是否确认沟通反馈  确认沟通反馈
            this.showConfirm(KStarForm.VM.$t("KStarForm.WhetherConfirmCommunicateFeedback"), KStarForm.VM.$t("KStarForm.ConfirmCommunicateFeedback"), function (value) {
                if (value == 'confirm') {
                    KStarForm.formCommunicateFeedback(that);
                }
            })
        },
        actRefused: function () {
            var that = this
            //是否确认此次拒绝  确认拒绝
            this.showConfirm(KStarForm.VM.$t("KStarForm.WhetherConfirmRefused"), KStarForm.VM.$t("KStarForm.ConfirmRefused"), function (value) {
                if (value == 'confirm') {
                    KStarForm.formRefused(that);
                }
            })
        },
        actWithdrawn: function () {
            var that = this
            //是否确认此次撤回  确认撤回
            this.showConfirm(KStarForm.VM.$t("KStarForm.WhetherConfirmWithdrawn"), KStarForm.VM.$t("KStarForm.ConfirmWithdrawn"), function (value) {
                if (value == 'confirm') {
                    KStarForm.formWithdrawn(that);
                }
            })

        },
        actCancel: function () {
            var that = this
            //是否确认此次取消  确认取消
            this.showConfirm(KStarForm.VM.$t("KStarForm.WhetherConfirmCancel"), KStarForm.VM.$t("KStarForm.ConfirmCancel"), function (value) {
                if (value == 'confirm') {
                    KStarForm.formCancel(that);
                }
            })

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
            if (val == "Communication") {  //沟通
                var arry = []
                this.CommunicationUser.forEach(function (item) {
                    var user = {
                        Type: 'User',
                        Value: item.UserAccount,
                        Name: item.UserDisplayName
                    };
                    arry.push(user);
                })

                this.parmdialog.json = arry;
                this.parmdialog.multiplelimit = true;
            }
            if (val == "Redirect") { //转办
                var arry = []
                if (this.RedirectUser && this.RedirectUser.UserAccount) {
                    var user = {
                        Type: 'User',
                        Value: this.RedirectUser.UserAccount,
                        Name: this.RedirectUser.UserDisplayName
                    };
                    arry.push(user);
                }
                this.parmdialog.json = arry;
            }
            return false;
        },
        //关闭弹窗
        closedialog: function (val) {
            this.parmdialog.dialogvisible = false;
            this.parmdialog.mobiledialogvisible = false
        },
        //请求url
        requseturl: function (val, type) {
            var list = []
            if (val.length == 0) {
                var multiple = false;
                if (type == "Communication" || type == "Circulate") {
                    multiple = true;
                }
                this.showdialog(type.ctype, multiple);
                return false;
            }
            if (type.clicktype == "Redirect") {
                var obj = {
                    UserAccount: val[0].Value,
                    UserDisplayName: val[0].Name
                }
                this.RedirectUser = obj;
                this.userName = val[0].Name;
            } else if (type.clicktype == "Communication") {
                var arry = [];
                _.forEach(val, function (el, index) {
                    arry.push({
                        UserAccount: el.Value,
                        UserDisplayName: el.Name
                    });
                    list.push(el.Name);
                });
                this.CommunicationUser = arry;
                this.userName = list.join(',');
            } else if (type.clicktype == "Circulate") {
                var arry = [];
                _.forEach(val, function (el, index) {
                    arry.push({
                        UserAccount: el.Value,
                        UserDisplayName: el.Name
                    });
                    list.push(el.Name);
                });
                this.CirculateUser = arry;
                this.userName = list.join(',');
            }
            type.dialogvisible = false;
            this.parmdialog.mobiledialogvisible = false;
        },
        // ifBtn:function (code) {//提交按钮可见性
        //    
        //     var btnCodeArray = _.map(this.formbtn, function (n) {
        //         return n.Code;
        //     });
        //     if (_.indexOf(btnCodeArray, code)> -1) {
        //         return true;
        //     }
        //     return false;
        // }
        // handleCommand: function (command) {//更多事件
        //     switch (command) {
        //         case "Redirect"://转办
        //             this.showdialog('Redirect', false);
        //             break;
        //         case "Communication"://沟通
        //             this.showdialog('Communication', true);
        //             break;
        //         case "CancelCommunicate"://取消沟通
        //             KStarForm.formCancelCommunicate(this);
        //             break;
        //         case "CommunicateFeedback"://沟通反馈
        //             KStarForm.formCommunicateFeedback(this);
        //             break;
        //         case "Refused"://拒绝
        //             KStarForm.formRefused(this);
        //             break;
        //         case "Withdrawn"://撤回
        //             KStarForm.formWithdrawn(this);
        //             break
        //         case "Cancel"://取消
        //             KStarForm.formCancel(this);
        //             break
        //         case "Circulate"://传阅
        //             this.showdialog('Circulate', true);
        //             break
        //         case "Subscribe"://订阅
        //             KStarForm.formSubscribe(this);
        //             break
        //         case "CancelSubscribe"://取消订阅
        //             KStarForm.formCancelSubscribe(this);
        //             break
        //     }
        // },
        ifBtn: function (code) {//提交按钮可见性

            var btnCodeArray = _.map(this.formbtnmodel, function (n) { return n.Code; });
            return _.indexOf(btnCodeArray, code) > -1;
        }
    }
});
// 注册
Vue.component('moduleprocesstodealwith', moduleProcessToDealWith);


