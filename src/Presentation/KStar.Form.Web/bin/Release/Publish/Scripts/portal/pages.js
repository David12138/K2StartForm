/*
 * @Description: 搜索内容
 * @Author: wsz
 * @Date: 2019-08-01
 * @LastEditors: wsz
 * @LastEditTime: 
 */
var templateContent = '\
<div class="flow-pagination">\
    <el-pagination v-on:size-change="handleSizeChange" v-on:current-change="handleCurrentChange" :current-page.sync="forms.PageIndex" \
        :page-sizes="[10, 20, 50, 100]" :page-size="forms.PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">\
    </el-pagination>\
</div>\
';
var pages = Vue.extend({
    template: templateContent,
    props: ['total', 'form'],
    data: function () {
        return {
            forms: this.form, // 表单数据
            input: 1
        };
    },
    watch: {
        form: {
            handler: function (curVal, oldVal) {
                this.forms = curVal;
            },
            deep: true,
        }
    },
    mounted: function() {
        // console.log(this.form)
    },
    methods: {
        // 改变条数
        handleSizeChange: function(val) {
            this.forms.PageSize = val
            this.forms.PageIndex = 1
            this.$emit('change', this.forms)
        },
        // 页码改变
        handleCurrentChange: function(val) {
            this.forms.PageIndex = val
            this.$emit('change', this.forms)
        }
    }
});
 // 注册
Vue.component('pages', pages);


