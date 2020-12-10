using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SqlSugar;

namespace KStar.Form.Domain.Models
{
    [SugarTable("OA_Client")]
    public class OA_Client
    {
        public OA_Client()
        {

        }

        [SugarColumn(IsPrimaryKey = true)]
        public Guid ClientId { get; set; }

        public string OAClientId { get; set; }

        public string ClientCode { get; set; }

        public string ClientName { get; set; }

        public string CreateBy { get; set; }

        public DateTime CreateDate { get; set; }
    }
}
