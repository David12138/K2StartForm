/*
 * @Description:头部header悬浮按钮工具栏
 * @Author:ytwang
 * @Date:2019-05-22 14:07:21
 * @LastEditors:ytwang
 * @LastEditTime:2019-05-25 13:00:24
 */
var templateContent = '\
    <header class="header header-toolbar">\
        <mobileuserpick :pop-visible="parmdialog2.mobiledialogvisible" :multiple="parmdialog2.multiplelimit" :title="parmdialog2.title" :params="parmdialog2"  v-on:closedialog = "closedialog2" v-on:change="userpickCallBack2" v-if="parmdialog2.mobiledialogvisible" :type="parmdialog2.clicktype"></mobileuserpick>\
        <userpick :parmdialog = "parmdialog2" v-on:closedialog = "closedialog2" v-on:requseturl = "userpickCallBack2"></userpick>\
          <dialogmodal :title="$t(\'KStarForm.ProcessSeer\')+FirstFolio" :visible="visible" :button="[$t(\'KStarForm.Confirm\')]" v-on:submit="closeprocPredictiondialog" v-on:cancle="closeprocPredictiondialog" v-if="visible">\
            <div slot="dialogcontent">\
            <div class="icon-return" v-on:click="closeprocPredictiondialog"><i class="el-icon-arrow-left"></i>{{$t(\'KStarForm.Return\') }}</div>\
            <el-table :data="procpredictionmodel" v-if="procpredictionmodel" max-height="300" border class="addUser">\
                <!--<el-table-column prop="Sort" :label="$t(\'KStarForm.SerialNumber\')" width="50"></el-table-column>-->\
                <el-table-column  type="index" :label="$t(\'KStarForm.SerialNumber\')" width="50"></el-table-column>\
                <el-table-column prop="ActivityDisplayName" :label="$t(\'KStarForm.StepName\')">\
                    <template slot-scope="scope">\
                        <el-badge :value="ApprovalModeVaule(scope.row.ApprovalMode, scope.row.Approvers)" class="processSeer-badge">{{ scope.row.ActivityDisplayName}}<div v-text="mandatoryActivityName(scope.row)" style="color:red;float: right;"></div></el-badge>\
                    </template>\
                </el-table-column>\
                <el-table-column prop="name" :label="$t(\'KStarForm.Approver\')">\
                  <template slot-scope="scope">\
                    <el-input v-if="scope.row.ProcessingSource!=1&&(formtype===\'Application\'||formtype===\'Draft\'||formtype===\'ReApproval\')" readonly v-model="scope.row.ApproverName" size="mini"  v-on:click.native="selectApprove(scope.row)"><i slot="suffix" class="iconfont iconrenyuan"  v-on:click="selectApprove(scope.row)" /></i></el-input>\
                    <div v-else>\
                        <el-popover v-for="(item, index) in scope.row.Approvers" :key="index" placement="top-start" width="200" trigger="hover" :disabled="userInfoDisabled" :open-delay="800" v-on:show="getUserInfo(item.UserAccount)">\
                            <el-row v-loading="userInfoLoading">\
                                <el-col class="user-info-title" style="font-weight: 700; font-size: 16px">{{userInfo.Name}}</el-col>\
                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantDept") }}{{userInfo.Department}}</el-col>\
                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantTel") }}{{userInfo.Telephone}}</el-col>\
                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantMobile") }}{{userInfo.Mobile}}</el-col>\
                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantEMail") }}{{userInfo.Email}}</el-col>\
                            </el-row>\
                            <span slot="reference">{{item.UserDisplayName}}<i style="color: red" v-if="item.UserStatus == \'0\' ">({{$t(\'KStarForm.Resigned\')}})</i><i v-if="scope.row.Approvers.length-1 !== index">;</i></span>\
                        </el-popover>\
                    </div>\
                  </template>\
               </el-table-column>\
            </el-table></div>\
        </dialogmodal>\
      <dialogmodal :title="$t(\'KStarForm.CreatYBGroup\')" :visible="createGroupVisible" :button="[$t(\'KStarForm.Confirm\')]" v-on:submit="actCreateGroup" v-on:cancle="closeCreateGroupDialog" v-if="createGroupVisible">\
            <div slot="dialogcontent">\
            <div class="icon-return" v-on:click="closeCreateGroupDialog"><i class="el-icon-arrow-left"></i>{{$t(\'KStarForm.Return\') }}</div>\
            <el-table :data="groupUserList" v-if="groupUserList" max-height="300" border class="addUser" @selection-change="handleSelectionChange">\
                <el-table-column prop="userAccount" type="selection"  width="80"></el-table-column>\
                <el-table-column prop="dispalyName" :label="$t(\'KStarForm.Approver\')"></el-table-column>\
            </el-table></div>\
        </dialogmodal>\
        <dialogmodal :title="$t(\'KStarForm.ProcessSeer\')+SecondFolio" :visible="visible2" :button="[$t(\'KStarForm.Confirm\')]" v-on:submit="closeprocPredictiondialog2" v-on:cancle="closeprocPredictiondialog2" v-if="visible2">\
            <div slot="dialogcontent"><div class="icon-return" v-on:click="closeprocPredictiondialog2"><i class="el-icon-arrow-left"></i>{{$t(\'KStarForm.Return\') }}</div><el-table :data="procpredictionmodel2" v-if="procpredictionmodel2" max-height="300" border>\
                <el-table-column prop="Sort" :label="$t(\'KStarForm.SerialNumber\')" width="50"></el-table-column>\
                <el-table-column prop="ActivityDisplayName" :label="$t(\'KStarForm.StepName\')">\
                    <template slot-scope="scope2">\
                        <el-badge :value="ApprovalModeVaule(scope2.row.ApprovalMode, scope2.row.Approvers)" class="processSeer-badge">{{ scope2.row.ActivityDisplayName}}<div v-text="mandatoryActivityName(scope2.row)" style="color:red;float: right;"></div></el-badge>\
                    </template>\
                </el-table-column>\
                <el-table-column prop="name" :label="$t(\'KStarForm.Approver\')">\
                <template slot-scope="scope2">\
                    <el-input v-if="scope2.row.ProcessingSource!=1" :disabled="true" v-model="scope2.row.ApproverName" size="mini" ></el-input>\
                    <div v-else>\
                        <el-popover v-for="(item, index) in scope2.row.Approvers" :key="index" placement="top-start" width="200" trigger="hover" :disabled="userInfoDisabled" :open-delay="800" v-on:show="getUserInfo(item.UserAccount)">\
                            <el-row v-loading="userInfoLoading">\
                                <el-col class="user-info-title" style="font-weight: 700; font-size: 16px">{{userInfo.Name}}</el-col>\
                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantDept") }}{{userInfo.Department}}</el-col>\
                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantTel") }}{{userInfo.Telephone}}</el-col>\
                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantMobile") }}{{userInfo.Mobile}}</el-col>\
                                <el-col class="user-info-li">{{ $t("KStarForm.HomeListApplicantEMail") }}{{userInfo.Email}}</el-col>\
                            </el-row>\
                            <span slot="reference">{{item.UserDisplayName}}<i style="color: red" v-if="item.UserStatus == \'0\' ">({{$t(\'KStarForm.Resigned\')}})</i><i v-if="scope2.row.Approvers.length-1 !== index">;</i></span>\
                        </el-popover>\
                    </div>\
                  </template>\
               </el-table-column>\
            </el-table></div>\
        </dialogmodal>\
        <div v-if="moreBtnVisible" class="header-toolbar-dialog-btn">\
        <dialogmodal :visible="moreBtnVisible" :button="[$t(\'KStarForm.Cancel\')]" v-on:cancle="moreBtnVisible = false" v-if="moreBtnVisible">\
            <div slot="dialogcontent" >\
                <el-button icon="ic-num" v-if="IsShowDec" class ="btn-other hidden-xs-only" size="mini" plain v-on:click.native="openDialogs">{{ $t(\'KStarForm.ProcessDescription\') }}</el-button>\
                <el-button icon="ic-num" v-if="formtype!==\'Application\'"  v-on:click="viewWorkflow" class ="btn-other" size="mini" plain>{{ $t(\'KStarForm.ViewFlow\') }}</el-button>\
                <el-button icon="el-icon-minus"  v-if="isProcessSeer" v-on:click="actProcPrediction" class ="btn-other" size="mini" plain>{{ $t(\'KStarForm.ProcessSeer\') }}</el-button>\
                <el-dropdown icon="el-icon-minus" v-if="isProcessSeerHeGui" style="width:20%">\
                    <el-button class="btn-other" size="mini" plain icon="el-icon-arrow-down el-icon--right" style="width:100%"> {{$t(\'KStarForm.ProcessSeer\') }}</el-button>\
                    <el-dropdown-menu class ="btn-other" >\
                        <el-dropdown-item @click.native="actProcPrediction_First">{{ $t(\'KStarForm.FirstProcessSeer\') }}</el-dropdown-item>\
                        <el-dropdown-item @click.native="actProcPrediction_Second">{{ $t(\'KStarForm.SecondProcessSeer\') }}</el-dropdown-item>\
                    </el-dropdown-menu>\
                </el-dropdown>\
                <el-button icon="el-icon-s-promotion" class="btn-other" v-on:click="handleCommand(\'Circulate\')" v-if="formtype !==\'Application\'&& ifBtn(\'Circulate\')" size="mini" plain>{{ $t(\'KStarForm.FormCC\') }}</el-button>\
                <el-button icon="el-icon-folder-add" class="btn-other" v-on:click="handleCommand(\'Subscribe\')" v-if="formtype !==\'Application\'&& ifBtn(\'Subscribe\')" size="mini" plain> {{ $t(\'KStarForm.Subscribe\') }}</el-button>\
                <el-button icon="el-icon-folder-delete" class="btn-other" v-on:click="handleCommand(\'CancelSubscribe\')" v-if="formtype !==\'Application\'&& ifBtn(\'CancelSubscribe\')" size="mini" plain> {{ $t(\'KStarForm.CancelSubscribe\') }}</el-button>\
                <el-button icon="el-icon-chat-dot-square"  v-on:click="actCreateGroup" size = "mini"  class="btn-other" plain> {{ $t(\'KStarForm.Discuss\') }}</el-button>\
                <el-button icon="el-icon-switch-button" v-if="formtype !==\'Application\'&& ifBtn(\'Refused\')" v-on:click="handleCommand(\'Refused\')" size="mini" plain> {{btnDisplayName(\'Refused\')}}</el-button>\
                <el-button icon="el-icon-error" v-if="formtype !==\'Application\'&& ifBtn(\'Cancel\')" v-on:click="handleCommand(\'Cancel\')" size="mini" plain> {{ $t(\'KStarForm.Cancel\') }}</el-button>\
                <el-button icon="el-icon-close" class="btn-other"  v-on:click="actClose" size = "mini" plain>  {{ $t(\'KStarForm.Close\') }}</el-button>\
            </div>\
        </dialogmodal>\
        </div>\
        <mobileuserpick :pop-visible="parmdialog.mobiledialogvisible" v-on:closedialog="closedialog" :multiple="parmdialog.multiplelimit" :title="parmdialog.title" v-on:change="userpickCallBack" v-if="parmdialog.mobiledialogvisible" :type="parmdialog.clicktype"></mobileuserpick>\
        <userpick :parmdialog = "parmdialog" v-on:closedialog = "closedialog" v-on:requseturl = "userpickCallBack" class="hidden-xs-only"></userpick>\
        <returndialog :paramretrundialog="paramRetrunDialog" :formoperationmodel="formoperationmodel"  :formbackactivity="formbackactivity" v-on:returnconfim="returnConfim" :formesetting="formesetting"></returndialog>\
        <div class="header-main">\
            <!-- 按钮组 -->\
            <div class="header-btnbar custom-reset-styles position-fixed">\
                <div class="center hidden-xs-only">\
                    <el-button  v-if="isProcessSeer" v-on:click="actProcPrediction" class ="btn-other" size="mini" plain>{{ $t(\'KStarForm.ProcessSeer\') }}</el-button>\
                    <el-dropdown v-if="isProcessSeerHeGui">\
                        <el-button class="btn-other" size = "mini" plain > {{$t(\'KStarForm.ProcessSeer\') }}<i class="el-icon-arrow-down el-icon--right"></i></el-button>\
                        <el-dropdown-menu class ="btn-other" >\
                            <el-dropdown-item @click.native="actProcPrediction_First">{{ $t(\'KStarForm.FirstProcessSeer\') }}</el-dropdown-item>\
                            <el-dropdown-item @click.native="actProcPrediction_Second">{{ $t(\'KStarForm.SecondProcessSeer\') }}</el-dropdown-item>\
                        </el-dropdown-menu>\
                    </el-dropdown>\
                    <el-button v-if="ifBtn(\'Submit\')" v-on:click="actSubmit" :disabled=btnDisabled  size="mini" type="primary" plain>{{ $t(\'KStarForm.Submit\') }}</el-button>\
                    <el-button v-if="ifBtn(\'ReSubmit\')" v-on:click="actReSubmit" size="mini" plain> {{ $t(\'KStarForm.ReSubmit\') }}</el-button>\
                    <el-button v-if="ifBtn(\'SaveDraft\')" v-on:click="actDraft" :disabled=btnDisabled size="mini" plain> {{ $t(\'KStarForm.Save\') }}</el-button>\
                    <el-button v-if="formtype !==\'Application\'&& ifBtn(\'Cancel\')" v-on:click="handleCommand(\'Cancel\')" size="mini" plain> {{ $t(\'KStarForm.Cancel\') }}</el-button>\
                    <el-button v-if="formtype !==\'Application\'&& ifBtn(\'Communication\')" v-on:click="handleCommand(\'Communication\')" size="mini" plain>{{btnDisplayName(\'Communication\')}}</el-button>\
                    <el-button v-if="formtype !==\'Application\'&& ifBtn(\'CancelCommunicate\')" v-on:click="handleCommand(\'CancelCommunicate\')" size="mini"  plain> {{ $t(\'KStarForm.CancelCommunication\') }}</el-button>\
                    <el-button v-if="formtype !==\'Application\'&& ifBtn(\'CommunicateFeedback\')" v-on:click="handleCommand(\'CommunicateFeedback\')" size="mini" plain> {{ $t(\'KStarForm.CommunicateFeedback\') }}</el-button>\
                    <el-button v-if="formtype !==\'Application\'&& ifBtn(\'Redirect\')" v-on:click="handleCommand(\'Redirect\')" :disabled=btnDisabled  size="mini" plain>{{btnDisplayName(\'Redirect\')}}</el-button>\
                    <el-button v-if="ifBtn(\'Returned\')" v-on:click="actReturned" size="mini" plain> {{btnDisplayName(\'Returned\') }}</el-button>\
                    <el-button v-if="formtype !==\'Application\'&& ifBtn(\'Refused\')" v-on:click="handleCommand(\'Refused\')" size="mini" plain> {{btnDisplayName(\'Refused\')}}</el-button>\
                    <el-button v-if="formtype !==\'Application\'&& ifBtn(\'Withdrawn\')" v-on:click="handleCommand(\'Withdrawn\')" size="mini"  plain> {{ $t(\'KStarForm.Withdrawn\') }}</el-button>\
                    <el-button v-if="ifBtn(\'Approve\')" v-on:click="actApprove" size="mini"  plain class="add-bg"> {{btnDisplayName(\'Approve\')}}</el-button>\
                    <el-button class="btn-other" v-on:click="handleCommand(\'Circulate\')" v-if="formtype !==\'Application\'&& ifBtn(\'Circulate\')" size="mini" plain>{{ $t(\'KStarForm.Circulate\') }}</el-button>\
                    <el-dropdown style="margin: 0 10px">\
                        <el-button class="btn-other" size = "mini" plain > {{$t(\'KStarForm.More\') }}<i class="el-icon-arrow-down el-icon--right"></i></el-button>\
                        <el-dropdown-menu class ="btn-other" style="width: 110px">\
                            <el-dropdown-item @click.native="viewWorkflow" v-if="formtype!==\'Application\'" >{{ $t(\'KStarForm.ViewFlow\') }}</el-dropdown-item>\
                            <el-dropdown-item @click.native="handleCommand(\'Subscribe\')" v-if="formtype !==\'Application\'&& ifBtn(\'Subscribe\')">{{ $t(\'KStarForm.Subscribe\') }}</el-dropdown-item>\
                            <el-dropdown-item @click.native="handleCommand(\'CancelSubscribe\')" v-if="formtype !==\'Application\'&& ifBtn(\'CancelSubscribe\')">{{ $t(\'KStarForm.CancelSubscribe\') }}</el-dropdown-item>\
                            <el-dropdown-item @click.native="actPrint" v-if="ifBtn(\'Print\')">{{ $t(\'KStarForm.Print\') }}</el-dropdown-item>\
                        </el-dropdown-menu>\
                    </el-dropdown>\
                    <el-button v-if="IsShowDec" class ="btn-other hidden-xs-only" size="mini" plain v-on:click.native="openDialogs">{{ $t(\'KStarForm.ProcessDescription\') }}</el-button>\
                    <el-button class="btn-other hidden-xs-only"  v-on:click="actClose" size = "mini" plain>  {{ $t(\'KStarForm.Close\') }}</el-button>\
                </div>\
                <div class="center visible-xs-only">\
                    <div v-if="formtype ==\'Approval\' ? formoperationmodel.IsMobileApprove : true">\
                        <el-button icon="el-icon-more" v-on:click="moreBtnVisible = true" size="mini" plain> {{ $t(\'KStarForm.More\') }}</el-button>\
                        <el-button  icon="el-icon-document-checked" v-if="ifBtn(\'SaveDraft\')" v-on:click="actDraft" :disabled=btnDisabled size="mini" plain> {{ $t(\'KStarForm.Save\') }}</el-button>\
                        <el-button v-if="formtype !==\'Application\'&& ifBtn(\'Withdrawn\')" v-on:click="handleCommand(\'Withdrawn\')" size="mini"  plain> {{ $t(\'KStarForm.Withdrawn\') }}</el-button>\
                        <el-button v-if="ifBtn(\'Submit\')" v-on:click="actSubmit" :disabled=btnDisabled  size="mini" type="primary" plain>{{ $t(\'KStarForm.Submit\') }}</el-button>\
                        <el-button icon="el-icon-chat-dot-round" v-if="formtype !==\'Application\'&& ifBtn(\'CommunicateFeedback\')" v-on:click="handleCommand(\'CommunicateFeedback\')" size="mini" plain> {{ $t(\'KStarForm.CommunicateFeedback\') }}</el-button>\
                        <el-button icon="el-icon-chat-dot-round" v-if="formtype !==\'Application\'&& ifBtn(\'CancelCommunicate\')" v-on:click="handleCommand(\'CancelCommunicate\')" size="mini"  plain> {{ $t(\'KStarForm.CancelCommunication\') }}</el-button>\
                        <el-button icon="el-icon-chat-dot-round" v-if="formtype !==\'Application\'&& ifBtn(\'Communication\')" v-on:click="handleCommand(\'Communication\')" size="mini" plain>{{btnDisplayName(\'Communication\')}}</el-button>\
                        <el-button icon="el-icon-position" v-if="formtype !==\'Application\'&& ifBtn(\'Redirect\') " v-on:click="handleCommand(\'Redirect\')" :disabled=btnDisabled  size="mini" plain>{{btnDisplayName(\'Redirect\')}}</el-button>\
                        <el-button v-if="ifBtn(\'Returned\') " v-on:click="actReturned" size="mini" plain class="font-red"> {{btnDisplayName(\'Returned\') }}</el-button>\
                        <el-button v-if="ifBtn(\'ReSubmit\') " type="primary" v-on:click="actReSubmit" size="mini" plain> {{ $t(\'KStarForm.ReSubmit\') }}</el-button>\
                        <el-button v-if="ifBtn(\'Approve\')" type="primary" v-on:click="actApprove" size="mini"  plain class="add-bg"> {{btnDisplayName(\'Approve\')}}</el-button>\
                    </div>\
                    <div v-else class="tip"> {{ $t(\'KStarForm.NodeOnlyApprovedPC\') }}</div>\
                </div>\
            </div>\
            <el-dialog :title="$t(\'KStarForm.ProcessDescription\')" :visible.sync="dialogVisible" :width="dialogWidth" class="my-dialog-style">\
                <div class="icon-return" v-on:click="dialogVisible = false"><i class="el-icon-arrow-left"></i>{{$t(\'KStarForm.Return\') }}</div>\
                <div>\
                    <el-row class="header-toolbar-processDescription" :gutter="20">\
                        <el-col :span="5">{{ $t(\'KStarForm.ProcessDescription\') }}：</el-col><el-col :span="19"><div v-html="ProcessDescription" style="text-align:left"></div></el-col>\
                    </el-row>\
                    <el-row class="header-toolbar-processPath" :gutter="20">\
                        <el-col :span="5" style="text-align:right" v-if="IsShowProcPath">{{ $t(\'KStarForm.RelevantSystem\') }}：</el-col>\
                        <el-col :span="19" v-if="ProcessPath" style="text-align:left"><a style="text-align:left" v-on:click="onlinePreview(ProcessPath)">{{ProcessPath.Name}}</a><a style="text-align:left;padding-left: 10px;" v-on:click="gotoDetail(ProcessPath)">{{ $t(\'KStarForm.Download\') }}</a></el-col>\
                    </el-row>\
                    <el-row :gutter="20"  class="header-toolbar-processRelatedCases">\
                        <el-col :span="5" v-if="IsShowRelatedCase">{{ $t(\'KStarForm.RelatedDocuments\') }}：</el-col><el-col :span="19" v-if="ProcessRelatedCases">\
                            <el-row v-for="(item, index) in ProcessRelatedCases" style="text-align:left">\
                                <a title="预览" v-on:click="onlinePreview(item)">{{item.Name}}</a><a style="padding-left: 10px;" v-on:click="gotoDetail(item)">{{ $t(\'KStarForm.Download\') }}</a>\
                            </el-row>\
                        </el-col>\
                    </el-row>\
                </div>\
                <span slot="footer" class="dialog-footer">\
                    <el-button @click="dialogVisible = false" class="m-submit" size="mini" round>{{ $t(\'KStarForm.Confirm\') }}</el-button>\
                </span>\
            </el-dialog>\
            <dialogmodal :title="dialogModalParm.title" :visible="dialogModalParm.circulateVisible" :button="[$t(\'KStarForm.Confirm\'), $t(\'KStarForm.Cancel\')]" v-on:submit="circulateSubmit" v-on:cancle="circulateCancle" v-if="dialogModalParm.circulateVisible">\
                <div slot="dialogcontent">\
                    <div class="icon-return" v-on:click="circulateCancle"><i class="el-icon-arrow-left"></i>{{$t(\'KStarForm.Return\') }}</div>\
                    <el-form :model="formModel" ref="formModelRef" size="mini" label-width="120px" label-position="right" class="addUser" :rules="returnRules">\
                        <el-form-item :label="dialogModalParm.labelUser" label-width="100px" v-if="dialogModalParm.visibleUser">\
                            <el-input v-model="circulateUserArrJoin" readonly v-on:click.native="handlerOpenModal"><i slot="suffix" class="iconfont iconrenyuan"  v-on:click="handlerOpenModal" /></i></el-input>\
                        </el-form-item>\
                        <el-form-item :label="dialogModalParm.labelComment" label-width="100px" prop="comment">\
                            <el-input :placeholder="$t(\'KStarForm.PhPleaseEnterOpinion\')" v-model="formModel.comment" type="textarea"></el-input>\
                        </el-form-item>\
                    </el-form>\
                    <div >\
                        <el-row class="save-comment visible-xs-only">\
                            <el-dialog title="" append-to-body :visible.sync="OpinionVisible" class="my-dialog-style" v-on:close="OpinionVisible=false" v-if="OpinionVisible">\
                                <div class="my-popper">\
                                    <div class="icon-return" v-on:click="OpinionVisible=false"><i class="el-icon-arrow-left"></i>{{$t(\'KStarForm.Return\') }}</div>\
                                    <el-row class="OpinionList">\
                                        <el-col class="thephraseli" v-for="(item, index) in OpinionList" :key="index">\
                                            <span v-on:click="gotoSelectOpinion(item.Opinion)">{{ item.Opinion }}</span>\
                                            <el-button type="text" icon="el-icon-delete" v-on:click="deleteOpinion(index)">{{ $t("KStarForm.Delete") }}</el-button>\
                                        </el-col>\
                                    </el-row>\
                                    <el-row>\
                                        <el-col><el-input v-model.trim="OpinionInput" v-on:keyup.enter.native="addOpinion" clearable/>\</el-col>\
                                        <el-col class="addthephrase"><el-button v-on:click="addOpinion(1)">{{ $t(\'KStarForm.AddThePhrase\') }}</el-button></el-col>\
                                    </el-row>\
                                </div>\
                                <span slot="footer" class="dialog-footer">\
                                    <el-button v-on:click="OpinionVisible=false" plain class="m-submit" size="mini" >{{ $t(\'KStarForm.DialogConfirm\') }}</el-button>\
                                </span>\
                            </el-dialog>\
                            <span class="left" v-on:click="OpinionVisible=true;getOpinionList()">{{ $t(\'KStarForm.ThePhrase\') }}</span>\
                        </el-row>\
                        <el-row class="save-comment hidden-xs-only" style="padding-left: 100px">\
                            <el-popover  v-model="OpinionPopVisible" v-on:show="getOpinionList" placement="top" width="250" trigger="click" popper-class="my-popper">\
                                <el-row class="OpinionList">\
                                    <el-col class="thephraseli" v-for="(item, index) in OpinionList" :key="index">\
                                        <span v-on:click="gotoSelectOpinion(item.Opinion)"> {{ item.Opinion }}</span >\
                                        <el-button type="text" icon="el-icon-delete" v-on:click="deleteOpinion(index)">{{ $t("KStarForm.Delete") }}</el-button>\
                                    </el-col>\
                                </el-row>\
                                <el-row>\
                                    <el-col><el-input v-model.trim="OpinionInput" v-on:keyup.enter.native="addOpinion(1)" clearable/></el-col>\
                                    <el-col class="addthephrase"><el-button v-on:click="addOpinion(1)">{{ $t(\'KStarForm.AddThePhrase\') }}</el-button></el-col>\
                                </el-row>\
                                <span class="left" slot="reference">{{$t(\'KStarForm.ThePhrase\')}}<i class="el-icon-s-operation"></i></span>\
                            </el-popover>\
                            <span class="right"><el-switch v-model="switchValue"  active-color="#00abd5" inactive-color="#EEEEEE ">\
                            </el-switch>{{$t(\'KStarForm.SaveAsCommonComments\')}}</span>\
                        </el-row>\
                    </div>\
                </div>\
            </dialogmodal>\
        </div>\
    </header>\
';
var headerToolbar = Vue.extend({
    template: templateContent,
    props: ['formtype', 'formbtnmodel', 'formbackactivity', 'formoperationmodel', 'formesetting', 'procpredictionmodel', 'vmtime', 'procinstrelationmodel', 'switchvaluemodel'],
    data: function () {
        return {
            btnDisabled: false,
            parmdialog: {
                dialogvisible: false,
                clicktype: '',
                type: '',
                ctype: '',
                title: "选人控件",
                multiplelimit: false,
                mobiledialogvisible: false
            },
            paramRetrunDialog: {//退回框参数
                dialogvisible: false,
                isRejectGoBack: "1"
            },
            dialogVisible: false,
            IsShowDec: false,
            ProcessDescription: '',
            ProcessPath: {},
            ProcessRelatedCases: [],
            IsShowProcPath: false,
            IsShowRelatedCase: false,
            visible: false,
            createGroupVisible: false,//创建园宝群组控件显示隐藏
            groupUserList: [],//创建园宝群组的用户列表
            groupUserSelectedList: [],//创建园宝群组的选中用户列表
            formModel: {},
            dialogWidth: '',

            circulateUserArr: [],
            circulateUserArrObj: {},
            circulateUserArrJoin: '',
            moreBtnVisible: false, // 更多按钮弹框
            rowData: [],
            //选人控件参数
            parmdialog2: {
                dialogvisible: false,
                clicktype: '',
                type: '',
                ctype: '',
                title: "选人控件",
                multiplelimit: false,
                activityID: "",
                applicantOrgId: "",
                mobiledialogvisible: false
            },
            visible2: false,
            procpredictionmodel2: [],
            procinstrelation: {},
            returnRules: {
                comment: []
            },
            dialogModalParm: {
                circulateVisible: false,
                title: '',
                actionType: '',
                labelUser: '',
                labelComment: '',
                visibleUser: true
            },
            OpinionInput: '', // 2019-10-30 常用意见输入框
            OpinionList: [],  // 2019-10-30 常用意见列表
            OpinionVisible: false,  // 2019-10-30 常用意见
            OpinionPopVisible: false, // 2019-10-30 常用意见
            switchValue: false,

            userInfoLoading: false, // 用户信息loading
            userInfo: {},
            userInfoDisabled: true,
        };
    },
    watch: {
        vmtime: {
            handler: function () {
                this.showPrediction();  //显示选择审批人
            },
            deep: true
        },
        formbtnmodel: {
            handler: function (curVal, oldVal) {
                this.formbtn = curVal;
            },
            deep: true
        },
        formesetting: {
            handler: function (curVal, oldVal) {
                this.IsShowDec = curVal.VersionFormSettings.IsShowDesc,
                    this.ProcessDescription = curVal.VersionFormSettings.ProcessDescription,
                    this.ProcessPath = curVal.VersionFormSettings.ProcessPath,
                    this.ProcessRelatedCases = curVal.VersionFormSettings.ProcessRelatedCases
                this.IsShowProcPath = curVal.VersionFormSettings.IsShowProcPath,
                    this.IsShowRelatedCase = curVal.VersionFormSettings.IsShowRelatedCase
                if (curVal.ActivityFormSettings.OpinionNumber > 0) {
                    this.returnRules.comment = [{ required: true, trigger: 'blur', min: curVal.ActivityFormSettings.OpinionNumber, validator: this.validators }]
                } else {
                    this.returnRules.comment = [{ required: true, trigger: 'blur', message: KStarForm.VM.$t("KStarForm.EnterReturnOpinion") }]
                }
            },
            deep: true
        },
        procinstrelationmodel: {
            handler: function (curVal, oldVal) {
                if (curVal) {
                    procinstrelation = curVal;
                }
            },
            deep: true,
            immediate: true
        },
        switchvaluemodel: {
            handler: function (curVal, oldVal) {
                this.switchValue = curVal;
            },
            deep: true,
            immediate: true
        }
    },
    mounted: function () {
        this.dialogWidth = document.body.clientWidth > 600 ? '600px' : '90%'
    },
    methods: {
        // 个人信息
        getUserInfo: function (userAccount) {
            this.userInfoLoading = true
            // var url = window.location.origin + '/Account/GetUserInfo'
            var that = this
            axios.post('/Account/GetUsesDisplayInfo', { userAccount: userAccount }).then(function (res) {
                that.userInfoLoading = false
                that.userInfo = res.data.data
            })
        },
        // 判断是抢签还是串签，会签，未知 2019-12-19
        ApprovalModeVaule: function (val, approvers) {
            if (approvers.length > 1) {
                if (val == 1) {
                    return KStarForm.VM.$t("KStarForm.RushToSign")
                } else if (val == 2) {
                    return KStarForm.VM.$t("KStarForm.StringSignature")
                } else if (val == 3) {
                    return KStarForm.VM.$t("KStarForm.JointlySign")
                } else {
                    // 未知不显示
                    // return KStarForm.VM.$t("KStarForm.Unknown")
                }
            }
        },
        // 2019-10-30 增加常用语 addThephrase
        addOpinion: function (type) {
            var isExistOpinion = false;
            var addUserOpinion;
            var deleteUserOpinion;
            var newOpinion = "";

            if (type == 1) {
                newOpinion = this.OpinionInput;
            } else {
                newOpinion = this.formModel.comment ? this.formModel.comment : '';
            }

            if (newOpinion.length == 0) {
                this.switchValue = false;
                return false;
            } else {
                for (i = 0; i < this.OpinionList.length; i++) {
                    if (this.OpinionList[i].Opinion == newOpinion) {
                        isExistOpinion = true;
                    }
                }
            }

            if (isExistOpinion) {
                return false;
            } else {
                if (this.OpinionList.length >= 10) {
                    deleteUserOpinion = this.OpinionList[0];
                    this.OpinionList.shift();
                }
                addUserOpinion = { Opinion: newOpinion };
                this.saveUserOpinion(addUserOpinion, deleteUserOpinion);

                if (type == 2) {
                    this.switchValue = true;
                }
                this.OpinionList.push(addUserOpinion);
                this.OpinionInput = '';
            }
        },
        addOpinion2: function (type, sender) {
            var isExistOpinion = false;
            var addUserOpinion;
            var deleteUserOpinion;
            var newOpinion = "";

            if (type == 1) {
                newOpinion = sender.OpinionInput;
            } else {
                newOpinion = sender.formModel.comment ? sender.formModel.comment : '';
            }

            if (newOpinion.length == 0) {
                sender.switchValue = false;
                return false;
            } else {
                for (i = 0; i < sender.OpinionList.length; i++) {
                    if (sender.OpinionList[i].Opinion == newOpinion) {
                        isExistOpinion = true;
                    }
                }
            }

            if (isExistOpinion) {
                return false;
            } else {
                if (sender.OpinionList.length >= 10) {
                    deleteUserOpinion = sender.OpinionList[0];
                    sender.OpinionList.shift();
                }
                addUserOpinion = { Opinion: newOpinion };
                if (sender.switchValue) {
                    sender.saveUserOpinion(addUserOpinion, deleteUserOpinion);
                }

                //if (type == 2) {
                //    sender.switchValue = true;
                //}
                sender.getOpinionList();
                sender.OpinionInput = '';
            }
        },
        //获取用户常用语
        getOpinionList: function () {
            var _this = this;
            var getUserCommonOpinionsUrl = getControllerName() + "/GetUserCommonOpinions";
            //获取常用语列表
            axios({
                url: getUserCommonOpinionsUrl,
                method: 'post',
                responseType: 'json',
            }).then(function (response) {
                if (response.status == 200 && response.data) {
                    var userOpinionData = response.data.data;
                    if (userOpinionData.length > 0) {
                        _this.OpinionList = [];
                        for (i = 0; i < userOpinionData.length; i++) {
                            _this.OpinionList.push(userOpinionData[i]);
                        }
                    }
                }
            }).catch(function (error) {
                throw error;
            });
        },
        // 2019-10-30 删除常用语deleteOpinion
        deleteOpinion: function (index) {
            var _this = this;

            var deleteUserCommonOpinionsUrl = getControllerName() + "/DeleteUserCommonOpinion";
            //获取常用语列表
            axios({
                url: deleteUserCommonOpinionsUrl,
                method: 'post',
                data: { delUserOpinion: this.OpinionList[index] },
                responseType: 'json',
            }).then(function (response) {
                if (response.status == 200 && response.data) {
                    _this.OpinionList.splice(index, 1);
                }
            }).catch(function (error) {
                throw error;
            });
        },
        // 2019-10-30 保存常用语
        changeOpinion: function () {
            //if (val == false) return false;
            var comment = this.formModel.comment ? this.formModel.comment : '';
            var that = this;
            if (comment) {

            } else {
                this.switchValue = false;
            }
        },
        //保存用户意见
        saveUserOpinion: function (addOpinionItem, deleteOpinionItem) {
            var _this = this;
            if (addOpinionItem) {
                var saveUserCommonOpinionsUrl = getControllerName() + "/SaveUserCommonOpinions";
                //获取常用语列表
                axios({
                    url: saveUserCommonOpinionsUrl,
                    method: 'post',
                    data: { addUserOpinion: addOpinionItem, deleteUserOpinion: deleteOpinionItem },
                    responseType: 'json',
                }).then(function (response) {
                    if (response.status == 200 && response.data) {
                        _this.OpinionList[_this.OpinionList.length - 1] = response.data.data;
                    }
                }).catch(function (error) {
                    throw error;
                });
            }
        },
        // 2019-10-30 选中常用语 gotoSelectOpinion
        gotoSelectOpinion: function (val) {
            this.$set(this.formModel, 'comment', val);
            // this.formModel.comment = val;
            this.OpinionVisible = false;  // 2019-10-30 常用语
            this.OpinionPopVisible = false;
        },
        //显示流程走向
        showPrediction: function () {
            KStarForm.setManualUserActivity(this, true);
        },
        // 按钮弹框的input点击事件 2019-12-13增加
        handlerOpenModal: function () {
            if (this.dialogModalParm.actionType == 'Circulate') {
                this.showdialog('Circulate', true)
            } else if (this.dialogModalParm.actionType == 'Redirect') {
                this.showdialog('Redirect', false);
            } else if (this.dialogModalParm.actionType == 'Communication') {
                this.showdialog('Communication', true);
            }
        },
        // 弹框输入框是否必填 2019-12-13增加
        validators: function (rule, value, callback) {
            if (!value) {
                callback(new Error(KStarForm.VM.$t("KStarForm.EnterReturnOpinion")));
            } else if (value.toString().length < rule.min) {
                var msg = KStarForm.VM.$t("KStarForm.PhApprovalOpinionLeast") + this.formesetting.ActivityFormSettings.OpinionNumber + KStarForm.VM.$t("KStarForm.PhCharacters")
                callback(new Error(msg));
            } else {
                callback()
            }
        },
        //显示必选的手选节点
        mandatoryActivityName: function (row) {
            if (row.ProcessingSource != 1 && (this.formtype == 'Application' || this.formtype == 'Draft' || this.formtype == 'ReApproval')) {
                var item = _.find(KStarForm.vmFormData.vmOperation.ManualUserActivity, function (o) {
                    return row.ActivityName == o.ActivityName;
                });
                if (item) {
                    if (item.Required && (item.ProcessingSource == 2 || item.ProcessingSource == 3)) {
                        return "*";
                    }
                    else {
                        return "";
                    }
                }
            }
            return "";
        },
        formCancle: function () {
            this.formModelVisible = false;
        },
        formSubmit: function () {
            var that = this
            //确定拒绝？   拒绝 确定 2019-12-13注释
            // this.$alert(KStarForm.VM.$t("KStarForm.DialogConfirmRefused"), KStarForm.VM.$t("KStarForm.Refused"), {
            //     confirmButtonText: KStarForm.VM.$t("KStarForm.Confirm"),
            //     customClass: 'my-message-box',
            //     confirmButtonClass: 'm-submit',
            //     beforeClose: function (action, instance, done) {
            //         if (action === 'confirm') {
            //             KStarForm.vmFormData.vmOperation.Comment = that.formModel.comment;
            //             KStarForm.formRefused(that);
            //         } else {
            //             done();
            //         }
            //     }
            // }).then().catch(function () {
            //     that.formCancle()
            // });
        },
        // 传阅/抄送弹框cancle
        circulateCancle: function () {
            this.dialogModalParm.circulateVisible = false
            this.$refs['formModelRef'].resetFields()
            this.circulateUserArrJoin = ''
            this.circulateUserArr = []
            this.formModel.comment = ''
        },
        // 抄送/传阅弹框open
        circulateSubmit: function () {
            var that = this

            this.$refs['formModelRef'].validate(function (valid) {
                if (!valid) {
                    return false
                } else {
                    if (that.dialogModalParm.actionType == 'Circulate') {
                        if (that.circulateUserArrJoin) {
                            KStarForm.vmFormData.vmOperation.Comment = that.formModel.comment;
                            KStarForm.formCirculate(that, that.circulateUserArr);
                            that.dialogModalParm.circulateVisible = false
                        } else {
                            alertInfo.call(that, KStarForm.VM.$t("KStarForm.SelectCirculateUser")); //请选择传阅人
                        }

                    } else if (that.dialogModalParm.actionType == 'Refused') {
                        KStarForm.vmFormData.vmOperation.Comment = that.formModel.comment;
                        KStarForm.formRefused(that);
                        that.dialogModalParm.circulateVisible = false
                    } else if (that.dialogModalParm.actionType == 'Redirect') {
                        if (that.circulateUserArrJoin) {
                            if (that.formoperationmodel.CurrentUserAccount == that.circulateUserArrObj.UserAccount) {
                                alertInfo.call(that, KStarForm.VM.$t("KStarForm.CanTTransferYourself")); // 不能转办给自己
                            } else {
                                that.dialogModalParm.circulateVisible = false
                                KStarForm.vmFormData.vmOperation.Comment = that.formModel.comment;
                                KStarForm.formRedirect(that, that.circulateUserArrObj);
                            }
                        } else {
                            alertInfo.call(that, KStarForm.VM.$t("KStarForm.SelectRedirectUser")); //请选择转办人
                        }
                    } else if (that.dialogModalParm.actionType == 'Communication') {
                        if (that.circulateUserArrJoin) {
                            var len = that.circulateUserArr.filter(function (item) {
                                return item.UserAccount == that.formoperationmodel.CurrentUserAccount
                            })
                            if (len.length > 0) {
                                alertInfo.call(that, KStarForm.VM.$t("KStarForm.CommunicateWidthYourself")); //不能自己与自己沟通
                            } else {
                                that.dialogModalParm.circulateVisible = false
                                KStarForm.vmFormData.vmOperation.Comment = that.formModel.comment;
                                KStarForm.formCommunication(that, that.circulateUserArr);
                            }
                        } else {
                            alertInfo.call(that, KStarForm.VM.$t("KStarForm.SelectCommunicationUser")); //请选择沟通人
                        }
                    } else if (that.dialogModalParm.actionType == 'CommunicateFeedback') {
                        KStarForm.vmFormData.vmOperation.Comment = that.formModel.comment;
                        KStarForm.formCommunicateFeedback(that);
                        that.dialogModalParm.circulateVisible = false
                    } else if (that.dialogModalParm.actionType == 'Withdrawn') {
                        KStarForm.vmFormData.vmOperation.Comment = that.formModel.comment;
                        KStarForm.formWithdrawn(that);
                        that.dialogModalParm.circulateVisible = false
                    } else if (that.dialogModalParm.actionType == 'Cancel') {
                        KStarForm.vmFormData.vmOperation.Comment = that.formModel.comment;
                        KStarForm.formCancel(that);
                        that.dialogModalParm.circulateVisible = false
                    } else if (that.dialogModalParm.actionType == 'ReSubmit') {
                        KStarForm.vmFormData.vmOperation.Comment = that.formModel.comment;
                        KStarForm.formReSubmit(that);
                        that.dialogModalParm.circulateVisible = false
                    } else if (that.dialogModalParm.actionType == 'Approve') {
                        that.dialogModalParm.circulateVisible = false
                        if (that.formModel.comment) {
                            KStarForm.vmFormData.vmOperation.Comment = that.formModel.comment;
                        } else {
                            KStarForm.vmFormData.vmOperation.Comment = '同意';
                        }
                        KStarForm.formApprove(that);
                    }
                    //保存常用语
                    //alert("bb");
                    that.addOpinion2(2, that);
                }
            })
        },
        onlinePreview: function (item) {
            axios({
                url: '/Portal/FileManage/GetPreviewToken',
                method: 'post',
                responseType: 'json',
                data: {
                    'fileId': item.FileId
                },
            }).then(function (res) {
                var preToken = res.data.token;
                if (preToken) {
                    window.open('https://ypopen.countrygarden.com.cn/preview/preview.html?preview_token=' + preToken);
                }
            }).catch(function (error) {
                throw error;
            });
        },
        gotoDetail: function (item) {
            var that = this;
            axios({
                url: '/Portal/FileManage/DownloadFileUrl',
                method: 'post',
                responseType: 'json',
                data: {
                    'fileId': item.FileId
                },
            }).then(function (res) {
                _downloadUrl = res.data.downloadUrl;
                if (_downloadUrl == undefined || _downloadUrl.length == 0) {
                    //下载地址获取失败
                    this.$message.error(KStarForm.VM.$t("KStarForm.AttachmentFormatError"));
                    return false;
                }
                window.location.href = _downloadUrl;
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
        // 流程说明弹框
        openDialogs: function () {
            this.moreBtnVisible = false
            this.dialogVisible = true
        },
        // 判断审批意见是否必填
        isCheck: function () {
            if (this.formesetting.ActivityFormSettings.OpinionNumber > 0) {
                if (!this.formoperationmodel.Comment) {
                    this.showConfirm(KStarForm.VM.$t("KStarForm.PCApprovalOpinion"), KStarForm.VM.$t("KStarForm.SystemPrompt"), function (value) { })
                    return false
                } else if (this.formoperationmodel.Comment.length < this.formesetting.ActivityFormSettings.OpinionNumber) {
                    var msg = KStarForm.VM.$t("KStarForm.PhApprovalOpinionLeast") + this.formesetting.ActivityFormSettings.OpinionNumber + KStarForm.VM.$t("KStarForm.PhCharacters")
                    this.showConfirm(msg, KStarForm.VM.$t("KStarForm.SystemPrompt"), function (value) { })
                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
        },
        //提交流程
        actSubmit: function () {

            var vmuser = [];
            var vmuser2 = [];//校验人数
            var _this = this;
            _.each(KStarForm.vmFormData.vmOperation.ManualUserActivity,
                function (item) {
                    if (item.Required && (item.ProcessingSource == 2 || item.ProcessingSource == 3) && item.ApproverName.length == 0)
                        vmuser.push(item.ActivityDisplayName);
                });
            _.each(KStarForm.vmFormData.vmOperation.ManualUserActivity,
                function (item) {
                    if (item.Required && (item.ProcessingSource == 2 || item.ProcessingSource == 3))
                        vmuser2.push(item.ActivityDisplayName);
                });
            if (vmuser.length > 0) {
                if (KStarForm.vmFormData.vmProcPrediction.length > 0) {
                    _this.visible = true;
                    alertInfo.call(_this, KStarForm.VM.$t("KStarForm.SelectActivity") + vmuser.join() + KStarForm.VM.$t("KStarForm.ActivityApprover"), KStarForm.VM.$t("KStarForm.SystemPrompt"));
                }
                else {
                    _this.actProcPrediction();
                }
                _this.btnDisabled = false;
                return false;
            };

            if (vmuser2.length > 0) {
                var tag = true;
                var message = "";
                _.each(KStarForm.vmFormData.vmProcPrediction,
                    function (item) {
                        if (item.Settings) {
                            var approveModel = JSON.parse(item.Settings);
                            if (vmuser2.includes(item.ActivityDisplayName)) {
                                var approveCount = getactApproveUserCount(item.ActivityDisplayName);
                                var curCount = parseInt(approveModel.ApprovelCountModel.ApprovelUserCount);
                                if (approveModel.ApprovelCountModel.UserPicModel == "2") {
                                    if (approveCount < curCount) {
                                        tag = false;
                                        message = KStarForm.VM.$t("KStarForm.PredictionNode") + item.ActivityDisplayName + KStarForm.VM.$t("KStarForm.PredictionTipLeast") + curCount + KStarForm.VM.$t("KStarForm.PredictionTipTail");
                                        return false;
                                    }
                                } else if (approveModel.ApprovelCountModel.UserPicModel == "3") {
                                    if (approveCount != curCount) {
                                        tag = false;
                                        message = KStarForm.VM.$t("KStarForm.PredictionNode") + item.ActivityDisplayName + KStarForm.VM.$t("KStarForm.PredictionTipEqual") + curCount + KStarForm.VM.$t("KStarForm.PredictionTipTail");
                                        return false;
                                    }

                                } else if (approveModel.ApprovelCountModel.UserPicModel == "4") {
                                    if (approveCount > curCount) {
                                        tag = false;
                                        message = KStarForm.VM.$t("KStarForm.PredictionNode") + item.ActivityDisplayName + KStarForm.VM.$t("KStarForm.PredictionTipNoMore") + curCount + KStarForm.VM.$t("KStarForm.PredictionTipTail");
                                        return false;
                                    }
                                }
                            }
                        }
                    });
                if (!tag) {
                    _this.visible = true;
                    alertInfo.call(_this, message, KStarForm.VM.$t("KStarForm.SystemPrompt"));
                    return false;
                }
            }

            function getactApproveUserCount(actName) {
                var actlist = _.filter(KStarForm.vmFormData.vmOperation.ManualUserActivity, function (data) {
                    return data.ActivityDisplayName == actName;
                });
                return actlist[0].Approvers.length;
            }

            if (KStarForm.vmFormData.vmProcPrediction.length == 0) {

                KStarForm.ProcPrediction(this, false, function (sender) { KStarForm.formSubmit(sender); });
            }
            else {
                KStarForm.formSubmit(this);
            }
        },
        actReSubmit: function () {
            // KStarForm.formReSubmit(this);
            var that = this
            //是否确认重新提交  确认重新提交
            // if (that.isCheck()) {
            //     this.showConfirm(KStarForm.VM.$t("KStarForm.WhetherConfirmReSubmit"), KStarForm.VM.$t("KStarForm.ConfirmReSubmit"), function (value) {
            //         if (value == 'confirm') {
            //             KStarForm.formReSubmit(that);ReSubmit
            //         }
            //     })
            // }
            this.dialogModalParm = {
                circulateVisible: true,
                title: KStarForm.VM.$t("KStarForm.ReSubmit"),
                actionType: 'ReSubmit',
                labelUser: '',
                labelComment: KStarForm.VM.$t("KStarForm.ApprovalOpinion"),
                visibleUser: false
            }
            var value = JSON.parse(JSON.stringify(this.formoperationmodel))
            if (value.Comment) {
                this.$set(this.formModel, 'comment', value.Comment);
            }
        },
        actDraft: function () {
            // this.btnDisabled = true;
            KStarForm.formDraft(this);
        },
        actApprove: function () {
            // KStarForm.formApprove(this);

            // var that = this
            // if (that.isCheck()) {
            //     //是否确认此次同意审核  确认审核
            //     this.showConfirm(KStarForm.VM.$t("KStarForm.WhetherConfirmApprove"), KStarForm.VM.$t("KStarForm.ConfirmApprove"), function (value) {
            //         if (value == 'confirm') {
            //             KStarForm.formApprove(that);
            //         }
            //     })
            // }
            this.dialogModalParm = {
                circulateVisible: true,
                title: KStarForm.VM.$t("KStarForm.Agree"),
                actionType: 'Approve',
                labelUser: '',
                labelComment: KStarForm.VM.$t("KStarForm.ApprovalOpinion"),
                visibleUser: false
            }
            var value = JSON.parse(JSON.stringify(this.formoperationmodel))
            if (value.Comment) {
                this.$set(this.formModel, 'comment', value.Comment);
            } else {
                this.$set(this.formModel, 'comment', KStarForm.VM.$t("KStarForm.Agree"));
            }
            // this.$set(this.formModel, 'comment',  KStarForm.VM.$t("KStarForm.Agree"));
        },
        actClose: function () {
            closePage(false);
        },
        actPrint: function () {
            this.moreBtnVisible = false
            window.print();
        },
        //创建群组事件
        actCreateGroup: function () {
            var that = this;
            this.moreBtnVisible = false;//关闭按钮
            this.createGroupVisible = false;
            //所有人员
            var users = [];
            //增加申请人
            if ((!JSON.stringify(users).includes(KStarForm.vmFormData.vmFormInstance.SubmitterAccount)) && KStarForm.vmFormData.vmFormInstance.SubmitterAccount != KStarForm.vmFormData.vmOperation.CurrentUserAccount) {
                users.push(KStarForm.vmFormData.vmFormInstance.ApplicantAccount);
            }
            //增加发起人
            if ((!JSON.stringify(users).includes(KStarForm.vmFormData.vmFormInstance.SubmitterAccount)) && KStarForm.vmFormData.vmFormInstance.SubmitterAccount != KStarForm.vmFormData.vmOperation.CurrentUserAccount) {
                users.push(KStarForm.vmFormData.vmFormInstance.SubmitterAccount);
            }
            //遍历审批历史纪录以及当前处理人
            if (KStarForm.VM.$refs["moduleApprovalRecords"] && KStarForm.VM.$refs["moduleApprovalRecords"].formapproval
                && KStarForm.VM.$refs["moduleApprovalRecords"].formapproval.length > 0) {
                KStarForm.VM.$refs["moduleApprovalRecords"].formapproval.forEach(function (item) {
                    if (item.actApprovalHistorys.length > 0) {
                        item.actApprovalHistorys.forEach(function (temp) {
                            //过滤重复值，排除当前操作用户
                            if ((!JSON.stringify(users).includes(temp.UserAccount)) && temp.UserAccount && temp.UserAccount != KStarForm.vmFormData.vmOperation.CurrentUserAccount) {
                                users.push(temp.UserAccount);
                            }
                        })
                    }
                })
            }
            //该方法只有审批历史，无当前处理人
            //KStarForm.vmFormData.vmFormApprovalHistorys.forEach(function (item) {
            //    if (item.actApprovalHistorys.length > 0) {
            //        item.actApprovalHistorys.forEach(function (temp) {
            //            //过滤重复值，排除当前操作用户
            //            if ((!JSON.stringify(users).includes(temp.UserAccount)) && temp.UserAccount && temp.UserAccount != KStarForm.vmFormData.vmOperation.CurrentUserAccount) {
            //                users.push(temp.UserAccount);
            //            }
            //        })
            //    }
            //})

            if (users && users.length > 0) {
                //人员不为空才处理
                $post("/Portal/WorkFlow/CreateYBGroup", { billNum: KStarForm.vmFormData.vmFormInstance.Folio, groupName: KStarForm.vmFormData.vmFormInstance.FormSubject + "_讨论", users: users }, function (response) {
                    if (response.status == 200 && response.data) {
                        if (response.data.data.openId && response.data.data.openId.length > 0) {
                            qing.call('chat', {
                                'openId': response.data.data.openId,
                                'success': function (result) { }
                            });
                        }
                        else if (response.data.data.groupId && response.data.data.groupId.length > 0) {
                            qing.call('chat', {
                                'groupId': response.data.data.groupId,
                                'success': function (result) { }
                            });
                        } else {
                            alertInfo.call(that, response.data.message); //创建失败后返回接口提示
                        }
                    }
                }, function (error) {
                    KStarForm.error(error, sender);
                });
            }
        },
        //显示创建群组选人框【弃用，暂时修改成所有人直接加入群组】
        showCreateGroupDialog: function () {

            this.createGroupVisible = true;//打开创建群组选人框

            //取出所有审批人过滤重复值。
            var users = [];
            KStarForm.vmFormData.vmFormApprovalHistorys.forEach(function (item) {
                if (item.actApprovalHistorys.length > 0) {
                    item.actApprovalHistorys.forEach(function (temp) {
                        //过滤重复值，排除当前操作用户
                        if ((!JSON.stringify(users).includes(temp.UserAccount)) && temp.UserAccount && temp.UserAccount != KStarForm.vmFormData.vmOperation.CurrentUserAccount) {
                            users.push({ userAccount: temp.UserAccount, dispalyName: temp.UserDisplayName })
                        }
                    })
                }
            })
            //所有审批人
            this.groupUserList = users;
            this.groupUserSelectedList = [];//初始化选中人列表
        },
        //创建群组选人框中选人【弃用，暂时修改成所有人直接加入群组】
        handleSelectionChange(val) {
            var selectUser = [];
            val.forEach(function (item) {
                selectUser.push(item.userAccount);
            })
            this.groupUserSelectedList = selectUser;
        },
        //关闭创建群组选人框【弃用，暂时修改成所有人直接加入群组】
        closeCreateGroupDialog: function () {
            this.moreBtnVisible = false;//关闭按钮
            this.createGroupVisible = false;
        },
        actCancelCommunicate: function () {
            KStarForm.formCancelCommunicate(this);
        },
        actCommunicateFeedback: function () {
            KStarForm.formCommunicateFeedback(this);
        },
        showConfirm: function (content, title, callback) {
            this.$confirm(content, title, {
                lockScroll: false,
                confirmButtonText: KStarForm.VM.$t("KStarForm.Confirm"),
                customClass: 'my-message-box',
                confirmButtonClass: 'm-submit',
                cancelButtonText: KStarForm.VM.$t("KStarForm.Cancel"),
                cancelButtonClass: 'm-cancle',
                callback: callback
            })
        },
        handleCommand: function (command) {//更多事件
            this.moreBtnVisible = false
            var that = this
            var value = JSON.parse(JSON.stringify(this.formoperationmodel))
            this.$set(this.formModel, 'comment', value.Comment);
            switch (command) {
                case "Redirect"://转办
                    // this.showdialog('Redirect', false);
                    this.dialogModalParm = {
                        circulateVisible: true,
                        title: KStarForm.VM.$t("KStarForm.Redirect"),
                        actionType: 'Redirect',
                        labelUser: KStarForm.VM.$t("KStarForm.OperationPeople", { operation: KStarForm.VM.$t("KStarForm.RedirectOpinion") }),
                        labelComment: KStarForm.VM.$t("KStarForm.ApprovalOpinion"),
                        visibleUser: true
                    }
                    break;
                case "Communication"://沟通
                    // this.showdialog('Communication', true);
                    this.dialogModalParm = {
                        circulateVisible: true,
                        title: KStarForm.VM.$t("KStarForm.Communication"),
                        actionType: 'Communication',
                        labelUser: KStarForm.VM.$t("KStarForm.OperationPeople", { operation: KStarForm.VM.$t("KStarForm.CommunicationOpinion") }),
                        labelComment: KStarForm.VM.$t("KStarForm.CommunicationComments"),
                        visibleUser: true
                    }
                    break;
                case "CancelCommunicate"://取消沟通
                    //是否确认取消沟通  取消沟通
                    this.showConfirm(KStarForm.VM.$t("KStarForm.WhetherConfirmCancelCommunicate"), KStarForm.VM.$t("KStarForm.CancelCommunication"), function (value) {
                        if (value == 'confirm') {
                            KStarForm.formCancelCommunicate(that);
                        }
                    })
                    break;
                case "CommunicateFeedback"://沟通反馈
                    this.dialogModalParm = {
                        circulateVisible: true,
                        title: KStarForm.VM.$t("KStarForm.CommunicateFeedback"),
                        actionType: 'CommunicateFeedback',
                        labelUser: '',
                        labelComment: KStarForm.VM.$t("KStarForm.ApprovalOpinion"),
                        visibleUser: false
                    }
                    //是否确认沟通反馈  确认沟通反馈
                    // this.showConfirm(KStarForm.VM.$t("KStarForm.WhetherConfirmCommunicateFeedback"), KStarForm.VM.$t("KStarForm.ConfirmCommunicateFeedback"), function (value) {
                    //     if (value == 'confirm') {
                    //         KStarForm.formCommunicateFeedback(that);
                    //     }
                    // })
                    break
                case "Refused"://拒绝
                    this.dialogModalParm = {
                        circulateVisible: true,
                        title: KStarForm.VM.$t("KStarForm.Refused"),
                        actionType: 'Refused',
                        labelUser: '',
                        labelComment: KStarForm.VM.$t("KStarForm.RefusedComments"),
                        visibleUser: false
                    }
                    break;
                case "Withdrawn"://撤回
                    // KStarForm.formWithdrawn(this);
                    //是否确认此次撤回  确认撤回
                    //this.showConfirm(KStarForm.VM.$t("KStarForm.WhetherConfirmWithdrawn"), KStarForm.VM.$t("KStarForm.ConfirmWithdrawn"), function (value) {
                    //   if (value == 'confirm') {
                    //       KStarForm.formWithdrawn(that);
                    //   }
                    //})
                    this.dialogModalParm = {
                        circulateVisible: true,
                        title: KStarForm.VM.$t("KStarForm.Withdrawn"),
                        actionType: 'Withdrawn',
                        labelUser: '',
                        labelComment: KStarForm.VM.$t("KStarForm.ApprovalOpinion"),
                        visibleUser: false
                    }
                    break;
                case "Cancel"://取消
                    // KStarForm.formCancel(this);
                    //是否确认此次取消  确认取消
                    // this.showConfirm(KStarForm.VM.$t("KStarForm.WhetherConfirmCancel"), KStarForm.VM.$t("KStarForm.ConfirmCancel"), function (value) {
                    //     if (value == 'confirm') {
                    //         KStarForm.formCancel(that);
                    //     }
                    // })
                    this.dialogModalParm = {
                        circulateVisible: true,
                        title: KStarForm.VM.$t("KStarForm.CancelOpinion"),
                        actionType: 'Cancel',
                        labelUser: '',
                        labelComment: KStarForm.VM.$t("KStarForm.ApprovalOpinion"),
                        visibleUser: false
                    }
                    break;
                case "Circulate"://传阅
                    this.dialogModalParm = {
                        circulateVisible: true,
                        title: KStarForm.VM.$t("KStarForm.Circulate"),
                        actionType: 'Circulate',
                        labelUser: KStarForm.VM.$t("KStarForm.CirculateUser"),
                        labelComment: KStarForm.VM.$t("KStarForm.CirculateOpinions"),
                        visibleUser: true
                    }
                    // this.showdialog('Circulate', true);
                    break;
                case "Subscribe"://订阅
                    KStarForm.formSubscribe(this);
                    break;
                case "CancelSubscribe"://取消订阅
                    KStarForm.formCancelSubscribe(this);
                    break;
            }
        },
        //打开弹窗
        showdialog: function (val, multiple) {
            if (document.body.clientWidth > 767) {
                this.parmdialog.dialogvisible = true;
            } else {
                this.parmdialog.mobiledialogvisible = true;
            }
            this.parmdialog.clicktype = val;
            this.parmdialog.type = "User"; //只选人员
            this.parmdialog.ctype = "UserPick"; //选人控件
            this.parmdialog.title = KStarForm.VM.$t("KStarForm.SelectUser"); //弹出框标题  请选择人员
            this.parmdialog.multiplelimit = multiple; //是否多选
            this.parmdialog.CallBack = "userpickCallBack";
            //this.parmdialog.isProxyProcess = false; //流程时是否只选可代理流程
            if (this.circulateUserArr) {
                var arry = []
                this.circulateUserArr.forEach(function (item) {
                    var user = {
                        Type: 'User',
                        Value: item.UserAccount,
                        Name: item.UserDisplayName
                    };
                    arry.push(user);
                })

                this.parmdialog.json = arry;
            }
            return false;

        },
        //关闭弹窗
        closedialog: function (val) {
            this.parmdialog.dialogvisible = false;
            this.parmdialog.mobiledialogvisible = false
        },
        viewWorkflow: function () {
            this.moreBtnVisible = false
            KStarForm.viewWorkflow(this);
        },
        //流程走向
        actProcPrediction: function () {
            this.moreBtnVisible = false
            KStarForm.ProcPrediction(this, true);
        },
        closeprocPredictiondialog: function () {
            this.visible = false;
        },
        //请求url
        userpickCallBack: function (val, type) {
            var userName = ''
            this.circulateUserArr = []
            if (type.clicktype == "Redirect" && val.length > 0) {
                var obj = {
                    UserAccount: val[0].Value,
                    UserDisplayName: val[0].Name
                }
                this.circulateUserArrObj = obj
                this.circulateUserArr = [
                    {
                        UserAccount: val[0].Value,
                        UserDisplayName: val[0].Name
                    }
                ]
                this.circulateUserArrJoin = val[0].Name;
            } else if (type.clicktype == "Communication" && val.length > 0) {
                var arry = [];
                _.forEach(val, function (el, index) {
                    arry.push({
                        UserAccount: el.Value,
                        UserDisplayName: el.Name
                    });
                });
                this.circulateUserArr = arry;

                userName = val.map(function (item) {
                    return item.Name;
                }).join();

                this.circulateUserArrJoin = userName;
            } else if (type.clicktype == "Circulate") {
                var arry = [];
                _.forEach(val, function (el, index) {
                    arry.push({
                        UserAccount: el.Value,
                        UserDisplayName: el.Name
                    });
                });
                this.circulateUserArr = arry;

                userName = val.map(function (item) {
                    return item.Name;
                }).join();
                this.circulateUserArrJoin = userName;
                // KStarForm.formCirculate(this, arry);
            }
            type.dialogvisible = false;
            this.parmdialog.mobiledialogvisible = false
        },
        handlerReturned: function (activityId) {
            //驳回事件
            KStarForm.formReject(this);
        },
        actReturned: function () { //驳回事件2
            this.moreBtnVisible = false
            this.paramRetrunDialog.dialogvisible = true;
            this.paramRetrunDialog.isRejectGoBack = this.formoperationmodel.IsRejectGoBack ? "1" : "0";
        },
        //驳回弹框确定
        returnConfim: function () {
            //是否确认此次驳回--2019-11-21
            var _this = this
            // _this.showConfirm(KStarForm.VM.$t("KStarForm.WhetherConfirmReject"), KStarForm.VM.$t("KStarForm.ConfirmReject"), function (value) {
            //     if (value == 'confirm') {
            KStarForm.formReject(_this);
            //     }
            // })
            // KStarForm.formReject(this);
        },
        ifBtn: function (code) {//提交按钮可见性

            var btnCodeArray = _.map(this.formbtnmodel, function (n) { return n.Code; });
            return _.indexOf(btnCodeArray, code) > -1;
        },
        btnDisplayName: function (code) {//按钮名称显示

            //var disName = "";
            //_.forEach(this.formbtnmodel, function (el, index) {
            //    if (el.Code == code) {
            //        disName = el.DisplayName;
            //        return false;
            //    }
            //});
            //return disName;

            return this.translatebtnname(code);
        },
        translatebtnname: function (btncode) {//20191216 翻译按钮名称
            var that = this;
            var btnName = "";

            switch (btncode) {
                case "Approve":
                    btnName = that.$t('KStarForm.Agree');
                    break;
                case "Returned"://退回
                    btnName = that.$t('KStarForm.Returned');
                    break;
                case "Refused"://拒绝
                    btnName = that.$t('KStarForm.Refused');
                    break;
                case "Redirect":
                    btnName = that.$t('KStarForm.Redirect');
                    break;
                case "Communication":
                    btnName = that.$t('KStarForm.Communication');
                    break;

                default:
                    btnName = btncode;
            }

            return btnName;
        },
        //远程搜索  流程走向， 弹出框
        ApplicantSelect: function (loadmore) {
            var that = this;
            if (!loadmore) that.rowData.Approvers = [];
            that.rowData.loading = true;
            var data = {
                sourceType: that.rowData.ProcessingSource,
                activityID: that.rowData.ActivityID,
                applicantOrgId: KStarForm.vmFormData.vmFormInstance.ApplicantOrgId,
                pageIndex: that.rowData.parm.pageIndex,
                pageSize: that.rowData.parm.pageSize,
                key: that.rowData.tempQuery,
            };
            axios.post("Plateform/SimpleForm/ProcPredictionApprover", data).then(function (res) {
                if (res.data.item.length >= 0) {
                    if (that.rowData.parm.pageIndex * that.rowData.parm.pageSize >= res.data.count) {
                        that.rowData.lastData = false;
                    }
                    _.each(res.data.item, function (item, idx) {
                        if (_.findIndex(that.rowData.Approvers, function (o) { return o.key == item.UserAccount; }) < 0) {
                            that.rowData.Approvers.push({
                                activityName: that.rowData.ActivityName,
                                Approver: item.UserAccount,
                                key: item.UserAccount,
                                label: item.UserDisplayName
                            });
                        }

                    });
                }
            }).catch(function (err) {
                throw new Error(err);
            });
            that.rowData.loading = false;
        },
        //加载更多
        LoadMore: function () {
            this.rowData.parm.pageIndex += 1;
            this.ApplicantSelect(true);
        },
        //远程搜索
        BindApplicantSelect: function (query) {
            this.rowData.tempQuery = query;
            if (query && query !== '') {
                this.ApplicantSelect();
            }
        },
        //选中值发生改变的时候
        SelectChange: function (row, index) {
            var manualUsers = KStarForm.vmFormData.vmOperation.ManualUsers;
            var containUser = _.filter(manualUsers, function (data) {
                return data.ActivityName != row.ActivityName;
            });
            _.each(row.ApproversUser, function (item) {
                containUser.push({
                    ActivityName: row.ActivityName,
                    Approver: item.value,
                    ApproverName: item.label,
                    ApproverType: "User"
                });
            });
            KStarForm.vmFormData.vmOperation.ManualUsers = containUser;
            this.procpredictionmodel.splice(index, 1, row);
        },
        selectApprove: function (row) {
            if (document.body.clientWidth > 767 && this.parmdialog2.dialogvisible) {
                return;
            }
            if (document.body.clientWidth <= 767 && this.parmdialog2.mobiledialogvisible) {
                return;
            }
            this.rowData = row;
            var type = "User";
            if (row.ProcessingSource == 2) {
                type = "GroupPerson";
            }
            var activityId = row.ActivityID;
            var orgId = KStarForm.vmFormData.vmFormInstance.ApplicantOrgId;
            this.showdialog2('ApproveUser', true, type, activityId, orgId);
        },
        //打开弹窗
        showdialog2: function (val, multiple, type, activityId, orgId) {
            this.parmdialog2.clicktype = val;
            switch (val) {
                case 'ApproveUser'://审核人
                    this.parmdialog2.type = type;
                    this.parmdialog2.ctype = "UserPick";
                    this.parmdialog2.title = KStarForm.VM.$t("KStarForm.SelectApprovalUser"); //请选择审核人
                    this.parmdialog2.activityID = activityId;
                    this.parmdialog2.applicantOrgId = orgId;
                    break;
            }
            //回显
            var arry = []
            KStarForm.vmFormData.vmOperation.ManualUserActivity.forEach(function (item) {
                if (item.ActivityID == activityId) {
                    item.Approvers.forEach(function (approver) {
                        if (approver.Approver != null) {
                            arry.push({
                                Type: 'User',
                                Value: approver.Approver,
                                Name: approver.ApproverName
                            });
                        }
                        else if (approver.key != null) {
                            arry.push({
                                Type: 'User',
                                Value: approver.key,
                                Name: approver.label
                            });
                        }
                        else if (approver.UserAccount != null) {
                            arry.push({
                                Type: 'User',
                                Value: approver.UserAccount,
                                Name: approver.UserDisplayName
                            });
                        }
                    })
                    return;
                }
            })
            this.parmdialog2.json = arry;
            //表单数据
            sessionStorage.setItem('formModel', JSON.stringify(KStarForm.formModel));
            // this.parmdialog2.dialogvisible = true;
            if (document.body.clientWidth > 767) {
                this.parmdialog2.dialogvisible = true;
            } else {
                this.parmdialog2.mobiledialogvisible = true;
            }
            this.parmdialog2.multiplelimit = multiple;
            return false;

        },
        //关闭弹窗
        closedialog2: function (val) {
            this.parmdialog2.dialogvisible = false;
            this.parmdialog2.mobiledialogvisible = false
        },
        userpickCallBack2: function (val, type) {
            var that = this;
            switch (type.clicktype) {
                case 'ApproveUser':
                    //var containUser = [];
                    var manualUsers = KStarForm.vmFormData.vmOperation.ManualUsers;
                    var containUser = _.filter(manualUsers, function (data) {
                        return data.ActivityName != that.rowData.ActivityName;
                    });
                    _.each(val, function (item) {
                        containUser.push({
                            ActivityName: that.rowData.ActivityName,
                            Approver: item.Value,
                            ApproverName: item.Name,
                            ApproverType: "User"
                        });
                    });
                    KStarForm.vmFormData.vmOperation.ManualUsers = containUser;


                    var userName = val.map(function (item) {
                        return item.Name;
                    }).join();
                    var userAct = _.find(KStarForm.vmFormData.vmOperation.ManualUserActivity, function (o) {
                        return that.rowData.ActivityName == o.ActivityName;
                    });
                    userAct.ApproverName = userName;
                    userAct.Approvers = _.filter(KStarForm.vmFormData.vmOperation.ManualUsers, function (data) {
                        return data.ActivityName == that.rowData.ActivityName;
                    });
                    _.each(this.procpredictionmodel, function (item) {
                        if (item.ActivityName == that.rowData.ActivityName) {
                            item.ApproverName = userName;
                        }
                    });
                    break;
            }
            this.parmdialog2.mobiledialogvisible = false
        },
        //获取二段流走向
        actProcPrediction_Second: function (sender) {
            // 如果当前流程就是第二段流程，则直接调用公用的方法
            if (procinstrelation.SecondFormId == KStarForm.vmFormData.vmFormInstance.Id) {
                KStarForm.ProcPrediction(this, true);
                return;
            }

            // 否则如果第二段流程还未发起，则根据当前表单信息获取
            if (procinstrelation.RecordId == 0 || procinstrelation.SecondFormId == 0) {
                var postUrl = getControllerName() + "/ProcPredictionByFormData" + geturlParam();
                var data = JSON.parse(KStarForm.toJsonString());
                this.GetRefProcPrediction(this, postUrl, { jsonData: JSON.stringify(data) });
            } else {
                var postUrl = getControllerName() + "/ProcPredictionByFormId" + geturlParam();
                this.GetRefProcPrediction(this, postUrl, { formId: procinstrelation.SecondFormId });
            }

        },
        closeprocPredictiondialog2: function () {
            this.visible2 = false;
        },
        // 获取一段流程走向
        actProcPrediction_First: function (sender) {
            KStarForm.ProcPrediction(this, true);
        },
        // 处理逻辑等于formmain.js的ProcPrediction
        GetRefProcPrediction: function (sender, url, para) {
            var resultValiate = KStarForm.actValiate(sender, "procprediction");
            if (!resultValiate) {
                return false;
            }

            //取消申请人岗位验证 2020-03-23 ZGH
            //if (KStarForm.vmFormData.vmFormInstance.ApplicantPositionName === null) {
            //    alertInfo.call(sender, KStarForm.VM.$t("KStarForm.SelectApplicantPost")); //请选择申请人岗位
            //    sender.btnDisabled = false;
            //    return false;
            //}
            var _this = this;
            $post(url, para, function (response) {
                if (response.status == 200 && response.data) {

                    _.each(response.data.data, function (item) {
                        if (!(item.ApproverName && item.ApproverName.length > 0)) {
                            if (item.Approvers && item.Approvers.length > 0) {
                                var userName = item.Approvers.map(function (item) {
                                    if (item.UserDisplayName) {
                                        return item.UserDisplayName;
                                    }
                                    else {
                                        return item.UserAccount;
                                    }
                                }).join();
                                item.ApproverName = userName;
                            }
                            else {
                                if (item.ProcessingSource == 1) {
                                    if (item.ActivityName != "结束") {
                                        item.ApproverName = "<无>";
                                    }

                                }
                            }
                        }

                    });

                    _this.procpredictionmodel2 = response.data.data;
                    sender.visible2 = true;
                    //KStarForm.vmFormData.vmFormInstance.procPredictionDialogVisible = !KStarForm.vmFormData.vmFormInstance.procPredictionDialogVisible
                    //setTimeout(function () {
                    //    window.scrollTo(0, document.documentElement.clientHeight);//滑动到底部  
                    //}, 0);
                    //alertInfo.call(sender, "预判成功");
                } else {
                    alertInfo.call(sender, response.data.message);
                }
            }, function (error) {
                if (error.response.data.code == "998") {//业务错误
                    alertInfo.call(sender, error.response.data.message + "," + KStarForm.VM.$t("KStarForm.ErrorLogIDMessage") + error.response.data.logId, KStarForm.VM.$t("KStarForm.SystemPrompt"));
                } else {//999系统错误
                    alertInfo.call(sender, KStarForm.VM.$t("KStarForm.ProcessExceptionPrompt") + "," + KStarForm.VM.$t("KStarForm.ErrorLogIDMessage") + error.response.data.logId, KStarForm.VM.$t("KStarForm.SystemPrompt"));
                }
            });
        },
    },
    computed: {
        isProcessSeer: function () {
            return KStarForm.vmFormData.vmFormInstance.Status < 3 && !KStarForm.vmFormData.vmFormInstance.RefProcessCode;
        },
        isProcessSeerHeGui: function () {
            return KStarForm.vmFormData.vmFormInstance.Status < 3 && KStarForm.vmFormData.vmFormInstance.RefProcessCode;
        },
        FirstFolio: function () {
            var val = KStarForm.vmFormData.vmProcInstRelation.FirstFolio;
            if (val == null) {
                val = KStarForm.VM.$t("KStarForm.NotStart");
            }
            return "(" + val + ")";
        },
        SecondFolio: function () {
            var val = KStarForm.vmFormData.vmProcInstRelation.SecondFolio;
            if (val == null) {
                val = KStarForm.VM.$t("KStarForm.NotStart");
            }
            return "(" + val + ")";
        }
    }

});

// 注册
Vue.component('headertoolbar', headerToolbar);
