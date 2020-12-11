/*
 * @Description:头部转办按钮
 * @Author:ytwang
 * @Date:2019-05-22 14:07:21
 * @LastEditors:ytwang
 * @LastEditTime:2019-05-25 10:13:24
 */

//var url = "/UserPicker/index.html#/iframeDialogChoosen?mutilselect=false&picktype=User&compName=UserPick&Environment=KStarForm";
var templateContent = '\
    <el-dialog :title="parmdialog.title" :visible.sync="parmdialog.dialogvisible" width="750px" v-on:opened="handleOpen" :before-close="handleClose"  class="userpick-dialog-style" append-to-body>\
        <div> \
            <div style="width:750px;background-color:white;height:550px;overflow: hidden; margin: -30px -20px;margin-left:-21px;">\
            <iframe id="userpickurl" ref="userpickurl" :src="url"  style="width:100%;height: 705px;margin-top:-153px;overflow: hidden;" scrolling="no"></iframe>\
        </div></div>\
    </el-dialog>\
';
var UserPick = Vue.extend({
    template: templateContent,
    props: ['parmdialog'],
    data: function () {
        return {
            loading: false,
            UserSelectData: [] ,//返回值
            url: ''
        }
    },
    created: function () {
        
    },
    mounted: function () {
        var _this = this;
        this.url = "/UserPicker/index.html#/iframeDialogChoosen?mutilselect=" + this.parmdialog.multiplelimit + "&picktype=" + this.parmdialog.type + "&activityID=" + this.parmdialog.activityID + "&applicantOrgId=" + this.parmdialog.applicantOrgId + "&isProxyProcess=" + this.parmdialog.isProxyProcess + "&compName=" + this.parmdialog.ctype + "&Environment=KStarForm";
        if (this.parmdialog.orgList != undefined) {
            this.url = this.url+ "&orgList=" + this.parmdialog.orgList
        }

    },
    methods: {
        //关闭弹窗
        handleClose: function () {
            this.$emit('closedialog', false)
            this.UserSelectData = []
        },
        //打开弹窗
        handleOpen: function () {
            
        },
        emitdata: function (key, data) {
            if (key === "setCss") {
                var _that = this;
                if (_that.parmdialog.json != undefined && _that.parmdialog.json.length > 0) {
                    var iframe = this.$refs.userpickurl;// document.getElementById("userpickurl");
                    if (iframe) {
                        //选人控件消息监听事件加载后再执行
                        iframe.contentWindow.postMessage({ key: 'init', data: _that.parmdialog.json }, '*');
                        console.log(_that.parmdialog.json, 'init');
                    }
                }
            }
            if (key === 'ok') {
                this.UserSelectData = data;
                this.$emit('requseturl', this.UserSelectData, this.parmdialog);
                this.handleClose();
            }
            if (key === 'close') {
                this.handleClose();
            }

        }
    },
    watch: {
        parmdialog: {
            immediate: true,
            deep: true,
            handler: function (n, o) {
                if (n.dialogvisible) {
                    _that = this;
                    this.url = "/UserPicker/index.html#/iframeDialogChoosen?mutilselect=" + n.multiplelimit + "&picktype=" + n.type + "&activityID=" + this.parmdialog.activityID + "&isProxyProcess=" + this.parmdialog.isProxyProcess + "&applicantOrgId=" + this.parmdialog.applicantOrgId+ "&compName=" + n.ctype + "&Environment=KStarForm";
                    if (this.parmdialog.orgList != undefined) {
                        this.url = this.url + "&orgList=" + this.parmdialog.orgList
                    }
                    window.onmessage = function (e) {
                        _that.emitdata(e.data.key, e.data.data);
                    };
                } else {
                    this.url = "";

                }
            }
        }

    }

});
// 注册
Vue.component('userpick', UserPick);


