using KStar.Platform.Logger;
using KStar.Platform.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KStar.Form.Domain.Service
{
    internal class DemoServier : BaseRepository, IDemoServier
    {
        public DemoServier()
        {

        }

        public List<MD_User> test()
        {

            _logger.Debug("test", "KStar.Form.Domain.Service");
           return Db.Queryable<MD_User>().Take(10).ToList();
        }

    }
}
