/*
 * @Description: 下拉组件
 * @Author: wenshaozhen
 * @Date: 2019-07-23
 * @LastEditors: wenshaozhen
 * @LastEditTime: 
 */
var templateContent = '\
    <el-form-item label="" :prop="prop" :rules="rules">\
        <el-checkbox-group v-for="(item,idx) in checkboxdata" v-model="checkValue" v-on:change="changeValue" :disabled="disabled ? disabled : false" :hide-required-asterisk="false" style="display: inline-block;margin-right:10px;">\
            <el-checkbox :label="item.value" :value="item.value" name="type">{{item.text}}</el-checkbox>\
        </el-checkbox-group>\
    </el-form-item>\
';
var checkboxTemplate = Vue.extend({
    template: templateContent,
    props: ['value', 'disabled', 'prop', 'required', "boxdata", 'dicvalue'],
    data: function () {
        var result = {
            checkValue: [],
            checkboxdata: [],
            rules:[]
        };
        if (this.required) {
            result.rules = [{ type: 'array', required: this.required, message: KStarForm.VM.$t("KStarForm.SelectRequired"), trigger: 'change', validator: this.validators }];
        }
        return result;
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    mounted: function () {
        var boxdata = this.boxdata;
        if (boxdata != undefined) {
            this.checkboxdata = boxdata;
            return
        }
        var _this = this;
        var url = '/api/getDictionary';
        if (this.dicvalue != undefined) {
            axios.post(url, { value: this.dicvalue }).then(function (res) {
                var arr = [];
                _.forEach(res.data.data, function (el, index) {
                    arr.push({ text: el.label, value: el.value });
                });

                _this.checkboxdata = arr;
            }).catch(function (err) {
                throw new Error(err);
            });
        }
        if (this.value) {
            if (this.value instanceof Array) {
                var arr = [];
                _.forEach(this.value, function (el, index) {
                    arr.push(el.value);
                });
                this.checkValue = arr;
            } else {
                this.checkValue = this.value.split(",");
            }
        }
    },
    methods: {
        // 当值改变时传给父组件，父组件用v-model接收，
        changeValue: function (value) {
            var arr = [];
            var datasource = this.checkboxdata;
            _.forEach(this.checkValue, function (el, index) {
                var item = datasource.find(function(i) {
                    return i.value === el;
                });
                if (item) {
                    arr.push(item);
                }
            });
            this.$emit('input', arr);
        },
        validators: function (rule, value, callback) {
            if (!this.checkValue||this.checkValue.length<=0) {
                callback(new Error(KStarForm.VM.$t("KStarForm.SelectRequired")));
            } else {
                callback()
            }
        }
    }
});
// 注册
Vue.component('checkbox_dictionary', checkboxTemplate);


