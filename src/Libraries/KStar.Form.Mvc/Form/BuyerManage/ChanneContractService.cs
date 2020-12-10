using KStar.Form.Domain.ViewModels.BuyerManage.ChanneContract;
using KStar.Form.Mvc.Common.Attributes;
using KStar.Platform.ViewModel.Workflow;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace KStar.Form.Mvc.Form.BuyerManage
{
    [KStarFormLogic("channel-contract")]
    internal class ChanneContractService : FormLogicBaseService, IFormLogicService
    {
        /// <summary>
        /// 重写父类方法
        /// </summary>
        /// <param name="context"></param>
        public override void OnKStarFormStartupAfter(KStarFormModel context)
        {
            ChanneContractViewModel viewModel = new ChanneContractViewModel();
            viewModel.TableBillInfos = new List<BillInfo>() { new BillInfo() };
            viewModel.ListClients = new List<OAClientInfo>();

            context.FormContent.FormDataToJson = JsonConvert.SerializeObject(viewModel);
        }
    }
}
