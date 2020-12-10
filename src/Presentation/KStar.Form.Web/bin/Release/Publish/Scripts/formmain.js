window.IsEnabledLog = true;
window.onload = function () {
    //处理富文本框问题
    document.body.onkeydown = function (event) {
        if (event.keyCode == 13 && event.target.localName != "textarea") {//排除textarea的回车事件
            event.keyCod = 0; return false;
        }
    }
};
Vue.prototype.$ajax = axios;//注册axios
var timer = null;
/** KStarForm  util **/
//获取hrf参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//获取Controller名称
function getControllerName() {
    var patt1 = /\b\/\w+/i;
    var r = window.location.pathname.match(patt1);
    if (r != null) return r[0];
    return null;
}
//添加随机数
function geturlParam() {
    var r = window.location.search;
    if (r) {
        r = r + "&d=" + Math.random();
    }
    else {
        r = "?d=" + Math.random();
    }
    return r;
}
//get
function $get(url, data, successCallback, failCallback) {
    axios.get(url,
        {
            params: data
        })
        .then(successCallback)
        .catch(failCallback)
}
//post
function $post(url, data, successCallback, failCallback) {
    var loading;
    if (KStarForm.VM.$loading) {
        loading = KStarForm.VM.$loading({
            lock: true,
            text: '处理中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.1)'
        });
    }
    else {
        loading = new Vue().$loading({
            lock: true,
            text: '加载中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.1)'
        });
    }
    axios.post(url, data).then(function (response) { loading.close(); successCallback(response); }).catch(function (error) { loading.close(); failCallback(error); })
}
//弹出框
function alertInfo(message, title, callback) {

    title = title || KStarForm.VM.$t("KStarForm.SystemPrompt");
    try {
        this.$alert(message, title, {
            confirmButtonText: KStarForm.VM.$t("KStarForm.Confirm"),
            callback: callback,
            customClass: 'my-message-box',
            confirmButtonClass: 'm-submit'
        });
    } catch (e) {
        KStarForm.VM.$alert(message, title, {
            confirmButtonText: KStarForm.VM.$t("KStarForm.Confirm"),
            callback: callback,
            customClass: 'my-message-box',
            confirmButtonClass: 'm-submit'
        });
    }
}
// 自动关闭alert
function closeAlertInfo() {
    clearTimeout(timer)
    timer = setTimeout(function () {
        if (document && document.getElementsByClassName('my-message-box').length && document.getElementsByClassName('my-message-box')[0].getElementsByClassName('m-submit').length) {
            document.getElementsByClassName('my-message-box')[0].getElementsByClassName('m-submit')[0].click()
        }
        clearTimeout(timer)
    }, 500)
}

//操作成功通知
function messageSuccessInfo(message, callback) {
    var offset = document.documentElement.clientHeight / 2;
    this.$message({
        offset: offset,//好像没有效果！
        showClose: true,
        message: message,
        type: "success",
        duration: 1000,
        onClose: callback
    });
}
//获取多语言
function getVueLang(lang) {
    if (lang == "zh-CN") {
        KStarForm.VM._i18n.locale = "cn";
        ELEMENT.locale(ELEMENT.lang.zhCN);
    }
    else if (lang == "en-US") {
        KStarForm.VM._i18n.locale = "en";
        ELEMENT.locale(ELEMENT.lang.en);
    }
    //本地缓存设置语言类型 中文(cn),英文（en）
    localStorage.Lang = KStarForm.VM._i18n.locale;

    return KStarForm.VM._i18n.locale;
}
//获取多语言内容
function getLangMessages() {
    try {
        if (FormLang != undefined && FormLang != null) {
            return _.merge(FormLang, KStarFormLang);
        }
    }
    catch (err) {

    }
    return KStarFormLang;
}
//是否手机端
function isMobile() {
    var userAgentInfo = navigator.userAgent;

    var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];

    var mobile_flag = false;

    //根据userAgent判断是否是手机
    for (var v = 0; v < mobileAgents.length; v++) {
        if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
            mobile_flag = true;
            break;
        }
    }

    var screen_width = window.screen.width;
    var screen_height = window.screen.height;

    //根据屏幕分辨率判断是否是手机
    if (screen_width < 500 && screen_height < 800) {
        mobile_flag = true;
    }

    return mobile_flag;
}

//关闭页面
function closePage(refresh) {
    // 判断是否是手机端
    if (isMobile()) {

    } else {
    }
    if (navigator.userAgent.indexOf('MSIE') > 0) { // close IE
        if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
            window.opener = null;
            window.close();
        } else {
            window.open('', '_top');
            window.top.close();
        }
    } else { // close chrome;It is effective when it is only one.
        if (window.opener) {
            try {
                if (refresh) {
                    window.opener.refresh();
                }
            } catch (e) {

            }
        }
        //如果可以关闭就直接关闭页面，如果不能关闭，就刷新页面，审批后数据会变成查看页面。
        window.opener = null;
        window.open(' ', '_self');
        window.close();
    }
}

