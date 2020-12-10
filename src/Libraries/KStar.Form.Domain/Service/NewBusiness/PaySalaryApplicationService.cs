using KStar.Form.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SqlSugar;

namespace KStar.Form.Domain.Service.NewBusiness
{
    internal class PaySalaryApplicationService : BaseRepository, IPaySalaryApplicationService
    {
        public void AddAccountInfoHistory(string name, string bankOfDeposit, string account)
        {
            name = string.IsNullOrWhiteSpace(name) ? string.Empty : name;
            bankOfDeposit = string.IsNullOrWhiteSpace(bankOfDeposit) ? string.Empty : bankOfDeposit;
            account = string.IsNullOrWhiteSpace(account) ? string.Empty : account;

            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(bankOfDeposit) || string.IsNullOrWhiteSpace(account))
                return;

            var query = BusDb.Queryable<DH_AccountInfoHistory>()
                .Where(m => SqlFunc.Equals(m.Name, name) && SqlFunc.Equals(m.BankOfDeposit, bankOfDeposit) && SqlFunc.Equals(m.Account, account)).ToList();

            if (query.Count > 0)
                return;

            DH_AccountInfoHistory info = new DH_AccountInfoHistory()
            {
                Id = Guid.NewGuid(),
                Name = name,
                BankOfDeposit = bankOfDeposit,
                Account = account
            };
            BusDb.Insertable(info).ExecuteCommand();
        }

        public List<DH_AccountInfoHistory> SearchAccountInfo(string key)
        {
            List<DH_AccountInfoHistory> result = new List<DH_AccountInfoHistory>();
            var query = BusDb.Queryable<DH_AccountInfoHistory>()
                .WhereIF(!string.IsNullOrEmpty(key), m => SqlFunc.Contains(m.Name, key) || SqlFunc.Contains(m.BankOfDeposit, key) || SqlFunc.Contains(m.Account, key));
            if (string.IsNullOrEmpty(key))
                result = query.Take(10).ToList();
            else
                result = query.ToList();
            return result;
        }

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
