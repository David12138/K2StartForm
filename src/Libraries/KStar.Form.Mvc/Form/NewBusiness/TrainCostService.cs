using KStar.Form.Domain.ViewModels.NewBusiness.TrainCost;
using KStar.Form.Mvc.Common.Attributes;
using KStar.Platform.ViewModel.Workflow;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace KStar.Form.Mvc.Form.NewBusiness
{
    [KStarFormLogic("train-cost")]

    internal class TrainCostService : FormLogicBaseService, IFormLogicService
    {
        private KStar.Form.Domain.Service.NewBusiness.ITrainCostService _trainCostService { get; set; }

        public TrainCostService(KStar.Form.Domain.Service.NewBusiness.ITrainCostService trainCostService)
        {
            _trainCostService = trainCostService;
        }

        public override void OnKStarFormStartupAfter(KStarFormModel context)
        {
            TrainCostModel viewModel = new TrainCostModel();
            viewModel.TableBillInfos = new List<BillInfo>() { new BillInfo() };
            context.FormContent.FormDataToJson = JsonConvert.SerializeObject(viewModel);
        }
    }
}