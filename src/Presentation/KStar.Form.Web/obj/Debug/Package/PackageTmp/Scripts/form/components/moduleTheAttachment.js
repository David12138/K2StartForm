/*
 * @Description:附件
 * @Author:ytwang
 * @Date:2019-05-23 10:19:10
 * @LastEditors:ytwang
 * @LastEditTime:2019-06-10 03:40:42dd
 */
var templateContent = '\
    <div class="module-the-attachment custom-reset-styles" :key="attachmentactname">\
    <subtitle :subtitle="attachmenttitle" class="line-sub-title">\
            <el-tooltip\
                placement="top-start"\
                popper-class="my-tooltip">\
                <el-row slot="content">\
                    <el-col v-if="attachmentmodel && attachmentmodel.VersionFormSettings && attachmentmodel.VersionFormSettings.IsShowATT && filterContent(attachmentmodel.VersionFormSettings.ATTDescription)" v-html="attachmentmodel.VersionFormSettings.ATTDescription"></el-col>\
                    <el-col v-else>{{ $t(\'KStarForm.AttachmentMaxTips\') + attachmentmodel.FileMaxSize + \'M，\' + $t(\'KStarForm.AttachmentFormatTips\') + \'：\'+ attachmentmodel.FileFormat }}</el-col>\
                </el-row>\
                <i class="el-icon-warning-outline" style="color: #000;margin-left:5px"></i>\
            </el-tooltip>\
        <p class="tag-remind">\
        <div class="button-tools-text position-ab" v-if="isupload">\
            <el-upload :multiple="true" class="upload-demo" ref="uploadObj" :show-file-list="false" :action="this.uploadurl"  :on-change="onChangeObj"  :http-request="httpRequestObj"  :file-list="fileList"  :accept="attachmentmodel.FileFormatReplace">\
                <el-button size="mini" plain>{{ $t(\'KStarForm.UploadAttachments\') }}</el-button>\
            </el-upload>\
        </div>\
    </subtitle>\
    <el-row class="list">\
        <el-row :gutter="16">\
            <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="(item, index) in filterType(formattachmentsmodel)" :key="index">\
                <el-row class="list-item">\
                    <i class="el-icon-paperclip icon-paperclip visible-xs-only"></i>\
                    <el-col class="m-icon hidden-xs-only"><i :class="AddIcon(item.FileExtension)"></i></el-col>\
                    <el-col class="main-con">\
                        <el-row class="name">{{item.NewFileName}}{{item.FileExtension}}({{ parseFloat(item.FileBytes/1024).toFixed(2) }}KB)</el-row>\
                        <el-row class="info">{{  $t(\'KStarForm.UploadNode\') }}：{{item.ActivityDisplayName}}</el-row>\
                        <el-row class="info">{{ getUploadDate(item.UploadedDate) }}</el-row>\
                        <el-row class="btn"  v-if="item.IsDeleted===false">\
                            <span v-on:click="xiazaiRow(item)"><i class="iconfont iconxiazaisvg"></i>{{ $t(\'KStarForm.Download\')  }}</span>\
                            <span v-on:click="chakanRow(item)"><i class="iconfont iconchakan"></i>{{ $t(\'KStarForm.Preview\')  }}</span>\
                            <span v-on:click="deleteRow(item)" v-if="isupload"><i class="iconfont iconshanchu"></i>{{ $t(\'KStarForm.Delete\')  }}</span>\
                            <!--<el-button size="mini"  type="text" icon="iconfont iconxiazai" @click.native.prevent="xiazaiRow(item)"></el-button>\
                            <el-button size="mini"   type="text" icon="iconfont iconchakan"  @click.native.prevent="chakanRow(item)"></el-button>\
                            <el-button size="mini" v-if="isupload"  type="text" icon="iconfont iconshanchu"  @click.native.prevent="deleteRow(item)"></el-button>-->\
                        </el-row>\
                        <el-row class="btn" v-else>\
                            <span v-on:click="roundRow(item)"><i class="iconfont iconhuanyuan"></i>{{ $t(\'KStarForm.Reduction\') }}</span>\
                            <!--<el-button size="mini"  type="text" icon="iconfont iconhuanyuan" @click.native.prevent="roundRow(item)"></el-button>-->\
                        </el-row>\
                    </el-col>\
                </el-row>\
            </el-col>\
        </el-row>\
    </el-row>\
    <el-row class="btn-alldownload" v-if="!isupload && filterType(formattachmentsmodel).length > 0"><el-button type="primary" plain v-on:click="AllDownload">{{ $t(\'KStarForm.AllDownload\') }}</el-button></el-row>\
    </div>\
';
var moduleTheAttachment = Vue.extend({
    template: templateContent,
    props: ['isupload', 'attachmentmodel', 'formattachmentsmodel', 'attachmenttype', 'attachmenttitle', 'attachmentactname', 'formusernamemodel'],
    data: function () {
        return {
            uploadFile: null,
            tablebtn: true,
            // 上传
            uploadurl: '',
            fileList: []
        };
    },
    mounted: function () {
        this.getAttachments();
    },
    methods: {
        // wsz2019-11-21：除去返回来的文本框html标签
        filterContent: function (val) {
            if (val) {
                return val.replace(/<[^<>]+>/g, '').trim().length > 0
            } else {
                return false
            }

        },
        AddIcon: function (val) {
            if (val) {
                if (val.indexOf('.xlsx') > -1 || val.indexOf('.xls') > -1) {
                    return 'icon-svg excel'
                } else if (val.indexOf('.css') > -1) {
                    return 'icon-svg css'
                } else if (val.indexOf('.ppt') > -1 || val.indexOf('.pptx') > -1) {
                    return 'icon-svg ppt'
                } else if (val.indexOf('.jpg') > -1 || val.indexOf('.png') > -1 || val.indexOf('.jpeg') > -1) {
                    return 'icon-svg jpg'
                } else if (val.indexOf('.pdf') > -1) {
                    return 'icon-svg pdf'
                } else if (val.indexOf('.rar') > -1) {
                    return 'icon-svg rar'
                } else if (val.indexOf('.zip') > -1) {
                    return 'icon-svg zip'
                } else if (val.indexOf('.txt') > -1) {
                    return 'icon-svg txt'
                } else if (val.indexOf('.html') > -1) {
                    return 'icon-svg html'
                } else if (val.indexOf('.mp4') > -1) {
                    return 'icon-svg mp4'
                } else if (val.indexOf('.wav') > -1) {
                    return 'icon-svg wav'
                } else {
                    return 'icon-svg word'
                }
            }
        },
        getUploadDate: function (val) {
            if (val) {
                return moment(val).format('YYYY-MM-DD HH:mm')
            }
        },
        filterType: function (rows) {
            var _this = this;
            if (rows) {
                return rows.filter(function (row) {
                    if (_this.attachmentactname == "All") {
                        return row.Type === _this.attachmenttype &&
                            !(KStarForm.vmFormData.vmFormType == 'Approval' && KStarForm.vmFormData.vmOperation.ActivityName == row.ActivityName && KStarForm.vmFormData.vmOperation.CurrentUserAccount == row.CreateBy)
                    }
                    else {
                        if (_this.attachmentactname == "000_重新提交") {
                            return row.Type === _this.attachmenttype && (row.ActivityName === _this.attachmentactname || row.ActivityName === "开始") && row.CreateBy === _this.formusernamemodel;
                        }
                        else {
                            return row.Type === _this.attachmenttype && row.ActivityName === _this.attachmentactname && row.CreateBy === _this.formusernamemodel;
                        }
                    }
                })
            }
            else {
                return rows;
            }
        },
        rowStyle: function (row, rowIndex) {
            if (row.IsDeleted === true) {
                return 'isDelete'
            } else {
                return ''
            }
        },
        xiazaiRow: function (row) {
            var _this = this;
            axios({
                url: '/Portal/FileManage/DownloadFileStream',
                method: 'post',
                responseType: 'blob',
                data: {
                    filePath: row.DownloadUrl
                },
            }).then(function (res) {
                //记录日志
                _this.addAttachLog(row);
                var content = res.data;
                var dowLoadFileName = row.NewFileName + row.FileExtension;
                _this.exportSearchList(dowLoadFileName, content);
            }).catch(function (error) {
                //下载报错提示
                var reader = new FileReader();
                reader.onload = function (event) {
                    var data = JSON.parse(reader.result);
                    _this.$message({
                        type: 'error',
                        message: data.message
                    });
                    console.log(reader.result);//内容就在这里
                };
                reader.readAsText(error.response.data);
                throw error;
            });
        },
        // 全部下载
        AllDownload: function () {
            var arr = this.filterType(this.formattachmentsmodel)
            var that = this
            for (var i = 0; i < arr.length; i++) {
                this.xiazaiRow(arr[i]);
            }
        },
        //文件预览
        chakanRow: function (row) {
            //调用在线预览方法，参数是文件路径
            this.PreviewOnline(row.DownloadUrl);
            //记录日志
            this.addAttachLog(row);
        },
        //文件预览方法
        PreviewOnline: function (downloadUrl) {
            var _this = this;
            //移动端的pdf,不可以使用owa在线预览,暂时使用下载查看方式
            if (downloadUrl.toLowerCase().indexOf(".pdf") > -1 && !IsPC()) {
                window.location = '/Portal/FileManage/DownloadFileStream' + "?filePath=" + downloadUrl;
            }
            else {
                axios({
                    url: '/Portal/PreviewOnline/GetLink?path=' + encodeURIComponent(downloadUrl),
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then(function (res) {
                    var url = res.data;
                    if (url) {
                        if (!IsPC()) {
                            // 移动端在本页面打开
                            window.location = '/Portal/PreviewOnline/PreviewOnline' + "?path=" + encodeURIComponent(url);

                        } else {
                            //PC端，新开标签页打开
                            window.open('/Portal/PreviewOnline/PreviewOnline' + "?path=" + encodeURIComponent(url))
                        }
                    }
                }).catch(function (error) {
                    _this.$message({
                        type: 'error',
                        message: error.response.data.message
                    });
                    throw error;
                });
            }
        },
        addAttachLog: function (row) {
            axios({
                url: '/Portal/WorkflowMap/addAttachLog',
                method: 'post',
                data: {
                    formId: row.FormId, attachId: row.Id
                },
            }).then(function (res) {
                console.log("add attachlog success");
            }).catch(function (error) {
                throw error;
            });
        },
        //流转化
        exportSearchList: function (dowLoadFileName, result) {
            const blob = new Blob([result]);
            const fileName = dowLoadFileName;
            // 判断浏览器
            var brower = '';
            if (navigator.userAgent.indexOf('Edge') > -1) {
                brower = 'Edge';
            }
            //msSaveOrOpenBlob在ie下才存在，因此用于判断是否ie
            if (window.navigator && !window.navigator.msSaveOrOpenBlob) {
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
                //elink.remove();
                URL.revokeObjectURL(elink.href);
                // 释放URL 对象
                document.body.removeChild(elink);
            } else {
                // IE10+下载
                navigator.msSaveOrOpenBlob(blob, fileName);
            }

        },
        // 获取表格
        getAttachments: function () {
            var _this = this;
            _.forEach(_this.formattachmentsmodel, function (el, index) {
                var UploadedDate = parseInt(el.UploadedDate.replace("/Date(", "").replace(")/", ""));
                el.UploadedDate = moment(UploadedDate).format('YYYY-MM-DD HH:mm:ss');

            });
        },
        // 上传成功
        //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
        onChange: function (file, fileList) {

            this.uploadFile = file;
        },
        // 对象对比 选择对比文件
        onChangeObj: function (file, fileList) {
            this.uploadObjFile = file;
        },
        // 对象 自定义上传 触发函数
        httpRequestObj: function () {
            var _this = this;
            var file = null;
            _this.progressStatusObj = false;
            file = _this.uploadObjFile.raw;
            if (file) {
                _this.beforeUploadObj(file, true);
            }
        },
        /**
          * 对象对比 上传 接口
          * @param {File} file 要对比的文件
          * @param {String} state  控制页面切换状态
          */
        beforeUploadObj: function (file, state) {
            //文件基本信息
            var _this = this;
            var ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
            var fileName = file.name.substring(0, file.name.lastIndexOf('.'));
            var fd = new FormData();
            fd.append('stream', file);
            fd.append('path', '');
            fd.append('fileExt', ext);

            //文件大小校验，超过限制
            if (file.size > _this.attachmentmodel.FileMaxSize * 1024 * 1024) {
                this.$message.error(KStarForm.VM.$t("KStarForm.AttachmentSizeLimitPrompt"));
                return false;
            }

            //文件格式校验
            var fileExtArray = _this.attachmentmodel.FileFormatReplace.replace(/\./g, '').split(",");
            if (_.indexOf(fileExtArray, ext) === -1) {
                this.$message.error(KStarForm.VM.$t("KStarForm.AttachmentFormatError"));
                return false;
            }
            //弹出遮罩层，开始上传
            var loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });


            //文件基本信息赋值
            var activityName = "开始";
            var activityDisplayName = "开始";
            //默认为开始节点，其他节点时，则替换对应的节点
            if (KStarForm.vmFormData.vmOperation.ActivityName) {
                activityName = KStarForm.vmFormData.vmOperation.ActivityName;
                activityDisplayName = KStarForm.vmFormData.vmOperation.ActivityDisplayName;
            }
            var time = new Date();
            var dateNew = '/Date(' + time.getTime() + ')/';
            var att = {
                FileBytes: file.size, FileType: file.type, FileExtension: '.' + ext
                , FileId: null
                , Type: _this.attachmenttype
                , OldFileName: fileName, NewFileName: fileName
                , DownloadUrl: ""
                , StoragePath: ""
                , IsDeleted: false
                , FormId: KStarForm.vmFormData.vmOperation.FormId
                , ActivityDisplayName: activityDisplayName
                , ActivityName: activityName
                , Uploader: KStarForm.vmFormData.vmOperation.CurrentUserDisplayName
                , UploadedDate: dateNew
                , CreateBy: KStarForm.vmFormData.vmOperation.CurrentUserAccount
                , CreateTime: dateNew
                , IsComplete: false
            };
            _this.formattachmentsmodel.push(att);


            //文件上传
            axios({
                url: '/Portal/FileManage/UploadFileStream',
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: fd,
            }).then(function (res) {
                //关闭遮罩层
                loading.close();
                if (res.data.code == "S") {
                    att.DownloadUrl = res.data.path;
                    att.StoragePath = res.data.path;
                }
                else {
                    // 上传失败后，删除文件。直接提示
                    var index = _this.formattachmentsmodel.indexOf(att);
                    if (index > -1) {
                        _this.formattachmentsmodel.splice(index, 1);
                    }
                    _this.$message({
                        type: 'error',
                        message: res.data.msg
                    });
                }
            }).catch(function (error) {
                loading.close();
                //上传失败后，删除附件数据
                var index = _this.formattachmentsmodel.indexOf(att);
                if (index > -1) {
                    _this.formattachmentsmodel.splice(index, 1);
                }
            });
        },
        //上传
        beforeUpload: function (file) {
            var _this = this;
            var form = new FormData();
            //增加遮罩层
            this.$data.loading = true;
            axios({
                url: '/Portal/FileManage/UploadFileStream',
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: form,
            }).then(function (res) {
                if (res.responseCode === '100') {
                }
                //取消遮罩层
                _this.$data.loading = false;
            }).catch(function (error) {
                //取消遮罩层
                _this.$data.loading = false;
            });
        },
        // 删除文件
        deleteRow: function (rows) {
            if (KStarForm.vmFormData.vmFormType != "View" && KStarForm.vmFormData.vmOperation.CurrentUserAccount == rows.CreateBy
                && (KStarForm.vmFormData.vmOperation.ActivityName == rows.ActivityName ||
                    (KStarForm.vmFormData.vmOperation.ActivityName == null && rows.ActivityName === "开始") ||
                    (KStarForm.vmFormData.vmOperation.ActivityName == "000_重新提交" && rows.ActivityName === "开始"))) {
                rows.IsDeleted = true;
            } else {
                this.$message({
                    type: 'warning',
                    //只有上传人在上传节点才能删除
                    message: KStarForm.VM.$t("KStarForm.DeleteRowMessage")
                });
            }
        },
        //撤回删除文件
        roundRow: function (rows) {
            if (KStarForm.vmFormData.vmFormType != "View" && KStarForm.vmFormData.vmOperation.CurrentUserAccount == rows.CreateBy
                && (KStarForm.vmFormData.vmOperation.ActivityName == rows.ActivityName ||
                    (KStarForm.vmFormData.vmOperation.ActivityName == null && rows.ActivityName === "开始") ||
                    (KStarForm.vmFormData.vmOperation.ActivityName == "000_重新提交" && rows.ActivityName === "开始"))) {
                rows.IsDeleted = false;
            } else {
                this.$message({
                    type: 'warning',
                    //只有上传人在上传节点才能撤回删除
                    message: KStarForm.VM.$t("KStarForm.RoundRowMessage")
                });
            }
        },

    },


});
// 注册
Vue.component('moduletheattachment', moduleTheAttachment);

