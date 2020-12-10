/*
 * @Description: 单选框
 * @Author: wenshaozhen
 * @Date: 2019-07-23
 * @LastEditors: wenshaozhen
 * @LastEditTime: 
 */
//测试url数据：/api/Home/GetRadioData
var templateContent = '\
    <el-form-item label="" :prop="prop" :rules="rules">\
        <el-radio-group v-for="item in radiodata" v-model="checkValue" v-on:change="changeValue" :disabled="disabled ? disabled : false" :hide-required-asterisk="false" style="margin-right:10px;margin-top:12px;">\
            <el-radio :label=item></el-radio>\
        </el-radio-group>\
    </el-form-item>\
';
var radioTemplate = Vue.extend({
    template: templateContent,
    props: ['value', 'disabled', 'prop', 'required', 'url'],
    data: function () {
        return {
            checkValue: this.value ? this.value : '',
            rules: [{ required: this.required, message: '请选择', trigger: 'change' }],
            radiodata:[]
        };
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    mounted: function () {
        var url = this.url;
        var _this = this;
        if (url != undefined) {
            axios.post(url, {}).then(function (res) {
                var arr = [];
                _.forEach(res.data.data, function (el, index) {
                    arr.push(el.label);
                });
                _this.radiodata = arr;
            }).catch(function (err) {
                throw new Error(err);
            });
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
Vue.component('radio_url', radioTemplate);


