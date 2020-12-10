using KStar.Platform.ViewModel.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KStar.Form.Domain.ViewModels.NewBusiness.PaySalaryApplication;
using Newtonsoft.Json;
using System.Web.UI.WebControls;
using KStar.Form.Mvc.Common.Attributes;
using KStar.Form.Domain.Service;

namespace KStar.Form.Mvc.Form.NewBusiness
{
    [KStarFormLogic("pay-salary-applicationt")]
    internal class PaySalaryApplicationTService : FormLogicBaseService, IFormLogicService
    {
        private KStar.Form.Domain.Service.NewBusiness.IPaySalaryApplicationTService _applicationTService { get; set; }

        public PaySalaryApplicationTService(KStar.Form.Domain.Service.NewBusiness.IPaySalaryApplicationTService applicationTService)
        {
            _applicationTService = applicationTService;
        }

        public override void OnKStarFormStartupAfter(KStarFormModel context)
        {
            PaySalaryApplicationViewModel viewModel = new PaySalaryApplicationViewModel();

            viewModel.ListPaymentAccountInfo = new List<AccountInfo> {
                new AccountInfo{ Name = "成都瀚砂科技有限责任公司", BankOfDeposit = "431020100101270564", Account = "兴业银行成都分行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司高新分公司", BankOfDeposit = "431030100100221234", Account = "兴业银行成都磨子桥支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司", BankOfDeposit = "431020100100602159", Account = "兴业银行成都分行" },
                new AccountInfo{ Name = "云账户（天津）共享经济信息咨询有限公司", BankOfDeposit = "9902000829650332", Account = "民生银行天津分行营业部" },
                new AccountInfo{ Name = "上海智联易才人力资源顾问有限公司", BankOfDeposit = "1001207409206855192", Account = "工行南京西路支行" }
            };

            viewModel.TmpAddressInfo = new List<string>();
            viewModel.TmpPaymentAccountInfo = new AccountInfo();
            viewModel.TmpCollectionAccountInfo = new AccountInfo();
            viewModel.TableBillInfos = new List<BillInfo>() { new BillInfo(), new BillInfo() };
            viewModel.ListClients = new List<OAClientInfo>();

            context.FormContent.FormDataToJson = JsonConvert.SerializeObject(viewModel);
        }

        public override void OnFormReSubmitAfter(KStarFormModel context)
        {
            base.OnFormReSubmitAfter(context);
            var model = JsonConvert.DeserializeObject<PaySalaryApplicationViewModel>(context.FormContent.FormDataToJson);
            _applicationTService.AddAccountInfoHistory(model.TmpCollectionAccountInfo.Name, model.TmpCollectionAccountInfo.BankOfDeposit, model.TmpCollectionAccountInfo.Account);
        }

        public override void OnFormSubmitAfter(KStarFormModel context)
        {
            base.OnFormSubmitAfter(context);
            var model = JsonConvert.DeserializeObject<PaySalaryApplicationViewModel>(context.FormContent.FormDataToJson);
            _applicationTService.AddAccountInfoHistory(model.TmpCollectionAccountInfo.Name, model.TmpCollectionAccountInfo.BankOfDeposit, model.TmpCollectionAccountInfo.Account);
        }
    }
}
