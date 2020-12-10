/*
 * @Description: 时间组件
 * @Author: wenshaozhen
 * @Date: 2019-07-29
 * @LastEditors: wenshaozhen
 * @LastEditTime: 
 */
var templateContent = '\
    <div style="display: inline-block;">\
    <el-form-item label="" :prop="prop0"  :rules="rules" inline-message>\
        <el-date-picker v-model="firstValue" type="date" placeholder="开始日期" :picker-options="starttime" v-on:change="changeStartDate" value-format="yyyy-MM-dd" style="width: 48%" :disabled="disabled ? disabled : false"> </el-date-picker>\
     </el-form-item>\
    <el-form-item label = "" :prop="prop1" :rules = "rules" inline-message style="margin-top:-38px;margin-left:190px">\
         <el-date-picker v-model="lastValue" type="date" placeholder="结束日期"  :picker-options="endtime" v-on:change="changeEndDate" value-format="yyyy-MM-dd" style="width: 100%" :disabled="disabled ? disabled : false"> </el-date-picker>\
    </el-form-item>\
</div>\
';
var datetemplate = Vue.extend({
    template: templateContent,
    props: ['startvalue', 'endvalue', 'disabled', 'visible', 'prop0', 'prop1', 'required'],
    data: function () {
        return {
            firstValue: this.startvalue,
            lastValue: this.endvalue,
            starttime: {
                disabledDate: function (time) {
                    if (this.lastValue) {
                        return time.getTime() >= new Date(this.lastValue).getTime();
                    } else {
                        // 不能大于当前日期
                        return false; //time.getTime() > Date.now()
                    }
                }
            },
            endtime: {
                disabledDate: function (time) {
                    if (this.firstValue) {
                        return time.getTime() <= new Date(this.firstValue).getTime();
                    } else {
                        // 不能大于当前日期
                        return false; //time.getTime() > Date.now()
                    }
                }
            },
            rules: [{ required: this.required, message: '请选择时间', trigger: 'change' }]
        };
    },
    model:{
        prop:'prop',
        event:'input'
    },
    methods: {
        // 当值改变时传给父组件，父组件用自定义事件接收
        changeStartDate: function (value) {
            this.$emit('setvalue0', value)
        },
        changeEndDate: function (value) {
            this.$emit('setvalue1', value)
        }
    }
});
// 注册
Vue.component('start_end_date', datetemplate);


