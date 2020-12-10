/*
 * @Description: 三级标题组件
 * @Author: ytwang
 * @Date: 2019-05-22 14:07:21
 * @LastEditors: ytwang
 * @LastEditTime: 2019-05-29 10:56:20
 */
var templateContent = '\
    <div class="subtitle">\
    <div class="box-head">\
    <i class="line"></i>\
    <span>{{ subtitle }}</span>\
    <div class="box-body">\
        <slot />\
    </div>\
        </div >\
    </div >\
';
var subtitle = Vue.extend({
    template: templateContent,
    props: {
      subtitle: {
        type: String,
        require: true
      }
    },
    data: function () {
      return {

      };
    },
    methods: {

    }
  });
   // 注册
  Vue.component('subtitle', subtitle);
  
  
  