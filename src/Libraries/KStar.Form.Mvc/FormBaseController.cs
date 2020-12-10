using KStar.Form.Mvc.Common.Enum;
using KStar.Plateform.ViewModel.Workflow;
using KStar.Plateform.WorkFlow.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace KStar.Form.Mvc
{
    /// <summary>
    /// 表单基类
    /// </summary>
    [Authorize]
    public class FormBaseController: Controller
    {
        //IKSatrWorkFlowService _kSatrWorkFlowService;
        //public FormBaseController(IKSatrWorkFlowService kSatrWorkFlowService)
        //{
        //    _kSatrWorkFlowService = kSatrWorkFlowService;
        //}

        #region 加载事件
        //表单加载后
        public virtual KStarFormModel OnKStarFormLoadAfter(KStarFormModel model)
        {
            return model;
        }
        //过滤前
        public virtual string OnKStarFormFilterBefore(string html, int formId)
        {
            return html;
        }
        //过滤后
        public virtual string OnKStarFormFilterAfter(string html, int formId)
        {
            return html;
        }
        #endregion
        #region 流程执行事件
        //提交流程前
        public virtual void OnFormSubmitBefore(KStarFormModel context)
        {

        }
        //提交流程后
        public virtual void OnFormSubmitAfter(KStarFormModel context)
        {

        }
        #endregion
        #region 表单初始化
        //获取表单初始化数据
        public virtual void GetData(int formId)
        {
            var model = new KStarFormModel();
            var workMode = this.GetWorkMode();

            switch (workMode)
            {
                //查看、
                case WorkMode.View:
                case WorkMode.Draft:

                    break;
                case WorkMode.Approval:

                    break;
                case WorkMode.Startup:
                    //model = _kSatrWorkFlowService.GetKStarFormByApplication();
                    break;
            }
        }

        #endregion  

    }
}
