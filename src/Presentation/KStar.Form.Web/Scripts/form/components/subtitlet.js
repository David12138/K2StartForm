/*
 * @Description: 三级标题组件
 * @Author: wenshaozhen
 * @Date: 
 * @LastEditors: wenshaozhen
 * @LastEditTime: 
 */
var templateContent = '\
    <div class="subtitle">\
        <div class="box-head">\
            <i class="line"></i>\
            <span style="float:left;position:relative" class="anchor-two-floor">{{ subtitle }}</span>\
            <span class="box-body"><slot /></span>\
        </div>\
    </div >\
';
var subtitle = Vue.extend({
    template: templateContent,
    props: {
      subtitle: {
        type: String,
        require: true
      }
    }
  });
   // 注册
  Vue.component('subtitle', subtitle);
  
  
  