using KStar.Form.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Domain.Service.NewBusiness
{
    public interface IPaySalaryApplicationService : IRepository
    {
        List<OA_Client> SearchClientInfo(string nameOrCode);

        List<DH_AccountInfoHistory> SearchAccountInfo(string key);

        void AddAccountInfoHistory(string name, string bankOfDeposit, string account);
    }
}
