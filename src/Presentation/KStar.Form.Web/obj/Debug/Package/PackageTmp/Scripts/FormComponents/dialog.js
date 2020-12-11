/*
 * @Description: 弹窗组件
 * @Author: hekai
 * @Date: 2019-11-23
 * @LastEditors: hekai
 * @LastEditTime: 2020-02-10
 */
var templateContent = '\
    <div>\
    <el-form-item label="" :prop="prop" :rules="rules">\
        <el-input v-model="inputValue" placeholder="请选择" v-on:focus="focusInputValue" :disabled="disabled ? disabled : false" readonly></el-input>\
    </el-form-item>\
    <el-dialog title="数据列表" :visible.sync="dialogVisible" :close-on-click-modal="false" width="850px" class="m-dialog" append-to-body>\
        <el-row :gutter="16">\
            <el-col :span="19"><el-input v-model="searchValue" placeholder="请输入搜索条件" size="mini" v-on:keyup.native.13="search"></el-input></el-col>\
            <el-col :span="5"><el-button type="primary" icon="el-icon-search"  round size="mini" v-on:click="search">搜索</el-button></el-col>\
        </el-row>\
        <el-table :data="filterDate.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="margin-top: 5px;text-align: center" stripe height="420" :loading="loading" v-on:selection-change="handleSelectionChange">\
            <el-table-column type="selection" width="120"></el-table-column>\
            <el-table-column v-for="(item, index) in tableColumns" :prop="item.prop" :label="item.label" :key="item.id" sortable show-overflow-tooltip></el-table-column>\
        </el-table>\
        <el-pagination v-if="showPageItem" class="fy"\
            layout = "total, sizes, prev, pager, next, jumper"\
            @size-change="handleSizeChange"\
            @current-change="current_change"\
            :current-page="pagesize"\
            :page-sizes="[5, 10, 20, 40]"\
            :page-size="pagesize"\
            :pager-count="5"\
            :total="total"\
            background\
            >\
        </el-pagination >\
        <span slot="footer" class="dialog-footer">\
            <el-button v-on:click="dialogVisible = false">取 消</el-button>\
            <el-button type="primary" v-on:click="commit">确 定</el-button>\
        </span>\
    </el-dialog>\
    </div>\
';
var dialogTemplate = Vue.extend({
    template: templateContent,
    props: ['value', 'disabled', 'visible', 'prop', 'required', 'tablename', 'customattr'],
    data: function () {
        return {
            total: 1,
            pagesize: 10,
            currentPage: 1,
            inputValue: this.value,
            rules: [{ required: this.required, message: '请从数据列表中选择数据', trigger: ['blur', 'change'] }],
            dialogVisible: false,
            searchValue: '',
            loading: false,
            showPageItem: false,
            tableColumns: [],
            tableData: [],
            filterDate: [],
            selectValue: []
        };
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    mounted: function () {
        //debugger;
        this.initData();
    },
    methods: {
        // 当值改变时传给父组件，父组件用v-model接收，
        changeInputValue: function (value) {
        },
        focusInputValue: function () {
            this.dialogVisible = true;
        },
        commit: function () {
            //var callBackCol = ["Name", "XH"];
            var callBackCol = [];
            var _hasCallBackConfig = false;
            if (this.customattr != null) {
                var _callBackAttr = JSON.parse(this.customattr);
                if (_callBackAttr != undefined) {
                    callBackCol = _callBackAttr.CallBackCol.split(",");
                    //是否配置了回写列字段
                    if (callBackCol.length > 0) _hasCallBackConfig = true;
                }
            }
            this.dialogVisible = false;
            if (this.selectValue.length > 0) {
                var list = [];
                this.selectValue.map(function (val) {
                    list.push(val);
                })

                var returnText = "";
                if (_hasCallBackConfig) {
                    _.forEach(list, function (item, index) {
                        console.log(index);
                        for (var iKey in item) {
                            for (var jKey in callBackCol) {
                                if (iKey == callBackCol[jKey]) {
                                    returnText += item[iKey] + '|';
                                }
                            }
                        }
                        returnText = returnText.slice(0, returnText.length - 1); //移除末尾的竖线间隔符
                        returnText += ",";
                    });
                    returnText = returnText.slice(0, returnText.length - 1); //移除整个字符串末尾的逗号分隔符
                    console.log(returnText);
                }

                var arr = JSON.stringify(list);
                //如果未配置回写列，则默认回写全部字段
                if (returnText == "") {
                    this.inputValue = arr;
                    this.$emit('input', arr);
                }
                else {
                    //配置了回写列字段，则仅显示回写列(若有多个字段用|竖线间隔)
                    this.inputValue = returnText;
                    this.$emit('input', returnText);
                }

            } else {
                this.inputValue = '';
                this.$emit('input', '');
            }

        },
        // 搜索
        search: function () {
            this.loading = true;
            var val = this.searchValue;
            var _QueryColumnName = "";
            if (this.customattr != null) {
                var _queryAttr = JSON.parse(this.customattr);
                if (_queryAttr != undefined && _queryAttr.QueryColumn != "" && _queryAttr.QueryColumn != undefined) {
                    _QueryColumnName = _queryAttr.QueryColumn;
                }
                else {
                    this.$alert("未设置查询列名!");
                    return false;
                }
            }
            else {
                this.$alert("未设置查询列名!");
                return false;
            }
            var _tableData = this.tableData;
            /* 开始进行后台搜索*/
            if (val != "") {
                var list = _tableData.filter(function (item) {
                    var searchItem = eval("item." + _QueryColumnName);
                    if (searchItem) return searchItem.indexOf(val) > -1;
                });
                this.total = list.length;
                this.filterDate = list;
                //每次点击'搜索'按钮之后，重新定位到第1页
                this.currentPage = 1;
            }
            else {
                this.filterDate = this.tableData;
                this.currentPage = 1;
                this.total = this.tableData.length;
            }
            this.loading = false;

        },
        // 初始化事件
        initData: function () {
            //获取数据表的名称
            //this.extendAttr = JSON.parse('{"ShowColumn":"编号,姓名,爱好","DataColumn":"id,Name,XH","QueryColumn":"Name","ShowPageItem":"true"}');
            var _customattr = JSON.parse(this.customattr);
            var isConfig = false; //如果有配置展示列及数据列，则从配置中设置数据列表属性

            if (_customattr != null) {
                var _showColumn = _customattr.ShowColumn;
                var _dataColumn = _customattr.DataColumn;
                var _showPageItem = _customattr.ShowPageItem;
                //是否启动分页
                if (_showPageItem != undefined)
                    this.showPageItem = _showPageItem;
                //展示列及数据列
                if (_showColumn != undefined && _dataColumn != undefined) {
                    var _showColumnArr = [];

                    _showColumn = _showColumn.split(",");
                    _dataColumn = _dataColumn.split(",");
                    _.forEach(_showColumn, function (item, index) {
                        var _columnArr = {
                            id: _dataColumn[index],
                            prop: _dataColumn[index],
                            label: item
                        };
                        _showColumnArr.push(_columnArr);
                    });
                    isConfig = true;
                }

                this.tableColumns = _showColumnArr;
            }

            var tabValue = this.tablename;
            //let tabValue = "temp_data";
            var _this = this;
            if (tabValue != undefined) {
                var url = '/api/GetDataSourceFromDB';
                axios.post(url, { DBTableName: tabValue }, { timeout: 1000*60*2 }).then(function (res) {
                    debugger;
                    //若没有配置，则从原始数据源从读取列名
                    if (!isConfig)
                        _this.tableColumns = JSON.parse(res.data.colData);
                    debugger;
                    _this.tableData = JSON.parse(res.data.data);
                    _this.total = _this.tableData.length;
                    _this.filterDate = _this.tableData;
                }).catch(function (err) {
                    console.log(err);
                    throw new Error(err);
                });
            }
        },
        handleSelectionChange: function (val) {
            this.selectValue = val;
        },
        current_change: function (currentPage) {
            this.currentPage = currentPage;
        },
        handleSizeChange: function (size) {
            this.pagesize = size;
            this.currentPage = 1;
        }
    }
});
// 注册
Vue.component('cus-dialog', dialogTemplate);


