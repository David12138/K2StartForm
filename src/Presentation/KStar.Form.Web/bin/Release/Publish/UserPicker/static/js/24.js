webpackJsonp([24],{712:function(t,e,i){"use strict";var a=i(160),s=i.n(a),r=i(67),n=(i(1),i(359),{name:"",props:{rowData:{type:Object}},data:function(){return{activeName:"flowStep",templateStep:[],logData:[],flowChartdata:[],processtemplatename:"",activeIndex:0,loading:!1}},mounted:function(){this.burialPointEvent("列表-流程图图标"),this.burialPointEvent("列表-流程步骤"),this.getFlowStep(),this.closeProcessImg()},methods:{burialPointEvent:function(t){r.a.burialPoint(this.$route.name+"-"+t)},labelHead:function(t,e){var i=e.column;e.index;return t("span",{attrs:{title:i.label}},[null!=i.label&&i.label.length>12?i.label.substr(0,12)+"...":i.label])},close:function(){this.$emit("hideComponent")},closeProcessImg:function(){var t=this;document.getElementsByClassName("pc-candidates")[0].addEventListener("click",function(e){"pc-candidates"===e.target.classList[0]&&t.$emit("hideComponent")})},handleClick:function(t,e){switch(t.name){case"flowStep":break;case"flowChart":this.flowChartdata&&0!=this.flowChartdata.length||this.getFlowChart();break;case"flowLog":this.logData&&0!=this.logData.length||this.getFlowLog()}},getFlowStep:function(){var t=this,e=t.rowData.procInstID,i=(t.rowData.procInstNo,{procinstid:e});t.loading=!0,t.$axios.post("/api/vkProcess/step",i).then(function(e){var i=e.data;t.processtemplatename=i.processtemplatename;var a=!0,r=!1,n=void 0;try{for(var c,o=s()(i.result);!(a=(c=o.next()).done);a=!0){var l=c.value,h=l.finishdate,d=l.startdate,u="";t.CheckDateTime(d)&&t.CheckDateTime(h)&&(u=t.returnatetime(d,h));var p={activityname:l.activityname,stepData:[{username:l.username,finishdate:h,useTime:u}]};t.templateStep.push(p)}}catch(t){r=!0,n=t}finally{try{!a&&o.return&&o.return()}finally{if(r)throw n}}t.loading=!1}).catch(function(e){t.loading=!1,t.$message.error("获取流程步骤失败！"+e)})},returnatetime:function(t,e){t=t.replace(new RegExp(/-/gm),"/"),e=e.replace(new RegExp(/-/gm),"/");var i=new Date(t),a=new Date(e).getTime()-i.getTime(),s=a%864e5,r=s%36e5,n=r%6e4;return Math.floor(a/864e5)+"天 "+Math.floor(s/36e5)+"小时 "+Math.floor(r/6e4)+" 分钟"+Math.round(n/1e3)+" 秒"},CheckDateTime:function(t){var e=t.match(/^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);if(null==e)return!1;e[2]=e[2]-1;var i=new Date(e[1],e[2],e[3],e[4],e[5],e[6]);return i.getFullYear()==e[1]&&(i.getMonth()==e[2]&&(i.getDate()==e[3]&&(i.getHours()==e[4]&&(i.getMinutes()==e[5]&&i.getSeconds()==e[6]))))},getFlowLog:function(){var t=this,e={procinstid:this.rowData.procInstID};t.loading=!0,t.$axios.post("/api/vkProcess/log",e).then(function(e){t.logData=e.data.result,t.loading=!1}).catch(function(e){t.loading=!1,t.$message.error("获取流程日志失败！"+e)})},getFlowChart:function(){var t=this,e=this,i=e.rowData.procInstID;e.loading=!0,e.$axios.post("/api/vkProcess/img",{procinstid:i}).then(function(i){var a=i.data.result,s=a.stepObj,r=a.stepName,n=a.activity;e.setStepValue(n,s,r),t.flowChartdata=e.split(n),e.loading=!1}).catch(function(i){e.loading=!1,t.$message.error("获取流程图失败！"+i)})},setStepValue:function(t,e,i){if(!e&&!i){var a=!0,r=!1,n=void 0;try{for(var c,o=s()(t);!(a=(c=o.next()).done);a=!0){c.value.status="finish"}}catch(t){r=!0,n=t}finally{try{!a&&o.return&&o.return()}finally{if(r)throw n}}}if(e&&i){var l=!0,h=!1,d=void 0;try{for(var u,p=s()(t);!(l=(u=p.next()).done);l=!0){var m=u.value;Number(m.activityorder)<Number(e.activityorder)?(m.activityname+="(已完成)",m.status="finish"):Number(m.activityorder)==Number(e.activityorder)?(m.activityname+="(审批中)",m.status="process"):Number(m.activityorder)>Number(e.activityorder)&&(m.activityname+="(未审批)",m.status="wait")}}catch(t){h=!0,d=t}finally{try{!l&&p.return&&p.return()}finally{if(h)throw d}}this.activeIndex=Number(e.activityorder)}if(!e&&i){var f=!0,g=!1,v=void 0;try{for(var C,k=s()(t);!(f=(C=k.next()).done);f=!0){var D=C.value;D.activityname+="(未审批)",D.status="wait"}}catch(t){g=!0,v=t}finally{try{!f&&k.return&&k.return()}finally{if(g)throw v}}}t.unshift({activityid:"start_",activityname:"开始",status:"finish"})},split:function(t){for(var e=[],i=Math.ceil(t.length/5);i>0;)e.push(t.slice(5*(i-1),5*i)),i--;return e=e.reverse()}}}),c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"flow_chart"},[i("div",{staticClass:"pc-candidates pc-background"},[i("div",{staticClass:"dialog_content"},[i("div",{staticClass:"top"},[t._v("流程图"),i("span",{staticStyle:{cursor:"pointer","font-size":"30px"},on:{click:t.close}},[t._v("×")])]),t._v(" "),i("div",{staticClass:"initProcess"},[i("el-tabs",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{type:"border-card","element-loading-text":"拼命加载中","element-loading-background":"rgba(255, 255, 255, 0.8)"},on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[i("el-tab-pane",{attrs:{calss:"steps",name:"flowStep"}},[i("span",{attrs:{slot:"label",name:"step"},slot:"label"},[i("i",{staticClass:"iconfont icon-processsteps"}),t._v(" 流程步骤")]),t._v(" "),i("div",{staticClass:"content"},[i("div",{staticClass:"content-top"},[i("h2",{staticClass:"name"},[t._v("流程模板："),i("span",[t._v(t._s(t.processtemplatename))])])]),t._v(" "),i("div",{staticClass:"scrollDiv"},t._l(t.templateStep,function(e,a){return i("div",{key:a,staticClass:"clearfix"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.stepData,border:""}},[i("el-table-column",{attrs:{label:(a+1).toString(),align:"center",width:"50"}}),t._v(" "),i("el-table-column",{attrs:{prop:"username",label:e.activityname,align:"center","render-header":t.labelHead,width:"180"}}),t._v(" "),i("el-table-column",{attrs:{prop:"finishdate",label:"填单时间",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{label:"所用时间",align:"center",prop:"useTime"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.useTime))]}}])})],1)],1)}))])]),t._v(" "),i("el-tab-pane",{attrs:{name:"flowChart"}},[i("span",{attrs:{slot:"label"},on:{click:function(e){t.burialPointEvent("列表-流程图-流程图")}},slot:"label"},[i("i",{staticClass:"iconfont icon-flowchart"}),t._v(" 流程图")]),t._v(" "),i("div",[i("el-steps",{attrs:{"align-center":!0}},t._l(t.flowChartdata,function(e,a){return i("div",{key:a,staticClass:"step-linerow"},t._l(e,function(t){return i("el-step",{key:t.activityid,attrs:{status:t.status,title:t.activityname.length>27?t.activityname.substr(0,25)+"...":t.activityname}})}))}))],1)]),t._v(" "),i("el-tab-pane",{attrs:{name:"flowLog"}},[i("span",{attrs:{slot:"label"},on:{click:function(e){t.burialPointEvent("列表-流程图-操作日志")}},slot:"label"},[i("i",{staticClass:"iconfont icon-operationlog"}),t._v(" 操作日志")]),t._v(" "),[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.logData,border:""}},[i("el-table-column",{attrs:{label:" ",type:"index","header-align":"center",width:"50"}}),t._v(" "),i("el-table-column",{attrs:{prop:"username",label:"操作人","header-align":"center","win-width":"160"}}),t._v(" "),i("el-table-column",{attrs:{prop:"timestamp",label:"时间","header-align":"center","win-width":"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("moment")(e.row.timestamp,"YYYY-MM-DD HH:mm:ss")))]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"message","header-align":"center",width:"135",label:"操作结果"}})],1)]],2)],1)],1)])])])},staticRenderFns:[]};var o=i(47)(n,c,!1,function(t){i(713)},"data-v-46b706d8",null);e.a=o.exports},713:function(t,e){},714:function(t,e,i){"use strict";var a=i(160),s=i.n(a),r={name:"selectedPersonnel",props:{childDataUrl:{type:Object,required:!0},closeShow:!1,oneCheck:{type:Boolean,default:!0}},mounted:function(){this.childDataUrl.chooseProject&&this.childDataUrl.chooseProject.item&&this.childDataUrl.chooseProject.last&&(this.treeNode=this.childDataUrl.chooseProject.item,this.last=this.childDataUrl.chooseProject.last,this.checkedCitie.push(this.treeNode))},data:function(){return{organName:"",mianbao:[],value:"",options:[],bread:"",fullSearch:"",treeSearch:"",checkAll:!1,checkedCitie:[],cities:[],isIndeterminate:!1,organizationData:[],oldtime:0,defaultProps:{children:"m_ChildOrg",label:"orgName",isLeaf:function(t,e){return!(t&&t.isParent>0)}},last:{},treeNode:{},isActive:!1,tooltipOrganName:"",defaultKeys:[],isSeach:!1,treeQuery:!1}},watch:{treeSearch:function(t){var e=this;e.treeQuery=!0,e.queryName=t,this.loading=!0,this.isSeach||""==e.queryName.trim()||(this.isSeach=!0,setTimeout(function(){e.isSeach=!1,e.searchTree(e.queryName)},2e3))}},methods:{searchTree:function(t){var e=this,i=null;this.childDataUrl.isFirst&&(i=this.childDataUrl.isFirst),this.$axios.post("/api/"+this.childDataUrl.getTree,{orgName:t,isFirst:i}).then(function(t){e.organizationData=e.toTree(t.data.result)}).catch(function(t){e.$message.error("查询部门组织数据失败!ERROR MESSAGE:"+t)})},pullBtnHeightChange:function(){this.isActive=!this.isActive},disposeOrganName:function(t){for(var e="",i=0;i<t.length;i++){e+=t[i].text+">"}return e=e.substr(0,e.length-1),this.tooltipOrganName=e,e.length>30?this.bread=e.substr(0,30)+"...":this.bread=e,e},handleNodeClick:function(t,e){var i=(new Date).getTime();if(this.oldtime&&i-this.oldtime<200)return this.treeNode.orgFullName=e.data.orgFullName,this.treeNode.orgID=e.data.orgID,this.treeNode.orgName=e.data.orgName,this.treeNode.parentOrgID=e.data.parentOrgID,this.clickDepartment(this.treeNode),void this.$emit("sureSubmit",{type:"project",item:this.treeNode,last:this.last});if(this.oldtime=i,e.isLeaf){this.cities=[];var a={};a.isParent=t.isParent,a.orgFullName=t.orgFullName,a.orgID=t.orgID,a.orgName=t.orgName,a.parentOrgID=t.parentOrgID,this.cities.push(a)}else{this.cities=[];for(var s=0;e.childDatas&&s<e.childDatas.length;s++)this.cities.push(e.childDatas[s])}for(s=0;s<this.cities.length;s++){for(var r=!1,n=0;n<this.checkedCitie.length;n++)if(this.cities[s].orgID===this.checkedCitie[n].orgID){r=!0;break}this.cities[s].checked=!!r}this.mianbao=[],this.getPrarentNode(e),this.disposeOrganName(this.mianbao)},handleNodeload:function(t,e){var i=this;if(t.data&&0!=t.data.length)if(this.mianbao=[],t.data.m_ChildOrg&&t.data.m_ChildOrg.length>0){var a=[];t.childDatas=[];for(var s=0;s<t.data.m_ChildOrg.length;s++)a.push(t.data.m_ChildOrg[s]),t.childDatas.push(t.data.m_ChildOrg[s]);delete t.data.m_ChildOrg,e(a)}else this.$axios.post("/api/"+this.childDataUrl.getTree,{orgDepId:t.data.orgID}).then(function(a){if(200===a.status){t.childDatas=[],i.cities=[];for(var s=0;s<a.data.result.length;s++)t.childDatas.push(a.data.result[s]),i.cities.push(a.data.result[s]);e(a.data.result)}else i.$message.error("请求失败！")}).catch(function(t){that.$message.error("查询数据失败!ERROR MESSAGE:"+t)});else this.getTree(e)},getTree:function(t){var e=this,i=null;this.childDataUrl.isFirst&&(i=this.childDataUrl.isFirst),this.$axios.post("/api/"+this.childDataUrl.getTree,{orgDepId:"A5A40ECE-0DBD-4F2B-89E8-6BA91B91EBF4",isFirst:i}).then(function(i){200===i.status?(e.organizationData=e.toTree(i.data.result),t&&(t(e.organizationData),e.defaultKeys[0]=e.organizationData[0].orgID)):e.$message.error("请求失败！")}).catch(function(t){e.$message.error("查询部门组织数据失败!ERROR MESSAGE:"+t)})},sureSubmit:function(){this.checkedCitie&&0!==this.checkedCitie.length?this.oneCheck?this.$emit("sureSubmit",{type:"project",item:this.treeNode,last:this.last}):this.$emit("sureSubmit",{type:"project",items:this.checkedCitie}):this.$message.warning("请选择数据!")},close:function(){this.$emit("hideComponent")},searchProject:function(){},toTree:function(t){if(null==t||0==t.length)return[];t.forEach(function(t){delete t.m_ChildOrg});var e={};t.forEach(function(t){e[t.orgID]=t});var i=[];return t.forEach(function(t){var a=e[t.parentOrgID];a?(a.m_ChildOrg||(a.m_ChildOrg=[])).push(t):i.push(t)}),i},checkChangeNode:function(t,e,i){},handleCheckAllChange:function(t){if(t){for(var e=0;e<this.cities.length;e++){for(var i=!1,a=0;a<this.checkedCitie.length;a++)this.checkedCitie[a].orgID===this.cities[e].orgID&&(i=!0);i||this.checkedCitie.push(this.cities[e])}this.isIndeterminate=!0}else{for(e=0;e<this.cities.length;e++){for(i=!1,a=0;a<this.checkedCitie.length;a++)if(this.checkedCitie[a].orgID===this.cities[e].orgID){i=!0;break}i&&this.checkedCitie.splice(a,1)}this.isIndeterminate=!1}},handleCheckedCitiesChange:function(t){this.checkedCitie=t;var e=t.length;this.checkAll=e===this.cities.length,this.isIndeterminate=e>0&&e<this.cities.length},clickDepartment:function(t){var e=this;this.checkedCitie.splice(0,this.checkedCitie.length),this.checkedCitie.push(t);var i=this.$refs.tree2.getNode(t.orgID);this.mianbao=[],this.getPrarentNode(i),e.organName="";var a=!0,r=!1,n=void 0;try{for(var c,o=s()(e.mianbao);!(a=(c=o.next()).done);a=!0){var l=c.value;e.organName+=l.text+">"}}catch(t){r=!0,n=t}finally{try{!a&&o.return&&o.return()}finally{if(r)throw n}}e.organName+=""+t.orgName,e.treeNode=t,e.last.lastNode="",e.last.lastId="",e.mianbao.forEach(function(t){e.last.lastNode+=t.text+"-",e.last.lastId=t.petId}),e.last.lastNode=e.last.lastNode.substr(0,e.last.lastNode.length-1)},dblclickCheckedCitie:function(t){this.clickDepartment(t),this.$emit("sureSubmit",{type:"project",item:t,last:this.last})},deleteProject:function(t,e){this.checkedCitie.splice(e,1)},clearProject:function(){this.checkedCitie.splice(0,this.checkedCitie.length),this.checkAll=!1,this.isIndeterminate=!1},getPrarentNode:function(t){void 0!=t.data.orgName&&this.mianbao.unshift({text:""+t.data.orgName,petId:""+t.data.orgID}),void 0!=t.parent&&this.getPrarentNode(t.parent)},getChild:function(t){void 0!==t.childNodes&&0!==t.childNodes.length||(this.last={lastNode:t.data.orgName,lastId:t.data.orgID})}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"originater_dialog project_dialog"},[i("div",{class:[t.closeShow?"pc-candidates":"pc-candidates pc-background"]},[i("div",{staticClass:"dialog_content"},[i("el-main",{staticStyle:{position:"relative"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.closeShow,expression:"!closeShow"}],staticClass:"top"},[t._v("组织选择"),i("span",{staticStyle:{"font-size":"30px",cursor:"pointer",float:"right","padding-right":"5px"},on:{click:t.close}},[t._v("×")])]),t._v(" "),i("el-tabs",{attrs:{type:"card"}},[i("el-tab-pane",{staticClass:"candidates-recently"},[i("span",{attrs:{slot:"label"},slot:"label"},[i("i",{staticClass:"iconfont icon-todos"}),t._v(" 组织")]),t._v(" "),i("div",{staticClass:"title  title-border"},[i("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[i("el-breadcrumb-item",[t._v("组织架构")]),t._v(" "),i("el-breadcrumb-item",{attrs:{title:t.tooltipOrganName}},[t._v(t._s(t.bread))])],1),t._v(" "),i("span",{staticClass:"rightInput"},[i("el-input",{attrs:{placeholder:"请输入部门关键字","prefix-icon":"el-icon-search",size:"mini"},model:{value:t.treeSearch,callback:function(e){t.treeSearch=e},expression:"treeSearch"}})],1)],1),t._v(" "),i("div",{staticClass:"content clearfix"},[i("div",{staticClass:"content-left"},[i("el-tree",{ref:"tree2",attrs:{data:t.organizationData,"node-key":"orgID","highlight-current":!0,props:t.defaultProps,"default-expanded-keys":t.defaultKeys,"default-checked-keys":t.defaultKeys,load:t.handleNodeload,lazy:""},on:{"node-click":t.handleNodeClick}})],1),t._v(" "),i("div",{staticClass:"content-right"},[t.oneCheck?t._e():i("el-checkbox",{staticStyle:{"padding-top":"6px"},attrs:{indeterminate:t.isIndeterminate},on:{change:t.handleCheckAllChange},model:{value:t.checkAll,callback:function(e){t.checkAll=e},expression:"checkAll"}},[t._v("全选\n                ")]),t._v(" "),t.oneCheck?i("el-checkbox-group",{staticClass:"theRadio",on:{change:t.handleCheckedCitiesChange},model:{value:t.checkedCitie,callback:function(e){t.checkedCitie=e},expression:"checkedCitie"}},t._l(t.cities,function(e){return i("el-checkbox-button",{key:e.orgID,attrs:{label:e}},[i("div",{staticClass:"media"},[i("div",{staticClass:"media-body",on:{click:function(i){t.clickDepartment(e)},dblclick:function(i){t.dblclickCheckedCitie(e)}}},[i("h4",{staticClass:"media-heading iconfont icon-company"},[t._v(t._s(e.orgName))])])])])})):i("el-checkbox-group",{staticClass:"mut-check",on:{change:t.handleCheckedCitiesChange},model:{value:t.checkedCitie,callback:function(e){t.checkedCitie=e},expression:"checkedCitie"}},t._l(t.cities,function(e,a){return i("el-checkbox",{key:a,attrs:{label:e,checked:e.checked}},[i("div",{staticClass:"media"},[i("div",{staticClass:"media-body mut-media-body"},[i("h4",{staticClass:"media-heading iconfont icon-company"},[t._v(t._s(e.orgName))])])])])}))],1)]),t._v(" "),i("div",{staticClass:"addrecently",class:{pullup:t.isActive}},[i("div",{staticClass:"media"},[i("div",{staticClass:"pull",on:{click:t.pullBtnHeightChange}}),t._v(" "),i("ul",{staticClass:"clearfix"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.checkedCitie.length>0,expression:"checkedCitie.length>0"}],staticClass:"clearBtn",on:{click:t.clearProject}}),t._v(" "),t._l(t.checkedCitie,function(e,a){return i("li",{key:e.orgID},[i("div",{staticClass:"media-body"},[i("i",{staticClass:"el-icon-circle-close",on:{click:function(i){t.deleteProject(e,a)}}}),t._v(" "),i("span",{staticClass:"media-heading"},[t._v(t._s(e.orgName))])])])})],2)])]),t._v(" "),i("div",{staticClass:"addrecently-footer"},[i("el-button",{attrs:{type:"primary",icon:"el-icon-circle-check-outline",size:"mini"},on:{click:t.sureSubmit}},[t._v("确定")]),t._v(" "),i("el-button",{attrs:{type:"primary",icon:"el-icon-circle-close-outline",size:"mini"},on:{click:t.close}},[t._v("取消")])],1)])],1)],1)],1)])])},staticRenderFns:[]};var c=i(47)(r,n,!1,function(t){i(715)},"data-v-7a420611",null);e.a=c.exports},715:function(t,e){},717:function(t,e,i){"use strict";var a=i(160),s=i.n(a),r={name:"processDialog",props:{closeShow:!1},data:function(){return{dialog:!0,orgID:"",isFirstSelcet:"",isSecondSelcet:"",isThirdSelcet:"",isFouthSelcet:"",isFifthSelect:"",isFifthSelcet:"",isSixSelcet:"",selectFouthData:"",checked:!1,processValue:"",defaultProps:{children:"m_ChildOrg",label:"orgName"},firstData:[],secondData:[],thirdData:[],fouthData:[],selectedData:{},isK2ProcessDisabled:!0,loading:!1}},mounted:function(){this.getDataList()},methods:{getDataList:function(){var t=this;this.$axios.post("/api/companytree/page",{}).then(function(e){200===e.status?(t.firstData=e.data.companyTreeList,t.secondData=t.firstData[0].m_ChildOrg):t.$message.error("请求失败！")}).catch(function(e){t.$message.error("连接服务器失败！"+e)})},checkSecond:function(t,e){this.isK2ProcessDisabled=!1,this.isSecondSelcet=t.orgName,this.thirdData=[],this.fouthData=[],this.isThirdSelcet="",this.isFouthSelcet="",this.isFifthSelect="",this.orgID=t.orgID;var i={orgId:t.orgID,isUse:1,name:"",isHide:this.checked?0:1,isDailog:1};this.getUrlList(i)},getUrlList:function(t){var e=this;this.thirdData=[],this.fouthData=[],this.isFifthSelcet="",this.isSixSelcet="";this.$axios.post("/api/processCategoryTree",t).then(function(t){200===t.status?(e.thirdData=e.toTree(e.processingData(t.data.result)),null==e.thirdData&&e.$message.success("数据为空"),e.checkThird(e.thirdData[0],0)):e.$message.error("请求失败！")}).catch(function(t){})},toTree:function(t){if(null==t||0==t.length)return[];t.forEach(function(t){delete t.Child});var e={};t.forEach(function(t){e[t.id]=t});var i=[];return t.forEach(function(t){var a=e[t.pid];a?(a.Child||(a.Child=[])).push(t):i.push(t)}),i},checkThird:function(t){this.isThirdSelcet=t.id,this.fouthData&&(this.fouthData=[],this.isFouthSelcet="",this.isFifthSelect=""),t.Child?this.fouthData=t.Child:this.selectedData=t},processingData:function(t){var e=t;for(var i in e){var a=e[i];if(e[i].processDescriptions=[{txt:"无提示信息!"}],a.processDescription&&null!=a.processDescription){var r;r=a.processDescription.split(";");var n=[],c=!0,o=!1,l=void 0;try{for(var h,d=s()(r);!(c=(h=d.next()).done);c=!0){var u=h.value;u=u.replace("&gt",">"),n.push({txt:u})}}catch(t){o=!0,l=t}finally{try{!c&&d.return&&d.return()}finally{if(o)throw l}}e[i].processDescriptions=n}}return e},checkFouth:function(t){t.childsProcessCategories||(this.selectedData=t)},checkFifth:function(t){t.childsProcessCategories||(this.isSixSelcet="",this.isFifthSelcet=t.id,this.selectedData=t)},checkSixth:function(t){this.isFifthSelcet="",this.isSixSelcet=t.id,t.childsProcessCategories||(this.selectedData=t)},sureSubmitData:function(){var t=this.selectedData.name,e=this.selectedData.id+"";t&&this.$emit("sureSubmit",{type:"process",text:t,processID:e,item:this.selectedData})},checkIsK2Process:function(){var t={orgId:this.orgID,isUse:1,isHide:this.checked?0:1,name:this.processValue,isDailog:1};this.getUrlList(t)},searchFlow:function(){var t={orgId:this.orgID,isUse:1,isHide:this.checked?0:1,name:this.processValue,isDailog:1};this.getUrlList(t)},searchScreenData:function(t,e){var i=[],a=[];if(e.forEach(function(e,i,s){-1!==e.name.indexOf(t)&&a.push(e)}),a==[])return null;var r=!0,n=!1,c=void 0;try{for(var o,l=s()(a);!(r=(o=l.next()).done);r=!0){var h=o.value;this.selectPrantData(h,e,i)}}catch(t){n=!0,c=t}finally{try{!r&&l.return&&l.return()}finally{if(n)throw c}}return i},selectPrantData:function(t,e,i){var a=!0,r=!1,n=void 0;try{for(var c,o=s()(e);!(a=(c=o.next()).done);a=!0){var l=c.value;if(l.id==t.pid){void 0==l.Child&&(l.Child=[]),l.Child.push(t);var h=!0,d=!0,u=!1,p=void 0;try{for(var m,f=s()(i);!(d=(m=f.next()).done);d=!0){var g=m.value;h=l.id!=g.id}}catch(t){u=!0,p=t}finally{try{!d&&f.return&&f.return()}finally{if(u)throw p}}h&&i.push(l),this.selectPrantData(l,e,i)}}}catch(t){r=!0,n=t}finally{try{!a&&o.return&&o.return()}finally{if(r)throw n}}},close:function(){this.$emit("hideComponent")}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"originater_dialog"},[i("div",{class:[t.closeShow?"pc-candidates":"pc-candidates pc-background"]},[i("div",{staticClass:"dialog_content"},[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.closeShow,expression:"!closeShow"}],staticClass:"top"},[t._v("流程选择\n          "),i("span",{staticStyle:{"font-size":"30px",cursor:"pointer",float:"right","padding-right":"5px"},on:{click:t.close}},[t._v("×")])]),t._v(" "),i("div",{staticClass:"initProcess"},[i("el-container",[i("el-header",[i("div",{staticClass:"initProcess-header"},[i("el-checkbox",{staticClass:"initCheckbox",attrs:{disabled:t.isK2ProcessDisabled},on:{change:t.checkIsK2Process},model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}},[t._v("显示允许直接从K2发起的流程")]),t._v(" "),i("div",{staticClass:"searchCom"},[i("el-input",{staticClass:"inputCom",attrs:{disabled:t.isK2ProcessDisabled,clearable:"",placeholder:"流程搜索",size:"mini"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.searchFlow(e):null}},model:{value:t.processValue,callback:function(e){t.processValue=e},expression:"processValue"}}),t._v(" "),i("el-button",{staticClass:"searchBtn",attrs:{disabled:t.isK2ProcessDisabled,type:"primary",icon:"el-icon-search",size:"mini"},on:{click:t.searchFlow}},[t._v("搜索")])],1)],1)]),t._v(" "),i("el-main",[i("div",{staticStyle:{"overflow-x":"hidden"}},[i("div",{staticClass:"originater-contain"},[i("ul",{staticClass:"secondList"},t._l(t.secondData,function(e){return i("li",{key:e.orgName,class:{isActive:t.isSecondSelcet===e.orgName},on:{click:function(i){t.checkSecond(e)}}},[i("i",{staticClass:"el-icon-tickets"}),t._v("\n                      "+t._s(e.orgName)+"\n                      ")])})),t._v(" "),i("ul",{staticClass:"thirdList"},t._l(t.thirdData,function(e){return i("li",{key:e.id,class:{isActive:t.isThirdSelcet===e.id},on:{click:function(i){i.stopPropagation(),t.checkThird(e)}}},[t._v(t._s(e.name))])})),t._v(" "),i("ul",{staticClass:"fouthList"},t._l(t.fouthData,function(e){return i("li",{key:e.id,staticClass:"fouthList-title",on:{click:function(i){i.stopPropagation(),t.checkFouth(e)}}},[null==e.processFullName?i("div",[i("span",{staticClass:"fouthList-title-first"},[t._v(t._s(e.name)+">")]),t._v(" "),i("div",{staticClass:"line"})]):i("div",[i("ul",{staticClass:"fifthList-contain"},[i("li",{staticClass:"fifthList",class:{isActive:t.isSixSelcet===e.id},on:{click:function(i){i.stopPropagation(),t.checkSixth(e)}}},[i("span",{attrs:{title:e.name}},[0==e.disabled?i("a",{attrs:{target:"_blank",href:t.linkhref}},[t._v(t._s(e.name))]):i("a",[t._v(t._s(e.name))])])])])]),t._v(" "),i("ul",t._l(e.Child,function(e){return i("li",{key:e.id,staticClass:"fouthListCon",class:[{fouthChild:e.Child},{isActive:t.isFifthSelcet===e.id}],on:{click:function(i){i.stopPropagation(),t.checkFifth(e)}}},[i("span",{attrs:{title:e.name}},[0==e.disabled?i("a",{attrs:{target:"_blank",href:t.linkhref}},[t._v(t._s(e.name))]):i("a",[t._v(t._s(e.name))])]),t._v(" "),i("ul",{staticClass:"fifthList-contain"},t._l(e.Child,function(e){return i("li",{key:e.id,staticClass:"fifthList",class:{isActive:t.isSixSelcet===e.id},on:{click:function(i){i.stopPropagation(),t.checkSixth(e)}}},[i("span",{attrs:{title:e.name}},[0==e.disabled?i("a",{attrs:{target:"_blank",href:t.linkhref}},[t._v(t._s(e.name))]):i("a",[t._v(t._s(e.name))])])])}))])}))])}))]),t._v(" "),i("div",{staticClass:"addrecently-footer"},[i("el-button",{attrs:{type:"primary",icon:"el-icon-circle-check-outline",size:"mini"},on:{click:t.sureSubmitData}},[t._v("确定")]),t._v(" "),i("el-button",{attrs:{type:"primary",icon:"el-icon-circle-close-outline",size:"mini"},on:{click:t.close}},[t._v("取消")])],1)])])],1)],1)])])])},staticRenderFns:[]};var c=i(47)(r,n,!1,function(t){i(718)},"data-v-8b2a6974",null);e.a=c.exports},718:function(t,e){},801:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(160),s=i.n(a),r=i(361),n=i(714),c=i(717),o=i(712),l=i(67),h={name:"iframeDialog",components:{originator_dailog:r.a,process_dailog:c.a,project_dialog:n.a,flowchart_dialog:o.a},mounted:function(){this.compName=this.getUrlParam("compName"),this.person=this.getUrlParam("userId"),this.setDialog(this.compName);var t={key:"setCss"};t.compName=this.compName,t.data=this.model,t.w=this.w,t.h=this.h,window.parent.postMessage(t,"*"),(l.a.getCookie("access_token")||l.a.getLocalStorage("access_token"))&&this.openDailog(this.compName)},data:function(){return{compName:"",childDataUrl:{url:""},showdialog:!1,component:"",person:"",model:{whereParams:{}},closeShow:!0,w:0,h:0}},methods:{setDialog:function(t){var e=600,i=490;switch(t){case"originator_dailog":case"project_dialog":e=600,i=490;break;case"process_dailog":e=1123,i=446}this.w=e,this.h=i},getUrlParam:function(t,e){var i=new RegExp("[?&]"+t+"=([^&]*)","i"),a=(e=e||window.location.href).match(i);return null!=a?decodeURIComponent(a[1]):null},openDailog:function(t){this.component=t,"originator_dailog"==t?(this.childDataUrl.getTree="getTree",this.childDataUrl.companytree="companytree/page"):"project_dialog"==t&&(this.childDataUrl.getTree="getTree",this.childDataUrl.companytree="companytree/page")},showMsgfromchild:function(t){var e=[];if(t.type&&"project"==t.type)(o={}).id=t.last.lastId,o.fullName=t.item.orgFullName,o.name=t.item.orgName,o.path=t.last.lastNode,e.push(o);else if(t.type&&"process"==t.type)this.model.whereParams.processFullName=t.text;else if(t.type&&"originator"==t.type){var i=!0,a=!1,r=void 0;try{for(var n,c=s()(t.peoArr);!(i=(n=c.next()).done);i=!0){var o,l=n.value;(o={}).displayName=l.name,o.loginName="Vanke\\"+l.userId,e.push(o)}}catch(t){a=!0,r=t}finally{try{!i&&c.return&&c.return()}finally{if(a)throw r}}}var h={key:"ok"};h.compName=this.compName,h.data=e,window.parent.postMessage(h,"*")},closeWin:function(t){var e={key:"close"};e.compName=this.compName,e.data={},window.parent.postMessage(e,"*")}}},d={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)(t.component,{tag:"component",attrs:{childDataUrl:t.childDataUrl,closeShow:t.closeShow},on:{hideComponent:function(e){t.closeWin()},sureSubmit:t.showMsgfromchild}})},staticRenderFns:[]},u=i(47)(h,d,!1,null,null,null);e.default=u.exports}});