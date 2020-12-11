using System.Collections.Generic;

namespace KStar.Form.Domain.ViewModels.NewBusiness.SocialSecurity
{
    public class SocialSecurityModel
    {
        public List<BillInfo> TableBillInfos { get; set; }
    }

    public class BillInfo
    {
        public string FeeType { get; set; }
        public string UnitPart { get; set; }
        public string PersonalPart { get; set; }
        public string TotalAmount { get; set; }
        public string NameOfPayee { get; set; }
        public string OpeningBankOfPayee { get; set; }
        public string AccountOfPayee { get; set; }
        public string Remarks { get; set; }
    }
}