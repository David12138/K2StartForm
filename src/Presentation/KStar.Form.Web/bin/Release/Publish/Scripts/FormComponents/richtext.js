/*
 * @Description: 富文本组件
 * @Author: wenshaozhen
 * @Date: 2019-07-24
 * @LastEditors: hekai22
 * @LastEditTime: 2020-02-25 将组件里面的id改为ref的形式，支持了一个页面多个编辑器的功能.
 */
var templateContent = '\
    <el-form-item :prop="prop" :label="label" :rules="rules">\
        <div ref="editor" class="editor" style="overflow: hidden"></div>\
    </el-form-item>\
';
var editTemplate = Vue.extend({
    template: templateContent,
    props: {
        value: String,
        height: { // 高度
            type: Number,
            default: 200
        },
        disabled: { // 是否可编辑
            type: Boolean,
            default: true
        },
        prop: null,
        label: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        cusHeight: function () {
            return this.height + 'px'
        }
    },
    data: function () {
        var result = {
            edit: null,
            rules: []
        }
        if (this.required) {
            result.rules = [{ required: this.required, message: '必填项不能为空' }];
        }
        return result;
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    mounted: function () {
        var E = window.wangEditor;

        //2020.02.25 注释掉，因为这种方式不支持一个页面创建多个编辑器.
        //this.editor = new E('#editorTemplate');

        /*
         * 2020.02.25 采用ref的形式创建编辑器，解决了一个页面多个富文本框时
         * 会出现布局混乱的Bug，若采用之前根据id创建实例的方法会导致一个页面只能有一个富文本框.
        */
        this.editor = new E(this.$refs.editor);

        var that = this;

        // 将图片大小限制为 0.4M
        this.editor.customConfig.uploadImgMaxSize = 0.4 * 1024 * 1024;
        // 限制一次最多上传 4 张图片
        this.editor.customConfig.uploadImgMaxLength = 3;
        this.editor.customConfig.pasteFilterStyle = false;

        //处理IE兼容性问题 
        this.$nextTick(function () {
            if (this.editor.$textElem != undefined) {
                this.editor.$textElem[0].onmouseout = function (html) {
                    that.editor.change();
                };
            }
        });

        this.editor.customConfig.onchange = function (html) {
            // 监控变化，同步更新到 v-model
            that.$emit('input', html);//filterXSS(html))
        };
        this.editor.customConfig.uploadImgShowBase64 = true;  // 使用 base64 保存图片
        this.editor.customConfig.zIndex = 100;

        // 自定义菜单配置
        this.editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            //'video',  // 插入视频  IE不按格式插入会报错。因此暂时屏蔽
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ];
        this.editor.create();
        // 是否可编辑
        this.editor.$textElem.attr('contenteditable', !this.disabled);
        document.getElementById(this.editor.textElemId).parentElement.style.height = this.height + 'px';
        // 初始化值
        this.editor.txt.html(this.value);


        //富文本框回车事件禁止冒泡
        //document.getElementById('editor').onkeydown = function (e) {
        //    e = window.event || e;  //IE支持的是windows事件，而标准e事件是chromo额firefox支持
        //    e.stopPropagation();  //阻止冒泡的方法，而ie不支持這个方法，但支持cancelBubble属性
        //}

        //2020.01.15 改用jquery的事件，因为上述代码会在前端报错，提示：onkeydown of null.
        $("#editor").mousedown(function (event) {
            event.stopPropagation();
        });
    }
});
// 注册
Vue.component('richtext', editTemplate);


