/*
 * @Description:单文件上传下载
 * @Author:youshf
 * @Date:2019-08-07
 * @LastEditors:
 * @LastEditTime:
 */
var template = '<el-col :xs="24" :sm="24" :md="12" :lg="8">\
                <el-form-item label="选择附件：">\
                <el-upload v-bind:disabled="!filedisable" class="upload-demo"  ref="uploadObj" :show-file-list="false" :action="uploadurl"  :on-change="onChangeObj"  :http-request="httpRequestObj">\
                <el-button v-bind:disabled="!filedisable" size="mini" type="text" class="btn-text"><i class="icon iconfont iconshangchuan"></i>上传</el-button>\
                </el-upload>\
                <el-button size="mini" v-if="downshow" v-on:click="downFile" type="text" class="btn-text"><i class="icon iconfont iconxiazai"></i>{{fileAllName}}</el-button>\
                </el-form-item>\
                </el-col>';

//var templateContent = '<div class="module-the-attachment">\
//              <headersubtitle :header-title="attachmenttitle">\
//              <i slot="subIcon" class="icon-sub icon iconfont iconfujian"></i>\
//              <el-upload   class="upload-demo"  ref="uploadObj" :show-file-list="false" :action="uploadurl"  :on-change="onChangeObj"  :http-request="httpRequestObj">\
//              <el-button size="mini" type="text" class="btn-text"><i class="icon iconfont iconshangchuan"></i>点击上传附件</el-button>\
//              </el-upload>\
//              <el-button size="mini" v-if="downshow" v-on:click="downFile" type="text" class="btn-text"><i class="icon iconfont iconxiazai"></i>点击下载附件：{{fileAllName}}</el-button>\
//              </headersubtitle>\
//              </div>';

var uploadTemplate = Vue.extend({
    template: template,
    props: ["filedisable"],
    data: function () {
        return {
            uploadurl: '/Portal/FileManage/UploadFileStream', //上传接口
            uploadFile: null,
            fileName: '',
            downshow: false,
            downUrl: '/Portal/FileManage/DownloadFileStream', //下载接口
            fileAllName: '',
            attachmenttitle:'附件'
        }
    },
    mounted: function () {

    },
    methods: {
        onChange: function (file, fileList) {
            this.uploadFile = file;
        },
        onChangeObj: function () {

        },
        httpRequestObj: function (param) {
            var that = this;
            var fileobj = param.file;
            this.fileAllName = fileobj.name;
            this.fileName = fileobj.name.substring(0, fileobj.name.lastIndexOf('.'));
            var formData = new FormData();
            var ext = fileobj.name.substring(fileobj.name.lastIndexOf('.') + 1).toLowerCase();
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
                if (res.data.code == "E") {
                    that.downshow = true;
                    that.downUrl = res.data.path;
                }
                else {
                    that.$message({
                        type: 'error',
                        message: res.data.msg
                    });
                }
            }).catch(function (error) {

            });
        },
        downFile: function () {
            var that = this;
            axios({
                url: that.downUrl,
                method: 'post',
                responseType: 'blob',
                data: {
                    filePath: this.downUrl
                },
            }).then(function (res) {
                debugger;
                const content = res.data;
                const dowLoadFileName = this.fileAllName;
                that.exportSearchList(dowLoadFileName, content);

            }).catch(function (error) {
                console.log(error);
            });
        },
        exportSearchList: function (dowLoadFileName, result) {
            const blob = new Blob([result]);
            const fileName = dowLoadFileName;
            // 判断浏览器
            var brower = '';
            if (navigator.userAgent.indexOf('Edge') > -1) {
                brower = 'Edge';
            }

            if ('download' in document.createElement('a')) {
                // 非IE下载
                if (brower == 'Edge') {
                    navigator.msSaveBlob(blob, fileName);
                    return;
                }
                const elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href);
                // 释放URL 对象
                document.body.removeChild(elink);
            } else {
                // IE10+下载
                navigator.msSaveBlob(blob, fileName);
            }

        },
    }
})

// 注册
Vue.component('fileuploadtemplate', uploadTemplate);