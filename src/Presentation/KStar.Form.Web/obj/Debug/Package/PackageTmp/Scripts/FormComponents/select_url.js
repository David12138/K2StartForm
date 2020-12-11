/*
 * @Description: 下拉组件
 * @Author: wenshaozhen
 * @Date: 2019-07-23
 * @LastEditors: wenshaozhen
 * @LastEditTime: 
 */
//测试url数据：/api/Home/GetSelectOption


var templateContent = '\
    <el-form-item label="" :prop="prop" :rules="rules">\
        <el-select v-model="selectValue" placeholder="请选择" :disabled="disabled ? disabled : false" style="width:100%" @change="changeSelectedValue" size="mini" filterable>\
            <el-option\
                v-for="item in options"\
                :key="item.value"\
                :label="item.label"\
                :value="item.value">\
            </el-option>\
        </el-select>\
    </el-form-item>\
';
var selectTemplate = Vue.extend({
    template: templateContent,
    props: ['value', 'disabled', 'prop', 'required', 'url'],
    data: function () {
        return {
            options: [
            ],
            selectValue: this.value,
            rules: [{ required: this.required, message: '请选择' }]
        };
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    mounted: function () {
        var _this = this;
        var url = this.url;
        if (url != undefined) {         
            axios.post(url, {}).then(function (res) {
                _this.options = res.data.data;
            }).catch(function (err) {
                throw new Error(err);
            });
        }
    },
    methods: {
        // 当值改变时传给父组件，父组件用v-model接收，
        changeSelectedValue: function (value) {
            this.$emit('input', value)
        }
    }
});
// 注册
Vue.component('select_url', selectTemplate);


