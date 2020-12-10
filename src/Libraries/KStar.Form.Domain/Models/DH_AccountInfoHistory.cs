using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SqlSugar;

namespace KStar.Form.Domain.Models
{
    [SugarTable("DH_AccountInfoHistory")]
    public class DH_AccountInfoHistory
    {
        public DH_AccountInfoHistory()
        {
        }

        [SugarColumn(IsPrimaryKey = true)]
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string BankOfDeposit { get; set; }
        public string Account { get; set; }
    }
}
