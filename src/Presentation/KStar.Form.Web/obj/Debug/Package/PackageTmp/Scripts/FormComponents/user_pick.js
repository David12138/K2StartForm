/*
 * @Description: 自动渲染选人控件
 * @Author: wangjingjing86
 * @Date: 2019-11-01 14:07:21
 * @LastEditors: 
 * @LastEditTime: 
 */
var templateContent = '\
<div class="header-subtitle">\
    <mobileuserpick :pop-visible="parmdialog.mobiledialogvisible" :multiple="parmdialog.multiplelimit" :title="parmdialog.title" :params="parmdialog" v-on:closedialog = "closedialog" v-on:change="userpickCallback" v-if="parmdialog.mobiledialogvisible" :type="parmdialog.clicktype"></mobileuserpick>\
    <userpick :parmdialog = "parmdialog" v-on:closedialog = "closedialog" v-on:requseturl = "userpickCallback"></userpick>\
        <el-form-item :prop="prop" :rules="rules">\
            <el-input v-model="userName" size="mini" :disabled="disabled ? disabled : false" v-on:focus="addUser" readonly>\
                <i slot="suffix" class="iconfont iconrenyuan" v-if="disabled ? false : true" v-on:click="addUser"/>\
                <!--<el-button slot="append" v-on:click="addUser"  icon="ic-people"></el-button>-->\
            </el-input>\
        </el-form-item>\
</div>\
';
var VueUserPick = Vue.extend({
    template: templateContent,
    // index:如果是列表中使用，用于标识行号
    props: ["value", "prop", "required", "disabled", "returntype", "index", "ctype", "orglist", "multilselect"],
    data: function () {
        var result = {
            selectUser: this.value,
            parmdialog: {
                dialogvisible: false,
                clicktype: '',
                multiplelimit: false,
                mobiledialogvisible: false
            },
            arrayindex: this.index,
            userName: this.value,
            returnType: this.returntype,
            rules: [],
            userArray: []
        };
        if (this.required) {
            //result.rules = [{ required: this.required, message: KStarForm.VM.$t("KStarForm.SelectUser") }];
            result.rules = [{ required: this.required, message: '请选择' }];
        }
        if (result.returnType == "array") {
            if (this.value && this.value.length > 0) {
                var name = '';
                _.forEach(this.value, function (item, index) {
                    name = name + (name == '' ? '' : ',') + item.UserDisplayName;
                });
                result.userName = name;
            }
        } else if (result.returnType == "displayname") {
            result.userName = this.value;
        }
        return result;
    },
    mounted: function () {
        if (this.orglist != undefined && this.orglist != "") {
            var orgListArray = this.orglist.split(',');
            this.parmdialog.orgList = orgListArray;
        }
    },
    methods: {
        addUser: function () {
            var _multiplelimit = this.multilselect;
            if (_multiplelimit == undefined || _multiplelimit == "")
                _multiplelimit = false;
            else
                _multiplelimit = this.multilselect === "false" ? false : true; 
            this.showdialog("FormCC", _multiplelimit);
        },
        //打开弹窗
        showdialog: function (val, multiple) {
            //debugger;
            if (document.body.clientWidth > 767) {
                this.parmdialog.dialogvisible = true;
            } else {
                this.parmdialog.mobiledialogvisible = true;
            }
            this.parmdialog.clicktype = val;
            // this.parmdialog.dialogvisible = true;
            //this.parmdialog.type = "User"; //只选人员
            //debugger;
            if (this.ctype == undefined || this.ctype == null)
                this.parmdialog.type = "User"; //只选人员
            else
                this.parmdialog.type = this.ctype; //选人类型，可选: 用户/组织/角色等
            this.parmdialog.ctype = "UserPick"; //选人控件
            this.parmdialog.title = "";//KStarForm.VM.$t("KStarForm.SelectUser"); //弹出框标题  请选择抄送人员
            this.parmdialog.multiplelimit = multiple; //是否多选

            //03.20 添加已中人员的回显
            var uarry = [];
            this.userArray.forEach(function (item) {
                var user = {
                    Type: 'User',
                    Value: item.UserAccount,
                    Name: item.UserDisplayName
                };
                uarry.push(user);
            })

            this.parmdialog.json = uarry;
        },
        //关闭弹窗
        closedialog: function (val) {
            this.parmdialog.dialogvisible = false;
            this.parmdialog.mobiledialogvisible = false
        },
        userpickCallback: function (val, type) {
            var name = '';
            var arry = [];
            if (val.length > 0) {
                _.forEach(val, function (el, index) {
                    arry.push({
                        UserAccount: el.Value,
                        UserDisplayName: el.Name,
                        UserOrgFullPath: el.OrgFullPath,
                        UserZOrgID: el.ZOrgId
                    });
                    name = name + (name == '' ? '' : ',') + el.Name;
                });
                this.userName = name;
            } else {
                this.userName = "";
            }
            var returnvalue = this.userName;
            //2020.03.20解决数据列表中选人控件无法获取到OrgID、组织等信息
            //if (this.returnType == "displayname") {
            //    returnvalue = this.userName;
            //} else {
            //    returnvalue = arry;
            //}
            returnvalue = arry;
            this.userArray = arry;
            this.$emit('user-change', returnvalue, this.arrayindex);
            this.parmdialog.mobiledialogvisible = false;
        }
    }
});
// 注册
Vue.component('user_pick', VueUserPick);