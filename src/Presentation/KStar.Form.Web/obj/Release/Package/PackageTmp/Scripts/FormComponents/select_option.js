/*
 * @Description: 下拉组件
 * @Author: wenshaozhen
 * @Date: 2019-07-23
 * @LastEditors: wenshaozhen
 * @LastEditTime: 
 */
//测试option数据：[{"label":"选项一","value":1},{"label":"选项二","value":2}]
var templateContent = '\
    <el-form-item label="" :prop="prop" :rules="rules">\
        <el-select v-model="selectValue" placeholder="请选择" :disabled="disabled ? disabled : false" style="width:100%" @change="changeSelectedValue" size="mini"  filterable>\
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
    props: ['value', 'disabled', 'prop', 'required', 'option'],
    data: function () {
        var result = {
            options: [],
            selectValue: this.value,
            //rules: [{ required: this.required, message: '必填项不能为空' }]
        };
        if (this.required) {
            result.rules = [{ required: this.required, message: '请选择' }];
        }
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    mounted: function () {
        var data = this.option;
        if (data != undefined) {

            this.options = data;

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
Vue.component('select_option', selectTemplate);


