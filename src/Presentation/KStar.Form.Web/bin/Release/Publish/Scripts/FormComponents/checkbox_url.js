/*
 * @Description: 下拉组件
 * @Author: wenshaozhen
 * @Date: 2019-07-23
 * @LastEditors: wenshaozhen
 * @LastEditTime: 
 */
//测试url数据：/api/Home/GetCheckboxOption
var templateContent = '\
    <el-form-item label="" :prop="prop" :rules="rules">\
        <el-checkbox-group v-for="item in checkboxdata" v-model="checkValue" v-on:change="changeValue" :disabled="disabled ? disabled : false" :hide-required-asterisk="false" style="display: inline-block;margin-right:10px;margin-top:8px;">\
            <el-checkbox :label=item name="type"></el-checkbox>\
        </el-checkbox-group>\
    </el-form-item>\
';
var checkboxTemplate = Vue.extend({
    template: templateContent,
    props: ['value', 'disabled', 'prop', 'required',"boxdata", "url"],
    data: function () {
        return {
            checkValue: [],
            checkboxdata:[],
            rules: [{ type: 'array', required: this.required, message: '请选择', trigger: 'change' }]
        };
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    mounted: function () {
        var url = this.url;
        var boxdata = this.boxdata;
        if (boxdata != undefined) {
            this.checkboxdata = boxdata;
            return
        }
        var _this = this;
        if (url != undefined) {
            axios.post(url, {}).then(function (res) {
                var arr = [];
                _.forEach(res.data.data, function (el, index) {
                    arr.push(el.label);
                });
                _this.checkboxdata = arr;
            }).catch(function (err) {
                throw new Error(err);
            });
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
Vue.component('checkbox_url', checkboxTemplate);


