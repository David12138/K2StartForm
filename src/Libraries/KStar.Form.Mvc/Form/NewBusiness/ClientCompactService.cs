using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KStar.Form.Domain.ViewModels.NewBusiness.ClientCompact;
using Newtonsoft.Json;
using System.Web.UI.WebControls;
using KStar.Form.Mvc.Common.Attributes;
using KStar.Form.Domain.Service;
using KStar.Platform.ViewModel.Workflow;

namespace KStar.Form.Mvc.Form.NewBusiness
{
    [KStarFormLogic("client-compact")]

    internal class ClientCompactService : FormLogicBaseService, IFormLogicService
    {
        //private KStar.Form.Domain.Service.NewBusiness.IClientCompactService _clientCompactService { get; set; }

        //public ClientCompactService(KStar.Form.Domain.Service.NewBusiness.IClientCompactService applicationService)
        //{
        //    _clientCompactService = applicationService;
        //}

        //public override void OnFormReSubmitAfter(KStarFormModel context)
        //{
        //    ClientCompactViewModel viewModel = new ClientCompactViewModel();
        //    viewModel.ClientTableInfos = new List<ClientInfo>() { new ClientInfo(), new ClientInfo() };
        //    context.FormContent.FormDataToJson = JsonConvert.SerializeObject(viewModel);
        //}


        public override void OnKStarFormStartupAfter(KStarFormModel context)
        {
            ClientCompactViewModel viewModel = new ClientCompactViewModel();
            viewModel.TableBillInfos = new List<BillInfo>() { new BillInfo()};
            viewModel.ListClients = new List<OAClientInfo>();

            context.FormContent.FormDataToJson = JsonConvert.SerializeObject(viewModel);
        }
    }
}
