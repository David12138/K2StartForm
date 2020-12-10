/*
 * @Description: 头部表单标题
 * @Author: ytwang
 * @Date: 2019-05-22 14:07:21
 * @LastEditors: ytwang
 * @LastEditTime: 2019-05-25 10:13:24
 */
var templateContent = '\
<div class="header-title center">\
        <nav class="bread-crumbs hidden-xs-only">\
            <span>流程路径：</span>\
            <span class="bread-crumbs-item">{{ formprocessroute }}</span>\
        </nav>\
        <div class="bar-code-box hidden-xs-only">\
            <span class="bar-code">{{ formheadmodel.Folio }}</span>\
            <div class="bar-code-text">{{ formheadmodel.Folio }}</div>\
        </div>\
         <h2 class="title">{{ formheadmodel.ProcessName }}<p class="tag hidden-xs-only">{{ formheadmodel.StatusName }}</p></h2>\
 </div>\
';
var headerTitle = Vue.extend({
  template: templateContent ,
  props: ['formheadmodel', 'formprocessroute'],
  data: function () {
    return {
      formhead:{}
    };
  },
  watch:{
    formheadmodel:{
    　handler:function(curVal,oldVal){
          this.formhead = curVal;
    　　    },
    　　    deep:true,
            immediate: true
    }
  },
  methods: {

  }
});
 // 注册
Vue.component('headertitle', headerTitle);


