using KStar.Form.Mvc.Common.Enum;
using System.Web.Mvc;

namespace KStar.Form.Mvc.Extension
{
    public static class ControllerExtension
    {
        //获取流程编码
        public static string GetProcessCode(this ControllerBase controller)
        {
            var processCode = controller.ControllerContext.HttpContext.Request["ProcessCode"];
            return processCode != null ? processCode.ToString() : null;
        }
        //获取表单ID
        public static long GetFormId(this ControllerBase controller)
        {
            long formId = 0;
            var sFormId = controller.ControllerContext.HttpContext.Request["FormId"];
            long.TryParse(sFormId, out formId);
            return formId;
        }
        //获取草稿ID
        public static long GetDraftId(this ControllerBase controller)
        {
            long draftId = 0;
            var sDraftId = controller.ControllerContext.HttpContext.Request["DraftId"];
            long.TryParse(sDraftId, out draftId);
            return draftId;
        }
        //获取SN编码
        public static string GetSN(this ControllerBase controller)
        {
            var ssn = controller.ControllerContext.HttpContext.Request["SN"];
            return ssn != null ? ssn.ToString() : null;
        }
        //获取任务ID
        public static long GetWorkId(this ControllerBase controller)
        {
            long workId = 0;
            var sworkId = controller.ControllerContext.HttpContext.Request["WorkId"];
            long.TryParse(sworkId, out workId);
            return workId;
        }
        //获取代理人
        public static string GetSharedUser(this ControllerBase controller)
        {
            var ssharedUser = controller.ControllerContext.HttpContext.Request["SharedUser"];
            return ssharedUser != null ? ssharedUser.ToString() : null;
        }
        /// <summary>
        /// 获取K2ID
        /// </summary>
        /// <param name="controller"></param>
        /// <returns></returns>
        public static string GetK2ID(this ControllerBase controller)
        {
            var k2Id = controller.ControllerContext.HttpContext.Request["K2Id"];
            return k2Id != null ? k2Id.ToString() : null;
        }

        //表达当前操作类型
        public static WorkMode GetWorkMode(this ControllerBase controller)
        {
            var workMode = WorkMode.View;

            if (controller.GetWorkId() > 0)
            {
                workMode = WorkMode.Approval;
            }
            else if (controller.GetDraftId() > 0)
            {
                workMode = WorkMode.Draft;
            }
            else if (!string.IsNullOrEmpty(controller.GetProcessCode()))
            {
                workMode = WorkMode.Startup;
            }
            else if (controller.GetFormId() > 0)
            {
                workMode = WorkMode.View;
            }

            return workMode;
        }
        public static WorkMode GetWorkMode(this ControllerBase controller, QueryMode queryMode)
        {
            var workMode = WorkMode.View;

            if (queryMode.WorkId > 0)
            {
                workMode = WorkMode.Approval;
            }
            else if (queryMode.DraftId > 0 )
            {
                workMode = WorkMode.Draft;
            }
            else if (!string.IsNullOrEmpty(queryMode.ProcessCode))
            {
                workMode = WorkMode.Startup;
            }
            else if (queryMode.FormId > 0)
            {
                workMode = WorkMode.View;
            }
            else if (!string.IsNullOrEmpty(queryMode.K2Id))
            {
                workMode = WorkMode.PreStartup;
            }
            return workMode;
        }
    }
}
