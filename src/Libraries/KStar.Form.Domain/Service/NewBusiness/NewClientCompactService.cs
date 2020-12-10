using KStar.Form.Domain.Models;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Domain.Service.NewBusiness
{
    internal class NewClientCompactService : BaseRepository, INewClientCompactService
    {


        public List<OA_Client> SearchClientInfo(string nameOrCode)
        {
            List<OA_Client> result = new List<OA_Client>();
            var query = BusDb.Queryable<OA_Client>()
                .WhereIF(!string.IsNullOrEmpty(nameOrCode), m => SqlFunc.Contains(m.ClientCode, nameOrCode) || SqlFunc.Contains(m.ClientName, nameOrCode));

            if (string.IsNullOrEmpty(nameOrCode))
                result = query.Take(10).ToList();
            else
                result = query.ToList();
            return result;
        }
    }
}
