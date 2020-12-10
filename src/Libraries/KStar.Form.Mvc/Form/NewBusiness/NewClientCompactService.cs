using KStar.Form.Domain.ViewModels.NewBusiness.NewClientCompact;
using KStar.Form.Mvc.Common.Attributes;
using KStar.Platform.ViewModel.Workflow;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Mvc.Form.NewBusiness
{
    [KStarFormLogic("new-client-compact")]
    internal class NewClientCompactService : FormLogicBaseService, IFormLogicService
    {
        private KStar.Form.Domain.Service.NewBusiness.INewClientCompactService _newclientCompactService { get; set; }

        public NewClientCompactService(KStar.Form.Domain.Service.NewBusiness.INewClientCompactService applicationService)
        {
            _newclientCompactService = applicationService;
        }

        public override void OnKStarFormStartupAfter(KStarFormModel context)
        {
            NewClientCompactViewModel viewModel = new NewClientCompactViewModel();
            viewModel.TableBillInfos = new List<BillInfo>() { new BillInfo() };
            viewModel.CostBillInfos = new List<ListBillInfo>() { new ListBillInfo() };
            viewModel.ListClients = new List<OAClientInfo>();

            context.FormContent.FormDataToJson = JsonConvert.SerializeObject(viewModel);
        }
    }
}
