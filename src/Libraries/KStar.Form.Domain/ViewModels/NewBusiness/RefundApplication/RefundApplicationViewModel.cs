using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Domain.ViewModels.NewBusiness.RefundApplication
{
  public  class RefundApplicationViewModel
    {
        /// <summary>
        /// 所属城市
        /// </summary>
        public string City { get; set; }
        /// <summary>
        /// 城市选择的v-model
        /// </summary>
        public List<string> TmpAddressInfo { get; set; }

        /// <summary>
        /// 付款信息的v-model
        /// </summary>
        public AccountInfo TmpPaymentAccountInfo { get; set; }
        /// <summary>
        /// 付款信息的下拉选项
        /// </summary>
        public List<AccountInfo> ListPaymentAccountInfo { get; set; }
        /// <summary>
        /// 支付方式
        /// </summary>
        public string PayMethod { get; set; }
        /// <summary>
        /// 付款事由
        /// </summary>
        public string Remark { get; set; }
        /// <summary>
        /// 申请类型
        /// </summary>
        public string ApplyType { get; set; }
        /// <summary>
        /// 报销日期
        /// </summary>
        public DateTime? ReimbursementDate { get; set; }
        /// <summary>
        /// 预计报销日期
        /// </summary>
        public DateTime? ExpectedReimbursementDate { get; set; }
        /// <summary>
        /// 收款信息
        /// </summary>
        public AccountInfo TmpCollectionAccountInfo { get; set; }
        /// <summary>
        /// 代理佣金
        /// </summary>
        public decimal? AgentCommission { get; set; }
        /// <summary>
        /// 申请金额
        /// </summary>
        public decimal? ApplicationAmount { get; set; }
        /// <summary>
        /// 金额大写
        /// </summary>
        public string ApplicationAmountCaptial { get; set; }
        /// <summary>
        /// 账单信息
        /// </summary>
        public List<BillInfo> TableBillInfos { get; set; }
        /// <summary>
        /// 客户信息可选项
        /// </summary>
        public List<OAClientInfo> ListClients { get; set; }

    }
    public class BillInfo
    {
        /// <summary>
        /// 项目名称
        /// </summary>
        public string ProjectName { get; set; }

        /// <summary>
        /// 客户名称
        /// </summary>
        public OAClientInfo ClientName { get; set; }
        /// <summary>
        /// 业务类型
        /// </summary>
        public string BusinessType { get; set; }
        /// <summary>
        /// 费用所属期
        /// </summary>
        public DateTime? CostPeriod { get; set; }
        /// <summary>
        /// 发薪人数
        /// </summary>
        public int? PeopleNumber { get; set; }
        /// <summary>
        /// 实发薪资
        /// </summary>
        public decimal? ActualPaySalaryAmount { get; set; }
        /// <summary>
        /// 社保金额
        /// </summary>
        public decimal? SocialInsurance { get; set; }
        /// <summary>
        /// 公积金金额
        /// </summary>
        public decimal? HousingFund { get; set; }
        /// <summary>
        /// 服务费
        /// </summary>
        public decimal? ServiceFee { get; set; }
        /// <summary>
        /// 总计金额
        /// </summary>
        public decimal? Amount { get; set; }
    }

    public class AccountInfo
    {
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 账号
        /// </summary>
        public string Account { get; set; }
        /// <summary>
        /// 开户行
        /// </summary>
        public string BankOfDeposit { get; set; }
    }

    /// <summary>
    /// 账单信息中的客户信息
    /// </summary>
    public class OAClientInfo
    {
        /// <summary>
        /// 客户编码
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 客户名称
        /// </summary>
        public string Name { get; set; }
    }
}
