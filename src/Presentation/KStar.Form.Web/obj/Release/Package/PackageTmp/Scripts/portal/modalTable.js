/*
 * @Description: table
 * @Author: wenshaozhen
 * @Date: 2019-08-01
 * @LastEditors: wenshaozhen
 * @LastEditTime: 
 */
var templateContent = '\
    <el-table ref="multipleTable" :data="tableData" size="mini" border style="width: 100%;" v-on:selection-change="handleSelectionChange" v-on:sort-change="sortChange" v-loading="loading"  class="my-table">\
        <el-table-column type="selection"  width="40" :selectable="isSelectable" v-if="selection"></el-table-column>\
        <el-table-column :label="$t(\'Portal.HomeProcessFlowChart\')" width="65" v-if="isflowviewurl" class="flow-num" align="center">\
            <template slot-scope="scope">\
                <i class="ic-see bgy font-theme" v-on:click="gotoOther(scope.row.FlowViewUrl)"></i>\
            </template>\
        </el-table-column>\
        <el-table-column v-for="(item, index) in tableColumns" :key="index"  :label="item.label" :prop="item.prop" :width="item.width" :sortable="item.sortable" :minWidth="130">\
            <template slot-scope="scope">\
                <el-row v-if="item.link"><a v-on:click="gotoOther(scope.row.Url, scope.row.IsRead)" :title="scope.row[item.prop]">{{ scope.row[item.prop] }}</a></el-row>\
                <el-row v-else-if="item.popover && item.prop == \'FormSubject\' ">\
                    <el-popover placement="right" width="450" trigger="hover" popper-class="my-poper-style" v-if="getSummary(scope.row.Summary)">\
                        <div v-html="scope.row.Summary"></div>\
                        <a slot="reference" v-on:click="gotoOther(scope.row.Url, scope.row.IsRead)" class="red1">{{ scope.row.FormSubject }}</a>\
                    </el-popover>\
                    <a v-else v-on:click="gotoOther(scope.row.Url, scope.row.IsRead)" :title="scope.row.FormSubject">{{ scope.row.FormSubject }}</a>\
                </el-row>\
                <el-row v-else-if="item.popover && item.prop == \'ApprovalUsers\' ">\
                    <el-popover placement="bottom-start"  width="300"   popper-class="my-poper-style" trigger="hover" \
                        v-if="scope.row.ActivityDisplayName || scope.row.ApprovalUsers">\
                        <el-row class="flow-table-approval-user"><el-col>{{ scope.row.ActivityDisplayName  ? scope.row.ActivityDisplayName.toString().replace(\'重新提交\', \'开始\') : \'\' }} {{scope.row.ActivityDisplayName  ? \':\' : \'\'}} {{ scope.row.ApprovalUsers}}</el-col></el-row>\
                        <div slot="reference" class="ellipsis-one">{{ scope.row.ActivityDisplayName ? scope.row.ActivityDisplayName.toString().replace(\'重新提交\', \'开始\') + \"：\" : scope.row.ActivityDisplayName }}{{ scope.row.ApprovalUsers }}</div>\
                    </el-popover>\
                </el-row>\
                <el-row v-else-if="item.time" :title="getFormatDate(scope.row[item.prop], item.prop)">{{ getFormatDate(scope.row[item.prop], item.prop) }}</el-row>\
                <el-row v-else-if="item.timeLen" :title="getWaitingTime(scope.row[item.startProp])">{{ getWaitingTime(scope.row[item.startProp]) }}</el-row>\
                <el-row v-else-if="item.proStatus" :title="getProcessStatus(scope.row[item.prop])">{{ getProcessStatus(scope.row[item.prop]) }}</el-row>\
                <el-row v-else :title="scope.row[item.prop]">{{ scope.row[item.prop] }}</el-row>\
            </template>\
        </el-table-column>\
        <template slot="empty">\
            <img src="../../Content/portal/images/empty.png" />\
        </template>\
    </el-table>\
';
var modalTable = Vue.extend({
    template: templateContent,
    props: ['tableColumns', 'tableData', 'loading', 'form', 'isflowviewurl', 'selection'],
    data: function () {
        return {
            selectRows: [],
            forms: this.form,
            height: document.body.clientHeight - 300 + 'px'
        }
    },
    mounted: function() {
        var that = this
    },
    methods: {
        getWaitingTime: function (data) {
            if (data) {
                var time = new Date().getTime()
                var end =  moment(time).format('YYYY/MM/DD HH:mm');
                var start = moment(data).format('YYYY/MM/DD HH:mm');
                var datel = new Date(end) - new Date(start);
                if (datel) {
                    var hour=parseInt(datel/3600000); 
                    var minute= parseInt((datel - hour * 3600000)/60000); 
                    return hour + this.$t('Portal.Hour') + minute + this.$t('Portal.Minute');
                } else {
                    return '0' + this.$t('Portal.Minute');
                }
            }
        },
        // 判断后台返回来的值是否为空
        getSummary: function (val) {
            return val && val.replace(/<[^<>]+>/g, '').trim().length > 0;
        },
        // 是否可以勾选
        isSelectable: function (row, index) {
            if ('/Portal/Home/Draft,/Portal/Home/QueryProcess'.indexOf(sessionStorage.getItem('navUrl')) > -1) {
                return 1
            } else if (sessionStorage.getItem('navUrl').indexOf('/Portal/Home/MyCCTasks') > -1) {
                if (row.IsRead) {
                    return 0
                } else {
                    return 1
                }
            } else if (sessionStorage.getItem('navUrl').indexOf('/Portal/Home/ApplicationTasks') > -1) {
                if (row.Status=="2") {
                    return 1
                } else {
                    return 0
                }
            }
            else {
                if (row.IsBatchApproval) {
                    return 1
                } else {
                    return 0
                }
            }

        },
        // 表格勾选的数据
        handleSelectionChange: function (rows) {
            this.selectRows = rows
            this.$emit('handleselectrow', this.selectRows)
        },
        // 日期转换
        getFormatDate: function (date, name) {
            // if (date) { return name == 'ProcessingDate' ? moment(date).format('YYYY-MM-DD HH:mm') : moment(date).format('YYYY-MM-DD') }
            if (date) { return moment(date).format('YYYY-MM-DD HH:mm:ss') } // 2019-11-14 wsz
            
        },
        // 去其他页面
        gotoOther: function (url, IsRead) {
            window.open(url, '_blank')
            // 如果是抄送我的，则要刷新table数据和菜单栏数据
            if (sessionStorage.getItem('navUrl') == '/Portal/Home/MyCCTasks') {
                if (!IsRead) {
                    this.$emit('refreshdata')
                }
            }
        },
        // 筛选
        sortChange: function (val) {
            this.forms.SortField = val.prop
            this.forms.SortDirection = val.order ? val.order.replace('ending', '') : this.forms.SortDirection
            this.forms.PageIndex = 1
            this.$emit('handlesort', this.forms)
        },
        getProcessStatus: function (data) {
            if (data) {
                switch (data) {
                    case '流程异常':
                        return this.$t('Portal.ProError');
                        break;
                    case '运行中':
                        return this.$t('Portal.ProInOperation');
                        break;
                    case '审批通过':
                        return this.$t('Portal.ProApprovalComplete');
                        break;
                    case '作废':
                        return this.$t('Portal.ProCancel');
                        break;
                    case '删除':
                        return this.$t('Portal.ProDelete');
                        break;
                    case '终审通过':
                        return this.$t('Portal.ProFinalAdoption');
                        break;
                    case '拒绝':
                        return this.$t('Portal.ProRefuse');
                        break;
                    case '异常结束':
                        return this.$t('Portal.ProAbnormalEnd');
                        break;
                    default:
                        return data;
                }
            }
        },
    }
});
// 注册
Vue.component('modaltable', modalTable);


