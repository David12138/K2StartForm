/*
 * @Description: 副标题组件
 * @Author: ytwang
 * @Date: 2019-05-22 14:07:21
 * @LastEditors: ytwang
 * @LastEditTime: 2019-05-23 10:19:01
 */
var templateContent = '\
<div class="header-subtitle">\
    <div class="sub-header" @click="doToggle" >\
        <span>\
            <slot name="subIcon" />\
            {{ headerTitle }}\
        </span>\
        <span  :class="visiable?down:up">\
            <i class="iconfont iconxiala"></i>\
        </span>\
     </div >\
    <div v-show="this.visiable" class="sub-body">\
        <slot />\
    </div>\
</div>\
';
var headerSubtitle = Vue.extend({
  template: templateContent,
  props: {
    headerTitle: {
      type: String,
      require: true
    }
  },
data: function () {
    return {
      visiable: true,
      up:'icon-turn turn-right',
      down:'icon-turn',
    };
  },
  methods: {
    doToggle: function() {
      this.visiable = !this.visiable;
    }
  }
});
 // 注册
Vue.component('headersubtitle', headerSubtitle);


