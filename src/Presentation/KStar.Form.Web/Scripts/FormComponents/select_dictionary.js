/*
 * @Description: 下拉组件
 * @Author: wenshaozhen
 * @Date: 2019-07-23
 * @LastEditors: wenshaozhen
 * @LastEditTime: 
 */
var templateContent = '\
    <el-form-item label="" :prop="prop" :rules="rules">\
        <el-select v-model="selectValue" placeholder="请选择" :disabled="disabled ? disabled : false" style="width:100%" @change="changeSelectedValue" size="mini" filterable>\
            <el-option\
                v-for="item in options"\
                :key="item.value"\
                :label="item.text"\
                :value="item.value">\
            </el-option>\
        </el-select>\
    </el-form-item>\
';
var selectTemplate = Vue.extend({
    template: templateContent,
    props: ['value', 'disabled', 'prop', 'required', 'selectoptions', 'dicvalue'],
    data: function () {
        var result = {
            options: [
            ],
            selectValue:"",
            //url:'\api\getDictionary',
            rules: []
        };
        if (this.required) {
            result.rules = [{ required: this.required, message: KStarForm.VM.$t("KStarForm.SelectRequired") }];
        }
        if (this.value&&this.value.value) {
            result.selectValue = this.value.value;
        } else {
            result.selectValue = this.value;
        }

        return result;
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    mounted: function () {
        var data = this.selectoptions;
        var dicvalue = this.dicvalue;
        if (data != undefined) {
            this.options = data;
            return
        }
        var _this = this;
        if (dicvalue != undefined) {
            var url = '/api/getDictionary';
            axios.post(url, { value: dicvalue }).then(function (res) {
                var arr = [];
                _.forEach(res.data.data, function (el, index) {
                    arr.push({ text: el.label, value: el.value });
                });
                _this.options = arr;
                //_this.options = res.data.data;
            }).catch(function (err) {
                throw new Error(err);
            });
        }
    },
    methods: {
        // 当值改变时传给父组件，父组件用v-model接收，
        changeSelectedValue: function (value) {
            var item = this.options.find(function(i){
                return i.value === value;
            });
            this.$emit('input', item);
        }
    }
});
// 注册
Vue.component('select_dictionary', selectTemplate);


