/*
 * @Description: 多选框组件
 * @Author: wenshaozhen
 * @Date: 2019-07-23
 * @LastEditors: wenshaozhen
 * @LastEditTime: 
 */
//测试option数据：   :option='["选项一", "选项二", "选项三"]'
var templateContent = '\
    <el-form-item label="" :prop="prop" :rules="rules">\
        <el-checkbox-group v-for="item in checkboxdata" v-model="checkValue" v-on:change="changeValue" :disabled="disabled ? disabled : false" :hide-required-asterisk="false" style="display:inline-block;margin-right:10px;margin-top:8px;">\
            <el-checkbox :label=item name="type"></el-checkbox>\
        </el-checkbox-group>\
    </el-form-item>\
';
var checkboxTemplate = Vue.extend({
    template: templateContent,
    props: ['value', 'disabled', 'prop', 'required', "option"],
    data: function () {
        return {
            checkValue: [],
            checkboxdata: [],
            rules: [{ type: 'array', required: this.required, message: '请选择', trigger: 'change' }]
        };
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    mounted: function () {
        var boxdata = this.option;
        if (boxdata != undefined) {
            this.checkboxdata = boxdata;
        }

        if (this.value) {
            this.checkValue = this.value
        }
    },
    methods: {
        // 当值改变时传给父组件，父组件用v-model接收，
        changeValue: function (value) {
            this.$emit('input', this.checkValue)
        }
    }
});
// 注册
Vue.component('checkbox_option', checkboxTemplate);


