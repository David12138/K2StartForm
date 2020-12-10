using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Domain.ViewModels.NewBusiness.ClientCompact
{
    public class ClientCompactViewModel
    {

        public string ClientCode { get; set; }
        public string ClientName { get; set; }

        public string CompactType { get; set; }

        public string BusinessType { get; set; }

        public string ClientAddress { get; set; }

        public string SendCondition { get; set; }

        public string CompactSignBy { get; set; }

        public string payKeynote { get; set; }

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
        public string AnnualSalaryStart { get; set; }
        public string AnnualSalaryEnd { get; set; }
        public string QuoteRate { get; set; }
        public string GuaranteePeriod { get; set; }
        public string OfferProportion { get; set; }
        public string ReportProportion { get; set; }
        public string OverGuaranteeProportion { get; set; }

        public string OutPeriodProportion { get; set; }
        public string QuoteRemarks { get; set; }


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
