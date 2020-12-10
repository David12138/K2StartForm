/*
 * @Description:锚定
 * @Author:wsz
 * @Date:2019-05-23 10:19:10
 * @LastEditors:wsz
 * @LastEditTime:2019-06-10 03:40:42
 */
var templateContent = '\
<div>\
    <el-popover placement="left-start" width="200" trigger="click" v-on:show="showPop" v-on:hide="hidePop" popper-class="anchor-pop">\
        <div class="anchor">\
            <div class="anchor-link" v-for="(item, index) in anchorList" :key="index">\
                <span class="anchor-link-ball" :class="isAddClassBoder(item)"></span>\
                <a class="anchor-link-title"  v-on:click="gotoScollTo(item)" :class="item.offTop == curName ? \'selected\' : \'\' ">{{item.name}}</a>\
                <ul v-if="item.children" v-for="(i, j) in item.children" :key="j">\
                    <li><a class="anchor-link-title"  v-on:click="gotoScollTo(i)" :class="i.offTop == curName ? \'selected\' : \'\'">{{i.name}}</a></li>\
                </ul>\
            </div>\
        </div>\
        <el-button slot="reference" icon="ic-menu" :class="popVisible ? \'anchormodal-btn\' : \'\' " ></el-button>\
    </el-popover>\
    <el-button icon="ic-scroll-top" v-on:click="gotoScrollTop"></el-button>\
</div>\
';
var anchorModal = Vue.extend({
    template: templateContent,
    props: ['title', 'visible', 'width', 'button'],
    data: function () {
        return {
            anchorList: [],
            curName: 0,
            initAnchorList: [],
            popVisible: false,
            curIndex: -1
        };
    },
    mounted: function() {

    },
    methods: {
        // 添加class
        isAddClassBoder: function(val) {
            var turnoff = false
            var that = this
            if (val.offTop == this.curName) {
                turnoff = true
            }
            if (val.children.length > 0) {
                val.children.map(function(item) {
                    if (item.offTop == that.curName) {
                        turnoff = true
                    }
                })
            }
            return turnoff ? 'border-selected' : ''
        },
        // 滚动事件
        handleScroll: function() {
            if (this.curIndex > -1) {
                this.curIndex = -1
            } else {
                var sTop = document.documentElement.scrollTop || document.body.scrollTop
                this.getCurPosition(sTop)
            }
        },
        // 获取数据
        getDate: function() {
            var list = []
            var initAnchorList = []
            var that = this
            var offTop = 0
            var headerSubtitle = document.getElementsByClassName('header-subtitle') // 获取总共有几个header-subtitle模块
            for (var i=0; i<headerSubtitle.length; i++) {
                var anchorOneFloor = headerSubtitle[i].getElementsByClassName('anchor-one-floor')[0]
                if (anchorOneFloor) {
                    offTop = that.getOffsetTop(anchorOneFloor, 0)
                    list.push({ name: anchorOneFloor.textContent, offTop:  offTop, children: []})
                    initAnchorList.push({ name: anchorOneFloor.textContent, offTop:  offTop })
                    if (headerSubtitle[i].getElementsByClassName('anchor-two-floor').length > 0) {
                        var anchorTwoFloor = headerSubtitle[i].getElementsByClassName('anchor-two-floor')
                        for (var j=0;j<anchorTwoFloor.length; j++) {
                            if (anchorTwoFloor[j]) {
                                var subOffTop = that.getOffsetTop(anchorTwoFloor[j], offTop)
                                list[list.length - 1].children.push({ name: anchorTwoFloor[j].textContent, offTop: subOffTop })
                                initAnchorList.push({ name: anchorTwoFloor[j].textContent, offTop: subOffTop })
                            }
                        }
                    }
                }
            }
            this.anchorList = list
            this.initAnchorList = initAnchorList
        },
        // 展开pop
        showPop: function() {
            this.popVisible = true
            this.getDate()
            var sTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
            this.getCurPosition(sTop)
            window.addEventListener('scroll', this.handleScroll, true);
        },
        // 获取offsetTop的高度
        getOffsetTop: function(val, topH) {
            var t = 0
            if (topH == 0) {
                t = val.offsetParent.offsetTop
                if (t < 15) {
                   t = this.getOffsetTop(val.offsetParent, topH)
                }
                return t
            } else { 
                if (val.offsetParent.offsetTop == topH) {
                    t = val.offsetTop + val.offsetParent.offsetTop
                } else {
                    t = this.getOffsetTop(val.offsetParent, topH)
                }
                return t
            }
        },
        // 当前位置
        getCurPosition: function(h) {
            var that = this
            that.curName = 0
            if (that.initAnchorList.length > 0) {
                if (that.initAnchorList[that.initAnchorList.length - 1].offTop - 40 < h) {
                    that.curName = that.initAnchorList[that.initAnchorList.length - 1].offTop
                } else if (that.initAnchorList[0].offTop - 40 > h) {
                    that.curName = that.initAnchorList[0].offTop
                } else {
                    for (var i=0; i<that.initAnchorList.length - 1; i++) {
                        if (i != that.initAnchorList.length - 1) {
                            if (that.initAnchorList[i].offTop - 40 < h && h < that.initAnchorList[i + 1].offTop - 40) {
                                that.curName = that.initAnchorList[i].offTop
                            }
                        }
                    }
                }   
            }
        },
        // 关闭事件
        hidePop: function() {
            this.popVisible = false
            // 移除监听
            window.removeEventListener('scroll', this.handleScroll, true); 
        },
        // 点击滚动到指定位置
        gotoScollTo: function(val) {
            this.curIndex = val.offTop
            this.curName = val.offTop
            window.scrollTo(0, val.offTop)
        },
        gotoScrollTop: function() {
            window.scrollTo(0, 0)
        }
    },
    destroyed: function() {
        // 移除监听
        window.removeEventListener('scroll', this.handleScroll, true); 
    }
});
// 注册
Vue.component('anchormodal', anchorModal);


