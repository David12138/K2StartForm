using System.Collections.Generic;

namespace KStar.Form.Domain.ViewModels.BuyerManage.ChanneContract
{
    /// <summary>
    /// 页面表单信息列明
    /// </summary>
    public class ChanneContractViewModel
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
        public string JobTitle { get; set; }
        public string ApplicableTime { get; set; }
        public string CustomerQuotation { get; set; }
        public string ChannelQuotation { get; set; }
        public string QuotationUnit { get; set; }
        public string NumberOfPeople { get; set; }
        public string ProjectLocation { get; set; }
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
