/*
 * @Description: 头部菜单
 * @Author: wsz
 * @Date: 2019-05-22 14:07:21
 * @LastEditors: wsz
 * @LastEditTime: 2019-05-25 10:13:24
 */
var templateContent = '\
<div class="headerMenu">\
    <div class="form-logo"><img src="../../../Content/portal/images/logo.png"></div>\
    <div class="header-menu">\
        <div class="menuTitle">\
            <div><i class="ic-menu"></i>菜单</div>\
            <i class="m-icon"></i>\
            <div class="menu">\
                <div class="menu-in">\
                    <div class="menuList">\
                        <p>个人管理</p>\
                        <ul>\
                            <li><a>个人管理</a></li>\
                            <li><a>财务管理</a></li>\
                            <li><a>供应商管理</a></li>\
                            <li><a>后台管理</a></li>\
                        </ul>\
                    </div>\
                    <div class="menuList">\
                        <p>流程管理</p>\
                        <ul>\
                            <li><a>流程地图</a></li>\
                            <li><a>流程监控</a></li>\
                            <li><a>流程效率管理</a></li>\
                        </ul>\
                    </div>\
                    <div class="menuList">\
                        <p>工作计划</p>\
                        <ul>\
                            <li><a>城市公司月工作计划</a></li>\
                            <li><a>城市公司周工作计划</a></li>\
                            <li><a>城市公司部门月工作计划</a></li>\
                            <li><a>城市公司部门周工作计划</a></li>\
                        </ul>\
                    </div>\
                    <div class="menuList">\
                        <p>工作联系函</p>\
                        <ul>\
                            <li><a>IT权限管理</a></li>\
                            <li><a>审批临时授权申请</a></li>\
                            <li><a>销假申请</a></li>\
                            <li><a>专项巩固走联系函</a></li>\
                        </ul>\
                        <ul>\
                            <li><a>出差申请</a></li>\
                            <li><a>请假申请</a></li>\
                            <li><a>工作联系函</a></li>\
                            <li><a>会议纪要</a></li>\
                        </ul>\
                    </div>\
                </div>\
            </div>\
        </div>\
        <div><i class="ic-download"></i>下载</div>\
        <div><i class="ic-setting"></i> <a href="/static/集团PC端操作说明手册V1.1.docx">操作手册</a></div>\
        <div class="userInfo" v-on:click="openLoginOut">\
            <span id="username">{{ userInfo.username }}</span>\
            <i class="ic-arrown-dowm"></i>\
            <img id="userImg" :src="userInfo.Phono">\
            <!--<ul class="userInfoUl" v-if="isShow">\
                <li>注销</li>\
            </ul>-->\
        </div>\
    </div>\
</div>\
';
var headerMenu = Vue.extend({
  template: templateContent ,
  data: function () {
    return {
        userInfo: {
            username: '',
            Phono: '../../../Content/portal/images/userLogo.png'
        },
        isShow: false
    };
  },
  watch:{
  },
  mounted: function() {
    this.userInfo.username = sessionStorage.getItem('userName')
    // // 获取用户信息username
    var that = this
    axios.get(window.location.origin + '/Home/GetCurrentUser').then(function(res) {
        that.userInfo.username = res.data.data.UserDisplayName
        that.userInfo.Phono = res.data.data.Portrait || '../../../Content/portal/images/userLogo.png'
    })
  },
  methods: {
    openLoginOut: function() {
        this.isShow = !this.isShow
    }
  }
});
 // 注册
Vue.component('headermenu', headerMenu);


