/*
 * @Description: 相关流程
 * @Author: ytwang
 * @Date: 2019-05-23 10:19:12
 * @LastEditors: ytwang
 * @LastEditTime: 2019-06-10 03:38:15
 */
var templateContent = '\
    <div class="module-related-processes">\
    < headersubtitle header-title="相关流程" >\
        <i slot="subIcon" class="icon-sub icon iconfont iconxiangguanliucheng"></i>\
        <div class="button-tools-text">\
            <el-button size="mini" type="text" class="btn-text" @click="dialogTableVisible = true"><i class="icon iconfont iconliucheng"></i>点击选择流程</el-button>\
        </div >\
    <el-form size="mini" label-width="100px">\
        <el-table  class="related-processes hidden-xs-only m-form-table" size="mini" : data="tableData2"  style="width: 100%;font-size: 12px">\
          <el-table-column  min-width="100"  prop="number"  label="流程编号">\
            <template slot-scope="scope">\
                <a : href="\'https://\' + scope.row.url"  target="_blank"  class="buttonText">{{ scope.row.number }}</a>\
            </template>\
          </el-table-column>\
    <el-table-column prop="processtype" label="流程分类">\
    </el-table-column>\
    <el-table-column  prop="processname" label="流程主题">\
    </el-table-column>\
    <el-table-column  prop="name"   label="申请人">\
    </el-table-column>\
    <el-table-column  prop="date"   label="申请日期">\
    </el-table-column>\
    <el-table-column   align="center" width="100" prop="date" label="操作">\
        <template slot-scope="scope">\
            <el-button size="mini" @click="open" type="text" icon="iconfont iconshanchu"></el-button>\
              </template>\
            </el - table - column >\
          </el - table - column >\
        </el - table >\
    <el-row class="hidden-sm-and-up wap-related-processes-list" v-for="(item,index) in tableData2" : key="index">\
        <el-col : xs="24" :sm="24" :md="12" :lg="8">\
                <el-form-item label="流程编号" class="item-is-border">\
            <a : href="\'https://\' + item.url" target="_blank" class="link">\
                    {{ item.number }}\
                  </a>\
                </el-form-item>\
            </el - col >\
    <el-col : xs="24" : sm="24" : md="12" : lg="8">\
        <el-form-item label="流程分类">\
            <div>{{ item.processtype }}</div>\
        </el-form-item>\
    </el-col>\
    <el-col : xs="24" : sm="24" : md="12" : lg="24">\
        <el-form-item label="流程主题">\
            <div><a>{{ item.processname }}</a></div>\
        </el-form-item>\
    </el-col>\
    <el-col : xs="24" : sm="24" : md="12" : lg="8">\
        <el-form-item label="申请人">\
            <div>{{ item.name }}</div>\
        </el-form-item>\
    </el-col>\
    <el-col : xs="24" : sm="24" : md="12" : lg="8">\
        <el-form-item label="申请日期">\
            <div>{{ item.date }}</div>\
        </el-form-item>\
    </el-col>\
          </el - row >\
        </el - form >\
      </headersubtitle >\
    <el-dialog title="选择流程" : visible.sync="dialogTableVisible">\
    </el-dialog>\
    </div >\
';
var moduleRelatedProcesses = Vue.extend({
    template: templateContent,
    props: {
      formType: {
        type: String,
        default:'',
        require: true,
      },
    },
    data: function () {
      return {
        dialogTableVisible: false,
        tableData2: [{
          number: 'FYI-09050500001',
          processtype: '集团总部-投资管理',
          processname: '报销申请流程',
          name: 'BAY32.崔云恋',
          date: '2019-05-05 10:10',
          url:'www.baidu.com'
      }, {
          number: 'FYI-09050500002',
          processtype: '集团总部-投资管理',
          processname: '报销申请流程',
          name: 'BAED19.周桂方',
          date: '2019-05-05 10:10',
          url:'www.qq.com'
      }],
      };
    },
    methods: {
        open: function() {
          this.$confirm('确定删除吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function() {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(function() {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        }
    }
  });
   // 注册
  Vue.component('modulerelatedprocesses', moduleRelatedProcesses);
  
  
  