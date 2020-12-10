/*
 * @Description: 数据列表组件
 * @Author: wangjingjing
 * @Date: 2019-10-28
 * @LastEditors: wangjingjing
 * @LastEditTime: 
 */
var templateContent = '\
    <div>\
        <slot name="addBtn"></slot>\
        <slot name="myDataTable" :tabledata="tableData"></slot>\
        <slot name="detailDialog"></slot>\
    </div >\
';
var dataTableTemplate = Vue.extend({
    template: templateContent,
    props: ['value'],
    data: function () {
        var result = {
            tableData: this.value
        };
        return result;
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    mounted: function () {
    },
    methods: {
    }
});
// 注册
Vue.component('data_table', dataTableTemplate);


