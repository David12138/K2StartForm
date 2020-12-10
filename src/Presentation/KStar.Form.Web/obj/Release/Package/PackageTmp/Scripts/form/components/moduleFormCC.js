/*
 * @Description: 申请抄送
 * @Author: ytwang
 * @Date: 2019-05-22 14:07:21
 * @LastEditors: ytwang
 * @LastEditTime: 2019-05-23 10:19:01
 */
var templateContent = '\
<div class="header-subtitle">\
<mobileuserpick :pop-visible="parmdialog.mobiledialogvisible" :multiple="parmdialog.multiplelimit" :title="parmdialog.title"  v-on:closedialog = "closedialog" v-on:change="userpickCallback" v-if="parmdialog.mobiledialogvisible" :type="parmdialog.clicktype"></mobileuserpick>\
    <userpick :parmdialog = "parmdialog" v-on:closedialog = "closedialog" v-on:requseturl = "userpickCallback"></userpick>\
    <el-form label-width="120px" label-position="right" class="custom-reset-styles addUser"  size="mini">\
        <el-form-item :label="$t(\'KStarForm.Circulate\')">\
            <el-input v-model="userName" size="mini" readonly v-on:click.native="addUser">\
                <i slot="suffix" class="iconfont iconrenyuan"  v-on:click="addUser"/>\
                <!--<el-button slot="append" v-on:click="addUser"  icon="ic-people"></el-button>-->\
            </el-input>\
        </el-form-item>\
    </el-form>\
</div>\
';
var moduleFormCC = Vue.extend({
    template: templateContent,
    props: [ 'formoperationmodel'],
    data: function () {
        return {
            parmdialog: {
                dialogvisible: false,
                clicktype: '',
                multiplelimit: false,
                mobiledialogvisible: false
            },
            userName:''
        };
    },
    methods: {
        addUser: function () {
            this.showdialog("FormCC",true);
        },
        //打开弹窗
        showdialog: function (val, multiple) {
            if (document.body.clientWidth > 767) {
                this.parmdialog.dialogvisible = true;
            } else {
                this.parmdialog.mobiledialogvisible = true;
            }
            this.parmdialog.clicktype = val;
            // this.parmdialog.dialogvisible = true;
            this.parmdialog.type = "User"; //只选人员
            this.parmdialog.ctype = "UserPick"; //选人控件
            this.parmdialog.title = KStarForm.VM.$t("KStarForm.SelectCirculateUser"); //弹出框标题  请选择抄送人员
            this.parmdialog.multiplelimit = multiple; //是否多选
            //回显
            var arry = []
            KStarForm.vmFormData.vmOperation.StartCCUsers.forEach(function (item) {
                var user = {
                    Type: 'User',
                    Value: item.UserAccount,
                    Name: item.UserDisplayName
                };
                arry.push(user);
            })

            this.parmdialog.json = arry;
        },
        //关闭弹窗
        closedialog: function (val) {
            this.parmdialog.dialogvisible = false;
            this.parmdialog.mobiledialogvisible = false
        },
        userpickCallback: function (val, type) {
            //if (val.length > 0) {  //可删除
            var arry = [];
            _.forEach(val, function (el, index) {
                arry.push({
                    UserAccount: el.Value,
                    UserDisplayName: el.Name
                });
            });

            this.userName = val.map(function (item) {
                return item.Name;
            }).join();
            KStarForm.vmFormData.vmOperation.StartCCUsers = arry;
            //KStarForm.moduleFormCC(this, arry);
            //}
            this.parmdialog.mobiledialogvisible = false
        },
    doToggle: function() {
      this.visiable = !this.visiable;
    }
    },
    watch: {
        'formoperationmodel.StartCCUsers': {
            handler: function (curVal, oldVal) {
                if (curVal) {
                    if (curVal.length > 0) {
                        if (this.userName=='') {
                            var name = '';
                            _.forEach(curVal, function (el, index) {
                                name = name + (name == '' ? '' : ',') + (el.UserDisplayName);
                            });
                            this.userName = name
                        }
                    }
                }
            },
            immediate: true
        }
    }
});
 // 注册
Vue.component('moduleformcc', moduleFormCC);


