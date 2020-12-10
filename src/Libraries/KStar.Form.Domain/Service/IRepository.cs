using KStar.Domain;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Domain
{
    public interface IRepository : IService
    {

        string UserAccount { get; }
        bool IsAdmin { get; }

    }
}
