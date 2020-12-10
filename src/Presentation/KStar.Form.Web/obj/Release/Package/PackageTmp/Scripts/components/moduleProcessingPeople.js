/*
 * @Description:当前处理人
 * @Author:ytwang
 * @Date:2019-05-22 20:00:38
 * @LastEditors:ytwang
 * @LastEditTime:2019-05-23 10:23:04
 */
var templateContent = '\
    <div class="module-processing-people">\
    <headersubtitle header-title="当前处理人">\
        <i slot="subIcon" class="icon-sub icon iconfont icondangqianchuliren"></i>\
            <el-table\
                size="mini" empty-text="加载中"\
                class="processing-people hidden-xs-only"\
          :data="CurrentUserList"\
                style="width:100%">\
                <el-table-column\
                    prop="ActivityDisplayName"\
                    label="当前节点">\
                </el-table-column>\
                <el-table-column\
                    prop="ApproverName"\
                    label="当前处理人">\
                </el-table-column>\
            </el-table>\
                <div class="processing-people hidden-sm-and-up">\
                    <div class="personnel-list" v-for="(item,i) in CurrentUserList">\
                        <el-row>\
                            <el-col :xs="8">\
                <div class="position-item">\
                                {{ item.ActivityDisplayName }}\
                            </div>\
              </el-col>\
                        <el-col :xs="4">\
                  <svg width="100%" height="40">\
                            <line x1="15" y1="18" x2="100" y2="18" stroke-dasharray="3 3" stroke="#dedede" />\
                            <circle class="demo2" cx="10" cy="18" r="5" fill="none" stroke="#dedede" stroke-width="3" />\
                        </svg>\
              </el-col>\
                    <el-col :xs="12">\
                <div class="name-item">\
                        <div class="name">\
                            <i class="icon iconfont iconwo"></i>{{ item.ApproverName }}\
                        </div>\
                        <span></span>\
                    </div>\
              </el-col>\
            </el-row>\
          </div>\
        </div>\
      </headersubtitle>\
    </div>\
';
var moduleProcessingPeople = Vue.extend({
    template: templateContent,
    props: {

    },
    data: function () {
        return {
            CurrentUserList: []
        };
    },
    beforeCreate: function () {
        //当前处理人
        var url = getControllerName() + "/GetCurrApproversData";
        var _this = this;
        $post(url, { formId: KStarForm.vmFormData.vmFormInstance.Id }, function (response) {
            if (response.status == 200) {
                _this.CurrentUserList = response.data.data;
            }
        }, function (error) {
            console.log(error);
        });
    },
    methods: {

    }
});
// 注册
Vue.component('moduleprocessingpeople', moduleProcessingPeople);


