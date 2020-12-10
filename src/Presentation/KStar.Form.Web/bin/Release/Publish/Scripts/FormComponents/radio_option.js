/*
 * @Description: 单选框
 * @Author: wenshaozhen
 * @Date: 2019-07-23
 * @LastEditors: wenshaozhen
 * @LastEditTime: 
 */
//测试option数据：["选项一", "选项二", "选项三"]
var templateContent = '\
    <el-form-item label="" :prop="prop" :rules="rules">\
        <el-radio-group v-for="item in radiodata" v-model="checkValue" v-on:change="changeValue" :disabled="disabled ? disabled : false" :hide-required-asterisk="false" style="margin-right:10px;margin-top:12px;">\
            <el-radio :label=item></el-radio>\
        </el-radio-group>\
    </el-form-item>\
';
var radioTemplate = Vue.extend({
    template: templateContent,
    props: ['value', 'disabled', 'prop', 'required','option'],
    data: function () {
        return {
            checkValue: this.value ? this.value : '',
            rules: [{ required: this.required, message: '请选择', trigger: 'change' }],
            radiodata:[]
        };
    },
    model:{
        prop:'value',
        event:'input'
    },
    mounted: function () {
        var data = this.option;
        if (data != undefined) {
            this.radiodata = data;
        }
    },
    methods: {
        // 当值改变时传给父组件，父组件用v-model接收，
        changeValue: function(value) {
            this.$emit('input', this.checkValue)
        }
    }
});
 // 注册
Vue.component('radio_option', radioTemplate);


