/*
 * @Description:单文件上传下载
 * @Author:youshf
 * @Date:2019-08-07
 * @LastEditors:
 * @LastEditTime:
 */
var template = '<el-form-item :label="title">\
                <el-upload class="upload-demo" v-if="showupload"  ref="uploadObj" :show-file-list="false" :action="uploadurl"  :on-change="onChangeObj"  :http-request="httpRequestObj">\
                <el-button size="mini" type="text" class="btn-text"><i class="icon iconfont iconshangchuan"></i>上传</el-button>\
                </el-upload>\
                <el-button size="mini" v-if="downshow" v-on:click="downFile" type="text" class="btn-text"><i class="icon iconfont iconxiazai"></i><a href="javascript:void(0)">{{fileAllName}}</a></el-button>\
                </el-form-item>';

var templateContent = '<el-col :xs="24" :sm="24" :md="12" :lg="8">\
                <el-upload class="upload-demo"\
                :on-preview="handlePreview"\
                :on-remove="handleRemove"\
                :before-remove="beforeRemove"\
                multiple\
                :limit="3"\
                :on-exceed="handleExceed"\
                :file-list="fileList">\
                <el-button size="small" type="primary">点击上传</el-button>\
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>\
                </el-upload>\
                </el-col>';

var uploadTemplate = Vue.extend({
    template: template,
    props: ["filedisable", "prop", "fileinfo", "customattr"],
    data: function () {
        return {
            title: '',
            uploadurl: '/Portal/FileManage/UploadFileStream', //上传接口
            uploadFile: null,
            fileName: '',
            downshow: false,
            showupload: true,
            downUrl: '/Portal/FileManage/DownloadFileUrl', //下载接口
            fileId: '',
            fileAllName: '',
            attachmenttitle:'附件'
        }
    },
    mounted: function () {
        debugger;
        if (this.fileinfo.fileId) {
            this.fileId = this.fileinfo.fileId;
            this.fileAllName = this.fileinfo.fileAllName;

            this.downshow = true;
            this.showupload = false;
        }
    },
    methods: {
        onChange: function (file, fileList) {
            this.uploadFile = file;
        },
        onChangeObj: function () {

        },
        httpRequestObj: function (param) {
            debugger;
            //如果未配置文件上传的类型，则使用默认类型列表
            var _defaultExt = "jpg,jpeg,png,gif,xls,xlsx,doc,docx,ppt,pptx,pdf,txt,zip,rar";
            var _fileExt = "";
            if (this.customattr) {
                var _cusattr = JSON.parse(this.customattr);
                var _ext = _cusattr.Accept;
                if (_ext) {
                    _fileExt = _ext;
                }
                else {
                    _fileExt = _defaultExt;
                }
            }
            else {
                _fileExt = _defaultExt;
            }
            var that = this;
            var fileInfo = { fileAllName: "", fileId: "" };
            var fileobj = param.file;
            
            fileInfo.fileAllName = fileobj.name;
            this.fileName = fileobj.name.substring(0, fileobj.name.lastIndexOf('.'));
            
            var formData = new FormData();
            var ext = fileobj.name.substring(fileobj.name.lastIndexOf('.') + 1).toLowerCase();
            if (_fileExt.indexOf(ext) == -1) {
                this.$alert("不允许上传" + ext + "格式的文件!")
                return false;
            }
            this.fileAllName = fileobj.name;

            formData.append('stream', fileobj);
            formData.append('path', '');
            formData.append('fileExt', ext);

            axios({
                url: that.uploadurl,
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData,
            }).then(function (res) {

                console.log(res);
                if (res.data.code == "S") {
                    that.downshow = true;
                    that.fileId = res.data.fileId;
                    //赋值
                    fileInfo.fileId = res.data.fileId;
                    that.$emit('file-upload', fileInfo);
                }
                else {
                    that.$message({
                        type: 'error',
                        message: res.data.msg
                    });
                }
                }).catch(function (error) {
                    console.log(error);
            });
        },
        downFile: function () {
            var that = this;
            axios({
                url: that.downUrl,
                method: 'post',
                responseType: 'json',
                data: {
                    fileId: this.fileId
                },
            }).then(function (res) {
                //获取下载文件的Url
                var _downFileUrl = res.data.downloadUrl;
                that.exportSearchList(_downFileUrl);
            }).catch(function (error) {
                console.log(error);
            });
        },
        exportSearchList: function (downFileUrl) {
            window.open(downFileUrl);
        }
    }
})

// 注册
Vue.component('fileuploadtemplate', uploadTemplate);