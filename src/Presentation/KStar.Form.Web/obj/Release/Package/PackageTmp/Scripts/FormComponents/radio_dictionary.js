/*
 * @Description: 单选框
 * @Author: wenshaozhen
 * @Date: 2019-07-23
 * @LastEditors: wenshaozhen
 * @LastEditTime: 
 */
var templateContent = '\
    <el-form-item label="" :prop="prop" :rules="rules">\
        <el-radio-group v-for="item in checkboxdata"  v-model="checkValue" v-on:change="changeValue" :disabled="disabled ? disabled : false" :hide-required-asterisk="false" style="margin-right:10px;">\
            <el-radio :label="item.value" name="type">{{item.text}}</el-radio>\
        </el-radio-group>\
    </el-form-item>\
';
var radioTemplate = Vue.extend({
    template: templateContent,
    props: ['value', 'disabled', 'prop', 'required','dicvalue'],
    data: function () {
        var result = {
            checkValue:'',
            checkboxdata: [],
            rules: []
        };
        if (this.required) {
            result.rules = [{ required: this.required, message: KStarForm.VM.$t("KStarForm.SelectRequired"), trigger: 'change', validator: this.validators }];
        }
        if (this.value && this.value.value) {
            result.checkValue = this.value.value;
        } else {
            result.checkValue = this.value;
        }
        return result;
    },
    model:{
        prop:'value',
        event:'input'
    },
    mounted: function () {
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
    },
    methods: {
        // 当值改变时传给父组件，父组件用v-model接收，
        changeValue: function (value) {
            var that = this;
            var item = this.checkboxdata.find(function(i) {
                return i.value === that.checkValue;
            });
            this.$emit('input', item)
        },
        validators: function (rule, value, callback) {
            if (!this.checkValue) {
                callback(new Error(KStarForm.VM.$t("KStarForm.SelectRequired")));
            } else {
                callback()
            }
        }
    }
});
 // 注册
Vue.component('radio_dictionary', radioTemplate);


