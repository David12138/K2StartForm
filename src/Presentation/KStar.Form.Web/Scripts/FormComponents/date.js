/*
 * @Description: 时间组件
 * @Author: wenshaozhen
 * @Date: 2019-07-29
 * @LastEditors: wenshaozhen
 * @LastEditTime: 
 */
var templateContent = '\
    <el-form-item label="" :prop="prop" :rules="rules" inline-message>\
        <el-date-picker v-model="dateValue" :type="datetype" placeholder="选择日期" v-on:change="changeDate" :value-format="dateformat" style="width: 100%" :disabled="disabled ? disabled : false"> </el-date-picker>\
    </el-form-item>\
';
var datetemplate = Vue.extend({
    template: templateContent,
    props: ['value', 'disabled', 'visible', 'prop', 'required', 'formattype', 'formatvalue'],
    data: function () {
        var result = {
            dateValue: this.value,
            datetype: this.formattype,//增加日期类型设置 2019-12-06 ZGH
            dateformat: this.formatvalue,//增加日期显示类型设置 2019-12-06 ZGH
            rules: []
        };
        if (this.required) {
            result.rules = [{ required: this.required, message: '请选择时间', trigger: 'change' }];
        }
        return result;
    },
    model:{
        prop:'value',
        event:'input'
    },
    methods: {
        // 当值改变时传给父组件，父组件用v-model接收，
        changeDate: function(value) {
            this.$emit('input', this.dateValue)
        }
    }
});
 // 注册
Vue.component('date', datetemplate);