//如果返回的是false说明当前操作系统是手机端，如果返回的是true则说明当前的操作系统是电脑端
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//如果返回true 则说明是Android  false是ios
function GetMobileType() {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        //这个是安卓操作系统
        return "android";
    }
    if (isIOS) {
        //这个是ios操作系统
        return "ios";
    }
    return "other"
}
//获取客户端类型
function GetBrowserType() {
    if (IsPC) return "pc";
    return GetMobileType();
}
//注册日期处理格式
Vue.filter('dateformat', function (dataStr, pattern) {
    return moment(dataStr).format(pattern || 'YYYY-MM-DD HH:mm:ss')
})
/** KStarForm  Object **/
KStarForm = {
    //formModel
    formModel: {},//原始数据
    VM: {},//Vue 对象
    vmFormData: {
        vmFormInstance: {},//表头 
        vmFormContent: {},//表单数据
        vmFormAttachments: [],//附件
        vmFormApprovalHistorys: [],//审批历史
        vmFormCirculateRecord: [], // 订阅记录
        vmFormSubscribeRecord: [], //传阅记录
        vmKStarFormButtons: [],//审批按钮        
        vmOperation: {
            BackActivity: {},
            ProcessData: [],//自由流程数据
        },//审批
        vmBackActivitys: [],//可退回环节
        vmFormSetting: {
            ActivityFormSettings: {}, VersionFormSettings: {}
        },//表单配置
        vmFormType: '',//表单状态
        vmIsUrgencyShow: false,//是否显示紧急度，先默认不显示
        vmUserLanguages: '',//Language
        vmProcessRoute: {},//流程分类
        vmProcPrediction: [],//流程预判   
        vmSwitchValue: false//是否保存常用语
    },

    formModelExtend: {},//扩展 目前没有使用到
    //统一错误处理
    error: function (error, sender) {
        try {
            if (error.response.data.code == "998") {//已处理的错误提示，不关闭页面
                alertInfo.call(sender, error.response.data.message + "," + KStarForm.VM.$t("KStarForm.ErrorLogIDMessage") + error.response.data.logId, KStarForm.VM.$t("KStarForm.SystemPrompt"), null);
            }
            else if (error.response.data.code == "997") {//已处理的错误提示，自动关闭页面
                alertInfo.call(sender, error.response.data.message + "," + KStarForm.VM.$t("KStarForm.ErrorLogIDMessage") + error.response.data.logId, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                    setTimeout(function () {
                        closePage(false);
                    }, 1500);
                });
            } else if (error.response.data.code == "996") {//常规错误提示
                alertInfo.call(sender, error.response.data.message, KStarForm.VM.$t("KStarForm.SystemPrompt"), null);
            }
            else if (error.response.data.code == "995") {//已处理的错误提示，点击确定关闭页面
                alertInfo.call(sender, error.response.data.message + "," + KStarForm.VM.$t("KStarForm.ErrorLogIDMessage") + error.response.data.logId, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                    closePage(false);
                });
            }
            else {//999系统错误
                alertInfo.call(sender, KStarForm.VM.$t("KStarForm.ProcessExceptionPrompt") + "," + KStarForm.VM.$t("KStarForm.ErrorLogIDMessage") + error.response.data.logId, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                    closePage(false);
                });
            }
        } catch (e) {
            alertInfo.call(sender, error, KStarForm.VM.$t("KStarForm.SystemPrompt"), null);
        }
    },
    //生命周期钩子函数
    initFormDataAfter: {},//初始化数据之后
    onSubmitBefore: {},

    onValiateBefore: {},
    onValiateAfter: {},
    onSubmitAfter: function (data, accessUrl) {

    },
    onReSubmitBefore: {},
    onReSubmitAfter: function (data, accessUrl) {
    },
    onDraftBefore: {},
    onDraftAfter: function (data, accessUrl) {
    },
    onCancelSubmitBefore: {},
    onCancelSubmitAfter: function (data, accessUrl) {
    },
    onApproveAfter: function (data, accessUrl) {
    },
    onApproveBefore: {},
    onCancelAfter: function (data, accessUrl) {
    },
    onCancelBefore: {},
    onRedirectBefore: {},
    onRedirectAfter: function (data, accessUrl) {
    },
    onWithdrawnBefore: {},
    onWithdrawnAfter: function (data, accessUrl) {
    },
    onCommunicateBefore: {},
    onCommunicateAfter: function (data, accessUrl) {
    },
    onCancelCommunicateBefore: {},
    onCancelCommunicateAfter: function (data, accessUrl) {
    },
    onCommunicateFeedbackBefore: {},
    onCommunicateFeedbackAfter: function (data, accessUrl) {
    },
    onRejectBefore: {},
    onRejectAfter: function (data, accessUrl) {
    },
    onCirculateBefore: {},
    onCirculateAfter: function (data, accessUrl) {
    },
    onRefusedBefore: {},
    onRefusedAfter: function (data, accessUrl) {
    },
    onSubscribeBefore: {},
    onRSubscribeAfter: function (data, accessUrl) {
    },
    onCancelSubscribeBefore: {},
    onCancelSubscribeAfter: function (data, accessUrl) {
    },
    //记录停留日志
    logData: function () {
        var url = getControllerName() + "/UpdateLog?logId=" + this.formModel.FormLogId;
        axios.get(url)
            .then(function (response) {
                //console.log(response);
            })
            .catch(function (error) {
                //console.log(error);
            });
    },
    //关闭页面日志
    logCloseData: function () {
        document.body.onkeydown = function (event) {
            if (event.keyCode == 13 && event.target.localName != "textarea") {//排除textarea的回车事件
                event.keyCod = 0; return false;
            }
        }
        var url = getControllerName() + "/UpdateLog?logId=" + KStarForm.formModel.FormLogId;
        if (KStarForm.formModel.FormLogId) {
            if (typeof (navigator.sendBeacon) == "function") {
                var res = navigator.sendBeacon(url);
            } else {
                var img = new Image();
                img.src = url;
            }
        }
    },
    //操作日志
    ActionLog: function (data, accessUrl) {
        var url = getControllerName() + "/ActionLog";
        if (window.IsEnabledLog) {
            axios.post(url, { jsonData: data, url: window.location.origin + accessUrl })
                .then(function (response) {
                    //console.log(response);
                })
                .catch(function (error) {
                    //console.log(error);
                });
        }
    },
    //表单字段校验
    formValiate: function (sender, actionName) {

        var formType = this.vmFormData.vmFormType;
        //表单基本校验
        var isFormBasicInfo = false, isFormContent = false, isFormProcessToDeal = false, isFormSubject = false;
        var checkValue = true;
        if (formType == "Application" || formType == "Approval" || formType == "ReApproval" || formType == "CommunicateFeedback") {
            if (actionName == "submit" || actionName == "approve" || actionName == "draft" || actionName == "resubmit" || actionName == "procprediction") {
                //基本信息
                sender.$root.$refs["refComBasicInfo"].$refs["refFormBasicInfo"].validate(function (valid, obj) {
                    if (valid) {
                        isFormBasicInfo = true;
                    } else {
                        isFormBasicInfo = false;
                        checkValue = false;
                        return false;
                    }
                });
                // 标题名称
                sender.$root.$refs["refFormSubject"].validate(function (valid, obj) {
                    if (valid) {
                        isFormSubject = true
                    } else {
                        isFormSubject = false;
                        checkValue = false;
                        return false;
                    }
                });
            }

            if (actionName == "submit" || actionName == "approve" || actionName == "resubmit" || actionName == "procprediction") {
                //表单 默认审批表单只需要审批不需要填写业务数据
                if (sender.$root.$refs["refFormContent"]) {
                    sender.$root.$refs["refFormContent"].validate(function (valid, obj) {
                        if (valid) {
                            isFormContent = true;
                        } else {
                            isFormContent = false;
                            checkValue = false;
                            return false;
                        }
                    });
                } else {
                    isFormContent = true; // 没有改元素直接设为验证通过
                }

            }

            if (!checkValue) {
                var timer = setTimeout(function () {
                    var isError = document.getElementsByClassName("is-error");
                    if (isError.length > 0 && isError[0].querySelector('input')) {
                        isError[0].querySelector('input').focus()
                    }
                    clearTimeout(timer)
                }, 300)
            }
        }
        if (formType == "Application" || formType == "Approval" || formType == "ReApproval" || formType == "CommunicateFeedback") {
            if (actionName == "submit" || actionName == "approve" || actionName == "resubmit" || actionName == "procprediction") {
                if (!isFormBasicInfo || !isFormContent || !isFormSubject) {
                    return false;
                }
            }
            if (actionName == "draft") {//草稿只校验表头
                if (!isFormBasicInfo || !isFormSubject) {
                    return false;
                }
            }
        }
        return true;
    },
    //节点审批人必填校验
    actApproverValiate: function (sender, callback) {
        if (KStarForm.vmFormData.vmProcPrediction.length == 0) {
            KStarForm.ProcPrediction(sender, function (sender) {
                var result = KStarForm.actManualUsersValiate(sender);
                if (!result) {
                    sender.visible = true;//如果检查没有通过，不弹出走向框
                }
                (callback && typeof (callback) == "function") && callback(sender, result);
            }, false);
        }
        else {
            var result = KStarForm.actManualUsersValiate(sender);
            (callback && typeof (callback) == "function") && callback(sender, result);
        }
    },
    actManualUsersValiate: function (sender) {
        var requiredActivityName;//必选的节点
        var message;//审批人数量消息
        _.each(KStarForm.vmFormData.vmProcPrediction, function (item) {
            if (item.Required && item.ApproverName.length == 0) {
                requiredActivityName = item.ActivityName;
                return false;
            }
            else {
                if (item.Required) {
                    if (item.Settings) {
                        var approveModel = JSON.parse(item.Settings);
                        var approveCount = _.find(KStarForm.vmFormData.vmOperation.ManualUsers, { ActivityName: item.ActivityName }).Approvers.length;;
                        var curCount = parseInt(approveModel.ApprovelCountModel.ApprovelUserCount);
                        if (approveModel.ApprovelCountModel.UserPicModel == "2") {
                            if (approveCount < curCount) {
                                message = KStarForm.VM.$t("KStarForm.PredictionNode") + item.ActivityDisplayName + KStarForm.VM.$t("KStarForm.PredictionTipLeast") + curCount + KStarForm.VM.$t("KStarForm.PredictionTipTail");

                            }
                        } else if (approveModel.ApprovelCountModel.UserPicModel == "3") {
                            if (approveCount != curCount) {
                                message = KStarForm.VM.$t("KStarForm.PredictionNode") + item.ActivityDisplayName + KStarForm.VM.$t("KStarForm.PredictionTipEqual") + curCount + KStarForm.VM.$t("KStarForm.PredictionTipTail");
                                return false;
                            }

                        } else if (approveModel.ApprovelCountModel.UserPicModel == "4") {
                            if (approveCount > curCount) {
                                message = KStarForm.VM.$t("KStarForm.PredictionNode") + item.ActivityDisplayName + KStarForm.VM.$t("KStarForm.PredictionTipNoMore") + curCount + KStarForm.VM.$t("KStarForm.PredictionTipTail");
                                return false;
                            }
                        }
                    }
                }
            }
        });
        if (requiredActivityName) {
            alertInfo.call(sender, '【' + requiredActivityName + '】' + KStarForm.VM.$t("KStarForm.RequiredActivityUser"), KStarForm.VM.$t("KStarForm.SystemPrompt"));
            sender.visible = true;
            return false;
        };
        if (message) {
            alertInfo.call(sender, message, KStarForm.VM.$t("KStarForm.SystemPrompt"));
            sender.visible = true;
            return false;
        };

        return true;
    },

    //校验
    actValiate: function (sender, actionName, callback) {
        var result = false;
        var beforeResult = true;
        if (KStarForm.onValiateBefore && typeof (KStarForm.onValiateBefore) == "function") {
            beforeResult = KStarForm.onValiateBefore();
        }

        if (beforeResult) {
            //表单基本检查
            result = KStarForm.formValiate(sender, actionName);
            if (!result) {
                alertInfo.call(sender, KStarForm.VM.$t("KStarForm.FormRequiredRrompt"));
                sender.btnDisabled = false;
                return result;
            }
            //如果需要手选，再去检查
            if (actionName != 'procprediction' && actionName != 'draft') {
                if (KStarForm.vmFormData.vmOperation.Checklist.IsProcessSeer) {
                    KStarForm.actApproverValiate(sender, function (sender, result) {
                        if (!result) {
                            return false;
                        }
                        else {
                            if (KStarForm.onValiateAfter && typeof (KStarForm.onValiateAfter) == "function") {
                                if (!KStarForm.onValiateAfter()) {
                                    return false;
                                }
                            }
                            (callback && typeof (callback) == "function") && callback(sender);
                        }
                    });
                }
                else {
                    if (!result) {
                        alertInfo.call(sender, KStarForm.VM.$t("KStarForm.FormRequiredRrompt"));
                        sender.btnDisabled = false;
                        return false;
                    }
                    if (KStarForm.onValiateAfter && typeof (KStarForm.onValiateAfter) == "function") {
                        if (!KStarForm.onValiateAfter()) {
                            return false;
                        }
                    }
                    (callback && typeof (callback) == "function") && callback(sender);
                }
            }
            else {
                (callback && typeof (callback) == "function") && callback(sender);
            }
        }
        else {
            (callback && typeof (callback) == "function") && callback(sender);
        }
    },
    //获取操作显示名称
    actDisplayName: function (code) {//动作名称

        var disName = "";
        _.forEach(this.vmFormData.vmKStarFormButtons, function (el, index) {
            if (el.Code == code) {
                disName = el.DisplayName;
                return false;
            }
        });
        return disName;
    },
    //提交 发起流程
    submit: function (sender, callback, onclosing) {
        KStarForm.vmFormData.vmOperation.ActionName = this.actDisplayName("Submit");
        if (KStarForm.vmFormData.vmFormInstance.ApplicantPositionName === null) {
            alertInfo.call(sender, KStarForm.VM.$t("KStarForm.SelectAppPost"));
            sender.btnDisabled = false;
            return false;
        }

        var postUrl = getControllerName() + "/Submit" + geturlParam();
        var data = JSON.parse(KStarForm.toJsonString());
        data.Operation.ManualUserActivity = [];

        sender.$confirm(KStarForm.VM.$t("KStarForm.ConfirmLaunchProcess")).then(function () {
            $post(postUrl, { jsonData: JSON.stringify(data) }, function (response) {
                if (response.status == 200 && response.data) {
                    if (isMobile()) {
                        closePage(true);
                    } else {
                        messageSuccessInfo.call(sender, response.data.message, function () {
                            closePage(true);
                        });
                    }
                }
            }, function (error) {
                KStarForm.error(error, sender);
            });
        }).catch(function () {
            //取消提交处理
        });
    },
    //重新提交
    reSubmit: function (sender, callback, onclosing) {
        KStarForm.vmFormData.vmOperation.ActionName = this.actDisplayName("ReSubmit");
        var json = KStarForm.toJsonString();
        var postUrl = getControllerName() + "/ReSubmit" + geturlParam();
        $post(postUrl, { jsonData: json }, function (response) {
            if (response.status == 200 && response.data) {
                if (isMobile()) {
                    closePage(true);
                } else {
                    alertInfo.call(sender, response.data.message, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                        closePage(true);
                    });

                    (callback && typeof (callback) == "function") && callback(json, postUrl);
                }
            }
        }, function (error) {
            KStarForm.error(error, sender);
        }
        );
    },
    //保存草稿
    draft: function (sender, callback, onclosing) {
        KStarForm.vmFormData.vmOperation.ActionName = this.actDisplayName("SaveDraft");
        var json = KStarForm.toJsonString();
        var postUrl = getControllerName() + "/SaveDraft" + geturlParam();
        $post(postUrl, { jsonData: json }, function (response) {
            if (response.status == 200 && response.data) {
                if (isMobile()) {
                    closePage(true);
                } else {
                    alertInfo.call(sender, response.data.message, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                        closePage(true);
                    });

                    (callback && typeof (callback) == "function") && callback(json, postUrl);
                }
            }
        }, function (error) {
            KStarForm.error(error, sender);
        }
        );
    },
    //同意
    approve: function (sender, callback, onclosing) {
        var json = KStarForm.toJsonString();
        var comment = JSON.parse(json).Operation.Comment || "";
        var optionNumber = KStarForm.vmFormData.vmFormSetting.ActivityFormSettings.OpinionNumber || 0;
        if (optionNumber > 0 && comment.trim().length < optionNumber) {
            alertInfo.call(sender, "审批意见至少 " + optionNumber + " 个字符", KStarForm.VM.$t("KStarForm.SystemPrompt"));
            sender.btnDisabled = false;
            return false;
        }
        KStarForm.vmFormData.vmOperation.ActionName = this.actDisplayName("Approve");
        var postUrl = getControllerName() + "/Approve" + geturlParam();
        $post(postUrl, { jsonData: json }, function (response) {
            if (response.data.message == "设置审批人") {
                //KStarForm.vmFormData.vmTime = +new Date();
                return;
            }

            if (response.status == 200 && response.data) {
                if (isMobile()) {
                    closePage(true);
                } else {
                    alertInfo.call(sender, response.data.message, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                        closePage(true);
                    });

                    (callback && typeof (callback) == "function") && callback(json, postUrl);
                }
            }
        }, function (error) {
            KStarForm.error(error, sender);
        }
        );
    },
    //作废
    cancel: function (sender, callback, onclosing) {
        KStarForm.vmFormData.vmOperation.ActionName = "作废";
        var json = KStarForm.toJsonString();
        var postUrl = getControllerName() + "/Cancel" + geturlParam();
        $post(postUrl, { jsonData: json }, function (response) {
            if (response.status == 200 && response.data) {
                if (isMobile()) {
                    closePage(true);
                } else {
                    alertInfo.call(sender, response.data.message, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                        closePage(true);
                    });

                    (callback && typeof (callback) == "function") && callback(json, postUrl);
                }
            }
        }, function (error) {
            KStarForm.error(error, sender);
        }
        );
    },
    //退回 Returned
    reject: function (sender, callback, onclosing) {
        KStarForm.vmFormData.vmOperation.ActionName = this.actDisplayName("Returned");
        var json = KStarForm.toJsonString();
        var postUrl = getControllerName() + "/Reject" + geturlParam();
        $post(postUrl, { jsonData: json }, function (response) {
            if (response.status == 200 && response.data) {
                if (isMobile()) {
                    closePage(true);
                } else {
                    alertInfo.call(sender, response.data.message, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                        closePage(true);
                    });

                    (callback && typeof (callback) == "function") && callback(json, postUrl);
                }
            }
        }, function (error) {
            KStarForm.error(error, sender);
        }
        );
    },
    //转办
    redirect: function (sender, callback, onclosing) {
        KStarForm.vmFormData.vmOperation.ActionName = this.actDisplayName("Redirect");   //转办
        var json = KStarForm.toJsonString();
        var postUrl = getControllerName() + "/Redirect" + geturlParam();

        $post(postUrl, { jsonData: json }, function (response) {
            if (response.status == 200 && response.data) {
                if (isMobile()) {
                    closePage(true);
                } else {
                    alertInfo.call(sender, response.data.message, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                        closePage(true);
                    });

                    (callback && typeof (callback) == "function") && callback(json, postUrl);
                }
            }
        }, function (error) {
            KStarForm.error(error, sender);
        }
        );
    },
    //撤回
    Withdrawn: function (sender, callback, onclosing) {
        KStarForm.vmFormData.vmOperation.ActionName = this.actDisplayName("Withdrawn");
        var json = KStarForm.toJsonString();
        var postUrl = getControllerName() + "/Withdrawn" + geturlParam();
        $post(postUrl, { jsonData: json }, function (response) {
            if (response.status == 200 && response.data) {
                if (isMobile()) {
                    closePage(true);
                } else {
                    alertInfo.call(sender, response.data.message, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                        closePage(true);
                    });

                    (callback && typeof (callback) == "function") && callback(json, postUrl);
                }
            }
        }, function (error) {
            KStarForm.error(error, sender);
        }
        );
    },
    //沟通
    communication: function (sender, callback, onclosing) {
        KStarForm.vmFormData.vmOperation.ActionName = this.actDisplayName("Communication");
        var json = KStarForm.toJsonString();
        var postUrl = getControllerName() + "/Communication" + geturlParam();
        $post(postUrl, { jsonData: json }, function (response) {
            if (response.status == 200 && response.data) {
                if (isMobile()) {
                    closePage(true);
                } else {
                    alertInfo.call(sender, response.data.message, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                        closePage(true);
                    });

                    (callback && typeof (callback) == "function") && callback(json, postUrl);
                }
            }
        }, function (error) {
            KStarForm.error(error, sender);
        }
        );
    },
    //取消沟通
    cancelCommunicate: function (sender, callback, onclosing) {
        KStarForm.vmFormData.vmOperation.ActionName = this.actDisplayName("CancelCommunicate");
        var json = KStarForm.toJsonString();
        var postUrl = getControllerName() + "/CancelCommunicate" + geturlParam();
        $post(postUrl, { jsonData: json }, function (response) {
            if (response.status == 200 && response.data) {
                if (isMobile()) {
                    closePage(true);
                } else {
                    alertInfo.call(sender, response.data.message, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                        closePage(true);
                    });

                    (callback && typeof (callback) == "function") && callback(json, postUrl);
                }
            }
        }, function (error) {
            KStarForm.error(error, sender);
        }
        );
    },
    //沟通反馈
    communicateFeedback: function (sender, callback, onclosing) {
        KStarForm.vmFormData.vmOperation.ActionName = this.actDisplayName("CommunicateFeedback");
        var json = KStarForm.toJsonString();
        var postUrl = getControllerName() + "/CommunicateFeedback" + geturlParam();
        $post(postUrl, { jsonData: json }, function (response) {
            if (response.status == 200 && response.data) {
                if (isMobile()) {
                    closePage(true);
                } else {
                    alertInfo.call(sender, response.data.message, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                        closePage(true);
                    });

                    (callback && typeof (callback) == "function") && callback(json, postUrl);
                }
            }
        }, function (error) {
            KStarForm.error(error, sender);
        }
        );
    },
    //传阅
    circulate: function (sender, callback, onclosing) {
        KStarForm.vmFormData.vmOperation.ActionName = this.actDisplayName("Circulate");
        var json = KStarForm.toJsonString();
        var postUrl = getControllerName() + "/Circulate" + geturlParam();
        console.log(json);
        $post(postUrl, { jsonData: json }, function (response) {
            if (response.status == 200 && response.data) {

                alertInfo.call(sender, response.data.message, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                    window.location.reload();
                });

                (callback && typeof (callback) == "function") && callback(json, postUrl);
            }
        }, function (error) {
            KStarForm.error(error, sender);
        }
        );
    },
    //拒绝
    Refused: function (sender, callback, onclosing) {
        KStarForm.vmFormData.vmOperation.ActionName = this.actDisplayName("Refused");
        var json = KStarForm.toJsonString();
        var postUrl = getControllerName() + "/Refused" + geturlParam();
        $post(postUrl, { jsonData: json }, function (response) {
            if (response.status == 200 && response.data) {
                if (isMobile()) {
                    closePage(true);
                } else {
                    alertInfo.call(sender, response.data.message, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                        closePage(true);
                    });

                    (callback && typeof (callback) == "function") && callback(json, postUrl);
                }
            }
        }, function (error) {
            KStarForm.error(error, sender);
        }
        );
    },
    //订阅
    Subscribe: function (sender, callback, onclosing) {
        KStarForm.vmFormData.vmOperation.ActionName = this.actDisplayName("Subscribe");
        var json = KStarForm.toJsonString();
        var postUrl = getControllerName() + "/Subscribe" + geturlParam();
        $post(postUrl, { jsonData: json }, function (response) {
            if (response.status == 200 && response.data) {

                alertInfo.call(sender, response.data.message, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                    window.location.reload()
                });

                (callback && typeof (callback) == "function") && callback(json, postUrl);
            }
        }, function (error) {
            KStarForm.error(error, sender);
        }
        );
    },
    //取消订阅
    CancelSubscribe: function (sender, callback, onclosing) {
        KStarForm.vmFormData.vmOperation.ActionName = this.actDisplayName("CancelSubscribe");
        var json = KStarForm.toJsonString();
        var postUrl = getControllerName() + "/CancelSubscribe" + geturlParam();
        $post(postUrl, { jsonData: json }, function (response) {
            if (response.status == 200 && response.data) {

                alertInfo.call(sender, response.data.message, KStarForm.VM.$t("KStarForm.SystemPrompt"), function () {
                    window.location.reload()
                });

                (callback && typeof (callback) == "function") && callback(json, postUrl);
            }
        }, function (error) {
            KStarForm.error(error, sender);
        }
        );
    },
    //按钮事件
    //发起流程
    formSubmit: function (sender) {
        //表单基本校验
        this.actValiate(sender, "submit", function (sender) {
            if (KStarForm.onSubmitBefore && typeof (KStarForm.onSubmitBefore) == "function") {
                if (KStarForm.onSubmitBefore(sender)) {
                    KStarForm.submit(sender, KStarForm.onSubmitAfter);
                }
                else {
                    sender.btnDisabled = false;
                    return false;
                }
            }
            else {
                KStarForm.submit(sender, KStarForm.onSubmitAfter);
            }
        });
    },
    //重新提交
    formReSubmit: function (sender) {
        this.actValiate(sender, "resubmit", function (sender) {
            if (KStarForm.onReSubmitBefore && typeof (KStarForm.onReSubmitBefore) == "function") {
                if (KStarForm.onReSubmitBefore(sender)) {
                    KStarForm.reSubmit(sender, KStarForm.onReSubmitAfter);
                }
                else {
                    sender.btnDisabled = false;
                    return false;
                }
            }
            else {
                KStarForm.reSubmit(sender, KStarForm.onReSubmitAfter);
            }
        });
    },
    //草稿
    formDraft: function (sender) {
        //校验
        this.actValiate(sender, "draft", function (sender) {
            sender.$confirm("确认要存为草稿?").then(function () {
                if (KStarForm.onDraftBefore && typeof (KStarForm.onDraftBefore) == "function") {
                    if (KStarForm.onDraftBefore(sender)) {
                        KStarForm.draft(sender, KStarForm.onDraftAfter);
                    }
                    else {
                        sender.btnDisabled = false;
                        return false;
                    }
                }
                else {
                    KStarForm.draft(sender, KStarForm.onDraftAfter);
                }
            }).catch(function () {
                //取消提交处理
            });
        });
    },
    //取消提交
    formCancelSubmit: function (sender) {
        if (KStarForm.onCancelSubmitBefore && typeof (KStarForm.onCancelSubmitBefore) == "function") {
            if (KStarForm.onCancelSubmitBefore(sender)) {
                KStarForm.cancelSubmit(sender, KStarForm.onCancelSubmitAfter);
            }
            else {
                sender.btnDisabled = false;
                return false;
            }
        }
        else {
            KStarForm.cancelSubmit(sender, KStarForm.onCancelSubmitAfter);
        }
    },
    //审批
    formApprove: function (sender) {
        //表单基本校验
        this.actValiate(sender, "approve", function (sender) {
            if (KStarForm.onApproveBefore && typeof (KStarForm.onApproveBefore) == "function") {
                if (KStarForm.onApproveBefore(sender)) {
                    KStarForm.approve(sender, KStarForm.onApproveAfter);
                }
                else {
                    sender.btnDisabled = false;
                    return false;
                }
            }
            else {
                KStarForm.approve(sender, KStarForm.onApproveAfter);
            }
        });

    },
    //作废
    formCancel: function (sender) {

        if (KStarForm.onCancelBefore && typeof (KStarForm.onCancelBefore) == "function") {
            if (KStarForm.onCancelBefore(sender)) {
                KStarForm.cancel(sender, KStarForm.onCancelAfter);
            }
            else {
                sender.btnDisabled = false;
                return false;
            }
        }
        else {
            KStarForm.cancel(sender, KStarForm.onCancelAfter);
        }
    },
    //退回
    formReject: function (sender) {
        if (KStarForm.onRejectBefore && typeof (KStarForm.onRejectBefore) == "function") {
            if (KStarForm.onRejectBefore(sender)) {
                KStarForm.reject(sender, KStarForm.onRejectAfter);
            }
            else {
                sender.btnDisabled = false;
                return false;
            }
        }
        else {
            KStarForm.reject(sender, KStarForm.onRejectAfter);
        }
    },
    //转办
    formRedirect: function (sender, obj) {
        if (KStarForm.vmFormData.vmOperation.ToUsers.length > 0) {
            KStarForm.vmFormData.vmOperation.ToUsers.splice(0, KStarForm.vmFormData.vmOperation.ToUsers.length);
        }
        KStarForm.vmFormData.vmOperation.ToUsers.push(obj);
        if (KStarForm.vmFormData.vmOperation.ToUsers.length == 0) {
            alertInfo.call(sender, KStarForm.VM.$t("KStarForm.SelectRedirectUser")); //请选择转办人
            return false;
        }

        if (KStarForm.onRedirectBefore && typeof (KStarForm.onRedirectBefore) == "function") {
            if (KStarForm.onRedirectBefore(sender)) {
                KStarForm.redirect(sender, KStarForm.onRedirectAfter);
            }
            else {
                sender.btnDisabled = false;
                return false;
            }
        }
        else {
            KStarForm.redirect(sender, KStarForm.onRedirectAfter);
        }
    },
    //撤回
    formWithdrawn: function (sender) {

        if (KStarForm.onWithdrawnBefore && typeof (KStarForm.onWithdrawnBefore) == "function") {
            if (KStarForm.onWithdrawnBefore(sender)) {
                KStarForm.Withdrawn(sender, KStarForm.onWithdrawnAfter);
            }
            else {
                sender.btnDisabled = false;
                return false;
            }
        }
        else {
            KStarForm.Withdrawn(sender, KStarForm.onWithdrawnAfter);
        }
    },
    //沟通
    formCommunication: function (sender, arrayobj) {//沟通可以多个人


        KStarForm.vmFormData.vmOperation.ToUsers = arrayobj;
        if (KStarForm.vmFormData.vmOperation.ToUsers.length == 0) {
            alertInfo.call(sender, KStarForm.VM.$t("KStarForm.SelectCommunicationUser")); //请选择沟通人
            return false;
        }

        if (KStarForm.onCommunicationBefore && typeof (KStarForm.onCommunicationBefore) == "function") {
            if (KStarForm.onCommunicationBefore(sender)) {
                KStarForm.communication(sender, KStarForm.onCommunicationAfter);
            }
            else {
                sender.btnDisabled = false;
                return false;
            }
        }
        else {
            KStarForm.communication(sender, KStarForm.onCommunicationAfter);
        }
    },
    //取消沟通
    formCancelCommunicate: function (sender) {

        if (KStarForm.onCancelCommunicateBefore && typeof (KStarForm.onCancelCommunicateBefore) == "function") {
            if (KStarForm.onCancelCommunicateBefore(sender)) {
                KStarForm.cancelCommunicate(sender, KStarForm.onCancelCommunicateAfter);
            }
            else {
                sender.btnDisabled = false;
                return false;
            }
        }
        else {
            KStarForm.cancelCommunicate(sender, KStarForm.onCancelCommunicateAfter);
        }
    },
    //沟通反馈
    formCommunicateFeedback: function (sender) {

        if (KStarForm.onCommunicateFeedbackBefore && typeof (KStarForm.onCommunicateFeedbackBefore) == "function") {
            if (KStarForm.onCommunicateFeedbackBefore(sender)) {
                KStarForm.communicateFeedback(sender, KStarForm.onCommunicateFeedbackAfter);
            }
            else {
                sender.btnDisabled = false;
                return false;
            }
        }
        else {
            KStarForm.communicateFeedback(sender, KStarForm.onCommunicateFeedbackAfter);
        }
    },
    //传阅
    formCirculate: function (sender, arrayobj) {
        KStarForm.vmFormData.vmOperation.ToUsers = arrayobj;
        if (KStarForm.vmFormData.vmOperation.ToUsers.length == 0) {
            alertInfo.call(sender, KStarForm.VM.$t("KStarForm.SelectCirculateUser")); //请选择传阅人
            return false;
        }
        if (KStarForm.onCirculateBefore && typeof (KStarForm.onCirculateBefore) == "function") {
            if (KStarForm.onCirculateBefore(sender)) {
                KStarForm.circulate(sender, KStarForm.onCirculateAfter);
            }
            else {
                sender.btnDisabled = false;
                return false;
            }
        }
        else {
            KStarForm.circulate(sender, KStarForm.onCirculateAfter);
        }
    },
    //拒绝
    formRefused: function (sender) {
        if (KStarForm.onRefusedBefore && typeof (KStarForm.onRefusedBefore) == "function") {
            if (KStarForm.onRefusedBefore(sender)) {
                KStarForm.Refused(sender, KStarForm.onRefusedAfter);
            }
            else {
                sender.btnDisabled = false;
                return false;
            }
        }
        else {
            KStarForm.Refused(sender, KStarForm.onRefusedAfter);
        }
    },
    //订阅
    formSubscribe: function (sender) {
        if (KStarForm.onSubscribeBefore && typeof (KStarForm.onSubscribeBefore) == "function") {
            if (KStarForm.onSubscribeBefore(sender)) {
                KStarForm.Subscribe(sender, KStarForm.onSubscribeAfter);
            }
            else {
                sender.btnDisabled = false;
                return false;
            }
        }
        else {
            KStarForm.Subscribe(sender, KStarForm.onSubscribeAfter);
        }
    },
    //取消订阅
    formCancelSubscribe: function (sender) {
        if (KStarForm.onCancelSubscribeBefore && typeof (KStarForm.onCancelSubscribeBefore) == "function") {
            if (KStarForm.onCancelSubscribeBefore(sender)) {
                KStarForm.CancelSubscribe(sender, KStarForm.onCancelSubscribeAfter);
            }
            else {
                sender.btnDisabled = false;
                return false;
            }
        }
        else {
            KStarForm.CancelSubscribe(sender, KStarForm.onCancelSubscribeAfter);
        }
    },
    //查看流程图
    viewWorkflow: function (sender) {
        window.open("/ViewFlow?FormId=" + sender.$root.vmFormInstance.Id, "_blank");
    },
    /**方法**/
    //流程走向
    ProcPrediction: function (sender, callback, visible) {
        this.actValiate(sender, "procprediction", function (sender) {
            if (KStarForm.vmFormData.vmFormInstance.ApplicantPositionName === null) {
                alertInfo.call(sender, KStarForm.VM.$t("KStarForm.SelectApplicantPost")); //请选择申请人岗位
                sender.btnDisabled = false;
                return false;
            }
            if (KStarForm.vmFormData.vmOperation.ProcessData.length == 0) {
                var data = JSON.parse(KStarForm.toJsonString());
                data.Operation.ManualUserActivity = [];
                var postUrl = getControllerName() + "/ProcPrediction" + geturlParam();
                $post(postUrl, { jsonData: JSON.stringify(data) }, function (response) {
                    if (response.status == 200 && response.data) {

                        //把所有需要手选的节点，都初始化到手选数据中
                        _.each(response.data.data, function (act) {
                            if (act.ProcessingSource == 2 || act.ProcessingSource == 3) {
                                var manualUsers = _.find(KStarForm.vmFormData.vmOperation.ManualUsers, { ActivityName: act.ActivityName });
                                if (!manualUsers) {
                                    var actManualUsers = {
                                        IsChange: false,//虚拟属性，指用户是否编辑过此节点
                                        ActivityName: act.ActivityName,
                                        Approvers: []
                                    };

                                    KStarForm.vmFormData.vmOperation.ManualUsers.push(actManualUsers);
                                }
                            }
                        });
                        //如果之前有存在的手选人数据  两个数据源数据同步
                        if (KStarForm.vmFormData.vmOperation.ManualUsers.length > 0) {
                            var actNames = [];
                            _.each(KStarForm.vmFormData.vmOperation.ManualUsers, function (act) {
                                var temp = _.filter(actNames, { ActivityName: act.ActivityName });
                                if (temp.length == 0) {
                                    actNames.push({ ActivityName: act.ActivityName });
                                }
                            });
                            _.each(actNames, function (act) {
                                var userAct = _.find(response.data.data, function (o) {
                                    return o.ActivityName == act.ActivityName;
                                });
                                if (userAct) {
                                    //如果在手选数据在本次的走向中存在，并且是这个环节手选，就还原数据
                                    if (userAct.ProcessingSource == 2 || userAct.ProcessingSource == 3) {
                                        //互相还原 可能走向中就有处理人
                                        var actManualUsers = _.find(KStarForm.vmFormData.vmOperation.ManualUsers, { ActivityName: act.ActivityName });
                                        //如果用户已经编辑了数据，就不再还原
                                        if (!actManualUsers.IsChange) {
                                            //走向人员数据 同步到 手选数据
                                            if (userAct.Approvers.length > 0) {
                                                //还原默认处理人到手选环节
                                                _.each(userAct.Approvers, function (u) {
                                                    var tempModel = _.filter(actManualUsers.Approvers, { Approver: u.UserAccount });
                                                    if (tempModel.length == 0) {
                                                        //不存在，添加
                                                        var manualUser = {
                                                            Approver: u.UserAccount,
                                                            ApproverName: u.UserDisplayName,
                                                            ApproverType: 'User',//目前默认处理人只能是人员
                                                            UserPositionId: u.UserPositionId,
                                                            UserPositionName: u.UserPositionName
                                                        };
                                                        actManualUsers.Approvers.push(manualUser);
                                                    }
                                                });
                                            }
                                        }

                                        //手选数据 同步到 走向人员数据
                                        if (actManualUsers) {
                                            var users = [];
                                            if (actManualUsers.Approvers.length > 0) {
                                                _.each(actManualUsers.Approvers, function (mu) {
                                                    var actProcPredictionUser = {
                                                        UserAccount: mu.Approver,
                                                        UserDisplayName: mu.ApproverName,
                                                        UserPositionId: mu.UserPositionId,
                                                        UserPositionName: mu.UserPositionName,
                                                        UserStatus: '1',
                                                    };
                                                    users.push(actProcPredictionUser);
                                                });
                                            }
                                            userAct.Approvers = users;
                                            var userName = userAct.Approvers.map(function (item) {
                                                return item.UserDisplayName;
                                            }).join();
                                            userAct.ApproverName = userName;
                                        }
                                    }
                                    else {
                                        KStarForm.vmFormData.vmOperation.ManualUsers = _.reject(KStarForm.vmFormData.vmOperation.ManualUsers, { ActivityName: act.ActivityName });
                                    }
                                }
                                else {
                                    //如果不存在，就删除手选数据
                                    KStarForm.vmFormData.vmOperation.ManualUsers = _.reject(KStarForm.vmFormData.vmOperation.ManualUsers, { ActivityName: act.ActivityName });
                                }
                            });
                        }

                        KStarForm.vmFormData.vmProcPrediction = response.data.data;
                        sender.visible = visible;
                        (callback && typeof (callback) == "function") && callback(sender);

                    } else {
                        alertInfo.call(sender, response.data.message);
                    }
                }, function (error) {
                    KStarForm.error(error, sender);
                });
            }
            else {
                //代码需要调整，等通用接口出来再一起调用  --封林
                //自由流
                var manualUserActivity = [];//
                var procPrediction = [];
                var sort = 1;
                _.each(KStarForm.vmFormData.vmOperation.ProcessData, function (item) {
                    var proc = {
                        ActivityDisplayName: item.ActivityDisplayName,
                        ActivityID: item.Id,
                        ActivityName: item.ActivityName,
                        ApproverName: "",
                        Approvers: [],
                        DateTimeNow: new Date(),
                        ProcessingSource: item.ProcessingSource,
                        Sort: sort,
                        StartTime: null,
                        Status: 0
                    };
                    var userName = "";
                    _.each(item.ActInstApprovers, function (p) {
                        proc.Approvers.push({ UserAccount: p.Approver, UserDisplayName: p.ApproverName });
                        userName = userName + p.ApproverName + ",";
                    });
                    proc.ApproverName = userName.substr(0, userName.length - 1);

                    if (proc.ProcessingSource != 1) {
                        //手选
                        var required = false;
                        if (item.NoneProcessing == 1) {
                            required = true;
                        }
                        var manualUser = {
                            ActivityID: proc.ActivityID,
                            ActivityName: proc.ActivityName,
                            ActivityDisplayName: proc.ActivityDisplayName,
                            ProcessingSource: proc.ProcessingSource,
                            NoneProcessing: item.NoneProcessing,
                            Required: required,
                            Approvers: proc.Approvers,
                            ApproverName: proc.ApproverName
                        };
                        manualUserActivity.push(manualUser);
                    }
                    var manualUser = {};

                    sort++;
                    procPrediction.push(proc);
                });
                //添加结束节点
                var proc = {
                    ActivityDisplayName: "结束",
                    ActivityID: "end",
                    ActivityName: "结束",
                    ApproverName: "",
                    Approvers: [],
                    DateTimeNow: new Date(),
                    ProcessingSource: 1,
                    Sort: sort,
                    StartTime: null,
                    Status: 0
                };
                procPrediction.push(proc);
                KStarForm.vmFormData.vmProcPrediction = procPrediction;
                sender.visible = visible;
                (callback && typeof (callback) == "function") && callback(sender);
            }
        });
    },
    //申请人change
    applicantChange: function (value) {

        _.forEach(this.vmFormData.vmFormInstance.ApplicationUserList, function (el, key) {
            if (el.UserAccount == value) {
                KStarForm.vmFormData.vmFormInstance.ApplicantDisplayName = el.UserDisplayName;
                KStarForm.vmFormData.vmFormInstance.ApplicantTel = el.Telephone;
                KStarForm.vmFormData.vmFormInstance.ApplicantEmail = el.Email;
                return;
            }
            //console.log(el);
        });
    },
    //申请人岗位change
    positionChange: function (value) {

        _.forEach(this.vmFormData.vmFormInstance.UserPosList, function (el, key) {
            if (el.OrgPosSysId == value) {
                KStarForm.vmFormData.vmFormInstance.ApplicantPositionName = el.PosName;

                KStarForm.vmFormData.vmFormInstance.ApplicantOrgId = el.OrgSysId;
                KStarForm.vmFormData.vmFormInstance.ApplicantOrgName = el.OrgName;
            }
        });
        var url = getControllerName() + "/GetApplicantCompanyInfo";
        $post(url, { orgSysId: KStarForm.vmFormData.vmFormInstance.ApplicantOrgId }, function (response) {
            //console.log(response);
            if (response.status == 200) {
                //绑定vue前端
                KStarForm.vmFormData.vmFormInstance.ApplicantCompanyId = response.data.SysId;
                KStarForm.vmFormData.vmFormInstance.ApplicantCompanyName = response.data.Name;
            }
        }, function (error) {
            console.log(error);
        });
    },
    //初始化表单基本信息模块
    initPlatformPart: function () {
        //初始化表单固定部分
        //申请人数据  TODO...remove
        var url = getControllerName() + "/GetApplicationUserList";
        $post(url,
            { userAccount: KStarForm.vmFormData.vmFormInstance.SubmitterAccount, appUserAccount: KStarForm.vmFormData.vmFormInstance.ApplicantAccount, processCode: KStarForm.vmFormData.vmFormInstance.ProcessCode },
            function (response) {
                if (response.status == 200) {
                    //绑定vue前端
                    KStarForm.vmFormData.vmFormInstance.ApplicationUserList = response.data.data;
                }

            },
            function (error) {
                console.log(error);
            });
        //申请人岗位类别
        //var url = getControllerName() + "/GetUserPostionOrgInfo";
        //$post(url, { userAccount: KStarForm.vmFormData.vmFormInstance.ApplicantAccount, processCode: KStarForm.vmFormData.vmFormInstance.ProcessCode  },
        //    function (response) {
        //        if (response.status == 200) {
        //            //绑定vue前端
        //            KStarForm.vmFormData.vmFormInstance.UserPosList = response.data.data;
        //        }
        //    },
        //    function (error) {
        //        alertInfo.call(null, error.response.data.message);
        //    });

        //数据处理
        if (KStarForm.vmFormData.vmFormType == "Application") {
            KStarForm.vmFormData.vmFormInstance.SubmitDate = moment().format('YYYY-MM-DD HH:mm');//发起时间
        } else {
            var date = KStarForm.vmFormData.vmFormInstance.SubmitDate;
            if (date) {
                date = parseInt(date.replace("/Date(", "").replace(")/", ""));
                var day = moment(date);
                KStarForm.vmFormData.vmFormInstance.SubmitDate = day.format('YYYY-MM-DD HH:mm');
            }
        }
        //处理日志
        var formApprovalHistorys = this.vmFormData.vmFormApprovalHistorys;

        _.each(formApprovalHistorys, function (item, index) {
            if (item.ActionType == "AdminReActivated") {
                item.ActivityName = "管理员运维(重新激活)";
            }
            if (item.ActionType == "SaveDraft") {
                item.ActivityName = "管理员运维";//特殊处理一下，保存草稿不显示出来
            }
            else {
                if (!item.label) {
                    item.label = index;//标记
                    var nextIndex = 0;
                    var list = _.filter(formApprovalHistorys, function (o, key) {   //找出连续出现的节点
                        if (item.ActivityId == 0) {
                            //管理员运维特殊处理 
                            if (item.ActivityId == o.ActivityId && item.ActivityName == o.ActivityName && key > index) {
                                nextIndex = nextIndex + 1;//记数
                                //是否是连续的
                                if ((index + nextIndex) == key) {
                                    return item;
                                }
                            }
                        }
                        else {
                            //正常节点只需要判断ActivityId
                            return item.ActivityId == o.ActivityId && item.ActivityName == o.ActivityName && key > index;
                        }
                    });
                    if (list.length > 0) {
                        //为相同节点添加标记
                        _.each(list, function (o) {
                            o.label = item.label;
                        });
                    }
                }
            }
        });
        var group = _.groupBy(formApprovalHistorys, 'label');//分组
        var actApprovalHistoryList = [];
        _.forEach(group, function (el, index) {
            actApprovalHistoryList.push({
                ActivityName: el[0].ActivityDisplayName,
                actApprovalHistorys: el
            });
        });
        this.vmFormData.vmFormApprovalHistorys = actApprovalHistoryList;

    },
    //初始化数据到vmFormData及初始化处理
    initFormData: function (sender) {

        this.formModel.FormInstance.UserPosList = [];
        this.formModel.FormInstance.ApplicationUserList = [];
        this.vmFormData.vmFormInstance = JSON.parse(JSON.stringify(this.formModel.FormInstance));
        var formDataToJson = JSON.parse(this.formModel.FormContent.FormDataToJson);
        //合并数据项
        try {
            this.vmFormData.vmFormContent = _.assign(FormContentModel, formDataToJson);
        } catch (e) {
            this.vmFormData.vmFormContent = formDataToJson; //如果没有定义就不合并
        }

        if (!this.vmFormData.vmFormContent) {
            this.vmFormData.vmFormContent = {};
        }

        this.vmFormData.vmKStarFormButtons = this.formModel.KStarFormButtons;//按钮 只读信息
        this.vmFormData.vmOperation = this.formModel.Operation;//操作处理Dto
        this.vmFormData.vmBackActivitys = this.formModel.KStarFormBackActivity;//可退回节点 只读信息
        this.formModel.KStarFormSetting.FileFormatReplace = this.formModel.KStarFormSetting.FileFormat.replace(/\*/g, '');//附件类型 只读信息
        this.vmFormData.vmFormSetting = this.formModel.KStarFormSetting;//表单配置 只读信息
        this.vmFormData.vmFormApprovalHistorys = this.formModel.ApprovalRecord;//审批历史 只读信息
        this.vmFormData.vmFormCirculateRecord = this.formModel.CirculateRecord; // 订阅记录 只读信息
        this.vmFormData.vmFormSubscribeRecord = this.formModel.SubscribeRecord; //传阅记录 只读信息
        //页面类型
        //缺省值：Draft(草稿)\Application(申请)\Approval(审批)\Communicated(沟通（沟通出去后）)\CommunicateFeedback(沟通反馈页面)\ReApproval(重新提交)\View(查看)
        this.vmFormData.vmFormType = this.formModel.FormType;//页面类型  只读
        this.vmFormData.vmUserLanguages = this.formModel.UserLanguages;//只读
        this.vmFormData.vmIsUrgencyShow = this.formModel.IsUrgencyShow;//只读
        this.vmFormData.vmProcessRoute = this.formModel.ProcessRoute;//只读

        this.vmFormData.vmFormAttachments = JSON.parse(JSON.stringify(this.formModel.FormAttachments));//附件
        //给一个默认的值，不然会显示一个GUID
        this.vmFormData.vmFormInstance.UserPosList = [{ "OrgPosSysId": this.vmFormData.vmFormInstance.ApplicantPositionId, "PosName": this.vmFormData.vmFormInstance.ApplicantPositionName, "OrgSysId": this.vmFormData.vmFormInstance.ApplicantOrgId, "OrgName": this.vmFormData.vmFormInstance.ApplicantOrgName, "PositionSysId": "00000000-0000-0000-0000-000000000000", "Score": 10000 }];
        //if (document.getElementById('app')) {
        //    document.getElementById('app').style.visibility = 'visible';
        //}

        //更新标签标题
        document.title = this.formModel.FormInstance.ProcessName;

        if (window.IsEnabledLog) {
            //记录访问日志
            //setInterval(function () {
            //    KStarForm.logData()
            //}, 15000);//15s
            window.onload = KStarForm.logCloseData;
            window.addEventListener('unload', KStarForm.logCloseData, false);
        }

        this.initPlatformPart();
        //初始化数据之后事件
        if (KStarForm.initFormDataAfter && typeof (KStarForm.initFormDataAfter) == "function") {
            KStarForm.initFormDataAfter();
        }

        if (KStarForm.vmFormData.vmOperation.ProcessData.length > 0) {
            //自由流
            var manualUserActivity = [];//
            var procPrediction = [];
            var sort = 1;
            _.each(KStarForm.vmFormData.vmOperation.ProcessData, function (item) {
                var proc = {
                    ActivityDisplayName: item.ActivityDisplayName,
                    ActivityID: item.Id,
                    ActivityName: item.ActivityName,
                    ApproverName: "",
                    Approvers: [],
                    DateTimeNow: new Date(),
                    ProcessingSource: item.ProcessingSource,
                    Sort: sort,
                    StartTime: null,
                    Status: 0
                };
                var userName = "";
                _.each(item.ActInstApprovers, function (p) {
                    proc.Approvers.push({ UserAccount: p.Approver, UserDisplayName: p.ApproverName });
                    userName = userName + p.ApproverName + ",";
                });
                proc.ApproverName = userName.substr(0, userName.length - 1);

                if (proc.ProcessingSource != 1) {
                    //手选
                    var required = false;
                    if (item.NoneProcessing == 1) {
                        required = true;
                    }
                    var manualUser = {
                        ActivityID: proc.ActivityID,
                        ActivityName: proc.ActivityName,
                        ActivityDisplayName: proc.ActivityDisplayName,
                        ProcessingSource: proc.ProcessingSource,
                        NoneProcessing: item.NoneProcessing,
                        Required: required,
                        Approvers: proc.Approvers,
                        ApproverName: proc.ApproverName
                    };
                    manualUserActivity.push(manualUser);
                }
                var manualUser = {};

                sort++;
                procPrediction.push(proc);
            });
            //添加结束节点
            var proc = {
                ActivityDisplayName: "结束",
                ActivityID: "end",
                ActivityName: "结束",
                ApproverName: "",
                Approvers: [],
                DateTimeNow: new Date(),
                ProcessingSource: 1,
                Sort: sort,
                StartTime: null,
                Status: 0
            };
            procPrediction.push(proc);
            KStarForm.vmFormData.vmProcPrediction = procPrediction;
        }

        KStarForm.formLoadComplete();
    },
    //表单加载完成
    formLoadComplete: function () {
        //页面加载完成添加水印
        setTimeout(function () {
            WaterMark({ watermark_txt: watermark_txt });
        }, 100);

        if (window.parent != window) {//存在父窗体时才接收消息
            //流程测试传输加载完成
            window.parent.postMessage({ source: 'ProcessTest', eventType: 'FormLoadComplete' }, '*');
        }

    },
    //合并Vue中数据到formModel
    togetherFormModel: function () {
        if (this.formModel.FormContent.FormDataToJson != JSON.stringify(this.vmFormData.vmFormContent) || this.formModel.FormInstance != JSON.parse(JSON.stringify(this.vmFormData.vmFormInstance))) {
            this.formModel.IsFormChange = true;
            this.formModel.FormInstance = JSON.parse(JSON.stringify(this.vmFormData.vmFormInstance));
            this.formModel.FormContent.FormDataToJson = JSON.stringify(this.vmFormData.vmFormContent);
        }
        if (JSON.stringify(this.formModel.FormAttachments) != JSON.stringify(this.vmFormData.vmFormAttachments)) {
            this.formModel.IsAttachmentChange = true;
            this.formModel.FormAttachments = JSON.parse(JSON.stringify(this.vmFormData.vmFormAttachments));
        }
        this.formModel.Operation = this.vmFormData.vmOperation;
    },
    //获取formModel字符串
    toJsonString: function () {
        this.togetherFormModel();
        return JSON.stringify(this.formModel);
    },
    //收集URL参数
    getQuerymodel: function () {
        var processCode = getQueryString("ProcessCode");
        var formId = getQueryString("FormId");
        var draftId = getQueryString("DraftId");
        var SN = getQueryString("SN");
        var workId = getQueryString("WorkId");
        var sharedUser = getQueryString("SharedUser");
        var url = window.location.href;
        var ccId = getQueryString("CcId");
        return {
            ProcessCode: processCode,
            FormId: formId,
            DraftId: draftId,
            SN: SN,
            WorkId: workId,
            SharedUser: sharedUser,
            Url: url,
            CcId: ccId
        }
    },
    //获取数据 
    applyData: function (sender) {

        var queryObj = this.getQuerymodel();
        var url = getControllerName() + "/GetFormData" + geturlParam();
        $post(url, queryObj, function (response) {
            if (response.status == 200) {
                response.data.UserLanguages = getVueLang(response.data.UserLanguages);

                //绑定vue前端
                var data = response.data;
                KStarForm.formModel = data;
                KStarForm.initFormData(sender);
            }

        }, function (error) {
            KStarForm.error(error, sender);
        });
    },
    //绑定
    applyBinding: function () {

        //注册i18n实例并引入语言文件
        var messages = KStarFormLang;
        messages = getLangMessages();
        var i18n = new VueI18n({
            locale: "cn",
            messages: messages
        });

        this.VM = new Vue({
            el: '#app',
            i18n: i18n,
            mixins: [KStarForm.formModelExtend],
            data: KStarForm.vmFormData,
            created: function () {
                KStarForm.applyData(this);

            },
            methods: {
            },
            computed: {

            }
        })
    },
    //初始化
    init: function () {
        this.applyBinding();
    }
};


