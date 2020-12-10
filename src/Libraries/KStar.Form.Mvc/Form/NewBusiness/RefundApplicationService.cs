using KStar.Form.Domain.ViewModels.NewBusiness.RefundApplication;
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
    [KStarFormLogic("refund-application")]
    internal class RefundApplicationService : FormLogicBaseService, IFormLogicService
    {

        public override void OnKStarFormStartupAfter(KStarFormModel context)
        {
            RefundApplicationViewModel viewModel = new RefundApplicationViewModel();

            viewModel.ListPaymentAccountInfo = new List<AccountInfo>
            {
                new AccountInfo{ Name = "成都瀚砂科技有限责任公司", BankOfDeposit = "431020100101270564", Account = "兴业银行成都分行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司高新分公司", BankOfDeposit = "431030100100221234", Account = "兴业银行成都磨子桥支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司", BankOfDeposit = "431020100100602159", Account = "兴业银行成都分行" },
                new AccountInfo{ Name = "云账户（天津）共享经济信息咨询有限公司", BankOfDeposit = "9902000829650332", Account = "民生银行天津分行营业部" },
                new AccountInfo{ Name = "上海智联易才人力资源顾问有限公司", BankOfDeposit = "1001207409206855192", Account = "工行南京西路支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司上海分公司", BankOfDeposit = "121913069410102", Account = "招行张杨支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司上海分公司", BankOfDeposit = "1001235919017032726", Account = "工行上海市南京东路支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司深圳分公司", BankOfDeposit = "337110100100261258", Account = "兴业银行深圳天安支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司银川分公司", BankOfDeposit = "29124001040002478", Account = "中国农业银行股份有限公司银川商城支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司青岛分公司", BankOfDeposit = "522030100100065092", Account = "兴业银行青岛李沧支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司青岛分公司", BankOfDeposit = "3803021619200347062", Account = "工行青岛南区第二支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司广州分公司", BankOfDeposit = "391070100100123971", Account = "兴业银行广州东城支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司武汉分公司", BankOfDeposit = "416100100100245509", Account = "兴业银行武汉桥口支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司长春分公司", BankOfDeposit = "581020100100418444", Account = "兴业银行股份有限公司长春分行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司海口分公司", BankOfDeposit = "2201028109200358734", Account = "中国工商银行海口国贸支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司南京分公司", BankOfDeposit = "409410100100400366", Account = "兴业银行南京分行营业部" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司厦门分公司", BankOfDeposit = "129420100100179400", Account = "兴业银行厦门莲富支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司兰州分公司", BankOfDeposit = "612010100100211098", Account = "兴业银行支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司呼市分公司", BankOfDeposit = "013101201090142445", Account = "内蒙古银行呼和浩特大学路支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司北京分公司", BankOfDeposit = "321020100100233697", Account = "兴业银行北京东城支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司苏州分公司", BankOfDeposit = "206610100100489134", Account = "兴业银行苏州分行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司大连分公司", BankOfDeposit = "532100100100030394", Account = "兴业银行大连甘井子支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司宁波分公司", BankOfDeposit = "387010100100155920", Account = "兴业银行宁波海曙支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司西安分公司", BankOfDeposit = "456640100100007088", Account = "兴业银行粉巷支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司石家庄分公司", BankOfDeposit = "572110100100034994", Account = "兴业银行石家庄自强路支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司郑州分公司", BankOfDeposit = "462060100100096805", Account = "兴业银行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司哈尔滨分公司", BankOfDeposit = "562030100100212434", Account = "兴业银行道里支行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司太原分公司", BankOfDeposit = "485010100101390896", Account = "兴业银行太原分行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司西安分公司", BankOfDeposit = "906011510000002852", Account = "西安银行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司合肥分公司", BankOfDeposit = "499050100100225653", Account = "兴业银行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司（新基）", BankOfDeposit = "431020100100602159", Account = "兴业银行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司（新工行）", BankOfDeposit = "4402235019100092007", Account = "工商银行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司（新磨）", BankOfDeposit = "431030100100174118", Account = "兴业银行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司（新成招）", BankOfDeposit = "128905779110802", Account = "招商银行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司成华分公司", BankOfDeposit = "431030100100221004", Account = "兴业银行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司武侯分公司", BankOfDeposit = "431030100100221115", Account = "兴业银行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司高新分公司", BankOfDeposit = "431030100100221234", Account = "兴业银行" },
                new AccountInfo{ Name = "成都瀚将企业管理咨询有限公司", BankOfDeposit = "431020100101187668", Account = "兴业银行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司重庆渝北分公司", BankOfDeposit = "3100038709100040539", Account = "工商银行" },
                new AccountInfo{ Name = "成都瀚砂科技有限责任公司", BankOfDeposit = "431020100101270564", Account = "兴业银行" },
                new AccountInfo{ Name = "成都新大瀚人力资源管理有限公司天府新区分公司", BankOfDeposit = "431020100101280022", Account = "兴业银行" },
                new AccountInfo{ Name = "成都激水信息技术有限公司", BankOfDeposit = "431020100101311512", Account = "兴业银行" }
            };

            viewModel.TmpAddressInfo = new List<string>();
            viewModel.TmpPaymentAccountInfo = new AccountInfo();
            viewModel.TmpCollectionAccountInfo = new AccountInfo();
            viewModel.TableBillInfos = new List<BillInfo>() { new BillInfo(), new BillInfo() };
            viewModel.ListClients = new List<OAClientInfo>();

            context.FormContent.FormDataToJson = JsonConvert.SerializeObject(viewModel);
        }
    }
}
