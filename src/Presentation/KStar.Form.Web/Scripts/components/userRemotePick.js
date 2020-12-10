/*
 * @Description:头部转办按钮
 * @Author:ytwang
 * @Date:2019-05-22 14:07:21
 * @LastEditors:ytwang
 * @LastEditTime:2019-05-25 10:13:24
 */
var templateContent='\
<el-dialog title="请选择人员"  :visible.sync="parmdialog.dialogvisible" width="30%"  :before-close="handleClose">\
    <el-select   ref="el-select"  v-model="UserSelectData"   :close-on-click-modal="false" multiple filterable  remote  :multiple-limit="parmdialog.multiplelimit" reserve-keyword placeholder="请输入姓名、姓名首字母、姓名全拼、账号进行搜索" :remote-method="BindApplicantSelect"  v-on:change="changeselect"  :loading="loading">\
        <el-option v-for="item in userdata"  :key="item.value"   :label="item.label"  :value="item.value">\
    </el-option>\
    <div v-on:click="loadMore" class="loadmore" v-if="lastData">加载更多</div>\
  </el-select>\
    <span slot="footer" class="dialog-footer">\
        <el-button v-on:click="handleClose">取 消</el-button>\
    <el-button type="primary" v-on:click="submit">确 定</el-button>\
  </span>\
</el-dialog>\
';
var UserPickBool=Vue.extend({
    template:templateContent,
    props:['parmdialog'],
    data:function () {
        return {
            loading:false,
            UserSelectData:[],
            userdata:[],
            tempQuery:'',
            parm:{
                page:1,
                limit:10
            },
            lastData:true,
            sendchilddata:[],
            flag:false,
        }
    },
    created: function() {

    },
    mounted: function() {

    },
    methods:{
        //关闭弹窗
        handleClose: function () {
            this.$emit('closedialog', false)
            this.UserSelectData = []
        },
        //远程搜索
        ApplicantSelect:function (query, loadmore) {
            var that = this;
            if (!loadmore) {
                that.userdata = [];
            }
            that.loading = true;
            that.tempQuery = query
            var data = {
                page:that.parm.page,
                limit:that.parm.limit,
                key:that.tempQuery,
                isLeave:false,
            };
            axios.post("/Portal/UserPick/SearchUser", data).then(function (res) {
                if (res.data.code === 0 && res.data.data.length >= 1) {
                    that.flag = true;
                    if (that.parm.page * that.parm.limit >= res.data.count) {
                        that.lastData = false
                    }
                    _.each(res.data.data, function (item) {
                        return that.userdata.push({
                            value: item.UserDisplayName + "/" + item.UserAccount,
                            label: item.UserDisplayName + item.UserAccount
                        });
                    });
                }

            }).catch(function (err) {
                throw new Error(err);
            })
            that.loading = false;
        },
        //加载更多
        loadMore:function () {
            var list = []
            var that = this;
            that.parm.page += 1;
            that.ApplicantSelect(that.tempQuery, true);
        },
        //远程搜索
        BindApplicantSelect:function (query) {
            var that = this;
            that.tempQuery = query //申请人选人控件搜索方法
            if (query !== '') {
                that.ApplicantSelect(query);
            }
        },
        //确定按钮
        submit: function () {
            this.$emit('requseturl', this.sendchilddata, this.parmdialog);
            this.handleClose();
        },
        //选中值发生改变的时候
        changeselect: function (val) {
           
            this.$refs['el-select'].query = '';
            this.flag = false;
            this.sendchilddata = [];
            //document.querySelector(".el-select-dropdown").style.display = "none"
            for (var i = 0; i < val.length; i++) {
                var list = val[i].split('/')
                this.sendchilddata.push({
                    UserDisplayName:list[0],
                    UserAccount:list[1]
                })
            }
            this.sendchilddata = this.upiq(this.sendchilddata);
        },
        //数组去重
        upiq:function (arr) {
            var result = {};
            var finalResult = [];
            for (var i = 0; i < arr.length; i++) {
                result[arr[i].UserAccount] = arr[i];
            }
            for (item in result) {
                finalResult.push(result[item]);
            }
            return finalResult;
        },
    },
    watch:{
        //监听portal显示那个控件
        flag:{
            handler:function (n, o) {
                if (n) {
                    document.querySelector(".el-select-dropdown").style.display = "block";
                } else {
                    document.querySelector(".el-select-dropdown").style.display = "none";
                }
            }
        }
    }

});
// 注册
Vue.component('userpickbool', UserPickBool);


