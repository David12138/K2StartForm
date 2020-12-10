/*
 * @Description:弹窗
 * @Author:ham
 * @Date:2019-05-23 10:19:10
 * @LastEditors:ytwang
 * @LastEditTime:2019-06-10 03:40:42
 */
var templateContent = '\
<el-dialog :title="title"  :visible.sync="visible" :width="selfWidth" class="my-dialog-style" :before-close="handleClose">\
    <slot name="dialogcontent"></slot>\
    <span slot="footer" class="dialog-footer">\
        <el-button v-on:click="handleClose" plain class="m-cancle"  size="mini" v-if="button.indexOf($t(\'KStarForm.DialogCancel\')) > -1 || button.indexOf($t(\'KStarForm.Cancel\')) > -1">{{ $t(\'KStarForm.DialogCancel\') }}</el-button>\
        <el-button v-on:click="submit" plain class="m-submit" size="mini" v-if="button.indexOf($t(\'KStarForm.DialogConfirm\')) > -1 || button.indexOf($t(\'KStarForm.Confirm\')) > -1 ">{{ $t(\'KStarForm.DialogConfirm\') }}</el-button>\
  </span>\
</el-dialog>\
';
var returnDialog = Vue.extend({
    template: templateContent,
    props: ['title', 'visible', 'width', 'button'],
    data: function () {
        return {
            selfWidth: '800px'
        };
    },
    watch: {
    },
    mounted: function() {
    },
    methods: {
        //关闭弹窗
        handleClose: function () {
            this.$emit('cancle')
        },

        submit: function() {
            this.$emit('submit')
        }
    }
});
// 注册
Vue.component('dialogmodal', returnDialog);


