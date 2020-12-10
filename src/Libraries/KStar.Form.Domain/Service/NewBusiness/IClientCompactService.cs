using KStar.Form.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Domain.Service.NewBusiness
{
   public interface IClientCompactService : IRepository
    {
        List<OA_Client> SearchClientInfo(string nameOrCode);
    }
}
