/*
 * @Description: 手机选人组件
 * @Author: wsz
 * @Date: 
 * @LastEditors: wsz
 * @LastEditTime: 
 */
var templateContent = '\
    <div v-if="popShow">\
        <el-dialog :visible.sync="popShow" trigger="click" custom-class="mobile mobile-dialog" :fullscreen="true" :show-close="false" >\
            <el-row slot="title" class="van-doc-nav-bar header">\
                <el-row class="title">\
                    <el-col class="left-icon"><i class="el-icon-arrow-left" v-on:click="onClickLeft"></i></el-col>\
                    <el-col>{{ title ? title : \'选人组件\' }}</el-col>\
                    <el-col class="text-align-right right-submit" v-on:click.native="getSubmit">完成</el-col>\
                </el-row>\
                <el-row class="header-search" v-if="backList.length == 0">\
                    <el-input placeholder="请输入内容" v-model="searchValue" size="mini" :disabled="loading">\
                        <i slot="suffix" class="el-input__icon el-icon-search" v-on: v-on:click="getSearch"></i>\
                    </el-input>\
                </el-row>\
                <el-row class="sub-title" v-if="backList.length" style="height:50px;overflow:hidden"><i v-for="(item, index) in backList">{{ item.title }}<em v-if="backList.length - 1 !== index">></em></i></el-row>\
            </el-row>\
            <section class="van-doc-demo-section demo-panel" v-loading="loading">\
                <el-row v-for="(item, index) in tree" :key="item.id" v-on:click.native="getChildrenTree(item)" v-if="tree.length > 0">\
                    <el-col :span="22">{{ item.title }}</el-col>\
                    <el-col :span="2"><i class="el-icon-arrow-right"></i></el-col>\
                </el-row>\
                <el-row v-if="params && (params.type == \'Org\' || params.type == \'Position\' || params.type == \'InventedPosition\')" style="padding:0;border-bottom-width:0">\
                    <el-row v-for="(item, index) in userList" :key="item.SysId">\
                        <el-checkbox v-model="item.check" v-on:change="getSelectedUser(item, index)">{{ item.Name }}</el-checkbox>\
                    </el-row>\
                </el-row>\
                <el-row v-else-if="params && params.type == \'GroupPerson\'" style="padding:0;border-bottom-width:0">\
                    <el-row v-for="(item, index) in userList" :key="item.SysId">\
                        <el-checkbox v-model="item.check" v-on:change="getSelectedUser(item, index)">{{ item.UserFormDisplayName }}({{item.LoginAccount}})</el-checkbox>\
                    </el-row>\
                </el-row>\
                <el-row v-else-if="params && (params.type == \'SystemRole\' || params.type == \'CustomRole\')" style="padding:0;border-bottom-width:0">\
                    <el-row v-for="(item, index) in userList" :key="item.SysId">\
                        <el-checkbox v-model="item.check" v-on:change="getSelectedUser(item, index)">{{ item.DisplayName }}</el-checkbox>\
                    </el-row>\
                </el-row>\
                <el-row v-else-if="params && params.type == \'Process\'" style="padding:0;border-bottom-width:0">\
                    <el-row v-for="(item, index) in userList" :key="item.SysId">\
                        <el-col :span="22"><el-checkbox v-model="item.check" v-on:change="getSelectedUser(item, index)" :disabled="item.disabled">{{ item.name }}</el-checkbox></el-col>\
                        <el-col :span="2" v-on:click.native="nextChild(item)" v-if="!item.isLast"><i class="el-icon-arrow-right"></i></el-col>\
                    </el-row>\
                </el-row>\
                <el-row v-else style="padding:0;border-bottom-width:0">\
                    <el-row v-for="(item, index) in userList" :key="item.SysId">\
                        <el-checkbox v-model="item.check" v-on:change="getSelectedUser(item, index)">{{ item.UserName }}({{item.LoginAccount}})</el-checkbox>\
                    </el-row>\
                </el-row>\
                <div class="van-doc-demo-section text-align-center no-result" v-if="userList.length == 0 && tree.length == 0">暂无数据</div>\
            </section>\
        </el-dialog>\
    </div>\
';
var mobileUserPick = Vue.extend({
    template: templateContent,
    props: {
        popVisible: {
            type: Boolean,
            default: false
        },
        multiple: {
            default: false
        },
        type: {
            // type: String,
            default: ''
        },
        // selectValue: {
        //     type: Array,
        //     default: function() {
        //         return []
        //     }
        // },
        title: {
            type: String,
            default: ''
        },
        params: {
            type: Object
        }
    },
    data: function() {
        return {
            popShow: false, // 是否显示
            backList: [], // 记录下一步，返回路径
            selectUserList: [], // 选中的人员
            userList: [], // 用户数据
            tree: [],
            page: 1,
            searchValue: '',
            loading: false,
            searchTimeOut: null
        }
    },
    mounted: function() {
        console.log(this.params)
        this.popShow = this.popVisible
        // <!--范围选人-->
        if (this.params && this.params.type == 'GroupPerson') {
            this.getProcPredictionApprover()
        } else if (this.params && this.params.type == 'Process') {
            // 流程
            this.getAllProcessTree()
        } else if (this.params && (this.params.type == 'SystemRole' || this.params.type == 'CustomRole')) {
            // 系统角色 || 自定义角色
            this.getDate()
        } else {
            this.getDate({IsUser: 'true'})
        }
    },
    watch: {
        searchValue: function (newvalue, oldvalue) {
            if (newvalue.length >= 2) {
                var _this = this;
                clearTimeout(this.searchTimeOut);
                this.searchTimeOut = setTimeout(function () {
                    _this.getSearch();
                }, 2000);
            }
        }
    },
    methods: {
        // 返回上一级
        onClickLeft: function() {
            var len = this.backList.length
            if (len > 1) {
                this.backList.splice(len - 1, 1)
                this.getChildrenTree(this.backList[this.backList.length - 1])
            } else if (len == 1) {
                this.backList.splice(len - 1, 1)
                this.userList = []
                this.getDate({IsUser: 'true'})
            } else {
                this.popShow = false
                this.$emit('closedialog')
            }
        },
        // 获取树数据
        getDate: function(params) {
            var that = this
            this.loading = true
            var url =  window.location.origin + '/Portal/UserPick/GetChildOrgTree'
            if (this.params && this.params.type == 'SystemRole') {
                url = window.location.origin + '/System/UserPick/GetSystemRoleCategoryByParent'
            } else if (this.params && this.params.type == 'CustomRole') {
                url = window.location.origin + '/System/UserPick/GetCustomRoleCategoryByParent'
            }
            axios.post(url, params).then(function(res) {
                that.tree = res.data.data
                that.loading = false
            })
        },
        getChildrenTree: function(val) {
            this.page = 1
            // document.querySelector('.mobile-dialog').scrollTo = 0
            if (this.backList.length == 0 || (this.backList.length > 0 && this.backList[this.backList.length - 1].id !== val.id)) {
                this.backList.push(val)
            }
            // 此处判断是否已经是在根节点
            if (!val.isLast) {
                this.getDate({
                    ParentID: val.id,
                    context: val.title
                })
            } else {
                this.tree = []
            }
            this.getCurDate()
        },
        // 获取当前节点下人员
        getCurDate: function(off) {
            if (this.params && this.params.type == 'Org') {
                console.log('org')
                this.getOrgListByOrgId(off)
            } else if (this.params && (this.params.type == 'Position' || this.params.type == 'InventedPosition')) {
                this.getPositionList(off)
            } else if (this.params && this.params.type == 'SystemRole') {
                this.getSystemRoleByType(off)
            } else if (this.params && this.params.type == 'CustomRole') {
                this.getCustomRoleByCategory(off)
            } else {
                this.getUserListByOrgId(off)
            }
        },
        // 人员
        getUserListByOrgId: function(off) {
            var that = this
            var list = []
            this.loading = true
            var form = {
                OrgId: off ? '' : that.backList[that.backList.length - 1].id,
                isLeave: off ? false:null,
                key: off ? that.searchValue: null,
                limit: 10000000,
                page: 1,
            }
            axios.post(window.location.origin + '/Portal/UserPick/GetUserListByOrgId', form).then(function(res) {
                res.data.data.map(function(item) {
                    if (that.selectUserList.length > 0) {
                        var l = that.selectUserList.filter(function(items) {
                            return items.SysId == item.SysId
                        })
                        if (l.length > 0) {
                            item.check = true
                        } else {
                            item.check = false
                        }
                    } else {
                        item.check = false
                    }
                    list.push(item)
                })
                that.loading = false
                that.userList = list
            })
        },
        // <!--岗位-->Org
        getOrgListByOrgId: function(off) {
            var that = this
            var list = []
            this.loading = true
            var form = {}
            if (off) {
                form = {
                    OrgID: '',
                    isLeave: false,
                    key: that.searchValue,
                    limit: 1000000,
                    page: 1,
                }
            } else {
                form = {
                    OrgID: that.backList[that.backList.length - 1].id,
                    limit: 10000000,
                    page: 1,
                }
            }
            
            axios.post(window.location.origin + '/Portal/UserPick/GetOrgListByOrgId', form).then(function(res) {
                res.data.data.map(function(item) {
                    item.UserDisplayName = item.Name;
                    item.UserAccount = item.SysId;
                    if (that.selectUserList.length > 0) {
                        var l = that.selectUserList.filter(function(items) {
                            return items.SysId == item.SysId
                        })
                        if (l.length > 0) {
                            item.check = true
                        } else {
                            item.check = false
                        }
                    } else {
                        item.check = false
                    }
                    list.push(item)
                })
                that.loading = false
                that.userList = list
            })
        },
        // 组织组件Position'C', 虚拟组件InventedPosition type: 'V',
        getPositionList: function(off) {
            var that = this
            var list = []
            this.loading = true
            var form = {}
            if (off) {
                form = {
                    OrgID: '',
                    key: that.searchValue,
                    limit: 1000000,
                    page: 1,
                    type: this.params.type == 'Position' ? 'C' : 'V', //组织组件Position'C', 虚拟组件InventedPosition type: 'V',
                }
            } else {
                form = {
                    OrgID: that.backList[that.backList.length - 1].id,
                    limit: 10000000,
                    page: 1,
                    type: this.params.type == 'Position' ? 'C' : 'V',
                }
            }
            
            axios.post(window.location.origin + '/Portal/UserPick/GetPositionList', form).then(function(res) {
                res.data.data.map(function(item) {
                    item.UserDisplayName = item.Name;
                    item.UserAccount = item.SysId;
                    if (that.selectUserList.length > 0) {
                        var l = that.selectUserList.filter(function(items) {
                            return items.SysId == item.SysId
                        })
                        if (l.length > 0) {
                            item.check = true
                        } else {
                            item.check = false
                        }
                    } else {
                        item.check = false
                    }
                    list.push(item)
                })
                that.loading = false
                that.userList = list
            })
        },
        // 系统角色
        getSystemRoleByType: function(off) {
            var that = this
            var list = []
            this.loading = true
            var form = {
                CategoryId: that.backList[that.backList.length - 1].id,
                limit: 10000000,
                page: 1,
            }
            var url =  window.location.origin + '/Portal/UserPick/GetSystemRoleByType'
            if (off) {
                url = window.location.origin + '/Portal/UserPick/GetSystemRoleListByKey'
                form = {
                    key: that.searchValue,
                    limit: 10000000,
                    page: 1,
                }
            }
            axios.post(url, form).then(function(res) {
                res.data.data.map(function(item) {
                    item.UserDisplayName = item.DisplayName;
                    item.UserAccount = item.Id;
                    if (that.selectUserList.length > 0) {
                        var l = that.selectUserList.filter(function(items) {
                            return items.SysId == item.SysId
                        })
                        if (l.length > 0) {
                            item.check = true
                        } else {
                            item.check = false
                        }
                    } else {
                        item.check = false
                    }
                    list.push(item)
                })
                that.loading = false
                that.userList = list
            })
        },
        // 自定义角色组件
        getCustomRoleByCategory: function(off) {
            var that = this
            var list = []
            this.loading = true
            var form = {
                CategoryId: that.backList[that.backList.length - 1].id,
                limit: 10000000,
                page: 1,
            }
            var url =  window.location.origin + '/Portal/UserPick/GetCustomRoleByCategory'
            if (off) {
                url = window.location.origin + '/Portal/UserPick/GetCustomRoleListByKey'
                form = {
                    key: that.searchValue,
                    limit: 10000000,
                    page: 1,
                }
            }
            axios.post(url, form).then(function(res) {
                res.data.data.map(function(item) {
                    item.UserDisplayName = item.DisplayName;
                    item.UserAccount = item.Id;
                    if (that.selectUserList.length > 0) {
                        var l = that.selectUserList.filter(function(items) {
                            return items.SysId == item.SysId
                        })
                        if (l.length > 0) {
                            item.check = true
                        } else {
                            item.check = false
                        }
                    } else {
                        item.check = false
                    }
                    list.push(item)
                })
                that.loading = false
                that.userList = list
            })
        },
        //<!--范围选人-->
        getProcPredictionApprover: function() {
            var that = this
            this.loading = true
            axios.post(window.location.origin + '/Portal/UserPick/ProcPredictionApprover', {
                activityID: that.params.activityID,
                applicantOrgId: that.params.applicantOrgId,
                limit: 1000000,
                page: 1,
                key: that.searchValue
            }).then(function(res) {
                that.loading = false
                that.userList = res.data.data
            })
        },
        getAllProcessTree: function(off, nodeId, typeName) {
            var that = this
            this.loading = true
            var list = []
            var form = {
                isProxyProcess: this.params.isProxyProcess,
                dType:this.params.type,
            }
            if (off) {
                form = {
                    isProxyProcess:this.params.isProxyProcess,
                    dType:this.params.type,
                    searchParam: this.searchValue
                }
            }
            if (nodeId) {
                form = {
                    isProxyProcess: this.params.isProxyProcess,
                    dType:this.params.type,
                    searchParam:'',
                    NodeId: nodeId,
                    recordData: {
                      typeName: typeName
                    }
                }
            }
            axios.post(window.location.origin + '/Portal/UserPick/GetAllProcessTree', form).then(function(res) {
                that.loading = false
                res.data.data.map(function(item) {
                    item.UserDisplayName = item.name;
                    item.UserAccount = item.Id;
                    if (that.selectUserList.length > 0) {
                        var l = that.selectUserList.filter(function(items) {
                            return items.SysId == item.Id
                        })
                        if (l.length > 0) {
                            item.check = true
                        } else {
                            item.check = false
                        }
                    } else {
                        item.check = false
                    }
                    if(that.params.typeIframe==='All'){
                        item.disabled = false
                    } else {
                        if(item.typeName !== 'All') {
                            if(that.params.typeIframe){
                                var iframeArray = [];
                                iframeArray = that.params.typeIframe.split(',');
                                if(iframeArray.includes(data.typeName)){
                                    item.disabled = false
                                }else{
                                    item.disabled = true
                                }
                            }
                        }
                    }
                    
                    list.push(item)
                })
                that.userList = list
            })
        },
        nextChild: function(item) {
            if (this.backList.length == 0 || (this.backList.length > 0 && this.backList[this.backList.length - 1].id !== val.id)) {
                this.backList.push(val)
            }
            this.getAllProcessTree(false, item.id, item.typeName)
        },
        // 选中人员
        getSelectedUser: function(val, index) {
            if (val.check) {
                if (this.multiple) {
                    var len = this.selectUserList.filter(function(item) {
                        return item.SysId == val.SysId
                    })
                    if (len.length == 0) {
                        this.selectUserList.push(val)
                    }
                } else {
                    if (this.selectUserList.length > 0) {
                        for (var i=0; i<this.userList.length; i++) {
                            if (this.userList[i].SysId == this.selectUserList[0].SysId) {
                                this.userList[i].check = false
                            }
                        }
                        this.selectUserList.splice(0, 1)
                        this.selectUserList.push(val)
                    } else {
                        this.selectUserList.push(val)
                    }
                } 
            } else {
                var len = this.selectUserList.filter(function(item) {
                    return item.SysId != val.SysId
                })
                this.selectUserList = len
            }
            console.log(this.selectUserList)
        },
        // 完成
        getSubmit: function() {
            var list = []
            this.selectUserList.map(function(item) {
                list.push({
                    Value: item.UserAccount,
                    Name: item.UserDisplayName
                })
            })
            console.log(list)
            this.$emit('change', list, {clicktype: this.type})
        },
        // 搜索
        getSearch: function () {
            // 防止多次点击
            if (!this.loading) {
                this.page = 1
                this.userList = []
                this.tree = []
                // 不为空则搜索
                if (this.searchValue.trim() !== '') {
                    this.getCurDate(true)
                } else {
                    if (this.params && this.params.type == 'GroupPerson') {
                        this.getProcPredictionApprover()
                    } else if (this.params && (this.params.type == 'SystemRole' || this.params.type == 'CustomRole')) {
                        this.getDate()
                    } else if (this.params && this.params.type == 'Process') {
                        // 流程
                        this.getAllProcessTree()
                    } else {
                        this.getDate({IsUser: 'true'})
                    }
                }
            }
        },
        // 搜索
        keyChange: function () {
            alert(22);
            this.getSearch();
        }

    }
  });
   // 注册
  Vue.component('mobileuserpick', mobileUserPick);
  
  
  