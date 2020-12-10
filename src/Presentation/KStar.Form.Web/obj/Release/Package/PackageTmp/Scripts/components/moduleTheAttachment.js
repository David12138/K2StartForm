/*
 * @Description:附件
 * @Author:ytwang
 * @Date:2019-05-23 10:19:10
 * @LastEditors:ytwang
 * @LastEditTime:2019-06-10 03:40:42
 */
var templateContent = '\
    <div class="module-the-attachment">\
    <headersubtitle :header-title="attachmenttitle">\
        <i slot="subIcon" class="icon-sub icon iconfont iconfujian"></i>\
        <p class="tag-remind">\
            <i class="icon iconfont iconjinggao"></i>\
            文件大小不能超过{{ attachmentmodel.FileMaxSize }}M，为了确保各审批人能在手机端看到相关附件，请您使用标准化格式上传。标准化格式如下：{{ attachmentmodel.FileFormat }}。</p>\
        <div class="button-tools-text" v-if="formtype!==\'View\'">\
            <el-upload   class="upload-demo"  ref="uploadObj" :show-file-list="false" :action="this.uploadurl"  :on-change="onChangeObj"  :http-request="httpRequestObj"  :file-list="fileList"  :accept="attachmentmodel.FileFormatReplace">\
              <el-button size="mini" type="text" class="btn-text"><i class="icon iconfont iconbuzhouxinxi"></i>点击上传附件</el-button>\
            </el-upload>\
          </div>\
    <el-table  size="mini"  class="hidden-xs-only"  :data="filterType(formattachmentsmodel)"  :row-class-name="rowStyle" style="width:100%">\
        <el-table-column   prop="ActivityName"  min-width="100"  label="上传节点">\
        </el-table-column>\
        <el-table-column  prop="NewFileName" min-width="100" label="文件名称">\
            <template slot-scope="scope">\
                {{ scope.row.NewFileName }}\
                {{ scope.row.FileExtension }}\
            </template>\
        </el-table-column>\
        <el-table-column   prop="FileBytes"   width="80"  label="文件大小">\
            <template slot-scope="scope">\
                {{ scope.row.FileBytes }}K\
              </template>\
        </el-table-column>\
        <el-table-column prop="Uploader"  label="上传人">\
        </el-table-column>\
        <el-table-column  prop="UploadedDate" min-width="100" label="上传时间">\
            <template slot-scope="scope">\
                {{ scope.row.UploadedDate | dateformat(\'YYYY-MM-DD HH:mm\') }}\
             </template>\
        </el-table-column>\
        <el-table-column align="center"  label="操作">\
            <template slot-scope="scope">\
                <span v-if="scope.row.IsDeleted===false">\
                    <el-button size="mini"  type="text" icon="iconfont iconxiazai" @click.native.prevent="xiazaiRow(scope.row)"></el-button>\
                <el-button size="mini"   type="text" icon="iconfont iconchakan"  @click.native.prevent="chakanRow(scope.row)"></el-button>\
            <el-button size="mini" v-if="formtype!==\'View\'"  type="text" icon="iconfont iconshanchu"  @click.native.prevent="deleteRow(scope.row)"></el-button>\
            </span>\
    <span v-else>\
        <el-button size="mini"  type="text" icon="iconfont iconhuanyuan" @click.native.prevent="roundRow(scope.row)"></el-button>\
            </span>\
            </template>\
          </el-table-column>\
        </el-table>\
    <div class="hidden-sm-and-up" v-for="(item,index) in filterType(formattachmentsmodel)" :key="index">\
        <el-row class="wap-attachment">\
            <el-col :xs="4">\
              <i class="icon iconfont iconwenjiantxt attachment"></i>\
            </el-col>\
        <el-col :xs="18">\
              <a class="link">{{ item.NewFileName }}{{ item.FileExtension }}</a>\
        <p>{{ item.FileBytes }}KB {{ item.UploadedDate | dateformat(\'YYYY-MM-DD HH:mm\')}}</p>\
        <p>上传人：{{ item.Uploader }}</span>\
        <p>上传人：{{ item.ActivityName }}</p>\
            </el-col>\
    <el-col :xs="2">\
        <i class="icon iconfont iconxiala"></i>\
    </el-col>\
          </el-row>\
        </div>\
      </headersubtitle>\
    </div>\
';
var moduleTheAttachment = Vue.extend({
    template: templateContent,
    props: ['formtype', 'attachmentmodel', 'formattachmentsmodel', 'attachmenttype','attachmenttitle'],
    data: function () {
        return {
            uploadFile: null,
            tablebtn: true,
            dialogTableVisible: false,
            // 上传
            uploadurl: '',
            fileList: []
        };
    },

    mounted: function () {
        this.getAttachments();
    },
    methods: {
        filterType: function (rows) {
            var _this = this;
            return rows.filter(function (row) {
                return row.Type === _this.attachmenttype;
            })
        },
        rowStyle: function (row, rowIndex) {
            if (row.IsDeleted === true) {
                return 'isDelete'
            } else {
                return ''
            }
        },
        xiazaiRow: function (row) {
            var that = this;
            axios({
                url: '/Portal/FileManage/DownloadFileStream',
                method: 'post',
                responseType: 'blob',
                data: {
                    filePath: row.DownloadUrl
                },
            }).then(function (res) {
                const content = res.data;
                const dowLoadFileName = row.NewFileName + '.' + row.FileExtension;
                that.exportSearchList(dowLoadFileName, content);
            }).catch(function (error) {
                throw error;
            });
        },
        chakanRow: function (row) {//增加预览
            axios({
                url: '/Portal/PreviewOnline/GetLink?path=' + encodeURIComponent(row.DownloadUrl), //参数放到data,后台获取不到
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then(function (res) {
                var url = res.data;
                if (url) {
                    window.open('/Portal/PreviewOnline/PreviewOnline' + "?path=" + encodeURIComponent(url))
                }
                console.log(res.data, '111')
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

            var _this = this;
            var ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
            var fileName = file.name.substring(0, file.name.lastIndexOf('.'));
            var fd = new FormData();
            fd.append('stream', file);
            fd.append('path', '');
            fd.append('fileExt', ext);

            if (file.size > _this.attachmentmodel.FileMaxSize * 1024 * 1024) {
                this.$message.error('文件大小超过限制');
                return false;
            }

            var fileExtArray = _this.attachmentmodel.FileFormatReplace.replace(/\./g, '').split(",");
            if (_.indexOf(fileExtArray, ext) === -1) {
                this.$message.error('文件格式不正确');
                return false;
            }

            axios({
                url: '/Portal/FileManage/UploadFileStream',
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: fd,
            }).then(function (res) {

                if (res.data.code == "S") {
                    var time = new Date();
                    var m = time.getMonth() + 1;
                    var date = time.getFullYear() + "-" + m + "-"
                        + time.getDate() + " " + time.getHours() + ":"
                        + time.getMinutes() + ":" + time.getSeconds();
                    var activityName = "开始";
                    var activityDisplayName = "开始";
                    if (KStarForm.vmFormData.vmOperation.ActivityName) {
                        activityName = KStarForm.vmFormData.vmOperation.ActivityName;
                        activityDisplayName = KStarForm.vmFormData.vmOperation.ActivityDisplayName;
                    }
                    _this.formattachmentsmodel.push({
                        FileBytes: file.size, FileType: file.type, FileExtension: '.' + ext
                        , Type: _this.attachmenttype
                        , OldFileName: fileName, NewFileName: fileName
                        , DownloadUrl: res.data.path, StoragePath: res.data.path
                        , IsDeleted: false
                        , FormId: KStarForm.vmFormData.vmOperation.FormId
                        , ActivityDisplayName: activityDisplayName
                        , ActivityName: activityName
                        , Uploader: KStarForm.vmFormData.vmOperation.CurrentUserDisplayName
                        , UploadedDate: date
                        , CreateBy: KStarForm.vmFormData.vmOperation.CurrentUserAccount
                        , CreateTime: date
                    });
                }
                else {
                    _this.$message({
                        type: 'error',
                        message: res.data.msg
                    });
                }
            }).catch(function (error) {

            });
        },
        //上传
        beforeUpload: function (file) {
            var _this = this;
            const form = new FormData();

            axios({
                url: '/Portal/FileManage/UploadFileStream',
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: form,

            }).then(function (res) {
                if (res.responseCode === '100') {
                    console.log(res.responseCode);
                }
            }).catch(function (error) {


            });

        },
        // 删除行
        deleteRow: function (rows) {
            if (KStarForm.vmFormData.vmFormType != "View" && KStarForm.vmFormData.vmOperation.CurrentUserAccount == rows.CreateBy
                && (KStarForm.vmFormData.vmOperation.ActivityName == rows.ActivityName ||
                    (KStarForm.vmFormData.vmOperation.ActivityName == null && rows.ActivityName === "开始"))) {
                rows.IsDeleted = true;
            } else {
                this.$message({
                    type: 'warning',
                    message: '只有上传人在上传节点才能删除'
                });
            }
        },
        roundRow: function (rows) {
            if (KStarForm.vmFormData.vmFormType != "View" && KStarForm.vmFormData.vmOperation.CurrentUserAccount == rows.CreateBy
                && (KStarForm.vmFormData.vmOperation.ActivityName == rows.ActivityName ||
                    (KStarForm.vmFormData.vmOperation.ActivityName == null && rows.ActivityName === "开始"))) {
                rows.IsDeleted = false;
            } else {
                this.$message({
                    type: 'warning',
                    message: '只有上传人在上传节点才能撤回删除'
                });
            }
        },

    },


});
// 注册
Vue.component('moduletheattachment', moduleTheAttachment);


Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
