using KStar.Form.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SqlSugar;
using KStar.Platform.ViewModel.Workflow;
using KStar.Form.Domain.ViewModels.NewBusiness.PaySalaryApplication;
using KStar.Form.Domain.ViewModels.NewBusiness.ClientCompact;
using Newtonsoft.Json;

namespace KStar.Form.Domain.Service.NewBusiness
{

    internal class ClientCompactService : BaseRepository, IClientCompactService
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
